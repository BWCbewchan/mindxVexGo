this["webpackChunkwebapp"]([17],{

/***/ "./src/AppInfo.ts":
/*!************************!*\
  !*** ./src/AppInfo.ts ***!
  \************************/
/*! exports provided: appState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appState", function() { return appState; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _Compiler_CompilerSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Compiler/CompilerSettings */ "./src/Compiler/CompilerSettings.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("AppInfo");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();
var historyLogger = log.setHistoryLogger("AppInfo");
historyLogger.setLevel(log.levels.DEBUG);


var AppState = /*#__PURE__*/function () {
  function AppState() {
    _classCallCheck(this, AppState);
    // Default Application state
    this.appState = {
      mode: "Blocks",
      lang: _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsV5OrEXP"] || _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsPlaygrounds"] ? "python" : "cpp",
      tabMode: "Code",
      targetMode: "Physical",
      targetGen: "First",
      robotModel: "vr",
      compMode: _Compiler_CompilerSettings__WEBPACK_IMPORTED_MODULE_2__["compilerSettings"].useCloud === true ? "cloud" : "integrated"
    };
    // Stores events functions
    this.callBacks = new Set();
  }

  //#region "State Handling"
  // The "K" is a data type placeholder containing the keys of the appStateData.
  // This is used with the "Pick" keyword to generate an optional list from the appStateData types
  // https://stackoverflow.com/questions/37300933/allow-typescript-compiler-to-call-setstate-on-only-one-react-state-property
  _createClass(AppState, [{
    key: "setAppState",
    value: function () {
      var _setAppState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(state) {
        var didChange, prop;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              didChange = false;
              log.debug("setAppState called, AppState before change:\n", JSON.stringify(this.appState, null, 2));
              // Update the App state with multiple or single properties dynamically, e.g update language only or Mode.
              for (prop in state) {
                // Only make a change if the incoming state is different than the previous state.
                if (state[prop] && state[prop] !== this.appState[prop]) {
                  this.appState[prop] = state[prop];
                  didChange = true;
                }
              }
              // if any values changed...
              if (!didChange) {
                _context.next = 9;
                break;
              }
              _context.next = 6;
              return this.dispatch(this.appState);
            case 6:
              log.debug("AppState Changed:\n", JSON.stringify(this.appState, null, 2));
              _context.next = 10;
              break;
            case 9:
              log.debug("setAppState was called, but AppState did not change.");
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setAppState(_x) {
        return _setAppState.apply(this, arguments);
      }
      return setAppState;
    }() // Get the current state of the application
  }, {
    key: "getAppState",
    value: function getAppState() {
      var appStateStingified = JSON.stringify(this.appState);
      var appstate = JSON.parse(appStateStingified);
      return appstate;
    }

    /* 
    * Get a boolean value that determines if text should be enabled 
    * @param {boolean} robotModelFlag - will return based on current robotModel if true
    * @param {string} playground - will return based on playground name passed in if given
    */
  }, {
    key: "getTextEnabled",
    value: function getTextEnabled(robotModelFlag, playground) {
      if (robotModelFlag) {
        var robotModel = this.appState.robotModel;
        switch (robotModel) {
          case "vr123":
          case "vrGO":
            return false;
          default:
            return true;
        }
      } else if (playground) {
        switch (playground) {
          case "Virtual123":
          case "GOMars":
            return false;
          default:
            return true;
        }
      } else {
        // TODO: add logic for physical platforms
        return true;
      }
    }
    //#endregion

    //#region "Event Handling"
  }, {
    key: "registerEventListener",
    value: function registerEventListener(callback) {
      this.callBacks.add(callback);
    }
  }, {
    key: "unregisterEventListener",
    value: function unregisterEventListener(callback) {
      if (this.callBacks.has(callback)) {
        this.callBacks["delete"](callback);
      } else {
        // debugger;
        log.debug("Did not find " + callback + " in....", this.callBacks);
      }
    }
  }, {
    key: "dispatch",
    value: function () {
      var _dispatch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
        var promises, callbacks;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              promises = [];
              callbacks = new Set(this.callBacks);
              callbacks.forEach(function (callback) {
                var res = callback(data);
                if (res && res.then) {
                  promises.push(res);
                }
              });
              if (!(promises.length > 0)) {
                _context2.next = 6;
                break;
              }
              _context2.next = 6;
              return Promise.all(promises);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function dispatch(_x2) {
        return _dispatch.apply(this, arguments);
      }
      return dispatch;
    }() //#endregion
  }]);
  return AppState;
}(); // Instantiate the AppState
var appState = new AppState();


/***/ }),

/***/ "./src/Blockly/BlocklyAccess.ts":
/*!**************************************!*\
  !*** ./src/Blockly/BlocklyAccess.ts ***!
  \**************************************/
/*! exports provided: Blockly, setTargetLang, getTargetLang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTargetLang", function() { return setTargetLang; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTargetLang", function() { return getTargetLang; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vexcode/blockly-react-component/dist/BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Blockly", function() { return _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"]; });

/* harmony import */ var _Core_blocklyTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/blocklyTheme */ "./src/Blockly/Core/blocklyTheme.ts");
/* harmony import */ var _Core_blocklyMixedMode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Core/blocklyMixedMode */ "./src/Blockly/Core/blocklyMixedMode.ts");
/* harmony import */ var _Core_blocklyShapeExtensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Core/blocklyShapeExtensions */ "./src/Blockly/Core/blocklyShapeExtensions.ts");
/* harmony import */ var _Core_blocklyMyBlocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Core/blocklyMyBlocks */ "./src/Blockly/Core/blocklyMyBlocks.ts");
/* harmony import */ var _Core_blocklyFields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Core/blocklyFields */ "./src/Blockly/Core/blocklyFields.tsx");
/* harmony import */ var _Core_blocklyDefaultToolbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Core/blocklyDefaultToolbox */ "./src/Blockly/Core/blocklyDefaultToolbox.ts");
// tslint:disable: object-literal-key-quotes


var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("BlocklyAccess");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

// add history logger
var historyLogger = log.setHistoryLogger("Blockly");
historyLogger.setLevel(log.levels.DEBUG);







Object(_Core_blocklyTheme__WEBPACK_IMPORTED_MODULE_2__["initBlocklyTheme"])();
Object(_Core_blocklyMixedMode__WEBPACK_IMPORTED_MODULE_3__["initBlocklyMixedModeCode"])();
Object(_Core_blocklyShapeExtensions__WEBPACK_IMPORTED_MODULE_4__["initBlocklyShapeExtensions"])();
Object(_Core_blocklyMyBlocks__WEBPACK_IMPORTED_MODULE_5__["initBlocklyMyBlocksCode"])();
Object(_Core_blocklyFields__WEBPACK_IMPORTED_MODULE_6__["addVexcodeBlocklyFields"])();
Object(_Core_blocklyDefaultToolbox__WEBPACK_IMPORTED_MODULE_7__["blocklyDefaultToolbox"])();

// the target lang code here is used in code gen...

var targetLang = "cpp";
function setTargetLang(newLang) {
  targetLang = newLang;
}
function getTargetLang() {
  return targetLang;
}

// import { currentPlatform, Platform } from "../platformInfo";
// import {
//   targetIs123,
//   targetIs123OrGO,
//   targetIsEXP,
//   targetIsGO,
//   targetIsIQ,
//   targetIsPlaygrounds,
//   targetIsV5,
// } from "../targetPlatform";
// import { appState } from "../AppInfo";

// // This is pulled from platfromInfo.ts since we can't use window in webworkers and
// // there is no point changing tha whole file for this.
// const isAndroid = self.navigator?.appVersion.includes("Android") && self.AndroidNativeInterface !== undefined;

// Blockly.Python.INDENT = "    ";

// const gen2IQOnlyBlocks = [
//   "iq_looks_draw_pixel",
//   "iq_looks_draw_line",
//   "iq_looks_draw_rectangle",
//   "iq_looks_draw_circle",
//   "iq_looks_set_font",
//   "iq_looks_set_width",
//   "iq_looks_set_pen_color",
//   "iq_looks_set_fill_color",
//   "iq_sensing_inertial_calibrate",
//   "iq_sensing_inertial_acceleration",
//   "iq_sensing_inertial_gyrorate",
//   "iq_sensing_inertial_orientation",
//   "iq_event_optical_detect_gesture",
//   "iq_sensing_optical_set_mode",
//   "iq_sensing_optical_gesture_detected",
// ];

// const gen2IQDropdownCheckBlocks = [
//   "iq_sensing_set_gyro_heading",
//   "iq_sensing_set_gyro_rotation",
//   "iq_sensing_heading_of_gyro",
//   "iq_sensing_rotation_of_gyro",
//   "iq_events_when_controller_button",
//   "iq_sensing_pressing_controller",
//   "iq_looks_print_new",
//   "iq_looks_next_row_new",
//   "iq_looks_set_print_precision_new",
//   "iq_looks_clear_all_rows_new",
// ];

// // we need to override the original as the original would double the indentation
// Blockly.Python.provideFunction_ = function(desiredName: string, code: string[], isHiddenFunc?: boolean) {
//   if (!this.definitions_[desiredName]) {
//     const functionName = this.variableDB_.getDistinctName(desiredName,
//         Blockly.Procedures.NAME_TYPE);
//     this.functionNames_[desiredName] = functionName;
//     let codeText = code.join("\n").replace(
//         this.FUNCTION_NAME_PLACEHOLDER_REGEXP_, functionName);
//     codeText = codeText.replace(/\0/g, this.INDENT);

//     if (!isHiddenFunc || this.SHOW_HIDDEN_FUNCTIONS) {
//       this.definitions_[desiredName] = codeText;
//     } else {
//       this.definitions_[desiredName] = {
//         ishidden: true,
//         code: codeText,
//       };
//     }
//   }
//   return this.functionNames_[desiredName];
// };

// // Blockly.FieldTextInput.beforeShowEditor = (input: any) => {
// //   if (isAndroid) {
// //     log.debug("disable resize");
// //     BlocklyController.enableResize(false);
// //   }
// // };

// // Blockly.FieldTextInput.beforeCloseEditor = (input: any) => {
// //   if (isAndroid) {
// //     log.debug("enable resize");
// //     BlocklyController.enableResize(true);
// //   }
// // };

// // const ftiproto: any = Blockly.FieldTextInput.prototype;
// // ftiproto.beforeShowEditor = Blockly.FieldTextInput.beforeShowEditor;
// // ftiproto.beforeCloseEditor = Blockly.FieldTextInput.beforeCloseEditor;

// // function undo() {
// //   BlocklyController.blocklyWorkspace.undo(false);
// // }

// // function hasUndo() {
// //   if (BlocklyController.blocklyWorkspace) {
// //     return BlocklyController.blocklyWorkspace.hasUndoStack();
// //   }
// //   return false;
// // }

// function redo() {
//   BlocklyController.blocklyWorkspace.undo(true);
// }

// function hasRedo() {
//   if (BlocklyController.blocklyWorkspace) {
//     return BlocklyController.blocklyWorkspace.hasRedoStack();
//   }
//   return false;
// }

// function clearUndoStack() {
//   if (BlocklyController.blocklyWorkspace !== null) {
//     BlocklyController.blocklyWorkspace.clearUndo();
//     fireEvent("emptyUndoStack");
//   }
// }

// function getReservedList() {
//   if (targetIsPlaygrounds) {
//     //TODO: add python to reserved words so students can convert projects and keep variable names

//     const reservedWords = Blockly.JavaScript.RESERVED_WORDS_;
//     const reservedList = reservedWords.split(",");
//     return reservedList;
//   } else if (targetIs123OrGO) {
//     const reservedWords = Blockly.JavaScript.RESERVED_WORDS_;
//     const reservedList = reservedWords.split(",");
//     return reservedList;
//   } else {
//     const reservedWords = Blockly.CPP.RESERVED_WORDS_;
//     const pythonReservedWords = Blockly.Python.RESERVED_WORDS_;
//     const reservedList = reservedWords.split(",").concat(pythonReservedWords.split(","));
//     log.debug("reservedList: ", reservedList);
//     return reservedList;
//   }
// }

// function variableNameExists(name: string): boolean {
//   const varMap = BlocklyController.blocklyWorkspace.variableMap_.variableMap_;
//   const types = [
//     Blockly.SCALAR_VARIABLE_TYPE,
//     Blockly.BOOL_VARIABLE_TYPE,
//     Blockly.LIST_VARIABLE_TYPE,
//     Blockly.ARRAY2D_VARIABLE_TYPE,
//   ];
//   // tslint:disable-next-line: prefer-for-of
//   for (let i = 0; i < types.length; i++) {
//     const vars = varMap[types[i]];
//     if (!vars) {
//       continue;
//     }
//     // tslint:disable-next-line: prefer-for-of
//     for (let v = 0; v < vars.length; v++) {
//       if (vars[v].name === name) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// function updateMyBlockArgumentVariableBlock(block: any) {
//   const blockType = block.type;
//   if (
//     blockType === "argument_reporter_boolean" ||
//     blockType === "argument_reporter_string" ||
//     blockType === "argument_reporter_number"
//   ) {
//     log.debug("found argument block", block);
//     if (!block.parentBlock_) {
//       log.debug("Block has no parent. Disabling the block");
//       block.setDisabled(true);
//     } else {
//       const rootBlock = block.getRootBlock();
//       if (
//         rootBlock.type === "procedures_definition" &&
//         rootBlock.getInput("custom_block").connection.targetConnection.sourceBlock_.id === block.procedureDefId
//       ) {
//         log.debug("Block is in definition stack. Enabling the block");
//         block.setDisabled(false);
//         // TODO: try to find a better way to force a redraw of just the block.
//         // window.dispatchEvent(new Event('resize'));
//         block.initSvg();
//       } else {
//         log.debug("Block not in definition stack. Disabling the block");
//         block.setDisabled(true);
//       }
//     }
//   } else {
//     const inputList = block.inputList;
//     inputList.forEach((input: any) => {
//       if (input.connection) {
//         if (input.connection.targetConnection) {
//           updateMyBlockArgumentVariableBlock(input.connection.targetConnection.sourceBlock_);
//         }
//       }
//     });
//   }
// }

// function highlightWorkspaceBlock(id: string) {
//   BlocklyController.hightlightBlock(id);
// }

// //#region "special events"
// type EventNames = "checkboxValueChange" | "dropdownValueChange" | "toolboxRefresh" | "emptyUndoStack";

// const eventCallbacks: {
//   checkboxValueChange: Array<(save: boolean) => void>;
//   dropdownValueChange: Array<() => void>;
//   toolboxRefresh: Array<() => void>;
//   emptyUndoStack: Array<() => void>;
// } = {
//   checkboxValueChange: [],
//   dropdownValueChange: [],
//   toolboxRefresh: [],
//   emptyUndoStack: [],
// };

// // Modified to return an object as part of the callback.
// function on(eventname: "dropdownValueChange" | "toolboxRefresh" | "emptyUndoStack", callback: () => void): void;
// function on(eventname: "checkboxValueChange", callback: (save: boolean) => void): void;

// function on(eventName: EventNames, callback: any) {
//   if (eventCallbacks[eventName].indexOf(callback) >= 0) {
//     return;
//   }
//   eventCallbacks[eventName].push(callback);
// }

// function off(eventname: "dropdownValueChange" | "toolboxRefresh" | "emptyUndoStack", callback: () => void): void;
// function off(eventname: "checkboxValueChange", callback: (save: boolean) => void): void;

// function off(eventName: EventNames, callback: any) {
//   const i = eventCallbacks[eventName].indexOf(callback);
//   if (i < 0) {
//     throw new Error("Unknown callback.");
//   }
//   eventCallbacks[eventName].splice(i, 1);
// }

// function fireEvent(eventname: "checkboxValueChange" | "dropdownValueChange" | "toolboxRefresh" | "emptyUndoStack"): void;
// function fireEvent(eventname: "checkboxValueChange", save: boolean): void;

// function fireEvent(eventName: EventNames, ...args: any[]) {
//   log.debug("fire event", eventName);
//   if (eventCallbacks[eventName]) {
//     eventCallbacks[eventName].forEach((callback: any) => {
//       callback(...args);
//     });
//   }
// }
// //#endregion

// Blockly.VerticalFlyout.onCheckboxClick = () => {
//   fireEvent("checkboxValueChange", true);
// };

// Blockly.FieldDropdown.onSelectionChange = () => {
//   fireEvent("dropdownValueChange");
// };

// Blockly.Toolbox.onRefreshSelection = () => {
//   fireEvent("toolboxRefresh");
// };

// function getBlocklyComplexVariables(): string[] {
//   const variables: any = [];
//   const lists = BlocklyController.blocklyWorkspace.getVariablesOfType("list");
//   const array2d = BlocklyController.blocklyWorkspace.getVariablesOfType("array2d");

//   lists.forEach((list: any) => {
//     variables.push(list);
//   });

//   array2d.forEach((array: any) => {
//     variables.push(array);
//   });

//   return variables;
// }

// function getJSVarNames(): string[] {
//   const TYPE = Blockly.Variables.NAME_TYPE;
//   // Note: the bind is ncesissary or the scope gets lost and everything breaks
//   const nameFunc = Blockly.JavaScript.variableDB_.getName.bind(Blockly.JavaScript.variableDB_);
//   Blockly.JavaScript.variableDB_.setVariableMap(BlocklyController.blocklyWorkspace.getVariableMap());

//   const varMap = BlocklyController.blocklyWorkspace.variableMap_.variableMap_;
//   const varTypes = Object.keys(varMap);

