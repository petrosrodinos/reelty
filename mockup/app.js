/* Reelty interactive mockup. No backend: everything is simulated in memory.
   Spec references (FR-*, D*, §*) point to docs/Product_Specification.md. */
'use strict';

/* ================= helpers ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const fmtTime = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const plural = (n, a, b) => n + ' ' + (n === 1 ? a : b);
const MAX_IMG = 12, MIN_IMG = 3, WM_MAX = 2, QUOTA = 3, PAGE_SIZE = 6; // PAGE_SIZE is 20 in the spec; 6 here so pagination is visible
const ROOMS = ['Auto', 'Exterior', 'Living room', 'Kitchen', 'Bedroom', 'Bathroom', 'Terrace/View', 'Other'];

const svg = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  play: svg('<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>'), pause: svg('<path d="M8 5v14M16 5v14" stroke-width="3"/>'),
  download: svg('<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"/>'), trash: svg('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12h10l1-12M9 7V4h6v3"/>'),
  x: svg('<path d="M6 6l12 12M18 6L6 18"/>'), grip: svg('<circle cx="9" cy="6" r="1.4" fill="currentColor"/><circle cx="15" cy="6" r="1.4" fill="currentColor"/><circle cx="9" cy="12" r="1.4" fill="currentColor"/><circle cx="15" cy="12" r="1.4" fill="currentColor"/><circle cx="9" cy="18" r="1.4" fill="currentColor"/><circle cx="15" cy="18" r="1.4" fill="currentColor"/>'),
  left: svg('<path d="M15 5l-7 7 7 7"/>'), right: svg('<path d="M9 5l7 7-7 7"/>'), check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  warn: svg('<path d="M12 4l9 16H3zM12 10v4M12 17.5v.01"/>'), upload: svg('<path d="M12 16V5m0 0L8 9m4-4l4 4M5 19h14"/>'),
  link: svg('<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>'),
  music: svg('<path d="M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z"/>'),
  expand: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'), eraser: svg('<path d="M4 16l9-10 7 6-7 8H8zM9 21h11"/>'),
  refresh: svg('<path d="M20 5v5h-5M4 19v-5h5M18 10a7 7 0 00-12-2M6 14a7 7 0 0012 2"/>'), plus: svg('<path d="M12 5v14M5 12h14"/>'),
  image: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M4 18l5-5 4 3 3-3 4 4"/>'),
  film: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>'),
  shield: svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L15.5 10"/>'),
  clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'), menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  logout: svg('<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>'), spinner: svg('<path d="M12 3a9 9 0 019 9" stroke-width="2.4"/>'),
  info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>'), mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  home: svg('<path d="M4 11l8-7 8 7v9H4zM10 20v-6h4v6"/>'), airbnb: svg('<path d="M12 4c-2 0-3 2-4 4l-3 7c-1 3 1 5 3 5 2 0 3-1 4-2 1 1 2 2 4 2 2 0 4-2 3-5l-3-7c-1-2-2-4-4-4zm0 8a2 2 0 100 4 2 2 0 000-4z"/>'),
  eye: svg('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
};
const MARK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="6.8" r="1.7" fill="currentColor" stroke="none"/><circle cx="17.2" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="17.2" r="1.7" fill="currentColor" stroke="none"/><circle cx="6.8" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>`;
const LOGO = `<a class="logo" href="#/">${MARK}<span>Reel<em>ty</em></span></a>`;

/* ================= state ================= */
const state = {
  user: null, consentWm: false, projects: [], filter: 'all', page: 1, newTab: 'website',
  demo: { outcome: 'success' }, loginFails: 0,
};
try { const u = JSON.parse(localStorage.getItem('reelty.user') || 'null'); if (u) state.user = u; } catch (e) { }
const saveUser = () => { try { state.user ? localStorage.setItem('reelty.user', JSON.stringify(state.user)) : localStorage.removeItem('reelty.user'); } catch (e) { } };

/* ---------- image / project factories ---------- */
let seedN = 1;
function mkImg(scene, o = {}) {
  return Object.assign({
    id: uid(), scene, seed: seedN++, room: 'Auto', wm: false, wmLabel: '© HomePortal.com', wmStatus: 'none', wmAttempts: 0,
    useProcessed: false, removed: false, src: null, dup: false, wmFail: false, name: '',
  }, o);
}
const active = p => p.images.filter(i => !i.removed);
const imgUrl = (im, processed = false) => im.src || sceneURL(im.scene, im.seed, im.wm && !processed ? im.wmLabel : '');
const curUrl = im => imgUrl(im, im.useProcessed);
function mkProject(o = {}) {
  return Object.assign({
    id: uid(), title: '', subtitle: '', location: '', closing: '', music: true, source: 'upload', url: '', status: 'Draft', step: '',
    images: [], clipsDone: 0, clipsTotal: 0, partial: false, skipped: [], failure: '', created: Date.now(), duration: 0,
    rights: false, log: [], bannerSeen: false,
  }, o);
}
const estLen = n => 7.2 + 4.2 * n; // 8 + 5N - 0.8(N+1)

const SCRAPE = {
  airbnb: {
    title: 'Sunlit Loft in Plaka, Athens', subtitle: '2 bedrooms · 78 m² · Sleeps 4', location: 'Plaka, Athens · From €120 per night', closing: 'Book at reelty.example/plaka-loft',
    scenes: ['exterior', 'living', 'kitchen', 'bedroom', 'bedroom', 'bathroom', 'terrace', 'living', 'kitchen', 'other'], raw: 38, filtered: 28, wm: false,
  },
  website: {
    title: 'Modern Family Home, Limassol', subtitle: '4 bed · 3 bath · 210 m² · 90 m² terrace', location: 'Limassol, Cyprus · €680,000', closing: 'Maria K. · +357 99 000 000',
    scenes: ['exterior', 'living', 'living', 'kitchen', 'kitchen', 'bedroom', 'bedroom', 'bathroom', 'bedroom', 'bathroom', 'terrace', 'terrace', 'other', 'exterior'], raw: 61, filtered: 47, wm: true,
  },
};
function buildScraped(kind) {
  const s = SCRAPE[kind];
  const imgs = s.scenes.map((sc, i) => mkImg(sc, { wm: s.wm && i % 3 === 1, wmFail: s.wm && i === 4 }));
  if (imgs.length > 3) { const d = mkImg(imgs[1].scene, { seed: imgs[1].seed, wm: imgs[1].wm, dup: true }); imgs.splice(3, 0, d); }
  return imgs;
}

function seedDemo() {
  const now = Date.now(), day = 864e5;
  const done = (title, sub, loc, scenes, ago, extra = {}) => {
    const imgs = scenes.map(s => mkImg(s));
    return mkProject(Object.assign({
      title, subtitle: sub, location: loc, closing: 'reelty.example', status: 'Completed', images: imgs, clipsTotal: imgs.length, clipsDone: imgs.length,
      duration: Math.round(estLen(imgs.length)), created: now - ago * day, rights: true, source: 'airbnb', url: 'https://www.airbnb.com/rooms/20450071', bannerSeen: true,
    }, extra));
  };
  const a = done('Sunlit Loft in Plaka', '2 bedrooms · 78 m² · Sleeps 4', 'Plaka, Athens · From €120 per night', ['exterior', 'living', 'kitchen', 'bedroom', 'bathroom', 'terrace', 'living', 'bedroom', 'other', 'kitchen'], 1);
  const b = mkProject({
    title: 'Villa Aurora, Mykonos', subtitle: '5 bed · 6 bath · Sea view', location: 'Mykonos · €2,400,000', closing: 'Aurora Estates', source: 'website',
    images: ['exterior', 'terrace', 'living', 'kitchen', 'bedroom', 'bedroom', 'bathroom', 'terrace', 'exterior'].map(s => mkImg(s)), status: 'Creating video', step: 'Generating clips', clipsDone: 3, clipsTotal: 9,
    created: now - 0.1 * day, rights: true, bannerSeen: true,
  });
  const c = done('Garden Townhouse', '3 bed · 2 bath · Private garden', 'Brighton · £485,000', ['exterior', 'living', 'kitchen', 'bedroom', 'bathroom', 'other', 'terrace', 'bedroom'], 3, { source: 'website', partial: true });
  c.skipped = [c.images[3].id, c.images[6].id]; c.duration = Math.round(estLen(6)); c.failure = '2 photos were skipped because their clips could not be generated.';
  const d = mkProject({
    title: 'Seaside Apartment 4B', subtitle: '1 bed · 52 m²', location: 'Valencia · €210,000', closing: 'Costa Realty', source: 'upload', status: 'Failed',
    images: ['exterior', 'living', 'bedroom', 'bathroom', 'terrace', 'kitchen', 'other', 'living'].map(s => mkImg(s)), clipsTotal: 8, clipsDone: 2, created: now - 2 * day, rights: true, bannerSeen: true,
    failure: 'Only 2 of 8 clips could be generated (minimum is 3). Your video credit was refunded. You can retry from the last good step.',
  });
  const e = mkProject({
    title: 'Maple Street Bungalow', subtitle: '', location: '', closing: '', source: 'website', url: 'https://www.example-realty.com/listing/1042', status: 'Ready to edit',
    images: ['exterior', 'living', 'kitchen', 'bedroom', 'bathroom', 'terrace'].map((s, i) => mkImg(s, { wm: i === 1 })), created: now - 0.3 * day,
  });
  const f = done('Canal-side Studio, Amsterdam', 'Studio · 34 m²', 'Jordaan · €1,850 per month', ['exterior', 'living', 'kitchen', 'bedroom', 'bathroom'], 6);
  const g = done('Hillside Cabin Retreat', '2 bed · Wood stove · Sleeps 5', 'Lake Bled · From €140 per night', ['exterior', 'living', 'bedroom', 'terrace', 'kitchen', 'bathroom', 'other'], 9, { music: false });
  const h = done('City Penthouse, Lisbon', '3 bed · 160 m² · Rooftop pool', 'Chiado · €1,150,000', ['exterior', 'living', 'living', 'kitchen', 'bedroom', 'bedroom', 'bathroom', 'terrace', 'terrace', 'other', 'exterior', 'bedroom'], 12, { source: 'website' });
  state.projects = [b, e, a, d, c, f, g, h];
  state.user.used = state.user.used ?? 1;
  runRender(b, { resumeAt: 3 });
}

