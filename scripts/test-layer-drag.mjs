import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('http://localhost:3128/training/custom');
 const handle=page.getByRole('button',{name:'Reorder start layer',exact:true});
 await handle.waitFor();
 const from=await handle.boundingBox(),to=await page.locator('[data-layer-kind="blocks"]').boundingBox();
 await page.mouse.move(from.x+from.width/2,from.y+from.height/2);
 await page.mouse.down();
 await page.mouse.move(to.x+60,to.y+to.height-8,{steps:10});
 await page.mouse.up();
 const order=await page.locator('[data-layer-kind]').evaluateAll(nodes=>nodes.map(node=>node.dataset.layerKind));
 assert.deepEqual(order.slice(0,3),['goal','blocks','start']);
 await page.getByRole('button',{name:'Undo',exact:true}).click();
 assert.equal(await page.locator('[data-layer-kind]').first().getAttribute('data-layer-kind'),'start');
 await handle.focus();await handle.press('ArrowDown');
 await page.reload();await handle.waitFor();
 assert.equal(await page.locator('[data-layer-kind]').first().getAttribute('data-layer-kind'),'goal');
 console.log('PASS: drag reorder, undo, keyboard and persistence.');
}finally{await browser.close();}
