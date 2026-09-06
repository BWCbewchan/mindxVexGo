import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const b = await chromium.launch({channel:'chrome', headless: true});
try {
 const p = await b.newPage({viewport: {width: 1440, height: 960}});
 await p.goto('http://localhost:3117/classroom');

 // Create test class
 await p.getByRole('button', {name: 'Create a class', exact: true}).click();
 await p.getByLabel('Class name', {exact: true}).fill('VEX GO Robotics Lab');
 await p.getByRole('button', {name: 'Create class', exact: true}).click();

 // Add 5 students
 await p.getByRole('button', {name: '＋ Add students', exact: true}).click();
 await p.getByLabel('Student names', {exact: true}).fill('Bảo Anh, Tuấn Kiệt, Gia Hưng, Minh Châu, Đăng Khoa');
 await p.getByRole('button', {name: 'Add students', exact: true}).click();

 // Mark all present
 await p.getByRole('button', {name: 'Mark all present', exact: true}).click();

 // Award some points to Gia Hưng and Bảo Anh
 await p.getByRole('button', {name: 'Select Gia Hưng', exact: true}).click();
 await p.getByRole('button', {name: 'Mission completed +5', exact: true}).click();
 await p.getByRole('button', {name: 'Select Gia Hưng', exact: true}).click();
 await p.getByRole('button', {name: 'Mission completed +5', exact: true}).click();

 await p.getByRole('button', {name: 'Select Bảo Anh', exact: true}).click();
 await p.getByRole('button', {name: 'Creative thinking +3', exact: true}).click();

 // Award a recognition to Gia Hưng
 await p.getByRole('button', {name: 'Select Gia Hưng', exact: true}).click();
 await p.getByRole('button', {name: 'Recognitions', exact: true}).click();
 await p.getByRole('button', {name: /Robot assembly/, exact: false}).click();
 await p.getByRole('button', {name: 'Close points dialog', exact: true}).click();

 await p.screenshot({path: 'artifacts/feature-students-roster.png'});

 // Switch to Recognition tab
 await p.getByRole('tab', {name: 'Recognition', exact: true}).click();
 await p.waitForTimeout(300);
 await p.screenshot({path: 'artifacts/feature-leaderboard.png'});

 // Switch to Tools (Wheel, Stopwatch, etc.)
 await p.getByRole('tab', {name: 'Tools', exact: true}).click();
 await p.waitForTimeout(300);

 // Start stopwatch and take a lap
 await p.locator('.cr-stopwatch').getByRole('button', {name: 'Start', exact: true}).click();
 await p.waitForTimeout(600);
 await p.getByRole('button', {name: 'Lap', exact: true}).click();
 await p.waitForTimeout(400);
 await p.locator('.cr-stopwatch').getByRole('button', {name: 'Pause', exact: true}).click();

 await p.screenshot({path: 'artifacts/feature-tools-stopwatch.png'});

 console.log('PASS: Captured all feature screenshots successfully!');
} finally {
 await b.close();
}
