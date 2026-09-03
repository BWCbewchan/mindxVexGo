this["webpackChunkwebapp"]([16],{

/***/ "./src/HardwareInterface/GO123/GO123Interface.ts":
/*!*******************************************************!*\
  !*** ./src/HardwareInterface/GO123/GO123Interface.ts ***!
  \*******************************************************/
/*! exports provided: HWDownloadProgressCallback, GO123Interface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GO123Interface", function() { return GO123Interface; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _VexVersion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VexVersion */ "./src/HardwareInterface/VexVersion.ts");
/* harmony import */ var _controllers_SensorHelpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/SensorHelpers */ "./src/HardwareInterface/controllers/SensorHelpers.ts");
/* harmony import */ var _HWInterfaceBase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../HWInterfaceBase */ "./src/HardwareInterface/HWInterfaceBase.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HWDownloadProgressCallback", function() { return _HWInterfaceBase__WEBPACK_IMPORTED_MODULE_5__["HWDownloadProgressCallback"]; });

/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dispatcher */ "./src/dispatcher.ts");
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../helpers */ "./src/helpers.ts");
/* harmony import */ var _widget_Modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../widget/Modal */ "./src/widget/Modal.tsx");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _widget_RobotToolbarButtons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../widget/RobotToolbarButtons */ "./src/widget/RobotToolbarButtons.tsx");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("GO123Interface");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// interface types/enums



// interface types/enums/classes



// parent classes/types


// external imports






