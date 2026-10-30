# VEX IQ guide repair

Reproduced with the supplied 26-part Code base. Original guide inference recovers only 10/13 missing forest links and blocks the export. Repair recovers all without moving parts, but the guide re-roots on Smart Motor and merges a beam plus seven mounting pins from different faces into one cumulative step. Alphabetic/UUID ordering then closes frame members before completing their supports. Rendering explodes every new member along one joint axis, which cannot describe that mixed batch.

Implement a VEX IQ-only planner using seated CAD contacts (including secondary mounting holes), a structural beam anchor, supported pin batches from one face, complete supports before closing members, and axial inside-out order. Preserve positions and the project editing tree. Every emitted step remains cumulative with a real already-supported attachment. Keep the GO planner unchanged. Use a stable overview while detail views follow the active joint. Test the exact model, reordered IDs, missing/reversed editing mates, pin batch axes and existing GO tests. Export and visually inspect the resulting guide before delivery.

## Verified result
17 cumulative steps cover all 26 original parts exactly once. File order, UUID renaming and removal of editing mates preserve the plan. Same-face pin batches have supported anchors; axial wheel/spacer/retainer cases preserve inside-out order. The original app produced a 19-page PDF (one inventory, 17 instructions, one finished model), inspected across all pages. Model poses and saved state remain unchanged through export. Existing GO ordering/pin-batch/wheel-spacer tests, IQ CAD three-part export, TypeScript, build and encoding checks passed.

## Second review: insertion feasibility

The first release checked final contacts and graph order but did not establish insertion routes. The user correctly rejected the resulting instructions. CAD withdrawal sampling reproduced a flanged Motor Shaft trapped between the already installed motor and frame; the capped shaft illustration also used a middle bearing and a 35 mm offset despite needing more than 60 mm of travel.

A new IQ route audit tests straight withdrawal axes against original mesh bodies at 1 mm intervals (assembly reverses that path). Only declared elastic round-peg tip zones are excluded for snap fitting; shoulders, carrier bodies and shaft flanges remain obstacles. Rubber collar / shaft interference is an intentional friction interface, not a rigid-body collision exemption for other parts. This is sampled CAD evidence, not a physical build test.

The planner searches with future-route lookahead: a candidate is rejected if installing it would block every route of a remaining piece. The selected motor shaft goes through the frame before the motor; the motor is then aligned with the short shaft end and four mounting pins. The capped shaft uses the first entry connector and the complete withdrawal distance. Future obstacles become prerequisites so manual reordering cannot close those paths. If no supported straight-line sequence is found, export is blocked and identifies the need for a separate preassembly instead of inventing an insertion.

Regression verifies all 26 pieces and complete raw-mesh sweeps for both shafts, explicitly reproduces the blocked old route, checks the entry side and >60 mm travel, preserves source poses, and refuses an artificially blocked model. The app export additionally requires sampled path metadata; the metadata-only draft cannot pass that integration test.