//   const names: string[] = [];
//   varTypes.forEach((varType: string) => {
//     varMap[varType].forEach((blocklyVar: any) => {
//       names.push(nameFunc(blocklyVar.name, TYPE));
//     });
//   });

//   Blockly.JavaScript.variableDB_.reset();

//   return names;
// }

// function getJSVarNamesByType(type?: string): any {
//   const TYPE = Blockly.Variables.NAME_TYPE;
//   const nameFunc = Blockly.JavaScript.variableDB_.getName.bind(Blockly.JavaScript.variableDB_);

//   const varMap = BlocklyController.blocklyWorkspace.variableMap_.variableMap_;
//   const varTypes = Object.keys(varMap);

//   const variables: string[] = [];
//   const booleans: string[] = [];
//   const lists: string[] = [];
//   const array2d: string[] = [];

//   varTypes.forEach((varType: string) => {
//     varMap[varType].forEach((blocklyVar: any) => {
//       if (varType === "") {
//         variables.push(nameFunc(blocklyVar.name, TYPE));
//       } else if (varType === "boolean") {
//         booleans.push(nameFunc(blocklyVar.name, TYPE));
//       } else if (varType === "list") {
//         lists.push(nameFunc(blocklyVar.name, TYPE));
//       } else if (varType === "array2d") {
//         array2d.push(nameFunc(blocklyVar.name, TYPE));
//       } else {
//         throw new Error("Variable type not recognized");
//       }
//     });
//   });

//   const varNames = {
//     var: variables,
//     bool: booleans,
//     list: lists,
//     list2d: array2d,
//   };

//   if (!type) {
//     return varNames;
//   } else if (type === "list") {
//     return varNames.list;
//   } else if (type === "list2d") {
//     return varNames.list2d;
//   }
// }

// function resetScale() {
//   BlocklyController.blocklyWorkspace.setScale(0.72);
// }

// function setScale(newScale: number) {
//   BlocklyController.blocklyWorkspace.setScale(newScale);
// }

// interface Checkbox {
//   svgRoot: any;
//   clicked: boolean;
//   block: any;
// }

// function getCheckboxes(): Checkbox[] {
//   const checkboxes = BlocklyController.blocklyWorkspace.getFlyout().checkboxes_;
//   return checkboxes;
// }

// function clearCheckboxes() {
//   const currentCheckboxes = BlocklyController.blocklyWorkspace.getFlyout().checkboxes_;
//   currentCheckboxes.forEach((checkbox: Checkbox) => {
//     BlocklyController.blocklyWorkspace.getFlyout().setCheckboxState(checkbox.block.id, false);
//   });
//   fireEvent("checkboxValueChange", false);
// }

// function getCheckboxesToSave(): string {
//   const currentCheckboxes = BlocklyController.blocklyWorkspace.getFlyout().checkboxes_;
//   const checkboxIdentifiers: string[] = [];
//   currentCheckboxes.forEach((checkbox: Checkbox) => {
//     if (checkbox.clicked === true) {
//       checkboxIdentifiers.push(checkbox.block.id);
//     }
//   });
//   const checkboxIdentifiersToString = checkboxIdentifiers.join(" ");
//   return checkboxIdentifiersToString;
// }

// function restoreSavedCheckboxes(checkboxesString: string): void {
//   if (checkboxesString !== undefined) {
//     const checkboxesStringToArray = checkboxesString.split(" ");
//     checkboxesStringToArray.forEach((checkbox: string) => {
//       BlocklyController.blocklyWorkspace.getFlyout().setCheckboxState(checkbox, true);
//     });
//     fireEvent("checkboxValueChange", false);
//   }
// }

// function preserveCheckboxes(prevCheckboxes: Checkbox[]): void {
//   const currentCheckboxes = BlocklyController.blocklyWorkspace.getFlyout().checkboxes_;
//   const checkboxIdentifiers: string[] = [];
//   const checkboxesToPreserve: Checkbox[] = [];

//   prevCheckboxes.forEach((checkbox) => (checkboxIdentifiers.push(checkbox.block.id)));
//   currentCheckboxes.forEach((checkbox: Checkbox) => {
//     if (checkboxIdentifiers.includes(checkbox.block.id)) {
//       checkboxesToPreserve.push(checkbox);
//     }
//   });

//   checkboxesToPreserve.forEach((checkbox: Checkbox) => {
//     BlocklyController.blocklyWorkspace.getFlyout().setCheckboxState(checkbox.block.id, true);
//   });
// }

// function getCheckboxCategory(checkbox: any): string {
//   return checkbox.block.category_;
// }

// function getFieldDropdownValue(blockID: string, field: string, secondField?: string): string {
//   const checkboxes = BlocklyController.blocklyWorkspace.getFlyout().checkboxes_;
//   let relevantBlock: any;
//   checkboxes.forEach((checkbox: any) => {
//     if (checkbox.block.id === blockID) {
//       relevantBlock = checkbox;
//     }
//   });

//   if (!relevantBlock) {
//     return "";
//   }

//   if (!secondField) {
//     let dropdownValue = relevantBlock.block.getFieldValue(field);
//     if (dropdownValue === "mm") {
//       dropdownValue = dropdownValue.toUpperCase();
//     } else if (dropdownValue === "inches") {
//       dropdownValue = dropdownValue.charAt(0).toUpperCase() + dropdownValue.slice(1);
//     }
//     return dropdownValue;
//   } else {
//     const dropdownValueOne = relevantBlock.block.getFieldValue(field);
//     const dropdownValueTwo = relevantBlock.block.getFieldValue(secondField);
//     return dropdownValueOne + " " + dropdownValueTwo;
//   }
// }

// function getVarNameById(id: string): string {
//   const variable = BlocklyController.blocklyWorkspace.getVariableById(id);
//   const varName = variable.name;
//   return varName;
// }

// function getVarInfo(name: string, info: string) {
//   const allVariables = BlocklyController.blocklyWorkspace.getAllVariables();
//   const findVariable = allVariables.filter((variable: any) => variable.name === name);
//   if (!findVariable[0]) {
//     return null;
//   }
//   if (info === "type") {
//     const variableType = findVariable[0].type;
//     return variableType;
//   } else if (info === "size") {
//     if (findVariable[0].type === "list") {
//       return findVariable[0].arrayLength;
//     } else if (findVariable[0].type === "array2d") {
//       return [findVariable[0].arrayLength, findVariable[0].arrayWidth];
//     }
//   }
// }

// function validBreaks(): boolean {
//   const currWorkspace = BlocklyController.blocklyWorkspace;
//   let breakBlocksValid = true;

//   for (const block of Object.values(currWorkspace.blockDB_) as any) {
//     const blockType = block.type.slice(3);

//     if (blockType !== "control_break") {
//       // Current block is not relevant; move on to the next one
//       continue;
//     } else {
//       // Current block is a 'break' block, need to check if it's valid
//       if (checkBreakValidity(block) === false) {
//         log.debug("found invalid break block");
//         breakBlocksValid = false;
//         break;
//       }
//     }
//   }

//   return breakBlocksValid;
// }

// const validLoops = ["control_repeat", "control_forever", "control_repeat_until", "control_while"];

// function checkBreakValidity(block: any): boolean {
//   let currentBlock = block;
//   let breakIsValid;

//   // Orphaned tree precedence
//   if (!currentBlock.getRootBlock().startHat_) {
//     log.debug("root block is not a top level block, orphaned block tree encountered");
//     breakIsValid = true;
//     return breakIsValid;
//   }

//   // Surround parent precedence
//   if (!currentBlock.getSurroundParent()) {
//     log.debug("found a break block that does not have a surround parent");
//     breakIsValid = false;
//     return breakIsValid;
//   }

//   while (currentBlock !== null) {
//     log.debug("current block: " + currentBlock);

//     if (currentBlock.parentBlock_ === null && currentBlock.startHat_) {
//       log.debug("reached the top of a non-orphaned block tree without encountering a valid loop");
//       breakIsValid = false;
//       break;
//     }

//     if (currentBlock.parentBlock_ && validLoops.includes(currentBlock.parentBlock_.type.slice(3))) {
//       log.debug("encountered a loop structure, checking if break is valid");
//       breakIsValid = checkSurroundParent(currentBlock);
//       break;
//     }

//     currentBlock = currentBlock.parentBlock_;
//   }

//   return breakIsValid;
// }

// function checkSurroundParent(block: any): boolean {
//   if (!block.getSurroundParent()) {
//     log.debug("reached the top of a stack of blocks");
//     return false;
//   } else if (validLoops.includes(block.getSurroundParent().type.slice(3))) {
//     log.debug("found a valid surround parent loop");
//     return true;
//   }

//   return checkSurroundParent(block.getSurroundParent());
// }

// function getWhenStartedName() {
//   if (targetIsPlaygrounds) {
//     return "pg_events_when_started";
//   } else if (targetIsGO) {
//     return "go_events_when_started";
//   } else if (targetIsEXP) {
//     return "exp_events_when_started";
//   } else if (targetIsV5) {
//     return "v5_events_when_started";
//   } else if (targetIsIQ) {
//     return "iq_events_when_started";
//   } else if (targetIs123) {
//     return "123_events_when_started";
//   }

//   return "pg_events_when_started";
// }

// function hasWhenStarted() {
//   const blockCounts = BlocklyController.getBlockCount();
//   const blockName = getWhenStartedName();

//   return blockCounts[blockName] > 0;
// }

// function hasMultipleWhenStarteds(limit: number, countDisable: boolean = true) {
//   const whenStartedID = getWhenStartedName();
//   return hasMultipleOfBlock(whenStartedID, limit, countDisable);
// }

// function hasMultipleOfBlock(blockName: string, limit: number, countDisable: boolean = true) {
//   let numBlocks = 0;
//   for (const block of Object.values(BlocklyController.blocklyWorkspace.blockDB_) as any) {
//     if (blockName === block.type && (countDisable || !block.disabled)) {
//       numBlocks += 1;
//     }
//   }

//   return numBlocks > limit;
// }

// function addWhenStarted() {
//   BlocklyController.Blockly.Events.disable();
//   const whenStartedID = getWhenStartedName();
//   const workspace = BlocklyController.blocklyWorkspace;
//   // TODO: the second string may need changed per platform, for now it is working for VR
//   const newBlock = workspace.newBlock(whenStartedID, ".NsXwU_L.OuU1l7Sho$F");
//   newBlock.setDeletable(false);
//   newBlock.moveBy(70, 110);
//   BlocklyController.rebuildWorkspaceBlocks();
//   BlocklyController.Blockly.Events.enable();
// }

// function disableIQGen2Blocks(appGenData: TargetGeneration): boolean {
//   let didDisableBlock = false;
//   if (appGenData === "First") {
//     log.debug("disabling blocks");
//     for (const block of Object.values(BlocklyController.blocklyWorkspace.blockDB_) as any) {
//       log.debug("block:", block.type);
//       // We want to disable if the block is only for gen2
//       if (gen2IQOnlyBlocks.includes(block.type)) {
//         block.disabled = true;
//         didDisableBlock = true;
//       }

//       // Or if the block is using the internal inertial sensor
//       if (gen2IQDropdownCheckBlocks.includes(block.type)) {
//         if (block.getFieldValue("GYRO") === "BrainInertial") {
//           block.disabled = true;
//           didDisableBlock = true;
//         }
//         log.debug("field value", block.getFieldValue("BUTTON"));
//         if (block.getFieldValue("BUTTON") === "ButtonL3" || block.getFieldValue("BUTTON") === "ButtonR3") {
//           block.disabled = true;
//           didDisableBlock = true;
//         }

//         if (block.getFieldValue("TARGET") === "Console") {
//           block.disabled = true;
//           didDisableBlock = true;
//         }
//       }
//     }
//   }

//   return didDisableBlock;
// }

// function hasIQGen2Blocks(): boolean {
//   for (const block of Object.values(BlocklyController.blocklyWorkspace.blockDB_) as any) {
//     log.debug("block:", block);
//     // We want to disable if the block is only for gen2
//     if (gen2IQOnlyBlocks.includes(block.type)) {
//       return true;
//     }

//     // Or if the block is using the internal inertial sensor
//     if (gen2IQDropdownCheckBlocks.includes(block.type)) {
//       if (block.getFieldValue("GYRO") === "BrainInertial") {
//         return true;
//       }

//       if (block.getFieldValue("BUTTON") === "ButtonL3" || block.getFieldValue("BUTTON") === "ButtonR3") {
//         return true;
//       }

//       if (block.getFieldValue("TARGET") === "Console") {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// function disableWhenStarteds(appGenData: TargetGeneration): boolean {
//   let didDisableWhenStarteds: boolean = false;
//   if (appGenData === "First") {
//     const orderedBlocks = BlocklyController.blocklyWorkspace.getTopBlocks(true);
//     const whenStartedName = "iq_events_when_started";
//     let whenStarteds = 0;

//     for (const block of orderedBlocks) {
//       if (block.type === whenStartedName && !block.disabled && whenStarteds < 3) {
//         whenStarteds++;
//       } else if (block.type === whenStartedName && whenStarteds >= 3) {
//         block.disabled = true;
//         didDisableWhenStarteds = true;
//       }
//     }
//   }

//   return didDisableWhenStarteds;
// }

// function isDefaultWorkspace(): boolean {
//   return Object.entries(BlocklyController.blocklyWorkspace.blockDB_).length === 1 && BlocklyController.blocklyWorkspace.blockDB_[".NsXwU_L.OuU1l7Sho$F"];
// }

// /**
//  * Utility function to prevent hat blocks from indefinitely highlighting
//  * @param blockId {string} - the block id to check
//  * @returns {boolean} - whether a block can be actively highlighted
//  */
// function isActiveHighlightable(blockId: string): boolean {
//   const block = BlocklyController.blocklyWorkspace.blockDB_[blockId];
//   if (block && !block.startHat_) {
//     return true;
//   }
//   return false;
// }

// /**
//  * Checks the workspace db to see if a block of the specified category exists.
//  * @param category {string} - the block category to search for
//  */
// function hasBlockOfCategory(category: string): boolean {
//   for (const block of Object.values(BlocklyController.blocklyWorkspace.blockDB_) as any) {
//     if (block.getCategory() === category) {
//       return true;
//     }
//   }
//   return false;
// }



/***/ }),

/***/ "./src/Blockly/Blocks/CommentBlock.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/CommentBlock.ts ***!
  \********************************************/