/* ================= toast / modal ================= */
function toast(msg, kind = '') {
  const el = document.createElement('div'); el.className = 'toast ' + kind; el.textContent = msg; $('#toasts').append(el);
  setTimeout(() => el.remove(), 3600);
}
function openModal(html, { wide = false, dismiss = true } = {}) {
  $('#modal-root').innerHTML = `<div class="overlay" data-dismiss="${dismiss}"><div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">${html}</div></div>`;
  const f = $('#modal-root [autofocus],#modal-root .btn-primary'); f && f.focus();
}
const closeModal = () => { $('#modal-root').innerHTML = ''; };
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function confirmModal({ title, body, ok = 'Confirm', danger = false }) {
  return new Promise(res => {
    openModal(`<h4>${esc(title)}</h4><p>${body}</p><div class="actions"><button class="btn btn-secondary" data-action="m-no">Cancel</button><button class="btn ${danger ? 'btn-primary' : 'btn-primary'}" data-action="m-yes">${esc(ok)}</button></div>`);
    modalResolve = res;
  });
}
let modalResolve = null;

/* ================= layout ================= */
function navApp(route) {
  const u = state.user, left = Math.max(0, QUOTA - (u.used || 0));
  return `<header class="nav"><div class="container">${LOGO}
  <nav class="nav-links" id="navlinks"><a href="#/videos" class="${route === 'videos' ? 'on' : ''}">My Videos</a><a href="#/new" class="${route === 'new' ? 'on' : ''}">New video</a></nav>
  <div class="nav-right"><span class="quota" id="quota">${left} of ${QUOTA} videos left</span>
  <a class="btn btn-primary hide-m" href="#/new">${I.plus} New video</a>
  <div class="menu-wrap"><button class="avatar" data-action="menu" aria-label="Account menu">${esc(u.email[0].toUpperCase())}</button>
   <div class="dropdown" id="dd"><div class="who">${esc(u.email)}<br>${u.verified ? 'Email verified' : 'Email not verified'}</div>
   ${u.verified ? '' : `<button data-action="resend">${I.mail} Resend verification</button>`}
   <button data-action="logout">${I.logout} Log out</button></div></div>
  <button class="btn-icon burger" data-action="burger" aria-label="Menu">${I.menu}</button></div></div></header>
  ${u.verified ? '' : `<div class="banner"><div class="container"><span>${I.mail.replace('<svg', '<svg width="16" height="16"')} Please verify your email before creating your first video.</span><a href="#/verify">Verify now</a></div></div>`}`;
}
function navSite() {
  const u = state.user;
  return `<header class="nav"><div class="container">${LOGO}
  <nav class="nav-links" id="navlinks"><a href="#/#how" data-scroll="how">How it works</a><a href="#/#pricing" data-scroll="pricing">Pricing</a><a href="#/#faq" data-scroll="faq">FAQ</a></nav>
  <div class="nav-right">${u ? `<a class="btn btn-primary" href="#/videos">My Videos</a>` : `<a class="btn btn-text hide-m" href="#/login">Sign in</a><a class="btn btn-primary" href="#/register">Try Reelty</a>`}
  <button class="btn-icon burger" data-action="burger" aria-label="Menu">${I.menu}</button></div></div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="grid g4"><div>${LOGO}<p style="margin-top:16px;max-width:260px">Walkthrough videos from your property photos. AI-generated output may differ from the real property.</p></div>
  <div><h6>Product</h6><a href="#/new">Create a video</a><a href="#/videos">My Videos</a><a href="#/">How it works</a></div>
  <div><h6>Company</h6><a>About</a><a>Contact</a><a>Status</a></div>
  <div><h6>Legal</h6><a>Terms of Service</a><a>Privacy Policy</a><a>Photo rights</a></div></div>
  <div class="legal"><span>© 2026 Reelty. Interactive mockup. Nothing here is real.</span><span>Processors: Google Cloud · Apify · Dewatermark · Higgsfield · email provider</span></div></div></footer>`;
}

/* ================= router ================= */
let current = { name: '', id: null };
const parse = () => {
  const h = location.hash.slice(1) || '/';
  const path = h.split('#')[0] || '/';
  let m;
  if (path === '/') return { name: 'landing' };
  if ((m = path.match(/^\/projects\/([\w]+)\/edit$/))) return { name: 'edit', id: m[1] };
  if ((m = path.match(/^\/projects\/([\w]+)$/))) return { name: 'detail', id: m[1] };
  return { name: path.slice(1) };
};
const PUBLIC = ['landing', 'login', 'register', 'forgot', 'reset'];
const proj = id => state.projects.find(p => p.id === id);
let teardown = null;

function route() {
  if (teardown) { teardown(); teardown = null; }
  closeModal();
  const r = current = parse();
  const anchor = (location.hash.split('#')[2]) || '';
  if (!state.user && !PUBLIC.includes(r.name)) { location.hash = '#/login'; return; }
  const out = document.getElementById('app');
  const V = {
    landing, login, register, forgot, reset, verify, videos, new: newPage, edit: editPage, detail: detailPage,
  }[r.name];
  if (!V) { out.innerHTML = navSite() + `<div class="page container narrow"><h2>Page not found</h2><p class="muted" style="margin:12px 0 24px">That route does not exist in this mockup.</p><a class="btn btn-primary" href="#/">Go home</a></div>` + footer(); return; }
  const res = V(r) || {};
  out.innerHTML = res.html || '';
  $('#demo-root').innerHTML = demoPanel();
  if (anchor) { const el = document.getElementById(anchor); el ? el.scrollIntoView() : window.scrollTo(0, 0); } else window.scrollTo(0, 0);
  if (res.mount) teardown = res.mount() || null;
}
window.addEventListener('hashchange', route);

/* ================= landing ================= */
function demoVideo() {
  return mkProject({ title: 'Sunlit Loft in Plaka', subtitle: '2 bedrooms · 78 m² · Sleeps 4', location: 'Plaka, Athens · From €120 per night', closing: 'reelty.example',
    images: ['exterior', 'living', 'kitchen', 'bedroom', 'terrace'].map((s, i) => mkImg(s, { seed: 40 + i })) });
}
function landing() {
  const html = navSite() + `
  <section class="hero"><div class="container split">
    <div><span class="badge badge-coral">Beta</span>
      <h1>Turn listing photos into cinematic walkthroughs.</h1>
      <p class="lead">Paste a listing link or upload your photos. Pick the shots, press create, and come back to a finished 1080p video. No editing skills needed.</p>
      <div class="actions"><a class="btn btn-primary" href="${state.user ? '#/new' : '#/register'}">Create your first video</a><a class="btn btn-secondary" href="#/#how" data-scroll="how">See how it works</a></div>
      <div class="meta"><span class="badge">16:9 · 1080p MP4</span><span class="badge">Music optional</span><span class="badge">AI-generated</span></div></div>
    <div class="card-dark" style="padding:20px;border-radius:16px"><div id="hero-player"></div>
      <div class="row between" style="margin-top:14px"><span class="body-sm muted">Sample output (simulated)</span><span class="chip chip-ok"><i></i>Completed</span></div></div>
  </div></section>

  <section class="section soft-band" id="how"><div class="container">
    <p class="eyebrow">How it works</p><h2 style="margin:12px 0 48px;max-width:720px">From listing link to MP4 in four steps.</h2>
    <div class="grid g3">
      <div class="card-feature"><div class="ico">${I.link}</div><h5>Paste a link or upload</h5><p>Use a property website, an Airbnb listing, or your own photos. We copy images into private storage so nothing breaks when the listing changes.</p></div>
      <div class="card-feature"><div class="ico">${I.image}</div><h5>Stay in control</h5><p>Drag to reorder, remove what you do not want, add more, and remove watermarks per photo with a before and after preview. Three to twelve photos per video.</p></div>
      <div class="card-feature"><div class="ico">${I.clock}</div><h5>Come back later</h5><p>Rendering runs in the background and survives closed tabs. Your video lands in My Videos, ready to play and download, and we email you.</p></div>
    </div></div></section>

  <section class="section"><div class="container split">
    <div><p class="eyebrow">Built to be reliable</p><h3 style="margin:12px 0 20px">Long jobs never block you, and never charge you twice.</h3>
      <ul class="check-list">
        <li>${I.check}<span>Resumable render steps, so a restart picks up where it stopped.</span></li>
        <li>${I.check}<span>Only failed clips are retried. Finished clips are never re-generated.</span></li>
        <li>${I.check}<span>Fewer than three usable clips? The run fails and your credit is refunded.</span></li>
        <li>${I.check}<span>Files are private. Downloads use signed links that expire in 15 minutes.</span></li>
      </ul></div>
    <div class="code-card"><div class="code-top"><i></i><i></i><i></i><span>render:job</span></div><div class="code-in" id="boot"></div></div>
  </div></section>

  <section class="section soft-band" id="pricing"><div class="container">
    <p class="eyebrow">Pricing</p><h2 style="margin:12px 0 40px">Free while we are in beta.</h2>
    <div class="grid g2" style="max-width:860px">
      <div class="card-dark"><span class="badge badge-coral">Beta</span><h4 style="margin:16px 0 4px">3 videos per month</h4><p class="muted" style="margin-bottom:20px">No card needed.</p>
        <ul class="check-list">${['Up to 12 photos per video', 'Website, Airbnb or upload intake', '2 watermark removals per photo', 'Videos kept until you delete them'].map(t => `<li>${I.check}<span>${t}</span></li>`).join('')}</ul>
        <a class="btn btn-primary btn-block" style="margin-top:28px" href="${state.user ? '#/new' : '#/register'}">Start free</a></div>
      <div class="card"><p class="title-lg">Paid plans</p><h4 style="margin:12px 0 8px">Not yet.</h4><p class="muted">Payments, credit packs and retention tiers are planned for a later release. Until then, usage is controlled by the monthly quota.</p>
        <hr class="hl"><p class="body-sm muted">Failed renders refund your quota automatically.</p></div></div></div></section>

  <section class="section" id="faq"><div class="container narrow">
    <h2 style="margin-bottom:32px">Questions, answered.</h2>
    <details class="faq"><summary>Which photos can I use?</summary><p>Only photos you own or have permission to use. You confirm this before your first render, and we store that confirmation.</p></details>
    <details class="faq"><summary>Can you remove watermarks?</summary><p>You can run watermark removal on your own images. Removing someone else's watermark may infringe their rights, so our terms place that responsibility on you.</p></details>
    <details class="faq"><summary>Is the video a faithful tour?</summary><p>No. The video is AI-generated from your photos and may differ from the real property. Check local advertising rules before publishing it.</p></details>
    <details class="faq"><summary>How long does it take?</summary><p>Usually a few minutes for ten photos. You can close the page; the video appears in My Videos when ready.</p></details>
    <details class="faq"><summary>What do I get at the end?</summary><p>A 1920x1080, 30 fps MP4 with title and end cards, plus every photo used in the video, downloadable singly or as a ZIP.</p></details>
  </div></section>

  <section class="section" style="padding-top:0"><div class="container"><div class="callout"><h2>Your next listing deserves a walkthrough.</h2><p style="margin:16px 0 28px;font-size:18px">Make your first video in minutes.</p><a class="btn btn-cream" href="${state.user ? '#/new' : '#/register'}">Try Reelty</a></div></div></section>
  ${footer()}` + cookieCard();
  return {
    html,
    mount() {
      const pl = mountPlayer($('#hero-player'), demoVideo(), { autoplay: true, loop: true, silent: true, minimal: true });
      const lines = [['c', '# render:video  projectId=8f2k1x'], ['n', '09:41:02 '], ['s', 'QUEUED'], ['n', '09:41:04 '], ['s', 'PREPARING'], ['c', '  imported 10/10 photos -> media ids stored'], ['n', '09:41:09 '], ['s', 'GENERATING'], ['c', '  clips 10/10 complete (0 resubmitted)'], ['n', '09:42:31 '], ['s', 'ASSEMBLING'], ['c', '  1920x1080 · 30 fps · crossfade 0.8s'], ['n', '09:43:18 '], ['s', 'COMPLETED'], ['c', '  video/final.mp4 uploaded  (50s)']];
      let i = 0, out = '', tm;
      const tick = () => {
        const el = $('#boot'); if (!el) return;
        const [k, t] = lines[i % lines.length]; if (i % lines.length === 0) out = '';
        out += (k === 'n' ? '' : '') + `<span class="${k}">${esc(t)}</span>` + (k === 'n' ? '' : '\n'); el.innerHTML = out; i++;
        tm = setTimeout(tick, k === 'n' ? 120 : 650);
      };
      tick();
      return () => { pl.destroy(); clearTimeout(tm); };
    },
  };
}
function cookieCard() {
  try { if (localStorage.getItem('reelty.cookies')) return ''; } catch (e) { }
  return `<div class="cookie" id="cookie"><p class="title-sm" style="color:var(--on-dark);margin-bottom:6px">We use cookies</p><p>Essential cookies keep you signed in. No ad tracking.</p><div class="row"><button class="btn btn-primary btn-sm" data-action="cookie">Accept</button><button class="btn btn-dark btn-sm" data-action="cookie">Essential only</button></div></div>`;
}

