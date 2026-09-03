this["webpackChunkwebapp"]([25],{

/***/ "./src/HardwareInterface/GO123/GO123WebBLE.ts":
/*!****************************************************!*\
  !*** ./src/HardwareInterface/GO123/GO123WebBLE.ts ***!
  \****************************************************/
/*! exports provided: HWDownloadProgressCallback, GO123WebBLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GO123WebBLE", function() { return GO123WebBLE; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _VexVersion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VexVersion */ "./src/HardwareInterface/VexVersion.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./src/HardwareInterface/helpers.ts");
/* harmony import */ var _HWInterfaceBase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../HWInterfaceBase */ "./src/HardwareInterface/HWInterfaceBase.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HWDownloadProgressCallback", function() { return _HWInterfaceBase__WEBPACK_IMPORTED_MODULE_5__["HWDownloadProgressCallback"]; });

/* harmony import */ var _GO123Interface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GO123Interface */ "./src/HardwareInterface/GO123/GO123Interface.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../helpers */ "./src/helpers.ts");
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @rm-vca/vex-ble-device-manager */ "./node_modules/@rm-vca/vex-ble-device-manager/dist_lib/src/index.js");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("GO123WebBLE");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// interface types/enums



// interface types/enums/classes



// parent classes/types



// external imports



// low-level interface

