# Assembly connection usability

User requested easier pin-to-part assembly. Implement circular geometric mating references extracted from supplied STEP analytic cylinders, converted to the existing mm Y-up frame. Do not replace or recenter any original meshes.

Interaction: Select moving part → Connect (C) → blue source reference + green target hole → preview axis alignment/insertion/twist → Apply or Cancel. Select points directly or from dropdowns. Prefer front-facing nearby holes. Include a pins/shafts category for parts with exterior circular references and no holes. Joined groups move together; Undo reverses mating and group moves.

Validation: 60 nontrivial rotated-coordinate cases and linked-group invariants; real browser preview does not mutate saved state, apply does, Undo/Cancel restore it; retain all original editor regression checks. Manually review the assembled pin/beam screenshot.

Limits: analytic cylinder endpoints are geometric references, not verified shoulder/retention seats; outside bosses/recesses may create extra references. Insertion depth follows the selected target cylinder segment and remains editable. AABB overlap warnings remain conservative. Real fastener feasibility still requires teacher review.
