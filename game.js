/* 元件合成 2.0 · local artwork, physics and synthesized audio. */
(() => {
  'use strict';
  const LEVELS = [["电阻", 44, "阻碍电流，单位欧姆 Ω"], ["电容", 54, "通交流、隔直流"], ["电感", 64, "通直流、阻交流"], ["二极管", 74, "单向导电，正向导通"], ["三极管", 86, "小电流控制大电流"], ["MOSFET", 98, "电压控制的开关"], ["运放", 112, "虚短虚断，放大信号"], ["单片机", 126, "一颗芯片就是小电脑"], ["FPGA", 142, "可编程的硬件电路"], ["CPU", 160, "计算机的大脑"]];
  const PARTS = ["<path d=\"M6 50h22M72 50h22\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"26\" y=\"40\" width=\"48\" height=\"20\" rx=\"9\" fill=\"#d9c49a\"/><rect x=\"26\" y=\"40\" width=\"48\" height=\"7\" rx=\"4\" fill=\"#e8d8b4\" opacity=\".7\"/><rect x=\"34\" y=\"40\" width=\"5\" height=\"20\" fill=\"#8a5a2b\"/><rect x=\"43\" y=\"40\" width=\"5\" height=\"20\" fill=\"#222\"/><rect x=\"52\" y=\"40\" width=\"5\" height=\"20\" fill=\"#c0392b\"/><rect x=\"63\" y=\"40\" width=\"4\" height=\"20\" fill=\"#c9a227\"/>", "<path d=\"M42 70v24M58 70v24\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"28\" y=\"14\" width=\"44\" height=\"58\" rx=\"6\" fill=\"#2f4a7a\"/><rect x=\"28\" y=\"14\" width=\"44\" height=\"8\" rx=\"4\" fill=\"#9aa3ad\"/><rect x=\"60\" y=\"22\" width=\"9\" height=\"48\" fill=\"#cfd6df\" opacity=\".85\"/><text x=\"64.5\" y=\"50\" font-size=\"9\" fill=\"#2f4a7a\" text-anchor=\"middle\" font-weight=\"700\">−</text><rect x=\"32\" y=\"24\" width=\"5\" height=\"44\" fill=\"#fff\" opacity=\".12\"/>", "<circle cx=\"50\" cy=\"50\" r=\"34\" fill=\"#3a3d42\"/><circle cx=\"50\" cy=\"50\" r=\"13\" fill=\"#1b1d20\"/><line x1=\"50\" y1=\"50\" x2=\"85.0\" y2=\"50.0\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"82.37181709500595\" y2=\"63.30659452931065\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"74.8819738304297\" y2=\"74.61477967201435\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"63.65530895078806\" y2=\"82.22627092076475\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"50.37786409703936\" y2=\"84.99796020804882\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"37.04367090270495\" y2=\"82.51359002513541\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"25.655283573798428\" y2=\"75.14626775741942\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"17.923031532793075\" y2=\"64.00243171573469\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"15.008158930047507\" y2=\"50.75568415041336\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"17.34842681383438\" y2=\"37.3954465184811\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"24.592369352995103\" y2=\"25.928184428560908\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"35.652077636319305\" y2=\"18.07607286304219\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"48.866583878409635\" y2=\"15.018356701045057\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"62.25130868478619\" y2=\"17.21424950515724\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"73.796108916925\" y2=\"24.333967965152024\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><line x1=\"50\" y1=\"50\" x2=\"81.76716476844447\" y2=\"35.30825937560494\" stroke=\"#b8733e\" stroke-width=\"3.2\"/><circle cx=\"50\" cy=\"50\" r=\"14\" fill=\"#1b1d20\"/>", "<path d=\"M6 50h22M72 50h22\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"26\" y=\"40\" width=\"48\" height=\"20\" rx=\"5\" fill=\"#1f2124\"/><rect x=\"60\" y=\"40\" width=\"6\" height=\"20\" fill=\"#c9ced3\"/><rect x=\"28\" y=\"42\" width=\"44\" height=\"4\" rx=\"2\" fill=\"#fff\" opacity=\".1\"/>", "<path d=\"M36 66v28M50 66v28M64 66v28\" stroke=\"#b9bec4\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M28 66V40a22 22 0 0 1 44 0v26z\" fill=\"#222427\"/><rect x=\"28\" y=\"60\" width=\"44\" height=\"6\" fill=\"#2b2e32\"/><text x=\"50\" y=\"50\" font-size=\"8\" fill=\"#8a8f95\" text-anchor=\"middle\">BJT</text>", "<rect x=\"24\" y=\"6\" width=\"52\" height=\"30\" rx=\"2\" fill=\"#aab1b8\"/><circle cx=\"50\" cy=\"19\" r=\"7\" fill=\"#22252a\"/><rect x=\"24\" y=\"34\" width=\"52\" height=\"38\" rx=\"2\" fill=\"#1f2124\"/><text x=\"50\" y=\"56\" font-size=\"7.5\" fill=\"#8a8f95\" text-anchor=\"middle\">MOS</text><rect x=\"34\" y=\"72\" width=\"5\" height=\"22\" fill=\"#c7ccd1\"/><rect x=\"48\" y=\"72\" width=\"5\" height=\"22\" fill=\"#c7ccd1\"/><rect x=\"62\" y=\"72\" width=\"5\" height=\"22\" fill=\"#c7ccd1\"/>", "<rect x=\"20\" y=\"28\" width=\"60\" height=\"44\" rx=\"3\" fill=\"#1f2124\"/><rect x=\"26\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"41\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"56\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"18\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"26\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"41\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"56\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"72\" width=\"4\" height=\"10\" fill=\"#c7ccd1\"/><circle cx=\"28\" cy=\"36\" r=\"2.5\" fill=\"#33363a\"/><path d=\"M20 46a4 4 0 0 1 0 8\" fill=\"#33363a\"/><text x=\"52\" y=\"54\" font-size=\"9\" fill=\"#8a8f95\" text-anchor=\"middle\">OP AMP</text>", "<rect x=\"24\" y=\"24\" width=\"52\" height=\"52\" rx=\"2\" fill=\"#26292d\"/><rect x=\"29\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"36\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"43\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"50\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"57\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"64\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"17\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"29\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"36\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"43\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"50\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"57\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"64\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"71\" y=\"77\" width=\"3\" height=\"6\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"29\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"29\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"36\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"36\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"43\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"43\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"50\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"50\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"57\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"57\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"64\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"64\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"17\" y=\"71\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><rect x=\"77\" y=\"71\" width=\"6\" height=\"3\" fill=\"#c7ccd1\"/><circle cx=\"31\" cy=\"31\" r=\"2\" fill=\"#3a3e43\"/><text x=\"50\" y=\"49\" font-size=\"7\" fill=\"#9aa0a6\" text-anchor=\"middle\">MCU</text><text x=\"50\" y=\"59\" font-size=\"5.5\" fill=\"#6b7076\" text-anchor=\"middle\"></text>", "<rect x=\"12\" y=\"12\" width=\"76\" height=\"76\" rx=\"3\" fill=\"#2f5a3c\"/><rect x=\"24\" y=\"24\" width=\"52\" height=\"52\" rx=\"2\" fill=\"#2a2c30\"/><text x=\"50\" y=\"49\" font-size=\"8\" fill=\"#9aa0a6\" text-anchor=\"middle\">FPGA</text><text x=\"50\" y=\"59\" font-size=\"6\" fill=\"#6b7076\" text-anchor=\"middle\"></text><circle cx=\"17.0\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"17.0\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"23.6\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"23.6\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"30.2\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"30.2\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"36.8\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"36.8\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"43.4\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"43.4\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"50.0\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"50.0\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"56.599999999999994\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"56.599999999999994\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"63.199999999999996\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"63.199999999999996\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"69.8\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"69.8\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"76.4\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"76.4\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"83.0\" cy=\"17\" r=\"1.4\" fill=\"#c9a24a\"/><circle cx=\"83.0\" cy=\"83\" r=\"1.4\" fill=\"#c9a24a\"/>", "<rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" rx=\"3\" fill=\"#2f5a3c\"/><rect x=\"13\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"13\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"20\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"20\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"27\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"27\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"34\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"34\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"41\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"41\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"48\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"48\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"55\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"55\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"62\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"62\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"69\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"69\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"76\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"76\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"83\" y=\"11\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"83\" y=\"86\" width=\"3\" height=\"3\" fill=\"#c9a24a\"/><rect x=\"18\" y=\"18\" width=\"64\" height=\"64\" rx=\"5\" fill=\"#b9bfc5\"/><rect x=\"18\" y=\"18\" width=\"64\" height=\"22\" rx=\"5\" fill=\"#d2d7dc\" opacity=\".6\"/><text x=\"50\" y=\"50\" font-size=\"8\" fill=\"#5c6268\" text-anchor=\"middle\" font-weight=\"700\">CPU</text><text x=\"50\" y=\"60\" font-size=\"5.5\" fill=\"#7a8086\" text-anchor=\"middle\"></text>"];
  const { Engine, Bodies, Body, Composite, Events, Sleeping } = Matter;
  const $ = id => document.getElementById(id);
  const app = $('app'), board = $('board'), canvas = $('canvas'), fxCanvas = $('effects');
  const ctx = canvas.getContext('2d'), fx = fxCanvas.getContext('2d');
  const bgCanvas = $('background-parts'), dustCanvas = $('dust');
  const bg = bgCanvas.getContext('2d'), dustCtx = dustCanvas.getContext('2d');
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const format = n => n.toLocaleString('en-US');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motionPreference.matches;
  // These three existing save formats remain compatible with version 1.
  const read = (key, fallback) => {
    try { const value = localStorage.getItem('hecheng-' + key); return value === null ? fallback : JSON.parse(value); }
    catch { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem('hecheng-' + key, JSON.stringify(value)); } catch { /* Storage is optional. */ }
  };
  let best = read('best', 0);
  best = Number.isFinite(best) && best >= 0 ? Math.floor(best) : 0;
  const savedUnlocks = read('unlocked', [1]);
  const unlocked = new Set([1, ...(Array.isArray(savedUnlocks) ? savedUnlocks.filter(n => Number.isInteger(n) && n >= 1 && n <= 10) : [])]);
  let muted = read('muted', false) === true;
  let musicOn = read('music', false) === true;
  const savedVolume = key => {
    const value = read(key, 80);
    return Number.isFinite(value) ? clamp(Math.round(value), 0, 100) : 80;
  };
  let sfxVolume = savedVolume('sfxVolume'), musicVolume = savedVolume('musicVolume');
  function haptic(pattern) {
    try {
      if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
      if (typeof navigator.vibrate === 'function') navigator.vibrate(pattern);
    } catch { /* Not supported by every browser. */ }
  }

  // Independent volume buses share a master and a gentle limiter, with headroom
  // for overlapping chimes. Never create a context before a user gesture.
  let audio, sfxBus, musicBus, musicDrive, musicFilter, master, compressor, musicTimer, musicStep = 0, musicNext = 0;
  let musicIntensity = 0;
  let audioGesture = false, audioUnlocked = false, lastPreview = -Infinity;
  const musicVoices = new Set(), sfxVoices = new Set();
  const SFX_CAP = 36, CPU_VOICES = 15;
  const PENTATONIC = [0, 2, 4, 7, 9];
  const scaleNote = (step, root = 329.63) => {
    step = clamp(Math.floor(step), 0, 14);
    return root * 2 ** ((PENTATONIC[step % 5] + 12 * Math.floor(step / 5)) / 12);
  };
  function intensifyMusic(value) {
    musicIntensity = clamp(value, 0, 1);
    if (!audio) return;
    const t = audio.currentTime, ramp = musicIntensity ? .18 : .8;
    musicDrive.gain.cancelScheduledValues(t);
    musicDrive.gain.setTargetAtTime(1 + musicIntensity * .2, t, ramp);
    musicFilter.frequency.cancelScheduledValues(t);
    musicFilter.frequency.setTargetAtTime(1350 + musicIntensity * 2850, t, ramp);
  }
  function applyAudioVolumes(timeConstant = .025) {
    if (!audio) return;
    const t = audio.currentTime;
    sfxBus.gain.cancelScheduledValues(t);
    sfxBus.gain.setTargetAtTime(muted ? 0 : sfxVolume / 100, t, timeConstant);
    musicBus.gain.cancelScheduledValues(t);
    musicBus.gain.setTargetAtTime(musicOn && musicTimer && !document.hidden ? musicVolume / 100 : 0, t, timeConstant);
  }
  function ensureAudio() {
    try {
      if (!audio && !audioGesture) return false;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      if (!audio) {
        audio = new AudioContext();
        master = audio.createGain(); master.gain.value = .85;
        compressor = audio.createDynamicsCompressor();
        compressor.threshold.value = -10; compressor.knee.value = 6; compressor.ratio.value = 8;
        compressor.attack.value = .003; compressor.release.value = .2;
        master.connect(compressor); compressor.connect(audio.destination);
        sfxBus = audio.createGain(); sfxBus.gain.value = muted ? 0 : sfxVolume / 100; sfxBus.connect(master);
        musicBus = audio.createGain(); musicBus.gain.value = 0;
        musicDrive = audio.createGain(); musicDrive.gain.value = 1 + musicIntensity * .2;
        musicFilter = audio.createBiquadFilter(); musicFilter.type = 'lowpass';
        musicFilter.frequency.value = 1350 + musicIntensity * 2850; musicFilter.Q.value = .5;
        musicBus.connect(musicDrive); musicDrive.connect(musicFilter); musicFilter.connect(master);
      }
      if (audio.state === 'suspended' || audio.state === 'interrupted') audio.resume().catch(() => {});
      return true;
    } catch { return false; }
  }
  function unlockAudio() {
    audioGesture = true;
    if (!ensureAudio()) return;
    // iOS needs a buffer started inside the gesture, even when it is silent.
    if (!audioUnlocked) {
      try {
        const source = audio.createBufferSource();
        source.buffer = audio.createBuffer(1, 1, audio.sampleRate);
        source.connect(master);
        source.onended = () => { audioUnlocked = audio.state === 'running'; source.disconnect(); };
        source.start(0);
      } catch { /* A later gesture can retry the unlock. */ }
    }
    if (musicOn) startMusic();
  }
  for (const type of ['pointerdown', 'touchend', 'keydown']) {
    document.addEventListener(type, unlockAudio, { capture: true, passive: true });
  }
  function tone(bus, frequency, start, duration, volume, type = 'sine', attack = .025, tracked = false) {
    const oscillator = audio.createOscillator(), gain = audio.createGain();
    oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + attack);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    gain.gain.linearRampToValueAtTime(0, start + duration + .03);
    oscillator.connect(gain); gain.connect(bus); oscillator.start(start); oscillator.stop(start + duration + .05);
    const voices = tracked ? musicVoices : sfxVoices;
    voices.add(oscillator);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); voices.delete(oscillator); };
  }
  function sound(kind, level = 1, detail = 1) {
    if (muted || sfxVolume === 0 || !ensureAudio()) return;
    try {
      level = clamp(Number(level) || 1, 1, 10);
      const t = audio.currentTime + .008;
      // Keep room for the climax even in a dense merge/clear cascade.
      const voiceLimit = kind === 'cpu' ? SFX_CAP : SFX_CAP - CPU_VOICES;
      if (kind === 'impact') {
        if (sfxVoices.size + 2 > voiceLimit) return;
        const frequency = 860 / (1 + (level - 1) * .42);
        const strength = clamp(detail / 9, .2, 1), duration = .065 + level * .009;
        tone(sfxBus, frequency, t, duration, .045 * strength, level < 5 ? 'triangle' : 'sine', .002);
        tone(sfxBus, frequency * 2.4, t, duration * .42, .018 * strength, 'sine', .001);
        return;
      }
      if (kind === 'clear') {
        if (sfxVoices.size + 2 > voiceLimit) return;
        const frequency = scaleNote(detail, 261.63);
        tone(sfxBus, frequency, t, .16, .09, 'sine', .003);
        tone(sfxBus, frequency * 2, t, .075, .026, 'triangle', .002);
        return;
      }
      const notes = kind === 'unlock' ? [523.25, 659.25, 783.99, 1046.5]
        : kind === 'over' ? [783.99, 659.25, 523.25]
          : kind === 'cpu' ? [523.25, 659.25, 783.99, 1046.5, 1567.98]
            : kind === 'merge' ? [scaleNote(detail - 1)] : [587.33];
      const duration = kind === 'drop' ? .24 : kind === 'preview' ? .3 : kind === 'cpu' ? .85 : .48;
      const volume = kind === 'drop' || kind === 'preview' ? .085 : .115;
      notes.forEach((frequency, i) => {
        // Bound dense merge cascades; each soft chime has a fundamental,
        // a fifth and an octave, concentrated in phone-friendly midrange.
        if (sfxVoices.size + 3 > voiceLimit) return;
        const start = t + i * .09;
        tone(sfxBus, frequency, start, duration, volume, 'sine', .018);
        tone(sfxBus, frequency * 1.5, start, duration * .75, volume * .28, 'sine', .025);
        tone(sfxBus, frequency * 2, start, duration * .85, volume * .36, 'sine', .022);
      });
    } catch { /* Audio never blocks play. */ }
  }
  function scheduleMusic() {
    if (!musicOn || !audio || document.hidden) return;
    const chords = [[130.81, 164.81, 196], [110, 130.81, 164.81], [87.31, 130.81, 174.61], [98, 146.83, 196]];
    while (musicNext < audio.currentTime + .4) {
      const chord = chords[Math.floor(musicStep / 8) % chords.length];
      if (musicStep % 8 === 0) chord.forEach(f => {
        tone(musicBus, f * 4, musicNext, 6.8, .045, 'sine', 1.4, true);
        tone(musicBus, f * 8, musicNext, 5.8, .012, 'sine', 1.2, true);
      });
      const frequency = chord[[0, 2, 1, 2][musicStep % 4]] * 8;
      tone(musicBus, frequency, musicNext, 2.2, .034, 'sine', .09, true);
      tone(musicBus, frequency * 2, musicNext, 1.8, .011, 'sine', .12, true);
      musicStep++; musicNext += .85;
    }
  }
  function stopMusic() {
    clearInterval(musicTimer); musicTimer = null;
    if (!audio) return;
    musicBus.gain.cancelScheduledValues(audio.currentTime);
    musicBus.gain.setTargetAtTime(0, audio.currentTime, .12);
    // End sustained voices after the fade, including already scheduled notes.
    for (const voice of musicVoices) { try { voice.stop(audio.currentTime + .65); } catch {} }
    musicVoices.clear();
  }
  function startMusic() {
    if (!musicOn || musicTimer || document.hidden || !ensureAudio()) return;
    musicBus.gain.cancelScheduledValues(audio.currentTime);
    musicBus.gain.setTargetAtTime(musicVolume / 100, audio.currentTime, .5);
    musicNext = audio.currentTime + .06; scheduleMusic();
    musicTimer = setInterval(scheduleMusic, 200);
  }
  function syncAudioButtons() {
    $('mute').setAttribute('aria-pressed', String(muted));
    $('mute').setAttribute('aria-label', muted ? '开启音效' : '关闭音效');
    $('mute').title = muted ? '开启音效' : '关闭音效';
    $('settings-mute').setAttribute('aria-pressed', String(!muted));
    $('settings-mute').querySelector('.toggle-label').textContent = muted ? '已关闭' : '已开启';
    $('music').setAttribute('aria-pressed', String(musicOn));
    $('music').setAttribute('aria-label', musicOn ? '关闭背景音乐' : '开启背景音乐');
    $('music').title = musicOn ? '关闭背景音乐' : '开启背景音乐';
    $('music').querySelector('.toggle-label').textContent = musicOn ? '已开启' : '已关闭';
    for (const [kind, volume] of [['sfx', sfxVolume], ['music', musicVolume]]) {
      const slider = $(kind + '-volume');
      slider.value = volume; slider.style.setProperty('--volume', `${volume}%`);
      slider.setAttribute('aria-valuetext', `${volume}%`);
      $(kind + '-percent').textContent = `${volume}%`;
    }
  }
  function toggleMute() {
    muted = !muted; write('muted', muted); syncAudioButtons();
    if (ensureAudio()) applyAudioVolumes();
    if (!muted) sound('drop');
  }
  function setMusic(on) {
    musicOn = Boolean(on); write('music', musicOn); syncAudioButtons();
    if (musicOn) startMusic(); else stopMusic();
  }
  $('mute').addEventListener('click', toggleMute);
  $('settings-mute').addEventListener('click', toggleMute);
  $('music').addEventListener('click', () => setMusic(!musicOn));
  for (const kind of ['sfx', 'music']) $(kind + '-volume').addEventListener('input', event => {
    const volume = clamp(Math.round(Number(event.target.value)), 0, 100);
    if (kind === 'sfx') sfxVolume = volume; else musicVolume = volume;
    write(kind + 'Volume', volume); syncAudioButtons();
    if (ensureAudio()) applyAudioVolumes();
    if (kind === 'sfx' && performance.now() - lastPreview >= 100) {
      lastPreview = performance.now(); sound('preview');
    }
  });
  syncAudioButtons();

  // Long axial leads fit inside the disc even in the smallest previews.
  PARTS[0] = '<path d="M1 50h31m36 0h31" stroke="url(#leadMetal)" stroke-width="3.4" stroke-linecap="round"/><rect x="30" y="39" width="40" height="22" rx="8" fill="#d9c49a"/><rect x="30" y="39" width="40" height="9" rx="5" fill="#f0dfb7" opacity=".65"/><path d="M37 39v22" stroke="#8a5a2b" stroke-width="4"/><path d="M45 39v22" stroke="#292421" stroke-width="4"/><path d="M53 39v22" stroke="#b34e3a" stroke-width="4"/><path d="M63 39v22" stroke="#cba653" stroke-width="3"/>';
  PARTS[3] = '<path d="M1 50h31m36 0h31" stroke="url(#leadMetal)" stroke-width="3.4" stroke-linecap="round"/><rect x="30" y="39" width="40" height="22" rx="5" fill="#202729"/><rect x="59" y="39" width="5" height="22" fill="url(#metal)"/><path d="M34 43h22" stroke="#fff" stroke-opacity=".14" stroke-width="3" stroke-linecap="round"/>';
  const DEFS = `<defs>
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#8d8f92"/><stop offset=".42" stop-color="#f4f2ee"/><stop offset=".6" stop-color="#c9c7c3"/><stop offset="1" stop-color="#7b7d80"/></linearGradient>
    <linearGradient id="leadMetal" gradientUnits="userSpaceOnUse" x1="0" y1="48.3" x2="0" y2="51.7"><stop stop-color="#8d8f92"/><stop offset=".42" stop-color="#f4f2ee"/><stop offset=".6" stop-color="#c9c7c3"/><stop offset="1" stop-color="#7b7d80"/></linearGradient>
    <linearGradient id="cap" x1="0" x2="1"><stop stop-color="#263c66"/><stop offset=".3" stop-color="#416092"/><stop offset="1" stop-color="#243858"/></linearGradient>
    <radialGradient id="disc" cx="35%" cy="28%" r="80%"><stop stop-color="#5b544d"/><stop offset=".58" stop-color="#3a3530"/><stop offset="1" stop-color="#2a2622"/></radialGradient>
    <linearGradient id="sheen" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".12"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <pattern id="texture" width="2.4" height="2.4" patternUnits="userSpaceOnUse"><rect width=".75" height=".75" fill="#fff" opacity=".055"/></pattern>
    <filter id="shadow" x="-35%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="5" stdDeviation="3.4" flood-color="#000" flood-opacity=".6"/></filter>
    <filter id="partShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#000" flood-opacity=".45"/></filter>
  </defs>`;
  function artwork(part, i) {
    part = part.replaceAll('fill="#c7ccd1"', 'fill="url(#metal)"')
      .replaceAll('stroke="#b9bec4"', 'stroke="url(#metal)"')
      .replaceAll('fill="#aab1b8"', 'fill="url(#metal)"')
      .replaceAll('fill="#b9bfc5"', 'fill="url(#metal)"')
      .replaceAll('fill="#c9a24a"', 'fill="#d9b468"')
      .replaceAll('fill="#2f4a7a"', 'fill="url(#cap)"');
    const size = i === 0 || i === 3 ? .88 : .8;
    const textureShapes = [null, null, null, null, '<path d="M28 66V40a22 22 0 0 1 44 0v26z"/>', '<rect x="24" y="34" width="52" height="38"/>', '<rect x="20" y="28" width="60" height="44"/>', '<rect x="24" y="24" width="52" height="52"/>', '<rect x="24" y="24" width="52" height="52"/>', '<rect x="18" y="18" width="64" height="64" rx="5"/>'];
    const texture = i >= 4 ? `<clipPath id="chipClip">${textureShapes[i]}</clipPath><rect x="8" y="8" width="84" height="84" fill="url(#texture)" clip-path="url(#chipClip)"/>` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="-14 -14 128 128">${DEFS}
      <circle cx="50" cy="50" r="49.5" fill="url(#disc)" filter="url(#shadow)"/>
      <circle cx="50" cy="50" r="49" fill="url(#sheen)" stroke="#ffffff22" stroke-width=".7"/>
      <g transform="translate(${50 * (1 - size)} ${50 * (1 - size)}) scale(${size})"><g filter="url(#partShadow)">${part}</g>${texture}</g></svg>`;
  }
  const sources = PARTS.map((part, i) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(artwork(part, i)));
  const sprites = new Map();
  const images = sources.map(src => {
    const img = new Image(); img.src = src; return img;
  });
  function component(level, size) {
    const disc = document.createElement('div'); disc.className = 'component';
    if (size) { disc.style.width = `calc(${size} * var(--u))`; disc.style.height = `calc(${size} * var(--u))`; }
    const img = document.createElement('img'); img.src = sources[level - 1]; img.alt = LEVELS[level - 1][0]; img.draggable = false;
    disc.append(img); return disc;
  }
  function prepareSprites() {
    // The SVG, gradients, texture and shadows are rasterized once per DPR.
    for (let level = 1; level <= 10; level++) {
      const img = images[level - 1];
      if (sprites.has(level) || !img.complete || !img.naturalWidth) continue;
      const surface = document.createElement('canvas');
      surface.width = surface.height = Math.ceil(224 * 1.28 * dpr);
      surface.getContext('2d').drawImage(img, 0, 0, surface.width, surface.height);
      sprites.set(level, surface);
    }
  }
  function discOn(c, level, x, y, diameter, angle = 0, alpha = 1, stretch = 0, stretchAngle = 0) {
    const surface = sprites.get(level); if (!surface) return;
    const size = diameter * 1.28;
    c.save(); c.translate(x, y); c.rotate(stretchAngle);
    // Only pixels stretch: the Matter circle and its contacts never change.
    c.scale(1 / (1 + stretch), 1 + stretch); c.rotate(angle - stretchAngle); c.globalAlpha = alpha;
    c.drawImage(surface, -size / 2, -size / 2, size, size); c.restore();
  }
  $('title-cpu').append(component(10)); $('title-mcu').append(component(8));
  $('title-bjt').append(component(5)); $('title-cap').append(component(2));

  const engine = Engine.create({ enableSleeping: true, positionIterations: 8, velocityIterations: 8 });
  engine.gravity.y = 1.06;
  let width = 0, height = 0, scale = 1, unit = 1, dpr = 1, appWidth = 0, appHeight = 0;
  let dangerY = 74, boardX = 0, boardY = 0, walls = [];
  let score = 0, over = false, screen = 'title', highest = 1, roundBest = best;
  let held = 1, next = 1, aim = 0, heldX = 0, readyAt = 0, pointer = null;
  let mergePairs = [], effects = [], unlockQueue = [], unlockShowing = false;
  const COMBO_WINDOW = 1200, CLEAR_MERGES = 15, MAX_EFFECTS = 8, MAX_SPARKS = 6;
  let combo = 0, maxCombo = 0, merges = 0, comboUntil = 0;
  let feedbackTime = 0, roundTime = 0, hitStopUntil = 0;
  let shakeUntil = 0, shakePower = 0, shakeX = 0, shakeY = 0, heldSway = 0;
  let cpuFlashAt = -Infinity, lastImpactSound = -Infinity;
  let clearProgress = CLEAR_MERGES, clearing = false, clearQueue = [], clearElapsed = 0, clearIndex = 0;
  let comboLabel = null;
  let dexReturn = 'title', dexReturnFocus, unlockReturnFocus;
  let settingsOpen = false, settingsReturnFocus;
  const pieces = () => Composite.allBodies(engine.world).filter(body => body.plugin.level);
  const now = () => engine.timing.timestamp;
  // Spawn levels 1–3; even the largest held part fits above the warning line.
  const randomLevel = () => { const r = Math.random(); return r < .5 ? 1 : r < .82 ? 2 : 3; };
  const radiusOf = level => LEVELS[level - 1][1] * scale / 2;
  const aimY = () => dangerY - radiusOf(held) - 6 * scale;
  const roundActive = () => screen === 'game' && !over && !unlockShowing && !settingsOpen && !document.hidden;
  const playing = () => roundActive() && !clearing;
  const clearReady = () => clearProgress >= CLEAR_MERGES;
  motionPreference.addEventListener?.('change', event => {
    reducedMotion = event.matches; shakeX = shakeY = heldSway = 0;
    shakeUntil = 0; lastDust = 0; needsRender = true;
  });
  function clampAim() {
    const r = radiusOf(held); aim = clamp(aim, r + 1, width - r - 1); heldX = clamp(heldX, r + 1, width - r - 1);
  }
  const dustMotes = Array.from({ length: 11 }, (_, i) => ({
    x: ((i * 137 + 55) % 389) / 390, y: ((i * 223 + 57) % 841) / 844,
    radius: [1, 1.1, 1.5, 2.5][i % 4], phase: i * 1.8, speed: .35 + (i % 3) * .14
  }));
  function glowSurface() {
    const surface = document.createElement('canvas'); surface.width = surface.height = 64;
    const c = surface.getContext('2d'), g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, '#fff1d6'); g.addColorStop(.16, '#ffe6bdcc'); g.addColorStop(.4, '#ffd49a35'); g.addColorStop(1, '#ffd49a00');
    c.fillStyle = g; c.fillRect(0, 0, 64, 64); return surface;
  }
  const glow = glowSurface();
  function paintBackground() {
    bg.setTransform(dpr, 0, 0, dpr, 0, 0); bg.clearRect(0, 0, appWidth, appHeight);
    // Static blur is baked into this canvas only on load / resize.
    bg.save(); bg.filter = `blur(${7 * unit}px)`;
    discOn(bg, 9, 45 * unit, appHeight * .77, 180 * unit, -.22, .19);
    discOn(bg, 6, appWidth - 26 * unit, appHeight * .83, 140 * unit, .26, .17);
    bg.restore();
  }
  function sizeCanvas(element, w, h) {
    element.width = Math.max(1, Math.round(w * dpr)); element.height = Math.max(1, Math.round(h * dpr));
  }
  function resize() {
    const newWidth = app.clientWidth, newHeight = app.clientHeight;
    const newDpr = Math.min(window.devicePixelRatio || 1, 3);
    if (newWidth === appWidth && newHeight === appHeight && newDpr === dpr && width) return;
    const previousWidth = width, previousHeight = height, previousScale = scale;
    if (newDpr !== dpr) sprites.clear();
    appWidth = newWidth; appHeight = newHeight; dpr = newDpr;
    unit = Math.min(appWidth / 390, appHeight / 760);
    app.style.setProperty('--u', `${unit}px`);
    const top = 182 * unit, bottom = 118 * unit;
    app.style.setProperty('--board-top', `${top}px`); app.style.setProperty('--board-bottom', `${bottom}px`);
    boardX = 12 * unit + 1; boardY = top + 1;
    width = Math.max(1, appWidth - 24 * unit - 2); height = Math.max(1, appHeight - top - bottom - 2);
    scale = width / 364; dangerY = 74 * scale;
    app.style.setProperty('--danger-y', `${dangerY}px`);
    sizeCanvas(canvas, width, height); sizeCanvas(fxCanvas, appWidth, appHeight);
    sizeCanvas(bgCanvas, appWidth, appHeight); sizeCanvas(dustCanvas, appWidth, appHeight);
    prepareSprites(); paintBackground();
    if (previousWidth) {
      for (const body of pieces()) {
        const factor = scale / previousScale; Body.scale(body, factor, factor);
        const r = radiusOf(body.plugin.level);
        Body.setPosition(body, { x: clamp(body.position.x / previousWidth * width, r, width - r), y: clamp(body.position.y / previousHeight * height, r, height - r) });
        Body.setVelocity(body, { x: 0, y: 0 }); Sleeping.set(body, false); body.plugin.dangerSince = null;
      }
      aim *= width / previousWidth; heldX *= width / previousWidth;
      effects = []; // Coordinates belong to the previous board dimensions.
    } else aim = heldX = width / 2;
    walls.forEach(wall => Composite.remove(engine.world, wall));
    const wallOptions = { isStatic: true, friction: .3, restitution: .08 };
    walls = [Bodies.rectangle(-30, height / 2 - 100, 60, height + 400, wallOptions), Bodies.rectangle(width + 30, height / 2 - 100, 60, height + 400, wallOptions), Bodies.rectangle(width / 2, height + 30, width + 120, 60, wallOptions)];
    Composite.add(engine.world, walls); clampAim(); needsRender = true;
  }

  function syncScreens() {
    $('title-screen').hidden = screen !== 'title';
    $('game-screen').hidden = screen !== 'game' && screen !== 'over';
    $('dex-screen').hidden = screen !== 'dex';
    $('over-screen').hidden = screen !== 'over';
    $('unlock-screen').hidden = !unlockShowing;
    $('settings-screen').hidden = !settingsOpen;
    $('open-settings').setAttribute('aria-expanded', String(settingsOpen));
    $('game-screen').inert = screen !== 'game' || unlockShowing || settingsOpen;
    $('title-screen').inert = unlockShowing || settingsOpen;
    $('dex-screen').inert = unlockShowing || settingsOpen;
    $('over-screen').inert = unlockShowing || settingsOpen;
    $('unlock-screen').inert = settingsOpen;
    pointer = null; accumulator = 0; needsRender = true; updateClearUI();
  }
  function openSettings() {
    if (settingsOpen || clearing) return;
    settingsReturnFocus = document.activeElement;
    settingsOpen = true; syncAudioButtons(); syncScreens();
    $('close-settings').focus({ preventScroll: true });
  }
  function closeSettings() {
    if (!settingsOpen) return;
    settingsOpen = false; syncScreens();
    if (!unlockShowing && unlockQueue.length && screen === 'game') showNextUnlock();
    else {
      const fallback = unlockShowing ? $('unlock-screen').querySelector('.unlock-card')
        : screen === 'game' ? board : screen === 'dex' ? $('back') : screen === 'over' ? $('restart') : $('start');
      (settingsReturnFocus?.isConnected && settingsReturnFocus !== document.body && !settingsReturnFocus.closest('[hidden], [inert]')
        ? settingsReturnFocus : fallback).focus({ preventScroll: true });
    }
  }
  $('open-settings').addEventListener('click', openSettings);
  $('close-settings').addEventListener('click', closeSettings);
  $('settings-screen').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeSettings();
  });
  function updateProgress() {
    $('progress').replaceChildren(...LEVELS.map((_, i) => {
      const bar = document.createElement('span'); bar.className = i < highest ? 'reached' : ''; return bar;
    }));
    $('progress').setAttribute('aria-label', `本局合成进度 ${highest}/10`);
    $('hint').textContent = `合成进度 ${highest}/10 · 点击屏幕落下元件`;
    $('title-count').textContent = `${unlocked.size}/10`;
  }
  function updateScore() {
    $('score').textContent = format(score); $('best').textContent = format(best); $('title-best').textContent = format(best);
  }
  function award(points) {
    score += points;
    if (score > best) { best = score; write('best', best); }
    updateScore();
  }
  function updateClearUI() {
    const button = $('clear-screen'), empty = pieces().length === 0;
    const charged = clearReady(), count = Math.floor(clearProgress);
    button.disabled = !playing() || !charged || empty;
    button.dataset.ready = String(charged);
    $('clear-ring').style.strokeDashoffset = String(1 - clearProgress / CLEAR_MERGES);
    $('clear-status').textContent = clearing ? '释放中…' : charged ? '已充能' : `${count}/${CLEAR_MERGES} 次合成`;
    button.setAttribute('aria-label', clearing ? '清屏，释放中' : charged ? `清屏，已充能${empty ? '，棋盘为空' : ''}` : `清屏，还需 ${Math.ceil(CLEAR_MERGES - clearProgress)} 次合成`);
    board.setAttribute('aria-busy', String(clearing));
    $('open-settings').disabled = clearing; $('open-dex').disabled = clearing;
  }
  function preview() { $('next-piece').replaceChildren(component(next)); }
  function showNextUnlock() {
    if (unlockShowing || settingsOpen || !unlockQueue.length || screen !== 'game') return;
    const level = unlockQueue.shift(); unlockShowing = true;
    unlockReturnFocus = document.activeElement;
    $('unlock-level').textContent = `NEW · LV.${level}`;
    $('unlock-piece').replaceChildren(component(level));
    $('unlock-name').textContent = LEVELS[level - 1][0];
    $('unlock-fact').textContent = LEVELS[level - 1][2];
    $('unlock-number').textContent = `No.${String(level).padStart(2, '0')} / 10`;
    syncScreens(); $('unlock-screen').querySelector('.unlock-card').focus({ preventScroll: true });
    haptic([12, 65, 20]); if (level < 10) sound('unlock', level);
  }
  function dismissUnlock() {
    if (!unlockShowing) return;
    unlockShowing = false; syncScreens();
    if (unlockQueue.length) showNextUnlock();
    else if (screen === 'game') (unlockReturnFocus?.isConnected && !unlockReturnFocus.closest('[hidden]') ? unlockReturnFocus : board).focus({ preventScroll: true });
  }
  function unlock(level) {
    const previousHighest = highest;
    highest = Math.max(highest, level);
    if (!unlocked.has(level)) {
      unlocked.add(level); write('unlocked', [...unlocked].sort((a, b) => a - b));
      unlockQueue.push(level); showNextUnlock(); updateProgress();
    } else if (highest !== previousHighest) updateProgress();
  }
  function spawn(level, x = width / 2, y = height / 3, merged = false) {
    level = clamp(Math.floor(Number(level) || 1), 1, 10);
    const r = radiusOf(level);
    x = Number.isFinite(x) ? x : width / 2; y = Number.isFinite(y) ? y : height / 3;
    const body = Bodies.circle(clamp(x, r, width - r), clamp(y, r, height - r), r, {
      restitution: .16, friction: .28, frictionStatic: .65, frictionAir: .012, density: .002, sleepThreshold: 75,
      plugin: { level, born: now(), popAt: merged ? feedbackTime : null, settled: false, dangerSince: null,
        stretch: 0, springVelocity: merged ? -1.5 : 0, stretchAngle: 0, impactAt: -Infinity, soundAt: -Infinity }
    }, 40);
    Composite.add(engine.world, body); unlock(level); updateClearUI(); needsRender = true; return body;
  }
  function drop() {
    if (!playing() || now() < readyAt) return;
    clampAim(); heldX = aim; haptic(8); sound('drop');
    const body = spawn(held, heldX, aimY()); Body.setVelocity(body, { x: 0, y: 1.05 });
    body.plugin.stretch = reducedMotion ? 0 : .13; body.plugin.springVelocity = .8;
    held = next; next = randomLevel(); readyAt = now() + 380; clampAim(); preview(); needsRender = true;
  }
  function queueMerges(event) {
    if (clearing || over) return;
    for (const pair of event.pairs) {
      const a = pair.bodyA, b = pair.bodyB;
      if (!a.plugin.level || a.plugin.level !== b.plugin.level) continue;
      mergePairs.push({ a, b });
    }
  }
  function impact(event) {
    let loudest = null;
    for (const pair of event.pairs) {
      const a = pair.bodyA, b = pair.bodyB, normal = pair.collision.normal;
      const speed = Math.abs((a.velocity.x - b.velocity.x) * normal.x + (a.velocity.y - b.velocity.y) * normal.y) / scale;
      if (speed < 1.65 || (a.plugin.level && a.plugin.level === b.plugin.level)) continue;
      for (const body of [a, b]) {
        const meta = body.plugin;
        if (!meta.level) continue;
        if (!reducedMotion && now() - meta.impactAt > 90) {
          meta.springVelocity = -clamp(speed * .8, 1.5, 5.5);
          meta.stretchAngle = Math.atan2(normal.y, normal.x) - Math.PI / 2; meta.impactAt = now();
        }
        if (now() - meta.soundAt > 200 && (!loudest || speed > loudest.speed)) loudest = { body, speed };
      }
    }
    if (loudest && now() - lastImpactSound >= 75) {
      lastImpactSound = now(); loudest.body.plugin.soundAt = now();
      sound('impact', loudest.body.plugin.level, loudest.speed);
    }
  }
  Events.on(engine, 'collisionStart', event => { impact(event); queueMerges(event); });
  Events.on(engine, 'collisionActive', queueMerges);
  function addEffect(x, y, level, points, name) {
    // A shared cap bounds merge AND clear cascades to 8 blooms / 48 specks.
    if (effects.length >= MAX_EFFECTS) effects.shift();
    effects.push({ x, y, radius: radiusOf(level), born: feedbackTime, points, name,
      sparks: Array.from({ length: MAX_SPARKS }, (_, i) => ({ angle: i * Math.PI * 2 / MAX_SPARKS + Math.random() * .4,
        distance: 9 + Math.random() * 14, drift: (Math.random() - .5) * .5 })) });
  }
  function endCombo() {
    combo = 0; comboUntil = 0; comboLabel = null; intensifyMusic(0);
  }
  function celebrateCPU() {
    cpuFlashAt = feedbackTime; needsRender = true;
    sound('cpu', 10); haptic([28, 35, 16, 35, 40]);
  }
  function merge() {
    const used = new Set(), present = new Set(pieces());
    for (const { a, b } of mergePairs) {
      if (used.has(a.id) || used.has(b.id) || !present.has(a) || !present.has(b)) continue;
      used.add(a.id); used.add(b.id);
      const level = a.plugin.level, target = Math.min(10, level + 1);
      const x = (a.position.x + b.position.x) / 2, y = (a.position.y + b.position.y) / 2;
      Composite.remove(engine.world, a); Composite.remove(engine.world, b);
      combo = roundTime <= comboUntil && combo > 0 ? combo + 1 : 1;
      comboUntil = roundTime + COMBO_WINDOW; maxCombo = Math.max(maxCombo, combo); merges++;
      clearProgress = Math.min(CLEAR_MERGES, clearProgress + 1);
      const multiplier = Math.min(3, 1 + .25 * (combo - 1));
      intensifyMusic(Math.min(1, (combo - 1) / 6));
      hitStopUntil = Math.max(hitStopUntil, feedbackTime + 40 + target * 5);
      if (!reducedMotion) {
        shakePower = Math.min(2.5 * scale, (.45 + target * .19) * scale);
        shakeUntil = feedbackTime + 170;
      }
      if (level < 10) {
        const body = spawn(target, x, y, true);
        Body.setVelocity(body, { x: clamp((a.velocity.x + b.velocity.x) * .22, -1.8, 1.8), y: clamp((a.velocity.y + b.velocity.y) * .2, -.8, .8) });
        Body.setAngularVelocity(body, clamp((a.angularVelocity + b.angularVelocity) * .2, -.06, .06));
      }
      haptic(target < 5 ? 8 + target * 3 : [12 + target * 2, 24, 5 + target]);
      const points = Math.round((level === 10 ? 2048 : 2 ** level) * multiplier);
      award(points);
      addEffect(x, y, target, points, level === 10 ? 'CPU ×2' : LEVELS[target - 1][0]);
      if (combo >= 2) comboLabel = { x, y: Math.max(28 * scale, y - radiusOf(target) - 45 * scale),
        born: feedbackTime, combo, multiplier };
      if (target === 10 && level < 10) celebrateCPU();
      else sound('merge', target, combo);
      updateClearUI();
      // A discovery freezes the world at this exact simulation step.
      if (unlockShowing) break;
    }
    mergePairs = [];
  }
  function clearScreen() {
    if (!playing() || !clearReady()) return false;
    const bodies = pieces();
    if (!bodies.length) return false;
    // Distance from bottom-center defines the ripple; rank keeps pops sequential.
    const ordered = bodies.map(body => ({ body, distance: Math.hypot(body.position.x - width / 2, height - body.position.y) }))
      .sort((a, b) => a.distance - b.distance || a.body.id - b.body.id);
    const first = ordered[0].distance, span = Math.max(1, ordered[ordered.length - 1].distance - first);
    const spacing = Math.min(65, 1100 / Math.max(1, ordered.length - 1));
    clearQueue = ordered.map((entry, i) => ({ body: entry.body, at: i * spacing + (entry.distance - first) / span * 300 }));
    clearing = true; clearProgress = 0; clearElapsed = 0; clearIndex = 0;
    if (pointer !== null && board.hasPointerCapture(pointer)) board.releasePointerCapture(pointer);
    pointer = null; heldSway = 0; mergePairs = []; accumulator = 0; hitStopUntil = 0;
    endCombo(); board.classList.remove('danger'); updateClearUI(); needsRender = true;
    return true;
  }
  function tickClear(delta) {
    clearElapsed += delta;
    while (clearQueue.length && clearQueue[0].at <= clearElapsed) {
      const { body } = clearQueue.shift(), level = body.plugin.level;
      const points = 2 ** (level - 1);
      Composite.remove(engine.world, body);
      addEffect(body.position.x, body.position.y, level, points, '');
      award(points); sound('clear', level, clearIndex++); haptic(6);
    }
    if (!clearQueue.length && clearElapsed >= 250) {
      clearing = false; Engine.clear(engine); mergePairs = [];
      readyAt = now() + 160; updateClearUI();
      board.focus({ preventScroll: true });
    }
    needsRender = true;
  }
  function setClearCharge(value) {
    value = Number(value);
    clearProgress = (Number.isFinite(value) ? clamp(value, 0, 1) : 0) * CLEAR_MERGES;
    updateClearUI(); return clearProgress / CLEAR_MERGES;
  }
  $('clear-screen').addEventListener('click', clearScreen);
  function danger() {
    let warning = false;
    for (const body of pieces()) {
      const meta = body.plugin;
      if (now() - meta.born < 1100) continue;
      if (body.speed < .9 || body.isSleeping) meta.settled = true;
      if (meta.settled && body.position.y - radiusOf(meta.level) < dangerY) {
        meta.dangerSince ??= now(); warning = true;
        if (now() - meta.dangerSince >= 2000) { gameOver(); break; }
      } else meta.dangerSince = null;
    }
    board.classList.toggle('danger', warning && !over);
  }
  function gameOver() {
    if (over) return;
    over = true; screen = 'over'; unlockShowing = false; unlockQueue = [];
    clearing = false; clearQueue = []; endCombo(); hitStopUntil = 0;
    board.classList.remove('danger');
    $('round-score').textContent = format(score); $('round-best').textContent = format(best);
    $('new-record').style.visibility = score > roundBest ? 'visible' : 'hidden';
    $('round-merges').textContent = format(merges); $('round-combo').textContent = `×${maxCombo}`;
    $('round-piece').replaceChildren(component(highest));
    $('round-part-name').textContent = LEVELS[highest - 1][0]; $('round-part-fact').textContent = LEVELS[highest - 1][2];
    syncScreens(); $('restart').focus({ preventScroll: true }); sound('over');
  }
  function reset() {
    for (const body of pieces()) Composite.remove(engine.world, body);
    Engine.clear(engine); mergePairs = []; effects = []; score = 0; over = false; highest = 1; roundBest = best;
    combo = maxCombo = merges = roundTime = comboUntil = 0; comboLabel = null; intensifyMusic(0);
    clearing = false; clearQueue = []; clearElapsed = clearIndex = 0; clearProgress = CLEAR_MERGES;
    hitStopUntil = shakeUntil = shakePower = shakeX = shakeY = heldSway = 0;
    cpuFlashAt = lastImpactSound = -Infinity; $('cpu-flash').hidden = true;
    screen = 'game'; unlockShowing = false; unlockQueue = []; settingsOpen = false;
    held = randomLevel(); next = randomLevel(); aim = heldX = width / 2; readyAt = 0;
    board.classList.remove('danger'); updateScore(); updateProgress(); preview(); clampAim(); syncScreens();
  }
  function start() {
    reset(); if (musicOn) startMusic();
    board.focus({ preventScroll: true });
  }
  function openDex() {
    if (screen === 'dex' || unlockShowing || settingsOpen || clearing) return;
    dexReturn = screen; dexReturnFocus = document.activeElement; screen = 'dex';
    $('dex-count').textContent = `${unlocked.size}/10`; $('dex-progress-fill').style.width = `${unlocked.size * 10}%`;
    $('dex-grid').replaceChildren(...LEVELS.map(([name, , fact], i) => {
      const cell = document.createElement('article'), known = unlocked.has(i + 1);
      cell.className = 'dex-cell' + (known ? '' : ' locked');
      const disc = component(i + 1);
      if (!known) { disc.setAttribute('aria-hidden', 'true'); disc.querySelector('img').alt = ''; }
      const title = document.createElement('h2'), number = document.createElement('span');
      number.className = 'number'; number.textContent = String(i + 1).padStart(2, '0');
      title.append(number, document.createTextNode(known ? name : '???'));
      const description = document.createElement('p'); description.textContent = known ? fact : '尚未解锁';
      cell.append(disc, title, description); return cell;
    }));
    syncScreens(); $('back').focus({ preventScroll: true });
  }
  function closeDex() {
    if (screen !== 'dex') return;
    screen = dexReturn; syncScreens();
    (dexReturnFocus?.isConnected ? dexReturnFocus : screen === 'title' ? $('start') : screen === 'over' ? $('restart') : board).focus({ preventScroll: true });
  }
  $('start').addEventListener('click', start); $('restart').addEventListener('click', start);
  for (const id of ['open-dex', 'over-dex', 'title-dex']) $(id).addEventListener('click', openDex);
  $('back').addEventListener('click', closeDex);
  $('unlock-screen').addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); dismissUnlock(); });

  function point(event) {
    const rect = board.getBoundingClientRect(); aim = event.clientX - rect.left - board.clientLeft; clampAim();
  }
  board.addEventListener('pointerdown', event => {
    if (!playing() || pointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault(); pointer = event.pointerId; board.setPointerCapture(pointer); point(event);
    if (!muted || musicOn) ensureAudio(); if (musicOn) startMusic();
  });
  board.addEventListener('pointermove', event => {
    if (playing() && (pointer === event.pointerId || (event.pointerType === 'mouse' && pointer === null))) point(event);
  });
  board.addEventListener('pointerup', event => { if (pointer !== event.pointerId) return; point(event); pointer = null; drop(); });
  board.addEventListener('pointercancel', () => { pointer = null; });
  board.addEventListener('lostpointercapture', () => { pointer = null; });
  board.addEventListener('keydown', event => {
    if (!playing()) return;
    if (['ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(event.key)) event.preventDefault();
    if (event.key === 'ArrowLeft') aim -= 16 * scale;
    if (event.key === 'ArrowRight') aim += 16 * scale;
    clampAim(); if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) drop();
  });
  document.addEventListener('keydown', event => {
    if (settingsOpen) {
      if (event.key === 'Escape') { event.preventDefault(); closeSettings(); }
      else if (event.key === 'Tab') {
        const controls = [...$('settings-screen').querySelectorAll('button, input')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      return;
    }
    if (unlockShowing && ['Escape', ' ', 'Enter'].includes(event.key)) {
      event.preventDefault(); if (!event.repeat) dismissUnlock(); return;
    }
    if (event.key === 'Escape' && screen === 'dex') closeDex();
    if (event.key === 'Tab' && unlockShowing) {
      event.preventDefault(); $('unlock-screen').querySelector('.unlock-card').focus();
    } else if (event.key === 'Tab' && screen === 'over') {
      const first = $('restart'), last = $('over-dex');
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if ((event.ctrlKey || event.metaKey) && ['+', '-', '=', '0'].includes(event.key)) event.preventDefault();
  });
  document.addEventListener('gesturestart', event => event.preventDefault(), { passive: false });
  document.addEventListener('touchmove', event => {
    if (!event.target.closest('input[type="range"]')) event.preventDefault();
  }, { passive: false });
  document.addEventListener('wheel', event => event.preventDefault(), { passive: false });
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('visibilitychange', () => {
    pointer = null; accumulator = 0; previousTime = performance.now();
    if (document.hidden) stopMusic();
    else {
      if (audio) { ensureAudio(); if (musicOn) startMusic(); }
      needsRender = true;
    }
  });

  function bloomSurface() {
    const surface = document.createElement('canvas'); surface.width = surface.height = 320;
    const c = surface.getContext('2d'), g = c.createRadialGradient(160, 160, 67, 160, 160, 150);
    g.addColorStop(0, '#ffd49a00'); g.addColorStop(.3, '#ffd49a15'); g.addColorStop(.4, '#ffd49a40');
    g.addColorStop(.48, '#ffe6b84a'); g.addColorStop(.64, '#ffd49a20'); g.addColorStop(1, '#ffd49a00');
    c.fillStyle = g; c.fillRect(0, 0, 320, 320);
    c.beginPath(); c.arc(160, 160, 100, 0, Math.PI * 2); c.strokeStyle = '#ffe3b8bb'; c.lineWidth = 1.1; c.stroke();
    return surface;
  }
  const bloom = bloomSurface();
  function animateFeedback(delta) {
    const dt = Math.min(delta, 32) / 1000;
    for (const body of pieces()) {
      const meta = body.plugin;
      if (reducedMotion) { meta.stretch = meta.springVelocity = 0; continue; }
      // A damped spring, integrated in small visual steps, independent of physics.
      const steps = Math.max(1, Math.ceil(dt / .008)), step = dt / steps;
      for (let i = 0; i < steps; i++) {
        meta.springVelocity += (-210 * meta.stretch - 17 * meta.springVelocity) * step;
        meta.stretch = clamp(meta.stretch + meta.springVelocity * step, -.2, .2);
      }
      if (Math.abs(meta.stretch) + Math.abs(meta.springVelocity) < .001) meta.stretch = meta.springVelocity = 0;
    }
    const shakeLeft = Math.max(0, shakeUntil - feedbackTime) / 170;
    shakeX = reducedMotion ? 0 : Math.sin(feedbackTime * .082) * shakePower * shakeLeft ** 2;
    shakeY = reducedMotion ? 0 : Math.cos(feedbackTime * .097) * shakePower * .65 * shakeLeft ** 2;
    const age = feedbackTime - cpuFlashAt, flash = $('cpu-flash');
    if (age < 1200) {
      const rise = reducedMotion ? 250 : 110;
      const opacity = age < rise ? age / rise : Math.max(0, 1 - (age - rise) / (1200 - rise)) ** 2;
      flash.hidden = false; flash.style.opacity = String(opacity * (reducedMotion ? .12 : .32));
    } else flash.hidden = true;
  }
  function renderBoard() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
    ctx.save(); ctx.translate(shakeX, shakeY);
    const bodies = pieces();
    if (!over && !clearing) {
      const r = radiusOf(held);
      let landing = height - r;
      for (const body of bodies) {
        const dx = heldX - body.position.x, sum = r + radiusOf(body.plugin.level);
        if (Math.abs(dx) < sum) landing = Math.min(landing, body.position.y - Math.sqrt(sum * sum - dx * dx));
      }
      const from = aimY() + r + 5 * scale, to = Math.max(from, landing - r);
      ctx.save(); ctx.strokeStyle = '#ffe3b866'; ctx.lineWidth = 1.25 * scale; ctx.setLineDash([4 * scale, 5 * scale]);
      ctx.beginPath(); ctx.moveTo(heldX, from); ctx.lineTo(heldX, to); ctx.stroke();
      if (landing > dangerY + r) {
        ctx.setLineDash([]); ctx.strokeStyle = '#e0b47a30'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(heldX, landing, r - 1, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#ffe3b877'; ctx.beginPath(); ctx.arc(heldX, to, 2 * scale, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
    for (const body of bodies) {
      let pop = 1;
      const elapsed = body.plugin.popAt === null ? 1000 : feedbackTime - body.plugin.popAt;
      if (!reducedMotion && elapsed < 320) pop += .09 * Math.sin(Math.PI * elapsed / 320) * (1 - elapsed / 400);
      discOn(ctx, body.plugin.level, body.position.x, body.position.y, radiusOf(body.plugin.level) * 2 * pop, body.angle,
        1, reducedMotion ? 0 : body.plugin.stretch, body.plugin.stretchAngle);
    }
    if (!over && !clearing) discOn(ctx, held, heldX, aimY(), radiusOf(held) * 2, heldSway, now() < readyAt ? .48 : 1,
      reducedMotion ? 0 : Math.abs(heldSway) * .22);
    ctx.restore();
  }
  function renderEffects() {
    fx.setTransform(dpr, 0, 0, dpr, 0, 0); fx.clearRect(0, 0, appWidth, appHeight);
    // This sibling canvas spans the whole app, so the board never crops a bloom.
    fx.save(); fx.translate(boardX + shakeX, boardY + shakeY);
    effects = effects.filter(effect => feedbackTime - effect.born < 1350);
    for (const effect of effects) {
      const t = clamp((feedbackTime - effect.born) / 1350, 0, 1), alpha = (1 - t) ** 1.4;
      const radius = effect.radius * (1.06 + (reducedMotion ? 0 : .26 * t)) + 7 * scale;
      const size = radius * 3.2;
      fx.globalAlpha = alpha;
      fx.drawImage(bloom, effect.x - size / 2, effect.y - size / 2, size, size);
      if (!reducedMotion) for (const spark of effect.sparks) {
        const angle = spark.angle + spark.drift * t, distance = effect.radius + spark.distance * scale + t * 14 * scale;
        const x = effect.x + Math.cos(angle) * distance, y = effect.y + Math.sin(angle) * distance - t * 15 * scale;
        const s = (spark.distance > 16 ? 18 : 13) * scale;
        fx.drawImage(glow, x - s / 2, y - s / 2, s, s);
      }
      fx.fillStyle = '#ffe6c2'; fx.font = `500 ${13 * scale}px sans-serif`; fx.textAlign = 'center';
      const text = `+${effect.points}${effect.name ? ' ' + effect.name : ''}`, half = fx.measureText(text).width / 2;
      const textX = clamp(effect.x, half + 2, width - half - 2);
      fx.fillText(text, textX, effect.y - effect.radius - (13 + (reducedMotion ? 0 : 13 * t)) * scale);
    }
    if (comboLabel) {
      const age = feedbackTime - comboLabel.born;
      if (age < 1000) {
        const pop = reducedMotion ? 1 : 1 + .13 * Math.sin(Math.min(1, age / 220) * Math.PI);
        const text = `Combo ×${comboLabel.combo}  ·  ${comboLabel.multiplier.toFixed(2).replace(/\.?0+$/, '')}倍`;
        fx.save(); fx.font = `500 ${13 * scale}px sans-serif`; fx.textAlign = 'center';
        const half = fx.measureText(text).width / 2 + 11 * scale;
        const x = clamp(comboLabel.x, half * 1.14 + 2, width - half * 1.14 - 2);
        fx.translate(x, comboLabel.y - (reducedMotion ? 0 : 8 * scale * Math.min(1, age / 1000)));
        fx.scale(pop, pop); fx.globalAlpha = Math.min(1, (1000 - age) / 250);
        fx.fillStyle = '#30251ee8'; fx.strokeStyle = '#e0b47a80'; fx.lineWidth = .8 * scale;
        fx.beginPath();
        if (fx.roundRect) fx.roundRect(-half, -13 * scale, half * 2, 26 * scale, 13 * scale);
        else fx.rect(-half, -13 * scale, half * 2, 26 * scale);
        fx.fill(); fx.stroke();
        fx.fillStyle = '#edc792'; fx.fillText(text, 0, 4 * scale); fx.restore();
      }
    }
    fx.restore();
  }
  function renderDust(time) {
    dustCtx.setTransform(dpr, 0, 0, dpr, 0, 0); dustCtx.clearRect(0, 0, appWidth, appHeight);
    const seconds = reducedMotion ? 0 : time / 1000;
    for (const mote of dustMotes) {
      const x = mote.x * appWidth + Math.sin(seconds * .09 + mote.phase) * 7 * unit;
      const y = ((mote.y * appHeight - seconds * mote.speed * unit) % appHeight + appHeight) % appHeight;
      const s = mote.radius * 6 * unit;
      dustCtx.globalAlpha = .17 + .1 * Math.sin(seconds * .12 + mote.phase);
      dustCtx.drawImage(glow, x - s / 2, y - s / 2, s, s);
    }
    dustCtx.globalAlpha = 1;
  }
  let previousTime = performance.now(), accumulator = 0, needsRender = true;
  let fpsStart = previousTime, fpsFrames = 0, currentFps = 0, lastDust = 0;
  function frame(time) {
    const elapsed = Math.max(0, time - previousTime), delta = Math.min(elapsed, 80); previousTime = time;
    if (!document.hidden) {
      fpsFrames++;
      if (time - fpsStart >= 700) { currentFps = Math.round(fpsFrames * 1000 / (time - fpsStart)); fpsFrames = 0; fpsStart = time; }
    } else { fpsStart = time; fpsFrames = 0; }
    const feedbackVisible = !document.hidden && !settingsOpen &&
      (screen === 'game' || screen === 'over' || feedbackTime - cpuFlashAt < 1200);
    if (feedbackVisible) feedbackTime += delta;
    if (roundActive()) {
      roundTime += delta;
      if (combo && roundTime > comboUntil) endCombo();
      if (clearing) { accumulator = 0; tickClear(delta); }
      else {
        const oldX = heldX;
        heldX += (aim - heldX) * (reducedMotion ? 1 : 1 - Math.exp(-delta / 48)); clampAim();
        const swayTarget = reducedMotion ? 0 : clamp((heldX - oldX) / Math.max(1, delta) / scale * .12, -.13, .13);
        heldSway += (swayTarget - heldSway) * (1 - Math.exp(-delta / 65));
        // Discard paused time so a hit-stop never produces a catch-up jump.
        if (feedbackTime < hitStopUntil) accumulator = 0;
        else {
          accumulator += delta;
          let steps = 0;
          while (accumulator >= 1000 / 60 && steps++ < 5) {
            Engine.update(engine, 1000 / 60); merge();
            if (!unlockShowing) danger();
            accumulator -= 1000 / 60;
            if (!playing() || feedbackTime < hitStopUntil) { accumulator = 0; break; }
          }
        }
      }
      needsRender = true;
    } else accumulator = 0;
    if (feedbackVisible) {
      animateFeedback(delta);
      if (effects.length || feedbackTime < shakeUntil || feedbackTime - cpuFlashAt < 1250) needsRender = true;
    }
    if ((screen === 'game' || screen === 'over') && needsRender && !document.hidden) {
      renderBoard(); renderEffects(); needsRender = false;
    }
    // Eleven inexpensive sprites at 30 Hz; reduced-motion users get a still image.
    if (!document.hidden && !unlockShowing && screen !== 'over' && ((!reducedMotion && time - lastDust >= 32) || lastDust === 0)) {
      renderDust(time); lastDust = time;
    }
    requestAnimationFrame(frame);
  }
  resize(); reset(); screen = 'title'; syncScreens();
  new ResizeObserver(resize).observe(app);
  addEventListener('resize', resize);
  Promise.all(images.map(img => img.complete && img.naturalWidth ? Promise.resolve() : new Promise(resolve => {
    img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true });
  }))).then(() => { prepareSprites(); paintBackground(); needsRender = true; });
  window.__game = {
    spawn(level, x, y) { const body = spawn(level, x, y); return { level: body.plugin.level, x: body.position.x, y: body.position.y }; },
    state() { return { score, best, bodies: pieces().map(body => ({ level: body.plugin.level, x: body.position.x, y: body.position.y })),
      over, screen, unlockShowing, settingsOpen, sfxVolume, musicVolume,
      combo, maxCombo, merges, clearCharge: clearProgress / CLEAR_MERGES, clearReady: clearReady(), clearing, topLevel: highest }; },
    clearScreen,
    setClearCharge,
    forceCPU: celebrateCPU,
    sfx: sound,
    setMusic,
    openSettings,
    closeSettings,
    forceGameOver: gameOver,
    reset,
    start,
    dismissUnlock,
    fps() { return currentFps; }
  };
  requestAnimationFrame(frame);
  addEventListener('keydown', event => { if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ' || event.key.startsWith('Arrow')) document.body.classList.add('kbd'); }, true);
  addEventListener('pointerdown', () => document.body.classList.remove('kbd'), true);
})();
