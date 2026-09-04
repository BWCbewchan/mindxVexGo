# Virtual training

Open `/training` and choose a mission from the field gallery. Eighty-four built-in missions and Your practice field are included: thirty navigation fields, eight cargo pickup/sorting missions, two bumper missions and two eye missions. Search by name or filter by difficulty. Import field JSON or choose Create field to add up to eight custom entries in this browser. No Brain or Bluetooth connection is required. `/studio` remains the physical-robot workspace.

Each mission has separate code autosave, keyboard settings and field edits. **All missions** returns to the gallery and stops the current run. **Hide map / Show map** expands the editor without reloading it or resetting the robot. Mission instructions and Run/Stop/Reset remain visible when the map is hidden. The earlier single-workspace training project is retained in Your practice field.

## Learn and run

- In **First journey**, choose **Load demo code**, then **Run code**: the robot travels 700 mm to the target on the default 1200 × 1200 mm field.
- **First cargo delivery**, **Bumper stop and reverse** and **Eye obstacle lookout** include **Load sensor example**. Loading an example replaces the current code and restores that mission field after confirmation.
- **Magnet → energize → boost** picks up a block near the front mount; **drop** releases it. Release the entire block inside the same-color zone to score. All cargo must be delivered; merely passing through a zone while carrying does not count.
- **Sensing** includes Bumper, Eye object/distance/color/hue/brightness and eye light/range settings. Use these reporters inside **if**, **wait until** or loops. The live sensor panel shows their values. Bumper missions additionally require a contact before reaching the target.
- Use the existing Blockly toolbox or **File → Load From Your Device** to open `.goblocks` files.
- **Controls** uses the same My Block / keyboard mappings as Studio. Enable controls before using a binding. Running a function uses only that function and its dependencies.
- **Stop** cancels motion and execution. **Reset robot** restores the start position and clears the path and movement totals.
- Heading 0° points up, 90° points right. Rotation is signed, positive clockwise. A lesson reaches its goal when the robot centre enters the green circle.

## Create and share a field

Choose **Edit field** to change the dimensions, import a PNG/JPG/WebP background (under 2.5 MB), and tap to place the robot, goal or 120 × 120 mm walls. **Undo wall** removes the last wall. A background image does not automatically create collision geometry.

Use **Export field** / **Import field** for the field JSON, including its image. Save the Blockly project separately through **File → Save To Your Device**; this retains controller mappings. Share both files for a complete lesson. Field settings, project autosave and controller mappings are stored locally in a separate training namespace. There is no account or cloud lesson library in this version.

## Supported simulation

The existing Blockly JavaScript generators and bundled JS interpreter execute drive/turn commands (including drive until object/crash), wait, basic loops and conditions, numeric/boolean variables, operators, print, My Blocks with parameters, magnet boost/drop and the sensing blocks listed above. Unsupported blocks are reported before the selected stack runs. Articulated motor arms and multi-robot scenes are not simulated; pickup uses a fixed front magnet.

The robot is represented by a 90 mm diameter circle; walls are rectangles and cargo is 40 mm wide. The magnet mount is 65 mm ahead of the centre with 35 mm pickup reach. Eye uses a straight ray from the front edge, up to 400 mm (far) or 150 mm (near); the closest cargo or wall occludes objects behind it. No detection reports the maximum range and color 
one`. Red/green/blue cargo hue is 0/120/240°. Brightness is synthetic (20% ambient plus the configured light contribution on a detected object), not a calibrated hardware model. Maximum nominal speed is 250 mm/s and 180°/s. Motion is ideal, without wheel slip or momentum. Collision stops the motors but code continues so bumper conditions can reverse or turn away. Runs have a five-minute limit; leaving the browser tab stops the simulation. Blockly is executed inside the interpreter, not with native eval or hardware APIs.

Field editing supports **Add cargo block**, **Add delivery zone**, their color selector, and undo actions. Field JSON includes the original cargo and zones; reset restores cargo to these initial positions. Background image colors do not become sensor objects automatically.

Robot motion and the trail render with requestAnimationFrame and interpolate compact pose packets, independently of React's slower telemetry updates. Reset changes the pose revision to clear the trail and place the robot immediately. Frame rate still depends on the device and browser load.

## Local verification


pm run build`

