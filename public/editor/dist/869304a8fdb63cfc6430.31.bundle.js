this["webpackChunkwebapp"]([31],{

/***/ "./src/Blockly/Extensions/Extension.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Extensions/Extension.ts ***!
  \*********************************************/
/*! exports provided: ExtensionBase, ExtensionInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionBase", function() { return ExtensionBase; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/Blockly/Extensions/utils/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtensionInfo", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["ExtensionInfo"]; });

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExtensionBase = /*#__PURE__*/_createClass(function ExtensionBase(runtime) {
  _classCallCheck(this, ExtensionBase);
  this.runtime = runtime;
}

/**
 * Returns block information about a particular extension to the
 * Scratch VM and extension manager utilizing the extension
 * @returns {ExtensionInfo} an object containing the id and blocks associated with the extension
 */);



/***/ }),

/***/ "./src/Blockly/Extensions/PGBlocks.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Extensions/PGBlocks.ts ***!
  \********************************************/
/*! exports provided: PGBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PGBlocks", function() { return PGBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Extension */ "./src/Blockly/Extensions/Extension.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/Blockly/Extensions/utils/index.ts");
/* harmony import */ var _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../SimWindow/unityMessageEnums */ "./src/SimWindow/unityMessageEnums.ts");
/* harmony import */ var _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SimWindow/SimUnity/SimMessageHelper */ "./src/SimWindow/SimUnity/SimMessageHelper.ts");
/* harmony import */ var _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../SimWindow/SimUnity/SimSensorValues */ "./src/SimWindow/SimUnity/SimSensorValues.ts");
/* harmony import */ var _VexcodeTimer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../VexcodeTimer */ "./src/VexcodeTimer.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/helpers */ "./src/Blockly/Extensions/utils/helpers.ts");
/* harmony import */ var _SimWindow_messageEnums__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../SimWindow/messageEnums */ "./src/SimWindow/messageEnums.ts");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Helpers/Helpers */ "./src/Blockly/Helpers/Helpers.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// tslint:disable: member-ordering


var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PGBlocksExtension");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();










var drivetrainDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getDrivetrainDefaults"])();
var magnetDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getMagnetDefaults"])();
var actionDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getActionDefaults"])();
var soundDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getSoundDefaults"])();
var motorDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getMotorDefaults"])();
var PGBlocks = /*#__PURE__*/function (_ExtensionBase) {
  _inherits(PGBlocks, _ExtensionBase);
  var _super = _createSuper(PGBlocks);
  // Drivetrain Variables

  // Distance Variables

  // Looks Variables

  /** this is the brain timer */

  function PGBlocks(runtime) {
    var _this;
    _classCallCheck(this, PGBlocks);
    _this = _super.call(this, runtime);
    _defineProperty(_assertThisInitialized(_this), "primitives", {});
    _defineProperty(_assertThisInitialized(_this), "goToId", 0);
    _defineProperty(_assertThisInitialized(_this), "linesCalled", 0);
    _defineProperty(_assertThisInitialized(_this), "lastSent", Date.now());
    _this.setExtensionDefaults();
    _this.buildPrimitives();
    return _this;
  }
  _createClass(PGBlocks, [{
    key: "setExtensionDefaults",
    value: function setExtensionDefaults() {
      // Reset Drivetrain Variables
      this.drivetrainTimeoutMS = 0;
      this.drivetrainMaxRPM = 120;

      // Reset Distance Variables
      this.defineDistance = [{
        name: 'DistanceLeft',
        port: 12,
        distance: 0,
        isObjectFound: 0
      }, {
        name: 'DistanceRight',
        port: 20,
        distance: 0,
        isObjectFound: 0
      }, {
        name: 'DistanceCenter',
        port: 13,
        distance: 0,
        isObjectFound: 0
      }];

      // Reset Looks Variables
      this.printPrecision = "0";

      // Reset Timer
      PGBlocks.timer.reset();

      // Reset Sensor and Cached Values
      _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["resetValues"](self.VMWorkerAPI.getRobotConfig());
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      return {
        id: 'pgBlocks',
        blocks: [
        //#region events
        {
          opcode: 'pg_events_when_started',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenstarted',
          arguments: {},
          func: 'whenStarted',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'pg_events_when_bumper',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenbumper',
          arguments: {
            BUMPER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Bumper',
              menu: 'BUMPERS'
            },
            EVENTTYPE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'pressed',
              menu: 'BUMPEREVENTTYPES'
            }
          },
          func: 'whenBumper',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'pg_events_optical_detect_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenOptical',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            },
            OPTIONS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'detects',
              menu: 'OPTICALEVENTTYPES'
            }
          },
          func: 'whenOptical',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'pg_events_when_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whentimer',
          arguments: {
            NUM: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'whenTimer',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'pg_events_when_under_attack',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'when under attack',
          arguments: {},
          func: 'whenUnderAttack',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'pg_events_when_level_up',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'when level up',
          arguments: {},
          func: 'whenLevelUp',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        },
        //#endregion events
        //#region drivetrain
        {
          opcode: 'pg_drivetrain_drive',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive [DIRECTION]',
          arguments: {
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.driveDirection,
              menu: 'DRIVEDIRECTIONS'
            }
          },
          func: 'drivetrainDrive'
        }, {
          opcode: 'pg_drivetrain_drive_for',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive [DIRECTION] for (AMOUNT) [UNITS]',
          arguments: {
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.driveDirection,
              menu: 'DRIVEDIRECTIONS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 200
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.distanceUnit,
              menu: 'DRIVEUNITS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainDriveFor'
        }, {
          opcode: 'go_drivetrain_drive_until',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive [DIRECTION] until [UNITS]',
          arguments: {
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.driveDirection,
              menu: 'DRIVEDIRECTIONS'
            },
            OBSTACLES: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.obstacle,
              menu: 'DRIVEOBJECTS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'drivetrainDriveUntil'
        }, {
          opcode: 'pg_drivetrain_drive_to_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive forward until [OBJECT] degrees',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SMELLABLEOBJECTS"
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainDriveToObject'
        }, {
          opcode: 'pg_drivetrain_turn',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn [DIRECTION]',
          arguments: {
            TURNDIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.turnDirection,
              menu: 'TURNDIRECTIONS'
            }
          },
          func: 'drivetrainTurn'
        }, {
          opcode: 'pg_drivetrain_turn_for',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn [TURNDIRECTION] for (AMOUNT)',
          arguments: {
            TURNDIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.turnDirection,
              menu: 'TURNDIRECTIONS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainTurnFor'
        }, {
          opcode: 'pg_drivetrain_turn_to_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn to [OBJECT] degrees',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SMELLABLEOBJECTS"
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainTurnToObject'
        }, {
          opcode: 'pg_drivetrain_turn_to_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn to heading (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainTurnToHeading'
        }, {
          opcode: 'pg_drivetrain_turn_to_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn to rotation (ROTATION) degrees',
          arguments: {
            ROTATION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainTurnToRotation'
        }, {
          opcode: 'pg_drivetrain_go_to_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'go to [OBJECT]',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SMELLABLEOBJECTS"
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'drivetrainGoToObject'
        }, {
          opcode: 'pg_drivetrain_stop_driving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'stop driving',
          arguments: {},
          func: 'drivetrainStop'
        }, {
          opcode: 'pg_drivetrain_set_drive_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive velocity to (VELOCITY) [UNITS]',
          arguments: {
            VELOCITY: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'drivetrainSetDriveVelocity'
        }, {
          opcode: 'pg_drivetrain_set_turn_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set turn velocity to (VELOCITY) [UNITS]',
          arguments: {
            VELOCITY: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'drivetrainSetTurnVelocity'
        }, {
          opcode: 'pg_drivetrain_set_drive_timeout',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive timeout to (TIMEOUT) seconds',
          arguments: {
            TIMEOUT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'drivetrainSetDriveTimeout'
        }, {
          opcode: 'pg_drivetrain_set_drive_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive heading to (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            }
          },
          func: 'drivetrainSetDriveHeading'
        }, {
          opcode: 'pg_drivetrain_set_drive_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive rotation to (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            }
          },
          func: 'drivetrainSetDriveRotation'
        },
        //#endregion drivetrain
        //#region magnet
        {
          opcode: 'pg_magnet_set_magnet_state',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'energize [MAGNET] to [ACTION]',
          arguments: {
            MAGNET: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": magnetDefaults.magnet,
              menu: 'MAGNETS'
            },
            ACTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": magnetDefaults.action,
              menu: 'MAGNETACTIONS'
            }
          },
          func: 'magnetSetState'
        },
        //#endregion magnet
        //#region actions
        {
          opcode: 'pg_actions_interact_with_minerals',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'minerals [ACTION]',
          arguments: {
            ACTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": actionDefaults.food,
              menu: 'MINERALOPTIONS'
            }
          },
          func: 'actionsMinerals'
        }, {
          opcode: 'pg_actions_interact_with_enemy',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'attack enemy',
          arguments: {},
          func: 'actionsEnemy'
        }, {
          opcode: 'pg_actions_standby',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'hibernate until (AMOUNT) % battery',
          arguments: {
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            }
          },
          func: 'actionsStandby'
        },
        //#endregion actions
        //#region looks
        {
          opcode: 'pg_looks_print',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'print (DATA)',
          arguments: {
            DATA: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Hello'
            },
            andsetcursortonextrow_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].BOOLEAN,
              "default": false
            }
          },
          func: 'looksPrint'
        }, {
          opcode: 'pg_looks_next_row',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set cursor to next row',
          arguments: {},
          func: 'looksNextRow'
        }, {
          opcode: 'pg_looks_set_print_precision',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set print precision to [PRECISION]',
          arguments: {
            PRECISION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": '0',
              menu: 'PRECISIONS'
            }
          },
          func: 'looksSetPrintPrecision'
        }, {
          opcode: 'pg_looks_clear_all_rows',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'clear all rows',
          arguments: {},
          func: 'looksClearAllRows'
        }, {
          opcode: 'pg_looks_set_print_color',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set print color [COLORS]',
          arguments: {
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'black',
              menu: 'PENCOLORS'
            }
          },
          func: 'looksSetPrintColor'
        }, {
          opcode: 'pg_looks_move_pen',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'move pen [DIRECTION]',
          arguments: {
            DIRECTIONS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'up',
              menu: 'PENDIRECTIONS'
            }
          },
          func: 'looksMovePen'
        }, {
          opcode: 'pg_looks_set_pen_color',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set pen to color [COLORS]',
          arguments: {
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'black',
              menu: 'PENCOLORS'
            }
          },
          func: 'looksSetPenColor'
        }, {
          opcode: 'pg_looks_set_pen_width',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set pen to width [WIDTHS]',
          arguments: {
            WIDTHS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": "small",
              menu: 'PENWIDTHS'
            }
          },
          func: 'looksSetPenWidth'
        }, {
          opcode: 'pg_looks_set_pen_color_plus',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set pen color (COLORS)',
          arguments: {
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].COLOR,
              "default": "#000000"
            }
          },
          func: 'looksSetPenColorPlus'
        }, {
          opcode: 'pg_looks_fill_color_plus',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'fill area with color (COLORS)',
          arguments: {
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].COLOR,
              "default": "#000000ff"
            }
          },
          func: 'looksFillPenColorPlus'
        },
        //#endregion looks
        //#region sounds
        {
          opcode: 'pg_sounds_play_sound',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'play sound [SOUND]',
          arguments: {
            SOUND: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getSoundDefault"])(),
              menu: 'SOUNDOPTIONS'
            }
          },
          func: 'playSound'
        },
        //#endregion sounds
        //#region control
        {
          opcode: 'pg_control_break',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'break',
          arguments: {},
          func: 'controlBreak'
        }, {
          opcode: 'pg_control_stop_project',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: true,
          blockAllThreads: false,
          text: 'stop project',
          arguments: {},
          func: 'controlStopProject'
        },
        //#endregion control
        //#region sensing
        //#region sensing - brain timer
        {
          opcode: 'pg_sensing_reset_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'reset timer',
          arguments: {},
          func: 'sensingResetTimer'
        }, {
          opcode: 'pg_sensing_timer_value',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'timer in seconds',
          arguments: {},
          func: 'sensingTimerInSeconds'
        },
        //#endregion sensing - brain timer
        //#region sensing - self
        {
          opcode: 'pg_sensing_robot_battery_capacity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'battery level in %',
          arguments: {},
          func: 'sensingRoverBatteryCapacity'
        }, {
          opcode: 'pg_sensing_robot_minerals_stored',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'food in backpack',
          arguments: {},
          func: 'sensingRoverBatteryStored'
        },
        // { Rolled into sees location
        //   opcode: 'pg_sensing_nano_location',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'location [AXIS] in [UNIT]',
        //   arguments: {
        //     AXIS: {
        //       type: ArgumentTypes.STRING,
        //       default: "charge",
        //       menu: "GPSPOSITION",
        //     },
        //     UNIT: {
        //       type: ArgumentTypes.STRING,
        //       default: "mm",
        //       menu: "DRIVEUNITS",
        //     },
        //   },
        //   func: 'sensingRoverLocation',
        // },
        {
          opcode: 'pg_sensing_robot_level',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'level',
          arguments: {},
          func: 'sensingRoverLevel'
        }, {
          opcode: 'pg_sensing_robot_exp',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'XP',
          arguments: {},
          func: 'sensingRoverExp'
        }, {
          opcode: 'pg_sensing_robot_carry_capacity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'capacity',
          arguments: {},
          func: 'sensingRoverCarryCapacity'
        },
        //#endregion sensing - self
        //#region sensing - drivetrain
        {
          opcode: 'pg_sensing_drive_is_done',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is done?',
          arguments: {},
          func: 'sensingDriveIsDone'
        }, {
          opcode: 'pg_sensing_drive_is_moving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is moving?',
          arguments: {},
          func: 'sensingDriveIsMoving'
        }, {
          opcode: 'pg_sensing_drive_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive heading in degrees',
          arguments: {},
          func: 'sensingDriveHeading'
        }, {
          opcode: 'pg_sensing_drive_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive rotation in degrees',
          arguments: {},
          func: 'sensingDriveRotation'
        },
        //#endregion sensing - drivetrain
        //#region sensing - misc
        {
          opcode: 'pg_sensing_under_attack',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'under attack?',
          arguments: {},
          func: 'sensingUnderAttack'
        },
        //#endregion sensing - misc
        //#region sensing - ai
        {
          opcode: 'pg_sensing_ai_smells',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'smells [OBJECT]',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: 'SMELLABLEOBJECTS'
            }
          },
          func: 'sensingAISmells'
        }, {
          opcode: 'pg_sensing_ai_sees',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'sees [OBJECT]',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SEEABLEOBJECTS"
            }
          },
          func: 'sensingAISees'
        }, {
          opcode: 'pg_sensing_ai_smells_direction',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'smells [OBJECT] direction',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SMELLABLEOBJECTS"
            }
          },
          func: 'sensingAISmellsDirection'
        }, {
          opcode: 'pg_sensing_ai_sees_direction',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OBJECT] direction in degrees',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SEEABLEOBJECTS"
            }
          },
          func: 'sensingAISeesDirection'
        }, {
          opcode: 'pg_sensing_ai_sees_distance',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OBJECT] distance in [UNIT]',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SEEABLEOBJECTS"
            },
            UNIT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "mm",
              menu: "DRIVEUNITS"
            }
          },
          func: 'sensingAISeesDistance'
        }, {
          opcode: 'pg_sensing_ai_sees_location',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OBJECT] location [AXIS] in [UNIT]',
          arguments: {
            OBJECT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "minerals",
              menu: "SEEABLEOBJECTS"
            },
            AXIS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "X",
              menu: "GPSPOSITION"
            },
            UNIT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "mm",
              menu: "DRIVEUNITS"
            }
          },
          func: 'sensingAISeesLocation'
        }, {
          opcode: 'pg_sensing_enemy_level',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'enemy level',
          arguments: {},
          func: 'sensingEnemyLevel'
        }, {
          opcode: 'pg_sensing_enemy_charge',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'enemy charge',
          arguments: {},
          func: 'sensingEnemyCharge'
        },
        //#endregion sensing - ai
        //#region sensing - home
        {
          opcode: 'pg_sensing_home_direction',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'home direction in degrees',
          arguments: {},
          func: 'sensingHomeDirection'
        }, {
          opcode: 'pg_sensing_home_distance',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'home distance in [UNIT]',
          arguments: {
            UNIT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "mm",
              menu: "DRIVEUNITS"
            }
          },
          func: 'sensingHomeDistance'
        }, {
          opcode: 'pg_sensing_home_location',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'home location [AXIS] in [UNIT]',
          arguments: {
            AXIS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "X",
              menu: "GPSPOSITION"
            },
            UNIT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "mm",
              menu: "DRIVEUNITS"
            }
          },
          func: 'sensingHomeLocation'
        },
        //#endregion sensing - home
        //#region sensing - bumper
        {
          opcode: 'pg_sensing_bumper',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[BUMPERS] pressed?',
          arguments: {
            BUMPER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'leftbumper',
              menu: 'BUMPERS'
            }
          },
          func: 'sensingBumperPressed'
        },
        //#endregion sensing - bumper
        //#region sensing - optical
        /*{
          opcode: 'pg_sensing_optical_found_object',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] found an object?',
          arguments: {
            OPTICAL: {
              type: ArgumentTypes.STRING,
              default: 'Optical',
              menu: 'OPTICALSENSORS',
            }
          },
          func: 'sensingOpticalFoundAnObject',
        },
        {
          opcode: 'pg_sensing_optical_detect',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] detects [color]?',
          arguments: {
            OPTICAL: {
              type: ArgumentTypes.STRING,
              default: 'Optical',
              menu: 'OPTICALSENSORS',
            },
            COLORS: {
              type: ArgumentTypes.NUMBER,
              default: 0,
              menu: 'COLORS',
            }
          },
          func: 'sensingOpticalDetectsColor',
        },
        {
          opcode: 'pg_sensing_optical_hue',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] hue in degrees',
          arguments: {
            OPTICAL: {
              type: ArgumentTypes.STRING,
              default: 'Optical',
              menu: 'OPTICALSENSORS',
            }
          },
          func: 'sensingOpticalHue',
        },
        {
          opcode: 'pg_sensing_optical_brightness',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] brightness in %',
          arguments: {
            OPTICAL: {
              type: ArgumentTypes.STRING,
              default: 'Optical',
              menu: 'OPTICALSENSORS',
            }
          },
          func: 'sensingOpticalBrightness',
        },*/
        //#endregion sensing - optical
        //#region sensing - distance
        // {
        //   opcode: 'pg_sensing_distance_found',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'distance found an object?',
        //   arguments: {},
        //   func: 'sensingDistanceFoundObject',
        // },
        // {
        //   opcode: 'pg_sensing_distance_distance',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'distance in [UNITS]',
        //   arguments: {
        //     UNITS: {
        //       type: ArgumentTypes.STRING,
        //       default: 'mm',
        //       menu: 'DRIVEUNITS',
        //     }
        //   },
        //   func: 'sensingDistanceFromObject',
        // },
        {
          opcode: 'pg_sensing_distance_found',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[distance] found an object?',
          arguments: {
            DISTANCE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontDistance',
              menu: 'DISTANCE'
            }
          },
          func: 'sensingDistanceFoundObjectPlus'
        }, {
          opcode: 'pg_sensing_distance_distance',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[distance] in [UNITS]',
          arguments: {
            DISTANCE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontDistance',
              menu: 'DISTANCE'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'mm',
              menu: 'DRIVEUNITS'
            }
          },
          func: 'sensingDistanceFromObjectPlus'
        },
        //#endregion sensing - distance
        //#region sensing - eye
        {
          opcode: 'pg_sensing_optical_near_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] is near object?',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontEye',
              menu: 'OPTICAL'
            }
          },
          func: 'sensingOpticalDetectsObject'
        }, {
          opcode: 'pg_sensing_optical_color',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] detects [COLORS]?',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontEye',
              menu: 'OPTICAL'
            },
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'red',
              menu: 'COLORS'
            }
          },
          func: 'sensingOpticalDetectsColor'
        }, {
          opcode: 'pg_sensing_optical_color_plus',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] detects (COLORS)?',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontEye',
              menu: 'OPTICAL'
            },
            COLORS1: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].COLOR,
              "default": "#000000"
            },
            COLORS2: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].COLOR,
              "default": "#000000"
            }
          },
          func: 'sensingOpticalDetectsColorPlus'
        }, {
          opcode: 'pg_sensing_optical_rgb_plus',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] [RGB] value detected',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontEye',
              menu: 'OPTICAL'
            },
            RGB: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'red',
              menu: 'RGB'
            }
          },
          func: 'sensingOpticalRGBPlus'
        }, {
          opcode: 'pg_sensing_optical_brightness',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] brightness in %',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontEye',
              menu: 'OPTICAL'
            }
          },
          func: 'sensingOpticalBrightness'
        },
        //#endregion sensing - eye
        //#region sensing - gps
        {
          opcode: 'pg_sensing_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'position [LOCATION] in [UNITS]',
          arguments: {
            LOCATION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'X',
              menu: 'GPSPOSITION'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'mm',
              menu: 'DRIVEUNITS'
            }
          },
          func: 'sensingGPSPosition'
        }, {
          opcode: 'pg_sensing_position_angle',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[GPS] heading in degrees',
          arguments: {
            GPS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'GPS',
              menu: 'GPSSENSORS'
            }
          },
          func: 'sensingGPSHeading'
        },
        //#endregion sensing - gps
        //#region sensing - rotation
        /*{
          opcode: 'pg_sensing_rotation_set_position',
          blockType: BlockTypes.COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [ROTATION] position to (POSITION) degrees',
          arguments: {
            ROTATION: {
              type: ArgumentTypes.STRING,
              default: 'Rotation',
              menu: 'ROTATIONSENSORS',
            },
            POSITION: {
              type: ArgumentTypes.NUMBER,
              default: 0,
            }
          },
          func: 'sensingRotationSetPosition',
        },
        {
          opcode: 'pg_sensing_rotation_angle',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[ROTATION] angle in degrees',
          arguments: {
            ROTATION: {
              type: ArgumentTypes.STRING,
              default: 'Rotation',
              menu: 'ROTATIONSENSORS',
            }
          },
          func: 'sensingRotationAngle',
        },
        {
          opcode: 'pg_sensing_rotation_position',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[ROTATION] position in [UNITS]',
          arguments: {
            ROTATION: {
              type: ArgumentTypes.STRING,
              default: 'Rotation',
              menu: 'ROTATIONSENSORS',
            },
            UNITS: {
              type: ArgumentTypes.STRING,
              default: 'Rotation',
              menu: 'POSITIONUNITS',
            }
          },
          func: 'sensingRotationPosition',
        },
        {
          opcode: 'pg_sensing_rotation_velocity',
          blockType: BlockTypes.REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[ROTATION] velocity in [UNITS]',
          arguments: {
            ROTATION: {
              type: ArgumentTypes.STRING,
              default: "Rotation",
              menu: 'ROTATIONSENSORS',
            },
            UNITS: {
              type: ArgumentTypes.STRING,
              default: "rpm",
              menu: 'ROTATIONVELOCITYUNITS',
            }
          },
          func: 'sensingRotationVelocity',
        },*/
        //#endregion sensing - rotation
        //#endregion sensing
        //#region variables

        //#region V5 Blocks

        //#region V5 Events
        {
          opcode: 'v5_events_when_bumper',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenbumper',
          arguments: {
            BUMPER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Bumper',
              menu: 'BUMPERS'
            },
            EVENTTYPE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'pressed',
              menu: 'BUMPEREVENTTYPES'
            }
          },
          func: 'whenBumper',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'v5_event_optical_detect_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenOptical',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            },
            OPTIONS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'detects',
              menu: 'OPTICALEVENTTYPES'
            }
          },
          func: 'whenOptical',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        },
        //#endregion V5 events
        //#region V5 Motor
        {
          opcode: 'v5_motion_spin',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] [DIRECTION]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.direction,
              menu: 'SPINDIRECTIONS'
            }
          },
          func: 'motionSpin'
        }, {
          opcode: 'v5_motion_spin_for',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] [DIRECTION] for (AMOUNT) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.direction,
              menu: 'SPINDIRECTIONS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'motionSpinFor'
        }, {
          opcode: 'v5_motion_spin_to_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] to position (AMOUNT) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'motionSpinToPosition'
        }, {
          opcode: 'v5_motion_stop_motor',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'stop [MOTOR]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            }
          },
          func: 'motionStopMotor'
        }, {
          opcode: 'v5_motion_set_motor_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [MOTOR] position to (DEGS) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DEGS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            }
          },
          func: 'motionSetMotorPosition'
        }, {
          opcode: 'v5_motion_set_motor_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [MOTOR] velocity to (VELOCITY) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            VELOCITY: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'motionSetMotorVelocity'
        }, {
          opcode: 'v5_motion_set_motor_timeout',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [MOTOR] timeout to (TIMEOUT) seconds',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            TIMEOUT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'motionSetMotorTimeout'
        },
        //#endregion V5 Motor

        //#endregion V5 Blocks

        //#region IQ Blocks

        //#region IQ Events
        {
          opcode: 'iq_events_when_bumper',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenbumper',
          arguments: {
            BUMPER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Bumper',
              menu: 'BUMPERS'
            },
            EVENTTYPE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'pressed',
              menu: 'BUMPEREVENTTYPES'
            }
          },
          func: 'whenBumper',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'iq_event_optical_detect_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenOptical',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            },
            OPTIONS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'detects',
              menu: 'OPTICALEVENTTYPES'
            }
          },
          func: 'whenOptical',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'iq_events_when_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whentimer',
          arguments: {
            NUM: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'whenTimer',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        },
        //#endregion IQ events
        //#region IQ Motor
        {
          opcode: 'iq_motion_spin',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] [DIRECTION]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.direction,
              menu: 'SPINDIRECTIONS'
            }
          },
          func: 'motionSpin'
        }, {
          opcode: 'iq_motion_spin_for',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] [DIRECTION] for (AMOUNT) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.direction,
              menu: 'SPINDIRECTIONS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'motionSpinFor'
        }, {
          opcode: 'iq_motion_spin_to_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] to position (AMOUNT) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'motionSpinToPosition'
        }, {
          opcode: 'iq_motion_stop_motor',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'stop [MOTOR]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            }
          },
          func: 'motionStopMotor'
        }, {
          opcode: 'iq_motion_set_motor_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [MOTOR] position to (DEGS) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DEGS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            }
          },
          func: 'motionSetMotorPosition'
        }, {
          opcode: 'iq_motion_set_motor_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [MOTOR] velocity to (VELOCITY) [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            VELOCITY: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'motionSetMotorVelocity'
        }, {
          opcode: 'iq_motion_set_motor_timeout',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [MOTOR] timeout to (TIMEOUT) seconds',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            TIMEOUT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'motionSetMotorTimeout'
        },
        //#endregion IQ Motor

        //#endregion IQ Blocks

        {
          opcode: 'pg_variables_set_array_to',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [LIST] to',
          arguments: {},
          func: 'setListTo'
        },
        //#endregion variables

        {
          opcode: 'v5_events_when_started',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whenstarted',
          arguments: {},
          func: 'whenStarted',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        },
        // {
        //   opcode: 'v5_events_when_bumper',
        //   blockType: BlockTypes.HAT,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'whenbumper',
        //   arguments: {
        //     BUMPER: {
        //       type: ArgumentTypes.STRING,
        //       default: 'Bumper',
        //       menu: 'BUMPERS',
        //     },
        //     EVENTTYPE: {
        //       type: ArgumentTypes.STRING,
        //       default: 'pressed',
        //       menu: 'BUMPEREVENTTYPES',
        //     }
        //   },
        //   func: 'whenBumper',
        //   isEdgeActivated: false,
        //   shouldRestartExistingThreads: true,
        // },
        {
          opcode: 'v5_events_when_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].HAT,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'whentimer',
          arguments: {
            NUM: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'whenTimer',
          isEdgeActivated: false,
          shouldRestartExistingThreads: true
        }, {
          opcode: 'v5_drivetrain_drive',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive [DIRECTION]',
          arguments: {
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.driveDirection,
              menu: 'DRIVEDIRECTIONS'
            }
          },
          func: 'drivetrainDrive'
        }, {
          opcode: 'v5_drivetrain_drive_for',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive [DIRECTION] for (AMOUNT) [UNITS]',
          arguments: {
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.driveDirection,
              menu: 'DRIVEDIRECTIONS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 200
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.distanceUnit,
              menu: 'DRIVEUNITS'
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'drivetrainDriveFor'
        }, {
          opcode: 'v5_drivetrain_turn',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn [DIRECTION]',
          arguments: {
            TURNDIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.turnDirection,
              menu: 'TURNDIRECTIONS'
            }
          },
          func: 'drivetrainTurn'
        }, {
          opcode: 'v5_drivetrain_turn_for',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn [TURNDIRECTION] for (AMOUNT)',
          arguments: {
            TURNDIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.turnDirection,
              menu: 'TURNDIRECTIONS'
            },
            AMOUNT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'drivetrainTurnFor'
        }, {
          opcode: 'v5_drivetrain_turn_to_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn to heading (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'drivetrainTurnToHeading'
        }, {
          opcode: 'v5_drivetrain_turn_to_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'turn to rotation (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 90
            },
            anddontwait_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'drivetrainTurnToRotation'
        }, {
          opcode: 'v5_motion_stop_driving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'stop driving',
          arguments: {},
          func: 'drivetrainStop'
        }, {
          opcode: 'v5_drivetrain_set_drive_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive velocity to (VELOCITY) [UNITS]',
          arguments: {
            VELOCITY: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'drivetrainSetDriveVelocity'
        }, {
          opcode: 'v5_drivetrain_set_turn_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set turn velocity to (VELOCITY) [UNITS]',
          arguments: {
            VELOCITY: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 50
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": drivetrainDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'drivetrainSetTurnVelocity'
        }, {
          opcode: 'v5_drivetrain_set_drive_timeout',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive timeout to (TIMEOUT) seconds',
          arguments: {
            TIMEOUT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 1
            }
          },
          func: 'drivetrainSetDriveTimeout'
        }, {
          opcode: 'v5_drivetrain_set_drive_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive heading to (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            }
          },
          func: 'drivetrainSetDriveHeading'
        }, {
          opcode: 'v5_drivetrain_set_drive_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set drive rotation to (HEADING) degrees',
          arguments: {
            HEADING: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            }
          },
          func: 'drivetrainSetDriveRotation'
        }, {
          opcode: 'v5_motion_spin',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'spin [MOTOR] [DIRECTION]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            DIRECTION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.direction,
              menu: 'SPINDIRECTIONS'
            }
          },
          func: 'motionSpin'
        }, {
          opcode: 'v5_looks_print_virtual',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'print (DATA)',
          arguments: {
            DATA: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'VEXcode'
            },
            andsetcursortonextrow_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'looksPrint'
        }, {
          opcode: 'v5_looks_next_row_virtual',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set cursor to next row',
          arguments: {},
          func: 'looksNextRow'
        }, {
          opcode: 'v5_looks_set_print_precision_virtual',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set print precision to [PRECISION]',
          arguments: {
            PRECISION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": '1',
              menu: 'PRECISIONS'
            }
          },
          func: 'looksSetPrintPrecision'
        }, {
          opcode: 'v5_looks_clear_all_rows_virtual',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'clear all rows',
          arguments: {},
          func: 'looksClearAllRows'
        }, {
          opcode: 'iq_looks_print',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'print (DATA)',
          arguments: {
            DATA: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'VEXcode'
            },
            andsetcursortonextrow_mutator: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FALSE'
            }
          },
          func: 'looksPrint'
        }, {
          opcode: 'iq_looks_next_row',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set cursor to next row',
          arguments: {},
          func: 'looksNextRow'
        }, {
          opcode: 'iq_looks_set_print_precision',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set print precision to [PRECISION]',
          arguments: {
            PRECISION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": '1',
              menu: 'PRECISIONS'
            }
          },
          func: 'looksSetPrintPrecision'
        }, {
          opcode: 'iq_looks_clear_all_rows',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'clear all rows',
          arguments: {},
          func: 'looksClearAllRows'
        }, {
          opcode: 'v5_control_break',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'break',
          arguments: {},
          func: 'controlBreak'
        }, {
          opcode: 'v5_control_stop_project',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: true,
          blockAllThreads: false,
          text: 'stop project',
          arguments: {},
          func: 'controlStopProject'
        }, {
          opcode: 'v5_sensing_reset_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'reset timer',
          arguments: {},
          func: 'sensingResetTimer'
        }, {
          opcode: 'v5_sensing_timer_value',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'timer in seconds',
          arguments: {},
          func: 'sensingTimerInSeconds'
        }, {
          opcode: 'v5_sensing_drive_is_done',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is done?',
          arguments: {},
          func: 'sensingDriveIsDone'
        }, {
          opcode: 'v5_sensing_drive_is_moving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is moving?',
          arguments: {},
          func: 'sensingDriveIsMoving'
        }, {
          opcode: 'v5_sensing_drive_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive heading in degrees',
          arguments: {},
          func: 'sensingDriveHeading'
        }, {
          opcode: 'v5_sensing_drive_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive rotation in degrees',
          arguments: {},
          func: 'sensingDriveRotation'
        }, {
          opcode: 'v5_sensing_drive_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive velocity in [UNITS]',
          arguments: {
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'pct',
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'sensingDriveVelocity'
        }, {
          opcode: 'v5_sensing_motor_is_done',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] is done?',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            }
          },
          func: 'sensingMotorIsDone'
        }, {
          opcode: 'v5_sensing_motor_is_spinning',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] is spinning?',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            }
          },
          func: 'sensingMotorIsSpinning'
        }, {
          opcode: 'v5_sensing_position_of_motor',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] position in [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            }
          },
          func: 'sensingMotorPosition'
        }, {
          opcode: 'v5_sensing_velocity_of_motor',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] velocity in [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'sensingMotorVelocity'
        }, {
          opcode: 'v5_sensing_pressing_bumper',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[BUMPER] pressed?',
          arguments: {
            BUMPER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Bumper',
              menu: 'BUMPERS'
            }
          },
          func: 'sensingBumperPressed'
        }, {
          opcode: 'v5_sensing_optical_found_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] found an object?',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalFoundAnObject'
        }, {
          opcode: 'v5_sensing_optical_detect',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] detects [color]?',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            },
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0,
              menu: 'COLORS'
            }
          },
          func: 'sensingOpticalDetectsColor'
        }, {
          opcode: 'v5_sensing_optical_hue',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] hue in degrees',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalHue'
        }, {
          opcode: 'v5_sensing_optical_brightness',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] brightness in %',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalBrightness'
        }, {
          opcode: 'v5_sensing_optical_brightness_virtual',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] brightness in %',
          arguments: {
            OPTICAL: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Optical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalBrightness'
        }, {
          opcode: 'v5_sensing_distance_found_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[DISTANCE] found an object?',
          arguments: {
            DISTANCE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'DistanceLeft',
              menu: 'DISTANCESENSORS'
            }
          },
          func: 'sensingDistanceFoundObject'
        }, {
          opcode: 'v5_sensing_distance_object_distance',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[DISTANCE] distance in [UNITS]',
          arguments: {
            DISTANCE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'BottomDistance',
              menu: 'DISTANCESENSORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'mm',
              menu: 'DRIVEUNITS'
            }
          },
          func: 'sensingDistanceFromObject'
        }, {
          opcode: 'v5_sensing_gps_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[GPS] position [POSITION] in [UNITS]',
          arguments: {
            GPS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'GPS',
              menu: 'GPSSENSORS'
            },
            POSITION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'X',
              menu: 'GPSPOSITION'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'mm',
              menu: 'DRIVEUNITS'
            }
          },
          func: 'sensingGPSPositionSkills'
        }, {
          opcode: 'v5_sensing_gps_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[GPS] heading in degrees',
          arguments: {
            GPS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'GPS',
              menu: 'GPSSENSORS'
            }
          },
          func: 'sensingGPSHeadingSkills'
        }, {
          opcode: 'v5_sensing_reflectivity_of',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[LINETRACKER] reflectivity in %',
          arguments: {
            LINETRACKER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'BottomLineTracker',
              menu: 'LINETRACKER'
            }
          },
          func: 'sensingLineTrackerReflectivityOf'
        }, {
          opcode: 'v5_sensing_rotation_set_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [ROTATION] position to (POSITION) degrees',
          arguments: {
            ROTATION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Rotation',
              menu: 'ROTATIONSENSORS'
            },
            POSITION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0
            }
          },
          func: 'sensingRotationSetPosition'
        }, {
          opcode: 'v5_sensing_rotation_angle',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[ROTATION] angle in degrees',
          arguments: {
            ROTATION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Rotation',
              menu: 'ROTATIONSENSORS'
            }
          },
          func: 'sensingRotationAngle'
        }, {
          opcode: 'v5_sensing_rotation_position',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[ROTATION] position in [UNITS]',
          arguments: {
            ROTATION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Rotation',
              menu: 'ROTATIONSENSORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Rotation',
              menu: 'POSITIONUNITS'
            }
          },
          func: 'sensingRotationPosition'
        }, {
          opcode: 'v5_sensing_rotation_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[ROTATION] velocity in [UNITS]',
          arguments: {
            ROTATION: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "Rotation",
              menu: 'ROTATIONSENSORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": "rpm",
              menu: 'ROTATIONVELOCITYUNITS'
            }
          },
          func: 'sensingRotationVelocity'
        }, {
          opcode: 'v5_variables_set_array_to',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'set [LIST] to',
          arguments: {},
          func: 'setListTo'
        }, {
          opcode: 'iq_sensing_reset_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'reset timer',
          arguments: {},
          func: 'sensingResetTimer'
        }, {
          opcode: 'iq_sensing_timer_value',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'timer in seconds',
          arguments: {},
          func: 'sensingTimerInSeconds'
        }, {
          opcode: 'iq_sensing_drive_is_done',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is done?',
          arguments: {},
          func: 'sensingDriveIsDone'
        }, {
          opcode: 'iq_sensing_drive_is_moving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is moving?',
          arguments: {},
          func: 'sensingDriveIsMoving'
        }, {
          opcode: 'iq_sensing_drive_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive heading in degrees',
          arguments: {},
          func: 'sensingDriveHeading'
        }, {
          opcode: 'iq_sensing_drive_rotation',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive rotation in degrees',
          arguments: {},
          func: 'sensingDriveRotation'
        }, {
          opcode: 'iq_sensing_drive_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive velocity in [UNITS]',
          arguments: {
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'pct',
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'sensingDriveVelocity'
        }, {
          opcode: 'iq_sensing_motor_is_done',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] is done?',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            }
          },
          func: 'sensingMotorIsDone'
        }, {
          opcode: 'iq_sensing_motor_is_spinning',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] is spinning?',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            }
          },
          func: 'sensingMotorIsSpinning'
        }, {
          opcode: 'iq_sensing_position_of_motor',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] position in [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.positionUnit,
              menu: 'POSITIONUNITS'
            }
          },
          func: 'sensingMotorPosition'
        }, {
          opcode: 'iq_sensing_velocity_of_motor',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[MOTOR] velocity in [UNITS]',
          arguments: {
            MOTOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.motor,
              menu: 'MOTORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": motorDefaults.velocityUnit,
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'sensingMotorVelocity'
        }, {
          opcode: 'iq_sensing_pressing_bumper',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[BUMPER] pressed?',
          arguments: {
            BUMPER: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Bumper',
              menu: 'BUMPERS'
            }
          },
          func: 'sensingBumperPressed'
        }, {
          opcode: 'iq_sensing_distance_found_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[DISTANCE] found an object?',
          arguments: {
            DISTANCE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'DistanceLeft',
              menu: 'DISTANCESENSORS'
            }
          },
          func: 'sensingDistanceFoundObject'
        }, {
          opcode: 'iq_sensing_distance_object_distance',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[DISTANCE] distance in [UNITS]',
          arguments: {
            DISTANCE: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Distance',
              menu: 'DISTANCESENSORS'
            },
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'mm',
              menu: 'DRIVEUNITS'
            }
          },
          func: 'sensingDistanceFromObject'
        }, {
          opcode: 'iq_sensing_object_is_near',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] found an object?',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontColor',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingColorFoundAnObject'
        }, {
          opcode: 'iq_sensing_color_of',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] color name',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontColor',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingColorColorOf'
        }, {
          opcode: 'iq_operator_color_detects_color',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] detects [color]?',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontColor',
              menu: 'COLORSENSORS'
            },
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0,
              menu: 'COLORS'
            }
          },
          func: 'sensingColorDetectsColor'
        }, {
          opcode: 'iq_sensing_brightness_of',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] brightness in %',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontColor',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingColorBrightness'
        }, {
          opcode: 'iq_sensing_hue_of',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] hue in degrees',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Color',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingColorHue'
        }, {
          opcode: 'iq_sensing_optical_found_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] is near object?',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontOptical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingObjectIsNear'
        }, {
          opcode: 'iq_sensing_optical_detect',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] detects [color]?',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontOptical',
              menu: 'OPTICALSENSORS'
            },
            color: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0,
              menu: 'COLORS'
            }
          },
          func: 'sensingOpticalDetectsColor'
        }, {
          opcode: 'iq_sensing_optical_color',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] color name',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontOptical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalColorOf'
        }, {
          opcode: 'iq_sensing_optical_hue',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] hue in degrees',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontOptical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalHueOf'
        }, {
          opcode: 'iq_sensing_optical_brightness',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[OPTICAL] brightness in %',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'FrontOptical',
              menu: 'OPTICALSENSORS'
            }
          },
          func: 'sensingOpticalBrightnessOf'
        },
        // {
        //   opcode: 'iq_sensing_set_gyro_heading',
        //   blockType: BlockTypes.COMMAND,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'set [GYRO] heading to (HEADING) degrees',
        //   arguments: {
        //     GYRO: {
        //       type: ArgumentTypes.STRING,
        //       default: 'BrainInertial',
        //       menu: 'GYROS',
        //     },
        //     HEADING: {
        //       type: ArgumentTypes.NUMBER,
        //       default: 0,
        //     }
        //   },
        //   func: 'sensingSetGyroHeading',
        // },
        // {
        //   opcode: 'iq_sensing_set_gyro_rotation',
        //   blockType: BlockTypes.COMMAND,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'set [GYRO] rotation to (HEADING) degrees',
        //   arguments: {
        //     GYRO: {
        //       type: ArgumentTypes.STRING,
        //       default: 'BrainInertial',
        //       menu: 'GYROS',
        //     },
        //     HEADING: {
        //       type: ArgumentTypes.NUMBER,
        //       default: 0,
        //     }
        //   },
        //   func: 'sensingSetGyroRotation',
        // },
        // {
        //   opcode: 'iq_sensing_heading_of_gyro',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: '[GYRO] heading in degrees',
        //   arguments: {
        //     GYRO: {
        //       type: ArgumentTypes.STRING,
        //       default: 'BrainInertial',
        //       menu: 'GYROS',
        //     },
        //     },
        //   func: 'sensingGyroHeading',
        // },
        // {
        //   opcode: 'iq_sensing_rotation_of_gyro',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: '[GYRO] rotation in degrees',
        //   arguments: {
        //     GYRO: {
        //       type: ArgumentTypes.STRING,
        //       default: 'BrainInertial',
        //       menu: 'GYROS',
        //     },
        //     },
        //   func: 'sensingGyroRotation',
        // },
        {
          opcode: 'go_sensing_crash',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'detected crash?',
          arguments: {},
          func: 'sensingCrashDetected'
        }, {
          opcode: '123_sensing_reset_timer',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'reset timer',
          arguments: {},
          func: 'sensingResetTimer'
        }, {
          opcode: '123_sensing_timer_value',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'timer in seconds',
          arguments: {},
          func: 'sensingTimerInSeconds'
        }, {
          opcode: '123_sensing_drive_is_done',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is done?',
          arguments: {},
          func: 'sensingDriveIsDone'
        }, {
          opcode: '123_sensing_drive_is_moving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive is moving?',
          arguments: {},
          func: 'sensingDriveIsMoving'
        }, {
          opcode: '123_sensing_drive_heading',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive heading in degrees',
          arguments: {},
          func: 'sensingDriveHeading'
        }, {
          opcode: '123_sensing_drive_velocity',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'drive velocity in [UNITS]',
          arguments: {
            UNITS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'pct',
              menu: 'VELOCITYUNITS'
            }
          },
          func: 'sensingDriveVelocity'
        },
        // {
        //   opcode: '123_sensing_brightness_of',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'line brightness in %',
        //   arguments: {},
        //   func: 'sensingLineBrightness',
        // },
        // {
        //   opcode: '123_sensing_line_detecting',
        //   blockType: BlockTypes.REPORTER,
        //   branchCount: 0,
        //   terminal: false,
        //   blockAllThreads: false,
        //   text: 'line detected?',
        //   arguments: {},
        //   func: 'sensingLineDetected',
        // },
        {
          opcode: '123_sensing_crash',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'detected crash?',
          arguments: {},
          func: 'sensingCrashDetected'
        }, {
          opcode: '123_sensing_near_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'eye found an object?',
          arguments: {},
          func: 'sensing123DetectsObject'
        }, {
          opcode: '123_sensing_hue',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'eye hue in degrees',
          arguments: {},
          func: 'sensing123Hue'
        }, {
          opcode: '123_sensing_bright_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'eye detects bright object?',
          arguments: {},
          func: 'sensing123BrightObject'
        }, {
          opcode: '123_looks_glow',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'glow [COLOR]',
          arguments: {
            COLOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": magnetDefaults.action,
              menu: 'LIGHTCOLORS'
            }
          },
          func: 'glow'
        }, {
          opcode: '123_sounds_play_sound',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'play sound [SOUND]',
          arguments: {
            SOUND: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": soundDefaults.play,
              menu: 'SOUNDOPTIONS123'
            }
          },
          func: 'playSound'
        }, {
          opcode: '123_act_act',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'act [ACT]',
          arguments: {
            ACT: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": actionDefaults.act,
              menu: 'EMOTEACTIONS'
            }
          },
          func: 'actionsAct'
        }, {
          opcode: '123_sensing_eye_brightness',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'eye brightness in %',
          arguments: {},
          func: 'sensing123EyeBrightness'
        }, {
          opcode: '123_sensing_eye_detect',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'eye detects [COLORS]?',
          arguments: {
            COLORS: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].NUMBER,
              "default": 0,
              menu: 'COLORS'
            }
          },
          func: 'sensing123EyeColorDetected'
        }],
        menus: {
          DRIVEDIRECTIONS: [{
            value: 'fwd',
            text: 'forward'
          }, {
            value: 'rev',
            text: 'reverse'
          }],
          TURNDIRECTIONS: [{
            value: 'right'
          }, {
            value: 'left'
          }],
          DRIVEUNITS: [{
            value: 'mm'
          }, {
            value: 'in',
            text: 'inches'
          }],
          VELOCITYUNITS: [{
            value: 'pct',
            text: '%'
          }, {
            value: 'rpm'
          }],
          ROTATIONVELOCITYUNITS: [{
            value: 'rpm'
          }, {
            value: 'dps'
          }],
          MOTORS: [{
            value: 'IntakeMotorGroup'
          }, {
            value: 'ForkMotorGroup'
          }, {
            value: 'ArmMotor'
          }, {
            value: 'IntakeMotor'
          }],
          SPINDIRECTIONS: [{
            value: 'fwd',
            text: 'outtake'
          }, {
            value: 'rev',
            text: 'intake'
          }, {
            value: 'fwd',
            text: 'up'
          }, {
            value: 'rev',
            text: 'down'
          }, {
            value: 'fwd',
            text: 'open'
          }, {
            value: 'rev',
            text: 'close'
          }],
          MAGNETS: [{
            value: 'Magnet'
          }],
          MAGNETACTIONS: [{
            value: 'boost',
            text: 'boost'
          }, {
            value: 'drop',
            text: 'drop'
          }],
          LIGHTCOLORS: [{
            value: 'green',
            text: 'green'
          }, {
            value: 'blue',
            text: 'blue'
          }, {
            value: 'purple',
            text: 'purple'
          }, {
            value: 'off',
            text: 'off'
          }],
          EMOTEACTIONS: [{
            value: 'happy',
            text: 'happy'
          }, {
            value: 'sad',
            text: 'sad'
          }, {
            value: 'crazy',
            text: 'crazy'
          }],
          SOUNDOPTIONS123: [{
            value: "honk",
            text: "honk"
          }, {
            value: "doorbell",
            text: "doorbell"
          }, {
            value: "crash",
            text: "crash"
          }, {
            value: "random",
            text: "random"
          }],
          MINERALOPTIONS: [{
            value: 'pickup',
            text: 'pick up'
          }, {
            value: 'use'
          }, {
            value: 'drop'
          }],
          ENEMYACTIONS: [{
            value: 'attack'
          }],
          PENDIRECTIONS: [{
            value: 'up',
            text: 'up'
          }, {
            value: 'down',
            text: 'down'
          }],
          POSITIONUNITS: [{
            value: 'deg',
            text: 'degrees'
          }, {
            value: 'rev',
            text: 'turns'
          }],
          PRECISIONS: [{
            value: '0',
            text: '1'
          }, {
            value: '1',
            text: '0.1'
          }, {
            value: '2',
            text: '0.01'
          }, {
            value: '3',
            text: '0.001'
          }, {
            value: '-1',
            text: 'All Digits'
          }],
          BUMPERS: [{
            value: 'leftbumper'
          }, {
            value: 'rightbumper'
          }],
          GPSSENSORS: [{
            value: 'GPS'
          }],
          COLORS: [{
            value: 0,
            text: 'none'
          }, {
            value: 1,
            text: 'red'
          }, {
            value: 2,
            text: 'green'
          }, {
            value: 3,
            text: 'blue'
          }],
          PENCOLORS: [{
            value: "black",
            text: 'black'
          }, {
            value: "red",
            text: 'red'
          }, {
            value: "green",
            text: 'green'
          }, {
            value: "blue",
            text: 'blue'
          }],
          RGB: [{
            value: "red",
            text: 'red'
          }, {
            value: "green",
            text: 'green'
          }, {
            value: "blue",
            text: 'blue'
          }],
          PENWIDTHS: [{
            value: 5,
            text: 'extra_thin'
          }, {
            value: 20,
            text: 'thin'
          }, {
            value: 40,
            text: 'medium'
          }, {
            value: 60,
            text: 'wide'
          }, {
            value: 80,
            text: 'extra_wide'
          }],
          OPTICAL: [{
            value: "FrontEye",
            text: 'FrontEye'
          }, {
            value: "DownEye",
            text: 'DownEye'
          }, {
            value: "RightEye",
            text: 'RightEye'
          }, {
            value: "LeftEye",
            text: 'LeftEye'
          }, {
            value: "RearEye",
            text: 'RearEye'
          }],
          DISTANCE: [{
            value: "FrontDistance",
            text: 'FrontDistance'
          }, {
            value: "RightDistance",
            text: 'RightDistance'
          }, {
            value: "LeftDistance",
            text: 'LeftDistance'
          }, {
            value: "Left45Distance",
            text: 'Left45Distance'
          }, {
            value: "Right45Distance",
            text: 'Right45Distance'
          }],
          BUMPERCOLORS: [{
            value: "red",
            text: 'red'
          }, {
            value: "green",
            text: 'green'
          }, {
            value: "off",
            text: 'off'
          }],
          DISTANCESENSORS: [{
            value: 'DistanceLeft'
          }, {
            value: 'DistanceRight'
          }, {
            value: 'DistanceCenter'
          }],
          BUMPEREVENTTYPES: [{
            value: 'pressed',
            text: 'pressed'
          }, {
            value: 'released',
            text: 'released'
          }],
          GPSPOSITION: [{
            value: 'X'
          }, {
            value: 'Y'
          }],
          SMELLABLEOBJECTS: [{
            value: "minerals"
          }, {
            value: "enemy"
          }],
          SEEABLEOBJECTS: [{
            value: "minerals"
          }, {
            value: "enemy"
          }, {
            value: "home"
          }, {
            value: "obstacle"
          }, {
            value: "hazard"
          }],
          STORAGEOPTIONS: [{
            value: "base",
            text: "at base"
          }, {
            value: "back",
            text: "on back"
          }],
          BASEOPTIONS: [{
            value: "angle",
            text: "direction"
          }, {
            value: "distance"
          }, {
            value: "x",
            text: "X location"
          }, {
            value: "y",
            text: "Y location"
          }],
          SOUNDOPTIONS: [{
            value: "sounda",
            text: "sounda"
          }, {
            value: "soundb",
            text: "soundb"
          }, {
            value: "soundc",
            text: "soundc"
          }, {
            value: "soundd",
            text: "soundd"
          }, {
            value: "sounde",
            text: "sounde"
          }],
          // GYROS: [
          //   { value: "BrainInertial" }
          // ],
          OPTICALSENSORS: [{
            value: 'Optical'
          }],
          COLORSENSORS: [{
            value: 'FrontColor'
          }],
          ROTATIONSENSORS: [{
            value: 'Rotation'
          }],
          OPTICALEVENTTYPES: [{
            value: 'detects',
            text: 'detects'
          }, {
            value: 'loses',
            text: 'loses'
          }],
          LINETRACKER: [{
            value: 'BottomLineTracker'
          }, {
            value: 'MiddleLineTracker'
          }, {
            value: 'TopLineTracker'
          }]
        }
      };
    }
  }, {
    key: "buildPrimitives",
    value: function buildPrimitives() {
      var _this2 = this;
      var info = this.getInfo();
      var out = {};
      info.blocks.forEach(function (block) {
        var func = block.func;
        if (!func) {
          log.debug("no function for", block.opcode);
          return;
        }
        if (typeof func === "function") {
          out[block.opcode] = _this2[func];
        } else if (typeof func === "string") {
          out[block.opcode] = _this2[block.func];
        } else {
          log.warn("unexpected type for function", block);
        }
      });
      this.primitives = out;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
  }, {
    key: "getPrimitives",
    value: function getPrimitives() {
      return this.primitives;
    }

    //#region events
  }, {
    key: "whenStarted",
    value: function whenStarted(args, util) {
      var _this3 = this;
      log.debug("whenStarted block!");
      // this is a special case. hat blocks need to return a boolean true
      // to make sure the blcok stack actually runs.
      // see handleReport in vm src/engine/execute.js
      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
          var start, delay, widthValue, penPort, commandMessage;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!util.target.firstRun) {
                  _context.next = 16;
                  break;
                }
                util.target.firstRun = false;
                log.debug("running init code...");
                start = Date.now(); // TODO: init robot values
                self.VMWorkerAPI.sendSetPrintConsoleColor(_SimWindow_messageEnums__WEBPACK_IMPORTED_MODULE_8__["SimPrintColorEnum"].black);
                _this3.setExtensionDefaults();
                delay = 600 - (Date.now() - start);
                widthValue = _this3.getPenWidthValue("thin");
                penPort = _this3.getPortData("pen"); // We are using port !== 0 to check if the project is Rover or not, since we dont have access to the PG in this context
                if (penPort !== 0) {
                  commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Looks"].setPenWidth(widthValue, penPort);
                  self.VMWorkerAPI.sendCommandMessage(commandMessage);
                }
                _context.next = 12;
                return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(delay);
              case 12:
                PGBlocks.timer.reset();
                self.VMWorkerAPI.sendTimerMessage(_SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Timer"].start());
                _context.next = 20;
                break;
              case 16:
                log.debug("skipping init code...");
                _context.next = 19;
                return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(600);
              case 19:
                PGBlocks.timer.reset();
              case 20:
                resolve(true);
              case 21:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "whenBumper",
    value: function whenBumper(args, util) {
      log.debug("whenBumper block!", args);
      return true;
    }
  }, {
    key: "whenOptical",
    value: function whenOptical(args, util) {
      log.debug("whenOptical block!", args);
      return true;
    }
  }, {
    key: "whenTimer",
    value: function whenTimer(args, util) {
      log.debug("whenTimer block!", args);
      return true;
    }
  }, {
    key: "whenUnderAttack",
    value: function whenUnderAttack(args, util) {
      log.debug("whenUnderAttack block!", args);
      return true;
    }
  }, {
    key: "whenLevelUp",
    value: function whenLevelUp(args, util) {
      log.debug("whenLevelUp block!", args);
      return true;
    }
    //#endregion events

    //#region Motion
  }, {
    key: "motionSpin",
    value: function motionSpin(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].backward;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].spin(port, direction);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "motionSpinFor",
    value: function motionSpinFor(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      // const definedMotor = motors.filter((motor) => motor.name === args.MOTOR)[0];
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].backward;
      var amount = args.UNITS === "rev" ? args.AMOUNT * 360 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].spinFor(port, direction, amount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["motorTimeoutWrapper"])(port, commandMessage, wait, this.motorTimeoutMS ? this.motorTimeoutMS : 0, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "motionSpinToPosition",
    value: function motionSpinToPosition(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var amount = args.UNITS === "rev" ? args.AMOUNT * 360 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].spinTo(port, amount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["motorTimeoutWrapper"])(port, commandMessage, wait, this.motorTimeoutMS ? this.motorTimeoutMS : 0, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "motionStopMotor",
    value: function motionStopMotor(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].stop(port);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "motionSetMotorPosition",
    value: function motionSetMotorPosition(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var position = args.UNITS === "rev" ? args.DEGS * 360 : args.DEGS;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].setPosition(port, position);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["setWrapper"])(commandMessage, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "motionSetMotorVelocity",
    value: function motionSetMotorVelocity(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var velocity = args.UNITS === "rpm" ? args.VELOCITY / (this.motorMaxRPM ? this.motorMaxRPM : 600) * 100 : args.VELOCITY;
      if (velocity < 1) {
        velocity = 1;
      } else if (velocity > 100) {
        velocity = 100;
      }
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].setVelocity(port, velocity);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "motionSetMotorTimeout",
    value: function motionSetMotorTimeout(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      this.motorTimeoutMS = args.TIMEOUT * 1000;
    }
    //#endregion Motion

    //#region Drivetrain Opcode Executors
  }, {
    key: "drivetrainDrive",
    value: function drivetrainDrive(args, util) {
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].backward;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].drive(direction);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "drivetrainDriveFor",
    value: function drivetrainDriveFor(args, util) {
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].backward;
      var amount = args.UNITS === "inches" || args.UNITS === "in" ? args.AMOUNT * 25.4 : args.UNITS === "steps" ? args.AMOUNT * 76.2 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var driveAmount = amount;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].driveFor(direction, driveAmount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainDriveUntil",
    value: function drivetrainDriveUntil(args, util) {
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].backward;
      // const amount = args.UNITS === "steps" ? args.AMOUNT / 78 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var driveObstacles = 1;
      if (args.OBSTACLES === "object") {
        driveObstacles = 2;
      } else if (args.OBSTACLES === "line") {
        driveObstacles = 7;
      }
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].driveUntil(direction, driveObstacles, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainDriveToObject",
    value: function () {
      var _drivetrainDriveToObject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(args, util) {
        var port, stopCommandMessage, key, amount, offset, direction, wait, commandMessage, prom;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // stop movement
              log.debug("stop motion");
              port = this.getPortData("ai");
              stopCommandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].stop();
              _context2.next = 5;
              return self.VMWorkerAPI.sendCommandMessage(stopCommandMessage);
            case 5:
              // wait for next sensor update
              log.debug("wait after stop");
              _context2.next = 8;
              return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(10);
            case 8:
              log.debug("wait for sensor update");
              _context2.next = 11;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
            case 11:
              _context2.next = 13;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
            case 13:
              // get direction
              log.debug("get sensor value");
              key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
              amount = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValue"]("vision", "Distance", {
                OBJECT: key
              });
              if (args.OBJECT === "home") {
                amount = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDistance(port);
              }

              // offset is required due to size of rover. the offset amount changes based on target
              offset = key === "enemy" ? 85 : 35;
              amount = amount - offset; // offset required due to size of rover

              log.debug("drive amount:", amount);
              direction = _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].forward;
              wait = !args.anddontwait_mutator;
              commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].driveFor(direction, amount, wait);
              prom = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
              if (wait) {
                _context2.next = 30;
                break;
              }
              _context2.next = 27;
              return prom;
            case 27:
              _context2.next = 29;
              return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(20);
            case 29:
              return _context2.abrupt("return", _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](5));
            case 30:
              return _context2.abrupt("return", prom);
            case 31:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function drivetrainDriveToObject(_x3, _x4) {
        return _drivetrainDriveToObject.apply(this, arguments);
      }
      return drivetrainDriveToObject;
    }()
  }, {
    key: "drivetrainTurn",
    value: function drivetrainTurn(args, util) {
      var direction = args.TURNDIRECTION.toUpperCase() === "RIGHT" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].right : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].left;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turn(direction);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "drivetrainTurnFor",
    value: function drivetrainTurnFor(args, util) {
      var direction = args.TURNDIRECTION.toUpperCase() === "RIGHT" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].right : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].left;
      var amount = args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnFor(direction, amount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainTurnToObject",
    value: function () {
      var _drivetrainTurnToObject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(args, util) {
        var port, stopCommandMessage, key, amount, direction, wait, commandMessage, prom;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // stop movement
              log.debug("stop motion");
              port = this.getPortData("ai");
              stopCommandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].stop();
              _context3.next = 5;
              return self.VMWorkerAPI.sendCommandMessage(stopCommandMessage);
            case 5:
              // wait for next sensor update
              log.debug("wait after stop");
              _context3.next = 8;
              return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(10);
            case 8:
              log.debug("wait for sensor update");
              _context3.next = 11;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
            case 11:
              _context3.next = 13;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
            case 13:
              // get direction
              log.debug("get sensor value");
              key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
              amount = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValue"]("vision", "Angle", {
                OBJECT: key
              });
              if (args.OBJECT === "home") {
                amount = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDirection(port);
              }
              log.debug("turn amount:", amount);
              direction = _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].right;
              wait = !args.anddontwait_mutator;
              commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnFor(direction, amount, wait);
              prom = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
              if (wait) {
                _context3.next = 28;
                break;
              }
              _context3.next = 25;
              return prom;
            case 25:
              _context3.next = 27;
              return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(20);
            case 27:
              return _context3.abrupt("return", _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](5));
            case 28:
              return _context3.abrupt("return", prom);
            case 29:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function drivetrainTurnToObject(_x5, _x6) {
        return _drivetrainTurnToObject.apply(this, arguments);
      }
      return drivetrainTurnToObject;
    }()
  }, {
    key: "drivetrainTurnToHeading",
    value: function drivetrainTurnToHeading(args, util) {
      var heading = args.HEADING % 360;
      while (heading < 0) {
        heading += 360;
      }
      log.debug("heading:", heading);
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnToHeading(heading, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainTurnToRotation",
    value: function drivetrainTurnToRotation(args, util) {
      var rotation = args.ROTATION;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnToRotation(rotation, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainGoToObject",
    value: function () {
      var _drivetrainGoToObject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(args, util) {
        var key, wait, AIP, aiPort, sendCommandMessage, goToId, timeout, offset, getClosestObjectID, getDirection, getDistance, turnTo, driveFor;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              driveFor = function _driveFor(driveAmount) {
                log.debug("drive amount:", driveAmount);
                var drievCommandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].driveFor(_SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].forward, driveAmount, true);
                return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["drivetrainTimeoutWrapperSendCallback"])(drievCommandMessage, true, timeout, sendCommandMessage, function () {});
              };
              turnTo = function _turnTo(turnAmount, sendCallback) {
                log.debug("turn amount:", turnAmount);
                var turnCommandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnFor(_SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["DrivetrainDirection"].right, turnAmount, true);
                return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["drivetrainTimeoutWrapperSendCallback"])(turnCommandMessage, true, timeout, sendCommandMessage, sendCallback);
              };
              getDistance = function _getDistance(id) {
                if (id === "base") {
                  return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDistance(aiPort);
                }
                return AIP.getObjectValueByID(id, key, "Distance");
              };
              getDirection = function _getDirection(id) {
                if (id === "base") {
                  return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDirection(aiPort);
                }
                return AIP.getObjectValueByID(id, key, "Angle");
              };
              getClosestObjectID = function _getClosestObjectID() {
                // special result for home
                if (key === "base") {
                  return "base";
                }
                var object = AIP.getClosestObject("vision", key);
                if (object) {
                  return object.ID;
                }
                return null;
              };
              // constants
              key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
              wait = !args.anddontwait_mutator;
              AIP = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.processor;
              aiPort = this.getPortData("ai");
              AIP.setPort(aiPort);
              sendCommandMessage = self.VMWorkerAPI.sendCommandMessage;
              goToId = this.goToId;
              this.goToId++;
              timeout = this.drivetrainTimeoutMS;
              log.debug("go to object -", key, goToId, "- start - wait", wait);

              // offset is required due to size of rover. the offset amount changes based on target
              offset = key === "enemy" ? 85 : 35;
              /** will get the id of the current closest object that can be seen or null if none */
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
                  var stopCommandMessage, id, turnSendCallback, turnAmount, dist;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        // make sure we look like we are moving
                        _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["lockIsDrivingOn"](true);

                        // stop movement
                        log.debug("stop motion to make sure we get good sensor readings");
                        stopCommandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].stop();
                        _context7.next = 5;
                        return sendCommandMessage(stopCommandMessage);
                      case 5:
                        // wait for next sensor update
                        log.debug("wait after stop");
                        _context7.next = 8;
                        return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(10);
                      case 8:
                        log.debug("wait for sensor update");
                        _context7.next = 11;
                        return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
                      case 11:
                        _context7.next = 13;
                        return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
                      case 13:
                        // get the id for the object now that we are stable
                        id = getClosestObjectID();
                        if (id) {
                          _context7.next = 18;
                          break;
                        }
                        // nothing to drive to. clear the lock and return
                        _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["lockIsDrivingOn"](false);
                        resolve();
                        return _context7.abrupt("return");
                      case 18:
                        // this is how we return after sending the first turn command when we don't want to wait
                        turnSendCallback = /*#__PURE__*/function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                              while (1) switch (_context4.prev = _context4.next) {
                                case 0:
                                  log.debug("turn command - sent");
                                  if (wait) {
                                    _context4.next = 8;
                                    break;
                                  }
                                  _context4.next = 4;
                                  return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(20);
                                case 4:
                                  _context4.next = 6;
                                  return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](5);
                                case 6:
                                  log.debug("go to object -", key, "- returned - no wait");
                                  resolve();
                                case 8:
                                case "end":
                                  return _context4.stop();
                              }
                            }, _callee4);
                          }));
                          return function turnSendCallback() {
                            return _ref3.apply(this, arguments);
                          };
                        }();
                        _context7.prev = 19;
                        // first turn
                        turnAmount = getDirection(id);
                        _context7.next = 23;
                        return turnTo(turnAmount, turnSendCallback);
                      case 23:
                        if (wait) {
                          _context7.next = 35;
                          break;
                        }
                        dist = getDistance(id) - offset; // offset is needed for rover due to size
                        _context7.prev = 25;
                        _context7.next = 28;
                        return driveFor(dist);
                      case 28:
                        log.debug("go to object -", key, goToId, "- complete - no wait");
                        _context7.next = 34;
                        break;
                      case 31:
                        _context7.prev = 31;
                        _context7.t0 = _context7["catch"](25);
                        log.debug("go to object -", key, goToId, "- complete interrupted - no wait");
                      case 34:
                        return _context7.abrupt("return");
                      case 35:
                        _context7.next = 37;
                        return new Promise( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolveLoop, rejectLoop) {
                            var ignoreDriveCancel, isDriving, continueLoop, driveForWrapper, _driveForWrapper, angle, _dist;
                            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                              while (1) switch (_context6.prev = _context6.next) {
                                case 0:
                                  _driveForWrapper = function _driveForWrapper3() {
                                    _driveForWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(driveAmount) {
                                      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                                        while (1) switch (_context5.prev = _context5.next) {
                                          case 0:
                                            log.debug("driveForWrapper", ignoreDriveCancel, isDriving, continueLoop);
                                            _context5.prev = 1;
                                            isDriving = true;
                                            _context5.next = 5;
                                            return driveFor(driveAmount);
                                          case 5:
                                            isDriving = false;
                                            _context5.next = 16;
                                            break;
                                          case 8:
                                            _context5.prev = 8;
                                            _context5.t0 = _context5["catch"](1);
                                            isDriving = false;
                                            if (!ignoreDriveCancel) {
                                              _context5.next = 15;
                                              break;
                                            }
                                            return _context5.abrupt("return");
                                          case 15:
                                            throw _context5.t0;
                                          case 16:
                                          case "end":
                                            return _context5.stop();
                                        }
                                      }, _callee5, null, [[1, 8]]);
                                    }));
                                    return _driveForWrapper.apply(this, arguments);
                                  };
                                  driveForWrapper = function _driveForWrapper2(_x13) {
                                    return _driveForWrapper.apply(this, arguments);
                                  };
                                  ignoreDriveCancel = false;
                                  isDriving = false;
                                  continueLoop = true;
                                case 5:
                                  if (!continueLoop) {
                                    _context6.next = 26;
                                    break;
                                  }
                                  angle = getDirection(id);
                                  _dist = getDistance(id) - offset; // offset is needed for rover due to size
                                  if (!(_dist < 10)) {
                                    _context6.next = 12;
                                    break;
                                  }
                                  log.debug("reached target");
                                  resolveLoop();
                                  return _context6.abrupt("break", 26);
                                case 12:
                                  if (!(Math.abs(angle) > 5)) {
                                    _context6.next = 21;
                                    break;
                                  }
                                  ignoreDriveCancel = true;
                                  log.debug("before adjust turn:", ignoreDriveCancel, isDriving, continueLoop);
                                  _context6.next = 17;
                                  return turnTo(angle);
                                case 17:
                                  ignoreDriveCancel = false;
                                  log.debug("after adjust turn:", ignoreDriveCancel, isDriving, continueLoop);
                                  _context6.next = 24;
                                  break;
                                case 21:
                                  if (!isDriving) {
                                    driveForWrapper(_dist).then(function () {
                                      log.debug("wrapper returned", ignoreDriveCancel, isDriving, continueLoop);
                                      if (ignoreDriveCancel) {
                                        ignoreDriveCancel = false;
                                        return;
                                      }
                                      continueLoop = false;
                                      resolveLoop();
                                    })["catch"](function (err) {
                                      log.debug("wrapper rejected", ignoreDriveCancel, isDriving, continueLoop);
                                      continueLoop = false;
                                      resolveLoop();
                                    });
                                  }
                                  _context6.next = 24;
                                  return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(500);
                                case 24:
                                  _context6.next = 5;
                                  break;
                                case 26:
                                case "end":
                                  return _context6.stop();
                              }
                            }, _callee6);
                          }));
                          return function (_x11, _x12) {
                            return _ref4.apply(this, arguments);
                          };
                        }());
                      case 37:
                        log.debug("wait after stop");
                        _context7.next = 40;
                        return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(15);
                      case 40:
                        log.debug("wait for sensor update");
                        _context7.next = 43;
                        return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["waitForSensorUpdateMin"](3);
                      case 43:
                        // we have either reached our target or the command was interrupted
                        _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["lockIsDrivingOn"](false);
                        log.debug("go to object -", key, goToId, "- complete - wait");
                        resolve();
                        _context7.next = 53;
                        break;
                      case 48:
                        _context7.prev = 48;
                        _context7.t1 = _context7["catch"](19);
                        log.debug(_context7.t1);
                        _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["lockIsDrivingOn"](false);
                        resolve();
                      case 53:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7, null, [[19, 48], [25, 31]]);
                }));
                return function (_x9, _x10) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 17:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function drivetrainGoToObject(_x7, _x8) {
        return _drivetrainGoToObject.apply(this, arguments);
      }
      return drivetrainGoToObject;
    }()
  }, {
    key: "drivetrainStop",
    value: function drivetrainStop(args, util) {
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].stop();
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "drivetrainSetDriveVelocity",
    value: function drivetrainSetDriveVelocity(args, util) {
      var velocity = args.UNITS === "rpm" ? args.VELOCITY / this.drivetrainMaxRPM * 100 : args.VELOCITY;
      if (velocity < 1) {
        velocity = 1;
      } else if (velocity > 100) {
        velocity = 100;
      }
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].setDriveSpeed(velocity);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "drivetrainSetTurnVelocity",
    value: function drivetrainSetTurnVelocity(args, util) {
      var velocity = args.UNITS === "rpm" ? args.VELOCITY / this.drivetrainMaxRPM * 100 : args.VELOCITY;
      if (velocity < 1) {
        velocity = 1;
      } else if (velocity > 100) {
        velocity = 100;
      }
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].setTurnSpeed(velocity);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "drivetrainSetDriveTimeout",
    value: function drivetrainSetDriveTimeout(args, util) {
      this.drivetrainTimeoutMS = args.TIMEOUT * 1000;
    }
  }, {
    key: "drivetrainSetDriveHeading",
    value: function drivetrainSetDriveHeading(args, util) {
      var newHeading = (args.HEADING % 360 + 360) % 360;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].setHeading(newHeading);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["setWrapper"])(commandMessage, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainSetDriveRotation",
    value: function drivetrainSetDriveRotation(args, util) {
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].setRotation(args.HEADING);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["setWrapper"])(commandMessage, self.VMWorkerAPI.sendCommandMessage);
    }
    //#endregion Drivetrain Opcode Executors

    //#region Magnet Opcode Executors
  }, {
    key: "magnetSetState",
    value: function magnetSetState(args, util) {
      var port = this.getPortData("magnet");
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Electromagnet"].setState(args.ACTION, port);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
    //#endregion Magnet Opcode Executors

    //#region Actions Opcode Executors
  }, {
    key: "actionsMinerals",
    value: function actionsMinerals(args, util) {
      var action = args.ACTION === "use" ? "recharge" : args.ACTION;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Actions"].interact(action);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "actionsEnemy",
    value: function actionsEnemy(args, util) {
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Actions"].interact("attack");
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "actionsStandby",
    value: function actionsStandby(args, util) {
      var threshold = args.AMOUNT < 0 ? 0 : args.AMOUNT;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Actions"].standby(threshold);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
    //#endregion Actions Opcode Executors

    //#region Looks Opcode Executors
  }, {
    key: "looksPrint",
    value: function looksPrint(args, util) {
      var DATA = args.DATA;
      var printData = "";
      if (typeof DATA === "number") {
        var precision = parseInt(this.printPrecision) >= 0 ? parseInt(this.printPrecision) : 6;
        printData = DATA.toFixed(precision);
      } else if (typeof DATA === "boolean") {
        printData = DATA ? "TRUE" : "FALSE";
      } else if (typeof DATA === "string") {
        printData = DATA;
      } else {
        printData = "".concat(DATA);
      }
      self.VMWorkerAPI.sendPrintToConsole(printData);
      if (args.andsetcursortonextrow_mutator) {
        this.looksNextRow({}, {});
      }
    }
  }, {
    key: "looksNextRow",
    value: function looksNextRow(args, util) {
      self.VMWorkerAPI.sendNewLineToConsole();
      this.linesCalled++;
      if (Date.now() - this.lastSent > 10) {
        this.linesCalled = 0;
      }
      this.lastSent = Date.now();
      if (this.linesCalled > 10) {
        this.linesCalled = 0;
        return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(5);
      }
    }
  }, {
    key: "looksSetPrintPrecision",
    value: function looksSetPrintPrecision(args, util) {
      this.printPrecision = args.PRECISION;
    }
  }, {
    key: "looksClearAllRows",
    value: function looksClearAllRows(args, util) {
      self.VMWorkerAPI.sendClearPrintConsole();
    }
  }, {
    key: "getPrintConsoleColorEnum",
    value: function getPrintConsoleColorEnum(colorString) {
      if (colorString === "red") {
        return _SimWindow_messageEnums__WEBPACK_IMPORTED_MODULE_8__["SimPrintColorEnum"].red;
      } else if (colorString === "green") {
        return _SimWindow_messageEnums__WEBPACK_IMPORTED_MODULE_8__["SimPrintColorEnum"].green;
      } else if (colorString === "blue") {
        return _SimWindow_messageEnums__WEBPACK_IMPORTED_MODULE_8__["SimPrintColorEnum"].blue;
      } else {
        // make black the default
        return _SimWindow_messageEnums__WEBPACK_IMPORTED_MODULE_8__["SimPrintColorEnum"].black;
      }
    }
  }, {
    key: "looksSetPrintColor",
    value: function looksSetPrintColor(args, util) {
      self.VMWorkerAPI.sendSetPrintConsoleColor(this.getPrintConsoleColorEnum(args.COLORS));
    }
  }, {
    key: "looksMovePen",
    value: function () {
      var _looksMovePen = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(args, util) {
        var penPos, penPort, commandMessage;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              penPos = args.DIRECTIONS === "up" ? _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["PenPosition"].Up : _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["PenPosition"].Down;
              penPort = this.getPortData("pen");
              ;
              commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Looks"].movePen(penPos, penPort);
              return _context9.abrupt("return", self.VMWorkerAPI.sendCommandMessage(commandMessage));
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function looksMovePen(_x14, _x15) {
        return _looksMovePen.apply(this, arguments);
      }
      return looksMovePen;
    }()
  }, {
    key: "getPenColorCode",
    value: function getPenColorCode(colorString) {
      if (colorString === "red") {
        return _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["PenColor"].Red;
      } else if (colorString === "green") {
        return _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["PenColor"].Green;
      } else if (colorString === "blue") {
        return _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["PenColor"].Blue;
      } else {
        // make black the default
        return _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["PenColor"].Black;
      }
    }
  }, {
    key: "looksSetPenColor",
    value: function looksSetPenColor(args, util) {
      log.debug("pen color: ", args.COLORS);
      var penPort = this.getPortData("pen");
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Looks"].setPen(this.getPenColorCode(args.COLORS), penPort);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "looksSetPenColorPlus",
    value: function looksSetPenColorPlus(args, util) {
      log.debug("pen color: ", args);
      var values = args.COLOR.substring(1);
      var color = Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_9__["getColorFromHex"])(values);
      var penPort = this.getPortData("pen");
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Looks"].setPenColorPlus(color.r, color.g, color.b, color.a, penPort);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "looksFillPenColorPlus",
    value: function looksFillPenColorPlus(args, util) {
      log.debug("pen color: ", args);
      var values = args.COLOR.substring(1);
      var color = Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_9__["getColorFromHex"])(values);
      var penPort = this.getPortData("pen");
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Looks"].fillPenColorPlus(color.r, color.g, color.b, color.a, penPort);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "getPenWidthValue",
    value: function getPenWidthValue(label) {
      switch (label) {
        case "extra_thin":
          return 5;
        case "thin":
          return 20;
        case "medium":
          return 40;
        case "wide":
          return 60;
        case "extra_wide":
          return 80;
      }
    }
  }, {
    key: "looksSetPenWidth",
    value: function looksSetPenWidth() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        WIDTHS: "thin"
      };
      var util = arguments.length > 1 ? arguments[1] : undefined;
      log.debug("pen width: ", args);
      var widthValue = this.getPenWidthValue(args.WIDTHS);
      var penPort = this.getPortData("pen");
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Looks"].setPenWidth(widthValue, penPort);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
    //#endregion Looks Opcode Executors

    //#region Sounds Opcode Executors
  }, {
    key: "getSoundValue",
    value: function getSoundValue(sound) {
      switch (sound) {
        case "honk":
          return 19;
        case "doorbell":
          return 18;
        case "crash":
          return 11;
        case "random":
          var soundValues = [19, 18, 11];
          return soundValues[randomIntFromInterval(0, soundValues.length - 1)];
        default:
          return 19;
      }
    }
  }, {
    key: "playSound",
    value: function playSound(args, util) {
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Actions"].playSound(this.getSoundValue(args.SOUND));
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
    //#endregion Sounds Opcode Executors

    //#region VR123 Opcode Executors
  }, {
    key: "getGlowValue",
    value: function getGlowValue(color) {
      switch (color) {
        case "green":
          return 2;
        case "blue":
          return 3;
        case "purple":
          return 6;
        default:
          return 0;
      }
    }
  }, {
    key: "glow",
    value: function glow(args, util) {
      var port = this.getPortData("led");
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["LED"].glow(this.getGlowValue(args.COLOR), port);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "getActValue",
    value: function getActValue(color) {
      switch (color) {
        case "happy":
          return 1;
        case "sad":
          return 2;
        case "crazy":
          return 3;
        default:
          return 0;
      }
    }
  }, {
    key: "actionsAct",
    value: function actionsAct(args, util) {
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Actions"].act(this.getActValue(args.ACT));
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
    //#endregion VR123 Opcode Executors

    //#region Control Opcode Executors
  }, {
    key: "controlBreak",
    value: function controlBreak(args, util) {
      var stack = util.thread.stack;
      var stackLen = stack.length;
      var popCount = 0;
      var isAtLoop = false;
      while (!isAtLoop) {
        popCount++;
        var index = stackLen - popCount - 1;
        if (index === -1) {
          return;
        }
        var id = stack[index];
        var topBlock = util.target.blocks.getBlock(id);
        var topOp = topBlock.opcode;
        isAtLoop = topOp === "control_repeat" || topOp === "control_repeat_until" || topOp === "control_while" || topOp === "control_for_each" || topOp === "control_forever";
      }
      for (var i = 0; i < popCount; i++) {
        util.thread.popStack();
      }
      util.thread.goToNextBlock();
    }
  }, {
    key: "controlStopProject",
    value: function controlStopProject(args, util) {
      util.stopAll();
      self.VMWorkerAPI.handleStopInterpreter({
        command: "StopInterpreter"
      });
      self.VMWorkerAPI.sendProgramMessage({
        device: "program",
        command: "stop"
      });
    }
    //#endregion Control Opcode Executors

    //#region Input Opcode Executors

    //#endregion Input Opcode Executors

    //#region Sensing Opcode Executors
  }, {
    key: "sensingResetTimer",
    value: function sensingResetTimer(args, util) {
      PGBlocks.timer.reset();
    }
  }, {
    key: "sensingTimerInSeconds",
    value: function sensingTimerInSeconds(args, util) {
      return PGBlocks.timer.getTime() / 1000;
    }
  }, {
    key: "sensingRoverBatteryCapacity",
    value: function sensingRoverBatteryCapacity(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.batteryCapacity(port);
    }
  }, {
    key: "sensingRoverBatteryStored",
    value: function sensingRoverBatteryStored(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.batteryStored(port, "back");
    }
  }, {
    key: "sensingRoverLocation",
    value: function sensingRoverLocation(args, util) {
      var port = this.getPortData("ai");
      var playerPosition = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.playerPosition(port, args.AXIS.toUpperCase());
      if (args.UNIT === "inches") {
        playerPosition = playerPosition / 25.4;
      }
      return playerPosition;
    }
  }, {
    key: "sensingRoverLevel",
    value: function sensingRoverLevel(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.playerLevel(port);
    }
  }, {
    key: "sensingRoverExp",
    value: function sensingRoverExp(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.playerExp(port);
    }
  }, {
    key: "sensingRoverCarryCapacity",
    value: function sensingRoverCarryCapacity(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.playerCapacity(port);
    }
  }, {
    key: "sensingDriveIsDone",
    value: function sensingDriveIsDone(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Drivetrain.isDone();
    }
  }, {
    key: "sensingDriveIsMoving",
    value: function sensingDriveIsMoving(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Drivetrain.isMoving();
    }

    /**
    * For GO Mars, isCrashDetected is part of Drivetrain
    */
  }, {
    key: "sensingCrashDetected",
    value: function sensingCrashDetected(args, util) {
      var port = this.getPortData("drivetrain");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Gyro.crashDetected(port);
    }
  }, {
    key: "sensingDriveHeading",
    value: function sensingDriveHeading(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Drivetrain.heading();
    }
  }, {
    key: "sensingDriveRotation",
    value: function sensingDriveRotation(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Drivetrain.rotation();
    }
  }, {
    key: "sensingBumperPressed",
    value: function sensingBumperPressed(args, util) {
      var port = this.getPortData(args.BUMPER.toLowerCase());
      var value = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Bumper.pressed(port);
      return value;
    }
  }, {
    key: "sensingOpticalDetectsObject",
    value: function sensingOpticalDetectsObject(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.nearObject(port);
    }
  }, {
    key: "colorNumberToName",
    value: function colorNumberToName(colorNum) {
      switch (colorNum) {
        case 0:
          return "none";
        case 1:
          return "red";
        case 2:
          return "green";
        case 3:
          return "blue";
        case 4:
          return "yellow";
        case 5:
          return "orange";
        case 6:
          return "purple";
        case 8:
          return "white";
        case 9:
          return "red violet";
        case 10:
          return "violet";
        case 11:
          return "blue violet";
        case 12:
          return "blue green";
        case 13:
          return "yellow green";
        case 14:
          return "yellow orange";
        case 15:
          return "red orange";
        default:
          return "none";
      }
    }
  }, {
    key: "sensingOpticalDetectsColor",
    value: function sensingOpticalDetectsColor(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.color(port);
      var colorName = this.colorNumberToName(sensorColor).replace(/ /g, "_");
      return colorName === args.COLORS;
    }

    // We want to return true if the value sensed has all RGB values between the given RGB values
  }, {
    key: "sensingOpticalDetectsColorPlus",
    value: function sensingOpticalDetectsColorPlus(args, util) {
      log.debug("sensingOpticalDetectsColorPlus: ", args);
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.colorPlus(port);
      var valuesStart = args.COLOR1.substring(1);
      var valuesEnd = args.COLOR2.substring(1);
      var colorStart = Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_9__["getColorFromHex"])(valuesStart);
      var colorEnd = Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_9__["getColorFromHex"])(valuesEnd);
      var betweenRed = this.getValueBetween(sensorColor.R, colorStart.r, colorEnd.r);
      var betweenGreen = this.getValueBetween(sensorColor.G, colorStart.g, colorEnd.g);
      var betweenBlue = this.getValueBetween(sensorColor.B, colorStart.b, colorEnd.b);
      return betweenRed && betweenBlue && betweenGreen;
    }
  }, {
    key: "sensingOpticalRGBPlus",
    value: function sensingOpticalRGBPlus(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      log.debug("sensingOpticalRGBPlus: ", args);
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.colorPlus(port);
      switch (args.RGB.toLocaleLowerCase()) {
        case "red":
          return sensorColor.R;
        case "green":
          return sensorColor.G;
        case "blue":
          return sensorColor.B;
      }
      return 0;
    }
  }, {
    key: "getValueBetween",
    value: function getValueBetween(compValue, value1, value2) {
      var largerValue = value1;
      var smallerValue = value2;
      if (value2 > value1) {
        largerValue = value2;
        smallerValue = value1;
      }
      return compValue >= smallerValue && compValue <= largerValue;
    }
  }, {
    key: "sensingOpticalBrightness",
    value: function sensingOpticalBrightness(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.brightness(port);
    }

    // sensingDistanceFoundObject(args: { DISTANCE: string }, util: any) {
    //   return SensorValues.VR.Distance.objectFound();
    // }

    // sensingDistanceFromObject(args: { POSITION: string, UNITS: string }, util: any) {
    //   let distance = SensorValues.VR.Distance.distance();
    //   if (args.UNITS === "inches") {
    //     distance = distance / 25.4;
    //   }
    //   return distance;
    // }
  }, {
    key: "sensingDistanceFoundObjectPlus",
    value: function sensingDistanceFoundObjectPlus(args, util) {
      var port = this.getPortData(args.DISTANCE);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Distance.objectFound(port);
    }
  }, {
    key: "sensingDistanceFromObjectPlus",
    value: function sensingDistanceFromObjectPlus(args, util) {
      var port = this.getPortData(args.DISTANCE);
      var distance = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Distance.distance(port);
      if (args.UNITS === "inches" || args.UNITS === "in") {
        distance = distance / 25.4;
      }
      return distance;
    }
  }, {
    key: "sensingGPSPosition",
    value: function sensingGPSPosition(args, util) {
      var port = this.getPortData("location");
      var position = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Position.location(port, args.LOCATION);
      if (args.UNITS === "inches" || args.UNITS === "in") {
        position = position / 25.4;
      }
      return position;
    }
  }, {
    key: "sensingGPSHeading",
    value: function sensingGPSHeading(args, util) {
      var port = this.getPortData("location");
      var angle = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].Position.angle(port);
      return angle;
    }
  }, {
    key: "sensingGPSPositionSkills",
    value: function sensingGPSPositionSkills(args, util) {
      var port = this.getPortData(args.GPS.toLowerCase());
      var position;
      if (args.POSITION === "x" || args.POSITION === "X") {
        position = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].GPS.x(port);
      } else if (args.POSITION === "y" || args.POSITION === "Y") {
        position = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].GPS.y(port);
      }
      if (args.UNITS === "inches" || args.UNITS === "in") {
        position = position / 25.4;
      }
      return position;
    }
  }, {
    key: "sensingGPSHeadingSkills",
    value: function sensingGPSHeadingSkills(args, util) {
      var port = this.getPortData(args.GPS.toLowerCase());
      var angle = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].GPS.angle(port);
      return angle;
    }
  }, {
    key: "sensingRotationSetPosition",
    value: function sensingRotationSetPosition(args, util) {
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Rotation"].setPosition(args.POSITION);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "sensingRotationAngle",
    value: function sensingRotationAngle(args, util) {
      var port = this.getPortData(args.ROTATION);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Rotation"].angle(port);
    }
  }, {
    key: "sensingRotationPosition",
    value: function sensingRotationPosition(args, util) {
      var port = this.getPortData(args.ROTATION);
      var position = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Rotation"].position(port);
      if (args.UNITS === "rev") {
        position = position / 360;
      }
      return position;
    }
  }, {
    key: "sensingRotationVelocity",
    value: function sensingRotationVelocity(args, util) {
      var port = this.getPortData(args.ROTATION);
      var velocity = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Rotation"].velocity(port);
      if (args.UNITS === "rpm") {
        velocity = velocity / 6;
      }
      return velocity;
    }
  }, {
    key: "sensingUnderAttack",
    value: function sensingUnderAttack(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.playerUnderAttack(port);
    }
  }, {
    key: "sensingEnemyCharge",
    value: function () {
      var _sensingEnemyCharge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(args, util) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValueWithWait"]("vision", "Health", {
                OBJECT: "enemy"
              });
            case 2:
              return _context10.abrupt("return", _context10.sent);
            case 3:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function sensingEnemyCharge(_x16, _x17) {
        return _sensingEnemyCharge.apply(this, arguments);
      }
      return sensingEnemyCharge;
    }()
  }, {
    key: "sensingEnemyLevel",
    value: function () {
      var _sensingEnemyLevel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(args, util) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValueWithWait"]("vision", "Level", {
                OBJECT: "enemy"
              });
            case 2:
              return _context11.abrupt("return", _context11.sent);
            case 3:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function sensingEnemyLevel(_x18, _x19) {
        return _sensingEnemyLevel.apply(this, arguments);
      }
      return sensingEnemyLevel;
    }()
  }, {
    key: "sensingAISmells",
    value: function sensingAISmells(args, util) {
      var key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIObjectPresentWithWait"]("smell", key);
    }
  }, {
    key: "sensingAISees",
    value: function sensingAISees(args, util) {
      var key = args.OBJECT === "minerals" ? "battery" : args.OBJECT === "base" ? "home" : args.OBJECT;
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIObjectPresentWithWait"]("vision", key);
    }

    // Currently not used
  }, {
    key: "sensingAISmellsDirection",
    value: function sensingAISmellsDirection(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValueWithWait"]("smell", "Angle", {
        OBJECT: args.OBJECT
      });
    }
  }, {
    key: "sensingAISeesDirection",
    value: function () {
      var _sensingAISeesDirection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(args, util) {
        var key, port;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
              port = this.getPortData("ai");
              if (!(key === "base")) {
                _context12.next = 6;
                break;
              }
              _context12.t0 = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDirection(port);
              _context12.next = 9;
              break;
            case 6:
              _context12.next = 8;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValueWithWait"]("vision", "Angle", {
                OBJECT: key
              });
            case 8:
              _context12.t0 = _context12.sent;
            case 9:
              return _context12.abrupt("return", _context12.t0);
            case 10:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function sensingAISeesDirection(_x20, _x21) {
        return _sensingAISeesDirection.apply(this, arguments);
      }
      return sensingAISeesDirection;
    }()
  }, {
    key: "sensingAISeesDistance",
    value: function () {
      var _sensingAISeesDistance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(args, util) {
        var key, port, distance;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
              port = this.getPortData("ai");
              if (!(key === "base")) {
                _context13.next = 6;
                break;
              }
              _context13.t0 = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDistance(port);
              _context13.next = 9;
              break;
            case 6:
              _context13.next = 8;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValueWithWait"]("vision", "Distance", {
                OBJECT: key
              });
            case 8:
              _context13.t0 = _context13.sent;
            case 9:
              distance = _context13.t0;
              if (args.UNIT === "inches") {
                distance = distance / 25.4;
              }
              return _context13.abrupt("return", distance);
            case 12:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function sensingAISeesDistance(_x22, _x23) {
        return _sensingAISeesDistance.apply(this, arguments);
      }
      return sensingAISeesDistance;
    }()
  }, {
    key: "sensingAISeesLocation",
    value: function () {
      var _sensingAISeesLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(args, util) {
        var key, port, location;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              key = args.OBJECT === "minerals" ? "battery" : args.OBJECT;
              port = this.getPortData("ai");
              if (!(key === "rover")) {
                _context14.next = 6;
                break;
              }
              _context14.t0 = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.playerPosition(port, args.AXIS.toUpperCase());
              _context14.next = 14;
              break;
            case 6:
              if (!(key === "base")) {
                _context14.next = 10;
                break;
              }
              _context14.t1 = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeLocation(port, args.AXIS);
              _context14.next = 13;
              break;
            case 10:
              _context14.next = 12;
              return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["getCurrentAIValueWithWait"]("vision", "Location", {
                OBJECT: key,
                AXIS: args.AXIS
              });
            case 12:
              _context14.t1 = _context14.sent;
            case 13:
              _context14.t0 = _context14.t1;
            case 14:
              location = _context14.t0;
              if (args.UNIT === "inches") {
                location = location / 25.4;
              }
              return _context14.abrupt("return", location);
            case 17:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function sensingAISeesLocation(_x24, _x25) {
        return _sensingAISeesLocation.apply(this, arguments);
      }
      return sensingAISeesLocation;
    }()
  }, {
    key: "sensingHomeDirection",
    value: function sensingHomeDirection(args, util) {
      var port = this.getPortData("ai");
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDirection(port);
    }
  }, {
    key: "sensingHomeDistance",
    value: function sensingHomeDistance(args, util) {
      var port = this.getPortData("ai");
      var distance = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeDistance(port);
      if (args.UNIT === "inches") {
        distance = distance / 25.4;
      }
      return distance;
    }
  }, {
    key: "sensingHomeLocation",
    value: function sensingHomeLocation(args, util) {
      var port = this.getPortData("ai");
      var location = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].AI.homeLocation(port, args.AXIS);
      if (args.UNIT === "inches") {
        location = location / 25.4;
      }
      return location;
    }
    //#endregion Sensing Opcode Executors
  }, {
    key: "sensingDriveVelocity",
    value: function sensingDriveVelocity(args, util) {
      var velocity = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Drivetrain"].velocity();
      if (args.UNITS === "rpm") {
        velocity = velocity * this.drivetrainMaxRPM / 100;
      }
      return velocity;
    }
  }, {
    key: "sensingMotorIsDone",
    value: function sensingMotorIsDone(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].isDone(port);
    }
  }, {
    key: "sensingMotorIsSpinning",
    value: function sensingMotorIsSpinning(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].isMoving(port);
    }
  }, {
    key: "sensingMotorPosition",
    value: function sensingMotorPosition(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var position = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].position(port);
      if (args.UNITS === "rev") {
        position = position / 360;
      }
      return position;
    }
  }, {
    key: "sensingMotorVelocity",
    value: function sensingMotorVelocity(args, util) {
      var port = this.getPortData(args.MOTOR);
      var motor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["sensorValues"][port];
      var velocity = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].velocity(port);
      if (args.UNITS === "rpm") {
        velocity = velocity * (this.motorMaxRPM ? this.motorMaxRPM : 600) / 100;
      }
      return velocity;
    }
  }, {
    key: "sensingOpticalFoundAnObject",
    value: function sensingOpticalFoundAnObject(args, util) {
      var port = this.getPortData(args.OPTICAL);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].isObjectFound(port);
    }
  }, {
    key: "sensingOpticalHue",
    value: function sensingOpticalHue(args, util) {
      var port = this.getPortData(args.OPTICAL);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].hue(port);
    }
  }, {
    key: "sensingColorFoundAnObject",
    value: function sensingColorFoundAnObject(args, util) {
      var port = this.getPortData(args.COLORSENSOR);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Color"].isObjectFound(port) === 1;
    }
  }, {
    key: "sensingColorDetectsColor",
    value: function sensingColorDetectsColor(args, util) {
      var port = this.getPortData(args.COLORSENSOR.toLowerCase());
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Color"].color(port);
      var colorName = this.colorNumberToName(sensorColor).replace(/ /g, "_");
      return colorName === args.color;
    }
  }, {
    key: "sensingColorColorOf",
    value: function sensingColorColorOf(args, util) {
      var port = this.getPortData(args.COLORSENSOR.toLowerCase());
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Color"].color(port);
      return this.colorNumberToName(sensorColor);
    }
  }, {
    key: "sensingColorBrightness",
    value: function sensingColorBrightness(args, util) {
      var port = this.getPortData(args.COLORSENSOR.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Color"].brightness(port);
    }
  }, {
    key: "sensingColorHue",
    value: function sensingColorHue(args, util) {
      var port = this.getPortData(args.COLORSENSOR.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Color"].hue(port);
    }
  }, {
    key: "sensingObjectIsNear",
    value: function sensingObjectIsNear(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].isObjectFound(port);
    }
  }, {
    key: "sensingOpticalColorOf",
    value: function sensingOpticalColorOf(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].color(port);
      return this.colorNumberToName(sensorColor);
    }
  }, {
    key: "sensingOpticalBrightnessOf",
    value: function sensingOpticalBrightnessOf(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].brightness(port);
    }
  }, {
    key: "sensingOpticalHueOf",
    value: function sensingOpticalHueOf(args, util) {
      var port = this.getPortData(args.OPTICAL.toLowerCase());
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].hue(port);
    }

    // sensingLineBrightness() {

    // }
    // sensingLineDetected() {

    // }
  }, {
    key: "sensing123DetectsObject",
    value: function sensing123DetectsObject(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.nearObject(3);
    }
  }, {
    key: "sensing123Hue",
    value: function sensing123Hue(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].hue(3);
    }
  }, {
    key: "sensing123BrightObject",
    value: function sensing123BrightObject(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.brightness(3) >= 70;
    }
  }, {
    key: "sensing123EyeBrightness",
    value: function sensing123EyeBrightness(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["VR"].ColorSensor.brightness(3);
    }
  }, {
    key: "sensing123EyeColorDetected",
    value: function sensing123EyeColorDetected(args) {
      var sensorColor = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Color"].color(3);
      return this.colorNumberToName(sensorColor) === args.COLORS;
    }

    // sensingSetGyroHeading(args: { GYRO: string, VALUE: number }, util: any) {
    //   const port = this.getPortData(args.GYRO);
    //   const newHeading = ((args.VALUE % 360) + 360) % 360;
    //   const commandMessage = MessageHelpers.Gyro.setHeading(port, newHeading, "degrees");
    //   return setWrapper(commandMessage, self.VMWorkerAPI.sendCommandMessage);
    // }

    // sensingSetGyroRotation(args: { GYRO: string, VALUE: number }, util: any) {
    //   const port = this.getPortData(args.GYRO);
    //   const newHeading = ((args.VALUE % 360) + 360) % 360;
    //   const commandMessage = MessageHelpers.Gyro.setHeading(port, newHeading, "degrees");
    //   return setWrapper(commandMessage, self.VMWorkerAPI.sendCommandMessage);
    // }

    // sensingGyroHeading(args: { GYRO: string }, util: any) {
    //   const port = this.getPortData(args.GYRO);
    //   return SensorValues.Gyro.heading(port);
    // }

    // sensingGyroRotation(args: { GYRO: string }, util: any) {
    //   const port = this.getPortData(args.GYRO);
    //   return SensorValues.Gyro.rotation(port);
    // }
  }, {
    key: "sensingDistanceFoundObject",
    value: function sensingDistanceFoundObject(args, util) {
      var port = this.getPortData(args.DISTANCE);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Distance"].isObjectFound(port) === 1;
    }
  }, {
    key: "sensingDistanceFromObject",
    value: function sensingDistanceFromObject(args, util) {
      var port = this.getPortData(args.DISTANCE);
      var distance = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Distance"].distance(port);
      if (args.UNITS === "inches" || args.UNITS === "in") {
        distance = distance / 25.4;
      }
      return distance;
    }
  }, {
    key: "sensingLineTrackerReflectivityOf",
    value: function sensingLineTrackerReflectivityOf(args, util) {
      var port = this.getPortData(args.LINETRACKER);
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["LineTracker"].reflectivity(port);
    }

    //#region Variable Opcode Executors
  }, {
    key: "setListTo",
    value: function setListTo(args, util) {
      var list = util.target.lookupOrCreateList(args.LIST.id, args.LIST.name);
      for (var property in args) {
        if (args.hasOwnProperty(property) && property.startsWith("VALUE")) {
          var index = parseInt(property.match(/\d+$/gm)[0]);
          if (index < list.value.length) {
            list.value[index] = parseInt(args[property]);
          }
        }
      }
    }
    //#endregion Variable Opcode Executors

    //#region Helpers
  }, {
    key: "getPortData",
    value: function getPortData(deviceName) {
      var config = self.VMWorkerAPI.getRobotConfig();
      var port = 0;
      config.devices.forEach(function (dist) {
        if (dist.instanceName.toLowerCase() === deviceName) {
          port = dist.port;
        }
      });
      return port;
    }
  }, {
    key: "getMotorData",
    value: function getMotorData() {
      var config = self.VMWorkerAPI.getRobotConfig();
      var motors = [];
      // log.warn("config:", config);
      config.devices.forEach(function (dist) {
        if (dist.type === "motor") {
          motors.push(dist);
        }
      });
      return motors;
    }
    //#endregion
  }]);
  return PGBlocks;
}(_Extension__WEBPACK_IMPORTED_MODULE_1__["ExtensionBase"]);
/**
* This function picks a random integer from a given range of [min,max) where min is 
* greater than or equal to zero
* @param min lowest number that can be returned
* @param max highest number that can be returned
* @return Random integer chosen between a range of two given integers
*/
_defineProperty(PGBlocks, "timer", new _VexcodeTimer__WEBPACK_IMPORTED_MODULE_6__["VexcodeTimer"](0, true));
function randomIntFromInterval(min, max) {
  // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


/***/ }),