/*! exports provided: createcommentBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createcommentBlocks", function() { return createcommentBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");

function createcommentBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_singleline"] = {
    /**
     * Block for single line comment.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "input_value",
          name: "COMMENT",
          check: "CommentString"
        }],
        previousStatement: null,
        nextStatement: null,
        category: "Comments",
        style: "comment_blocks"
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_other_comment"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_singleline"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_other_comment"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_singleline"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_other_comment"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_singleline"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_other_comment"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_singleline"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["go_other_comment"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_singleline"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_other_comment"] = {
    /**
     * Block for single line comment.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "input_value",
          name: "COMMENT",
          check: "CommentString"
        }],
        previousStatement: null,
        nextStatement: null,
        category: "Comments",
        style: "comment_blocks",
        extensions: ["context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_text"] = {
    /**
     * Block for single line comment.
     * @this Blockly.Block
     */
    init: function init() {
      var validator = function validator(text) {
        return text.length <= 100 ? text : null;
      };
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_input",
          name: "comment",
          text: "comment",
          spellcheck: true,
          "class": validator
        }],
        output: "CommentString",
        outputShape: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_SQUARE,
        category: "Comments",
        style: "comment_text_blocks"
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["comment_multiline"] = {
    /**
     * Block for multi line comment.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_multilinetext",
          name: "COMMENT",
          spellcheck: true,
          text: ""
        }],
        category: "Comments",
        style: "comment_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Controls.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/Common_Controls.ts ***!
  \***********************************************/
/*! exports provided: createCommonControlBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonControlBlocks", function() { return createCommonControlBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Common Controls");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();



var STATIC = "../../../../static";
function getPathToMedia() {
  var _mainWorkspace;
  return ((_mainWorkspace = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace) === null || _mainWorkspace === void 0 ? void 0 : _mainWorkspace.options.pathToMedia) || "";
}
function createCommonControlBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_wait"] = {
    /**
     * Block to wait until a condition becomes true.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_wait"),
        args0: [{
          type: "input_value",
          name: "DURATION",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_forever"] = {
    /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_forever"),
        message1: "%1",
        // Statement
        message2: "%1",
        // Icon
        lastDummyAlign2: "RIGHT",
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        args2: [{
          type: "field_image",
          src: getPathToMedia() + "repeat.svg",
          width: 24,
          height: 24,
          alt: "*",
          flip_rtl: true
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_c"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_if"] = {
    /**
     * Block for if-then.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        type: "control_if",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then"),
        message1: "%1",
        // Statement
        args0: [{
          type: "input_value",
          name: "CONDITION",
          check: "Boolean"
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_c"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_if_else"] = {
    /**
     * Block for if-else.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        type: "control_if_else",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then"),
        message1: "%1",
        message2: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then_else"),
        message3: "%1",
        args0: [{
          type: "input_value",
          name: "CONDITION",
          check: "Boolean"
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        args3: [{
          type: "input_statement",
          name: "SUBSTACK2"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_e"]
      });
    }
  };
  try {
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.registerMutator("control_if_elseif_else_mutator", {
      branchCount: 2,
      // write the mutation value to xml
      mutationToDom: function mutationToDom() {
        var container = document.createElement("mutation");
        container.setAttribute("branches", this.branchCount.toString());
        return container;
      },
      // modify the element from a mutator value
      domToMutation: function domToMutation(xmlElement) {
        var branches = parseInt((xmlElement === null || xmlElement === void 0 ? void 0 : xmlElement.getAttribute("branches")) || 2, 10);
        while (this.branchCount < branches) {
          this.addBranch();
        }
        while (this.branchCount > branches) {
          this.removeBranch(this.branchCount);
        }
        this.updateBranchButtons();
      },
      /**
       * Update "else if" branches to add (or remove) mutator
       * buttons depending on whether they should be visible.
       */
      updateBranchButtons: function updateBranchButtons() {
        var _this = this;
        var allowAdd = this.branchCount <= 6;
        var allowRemove = this.branchCount > 2;
        var addField = this.getField("BRANCH_ADD");
        addField.setOnClickHandler(function () {
          _this.addBranch();
          _this.updateBranchButtons();
        });
        var currentAdd = addField.getValue();
        var currentAddAllowed = currentAdd.endsWith("add.png");
        if (currentAddAllowed !== allowAdd) {
          addField.setValue(allowAdd ? this.icons.ADD : this.icons.BLANK);
        }
        var removeField = this.getField("BRANCH_REMOVE");
        removeField.setOnClickHandler(function () {
          _this.removeBranch(_this.branchCount);
          _this.updateBranchButtons();
        });
        var currentRemove = removeField.getValue();
        var currentRemoveAllowed = currentRemove.endsWith("remove.png");
        if (currentRemoveAllowed !== allowRemove) {
          removeField.setValue(allowRemove ? this.icons.REMOVE : this.icons.BLANK);
        }
      },
      addBranch: function addBranch() {
        var _outlinePath$parentEl;
        // prevent adding more than 6 branches
        if (this.branchCount > 6) {
          return;
        }
        var preAddMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        var newPosition = ++this.branchCount;
        var postAddMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        var outlinePath = this.inputList[0].outlinePath;
        var _i18n$t$split$map = _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then_else_if").split("%1").map(function (x) {
            return x.trim();
          }),
          _i18n$t$split$map2 = _slicedToArray(_i18n$t$split$map, 2),
          beforeText = _i18n$t$split$map2[0],
          afterText = _i18n$t$split$map2[1];
        _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(true);
        _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.fire(new _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.BlockChange(this, "mutation", null, preAddMutation, postAddMutation));
        var conditionInput = this.appendValueInput("CONDITION" + newPosition).setCheck('Boolean').setAlign(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ALIGN_LEFT).appendField(beforeText);
        conditionInput.outlinePath = outlinePath === null || outlinePath === void 0 ? void 0 : outlinePath.cloneNode(); // copy outlinePath property from the first condition input & add to DOM
        outlinePath === null || outlinePath === void 0 ? void 0 : (_outlinePath$parentEl = outlinePath.parentElement) === null || _outlinePath$parentEl === void 0 ? void 0 : _outlinePath$parentEl.appendChild(conditionInput.outlinePath);
        this.appendDummyInput("LABEL" + newPosition).appendField(afterText);
        this.appendStatementInput("SUBSTACK" + newPosition);

        // move new inputs before "else" branch
        // (some inputs do not have names, and can only be referenced by their position/index)
        var i = this.inputList.length;
        this.moveNumberedInputBefore(i - 3, i - 6);
        this.moveNumberedInputBefore(i - 2, i - 5);
        this.moveNumberedInputBefore(i - 1, i - 4);
        _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(false);
        if (this.initSvg) {
          this.initSvg();
        }
      },
      removeBranch: function removeBranch(position) {
        if (position > this.branchCount) {
          return;
        }
        if (this.branchCount <= 2) {
          return;
        }
        var preRemoveMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        this.branchCount--;
        var postRemoveMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(true);
        _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.fire(new _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.BlockChange(this, "mutation", null, preRemoveMutation, postRemoveMutation));
        this.removeInput("CONDITION" + position, true);
        this.removeInput("LABEL" + position, true);
        this.removeInput("SUBSTACK" + position, true);

        // collapse following input positions to fill current position
        // (e.g. removing LABEL4, rename LABEL5->LABEL4, LABEL6->LABEL5, ...)
        for (var i = position; i < this.branchCount + 1; i++) {
          this.getInput("CONDITION" + (i + 1)).name = "CONDITION" + i;
          this.getInput("LABEL" + (i + 1)).name = "LABEL" + i;
          this.getInput("SUBSTACK" + (i + 1)).name = "SUBSTACK" + i;
        }
        _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(false);
        if (this.initSvg) {
          this.initSvg();
        }
      }
    }, function () {
      var _label2$fieldRow, _label2$fieldRow$;
      // find the unnamed label for the default "else if" block
      var label2 = this.inputList[4];
      if ((label2 === null || label2 === void 0 ? void 0 : (_label2$fieldRow = label2.fieldRow) === null || _label2$fieldRow === void 0 ? void 0 : _label2$fieldRow.length) === 1 && (label2 === null || label2 === void 0 ? void 0 : (_label2$fieldRow$ = label2.fieldRow[0]) === null || _label2$fieldRow$ === void 0 ? void 0 : _label2$fieldRow$.text_) === "then") {
        label2.name = "LABEL2";
      }
      this.updateBranchButtons();
    });
  } catch (err) {
    log.debug("error registering mutator for if/else if/else block:", err);
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_if_elseif_else"] = {
    /**
     * Block for if-if-else.
     * @this Blockly.Block
     */
    init: function init() {
      var LOCAL_STATIC = getPathToMedia() + STATIC;
      var ADD = "".concat(LOCAL_STATIC, "/img/ui_imgs/elseif_add.png");
      var REMOVE = "".concat(LOCAL_STATIC, "/img/ui_imgs/elseif_remove.png");
      var BLANK = "".concat(LOCAL_STATIC, "/img/ui_imgs/elseif_blank.png");
      this.icons = {
        ADD: ADD,
        REMOVE: REMOVE,
        BLANK: BLANK
      };
      this.jsonInit({
        type: "control_if_elseif_else",
        mutator: "control_if_elseif_else_mutator",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then_else_if_if"),
        message1: "%1",
        message2: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then_else_if"),
        message3: "%1",
        message4: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_if_then_else"),
        message5: "%1 %2",
        message6: "%1",
        args0: [{
          type: "field_image",
          name: "BRANCH_BLANK",
          src: BLANK,
          width: 26,
          height: 30
        }, {
          type: "input_value",
          name: "CONDITION1",
          check: "Boolean"
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK1"
        }],
        args2: [{
          type: "input_value",
          name: "CONDITION2",
          check: "Boolean"
        }],
        args3: [{
          type: "input_statement",
          name: "SUBSTACK2"
        }],
        args5: [{
          type: "field_image",
          name: "BRANCH_REMOVE",
          src: REMOVE,
          width: 30,
          height: 30
        }, {
          type: "field_image",
          name: "BRANCH_ADD",
          src: ADD,
          width: 30,
          height: 30
        }],
        args6: [{
          type: "input_statement",
          name: "SUBSTACK_ELSE"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_ce"]
      });
      this.inputList[7].setAlign(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ALIGN_RIGHT);
      this.updateBranchButtons();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_repeat"] = {
    /**
     * Block for repeat n times (external number).
     * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        id: "control_repeat",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_repeat"),
        message1: "%1",
        // Statement
        message2: "%1",
        // Icon
        lastDummyAlign2: "RIGHT",
        args0: [{
          type: "input_value",
          name: "TIMES",
          check: "Number"
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        args2: [{
          type: "field_image",
          src: getPathToMedia() + "repeat.svg",
          width: 24,
          height: 24,
          alt: "*",
          flip_rtl: true
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_c"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_while"] = {
    /**
     * Block for repeat n times (external number).
     * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        id: "control_while",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_while"),
        message1: "%1",
        message2: "%1",
        lastDummyAlign2: "RIGHT",
        args0: [{
          type: "input_value",
          name: "CONDITION",
          check: "Boolean"
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        args2: [{
          type: "field_image",
          src: getPathToMedia() + "repeat.svg",
          width: 24,
          height: 24,
          alt: "*",
          flip_rtl: true
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_c"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_wait_until"] = {
    /**
     * Block to wait until a condition becomes true.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_wait_until"),
        // Blockly.Msg.CONTROL_WAITUNTIL,
        args0: [{
          type: "input_value",
          name: "CONDITION",
          check: "Boolean"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_repeat_until"] = {
    /**
     * Block to repeat until a condition becomes true.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_repeat_until"),
        // Blockly.Msg.CONTROL_REPEATUNTIL,
        message1: "%1",
        message2: "%1",
        lastDummyAlign2: "RIGHT",
        args0: [{
          type: "input_value",
          name: "CONDITION",
          check: "Boolean"
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        args2: [{
          type: "field_image",
          src: getPathToMedia() + "repeat.svg",
          width: 24,
          height: 24,
          alt: "*",
          flip_rtl: true
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert_group_c"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_break"] = {
    /**
     * Block to break out of loop.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_control_break"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["control_stop_project"] = {
    /**
     * Block to stop project.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_control_stop_project"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_end", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Events.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/Common_Events.ts ***!
  \*********************************************/
/*! exports provided: createCommonEventBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonEventBlocks", function() { return createCommonEventBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");


function createCommonEventBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["event_started"] = {
    /**
     * Block for when program started events.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_events_when_started"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_timer"] = {
    /**
     * Block to define when the timer is greater than x seconds
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_events_when_timer"),
        args0: [{
          type: "input_value",
          name: "AMOUNT",
          check: "NumberOnly"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE = "broadcast_msg";
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_BROADCAST_MESSAGE_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_message_name");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.BROADCAST_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_message");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_BROADCAST_MESSAGE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_message");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BROADCAST_MESSAGE_NAME = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_default_message");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_MESSAGE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_message");
  // Rename Modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_MESSAGE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_message");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_MESSAGE_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_message_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_MESSAGE_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_message_modal_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_broadcasted"] = {
    /**
     * Block to define broadcast event stack.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_events_when_broadcasted"),
        args0: [{
          type: "field_variable",
          name: "BROADCAST_OPTION",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE,
          variable: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["event_broadcast_menu"] = {
    /**
     * Broadcast drop-down menu.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_variable",
          name: "BROADCAST_OPTION",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE,
          variable: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }],
        style: "event_blocks",
        output: "BROADMENU",
        extensions: ["output_string"]
      });
      this.setOutput(true, "BROADMENU");
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast"] = {
    /**
     * Block to send broadcast message.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        id: "iq_events_broadcast",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_events_broadcast"),
        args0: [{
          type: "field_variable",
          name: "BROADCAST_OPTION",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE,
          variable: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast_and_wait"] = {
    /**
     * Block to send broadcast message and wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        id: "iq_events_broadcast_and_wait",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_events_broadcast_and_wait"),
        args0: [{
          type: "field_variable",
          name: "BROADCAST_OPTION",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE,
          variable: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Inputs.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/Common_Inputs.ts ***!
  \*********************************************/
/*! exports provided: createCommonInputBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonInputBlocks", function() { return createCommonInputBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");


function createCommonInputBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["math_number"] = {
    /**
     * Block for generic numeric value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_number",
          name: "NUM",
          value: "0"
        }],
        style: "text_blocks",
        extensions: ["output_number"]
        // colour: Blockly.Colours.textField,
        // colourSecondary: Blockly.Colours.textField,
        // colourTertiary: Blockly.Colours.textField,
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["math_integer"] = {
    /**
     * Block for integer value (no decimal, + or -).
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_number",
          name: "NUM",
          precision: 1
        }],
        style: "text_blocks",
        extensions: ["output_number"]
        // colour: Blockly.Colours.textField,
        // colourSecondary: Blockly.Colours.textField,
        // colourTertiary: Blockly.Colours.textField
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["math_whole_number"] = {
    /**
     * Block for whole number value, no negatives or decimals.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_number",
          name: "NUM",
          min: 0,
          precision: 1
        }],
        style: "text_blocks",
        extensions: ["output_number"]
        // colour: Blockly.Colours.textField,
        // colourSecondary: Blockly.Colours.textField,
        // colourTertiary: Blockly.Colours.textField
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["math_positive_number"] = {
    /**
     * Block for positive number value, with decimal.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_number",
          name: "NUM",
          min: 0
        }],
        style: "text_blocks",
        extensions: ["output_number"]
        // colour: Blockly.Colours.textField,
        // colourSecondary: Blockly.Colours.textField,
        // colourTertiary: Blockly.Colours.textField
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["math_positive_number_only"] = {
    /**
     * Block for positive number value, with decimal.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_number",
          name: "NUM",
          min: 0
        }],
        output: "NumberOnly",
        outputShape: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_ROUND,
        style: "text_blocks"
        // extensions: ["output_number"],

        // colour:  (Blockly as any).Colours.textField,
        // colourSecondary: (Blockly as any).Colours.textField,
        // colourTertiary: (Blockly as any).Colours.textField,
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["procedure_bool_input"] = {
    /**
     * Block return a boolean value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_dropdown",
          name: "BOOLVALUE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_true"), "true"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_false"), "false"]]
        }],
        style: "myblocks_blocks",
        extensions: ["output_boolean"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Operators.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/Common_Operators.ts ***!
  \************************************************/
/*! exports provided: createCommonOperatorBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonOperatorBlocks", function() { return createCommonOperatorBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");


function createCommonOperatorBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_add"] = {
    /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 + %2",
        args0: [{
          type: "input_value",
          name: "NUM1",
          check: "Number"
        }, {
          type: "input_value",
          name: "NUM2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_add"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_add"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_add"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_add"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_subtract"] = {
    /**
     * Block for subtracting two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 - %2",
        args0: [{
          type: "input_value",
          name: "NUM1",
          check: "Number"
        }, {
          type: "input_value",
          name: "NUM2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_subtract"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_subtract"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_subtract"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_subtract"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_multiply"] = {
    /**
     * Block for multiplying two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 * %2",
        args0: [{
          type: "input_value",
          name: "NUM1",
          check: "Number"
        }, {
          type: "input_value",
          name: "NUM2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_multiply"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_multiply"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_multiply"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_multiply"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_divide"] = {
    /**
     * Block for dividing two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 / %2",
        args0: [{
          type: "input_value",
          name: "NUM1",
          check: "Number"
        }, {
          type: "input_value",
          name: "NUM2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_divide"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_divide"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_divide"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_divide"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_random"] = {
    /**
     * Block for picking a random number.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_random"),
        args0: [{
          type: "input_value",
          name: "FROM",
          check: "Number"
        }, {
          type: "input_value",
          name: "TO",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_random"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_random"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_random"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_random"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_less_than"] = {
    /**
     * Block for less than comparator.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 < %2",
        args0: [{
          type: "input_value",
          name: "OPERAND1",
          check: "Number"
        }, {
          type: "input_value",
          name: "OPERAND2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_less_than"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_less_than"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_less_than"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_less_than"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_equal_to"] = {
    /**
     * Block for equals comparator.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 = %2",
        args0: [{
          type: "input_value",
          name: "OPERAND1",
          check: "Number"
        }, {
          type: "input_value",
          name: "OPERAND2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_equal_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_equal_to"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_equal_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_equal_to"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_greater_than"] = {
    /**
     * Block for greater than comparator.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 > %2",
        args0: [{
          type: "input_value",
          name: "OPERAND1",
          check: "Number"
        }, {
          type: "input_value",
          name: "OPERAND2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_greater_than"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_greater_than"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_greater_than"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_greater_than"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_function"] = {
    /**
     * Block for "advanced" math ops on a number.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_function"),
        args0: [{
          type: "field_dropdown",
          name: "OPERATOR",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_abs"), "abs"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_floor"), "floor"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_ceiling"), "ceiling"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_sqrt"), "sqrt"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_sin"), "sin"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_cos"), "cos"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_tan"), "tan"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_asin"), "asin"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_acos"), "acos"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_atan"), "atan"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_ln"), "ln"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_log"), "log"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_exp"), "e ^"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_functions_pwr_ten"), "10 ^"]]
        }, {
          type: "input_value",
          name: "NUM",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_function"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_function"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_function"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_function"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_remainder"] = {
    /**
     * Block for mod two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_remainder"),
        args0: [{
          type: "input_value",
          name: "NUM1",
          check: "Number"
        }, {
          type: "input_value",
          name: "NUM2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_remainder"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_remainder"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_remainder"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_remainder"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_round"] = {
    /**
     * Block for rounding a numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_round"),
        args0: [{
          type: "input_value",
          name: "NUM",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_round"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_round"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["exp_operator_round"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_round"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_and"] = {
    /**
     * Block for "and" boolean comparator.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_and"),
        args0: [{
          type: "input_value",
          name: "OPERAND1",
          check: "Boolean"
        }, {
          type: "input_value",
          name: "OPERAND2",
          check: "Boolean"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_or"] = {
    /**
     * Block for "or" boolean comparator.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_or"),
        args0: [{
          type: "input_value",
          name: "OPERAND1",
          check: "Boolean"
        }, {
          type: "input_value",
          name: "OPERAND2",
          check: "Boolean"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_not"] = {
    /**
     * Block for "not" unary boolean operator.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_operator_not"),
        args0: [{
          type: "input_value",
          name: "OPERAND",
          check: "Boolean"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.operators,
        style: "operators_blocks",
        inputsInline: true,
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Procedures.ts":
/*!*************************************************!*\
  !*** ./src/Blockly/Blocks/Common_Procedures.ts ***!
  \*************************************************/
/*! exports provided: createCommonProcedures, createAugmentedProcedures */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonProcedures", function() { return createCommonProcedures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAugmentedProcedures", function() { return createAugmentedProcedures; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Common Procedures blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();



function createCommonProcedures() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["procedures_definition"] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_procedures_definition"),
        args0: [{
          type: "input_statement",
          name: "custom_block"
        }],
        style: "myblocks_blocks_hat",
        extensions: ["shape_hat", "procedure_def_contextmenu"]
      });
    }
  };
}
function createAugmentedProcedures() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["procedures_call"] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        style: "myblocks_blocks",
        extensions: ["shape_statement", "procedure_call_contextmenu", "context_menu_convert"]
      });
      this.procCode_ = "";
      this.argumentIds_ = [];
      this.warp_ = false;
    },
    // Shared.
    getProcCode: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.getProcCode,
    getFuncName: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.getFuncName,
    removeAllInputs_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.removeAllInputs_,
    disconnectOldBlocks_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.disconnectOldBlocks_,
    deleteShadows_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.deleteShadows_,
    createAllInputs_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.createAllInputs_,
    updateDisplay_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.updateDisplay_,
    // Exist on all three blocks, but have different implementations.
    mutationToDom: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.callerMutationToDom,
    domToMutation: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.callerDomToMutation,
    populateArgument_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.populateArgumentOnCaller_,
    addProcedureLabel_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.addLabelField_,
    // Only exists on the external caller.
    attachShadow_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.attachShadow_,
    buildShadowDom_: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ScratchBlocks.ProcedureUtils.buildShadowDom_
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Strings.ts":
/*!**********************************************!*\
  !*** ./src/Blockly/Blocks/Common_Strings.ts ***!
  \**********************************************/