/* ================= auth ================= */
const emailOK = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function authShell(title, sub, body, foot) {
  return navSite() + `<main class="auth"><div class="card"><h2>${title}</h2><p class="muted" style="margin-bottom:24px">${sub}</p>${body}<p class="body-sm muted" style="margin-top:24px;text-align:center">${foot}</p></div></main>`;
}
const fld = (id, label, type = 'text', extra = {}) => `<div class="field" data-f="${id}"><label for="${id}">${label}</label><input class="input" id="${id}" name="${id}" type="${type}" ${extra.ph ? `placeholder="${esc(extra.ph)}"` : ''} ${extra.ac ? `autocomplete="${extra.ac}"` : ''} ${extra.max ? `maxlength="${extra.max}"` : ''}>${extra.hint ? `<span class="hint">${extra.hint}</span>` : ''}<span class="err"></span></div>`;
function setErr(form, id, msg) { const f = $(`[data-f="${id}"]`, form); if (!f) return; f.classList.toggle('bad', !!msg); $('.err', f).textContent = msg || ''; }
function login() {
  return { html: authShell('Welcome back', 'Log in to see your videos.', `<form class="form" data-form="login" novalidate>${fld('email', 'Email', 'email', { ac: 'email', ph: 'you@agency.com' })}${fld('password', 'Password', 'password', { ac: 'current-password' })}<div id="formErr" class="notice bad" style="display:none"></div><button class="btn btn-primary btn-block">Log in</button><a class="body-sm" href="#/forgot" style="text-align:center">Forgot your password?</a></form><p class="body-sm soft" style="margin-top:16px">Mockup: any email and a password of 10+ characters works.</p>`, `New here? <a href="#/register">Create an account</a>`) };
}
function register() {
  return { html: authShell('Create your account', '3 free videos a month while in beta.', `<form class="form" data-form="register" novalidate>${fld('email', 'Email', 'email', { ac: 'email' })}${fld('password', 'Password', 'password', { ac: 'new-password', hint: 'At least 10 characters.' })}<label class="check"><input type="checkbox" id="terms"><span>I agree to the Terms and understand that output is AI-generated.</span></label><div class="field" data-f="terms"><span class="err"></span></div><button class="btn btn-primary btn-block">Create account</button></form>`, `Already registered? <a href="#/login">Log in</a>`) };
}
function forgot() {
  return { html: authShell('Reset your password', 'We will email a one-time link that expires in 1 hour.', `<form class="form" data-form="forgot" novalidate>${fld('email', 'Email', 'email')}<button class="btn btn-primary btn-block">Send reset link</button></form>`, `<a href="#/login">Back to log in</a>`) };
}
function reset() {
  return { html: authShell('Choose a new password', 'Link valid for 1 hour.', `<form class="form" data-form="reset" novalidate>${fld('password', 'New password', 'password', { hint: 'At least 10 characters.' })}<button class="btn btn-primary btn-block">Update password</button></form>`, `<a href="#/login">Back to log in</a>`) };
}
function verify() {
  const u = state.user;
  return { html: navApp('') + `<main class="auth"><div class="card" style="text-align:center"><div class="card-feature ico" style="display:inline-grid;width:56px;height:56px;margin:0 auto 20px;padding:0;place-items:center;color:var(--primary)">${I.mail.replace('<svg', '<svg width="26" height="26"')}</div>
   <h2>${u.verified ? 'Email verified' : 'Check your inbox'}</h2><p class="muted" style="margin:8px 0 24px">${u.verified ? 'You can create videos now.' : `We sent a verification link to <b>${esc(u.email)}</b>. You need it before your first render. Logging in works without it.`}</p>
   ${u.verified ? `<a class="btn btn-primary" href="#/new">Create a video</a>` : `<button class="btn btn-primary btn-block" data-action="do-verify">Simulate clicking the link</button><button class="btn btn-secondary btn-block" style="margin-top:10px" data-action="resend">Resend email</button>`}</div></main>` };
}
function onSubmit(form, name) {
  const val = id => ($('#' + id, form) || {}).value || '';
  const bad = (id, m) => { setErr(form, id, m); return !!m; };
  if (name === 'login') {
    let e = bad('email', emailOK(val('email')) ? '' : 'Enter a valid email address.');
    e = bad('password', val('password') ? '' : 'Enter your password.') || e; if (e) return;
    const box = $('#formErr');
    if (state.loginFails >= 5) { box.style.display = 'flex'; box.textContent = 'Too many attempts. Please wait a few minutes and try again.'; return; }
    if (val('password').length < 10) { state.loginFails++; box.style.display = 'flex'; box.textContent = 'Email or password is incorrect.'; return; }
    state.loginFails = 0; state.user = { email: val('email'), verified: true, used: 1 }; saveUser(); if (!state.projects.length) seedDemo(); location.hash = '#/videos';
  }
  if (name === 'register') {
    let e = bad('email', emailOK(val('email')) ? '' : 'Enter a valid email address.');
    e = bad('password', val('password').length >= 10 ? '' : 'Use at least 10 characters.') || e;
    e = bad('terms', $('#terms').checked ? '' : 'Please accept the terms to continue.') || e; if (e) return;
    state.user = { email: val('email'), verified: false, used: 0 }; saveUser(); state.projects = []; location.hash = '#/verify'; toast('Account created. Check your email to verify.');
  }
  if (name === 'forgot') {
    if (bad('email', emailOK(val('email')) ? '' : 'Enter a valid email address.')) return;
    toast('If that email has an account, a reset link is on its way.'); setTimeout(() => location.hash = '#/reset', 900);
  }
  if (name === 'reset') {
    if (bad('password', val('password').length >= 10 ? '' : 'Use at least 10 characters.')) return;
    toast('Password updated. Please log in.'); location.hash = '#/login';
  }
}

