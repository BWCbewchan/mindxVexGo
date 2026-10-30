# Assembly Help, API and local MCP

Open an Assembly project, then **Help → Hướng dẫn thao tác**, **Phím tắt** or **AI / API & MCP**. F1 opens Help. GO and IQ use the same documentation interface and the active platform's catalog. The quick tour highlights the real controls without changing CAD or the camera.

## Workspace and renderer-independent JSON API

`/assembly` opens a persistent guest VEX GO workspace immediately. No sign-in or project picker is required. The existing project manager (GO, IQ and LEGO) is at `/assembly/projects`; **File → Dự án của tôi** opens it. Existing project URLs and local drafts remain supported.

The same-origin editor and its host expose `window.assemblyAPI` from page load. Calls made before initialization wait for the backend. Await `ready` to diagnose initialization failures explicitly:

```js
const api = window.assemblyAPI;
await api.ready;
const parts = await api.listParts(); // real partId, name and full ports for this platform
const state = await api.getState(); // parts, groups, kit, buildGuide and viewMode
await api.loadJSON(await (await fetch('/assembly/examples/go-plate-pin-shaft-wheel.json')).json());
await api.appendJSON({parts: [/* additional parts */]});
await api.addPart({partId: parts[0].partId, position: [200, 40, 0], rotation: [0, 0, 0]});
await api.clear(); // undoable; retains title and kit settings
```

All methods return promises. `loadJSON` replaces the document; `appendJSON` retains existing parts and remaps colliding incoming instance IDs, including their internal links and groups. Neither silently bypasses kit stock or detected CAD penetration. Parse, port, profile, cycle, coordinate, stock or fit errors reject the operation and preserve the old model. Imported raw `mate` records must already match their declared CAD poses; `attachTo` computes a pose from real ports. Editing a parent cannot silently invalidate its children's links.

**Help → AI / API & MCP** contains the live part/port table, working few-shot, JSON textarea and replace/append controls. Stable automation selectors:

- `#ai-assembly-json-input` / `[data-testid=ai-assembly-json-input]`
- `#ai-assembly-apply-btn` / `[data-testid=ai-assembly-apply-btn]`
- `#ai-assembly-append-btn` / `[data-testid=ai-assembly-append-btn]`
- `#ai-assembly-status` (`data-ok=true` or `false` after completion)

The input accepts a native project (`parts[].sku`, `parts[].mate`), an AI document (`parts[].partId`, `parts[].attachTo`) or `{commands:[{command,args}]}`. Supported batch commands: `addPart`, `attach`, `group`, executed in array order. Arbitrary JavaScript is never evaluated. Object-form documents can declare forward part references. Positions are millimetres; Euler rotations and twist are degrees. Get exact port IDs from `listParts()`; they are not invented names such as `hole-1`.

Checked examples in `public/assembly/examples/`:

- `go-plate-pin-shaft-wheel.json`: plate, red pin, plain shaft and wheel with actual compatible attachments.
- `go-car-two-motors.json`: existing reference car, 54 parts, two motors, one Brain, one Battery, four wheels, within one GO kit. All declared mates and CAD collision checks passed; it has **not been physically built or tested**.
- `iq-beam-pin.json` and `lego-beam-pin.json`: platform-specific few-shots.

To load the complete GO car in an empty GO project:

```js
await window.assemblyAPI.ready;
const car = await (await fetch('/assembly/examples/go-car-two-motors.json')).json();
await window.assemblyAPI.loadJSON(car);
const guide = (await window.assemblyAPI.getState()).buildGuide;
console.log(guide.ready, guide.blockers);
```

If WebGL globals are missing or context creation fails, menus, library, inspector, CPU CAD fit checks, JSON operations and history remain available. The viewport becomes **2D / Data Fallback View**, listing parts, coordinates, connections and generated steps. `?view=data` on an editor HTML URL forces this mode for debugging. `getState().viewMode` is `data` or `webgl`. Fallback PDF output is explicitly a **data guide** with inventory/coordinates/connections/text steps; it does not fabricate 3D renderings. Normal WebGL guide rendering stays unchanged. LEGO's existing guide limitations still apply.

Validation: `node scripts/test-assembly-document.mjs`, `node scripts/test-assembly-headless-ui.mjs`, `node scripts/test-assembly-webgl-document.mjs`. UI tests accept `BASE_URL`; default dev port is 3131. The headless suite disables WebGL and independently tests missing globals and failed contexts.

## JavaScript API

`window.mindxAssembly` is exposed by the loaded editor and its same-origin host. API version 1.2 retains `execute(command, args)` and `describe()`. It exposes 31 commands, including compatible connector lookup, group duplication and diagnostics.

```js
const api = window.mindxAssembly;
const description = api.describe(); // schemas, examples, units, limitations
const catalog = await api.execute('listParts', {query: 'Wheel'});
const connectors = await api.execute('getCatalogConnectors', {sku: '228-2500-001'});
const part = await api.execute('addPart', {sku: '228-2500-001', position: [0, 50, 0]});
if (!part.ok) throw new Error(part.error);
const actualConnectors = await api.execute('getConnectors', {id: part.result.id});
```