/*! exports provided: setCommonBlocklyStrings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCommonBlocklyStrings", function() { return setCommonBlocklyStrings; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");


function setCommonBlocklyStrings() {
  // Context menus
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DUPLICATE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:duplicate");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.ADD_COMMENT = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:add_comment");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.REMOVE_COMMENT = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:remove_comment");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_BLOCK = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_block");
  // we don't want to show the number of blocks...
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_X_BLOCKS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_x_blocks");
  // (Blockly as any).Msg.DELETE_X_BLOCKS = i18n.t("blockly:delete_x_blocks");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_ALL_BLOCKS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_all_blocks");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.CLEAN_UP = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:clean_up");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.HELP = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:help");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.UNDO = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:undo");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.REDO = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:redo");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.COLLAPSE_BLOCK = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:collapse_block");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.COLLAPSE_ALL = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:collapse_all");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.EXPAND_BLOCK = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:expand_block");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.EXPAND_ALL = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:expand_all");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DISABLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:Disable");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.ENABLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:Enable");

  // for my blocks (procedures)
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.EDIT_PROCEDURE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:edit_procedure");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.SHOW_PROCEDURE_DEFINITION = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:show_procedure_definition");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_PROCEDURE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:New Procedure");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.PROCEDURE_ALREADY_EXISTS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:Procedure already exists");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.PROCEDURE_DEFAULT_NAME = "block name";

  /// note text - This text appears in a new workspace note, to hint that
  /// the user can type here.
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.WORKSPACE_COMMENT_DEFAULT_TEXT = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:workspace_comment_default_text");
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Variables.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/Common_Variables.ts ***!
  \************************************************/
/*! exports provided: createCommonListBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonListBlocks", function() { return createCommonListBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");



// tslint:disable: quotemark
// tslint:disable: object-literal-shorthand object-literal-key-quotes trailing-comma
// tslint:disable: max-line-length

function createCommonListBlocks() {
  //#region "variables"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.CHANGE_VALUE_TITLE = 'Change value:';

  // Button
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_VARIABLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_make_variable");
  // Create Modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_VARIABLE_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_variable_name");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.VARIABLE_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_variable");
  // Messages
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.VARIABLE_ALREADY_EXISTS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:variable_already_exists");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:variable_already_exists_for_another_type");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_VARIABLE_CONFIRMATION = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_variable_confirmation");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.CANNOT_DELETE_VARIABLE_PROCEDURE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:cannot_delete_variable_procedure");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_VARIABLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_variable");
  // Rename Modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_VARIABLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_variable");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_VARIABLE_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_variable_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_VARIABLE_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_variable_modal_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_variable'] = {
    /**
     * Block of Variables
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": "%1",
        "lastDummyAlign0": "CENTRE",
        "args0": [{
          "type": "field_variable_getter",
          "text": "",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        "extensions": ["contextMenu_getVariableBlock", "output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_variable_with_checkbox'] = {
    /**
     * Block of Variables
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": "%1",
        "lastDummyAlign0": "CENTRE",
        "args0": [{
          "type": "field_variable_getter",
          "text": "",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        "checkboxInFlyout": true,
        style: "data_blocks",
        "extensions": ["contextMenu_getVariableBlock", "output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_setvariableto'] = {
    /**
     * Block to set variable to a certain value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_variable_to"),
        "args0": [{
          "type": "field_variable",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE
        }, {
          "type": "input_value",
          "name": "VALUE",
          "check": "Number"
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        "extensions": ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_changevariableby'] = {
    /**
     * Block to change variable by a certain value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_change_variable_by"),
        "args0": [{
          "type": "field_variable",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE
        }, {
          "type": "input_value",
          "name": "VALUE",
          "check": "Number"
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        "extensions": ["shape_statement"]
      });
    }
  };
  //#endregion

  //#region "booleans"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_BOOL = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:make boolean");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_BOOL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:new boolean title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.BOOL_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:new boolean");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.BOOL_ALREADY_EXISTS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:boolean already exists");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_BOOL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename boolean title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_BOOL_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename boolean modal title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BOOL_ITEM = 'boolean';
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_BOOL = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete boolean");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_BOOL = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename boolean");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_bool_variable'] = {
    /**
     * Block of bool Variables
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": "%1",
        "lastDummyAlign0": "CENTRE",
        "args0": [{
          "type": "field_variable_getter",
          "text": "",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        "extensions": ["contextMenu_getVariableBlock", "output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_bool_variable_with_checkbox'] = {
    /**
     * Block of bool Variables
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": "%1",
        "lastDummyAlign0": "CENTRE",
        "args0": [{
          "type": "field_variable_getter",
          "text": "",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        "checkboxInFlyout": true,
        style: "data_blocks",
        "extensions": ["contextMenu_getVariableBlock", "output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_setboolvariableto'] = {
    /**
     * Block to set boolean variable to a certain value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_boolean_variable"),
        "args0": [{
          "type": "field_variable",
          "name": "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE
        }, {
          "type": "input_value",
          "name": "VALUE",
          "check": "Boolean"
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        "extensions": ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['bool_input'] = {
    /**
     * Block return a boolean value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": "%1",
        "args0": [{
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_true"), "true"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_false"), "false"]]
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        "extensions": ["output_boolean"]
      });
    }
  };
  //#endregion

  //#region "lists"
  // Button 
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_LIST = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_make_list");
  // Create Modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_LIST_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_list_name");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.LIST_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_list");
  // Messages
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.LIST_ALREADY_EXISTS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:list_already_exists");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_LIST_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_list_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_LIST_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_list_modal_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_LIST_ITEM = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:default_list_item");
  // Rename Modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_LIST = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_list");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_LIST = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_list");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_replaceitemoflist'] = {
    /**
     * Block to insert item to list.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_item_of_array"),
        "args0": [{
          "type": "input_value",
          "name": "INDEX",
          "check": "Number"
        }, {
          "type": "field_variable",
          "name": "LIST",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE
        }, {
          "type": "input_value",
          "name": "ITEM",
          "check": "Number"
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_itemoflist'] = {
    /**
     * Block for reporting item of list.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_item_of_array"),
        "args0": [{
          "type": "input_value",
          "name": "INDEX",
          "check": "Number"
        }, {
          "type": "field_variable",
          "name": "LIST",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_lengthoflist'] = {
    /**
     * Block for reporting length of list.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_size_of_array"),
        "args0": [{
          "type": "field_variable",
          "name": "LIST",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_listsetvalue'] = {
    /**
     * Block to list contents.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_array_to"),
        "args0": [{
          "type": "field_variable",
          "name": "LIST",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["shape_statement"],
        "mutator": "data_set_list_contents_mutator"
      });
    }
  };
  //#endregion

  //#region "2D Array blocks"
  // Button
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_ARRAY = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_make_2d_list");
  // Create Modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.NEW_ARRAY_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_2d_list_name");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.ARRAY_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_blockly_new_2d_list");
  // Messages
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.ARRAY_ALREADY_EXISTS = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:array_already_exists");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_ARRAY_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_array_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_ARRAY_MODAL_TITLE = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_array_modal_title");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_ARRAY_ITEM = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:default_array_item");
  // Rename modal
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.RENAME_2DARRAY = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rename_2darray");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DELETE_2DARRAY = _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:delete_2darray");
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_itemof2darray'] = {
    /**
     * Block for reporting item of 2D array.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_item_of_2d_array"),
        "args0": [{
          "type": "input_value",
          "name": "ROW",
          "check": "Number"
        }, {
          "type": "input_value",
          "name": "COLUMN",
          "check": "Number"
        }, {
          "type": "field_variable",
          "name": "ARRAY",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_setitemof2darray'] = {
    /**
     * Block to set item in 2D array.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_item_of_2d_array"),
        "args0": [{
          "type": "input_value",
          "name": "ROW",
          "check": "Number"
        }, {
          "type": "input_value",
          "name": "COLUMN",
          "check": "Number"
        }, {
          "type": "field_variable",
          "name": "ARRAY",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE
        }, {
          "type": "input_value",
          "name": "VALUE",
          "check": "Number"
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_set2darrayto'] = {
    /**
     * Block to set 2D array contents.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_2d_array_to"),
        "args0": [{
          "type": "field_variable",
          "name": "ARRAY",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["shape_statement", "context_menu_convert"],
        "mutator": "data_set_2darray_contents_mutator"
      });
      this.setInputsInline(false);
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_lengthof2darray'] = {
    /**
     * Block for reporting length of 2D array.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_length_of_2d_array"),
        "args0": [{
          "type": "field_variable",
          "name": "ARRAY",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].ARRAY2D_VARIABLE_TYPE
        }, {
          type: "field_dropdown",
          name: "DIRECTION",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_2d_list_rows"), "rows"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_2d_list_columns"), "columns"]]
        }],
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks['data_2darrayrow'] = {
    /**
     * special block used for setting the row value of a 2d array.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        "message0": "",
        "args0": [],
        "output": "ARRAY_ROW",
        "category": _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        "extensions": ["output_number"],
        "mutator": "data_set_2darrayrow_contents_mutator"
      });
      this.setOutput(true, "ARRAY_ROW");
    }
  };
  //#endregion
}



/***/ }),

/***/ "./src/Blockly/Core/blocklyDefaultToolbox.ts":
/*!***************************************************!*\
  !*** ./src/Blockly/Core/blocklyDefaultToolbox.ts ***!
  \***************************************************/
/*! exports provided: blocklyDefaultToolbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blocklyDefaultToolbox", function() { return blocklyDefaultToolbox; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_1__);


var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_1__["getLogger"]("blocklyDefaultToolbox");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

function blocklyDefaultToolbox() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks.baseToolbox = '<xml id="toolbox" style="display: none">' + '  <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">' + '    <block type="event_started" id="event_started"></block>' + '  </category>' + '  <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">' + '  <block type="control_wait" id="control_wait">' + '      <value name="DURATION">' + '        <shadow type="math_positive_number">' + '          <field name="NUM">1</field>' + '        </shadow>' + '      </value>' + '    </block>' + '    <block type="control_repeat" id="control_repeat">' + '      <value name="TIMES">' + '        <shadow type="math_whole_number">' + '          <field name="NUM">10</field>' + '        </shadow>' + '      </value>' + '    </block>' + '    <block type="control_forever" id="control_forever"></block>' + '    <block type="control_if" id="control_if"></block>' + '    <block type="control_if_else" id="control_if_else"></block>' + '    <block type="control_wait_until" id="control_wait_until"></block>' + '    <block type="control_repeat_until" id="control_repeat_until"></block>' + '  </category>' + '</xml>';
}

/***/ }),

/***/ "./src/Blockly/Core/blocklyFields.tsx":
/*!********************************************!*\
  !*** ./src/Blockly/Core/blocklyFields.tsx ***!
  \********************************************/
/*! exports provided: addVexcodeBlocklyFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addVexcodeBlocklyFields", function() { return addVexcodeBlocklyFields; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vexcode/blockly-react-component/dist/BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _PrismInterface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../PrismInterface */ "./src/PrismInterface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("BlocklyFields");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

// add history logger
var historyLogger = log.setHistoryLogger("BlocklyFields");
historyLogger.setLevel(log.levels.DEBUG);

// import "prismjs/themes/prism.css";


// since this file gets called in a webworker, we need to make sure we don't use "window".
// instead we create this const to keep things clean and make a fake window, since self
// is either window or something similar when running in a webworker. the we just use this
// new "win" instead of "window". this also makes sure there are no scope issues from using
// self inside functions
var win = self;
var isWebWorker = !(win !== null && win !== void 0 && win.document);


// we import just the types since we can't import these when in a web worker

// create vars to hold the later imports
var React = null;
var ReactDOM = null;
var Prism = null;
var updatePrismLang = null;
var BlocklyController = null;
function addVexcodeBlocklyFields() {
  // set the max line length for text inputs in display mode
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].FieldTextInput.prototype.maxDisplayLength = 500;

  // set the min width for multi-line text inputs
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].FieldMultilineInput.prototype.minDisplayWidth = 300;
  !isWebWorker && win.addEventListener("load", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var BlocklyTextEditor;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // we need to pull these in dynamically to avoid issues with this code running in a webworker
          log.debug("try to import react and PrismJS");
          _context.prev = 1;
          _context.next = 4;
          return Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! react */ "react", 7));
        case 4:
          React = _context.sent;
          _context.next = 7;
          return Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! react-dom */ "react-dom", 7));
        case 7:
          ReactDOM = _context.sent;
          _context.next = 10;
          return Object(_PrismInterface__WEBPACK_IMPORTED_MODULE_3__["getPrism"])();
        case 10:
          Prism = _context.sent;
          _context.next = 13;
          return Promise.all(/*! import() */[__webpack_require__.e(11), __webpack_require__.e(46)]).then(__webpack_require__.bind(null, /*! ./vexPrismLanguages */ "./src/Blockly/Core/vexPrismLanguages.ts"));
        case 13:
          updatePrismLang = _context.sent.updatePrismLang;
          _context.next = 16;
          return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../../Blockly/BlocklyController */ "./src/Blockly/BlocklyController.ts"));
        case 16:
          BlocklyController = _context.sent;
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          log.warn(_context.t0);
          return _context.abrupt("return");
        case 23:
          // listen to when registerLanguages() is called, so we can call updatePrismLang anytime a Language is registered
          _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_2__["on"]("TextEditor.registerLanguages", updatePrismLang);
          log.debug(Prism.languages['vex-py-rover']);
          updatePrismLang();
          log.debug("import editor");
          _context.next = 29;
          return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(10), __webpack_require__.e(12), __webpack_require__.e(4), __webpack_require__.e(14), __webpack_require__.e(7), __webpack_require__.e(5), __webpack_require__.e(9), __webpack_require__.e(6), __webpack_require__.e(2), __webpack_require__.e(11), __webpack_require__.e(8), __webpack_require__.e(13), __webpack_require__.e(59)]).then(__webpack_require__.bind(null, /*! ../../texteditor/blocklyTextEditor */ "./src/texteditor/blocklyTextEditor.tsx"));
        case 29:
          BlocklyTextEditor = _context.sent.BlocklyTextEditor;
          log.debug("import done");

          // Custom Editor Component for Switch Blocks, uses Monaco for Syntax Highlighting & Autocomplete
          _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].FieldMultilineInput.customEditor = function (div, value, scale, onChange, onCancel, disposeReturn) {
            log.info("display block editor", onChange);
            var onContentChange = function onContentChange(value) {
              log.debug("found editor value change...", value);
              if (onChange) {
                setTimeout(function () {
                  onChange(value);
                }, 0);
              }
            };
            var dummyElem = null;
            // hack to solve BlocklyTextEditor not getting the monaco object in NWJS...
            if (!BlocklyTextEditor.monacoObject) {
              BlocklyTextEditor.monacoObject = monaco;
            }
            var editor = /*#__PURE__*/React.createElement(BlocklyTextEditor, {
              startingText: value,
              scale: scale,
              onContentChange: onContentChange,
              onCreateDummy: function onCreateDummy(dummy) {
                dummyElem = dummy;
              },
              onCancel: onCancel
            });
            ReactDOM.render(editor, div);
            disposeReturn(function () {
              log.debug("dispose of editor...");
              ReactDOM.unmountComponentAtNode(div);
            });
            return dummyElem;
          };

          // Custom Viewer Component for Switch Blocks, uses PrismJS for Tokenization & Syntax Highlighting
          // TODO: update blockly so that we don't need to use any here
          _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].FieldMultilineInput.customViewer = function (div, value) {
            var highlight = function highlight(value) {
              return Prism.highlight(value, Prism.languages['vex-py'], "vex-py");
            };
            var formatted = highlight(value);
            var svgText = formatted.replace(/\<span/g, "<tspan").replace(/\<\/span/g, "</tspan");
            var splitLine = svgText.split("\n");
            var inner = "";
            for (var i = 0; i < splitLine.length; i++) {
              log.debug(splitLine[i]);
              inner = inner + "<text class=\"blocklyText blocklyMultilineText\" x=\"8\" y=\"".concat(6.5 + 16 * i + 6.5 * i, "\" dy=\"16\" style=\"\n        font: unset;\n        font-weight: 400;\n        font-family: Menlo, Monaco, 'Courier New', monospace;\n        white-space: pre;\n        fill: black;\n    \">").concat(splitLine[i], "</text>");
            }
            div.innerHTML = inner;
            return true;
          };

          // we need to redraw the workspace since the workspace has already been drawn by now.
          // so to make sure that we are actually showing the view syntax highlighting (which
          // is why the loading process takes so long...), we need to make Blockly redraw the
          // current workspace. This may need to get updated if we need to updated multiple
          // workspaces. it may not be required if changing between workspaces triggers a redraw.
          BlocklyController.getCurrentMainController().rebuildWorkspaceBlocks();
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 19]]);
  })));
}