/* ================= My Videos ================= */
const CAT = p => ({ Completed: 'completed', Failed: 'failed', Draft: 'drafts', 'Ready to edit': 'drafts' }[p.status] || 'progress');
const STATUS_CLS = { Completed: 'ok', Failed: 'bad', Delayed: 'warn', Draft: 'draft', 'Ready to edit': 'draft' };
const chipFor = p => `<span class="chip chip-${STATUS_CLS[p.status] || 'run'}"><i></i>${p.status === 'Delayed' ? 'Delayed' : p.status}</span>`;
const dateStr = t => { const d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? 'Today' : d === 1 ? 'Yesterday' : new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }); };
function posterOf(p) { const im = active(p)[0]; return im ? `style="background-image:url('${curUrl(im)}')"` : ''; }
function cardHTML(p) {
  const busy = ['Fetching photos', 'Queued', 'Creating video', 'Delayed'].includes(p.status);
  const dim = busy ? `<div class="dim"><div>${p.status === 'Delayed' ? 'Delayed, we are on it' : p.status === 'Fetching photos' ? 'Fetching photos…' : p.step === 'Generating clips' ? `Generating clips (${p.clipsDone} of ${p.clipsTotal})` : (p.step || 'Queued')}</div></div>` : '';
  let actions = '';
  if (p.status === 'Completed') actions = `<a class="btn btn-primary btn-sm" href="#/projects/${p.id}">${I.play} Play</a><button class="btn btn-secondary btn-sm" data-action="dl-video" data-id="${p.id}">${I.download} Download MP4</button>`;
  else if (p.status === 'Failed') actions = `<button class="btn btn-primary btn-sm" data-action="retry" data-id="${p.id}">${I.refresh} Retry</button><a class="btn btn-secondary btn-sm" href="#/projects/${p.id}">Details</a>`;
  else if (p.status === 'Draft' || p.status === 'Ready to edit') actions = `<a class="btn btn-primary btn-sm" href="#/projects/${p.id}/edit">Continue editing</a>`;
  else actions = `<a class="btn btn-secondary btn-sm" href="#/projects/${p.id}">View progress</a>`;
  actions += `<button class="btn-icon sm" style="margin-left:auto" data-action="del" data-id="${p.id}" aria-label="Delete project">${I.trash}</button>`;
  const sub = p.status === 'Failed' ? `<p class="body-sm" style="color:var(--error)">${esc(p.failure.split('.')[0])}.</p>` : p.partial ? `<p class="body-sm muted">Partial: ${plural(p.skipped.length, 'photo', 'photos')} skipped</p>` : `<p class="body-sm muted">${plural(active(p).length, 'photo', 'photos')} · ${p.source === 'upload' ? 'Uploaded' : p.source === 'airbnb' ? 'Airbnb' : 'Website'}</p>`;
  return `<article class="card-video"><a class="poster" href="#/projects/${p.id}${p.status === 'Draft' || p.status === 'Ready to edit' ? '/edit' : ''}" ${posterOf(p)}>${chipFor(p)}${p.status === 'Completed' ? `<span class="dur">${fmtTime(p.duration)}</span>` : ''}${dim}</a>
   <div class="cv-body"><h4 class="title-md" style="font-family:var(--sans)">${esc(p.title || 'Untitled video')}</h4>${sub}<p class="caption soft">${dateStr(p.created)}</p><div class="actions">${actions}</div></div></article>`;
}
function filtered() {
  const f = state.filter;
  return state.projects.filter(p => f === 'all' || CAT(p) === f).sort((a, b) => b.created - a.created);
}
function gridHTML() {
  const list = filtered(), pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  state.page = Math.min(state.page, pages);
  const slice = list.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
  if (!list.length) return `<div class="empty"><h4 style="margin-bottom:8px">${state.projects.length ? 'Nothing here' : 'No videos yet'}</h4><p style="margin-bottom:20px">${state.projects.length ? 'No projects match this filter.' : 'Create your first walkthrough video from a listing link or your photos.'}</p><a class="btn btn-primary" href="#/new">Create a video</a></div>`;
  return `<div class="grid g3">${slice.map(cardHTML).join('')}</div>` + (pages > 1 ? `<div class="pager"><button class="btn btn-secondary btn-sm" data-action="page" data-d="-1" ${state.page === 1 ? 'disabled' : ''}>Previous</button><span class="body-sm muted">Page ${state.page} of ${pages}</span><button class="btn btn-secondary btn-sm" data-action="page" data-d="1" ${state.page === pages ? 'disabled' : ''}>Next</button></div>` : '');
}
function videos() {
  const tabs = [['all', 'All'], ['completed', 'Completed'], ['progress', 'In progress'], ['failed', 'Failed'], ['drafts', 'Drafts']];
  return {
    html: navApp('videos') + `<main class="page"><div class="container"><div class="page-head"><div><p class="eyebrow">Library</p><h2>My Videos</h2></div><a class="btn btn-primary" href="#/new">${I.plus} New video</a></div>
    <div class="tabs" style="margin-bottom:28px" id="ftabs">${tabs.map(([k, l]) => `<button class="tab ${state.filter === k ? 'on' : ''}" data-action="filter" data-k="${k}">${l}</button>`).join('')}</div>
    <div id="grid">${gridHTML()}</div></div></main>` + footer(),
  };
}
function renderGrid() { const g = $('#grid'); if (g) g.innerHTML = gridHTML(); }

/* ================= new video ================= */
function newPage() {
  return { html: navApp('new') + `<main class="page"><div class="container narrow"><div class="page-head" style="margin-bottom:24px"><div><p class="eyebrow">Step 1 of 3</p><h2>New video</h2></div></div>
  <div class="tabs" id="ntabs" style="margin-bottom:20px">${[['website', 'Website link', I.link], ['airbnb', 'Airbnb link', I.airbnb], ['upload', 'Upload photos', I.upload]].map(([k, l, ic]) => `<button class="tab ${state.newTab === k ? 'on' : ''}" data-action="ntab" data-k="${k}">${ic}${l}</button>`).join('')}</div>
  <div class="card" id="npanel">${newPanel()}</div></div></main>` + footer(),
    mount() { bindDrop(); } };
}
function newPanel() {
  const t = state.newTab;
  if (t === 'website') return `<form class="form" data-form="scrape" data-kind="website" novalidate><h4 class="title-lg">Paste a property listing link</h4><p class="muted">We will find the gallery photos on the page, skip logos and icons, and copy them to private storage.</p>
    ${fld('url', 'Listing URL', 'url', { ph: 'https://www.example-realty.com/listing/1042', hint: 'Must start with http:// or https://' })}
    <div class="row"><button class="btn btn-primary">Fetch photos</button><button type="button" class="link btn btn-text" style="color:var(--primary)" data-action="sample-url" data-url="https://www.example-realty.com/listing/1042">Use a sample link</button></div></form>`;
  if (t === 'airbnb') return `<form class="form" data-form="scrape" data-kind="airbnb" novalidate><h4 class="title-lg">Paste an Airbnb listing link</h4><p class="muted">Use a link to a single listing, like <span class="mono" style="font-size:13px">airbnb.com/rooms/20450071</span>. Search result pages are not supported.</p>
    ${fld('url', 'Airbnb listing URL', 'url', { ph: 'https://www.airbnb.com/rooms/20450071' })}
    <div class="row"><button class="btn btn-primary">Fetch photos</button><button type="button" class="btn btn-text" style="color:var(--primary)" data-action="sample-url" data-url="https://www.airbnb.com/rooms/20450071?adults=2&source_impression_id=p3">Use a sample link</button></div></form>`;
  return `<div class="stack"><h4 class="title-lg">Upload your own photos</h4><p class="muted">JPG, PNG or WebP. Up to 20 MB each. Best results at 1024 px or larger on the long side.</p>
    <div class="drop" id="drop" tabindex="0" data-action="pick">${I.upload}<p class="title-md">Drag photos here or click to browse</p><p class="body-sm muted" style="margin-top:4px">Minimum 640 px, 3 to 12 photos per video</p></div>
    <input type="file" id="file" accept="image/jpeg,image/png,image/webp" multiple hidden>
    <div class="row"><button class="btn btn-secondary btn-sm" data-action="sample-upload">Use sample photos instead</button></div></div>`;
}
function bindDrop() {
  const drop = $('#drop'), file = $('#file'); if (!drop) return;
  file.onchange = () => handleFiles([...file.files], null);
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => handleFiles([...e.dataTransfer.files], null));
  drop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } });
}
const AIRBNB_RE = /^https?:\/\/([\w-]+\.)*airbnb\.[a-z.]{2,}\/rooms\/\d+/i;
function startScrape(form) {
  const kind = form.dataset.kind, url = $('#url', form).value.trim();
  let m = '';
  if (!/^https?:\/\/\S+\.\S+/i.test(url)) m = 'Enter a link starting with http:// or https://';
  else if (kind === 'airbnb' && !AIRBNB_RE.test(url)) m = /airbnb/i.test(url) ? 'That looks like a search page. Paste a link to one listing (airbnb.com/rooms/…).' : 'That is not an Airbnb listing link.';
  setErr(form, 'url', m); if (m) return;
  const p = mkProject({ source: kind, url: kind === 'airbnb' ? url.split('?')[0] : url, status: 'Fetching photos', rights: false });
  state.projects.unshift(p); runScrape(p, kind, /empty|fail/i.test(url)); location.hash = `#/projects/${p.id}`;
}
async function runScrape(p, kind, fail) {
  const s = SCRAPE[kind], actor = kind === 'airbnb' ? 'tri_angle/airbnb-rooms-urls-scraper' : 'apify/web-scraper';
  const step = async t => { p.log.push(t); live(p); await sleep(850); return proj(p.id); };
  p.log = []; live(p);
  if (!await step(`Starting Apify actor ${actor}…`)) return;
  if (!await step(kind === 'airbnb' ? 'Stripped tracking parameters from the URL' : 'Rendering page, scrolling lazy galleries…')) return;
  if (fail) {
    await step('Found 0 gallery images');
    Object.assign(p, { status: 'Failed', failure: 'We could not find any photos on that page. Try the Upload tab instead.' }); live(p); return;
  }
  if (!await step(`Found ${s.raw} image URLs`)) return;
  if (!await step(`Filtered ${s.raw - s.filtered} logos, icons and small images`)) return;
  if (!await step(`Copying ${s.scenes.length} photos to private storage…`)) return;
  Object.assign(p, { title: s.title, subtitle: s.subtitle, location: s.location, closing: s.closing, images: buildScraped(kind), status: 'Ready to edit' });
  p.log.push('Done. Listing details pre-filled.'); live(p);
  if (current.name === 'detail' && current.id === p.id) location.hash = `#/projects/${p.id}/edit`;
}
async function handleFiles(files, p) {
  const ok = [], msgs = []; let warn = 0;
  const room = p ? MAX_IMG - active(p).length : MAX_IMG;
  for (const f of files) {
    if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { msgs.push(`${f.name}: only JPG, PNG or WebP`); continue; }
    if (f.size > 20 * 1048576) { msgs.push(`${f.name}: over 20 MB`); continue; }
    const url = URL.createObjectURL(f);
    const dim = await new Promise(r => { const i = new Image(); i.onload = () => r([i.naturalWidth, i.naturalHeight]); i.onerror = () => r(null); i.src = url; });
    if (!dim) { msgs.push(`${f.name}: could not be read`); continue; }
    if (Math.max(...dim) < 640) { msgs.push(`${f.name}: too small (${Math.max(...dim)} px, minimum 640)`); continue; }
    if (Math.max(...dim) < 1024) warn++;
    ok.push(mkImg('other', { src: url, name: f.name, wmStatus: 'none', w: dim[0], h: dim[1], dupKey: f.name + f.size }));
  }
  if (ok.length > room) { msgs.push(`Only ${room} more ${room === 1 ? 'photo fits' : 'photos fit'} (max ${MAX_IMG})`); ok.length = Math.max(0, room); }
  if (msgs.length) toast(msgs.slice(0, 2).join('. ') + (msgs.length > 2 ? ` (+${msgs.length - 2} more)` : ''), 'bad');
  if (warn) toast(`${plural(warn, 'photo is', 'photos are')} under 1024 px and may look soft.`);
  if (!ok.length) return;
  if (!p) { p = mkProject({ source: 'upload', status: 'Ready to edit', title: '' }); state.projects.unshift(p); }
  ok.forEach(im => { if (p.images.some(x => x.dupKey && x.dupKey === im.dupKey)) im.dup = true; p.images.push(im); });
  if (current.name === 'edit' && current.id === p.id) refreshEdit(p); else location.hash = `#/projects/${p.id}/edit`;
}
function sampleImages(n = 8) { return ['exterior', 'living', 'kitchen', 'bedroom', 'bathroom', 'terrace', 'living', 'bedroom'].slice(0, n).map(s => mkImg(s, { wm: false })); }