/***/ "./src/Blockly/Extensions/utils/defaults.ts":
/*!**************************************************!*\
  !*** ./src/Blockly/Extensions/utils/defaults.ts ***!
  \**************************************************/
/*! exports provided: getDrivetrainDefaults, getMotorDefaults, getMagnetDefaults, getActionDefaults, getSoundDefault, getSoundDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDrivetrainDefaults", function() { return getDrivetrainDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorDefaults", function() { return getMotorDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMagnetDefaults", function() { return getMagnetDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActionDefaults", function() { return getActionDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSoundDefault", function() { return getSoundDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSoundDefaults", function() { return getSoundDefaults; });
//#region Drivetrain Defaults
function getDrivetrainDefaults() {
  return {
    driveDirection: "fwd",
    turnDirection: "right",
    distanceUnit: "mm",
    velocityUnit: "pct",
    obstacle: "object"
  };
}
//#endregion Drivetrain Defaults

//#region Motion Defaults
function getMotorDefaults() {
  return {
    motor: "ArmMotor",
    direction: "fwd",
    positionUnit: "deg",
    velocityUnit: "pct"
  };
}
//#endregion Motion Defaults

//#region Magnet defaults
function getMagnetDefaults() {
  return {
    magnet: "Magnet",
    action: "boost"
  };
}
//#endregion Magnet defaults

//#region Action Defaults
function getActionDefaults() {
  return {
    food: "pickup",
    enemy: "attack",
    act: "sad"
  };
}
//#endregion Action Defaults

function getSoundDefault() {
  return "sounda";
}
function getSoundDefaults() {
  return {
    play: "honk"
  };
}


/***/ }),

