# Assembly for children — proposed redesign

Status: design proposal awaiting user review. Existing CAD editor remains available.

## Observed problems

- The toolbar exposes Translate/Rotate, snapping, linked movement, file controls and panels at once. Six numeric axes compete with the model.
- Part thumbnails use CAD codes rather than verified friendly names and categories.
- Quick attach uses cylindrical endpoints and diameter tolerance. This includes recesses and shaft bands, and cannot establish a child's intended insertion seat.
- A blank workspace provides no initial model, next action or short guided task.
- Build step authoring and geometric checks share the learner's inspector.
- Browser storage currently has one local draft, not per-student identities or shared classroom progress.

## Recommended interaction

Default to a learner mode: choose a pictured piece, tap a highlighted compatible socket, see a short insertion preview and keep it. Offer rotate left/right, remove and undo as large contextual buttons. Advanced mm/degree controls belong in the teacher editor. Hide geometric reference codes in normal play, retaining them in a teacher detail panel.

Start with a small set of CAD-confirmed beams, plates and pins. Record a connection registry with the real pin axis, shoulder/seat plane, intended insertion distance, hole entry plane, permissible orientation and nominal fit. Do not expose every cylindrical endpoint as a learner-facing connector. Do not claim automatic compatibility from radius alone. Expand the registry after visual and geometry validation.

Provide a free-build entry and short teacher-approved guided builds. Show a next-piece thumbnail, target socket highlight and one-step hint. Preserve a manual preview/recovery route where a connection has not been validated. Make candidate choices easy to distinguish by shape, length and verified color; do not invent official names.

## Deployment scope

First phase: learner mode, teacher mode, verified connector subset, contextual controls, autosaved named local projects and existing project file import/export. Small-screen hit targets and demand-driven rendering should be verified on touch devices. Individual project cards prevent one learner's local draft from replacing another's within the same browser.

Accounts, cloud storage, teacher assignments and class-wide submissions require a separate data and identity design; local project cards do not constitute multiuser isolation or synchronization.

## Alternatives

1. Keep polishing the existing CAD panel: less work, but keeps the main cognitive burden.
2. Learner mode plus teacher editor: recommended; supports creativity and controlled precision.
3. Guided builds only: easier to learn, but restricts original models.

## Acceptance checks

- A learner can attach a validated pin to a validated beam without entering coordinates, choosing an analytic endpoint or editing insertion depth.
- Undo and removal restore a sensible assembly without changing unrelated pieces.
- Socket markers remain reachable on touch screens and do not obscure neighboring sockets.
- An unverified socket never advertises a guaranteed fit.
- Local project switching preserves each project's parts, snapshots and cameras independently.
- Conduct a small supervised learner trial to measure independent task completion; automated geometry/UI tests alone do not prove usability for children.
