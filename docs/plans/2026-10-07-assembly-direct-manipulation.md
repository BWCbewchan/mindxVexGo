# Assembly direct manipulation

User approved efficient general-purpose interaction, not a child-only editor.

Implement direct surface dragging on a camera plane, candidate circular pin/hole alignment within 6 mm, visible ghost preview and snap on release (Alt bypass). Do not snap multiple selected parts or insertion-depth edits. Preserve original CAD geometry and teacher fit-review limits.

Add context actions beside selection: local/connection-axis 90° rotation, reverse connector end, duplicate, detach and remove. Add a dedicated axial insertion handle for mated pieces that moves only the selected piece, even when group movement is enabled. Keep numerical fields in expandable precision controls.

Allow Ctrl/Cmd/Shift selection in both canvas and assembly list; translate/rotate selected pieces with one transform delta and one undo entry. Clear detached/dangling mating links on explicit detach/remove. Distinguish selecting a socket from dragging part surfaces.

Verify solver rejection/acceptance and orientation, real browser drag/drop, Alt bypass, axial depth adjustment with stationary target, group selection, undo/cancel, context actions and existing saved projects/step exports.
