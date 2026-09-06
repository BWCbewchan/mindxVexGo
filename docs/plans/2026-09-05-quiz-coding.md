# Quiz Coding Tasks Implementation Plan

**Goal:** Add lesson-specific Blockly workspaces, virtual fields and submission feedback to homework.

**Architecture:** Extract numbered source missions into a separate manifest. Reuse the Training engine, Blockly bridge and interpolated robot renderer. Explicit assessment profiles cover only supported, unambiguous tasks; other original tasks retain their requirements and receive teacher-review status. Submission resets the field and runs current code with a unique attempt ID, preventing previous runs from counting.

**Tech Stack:** Next.js client components, TypeScript, existing JS interpreter, SVG, browser storage.

1. Build a reproducible mission manifest from extracted homework, deduplicating answer-key copies. Preserve original requirements and identify unsupported physical mechanisms. Add curated simulation criteria for simple driving, turning, square routes and sensor stops.
2. Extend the bridge with isolated submission IDs, sensor observations and completion reports. Keep existing Training commands compatible. Store code in the existing per-lesson namespace.
3. Add a Coding task tab with task selector, source requirements, run/stop/reset/submit, collapsible map, criteria feedback and local submission record. Lock assessed fields and never treat an unsupported task as passed.
4. Validate empty code, correct and incorrect solutions, fresh-run reset, stopped runs, storage isolation, mobile layout and Training regressions. Run the production build.

The user approved this design. Work remains local; no commit or push is requested.
