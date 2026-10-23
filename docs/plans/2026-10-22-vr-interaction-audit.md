# VR interaction and command reliability implementation plan

**Goal:** Make the existing Assembly VR lab usable for complete classroom programs and interactive playground challenges, with explicit evidence for supported commands.

**Architecture:** Retain the locally bundled Blockly editor and sandboxed interpreter. Add a shared capability registry for the simulator's actual block types, engine-level interactions and canonical state, and render that same state in Three.js. Keep old Training lessons compatible. Preserve the user's CAD and per-project programs.

**Tech stack:** Next.js client UI, Blockly, JS Interpreter, Three.js, Node assertion suites and isolated Chrome integration tests.

## Research and boundaries

Inspect official VR Blocks reference, playground catalog and public activities catalog. Inspect free playground UI without accessing paid playgrounds. Compare command families, drawing, navigation, colored objects, pushing, magnetic delivery, control flow and feedback. Record paid/specialized robot features as unsupported rather than claiming equivalent coverage.

The chosen implementation expands the existing engine instead of embedding a third-party VR app (which cannot run custom Assembly CAD), or replacing the entire editor/physics stack (which would destabilize existing projects). The user has authorized comprehensive testing and improvement of the current app.

## Tasks

1. Audit registered blocks, palette entries, field schemas and generators. Build command scenarios with expected positions, headings, logs, variables and sensor results. Capture a machine-readable coverage report and regression failures before fixes.
2. Repair interpreter semantics: distinct physical orientation vs resettable heading/rotation readings; movement timeout; turn target `and don't wait`; print precision; control flow and supported variable/list blocks. Validate all event roots so unsupported stacks cannot silently disappear.
3. Make a single explicit capability list drive validation, toolbox and the support reference. Do not admit arbitrary prefix-matched blocks with missing generators. Add safe simulator-specific location/drawing blocks where GO lacks VR equivalents.
4. Add push/delivery/drawing/navigation playgrounds and original graded challenges. Validate starts/goals against the CAD footprint. Render movable objects, destinations, checkpoint progress, sensor ray and pen strokes from actual engine state. Reset must restore the whole field.
5. Add clear challenge instructions, suitable hardware requirements, example programs with confirmation, score/progress and accessible feedback. Keep custom robot priority; make sample capabilities explicit. Add overview/fit controls that frame actual field size.
6. Test each advertised command and field variant, representative combined programs, every new challenge, nonblocking movement, pause/wait/timers, reset, timeout, collision, sensor occlusion, push/delivery and source preservation. Run existing Training regressions, typecheck, build and encoding checks. Inspect the working UI.
7. Publish a source-backed audit and coverage report explaining what was executed, documented only, unsupported or inaccessible. Do not call the product a complete VEXcode VR implementation.

## Acceptance

- Every advertised block has a passing generator/runtime scenario or an explicit structural role tested within a valid program.
- Hidden or unsupported code is rejected with a clear message; no silent loss of event stacks.
- Pushed/picked/delivered objects, pen drawings and challenge progress match what the student sees.
- Custom CAD, source project data and existing Training scenarios remain intact.
- References: https://api.vex.com/vr/home/blocks/index.html ; https://api.vex.com/vr/home/playgrounds/index.html ; https://education.vex.com/stemlabs/vr/activities ; https://vr.vex.com/ .
