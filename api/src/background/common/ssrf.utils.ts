// SSRF guard primitives (spec §10.1 / §13.1). Pure functions: no network access here.
import { isIP } from 'net';

const ALLOWED_PORTS = new Set([80, 443, 8080, 8443]);

/** Parses a dotted IPv4 address into 4 octets, or null. */
export function parseIPv4(ip: string): number[] | null {
  if (isIP(ip) !== 4) return null;
  const parts = ip.split('.').map(Number);
  return parts.length === 4 && parts.every((p) => Number.isInteger(p) && p >= 0 && p <= 255) ? parts : null;
}

/** Expands an IPv6 address (incl. `::` compression and an embedded IPv4 tail) into 8 16-bit groups, or null. */
export function expandIPv6(input: string): number[] | null {
  let ip = input.trim();
  if (ip.startsWith('[') && ip.endsWith(']')) ip = ip.slice(1, -1);
  if (ip.includes('%')) return null; // zone ids are never legitimate for remote hosts
  if (isIP(ip) !== 6) return null;

  // embedded IPv4 (e.g. ::ffff:127.0.0.1)
  const lastColon = ip.lastIndexOf(':');
  const tail = ip.slice(lastColon + 1);
  if (tail.includes('.')) {
    const v4 = parseIPv4(tail);
    if (!v4) return null;
    const hi = ((v4[0] << 8) | v4[1]).toString(16);
    const lo = ((v4[2] << 8) | v4[3]).toString(16);
    ip = `${ip.slice(0, lastColon + 1)}${hi}:${lo}`;
  }

  const halves = ip.split('::');
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(':') : [];
  const rest = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  let groups: string[];
  if (halves.length === 2) {
    const missing = 8 - head.length - rest.length;
    if (missing < 0) return null;
    groups = [...head, ...Array(missing).fill('0'), ...rest];
  } else {
    groups = head;
  }
  if (groups.length !== 8) return null;
  const out = groups.map((g) => parseInt(g, 16));
  return out.every((n) => Number.isInteger(n) && n >= 0 && n <= 0xffff) ? out : null;
}

function isBlockedIPv4(o: number[]): boolean {
  const [a, b, c] = o;
  if (a === 0) return true; // "this" network
  if (a === 10) return true;
  if (a === 127) return true; // loopback
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 169 && b === 254) return true; // link-local incl. cloud metadata 169.254.169.254
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 192 && b === 0 && c === 0) return true; // IETF protocol assignments
  if (a === 192 && b === 0 && c === 2) return true; // TEST-NET-1
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  if (a === 198 && b === 51 && c === 100) return true; // TEST-NET-2
  if (a === 203 && b === 0 && c === 113) return true; // TEST-NET-3
  if (a >= 224) return true; // multicast, reserved, broadcast
  return false;
}

function isBlockedIPv6(g: number[]): boolean {
  const allZeroUntil = (n: number) => g.slice(0, n).every((x) => x === 0);
  if (g.every((x) => x === 0)) return true; // ::
  if (allZeroUntil(7) && g[7] === 1) return true; // ::1
  // IPv4-mapped (::ffff:a.b.c.d) -> judge the embedded IPv4
  if (allZeroUntil(5) && g[5] === 0xffff) {
    return isBlockedIPv4([g[6] >> 8, g[6] & 255, g[7] >> 8, g[7] & 255]);
  }
  if (allZeroUntil(6)) return true; // deprecated IPv4-compatible (::a.b.c.d)
  // NAT64 64:ff9b::/96 -> embedded IPv4
  if (g[0] === 0x64 && g[1] === 0xff9b && g.slice(2, 6).every((x) => x === 0)) {
    return isBlockedIPv4([g[6] >> 8, g[6] & 255, g[7] >> 8, g[7] & 255]);
  }
  if ((g[0] & 0xffc0) === 0xfe80) return true; // link-local fe80::/10
  if ((g[0] & 0xfe00) === 0xfc00) return true; // unique local fc00::/7
  if ((g[0] & 0xff00) === 0xff00) return true; // multicast
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // documentation
  if (g[0] === 0x2002) return isBlockedIPv4([g[1] >> 8, g[1] & 255, g[2] >> 8, g[2] & 255]); // 6to4
  if (g[0] === 0x0100 && g.slice(1, 4).every((x) => x === 0)) return true; // discard-only
  return false;
}

/** True for private, loopback, link-local, metadata, multicast, reserved or unparsable IP literals. */
export function isBlockedIp(ip: string): boolean {
  const v4 = parseIPv4(ip);
  if (v4) return isBlockedIPv4(v4);
  const v6 = expandIPv6(ip);
  if (v6) return isBlockedIPv6(v6);
  return true; // not an IP we can reason about: refuse
}

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'metadata',
  'metadata.google.internal',
  'instance-data',
  'instance-data.ec2.internal',
]);

export function isBlockedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, '');
  if (!h) return true;
  if (BLOCKED_HOSTNAMES.has(h)) return true;
  return (
    h.endsWith('.localhost') ||
    h.endsWith('.local') ||
    h.endsWith('.internal') ||
    h.endsWith('.localdomain') ||
    h.endsWith('.home.arpa')
  );
}

export type UrlCheck = { ok: true; url: URL } | { ok: false; reason: string };

/**
 * Static URL check (no DNS): http/https only, no embedded credentials, sane port, hostname and
 * IP literals not in a blocked range. DNS results are validated separately at connect time.
 */
export function validateRemoteUrl(raw: string): UrlCheck {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, reason: 'invalid_url' };
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return { ok: false, reason: 'scheme_not_allowed' };
  if (url.username || url.password) return { ok: false, reason: 'credentials_not_allowed' };
  if (url.port && !ALLOWED_PORTS.has(Number(url.port))) return { ok: false, reason: 'port_not_allowed' };

  const host = url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname;
  if (isIP(host)) {
    if (isBlockedIp(host)) return { ok: false, reason: 'blocked_address' };
  } else if (isBlockedHostname(host)) {
    return { ok: false, reason: 'blocked_host' };
  } else if (/^[0-9.]+$/.test(host) || /^0x[0-9a-f]+$/i.test(host)) {
    // numeric shorthand such as http://2130706433 or http://0x7f.1 (WHATWG normalises most of these,
    // anything left over is refused)
    return { ok: false, reason: 'blocked_address' };
  }
  return { ok: true, url };
}
