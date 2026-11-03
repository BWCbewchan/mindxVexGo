# Smooth inline guide editor

Measured failure: 25 pointer moves caused zero image updates during a gesture. The previous controller resets a 100 ms debounce on every pointer move, then recreates CAD clones and encodes a 1000px PNG. Camera commits also regenerate the full assembly planner and rebuild thumbnails. These paths cannot provide direct manipulation.

Replace the blocking dialog with an inline Guide card inspired by the reference's interaction layout, without copying its unlicensed application source. Keep a small thumbnail strip, Lucide icon toolbar, white model card, parts/quantity tiles and note. Widen the active Guide inspector and allow an optional wider dock. Collapse advanced step-order/note editing rather than duplicate large cards.

Add a retained WebGL scene for the selected step. Prepare clones/edges/annotations once per geometry revision, then update only its camera at requestAnimationFrame. No model loading, PNG readback or planner run during dragging. Capture a small thumbnail and commit one undoable preference change on release. High-resolution export remains independent.

Invalidate prepared scenes only for parts/pose/appearance changes, not camera preferences. Camera-only edits reuse the existing validated plan. Keep pause/stale/refresh, auto cameras, apply-all, default camera inheritance, PDF/ZIP and no-WebGL behavior.

Verify frame counts during timed dragging, zero readbacks/commits during pointer moves, one commit afterward, model/camera isolation, persistence, zoom/rotation/reset/apply-all, inline layout and ZIP/legacy exports. Compare the measured baseline; never claim a particular FPS on untested devices.

Additional measured causes: pointer input and readout mutations in the preview woke the main CAD scheduler. GO's wiring visibility poll also rewrote identical text every 500 ms, waking the full renderer despite unchanged state. Filter preview-only input/mutations and only update the wire button when its value changes. Verify zero main viewport clears during the live drag.
