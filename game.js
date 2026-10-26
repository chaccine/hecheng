/* 元件合成 — all artwork, physics and audio are local. Levels are 1–10. */
(() => {
  'use strict';
  const LEVELS = [["电阻", 44, "阻碍电流，单位欧姆 Ω"], ["电容", 54, "通交流、隔直流"], ["电感", 64, "通直流、阻交流"], ["二极管", 74, "单向导电，正向导通"], ["三极管", 86, "小电流控制大电流"], ["MOSFET", 98, "电压控制的开关"], ["运放", 112, "虚短虚断，放大信号"], ["单片机", 126, "一颗芯片就是小电脑"], ["FPGA", 142, "可编程的硬件电路"], ["CPU", 160, "计算机的大脑"]];
  const PARTS = ["<path d=\"M6 50h22M72 50h22\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"26\" y=\"40\" width=\"48\" height=\"20\" rx=\"9\" fill=\"#d9c49a\"/><rect x=\"26\" y=\"40\" width=\"48\" height=\"7\" rx=\"4\" fill=\"#e8d8b4\" opacity=\".7\"/><rect x=\"34\" y=\"40\" width=\"5\" height=\"20\" fill=\"#8a5a2b\"/><rect x=\"43\" y=\"40\" width=\"5\" height=\"20\" fill=\"#222\"/><rect x=\"52\" y=\"40\" width=\"5\" height=\"20\" fill=\"#c0392b\"/><rect x=\"63\" y=\"40\" width=\"4\" height=\"20\" fill=\"#c9a227\"/>", "<path d=\"M42 70v24M58 70v24\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"28\" y=\"14\" width=\"44\" height=\"58\" rx=\"6\" fill=\"#2f4a7a\"/><rect x=\"28\" y=\"14\" width=\"44\" height=\"8\" rx=\"4\" fill=\"#9aa3ad\"/><rect x=\"60\" y=\"22\" width=\"9\" height=\"48\" fill=\"#cfd6df\" opacity=\".85\"/><text x=\"64.5\" y=\"50\" font-size=\"9\" fill=\"#2f4a7a\" text-anchor=\"middle\" font-weight=\"700\">−</text><rect x=\"32\" y=\"24\" width=\"5\" height=\"44\" fill=\"#fff\" opacity=\".12\"/>", "<circle cx=\"50\" cy=\"50\" r=\"34\" fill=\"#3a3d42\"/><circle cx=\"50\" cy=\"50\" r=\"13\" fill=\"#1b1d20\"/><line x1=\"50\" y1=\"50\" x2=\"85.0\" y2=\"50.0\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"82.37181709500595\" y2=\"63.30659452931065\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"74.8819738304297\" y2=\"74.61477967201435\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"63.65530895078806\" y2=\"82.22627092076475\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"50.37786409703936\" y2=\"84.99796020804882\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"37.04367090270495\" y2=\"82.51359002513541\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"25.655283573798428\" y2=\"75.14626775741942\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"17.923031532793075\" y2=\"64.00243171573469\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"15.008158930047507\" y2=\"50.75568415041336\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"17.34842681383438\" y2=\"37.3954465184811\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"24.592369352995103\" y2=\"25.928184428560908\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"35.652077636319305\" y2=\"18.07607286304219\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"48.866583878409635\" y2=\"15.018356701045057\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"62.25130868478619\" y2=\"17.21424950515724\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"73.796108916925\" y2=\"24.333967965152024\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"81.76716476844447\" y2=\"35.30825937560494\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><circle cx=\"50\" cy=\"50\" r=\"14\" fill=\"#1b1d20\"/>", "<path d=\"M6 50h22M72 50h22\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"26\" y=\"40\" width=\"48\" height=\"20\" rx=\"5\" fill=\"#1f2124\"/><rect x=\"60\" y=\"40\" width=\"6\" height=\"20\" fill=\"#c9ced3\"/><rect x=\"28\" y=\"42\" width=\"44\" height=\"4\" rx=\"2\" fill=\"#fff\" opacity=\".1\"/>", "<path d=\"M36 66v28M50 66v28M64 66v28\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M28 66V40a22 22 0 0 1 44 0v26z\" fill=\"#222427\"/><rect x=\"28\" y=\"60\" width=\"44\" height=\"6\" fill=\"#2b2e32\"/><text x=\"50\" y=\"50\" font-size=\"8\" fill=\"#8a8f95\" text-anchor=\"middle\">BJT</text>", "<rect x=\"24\" y=\"6\" width=\"52\" height=\"30\" rx=\"2\" fill=\"#aab1b8\"/><circle cx=\"50\" cy=\"19\" r=\"7\" fill=\"#22252a\"/><rect x=\"24\" y=\"34\" width=\"52\" height=\"38\" rx=\"2\" fill=\"#1f2124\"/><text x=\"50\" y=\"56\" font-size=\"7.5\" fill=\"#8a8f95\" text-anchor=\"middle\">MOS</text><rect x=\"34\" y=\"72\" width=\"5\" height=\"22\" fill=\"#c7ccd1\"/><rect x=\"48\" y=\"72\" width=\"5\" height=\"22\" fill=\"#c7ccd1\"/><rect x=\"62\" y=\"72\" width=\"5\" height=\"22\" fill=\"#c7ccd1\"/>", "<rect x=\"20\" y=\"28\" width=\"60\" height=\"44\" rx=\"3\" fill=\"#1f2124\"/><rect x=\"26\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"41\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"56\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"26\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"41\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"56\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><circle cx=\"28\" cy=\"36\" r=\"2.5\" fill=\"#33363a\"/><path d=\"M20 46a4 4 0 0 1 0 8\" fill=\"#33363a\"/><text x=\"52\" y=\"54\" font-size=\"9\" fill=\"#8a8f95\" text-anchor=\"middle\">OP AMP</text>", "<rect x=\"24\" y=\"24\" width=\"52\" height=\"52\" rx=\"2\" fill=\"#26292d\"/><rect x=\"29\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"36\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"43\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"50\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"57\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"64\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"29\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"36\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"43\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"50\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"57\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"64\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"29\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"29\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"36\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"36\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"43\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"43\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"50\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"50\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"57\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"57\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"64\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"64\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"71\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"71\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><circle cx=\"31\" cy=\"31\" r=\"2\" fill=\"#3a3e43\"/><text x=\"50\" y=\"49\" font-size=\"7\" fill=\"#9aa0a6\" text-anchor=\"middle\">MCU</text><text x=\"50\" y=\"59\" font-size=\"5.5\" fill=\"#6b7076\" text-anchor=\"middle\"></text>", "<rect x=\"12\" y=\"12\" width=\"76\" height=\"76\" rx=\"3\" fill=\"#2f5a3c\"/><rect x=\"24\" y=\"24\" width=\"52\" height=\"52\" rx=\"2\" fill=\"#2a2c30\"/><text x=\"50\" y=\"49\" font-size=\"8\" fill=\"#9aa0a6\" text-anchor=\"middle\">FPGA</text><text x=\"50\" y=\"59\" font-size=\"6\" fill=\"#6b7076\" text-anchor=\"middle\"></text><circle cx=\"17.0\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"17.0\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"23.6\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"23.6\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"30.2\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"30.2\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"36.8\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"36.8\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"43.4\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"43.4\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"50.0\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"50.0\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"56.599999999999994\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"56.599999999999994\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"63.199999999999996\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"63.199999999999996\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"69.8\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"69.8\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"76.4\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"76.4\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"83.0\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"83.0\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/>", "<rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"3\" fill=\"#2f5a3c\"/><rect x=\"13\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"13\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"20\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"20\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"27\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"27\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"34\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"34\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"41\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"41\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"48\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"48\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"55\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"55\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"62\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"62\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"69\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"69\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"76\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"76\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"83\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"83\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"18\" y=\"18\" width=\"64\" height=\"64\" rx=\"5\" fill=\"#b9bfc5\"/><rect x=\"18\" y=\"18\" width=\"64\" height=\"22\" rx=\"5\" fill=\"#d2d7dc\" opacity=\".6\"/><text x=\"50\" y=\"50\" font-size=\"8\" fill=\"#5c6268\" text-anchor=\"middle\" font-weight=\"700\">CPU</text><text x=\"50\" y=\"60\" font-size=\"5.5\" fill=\"#7a8086\" text-anchor=\"middle\"></text>"];
  const { Engine, Bodies, Body, Composite, Events, Sleeping } = Matter;
  const $ = id => document.getElementById(id);
  const app = $('app'), board = $('board'), canvas = $('canvas');
  const ctx = canvas.getContext('2d');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const format = n => n.toLocaleString('en-US');
  const read = (key, fallback) => {
    try { const value = localStorage.getItem('hecheng-' + key); return value === null ? fallback : JSON.parse(value); }
    catch { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem('hecheng-' + key, JSON.stringify(value)); } catch { /* Private browsing may disable storage. */ }
  };
  let best = read('best', 0);
  best = Number.isFinite(best) && best >= 0 ? Math.floor(best) : 0;
  const savedUnlocks = read('unlocked', [1]);
  const unlocked = new Set([1, ...(Array.isArray(savedUnlocks) ? savedUnlocks.filter(n => Number.isInteger(n) && n >= 1 && n <= 10) : [])]);
  let muted = read('muted', false) === true;
  let audio;
  function sound(kind, level = 1) {
    if (muted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audio ||= new AudioContext();
      if (audio.state === 'suspended') audio.resume().catch(() => {});
      const t = audio.currentTime;
      const notes = kind === 'over' ? [220, 165, 110] : kind === 'merge' ? [180 * 2 ** (level / 12), 270 * 2 ** (level / 12)] : [130];
      notes.forEach((frequency, i) => {
        const oscillator = audio.createOscillator(), gain = audio.createGain();
        const start = t + i * .075, duration = kind === 'over' ? .25 : .12;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * (kind === 'drop' ? .55 : 1.05), start + duration);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(.045, start + .008);
        gain.gain.exponentialRampToValueAtTime(.001, start + duration);
        oscillator.connect(gain); gain.connect(audio.destination);
        oscillator.start(start); oscillator.stop(start + duration + .01);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      });
    } catch { /* Audio is optional; gameplay remains available. */ }
  }
  function syncMute() {
    $('mute').setAttribute('aria-pressed', String(muted));
    $('mute').setAttribute('aria-label', muted ? '开启声音' : '关闭声音');
    $('mute').title = muted ? '开启声音' : '关闭声音';
  }
  $('mute').addEventListener('click', () => { muted = !muted; write('muted', muted); syncMute(); if (!muted) sound('drop'); });
  syncMute();

  const sources = PARTS.map(part => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${part}</svg>`));
  const images = sources.map(src => { const image = new Image(); image.src = src; return image; });
  const sprites = new Map();
  function component(level, size) {
    const disc = document.createElement('div'); disc.className = 'component';
    if (size) { disc.style.width = `calc(${size} * var(--u))`; disc.style.height = `calc(${size} * var(--u))`; }
    const image = document.createElement('img'); image.src = sources[level - 1]; image.alt = LEVELS[level - 1][0]; image.draggable = false;
    disc.append(image); return disc;
  }
  function sprite(level) {
    if (sprites.has(level)) return sprites.get(level);
    const radius = LEVELS[level - 1][1] * scale / 2, padding = 6, size = radius * 2 + padding * 2;
    const surface = document.createElement('canvas'); surface.width = surface.height = Math.ceil(size * dpr);
    const c = surface.getContext('2d'); c.scale(dpr, dpr); c.translate(size / 2, size / 2);
    const gradient = c.createRadialGradient(-radius * .2, -radius * .3, 0, -radius * .2, -radius * .3, radius * Math.hypot(1.2, 1.3));
    gradient.addColorStop(0, '#4a5158'); gradient.addColorStop(1, '#3a4046');
    c.beginPath(); c.arc(0, 0, radius - .5, 0, Math.PI * 2);
    c.fillStyle = gradient; c.shadowColor = '#0006'; c.shadowBlur = 4 * dpr; c.shadowOffsetY = 2 * dpr; c.fill();
    c.shadowColor = 'transparent'; c.strokeStyle = '#5a6168'; c.lineWidth = 1; c.stroke();
    const image = images[level - 1];
    if (image.complete && image.naturalWidth) c.drawImage(image, -radius * .8, -radius * .8, radius * 1.6, radius * 1.6);
    const value = { surface, size }; sprites.set(level, value); return value;
  }
  images.forEach(image => image.addEventListener('load', () => sprites.clear()));

  const engine = Engine.create({ enableSleeping: true, positionIterations: 8, velocityIterations: 8 });
  engine.gravity.y = 1.2;
  let width = 0, height = 0, scale = 1, dpr = 1, dangerY = 60, walls = [];
  let score = 0, over = false, dex = false, highest = 1, roundNew = 0, roundBest = best;
  let held = 1, next = 1, aim = 0, readyAt = 0, pointer = null;
  let mergePairs = [], effects = [], toastTimer;
  const pieces = () => Composite.allBodies(engine.world).filter(body => body.plugin.level);
  const now = () => engine.timing.timestamp;
  const randomLevel = () => { const r = Math.random(); return r < .43 ? 1 : r < .71 ? 2 : r < .87 ? 3 : r < .96 ? 4 : 5; };
  const radiusOf = level => LEVELS[level - 1][1] * scale / 2;
  const aimY = () => radiusOf(held) + 6 * scale;
  function clampAim() { const r = radiusOf(held); aim = clamp(aim, r + 1, width - r - 1); }
  function resize() {
    const appWidth = app.clientWidth, appHeight = app.clientHeight;
    const unit = Math.min(appWidth / 390, appHeight / 620);
    app.style.setProperty('--u', `${unit}px`);
    app.style.setProperty('--cell-height', `${Math.min(120 * unit, (appHeight - 124 * unit - 40 * unit) / 5)}px`);
    const previousWidth = width, previousHeight = height, previousScale = scale;
    // Calculate from the stage so resizing also works while 图鉴 hides the board.
    width = Math.max(1, appWidth - 16 * unit - 2);
    height = Math.max(1, appHeight - 260 * unit - 2); scale = width / 372;
    dangerY = 60 * scale; app.style.setProperty('--danger-y', `${dangerY}px`);
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    sprites.clear();
    if (previousWidth) {
      for (const body of pieces()) {
        const factor = scale / previousScale; Body.scale(body, factor, factor);
        const r = radiusOf(body.plugin.level);
        Body.setPosition(body, { x: clamp(body.position.x / previousWidth * width, r, width - r), y: clamp(body.position.y / previousHeight * height, r, height - r) });
        Body.setVelocity(body, { x: 0, y: 0 }); Sleeping.set(body, false);
        body.plugin.dangerSince = null;
      }
      aim *= width / previousWidth;
    } else aim = width / 2;
    walls.forEach(wall => Composite.remove(engine.world, wall));
    const wallOptions = { isStatic: true, friction: .35, restitution: .05 };
    walls = [Bodies.rectangle(-30, height / 2 - 100, 60, height + 400, wallOptions), Bodies.rectangle(width + 30, height / 2 - 100, 60, height + 400, wallOptions), Bodies.rectangle(width / 2, height + 30, width + 120, 60, wallOptions)];
    Composite.add(engine.world, walls); clampAim();
  }
  new ResizeObserver(resize).observe(app);
  function toast(level) {
    clearTimeout(toastTimer);
    const element = $('toast'); element.replaceChildren(document.createTextNode(`解锁新元件 · ${LEVELS[level - 1][0]}`));
    const fact = document.createElement('span'); fact.textContent = LEVELS[level - 1][2]; element.append(fact); element.hidden = false;
    toastTimer = setTimeout(() => { element.hidden = true; }, 3000);
  }
  function unlock(level) {
    highest = Math.max(highest, level);
    if (!unlocked.has(level)) {
      unlocked.add(level); roundNew = Math.max(roundNew, level); write('unlocked', [...unlocked].sort((a, b) => a - b)); toast(level);
    }
    updateProgress();
  }
  function updateProgress() {
    $('progress').replaceChildren(...LEVELS.map((_, i) => { const bar = document.createElement('span'); bar.className = i < highest ? 'reached' : ''; return bar; }));
    $('progress').setAttribute('aria-label', `本局合成进度 ${highest}/10`);
    $('hint').textContent = `合成进度 ${highest}/10 · 点击屏幕落下元件`;
  }
  function updateScore() { $('score').textContent = format(score); $('best').textContent = format(best); }
  function preview() { $('next-piece').replaceChildren(component(next, 44)); }
  function spawn(level, x = width / 2, y = height / 3) {
    level = clamp(Math.floor(Number(level) || 1), 1, 10);
    const r = radiusOf(level);
    x = Number.isFinite(x) ? x : width / 2; y = Number.isFinite(y) ? y : height / 3;
    const body = Bodies.circle(clamp(x, r, width - r), clamp(y, r, height - r), r, {
      restitution: .12, friction: .35, frictionStatic: .7, frictionAir: .008, density: .002, sleepThreshold: 60,
      plugin: { level, born: now(), settled: false, dangerSince: null }
    }, 40);
    Composite.add(engine.world, body); unlock(level); return body;
  }
  function drop() {
    if (over || dex || now() < readyAt || document.hidden) return;
    clampAim(); const body = spawn(held, aim, aimY()); Body.setVelocity(body, { x: 0, y: 1.2 });
    held = next; next = randomLevel(); readyAt = now() + 360; clampAim(); preview(); sound('drop');
  }
  function queueMerges(event) {
    for (const pair of event.pairs) {
      const a = pair.bodyA, b = pair.bodyB;
      if (!a.plugin.level || a.plugin.level !== b.plugin.level) continue;
      const contacts = pair.collision.supports.filter(Boolean);
      const x = contacts.length ? contacts.reduce((sum, p) => sum + p.x, 0) / contacts.length : (a.position.x + b.position.x) / 2;
      const y = contacts.length ? contacts.reduce((sum, p) => sum + p.y, 0) / contacts.length : (a.position.y + b.position.y) / 2;
      mergePairs.push({ a, b, x, y });
    }
  }
  Events.on(engine, 'collisionStart', queueMerges); Events.on(engine, 'collisionActive', queueMerges);
  function merge() {
    const used = new Set(), present = new Set(pieces());
    for (const { a, b, x, y } of mergePairs) {
      if (used.has(a.id) || used.has(b.id) || !present.has(a) || !present.has(b)) continue;
      used.add(a.id); used.add(b.id);
      const level = a.plugin.level, target = Math.min(10, level + 1);
      Composite.remove(engine.world, a); Composite.remove(engine.world, b);
      if (level < 10) {
        const body = spawn(target, x, y);
        Body.setVelocity(body, { x: clamp((a.velocity.x + b.velocity.x) * .25, -2, 2), y: clamp((a.velocity.y + b.velocity.y) * .25, -1, 1) });
        Body.setAngularVelocity(body, (a.angularVelocity + b.angularVelocity) * .25);
      }
      const points = level === 10 ? 2048 : 2 ** level;
      score += points;
      if (score > best) { best = score; write('best', best); }
      effects.push({ x, y, radius: radiusOf(target), born: now(), points, name: level === 10 ? 'CPU ×2' : LEVELS[target - 1][0], sparks: Array.from({ length: 6 }, (_, i) => ({ angle: i * Math.PI / 3 + Math.random() * .3, distance: 15 + Math.random() * 18 })) });
      sound('merge', target); updateScore();
    }
    mergePairs = [];
  }
  function danger() {
    let warning = false;
    for (const body of pieces()) {
      const meta = body.plugin;
      if (now() - meta.born < 1000) continue;
      if (body.speed < 1.2 || body.isSleeping) meta.settled = true;
      if (meta.settled && body.position.y - radiusOf(meta.level) < dangerY) {
        meta.dangerSince ??= now(); warning = true;
        if (now() - meta.dangerSince >= 2000) { gameOver(); break; }
      } else meta.dangerSince = null;
    }
    board.classList.toggle('danger', warning && !over);
  }
  function gameOver() {
    if (over) return;
    over = true; pointer = null; board.classList.remove('danger');
    clearTimeout(toastTimer); $('toast').hidden = true;
    $('round-score').textContent = format(score); $('round-best').textContent = format(best);
    $('new-record').style.visibility = score > roundBest ? 'visible' : 'hidden';
    const level = roundNew || highest;
    $('round-piece').replaceChildren(component(level));
    $('round-part-label').textContent = roundNew ? '解锁新元件' : '本局最高元件';
    $('round-part-name').textContent = LEVELS[level - 1][0]; $('round-part-fact').textContent = LEVELS[level - 1][2];
    $('over-screen').hidden = false; $('game-screen').inert = true; $('restart').focus(); sound('over');
  }
  function reset() {
    for (const body of pieces()) Composite.remove(engine.world, body);
    Engine.clear(engine); mergePairs = []; effects = []; score = 0; over = false; dex = false; highest = 1; roundNew = 0; roundBest = best;
    pointer = null; held = randomLevel(); next = randomLevel(); aim = width / 2; readyAt = 0;
    clearTimeout(toastTimer); $('toast').hidden = true;
    $('over-screen').hidden = true; $('dex-screen').hidden = true; $('game-screen').hidden = false; $('game-screen').inert = false;
    board.classList.remove('danger'); updateScore(); updateProgress(); preview(); clampAim();
  }
  let dexReturnFocus;
  function openDex() {
    if (dex) return;
    dexReturnFocus = document.activeElement; dex = true; pointer = null;
    $('game-screen').hidden = true; $('over-screen').hidden = true; $('dex-screen').hidden = false;
    $('dex-count').textContent = `${unlocked.size}/10`; $('dex-progress-fill').style.width = `${unlocked.size * 10}%`;
    $('dex-grid').replaceChildren(...LEVELS.map(([name, , fact], i) => {
      const cell = document.createElement('article'), known = unlocked.has(i + 1);
      cell.className = 'dex-cell' + (known ? '' : ' locked');
      const disc = component(i + 1); if (!known) { disc.setAttribute('aria-hidden', 'true'); disc.querySelector('img').alt = ''; }
      const title = document.createElement('h2'); title.textContent = `Lv.${i + 1} ${known ? name : '???'}`;
      const description = document.createElement('p'); description.textContent = known ? fact : '未解锁';
      cell.append(disc, title, description); return cell;
    }));
    $('back').focus();
  }
  function closeDex() {
    dex = false; $('dex-screen').hidden = true; $('game-screen').hidden = false; $('over-screen').hidden = !over;
    (dexReturnFocus || (over ? $('restart') : board)).focus();
  }
  $('open-dex').addEventListener('click', openDex); $('over-dex').addEventListener('click', openDex);
  $('back').addEventListener('click', closeDex);
  $('restart').addEventListener('click', () => { reset(); board.focus(); });
  function point(event) { const rect = board.getBoundingClientRect(); aim = event.clientX - rect.left - board.clientLeft; clampAim(); }
  board.addEventListener('pointerdown', event => {
    if (over || dex || pointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault(); pointer = event.pointerId; board.setPointerCapture(pointer); point(event);
    if (!muted) { try { audio?.resume().catch(() => {}); } catch {} }
  });
  board.addEventListener('pointermove', event => { if (pointer === event.pointerId || (event.pointerType === 'mouse' && pointer === null)) point(event); });
  board.addEventListener('pointerup', event => { if (pointer !== event.pointerId) return; point(event); pointer = null; drop(); });
  board.addEventListener('pointercancel', () => { pointer = null; });
  board.addEventListener('lostpointercapture', () => { pointer = null; });
  board.addEventListener('keydown', event => {
    if (over || dex) return;
    if (['ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(event.key)) event.preventDefault();
    if (event.key === 'ArrowLeft') aim -= 12 * scale;
    if (event.key === 'ArrowRight') aim += 12 * scale;
    clampAim(); if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) drop();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dex) closeDex();
    if (event.key === 'Tab' && over && !dex) {
      const first = $('restart'), last = $('over-dex');
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('gesturestart', event => event.preventDefault(), { passive: false });
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('visibilitychange', () => { pointer = null; accumulator = 0; previousTime = performance.now(); });
  function drawDisc(level, x, y, angle = 0, alpha = 1) {
    const { surface, size } = sprite(level); ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.globalAlpha = alpha;
    ctx.drawImage(surface, -size / 2, -size / 2, size, size); ctx.restore();
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function render() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
    if (!over) {
      ctx.save(); ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 1; ctx.setLineDash([4 * scale, 4 * scale]);
      ctx.beginPath(); ctx.moveTo(aim, 0); ctx.lineTo(aim, height - 10); ctx.stroke(); ctx.restore();
      drawDisc(held, aim, aimY(), 0, now() < readyAt ? .35 : 1);
    }
    for (const body of pieces()) drawDisc(body.plugin.level, body.position.x, body.position.y, body.angle);
    effects = effects.filter(effect => now() - effect.born < 700);
    for (const effect of effects) {
      const t = (now() - effect.born) / 700;
      ctx.save(); ctx.globalAlpha = 1 - t; ctx.strokeStyle = '#4fb3a9'; ctx.lineWidth = 1.5;
      if (!reducedMotion) {
        ctx.beginPath(); ctx.arc(effect.x, effect.y, effect.radius * (1 + t * .65), 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#d2e8e5';
        for (const spark of effect.sparks) {
          const distance = effect.radius + spark.distance * scale * t;
          ctx.beginPath(); ctx.arc(effect.x + Math.cos(spark.angle) * distance, effect.y + Math.sin(spark.angle) * distance, 1.5 * scale * (1 - t * .5), 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.fillStyle = '#4fb3a9'; ctx.font = `600 ${13 * scale}px monospace`; ctx.textAlign = 'center';
      ctx.fillText(`+${effect.points} ${effect.name}`, effect.x, effect.y - effect.radius - (12 + (reducedMotion ? 0 : t * 14)) * scale);
      ctx.restore();
    }
  }
  let previousTime = performance.now(), accumulator = 0;
  function frame(time) {
    const delta = Math.min(time - previousTime, 80); previousTime = time;
    if (!over && !dex && !document.hidden) {
      accumulator += delta;
      while (accumulator >= 1000 / 60) {
        Engine.update(engine, 1000 / 60); merge(); danger(); accumulator -= 1000 / 60;
        if (over) { accumulator = 0; break; }
      }
    } else accumulator = 0;
    if (!dex) render();
    requestAnimationFrame(frame);
  }
  resize(); reset();
  window.__game = {
    spawn(level, x, y) { const body = spawn(level, x, y); return { level: body.plugin.level, x: body.position.x, y: body.position.y }; },
    state() { return { score, best, bodies: pieces().map(body => ({ level: body.plugin.level, x: body.position.x, y: body.position.y })), over }; },
    forceGameOver: gameOver,
    reset
  };
  requestAnimationFrame(frame);
  addEventListener('keydown', e => { if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ' || e.key.startsWith('Arrow')) document.body.classList.add('kbd'); }, true);
  addEventListener('pointerdown', () => document.body.classList.remove('kbd'), true);
})();