/* ================= image manager / edit ================= */
function editPage(r) {
  const p = proj(r.id); if (!p) { location.hash = '#/videos'; return {}; }
  if (!['Draft', 'Ready to edit'].includes(p.status)) { location.hash = `#/projects/${p.id}`; return {}; }
  const html = navApp('') + `<main class="page"><div class="container"><div class="page-head"><div><p class="eyebrow"><a href="#/videos" style="color:var(--muted)">My Videos</a> / Edit</p><h2>Prepare your photos</h2></div><span class="savestate" id="save">${I.check.replace('<svg', '<svg width="14" height="14"')} All changes saved</span></div>
  <div class="edit"><section><div id="manager"></div></section>
  <aside class="side"><div class="card tight"><p class="title-md" style="margin-bottom:14px">Video details</p><div class="form" id="details">
    <div class="field"><label for="d-title">Title <span class="soft">(required)</span></label><input class="input" id="d-title" maxlength="60" value="${esc(p.title)}" placeholder="Sunlit Loft in Plaka"><div class="counter" id="d-count">${p.title.length}/60</div></div>
    <div class="field"><label for="d-sub">Subtitle</label><input class="input" id="d-sub" value="${esc(p.subtitle)}" placeholder="87 m² | 40 m² terrace"></div>
    <div class="field"><label for="d-loc">Location or price line</label><input class="input" id="d-loc" value="${esc(p.location)}" placeholder="Athens · €450,000"></div>
    <div class="field"><label for="d-close">Closing line</label><input class="input" id="d-close" value="${esc(p.closing)}" placeholder="Agent name, website, phone"></div>
    <label class="switch"><input type="checkbox" id="d-music" ${p.music ? 'checked' : ''}><i></i><span>Music</span></label><p class="hint body-sm muted" style="margin-top:-8px" id="music-hint"></p></div></div>
  <div class="card tight" id="summary"></div></aside></div></div></main>` + footer();
  return {
    html,
    mount() {
      refreshEdit(p);
      const save = () => { const s = $('#save'); if (!s) return; s.innerHTML = `${I.spinner.replace('<svg', '<svg class="spin" width="14" height="14"')} Saving…`; clearTimeout(save.t); save.t = setTimeout(() => { const s2 = $('#save'); s2 && (s2.innerHTML = `${I.check.replace('<svg', '<svg width="14" height="14"')} All changes saved`); }, 700); };
      editSave = save;
      const bind = (id, key) => $(id).addEventListener('input', e => { p[key] = e.target.value; if (key === 'title') $('#d-count').textContent = p.title.length + '/60'; save(); updateSummary(p); });
      bind('#d-title', 'title'); bind('#d-sub', 'subtitle'); bind('#d-loc', 'location'); bind('#d-close', 'closing');
      $('#d-music').addEventListener('change', e => { p.music = e.target.checked; save(); updateSummary(p); });
      return () => { editSave = null; dragId = null; };
    },
  };
}
let editSave = null, dragId = null;
function refreshEdit(p) {
  if (p.status === 'Draft' && p.images.length) p.status = 'Ready to edit';
  const m = $('#manager'); if (m) m.innerHTML = managerHTML(p);
  updateSummary(p); editSave && editSave();
}
function wmBlock(im, p) {
  const left = WM_MAX - im.wmAttempts;
  if (im.wmStatus === 'processing') return `<button class="btn btn-secondary btn-sm btn-block" disabled>${I.spinner.replace('<svg', '<svg class="spin"')} Removing…</button>`;
  if (im.wmStatus === 'done') return `<div class="seg" role="group" aria-label="Which version is used"><button data-action="wm-keep" data-id="${im.id}" class="${im.useProcessed ? 'on' : ''}">Keep result</button><button data-action="wm-revert" data-id="${im.id}" class="${!im.useProcessed ? 'on' : ''}">Revert to original</button></div>
    <div class="irow"><button class="btn btn-secondary btn-sm" style="flex:1" data-action="zoom" data-id="${im.id}">${I.eye} Compare</button>${left > 0 ? `<button class="btn btn-secondary btn-sm" style="flex:1" data-action="wm" data-id="${im.id}">Retry (${left} left)</button>` : ''}</div>`;
  if (im.wmStatus === 'failed') return `<p class="caption" style="color:var(--error)">Could not remove the watermark. You can continue without it.</p><button class="btn btn-secondary btn-sm btn-block" data-action="wm" data-id="${im.id}" ${left <= 0 ? 'aria-disabled="true"' : ''}>${I.refresh} Retry (${Math.max(0, left)} left)</button>`;
  return `<button class="btn btn-secondary btn-sm btn-block" data-action="wm" data-id="${im.id}" ${left <= 0 ? 'aria-disabled="true"' : ''}>${I.eraser} Remove watermark</button>`;
}
function cardEdit(im, i, n, p) {
  const st = [];
  if (im.wmStatus === 'done') st.push(`<span class="pill ok">${I.check} Cleaned</span>`);
  if (im.wmStatus === 'failed') st.push(`<span class="pill bad">${I.warn} Failed</span>`);
  if (im.dup) st.push(`<span class="pill warn">${I.warn} Possible duplicate</span>`);
  return `<div class="icard" draggable="true" tabindex="0" data-id="${im.id}" aria-label="Photo ${i + 1} of ${n}. Use Alt and arrow keys to move.">
   <div class="ithumb" style="background-image:url('${curUrl(im)}')"><span class="num">${I.grip}${i + 1}</span>
    <button class="zoom" data-action="zoom" data-id="${im.id}" aria-label="Preview photo ${i + 1}">${I.expand}</button><button class="rm" data-action="rm" data-id="${im.id}" aria-label="Remove photo ${i + 1}">${I.x}</button>
    <div class="st">${st.join('')}</div>${im.wmStatus === 'processing' ? `<div class="busy"><div>${I.spinner.replace('<svg', '<svg class="spin"')}Removing watermark…</div></div>` : ''}</div>
   <div class="ibody"><div class="irow"><select class="select sm" data-action="room" data-id="${im.id}" aria-label="Room type">${ROOMS.map(r => `<option ${r === im.room ? 'selected' : ''}>${r}</option>`).join('')}</select>
    <button class="btn-icon sm" data-action="mv" data-d="-1" data-id="${im.id}" aria-label="Move earlier" ${i === 0 ? 'disabled' : ''}>${I.left}</button><button class="btn-icon sm" data-action="mv" data-d="1" data-id="${im.id}" aria-label="Move later" ${i === n - 1 ? 'disabled' : ''}>${I.right}</button></div>${wmBlock(im, p)}</div></div>`;
}
function managerHTML(p) {
  const list = active(p), n = list.length;
  const over = n > MAX_IMG, under = n < MIN_IMG;
  return `<div class="mgr-head"><div><p class="title-lg">${n} of ${MAX_IMG} photos</p><p class="body-sm ${over || under ? '' : 'muted'}" style="${over || under ? 'color:var(--warning)' : ''}">${under ? `Add at least ${MIN_IMG} photos to continue.` : over ? `Remove ${n - MAX_IMG} to continue (max ${MAX_IMG}).` : 'Drag to reorder. The video follows this order.'}</p></div>
   <div class="row"><button class="btn btn-secondary btn-sm" data-action="sample-more">Add sample photos</button><button class="btn btn-primary btn-sm" data-action="pick-more">${I.upload} Upload photos</button></div></div><input type="file" id="file2" accept="image/jpeg,image/png,image/webp" multiple hidden>
   ${n ? '' : `<div class="empty" style="margin-bottom:16px"><p class="title-md" style="margin-bottom:6px">Add at least 3 photos to continue.</p><p>Upload your own or try the sample photos.</p></div>`}
   <div class="igrid">${list.map((im, i) => cardEdit(im, i, n, p)).join('')}${n < MAX_IMG ? `<div class="iadd" data-action="pick-more" tabindex="0" role="button">${I.plus}<span class="title-sm">Upload more</span><span class="body-sm">JPG, PNG, WebP</span></div>` : ''}</div>`;
}
function blockers(p) {
  const u = state.user, n = active(p).length, b = [];
  if (!u.verified) b.push('Verify your email to create a video.');
  if (n < MIN_IMG) b.push(`Add at least ${MIN_IMG} photos (you have ${n}).`);
  if (n > MAX_IMG) b.push(`Remove ${n - MAX_IMG} photo${n - MAX_IMG > 1 ? 's' : ''} (max ${MAX_IMG}).`);
  if (active(p).some(i => i.wmStatus === 'processing')) b.push('Waiting for watermark removal to finish.');
  if (!p.title.trim()) b.push('Add a title.');
  if (!p.rights) b.push('Confirm you have the rights to these photos.');
  if ((u.used || 0) >= QUOTA) b.push('Monthly quota reached.');
  if (state.projects.some(x => x !== p && ['Queued', 'Creating video', 'Delayed'].includes(x.status))) b.push('You already have a video being created. One at a time.');
  return b;
}
function updateSummary(p) {
  const el = $('#summary'); if (!el) return;
  const n = active(p).length, b = blockers(p), u = state.user, left = Math.max(0, QUOTA - (u.used || 0));
  const had = $('#rights'); const hadFocus = had && document.activeElement === had;
  el.innerHTML = `<p class="title-md" style="margin-bottom:8px">Summary</p>
   <div class="sum-row"><span class="muted">Photos</span><b>${n}</b></div><div class="sum-row"><span class="muted">Estimated length</span><b>${n >= 1 ? '~' + fmtTime(estLen(n)) : '–'}</b></div>
   <div class="sum-row"><span class="muted">Audio</span><b>${p.music ? 'Soundtrack on' : 'Silent track'}</b></div><div class="sum-row"><span class="muted">Cost</span><b>1 video (${left} left this month)</b></div><hr class="hl" style="margin:12px 0">
   <label class="check"><input type="checkbox" id="rights" ${p.rights ? 'checked' : ''}><span>I own these photos or have permission to use them.</span></label>
   <button class="btn btn-primary btn-block" style="margin-top:16px" data-action="submit" ${b.length ? 'aria-disabled="true"' : ''}>Create video</button>
   ${b.length ? `<p class="reason">${I.info}<span>${esc(b[0])}</span></p>` : `<p class="reason" style="color:var(--muted)">${I.clock}<span>Takes several minutes. You can close the page after.</span></p>`}`;
  $('#music-hint') && ($('#music-hint').textContent = p.music ? 'One built-in royalty-free track, fading in and out.' : 'No music. A silent audio track keeps the file compatible everywhere.');
  const r = $('#rights'); r.addEventListener('change', () => { p.rights = r.checked; editSave && editSave(); updateSummary(p); $('#rights').focus(); });
  if (hadFocus) r.focus();
}
function moveImg(p, id, d) {
  const list = active(p), i = list.findIndex(x => x.id === id), j = i + d; if (j < 0 || j >= list.length) return;
  const a = p.images.indexOf(list[i]), b = p.images.indexOf(list[j]); [p.images[a], p.images[b]] = [p.images[b], p.images[a]];
}
function lightbox(im) {
  const done = im.wmStatus === 'done';
  openModal(`<div class="row between"><h4 style="margin:0">Photo preview</h4><button class="btn-icon" data-action="m-close" aria-label="Close">${I.x}</button></div>
   <div class="compare" style="${done ? '' : 'grid-template-columns:1fr'}"><figure><figcaption>${done ? 'Original' : (im.name || 'Original')}</figcaption><div class="cimg" style="background-image:url('${imgUrl(im, false)}')"></div></figure>
   ${done ? `<figure><figcaption>Watermark removed</figcaption><div class="cimg" style="background-image:url('${imgUrl(im, true)}')"></div></figure>` : ''}</div>
   <p class="body-sm muted" style="margin-top:14px">${done ? `Video uses: <b>${im.useProcessed ? 'cleaned version' : 'original'}</b>. The original is always kept in storage.` : 'Room type: ' + esc(im.room)}</p>`, { wide: true });
}
async function runWm(im, p) {
  im.wmAttempts++; im.wmStatus = 'processing'; refreshEdit(p);
  await sleep(2600); if (!proj(p.id)) return;
  if (im.wmFail && im.wmAttempts === 1) { im.wmStatus = 'failed'; toast('Watermark removal failed. You can retry or continue.', 'bad'); }
  else { im.wmStatus = 'done'; im.useProcessed = true; toast('Watermark removed. Compare and choose which version to keep.'); }
  if (current.name === 'edit' && current.id === p.id) refreshEdit(p);
}
function startWm(im, p) {
  if (im.wmStatus === 'processing') return;
  if (im.wmAttempts >= WM_MAX) { toast('You have used both watermark removal attempts for this photo.', 'bad'); return; }
  if (!state.consentWm) {
    openModal(`<h4>Before you remove a watermark</h4><p>Removing someone else's watermark can infringe their rights. We store this confirmation with your account and project.</p><label class="check" style="margin-top:16px"><input type="checkbox" id="wm-ok"><span>I confirm I have the right to edit these images.</span></label><div class="actions"><button class="btn btn-secondary" data-action="m-close">Cancel</button><button class="btn btn-primary" data-action="wm-consent" data-id="${im.id}">Continue</button></div>`);
    return;
  }
  runWm(im, p);
}