/***/ }),

/***/ "./src/Blockly/Core/blocklyMixedMode.ts":
/*!**********************************************!*\
  !*** ./src/Blockly/Core/blocklyMixedMode.ts ***!
  \**********************************************/
/*! exports provided: initBlocklyMixedModeCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBlocklyMixedModeCode", function() { return initBlocklyMixedModeCode; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PG_ConfigData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PG_ConfigData */ "./src/Blockly/PG_ConfigData.ts");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vexcode/blockly-react-component/dist/BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GA/SwitchEvents */ "./src/GA/SwitchEvents.ts");
/* harmony import */ var _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../FeatureLock/Licenses */ "./src/FeatureLock/Licenses.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../targetPlatform */ "./src/targetPlatform.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("blocklyMixedMode");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();








var LicenseSystem = null;
if (self.React) {
  try {
    Promise.all(/*! import() */[__webpack_require__.e(4), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, /*! ../../FeatureLock/LicenseSystem */ "./src/FeatureLock/LicenseSystem.ts")).then(function (result) {
      LicenseSystem = result;
    });
  } catch (err) {
    log.info(err);
  }
}
function enabledOnConversionAllowed() {
  var hasSwitch = _PG_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getCurrentModel"]() !== "vrGO" && _PG_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getCurrentModel"]() !== "vr123";
  if (!hasSwitch) {
    return "hidden";
  }
  try {
    var _LicenseSystem;
    return ((_LicenseSystem = LicenseSystem) === null || _LicenseSystem === void 0 ? void 0 : _LicenseSystem.getLicenseWithRefresh()) === _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_6__["FeatureLockLicense"].Advanced ? "enabled" : "disabled";
  } catch (err) {
    // since this can run in a worker, the local storage can fail there and cause an error...
    return "disabled";
  }
}

//#region mixed mode block generators
/**
 * helper to set the code value for an input block
 * @param workspace the workspace this is in
 * @param block the block to work on
 * @param name the name of the input to set
 * @param code the code string to set the input to
 */
function createMixedModeShadowInput(workspace, block, name, code) {
  var tempBlockShadow = workspace.newBlock("mixed_singleline_text");
  tempBlockShadow.setShadow(true);
  tempBlockShadow.setFieldValue(code, "INPUT");

  // Set up the text input to connect correctly with the shadow input block
  var tempBlockInput = block.getInput(name);
  tempBlockInput.connection.connect(tempBlockShadow.outputConnection);
  tempBlockInput.connection.setShadowDom(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(tempBlockShadow));
}

/**
 * Used to create a mixed-mode statement block and set the code in one action.
 *
 * Note: This will only create the block. Other code will need to handle
 * connecting/placeing the new block in the workspace.
 * @param workspace the workspace the block will be created in
 * @param code the code to put in the block
 * @returns the new mixed-mode statement block
 */
function createMixedModeStatementBlock(workspace, code) {
  // Create temporary blocks to generate the XML structure of the new mixed-mode block
  // We don't track these events as we don't want the undo/redo stack to have a partial
  // block.
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.disable();
  var tempBlock = workspace.newBlock("mixed_multiline_command");
  tempBlock.setFieldValue(code, "MULTILINE_INPUT");
  var newBlockXml = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(tempBlock);

  // Clean up temporary blocks and re-enable events
  tempBlock.dispose();
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.enable();

  // create the actual block in one operation
  var newBlock = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.domToBlock(newBlockXml, workspace);
  return newBlock;
}

/**
 * Used to create a mixed-mode C block and set the condition code in one action.
 *
 * Note: This will only create the block. Other code will need to handle
 * connecting/placeing the new block in the workspace.
 * @param workspace the workspace the block will be created in
 * @param condition the conditional code to put in the block
 * @returns the new mixed-mode C block
 */
function createMixedModeCBlock(workspace, condition) {
  // Create temporary blocks to generate the XML structure of the new mixed-mode block
  // We don't track these events as we don't want the undo/redo stack to have a partial
  // block.
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.disable();
  var tempBlock = workspace.newBlock("mixed_c");
  tempBlock.setFieldValue(condition, "INPUT");
  var newBlockXml = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(tempBlock);

  // Clean up temporary blocks and re-enable events
  tempBlock.dispose();
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.enable();

  // create the actual block in one operation
  var newBlock = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.domToBlock(newBlockXml, workspace);
  return newBlock;
}

/**
 * Used to create a mixed-mode C expandable block and set the condition code in one
 * action.
 *
 * Note: This will only create the block. Other code will need to handle
 * connecting/placeing the new block in the workspace.
 * @param workspace the workspace the block will be created in
 * @param conditions the conditionals to put in the block
 * @returns the new mixed-mode C block
 */
function createMixedModeCExpandableBlock(workspace, conditions) {
  // Create temporary blocks to generate the XML structure of the new mixed-mode block
  // We don't track these events as we don't want the undo/redo stack to have a partial
  // block.
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.disable();
  var tempBlock = workspace.newBlock("mixed_c_expandable");
  var inputCount = conditions.length;
  tempBlock.setBranchCount(inputCount, true);
  for (var i = 0; i < inputCount; i++) {
    var condition = conditions[i];
    var name = "INPUT" + (i + 1);
    tempBlock.setFieldValue(condition, name);
  }
  var newBlockXml = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(tempBlock);

  // Clean up temporary blocks and re-enable events
  tempBlock.dispose();
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.enable();

  // create the actual block in one operation
  var newBlock = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.domToBlock(newBlockXml, workspace);
  return newBlock;
}
function createMixedModeValueBooleanBlock(workspace, code) {
  // Create temporary blocks to generate the XML structure of the new mixed-mode block
  // We don't track these events as we don't want the undo/redo stack to have a partial
  // block.
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.disable();
  var tempBlock = workspace.newBlock("mixed_output_boolean");
  tempBlock.setFieldValue(code, "SINGLELINE_INPUT");
  var newBlockXml = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(tempBlock);

  // Clean up temporary blocks and re-enable events
  tempBlock.dispose();
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.enable();

  // create the actual block in one operation
  var newBlock = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.domToBlock(newBlockXml, workspace);
  return newBlock;
}
function createMixedModeValueNumberBlock(workspace, code) {
  // Create temporary blocks to generate the XML structure of the new mixed-mode block
  // We don't track these events as we don't want the undo/redo stack to have a partial
  // block.
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.disable();
  var tempBlock = workspace.newBlock("mixed_output_number");
  tempBlock.setFieldValue(code, "SINGLELINE_INPUT");
  var newBlockXml = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(tempBlock);

  // Clean up temporary blocks and re-enable events
  tempBlock.dispose();
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.enable();

  // create the actual block in one operation
  var newBlock = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.domToBlock(newBlockXml, workspace);
  return newBlock;
}

//#endregion mixed mode block generators

//#region conversion helpers
/**
 * gets the previous connection for the provided block or null if there is no connection
 * @param block the block to get the connection of
 * @returns the previous connection or null if there is no connection
 */
function getPreviousConnection(block) {
  var previousConnection = null;
  if (block.previousConnection && block.previousConnection.isConnected()) {
    previousConnection = block.previousConnection.targetConnection;
  }
  return previousConnection;
}

/**
 * connects the previous connection of the proveded block to the provided connection
 * @param block the block we are connecting
 * @param previousConnection the connection to connect to
 */
function setPreviousConnection(block, previousConnection) {
  if (previousConnection) {
    previousConnection.connect(block.previousConnection);
  }
}

/**
 * gets the next connection for the provided block or null if there is no connection
 * @param block the block to get the connection of
 * @returns the next connection or null if there is no connection
 */
function getNextConnection(block) {
  var nextConnection = null;
  if (block.nextConnection && block.nextConnection.isConnected()) {
    nextConnection = block.nextConnection.targetConnection;
  }
  return nextConnection;
}

/**
 * connects the next connection of the proveded block to the provided connection
 * @param block the block we are connecting
 * @param previousConnection the connection to connect to
 */
function setNextConnection(block, nextConnection) {
  if (nextConnection) {
    block.nextConnection.connect(nextConnection.getSourceBlock().previousConnection);
  }
}

/**
 * gets the output connection for the provided block or null if there is no connection
 * @param block the block to get the connection of
 * @returns the next connection or null if there is no connection
 */
function getOutputConnectionBlock(block) {
  var outputConnection = null;
  if (block.outputConnection && block.outputConnection.isConnected()) {
    outputConnection = block.outputConnection.targetBlock();
  }
  return outputConnection;
}

/**
 * will convert a block and children to Python code
 * @param workspace the workspace the block is in
 * @param block the block to convert
 * @returns the generated Python code
 * @throws Error
 */
function convertBlockToCode(workspace, block) {
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.init(workspace);
  var codeFunc = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python[block.type];
  if (typeof codeFunc !== "function") {
    throw new Error("Could not generate code from " + block.type);
  }
  return codeFunc.call(block, block).trimEnd();
}

/**
 * will convert a block and children to Python code
 * @param workspace the workspace the block is in
 * @param block the block to convert
 * @returns the generated Python code
 * @throws Error
 */
function convertOutputBlockToCode(workspace, block) {
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.init(workspace);
  var codeFunc = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python[block.type];
  if (typeof codeFunc !== "function") {
    throw new Error("Could not generate code from " + block.type);
  }
  return codeFunc.call(block, block)[0].trimEnd();
}

/**
 * will convert a block and descendants to Python code
 * @param workspace the workspace the block is in
 * @param block the block to convert
 * @returns the generated Python code
 * @throws Error
 */
function convertContentBlockToCode(workspace, block) {
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.init(workspace);
  try {
    return _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.blockToCode(block).trimEnd();
  } catch (err) {
    log.error(err);
    throw new Error("Could not generate code for content block " + block.id);
  }
}

/**
 * will convert a non-statement block and descendants to Python code
 * @param workspace the workspace the block is in
 * @param block the block to convert
 * @returns the generated Python code
 * @throws Error
 */
function convertInputBlockToCode(workspace, block) {
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.init(workspace);
  try {
    var output = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.blockToCode(block);
    if (output) {
      return output[0].trim();
    } else {
      throw new Error("no block output");
    }
  } catch (err) {
    log.error(err);
    throw new Error("Could not generate code for content block " + block.id);
  }
}

/**
 * will convert a block to python condtions
 * @param workspace the workspace the block is in
 * @param block the block to convert
 * @returns the generated Python code
 * @throws Error
 */
function convertBlockToConditionsCode(workspace, block) {
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python.init(workspace);
  var name = block.type + "_conditions";
  var codeFunc = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Python[name];
  if (typeof codeFunc !== "function") {
    throw new Error("Could not generate code from " + name);
  }
  return codeFunc.call(block, block);
}

/**
 * connects a block to the input field of another block
 * @param block the block to connect to
 * @param name the name of the input field
 * @param inputBlock the block we want to place in the input
 */
function setInputConnection(block, name, inputBlock) {
  if (inputBlock) {
    var input = block.getInput(name);
    var connection = input.connection;
    connection.connect(inputBlock.outputConnection);
    if (inputBlock.isShadow()) {
      connection.setShadowDom(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Xml.blockToDom(inputBlock));
    }
  }
}

/**
 * connects a block to the input field of another block
 * @param block the block to connect to
 * @param name the name of the input field
 * @param inputBlock the block we want to place in the input
 */
function setSubstackConnection(block, name, substackBlock) {
  if (substackBlock) {
    var input = block.getInput(name);
    var connection = input.connection;
    connection.connect(substackBlock.previousConnection);
  }
}
function getBlockInfo(block) {
  var pos = block.getRelativeToSurfaceXY();
  // TODO: handle stack disable...
  var disabled = !block.isEnabled(); // oldBlock.isDisabledInStack();
  return {
    pos: pos,
    disabled: disabled
  };
}
function finishConvert(workspace, block, info, hasConnection) {
  if (hasConnection) {
    // If we updated connections we need to rerender the workspace
    // so blocks are connected properly visually
    workspace.render();
  } else {
    // If we did not update connections (i.e. orphaned block),
    // we don't need to rerender the workspace - just move the
    // new block to where the old one was instead of leaving it at (0, 0)
    var oldXY = info.pos;
    var newXY = block.getRelativeToSurfaceXY();
    block.moveBy(oldXY.x - newXY.x, oldXY.y - newXY.y);
  }

  // Make sure the new block is also disabled if the old one was
  if (info.disabled) {
    block.setEnabled(false);
    // TODO: finish this?
    // newBlock.updateBlockTreeStateColours(newBlock.isDisabledInStack());
  }
}
//#endregion conversion helpers

//#region mixed mode conversion functions
/**
 * converts the provided block to a single line mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertSingleBlock(oldBlock) {
  setTimeout(function () {
    try {
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var code = convertBlockToCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      var nextConnection = getNextConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeStatementBlock(ws, code);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);
      setNextConnection(newBlock, nextConnection);

      // Delete the old block as it has been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided block and all following blocks to a single mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertBlockStack(oldBlock) {
  setTimeout(function () {
    try {
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);
      var otherBlocks = oldBlock.getDescendants(false);

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var code = convertContentBlockToCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      var nextConnection = getNextConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeStatementBlock(ws, code);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);
      setNextConnection(newBlock, nextConnection);

      // Delete the old blocks as they have been converted
      if (otherBlocks) {
        var _iterator = _createForOfIteratorHelper(otherBlocks),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var block = _step.value;
            block.dispose(true);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided C block wrapper to a mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertCBlockWrapper(oldBlock) {
  setTimeout(function () {
    try {
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // seems that all C block use input SUBSTACK, but this may need work
      // if there are othere input names
      var subBlock = oldBlock.getInputTargetBlock("SUBSTACK");

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var fullCode = convertBlockToCode(ws, oldBlock);

      // Step 2: extract the wrapper code...
      var code = fullCode.split(":\n")[0] + ":";

      // Step 3: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      var nextConnection = getNextConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeCBlock(ws, code);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);
      setNextConnection(newBlock, nextConnection);
      setSubstackConnection(newBlock, "SUBSTACK", subBlock);

      // Delete the old block as it has been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided C block content to a single line mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertCBlockContent(oldBlock) {
  setTimeout(function () {
    try {
      // seems that all C block use input SUBSTACK, but this may need work
      // if there are othere input names
      oldBlock = oldBlock.getInputTargetBlock("SUBSTACK");
      if (oldBlock === null || oldBlock === undefined) {
        throw new Error("block to convert is undefined");
      }
      var otherBlocks = oldBlock.getDescendants(false);
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var code = convertContentBlockToCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeStatementBlock(ws, code);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);

      // Delete the old blocks as they have been converted
      if (otherBlocks) {
        var _iterator2 = _createForOfIteratorHelper(otherBlocks),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var block = _step2.value;
            block.dispose(true);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided C block wrapper+content to a single line mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertCBlock(oldBlock) {
  setTimeout(function () {
    try {
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var code = convertBlockToCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      var nextConnection = getNextConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeStatementBlock(ws, code);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);
      setNextConnection(newBlock, nextConnection);

      // Delete the old blocks as they have been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided E block wrapper to a mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertEBlockWrapper(oldBlock) {
  setTimeout(function () {
    try {
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // seems that all C block use input SUBSTACK, but this may need work
      // if there are othere input names
      var subBlock1 = oldBlock.getInputTargetBlock("SUBSTACK");
      var subBlock2 = oldBlock.getInputTargetBlock("SUBSTACK2");

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var conditions = convertBlockToConditionsCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      var nextConnection = getNextConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeCExpandableBlock(ws, conditions);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);
      setNextConnection(newBlock, nextConnection);
      setSubstackConnection(newBlock, "SUBSTACK1", subBlock1);
      setSubstackConnection(newBlock, "SUBSTACK2", subBlock2);

      // Delete the old block as it has been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided CE block wrapper to a mixed mode block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertCEBlockWrapper(oldBlock) {
  setTimeout(function () {
    try {
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // get sub-stacks
      var subBlocks = [];
      var substackNum = 1;
      var subInput = oldBlock.getInput("SUBSTACK" + substackNum);
      while (subInput) {
        subBlocks.push(subInput.connection.targetBlock());
        substackNum++;
        var name = "SUBSTACK" + substackNum;
        subInput = oldBlock.getInput("SUBSTACK" + substackNum);
      }
      subBlocks.push(oldBlock.getInputTargetBlock("SUBSTACK_ELSE"));

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var conditions = convertBlockToConditionsCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var previousConnection = getPreviousConnection(oldBlock);
      var nextConnection = getNextConnection(oldBlock);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeCExpandableBlock(ws, conditions);

      // Update new block's connections
      setPreviousConnection(newBlock, previousConnection);
      setNextConnection(newBlock, nextConnection);
      for (var index = 0; index < subBlocks.length; index++) {
        setSubstackConnection(newBlock, "SUBSTACK" + (index + 1), subBlocks[index]);
      }

      // Delete the old block as it has been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!previousConnection);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided block to a mixed mode output boolean block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertOutputBooleanBlock(oldBlock) {
  setTimeout(function () {
    try {
      var _outputConnectionBloc;
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var code = convertOutputBlockToCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var outputConnectionBlock = getOutputConnectionBlock(oldBlock);
      var inputName = outputConnectionBlock === null || outputConnectionBlock === void 0 ? void 0 : (_outputConnectionBloc = outputConnectionBlock.getInputWithBlock(oldBlock)) === null || _outputConnectionBloc === void 0 ? void 0 : _outputConnectionBloc.name;
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeValueBooleanBlock(ws, code);

      // Update new block's connections
      if (outputConnectionBlock) {
        setInputConnection(outputConnectionBlock, inputName, newBlock);
      }

      // Delete the old block as it has been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!outputConnectionBlock);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}

/**
 * converts the provided block to a mixed mode output number block
 * @param oldBlock The block that will be converted.
 */