Use returned IDs, not guessed IDs. Positions and depths are millimeters; rotations and twist are degrees; Y is up. Each command resolves before the next command executes. Existing transactions reject new penetration, locked-layer changes, incompatible attachments and kit overages. Undo/Redo use the same history as manual editing. `checkFit` is a sampled CAD check, not physical certification.

`getState.result.context` identifies the active editor using `{projectId, platform}` from its validated route. Use this for pairing/target checks. Portable project JSON intentionally omits workspace identity when normalized; do not infer the current project's ID from `result.project.projectId`. Legacy standalone drafts have a null projectId. The MCP pairing bridge forwards this runtime identity, and a live builder should verify the exact expected project before writing.

Successful API calls return `{ok:true,result,meta}`. Rejected calls return `{ok:false,errorCode,error,hint,details?,meta}`. `meta` includes `requestId`, `command`, and `durationMs` (including queue wait). MCP responses add `relay.requestId`/`durationMs`. Compare the `result` field when comparing model snapshots, because metadata changes on every request.

All arguments are validated before queueing using the same contract in browser and relay. Unknown fields, wrong types, blank identifiers, duplicate IDs, non-finite numbers, invalid bounds and missing mutation fields are rejected; values are never coerced. Argument values are snapshotted at submission so later caller changes cannot alter a queued write. The 1.2 boundary is stricter than 1.1: fix typos instead of relying on ignored parameters. Both successful and rejected commands are traceable in a bounded, in-memory history of 60 outcomes, without arguments, tokens or CAD payloads.

Common codes: `INVALID_ARGUMENTS` (field paths in `details`), `UNKNOWN_PART`, `UNKNOWN_SKU`, `UNKNOWN_CONNECTOR`, `LAYER_LOCKED`, `INCOMPATIBLE_CONNECTORS`, `CYCLE_REJECTED`, `COLLISION`, `KIT_LIMIT`, `GUIDE_NOT_READY`, `BUSY`, `PERSISTENCE_FAILED`, and fallback `EDITOR_REJECTED`. The full hints are in `api.describe().errors`. Relay failures add `NOT_CONNECTED`, `READ_ONLY`, `DISCONNECTED`, `COMMAND_TIMEOUT`, `CANCELLED` and `CANCELLED_IN_FLIGHT`.

The Help AI panel has a read-only health check (capabilities, project, catalog, kit), a command selector with schema/examples, validation before running, selected-ID filling, JSON result download and recent command diagnostics. These checks do not insert sample parts. Individual JSON commands run without JavaScript eval. The authoritative contract is `public/assembly/api-contract.js`; the compact API reference is `docs/assembly-ai-api.md`.

### Attachment and duplication workflow

```js
const compatible = await api.execute('getConnectionOptions', {
  id: pinId, targetId: beamId, offset: 0, limit: 20
});
if (!compatible.ok) throw new Error(compatible.error);
const option = compatible.result.options[0]; // inspect CAD orientation first
if (!option) throw new Error('No compatible reference pair');
const {sourceRef, targetRef, depth} = option;
const attached = await api.execute('attach', {
  id: pinId, targetId: beamId, sourceRef, targetRef, depth
});
if (!attached.ok) throw new Error(attached.error);
const group = await api.execute('group', {ids: [beamId, pinId], name: 'Module'});
if (!group.ok) throw new Error(group.error);
const copied = await api.execute('duplicateParts', {
  ids: [beamId, pinId], groupId: group.result.groupId, offset: [200, 0, 0]
});
// copied.result.idMap maps originals to copies; ids/addedIds/groupId are returned.
```

`getConnectionOptions` paginates compatible reference pairs (`limit` 1–200, default 50; `offset` >= 0). It returns suggested/max depths, total and nextOffset. This is connector-type compatibility, not clearance, occupancy or insertion-path proof: `attach` still applies editor validation. Group duplication uses the existing `copySelection` helper, creates new group/part IDs, preserves internal joints and wiring, and removes links outside the copied selection. It is one transaction and one Undo entry. Explicit offsets can be rejected by kit, bounds or collision checks. Default offset is `[100,0,0]` mm; supply an appropriate offset for large models.

## Connect an MCP host without mouse automation

Requirements: Node 20+ and this repository installed on the same computer as the browser. Run `npm install`. Configure a local stdio server in a host that supports MCP, such as Codex, Claude Desktop or Cursor. Do not launch it through an interactive shell or print application logs to stdout.

Generic JSON host configuration (replace the absolute path):

```json
{
  "mcpServers": {
    "mindx-assembly": {
      "command": "node",
      "args": ["D:/mindXLeader/VEXGO_HANDLE_MINDX/scripts/assembly-mcp.mjs"]
    }
  }
}
```

Equivalent Codex TOML entry, to add manually to the appropriate MCP configuration:

