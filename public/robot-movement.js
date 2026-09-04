(function (root) {
  'use strict';
  // GO's generated Drivetrain uses 160 mm per wheel revolution and a gear ratio.
  // This is mean wheel travel, including turns, not ground-truth chassis distance.
  root.createRobotMovement = function () {
    let previous = null, key = '', distance = 0, rotation = 0;
    let distanceReady = false, rotationReady = false, lastAt = 0;
    return {
      reset() { previous = null; distance = rotation = 0; distanceReady = rotationReady = false; lastAt = 0; },
      sample(ports, drive, now) {
        const nextKey = JSON.stringify(drive);
        if (key !== nextKey) { this.reset(); key = nextKey; }
        if (!drive || !Array.isArray(ports)) { previous = null; lastAt = 0; return; }
        if (now - lastAt > 2000) previous = null;
        const left = ports.find(p => p?.portNumber === drive.left && p.deviceID === 32);
        const right = ports.find(p => p?.portNumber === drive.right && p.deviceID === 32);
        const heading = ports.find(p => p?.deviceID === 160 && Number.isFinite(p.heading))?.heading;
        const wheels = Number.isFinite(left?.position) && Number.isFinite(right?.position);
        distanceReady = wheels;
        rotationReady = Number.isFinite(heading);
        if (previous) {
          if (wheels && previous.wheels) {
            distance += (Math.abs(left.position - previous.left) + Math.abs(right.position - previous.right)) * 160 / (720 * drive.ratio);
          }
          // GO reports cumulative rotation, rather than a wrapped compass heading.
          if (rotationReady && Number.isFinite(previous.heading)) rotation += heading - previous.heading;
        }
        previous = { wheels, left: left?.position, right: right?.position, heading };
        lastAt = now;
      },
      state(isConnected, now) {
        const fresh = isConnected && lastAt > 0 && now - lastAt <= 2000;
        if (!fresh) previous = null;
        return { type: 'vex-movement-state', connected: isConnected, fresh,
          distanceMm: fresh && distanceReady ? distance : null,
          turnDegrees: fresh && rotationReady ? rotation : null };
      }
    };
  };
})(globalThis);