function mixedModeConvertOutputNumberBlock(oldBlock) {
  setTimeout(function () {
    try {
      var _outputConnectionBloc2;
      var ws = oldBlock.workspace;
      var oldInfo = getBlockInfo(oldBlock);

      // Save information from the block being replaced that we'll need for the converted block
      // Step 1: the block's generated code for the mixed-mode input
      var code = convertOutputBlockToCode(ws, oldBlock);

      // Step 2: the block's existing connections
      var outputConnectionBlock = getOutputConnectionBlock(oldBlock);
      var inputName = outputConnectionBlock === null || outputConnectionBlock === void 0 ? void 0 : (_outputConnectionBloc2 = outputConnectionBlock.getInputWithBlock(oldBlock)) === null || _outputConnectionBloc2 === void 0 ? void 0 : _outputConnectionBloc2.name;
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertBlock", undefined, oldBlock.toString());
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(true);
      var newBlock = createMixedModeValueNumberBlock(ws, code);

      // Update new block's connections
      if (outputConnectionBlock) {
        setInputConnection(outputConnectionBlock, inputName, newBlock);
      }

      // Delete the old block as it has been converted
      oldBlock.dispose(true);
      finishConvert(ws, newBlock, oldInfo, !!outputConnectionBlock);
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Events.setGroup(false);
      Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("convertEnd");
    } catch (err) {
      log.error("could not convert", oldBlock.type, "due to:", err);
    }
  }, 0);
}
//#endregion mixed mode conversion functions

//#region mixedmode extensions
var mixins = {};
// Custom extension to convert statement call blocks.
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT = {
  canConvertBlock: true,
  canConvertStack: true,
  canConvertSubBlocks: false
};
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_OUTPUT_BOOLEAN = {
  canConvertBlock: true,
  convertToOutput: true,
  canConvertSubBlocks: false,
  isBooleanOutput: true,
  isNumberOutput: false
};
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_OUTPUT_NUMBER = {
  canConvertBlock: true,
  convertToOutput: true,
  canConvertSubBlocks: false,
  isBooleanOutput: false,
  isNumberOutput: true
};
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_GROUP_C = {
  canConvertBlock: true,
  canConvertSubBlocks: true,
  isCShape: true
};
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_GROUP_E = {
  canConvertBlock: true,
  canConvertSubBlocks: true,
  isEShape: true
};
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_GROUP_CE = {
  canConvertBlock: true,
  canConvertSubBlocks: true,
  isCEShape: true
};
mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_DUMMY = {
  isConvertDummy: true
};
//#endregion mixedmode extensions

//#region context menu functions
/**
 * opens up the help documentation for a selected block
 * @param helpBlock The block that help should be opened for.
 */
function contextGetBlockHelp(helpBlock) {
  setTimeout(function () {
    try {
      var ws = helpBlock.workspace.id;
      var blockId = helpBlock.id;
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_4__["fireEvent"]("HelpSystemManager.setAndOpenBlocksHelp", ws, blockId);
    } catch (err) {
      log.error("could not find help for", helpBlock.type, "due to:", err);
    }
  }, 0);
}
//#endregion context menu functions

//#region context menu items
var contextMenuItems = {};
contextMenuItems.getBlockHelp = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:block_help");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    return "enabled";
  },
  callback: function callback(scope) {
    contextGetBlockHelp(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "getBlockHelp",
  weight: 0
};

/** Option to undo previous action. */
contextMenuItems.mixedModeConvertSingle = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_single");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && !(block !== null && block !== void 0 && block.canConvertSubBlocks) && !(block !== null && block !== void 0 && block.convertToOutput)) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertSingleBlock(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertSingle",
  weight: 0
};
contextMenuItems.mixedModeConvertStack = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_stack");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertStack && !(block !== null && block !== void 0 && block.convertToOutput) && block.getNextBlock() !== null) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertBlockStack(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertStack",
  weight: 0
};
contextMenuItems.mixedModeConvertOutput = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_single");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.convertToOutput) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    var block = scope.block;
    if (block.isBooleanOutput) {
      mixedModeConvertOutputBooleanBlock(block);
    } else if (block.isNumberOutput) {
      mixedModeConvertOutputNumberBlock(block);
    } else {
      log.warn("unable to conver block to mixed-mode output", block);
    }
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertOutput",
  weight: 0
};
contextMenuItems.mixedModeConvertCWrapperContents = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_wrapper_and_contents");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isCShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertCBlock(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertCWrapperContents",
  weight: 0
};
contextMenuItems.mixedModeConvertCWrapper = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_wrapper");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isCShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertCBlockWrapper(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertCWrapper",
  weight: 0
};
contextMenuItems.mixedModeConvertCContents = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_contents");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isCShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertCBlockContent(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertCContents",
  weight: 0
};
contextMenuItems.mixedModeConvertEWrapperContents = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_wrapper_and_contents");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isEShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertCBlock(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertEWrapperContents",
  weight: 0
};
contextMenuItems.mixedModeConvertEWrapper = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_wrapper");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isEShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertEBlockWrapper(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertEWrapper",
  weight: 0
};
contextMenuItems.mixedModeConvertCEWrapperContents = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_wrapper_and_contents");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isCEShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertCBlock(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertCEWrapperContents",
  weight: 0
};
contextMenuItems.mixedModeConvertCEWrapper = {
  displayText: function displayText() {
    return _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:convert_block_wrapper");
  },
  preconditionFn: function preconditionFn(scope) {
    var block = scope.block;
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && block !== null && block !== void 0 && block.canConvertBlock && block !== null && block !== void 0 && block.canConvertSubBlocks && block !== null && block !== void 0 && block.isCEShape) {
      var status = enabledOnConversionAllowed();
      if (block.isConvertDummy && status !== "hidden") {
        return "disabled";
      } else {
        return status;
      }
    }
    return "hidden";
  },
  callback: function callback(scope) {
    mixedModeConvertCEBlockWrapper(scope.block);
  },
  scopeType: _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.ScopeType.BLOCK,
  id: "mixedModeConvertCEWrapper",
  weight: 0
};
//#endregion context menu items

/**
 * this should be called once on load to add/define all the code/logic for mixed mode
 * support in Blockly
 */
function initBlocklyMixedModeCode() {
  // register mixed mode extensions
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert_output_number", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_OUTPUT_NUMBER);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert_output_boolean", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_OUTPUT_BOOLEAN);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert_group_c", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_GROUP_C);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert_group_e", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_GROUP_E);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert_group_ce", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_GROUP_CE);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].Extensions.registerMixin("context_menu_convert_dummy", mixins.STATEMENT_CALL_CONTEXT_MENU_CONVERT_DUMMY);

  // register context menu items
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.getBlockHelp);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertSingle);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertStack);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertOutput);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertCWrapper);
  // Blockly.ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertCContents);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertCWrapperContents);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertEWrapper);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertEWrapperContents);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertCEWrapper);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_2__["Blockly"].ContextMenuRegistry.registry.register(contextMenuItems.mixedModeConvertCEWrapperContents);
}


/***/ }),

/***/ "./src/Blockly/Core/blocklyMyBlocks.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Core/blocklyMyBlocks.ts ***!
  \*********************************************/
/*! exports provided: initBlocklyMyBlocksCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBlocklyMyBlocksCode", function() { return initBlocklyMyBlocksCode; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vexcode/blockly-react-component/dist/BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");
// tslint:disable: object-literal-shorthand

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("blocklyMyBlocks");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();




//#region helpers
/**
 * Make a context menu option for editing a custom procedure.
 * This appears in the context menu for procedure definitions and procedure
 * calls.
 * @param {!Blockly.BlockSvg} block The block where the right-click originated.
 * @return {!Object} A menu option, containing text, enabled, and a callback.
 * @package
 */
function makeEditOption(block) {
  var editOption = {
    enabled: true,
    text: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:edit_procedure"),
    callback: function callback() {
      _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Procedures.editProcedureCallback(block);
    }
  };
  return editOption;
}
function makeDeleteOption(procCode, block) {
  var deleteOption = {
    enabled: true,
    text: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:delete"),
    callback: function callback() {
      var didDelete = _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Procedures.deleteProcedureDefCallback(procCode, block);
      if (!didDelete) {
        alert(_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:prodedure used"));
      }
    }
  };
  return deleteOption;
}

//#endregion helpers

//#region extensions
var extensions = {};
extensions.PROCEDURE_DEF_CONTEXTMENU = {
  /**
   * Add the "edit" option and removes the "duplicate" option from the context
   * menu.
   * @param {!Array.<!Object>} menuOptions List of menu options to edit.
   * @this Blockly.Block
   */
  customContextMenu: function customContextMenu(menuOptions) {
    // due to type/compiler errors, using a const to point to "this"
    var thisBlock = this;
    // Add the edit option at the end.
    menuOptions.push(makeEditOption(thisBlock));

    // add delete option to the end
    var input = thisBlock.getInput("custom_block");
    var procCode = null;
    // this is the root block, not the shadow block.
    if (input && input.connection && input.connection.targetBlock()) {
      procCode = input.connection.targetBlock().getProcCode();
    } else {
      return;
    }
    menuOptions.push(makeDeleteOption(procCode, thisBlock));
    for (var index = 0, option; index < menuOptions.length; index++) {
      var manuOption = menuOptions[index];
      // Find and remove the duplicate option
      if (manuOption.text === _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Msg.DUPLICATE) {
        menuOptions.splice(index, 1);
        break;
      }
    }
  },
  // used to flag the context menu to hide the normal delete
  isProcedureDef: true
};

/**
 * Mixin to add a context menu item to create a procedure call block.
 * @mixin
 * @augments Blockly.Block
 * @readonly
 */
extensions.PROCEDURE_CALL_CONTEXTMENU = {
  /**
   * Add the "edit" option to the context menu.
   * @todo Add "go to definition" option once implemented.
   * @param {!Array.<!Object>} menuOptions List of menu options to edit.
   * @this Blockly.Block
   */
  customContextMenu: function customContextMenu(menuOptions) {
    menuOptions.push(makeEditOption(this));
  }
};
//#endregion extensions

/**
 * this should be called once on load to add/define all the code/logic for my blocks
 * support in Blockly
 */
function initBlocklyMyBlocksCode() {
  // register  extensions
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.registerMixin("procedure_def_contextmenu", extensions.PROCEDURE_DEF_CONTEXTMENU);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.registerMixin("procedure_call_contextmenu", extensions.PROCEDURE_CALL_CONTEXTMENU);
}


/***/ }),

/***/ "./src/Blockly/Core/blocklyShapeExtensions.ts":
/*!****************************************************!*\
  !*** ./src/Blockly/Core/blocklyShapeExtensions.ts ***!
  \****************************************************/
/*! exports provided: initBlocklyShapeExtensions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBlocklyShapeExtensions", function() { return initBlocklyShapeExtensions; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vexcode/blockly-react-component/dist/BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__);

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("blocklyShapeExtensions");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();


var extensions = {};

//#region shape extensions
/**
 * Extension to make a block fit into a stack of statements, regardless of its
 * inputs.  That means the block should have a previous connection and a next
 * connection and have inline inputs.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.SHAPE_STATEMENT = function () {
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
};

/**
 * Extension to make a block be shaped as a hat block, regardless of its
 * inputs.  That means the block should have a next connection and have inline
 * inputs, but have no previous connection.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.SHAPE_HAT = function () {
  // TODO: see if there is a way to make this work with the new version of Blockly
  this.setInputsInline(true);
  this.setNextStatement(true, null);
};

/**
 * Extension to make a block be shaped as an end block, regardless of its
 * inputs.  That means the block should have a previous connection and have
 * inline inputs, but have no next connection.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.SHAPE_END = function () {
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
};
//#endregion shape extensions

//#region output extensions
/**
 * Extension to make represent a number reporter in Scratch-Blocks.
 * That means the block has inline inputs, a round output shape, and a 'Number'
 * output type.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.OUTPUT_NUMBER = function () {
  this.setInputsInline(true);
  // this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
  this.setOutput(true, "Number");
};

/**
 * Extension to make represent a string reporter in Scratch-Blocks.
 * That means the block has inline inputs, a round output shape, and a 'String'
 * output type.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.OUTPUT_STRING = function () {
  this.setInputsInline(true);
  // this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
  this.setOutput(true, "String");
};

/**
 * Extension to make represent a boolean reporter in Scratch-Blocks.
 * That means the block has inline inputs, a round output shape, and a 'Boolean'
 * output type.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.OUTPUT_BOOLEAN = function () {
  this.setInputsInline(true);
  // this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
  this.setOutput(true, "Boolean");
};
//#endregion output extensions

//#region output extensions
/**
 * Extension to enable monitoring on a sensing reporter in Scratch-Blocks.
 * @this {Blockly.Block}
 * @readonly
 */
extensions.ENABLE_MONITOR = function () {
  this.monitorSupported = true;
};
//#endregion output extensions

/**
 * this should be called once on load to add/define all the shape/output extensions
 * for blockly
 */
function initBlocklyShapeExtensions() {
  // register the shape extensions
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("shape_statement", extensions.SHAPE_STATEMENT);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("shape_hat", extensions.SHAPE_HAT);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("shape_end", extensions.SHAPE_END);

  // register the output extensions
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("output_number", extensions.OUTPUT_NUMBER);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("output_string", extensions.OUTPUT_STRING);
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("output_boolean", extensions.OUTPUT_BOOLEAN);

  // register the monitor extensions
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.register("enable_monitor", extensions.ENABLE_MONITOR);
}


/***/ }),

/***/ "./src/Blockly/Core/blocklyTheme.ts":
/*!******************************************!*\
  !*** ./src/Blockly/Core/blocklyTheme.ts ***!
  \******************************************/
/*! exports provided: initBlocklyTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBlocklyTheme", function() { return initBlocklyTheme; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vexcode/blockly-react-component/dist/BlocklyAccessWrapper */ "./node_modules/@vexcode/blockly-react-component/dist/BlocklyAccessWrapper.js");
/* harmony import */ var _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__);

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("BlocklyTheme");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();


function addStyles() {
  /**
   * CSS for Toolbox.  See css.js for use.
   */
  _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Css.register([/* eslint-disable indent */
  ".blocklyToolboxDiv {", "background-color: unset;",
  // remove style from Blockly
  "}", ".blocklyToolboxContents {", "width: 60px;", "background: $colour_toolbox;", "color: $colour_toolboxText;", "font-size: .7rem;", "user-select: none;", "padding-bottom: 50px;", "-webkit-user-select: none;", "-moz-user-select: none;", "-ms-user-select: none;", "}", ".blocklyToolboxCategory {", "}", ".blocklyTreeRow {", "height: unset;",
  // remove style from Blockly
  "margin-bottom: 0;", "padding: 0.375rem 0px;", "cursor: pointer;", "text-align: center;", "white-space: normal;", "}", ".blocklyTreeRow.blocklyTreeSelected {", "background-color: none;",
  // TODO: figure out how to use Blockly Theme for this
  "}", ".blocklyTreeRow .blocklyTreeIcon {", "background-image: unset;",
  // remove style from Blockly
  "visibility: unset;",
  // remove style from Blockly
  "width: 1.25rem;", "height: 1.25rem;", "border: 1px solid;", "border-radius: 100%;", "margin: 0 auto 0.125rem;", "display: block;", "}", ".blocklyTreeRow .blocklyTreeLabel {", "font-size: unset;", // remove style from Blockly
  "font-family: \"Helvetica Neue\", Helvetica, sans-serif;", "padding: 0;", "}", ".blocklyTreeSelected .blocklyTreeLabel {", "color: unset;",
  // remove style from Blockly
  "}", ".blocklyFlyoutBackground {", "fill: #F9F9F9;",
  // TODO: figure out how to use Blockly Theme for this
  "fill-opacity: 0.8;",
  // TODO: figure out how to use Blockly Theme for this
  "}", ".blocklyMultilineText.blocklyMonospacedText {", "font: unset !important;", "font-family: Menlo, Monaco, 'Courier New', monospace !important;", "font-size: 16px !important", "}", ".blocklyHtmlInput.blocklyHtmlTextAreaInput.blocklyMonospacedText {", "font: unset !important;", "font-family: Menlo, Monaco, 'Courier New', monospace !important;", "}", ".Zelos-renderer.VEXcode-theme .blocklyFlyoutLabelText {", 'font-family: "Helvetica Neue", Helvetica, sans-serif;', "font-size: 14pt;", "fill: #575E75;",
  // TODO: figure out how to use Blockly Theme for this
  "font-weight: bold;", "}", ".blocklyFlyoutButton {", "fill: none;", "pointer-events: all;", "}", ".blocklyFlyoutButtonBackground {", "stroke: #c6c6c6;", "}", ".blocklyFlyoutButtonShadow {", "fill: transparent;", "}", ".blocklyFlyoutButton:hover {", "fill: white;", "cursor: pointer;", "}", ".blocklyFlyoutButton .blocklyText {", "fill: #575E57 !important;",
  // TODO: find better solution than !important...
  "}"
  /* eslint-enable indent */]);
}

