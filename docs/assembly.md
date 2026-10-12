# VEX GO Assembly

Open `/assembly`. This editor uses 75 GLBs from the supplied VEX GO CAD library. Original geometry, material colors, millimetre-to-metre conversion and Y-up axes are preserved. Mechanical parts keep their CAD code where a commercial name has not been verified.

## Teacher workflow

Adding an electronic part (motor, sensor, switch, electromagnet, Brain or battery) also adds one Brain and one battery if either is missing. Existing support parts are reused; the editor never adds another support unit just because another motor is added. The additions share one undo action and are placed alongside the selected electronic part for manual positioning. This is an assembly convenience, not simulated wiring. The same rule applies to duplication and quick attachment; saved files and historical snapshots are loaded as authored.

1. Search and click a part thumbnail to add it. Select parts from the assembly list or the canvas.
   **Quick attach:** Select an existing part and click a blue circular plus marker on a visible connection face. A hole offers compatible pin thumbnails; a pin endpoint offers parts with compatible holes. Choose a thumbnail to see the new part automatically aligned, then **Attach here**. Rotate 90° or Other end / hole adjusts the preview if needed. Insertion defaults to the selected hole cylinder depth and remains editable. × or Escape discards the preview; one Undo removes the newly attached part. Preview models never enter saved projects until applied. Candidate filtering uses circular radius within 0.25 mm, not certified fastener compatibility.
2. Drag a part's body directly. With **Auto attach** enabled, moving a pin near a compatible hole shows a translucent alignment preview and a green connection point; release to attach. Hold Alt to bypass attachment. Escape cancels the drag without consuming the previous redo history. **Depth** drags only the selected connected piece along its insertion axis, even when Move entire assembly is enabled.
   The floating part toolbar provides Rotate 90°, Reverse end, Duplicate, Unlink and Remove. Ctrl/Cmd/Shift-click parts or list entries to select multiple pieces and move them together. Numerical X/Y/Z and degree controls are available under **Precision · mm / degrees**. Use W for Move, E for Rotate. Snap is a position grid (1 mm) and angle increment (15°), not connector mating.
   To mate a pin and hole, select the moving part and click **Connect (C)**. Blue/green circular markers come from original STEP cylinder endpoints, not mesh bounding boxes. Choose source and target points by clicking their markers or using the dropdowns. Preview automatically aligns their axes; adjust insertion depth, Flip axis or Rotate 90°, then Apply connection. Cancel/Escape leaves the saved project unchanged. The default pin insertion follows the target cylinder depth; verify shoulder clearance and physical seating. Circular bosses and recesses can produce extra references; these are geometric assists, not certified connectors. Movement defaults to the selected part only, including after mating. Enable **Move entire assembly** to move the connected group together. Leave it off to adjust pin insertion while the beam stays stationary.
3. Orbit by dragging empty space, zoom with wheel/pinch, pan with right drag/two-finger touch. Fit view frames the model.
4. Arrange the first group of pieces, choose a camera, fill the step title/instructions and Record step & view. Continue adding pieces and recording cumulative steps. Select a step to preview it; Return to assembly resumes editing. New pieces have green bounds in preview and the guide.
5. Save project downloads JSON including all parts, historical step snapshots and cameras. Open accepts that JSON on another machine. Drafts are also saved in the same browser.
6. Export guide / PDF renders each stored view, its instruction and new-parts inventory; select Save as PDF in the browser's print dialog. It exports recorded steps, not unrecorded edits.

Delete removes the selected part. Ctrl/Cmd+Z undoes; Shift+Ctrl/Cmd+Z redoes. Ctrl/Cmd+S downloads a project. New asks through the app's React dialog before clearing the current draft. Save a file before starting another project.

## Known boundaries

### Mesh fit review

### Joint-preserving edits

Edits made by dragging, transform handles and numeric fields now preserve recorded analytic pin/hole joints before the collision check. Sideways movement chooses the nearest compatible same-facing hole on the existing target, or returns to the original axis. Individual editing corrects the edited piece without moving its neighbor. Axial adjustment is bounded by the current reference lengths and prior insertion; this is a geometric interval, not a measured retention specification. Use **Unlink** to deliberately detach. Multi-joint edits that cannot preserve all affected axes are rejected. Loose pieces can be staged away from mounting points; within 8 mm they snap to a compatible detected connector.

This enforcement applies to recorded `mate` relationships, not arbitrary imported coordinates. Square shafts, keyed bores, clips and electronic plug sockets are not covered by the circular-reference library and must not be presented as approved connections. They need separately verified feature profiles. Existing car coordinates without recorded joints remain an unverified layout.

### Collision scan

The inspector now lists selectable pairs under **Fit review**. Original CAD triangles are merged for analysis only and indexed with a BVH; the displayed CAD is unchanged. The background worker uses bounded vertex/edge probes and two-ray containment checks with a 0.15 mm surface tolerance. It distinguishes detected body penetration, sampled surface intersection and connector contacts requiring a seating review. A part inside a real opening is not classified as contained merely because its bounding box overlaps. Cable geometry is included.

**Prevent new body penetration** defaults on. A transform or added part that introduces a detected body-penetration pair is restored to its previous state. Existing project files can still be opened for repair; existing problematic pairs are not a physical-fit approval. The check is sampled and can miss small/thin intersections or behave imperfectly with open CAD shells. Circular-reference snapping remains a geometric aid, not certified fastener compatibility. Shaft/pin contacts are reviewable rather than automatically approved or rejected.

Numeric coordinates now commit while editing, on blur and Enter. The printable guide includes thumbnails and quantities of newly added pieces. Export is blocked when the current assembly or a recorded step has detected body penetration. Recorded views must still be reviewed for assembly order and attachment details; a clear scan is not physical certification. Connect rejects same-kind references and diameter differences over 0.25 mm; matching these analytic references still does not establish a certified joint.

The one-motor car's motor was moved from Z=33.911 to Z=52.961 mm so its flange sits outside the right rail; transmission pieces were repositioned. The sampled mesh audit no longer detects body penetration in this layout. Motor fastening, gear support and electronics holders remain unfinished; it is not a ready-to-build vehicle.

Circular alignment and insertion assistance is available, but collision-free certification, wiring simulation or real-world build certification is not claimed. Guides require teacher review for fastening, build order and physical feasibility. Very large assemblies can be slow on mobile GPUs. Part models are loaded on demand; all runtime modules are same-origin without CDN dependencies. Reloading the web page still requires the application server unless separately cached.

## Asset maintenance and validation

Run `node scripts/prepare-assembly.mjs` after changing the CAD reference library. It copies original GLBs, thumbnails and the local Three.js runtime to public/assembly. Check `npm run typecheck`, `node --check public/assembly/editor.js` and `node scripts/test-assembly.mjs` with a server on port 3120. The browser test covers project round-trip, independent snapshots, printable image generation, invalid import handling, custom confirmation, undo and responsive controls.

CAD sources: VEX Robotics, supplied GO kit 2021-05-17. Three.js is MIT licensed; the license is included under vendor.
