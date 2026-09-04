# Training curriculum implementation plan

**Goal:** Expand from 42 to 72 missions, with visible horizontal difficulty selection and distinct reasoning prompts for each new mission.
**Architecture:** Retain the existing gallery and simulator. Add ordered checkpoints to fields, lesson focus/hints to catalog entries, and check checkpoint completion before awarding the goal. Keep all changes local; no push or deployment.
**Tech Stack:** Next.js, React, existing Blockly interpreter and JavaScript simulator.

1. Add 24 individually authored checkpoint routes and six cargo routes to a separate curriculum source, each with a distinct focus, task statement and hint. Avoid recoloring the same exercise to inflate the count.
2. Extend engine state with ordered checkpoint progress; reset clears progress. Delivery missions must satisfy both checkpoint sequence and delivery criteria when checkpoints exist.
3. Display checkpoint sequence, current progress and expandable thinking hints in the workspace. Persist checkpoint data in custom JSON and validate imports.
4. Replace the Difficulty select with a horizontal, wrapping button group, selected styling, aria-pressed and per-level counts. Keep search and add clear results counts.
5. Verify geometry, ordered goal gating and reset with engine tests. Verify each added route with the actual engine, accounting for the robot size, and inspect filtering in desktop/mobile browser. Run production build.

Evaluation checks physical outcomes and checkpoint order. A suggested coding technique is a learning prompt, not an AST-enforced requirement: alternate correct solutions remain valid.
