# Assembly usability implementation plan

**Goal:** Implement the usability improvements approved after the Assembly review.

**Architecture:** Preserve original CAD geometry and the primary mate tree. Derive and save secondary seated connections from actual geometry, rebuild guide snapshots from edited action order, and isolate inspection/motion previews from saved transforms. Use existing Three.js, Lucide and static editor modules.

## Delivery tasks

1. Add a connection review module: enumerate compatible seated contacts, persist derived contacts, show per-hole/depth feedback and multi-pin counts; distinguish expected connector contacts from body penetration.
2. Add mechanical review: report stale joints, disconnected pieces, insufficient shaft engagement and missing wheel retention without certifying physical operation.
3. Correct shaft wording. Add guide title/note editing, dependency-safe reordering, camera presets and saved preferences; rebuild cumulative snapshots before print.
4. Add nested Layers with inherited visibility/locking, stable instance names, search, safe drag grouping and cycle rejection.
5. Add named camera views, selection framing, reversible inspection transparency and narrow-screen panel layout.
6. Add a kit inventory panel with verified quantities/provenance and explicit unknown mappings, count integrated tires separately.
7. Add reversible selected drive-stack rotation preview, with range and collision checks, preserving all authored transforms. Clearly scope as kinematic inspection.
8. Verify pure logic against multi-pin, shaft stacks, nested groups and guide dependencies; verify UI against the original car and supplied projects. Run encoding checks and Gemini review. Do not commit/push unrelated working files.

## Checks

- `node scripts/test-assembly-usability.mjs`: connection counting, stale contacts, grouping cycles, inherited flags, safe guide order and retention.
- Existing mating, joint constraints, guide and API tests: preserve attach/undo/export behavior.
- UI: library search, Layers filtering, quick attach feedback, guide editing/reorder/preview and camera controls on desktop/narrow viewport.
- PDF: regenerate guide and inspect preparation, representative assembly and completed-model pages.
- `python scripts/check-encoding.py`: no encoding regressions.

The user approved the preceding feature proposal. Implementation proceeds in this checkout to preserve the active localhost app and existing work.
