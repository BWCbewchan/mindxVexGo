# Assembly API combination audit

Kit catalog: 75 part types.

| Sweep | Cases | Result |
|---|---:|---|
| Connector compatibility and constraint math | 1,943,236 reference pairs | 0 failures |
| AI attach command (in-memory transactions) | 320,220 | 0 failures |
| Incompatible SKU pairs via API | 3,272 | All rejected |
| CAD default-pose check | 1,032 compatible unordered SKU pairs | 550 joint contacts, 482 no detected contact, no non-joint penetration reported |

The API sweep considers all 5,625 ordered SKU pairs, including identical types. Compatible reference pairs are evaluated at zero, half and full insertion, paired with twist angles 0, 90 and 180 degrees. These are discrete cases, not the continuous space of every possible pose.

The CAD sweep loads all 75 models but tests one canonical connector combination and default pose per compatible SKU pair. It uses the current collision policy, including intended connector-contact exemptions. It does not independently certify that a body cannot penetrate another body around an exempted joint. No detected contact does not prove a physical connection.

Browser tests passed for real API integration: validation, attachment, cycle prevention, locked children, Undo/Redo, collision rollback, command serialization, grouping and supplying required electronics. Additional regression checks passed for four-pin seating and shaft sliding.

Tire and Orange Rubber Band do not have declared connector references. Their flexible assembly is unsupported by attach. Multi-part arrangements, all alternative CAD reference combinations, continuous rotation/depth, manufacturing tolerance and physical kit construction remain outside this audit. Do not describe this result as universal physical compatibility.

Reports: artifacts/assembly-tests/compatibility-audit.json, ai-combination-audit.json, cad-pair-audit.json. Reproduce using scripts/audit-assembly-compatibility.mjs, audit-assembly-ai-combinations.mjs, audit-assembly-cad-pairs.mjs and test-assembly-ai-api.mjs.
