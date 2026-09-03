this["webpackChunkwebapp"]([24],{

/***/ "./src/HardwareInterface/GO123/GO123BLE.ts":
/*!*************************************************!*\
  !*** ./src/HardwareInterface/GO123/GO123BLE.ts ***!
  \*************************************************/
/*! exports provided: HWDownloadProgressCallback, GO123BLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GO123BLE", function() { return GO123BLE; });
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
/* harmony import */ var _nativeInterface__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../nativeInterface */ "./src/nativeInterface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("GO123BLE");
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

var GO123BLE = /*#__PURE__*/function (_GO123Interface) {
  _inherits(GO123BLE, _GO123Interface);
  var _super = _createSuper(GO123BLE);
  function GO123BLE() {
    var _this;
    _classCallCheck(this, GO123BLE);
    _this = _super.call(this);
    log.debug("construct GO123BLE");
    _this.appSuspendFunc = _this.appSuspendFunc.bind(_assertThisInitialized(_this));
    _this.displaySuspendedDuringUpdate = _this.displaySuspendedDuringUpdate.bind(_assertThisInitialized(_this));
    _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESetFirmwareChannel"](_helpers__WEBPACK_IMPORTED_MODULE_4__["firmwareChannel"]);
    _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["onAppSuspendedEvent"].registerCallback(_this.appSuspendFunc);
    return _this;
  }
  _createClass(GO123BLE, [{
    key: "appSuspendFunc",
    value: function appSuspendFunc() {
      // The time it takes the errors to propegate before suspension is too long for
      // the event to be registered before the app is suspended. So catching the
      // suspend error will not work 100% of the time. The event for the
      // suspension popup needs to be registered as soon after the suspend is triggered
      if (this.updatingDevice) {
        this.suspendDeviceName = this.targetDevice.name;
        _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["onAppBecomeActiveEvent"].registerCallback(this.displaySuspendedDuringUpdate);
      }
      this.closeConnection();
    }
  }, {
    key: "displaySuspendedDuringUpdate",
    value: function () {
      var _displaySuspendedDuringUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["onAppBecomeActiveEvent"].unregisterCallback(this.displaySuspendedDuringUpdate);
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                setTimeout(function () {
                  // MODALCONTROL.suspendedDuringUpdate(suspendDeviceName, async () => {
                  //   updatingDevice = false;
                  //   NI.onAppBecomeActiveEvent.unregisterCallback(displaySuspendedDuringUpdate);
                  //   resolve();
                  // });
                }, 500);
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function displaySuspendedDuringUpdate() {
        return _displaySuspendedDuringUpdate.apply(this, arguments);
      }
      return displaySuspendedDuringUpdate;
    }() //#region connection control
  }, {
    key: "openConnectionToBrain",
    value: function openConnectionToBrain(id) {
      log.debug("openConnectionToBrain -", id);
      this.connecting = true;
      this.triggerConnectionUpdate();
      log.debug("connectToBrain:", id);
      this.connectionTargetDevice = null;
      // tslint:disable-next-line: prefer-for-of
      for (var i = 0; i < this.discoveredDevices.length; i++) {
        if (this.discoveredDevices[i].serial === id) {
          this.connectionTargetDevice = this.discoveredDevices[i];
          break;
        }
      }
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEConnectToDevice"](id).then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error connecting to device");
      });
    }
  }, {
    key: "getConnectionState",
    value: function getConnectionState() {
      if (this.connected) {
        if (this.updatingDevice) {
          return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].UpdatingFirmware;
        } else if (this.checkingDeviceFirmware) {
          return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].CheckingFirmware;
        } else {
          return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected;
        }
      } else if (this.connecting) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connecting;
      } else if (this.scanning) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Scanning;
      } else {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
      }
    }

    //#region internal calls for connection control
  }, {
    key: "_openConnection",
    value: function _openConnection() {
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEStartScanning"]().then(function () {
        return;
      })["catch"](function () {
        throw new Error("error starting scan");
      });
    }
  }, {
    key: "_closeConnection",
    value: function _closeConnection() {
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEStopScanning"]().then(function () {
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
    //#endregion brain info

    //#region program control
    //#endregion program control

    //#region project downloads
    //#endregion project downloads

    //#region compilers
    //#endregion compilers

    //#region script commands
  }, {
    key: "executeScriptCommand",
    value: function executeScriptCommand(command) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("executeScriptCommand -", command);
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendAndExecute123Command"](command).then(function () {
        log.debug("executeScriptCommand -", command, "resolved");
        return true;
      })["catch"](function () {
        log.debug("executeScriptCommand -", command, "rejected");
        throw new Error("error sending command to device");
      });
    }
  }, {
    key: "executeScriptCommands",
    value: function executeScriptCommands(commands) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("executeScriptCommands -", commands);
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendAndExecuteMultipleCommands"](commands).then(function () {
        log.debug("executeScriptCommands -", commands, "resolved");
        return true;
      })["catch"](function () {
        log.debug("executeScriptCommands -", commands, "rejected");
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
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEStopScriptEngine"]().then(function () {
        return;
      });
    }
  }, {
    key: "setConfigPreset",
    value: function setConfigPreset(preset) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("setConfigPreset -", preset);
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendPresetConfigCommand"](preset).then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error sending config to device");
      });
    }
  }, {
    key: "setConfigForPort",
    value: function setConfigForPort(port, deviceType, flags) {
      var limitPct = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 66;
      var limitMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 750;
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("setConfigForPort -", port, deviceType, flags, limitPct, limitMax);
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendConfigCommand"](port, deviceType, flags, limitPct, limitMax).then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error sending config to device");
      });
    }
  }, {
    key: "setEyeSensorMode",
    value: function setEyeSensorMode(mode) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("setEyeSensorMode -", mode);
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendSensorMode"](mode).then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error sending sensor mode to device");
      });
    }
  }, {
    key: "clearPortEvents",
    value: function clearPortEvents(port) {
      if (!this.connected) {
        throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["NoBrainConnectedError"]();
      }
      log.debug("clearPortEvents -", port);
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEClearPortEvents"](port).then(function () {
        return true;
      })["catch"](function () {
        throw new Error("error clearing port events");
      });
    }
    //#endregion script commands

    //#region remote control
  }, {
    key: "sendControllerButton",
    value: function () {
      var _sendControllerButton = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(command, buttonID) {
        var whenPressed,
          prom,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              whenPressed = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;
              _context2.next = 3;
              return new Promise(function (resolve, reject) {
                _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendGOControllerButton"](command, buttonID, whenPressed).then(function () {
                  resolve(true);
                })["catch"](function () {
                  reject("error sending controller buttons");
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 3:
              prom = _context2.sent;
              return _context2.abrupt("return", prom);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function sendControllerButton(_x, _x2) {
        return _sendControllerButton.apply(this, arguments);
      }
      return sendControllerButton;
    }()
  }, {
    key: "sendControllerJoystickPreset",
    value: function () {
      var _sendControllerJoystickPreset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(newType) {
        var driveSensi,
          turnSensi,
          prom,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              driveSensi = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 50;
              turnSensi = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 50;
              _context3.next = 4;
              return new Promise(function (resolve, reject) {
                _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendGOControllerJoysticPreset"](newType, driveSensi, turnSensi).then(function () {
                  resolve(true);
                })["catch"](function () {
                  reject("error sending joystic preset");
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 4:
              prom = _context3.sent;
              return _context3.abrupt("return", prom);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function sendControllerJoystickPreset(_x3) {
        return _sendControllerJoystickPreset.apply(this, arguments);
      }
      return sendControllerJoystickPreset;
    }()
  }, {
    key: "saveControllerConfig",
    value: function () {
      var _saveControllerConfig = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var prom;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return new Promise(function (resolve, reject) {
                _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESaveGOControllerConfig"]().then(function () {
                  resolve(true);
                })["catch"](function () {
                  reject("error clearing port events");
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
      function saveControllerConfig() {
        return _saveControllerConfig.apply(this, arguments);
      }
      return saveControllerConfig;
    }()
  }, {
    key: "sendControllerValues",
    value: function () {
      var _sendControllerValues = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(leftX, leftY, rightX, rightY, buttons) {
        var prom;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return new Promise(function (resolve, reject) {
                _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLESendGOControllerValues"](leftX, leftY, rightX, rightY, buttons).then(function () {
                  resolve(true);
                })["catch"](function () {
                  reject("error clearing port events");
                });
              })["catch"](function (err) {
                throw new Error(err);
              });
            case 2:
              prom = _context5.sent;
              return _context5.abrupt("return", prom);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function sendControllerValues(_x4, _x5, _x6, _x7, _x8) {
        return _sendControllerValues.apply(this, arguments);
      }
      return sendControllerValues;
    }() //#endregion remote control
    //#region firmware
  }, {
    key: "getCurrentFirmware",
    value: function () {
      var _getCurrentFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.getBrainInfo();
            case 2:
              return _context6.abrupt("return", _context6.sent.versionFW);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getCurrentFirmware() {
        return _getCurrentFirmware.apply(this, arguments);
      }
      return getCurrentFirmware;
    }()
  }, {
    key: "_getConnectedBrainBootloader",
    value:
    //#endregion firmware

    //#region internal firmware
    //#endregion internal firmware

    //#region internal firmware low level
    function _getConnectedBrainBootloader() {
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEGetBrainBootloader"]();
    }
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
              return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEGetCurrentFirmwareFor"](product);
            case 3:
              versionStr = _context7.sent.replace("b", ".");
              return _context7.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(versionStr));
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getOnlineFWVersion(_x9) {
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
              return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEGetCurrentBootloaderFor"](product);
            case 3:
              versionStr = _context8.sent.replace("b", ".");
              return _context8.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(versionStr));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getOnlineBLVersion(_x10) {
        return _getOnlineBLVersion.apply(this, arguments);
      }
      return getOnlineBLVersion;
    }()
  }, {
    key: "lowLevelUpdateFW",
    value: function () {
      var _lowLevelUpdateFW = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(progressCallback) {
        var _this2 = this;
        var forceUpdate,
          needsFW,
          res,
          resError,
          _args10 = arguments;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              forceUpdate = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : false;
              log.debug("lowLevelUpdateFW");
              log.debug("checking if we actually need to update the FW");
              needsFW = forceUpdate || this.targetDevice.needsFWUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              if (needsFW) {
                _context10.next = 7;
                break;
              }
              log.debug("skipping Firmware update as it is already up to date");
              return _context10.abrupt("return", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS);
            case 7:
              this.FWUpdateProgressCB = progressCallback;
              res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
              resError = null;
              _context10.prev = 10;
              _context10.next = 13;
              return new Promise( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
                  var updateStartResult;
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        log.info("starting firmware update process");
                        _context9.next = 3;
                        return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEStartFirmwareUpdate"]();
                      case 3:
                        updateStartResult = _context9.sent;
                        if (updateStartResult !== 0) {
                          log.warn("error starting firmware update process. error code:", updateStartResult);
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingFWUpdate"]());
                        }
                        _this2.resolveFWUpdatePromise = resolve;
                        _this2.setUpdateTimeoutTimerCallback(function () {
                          log.warn("Firmware update failed due to progress timeout");
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]());
                        });
                        _this2.startUpdateTimeoutTimer(20000);
                        log.debug("waiting for FW update to complete");
                      case 9:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }));
                return function (_x12, _x13) {
                  return _ref.apply(this, arguments);
                };
              }());
            case 13:
              res = _context10.sent;
              _context10.next = 21;
              break;
            case 16:
              _context10.prev = 16;
              _context10.t0 = _context10["catch"](10);
              log.warn(_context10.t0);
              resError = _context10.t0;
              throw _context10.t0;
            case 21:
              _context10.prev = 21;
              this.stopUpdateTimeoutTimer();
              this.clearUpdateTimeoutTimerCallback();
              return _context10.finish(21);
            case 25:
              this.resolveFWUpdatePromise = null;
              this.FWUpdateProgressCB = null;
              log.debug("update complete with code", res);
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS)) {
                _context10.next = 44;
                break;
              }
              _context10.prev = 29;
              log.debug("waiting for reconnect");
              _context10.next = 33;
              return this.waitForReconnect(25000);
            case 33:
              _context10.next = 35;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["waitms"])(1000);
            case 35:
              _context10.next = 42;
              break;
            case 37:
              _context10.prev = 37;
              _context10.t1 = _context10["catch"](29);
              log.warn("failed to reconnect to updated device");
              this.connected = false;
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]();
            case 42:
              _context10.next = 50;
              break;
            case 44:
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE)) {
                _context10.next = 48;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]();
            case 48:
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].DISCONNECT)) {
                _context10.next = 50;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringFW"]();
            case 50:
              if (!resError) {
                _context10.next = 52;
                break;
              }
              throw resError;
            case 52:
              return _context10.abrupt("return", res);
            case 53:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[10, 16, 21, 25], [29, 37]]);
      }));
      function lowLevelUpdateFW(_x11) {
        return _lowLevelUpdateFW.apply(this, arguments);
      }
      return lowLevelUpdateFW;
    }()
  }, {
    key: "lowLevelUpdateBL",
    value: function () {
      var _lowLevelUpdateBL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(progressCallback) {
        var _this3 = this;
        var forceUpdate,
          needsBL,
          res,
          resError,
          _args12 = arguments;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              forceUpdate = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : false;
              log.debug("lowLevelUpdateBL", this.targetDevice);
              log.debug("checking if we actually need to update the BL");
              needsBL = forceUpdate || this.targetDevice.needsBLUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              if (needsBL) {
                _context12.next = 7;
                break;
              }
              log.debug("skipping Bootloader update as it is already up to date");
              return _context12.abrupt("return", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS);
            case 7:
              this.BLUpdateProgressCB = progressCallback;
              res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
              resError = null;
              _context12.prev = 10;
              _context12.next = 13;
              return new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
                  var updateStartResult;
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                        log.info("starting bootloader update process");
                        _context11.next = 3;
                        return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["GO123BLEStartBootloaderUpdate"]();
                      case 3:
                        updateStartResult = _context11.sent;
                        if (updateStartResult !== 0) {
                          log.warn("error starting bootloader update process. error code:", updateStartResult);
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingBLUpdate"]());
                        }
                        _this3.resolveBLUpdatePromise = resolve;
                        _this3.setUpdateTimeoutTimerCallback(function () {
                          log.warn("Bootloader update failed due to progress timeout");
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingBL"]());
                        });
                        _this3.startUpdateTimeoutTimer(20000);
                        log.debug("waiting for BL update to complete");
                      case 9:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11);
                }));
                return function (_x15, _x16) {
                  return _ref2.apply(this, arguments);
                };
              }());
            case 13:
              res = _context12.sent;
              _context12.next = 20;
              break;
            case 16:
              _context12.prev = 16;
              _context12.t0 = _context12["catch"](10);
              resError = _context12.t0;
              throw _context12.t0;
            case 20:
              _context12.prev = 20;
              this.stopUpdateTimeoutTimer();
              this.clearUpdateTimeoutTimerCallback();
              return _context12.finish(20);
            case 24:
              this.resolveBLUpdatePromise = null;
              this.BLUpdateProgressCB = null;
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE)) {
                _context12.next = 30;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingBL"]();
            case 30:
              if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].DISCONNECT)) {
                _context12.next = 32;
                break;
              }
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringBL"]();
            case 32:
              if (!resError) {
                _context12.next = 34;
                break;
              }
              throw resError;
            case 34:
              return _context12.abrupt("return", res);
            case 35:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[10, 16, 20, 24]]);
      }));
      function lowLevelUpdateBL(_x14) {
        return _lowLevelUpdateBL.apply(this, arguments);
      }
      return lowLevelUpdateBL;
    }()
  }, {
    key: "enableSleep",
    value: function enableSleep() {
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["EnableSleep"]();
    }
  }, {
    key: "disableSleep",
    value: function disableSleep() {
      return _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["DisableSleep"]();
    }
    //#endregion firmware

    //#region events
  }, {
    key: "registerSuspendCallback",
    value: function registerSuspendCallback(callback) {
      _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["onAppSuspendedEvent"].registerCallback(callback);
    }
  }, {
    key: "unregisterSuspendCallback",
    value: function unregisterSuspendCallback(callback) {
      _nativeInterface__WEBPACK_IMPORTED_MODULE_9__["onAppSuspendedEvent"].unregisterCallback(callback);
    }
    //#endregion

    //#region native -> webapp events
  }, {
    key: "onGO123BLEDeviceDiscovered",
    value: function onGO123BLEDeviceDiscovered(name, serial, product, mode, version, rssi, battery) {
      var _this4 = this;
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
            _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.DeviceListUpdate", _this4.discoveredDevices);
          });
        }
        return;
      }
      if (this.targetDevice && this.targetDevice.serial === serial) {
        return;
      }
      this.processDiscoveredDevice(name, serial, product, mode, version, rssi, battery, true);
    }
  }, {
    key: "onGO123BLEDeviceConnected",
    value: function () {
      var _onGO123BLEDeviceConnected = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(name, serial, version, mode) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
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
              log.debug("old targetDevice", this.targetDevice);
              log.debug("connectionTargetDevice", this.connectionTargetDevice);
              this.targetDevice = Object.assign({}, this.connectionTargetDevice);
              this.targetDevice.canUpdate = true;
              log.debug("connectedDevice:", this.targetDevice);
              this.triggerConnectionUpdate();
              log.info("onGOBLEDeviceConnected", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"][mode]);
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_8__["fireEvent"]("HWInterface.BrainInfoUpdated", this.targetDevice);
              this.checkAndUpdateDevice();
            case 14:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function onGO123BLEDeviceConnected(_x17, _x18, _x19, _x20) {
        return _onGO123BLEDeviceConnected.apply(this, arguments);
      }
      return onGO123BLEDeviceConnected;
    }()
  }, {
    key: "onGO123BLEDeviceDisconnected",
    value: function onGO123BLEDeviceDisconnected() {
      if (this.disconnectionResolver) {
        this.connected = false;
        this.disconnectionResolver.resolve(true);
      }
      this.disconnectionResolver = null;
      if (this.connected && !this.updatingDevice) {
        log.warn("device disconnected, restarting scanning");
        this.connected = false;
        this.checkingDeviceFirmware = false;
        this.updatingDevice = false;
        this.triggerConnectionUpdate();
        log.info("onGOBLEDeviceDisconnected");
      }
    }

    //#region status events
    //#endregion status events
    //#endregion native -> webapp events

    //#region low-level logger
  }, {
    key: "getLowLevelLogger",
    value: function getLowLevelLogger() {
      return null;
    }
    //#endregion low-level logger
  }]);
  return GO123BLE;
}(_GO123Interface__WEBPACK_IMPORTED_MODULE_6__["GO123Interface"]);


/***/ })

});
//# sourceMappingURL=d268806a01bd5da3f895.24.bundle.js.map