var GO123Interface = /*#__PURE__*/function (_HWInterfaceBase) {
  _inherits(GO123Interface, _HWInterfaceBase);
  var _super = _createSuper(GO123Interface);
  //#region "state flags"

  //#endregion

  //#region "internal event callbacks"

  //#endregion

  function GO123Interface() {
    var _this;
    _classCallCheck(this, GO123Interface);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "connected", false);
    _defineProperty(_assertThisInitialized(_this), "connecting", false);
    _defineProperty(_assertThisInitialized(_this), "scanning", false);
    _defineProperty(_assertThisInitialized(_this), "checkingDeviceFirmware", false);
    _defineProperty(_assertThisInitialized(_this), "updatingDevice", false);
    _defineProperty(_assertThisInitialized(_this), "gettingBootloader", false);
    _defineProperty(_assertThisInitialized(_this), "locatingDevice", false);
    _defineProperty(_assertThisInitialized(_this), "FWUpdateProgressCB", null);
    _defineProperty(_assertThisInitialized(_this), "resolveFWUpdatePromise", null);
    _defineProperty(_assertThisInitialized(_this), "BLUpdateProgressCB", null);
    _defineProperty(_assertThisInitialized(_this), "resolveBLUpdatePromise", null);
    _defineProperty(_assertThisInitialized(_this), "connectionResolver", null);
    _defineProperty(_assertThisInitialized(_this), "disconnectionResolver", null);
    _defineProperty(_assertThisInitialized(_this), "discoveredDevices", []);
    _defineProperty(_assertThisInitialized(_this), "connectionTargetDevice", null);
    _defineProperty(_assertThisInitialized(_this), "targetDevice", null);
    _defineProperty(_assertThisInitialized(_this), "onUpdateProgressEvent", new _dispatcher__WEBPACK_IMPORTED_MODULE_6__["DispatcherEvent"]());
    //#endregion User Port comms
    //#region events
    _defineProperty(_assertThisInitialized(_this), "lastConnectionState", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected);
    //#endregion events
    //#region update timeout system
    _defineProperty(_assertThisInitialized(_this), "updateTimeoutTimer", null);
    _defineProperty(_assertThisInitialized(_this), "updateTimeoutTimerCallback", null);
    _this.firmwareUpdateMessage = _this.getFWUpdateMessages();
    return _this;
  }

  //#region connection control
  /**
   * this will open a connection to the GO/123. This will return when the
   * connection is opened or if the connection fails to open.
   * @throws OperationNotSupportedError
   */
  _createClass(GO123Interface, [{
    key: "openConnection",
    value: function openConnection() {
      log.debug("openConnection");
      this.discoveredDevices = [];
      this.targetDevice = null;
      this.scanning = true;
      this.triggerConnectionUpdate();
      this.resetStatusValues();
      return this._openConnection();
    }
  }, {
    key: "closeConnection",
    value: function closeConnection() {
      this.discoveredDevices = [];
      this.connectionTargetDevice = null;
      this.targetDevice = null;
      this.connected = false;
      this.connecting = false;
      this.scanning = false;
      this.triggerConnectionUpdate();
      return this._closeConnection();
    }
  }, {
    key: "unlockBrain",
    value: function unlockBrain(unlockCode) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
  }, {
    key: "getBrainScanList",
    value:
    //#endregion internal calls for connection control
    //#endregion connection control

    //#region brain info
    function getBrainScanList() {
      return this.discoveredDevices;
    }

    /**
     * Get the information for the currently connected brain.
     * @returns the connected brain information or null if no brain is connected
     * @throws NoBrainConnectedError
     */
  }, {
    key: "getBrainInfo",
    value: function getBrainInfo() {
      // if (!this.connected) {
      //   throw new NoBrainConnectedError();
      // }
      return this.targetDevice;
    }

    /**
     * Get the information for the brain that is the connection target.
     * @returns the target brain information or null if not trying to connect to a brain
     * @throws OperationNotSupportedError
     */
  }, {
    key: "getTargetBrainInfo",
    value: function getTargetBrainInfo() {
      return this.connectionTargetDevice;
    }

    /**
     * sets the name of the currently connected brain
     * @param name the name to set the brain to
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
  }, {
    key: "setTeamNumber",
    value:
    /**
     * sets the team number of the currently connected brain
     * @param team the team number to set the brain to
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
    function setTeamNumber(team) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
    //#endregion brain info

    //#region program control
    /**
     * This will attempt to run the program loaded in the specified slot on
     * the brain.
     * @param slot the slot to run. 0 indexed. 0-7
     * @throws NoBrainConnectedError
     */
  }, {
    key: "play",
    value: function play(slot) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * This will attempt to stop a program running on the brain
     * @throws NoBrainConnectedError
     */
  }, {
    key: "stop",
    value: function stop() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
    //#endregion program control

    //#region project downloads
    /**
     * This will attempt to download the specified program to a Brain. If the
     * code is C++, the code will be compiled first.
     * @param code the code to download.
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the project to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @param options various options to adjust the download process
     * @throws NoBrainConnectedError
     */
  }, {
    key: "downloadProject",
    value: function () {
      var _downloadProject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(code, slot, projectName, language, progressCallback, options) {
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
      function downloadProject(_x, _x2, _x3, _x4, _x5, _x6) {
        return _downloadProject.apply(this, arguments);
      }
      return downloadProject;
    }()
    /**
     * This will attempt to download the specified program to a Brain. If the
     * code is C++, the code will be compiled first.
     * After the download is complete, the project will be run on the brain.
     * @param code the code to download.
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the project to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @param options various options to adjust the download process
     * @throws NoBrainConnectedError
     */
  }, {
    key: "downloadProjectAndRun",
    value: function downloadProjectAndRun(code, slot, projectName, language, progressCallback, options) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * This will attempt to download the specified program to the connected
     * brain. If the program is python, it will also make sure the VM is loaded
     * on the brain.
     * @param code the code to download.
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the project to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @param options various options to adjust the download process
     * @throws NoBrainConnectedError
     */
  }, {
    key: "downloadProgram",
    value: function downloadProgram(slot, projectName, language, data, progressCallback) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
    //#endregion project downloads

    //#region compilers
    /**
     * compile the provided source code and return the result.
     * @param code the code to compile.
     * @param slot the slot to compile the program for. (not used for V5)
     * @param projectName the name of the project to download
     * @param language the language of the project to compile
     * @param options various options to adjust the download process
     */
  }, {
    key: "compileProject",
    value: function () {
      var _compileProject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(code, slot, projectName, language, options) {
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
      function compileProject(_x7, _x8, _x9, _x10, _x11) {
        return _compileProject.apply(this, arguments);
      }
      return compileProject;
    }() //#endregion compilers
    //#region script commands
  }, {
    key: "getServerFirmwareVersion",
    value: //#endregion remote control
    //#region firmware
    function () {
      var _getServerFirmwareVersion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getServerFirmwareVersion() {
        return _getServerFirmwareVersion.apply(this, arguments);
      }
      return getServerFirmwareVersion;
    }()
    /**
     * Use this to check if the interface supports updating the firmware.
     * @returns true if the interface can update the firmware
     */
  }, {
    key: "canUpdateFirmware",
    value: function canUpdateFirmware() {
      return true;
    }

    /**
     * Use this to check if the interface will automatically try to update
     * the firmware for any brain that connects.
     */
  }, {
    key: "doesFirmwareUpdateOnConnect",
    value: function doesFirmwareUpdateOnConnect() {
      return true;
    }

    /**
     * Call this to update the firmware of the connected brain.
     * @param progress a callback that can return the update progress
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
  }, {
    key: "updateFirmware",
    value: function updateFirmware(progress) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * Call this to update the firmware of the connected controller.
     * @param progress a callback that can return the update progress
     * @throws OperationNotSupportedError
     */
  }, {
    key: "updateControllerFirmware",
    value: function updateControllerFirmware(progress, isDFU) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * this will find the current VEXos firmware version from the server
     * @returns
     */
  }, {
    key: "getCurrentFirmware",
    value: function () {
      var _getCurrentFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", this.getBrainInfo().versionFW);
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getCurrentFirmware() {
        return _getCurrentFirmware.apply(this, arguments);
      }
      return getCurrentFirmware;
    }()
    /**
     * this will return the correct messages for updating the FW on the
     * current platform.
     */
  }, {
    key: "checkAndUpdateDevice",
    value: //#endregion firmware
    //#region internal firmware
    function () {
      var _checkAndUpdateDevice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!this.updatingDevice) {
                log.debug("checking device firmware");
                this.checkDeviceFirmwares(this.targetDevice).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                  var deviceType, deviceIsGO, product, needsFW, needsBL;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        deviceType = _this2.targetDevice.deviceType;
                        deviceIsGO = deviceType === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXGO;
                        product = _this2._deviceTypeToProdcutType(deviceType);
                        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.DeviceListUpdate", _this2.discoveredDevices);
                        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BrainInfoUpdated", _this2.targetDevice);
                        needsFW = _this2.targetDevice.needsFWUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
                        needsBL = _this2.targetDevice.needsBLUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
                        if (!(needsFW || needsBL)) {
                          _context5.next = 17;
                          break;
                        }
                        _context5.prev = 8;
                        _context5.next = 11;
                        return _this2.updateConnectedDevice();
                      case 11:
                        _context5.next = 17;
                        break;
                      case 13:
                        _context5.prev = 13;
                        _context5.t0 = _context5["catch"](8);
                        if (_context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorLowDeviceBattery"]) {
                          log.warn("unable to update due to low battery");
                          if (deviceIsGO) {
                            _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].alert(_i18n_i18n__WEBPACK_IMPORTED_MODULE_10__["i18n"].t("GO battery low update warning"));
                          } else {
                            _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].alert(_i18n_i18n__WEBPACK_IMPORTED_MODULE_10__["i18n"].t("123 battery low update warning"));
                          }
                        } else if (_context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorFWUpdateNotSupported"] || _context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorBLUpdateNotSupported"]) {
                          log.warn("unable to update due to old Firmware/Bootloader version");
                          if (deviceIsGO) {
                            _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].showGOOutOfDate();
                          } else {
                            log.warn("should not be possible to have unsupported 123");
                          }
                        } else if (_context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingFWUpdate"] || _context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorStartingBLUpdate"]) {
                          log.warn("unable to update due to issue starting the update process");
                          _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].showUpdateFailed(product);
                        } else if (_context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"] || _context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingBL"]) {
                          log.warn("unable to update");
                          _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].showUpdateFailed(product);
                        } else if (_context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringFW"] || _context5.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringBL"]) {
                          log.warn("unable to update due to connection loss during update");
                          _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].showUpdateFailed(product);
                        } else {
                          log.error("error updating connected device:", _context5.t0.name);
                          log.error(_context5.t0);
                          _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].showUpdateFailed(product);
                        }
                        _this2.closeConnection();
                      case 17:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5, null, [[8, 13]]);
                })));
              } else {
                log.debug("already updating device");
              }
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function checkAndUpdateDevice() {
        return _checkAndUpdateDevice.apply(this, arguments);
      }
      return checkAndUpdateDevice;
    }()
  }, {
    key: "checkDeviceFirmwares",
    value: function () {
      var _checkDeviceFirmwares = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(device) {
        var inBootloadeMode, isGO, onlineFW, fwUpToDate, onlineBL, blStr, isWrongVersion, blUpToDate;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              log.info("checkDeviceFirmwares");
              this.checkingDeviceFirmware = true;
              this.triggerConnectionUpdate();
              inBootloadeMode = device.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE; // see if we have a version that we can assign somewhere...
              if (device.version) {
                if (inBootloadeMode) {
                  device.versionBL = device.version;
                } else {
                  device.versionFW = device.version;
                }
              }
              isGO = device.deviceType === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXGO;
              log.debug("procesed advertised version");

              // try to get the BL version if we do not already have it
              if (!(!device.versionBL && isGO)) {
                _context7.next = 16;
                break;
              }
              if (!(this.targetDevice && this.targetDevice.serial === device.serial)) {
                _context7.next = 15;
                break;
              }
              log.debug("requesting BL version");
              _context7.next = 12;
              return this.getConnectedBrainBootloader();
            case 12:
              device.versionBL = _context7.sent;
              _context7.next = 16;
              break;
            case 15:
              log.debug("skipping BL version request");
            case 16:
              log.debug("checking versions");

              // check the versions
              if (!device.versionFW) {
                _context7.next = 27;
                break;
              }
              _context7.next = 20;
              return this.getOnlineFWVersion(device.deviceType);
            case 20:
              onlineFW = _context7.sent;
              log.debug("FW brain:", device.versionFW.toInternalString(), "online:", onlineFW.toInternalString());
              fwUpToDate = device.versionFW.compare(onlineFW) >= 0;
              log.debug("FW up to date:", fwUpToDate);
              device.needsFWUpdate = !inBootloadeMode && fwUpToDate ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              _context7.next = 28;
              break;
            case 27:
              device.needsFWUpdate = inBootloadeMode ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
            case 28:
              if (!(isGO && device.versionBL)) {
                _context7.next = 40;
                break;
              }
              _context7.next = 31;
              return this.getOnlineBLVersion(device.deviceType);
            case 31:
              onlineBL = _context7.sent;
              log.debug("BL brain:", device.versionBL.toInternalString(), "online:", onlineBL.toInternalString());
              blStr = device.versionBL.toInternalString();
              isWrongVersion = blStr === "0.0.0.b0" || blStr === "48.48.48.b48" || blStr === "48.48.48.b49";
              blUpToDate = device.versionBL.compare(onlineBL) >= 0 && !isWrongVersion;
              log.debug("BL up to date:", blUpToDate);
              device.needsBLUpdate = blUpToDate ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              _context7.next = 41;
              break;
            case 40:
              device.needsBLUpdate = isGO ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate;
            case 41:
              log.debug("checked device versions:", device);
              this.checkingDeviceFirmware = false;
              this.triggerConnectionUpdate();
            case 44:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function checkDeviceFirmwares(_x12) {
        return _checkDeviceFirmwares.apply(this, arguments);
      }
      return checkDeviceFirmwares;
    }()
    /**
     * This will pull the bootloader version from the connected brain
     * @returns the bootloader version on the connected brain
     * @throws NoBrainConnectedError
     */
  }, {
    key: "getConnectedBrainBootloader",
    value: function () {
      var _getConnectedBrainBootloader2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var blVersionNum;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              // The data is filled in progressively for the device info. We need to wait for it all to fill in
              // before requesting the bootloader. The firmeware version didn't need this since it is being
              // pulled from the advertising data.
              this.gettingBootloader = true;
              blVersionNum = "0.0.0.b0";
              log.debug("getting bootloader");
              _context8.prev = 3;
              if (!this.connected) {
                _context8.next = 13;
                break;
              }
              _context8.next = 7;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["waitms"])(1000);
            case 7:
              _context8.next = 9;
              return this._getConnectedBrainBootloader();
            case 9:
              blVersionNum = _context8.sent;
              log.debug("got bootloader:", blVersionNum);
              _context8.next = 14;
              break;
            case 13:
              log.warn("not connected to a device");
            case 14:
              _context8.next = 19;
              break;
            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](3);
              log.error("getBrainBootloader error:", _context8.t0);
            case 19:
              this.gettingBootloader = false;
              return _context8.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(blVersionNum));
            case 21:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[3, 16]]);
      }));
      function getConnectedBrainBootloader() {
        return _getConnectedBrainBootloader2.apply(this, arguments);
      }
      return getConnectedBrainBootloader;
    }()
  }, {
    key: "_deviceTypeToProdcutType",
    value: function _deviceTypeToProdcutType(device) {
      if (device === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEX123) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexProductTypes"].VEX_123_Puck;
      } else if (device === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXGO) {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexProductTypes"].VEX_GO;
      }
    }
  }, {
    key: "updateDeviceInternal",
    value: function () {
      var _updateDeviceInternal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(progressCallback) {
        var _this3 = this;
        var forceUpdate,
          res,
          needsFW,
          needsBL,
          _battery,
          skipBatteryCheck,
          _this$targetDevice$ve,
          totalProgress,
          progressOffset,
          _this$targetDevice$ve2,
          _args9 = arguments;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              forceUpdate = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : false;
              this.updatingDevice = true;
              this.triggerConnectionUpdate();
              res = false;
              _context9.prev = 4;
              _context9.next = 7;
              return this.checkDeviceFirmwares(this.targetDevice);
            case 7:
              needsFW = forceUpdate || this.targetDevice.needsFWUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              needsBL = forceUpdate || this.targetDevice.needsBLUpdate === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate;
              log.debug("post check - needsFW", needsFW, "needsBL", needsBL);
              if (!(needsFW || needsBL)) {
                _context9.next = 93;
                break;
              }
              // Check if the battery is below usable level (70%)
              _battery = this.targetDevice.battery;
              skipBatteryCheck = this.targetDevice.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE && (_battery === 0 || _battery === -1);
              log.debug("targetDevice.battery:", _battery);
              if (!(!skipBatteryCheck && _battery < 70)) {
                _context9.next = 19;
                break;
              }
              log.warn("target battery is too low to update.", _battery, "%");
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorLowDeviceBattery"]();
            case 19:
              _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].showGOUpdateProgress(this.onUpdateProgressEvent, this.firmwareUpdateMessage);
              _widget_RobotToolbarButtons__WEBPACK_IMPORTED_MODULE_11__["ROBOT_TOOLBAR_CONTROL"].openBrainDropdown(true);
              if (!(this.targetDevice.deviceType === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXGO)) {
                _context9.next = 85;
                break;
              }
              totalProgress = needsFW && needsBL ? 2.0 : 1.0;
              progressOffset = needsFW && needsBL ? 1.0 : 0.0;
              log.debug("needsFW", needsFW, "needsBL", needsBL);
              log.debug("totalProgress:", totalProgress);
              log.debug("progressOffset:", progressOffset);

              // check to see if FW is pre rebootloader
              if (!(((_this$targetDevice$ve = this.targetDevice.versionFW) === null || _this$targetDevice$ve === void 0 ? void 0 : _this$targetDevice$ve.compare(_VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString("1.0.1.B100"))) < 0)) {
                _context9.next = 47;
                break;
              }
              log.debug("using GO pre-rebootloader update process");
              // device has pre-rebootloader firmware so we need to update the FW then the BL

              // 1. update FW
              if (!needsFW) {
                _context9.next = 34;
                break;
              }
              _context9.next = 32;
              return this.updateFWWithRetry(function (progress) {
                var p = progress / totalProgress;
                if (progressCallback) {
                  progressCallback(p);
                }
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", p);
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: p,
                  status: "ok"
                });
              }, forceUpdate);
            case 32:
              _context9.next = 34;
              return this.checkDeviceFirmwares(this.targetDevice);
            case 34:
              if (!needsBL) {
                _context9.next = 41;
                break;
              }
              if (!(((_this$targetDevice$ve2 = this.targetDevice.versionFW) === null || _this$targetDevice$ve2 === void 0 ? void 0 : _this$targetDevice$ve2.compare(_VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString("1.0.1.B100"))) < 0)) {
                _context9.next = 39;
                break;
              }
              log.warn("skip BL update due to prerebootloader firmware");
              _context9.next = 41;
              break;
            case 39:
              _context9.next = 41;
              return this.updateBLWithRetry(function (progress) {
                var p = (progressOffset + progress) / totalProgress;
                if (progressCallback) {
                  progressCallback(p);
                }
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: p,
                  status: "ok"
                });
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", p);
              }, forceUpdate);
            case 41:
              this.onUpdateProgressEvent.fire({
                msg: this.firmwareUpdateMessage,
                progress: 1,
                status: "complete"
              });
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateDone", true);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].close();
              res = true;
              _context9.next = 82;
              break;
            case 47:
              if (!(this.targetDevice.mode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceMode"].UPDATE)) {
                _context9.next = 67;
                break;
              }
              log.debug("using GO force update process");
              // device is in bootload mode so update the FW then reconnect and recheck the BL version

              // 1. update FW
              if (!needsFW) {
                _context9.next = 58;
                break;
              }
              _context9.next = 52;
              return this.updateFWWithRetry(function (progress) {
                var p = progress / totalProgress;
                if (progressCallback) {
                  progressCallback(p);
                }
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: p,
                  status: "ok"
                });
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", p);
              }, true);
            case 52:
              // check the versions again
              this.targetDevice.versionBL = null;
              _context9.next = 55;
              return this.checkDeviceFirmwares(this.targetDevice);
            case 55:
              log.debug("waiting extra 500ms after FW check");
              _context9.next = 58;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["waitms"])(500);
            case 58:
              if (!needsBL) {
                _context9.next = 61;
                break;
              }
              _context9.next = 61;
              return this.updateBLWithRetry(function (progress) {
                var p = (progressOffset + progress) / totalProgress;
                if (progressCallback) {
                  progressCallback(p);
                }
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: p,
                  status: "ok"
                });
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", p);
              }, forceUpdate);
            case 61:
              this.onUpdateProgressEvent.fire({
                msg: this.firmwareUpdateMessage,
                progress: 1,
                status: "complete"
              });
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateDone", true);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].close();
              res = true;
              _context9.next = 82;
              break;
            case 67:
              log.debug("using GO post-rebootloader update process");
              // device has post rebootloader FW, so update BL then FW.

              // 1. update BL
              if (!needsBL) {
                _context9.next = 76;
                break;
              }
              _context9.next = 71;
              return this.updateBLWithRetry(function (progress) {
                var p = progress / totalProgress;
                if (progressCallback) {
                  progressCallback(p);
                }
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: p,
                  status: "ok"
                });
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", p);
              }, forceUpdate);
            case 71:
              _context9.next = 73;
              return this.checkDeviceFirmwares(this.targetDevice);
            case 73:
              log.debug("waiting extra 500ms after FW check");
              _context9.next = 76;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["waitms"])(500);
            case 76:
              if (!needsFW) {
                _context9.next = 79;
                break;
              }
              _context9.next = 79;
              return this.updateFWWithRetry(function (progress) {
                var p = (progressOffset + progress) / totalProgress;
                if (progressCallback) {
                  progressCallback(p);
                }
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: p,
                  status: "ok"
                });
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", p);
              }, forceUpdate);
            case 79:
              this.onUpdateProgressEvent.fire({
                msg: this.firmwareUpdateMessage,
                progress: 1,
                status: "complete"
              });
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateDone", true);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].close();
            case 82:
              res = true;
              _context9.next = 93;
              break;
            case 85:
              if (!needsFW) {
                _context9.next = 93;
                break;
              }
              log.debug("using other update process");
              _context9.next = 89;
              return this.updateFWWithRetry(function (progress) {
                if (progressCallback) {
                  progressCallback(progress);
                }
                _this3.onUpdateProgressEvent.fire({
                  msg: _this3.firmwareUpdateMessage,
                  progress: progress,
                  status: "ok"
                });
                _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateProgress", progress);
              }, forceUpdate);
            case 89:
              this.onUpdateProgressEvent.fire({
                msg: this.firmwareUpdateMessage,
                progress: 1,
                status: "complete"
              });
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateDone", true);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].close();
              res = true;
            case 93:
              _context9.next = 102;
              break;
            case 95:
              _context9.prev = 95;
              _context9.t0 = _context9["catch"](4);
              this.onUpdateProgressEvent.fire({
                msg: this.firmwareUpdateMessage,
                progress: 1,
                status: "complete"
              });
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEFWUpdateDone", true);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_9__["MODALCONTROL"].close();
              log.debug("internal update error:", _context9.t0);
              throw _context9.t0;
            case 102:
              _context9.prev = 102;
              log.debug("update done");
              this.updatingDevice = false;
              this.targetDevice.versionBL = null;
              this.targetDevice.versionFW = null;
              _context9.next = 109;
              return this.checkDeviceFirmwares(this.targetDevice);
            case 109:
              this.triggerConnectionUpdate();
              return _context9.finish(102);
            case 111:
              return _context9.abrupt("return", res);
            case 112:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[4, 95, 102, 111]]);
      }));
      function updateDeviceInternal(_x13) {
        return _updateDeviceInternal.apply(this, arguments);
      }
      return updateDeviceInternal;
    }()
  }, {
    key: "updateFWWithRetry",
    value: function () {
      var _updateFWWithRetry = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(progressCallback) {
        var _this4 = this;
        var forceUpdate,
          abort,
          _args11 = arguments;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              forceUpdate = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : false;
              abort = false;
              return _context11.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
                  var suspendDuringUpdate, retryCount, res;
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        suspendDuringUpdate = function suspendDuringUpdate() {
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorSuspendDuringUpdate"]());
                          _this4.unregisterSuspendCallback(suspendDuringUpdate);
                          abort = true;
                        };
                        _this4.registerSuspendCallback(suspendDuringUpdate);
                        retryCount = 0;
                        res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
                      case 4:
                        if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE && retryCount < 2)) {
                          _context10.next = 21;
                          break;
                        }
                        if (!(abort === true)) {
                          _context10.next = 7;
                          break;
                        }
                        return _context10.abrupt("return");
                      case 7:
                        _context10.prev = 7;
                        _context10.next = 10;
                        return _this4.lowLevelUpdateFW(progressCallback, forceUpdate);
                      case 10:
                        res = _context10.sent;
                        if (res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE) {
                          retryCount++;
                          log.debug("failed to update Firmware attempt", retryCount);
                        }
                        _context10.next = 19;
                        break;
                      case 14:
                        _context10.prev = 14;
                        _context10.t0 = _context10["catch"](7);
                        retryCount++;
                        log.warn("failed to update Firmware attempt", retryCount, _context10.t0);
                        if (_context10.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringFW"]) {
                          // Because the error is being thrown and not a return value
                          // we need to set the result based on the error thrown when one is thrown
                          res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].DISCONNECT;
                        } else {
                          res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
                        }
                      case 19:
                        _context10.next = 4;
                        break;
                      case 21:
                        _this4.unregisterSuspendCallback(suspendDuringUpdate);
                        if (res !== _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS) {
                          log.debug("retries:", retryCount);
                          if (res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE) {
                            log.warn("failed to update Firmware due to retries");
                            reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingFW"]());
                          } else if (res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].UNSUPPORTED) {
                            log.warn("failed to update Firmware due to unsupported bootloader");
                            reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorFWUpdateNotSupported"]());
                          } else {
                            log.warn("failed to update Firmware due to connection");
                            reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringFW"]());
                          }
                        }
                        resolve();
                      case 24:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10, null, [[7, 14]]);
                }));
                return function (_x15, _x16) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 3:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function updateFWWithRetry(_x14) {
        return _updateFWWithRetry.apply(this, arguments);
      }
      return updateFWWithRetry;
    }()
  }, {
    key: "updateBLWithRetry",
    value: function () {
      var _updateBLWithRetry = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(progressCallback) {
        var _this5 = this;
        var forceUpdate,
          abort,
          _args13 = arguments;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              forceUpdate = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : false;
              abort = false;
              return _context13.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
                  var suspendDuringUpdate, retryCount, res;
                  return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        suspendDuringUpdate = function suspendDuringUpdate() {
                          reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorSuspendDuringUpdate"]());
                          _this5.unregisterSuspendCallback(suspendDuringUpdate);
                          abort = true;
                        };
                        _this5.registerSuspendCallback(suspendDuringUpdate);
                        retryCount = 0;
                        res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
                      case 4:
                        if (!(res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE && retryCount < 2)) {
                          _context12.next = 21;
                          break;
                        }
                        if (!(abort === true)) {
                          _context12.next = 7;
                          break;
                        }
                        return _context12.abrupt("return");
                      case 7:
                        _context12.prev = 7;
                        _context12.next = 10;
                        return _this5.lowLevelUpdateBL(progressCallback, forceUpdate);
                      case 10:
                        res = _context12.sent;
                        if (res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE) {
                          retryCount++;
                          log.debug("failed to update Bootloader attempt", retryCount);
                        }
                        _context12.next = 19;
                        break;
                      case 14:
                        _context12.prev = 14;
                        _context12.t0 = _context12["catch"](7);
                        retryCount++;
                        log.warn("failed to update Bootloader attempt", retryCount, _context12.t0);
                        if (_context12.t0 instanceof _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringBL"]) {
                          // Because the error is being thrown and not a return value
                          // we need to set the result based on the error thrown when one is thrown
                          res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].DISCONNECT;
                        } else {
                          res = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE;
                        }
                      case 19:
                        _context12.next = 4;
                        break;
                      case 21:
                        _this5.unregisterSuspendCallback(suspendDuringUpdate);
                        if (res !== _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].SUCCESS) {
                          log.debug("retries:", retryCount);
                          if (res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].FAILURE) {
                            log.warn("failed to update Bootloader due to retries");
                            reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorUpdatingBL"]());
                          } else if (res === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateResultCodes"].UNSUPPORTED) {
                            log.warn("failed to update Bootloader due unsupported firmware");
                            reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorBLUpdateNotSupported"]());
                          } else {
                            log.warn("failed to update Bootloader due to connection");
                            reject(new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["ErrorConnectionDuringBL"]());
                          }
                        }
                        resolve();
                      case 24:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12, null, [[7, 14]]);
                }));
                return function (_x18, _x19) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 3:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function updateBLWithRetry(_x17) {
        return _updateBLWithRetry.apply(this, arguments);
      }
      return updateBLWithRetry;
    }()
  }, {
    key: "updateConnectedDevice",
    value: function () {
      var _updateConnectedDevice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(progressCallback) {
        var forceUpdate,
          res,
          _args14 = arguments;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              forceUpdate = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : false;
              if (this.canDoWork()) {
                _context14.next = 3;
                break;
              }
              return _context14.abrupt("return", false);
            case 3:
              _context14.next = 5;
              return this.disableSleep();
            case 5:
              res = false;
              _context14.prev = 6;
              _context14.next = 9;
              return this.updateDeviceInternal(progressCallback, forceUpdate);
            case 9:
              res = _context14.sent;
              if (res) {
                _context14.next = 13;
                break;
              }
              log.error("failed updating single device");
              // disconnectFromBrain();
              throw new Error();
            case 13:
              _context14.next = 20;
              break;
            case 15:
              _context14.prev = 15;
              _context14.t0 = _context14["catch"](6);
              log.error("error updating single device. error name:", _context14.t0.name);
              log.error(_context14.t0);
              // disconnectFromBrain();
              throw _context14.t0;
            case 20:
              _context14.prev = 20;
              _context14.next = 23;
              return this.enableSleep();
            case 23:
              return _context14.finish(20);
            case 24:
              return _context14.abrupt("return", res);
            case 25:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[6, 15, 20, 24]]);
      }));
      function updateConnectedDevice(_x20) {
        return _updateConnectedDevice.apply(this, arguments);
      }
      return updateConnectedDevice;
    }()
  }, {
    key: "canDoWork",
    value: function canDoWork() {
      var requireConnected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (requireConnected && !this.connected) {
        log.warn("not connected to device");
        return false;
      }
      if (this.checkingDeviceFirmware) {
        log.warn("already checking a device");
        return false;
      }
      if (this.updatingDevice) {
        log.warn("already updating a device");
        return false;
      }
      if (this.locatingDevice) {
        log.warn("already locating a device");
        return false;
      }
      return true;
    }
    //#endregion internal firmware

    //#region internal firmware low level
    /**
     * This will pull the bootloader version from the connected brain. This
     * actually pulls the value from the brain for the public version
     * @returns the bootloader version on the connected brain
     * @throws NoBrainConnectedError
     */
  }, {
    key: "supportsUserPort",
    get:
    //#endregion internal firmware low level

    //#region User Port comms
    function get() {
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
      var _openConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
            case 1:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      function openConnectionUserPort() {
        return _openConnectionUserPort.apply(this, arguments);
      }
      return openConnectionUserPort;
    }()
  }, {
    key: "closeConnectionUserPort",
    value: function () {
      var _closeConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
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
      if (this.lastConnectionState !== newState) {
        log.debug("new state:", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"][newState]);
        this.lastConnectionState = newState;
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.ConnectionStateChange", newState);
      }
    }

    /**
     * this shoudl get called any time the cached sensor values need to be reset.
     *
     * for example:
     * * when connecting to a brain
     * * when a connection is lost
     */
  }, {
    key: "resetStatusValues",
    value: function resetStatusValues() {
      _controllers_SensorHelpers__WEBPACK_IMPORTED_MODULE_4__["resetStatusValues"]();
    }
  }, {
    key: "waitForReconnect",
    value: function () {
      var _waitForReconnect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
        var _this6 = this;
        var timeoutms,
          _args18 = arguments;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              timeoutms = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : 0;
              log.debug("waiting for reconnect");
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(_resolve, _reject) {
                  var waitTimeout;
                  return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                    while (1) switch (_context17.prev = _context17.next) {
                      case 0:
                        waitTimeout = null;
                        if (timeoutms) {
                          waitTimeout = setTimeout(function () {
                            if (_this6.connectionResolver) {
                              _this6.connectionResolver = null;
                              _reject();
                            }
                          }, timeoutms);
                        }
                        if (_this6.connectionResolver) {
                          _this6.connectionResolver.reject(null);
                        }
                        _this6.connectionResolver = {
                          resolve: function resolve(data) {
                            _this6.connectionResolver = null;
                            if (waitTimeout) {
                              clearTimeout(waitTimeout);
                            }
                            _resolve(data);
                          },
                          reject: function reject(err) {
                            _this6.connectionResolver = null;
                            if (waitTimeout) {
                              clearTimeout(waitTimeout);
                            }
                            _reject(err);
                          }
                        };
                      case 4:
                      case "end":
                        return _context17.stop();
                    }
                  }, _callee17);
                }));
                return function (_x21, _x22) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 3:
            case "end":
              return _context18.stop();
          }
        }, _callee18);
      }));
      function waitForReconnect() {
        return _waitForReconnect.apply(this, arguments);
      }
      return waitForReconnect;
    }()
    /**
     * this will register a callback that will be called when the tablet
     * is suspending the application. This will not do anything in the browser.
     * @param callback the callback to add
     */
  }, {
    key: "setUpdateTimeoutTimerCallback",
    value: function setUpdateTimeoutTimerCallback(callback) {
      log.debug("setUpdateTimeoutTimerCallback");
      this.updateTimeoutTimerCallback = callback;
    }
  }, {
    key: "clearUpdateTimeoutTimerCallback",
    value: function clearUpdateTimeoutTimerCallback() {
      log.debug("clearUpdateTimeoutTimerCallback");
      this.setUpdateTimeoutTimerCallback(null);
    }
  }, {
    key: "startUpdateTimeoutTimer",
    value: function startUpdateTimeoutTimer() {
      var _this7 = this;
      var timeoutms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15000;
      log.debug("startUpdateTimeoutTimer");
      this.updateTimeoutTimer = setTimeout(function () {
        if (_this7.updateTimeoutTimerCallback) {
          _this7.updateTimeoutTimerCallback();
        }
        _this7.updateTimeoutTimer = null;
      }, timeoutms);
    }
  }, {
    key: "restartUpdateTimeoutTimer",
    value: function restartUpdateTimeoutTimer() {
      log.debug("restartUpdateTimeoutTimer");
      this.stopUpdateTimeoutTimer();
      this.startUpdateTimeoutTimer();
    }
  }, {
    key: "stopUpdateTimeoutTimer",
    value: function stopUpdateTimeoutTimer() {
      log.debug("stopUpdateTimeoutTimer");
      if (this.updateTimeoutTimer) {
        clearTimeout(this.updateTimeoutTimer);
      }
      this.updateTimeoutTimer = null;
    }
    //#endregion update timeout system

    //#region native -> webapp events
  }, {
    key: "processDiscoveredDevice",
    value: function processDiscoveredDevice(name, serial, product, mode, version, rssi, battery, canUpdate) {
      var _this8 = this;
      var vers = _VexVersion__WEBPACK_IMPORTED_MODULE_3__["VexVersion"].fromString(version);
      var alreadyFound = false;
      // tslint:disable-next-line: prefer-for-of
      for (var i = 0; i < this.discoveredDevices.length; i++) {
        if (this.discoveredDevices[i].serial === serial) {
          alreadyFound = true;
          this.discoveredDevices[i].name = name;
          this.discoveredDevices[i].rssi = rssi;
          this.discoveredDevices[i].battery = battery;
          var recheckVersions = false;
          if (this.discoveredDevices[i].version.compare(vers) !== 0) {
            this.discoveredDevices[i].version = vers;
            recheckVersions = true;
          }
          if (this.discoveredDevices[i].mode !== mode) {
            this.discoveredDevices[i].mode = mode;
            recheckVersions = true;
          }
          log.debug("updated device", this.discoveredDevices[i]);
          if (this.targetDevice && this.targetDevice.serial === serial) {
            log.debug("skip recheck");
            break;
          }
          if (recheckVersions) {
            log.debug("setup for FW/BL recheck");
            this.discoveredDevices[i].needsFWUpdate = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
            this.discoveredDevices[i].needsBLUpdate = _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
            this.checkDeviceFirmwares(this.discoveredDevices[i]).then(function () {
              _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.DeviceListUpdate", _this8.discoveredDevices);
            });
          }
          break;
        }
      }
      if (!alreadyFound) {
        // create new device object with discovered device info
        var tmpDev = {
          serial: serial,
          version: vers,
          versionFW: null,
          versionBL: null,
          name: name,
          deviceType: product,
          mode: mode,
          connectionMethod: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].BLE,
          brainConnected: true,
          canUpdate: true,
          needsFWUpdate: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure,
          needsBLUpdate: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure,
          battery: battery,
          rssi: rssi
        };
        log.debug("adding new device", tmpDev);
        this.checkDeviceFirmwares(tmpDev).then(function () {
          _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.DeviceListUpdate", _this8.discoveredDevices);
        });
        this.discoveredDevices.push(tmpDev);
      }
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.DeviceListUpdate", this.discoveredDevices);
    }
  }, {
    key: "onGO123BLEDeviceLost",
    value: function onGO123BLEDeviceLost(serial) {
      log.info("onGO123BLEDeviceLost", serial);
      // tslint:disable-next-line: prefer-for-of
      for (var i = 0; i < this.discoveredDevices.length; i++) {
        if (this.discoveredDevices[i].serial === serial) {
          this.discoveredDevices.splice(i, 1);
          break;
        }
      }
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.DeviceListUpdate", this.discoveredDevices);
    }
  }, {
    key: "onGO123BLEDeviceFWUpdateProgress",
    value: function onGO123BLEDeviceFWUpdateProgress(progress) {
      log.debug("FW update progress", progress, "%");
      this.restartUpdateTimeoutTimer();
      if (this.FWUpdateProgressCB) {
        this.FWUpdateProgressCB(progress / 100);
      }
    }
  }, {
    key: "onGO123BLEDeviceFWUpdateComplete",
    value: function onGO123BLEDeviceFWUpdateComplete(success) {
      log.info("FW update complete. success?", success);
      this.stopUpdateTimeoutTimer();
      if (this.resolveFWUpdatePromise) {
        this.resolveFWUpdatePromise(success);
      }
    }
  }, {
    key: "onGO123BLEDeviceBLUpdateProgress",
    value: function onGO123BLEDeviceBLUpdateProgress(progress) {
      log.debug("BL update progress", progress, "%");
      this.restartUpdateTimeoutTimer();
      if (this.BLUpdateProgressCB) {
        this.BLUpdateProgressCB(progress / 100);
      }
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_7__["fireEvent"]("HWInterface.BLEBLUpdateProgress", progress / 100);
    }
  }, {
    key: "onGO123BLEDeviceBLUpdateComplete",
    value: function onGO123BLEDeviceBLUpdateComplete(success) {
      log.info("BL update complete. success?", success);
      this.stopUpdateTimeoutTimer();
      if (this.resolveBLUpdatePromise) {
        this.resolveBLUpdatePromise(success);
      }
    }

    //#region status events
  }, {
    key: "onGO123BLESensorUpdate",
    value: function onGO123BLESensorUpdate(data) {
      _controllers_SensorHelpers__WEBPACK_IMPORTED_MODULE_4__["on123GOBLESensorUpdate"](data);
    }
  }, {
    key: "onGO123BLEPortsUpdate",
    value: function onGO123BLEPortsUpdate(data) {
      if (data.battery !== 0) {
        this.targetDevice.battery = data.battery;
      }
      _controllers_SensorHelpers__WEBPACK_IMPORTED_MODULE_4__["on123GOBLEPortsUpdate"](data);
    }
    //#endregion status events
    //#endregion native -> webapp events

    //#region low-level logger
  }]);
  return GO123Interface;
}(_HWInterfaceBase__WEBPACK_IMPORTED_MODULE_5__["HWInterfaceBase"]);
_defineProperty(GO123Interface, "FWUpdateMessagesGO", ["GO FW Update In-Progress-1", "GO Update In-Progress-2"]);
_defineProperty(GO123Interface, "FWUpdateMessages123", ["GO FW Update In-Progress-1", "123 Update In-Progress-2"]);