/* ================= submit + render simulation ================= */
function submit(p) {
  const b = blockers(p);
  if (b.length) { toast(b[0], 'bad'); return; }
  state.user.used = (state.user.used || 0) + 1; saveUser();
  p.created = Date.now(); runRender(p, {});
  location.hash = `#/projects/${p.id}`; p.bannerSeen = false;
  setTimeout(showBgModal, 60);
}
function showBgModal() {
  openModal(`<div style="text-align:center"><div class="card-feature ico" style="display:inline-grid;width:56px;height:56px;padding:0;place-items:center;color:var(--primary);margin-bottom:16px">${I.film.replace('<svg', '<svg width="26" height="26"')}</div><h4>Your video is being created.</h4>
   <p class="muted" style="margin-top:8px">This can take several minutes. You don't need to wait here. Close this page and come back later; your video will appear in <b style="color:var(--ink)">My Videos</b> when it's ready.</p>
   <div class="actions" style="justify-content:center"><button class="btn btn-secondary" data-action="m-close">Stay here</button><a class="btn btn-primary" href="#/videos">Go to My Videos</a></div></div>`);
}
const sims = {};
const isBusy = p => ['Fetching photos', 'Queued', 'Creating video', 'Delayed'].includes(p.status);
async function runRender(p, { outcome = state.demo.outcome, resumeAt = 0 } = {}) {
  if (sims[p.id]) sims[p.id].cancel = true;
  const tk = sims[p.id] = { cancel: false, resume: null };
  const alive = () => !tk.cancel && state.projects.includes(p);
  const list = active(p), total = list.length;
  Object.assign(p, { status: 'Queued', step: 'Queued', clipsTotal: total, clipsDone: resumeAt, failure: '', partial: false, skipped: [] }); live(p);
  if (!resumeAt) { await sleep(2000); if (!alive()) return; }
  p.status = 'Creating video'; p.step = 'Preparing photos'; live(p);
  if (!resumeAt) { await sleep(2600); if (!alive()) return; }
  p.step = 'Generating clips'; live(p);
  const cap = outcome === 'fail' ? 2 : outcome === 'partial' ? Math.max(MIN_IMG, total - 2) : total;
  let blockAt = outcome === 'credits' ? Math.max(2, Math.floor(total / 2)) : -1;
  while (p.clipsDone < cap) {
    await sleep(1100); if (!alive()) return;
    p.clipsDone++; live(p);
    if (p.clipsDone === blockAt) {
      p.status = 'Delayed'; live(p); blockAt = -1;
      await new Promise(r => { tk.resume = r; }); if (!alive()) return;
      p.status = 'Creating video'; live(p);
    }
  }
  if (outcome === 'fail') {
    await sleep(900); if (!alive()) return;
    Object.assign(p, { status: 'Failed', failure: `Only ${cap} of ${total} clips could be generated (minimum is ${MIN_IMG}). Your video credit was refunded. You can retry from the last good step.` });
    state.user.used = Math.max(0, (state.user.used || 1) - 1); saveUser(); live(p); toast('A video failed to render. Your credit was refunded.', 'bad'); return;
  }
  if (outcome === 'partial') {
    p.step = 'Retrying failed clips'; live(p); await sleep(2200); if (!alive()) return;
    p.skipped = list.slice(-2).map(i => i.id); p.partial = true; p.failure = `${plural(p.skipped.length, 'photo was', 'photos were')} skipped because their clips could not be generated.`;
  }
  p.step = 'Assembling'; live(p); await sleep(2800); if (!alive()) return;
  p.step = 'Finishing'; live(p); await sleep(1800); if (!alive()) return;
  Object.assign(p, { status: 'Completed', step: '', duration: Math.round(estLen(total - p.skipped.length)) }); live(p);
  if (!(current.name === 'detail' && current.id === p.id)) toast(`"${p.title}" is ready. We've also emailed you.`);
  delete sims[p.id];
}
function live(p) {
  const r = current;
  if (r.name === 'detail' && r.id === p.id) {
    const el = $('#live');
    if (el && el.dataset.cat === p.status) { el.innerHTML = liveBody(p); return; }
    route(); return;
  }
  if (r.name === 'videos') renderGrid();
  const q = $('#quota'); if (q && state.user) q.textContent = `${Math.max(0, QUOTA - (state.user.used || 0))} of ${QUOTA} videos left`;
}

