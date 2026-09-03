(window["webpackJsonpwebapp"] = window["webpackJsonpwebapp"] || []).push([[17],{

/***/ "./src/HardwareInterface/IQEXPV5/EXP/EXPBLE.ts":
/*!*****************************************************!*\
  !*** ./src/HardwareInterface/IQEXPV5/EXP/EXPBLE.ts ***!
  \*****************************************************/
/*! exports provided: EXPBLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPBLE", function() { return EXPBLE; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rm-vca/vexcode-webserial */ "./node_modules/@rm-vca/vexcode-webserial/dist/index.js");
/* harmony import */ var _EXPInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EXPInterface */ "./src/HardwareInterface/IQEXPV5/EXP/EXPInterface.ts");
/* harmony import */ var _VexVersion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VexVersion */ "./src/HardwareInterface/VexVersion.ts");
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../platformInfo */ "./src/platformInfo.ts");
/* harmony import */ var _nativeInterface__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../nativeInterface */ "./src/nativeInterface.ts");
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../helpers */ "./src/HardwareInterface/helpers.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../dispatcher */ "./src/dispatcher.ts");
/* harmony import */ var _widget_Modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../widget/Modal */ "./src/widget/Modal.tsx");
/* harmony import */ var _brainInfoStore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../brainInfoStore */ "./src/brainInfoStore.ts");
/* harmony import */ var _vexcode_python_vm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @vexcode/python-vm */ "./node_modules/@vexcode/python-vm/dist/index.js");
/* harmony import */ var _vexcode_python_vm__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_vexcode_python_vm__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../types/HWTabletEnums */ "./src/HardwareInterface/types/HWTabletEnums.ts");
/* harmony import */ var _rm_vca_vexcode_webserial_dist_VexDeviceWebSerial__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @rm-vca/vexcode-webserial/dist/VexDeviceWebSerial */ "./node_modules/@rm-vca/vexcode-webserial/dist/VexDeviceWebSerial.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../helpers */ "./src/helpers.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("EXPBLE");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// interface types/enums



// TODO: cleanup imports



// imports external to hardware interface