function initBlocklyTheme() {
  if (!_vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Themes.VEXCode) {
    log.debug("Creating VEXcode Theme");

    // Temporary holding object.
    var ScratchTheme = {};
    ScratchTheme.defaultBlockStyles = {
      motion_blocks: {
        colourPrimary: "#4C97FF",
        colourSecondary: "#4280D7",
        colourTertiary: "#3373CC"
      },
      looks_blocks: {
        colourPrimary: "#9966FF",
        colourSecondary: "#855CD6",
        colourTertiary: "#774DCB"
      },
      sounds_blocks: {
        colourPrimary: "#CF63CF",
        colourSecondary: "#C94FC9",
        colourTertiary: "#BD42BD"
      },
      control_blocks: {
        colourPrimary: "#FFAB19",
        colourSecondary: "#EC9C13",
        colourTertiary: "#CF8B17"
      },
      event_blocks: {
        colourPrimary: "#FFBF00",
        colourSecondary: "#E6AC00",
        colourTertiary: "#CC9900"
      },
      event_blocks_hat: {
        colourPrimary: "#FFBF00",
        colourSecondary: "#E6AC00",
        colourTertiary: "#CC9900",
        hat: "cap"
      },
      sensing_blocks: {
        colourPrimary: "#5CB1D6",
        colourSecondary: "#47A8D1",
        colourTertiary: "#2E8EB8"
      },
      pen_blocks: {
        colourPrimary: "#0fBD8C",
        colourSecondary: "#0DA57A",
        colourTertiary: "#0B8E69"
      },
      operators_blocks: {
        colourPrimary: "#59C059",
        colourSecondary: "#46B946",
        colourTertiary: "#389438"
      },
      data_blocks: {
        colourPrimary: "#FF8C1A",
        colourSecondary: "#FF8000",
        colourTertiary: "#DB6E00"
      },
      // This is not a new category, but rather for differentiation
      // between lists and scalar variables.
      data_lists_blocks: {
        colourPrimary: "#FF661A",
        colourSecondary: "#FF5500",
        colourTertiary: "#E64D00"
      },
      drivetrain_blocks: {
        colourPrimary: "#006AFF",
        colourSecondary: "#245BA8",
        colourTertiary: "#24508F"
      },
      arm_blocks: {
        colourPrimary: "#334dcc",
        colourSecondary: "#374799",
        colourTertiary: "#243aa8"
      },
      magnet_blocks: {
        colourPrimary: "#3373CC",
        colourSecondary: "#375F99",
        colourTertiary: "#245BA8"
      },
      actions_blocks: {
        colourPrimary: "#359123",
        colourSecondary: "#306027",
        colourTertiary: "#3F6B36"
      },
      mixed_blocks: {
        colourPrimary: "#0FBDAC",
        colourSecondary: "#0DA57A",
        colourTertiary: "#0B8E69"
      },
      mixed_blocks_hat: {
        colourPrimary: "#0FBDAC",
        colourSecondary: "#0DA57A",
        colourTertiary: "#0B8E69",
        hat: "cap"
      },
      act_blocks: {
        colourPrimary: "#359123",
        colourSecondary: "#306027",
        colourTertiary: "#3F6B36"
      },
      text_blocks: {
        colourPrimary: "#FFFFFF",
        colourSecondary: "#FFFFFF",
        colourTertiary: "#FFFFFF"
      },
      comment_blocks: {
        colourPrimary: "#C6C6C6",
        colourSecondary: "#000000",
        colourTertiary: "#A6A6A6"
      },
      comment_text_blocks: {
        colourPrimary: "#DCDCDC",
        colourSecondary: "#DCDCDC",
        colourTertiary: "#DCDCDC"
      },
      myblocks_blocks: {
        colourPrimary: "#FF6680",
        colourSecondary: "#FF4D6A",
        colourTertiary: "#FF3355"
      },
      myblocks_blocks_hat: {
        colourPrimary: "#FF6680",
        colourSecondary: "#FF4D6A",
        colourTertiary: "#FF3355",
        hat: "define"
      }
    };
    ScratchTheme.categoryStyles = {
      motion_category: {
        colour: "#4C97FF",
        colourSecondary: "#3373CC"
      },
      looks_category: {
        colour: "#9966FF",
        colourSecondary: "#774DCB"
      },
      sounds_category: {
        colour: "#CF63CF",
        colourSecondary: "#BD42BD"
      },
      control_category: {
        colour: "#FFAB19",
        colourSecondary: "#CF8B17"
      },
      event_category: {
        colour: "#FFBF00",
        colourSecondary: "#CC9900"
      },
      sensing_category: {
        colour: "#5CB1D6",
        colourSecondary: "#2E8EB8"
      },
      pen_category: {
        colour: "#0fBD8C",
        colourSecondary: "#0fBD8C"
      },
      operators_category: {
        colour: "#59C059",
        colourSecondary: "#389438"
      },
      data_category: {
        colour: "#FF8C1A",
        colourSecondary: "#DB6E00"
      },
      drivetrain_category: {
        colour: "#006AFF",
        colourSecondary: "#24508f"
      },
      arm_category: {
        colour: "#334dcc",
        colourSecondary: "#243aa8"
      },
      magnet_category: {
        colour: "#3373CC",
        colourSecondary: "#375F99"
      },
      actions_category: {
        colour: "#359123",
        colourSecondary: "#306027"
      },
      mixed_category: {
        colour: "#0FBDAC",
        colourSecondary: "#0DA57A"
      },
      act_category: {
        colour: "#359123",
        colourSecondary: "#306027"
      },
      comment_category: {
        colour: "#C6C6C6",
        colourSecondary: "#A6A6A6"
      },
      myblocks_category: {
        colour: "#FF6680",
        colourSecondary: "#FF4D6A"
      }
    };
    ScratchTheme.componenetStyles = {
      toolboxCategoryBackgroundColour: "#FFFFFF",
      toolboxCategoryForegroundColour: "#575E75"
    };
    _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Themes.VEXCode = new _vexcode_blockly_react_component_dist_BlocklyAccessWrapper__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Theme("VEXcode", ScratchTheme.defaultBlockStyles, ScratchTheme.categoryStyles, ScratchTheme.componenetStyles);
    log.debug("Theme has been created.");

    // add styles for toolbox
    addStyles();
  } else {
    log.debug("theme already exists");
  }
}


/***/ }),

/***/ "./src/Compiler/CompilerSettings.ts":
/*!******************************************!*\
  !*** ./src/Compiler/CompilerSettings.ts ***!
  \******************************************/
/*! exports provided: compilerSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compilerSettings", function() { return compilerSettings; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platformInfo */ "./src/platformInfo.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AppInfo */ "./src/AppInfo.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("CompilerSettings");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();




//#region event types
//#endregion
var CompilerSettings = /*#__PURE__*/function () {
  function CompilerSettings() {
    _classCallCheck(this, CompilerSettings);
    //#region events
    _defineProperty(this, "eventCallbacks", {
      "CompilerChange": []
    });
  }
  _createClass(CompilerSettings, [{
    key: "useCloud",
    get: function get() {
      if (_platformInfo__WEBPACK_IMPORTED_MODULE_1__["PlatformIsNWJS"]) {
        return localStorage.getItem("CompilerSettings.useCloud") === "TRUE";
      }
      return true;
    },
    set: function set(newValue) {
      if (this.useCloud !== newValue && _platformInfo__WEBPACK_IMPORTED_MODULE_1__["PlatformIsNWJS"]) {
        localStorage.setItem("CompilerSettings.useCloud", newValue ? "TRUE" : "FALSE");
        this.fireEvent("CompilerChange", newValue);
      }
      if (compilerSettings.useCloud === true && _AppInfo__WEBPACK_IMPORTED_MODULE_2__["appState"].getAppState().compMode !== "cloud") {
        _AppInfo__WEBPACK_IMPORTED_MODULE_2__["appState"].setAppState({
          compMode: "cloud"
        });
      } else if (compilerSettings.useCloud === false && _AppInfo__WEBPACK_IMPORTED_MODULE_2__["appState"].getAppState().compMode !== "integrated") {
        _AppInfo__WEBPACK_IMPORTED_MODULE_2__["appState"].setAppState({
          compMode: "integrated"
        });
      }
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (this.eventCallbacks[eventName].indexOf(callback) >= 0) {
        return;
      }
      this.eventCallbacks[eventName].push(callback);
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      var i = this.eventCallbacks[eventName].indexOf(callback);
      if (i < 0) {
        log.warn("Unknown callback.");
        return;
      }
      this.eventCallbacks[eventName].splice(i, 1);
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.eventCallbacks[eventName]) {
        this.eventCallbacks[eventName].slice(0).forEach(function (callback) {
          callback.apply(void 0, args);
        });
      }
    }
    //#endregion
  }]);
  return CompilerSettings;
}();
var compilerSettings = new CompilerSettings();


/***/ }),

/***/ "./src/FeatureLock/Licenses.ts":
/*!*************************************!*\
  !*** ./src/FeatureLock/Licenses.ts ***!
  \*************************************/
/*! exports provided: FeatureLockLicense */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureLockLicense", function() { return FeatureLockLicense; });
/**
 * an enum to make it easy to manage all the different license levels that may
 * be used by VEXcode. Currently this is just the VR licenses and Virtual
 * Skills licenses.
 */
var FeatureLockLicense = /*#__PURE__*/function (FeatureLockLicense) {
  FeatureLockLicense[FeatureLockLicense["Standard"] = 1] = "Standard";
  FeatureLockLicense[FeatureLockLicense["Enhanced"] = 2] = "Enhanced";
  FeatureLockLicense[FeatureLockLicense["Advanced"] = 3] = "Advanced";
  FeatureLockLicense[FeatureLockLicense["VirtualSkillsIQ"] = 101] = "VirtualSkillsIQ";
  FeatureLockLicense[FeatureLockLicense["VirtualSkillsV5"] = 102] = "VirtualSkillsV5";
  return FeatureLockLicense;
}(FeatureLockLicense || {});


/***/ }),

/***/ "./src/GA/SwitchEvents.ts":
/*!********************************!*\
  !*** ./src/GA/SwitchEvents.ts ***!
  \********************************/
/*! exports provided: sendSwitchEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSwitchEvent", function() { return sendSwitchEvent; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uuid */ "./src/utils/uuid.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../targetPlatform */ "./src/targetPlatform.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("SwitchEvents");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

//#region imports


//#endregion types

var sessionID = Object(_utils_uuid__WEBPACK_IMPORTED_MODULE_1__["generateUUID"])();
var URL =  false ? undefined : null;
var classCodeFunction = function classCodeFunction() {
  return "";
};
var studentIDFunction = function studentIDFunction() {
  return "";
};
var getCurrentMainController = null;
var PM = null;
if (self.React) {
  log.debug("enable imports");
  __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ../FeatureLock/VRClassSystem */ "./src/FeatureLock/VRClassSystem.ts")).then(function (result) {
    var classSystem = result.classSystem;
    classCodeFunction = classSystem.getClassCode.bind(classSystem);
    studentIDFunction = classSystem.getStudentID.bind(classSystem);
  });
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../Blockly/BlocklyController */ "./src/Blockly/BlocklyController.ts")).then(function (result) {
    getCurrentMainController = result.getCurrentMainController;
    log.debug("getCurrentMainController", getCurrentMainController());
  });
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(10), __webpack_require__.e(12), __webpack_require__.e(4), __webpack_require__.e(14), __webpack_require__.e(7), __webpack_require__.e(5), __webpack_require__.e(9), __webpack_require__.e(6), __webpack_require__.e(2), __webpack_require__.e(11), __webpack_require__.e(8), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ../FileSys/ProjectManager */ "./src/FileSys/ProjectManager.ts")).then(function (result) {
    PM = result;
  });
}
function getStudentID() {
  log.debug("getStudentID");
  return studentIDFunction();
}
function getClassID() {
  log.debug("getClassID");
  return classCodeFunction();
}

/** a list of all the switch mode blocks */
var switchBlocks = ["mixed_singleline", "pg_mixed_singleline", "mixed_multiline_command", "pg_mixed_multiline_command", "mixed_c", "pg_mixed_c", "mixed_c_expandable", "pg_mixed_c_expandable", "mixed_output_boolean", "pg_mixed_output_boolean", "mixed_conditional", "pg_mixed_conditional", "mixed_output_number", "pg_mixed_output_number", "mixed_singleline_text", "mixed_definition"];
function getProgramData() {
  var _PM$currentProject;
  log.debug("getProgramData", PM.currentProject);
  var projectData = (_PM$currentProject = PM.currentProject) === null || _PM$currentProject === void 0 ? void 0 : _PM$currentProject.projectData;
  var project = projectData === null || projectData === void 0 ? void 0 : projectData.getFileContentString();
  var playground = projectData === null || projectData === void 0 ? void 0 : projectData.playground;
  var isBlocks = (projectData === null || projectData === void 0 ? void 0 : projectData.mode) === "Blocks";
  if (!isBlocks) {
    return {
      programType: "Python",
      project: project,
      hasOrphans: false,
      playground: playground,
      switchBlockCount: 0
    };
  }

  // get switch block info
  var blockCount = getCurrentMainController().getBlockCount();
  var switchBlockCount = 0;
  for (var blockType in blockCount) {
    if (switchBlocks.includes(blockType) && Object.prototype.hasOwnProperty.call(blockCount, blockType)) {
      var blockTypeCount = blockCount[blockType];
      switchBlockCount = switchBlockCount + blockTypeCount;
    }
  }
  var isSwitch = switchBlockCount > 0;
  var programType = isSwitch ? "Switch" : "Blocks";
  var hasOrphans = getCurrentMainController().hasOrphanBlocks();
  return {
    programType: programType,
    project: project,
    hasOrphans: hasOrphans,
    playground: playground,
    switchBlockCount: switchBlockCount
  };
}
function sendSwitchEventData(_x) {
  return _sendSwitchEventData.apply(this, arguments);
}
/**
 * used to send switch mode data collection event
 * @param eventType what typ of event is triggering the data event
 * @param errorMessage the error message if there was one fo rthe event
 * @param blockEventData the data for the block change event if it was one
 */
function _sendSwitchEventData() {
  _sendSwitchEventData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(eventData) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          log.debug("sendSwitchEventData", eventData.eventType);
          fetch(URL, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              eventData: eventData
            })
          }).then(function (res) {
            log.debug("data submitted");
          })["catch"](function (err) {
            log.warn(err);
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _sendSwitchEventData.apply(this, arguments);
}
function sendSwitchEvent(eventType, errorMessage, blockEventData) {
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsNotPlaygrounds"] || !false || !URL || !false) {
    return;
  }
  var eventData = _objectSpread(_objectSpread({}, getProgramData()), {}, {
    sessionID: sessionID,
    studentID: getStudentID(),
    classCode: getClassID(),
    timestamp: new Date(),
    eventType: eventType,
    blockEventData: blockEventData,
    errorMessage: errorMessage
  });

  // call this, but we don't care if it fails as there is nothing we can really do about it
  sendSwitchEventData(eventData);
}


/***/ }),

/***/ "./src/GlobalEventSystem.ts":
/*!**********************************!*\
  !*** ./src/GlobalEventSystem.ts ***!
  \**********************************/