/* ================= project detail ================= */
const STEPS = ['Queued', 'Preparing photos', 'Generating clips', 'Assembling', 'Finishing'];
function pct(p) {
  const t = Math.max(1, p.clipsTotal);
  return ({ Queued: 4, 'Preparing photos': 14, 'Generating clips': 18 + 62 * (p.clipsDone / t), 'Retrying failed clips': 80, Assembling: 88, Finishing: 96 }[p.step] || 4);
}
function liveBody(p) {
  const s = p.status;
  if (s === 'Fetching photos') return `<div class="card-dark"><p class="eyebrow" style="color:var(--on-dark-soft)">Fetching photos</p><h4 style="margin:8px 0 20px">Reading your listing…</h4><div class="code-in" style="min-height:160px">${p.log.map(l => `<span class="s">›</span> ${esc(l)}`).join('\n')}<span class="c"> ▍</span></div><p class="body-sm muted" style="margin-top:16px">You'll land in the image manager automatically.</p></div>`;
  if (s === 'Failed' && p.images.length === 0) return `<div class="card"><span class="chip chip-bad"><i></i>Failed</span><h4 style="margin:16px 0 8px">No photos found</h4><p class="muted" style="margin-bottom:20px">${esc(p.failure)}</p><div class="row"><button class="btn btn-primary" data-action="to-upload" data-id="${p.id}">${I.upload} Switch to Upload</button><a class="btn btn-secondary" href="#/new">Try another link</a></div></div>`;
  if (s === 'Failed') return `<div class="card"><span class="chip chip-bad"><i></i>Failed</span><h4 style="margin:16px 0 8px">We couldn't finish this video</h4><p class="muted" style="margin-bottom:20px;max-width:560px">${esc(p.failure)}</p><div class="row"><button class="btn btn-primary" data-action="retry" data-id="${p.id}">${I.refresh} Retry</button><a class="btn btn-secondary" href="#/videos">Back to My Videos</a></div></div>`;
  if (s === 'Completed') {
    const used = active(p).filter(i => !p.skipped.includes(i.id));
    return `<div class="grid" style="grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:32px;align-items:start" id="done-grid">
      <div class="card-dark" style="padding:16px"><div id="player"></div></div>
      <div class="stack"><div class="card tight"><span class="chip chip-ok"><i></i>Completed</span><p class="title-md" style="margin-top:12px">${fmtTime(p.duration)} · 1920×1080 · 30 fps</p><p class="body-sm muted">${p.music ? 'With soundtrack' : 'Silent track'} · ${plural(used.length, 'clip', 'clips')}</p>
      <div class="row" style="margin-top:16px"><button class="btn btn-primary" data-action="dl-video" data-id="${p.id}">${I.download} Download MP4</button><button class="btn btn-secondary" data-action="del" data-id="${p.id}">${I.trash} Delete</button></div></div>
      ${p.partial ? `<div class="notice warn">${I.warn}<div><b>Partial video.</b> ${esc(p.failure)} They are marked below.</div></div>` : ''}
      <div class="code-card"><div class="code-top"><i></i><i></i><i></i><span>GET /projects/${p.id}/video/download-url</span></div><div class="code-in" id="signed">${signedText(p, false)}</div></div></div></div>`;
  }
  // Queued / Creating / Delayed
  const idx = Math.max(0, STEPS.indexOf(p.step === 'Retrying failed clips' ? 'Generating clips' : p.step));
  const label = i => i === 2 && p.clipsTotal ? `Generating clips (${p.clipsDone} of ${p.clipsTotal})` : STEPS[i];
  return `<div class="card"><div class="row between"><span class="chip chip-${p.status === 'Delayed' ? 'warn' : 'run'}"><i></i>${p.status === 'Delayed' ? 'Delayed' : p.status}</span><span class="caption soft">Only one video at a time</span></div>
   ${p.status === 'Delayed' ? `<div class="notice warn" style="margin-top:16px">${I.clock}<div><b>Delayed, we're on it.</b> Our video provider ran out of capacity. Finished clips are kept and nothing is charged again. Your video will resume automatically.</div></div>` : ''}
   <div class="progress" style="margin-top:20px"><i style="width:${pct(p).toFixed(0)}%"></i></div>
   <ol class="stepper" style="padding:0">${STEPS.map((_, i) => `<li class="${i < idx ? 'done' : i === idx ? 'now' : ''}"><span class="dot">${i < idx ? I.check : ''}</span>${label(i)}${p.step === 'Retrying failed clips' && i === 2 ? ' · retrying failed clips' : ''}</li>`).join('')}</ol></div>`;
}
function signedText(p, fresh) {
  const exp = new Date(Date.now() + 15 * 60000).toISOString().slice(11, 19);
  return fresh ? `<span class="c">// 200 OK</span>\n{ <span class="k">"url"</span>: <span class="s">"https://storage.googleapis.com/reelty-prod/users/u_1/projects/${p.id}/video/final.mp4?X-Goog-Expires=900&X-Goog-Signature=3f9c…"</span>,\n  <span class="k">"expiresAt"</span>: <span class="s">"${exp}Z"</span>,  <span class="c">// 15 minutes</span>\n  <span class="k">"disposition"</span>: <span class="s">"attachment"</span> }` : `<span class="c">// Private bucket. Links are signed per request and expire in 15 minutes.</span>\nusers/{userId}/projects/${p.id}/\n  images/{imageId}/original.jpg\n  images/{imageId}/processed.jpg\n  video/final.mp4\n  video/poster.jpg`;
}
function detailPage(r) {
  const p = proj(r.id); if (!p) { location.hash = '#/videos'; return {}; }
  if (['Draft', 'Ready to edit'].includes(p.status)) { location.hash = `#/projects/${p.id}/edit`; return {}; }
  const busy = ['Queued', 'Creating video', 'Delayed'].includes(p.status);
  const used = active(p);
  const gallery = p.status === 'Completed' ? `<section style="margin-top:56px"><div class="row between" style="margin-bottom:20px"><div><p class="eyebrow">Photos used</p><h4 style="margin-top:4px">In video order</h4></div><button class="btn btn-secondary" data-action="dl-zip" data-id="${p.id}">${I.download} Download all (ZIP)</button></div>
    <div class="gallery">${used.map((im, i) => `<div class="gitem"><div class="gt" style="background-image:url('${curUrl(im)}')">${p.skipped.includes(im.id) ? `<span class="pill warn">${I.warn} Skipped</span>` : `<span class="pill">${i + 1}</span>`}</div><div class="gb"><button class="btn btn-secondary btn-sm" data-action="dl-img" data-id="${im.id}" data-p="${p.id}" data-v="original">${I.download} Original</button>${im.wmStatus === 'done' ? `<button class="btn btn-secondary btn-sm" data-action="dl-img" data-id="${im.id}" data-p="${p.id}" data-v="processed">Cleaned</button>` : ''}</div></div>`).join('')}</div></section>` : '';
  return {
    html: navApp('') + `<main class="page"><div class="container"><div class="page-head"><div><p class="eyebrow"><a href="#/videos" style="color:var(--muted)">My Videos</a> / ${esc(p.source === 'upload' ? 'Upload' : p.source === 'airbnb' ? 'Airbnb' : 'Website')}</p><h2>${esc(p.title || 'Untitled video')}</h2><p class="muted">${esc([p.subtitle, p.location].filter(Boolean).join(' · '))}</p></div>
    <a class="btn btn-secondary" href="#/videos">Back to My Videos</a></div>
    ${busy ? `<div class="notice" style="margin-bottom:24px" id="bgbanner">${I.info}<div><b>Your video is being created.</b> This can take several minutes. You don't need to wait here. Close this page and come back later; it will appear in <a href="#/videos">My Videos</a> when it's ready.</div></div>` : ''}
    <div id="live" data-cat="${p.status}">${liveBody(p)}</div>${gallery}</div></main>` + footer(),
    mount() {
      const host = $('#player'); if (!host) return;
      const pl = mountPlayer(host, p, { autoplay: false });
      return () => pl.destroy();
    },
  };
}

/* ================= video player (simulated from photos) ================= */
const Music = (() => {
  let ctx, master, timer; const ch = [[220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66], [196, 246.94, 311.13]];
  function start() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1);
      let i = 0; const play = () => { ch[i++ % 4].forEach(f => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, ctx.currentTime); g.gain.linearRampToValueAtTime(1, ctx.currentTime + 1); g.gain.linearRampToValueAtTime(0, ctx.currentTime + 4); o.connect(g); g.connect(master); o.start(); o.stop(ctx.currentTime + 4.2); }); };
      play(); timer = setInterval(play, 3000);
    } catch (e) { }
  }
  function stop() { clearInterval(timer); try { if (master && ctx) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + .4); } } catch (e) { } }
  return { start, stop };
})();

function mountPlayer(host, p, { autoplay = false, loop = false, silent = false, minimal = false } = {}) {
  const imgs = active(p).filter(i => !p.skipped.includes(i.id)), N = imgs.length, total = estLen(N), XF = 0.8;
  const layers = [{ s: 0, e: 4, kind: 'title' }];
  imgs.forEach((im, i) => layers.push({ s: 3.2 + 4.2 * i, e: 3.2 + 4.2 * i + 5, kind: 'img', im, i }));
  layers.push({ s: 3.2 + 4.2 * N, e: total, kind: 'end' });
  host.innerHTML = `<div class="player"><div class="pl-stage">${layers.map((L, k) => L.kind === 'img' ? `<div class="pl-layer" data-k="${k}"><div class="kb" style="background-image:url('${curUrl(L.im)}')"></div></div>`
    : L.kind === 'title' ? `<div class="pl-layer pl-card" data-k="${k}"><div class="l">${esc(p.location || '')}</div><div class="t">${esc(p.title || 'Untitled')}</div><div class="bar"></div><div class="s">${esc(p.subtitle || '')}</div></div>`
      : `<div class="pl-layer pl-card" data-k="${k}"><div class="t">${esc(p.closing || p.title || '')}</div><div class="bar"></div><div class="s">Created with Reelty</div></div>`).join('')}
    <div class="pl-fade"></div><span class="pl-badge">AI-generated</span><button class="pl-big" aria-label="Play video"><span>${I.play}</span></button></div>
    ${minimal ? '' : `<div class="pl-ctl"><button data-p="play" aria-label="Play or pause">${I.play}</button><span id="pt" style="min-width:78px">0:00 / ${fmtTime(total)}</span><input type="range" min="0" max="1000" value="0" aria-label="Seek"><span class="hide-m" style="display:flex;gap:6px;align-items:center">${I.music.replace('<svg', '<svg width="16" height="16"')}${p.music ? 'Music on' : 'Music off'}</span><button data-p="fs" aria-label="Fullscreen">${I.expand}</button></div>`}</div>`;
  const els = $$('.pl-layer', host), fade = $('.pl-fade', host), big = $('.pl-big', host), range = $('input[type=range]', host), pt = $('#pt', host);
  let t = 0, playing = false, raf = 0, last = 0, dead = false;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  function draw() {
    layers.forEach((L, k) => {
      const el = els[k], on = t >= L.s && t <= L.e; el.style.display = on ? 'flex' : 'none'; if (L.kind === 'img') el.style.display = on ? 'block' : 'none';
      if (!on) return; el.style.opacity = L.s === 0 ? 1 : clamp((t - L.s) / XF);
      if (L.kind === 'img') { const k2 = clamp((t - L.s) / (L.e - L.s)), dir = L.i % 2 ? -1 : 1; $('.kb', el).style.transform = `scale(${1.04 + .1 * k2}) translate(${dir * (k2 * 2 - 1) * 1.5}%, ${(0.5 - k2) * 1.2}%)`; }
    });
    fade.style.opacity = clamp((t - (total - 1)) / 1);
    if (range) range.value = Math.round(t / total * 1000); if (pt) pt.textContent = `${fmtTime(t)} / ${fmtTime(total)}`;
  }
  function frame(now) {
    if (dead) return; const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (playing) { t += dt; if (t >= total) { if (loop) t = 0; else { t = total; setPlaying(false); } } draw(); }
    raf = requestAnimationFrame(frame);
  }
  function setPlaying(v) {
    playing = v; big.style.display = v ? 'none' : 'grid';
    const b = $('[data-p=play]', host); if (b) b.innerHTML = v ? I.pause : I.play;
    if (!silent && p.music) v ? Music.start() : Music.stop();
  }
  big.onclick = () => { if (t >= total) t = 0; setPlaying(true); };
  host.querySelector('.pl-stage').addEventListener('click', e => { if (e.target.closest('.pl-big')) return; if (playing) setPlaying(false); });
  const pb = $('[data-p=play]', host); if (pb) pb.onclick = () => { if (!playing && t >= total) t = 0; setPlaying(!playing); };
  const fs = $('[data-p=fs]', host); if (fs) fs.onclick = () => { const s = $('.player', host); (s.requestFullscreen || s.webkitRequestFullscreen || (() => { })).call(s); };
  if (range) range.oninput = () => { t = range.value / 1000 * total; draw(); };
  draw(); raf = requestAnimationFrame(t0 => { last = t0; frame(t0); });
  if (autoplay) setPlaying(true);
  return { destroy() { dead = true; cancelAnimationFrame(raf); Music.stop(); } };
}

