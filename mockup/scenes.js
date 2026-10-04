/* Procedural "property photos" so the mockup works offline. Flat line-art rooms in the Reelty palette. */
(function () {
  function rng(seed) {
    let s = (seed * 9301 + 49297) % 233280;
    return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  }
  const WALLS = [['#efe6d6', '#e4d8c3'], ['#f3e3d8', '#e8cfbf'], ['#e6ece4', '#d3ddd0'], ['#ece4ef', '#ddd1e2']];
  const WOOD = ['#b98b64', '#a77a55', '#c79c76'];
  const ACC = ['#cc785c', '#5db8a6', '#e8a55a', '#7d8fb3'];

  const defs = (a, b) => `<defs><linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<linearGradient id="lt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient></defs>`;

  function room(wall, floorY, wood) {
    return `<rect width="800" height="500" fill="url(#w)"/><rect y="${floorY}" width="800" height="${500 - floorY}" fill="${wood}"/>
<rect y="${floorY}" width="800" height="6" fill="#000" opacity=".1"/>` +
      [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${i * 140 - 40} 500L${i * 110 + 60} ${floorY}" stroke="#000" opacity=".07" stroke-width="2"/>`).join('');
  }
  const win = (x, y, w, h, sky = '#bfe0ee') => `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="4" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sky}"/>
<path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}" stroke="#fff" stroke-width="6"/><path d="M${x} ${y + h}L${x + w} ${y}" stroke="url(#lt)" stroke-width="40" opacity=".5"/>`;
  const plant = (x, y, c = '#5f8a62') => `<rect x="${x - 14}" y="${y - 30}" width="28" height="30" rx="4" fill="#cc785c"/><path d="M${x} ${y - 30}c-30-30-34-60-20-76c20 20 24 44 20 76zM${x} ${y - 30}c20-34 40-50 56-52c0 24-22 46-56 52zM${x} ${y - 30}c-10-46 6-70 22-80c10 30 0 58-22 80z" fill="${c}"/>`;

  const SCENES = {
    exterior(r, i) {
      const sky = [['#f6d9c0', '#f1e6d4'], ['#bfe0ee', '#f4efe3'], ['#f3c9b0', '#f6e9d8']][i % 3];
      const wall = WALLS[i % 4][0];
      return `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>
<linearGradient id="lt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient></defs>
<rect width="800" height="500" fill="url(#sk)"/><circle cx="${620 + r() * 80}" cy="90" r="38" fill="#fff" opacity=".8"/>
<path d="M0 360Q200 330 400 350T800 340V500H0z" fill="#9fb58a"/><rect y="420" width="800" height="80" fill="#8fa77c"/>
<rect x="190" y="190" width="420" height="200" fill="${wall}"/><path d="M160 196L400 90L640 196z" fill="#a9583e"/><path d="M160 196L400 90L640 196" fill="none" stroke="#7e3f2c" stroke-width="4"/>
<rect x="215" y="230" width="90" height="80" fill="#bfe0ee" stroke="#fff" stroke-width="8"/><rect x="495" y="230" width="90" height="80" fill="#bfe0ee" stroke="#fff" stroke-width="8"/>
<rect x="355" y="270" width="90" height="120" rx="3" fill="#7b5a43"/><circle cx="430" cy="335" r="4" fill="#e8c37a"/><rect x="190" y="388" width="420" height="8" fill="#000" opacity=".12"/>
<path d="M330 396H470L520 500H280z" fill="#d8cfc0"/>
<circle cx="120" cy="330" r="54" fill="#5f8a62"/><rect x="116" y="360" width="8" height="50" fill="#6b4e37"/><circle cx="690" cy="345" r="40" fill="#6f9a6c"/><rect x="686" y="365" width="8" height="40" fill="#6b4e37"/>
<rect x="190" y="190" width="420" height="200" fill="url(#lt)"/>`;
    },
    living(r, i) {
      const c = ACC[i % 4], wood = WOOD[i % 3], [a, b] = WALLS[i % 4];
      return defs(a, b) + room(a, 340, wood) + win(90 + r() * 30, 80, 190, 170, '#cfe6f0') +
        `<rect x="330" y="90" width="150" height="100" fill="#fff" stroke="#d8cfc0" stroke-width="6"/><circle cx="405" cy="140" r="30" fill="${c}" opacity=".85"/>
<ellipse cx="470" cy="440" rx="240" ry="38" fill="${c}" opacity=".28"/>
<rect x="300" y="290" width="330" height="96" rx="18" fill="${c}"/><rect x="290" y="268" width="350" height="60" rx="22" fill="${c}"/><rect x="290" y="268" width="350" height="60" rx="22" fill="#000" opacity=".1"/>
<rect x="320" y="340" width="290" height="14" fill="#fff" opacity=".22"/><rect x="310" y="386" width="14" height="22" fill="#6b4e37"/><rect x="606" y="386" width="14" height="22" fill="#6b4e37"/>
<rect x="680" y="250" width="6" height="150" fill="#6b4e37"/><path d="M650 250H716L704 200H662z" fill="#f3e3b8"/>
<rect x="440" y="420" width="120" height="44" rx="6" fill="${wood}"/><rect x="440" y="420" width="120" height="8" fill="#000" opacity=".15"/>` + plant(60, 400);
    },
    kitchen(r, i) {
      const c = ['#2f4a45', '#f0ebe1', '#9bb5a6', '#33383f'][i % 4], [a, b] = WALLS[(i + 1) % 4], wood = WOOD[i % 3];
      return defs(a, b) + room(a, 360, wood) +
        `<rect x="40" y="70" width="720" height="120" fill="${c}"/>` + [0, 1, 2, 3, 4, 5].map(k => `<rect x="${52 + k * 118}" y="82" width="106" height="96" fill="#000" opacity=".1"/><rect x="${96 + k * 118}" y="150" width="18" height="4" fill="#e8c37a"/>`).join('') +
        `<rect x="40" y="230" width="720" height="130" fill="${c}"/><rect x="30" y="215" width="740" height="18" fill="#efe9de"/>` +
        [0, 1, 2, 3, 4].map(k => `<rect x="${52 + k * 146}" y="250" width="134" height="100" fill="#000" opacity=".1"/><rect x="${100 + k * 146}" y="262" width="40" height="5" fill="#e8c37a"/>`).join('') +
        `<rect x="150" y="340" width="500" height="20" fill="#000" opacity=".12"/>
<rect x="190" y="380" width="420" height="30" fill="#efe9de"/><rect x="200" y="410" width="400" height="80" fill="${c}"/>
<rect x="230" y="190" width="3" height="60" fill="#333"/><circle cx="231" cy="262" r="16" fill="#f3e3b8"/><rect x="570" y="190" width="3" height="40" fill="#333"/><circle cx="571" cy="242" r="16" fill="#f3e3b8"/>
<rect x="320" y="195" width="160" height="14" rx="3" fill="#cfe6f0" opacity=".9"/>`;
    },
    bedroom(r, i) {
      const c = ACC[(i + 1) % 4], [a, b] = WALLS[(i + 2) % 4], wood = WOOD[(i + 1) % 3];
      return defs(a, b) + room(a, 350, wood) + win(560, 70, 170, 160, '#d9ecf3') +
        `<rect x="150" y="90" width="400" height="230" rx="10" fill="${wood}"/><rect x="165" y="105" width="370" height="200" rx="6" fill="#000" opacity=".1"/>
<rect x="130" y="280" width="440" height="110" rx="12" fill="#fff"/><rect x="130" y="320" width="440" height="80" rx="10" fill="${c}"/><rect x="130" y="320" width="440" height="14" fill="#fff" opacity=".4"/>
<rect x="160" y="258" width="150" height="48" rx="16" fill="#f6f1e8"/><rect x="330" y="258" width="150" height="48" rx="16" fill="#f6f1e8"/>
<ellipse cx="350" cy="450" rx="260" ry="30" fill="${c}" opacity=".25"/>
<rect x="590" y="300" width="90" height="90" fill="${wood}"/><rect x="598" y="310" width="74" height="30" fill="#000" opacity=".1"/><rect x="624" y="230" width="22" height="70" fill="#f3e3b8"/><rect x="40" y="300" width="70" height="90" fill="${wood}"/>` + plant(740, 410);
    },
    bathroom(r, i) {
      const t = ['#dfe9e6', '#efe6dc', '#dde3ee'][i % 3];
      return `<rect width="800" height="500" fill="${t}"/>` +
        Array.from({ length: 10 }, (_, k) => `<path d="M0 ${k * 50}H800" stroke="#fff" stroke-width="3" opacity=".7"/>`).join('') +
        Array.from({ length: 17 }, (_, k) => `<path d="M${k * 50} 0V500" stroke="#fff" stroke-width="3" opacity=".7"/>`).join('') +
        `<defs><radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient><linearGradient id="lt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<rect y="390" width="800" height="110" fill="#b9a58f"/>
<ellipse cx="520" cy="115" rx="86" ry="86" fill="#fff" stroke="#d8cfc0" stroke-width="8"/><ellipse cx="520" cy="115" rx="70" ry="70" fill="#cfe6f0"/><path d="M470 150L560 70" stroke="#fff" stroke-width="22" opacity=".5"/>
<rect x="60" y="250" width="320" height="130" rx="40" fill="#fff"/><rect x="60" y="250" width="320" height="26" rx="13" fill="#e9e4da"/><rect x="90" y="380" width="14" height="16" fill="#9a8c7a"/><rect x="336" y="380" width="14" height="16" fill="#9a8c7a"/>
<rect x="620" y="250" width="26" height="130" fill="#fff"/><rect x="560" y="260" width="150" height="40" rx="10" fill="#fff"/><rect x="580" y="300" width="110" height="90" fill="#9a7a58"/>
<rect x="446" y="300" width="14" height="80" fill="#cc785c" opacity=".0"/><path d="M420 210H470M445 210V250" stroke="#b9b2a6" stroke-width="6"/>` + plant(760, 400) + `<rect x="60" y="400" width="140" height="60" rx="8" fill="#fff" opacity=".7"/>`;
    },
    terrace(r, i) {
      const sea = ['#7fb9cf', '#6aa7c0', '#8ec3d3'][i % 3];
      return `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d3b8"/><stop offset="1" stop-color="#fbeedd"/></linearGradient>
<radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient></defs>
<rect width="800" height="500" fill="url(#sk)"/><circle cx="${450 + r() * 100}" cy="215" r="52" fill="#f6b58b"/><rect y="250" width="800" height="120" fill="${sea}"/>
<path d="M0 250H800" stroke="#fff" opacity=".6" stroke-width="3"/><path d="M80 290h120M360 310h160M600 280h110" stroke="#fff" opacity=".45" stroke-width="3"/>
<path d="M0 250Q120 190 240 250z" fill="#8a9a86" opacity=".7"/><rect y="370" width="800" height="130" fill="#d9c4a4"/>
<rect x="0" y="352" width="800" height="14" fill="#fff"/>` + Array.from({ length: 18 }, (_, k) => `<rect x="${k * 46 + 8}" y="300" width="8" height="56" fill="#fff"/>`).join('') + `<rect x="0" y="296" width="800" height="10" fill="#fff"/>
<rect x="110" y="400" width="160" height="12" rx="6" fill="#7b5a43"/><rect x="120" y="412" width="8" height="60" fill="#7b5a43"/><rect x="252" y="412" width="8" height="60" fill="#7b5a43"/>
<rect x="470" y="400" width="190" height="64" rx="12" fill="#cc785c"/><rect x="470" y="370" width="190" height="50" rx="14" fill="#cc785c"/><rect x="470" y="370" width="190" height="50" rx="14" fill="#000" opacity=".1"/>` + plant(720, 470) + `<path d="M0 0H800V60Q400 20 0 60z" fill="#fff" opacity=".9"/>`;
    },
    other(r, i) {
      const c = ACC[(i + 2) % 4], [a, b] = WALLS[(i + 3) % 4], wood = WOOD[(i + 2) % 3];
      return defs(a, b) + room(a, 360, wood) +
        `<rect x="520" y="100" width="130" height="260" rx="4" fill="${wood}"/><rect x="535" y="115" width="100" height="110" fill="#000" opacity=".1"/><circle cx="628" cy="240" r="6" fill="#e8c37a"/>
<rect x="120" y="140" width="200" height="130" fill="#fff" stroke="#d8cfc0" stroke-width="6"/><path d="M130 260L200 190L250 230L290 180L312 260z" fill="${c}" opacity=".8"/><circle cx="270" cy="170" r="14" fill="#f6d9a0"/>
<rect x="160" y="330" width="260" height="20" rx="4" fill="${wood}"/><rect x="170" y="350" width="10" height="70" fill="${wood}"/><rect x="400" y="350" width="10" height="70" fill="${wood}"/><ellipse cx="400" cy="450" rx="200" ry="28" fill="${c}" opacity=".25"/>` + plant(720, 420);
    },
  };
  const ALIAS = { 'living room': 'living', 'terrace/view': 'terrace' };

  const cache = {};
  function wmMarks(label) {
    return [[90, 120], [330, 250], [560, 380], [560, 90], [90, 400]].map(([x, y]) => `<text x="${x}" y="${y}" transform="rotate(-24 ${x} ${y})" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#fff" fill-opacity=".42" stroke="#000" stroke-opacity=".12">${label}</text>`).join('');
  }
  window.sceneURL = function (scene, seed, wm) {
    const key = scene + '|' + seed + '|' + (wm || '');
    if (cache[key]) return cache[key];
    const fn = SCENES[ALIAS[scene] || scene] || SCENES.other;
    const r = rng(seed + 3);
    const body = fn(r, seed);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">${body}<rect width="800" height="500" fill="url(#vg)"/>${wm ? wmMarks(wm) : ''}</svg>`;
    return (cache[key] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
  };
})();
