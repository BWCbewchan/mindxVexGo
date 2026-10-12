import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

try {
  const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
  await page.addInitScript(() => {
    if (location.pathname === '/assembly/editor.html' && !sessionStorage.getItem('auto-guide-seeded')) {
      localStorage.setItem('mindx-vexgo-assembly-v1', JSON.stringify({
        version: 1,
        title: 'Auto guide test',
        parts: [
          { id: 'base', sku: '228-2500-003', label: 'Base Beam', position: [0, 0, 0], rotation: [0, 0, 0] },
          { id: 'pin', sku: '228-2500-2271', label: 'Gray Connector', position: [0, 0, 0], rotation: [0, 0, 0], mate: { target: 'base', sourceRef: '1', targetRef: '1', depth: 2.2 } },
        ],
        groups: [],
        steps: [],
      }));
      sessionStorage.setItem('auto-guide-seeded', '1');
    }
  });
  await page.goto('http://localhost:3120/assembly/editor.html');
  await page.locator('#status').filter({ hasText: 'Draft saved locally' }).waitFor({ timeout: 60000 });
  await page.locator('#guide-summary').filter({ hasText: 'steps generated' }).waitFor({ timeout: 15000 });
  assert.equal(await page.locator('#guide-steps .student-guide-step').count(), 1, 'the first real attachment is the first student assembly step');
  assert.equal(await page.locator('#export').isEnabled(), true, 'export is enabled only when sequence validation succeeds');

  await page.locator('#guide-steps button').nth(0).click();
  await page.locator('#guide-return').waitFor({ state: 'visible' });
  assert.match(await page.locator('#status').textContent(), /Step 1 of 1/);
  await page.locator('#guide-return').click();
  await page.locator('#status').filter({ hasText: 'Returned to the complete assembly' }).waitFor();

  await page.evaluate(() => { window.__printCalled = false; window.print = () => { window.__printCalled = true; }; });
  await page.locator('#export').click();
  await page.waitForFunction(() => window.__printCalled, null, { timeout: 30000 });
  assert.equal(await page.locator('#print-guide .guide-page').count(), 2, 'PDF source contains one preparation page and one actual assembly step');
  assert.equal(await page.locator('#objects button').count(), 2, 'export restores the complete editable assembly');
  console.log('PASS: generated guide previews, step navigation, PDF page preparation and assembly restoration.');
} finally {
  await browser.close();
}