/***/ "./src/Blockly/Extensions/utils/index.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Extensions/utils/index.ts ***!
  \***********************************************/
/*! exports provided: Block, BlockArgument, ExtensionInfo, TimeoutArgs, DriveArgs, DriveForArgs, TurnArgs, TurnForArgs, TurnToObjectArgs, TurnToHeadingRotationArgs, SetHeadingRotationArgs, SetDriveTurnVelocityArgs, MotorInstanceArgs, SpinArgs, SpinForArgs, SpinToArgs, SetPositionArgs, SetVelocityArgs, PositionVelocityArgs, MagnetStateArgs, ArgumentTypes, BlockTypes, getDrivetrainDefaults, getMotorDefaults, getMagnetDefaults, getActionDefaults, getSoundDefault, getSoundDefaults, drivetrainTimeoutWrapper, motorTimeoutWrapper, setWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "./src/Blockly/Extensions/utils/interfaces.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Block", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["Block"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlockArgument", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["BlockArgument"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtensionInfo", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["ExtensionInfo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeoutArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["TimeoutArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["DriveArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveForArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["DriveForArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TurnArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["TurnArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TurnForArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["TurnForArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TurnToObjectArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["TurnToObjectArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TurnToHeadingRotationArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["TurnToHeadingRotationArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetHeadingRotationArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SetHeadingRotationArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetDriveTurnVelocityArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SetDriveTurnVelocityArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MotorInstanceArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["MotorInstanceArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpinArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SpinArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpinForArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SpinForArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpinToArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SpinToArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetPositionArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SetPositionArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetVelocityArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["SetVelocityArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PositionVelocityArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["PositionVelocityArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MagnetStateArgs", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_0__["MagnetStateArgs"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/Blockly/Extensions/utils/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArgumentTypes", function() { return _types__WEBPACK_IMPORTED_MODULE_1__["ArgumentTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlockTypes", function() { return _types__WEBPACK_IMPORTED_MODULE_1__["BlockTypes"]; });

/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults */ "./src/Blockly/Extensions/utils/defaults.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDrivetrainDefaults", function() { return _defaults__WEBPACK_IMPORTED_MODULE_2__["getDrivetrainDefaults"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMotorDefaults", function() { return _defaults__WEBPACK_IMPORTED_MODULE_2__["getMotorDefaults"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMagnetDefaults", function() { return _defaults__WEBPACK_IMPORTED_MODULE_2__["getMagnetDefaults"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getActionDefaults", function() { return _defaults__WEBPACK_IMPORTED_MODULE_2__["getActionDefaults"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSoundDefault", function() { return _defaults__WEBPACK_IMPORTED_MODULE_2__["getSoundDefault"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSoundDefaults", function() { return _defaults__WEBPACK_IMPORTED_MODULE_2__["getSoundDefaults"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/Blockly/Extensions/utils/helpers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drivetrainTimeoutWrapper", function() { return _helpers__WEBPACK_IMPORTED_MODULE_3__["drivetrainTimeoutWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "motorTimeoutWrapper", function() { return _helpers__WEBPACK_IMPORTED_MODULE_3__["motorTimeoutWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setWrapper", function() { return _helpers__WEBPACK_IMPORTED_MODULE_3__["setWrapper"]; });






/***/ }),

/***/ "./src/Blockly/Extensions/utils/interfaces.ts":
/*!****************************************************!*\
  !*** ./src/Blockly/Extensions/utils/interfaces.ts ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/Blockly/Extensions/utils/types.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Extensions/utils/types.ts ***!
  \***********************************************/
/*! exports provided: ArgumentTypes, BlockTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rm_vca_scratch_vm_src_extension_support_argument_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/scratch-vm/src/extension-support/argument-type */ "./node_modules/@rm-vca/scratch-vm/src/extension-support/argument-type.js");
/* harmony import */ var _rm_vca_scratch_vm_src_extension_support_argument_type__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_scratch_vm_src_extension_support_argument_type__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "ArgumentTypes", function() { return _rm_vca_scratch_vm_src_extension_support_argument_type__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var _rm_vca_scratch_vm_src_extension_support_block_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rm-vca/scratch-vm/src/extension-support/block-type */ "./node_modules/@rm-vca/scratch-vm/src/extension-support/block-type.js");
/* harmony import */ var _rm_vca_scratch_vm_src_extension_support_block_type__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_scratch_vm_src_extension_support_block_type__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "BlockTypes", function() { return _rm_vca_scratch_vm_src_extension_support_block_type__WEBPACK_IMPORTED_MODULE_1___default.a; });




/***/ }),

/***/ "./src/Blockly/Helpers/Helpers.ts":
/*!****************************************!*\
  !*** ./src/Blockly/Helpers/Helpers.ts ***!
  \****************************************/
/*! exports provided: getColorFromHex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColorFromHex", function() { return getColorFromHex; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Helpers");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

function getColorFromHex(hex) {
  var r = parseInt(hex.slice(0, 2), 16);
  var g = parseInt(hex.slice(2, 4), 16);
  var b = parseInt(hex.slice(4, 6), 16);
  var a = hexToAlpha(hex.slice(6));
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
function hexToAlpha(hex) {
  var intValue = parseInt(hex, 16);
  return Math.ceil(intValue / 255 * 100);
}


/***/ }),

