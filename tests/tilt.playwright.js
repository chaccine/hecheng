// Playwright headless MCP browser_run_code_unsafe 的 filename 脚本。
// 先让 MCP 的当前页打开本地测试服务器；本脚本在独立移动 context 中验证。
async (page) => {
  const shots = '/workspace/hecheng/shots-tilt';
  const context = await page.context().browser().newContext({
    viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1
  });
  const p = await context.newPage(), errors = [], checks = [];
  p.on('pageerror', error => errors.push(error.message));
  p.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const check = (condition, name, detail) => {
    if (!condition) throw Error(`${name}: ${JSON.stringify(detail)}`);
    checks.push({ name, detail });
  };
  const state = () => p.evaluate(() => __game.state());
  const shot = name => p.screenshot({ path: `${shots}/${name}.png` });
  const sensor = (gamma, beta = 5) => p.evaluate(({ gamma, beta }) => {
    // Event properties also work in engines that omit the constructor.
    const event = new Event('deviceorientation');
    Object.defineProperties(event, { gamma: { value: gamma }, beta: { value: beta } });
    dispatchEvent(event);
  }, { gamma, beta });
  const fresh = () => p.evaluate(() => { __game.reset(); __game.spawn(3, 182, 350); });
  try {
    await p.goto(page.url());
    await p.evaluate(() => {
      localStorage.setItem('hecheng-best', '100');
      localStorage.setItem('hecheng-tilt-best', '7');
    });
    await p.reload(); await p.waitForFunction(() => window.__game);
    await shot('title');
    check(await p.locator('#title-best').textContent() === '100' && await p.locator('#title-tilt-best').textContent() === '7', '标题独立最高分');
    await p.locator('#start-tilt').click();
    // Real browser permission where implemented; synthetic sensor data below.
    if (await p.locator('#tilt-permission').isVisible()) await p.locator('#tilt-permission').click();
    check((await state()).tilt.sensorAllowed, '体感授权可用');
    await fresh(); await p.waitForTimeout(2100); await shot('tilt-indicator');
    let before = await state();
    check(before.bodies[0].sleeping, '静止元件进入休眠');
    await p.keyboard.down('ArrowRight'); await p.waitForTimeout(850);
    let after = await state(); await shot('drift-right');
    check(after.bodies[0].x > before.bodies[0].x + 20 && after.gravity.x > .5, '方向键倾斜唤醒并向右漂移', after.bodies[0].x - before.bodies[0].x);
    await p.keyboard.up('ArrowRight'); await p.waitForTimeout(1500);
    check((await state()).gravity.x === 0, '松开按键平滑回正');
    for (const key of ['ArrowLeft', 'a', 'd']) {
      await fresh(); await p.keyboard.down(key); await p.waitForTimeout(700);
      const s = await state(), sign = key === 'd' ? 1 : -1;
      check(s.gravity.x * sign > .5 && (s.bodies[0].x - 182) * sign > 20, `${key} 方向和位移`);
      await p.keyboard.up(key);
    }
    for (const gamma of [-30, 30]) {
      await fresh(); await sensor(gamma); await p.waitForTimeout(1000);
      after = await state();
      check(after.gravity.x * Math.sign(gamma) > .4 && (after.bodies[0].x - 182) * Math.sign(gamma) > 30, `合成体感事件 gamma=${gamma}`, after.bodies[0].x);
      await shot(gamma < 0 ? 'drift-left' : 'sensor-right');
    }
    await fresh();
    for (let i = 0; i < 12; i++) { await sensor(i % 2 ? 2 : -2, 60); await p.waitForTimeout(180); }
    after = await state();
    check(after.gravity.x === 0 && Math.abs(after.bodies[0].x - 182) < .05, '±2° 死区无漂移，beta=60 也不产生侧向偏移', after.bodies[0].x);
    await sensor(30); await p.waitForTimeout(400); await p.locator('#tilt-toggle').click();
    await sensor(-90); await p.keyboard.down('ArrowRight'); await p.waitForTimeout(350);
    after = await state(); await p.keyboard.up('ArrowRight'); await shot('toggle-off');
    check(after.gravity.x === 0 && after.gravity.y === 1.06 && !after.tilt.enabled && after.mode === 'tilt', '关闭后重力严格向下且仍属摇摆模式');
    await p.locator('#tilt-toggle').click(); await sensor(-30); await p.waitForTimeout(400);
    check((await state()).gravity.x < -.3, '再次开启体感');
    // Touch drag uses the gauge only; it must not drop a piece on the board.
    await fresh();
    const pad = await p.locator('#tilt-pad').boundingBox();
    const cdp = await context.newCDPSession(p);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: pad.x + pad.width / 2, y: pad.y + pad.height / 2 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: pad.x + pad.width - 4, y: pad.y + pad.height / 2 }] });
    await p.waitForTimeout(700); after = await state();
    check(after.gravity.x > .5 && after.bodies.length === 1, '触摸拖动水平仪有效且不误落子');
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await p.waitForTimeout(1500); check((await state()).gravity.x === 0, '触摸松手回正');
    await cdp.detach();
    // Every sample checks the full circle, with 0.5px collision slop tolerance.
    for (const gamma of [-90, 90]) {
      await p.evaluate(() => {
        __game.reset();
        [1, 2, 3, 4, 5, 6].forEach((level, i) => __game.spawn(level, 55 + i % 3 * 120, 120 + Math.floor(i / 3) * 130));
      });
      await sensor(gamma, 80);
      let samples = 0;
      for (let i = 0; i < 32; i++) {
        await p.waitForTimeout(250); const s = await state(); samples++;
        if (s.over || s.bodies.length !== 6 || Math.abs(s.tilt.angle) > 38.001 || !s.bodies.every(b => b.x - b.radius >= -.5 && b.x + b.radius <= s.width + .5 && b.y + b.radius <= s.height + .5)) {
          throw Error(`最大倾角墙体检查失败: ${JSON.stringify(s)}`);
        }
      }
      check(true, `最大倾角 ${Math.sign(gamma) * 38}° 连续 8 秒无穿墙`, { samples, bodies: 6 });
    }
    await fresh(); await p.evaluate(() => Object.defineProperty(screen.orientation, 'angle', { configurable: true, value: 90 }));
    await sensor(0, 30); await p.waitForTimeout(500);
    check((await state()).gravity.x > .4, '横屏 90° 使用 beta 映射横向重力');
    await p.evaluate(() => { delete screen.orientation.angle; __game.reset(); });
    await p.keyboard.down('d'); await p.waitForTimeout(300); await p.locator('#open-settings').click();
    await p.keyboard.up('d'); await p.locator('#close-settings').click(); await p.waitForTimeout(300);
    check((await state()).gravity.x === 0, '暂停清除按键，恢复无粘键');
    // Clear scoring is deterministic: level 5 awards 16 points.
    await p.evaluate(() => { __game.reset(); __game.spawn(5, 180, 400); __game.clearScreen(); });
    await p.waitForFunction(() => !__game.state().clearing);
    await p.evaluate(() => __game.forceGameOver()); await shot('tilt-result');
    check(await p.locator('#round-best').textContent() === '16' && await p.locator('#round-best-label').textContent() === '摇摆最高', '摇摆结算最高分');
    check(await p.evaluate(() => localStorage.getItem('hecheng-best') === '100' && localStorage.getItem('hecheng-tilt-best') === '16'), '摇摆计分不污染普通存档');
    await p.locator('#restart').click(); check((await state()).mode === 'tilt', '再来一局保留模式');
    await p.reload(); await p.locator('#start').click();
    await p.evaluate(() => __game.spawn(3, 182, 350));
    await sensor(90); await p.keyboard.down('d'); await p.waitForTimeout(1300); await p.keyboard.up('d');
    after = await state(); await shot('normal');
    check(after.mode === 'normal' && after.bestKey === 'hecheng-best' && after.gravity.x === 0 && after.gravity.y === 1.06 && Math.abs(after.bodies[0].x - 182) < .05 && await p.locator('#tilt-controls').isHidden(), '普通模式的重力、按键、存档和界面不受影响');
    await p.evaluate(() => { __game.reset(); __game.spawn(8, 182, 400); __game.clearScreen(); });
    await p.waitForFunction(() => !__game.state().clearing);
    check(await p.evaluate(() => localStorage.getItem('hecheng-best') === '128' && localStorage.getItem('hecheng-tilt-best') === '16'), '普通计分仍用原存档键');
    // Mock each iOS permission outcome; assert invocation occurs in a gesture.
    for (const result of ['denied', 'throw', 'granted']) {
      await p.reload();
      await p.evaluate(result => {
        window.permissionCalls = [];
        Object.defineProperty(DeviceOrientationEvent, 'requestPermission', { configurable: true, value: () => {
          permissionCalls.push(navigator.userActivation.isActive);
          if (result === 'throw') return Promise.reject(new Error('test permission error'));
          return Promise.resolve(result);
        } });
      }, result);
      await p.locator('#start-tilt').click(); await p.locator('#tilt-permission').click();
      await p.waitForTimeout(100);
      check(await p.evaluate(() => permissionCalls.length === 1 && permissionCalls[0]), `iOS ${result} 在用户手势内调用`);
      if (result !== 'granted') {
        check(/拒绝|无法/.test(await p.locator('#tilt-status').textContent()), `${result} 中文回退提示`);
        if (result === 'denied') await shot('permission-fallback');
        await p.keyboard.down('d'); await p.waitForTimeout(300);
        check((await state()).gravity.x > .4, `${result} 后键盘仍可用`); await p.keyboard.up('d');
      } else check((await state()).tilt.sensorAllowed, 'iOS granted 启用传感器');
    }
    await p.reload();
    await p.evaluate(() => Object.defineProperty(window, 'DeviceOrientationEvent', { configurable: true, value: undefined }));
    await p.locator('#start-tilt').click();
    check((await p.locator('#tilt-status').textContent()).includes('体感不可用'), '不支持体感的中文回退');
    await shot('unsupported-fallback');
    check(errors.length === 0, '无控制台错误和未捕获异常', errors);
    return { viewport: { width: 390, height: 844, hasTouch: true }, passed: checks.length, checks, errors };
  } finally { await context.close(); }
}