/***/ }),

/***/ "./src/HardwareInterface/controllers/SensorHelpers.ts":
/*!************************************************************!*\
  !*** ./src/HardwareInterface/controllers/SensorHelpers.ts ***!
  \************************************************************/
/*! exports provided: resetStatusValues, on123GOBLESensorUpdate, on123GOBLEPortsUpdate, sensorValues, botStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetStatusValues", function() { return resetStatusValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on123GOBLESensorUpdate", function() { return on123GOBLESensorUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on123GOBLEPortsUpdate", function() { return on123GOBLEPortsUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sensorValues", function() { return sensorValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "botStatus", function() { return botStatus; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("GO SensorHelpers");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();



var sensorValues = null;
var botStatus = {
  battery: 0,
  ports: new Array(6).fill(null)
};
function resetStatusValues() {
  sensorValues = {
    hue: 0,
    brightness: 0,
    proximity: 0,
    accX: 0,
    accY: 0,
    accZ: 0,
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
    pitch: 0,
    roll: 0,
    yaw: 0,
    floor: 0
  };
  botStatus.ports.fill({
    portNumber: 0,
    deviceID: _types_HWEnums__WEBPACK_IMPORTED_MODULE_2__["vexPortDeviceID"].Unknown,
    activeCommand: 0xFF
  });
  botStatus.ports.forEach(function (port, index) {
    port.portNumber = index;
  });
  sendStatusUpdateEvent();
}
function on123GOBLESensorUpdate(data) {
  sensorValues = data;
  sendStatusUpdateEvent();
}
function on123GOBLEPortsUpdate(data) {
  botStatus = data;
  sendStatusUpdateEvent();
}
function sendStatusUpdateEvent() {
  _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]("HWInterface.GOStatusUpdate", sensorValues, botStatus);
}


/***/ })

});
//# sourceMappingURL=078ee2d80a834c12408e.16.bundle.js.map