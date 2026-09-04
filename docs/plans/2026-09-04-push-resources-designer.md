# Push missions, solution resources and field designer

Extend local Training without pushing or deploying. Preserve existing magnetic cargo behavior by making pushing opt-in per block (`pushable: true`, interpreted as push-only). Stop at walls or other blocks; never move objects through them. Verify push delivery and reset.

Create twelve push exercises with distinct approach/turn/order problems. Generate worked solutions for these and existing navigation/curriculum exercises, simulate each solution before publishing local downloadable Blockly projects, and expose steps plus downloads inside missions.

Replace the tap-only field editor with a dedicated diagram-style canvas: palette, select/drag, wall/zone resize handles, properties, duplicate/delete, keyboard nudges, undo/redo, zoom and snap. Use pointer events for mouse/touch. Commit a drag only at pointer-up to avoid resetting the simulator every frame. Preserve field JSON and local library saving.

Validate engine behavior, all generated solutions, designer interactions and persistence, then production build. This is an editor inspired by diagram tools, not a draw.io file-format implementation.