var isTablet = _platformInfo__WEBPACK_IMPORTED_MODULE_6__["PlatformIsAndroid"] || _platformInfo__WEBPACK_IMPORTED_MODULE_6__["PlatformIsIOS"];
var brainLockKey = "BLE_LOCK_KEY";
var EXPBLE = /*#__PURE__*/function (_EXPInterface) {
  _inherits(EXPBLE, _EXPInterface);
  var _super = _createSuper(EXPBLE);
  function EXPBLE() {
    var _this;
    _classCallCheck(this, EXPBLE);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "discoveredDevices", []);
    _defineProperty(_assertThisInitialized(_this), "connectedDevice", null);
    _defineProperty(_assertThisInitialized(_this), "targetBrain", null);
    _defineProperty(_assertThisInitialized(_this), "isConnecting", false);
    _defineProperty(_assertThisInitialized(_this), "isScanning", false);
    _defineProperty(_assertThisInitialized(_this), "isConnected", false);
    _defineProperty(_assertThisInitialized(_this), "lastBrainKey", "");
    _defineProperty(_assertThisInitialized(_this), "lastLockCode", "");
    //#endregion program control
    //#region project downloads
    _defineProperty(_assertThisInitialized(_this), "onEXPBLEDownloadProgressEvent", new _dispatcher__WEBPACK_IMPORTED_MODULE_10__["DispatcherEvent"]());
    //#endregion User Port comms
    //#region events
    _defineProperty(_assertThisInitialized(_this), "lastConnectionState", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected);
    _this.onEXPBLEDownloadProgressEvent.registerCallback(function (prog) {
      log.info("download progress: ", prog.progress, "(", prog.retry, "/", prog.limit, ") quality:", prog.quality);
    });
    return _this;
  }

  //#region connection control
  _createClass(EXPBLE, [{
    key: "openConnection",
    value: function () {
      var _openConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (isTablet) {
                _context.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 2:
              this.discoveredDevices = [];
              this.isScanning = true;
              this.triggerConnectionUpdate();
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEStartScanning"]().then(function () {
                  resolve();
                })["catch"](function (err) {
                  log.warn("Error starting scan");
                  log.warn(err);

                  // TODO: create actual error for this.
                  reject(new Error("error starting scan"));
                });
              }));
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function openConnection() {
        return _openConnection.apply(this, arguments);
      }
      return openConnection;
    }()
  }, {
    key: "openConnectionToBrain",
    value: function () {
      var _openConnectionToBrain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
        var _this2 = this;
        var i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              log.debug("openConnectionToBrain:", id);
              if (isTablet) {
                _context2.next = 3;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 3:
              this.isConnecting = true;
              this.triggerConnectionUpdate();
              this.targetBrain = null;
              // tslint:disable-next-line: prefer-for-of
              i = 0;
            case 7:
              if (!(i < this.discoveredDevices.length)) {
                _context2.next = 14;
                break;
              }
              if (!(this.discoveredDevices[i].serial === id)) {
                _context2.next = 11;
                break;
              }
              this.targetBrain = this.discoveredDevices[i];
              return _context2.abrupt("break", 14);
            case 11:
              i++;
              _context2.next = 7;
              break;
            case 14:
              _context2.next = 16;
              return _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEConnectToBrain"](id).then(function (v) {
                _this2.isConnecting = v;
                _this2.triggerConnectionUpdate();
                return v;
              })["catch"](function (err) {
                log.warn("Error connecting to brain", id);
                log.warn(err);
                _this2.isConnecting = false;
                _this2.triggerConnectionUpdate();
                // TODO: create actual error for this
                throw new Error("error connecting to target brain id");
              });
            case 16:
              return _context2.abrupt("return", true);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function openConnectionToBrain(_x) {
        return _openConnectionToBrain.apply(this, arguments);
      }
      return openConnectionToBrain;
    }()
  }, {
    key: "closeConnection",
    value: function () {
      var _closeConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (isTablet) {
                _context3.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 2:
              this.discoveredDevices = [];
              this.isConnected = false;
              this.isConnecting = false;
              this.isScanning = false;
              this.connectedDevice = null;
              this.targetBrain = null;
              localStorage.removeItem(this.lastBrainKey);
              log.debug("removed key:", localStorage.getItem(this.lastBrainKey));
              this.triggerConnectionUpdate();
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEStopScanning"]().then(function () {
                  resolve(true);
                })["catch"](function (err) {
                  log.warn("Error stopping scan");
                  log.warn(err);

                  // TODO: create actual error for this.
                  reject(new Error("error stopping scan"));
                });
              }));
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function closeConnection() {
        return _closeConnection.apply(this, arguments);
      }
      return closeConnection;
    }()
  }, {
    key: "unlockBrain",
    value: function () {
      var _unlockBrain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(unlockCode) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (isTablet) {
                _context4.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 2:
              return _context4.abrupt("return", _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLESendLockCode"](unlockCode).then(function (res) {
                log.debug("unlock result:", res);
                return res;
              })["catch"](function (err) {
                log.error("Error unlocking brain with ", unlockCode);
                log.warn(err);
                localStorage.removeItem(_this3.lastBrainKey);
                return false;
              }));
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function unlockBrain(_x2) {
        return _unlockBrain.apply(this, arguments);
      }
      return unlockBrain;
    }()
  }, {
    key: "getConnectionState",
    value: function getConnectionState() {
      if (this.isConnected) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected;
      } else if (this.isConnecting) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connecting;
      } else if (this.isScanning) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Scanning;
      } else {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
      }
    }
    //#endregion connection control

    //#region brain info
  }, {
    key: "getBrainScanList",
    value: function getBrainScanList() {
      return this.discoveredDevices;
    }
  }, {
    key: "getBrainInfo",
    value: function getBrainInfo() {
      if (!this.isConnected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]("cannot get brain info without connected brain");
      }
      // TODO: should this be a copy?
      return this.connectedDevice;
    }
  }, {
    key: "getTargetBrainInfo",
    value: function getTargetBrainInfo() {
      // TODO: should this be a copy?
      return this.targetBrain;
    }
  }, {
    key: "setBrainName",
    value: function () {
      var _setBrainName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(name) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              log.warn("setBrainName not yet implmented");
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function setBrainName(_x3) {
        return _setBrainName.apply(this, arguments);
      }
      return setBrainName;
    }()
  }, {
    key: "setTeamNumber",
    value: function () {
      var _setTeamNumber = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(team) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              log.warn("setTeamNumber not yet implmented");
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function setTeamNumber(_x4) {
        return _setTeamNumber.apply(this, arguments);
      }
      return setTeamNumber;
    }() //#endregion brain info
    //#region program control
  }, {
    key: "play",
    value: function () {
      var _play = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(slot) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              log.debug("play on slot:", slot);
              if (isTablet) {
                _context7.next = 3;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 3:
              if (this.isConnected) {
                _context7.next = 5;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 5:
              if (!(slot < 0 || slot > 7)) {
                _context7.next = 7;
                break;
              }
              throw new RangeError("slot must be between 0 and 7 inclusive");
            case 7:
              return _context7.abrupt("return", _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLERunProgram"](slot).then(function (res) {
                log.debug("run slot", slot, "result:", res);
                return res;
              })["catch"](function (err) {
                log.error("Error running program in slot", slot, err);
                return false;
              }));
            case 8:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function play(_x5) {
        return _play.apply(this, arguments);
      }
      return play;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (isTablet) {
                _context8.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 2:
              if (this.isConnected) {
                _context8.next = 4;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 4:
              return _context8.abrupt("return", _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEStopProgram"]().then(function (res) {
                log.debug("program stopped. res:", res);
                return true;
              })["catch"](function (err) {
                log.error("Error stopping program", err);
                log.warn(err);
                return false;
              }));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }()
  }, {
    key: "downloadProgram",
    value: function () {
      var _downloadProgram = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(slot, projectName, language, data, progressCallback) {
        var _this4 = this;
        var ini, iniContent, fileName, iniAB, binAB, progressEventWrapper;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              log.info("downloadProgram", slot, projectName, language);
              ini = new _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexINI"]();
              ini.programSlotSet(slot);
              ini.programNameSet(projectName);
              ini.programDescriptionSet("");
              ini.programIconSet(_rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodeBlocks); // TODO: make this change based on the project
              ini.projectIdeSet("Blocks"); // TODO: this should change based on the project
              iniContent = ini.createIni();
              fileName = "slot_".concat(slot + 1);
              iniAB = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["stringToArrayBuffer"])(iniContent);
              binAB = data;
              progressEventWrapper = function progressEventWrapper(percent) {
                progressCallback({
                  progress: percent,
                  step: _rm_vca_vexcode_webserial_dist_VexDeviceWebSerial__WEBPACK_IMPORTED_MODULE_15__["DownloadState"].DownloadingProgram
                });
              };
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
                  var disconnectHandler, firstVMCheck, needsVM, vmDataString, vmArrayBuffer, VMresult, isPython, extType, loadAddress, linkFileVID, linkFileName, downloadTarget, result;
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        log.info("starting program download");
                        disconnectHandler = function disconnectHandler() {
                          log.warn("device disconnected during download");
                          resolve(false);
                        };
                        _this4.on("brainDisconnected", disconnectHandler);
                        if (!(language === "python")) {
                          _context9.next = 26;
                          break;
                        }
                        _context9.next = 6;
                        return _this4.checkPythonVm(_vexcode_python_vm__WEBPACK_IMPORTED_MODULE_13__["metaEXP"].crc, _vexcode_python_vm__WEBPACK_IMPORTED_MODULE_13__["metaEXP"].version);
                      case 6:
                        firstVMCheck = _context9.sent;
                        log.debug("firstVMCheck:", firstVMCheck);
                        needsVM = !firstVMCheck.exists || !firstVMCheck.valid;
                        if (!needsVM) {
                          _context9.next = 26;
                          break;
                        }
                        // update the progress no since it can take a second or 2 to actually start downloading and
                        // it helps to see what is happening sooner
                        progressCallback({
                          progress: 0,
                          step: _rm_vca_vexcode_webserial_dist_VexDeviceWebSerial__WEBPACK_IMPORTED_MODULE_15__["DownloadState"].DownloadingVM
                        });

                        // short delay after checking VM since failed metadata reads seem to cause issues
                        _context9.next = 13;
                        return Object(_helpers__WEBPACK_IMPORTED_MODULE_16__["waitms"])(1000);
                      case 13:
                        _context9.t0 = atob;
                        _context9.next = 16;
                        return _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEReadVMFile"]("exp");
                      case 16:
                        _context9.t1 = _context9.sent;
                        vmDataString = (0, _context9.t0)(_context9.t1);
                        vmArrayBuffer = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["stringToArrayBuffer"])(vmDataString);
                        _context9.next = 21;
                        return _this4.DownloadFileRaw(vmArrayBuffer, "python_vm", "bin", _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosExtType"].VEXVM, 0x30700000, _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosVID"].NONE, undefined, _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosDownloadTarget"].FILE_TARGET_FLASH, _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosVID"].FF, _vexcode_python_vm__WEBPACK_IMPORTED_MODULE_13__["metaEXP"].version, function (percent) {
                          progressCallback({
                            progress: percent,
                            step: _rm_vca_vexcode_webserial_dist_VexDeviceWebSerial__WEBPACK_IMPORTED_MODULE_15__["DownloadState"].DownloadingVM
                          });
                        });
                      case 21:
                        VMresult = _context9.sent;
                        if (!VMresult) {
                          log.warn("failed to download the Python VM");
                          _this4.off("brainDisconnected", disconnectHandler);
                          resolve(false);
                        }

                        // make the progress bar reset to 0 for the actual download and update the text
                        progressEventWrapper(0);
                        _context9.next = 26;
                        return Object(_helpers__WEBPACK_IMPORTED_MODULE_16__["waitms"])(1000);
                      case 26:
                        isPython = language === "python"; // TODO: this needs to change base on the VEX platform...
                        extType = isPython ? _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosExtType"].VEXVM : _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosExtType"].General;
                        loadAddress = isPython ? 0x30700000 : 0x03800000;
                        linkFileVID = isPython ? _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosVID"].VEXVM : _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosVID"].NONE;
                        linkFileName = isPython ? "python_vm.bin" : null;
                        downloadTarget = _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosDownloadTarget"].FILE_TARGET_QSPI;
                        _context9.next = 34;
                        return _this4.DownloadProjectFiles(fileName, binAB, iniAB, undefined, extType, loadAddress, linkFileVID, linkFileName, downloadTarget, _types_HWTabletEnums__WEBPACK_IMPORTED_MODULE_14__["VEXosVID"].USER, progressEventWrapper);
                      case 34:
                        result = _context9.sent;
                        _this4.off("brainDisconnected", disconnectHandler);
                        if (result) {
                          log.debug("program download success");
                        } else {
                          log.debug("program download failed");
                        }
                        resolve(result);
                      case 38:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }));
                return function (_x11, _x12) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 13:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function downloadProgram(_x6, _x7, _x8, _x9, _x10) {
        return _downloadProgram.apply(this, arguments);
      }
      return downloadProgram;
    }()
    /**
     * checks to see if the VM on the brain matches the current app version
     * @param crc the crc of the bundled VM file
     * @param version the version of the bundled VM file
     * @returns data structure to indicate if the VM already exists and if it is the same as the bundled version.
     */
  }, {
    key: "checkPythonVm",
    value: function () {
      var _checkPythonVm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(crc, version) {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
                  var metadata;
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.prev = 0;
                        _context11.next = 3;
                        return _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEGetFileMetadata"]("python_vm.bin", 0x40);
                      case 3:
                        metadata = _context11.sent;
                        log.debug("metadata:", metadata);
                        if (metadata === undefined) {
                          // no VM
                          log.debug("found no VM");
                          resolve({
                            exists: false,
                            valid: false
                          });
                        } else {
                          log.debug("Python VM metadata: ", JSON.stringify(metadata, null, 2));
                          if (metadata.fileCRC === crc && metadata.version === version) {
                            // Valid VM
                            log.debug("found valid VM");
                            resolve({
                              exists: true,
                              valid: true
                            });
                          } else {
                            // invalid VM
                            log.debug("found invalid VM");
                            resolve({
                              exists: true,
                              valid: false
                            });
                          }
                        }
                        _context11.next = 12;
                        break;
                      case 8:
                        _context11.prev = 8;
                        _context11.t0 = _context11["catch"](0);
                        log.warn("error on checking VM or the file does not exist", _context11.t0);
                        resolve({
                          exists: false,
                          valid: false
                        });
                      case 12:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11, null, [[0, 8]]);
                }));
                return function (_x15, _x16) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function checkPythonVm(_x13, _x14) {
        return _checkPythonVm.apply(this, arguments);
      }
      return checkPythonVm;
    }()
    /**
     * helper to handle downloading the files required for a project
     * @param basename the name of the project file on the brain. ex slot_1
     * @param binData the binary file data
     * @param iniData the ini file data
     * @param prjData optional source file data
     * @param extType the extType for the bin file
     * @param loadAddress the load address for the bin file
     * @param linkFileVID the vid for the linker file (VM file)
     * @param linkFileName the name for the linker file (VM file)
     * @param downloadTarget where the bin file should be downloaded to
     * @param fileVID the VID for the bin file - could probably be removed as a param
     * @param progressCallback callback fro progress updates
     * @returns 
     */
  }, {
    key: "DownloadProjectFiles",
    value: function () {
      var _DownloadProjectFiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(basename, binData, iniData, prjData, extType, loadAddress, linkFileVID, linkFileName, downloadTarget, fileVID, progressCallback) {
        var re, name, binFilename, iniFilename, prjFilename, binLength, iniLength, prjLength, totalBytes, totalDone;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (binData) {
                _context13.next = 3;
                break;
              }
              log.warn("binData is mandatory for project download...");
              return _context13.abrupt("return", false);
            case 3:
              // Create file names.
              // Find basename of file
              re = /(.+?)(\.[^.]*$|$)/;
              name = re.exec(basename)[1]; // create names for the program files, all have same basename
              binFilename = name + '.bin';
              iniFilename = name + '.ini';
              prjFilename = name + '.prj'; // get total download size
              binLength = binData.byteLength;
              iniLength = iniData !== undefined ? iniData.byteLength : 0;
              prjLength = prjData !== undefined ? prjData.byteLength : 0;
              totalBytes = binLength;
              totalBytes += iniLength;
              totalBytes += prjLength;
              totalDone = 0;
              log.info("download ini file", iniFilename);
              _context13.next = 18;
              return this.DownloadFile(iniData, name, "ini", function (iniPercent) {
                log.debug("ini download is ".concat(iniPercent, "% done"));
                var percent = (iniPercent * iniLength + totalDone) / totalBytes;
                log.debug("total download is ".concat(percent, "% done"));
                progressCallback(percent);
              });
            case 18:
              if (_context13.sent) {
                _context13.next = 21;
                break;
              }
              log.warn("failed to download project's ini file");
              return _context13.abrupt("return", false);
            case 21:
              totalDone += iniLength;
              if (!prjData) {
                _context13.next = 30;
                break;
              }
              log.info("download prj file", prjFilename);
              _context13.next = 26;
              return this.DownloadFile(prjData, name, "prj", function (prjPercent) {
                log.debug("prj download is ".concat(prjPercent, "% done"));
                var percent = (prjPercent * prjLength + totalDone) / totalBytes;
                log.debug("total download is ".concat(percent, "% done"));
                progressCallback(percent);
              });
            case 26:
              if (_context13.sent) {
                _context13.next = 29;
                break;
              }
              log.warn("failed to download project's src file");
              return _context13.abrupt("return", false);
            case 29:
              totalDone += prjLength;
            case 30:
              log.info("download bin file", binFilename);
              _context13.next = 33;
              return this.DownloadFileRaw(binData, name, "bin", extType, loadAddress, linkFileVID, linkFileName, downloadTarget, fileVID, 1, function (binPercent) {
                log.debug("bin download is ".concat(binPercent, "% done"));
                var percent = (binPercent * binLength + totalDone) / totalBytes;
                log.debug("total download is ".concat(percent, "% done"));
                progressCallback(percent);
              });
            case 33:
              if (_context13.sent) {
                _context13.next = 36;
                break;
              }
              log.warn("failed to download project's bin file");
              return _context13.abrupt("return", false);
            case 36:
              return _context13.abrupt("return", true);
            case 37:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function DownloadProjectFiles(_x17, _x18, _x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26, _x27) {
        return _DownloadProjectFiles.apply(this, arguments);
      }
      return DownloadProjectFiles;
    }()
  }, {
    key: "DownloadFile",
    value: function () {
      var _DownloadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(binData, name, ext, progressUpdate) {
        var _this5 = this;
        var callbackWrapper, prom;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              callbackWrapper = function callbackWrapper(prog) {
                progressUpdate(prog.progress);
              };
              _context14.next = 3;
              return new Promise(function (resolve, reject) {
                _this5.onEXPBLEDownloadProgressEvent.registerCallback(callbackWrapper);

                // native interface takes base 64 encoded string...
                var encoded = btoa(Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["arrayBufferToString"])(binData));
                _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEDownloadFile"](encoded, name, ext).then(function (v) {
                  resolve(v);
                  _this5.onEXPBLEDownloadProgressEvent.unregisterCallback(callbackWrapper);
                })["catch"](function () {
                  reject("error downloading file");
                  _this5.onEXPBLEDownloadProgressEvent.unregisterCallback(callbackWrapper);
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 3:
              prom = _context14.sent;
              return _context14.abrupt("return", prom);
            case 5:
            case "end":
              return _context14.stop();
          }
        }, _callee14);
      }));
      function DownloadFile(_x28, _x29, _x30, _x31) {
        return _DownloadFile.apply(this, arguments);
      }
      return DownloadFile;
    }()
    /**
     * This is a low level version of DownloadFile that lets us have more control
     * of the metadata for file download.
     * 
     * @param binData the python project data
     * @param name the name of the project file
     * @param ext the file extension
     * @param progressUpdate 
     * @returns 
     */
  }, {
    key: "DownloadFileRaw",
    value: function () {
      var _DownloadFileRaw = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(binData, name, ext, extType, loadAddress, linkFileVID, linkFileName, downloadTarget, fileVID, version, progressUpdate) {
        var _this6 = this;
        var callbackWrapper, promise;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              callbackWrapper = function callbackWrapper(prog) {
                progressUpdate(prog.progress);
              };
              _context15.next = 3;
              return new Promise(function (resolve, reject) {
                _this6.onEXPBLEDownloadProgressEvent.registerCallback(callbackWrapper);

                // native interface takes base 64 encoded string...
                var encoded = btoa(Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["arrayBufferToString"])(binData));
                _nativeInterface__WEBPACK_IMPORTED_MODULE_7__["vexBLEDownloadFileRaw"](encoded, name, ext, extType, loadAddress, linkFileVID, linkFileName, downloadTarget, fileVID, version).then(function (v) {
                  resolve(v);
                  _this6.onEXPBLEDownloadProgressEvent.unregisterCallback(callbackWrapper);
                })["catch"](function () {
                  reject("error downloading file");
                  _this6.onEXPBLEDownloadProgressEvent.unregisterCallback(callbackWrapper);
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 3:
              promise = _context15.sent;
              return _context15.abrupt("return", promise);
            case 5:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      function DownloadFileRaw(_x32, _x33, _x34, _x35, _x36, _x37, _x38, _x39, _x40, _x41, _x42) {
        return _DownloadFileRaw.apply(this, arguments);
      }
      return DownloadFileRaw;
    }() //#endregion project downloads
    //#region compilers
    //#endregion compilers
    //#region firmware
  }, {
    key: "canUpdateFirmware",
    value: function canUpdateFirmware() {
      return false;
    }
  }, {
    key: "updateFirmware",
    value: function updateFirmware(progress) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
    //#endregion firmware

    //#region User Port comms
  }, {
    key: "supportsUserPort",
    get: function get() {
      return false;
    }
  }, {
    key: "requiresUserPortConnectionProcess",
    get: function get() {
      return false;
    }
  }, {
    key: "openConnectionUserPort",
    value: function () {
      var _openConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee16);
      }));
      function openConnectionUserPort() {
        return _openConnectionUserPort.apply(this, arguments);
      }
      return openConnectionUserPort;
    }()
  }, {
    key: "closeConnectionUserPort",
    value: function () {
      var _closeConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17);
      }));
      function closeConnectionUserPort() {
        return _closeConnectionUserPort.apply(this, arguments);
      }
      return closeConnectionUserPort;
    }()
  }, {
    key: "getConnectionStateUserPort",
    value: function getConnectionStateUserPort() {
      return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
    }
  }, {
    key: "sendDataUserPort",
    value: function sendDataUserPort(data) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
  }, {
    key: "triggerConnectionUpdate",
    value: function triggerConnectionUpdate() {
      var newState = this.getConnectionState();
      log.debug("checking if need to send connection state update", newState, this.lastConnectionState);
      if (this.lastConnectionState !== newState) {
        this.lastConnectionState = newState;
        log.debug("sending connection state update");
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.ConnectionStateChange", newState);
      }
    }
  }, {
    key: "onVEXBLEDeviceDiscovered",
    value: function () {
      var _onVEXBLEDeviceDiscovered = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(name, vexos, serial, product, rssi) {
        var tmpVersion, tmpDev, alreadyFound, i;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              log.info("onVEXBLEDeviceDiscovered", name, vexos, serial, product, rssi);
              if (!(this.targetBrain && this.targetBrain.serial === serial)) {
                _context18.next = 3;
                break;
              }
              return _context18.abrupt("return");
            case 3:
              if (!(this.connectedDevice && this.connectedDevice.serial === serial)) {
                _context18.next = 5;
                break;
              }
              return _context18.abrupt("return");
            case 5:
              tmpVersion = _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"].fromString(vexos);
              tmpDev = {
                serial: serial,
                version: tmpVersion,
                versionFW: tmpVersion,
                name: name,
                deviceType: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXEXP,
                connectionMethod: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].BLE,
                brainConnected: false,
                needsFWUpdate: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure,
                canUpdate: false,
                battery: -1,
                rssi: rssi,
                isLocked: true
              };
              alreadyFound = false; // tslint:disable-next-line: prefer-for-of
              i = 0;
            case 9:
              if (!(i < this.discoveredDevices.length)) {
                _context18.next = 17;
                break;
              }
              if (!(this.discoveredDevices[i].serial === serial)) {
                _context18.next = 14;
                break;
              }
              alreadyFound = true;
              this.discoveredDevices[i] = tmpDev;
              return _context18.abrupt("break", 17);
            case 14:
              i++;
              _context18.next = 9;
              break;
            case 17:
              if (!alreadyFound) {
                this.discoveredDevices.push(tmpDev);
              }
              _context18.next = 20;
              return this.checkVersionNeedsUpdate(tmpDev);
            case 20:
              log.debug("current device list:", this.discoveredDevices);
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.DeviceListUpdate", this.discoveredDevices);
            case 22:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function onVEXBLEDeviceDiscovered(_x43, _x44, _x45, _x46, _x47) {
        return _onVEXBLEDeviceDiscovered.apply(this, arguments);
      }
      return onVEXBLEDeviceDiscovered;
    }()
  }, {
    key: "onVEXBLEDeviceLost",
    value: function onVEXBLEDeviceLost(serial) {
      log.debug("onVEXBLEDeviceLost", serial);
      // tslint:disable-next-line: prefer-for-of
      for (var i = 0; i < this.discoveredDevices.length; i++) {
        if (this.discoveredDevices[i].serial === serial) {
          this.discoveredDevices.splice(i, 1);
          break;
        }
      }
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.DeviceListUpdate", this.discoveredDevices);
    }
  }, {
    key: "onVEXBLEDeviceConnect",
    value: function () {
      var _onVEXBLEDeviceConnect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(name, serial, vexos, locked) {
        var tmpVersion;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              log.info("onVEXBLEDeviceConnect");
              tmpVersion = _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"].fromString(vexos);
              this.connectedDevice = {
                serial: serial,
                version: tmpVersion,
                versionFW: tmpVersion,
                name: name,
                deviceType: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXEXP,
                connectionMethod: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].BLE,
                brainConnected: true,
                needsFWUpdate: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure,
                canUpdate: false,
                battery: -1,
                isLocked: locked
              };
              if (!locked) {
                _context19.next = 7;
                break;
              }
              log.debug("brain is locked. need to implement a unlock code dialog...");
              _context19.next = 13;
              break;
            case 7:
              this.isConnected = true;
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.BrainInfoUpdated", this.connectedDevice);
              _context19.next = 11;
              return this.checkVersionNeedsUpdate(this.connectedDevice);
            case 11:
              this.triggerConnectionUpdate();
              // add another for the lock state change...
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.ConnectionStateChange", this.getConnectionState());
            case 13:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function onVEXBLEDeviceConnect(_x48, _x49, _x50, _x51) {
        return _onVEXBLEDeviceConnect.apply(this, arguments);
      }
      return onVEXBLEDeviceConnect;
    }()
  }, {
    key: "onVEXBLEDeviceDisconnect",
    value: function onVEXBLEDeviceDisconnect() {
      log.warn("onVEXBLEDeviceDisconnect");
      this.isConnected = false;
      this.triggerConnectionUpdate();
    }
  }, {
    key: "onVEXBLELockCodeDisplayed",
    value: function onVEXBLELockCodeDisplayed() {
      this.displayLockCodePrompt();
    }
  }, {
    key: "onVEXBLEDeviceUnlocked",
    value: function onVEXBLEDeviceUnlocked() {
      log.info("brain is unlocked. what should happen here?");
      localStorage.setItem(this.lastBrainKey, this.lastLockCode);
      log.debug("saved lock code:", localStorage.getItem(this.lastBrainKey));
      log.debug("connected device null???", this.connectedDevice);
      this.connectedDevice.isLocked = false;
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.BrainInfoUpdated", this.connectedDevice);
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.ConnectionStateChange", this.getConnectionState());
    }
  }, {
    key: "onVEXBLEDownloadProgressUpdate",
    value: function onVEXBLEDownloadProgressUpdate(progress, retry, limit, quality) {
      this.onEXPBLEDownloadProgressEvent.fire({
        progress: progress,
        retry: retry,
        limit: limit,
        quality: quality
      });
    }
    //#endregion events

    //#region misc
  }, {
    key: "lockCodeValidator",
    value: function lockCodeValidator(value) {
      if (value.length < 4) {
        return "id is too short. id must be 4 characters.";
      } else if (value.length > 4) {
        return "id is too long. id must be 4 characters.";
      } else if (value.match(/[^\d]/)) {
        return "constains invalid characters. id must be 4 decimal characters.";
      } else {
        return null;
      }
    }
  }, {
    key: "displayLockCodePrompt",
    value: function displayLockCodePrompt() {
      var _this7 = this;
      log.debug("displaying prompt for brain lock code");
      var recentBrain = localStorage.getItem(_brainInfoStore__WEBPACK_IMPORTED_MODULE_12__["brainRecentKey"]);
      var brainKey = brainLockKey + recentBrain;
      var currKey = localStorage.getItem(brainKey);
      this.lastBrainKey = brainKey;
      log.debug("brainkey: ", brainKey);
      log.debug("current key: " + currKey);
      if (!currKey) {
        _widget_Modal__WEBPACK_IMPORTED_MODULE_11__["MODALCONTROL"].showBrainLockCodePrompt(this.lockCodeValidator, function (result) {
          if (result) {
            _this7.lastLockCode = result;
            _this7.unlockBrain(result);
          } else {
            // TODO: how should we actually handle a user not entering a lock code?
            // displayLockCodePrompt();
            _this7.closeConnection();
          }
        });
      } else {
        log.debug("key found and sending that automatically");
        this.unlockBrain(currKey);
      }
    }
  }, {
    key: "checkVersionNeedsUpdate",
    value: function () {
      var _checkVersionNeedsUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(device) {
        var currentVersion, brainVersion, updateNeeded;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return this.getCurrentFirmware();
            case 2:
              currentVersion = _context20.sent;
              brainVersion = device.version;
              updateNeeded = brainVersion.compare(currentVersion) < 0;
              device.needsFWUpdate = updateNeeded ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate;
            case 6:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function checkVersionNeedsUpdate(_x52) {
        return _checkVersionNeedsUpdate.apply(this, arguments);
      }
      return checkVersionNeedsUpdate;
    }() //#endregion misc
    //#region low-level logger
  }, {
    key: "getLowLevelLogger",
    value: function getLowLevelLogger() {
      return null;
    }
    //#endregion low-level logger
  }]);
  return EXPBLE;
}(_EXPInterface__WEBPACK_IMPORTED_MODULE_4__["EXPInterface"]);


