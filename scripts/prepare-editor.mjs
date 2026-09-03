import fs from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('apk-extracted/assets/webapp');
const target = path.resolve('public/editor');
await fs.mkdir(target, { recursive: true });
if (!process.argv.includes('--patch-only')) await fs.cp(source, target, { recursive: true });
let html = await fs.readFile(path.join(source, 'index.html'), 'utf8');
html = html.replace('width=device-width, user-scalable=no', 'width=device-width, initial-scale=1');
html = html.replace('<html>', '<html lang="en">');
html = html.replace('<head>', '<head><script src="/editor-bootstrap.js"></script>');
html = html.replace('<!-- TITLE HERE -->', '<title>VEXcode GO · mindX</title><link rel="stylesheet" href="/editor-adapter.css">');
html = html.replace('react/umd/react.development.js', 'react/umd/react.production.min.js').replace('react-dom/umd/react-dom.development.js', 'react-dom/umd/react-dom.production.min.js');
html = html.replace('</body>', '<script src="/controller-bridge.js"></script><script src="/editor-adapter.js"></script></body>');
await fs.writeFile(path.join(target, 'index.html'), html);
let bundle = await fs.readFile(path.join(source, 'dist/main.bundle.js'), 'utf8');
// Serve workspace and Make-a-Block media from committed public assets.
// Preserve directory depth for Blockly's ../../../../static image paths.
const legacyMedia = '"node_modules/@vexcode/blockly/media/"';
if (bundle.split(legacyMedia).length !== 3) throw new Error('Unexpected Blockly media configuration');
bundle = bundle.replaceAll(legacyMedia, '"/editor/lib/@vexcode/blockly/media/"');
// The original browser warning is a non-dismissible overlay on all phones.
// Keep the warning in the console; the Next.js shell reports real capabilities.
// This only changes the compatibility notice, not hardware or license checks.
const start = '  showGOUnsupportedBrowser: function showGOUnsupportedBrowser(message) {';
const end = '  showVRExpiredBrowser: function showVRExpiredBrowser() {';
const from = bundle.indexOf(start);
const to = bundle.indexOf(end, from);
if (from < 0 || to < from || bundle.indexOf(start, from + 1) !== -1) throw new Error('Unexpected APK: browser notice patch does not match.');
bundle = bundle.slice(0, from) + start + '\n    console.info("VEX GO browser compatibility:", message);\n  },\n' + bundle.slice(to);
function replaceOnce(before, after) {
  if (bundle.split(before).length !== 2) throw new Error('Unexpected APK patch target: ' + before);
  bundle = bundle.replace(before, after);
}
replaceOnce('__webpack_require__.p = "dist/";', '__webpack_require__.p = "dist/"; window.__vexStudioRequire = __webpack_require__;');
replaceOnce('// check for ChromeOS compatibility\n              if (_platformInfo__WEBPACK_IMPORTED_MODULE_43__["OSisAndroid"]) {', '// Check native app permissions only inside the APK, never Android browsers.\n              if (_platformInfo__WEBPACK_IMPORTED_MODULE_43__["PlatformIsAndroid"]) {');
replaceOnce('mainWorkspace.getToolbox().HtmlDiv.contains(targetNode)', '(mainWorkspace.getToolbox() && mainWorkspace.getToolbox().HtmlDiv.contains(targetNode))');
replaceOnce('if (mainWorkspace.options.readOnly) {', 'if (!mainWorkspace || mainWorkspace.options.readOnly || !mainWorkspace.getToolbox()) {');
// Omit these toolbar buttons from React's render tree in the web edition.
for (const icon of ['share', 'feedback']) {
  const button = 'react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_widget_ToolBarButton__WEBPACK_IMPORTED_MODULE_33__["ToolBarButton"], {\n        svgComp: _widget_SVGIcons__WEBPACK_IMPORTED_MODULE_7__["IconPresets"].' + icon + ',';
  replaceOnce(button, 'false && ' + button);
}
const autoReleaseNotes = 'setTimeout(_widget_WhatsNew__WEBPACK_IMPORTED_MODULE_58__["WHATSNEWPORTAL"].showWhatsNewIfNewVersion, 1000);';
if (bundle.split(autoReleaseNotes).length !== 7) throw new Error('Unexpected release notes startup patch');
bundle = bundle.replaceAll(autoReleaseNotes, '/* Release notes remain available from the menu. */');
replaceOnce('this.showTutorialOnLoad(_StorageInterface_LocalStorageInterface__WEBPACK_IMPORTED_MODULE_21__["RELOAD_TIME_KEY_GO"]);', '/* Tutorials remain available from the toolbar. */');
// The Android APK contains Vimeo IDs, but no local tutorial videos.
replaceOnce('var useVimeo = _platformInfo__WEBPACK_IMPORTED_MODULE_7__["currentPlatform"] === _platformInfo__WEBPACK_IMPORTED_MODULE_7__["Platform"].Android && tutorialObj.vimeo;', 'var useVimeo = tutorialObj.vimeo;');
replaceOnce('var useYoutube = _platformInfo__WEBPACK_IMPORTED_MODULE_7__["currentPlatform"] === _platformInfo__WEBPACK_IMPORTED_MODULE_7__["Platform"].Android && tutorialObj.youtube;', 'var useYoutube = tutorialObj.youtube;');
// Optional remote data can fail. Use the existing unavailable-data branches.
// No expiration value, license state or hardware result is fabricated.
replaceOnce('serverDatePromise = getServerExpiration();', 'serverDatePromise = getServerExpiration().catch(function (error) { log.warn("Expiration server unavailable", error); return null; });');
replaceOnce('return getOnlineData();', 'return getOnlineData().catch(function (error) { log.warn("Release notes unavailable", error); return null; });');
// This web edition intentionally has a single editor language.
replaceOnce('var language = navigator.language;', 'var language = "en";');
replaceOnce('if (_targetPlatform__WEBPACK_IMPORTED_MODULE_6__["targetIsGO"] && _platformInfo__WEBPACK_IMPORTED_MODULE_7__["currentPlatform"] === _platformInfo__WEBPACK_IMPORTED_MODULE_7__["Platform"].Unknown && (!(_platformInfo__WEBPACK_IMPORTED_MODULE_7__["BrowserIsChrome"] || _platformInfo__WEBPACK_IMPORTED_MODULE_7__["BrowserIsChromeEdge"]) || _platformInfo__WEBPACK_IMPORTED_MODULE_7__["OSisAndroid"])) {', 'if (false /* Web edition renders the editor on mobile and Safari too. */) {');
// Always construct the existing disconnected-capable GO web interface on web
// browsers, including Safari. Actual Bluetooth availability stays unchanged.
replaceOnce('var isWebBLESystem = _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIs123OrGO"] && (_platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsChrome"] || isSupportedBrowser);', 'var isWebBLESystem = _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIs123OrGO"] && (_platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsChrome"] || isBrowser);');
replaceOnce('_i18n_i18n__WEBPACK_IMPORTED_MODULE_30__["i18n"].changeLanguage(lang);', '_i18n_i18n__WEBPACK_IMPORTED_MODULE_30__["i18n"].changeLanguage("en");');
const selectorModule = bundle.indexOf('/***/ "./src/widget/LanguageSelector.tsx":');
const renderStart = bundle.indexOf('    value: function render() {', selectorModule);
const renderEnd = bundle.indexOf('\n  }]);', renderStart);
if(selectorModule < 0 || renderStart < selectorModule || renderEnd < renderStart) throw new Error('Language selector patch mismatch');
bundle = bundle.slice(0,renderStart) + '    value: function render() { return null;\n    }' + bundle.slice(renderEnd);
await fs.writeFile(path.join(target, 'dist/main.bundle.js'), bundle);
const hardwareChunk = 'dist/c0ea8069eeec5cc95a40.10.bundle.js';
let hardware = await fs.readFile(path.join(source, hardwareChunk), 'utf8');
function patchHardware(before, after) {
  if (hardware.split(before).length !== 2) throw new Error('Unexpected hardware patch: '+before);
  hardware = hardware.replace(before, after);
}
patchHardware('_this.initWebBLE();', 'if (!navigator.bluetooth) return _this;\n    _this.initWebBLE();');
patchHardware('value: function getConnectionState() {', 'value: function getConnectionState() {\n      if (!navigator.bluetooth) return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;');
patchHardware('value: function _openConnection() {', 'value: function _openConnection() {\n      if (!navigator.bluetooth) return Promise.reject(new Error("Web Bluetooth is unavailable in this browser."));');
await fs.writeFile(path.join(target,hardwareChunk),hardware);
// An iPad keyboard workaround runs after the field can already be disposed.
const blocklyPath = 'lib/@vexcode/blockly/blockly_compressed.js';
let blockly = await fs.readFile(path.join(source, blocklyPath), 'utf8');
const inputTimer = 'var b=function(c){console.log("this.htmlInput_.style.display:",this.htmlInput_.style.display,c);this.htmlInput_.style.display=c}';
if (blockly.split(inputTimer).length !== 2) throw new Error('Unexpected iPad input timer patch');
blockly = blockly.replace(inputTimer, 'var b=function(c){if(this.htmlInput_)this.htmlInput_.style.display=c}');
await fs.writeFile(path.join(target, blocklyPath), blockly);
console.log('Prepared original VEXcode GO web assets:', target);
