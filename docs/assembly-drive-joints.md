# Motor output / red-collar shafts

Original STEP measurement, 2026-10-08. Coordinates use [CAD X, CAD Z, -CAD Y].
Motor 269-6690-000 socket opens at CAD (0,31.755,0); internal square walls continue to Y25.35. Side planes have ~0.482 degree angular offset. Drive shafts 2234 and 2238 have a positive Z tip at 2.286 and red collar seating face at -3.175. The insertion limit is 5.461 mm, leaving the collar outside the motor. 2221 has its positive tip covered by the collar and is excluded from this short-end connection.

Square drive references reject circular pin references. The mating pose aligns both the axial direction and transverse square key; twist is quantized to quarter turns. Established joints clamp axial movement and correct lateral offset while individual movement preserves the other part.

Tests: test-drive-joint.mjs and test-joint-constraints.mjs pass. Browser Connect displays the dedicated Motor output socket and rejects a mismatched mounting hole. Existing loose imported layouts are not automatically rebuilt or certified. Other wheel/gear square hub profiles still require measurement; circular references elsewhere remain geometric aids, not complete device-specific certification.
