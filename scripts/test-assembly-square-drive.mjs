import assert from 'node:assert/strict';
import fs from 'node:fs';
import { compatibleReferences, insertionLimit } from '../public/assembly/connector-policy.js';
import { matingPose, worldReference } from '../public/assembly/mating.js';

const refs = JSON.parse(fs.readFileSync('public/assembly/connectors.json', 'utf8')).parts;
const squareProfile = JSON.parse(fs.readFileSync('scripts/assembly-square-profiles.json', 'utf8')).parts;
const feature = (sku, id) => refs[sku]?.find(ref => ref.id === id);
const squareSockets = Object.entries(refs).flatMap(([sku, partRefs]) => partRefs
  .filter(ref => ref.profile === 'square-drive' && ref.kind === 'hole')
  .map(ref => ({ sku, ref })));
const squarePins = Object.entries(refs).flatMap(([sku, partRefs]) => partRefs
  .filter(ref => ref.profile === 'square-drive' && ref.kind === 'pin')
  .map(ref => ({ sku, ref })));

assert.equal(Object.keys(squareProfile).length, 14, 'Curated square geometry covers the documented GO square-hole families and square shafts.');
assert.ok(squareSockets.length >= 15, 'Square bores exist in their CAD parts.');
assert.ok(squarePins.length >= 7, 'Square shaft/peg ends exist in their CAD parts.');

for (const { sku, ref } of [...squareSockets, ...squarePins]) {
  assert.ok(Math.abs(ref.width - 3.175) < 0.1, `${sku}/${ref.id} must match the VEX GO square-drive width within CAD tolerance.`);
  assert.ok(ref.depth > 0 && ref.maxDepth > 0 && ref.maxDepth <= ref.depth, `${sku}/${ref.id} must have a positive physical insertion limit no greater than its modeled bore/end depth.`);
  assert.ok(ref.point.every(Number.isFinite) && ref.normal.every(Number.isFinite) && ref.key.every(Number.isFinite));
}

for (const { sku: pinSku, ref: pin } of squarePins) {
  for (const { sku: socketSku, ref: socket } of squareSockets) {
    assert.equal(compatibleReferences(pin, socket, pinSku, socketSku), !pin.excludedPartSkus?.includes(socketSku) && !socket.excludedProfiles?.includes(pin.profile) && !(pin.id === 'short-drive-end' && ['228-2500-1383', '228-2500-1384'].includes(socketSku)));
  }
  assert.equal(compatibleReferences(pin, { kind: 'hole', radius: 2.1 }), true, 'Square shaft in standard round bore must be free-spinning compatible.');
  assert.equal(compatibleReferences(pin, { kind: 'hole', radius: 3.175 }), false, 'A wide bearing/clearance hole is not a standard shaft bore.');
}
for (const { ref: socket } of squareSockets) {
  assert.equal(compatibleReferences({ kind: 'pin', radius: 1.6 }, socket), false, 'Round pegs must not be treated as torque-transmitting square fits.');
  assert.equal(compatibleReferences({ kind: 'pin', radius: 3.175 }, socket), false, 'Oversized pin-like geometry must not enter a square bore.');
}

const motorSocket = feature('269-6690-000', 'motor-output');
const motorMountingBore = refs['269-6690-000'].find(ref => ref.kind === 'hole' && ref.id !== 'motor-output');
const redShaftShort = feature('228-2500-2234', 'short-drive-end');
const redGearSocket = feature('228-2500-2180', 'square-hole-front');
const grayWheelSocket = feature('228-2500-1383', 'square-hole-front');
const grayPin = feature('228-2500-328', 'square-drive-end');
const blueWheelRoundBore = refs['228-2500-1384'].find(ref => ref.kind === 'hole' && !ref.profile && ref.radius >= 2 && ref.radius <= 2.6);
assert.ok(motorSocket && redShaftShort && redGearSocket && grayWheelSocket && grayPin && blueWheelRoundBore);
assert.equal(compatibleReferences(redShaftShort, motorSocket, '228-2500-2234', '269-6690-000'), true);
assert.equal(compatibleReferences(redShaftShort, motorMountingBore, '228-2500-2234', '269-6690-000'), false, 'Square shafts must not snap to round mounting holes on the motor housing.');
assert.equal(compatibleReferences(feature('228-2500-2234', 'square-long-shaft-end'), motorSocket, '228-2500-2234', '269-6690-000'), false, 'The long shaft end must not be inserted into the motor output.');
assert.equal(compatibleReferences(redShaftShort, redGearSocket), true);
assert.equal(compatibleReferences(redShaftShort, grayWheelSocket), true);
assert.equal(compatibleReferences(redShaftShort, blueWheelRoundBore), true, 'A round-center wheel is a free-spinning shaft bearing.');

for (const [sourceRef, targetRef] of [[redShaftShort, motorSocket], [redShaftShort, redGearSocket], [redShaftShort, blueWheelRoundBore]]) {
  const source = { position: [17, -8, 31], rotation: [27, 61, 13] };
  const target = { position: [-10, 23, 9], rotation: [11, -31, 42] };
  const depth = Math.min(4, insertionLimit(sourceRef, targetRef));
  const pose = matingPose(source, sourceRef, target, targetRef, { depth, twist: 37 });
  const matedSource = worldReference(pose, sourceRef);
  const matedTarget = worldReference(target, targetRef);
  const delta = matedSource.point.clone().sub(matedTarget.point);
  assert.ok(delta.clone().addScaledVector(matedTarget.normal, depth).length() < 1e-7, `${sourceRef.id} → ${targetRef.id}: mated reference axes must share the requested insertion depth.`);
  assert.ok(matedSource.normal.dot(matedTarget.normal) < -0.999999, 'Mated reference normals must oppose.');
}

console.log(`PASS: ${squareSockets.length} square sockets × ${squarePins.length} square pins; round-bore free spin, false-fit rejection, CAD placement and insertion-depth alignment.`);