/***/ }),

/***/ "./src/HardwareInterface/types/HWTabletEnums.ts":
/*!******************************************************!*\
  !*** ./src/HardwareInterface/types/HWTabletEnums.ts ***!
  \******************************************************/
/*! exports provided: VEXosVID, VEXosDownloadTarget, VEXosExtType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXosVID", function() { return VEXosVID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXosDownloadTarget", function() { return VEXosDownloadTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEXosExtType", function() { return VEXosExtType; });
// TODO: this file should all be part of the web serial code....
var VEXosVID = /*#__PURE__*/function (VEXosVID) {
  VEXosVID[VEXosVID["NONE"] = 0] = "NONE";
  VEXosVID[VEXosVID["USER"] = 1] = "USER";
  VEXosVID[VEXosVID["VEXVM"] = 64] = "VEXVM";
  VEXosVID[VEXosVID["VEX"] = 240] = "VEX";
  VEXosVID[VEXosVID["UNDEFINED"] = 241] = "UNDEFINED";
  VEXosVID[VEXosVID["FF"] = 255] = "FF";
  return VEXosVID;
}(VEXosVID || {});
var VEXosDownloadTarget = /*#__PURE__*/function (VEXosDownloadTarget) {
  VEXosDownloadTarget[VEXosDownloadTarget["NONE"] = 0] = "NONE";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_DDR"] = 0] = "FILE_TARGET_DDR";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_QSPI"] = 1] = "FILE_TARGET_QSPI";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_DDRC"] = 4] = "FILE_TARGET_DDRC";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_DDRE"] = 5] = "FILE_TARGET_DDRE";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_FLASH"] = 6] = "FILE_TARGET_FLASH";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_RADIO"] = 7] = "FILE_TARGET_RADIO";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_A1"] = 13] = "FILE_TARGET_A1";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_B1"] = 14] = "FILE_TARGET_B1";
  VEXosDownloadTarget[VEXosDownloadTarget["FILE_TARGET_B2"] = 15] = "FILE_TARGET_B2";
  return VEXosDownloadTarget;
}(VEXosDownloadTarget || {});
var VEXosExtType = /*#__PURE__*/function (VEXosExtType) {
  VEXosExtType[VEXosExtType["General"] = 0] = "General";
  VEXosExtType[VEXosExtType["VEXVM"] = 97] = "VEXVM";
  return VEXosExtType;
}(VEXosExtType || {});


/***/ })

}]);
//# sourceMappingURL=1ea5439ce31a85c81cb0.17.bundle.js.map