/* ================= demo panel ================= */
function demoPanel() {
  if (!state.user) return '';
  const o = state.demo.outcome;
  return `<div class="demo ${demoOpen ? 'open' : ''}" id="demo"><div class="panel"><p class="title-sm" style="color:var(--on-dark)">Demo controls</p><p style="margin:4px 0 12px">Choose how the next render ends.</p>
   <label class="caption" for="outcome">Next render outcome</label><select class="select" id="outcome">${[['success', 'Success'], ['partial', 'Partial (2 clips fail, still completes)'], ['fail', 'Failure (under 3 clips, refund)'], ['credits', 'Provider out of credits (Delayed)']].map(([v, l]) => `<option value="${v}" ${o === v ? 'selected' : ''}>${l}</option>`).join('')}</select>
   <button class="btn btn-dark" data-action="resume">Admin: resume delayed renders</button><button class="btn btn-dark" data-action="reset">Reset demo data</button>
   <p>Quota used: ${state.user.used || 0} of ${QUOTA}. Watermark demo: some photos in the website sample carry a watermark, and one fails on its first try.</p></div><button data-action="demo">Demo controls</button></div>`;
}
let demoOpen = false;

/* ================= delegated events ================= */
const downloadData = (url, name) => { const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); };
const A = {
  burger: () => $('#navlinks').classList.toggle('open'),
  menu: () => $('#dd').classList.toggle('open'),
  logout: () => { Object.values(sims).forEach(s => s.cancel = true); state.user = null; saveUser(); state.projects = []; location.hash = '#/'; toast('Logged out. Refresh tokens revoked.'); },
  resend: () => toast('Verification email sent.'),
  'do-verify': () => { state.user.verified = true; saveUser(); toast('Email verified.'); location.hash = '#/new'; },
  cookie: () => { try { localStorage.setItem('reelty.cookies', '1'); } catch (e) { } $('#cookie') && $('#cookie').remove(); },
  filter: el => { state.filter = el.dataset.k; state.page = 1; $$('#ftabs .tab').forEach(t => t.classList.toggle('on', t.dataset.k === state.filter)); renderGrid(); },
  page: el => { state.page += +el.dataset.d; renderGrid(); window.scrollTo(0, 0); },
  ntab: el => { state.newTab = el.dataset.k; $$('#ntabs .tab').forEach(t => t.classList.toggle('on', t.dataset.k === state.newTab)); $('#npanel').innerHTML = newPanel(); bindDrop(); },
  'sample-url': el => { const i = $('#url'); i.value = el.dataset.url; i.focus(); },
  pick: () => $('#file').click(),
  'sample-upload': () => { const p = mkProject({ source: 'upload', status: 'Ready to edit', images: sampleImages(8) }); state.projects.unshift(p); location.hash = `#/projects/${p.id}/edit`; },
  'pick-more': () => { const p = proj(current.id), f = $('#file2'); f.onchange = () => { handleFiles([...f.files], p); f.value = ''; }; f.click(); },
  'sample-more': () => { const p = proj(current.id), room = MAX_IMG - active(p).length; if (room <= 0) return toast(`Maximum is ${MAX_IMG} photos.`, 'bad'); p.images.push(...sampleImages(Math.min(4, room)).map(i => (i.seed += 20, i))); refreshEdit(p); },
  rm: el => { const p = proj(current.id), im = p.images.find(i => i.id === el.dataset.id); im.removed = true; refreshEdit(p); toast('Photo removed. It stays in storage until you delete the project.'); },
  mv: el => { const p = proj(current.id); moveImg(p, el.dataset.id, +el.dataset.d); refreshEdit(p); const c = $(`.icard[data-id="${el.dataset.id}"]`); c && c.focus(); },
  zoom: el => { const p = proj(current.id), im = p.images.find(i => i.id === el.dataset.id); lightbox(im); },
  wm: el => { const p = proj(current.id), im = p.images.find(i => i.id === el.dataset.id); startWm(im, p); },
  'wm-consent': el => { if (!$('#wm-ok').checked) return toast('Please tick the confirmation to continue.', 'bad'); state.consentWm = true; closeModal(); const p = proj(current.id), im = p.images.find(i => i.id === el.dataset.id); runWm(im, p); },
  'wm-keep': el => { const p = proj(current.id); p.images.find(i => i.id === el.dataset.id).useProcessed = true; refreshEdit(p); },
  'wm-revert': el => { const p = proj(current.id); p.images.find(i => i.id === el.dataset.id).useProcessed = false; refreshEdit(p); },
  submit: el => { if (el.getAttribute('aria-disabled') === 'true') { const b = blockers(proj(current.id)); toast(b[0], 'bad'); return; } submit(proj(current.id)); },
  'm-close': closeModal,
  'm-yes': () => { closeModal(); modalResolve && modalResolve(true); }, 'm-no': () => { closeModal(); modalResolve && modalResolve(false); },
  'dl-video': el => { const p = proj(el.dataset.id); toast('Download started. Signed link valid for 15 minutes.'); const s = $('#signed'); if (s) s.innerHTML = signedText(p, true); },
  'dl-zip': () => toast('Building ZIP of the photos used… download started.'),
  'dl-img': el => { const p = proj(el.dataset.p), im = p.images.find(i => i.id === el.dataset.id); const u = imgUrl(im, el.dataset.v === 'processed'); downloadData(u, `photo-${el.dataset.v}.${im.src ? 'jpg' : 'svg'}`); toast(`Downloading ${el.dataset.v} photo.`); },
  del: async el => {
    const p = proj(el.dataset.id);
    if (!await confirmModal({ title: 'Delete this project?', body: `This permanently removes <b>${esc(p.title || 'Untitled video')}</b>, its video, poster and every photo from storage. This cannot be undone.`, ok: 'Delete project', danger: true })) return;
    if (sims[p.id]) sims[p.id].cancel = true; state.projects = state.projects.filter(x => x !== p); toast('Project and all storage files deleted.');
    if (current.name === 'videos') renderGrid(); else location.hash = '#/videos';
  },
  retry: el => { const p = proj(el.dataset.id); if ((state.user.used || 0) >= QUOTA) return toast('Monthly quota reached.', 'bad'); state.user.used = (state.user.used || 0) + 1; saveUser(); runRender(p, { outcome: 'success', resumeAt: p.clipsDone }); toast('Re-queued from the last good step.'); if (current.name === 'detail') route(); else location.hash = `#/projects/${p.id}`; },
  'to-upload': el => { const p = proj(el.dataset.id); Object.assign(p, { source: 'upload', status: 'Draft', failure: '' }); location.hash = `#/projects/${p.id}/edit`; },
  demo: () => { demoOpen = !demoOpen; $('#demo').classList.toggle('open', demoOpen); },
  resume: () => { let n = 0; Object.values(sims).forEach(s => { if (s.resume) { s.resume(); s.resume = null; n++; } }); toast(n ? 'Resumed. Finished clips were not re-submitted.' : 'No delayed renders.'); },
  reset: () => { Object.values(sims).forEach(s => s.cancel = true); state.user.used = 1; state.consentWm = false; seedDemo(); location.hash = '#/videos'; route(); toast('Demo data reset.'); },
};
document.addEventListener('click', e => {
  const sc = e.target.closest('[data-scroll]'); if (sc) { e.preventDefault(); if (current.name !== 'landing') { location.hash = '#/#' + sc.dataset.scroll; } else { const t = document.getElementById(sc.dataset.scroll); t && t.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#/#' + sc.dataset.scroll); } $('#navlinks') && $('#navlinks').classList.remove('open'); return; }
  const el = e.target.closest('[data-action]');
  if (e.target.matches('.overlay[data-dismiss="true"]')) closeModal();
  if (!e.target.closest('.menu-wrap')) { const dd = $('#dd'); dd && dd.classList.remove('open'); }
  if (e.target.closest('#navlinks a')) $('#navlinks').classList.remove('open');
  if (!el || el.tagName === 'SELECT') return;
  const f = A[el.dataset.action]; if (f) { if (el.tagName === 'A') e.preventDefault(); f(el, e); }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.id === 'outcome') { state.demo.outcome = el.value; return; }
  if (el.dataset && el.dataset.action === 'room') { const p = proj(current.id); p.images.find(i => i.id === el.dataset.id).room = el.value; editSave && editSave(); }
});
document.addEventListener('submit', e => {
  const f = e.target.closest('[data-form]'); if (!f) return; e.preventDefault();
  f.dataset.form === 'scrape' ? startScrape(f) : onSubmit(f, f.dataset.form);
});
/* drag and drop reorder (FR-IMG-2), keyboard: Alt+Arrow moves the focused card */
document.addEventListener('dragstart', e => { const c = e.target.closest && e.target.closest('.icard'); if (!c) return; dragId = c.dataset.id; c.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', dragId); } catch (x) { } });
document.addEventListener('dragover', e => {
  const c = e.target.closest && e.target.closest('.icard'); if (!c || !dragId) return; e.preventDefault();
  $$('.icard').forEach(x => x.classList.remove('drop-before', 'drop-after'));
  if (c.dataset.id === dragId) return; const r = c.getBoundingClientRect(); c.classList.add(e.clientX < r.left + r.width / 2 ? 'drop-before' : 'drop-after');
});
document.addEventListener('drop', e => {
  const c = e.target.closest && e.target.closest('.icard'); if (!c || !dragId) return; e.preventDefault();
  const p = proj(current.id), r = c.getBoundingClientRect(), after = e.clientX >= r.left + r.width / 2;
  const from = p.images.find(i => i.id === dragId), to = p.images.find(i => i.id === c.dataset.id);
  if (from && to && from !== to) { p.images.splice(p.images.indexOf(from), 1); let ti = p.images.indexOf(to); if (after) ti++; p.images.splice(ti, 0, from); }
  dragId = null; refreshEdit(p);
});
document.addEventListener('dragend', () => { dragId = null; $$('.icard').forEach(x => x.classList.remove('dragging', 'drop-before', 'drop-after')); });
document.addEventListener('keydown', e => {
  const c = e.target.closest && e.target.closest('.icard'); if (!c || !e.altKey) return;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); const p = proj(current.id); moveImg(p, c.dataset.id, e.key === 'ArrowLeft' ? -1 : 1); refreshEdit(p); const n = $(`.icard[data-id="${c.dataset.id}"]`); n && n.focus(); }
  if (e.key === 'Delete') { const p = proj(current.id); p.images.find(i => i.id === c.dataset.id).removed = true; refreshEdit(p); }
});
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('iadd')) { e.preventDefault(); e.target.click(); } });

/* ================= boot ================= */
if (state.user && !state.projects.length) seedDemo();
if (!location.hash) location.hash = '#/';
route();