/***/ "./src/VexcodeTimer.ts":
/*!*****************************!*\
  !*** ./src/VexcodeTimer.ts ***!
  \*****************************/
/*! exports provided: VexcodeTimer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VexcodeTimer", function() { return VexcodeTimer; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var VexcodeTimer = /*#__PURE__*/function () {
  /**
   * used as a generic timer with pause support
   * @param initialTime initial timer value in ms
   * @param countUp true if the timer should increase over time
   */
  function VexcodeTimer(initialTime, countUp) {
    _classCallCheck(this, VexcodeTimer);
    _defineProperty(this, "finalTimeMS", null);
    this.initialTime = initialTime;
    this.countUp = countUp;
    this.reset();
  }

  /**
   * resets the timer to the iinitial conditions and starts the timer again
   */
  _createClass(VexcodeTimer, [{
    key: "reset",
    value: function reset() {
      var startTimer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.startTimeMS = new Date().getTime();
      this.pauseStartTimeMS = null;
      this.timerOffsetMS = 0;
      this.finalTimeMS = startTimer ? null : 0;
    }

    /**
     * stops the timer and locks the returned value
     */
  }, {
    key: "stop",
    value: function stop() {
      this.finalTimeMS = this.getTime();
    }

    /**
     * pauses the timer
     */
  }, {
    key: "pause",
    value: function pause() {
      var now = new Date().getTime();
      if (!this.pauseStartTimeMS) {
        this.pauseStartTimeMS = now;
      }
    }

    /**
     * resume the timer counting after a pause
     */
  }, {
    key: "resume",
    value: function resume() {
      var now = new Date().getTime();
      if (this.pauseStartTimeMS) {
        this.timerOffsetMS += now - this.pauseStartTimeMS;
        this.pauseStartTimeMS = null;
      }
    }

    /**
     * returns the current timer value in ms
     */
  }, {
    key: "getTime",
    value: function getTime() {
      var now = new Date().getTime();
      if (this.finalTimeMS != null) {
        return this.finalTimeMS;
      }
      var pauseOffset = 0;
      if (this.pauseStartTimeMS) {
        pauseOffset = now - this.pauseStartTimeMS;
      }
      var time = now - this.startTimeMS - (this.timerOffsetMS + pauseOffset);
      return this.countUp ? this.initialTime + time : this.initialTime - time;
    }
  }]);
  return VexcodeTimer;
}();


/***/ })

});
//# sourceMappingURL=869304a8fdb63cfc6430.31.bundle.js.map