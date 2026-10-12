# Assembly collision improvement

User authorized implementation of more realistic assembly, without opening Studio. Follow the installed Studio manuals' distinction between connectivity and placement. Do not copy LEGO compatibility rules.

1. Add local three-mesh-bvh runtime and a cached mesh collision analyzer. Broad phase uses mesh boxes; narrow phase tests triangle intersections and point containment with a surface tolerance. Separate uncertain surface crossings and connector contact from detected body penetration. Never certify physical fit from this test.
2. Replace undifferentiated box counts with a selectable issue list, clear diagnostic state and optional protection against new detected body penetration during transform edits. Opening an existing project remains allowed. Failed edits restore geometry and undo state; do not reject the historical draft merely because it already has issues.
3. Fix numeric edit persistence, debounce expensive diagnostics, preserve original CAD. Test crossings, containment, touching, separated boxes, rotated geometry and connector cases using synthetic closed geometry.
4. Revise the car layout only with measured collision evidence. Keep unresolved fastening explicitly marked. Prepare cumulative preview steps, not certified student build instructions.
5. Verify syntax, encoding and geometric tests, then inspect the updated application and model through the browser.
