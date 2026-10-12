# Assembly UX review — 2026-10-08

## Verified improvements

- Motor rendering merges identical static material groups: 1,084 meshes become 11, retaining 109,314 triangles and the original bounds. CAD source files are unchanged.
- Browser selection of two rails, deletion (20 → 18), and Undo (18 → 20) verified. Removing a selected group also clears references to removed targets.
- No-result part search now explains how to recover. Invalid selection actions are disabled; object lists cannot mutate selection during loading/checking.
- Numeric coordinates commit on Enter or blur. This avoids replacing the input during a pause in typing.
- Parts/Inspector toggles expose their state. Close buttons and one-open-panel behavior preserve the mobile canvas. Crossing the mobile breakpoint collapses both panels.
- Workspace height follows the actual wrapped header. Options consolidates snap, group movement, auto-attach and collision protection.
- Fit view uses horizontal and vertical camera fields of view, including narrow viewports. F fits; Escape closes previews/deselects. Save shortcut is intercepted while editing fields.

## Scope and remaining limits

Checked the current 20-part browser draft and a 390 × 844 responsive viewport, not physical phone hardware. Tests cover motor geometry preservation, joint constraints, syntax, encoding and TypeScript. Rendering changes do not certify mechanical fit. Square shafts/keyed hubs and electronic connector profiles remain unresolved. Many library parts still have SKU-only names; do not invent physical identities from thumbnails. Cumulative step reordering still requires assembly-order review. No push/deployment performed.