var GO123WebBLE = /*#__PURE__*/function (_GO123Interface) {
  _inherits(GO123WebBLE, _GO123Interface);
  var _super = _createSuper(GO123WebBLE);
  function GO123WebBLE() {
    var _this;
    _classCallCheck(this, GO123WebBLE);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "updatingFWnotBL", false);
    _defineProperty(_assertThisInitialized(_this), "runningLowLevelUpdate", false);
    _defineProperty(_assertThisInitialized(_this), "expectDisconnect", false);
    //#endregion brain info
    //#region program control
    //#endregion program control
    //#region project downloads
    //#endregion project downloads
    //#region compilers
    //#endregion compilers
    //#region script commands
    _defineProperty(_assertThisInitialized(_this), "ackHandler", null);
    //#region status events
    //#endregion status events
    //#endregion native -> webapp events
    //#region webBLE event wrappers
    _defineProperty(_assertThisInitialized(_this), "firstUpdateAfterConnect", false);
    _defineProperty(_assertThisInitialized(_this), "alreadyConnected", false);
    _defineProperty(_assertThisInitialized(_this), "firstUpdateAfterBLUpdate", false);
    log.debug("construct GO123WebBLE");
    _this.initWebBLE();
    _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["setFirmwareToBeta"](_helpers__WEBPACK_IMPORTED_MODULE_4__["firmwareChannel"]);
    _this.onWebBLEPortUpdate = _this.onWebBLEPortUpdate.bind(_assertThisInitialized(_this));
    _this.onWebBLEConnectionStateChange = _this.onWebBLEConnectionStateChange.bind(_assertThisInitialized(_this));
    _this.onWebBLEFWUpdateProgress = _this.onWebBLEFWUpdateProgress.bind(_assertThisInitialized(_this));
    _this.onWebBLEFWUpdateComplete = _this.onWebBLEFWUpdateComplete.bind(_assertThisInitialized(_this));
    _this.onWebBLESensorUpdate = _this.onWebBLESensorUpdate.bind(_assertThisInitialized(_this));
    _this.onWebBLEDeviceInfo = _this.onWebBLEDeviceInfo.bind(_assertThisInitialized(_this));
    _this.onackReceived = _this.onackReceived.bind(_assertThisInitialized(_this));
    var events = _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["VEXBLEChromeEvents"];
    events.on("VEXBLEBrowser.PortCommandStatus", _this.onWebBLEPortUpdate);
    events.on("VEXBLEBrowser.ConnectionState", _this.onWebBLEConnectionStateChange);
    events.on("VEXBLEBrowser.FWUpdateProgress", _this.onWebBLEFWUpdateProgress);
    events.on("VEXBLEBrowser.FWUpdateComplete", _this.onWebBLEFWUpdateComplete);
    events.on("VEXBLEBrowser.SensorStatus", _this.onWebBLESensorUpdate);
    events.on("VEXBLEBrowser.DeviceInfo", _this.onWebBLEDeviceInfo);
    events.on("VEXBLEBrowser.AckReceived", _this.onackReceived);
    return _this;
  }
  _createClass(GO123WebBLE, [{
    key: "openConnectionToBrain",
    value: //#region connection control
    function () {
      var _openConnectionToBrain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              log.warn("openConnectionToBrain should never be called for webble...");
              return _context.abrupt("return", true);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function openConnectionToBrain(_x) {
        return _openConnectionToBrain.apply(this, arguments);
      }
      return openConnectionToBrain;
    }()
  }, {
    key: "getConnectionState",
    value: function getConnectionState() {
      if (this.updatingDevice) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].UpdatingFirmware;
      } else if (this.checkingDeviceFirmware) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].CheckingFirmware;
      }
      var currConnectionState = _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]();
      log.debug("connection state from manager:", _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["BrainConnectionState"][currConnectionState]);
      return currConnectionState;
    }

    //#region internal calls for connection control
  }, {
    key: "_openConnection",
    value: function _openConnection() {
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["scanAndConnect"]().then(function () {
        return;
      })["catch"](function (err) {
        log.error(err);
        throw new Error("error starting scan");
      });
    }
  }, {
    key: "_closeConnection",
    value: function _closeConnection() {
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["disconnect"]().then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error stopping scan");
      });
    }
    //#endregion internal calls for connection control
    //#endregion connection control

    //#region brain info
    /**
     * sets the name of the currently connected brain
     * @param name the name to set the brain to
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
  }, {
    key: "setBrainName",
    value: function setBrainName(name) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }

      // TODO: finish this
      throw new Error("Not yet implemented");
    }
  }, {
    key: "executeScriptCommand",
    value: function executeScriptCommand(command) {
      var _this2 = this;
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("executeScriptCommand -", command);
      return new Promise(function (resolve, reject) {
        _this2.ackHandler = function (ackSuccess, commandID) {
          resolve(ackSuccess && commandID === 0x20);
          _this2.ackHandler = null;
        };
        _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["sendCommand"](command)["catch"](function () {
          _this2.ackHandler = null;
          reject(new Error("error sending command to device"));
        });
      });
    }
  }, {
    key: "executeScriptCommands",
    value: function executeScriptCommands(commands) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("executeScriptCommands -", commands);
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["sendCommandMultiple"](commands).then(function () {
        log.debug("commands sent");
        return true;
      })["catch"](function (error) {
        log.error(error);
        throw new Error("error sending commands to device");
      });
    }
  }, {
    key: "stopScriptEngine",
    value: function stopScriptEngine() {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("stopScriptEngine");
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["stopProgram"]();
    }
  }, {
    key: "setConfigPreset",
    value: function setConfigPreset(preset) {
      var _this3 = this;
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("setConfigPreset -", preset);
      return new Promise(function (resolve, reject) {
        _this3.ackHandler = function (ackSuccess, commandID) {
          resolve(ackSuccess && commandID === 0x50);
          _this3.ackHandler = null;
        };
        _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["sendRobotConfigPreset"](preset)["catch"](function () {
          _this3.ackHandler = null;
          reject(new Error("error sending config to device"));
        });
      });
    }
  }, {
    key: "setConfigForPort",
    value: function setConfigForPort(port, deviceType, flags) {
      var _this4 = this;
      var limitPct = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 66;
      var limitMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 750;
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("setConfigForPort -", port, deviceType, flags, limitPct, limitMax);
      return new Promise(function (resolve, reject) {
        _this4.ackHandler = function (ackSuccess, commandID) {
          resolve(ackSuccess && commandID === 0x51);
          _this4.ackHandler = null;
        };
        _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["setPortConfig"](port, deviceType, flags, limitPct, limitMax)["catch"](function () {
          _this4.ackHandler = null;
          reject(new Error("error sending config to device"));
        });
      });
    }
  }, {
    key: "setEyeSensorMode",
    value: function setEyeSensorMode(mode) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("setEyeSensorMode -", mode);
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["SetSensorMode"](mode).then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error sending sensor mode to device");
      });
    }
  }, {
    key: "clearPortEvents",
    value: function clearPortEvents(port) {
      var _this5 = this;
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("clearPortEvents -", port);
      return new Promise(function (resolve, reject) {
        _this5.ackHandler = function (ackSuccess, commandID) {
          resolve(ackSuccess && commandID === 0x21);
          _this5.ackHandler = null;
        };
        _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["clearPortEvents"](port)["catch"](function (err) {
          _this5.ackHandler = null;
          log.error("error clearing port event");
          log.error(err);
          reject(new Error("error clearing port event"));
        });
      });
    }
    //#endregion script commands

    //#region remote control
  }, {
    key: "sendControllerButton",
    value: function () {
      var _sendControllerButton = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(command, buttonID) {
        var _this6 = this;
        var whenPressed,
          prom,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              whenPressed = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;
              log.debug("sendControllerButton - command", command, "buttonID", buttonID, "whenPressed", whenPressed);
              _context2.next = 4;
              return new Promise(function (resolve, reject) {
                _this6.ackHandler = function (ackSuccess, commandID) {
                  resolve(ackSuccess && commandID === 0xA0);
                  _this6.ackHandler = null;
                };
                _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["controllerAddButtonCommand"](command, buttonID.valueOf(), whenPressed)["catch"](function () {
                  _this6.ackHandler = null;
                  reject("error sending config to device");
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 4:
              prom = _context2.sent;
              return _context2.abrupt("return", prom);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function sendControllerButton(_x2, _x3) {
        return _sendControllerButton.apply(this, arguments);
      }
      return sendControllerButton;
    }()
  }, {
    key: "sendControllerJoystickPreset",
    value: function () {
      var _sendControllerJoystickPreset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(newType) {
        var _this7 = this;
        var driveSensi,
          turnSensi,
          prom,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              driveSensi = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 50;
              turnSensi = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 50;
              log.debug("sendControllerJoystickPreset - newType", newType, "driveSensi", driveSensi, "turnSensi", turnSensi);
              _context3.next = 5;
              return new Promise(function (resolve, reject) {
                _this7.ackHandler = function (ackSuccess, commandID) {
                  resolve(ackSuccess && commandID === 0xA3);
                  _this7.ackHandler = null;
                };
                _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["setControlDriveStickType"](newType.valueOf(), driveSensi, turnSensi)["catch"](function () {
                  _this7.ackHandler = null;
                  reject("error sending config to device");
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 5:
              prom = _context3.sent;
              return _context3.abrupt("return", prom);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function sendControllerJoystickPreset(_x4) {
        return _sendControllerJoystickPreset.apply(this, arguments);
      }
      return sendControllerJoystickPreset;
    }()
  }, {
    key: "saveControllerConfig",
    value: function saveControllerConfig() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
  }, {
    key: "sendControllerValues",
    value: function () {
      var _sendControllerValues = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(leftX, leftY, rightX, rightY, buttons) {
        var _this8 = this;
        var prom;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return new Promise(function (resolve, reject) {
                var bitMap = _this8.getButtonBitMap(buttons);
                _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["setControlControlValues"](leftX, leftY, rightX, rightY, bitMap).then(function () {
                  resolve(true);
                })["catch"](function (error) {
                  log.error(error);
                  reject("error sending command to device");
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 2:
              prom = _context4.sent;
              return _context4.abrupt("return", prom);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function sendControllerValues(_x5, _x6, _x7, _x8, _x9) {
        return _sendControllerValues.apply(this, arguments);
      }
      return sendControllerValues;
    }()
  }, {
    key: "getButtonBitMap",
    value: function getButtonBitMap(buttons) {
      var bitMap = 0;
      for (var i = 0; i < buttons.length; i++) {
        var bit = buttons[i];
        var newBit = (bit ? 1 : 0) << i;
        bitMap = bitMap | newBit;
      }
      return bitMap;
    }
    //#endregion remote control

    //#region firmware
  }, {
    key: "getCurrentFirmware",
    value: function () {
      var _getCurrentFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.getBrainInfo();
            case 2:
              return _context5.abrupt("return", _context5.sent.versionFW);
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getCurrentFirmware() {
        return _getCurrentFirmware.apply(this, arguments);
      }
      return getCurrentFirmware;
    }()
  }, {
    key: "_getConnectedBrainBootloader",
    value: //#endregion firmware
    //#region internal firmware
    //#endregion internal firmware
    //#region internal firmware low level
    function () {
      var _getConnectedBrainBootloader2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getDeviceBootloaderVersion"]();
            case 2:
              return _context6.abrupt("return", _context6.sent.getString());
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function _getConnectedBrainBootloader() {
        return _getConnectedBrainBootloader2.apply(this, arguments);
      }
      return _getConnectedBrainBootloader;
    }()
  }, {
    key: "getOnlineFWVersion",
    value: function () {
      var _getOnlineFWVersion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(deviceType) {
        var product, versionStr;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              product = this._deviceTypeToProdcutType(deviceType);
              _context7.next = 3;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getLatestFirmwareVersion"](_helpers__WEBPACK_IMPORTED_MODULE_4__["firmwareChannel"]);
            case 3:
              versionStr = _context7.sent.getString().replace("b", ".");
              return _context7.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(versionStr));
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getOnlineFWVersion(_x10) {
        return _getOnlineFWVersion.apply(this, arguments);
      }
      return getOnlineFWVersion;
    }()
  }, {
    key: "getOnlineBLVersion",
    value: function () {
      var _getOnlineBLVersion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(deviceType) {
        var product, versionStr;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              product = this._deviceTypeToProdcutType(deviceType);
              _context8.next = 3;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getLatestBootloaderVersion"]();
            case 3:
              versionStr = _context8.sent.getString().replace("b", ".");
              return _context8.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(versionStr));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getOnlineBLVersion(_x11) {
        return _getOnlineBLVersion.apply(this, arguments);
      }
      return getOnlineBLVersion;
    }()
  }, {
    key: "lowLevelUpdateFW",
    value: function () {
      var _lowLevelUpdateFW = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(progressCallback) {
        var _this9 = this;
        var forceUpdate,
          isFWSupported,
          needsFW,
          res,
          resError,
          _args10 = arguments;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              forceUpdate = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : false;
              this.updatingFWnotBL = true;
              log.debug("lowLevelUpdateFW");
              log.debug("checking that we are actually connected again");
              if (!(!this.targetDevice || _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]() !== _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["BrainConnectionState"].Connected)) {
                _context10.next = 7;
                break;
              }
              log.warn("error starting firmware update process. error code:", 10);
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingFWUpdate"]();
            case 7:
              log.debug("checking if FW update is supported");
              _context10.next = 10;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["IsFWUpdateSupported"]();
            case 10:
              isFWSupported = _context10.sent;
              if (isFWSupported) {
                _context10.next = 14;
                break;
              }
              log.debug("FW update is not supported?");
              return _context10.abrupt("return", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].UNSUPPORTED);
            case 14:
              log.debug("checking if we actually need to update the FW");
              needsFW = forceUpdate || this.targetDevice.needsFWUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              if (needsFW) {
                _context10.next = 19;
                break;
              }
              log.debug("skipping Firmware update as it is already up to date");
              return _context10.abrupt("return", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS);
            case 19:
              this.FWUpdateProgressCB = progressCallback;
              res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
              resError = null;
              _context10.prev = 22;
              _context10.next = 25;
              return new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
                  var retryCount, inCorrectMode;
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        log.info("starting firmware update process");
                        log.debug("checking that we are actually connected");
                        if (!(!_this9.targetDevice || _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]() !== _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["BrainConnectionState"].Connected)) {
                          _context9.next = 6;
                          break;
                        }
                        log.warn("error starting firmware update process. error code:", 10);
                        reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingFWUpdate"]());
                        return _context9.abrupt("return");
                      case 6:
                        retryCount = 0;
                        inCorrectMode = _this9.targetDevice.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE;
                        _context9.prev = 8;
                      case 9:
                        if (!(!inCorrectMode && retryCount < 2)) {
                          _context9.next = 17;
                          break;
                        }
                        log.debug("try to enter bootload mode");
                        _context9.next = 13;
                        return _this9.changeModeAndWait(_types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE);
                      case 13:
                        inCorrectMode = _this9.targetDevice.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE;
                        if (!inCorrectMode) {
                          retryCount++;
                          log.warn("mode change fail", retryCount);
                        }
                        _context9.next = 9;
                        break;
                      case 17:
                        _context9.next = 23;
                        break;
                      case 19:
                        _context9.prev = 19;
                        _context9.t0 = _context9["catch"](8);
                        log.warn("error while changing mode");
                        inCorrectMode = false;
                      case 23:
                        if (inCorrectMode) {
                          _context9.next = 27;
                          break;
                        }
                        log.warn("error starting firmware update process. error code:", 21);
                        reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingFWUpdate"]());
                        return _context9.abrupt("return");
                      case 27:
                        _this9.resolveFWUpdatePromise = resolve;
                        log.debug("actually starting the FW udpate");
                        _context9.next = 31;
                        return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["updateFirmware"](_helpers__WEBPACK_IMPORTED_MODULE_4__["firmwareChannel"]);
                      case 31:
                        _this9.setUpdateTimeoutTimerCallback(function () {
                          log.warn("Firmware update failed due to progress timeout");
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]());
                        });
                        _this9.startUpdateTimeoutTimer(20000);
                        _this9.runningLowLevelUpdate = true;
                        log.debug("waiting for FW update to complete");
                      case 35:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9, null, [[8, 19]]);
                }));
                return function (_x13, _x14) {
                  return _ref.apply(this, arguments);
                };
              }());
            case 25:
              res = _context10.sent;
              _context10.next = 33;
              break;
            case 28:
              _context10.prev = 28;
              _context10.t0 = _context10["catch"](22);
              log.warn(_context10.t0);
              resError = _context10.t0;
              throw _context10.t0;
            case 33:
              _context10.prev = 33;
              this.stopUpdateTimeoutTimer();
              this.clearUpdateTimeoutTimerCallback();
              return _context10.finish(33);
            case 37:
              this.resolveFWUpdatePromise = null;
              this.FWUpdateProgressCB = null;
              log.debug("update complete with code", res);
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS)) {
                _context10.next = 57;
                break;
              }
              _context10.prev = 41;
              log.debug("waiting for reconnect");
              _context10.next = 45;
              return this.waitForReconnect(25000);
            case 45:
              this.expectDisconnect = false;
              _context10.next = 48;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(1000);
            case 48:
              _context10.next = 55;
              break;
            case 50:
              _context10.prev = 50;
              _context10.t1 = _context10["catch"](41);
              log.warn("failed to reconnect to updated device");
              this.connected = false;
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]();
            case 55:
              _context10.next = 63;
              break;
            case 57:
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE)) {
                _context10.next = 61;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]();
            case 61:
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].DISCONNECT)) {
                _context10.next = 63;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringFW"]();
            case 63:
              if (!resError) {
                _context10.next = 65;
                break;
              }
              throw resError;
            case 65:
              return _context10.abrupt("return", res);
            case 66:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[22, 28, 33, 37], [41, 50]]);
      }));
      function lowLevelUpdateFW(_x12) {
        return _lowLevelUpdateFW.apply(this, arguments);
      }
      return lowLevelUpdateFW;
    }()
  }, {
    key: "lowLevelUpdateBL",
    value: function () {
      var _lowLevelUpdateBL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(progressCallback) {
        var _this10 = this;
        var forceUpdate,
          isBLSupported,
          needsBL,
          res,
          resError,
          _args12 = arguments;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              forceUpdate = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : false;
              log.debug("lowLevelUpdateBL", this.targetDevice);
              this.updatingFWnotBL = false;
              log.debug("checking that we are actually connected");
              if (!(!this.targetDevice || _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]() !== _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["BrainConnectionState"].Connected)) {
                _context12.next = 7;
                break;
              }
              log.warn("error starting bootloader update process. error code:", 10);
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingBLUpdate"]();
            case 7:
              log.debug("checking if BL update is supported");
              _context12.next = 10;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["CanUpdateBootloader"]();
            case 10:
              isBLSupported = _context12.sent;
              if (isBLSupported) {
                _context12.next = 13;
                break;
              }
              return _context12.abrupt("return", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].UNSUPPORTED);
            case 13:
              log.debug("checking if we actually need to update the BL");
              needsBL = forceUpdate || this.targetDevice.needsBLUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              if (needsBL) {
                _context12.next = 18;
                break;
              }
              log.debug("skipping Bootloader update as it is already up to date");
              return _context12.abrupt("return", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS);
            case 18:
              this.BLUpdateProgressCB = progressCallback;
              res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
              resError = null;
              _context12.prev = 21;
              _context12.next = 24;
              return new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
                  var retryCount, inCorrectMode;
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                        log.info("starting bootloader update process");
                        log.debug("checking that we are actually connected again");
                        if (!(!_this10.targetDevice || _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]() !== _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["BrainConnectionState"].Connected)) {
                          _context11.next = 6;
                          break;
                        }
                        log.warn("error starting bootloader update process. error code:", 10);
                        reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingBLUpdate"]());
                        return _context11.abrupt("return");
                      case 6:
                        retryCount = 0;
                        inCorrectMode = _this10.targetDevice.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].CONNECT;
                        _context11.prev = 8;
                      case 9:
                        if (!(!inCorrectMode && retryCount < 2)) {
                          _context11.next = 17;
                          break;
                        }
                        log.debug("try to enter normal mode");
                        _context11.next = 13;
                        return _this10.changeModeAndWait(_types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].CONNECT);
                      case 13:
                        inCorrectMode = _this10.targetDevice.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].CONNECT;
                        if (!inCorrectMode) {
                          retryCount++;
                          log.info("mode change fail", retryCount);
                        }
                        _context11.next = 9;
                        break;
                      case 17:
                        _context11.next = 23;
                        break;
                      case 19:
                        _context11.prev = 19;
                        _context11.t0 = _context11["catch"](8);
                        log.warn("error while changing mode");
                        inCorrectMode = false;
                      case 23:
                        if (inCorrectMode) {
                          _context11.next = 27;
                          break;
                        }
                        log.warn("error starting bootloader update process. error code:", 22);
                        reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingBLUpdate"]());
                        return _context11.abrupt("return");
                      case 27:
                        _this10.resolveBLUpdatePromise = resolve;
                        log.debug("actually starting the BL udpate");
                        _context11.next = 31;
                        return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["updateFirmware"](_rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["VEXFirmwareType"].Bootloader);
                      case 31:
                        _this10.setUpdateTimeoutTimerCallback(function () {
                          log.warn("Bootloader update failed due to progress timeout");
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingBL"]());
                        });
                        _this10.startUpdateTimeoutTimer(20000);
                        _this10.runningLowLevelUpdate = true;
                        log.debug("waiting for BL update to complete");
                      case 35:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11, null, [[8, 19]]);
                }));
                return function (_x16, _x17) {
                  return _ref2.apply(this, arguments);
                };
              }());
            case 24:
              res = _context12.sent;
              _context12.next = 31;
              break;
            case 27:
              _context12.prev = 27;
              _context12.t0 = _context12["catch"](21);
              resError = _context12.t0;
              throw _context12.t0;
            case 31:
              _context12.prev = 31;
              this.stopUpdateTimeoutTimer();
              this.clearUpdateTimeoutTimerCallback();
              return _context12.finish(31);
            case 35:
              this.resolveBLUpdatePromise = null;
              this.BLUpdateProgressCB = null;
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE)) {
                _context12.next = 41;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingBL"]();
            case 41:
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].DISCONNECT)) {
                _context12.next = 43;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringBL"]();
            case 43:
              if (!resError) {
                _context12.next = 45;
                break;
              }
              throw resError;
            case 45:
              return _context12.abrupt("return", res);
            case 46:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[21, 27, 31, 35]]);
      }));
      function lowLevelUpdateBL(_x15) {
        return _lowLevelUpdateBL.apply(this, arguments);
      }
      return lowLevelUpdateBL;
    }()
  }, {
    key: "changeModeAndWait",
    value: function () {
      var _changeModeAndWait = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(mode) {
        var timeoutms,
          _args13 = arguments;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              timeoutms = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 15000;
              log.debug("trying to change to mode", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"][mode]);
              if (mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].CONNECT || mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE) {
                _context13.next = 4;
                break;
              }
              throw new Error("unsupported mode");
            case 4:
              this.expectDisconnect = true;
              if (!(mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].CONNECT)) {
                _context13.next = 10;
                break;
              }
              _context13.next = 8;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["reboot"]();
            case 8:
              _context13.next = 12;
              break;
            case 10:
              _context13.next = 12;
              return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["bootload"]();
            case 12:
              _context13.prev = 12;
              _context13.next = 15;
              return this.waitForReconnect(timeoutms);
            case 15:
              _context13.next = 20;
              break;
            case 17:
              _context13.prev = 17;
              _context13.t0 = _context13["catch"](12);
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorModeChangeConnectionLost"]();
            case 20:
              this.expectDisconnect = false;
              _context13.next = 23;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(500);
            case 23:
              // just to be safe
              log.debug("done with mode change?");
            case 24:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[12, 17]]);
      }));
      function changeModeAndWait(_x18) {
        return _changeModeAndWait.apply(this, arguments);
      }
      return changeModeAndWait;
    }()
  }, {
    key: "enableSleep",
    value: function () {
      var _enableSleep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
            case "end":
              return _context14.stop();
          }
        }, _callee14);
      }));
      function enableSleep() {
        return _enableSleep.apply(this, arguments);
      }
      return enableSleep;
    }()
  }, {
    key: "disableSleep",
    value: function () {
      var _disableSleep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      function disableSleep() {
        return _disableSleep.apply(this, arguments);
      }
      return disableSleep;
    }() //#endregion internal firmware low level
    //#region events
  }, {
    key: "registerSuspendCallback",
    value: function registerSuspendCallback(callback) {
      // this should not do anything for webBLE
    }
  }, {
    key: "unregisterSuspendCallback",
    value: function unregisterSuspendCallback(callback) {
      // this should not do anything for webBLE
    }
    //#endregion

    //#region native -> webapp events
  }, {
    key: "onGO123BLEDeviceDiscovered",
    value: function onGO123BLEDeviceDiscovered(name, serial, product, mode, version, rssi, battery) {
      var _this11 = this;
      var canUpdate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
      log.debug("onGO123BLEDeviceDiscovered", name, serial, product, mode, version, rssi, battery);
      if (this.connectionTargetDevice && this.connectionTargetDevice.serial === serial) {
        var newVersion = _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(version);
        if (this.connectionTargetDevice.mode !== mode || this.connectionTargetDevice.version.compare(newVersion) !== 0) {
          log.debug("updating connection target");
          this.connectionTargetDevice.mode = mode;
          this.connectionTargetDevice.version = newVersion;
          log.debug("setup for FW/BL recheck");
          this.connectionTargetDevice.needsFWUpdate = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
          this.connectionTargetDevice.needsBLUpdate = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
          this.checkDeviceFirmwares(this.connectionTargetDevice).then(function () {
            _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.DeviceListUpdate", _this11.discoveredDevices);
          });
        }
        return;
      }
      log.debug("initial targetDevice:", this.targetDevice);
      if (this.targetDevice && this.targetDevice.serial === serial) {
        this.targetDevice.name = name;
        this.targetDevice.canUpdate = canUpdate;
        log.debug("updated connected device to", this.targetDevice);
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.BrainInfoUpdated", this.targetDevice);
        return;
      }
      this.processDiscoveredDevice(name, serial, product, mode, version, rssi, battery, canUpdate);
    }
  }, {
    key: "onGO123BLEDeviceConnected",
    value: function () {
      var _onGO123BLEDeviceConnected = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(name, serial, version, mode, canUpdate) {
        var i;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              log.info("onGO123BLEDeviceConnected");
              if (this.connectionResolver) {
                this.connected = true;
                this.resetStatusValues();
                this.connectionResolver.resolve(true);
              }
              this.connectionResolver = null;
              this.connected = true;
              this.resetStatusValues();
              if (!(!this.connectionTargetDevice || this.connectionTargetDevice.serial !== serial)) {
                _context16.next = 14;
                break;
              }
              i = 0;
            case 7:
              if (!(i < this.discoveredDevices.length)) {
                _context16.next = 14;
                break;
              }
              if (!(this.discoveredDevices[i].serial === serial)) {
                _context16.next = 11;
                break;
              }
              this.connectionTargetDevice = this.discoveredDevices[i];
              return _context16.abrupt("break", 14);
            case 11:
              i++;
              _context16.next = 7;
              break;
            case 14:
              log.debug("old targetDevice", this.targetDevice);
              log.debug("connectionTargetDevice", this.connectionTargetDevice);
              this.targetDevice = Object.assign({}, this.connectionTargetDevice);
              this.targetDevice.canUpdate = canUpdate;
              this.targetDevice.mode = mode;
              log.debug("connectedDevice:", this.targetDevice);
              _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["enablePortCmdStatus"](true);
              _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["enableSensorStatus"](true);
              _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["enableProgramCommandStatus"](true); // ack status

              this.triggerConnectionUpdate();
              log.info("onGOBLEDeviceConnected", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"][mode]);
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.BrainInfoUpdated", this.targetDevice);
              this.checkAndUpdateDevice();
            case 27:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function onGO123BLEDeviceConnected(_x19, _x20, _x21, _x22, _x23) {
        return _onGO123BLEDeviceConnected.apply(this, arguments);
      }
      return onGO123BLEDeviceConnected;
    }()
  }, {
    key: "onGO123BLEDeviceBLUpdated",
    value: function () {
      var _onGO123BLEDeviceBLUpdated = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(name, serial, version, mode, canUpdate) {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              this.resetStatusValues();
              this.targetDevice.name = name;
              this.targetDevice.version = _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(version);
              this.targetDevice.mode = mode;
              log.debug("targetDevice:", this.targetDevice);
              this.triggerConnectionUpdate();
              log.info("onGOBLEDeviceConnected", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"][mode]);
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.BrainInfoUpdated", this.targetDevice);
            case 8:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function onGO123BLEDeviceBLUpdated(_x24, _x25, _x26, _x27, _x28) {
        return _onGO123BLEDeviceBLUpdated.apply(this, arguments);
      }
      return onGO123BLEDeviceBLUpdated;
    }()
  }, {
    key: "onGO123BLEDeviceDisconnected",
    value: function onGO123BLEDeviceDisconnected() {
      if (this.disconnectionResolver) {
        this.connected = false;
        this.disconnectionResolver.resolve(true);
      }
      this.disconnectionResolver = null;
      if (this.connected && !this.expectDisconnect) {
        log.info("device disconnected");
        this.connected = false;
        this.checkingDeviceFirmware = false;
        this.updatingDevice = false;
        if (this.runningLowLevelUpdate) {
          if (this.updatingFWnotBL) {
            this.onGO123BLEDeviceFWUpdateComplete(2);
          } else {
            this.onGO123BLEDeviceBLUpdateComplete(2);
          }
        }
        this.runningLowLevelUpdate = false;
        this.triggerConnectionUpdate();
        log.info("onGOBLEDeviceDisconnected");
      }
    }
  }, {
    key: "onWebBLEConnectionStateChange",
    value: function onWebBLEConnectionStateChange(state) {
      log.debug("onWebBLEConnectionStateChange", this.firstUpdateAfterConnect);
      if (state === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected) {
        if (!this.alreadyConnected) {
          this.alreadyConnected = true;
          this.firstUpdateAfterConnect = true;
        }
      } else if (state === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connecting || state === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Scanning) {
        this.alreadyConnected = false;
        this.firstUpdateAfterConnect = false;
        if (!this.updatingDevice) {
          this.onGO123BLEDeviceDisconnected();
        } else if (this.runningLowLevelUpdate) {
          var resultCode = 2; // 2 indicates disconnect
          if (this.updatingFWnotBL) {
            this.onGO123BLEDeviceFWUpdateComplete(resultCode);
          } else {
            this.onGO123BLEDeviceBLUpdateComplete(resultCode);
          }
        }
      }
      this.triggerConnectionUpdate();
    }
  }, {
    key: "onWebBLEFWUpdateProgress",
    value: function onWebBLEFWUpdateProgress(progress) {
      log.debug("onWebBLEFWUpdateProgress");
      if (this.updatingFWnotBL) {
        this.onGO123BLEDeviceFWUpdateProgress(progress);
      } else {
        this.onGO123BLEDeviceBLUpdateProgress(progress);
      }
    }
  }, {
    key: "onWebBLEFWUpdateComplete",
    value: function onWebBLEFWUpdateComplete(status) {
      log.debug("onWebBLEFWUpdateComplete");
      var success = status === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["VEXFWUpdateStatus"].Success;
      var connectionLost = status === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["VEXFWUpdateStatus"].ConnectionLost || status === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["VEXFWUpdateStatus"].CommunicationFailure;
      var resultCode = success ? 0 : connectionLost ? 2 : 1;
      if (this.updatingFWnotBL) {
        this.onGO123BLEDeviceFWUpdateComplete(resultCode);
      } else {
        this.onGO123BLEDeviceBLUpdateComplete(resultCode);
      }
    }
  }, {
    key: "onWebBLESensorUpdate",
    value: function onWebBLESensorUpdate(data) {
      // log.debug("onWebBLESensorUpdate");
      this.onGO123BLESensorUpdate({
        brightness: data.Brightness,
        hue: data.Hue,
        proximity: data.Proximity,
        accX: data.AccX,
        accY: data.AccY,
        accZ: data.AccZ,
        gyroX: data.GyroX,
        gyroY: data.GyroY,
        gyroZ: data.GyroZ,
        pitch: data.Pitch,
        roll: data.Roll,
        yaw: data.Yaw,
        floor: data.Floor
      });
    }
  }, {
    key: "onWebBLEDeviceInfo",
    value: function onWebBLEDeviceInfo(device) {
      log.debug("onWebBLEDeviceInfo");
      if (device.name === undefined) {
        return;
      }
      var appVersion = device.appVersion.getString();
      this.onGO123BLEDeviceDiscovered(device.name, device.deviceIDValue, device.productType, device.deviceMode, appVersion, -200, -1, device.supportFWUpdate);
      if (_rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]() === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected && this.firstUpdateAfterConnect) {
        this.firstUpdateAfterConnect = false;
        this.onGO123BLEDeviceConnected(device.name, device.deviceIDValue, appVersion, device.deviceMode, device.supportFWUpdate);
      }
      if (_rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getConnectionState"]() === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected && this.firstUpdateAfterBLUpdate) {
        log.debug("setting device info after bl update:", device.supportFWUpdate);
        this.firstUpdateAfterBLUpdate = false;
        this.onGO123BLEDeviceBLUpdated(device.name, device.deviceIDValue, appVersion, device.deviceMode, device.supportFWUpdate);
      }
    }
  }, {
    key: "onackReceived",
    value: function onackReceived(command, ackStatus, data) {
      log.debug("onackReceived");
      log.debug("ack received for", command.toString(16), "with data", data.toString(16));
      if (this.ackHandler) {
        this.ackHandler(ackStatus === _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["VEXAckValue"].success, command);
      }
    }
    //#endregion webBLE event wrappers

    //#region low-level logger
  }, {
    key: "getLowLevelLogger",
    value: function getLowLevelLogger() {
      // TODO: the device manager still uses the old version of the logger...
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["Logger"];
    }
    //#endregion low-level logger
  }, {
    key: "getHardwareInfo",
    value: function getHardwareInfo() {
      return _rm_vca_vex_ble_device_manager__WEBPACK_IMPORTED_MODULE_9__["getMachineBleHardwareInfo"]("ChromeApp");
    }
  }]);
  return GO123WebBLE;
}(_GO123Interface__WEBPACK_IMPORTED_MODULE_6__["GO123Interface"]);


/***/ })

});
//# sourceMappingURL=afbee2011e24b71f01f0.25.bundle.js.map