# Device compatibility

The web edition is tested automatically with the following browser engines and device layouts:

| Device profile | Editing, files and controls | VEX GO Brain |
| --- | --- | --- |
| Chrome desktop | Tested | Web Bluetooth request tested; physical Brain pending |
| Edge desktop | Tested | Web Bluetooth request tested; physical Brain pending |
| Chrome on Android phone | Tested | Web Bluetooth request tested; physical Brain pending |
| Safari on iPhone, portrait and landscape | Tested | Safari does not expose Web Bluetooth |
| Safari on iPad | Tested | Safari does not expose Web Bluetooth |
| Firefox desktop | Tested | Firefox does not expose Web Bluetooth |

The editor has responsive toolbars, scrollable Blockly categories, touch key
assignment, touch feedback on the controller dock, constrained mobile dialogs,
and a startup recovery screen. The checks exercise loading a project, discovering
and creating My Blocks, compiling only the selected function, and opening the
native Bluetooth chooser with VEX filters and active user input.

Robot connection requires an HTTPS deployment (or localhost), Bluetooth, and a
browser that implements Web Bluetooth. Safari on iOS can edit and use the touch
interface but cannot connect directly. The app links to Bluefy as an optional
third-party iOS browser that may expose Web Bluetooth; it has not been verified
with a physical VEX GO Brain. No test substitutes a mock connection for a real
robot, so physical motion remains an explicit hardware test.

Run the local checks against a production server on port 3102:

```powershell
node scripts/check-compatibility.mjs
node scripts/test-control-compilation.mjs
node scripts/test-startup-recovery.mjs
node scripts/test-permissions.mjs
$env:TEST_BASE_URL='http://localhost:3102'; node scripts/test-editor-assets.mjs
```
