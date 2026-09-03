this["webpackChunkwebapp"]([33],{

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

/***/ "./src/Blockly/Extensions/IQBlocks.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Extensions/IQBlocks.ts ***!
  \********************************************/
/*! exports provided: IQBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IQBlocks", function() { return IQBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Extension */ "./src/Blockly/Extensions/Extension.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/Blockly/Extensions/utils/index.ts");
/* harmony import */ var _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../SimWindow/unityMessageEnums */ "./src/SimWindow/unityMessageEnums.ts");
/* harmony import */ var _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SimWindow/SimUnity/SimMessageHelper */ "./src/SimWindow/SimUnity/SimMessageHelper.ts");
/* harmony import */ var _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../SimWindow/SimUnity/SimSensorValues */ "./src/SimWindow/SimUnity/SimSensorValues.ts");
/* harmony import */ var _VexcodeTimer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../VexcodeTimer */ "./src/VexcodeTimer.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/helpers */ "./src/Blockly/Extensions/utils/helpers.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("IQBlocksExtension");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();








var drivetrainDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getDrivetrainDefaults"])();
var motorDefaults = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getMotorDefaults"])();
var IQBlocks = /*#__PURE__*/function (_ExtensionBase) {
  _inherits(IQBlocks, _ExtensionBase);
  var _super = _createSuper(IQBlocks);
  // Drivetrain Variables

  // Motor Variables

  // Looks Variables

  function IQBlocks(runtime) {
    var _this;
    _classCallCheck(this, IQBlocks);
    _this = _super.call(this, runtime);
    _defineProperty(_assertThisInitialized(_this), "primitives", {});
    _defineProperty(_assertThisInitialized(_this), "linesCalled", 0);
    _defineProperty(_assertThisInitialized(_this), "lastSent", Date.now());
    _this.setExtensionDefaults();
    _this.buildPrimitives();
    return _this;
  }
  _createClass(IQBlocks, [{
    key: "setExtensionDefaults",
    value: function setExtensionDefaults() {
      // Reset Drivetrain Variables
      this.drivetrainTimeoutMS = 0;
      this.drivetrainMaxRPM = 120;

      // Reset Motor Variables
      this.definedMotors = [{
        name: 'IntakeMotor',
        port: 1,
        velocity: 50,
        motorTimeoutMS: 0,
        motorMaxRPM: 120
      }, {
        name: 'ArmMotor',
        port: 10,
        velocity: 50,
        motorTimeoutMS: 0,
        motorMaxRPM: 120
      }];

      // Reset Looks Variables
      this.printPrecision = "1";

      // Reset Timer
      IQBlocks.timer.reset();
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      return {
        id: 'iqBlocks',
        blocks: [{
          opcode: 'iq_events_when_started',
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
              "default": 'Bumper',
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
        }, {
          opcode: 'iq_drivetrain_drive',
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
          opcode: 'iq_drivetrain_drive_for',
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
          opcode: 'iq_drivetrain_turn',
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
          opcode: 'iq_drivetrain_turn_for',
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
          opcode: 'iq_drivetrain_turn_to_heading',
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
          opcode: 'iq_drivetrain_turn_to_rotation',
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
          opcode: 'iq_motion_stop_driving',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'stop driving',
          arguments: {},
          func: 'drivetrainStop'
        }, {
          opcode: 'iq_drivetrain_set_drive_velocity',
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
          opcode: 'iq_drivetrain_set_turn_velocity',
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
          opcode: 'iq_drivetrain_set_drive_timeout',
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
          opcode: 'iq_drivetrain_set_drive_heading',
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
          opcode: 'iq_drivetrain_set_drive_rotation',
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
          opcode: 'iq_control_break',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: 'break',
          arguments: {},
          func: 'controlBreak'
        }, {
          opcode: 'iq_control_stop_project',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].COMMAND,
          branchCount: 0,
          terminal: true,
          blockAllThreads: false,
          text: 'stop project',
          arguments: {},
          func: 'controlStopProject'
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
          opcode: 'iq_sensing_optical_found_object',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] is near object?',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Color',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingObjectIsNear'
        }, {
          opcode: 'iq_sensing_optical_detect',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] detects [color]?',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Color',
              menu: 'COLORSENSORS'
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
          text: '[COLORSENSOR] color name',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Color',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingOpticalColorOf'
        }, {
          opcode: 'iq_sensing_optical_hue',
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
          func: 'sensingOpticalHueOf'
        }, {
          opcode: 'iq_sensing_optical_brightness',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[COLORSENSOR] brightness in %',
          arguments: {
            COLORSENSOR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Color',
              menu: 'COLORSENSORS'
            }
          },
          func: 'sensingOpticalBrightnessOf'
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
          opcode: 'iq_sensing_object_in_front',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[SONAR] found an object?',
          arguments: {
            SONAR: {
              type: _utils__WEBPACK_IMPORTED_MODULE_2__["ArgumentTypes"].STRING,
              "default": 'Distance',
              menu: 'DISTANCESENSORS'
            }
          },
          func: 'sensingDistanceFoundObject'
        }, {
          opcode: 'iq_sensing_distance_from',
          blockType: _utils__WEBPACK_IMPORTED_MODULE_2__["BlockTypes"].REPORTER,
          branchCount: 0,
          terminal: false,
          blockAllThreads: false,
          text: '[SONAR] distance in [UNITS]',
          arguments: {
            SONAR: {
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
          MOTORS: [{
            value: 'ArmMotor'
          }, {
            value: 'IntakeMotor'
          }],
          SPINDIRECTIONS: [{
            value: 'fwd',
            text: 'forward'
          }, {
            value: 'rev',
            text: 'reverse'
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
            value: 'Bumper'
          }],
          COLORSENSORS: [{
            value: 'Color'
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
          }, {
            value: 8,
            text: 'white'
          }, {
            value: 4,
            text: 'yellow'
          }, {
            value: 5,
            text: 'orange'
          }, {
            value: 6,
            text: 'purple'
          }, {
            value: 9,
            text: 'red_violet'
          }, {
            value: 10,
            text: 'violet'
          }, {
            value: 11,
            text: 'blue_violet'
          }, {
            value: 12,
            text: 'blue_green'
          }, {
            value: 13,
            text: 'yellow_green'
          }, {
            value: 14,
            text: 'yellow_orange'
          }, {
            value: 15,
            text: 'red_orange'
          }],
          DISTANCESENSORS: [{
            value: 'Distance'
          }],
          BUMPEREVENTTYPES: [{
            value: 'pressed',
            text: 'pressed'
          }, {
            value: 'released',
            text: 'released'
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
          var start, delay;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!util.target.firstRun) {
                  _context.next = 12;
                  break;
                }
                util.target.firstRun = false;
                log.debug("running init code...");
                start = Date.now(); // TODO: init robot values
                _this3.setExtensionDefaults();
                delay = 600 - (Date.now() - start);
                _context.next = 8;
                return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(delay);
              case 8:
                IQBlocks.timer.reset();
                self.VMWorkerAPI.sendTimerMessage(_SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Timer"].start());
                _context.next = 16;
                break;
              case 12:
                log.debug("skipping init code...");
                _context.next = 15;
                return Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(600);
              case 15:
                IQBlocks.timer.reset();
              case 16:
                resolve(true);
              case 17:
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
    //#endregion events

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
      var amount = args.UNITS === "in" ? args.AMOUNT * 25.4 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].driveFor(direction, amount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
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
    key: "drivetrainTurnToHeading",
    value: function drivetrainTurnToHeading(args, util) {
      var heading = args.HEADING;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnToHeading(heading, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "drivetrainTurnToRotation",
    value: function drivetrainTurnToRotation(args, util) {
      var rotation = args.HEADING;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Drivetrain"].turnToRotation(rotation, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drivetrainTimeoutWrapper"])(commandMessage, wait, this.drivetrainTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
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
  }, {
    key: "drivetrainSetDriveTimeout",
    value: function drivetrainSetDriveTimeout(args, util) {
      this.drivetrainTimeoutMS = args.TIMEOUT * 1000;
    }
    //#endregion Drivetrain Opcode Executors

    //#region Motor Opcode Executors
  }, {
    key: "motionSpin",
    value: function motionSpin(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].backward;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].spin(definedMotor.port, direction);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "motionSpinFor",
    value: function motionSpinFor(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var direction = args.DIRECTION === "fwd" ? _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].forward : _SimWindow_unityMessageEnums__WEBPACK_IMPORTED_MODULE_3__["MotorDirection"].backward;
      var amount = args.UNITS === "rev" ? args.AMOUNT * 360 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].spinFor(definedMotor.port, direction, amount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["motorTimeoutWrapper"])(definedMotor.port, commandMessage, wait, definedMotor.motorTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "motionSpinToPosition",
    value: function motionSpinToPosition(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var amount = args.UNITS === "rev" ? args.AMOUNT * 360 : args.AMOUNT;
      var wait = !args.anddontwait_mutator;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].spinTo(definedMotor.port, amount, wait);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["motorTimeoutWrapper"])(definedMotor.port, commandMessage, wait, definedMotor.motorTimeoutMS, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "motionStopMotor",
    value: function motionStopMotor(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].stop(definedMotor.port);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "motionSetMotorPosition",
    value: function motionSetMotorPosition(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var position = args.UNITS === "rev" ? args.DEGS * 360 : args.DEGS;
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].setPosition(definedMotor.port, position);
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__["setWrapper"])(commandMessage, self.VMWorkerAPI.sendCommandMessage);
    }
  }, {
    key: "motionSetMotorVelocity",
    value: function motionSetMotorVelocity(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var velocity = args.UNITS === "rpm" ? args.VELOCITY / definedMotor.motorMaxRPM * 100 : args.VELOCITY;
      if (velocity < 1) {
        velocity = 1;
      } else if (velocity > 100) {
        velocity = 100;
      }
      var commandMessage = _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_4__["Motor"].setVelocity(definedMotor.port, velocity);
      return self.VMWorkerAPI.sendCommandMessage(commandMessage);
    }
  }, {
    key: "motionSetMotorTimeout",
    value: function motionSetMotorTimeout(args, util) {
      for (var i = 0; i < this.definedMotors.length; i++) {
        if (this.definedMotors[i].name === args.MOTOR) {
          this.definedMotors[i].motorTimeoutMS = args.TIMEOUT * 1000;
          break;
        }
      }
    }
    //#endregion Motor Opcode Executors

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
      if (args.andsetcursortonextrow_mutator === "TRUE") {
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
    //#endregion Looks Opcode Executors

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
      IQBlocks.timer.reset();
    }
  }, {
    key: "sensingTimerInSeconds",
    value: function sensingTimerInSeconds(args, util) {
      return IQBlocks.timer.getTime() / 1000;
    }
  }, {
    key: "sensingDriveIsDone",
    value: function sensingDriveIsDone(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Drivetrain"].isDone();
    }
  }, {
    key: "sensingDriveIsMoving",
    value: function sensingDriveIsMoving(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Drivetrain"].isMoving();
    }
  }, {
    key: "sensingDriveHeading",
    value: function sensingDriveHeading(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Drivetrain"].heading();
    }
  }, {
    key: "sensingDriveRotation",
    value: function sensingDriveRotation(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Drivetrain"].rotation();
    }
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
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].isDone(definedMotor.port);
    }
  }, {
    key: "sensingMotorIsSpinning",
    value: function sensingMotorIsSpinning(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].isMoving(definedMotor.port);
    }
  }, {
    key: "sensingMotorPosition",
    value: function sensingMotorPosition(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var position = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].position(definedMotor.port);
      if (args.UNITS === "rev") {
        position = position / 360;
      }
      return position;
    }
  }, {
    key: "sensingMotorVelocity",
    value: function sensingMotorVelocity(args, util) {
      var definedMotor = this.definedMotors.filter(function (motor) {
        return motor.name === args.MOTOR;
      })[0];
      var velocity = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Motor"].velocity(definedMotor.port);
      if (args.UNITS === "rpm") {
        velocity = velocity * definedMotor.motorMaxRPM / 100;
      }
      return velocity;
    }
  }, {
    key: "sensingBumperPressed",
    value: function sensingBumperPressed(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Bumper"].pressed(2) !== 0;
    }
  }, {
    key: "sensingObjectIsNear",
    value: function sensingObjectIsNear(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].isObjectFound(5);
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
      var sensorOptical = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].color(5);
      var colorName = this.colorNumberToName(sensorOptical);
      return colorName === args.COLORS;
    }
  }, {
    key: "sensingOpticalColorOf",
    value: function sensingOpticalColorOf(args, util) {
      var colorNum = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].color(5);
      return this.colorNumberToName(colorNum);
    }
  }, {
    key: "sensingOpticalHueOf",
    value: function sensingOpticalHueOf(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].hue(5);
    }
  }, {
    key: "sensingOpticalBrightnessOf",
    value: function sensingOpticalBrightnessOf(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Optical"].brightness(5);
    }
  }, {
    key: "sensingDistanceFoundObject",
    value: function sensingDistanceFoundObject(args, util) {
      return _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Distance"].isObjectFound(3) === 1;
    }
  }, {
    key: "sensingDistanceFromObject",
    value: function sensingDistanceFromObject(args, util) {
      var distance = _SimWindow_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_5__["Distance"].distance(3);
      if (args.UNITS === "in") {
        distance = distance / 25.4;
      }
      return distance;
    }
    //#endregion Sensing Opcode Executors
  }]);
  return IQBlocks;
}(_Extension__WEBPACK_IMPORTED_MODULE_1__["ExtensionBase"]);
_defineProperty(IQBlocks, "timer", new _VexcodeTimer__WEBPACK_IMPORTED_MODULE_6__["VexcodeTimer"](0, true));


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
//# sourceMappingURL=332ce07b24028bb4b144.33.bundle.js.map