```toml
[mcp_servers.mindx_assembly]
command = "node"
args = ["D:/mindXLeader/VEXGO_HANDLE_MINDX/scripts/assembly-mcp.mjs"]
```

No host configuration is installed or modified by the app. `npm run mcp:assembly` starts the same companion for diagnostics, but an MCP host should normally own the Node process and its stdin/stdout.

1. Ask the host to call `assembly_pairing_info`.
2. In the intended model, open **Help → AI / API & MCP**, paste the private loopback pairing link, and click **Kết nối mô hình này**.
3. The default session is read-only. Check **Cho phép AI sửa mô hình đang mở** before connecting if you want AI to build. Disconnect and pair again to change permission.
4. Ask AI to call `assembly_api_reference`, inspect `listParts` and connector references, then use `assembly_edit` for changes. Results appear in the open editor; normal Undo still works.
5. Disconnect from Help when done. A header indicator remains visible while paired, even when Help is closed. The session is not silently restored on reload.

Tools:

| Tool | Purpose |
|---|---|
| `assembly_pairing_info` | Return the private, per-process pairing link and current connection state; does not connect an editor |
| `assembly_status` | Paired model title/platform and read/write permission |
| `assembly_diagnostics` | Relay origin, last contact, pending stages/deadlines, uncertain count and 60 recent outcomes; no secrets/model payloads |
| `assembly_disconnect` | Release the current editor and cancel pending calls; an in-progress transaction may finish |
| `assembly_api_reference` | Command schemas, examples and rules |
| `assembly_command_help` | Exact schema/example for one named command |
| `assembly_read` | Run one registered read command in the paired editor |
| `assembly_edit` | Run one registered mutation; requires explicit editing permission |

Example tool input:

```json
{"command":"addPart","args":{"sku":"228-2500-001","position":[0,50,0]}}
```

### Hosting and connection boundaries

The companion speaks MCP over stdio and binds its browser relay to **127.0.0.1**, normally port 3188. It never launches/attaches to browsers, imports browser profiles, evaluates arbitrary JavaScript, or bypasses editor validation. The browser polls commands only after pairing and dispatches them through `mindxAssembly.execute`.

The default allowed browser origins are localhost/127.0.0.1 ports 3100 and 3120 and `https://mindxvexgostudio.vercel.app`. For another deployment, set `MINDX_ASSEMBLY_APP_ORIGIN` in the MCP host environment to its exact origin. Set `MINDX_ASSEMBLY_MCP_PORT` to another local port if required. CORS/Host restrictions and a random 256-bit token protect the relay; requests also need the active session ID. The pairing token stays in memory, not localStorage or project JSON. Do not share it.

Vercel hosts the normal app only. There is no public remote MCP URL or serverless command queue. A deployed app still needs the local companion. The browser may ask permission to access the local network; the user must decide whether to allow that connection. The app does not change browser security settings.

Only one editor pairs at a time. Another model cannot silently replace it, including concurrent pairing attempts. Sessions are bound to their originating app origin. Closing/reloading the editor releases the session when possible; otherwise its idle lease expires after 60 seconds. Importing another project into a legacy editor disconnects the old pairing. A delivered command keeps its lease through its deadline so long PDF exports do not disconnect midway.

MCP cancellation signals remove queued commands (`CANCELLED`, no model change). After delivery the response is `CANCELLED_IN_FLIGHT`: an editor transaction may still finish. Timeout and cancellation do not interrupt CAD halfway through a transaction. Late results for known retired requests are acknowledged and discarded so the browser remains connected; unknown/duplicate results are rejected. Uncertain results are retained for at least 60 seconds (or until their original deadline), then expire. Disconnect cancels pending calls and releases the session. Commands time out after 60 seconds (PDF export: 5 minutes). **Never automatically retry a write after timeout/in-flight cancellation**: read `getState` first, because it may already have completed.

## Verification

- `node scripts/test-assembly-mcp-relay.mjs`: token/origin permissions, session ownership, timeout, stale/duplicate result rejection and disconnect.
- `node scripts/test-assembly-api-contract.mjs`: every command example plus malformed fields, required values, types, bounds and kit profiles.
- `node scripts/test-assembly-ai-workflows.mjs`: all 31 commands on both GO and IQ, real attachment/group duplication, queue argument snapshot, kit/locks/collision rollback and PDF output.
- `node scripts/test-assembly-ai-demos.mjs`: same-origin parent/iframe calls and complete API-based vehicle recipes; allow extra time with software GPU rendering.
- `node scripts/test-assembly-help-mcp.mjs`: real stdio client through the relay to the editor; Help/search/tour/focus, read-only/write pairing, attachment, Undo and failed-edit rollback.
- `node scripts/test-assembly-ai-api.mjs`: existing API behavior and editing gates.
- `npm run build`, `npm run typecheck`, `python scripts/check-encoding.py`.

MCP SDK reference: https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/get-started/first-server.md. Local MCP is an optional adapter; there is no built-in paid AI provider or automatic upload of models to an AI service.
