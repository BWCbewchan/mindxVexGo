# Assembly API for AI

The loaded Assembly page exposes `window.mindxAssembly` in the editor and its same-origin parent page. This is a browser API; it is not a public HTTP endpoint or an AI chat service.

```js
const api = window.mindxAssembly;
await api.execute('listParts', {query: 'motor'});
const added = await api.execute('addPart', {
  sku: '228-2500-001', position: [0, 40, 0], rotation: [0, 0, 0]
});
const id = added.result.id;
await api.execute('getConnectors', {id});
await api.execute('setTransform', {id, position: [0, 50, 0]});
await api.execute('undo');
```

All calls return `{ok:true,result}` or `{ok:false,error}`. Positions and insertion depths use millimetres; rotations and twist use degrees. Use exact part IDs and reference IDs returned by the API. Calls run sequentially. Mutations have Undo and reject new mesh penetrations, restoring the previous project if they fail. Geometry checks do not certify physical buildability.

| Command | Arguments |
|---|---|
| getState | none |
| listParts | optional query, category |
| getConnectors | id |
| select | ids array |
| addPart | sku; optional position and rotation arrays |
| setTransform | id; position and/or rotation arrays; releases the part's parent joint and child joints; fails if a child is locked |
| attach | id, targetId, sourceRef, targetRef; optional depth, twist |
| snap | id; searches compatible nearby joints |
| detach | id; releases the part's parent joint and child joints; fails if a child is locked |
| deleteParts | ids array |
| group | ids array, optional name |
| ungroup | ids array |
| setLayer | id; optional boolean visible, locked |
| checkFit | none |
| getGuide | none; ready, blockers, steps |
| exportProject | none; returns JSON data without downloading |
| exportGuide | none; opens browser print flow, requires a ready guide |
| undo / redo | none |

Example connection:

```js
await api.execute('attach', {
  id: pinId, targetId: beamId, sourceRef: '4', targetRef: '2'
});
```

Do not assume these example references fit other SKUs. Query connectors and inspect compatibility errors first. Adding electronics also supplies missing Brain/battery using the existing app rule. An external AI needs an authorized browser executor to call this API; exposing it does not grant filesystem, network or cross-origin access.
