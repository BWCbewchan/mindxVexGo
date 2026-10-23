# Assembly Virtual Programming Implementation Plan

**Goal:** Program an existing Assembly robot or a ready-to-use sample in a 3D playground.

**Approved direction:** Both robot sources, prioritizing the user's assembled robots. Reuse the local Blockly editor and sandboxed Training interpreter, rather than introducing a second block language.

**Architecture:** `/simulation` hosts the existing Blockly editor and an isolated Three.js viewer. Same-origin messages carry field settings and pose telemetry. CAD and its assembly remain unchanged; drivetrain calibration and playground choices use separate per-robot storage. New runtime features are gated by `simulation=assembly` so existing Training lessons retain their behavior.

**Tech Stack:** Next.js client components, existing Blockly/JS interpreter, Three.js, localStorage and Playwright.

## Work

1. Add a pure simulation configuration module and failing tests: validate drivetrain IDs, detect real devices, build field presets, preserve the source model and validate calibration.
2. Make the Training engine accept a bounded robot radius. Add swept motion substeps and test that large robots and fast moves cannot pass through walls; retain the default 45 mm radius for existing Training.
3. Add simulation-only pause/resume, a clearly labeled 0.1-second step and simulation-clock waits/timers. Calculate speed from wheel diameter, track width and configured maximum RPM. Reject device blocks absent from custom robots.
4. Add a Three.js viewer that loads original GO/IQ CAD, hides electronic cable meshes, preserves colors, frames the entire robot and reports its physical ground footprint. Render floor, goal, obstacles, eye ray and optional trail; expose top/isometric/follow cameras.
5. Build the `/simulation` UI with existing-project selection, a sample robot, drivetrain settings, field presets, run controls and live telemetry. Preserve code using the editor's existing per-lesson autosave and project-file features.
6. Add an Assembly launch button and a project-home entry. Save current Assembly data before entering simulation.
7. Run core/Training regressions and browser checks for sample execution, custom CAD loading, paused motion/waits, reset, collision, storage isolation and malformed model handling. Inspect rendered screenshots and run typecheck/encoding checks.

## Scope limits

This release models a rigid differential-drive robot on a flat surface. Collision uses a conservative circular CAD footprint. It does not certify wheel traction, payload, gear meshing, torque, linkage behavior or competition legality. A custom robot must have two distinct drive motors, at least two wheels, a Brain and a battery. Missing physical sensors are not synthesized as working code devices. The sample has virtual sensors explicitly identified as such.
