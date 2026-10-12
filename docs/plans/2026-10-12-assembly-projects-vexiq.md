# Assembly projects and VEX IQ

User-approved scope: `/assembly` becomes a Photoshop-style project home. Each project uses `/assembly/vexgo/<id>` or `/assembly/vexiq/<id>`, with independent autosave, recent projects and original CAD libraries.

Implementation:
1. Store project data separately from a recent-project index; migrate the existing GO draft without deleting its original key. Add create/import/open/rename/duplicate/trash/restore workflows with custom dialogs and storage error reporting.
2. Add validated asynchronous Next route params and an editor host with project navigation and same-origin save notifications. Unknown IDs must not overwrite another project.
3. Reuse the editor with explicit platform configuration, asset roots, electronics and mating rules. IQ SKUs must not inherit GO geometry, quotas or hand-authored socket rules.
4. Convert all 478 supplied STEP files to original-color GLB. Keep source hashes, unique IDs for duplicate-SKU variants, conversion status and analytic round/square references. Produce previews from actual GLB, not replacement illustrations.
5. Verify creation/reopen/autosave/isolation/migration, wrong-platform import rejection, IQ pin/beam and shaft/socket behavior, history and guide export. Inspect the home and both editors in browser; run TypeScript and encoding checks.

Persistence is local to this browser, matching the current editor; do not imply cloud synchronization or shared project URLs. Physical fit and kit quantities for the entire IQ catalog remain separate from CAD conversion.
