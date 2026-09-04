import { chromium, webkit, devices } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const context = {};
vm.runInNewContext(await fs.readFile('public/robot-movement.js', 'utf8'), context);
const tracker = context.createRobotMovement();
const drive = { left: 0, right: 3, ratio: 1 };
const ports = (left, right, heading) => [
  { portNumber: 0, deviceID: 32, position: left },
  { portNumber: 3, deviceID: 32, position: right },
  { portNumber: 4, deviceID: 160, heading },
];
tracker.sample(ports(0, 0, 350), drive, 1000);
tracker.sample(ports(360, -360, 440), drive, 1200);
assert.equal(tracker.state(true, 1200).distanceMm, 160);
assert.equal(tracker.state(true, 1200).turnDegrees, 90);
tracker.sample(ports(0, 0, 395), drive, 1400);
assert.equal(tracker.state(true, 1400).distanceMm, 320);
assert.equal(tracker.state(true, 1400).turnDegrees, 45);
assert.equal(tracker.state(true, 4000).distanceMm, null);
tracker.sample(ports(9000, 9000, 800), drive, 4200);
assert.equal(tracker.state(true, 4200).distanceMm, 320, 'stale gap must not add travel');
tracker.reset();
tracker.sample(ports(0, 0, 0), { ...drive, ratio: 1.5 }, 5000);
tracker.sample(ports(540, 540, -90), { ...drive, ratio: 1.5 }, 5200);
assert.equal(tracker.state(true, 5200).distanceMm, 160);
assert.equal(tracker.state(false, 5200).distanceMm, null);
tracker.sample([{ portNumber: 4, deviceID: 160, heading: -90 }], { ...drive, ratio: 1.5 }, 5300);
assert.equal(tracker.state(true, 5300).distanceMm, null, 'missing encoders must not become zero');

const iphone = process.argv.includes('--iphone');
const browser = await (iphone ? webkit : chromium).launch(iphone ? {} : { channel: 'chrome' });
try {
  const page = await browser.newPage(iphone ? devices['iPhone 13'] : devices['Pixel 7']);
  page.on('pageerror', error => console.error('Browser error:', error.message));
  // Synthetic Brain packets only: this does not connect to or move real hardware.
  await page.route('**/controller-bridge.js', async route => {
    let source = await fs.readFile('public/controller-bridge.js', 'utf8');
    source = source.replace('const connected = () => !!hw && hw.getConnectionState() === hardware.BrainConnectionState.Connected;', 'const connected = () => true;');
    source = source.replace("const movementEvents = requireModule('./src/GlobalEventSystem.ts');", "const movementEvents = requireModule('./src/GlobalEventSystem.ts'); window.__movementEvents = movementEvents;");
    source = source.replace('config.getJSConstructorList()', "['var drivetrain = new Drivetrain(0, 3, 1);']");
    source = source.replace('const movement = window.createRobotMovement();', 'const movement = window.createRobotMovement(); window.__movementTracker = movement;');
    await route.fulfill({ contentType: 'text/javascript', body: source });
  });
  await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3107') + '/studio');
  await page.getByRole('button', { name: 'Continue to editor' }).click();
  const editor = await page.locator('iframe').elementHandle().then(el => el.contentFrame());
  await editor.getByRole('button', { name: '⌨ Controls', exact: true }).click();
  await page.getByRole('button', { name: 'Robot movement · mm / °' }).click();
  const panel = page.getByRole('complementary', { name: 'Robot movement', exact: true });
  await panel.waitFor();
  assert.match(await page.getByTestId('movement-distance').innerText(), /—/);
  await editor.evaluate(samples => {
    for (const ports of samples) window.__movementEvents.fireEvent('HWInterface.GOStatusUpdate', {}, { ports, battery: 100 });
    window.__movementStream = setInterval(() => window.__movementEvents.fireEvent('HWInterface.GOStatusUpdate', {}, { ports: samples[1], battery: 100 }), 100);
  }, [ports(0, 0, 0), ports(360, -360, 90)]);
  await page.waitForFunction(() => document.querySelector('[data-testid="movement-distance"]').textContent.includes('160'));
  assert.match(await page.getByTestId('movement-turn').innerText(), /90/);
  const box = await panel.boundingBox();
  assert.ok(box.x >= 0 && box.x + box.width <= page.viewportSize().width);
  const handle = page.getByRole('heading', { name: 'Move robot movement window' });
  const handleBox = await handle.boundingBox();
  await page.mouse.move(handleBox.x + 30, handleBox.y + 15);
  await page.mouse.down();
  await page.mouse.move(handleBox.x + 60, handleBox.y + 65, { steps: 6 });
  await page.mouse.up();
  const moved = await panel.boundingBox();
  assert.ok(moved.y > box.y + 20, 'dragging the title moves the window');
  await handle.focus();
  await page.keyboard.press('ArrowUp');
  assert.ok((await panel.boundingBox()).y < moved.y, 'arrow keys move the focused title');
  await page.setViewportSize({ width: 360, height: 600 });
  await page.waitForFunction(() => {
    const panel = document.querySelector('.robot-movement').getBoundingClientRect();
    return panel.x >= 0 && panel.right <= innerWidth && panel.bottom <= innerHeight;
  });
  await page.screenshot({ path: `artifacts/robot-movement-${iphone ? 'iphone' : 'android'}.png` });
  await page.getByRole('button', { name: 'Reset measurements' }).click();
  await page.waitForFunction(() => document.querySelector('[data-testid="movement-distance"]').textContent.trim() === '0 mm');
  await page.getByRole('button', { name: 'Close robot movement' }).click();
  assert.equal(await panel.count(), 0);
  console.log('PASS: telemetry math, reverse travel, gear ratio, stale/disconnected/missing sensors; movement window, mobile bounds, live packet updates, reset and close. Synthetic hardware only.');
} finally { await browser.close(); }
