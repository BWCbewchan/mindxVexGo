# Recover assembly joining, navigation and Guide responsiveness

## Reproduced failures

Actual user IQ file contains79parts. Seated geometry has two chassis components40/39, while saved editing mates fragment into26trees. Group selection disabled auto snap; explicit Connect moved only the selected pin and overwrote its previous parent. Correct join pin11e440d1 ref6 to crossbeamda50a8db hole9 seats two exposed pins (other61acce9f tohole4), with39rigid members moving and40static members untouched.

## Implemented

- Assembly graph from valid authored edges plus actual geometric contacts; rigid closure, rooted spanning tree, multi-contact candidate scoring, occupied connector filtering, cached context and snap previews for groups/gizmos.
- Explicit Connect previews/cancels whole clusters, searches/picks existing target parts, recommends two-pin seats and applies one undoable connection. Quick attach links to existing-part workflow.
- Group motion respects locked members and preserves internal joints; single keyed-joint constraints remain enforced.
- Host API ownership follows only the ready iframe; Back restores bindings, pending/retried editors cannot leave stale host APIs. File exports stay in File. Header projects navigation preserves drafts, chooses correct platform when opening JSON, validates route identity before creating an iframe, handles missing projects and nonfatal import errors.
- Always-visible Guide/PDF shortcut; advanced step DOM built only when expanded.
- GUI uses a structural connection/support/retainer plan by default. The unedited structural plan is cached separately from presentation preferences, so reset/undo cannot retain stale titles or cameras. Experimental full CAD insertion-path search is explicit, cached separately and never hides previews on failure. IQ/LEGO plans not passing it are clearly draft/review-required in preview and printed steps. Strict pure generator behavior remains unchanged.
- CAD path corridor bounds cached per static mesh; identical audit results, measured 1572→1300 ms (17% less) on 26 parts in the IQ platform context. Adaptive display pixel ratio1while moving, max1.5idle.

## Evidence and limits

Real IQ79 WebGL startup 19949→4062 ms; maximum startup long task15566→646ms. Structural plan59steps; physical contact join79connected, all authored/re-rooted mates valid and no new body penetration. All38candidate guide roots failed the single-piece sampled path checker: this is reported rather than falsely certified. GO54 remains31steps. User file is preserved; repaired copy is written separately.

## References used for interaction principles

Studio Snap: https://studiohelp.bricklink.com/hc/en-us/articles/5412087360919-Snap
Studio submodels and instruction editing: https://studiohelp.bricklink.com/hc/en-us/articles/7123933495959-Submodels-in-Step-Editor
These informed cluster-level manipulation and separation of building from instruction authoring; source implementation was not copied.

## Verification

`test-user-iq-assembly-join.mjs`, `test-user-iq-join-ui.mjs`, `test-assembly-workspace-navigation.mjs` (three Back cycles), `test-assembly-api-navigation.mjs`, `test-guide-presentation-cache-ui.mjs`, `test-joint-constraints.mjs`, `test-drive-joint.mjs`, `test-iq-insertion-paths.mjs`, `test-guide-pdf-preview-ui.mjs`, profile-iq-guide-readiness and IQ59draft print smoke; typecheck/build/encoding. No commit/push in this task.
