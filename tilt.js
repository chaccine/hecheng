/* 摇摆输入与水平仪；物理更新仍由 game.js 的固定步长驱动。 */
(() => {
  'use strict';
  window.createTiltController = ({ gravity, canPlay, wake }) => {
    const $ = id => document.getElementById(id);
    const controls = $('tilt-controls'), pad = $('tilt-pad'), toggle = $('tilt-toggle');
    const permission = $('tilt-permission'), status = $('tilt-status');
    const MAX_ANGLE = 38, GRAVITY = 1.06;
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const deadZone = (n, zone) => Math.sign(n) * Math.max(0, Math.abs(n) - zone);
    const keys = new Set();
    let active = false, enabled = true, angle = 0, wakeAngle = 0;
    let sensor = 0, drag = 0, pointer = null, manual = false, received = false;
    let sensorAllowed = false, permissionGranted = false, requestPending = false, waitTimer;
    let message = '', displayedAngle;
    const available = () => active && enabled && canPlay();
    function tell(text) { message = text; if (enabled) status.textContent = text; }
    function paint() {
      const rounded = Math.round(angle);
      if (displayedAngle === rounded) return;
      displayedAngle = rounded;
      $('tilt-bubble').style.left = `${50 + angle / MAX_ANGLE * 42}%`;
      $('tilt-angle').textContent = `${rounded}°`;
      pad.setAttribute('aria-valuenow', String(rounded));
      pad.setAttribute('aria-valuetext', rounded === 0 ? '重力向下' : `${rounded > 0 ? '向右' : '向左'} ${Math.abs(rounded)} 度`);
    }
    function clearInput() {
      keys.clear(); drag = sensor = 0; manual = false;
      if (pointer !== null && pad.hasPointerCapture(pointer)) pad.releasePointerCapture(pointer);
      pointer = null;
    }
    function upright() {
      angle = wakeAngle = 0; gravity.x = 0; gravity.y = GRAVITY; paint();
    }
    function waitForSensor() {
      clearTimeout(waitTimer);
      waitTimer = setTimeout(() => {
        if (active && sensorAllowed && !received) tell('未收到体感数据，可拖动水平仪或按 ← → / A D');
      }, 1800);
    }
    function setupSensor() {
      received = false; clearTimeout(waitTimer);
      const Orientation = window.DeviceOrientationEvent;
      const needsPermission = typeof Orientation?.requestPermission === 'function';
      permission.hidden = !needsPermission || permissionGranted;
      sensorAllowed = false;
      if (!Orientation || !window.isSecureContext) {
        permission.hidden = true;
        tell(!Orientation ? '设备体感不可用，可拖动水平仪或按 ← → / A D'
          : '体感需要 HTTPS，可拖动水平仪或按 ← → / A D');
      } else if (needsPermission && !permissionGranted) {
        tell('点「启用体感」授权，也可拖动水平仪或按 ← → / A D');
      } else {
        sensorAllowed = true;
        tell('轻倾手机 · 拖动水平仪或按 ← → / A D，松手回正');
        waitForSensor();
      }
    }
    permission.addEventListener('click', async () => {
      if (!active || requestPending) return;
      requestPending = true; permission.disabled = true;
      try {
        // Call before any await: iOS requires the actual click's user activation.
        const result = await window.DeviceOrientationEvent.requestPermission();
        permissionGranted = result === 'granted';
        if (!active) return;
        if (permissionGranted) setupSensor();
        else {
          sensorAllowed = false; sensor = 0;
          tell('体感授权被拒绝，可拖动水平仪或按 ← → / A D');
        }
      } catch {
        sensorAllowed = false; sensor = 0;
        tell('无法启用体感，可拖动水平仪或按 ← → / A D');
      } finally { requestPending = false; permission.disabled = false; }
    });
    addEventListener('deviceorientation', event => {
      if (!available() || !sensorAllowed || !Number.isFinite(event.gamma)) return;
      const gamma = clamp(event.gamma, -90, 90);
      const beta = Number.isFinite(event.beta) ? clamp(event.beta, -90, 90) : 0;
      const rotation = (window.screen.orientation?.angle ?? window.orientation ?? 0) * Math.PI / 180;
      const lateral = gamma * Math.cos(rotation) + beta * Math.sin(rotation);
      const forward = beta * Math.cos(rotation) - gamma * Math.sin(rotation);
      // Beta only gently changes sensitivity; a small gamma never causes drift,
      // even when the phone is held upright instead of lying flat.
      sensor = clamp(deadZone(lateral, 3) * (1 + deadZone(Math.abs(forward), 8) * .002), -MAX_ANGLE, MAX_ANGLE);
      if (!received) {
        received = true; clearTimeout(waitTimer);
        tell('体感已连接 · 拖动水平仪或按 ← → / A D 也可摇摆');
      }
      if (!keys.size && pointer === null) manual = false;
    });
    const tiltKey = event => {
      if (event.ctrlKey || event.metaKey || event.altKey) return false;
      return ['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key.length === 1 ? event.key.toLowerCase() : event.key);
    };
    addEventListener('keydown', event => {
      if (!available() || !tiltKey(event)) return;
      event.preventDefault(); keys.add(event.key.toLowerCase()); manual = true;
    });
    addEventListener('keyup', event => { keys.delete(event.key.toLowerCase()); });
    function dragTo(event) {
      const rect = pad.getBoundingClientRect();
      drag = clamp((event.clientX - rect.left - rect.width / 2) / (rect.width * .42), -1, 1) * MAX_ANGLE;
      if (Math.abs(drag) < 3) drag = 0;
    }
    pad.addEventListener('pointerdown', event => {
      if (!available() || pointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
      event.preventDefault(); pointer = event.pointerId; manual = true;
      pad.setPointerCapture(pointer); pad.focus({ preventScroll: true }); dragTo(event);
    });
    pad.addEventListener('pointermove', event => { if (pointer === event.pointerId) dragTo(event); });
    const release = event => { if (pointer === event.pointerId) { pointer = null; drag = 0; } };
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) pad.addEventListener(type, release);
    function syncToggle() {
      toggle.textContent = enabled ? '摇摆：开' : '摇摆：关';
      toggle.setAttribute('aria-pressed', String(enabled));
      pad.setAttribute('aria-disabled', String(!enabled));
      status.textContent = enabled ? message : '摇摆已关闭 · 重力向下，仍计入摇摆模式最高分';
    }
    toggle.addEventListener('click', () => {
      if (!active || !canPlay()) return;
      enabled = !enabled; clearInput(); upright(); wake(); syncToggle();
    });
    function suspend() { clearInput(); if (active) upright(); }
    addEventListener('blur', suspend);
    document.addEventListener('visibilitychange', suspend);
    window.screen.orientation?.addEventListener('change', suspend);
    addEventListener('orientationchange', suspend);
    return {
      reset(isTilt) {
        active = isTilt; enabled = true; clearInput(); upright();
        controls.hidden = !active; clearTimeout(waitTimer);
        if (active) setupSensor(); else sensorAllowed = false;
        syncToggle();
      },
      suspend,
      update(delta) {
        if (!active) return; // Never touch normal mode's physics.
        let target = 0;
        if (available()) {
          const direction = Number(keys.has('arrowright') || keys.has('d')) - Number(keys.has('arrowleft') || keys.has('a'));
          target = keys.size ? direction * MAX_ANGLE : pointer !== null ? drag : manual ? 0 : sensor;
        }
        angle += (target - angle) * (1 - Math.exp(-delta / 180));
        if (target === 0 && Math.abs(angle) < .03) angle = 0;
        const radians = angle * Math.PI / 180;
        gravity.x = Math.sin(radians) * GRAVITY; gravity.y = Math.cos(radians) * GRAVITY;
        if (Math.abs(angle - wakeAngle) > .05) { wake(); wakeAngle = angle; }
        paint();
      },
      state() { return { enabled: active && enabled, angle, sensorAllowed, received }; }
    };
  };
})();
