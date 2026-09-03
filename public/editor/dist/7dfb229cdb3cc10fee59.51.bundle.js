this["webpackChunkwebapp"]([51],{

/***/ "./src/HardwareInterface/IQEXPV5/EXP/EXPNativeUSB.ts":
/*!***********************************************************!*\
  !*** ./src/HardwareInterface/IQEXPV5/EXP/EXPNativeUSB.ts ***!
  \***********************************************************/
/*! exports provided: EXPNativeUSB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPNativeUSB", function() { return EXPNativeUSB; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rm-vca/vexcode-webserial */ "./node_modules/@rm-vca/vexcode-webserial/dist/index.js");
/* harmony import */ var _EXPInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EXPInterface */ "./src/HardwareInterface/IQEXPV5/EXP/EXPInterface.ts");
/* harmony import */ var _VexVersion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VexVersion */ "./src/HardwareInterface/VexVersion.ts");
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @rm-vca/vexcode-device-manager */ "./node_modules/@rm-vca/vexcode-device-manager/dist/src/index.js");
/* harmony import */ var _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../helpers */ "./src/HardwareInterface/helpers.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("EXPNativeUSB");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// interface types/enums



// TODO: cleanup imports



// imports external to hardware interface





// DeviceManager.logger.enableAll();
var EXPNativeUSB = /*#__PURE__*/function (_EXPInterface) {
  _inherits(EXPNativeUSB, _EXPInterface);
  var _super = _createSuper(EXPNativeUSB);
  function EXPNativeUSB() {
    var _this;
    _classCallCheck(this, EXPNativeUSB);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "isUpdating", false);
    _defineProperty(_assertThisInitialized(_this), "dm", _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__);
    _defineProperty(_assertThisInitialized(_this), "isConnected", false);
    _defineProperty(_assertThisInitialized(_this), "_didTryFirmwareUpdate", false);
    _defineProperty(_assertThisInitialized(_this), "_didTryControllerFirmwareUpdate", false);
    //#endregion User Port comms
    //#region events
    _defineProperty(_assertThisInitialized(_this), "lastConnectionState", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected);
    _defineProperty(_assertThisInitialized(_this), "triggerConnectionUpdate", function (device) {
      var newState = _this.getConnectionState();
      if (_this.lastConnectionState !== newState) {
        _this.lastConnectionState = newState;
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.ConnectionStateChange", newState);
      }
      if (device && device.connectionType && device.connectionType === "Radio") {
        var newBrainInfo = _this.getBrainInfo();
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.BrainInfoUpdated", newBrainInfo);
      }
      if (newState === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected) {
        _this.fireEvent("brainConnected", _this.getBrainInfo());
      } else if (newState === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected) {
        _this.fireEvent("brainDisconnected");
      }
    });
    _defineProperty(_assertThisInitialized(_this), "didDeviceRecheck", false);
    _this.onConnect = _this.onConnect.bind(_assertThisInitialized(_this));
    _this.onDisconnect = _this.onDisconnect.bind(_assertThisInitialized(_this));

    // TODO: use actual EXP interface
    _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["init"]("EXP");
    _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["enableTerminal"](function (data) {
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.TerminalDataUpdate", data);
    });
    _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["addOnDeviceConnectionHandler"](_this.onConnect);
    _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["addOnDeviceDisconnectionHandler"](_this.onDisconnect);
    return _this;
  }
  _createClass(EXPNativeUSB, [{
    key: "openConnection",
    value: //#region connection control
    function () {
      var _openConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function openConnection() {
        return _openConnection.apply(this, arguments);
      }
      return openConnection;
    }()
  }, {
    key: "closeConnection",
    value: function () {
      var _closeConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function closeConnection() {
        return _closeConnection.apply(this, arguments);
      }
      return closeConnection;
    }()
  }, {
    key: "getConnectionState",
    value: function getConnectionState() {
      if (this.isUpdating) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].UpdatingFirmware;
      } else if (this.isConnected) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected;
      } else {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
      }
    }
    //#endregion connection control

    //#region brain info
  }, {
    key: "getBrainInfo",
    value: function getBrainInfo() {
      if (!this.isConnected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]("cannot get brain info without connected brain");
      }
      var rawBrainInfo = _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["getBrainInfo"]();
      var tmpVersion = _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"].fromString(rawBrainInfo.softwareVersion);
      var brainInfo = {
        serial: parseInt(rawBrainInfo.serialNumber, 16),
        version: tmpVersion,
        versionFW: tmpVersion,
        name: rawBrainInfo.name,
        team: rawBrainInfo.team,
        deviceType: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXV5,
        connectionMethod: rawBrainInfo.connectionType === "Radio" ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].RC_Radio : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].USB,
        brainConnected: rawBrainInfo.brainStatus,
        needsFWUpdate: rawBrainInfo.updateNeeded ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate,
        canUpdate: true,
        batteryLow: rawBrainInfo.batteryLow
      };
      if (rawBrainInfo.isDFUMode) {
        brainInfo.mode = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].DFU;
        return brainInfo;
      }
      if (brainInfo.connectionMethod === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].RC_Radio) {
        var rawVersions = rawBrainInfo.controllerVersion;
        var atmel = rawVersions && rawVersions.length > 1 ? _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"].fromString(rawVersions[0]) : new _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"](0, 0, 0, 0);
        var radio = rawVersions && rawVersions.length > 1 ? _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"].fromString(rawVersions[1]) : rawVersions && rawVersions.length > 0 ? _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"].fromString(rawVersions[0]) : new _VexVersion__WEBPACK_IMPORTED_MODULE_5__["VexVersion"](0, 0, 0, 0);
        brainInfo.versionCTRL = {
          atmel: atmel,
          radio: radio
        };
        var hasAtmelVersion = atmel && atmel.toInternalString() !== "0.0.0.b0";
        var hasRadioVersion = rawBrainInfo.isRadioDFU || radio && radio.toInternalString() !== "0.0.0.b0";
        var hasControllerVersion = hasAtmelVersion && hasRadioVersion;
        brainInfo.needsCTRLUpdate = hasControllerVersion ? rawBrainInfo.controllerUpdateNeeded ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
      }
      return brainInfo;
    }
  }, {
    key: "setBrainName",
    value: function () {
      var _setBrainName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(name) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (this.isConnected) {
                _context3.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 2:
              return _context3.abrupt("return", _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["setBrainName"](name));
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function setBrainName(_x) {
        return _setBrainName.apply(this, arguments);
      }
      return setBrainName;
    }()
  }, {
    key: "setTeamNumber",
    value: function () {
      var _setTeamNumber = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(team) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (this.isConnected) {
                _context4.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 2:
              return _context4.abrupt("return", _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["setTeamNumber"](team));
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function setTeamNumber(_x2) {
        return _setTeamNumber.apply(this, arguments);
      }
      return setTeamNumber;
    }() //#endregion brain info
    //#region program control
  }, {
    key: "play",
    value: function () {
      var _play = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(slot) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (this.isConnected) {
                _context5.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]("cannot run program without connected brain");
            case 2:
              log.debug("running program on slot:", slot);
              if (!(slot < 0 || slot > 7)) {
                _context5.next = 5;
                break;
              }
              throw new RangeError("slot must be between 0 and 7 inclusive");
            case 5:
              _context5.next = 7;
              return _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["runProgram"](slot);
            case 7:
              log.info("run command sent");
              return _context5.abrupt("return", true);
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function play(_x3) {
        return _play.apply(this, arguments);
      }
      return play;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (this.isConnected) {
                _context6.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]("cannot stop program without connected brain");
            case 2:
              log.debug("stopping program");
              _context6.next = 5;
              return _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["stopProgram"]();
            case 5:
              return _context6.abrupt("return", true);
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }() //#endregion program control
    //#region project downloads
  }, {
    key: "downloadProgram",
    value: function () {
      var _downloadProgram = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(slot, projectName, language, data, progressCallback) {
        var isBlocks, isPython, ide, programInfo, deviceManagerDownloadCallback;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              log.info("downloadProgram -", slot, projectName, language);
              isBlocks = _AppInfo__WEBPACK_IMPORTED_MODULE_9__["appState"].getAppState().mode === "Blocks";
              isPython = language === "python";
              ide = isBlocks ? "Blocks" : isPython ? "Python" : "C++";
              programInfo = {
                slot: slot,
                name: projectName,
                desc: "",
                icon: isBlocks ? _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodeBlocks : isPython ? _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodePython : _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodeCPP,
                // tslint:disable-next-line:trailing-comma
                ports: [,,,,,,,,,,,,,,,,,,,,,,,],
                // tslint:disable-next-line:trailing-comma
                triport_22: [,,,,,,,,],
                controller_1: [],
                controller_2: [],
                ide: ide,
                progress: undefined,
                autorun: false,
                language: language
              };
              _context8.prev = 5;
              deviceManagerDownloadCallback = function deviceManagerDownloadCallback(downloadData) {
                var progress = downloadData.progress,
                  state = downloadData.state;
                log.debug("download is ".concat(progress, "% done"));
                progressCallback({
                  progress: progress / 100,
                  step: state
                });
              };
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
                  var disconnectHandler, result;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        log.debug("starting program download");
                        disconnectHandler = function disconnectHandler(dev) {
                          log.warn("device disconnected during download");
                          resolve(false);
                          _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["removeOnDeviceDisconnectionHandler"](disconnectHandler);
                        };
                        _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["addOnDeviceDisconnectionHandler"](disconnectHandler);
                        _context7.next = 5;
                        return _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["downloadProgram"](Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["forceBuffer"])(data), programInfo, deviceManagerDownloadCallback);
                      case 5:
                        result = _context7.sent;
                        _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["removeOnDeviceDisconnectionHandler"](disconnectHandler);
                        if (result) {
                          log.debug("program download success", result);
                        } else {
                          log.debug("program download failed", result);
                        }
                        resolve(result);
                      case 9:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function (_x9, _x10) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](5);
              if (!(_context8.t0 instanceof _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["NoDeviceConnectedError"])) {
                _context8.next = 16;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 16:
              log.error(_context8.t0);
              return _context8.abrupt("return", false);
            case 18:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[5, 10]]);
      }));
      function downloadProgram(_x4, _x5, _x6, _x7, _x8) {
        return _downloadProgram.apply(this, arguments);
      }
      return downloadProgram;
    }() //#endregion project downloads
    //#region compilers
    //#endregion compilers
    //#region Python VM Checks
  }, {
    key: "getPythonVMValid",
    value: function getPythonVMValid() {
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
          var vmResult;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["checkPythonVM"]();
              case 3:
                vmResult = _context9.sent;
                log.debug("vmResult: ", vmResult);
                if (vmResult.data.valid !== undefined && !vmResult.data.valid) {
                  resolve(false);
                } else {
                  resolve(true);
                }
                _context9.next = 12;
                break;
              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                log.warn("getPythonVMValid error: ", _context9.t0);
                resolve(false);
              case 12:
              case "end":
                return _context9.stop();
            }
          }, _callee9, null, [[0, 8]]);
        }));
        return function (_x11, _x12) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    //#endregion Python VM Checks

    //#region firmware
  }, {
    key: "canUpdateFirmware",
    value: function canUpdateFirmware() {
      return this.getBrainInfo().connectionMethod === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].USB;
    }
  }, {
    key: "didTryFirmwareUpdate",
    get: function get() {
      return this._didTryFirmwareUpdate;
    }
  }, {
    key: "updateFirmware",
    value: function () {
      var _updateFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(progress) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              if (this.isConnected) {
                _context11.next = 2;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 2:
              _context11.prev = 2;
              return _context11.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
                  var disconnectHandler;
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        log.debug("starting firmware update..");
                        disconnectHandler = function disconnectHandler(dev) {
                          log.warn("device disconnected during firmware update..");
                          _this2.isUpdating = false;
                          resolve(false);
                          _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["removeOnDeviceDisconnectionHandler"](disconnectHandler);
                        };
                        _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["addOnDeviceDisconnectionHandler"](disconnectHandler);
                        _this2.isUpdating = true;
                        _this2._didTryFirmwareUpdate = true;
                        _context10.next = 7;
                        return _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["updateFirmware"](function (data) {
                          if (data) {
                            if (progress) {
                              progress({
                                percent: data.progress,
                                status: data.status,
                                msg: data.msg
                              });
                            }
                          }
                        });
                      case 7:
                        _this2.isUpdating = false;
                        _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["removeOnDeviceDisconnectionHandler"](disconnectHandler);
                      case 9:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x14, _x15) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 6:
              _context11.prev = 6;
              _context11.t0 = _context11["catch"](2);
              this.isUpdating = false;
              if (!(_context11.t0 instanceof _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["NoDeviceConnectedError"])) {
                _context11.next = 13;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
            case 13:
              log.error(_context11.t0);
              return _context11.abrupt("return", false);
            case 15:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[2, 6]]);
      }));
      function updateFirmware(_x13) {
        return _updateFirmware.apply(this, arguments);
      }
      return updateFirmware;
    }()
  }, {
    key: "didTryControllerFirmwareUpdate",
    get: function get() {
      return this._didTryControllerFirmwareUpdate;
    }
  }, {
    key: "updateControllerFirmware",
    value: function updateControllerFirmware(progress) {
      var _this3 = this;
      var isDFU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.isConnected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoControllerConnectedError"]();
      }
      return new Promise(function (resolve, reject) {
        try {
          log.debug("starting controller firmware update...");
          var _disconnectHandler = function _disconnectHandler(dev) {
            log.warn("device disconnected during firmware update...");
            resolve(false);
            _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["removeOnDeviceDisconnectionHandler"](_disconnectHandler);
          };
          _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["addOnDeviceDisconnectionHandler"](_disconnectHandler);
          var progressHandler = function progressHandler(data) {
            if ((data === null || data === void 0 ? void 0 : data.status) === "complete") {
              _this3.isUpdating = false;
            }
            if (data && progress) {
              progress({
                percent: data.progress,
                status: data.status,
                msg: data.msg
              });
            }
          };
          _this3.isUpdating = true;
          _this3._didTryControllerFirmwareUpdate = true;
          _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["updateFirmwareController"](progressHandler, undefined, isDFU).then(function (res) {
            // DeviceManager resolves with true if update was successful
            log.debug(res);
            _this3.isUpdating = false;
            resolve(res);
          })["catch"](function (err) {
            // DeviceManager rejects with false if there was an error
            log.debug(err);
            _this3.isUpdating = false;
            reject(err);
          })["finally"](function () {
            _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["removeOnDeviceDisconnectionHandler"](_disconnectHandler);
            _this3.isUpdating = false;
          });
        } catch (err) {
          log.error(err);
          _this3.isUpdating = false;
          resolve(false);
        }
      });
    }
    //#endregion firmware

    //#region User Port comms
  }, {
    key: "supportsUserPort",
    get: function get() {
      return true;
    }
  }, {
    key: "requiresUserPortConnectionProcess",
    get: function get() {
      return false;
    }
  }, {
    key: "openConnectionUserPort",
    value: function () {
      var _openConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function openConnectionUserPort() {
        return _openConnectionUserPort.apply(this, arguments);
      }
      return openConnectionUserPort;
    }()
  }, {
    key: "closeConnectionUserPort",
    value: function () {
      var _closeConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function closeConnectionUserPort() {
        return _closeConnectionUserPort.apply(this, arguments);
      }
      return closeConnectionUserPort;
    }()
  }, {
    key: "getConnectionStateUserPort",
    value: function getConnectionStateUserPort() {
      var adminState = this.getConnectionState();
      switch (adminState) {
        case _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].CheckingBootloader:
        case _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].CheckingFirmware:
        case _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected:
          return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected;
        case _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].UpdatingBootloader:
        case _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].UpdatingFirmware:
          return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
      }
      return adminState;
    }
  }, {
    key: "sendDataUserPort",
    value: function sendDataUserPort(data) {
      // TODO: implement this in the device manager then add the link here
    }
  }, {
    key: "onConnect",
    value: function onConnect(device) {
      this.isConnected = true;
      log.debug("onConnect:", this.isConnected);
      var brainInfo = this.getBrainInfo();
      if (!this.didDeviceRecheck && brainInfo.brainConnected && brainInfo.serial === 0) {
        log.warn("got invalid serial number. attempting data refresh");
        this.didDeviceRecheck = true;
        setTimeout(function () {
          _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["refreshDevices"]();
        }, 250);
      } else if (!this.didDeviceRecheck && brainInfo.brainConnected && brainInfo.versionFW.major === 0) {
        log.warn("got invalid major version number. attempting data refresh");
        this.didDeviceRecheck = true;
        setTimeout(function () {
          _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["refreshDevices"]();
        }, 250);
      } else {
        this.triggerConnectionUpdate(device);
      }
    }
  }, {
    key: "onDisconnect",
    value: function onDisconnect(device) {
      log.info("device disconnected event");
      this.isConnected = false;
      this._didTryFirmwareUpdate = false;
      this._didTryControllerFirmwareUpdate = false;
      this.didDeviceRecheck = false;
      this.triggerConnectionUpdate(device);
    }
    //#endregion

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
    key: "checkVersionNeedsUpdate",
    value: function () {
      var _checkVersionNeedsUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(device) {
        var currentVersion, brainVersion, updateNeeded;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return this.getCurrentFirmware();
            case 2:
              currentVersion = _context14.sent;
              brainVersion = device.version;
              updateNeeded = brainVersion.compare(currentVersion) < 0;
              device.needsFWUpdate = updateNeeded ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate;
            case 6:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function checkVersionNeedsUpdate(_x16) {
        return _checkVersionNeedsUpdate.apply(this, arguments);
      }
      return checkVersionNeedsUpdate;
    }() //#endregion misc
    //#region low-level logger
  }, {
    key: "getLowLevelLogger",
    value: function getLowLevelLogger() {
      // TODO: the device manager still uses the old version of the logger...
      return _rm_vca_vexcode_device_manager__WEBPACK_IMPORTED_MODULE_7__["logger"];
    }
    //#endregion low-level logger
  }]);
  return EXPNativeUSB;
}(_EXPInterface__WEBPACK_IMPORTED_MODULE_4__["EXPInterface"]);


/***/ })

});
//# sourceMappingURL=7dfb229cdb3cc10fee59.51.bundle.js.map