Start the built app, then run `TEST_BASE_URL=<local URL> node scripts/test-training.mjs` (set the environment variable using your shell syntax). The script checks deterministic engine motion/collision, real Blockly generation and execution, imported loop / My Block, controls, cancellation, storage isolation, field JSON and mobile width.


ode scripts/test-training-missions.mjs` verifies all 84 field geometries and a route to every navigation target. 
ode scripts/test-training-sensors.mjs` checks cargo scoring, pickup range, occlusion, sensor ranges and contact recovery. `BASE_URL=<local URL> node scripts/test-training-sensors-browser.mjs` runs real Blockly sensor conditions, pickup/drop, bumper recovery and field export. `scripts/test-training-gallery.mjs` covers search, filters, mission switching, project isolation and map visibility during a run.

## Custom field designer

Create field opens the designer immediately. Set wall width/height and delivery-zone radius, choose object colors, and tap to place objects. Snap placement to the 25 mm grid can be disabled. Erase object removes the tapped cargo, wall or zone. Save to My fields validates matching cargo colors, saves the field locally and returns to the gallery. Use the Your fields filter to find it again. Export field remains available for moving a field between devices.

## Reasoning curriculum

Thirty additional missions introduce ordered checkpoints, coordinate reasoning, reverse movement, relative/absolute headings, diagonals, repeated patterns, parameterized routines, state at repeated junctions, and multi-stage logistics. Each includes its own focus and thinking hint. Route coordinates are available inside the workspace. Checkpoints must be visited in order before a goal or completed delivery can award success; reset clears the sequence. Coding techniques are suggestions, so alternate valid programs remain accepted.

Difficulty is a horizontal button group with counts, selected state and wrapping for small screens. Skill terms are searchable. `node scripts/test-training-curriculum.mjs` completes all 30 new fields with engine commands and verifies out-of-order rejection and reset. `node scripts/test-training-difficulty.mjs` checks filters, counts, hints, coordinates and mobile interaction.

## Push practice and worked solutions

Twelve push-only missions extend the library to 84. Arrow-marked cargo can be pushed by aligned drivetrain motion but cannot be lifted by the magnet. Walls and other cargo block a push; reversing lets the robot reposition. All released/pushed cargo must fit inside a matching-color delivery zone. This is a simplified contact model, without inertia or chains of boxes pushing each other.

The Worked solutions filter shows 72 verified solutions. Each has a downloadable `.goblocks` program, the original field JSON and a step list. Solutions are deliberately explicit routes for study, not claims of optimal code. Imported solutions set drive/turn velocity to 100%. `node scripts/generate-training-solutions.mjs` re-simulates and exports all of them; unsupported fields do not advertise a solution.

Custom field editing now uses a diagram-style canvas: palette, pointer drag, wall/zone resize handles, X/Y/size/color properties, push-only checkbox, checkpoints, duplicate/delete, Undo/Redo, snap, keyboard nudges, zoom and background images. Changes commit at the end of a drag; local library and JSON sharing remain supported. It does not import or export draw.io diagrams. `scripts/test-training-designer.mjs` covers these interactions and persistence. `scripts/test-training-resources.mjs` downloads, imports and runs an actual push solution in Blockly.

## Dedicated custom workspace

Create field opens `/training/custom`; the training gallery remains `/training`. Existing custom cards include an Edit field link with their id. The dedicated designer does not load Blockly. Tools use accessible SVG icon buttons with hover/focus tooltips. The left shape sidebar and right property sidebar can be hidden separately. Zoom out/in and Fit field control the canvas, and resize grips retain a minimum screen size for touch. Draft autosave, named library save and JSON import/export are available.

`BASE_URL=http://localhost:3117 node scripts/test-training-custom-ux.mjs` verifies routing, tooltips, toggles, zoom/drag, history and persistence. `node scripts/test-training-touch.mjs` additionally checks touch taps, drag, zoom and the resize grip. These tests emulate touch in Chrome; they are not physical iPhone/iPad certification.