/*! exports provided: on, off, fireEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireEvent", function() { return fireEvent; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Global Event System");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

// add history logger
var historyLogger = log.setHistoryLogger("GlobalEvents");
historyLogger.setLevel(log.levels.DEBUG);

// tslint:disable: unified-signatures

var eventCallbacks = {
  "ProjectManager.ProjectLoad": [],
  "ProjectManager.Save": [],
  "InterpreterEvents.BrainTimerUpdate": [],
  "JSInterpreterEvents.RunStart": [],
  "PythonInterpreter.VariableValueUpdate": [],
  "PythonInterpreter.SensorMonitorUpdate": [],
  "HWInterface.ConnectionStateChange": [],
  "HWInterface.ConnectionStateChangeUserPort": [],
  "HWInterface.BrainInfoUpdated": [],
  "HWInterface.BLEDeviceStateChange": [],
  "HWInterface.GOStatusUpdate": [],
  "HWInterface.123Shake": [],
  "HWInterface.BLEBrainInfoUpdate": [],
  "HWInterface.BLEFWUpdateProgress": [],
  "HWInterface.BLEFWUpdateDone": [],
  "HWInterface.BLEBLUpdateProgress": [],
  "HWInterface.TerminalDataUpdate": [],
  "HWInterface.DeviceListUpdate": [],
  "Editor.ProblemsUpdate": [],
  "Editor.ProblemsUpdate2": [],
  "Editor.GoToPosition": [],
  "Editor.ErrorReport": [],
  "ErrorPanel.Expand": [],
  "TextViewer.LanguageSwitch": [],
  "TextEditor.loaded": [],
  "TextEditor.registerLanguages": [],
  "Monitor.UpdateList": [],
  "Monitor.ConfigDeviceDeleted": [],
  "Monitor.ConfigDevicePortChanged": [],
  "DEV.fakeConnectionUpdate": [],
  "DEV.setFakeBattery": [],
  "NATIVE.appSuspend": [],
  "Playground.Launch": [],
  "Playground.RunProgram": [],
  "Playground.Step": [],
  "Playground.Image": [],
  "Playground.Maze": [],
  "SimWindow.InterpreterRunning": [],
  "SimWindow.InterpreterPause": [],
  "SimWindow.InterpreterStopped": [],
  "SimWindow.InterpreterInit": [],
  "SimWindow.InterpreterLoading": [],
  "SimWindow.InterpreterWaiting": [],
  "SimWindow.InterpreterCodeLoaded": [],
  "SimWindow.VariableValueUpdates": [],
  "SimWindow.SensorsToMonitor": [],
  "SimWindow.TimerUpdate": [],
  "SimWindow.RequestStart": [],
  "SimWindow.RequestReset": [],
  "SimWindow.RequestStop": [],
  "SimWindow.UnityReady": [],
  "SimWindow.UnityLoaded": [],
  "SimWindow.RobotSensorUpdate": [],
  "SimWindow.UnityFeedback": [],
  "SimWindow.UnityCertificate": [],
  "SimWindow.UnityImageRequest": [],
  "SimWindow.UnityImageDownload": [],
  "SimWindow.UnityPlaygroundConfigFromUnity": [],
  "SimWindow.UnityMazeDownload": [],
  "SimWindow.UnitySetProjectData": [],
  "SimWindow.UnityMazeRequestUpload": [],
  "SimWindow.UnityImageClear": [],
  "SimWindow.SubmitUnityFeedback": [],
  "Brain.SwitchVariant": [],
  "FeatureLock.LevelChange": [],
  "FeatureLock.DataUpdate": [],
  "HelpSystemManager.setAndOpenBlocksHelp": []
};

// Modified to return an object as part of the callback.

function on(eventName, callback) {
  log.debug("on event", eventName, callback.name);
  if (eventCallbacks[eventName].indexOf(callback) >= 0) {
    log.warn("Duplicate callback.", eventName, callback.name);
    return;
  }
  eventCallbacks[eventName].push(callback);
}
function off(eventName, callback) {
  log.debug("off event", eventName, callback.name);
  var i = eventCallbacks[eventName].indexOf(callback);
  if (i < 0) {
    log.warn("Unknown callback.", eventName, callback.name);
    return;
  }
  eventCallbacks[eventName].splice(i, 1);
}
function fireEvent(eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (eventCallbacks[eventName]) {
    eventCallbacks[eventName].slice(0).forEach(function (callback) {
      callback.apply(void 0, args);
    });
  }
}


/***/ }),

/***/ "./src/PrismInterface.ts":
/*!*******************************!*\
  !*** ./src/PrismInterface.ts ***!
  \*******************************/
/*! exports provided: getPrism */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrism", function() { return getPrism; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * This file is required since the dynamic imports that are required to allow for
 * conditional imports does not handle loading prism correctly.
 * 
 * the reason this is required is that prism has code the will throw errors when
 * imported into a webworker. since the code in VEXcode that uses PrismJS is part
 * of the blockly import, that means that when we import blockly in the VM
 * webworker for VR, we end up with errors during the loading process that
 * prevents loading Prism and anything that is imported after it. this means that
 * no blocks projects would run in VR without fixing the errors.
 * 
 * this issue with dynamic imports does not seem to only apply to PrismJS. we may
 * have a similar but slightly different issue in the same section of the blockly
 * code with trying to use monaco....
 */

/**
 * This is where the imported prism object is stored
 */
var actualPrism = null;

/** indicates if prism is already loaded */
var prismIsLoaded = false;
/** indicates if we are currently loading prism */
var loadingPrism = false;
function importPrism() {
  return _importPrism.apply(this, arguments);
}
function _importPrism() {
  _importPrism = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var listeners, index;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(loadingPrism || prismIsLoaded)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          // mark that we are loading so that any future requests wait
          loadingPrism = true;
          // actually import prism
          if (!globalThis.Prism) {
            _context.next = 8;
            break;
          }
          console.log("using global PrismJS");
          actualPrism = globalThis.Prism;
          _context.next = 11;
          break;
        case 8:
          _context.next = 10;
          return Promise.all(/*! import() */[__webpack_require__.e(10), __webpack_require__.e(32), __webpack_require__.e(58)]).then(__webpack_require__.bind(null, /*! ./prismDummy */ "./src/prismDummy.ts"));
        case 10:
          actualPrism = _context.sent.Prism;
        case 11:
          // make sure we have the require base languages...
          // const loadLanguages = (await import("prismjs/components")).default;
          // loadLanguages();
          // require("prismjs/components")();
          // langs()

          // mark that we have prism loaded so that future requests just grab the now loaded instance
          prismIsLoaded = true;
          loadingPrism = false;

          // resolve all pending requests for prism
          listeners = importListeners.slice();
          importListeners = [];
          for (index = 0; index < listeners.length; index++) {
            listeners[index](actualPrism);
          }
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _importPrism.apply(this, arguments);
}
var importListeners = [];
function getPrism() {
  return _getPrism.apply(this, arguments);
}
function _getPrism() {
  _getPrism = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!prismIsLoaded) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", actualPrism);
        case 4:
          if (!loadingPrism) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            importListeners.push(resolve);
          }));
        case 8:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            importListeners.push(resolve);
            // we want to actually start the import here...
            importPrism();
          }));
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getPrism.apply(this, arguments);
}


/***/ }),

/***/ "./src/platformInfo.ts":
/*!*****************************!*\
  !*** ./src/platformInfo.ts ***!
  \*****************************/
/*! exports provided: currentPlatform, Platform, isSafari, isChromeiOS, isFirefox, isMobileBrowser, PlatformIsNWJS, PlatformIsChrome, PlatformIsIOS, PlatformIsAndroid, currentBrowser, WebBrosers, isSupportedBrowser, BrowserIsSafari, BrowserIsChrome, BrowserIsChromeEdge, browserName, OSisWindows, OSisChromeOS, OSisAndroid, OSisiOS, OSisMac, getOSString, WEBGL_SUPPORT_OPTIONS, webglIsSupported, safariVersion, iOSMajorVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentPlatform", function() { return currentPlatform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSafari", function() { return isSafari; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isChromeiOS", function() { return isChromeiOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirefox", function() { return isFirefox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobileBrowser", function() { return isMobileBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformIsNWJS", function() { return PlatformIsNWJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformIsChrome", function() { return PlatformIsChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformIsIOS", function() { return PlatformIsIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformIsAndroid", function() { return PlatformIsAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentBrowser", function() { return currentBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebBrosers", function() { return WebBrosers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportedBrowser", function() { return isSupportedBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserIsSafari", function() { return BrowserIsSafari; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserIsChrome", function() { return BrowserIsChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserIsChromeEdge", function() { return BrowserIsChromeEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browserName", function() { return browserName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OSisWindows", function() { return OSisWindows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OSisChromeOS", function() { return OSisChromeOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OSisAndroid", function() { return OSisAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OSisiOS", function() { return OSisiOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OSisMac", function() { return OSisMac; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOSString", function() { return getOSString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBGL_SUPPORT_OPTIONS", function() { return WEBGL_SUPPORT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webglIsSupported", function() { return webglIsSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safariVersion", function() { return safariVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iOSMajorVersion", function() { return iOSMajorVersion; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./targetPlatform */ "./src/targetPlatform.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PlatfromInfo");
log.setLevel(log.levels.WARN);
// dev only
if (false) {}

// set platform constants
var Platform = /*#__PURE__*/function (Platform) {
  Platform[Platform["Android"] = 0] = "Android";
  Platform[Platform["iOS"] = 1] = "iOS";
  Platform[Platform["ChromeOS"] = 2] = "ChromeOS";
  Platform[Platform["NWJSmacOS"] = 3] = "NWJSmacOS";
  Platform[Platform["NWJSWindows"] = 4] = "NWJSWindows";
  Platform[Platform["NWJSUnknown"] = 5] = "NWJSUnknown";
  Platform[Platform["Unknown"] = 6] = "Unknown";
  return Platform;
}(Platform || {}); // this is a safety option
var WebBrosers = /*#__PURE__*/function (WebBrosers) {
  WebBrosers[WebBrosers["Safari"] = 0] = "Safari";
  WebBrosers[WebBrosers["Firefox"] = 1] = "Firefox";
  WebBrosers[WebBrosers["Chrome"] = 2] = "Chrome";
  WebBrosers[WebBrosers["ChromiumEdge"] = 3] = "ChromiumEdge";
  WebBrosers[WebBrosers["Edge"] = 4] = "Edge";
  WebBrosers[WebBrosers["InternetExplorer"] = 5] = "InternetExplorer";
  WebBrosers[WebBrosers["Opera"] = 6] = "Opera";
  WebBrosers[WebBrosers["Silk"] = 7] = "Silk";
  WebBrosers[WebBrosers["None"] = 8] = "None";
  return WebBrosers;
}(WebBrosers || {});
var OS = /*#__PURE__*/function (OS) {
  OS[OS["MacOS"] = 0] = "MacOS";
  OS[OS["Windows"] = 1] = "Windows";
  OS[OS["iOS"] = 2] = "iOS";
  OS[OS["Android"] = 3] = "Android";
  OS[OS["ChromeOS"] = 4] = "ChromeOS";
  OS[OS["Unknow"] = 5] = "Unknow";
  return OS;
}(OS || {});
if (self.goog) {
  // seems that there may be times where this object has not been created
  if (!self.goog.userAgent) {
    self.goog.userAgent = {};
  }
  self.goog.userAgent.IPAD = self.goog.userAgent.IPAD || self.webkit && self.webkit.messageHandlers;
}
var currentPlatform = function () {
  if (self.navigator.appVersion.includes("Android") && self.AndroidNativeInterface !== undefined) {
    log.debug("current platfrom is Android");
    return Platform.Android;
  }
  // platform is not always "iPad" after iPadOS 13 , so we cheat and look for the bridge object...
  if (self.webkit && self.webkit.messageHandlers && self.webkit.messageHandlers.selectFileToOpen) {
    log.debug("current platform is iOS");

    // the logic in blockly does not handle newer iPadOS versions which report as mac...
    if (!Blockly.utils.userAgent.IPAD) {
      Blockly.utils.userAgent.IPAD = true;
    }
    return Platform.iOS;
  }
  if ("nw" in self) {
    if (process.platform === "darwin") {
      log.debug("current platfrom is NWJSmacOS");
      return Platform.NWJSmacOS;
    } else if (process.platform === "win32") {
      log.debug("current platfrom is NWJSWindows");
      return Platform.NWJSWindows;
    }
    log.debug("current platfrom is NWJSUnknown");
    return Platform.NWJSUnknown;
  }
  if (self.chrome && self.chrome.runtime && self.chrome.runtime.id) {
    log.debug("current platfrom is ChromeOS");
    return Platform.ChromeOS;
  }
  log.debug("current platfrom is Unknown");
  return Platform.Unknown;
}();
var currentBrowser = function () {
  if (currentPlatform !== Platform.Unknown) {
    return WebBrosers.None;
  }
  var agent = self.navigator.userAgent.toLowerCase();
  if (agent.indexOf("silk") > -1) {
    return WebBrosers.Silk;
  } else if (agent.indexOf("edge") > -1) {
    return WebBrosers.Edge;
  } else if (agent.indexOf("edg") > -1) {
    return WebBrosers.ChromiumEdge;
  } else if (agent.indexOf("opr") > -1 && !!self.opr) {
    return WebBrosers.Opera;
  } else if (agent.indexOf("chrome") > -1 && !!self.chrome) {
    return WebBrosers.Chrome;
  } else if (agent.indexOf("trident") > -1) {
    return WebBrosers.InternetExplorer;
  } else if (agent.indexOf("firefox") > -1) {
    return WebBrosers.Firefox;
  } else if (agent.indexOf("safari") > -1) {
    return WebBrosers.Safari;
  }
  return WebBrosers.None;
}();
var currentOS = function () {
  var agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf("win") !== -1) {
    log.debug("current OS is Widows");
    return OS.Windows;
  }
  if (agent.indexOf("android") !== -1) {
    log.debug("current OS is Android");
    return OS.Android;
  }
  if (agent.indexOf("cros") !== -1) {
    log.debug("current OS is ChomeOS");
    return OS.ChromeOS;
  }
  if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    log.debug("current OS is iOS < 13 or mobile in iOS/iPadOS >= 13");
    return OS.iOS;
  }
  if (agent.indexOf("mac") !== -1) {
    if (self.navigator.maxTouchPoints && self.navigator.maxTouchPoints > 2) {
      log.debug("current OS is iOS >= 13 with desktop mode set");
      return OS.iOS;
    } else {
      log.debug("current OS is MacOS");
      return OS.MacOS;
    }
  }
  return OS.Unknow;
}();
var isSupportedBrowser = currentBrowser === WebBrosers.Chrome || currentBrowser === WebBrosers.ChromiumEdge || currentBrowser === WebBrosers.Firefox || currentBrowser === WebBrosers.Safari || currentBrowser === WebBrosers.Silk;
var BrowserIsSafari = currentBrowser === WebBrosers.Safari;
var BrowserIsChrome = currentBrowser === WebBrosers.Chrome;
var BrowserIsChromeEdge = currentBrowser === WebBrosers.ChromiumEdge;
var browserName = currentPlatform !== Platform.Unknown ? "" : function () {
  switch (currentBrowser) {
    case WebBrosers.Chrome:
      return "Chrome";
    case WebBrosers.ChromiumEdge:
      return "Edge";
    case WebBrosers.Edge:
      return "Edge";
    case WebBrosers.Firefox:
      return "Firefox";
    case WebBrosers.InternetExplorer:
      return "Internet Explore";
    case WebBrosers.Opera:
      return "Opera";
    case WebBrosers.Safari:
      return "Safari";
    default:
      return "Unkown";
  }
}();
var ua = navigator.userAgent.toLowerCase();
var isSafari = currentPlatform === Platform.iOS || ua.indexOf("safari") !== -1 && !(ua.indexOf("chrome") > -1);
var isChromeiOS = /CriOS/i.test(navigator.userAgent);
var isFirefox = ua.indexOf('firefox') > -1;
var safariVersion = findSafariVersion();

// constants to make it easier to use
var PlatformIsNWJS = currentPlatform === Platform.NWJSmacOS || currentPlatform === Platform.NWJSWindows ? true : false;
var PlatformIsChrome = currentPlatform === Platform.ChromeOS ? true : false;
var PlatformIsIOS = currentPlatform === Platform.iOS ? true : false;
var PlatformIsAndroid = currentPlatform === Platform.Android ? true : false;
var OSisAndroid = currentOS === OS.Android ? true : false;
var OSisWindows = currentOS === OS.Windows ? true : false;
var OSisChromeOS = currentOS === OS.ChromeOS ? true : false;
var OSisMac = currentOS === OS.MacOS ? true : false;
var OSisiOS = currentOS === OS.iOS ? true : false;
function getOSString() {
  switch (currentOS) {
    case OS.Android:
      return "Android";
    case OS.iOS:
      return "iOS";
    case OS.ChromeOS:
      return "ChromeOS";
    case OS.MacOS:
      return "macOS";
    case OS.Windows:
      return "Windows";
    default:
      return "Unknown OS";
  }
}
function isMobileBrowser() {
  if (!(OSisAndroid || OSisiOS)) {
    log.info("not android or ios");
    return false;
  }

  // If the platform is unknown, the app is being accessed on the web
  // If the platform is iOS/Android, the app is natively installed
  if (currentPlatform === Platform.Unknown) {
    log.debug("mobile browser detected");
    return true;
  }
  return false;
}
var WEBGL_SUPPORT_OPTIONS = /*#__PURE__*/function (WEBGL_SUPPORT_OPTIONS) {
  WEBGL_SUPPORT_OPTIONS[WEBGL_SUPPORT_OPTIONS["supported"] = 0] = "supported";
  WEBGL_SUPPORT_OPTIONS[WEBGL_SUPPORT_OPTIONS["unsupported"] = 1] = "unsupported";
  WEBGL_SUPPORT_OPTIONS[WEBGL_SUPPORT_OPTIONS["disabled"] = 2] = "disabled";
  WEBGL_SUPPORT_OPTIONS[WEBGL_SUPPORT_OPTIONS["unknown"] = 3] = "unknown";
  return WEBGL_SUPPORT_OPTIONS;
}(WEBGL_SUPPORT_OPTIONS || {});

var webglIsSupported = false;
function checkWebGLSupport() {
  try {
    var canvas = document.createElement("canvas");
    webglIsSupported = !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
    log.warn("webglIsSupported:", webglIsSupported);
  } catch (e) {
    webglIsSupported = false;
  }
}
if (_targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsPlaygrounds"]) {
  self.addEventListener("load", function () {
    checkWebGLSupport();
  });
}
function findSafariVersion() {
  var agent = self.navigator.userAgent.toLowerCase();
  var fullVersion = '' + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var verOffset, ix;
  if (isSafari) {
    verOffset = agent.indexOf("safari");
    fullVersion = agent.substring(verOffset + 7);
    if ((verOffset = agent.indexOf("version")) != -1) {
      fullVersion = agent.substring(verOffset + 8);
    }
  } else {
    return -1;
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) != -1) {
    fullVersion = fullVersion.substring(0, ix);
  }
  if ((ix = fullVersion.indexOf(" ")) != -1) {
    fullVersion = fullVersion.substring(0, ix);
  }
  majorVersion = parseInt('' + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }
  log.debug("Safari " + fullVersion);
  return fullVersion;
}
var iOSMajorVersion = function () {
  if (!PlatformIsIOS) {
    return 0;
  } else {
    var extract = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(extract && extract[1] || "0", 10);
  }
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

});
//# sourceMappingURL=a7f048d91a791c359fe8.17.bundle.js.map