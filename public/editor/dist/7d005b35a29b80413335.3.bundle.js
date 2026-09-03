(window["webpackJsonpwebapp"] = window["webpackJsonpwebapp"] || []).push([[3],{

/***/ "./src/HardwareInterface/IQEXPV5/EXP/EXPInterface.ts":
/*!***********************************************************!*\
  !*** ./src/HardwareInterface/IQEXPV5/EXP/EXPInterface.ts ***!
  \***********************************************************/
/*! exports provided: EXPInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPInterface", function() { return EXPInterface; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _IQEXPV5Interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../IQEXPV5Interface */ "./src/HardwareInterface/IQEXPV5/IQEXPV5Interface.ts");
/* harmony import */ var _VexVersion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VexVersion */ "./src/HardwareInterface/VexVersion.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("EXPInterface");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering interface-name

// interface types/enums



// TODO: cleanup imports



var EXPInterface = /*#__PURE__*/function (_IQEXPV5Interface) {
  _inherits(EXPInterface, _IQEXPV5Interface);
  var _super = _createSuper(EXPInterface);
  function EXPInterface() {
    var _this;
    _classCallCheck(this, EXPInterface);
    _this = _super.call(this);

    // preload the firmware to make checks faster
    //#endregion Python VM Checks
    // none of the script commands methods are supported by V5. already handled by parent class
    //#region script commands
    //#endregion script commands
    // none of the remote control methods are supported by V5. already handled by parent class
    //#region remote control
    //#endregion remote control
    //#region firmware
    _defineProperty(_assertThisInitialized(_this), "cachedServerFirmwareVersion", null);
    _this.cacheServerFirmwareVersion();
    return _this;
  }

  //#region connection control
  /**
   * this will open a connection to the V5. This will return when the
   * connection is opened or if the connection fails to open.
   * @throws OperationNotSupportedError
   */
  _createClass(EXPInterface, [{
    key: "openConnectionToBrain",
    value:
    /**
     * this will open a connection to the brain. This will return when the
     * connection is opened or if the connection fails to open.
     * @throws OperationNotSupportedError
     */
    function openConnectionToBrain(id) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * this will close the currently open connection
     */
  }, {
    key: "unlockBrain",
    value:
    /**
     * This will send the unlock code to the connected brain.
     * @param unlockCode the 4 digit unlock code
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
    function unlockBrain(unlockCode) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * Get the current connection state
     */
  }, {
    key: "getBrainScanList",
    value:
    //#endregion connection control

    //#region brain info
    function getBrainScanList() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * Get the information for the currently connected brain.
     * @returns the connected brain information or null if no brain is connected
     * @throws NoBrainConnectedError
     */
  }, {
    key: "getTargetBrainInfo",
    value:
    /**
     * Get the information for the brain that is the connection target.
     * @returns the target brain information or null if not trying to connect to a brain
     * @throws OperationNotSupportedError
     */
    function getTargetBrainInfo() {
      throw new Error("Method not implemented.");
    }

    /**
     * Sets the name of the currently connected brain
     * @param name the name to set the brain to
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
  }, {
    key: "downloadProjectAndRun",
    value:
    //#endregion program control

    //#region project downloads
    /**
     * This will attempt to download the specified program to a Brain. If the
     * code is C++, the code will be compiled first.
     * After the download is complete, the project will be run on the brain.
     * @param code the code to download
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the project to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @param options various options to adjust the download process
     * @throws NoBrainConnectedError
     */
    function downloadProjectAndRun(code, slot, projectName, language, progressCallback, options) {
      log.debug("downloadProjectAndRun called");
      var defaultOptions = {
        autoRun: true
      };
      return this.downloadProject(code, slot, projectName, language, progressCallback, Object.assign(defaultOptions, options));
    }

    /**
     * This will attempt to download the specified program to the connected
     * brain. If the program is python, it will also make sure the VM is loaded
     * on the brain.
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the program to download
     * @param data the compiled binaries to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @throws NoBrainConnectedError
     */
  }, {
    key: "runInitialcheck",
    value:
    /**
     * used to check if the python VM is good and acn get updated
     * @returns null if no issues or the IDownloadResult to pass back if there is an issue
     */
    function () {
      var _runInitialcheck = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(language) {
        var vmResult;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(language === "python" && this.getBrainInfo().connectionMethod === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].RC_Radio)) {
                _context.next = 7;
                break;
              }
              _context.next = 3;
              return this.getPythonVMValid();
            case 3:
              vmResult = _context.sent;
              if (vmResult) {
                _context.next = 7;
                break;
              }
              log.debug("Python VM checks failed");
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].invalidVM
              });
            case 7:
              return _context.abrupt("return", null);
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function runInitialcheck(_x) {
        return _runInitialcheck.apply(this, arguments);
      }
      return runInitialcheck;
    }() //#endregion project downloads
    //#region compilers
    //#endregion compilers
    //#region Python VM Checks
    /**
     * Only supported on IQNativeUSB
     * @throws OperationNotSupportedError
     */
  }, {
    key: "getPythonVMValid",
    value: function getPythonVMValid() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
  }, {
    key: "cacheServerFirmwareVersion",
    value: function cacheServerFirmwareVersion() {
      var _this2 = this;
      if (this.cachedServerFirmwareVersion === null) {
        this.fetchAndParseCurrentFirmware().then(function (result) {
          _this2.cachedServerFirmwareVersion = result;
        });
      }
    }
  }, {
    key: "getCahcedServerFirmwareVersion",
    value: function getCahcedServerFirmwareVersion() {
      if (!this.cachedServerFirmwareVersion) {
        this.cacheServerFirmwareVersion();
      }
      return this.cachedServerFirmwareVersion;
    }
  }, {
    key: "getUpdatedNeededFromServer",
    value: function getUpdatedNeededFromServer(server, brain) {
      log.debug("server:", server, "brain:", brain);
      if (server == null || brain.toUserString() === "0.0.0") {
        return _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].Unsure;
      }
      return server.compare(brain) > 0 ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate;
    }
  }, {
    key: "getServerFirmwareVersion",
    value: function () {
      var _getServerFirmwareVersion = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var catalogURL, catalogResponse, catalog, versionStr;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              catalogURL = "https://content.vexrobotics.com/vexos/public/EXP/catalog.txt";
              log.debug("catalogURL:", catalogURL);
              _context2.prev = 2;
              _context2.next = 5;
              return fetch(catalogURL);
            case 5:
              catalogResponse = _context2.sent;
              _context2.next = 8;
              return catalogResponse.text();
            case 8:
              catalog = _context2.sent;
              log.debug("catalog content:", catalog);
              versionStr = catalog.replace(/VEXOS_EXP_/, "");
              return _context2.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_4__["VexVersion"].fromCatalogString(versionStr));
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](2);
              log.warn(_context2.t0);
              return _context2.abrupt("return", null);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 14]]);
      }));
      function getServerFirmwareVersion() {
        return _getServerFirmwareVersion.apply(this, arguments);
      }
      return getServerFirmwareVersion;
    }()
    /**
     * Use this to check if the interface supports updating the firmware
     * @returns true if the interface supports firmware updating
     */
  }, {
    key: "canUpdateFirmware",
    value: function canUpdateFirmware() {
      return true;
    }

    /**
     * Use this to check if the interface will automatically try to update
     * the firmware for a brain that connects
     */
  }, {
    key: "doesFirmwareUpdateOnConnect",
    value: function doesFirmwareUpdateOnConnect() {
      return false;
    }

    /**
     * Call this to update the firmware of the connected brain.
     * @param progress a callback that can return the update progress
     * @throws OperationNotSupportedError
     * @throws NoBrainConnectedError
     */
  }, {
    key: "updateControllerFirmware",
    value:
    /**
     * Call this to update the firmware of the connected controller.
     * @param progress a callback that can return the update progress
     * @throws OperationNotSupportedError
     */
    function updateControllerFirmware(progress, isDFU) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * will pull the firmware version from the server
     */
  }, {
    key: "fetchAndParseCurrentFirmware",
    value: function () {
      var _fetchAndParseCurrentFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var data, response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              data = "VEXOS_EXP_1_0_0_0";
              _context3.prev = 1;
              _context3.next = 4;
              return fetch("https://content.vexrobotics.com/vexos/public/EXP/catalog.txt");
            case 4:
              response = _context3.sent;
              _context3.next = 7;
              return response.text();
            case 7:
              data = _context3.sent;
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              log.warn("Pulling firmware version error:", _context3.t0);
            case 13:
              data = data.split("_").splice(2, 5).join(".");
              return _context3.abrupt("return", _VexVersion__WEBPACK_IMPORTED_MODULE_4__["VexVersion"].fromString(data));
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 10]]);
      }));
      function fetchAndParseCurrentFirmware() {
        return _fetchAndParseCurrentFirmware.apply(this, arguments);
      }
      return fetchAndParseCurrentFirmware;
    }() //#endregion firmware
    //#region User Port comms
  }]);
  return EXPInterface;
}(_IQEXPV5Interface__WEBPACK_IMPORTED_MODULE_3__["IQEXPV5Interface"]);


/***/ })

}]);
//# sourceMappingURL=7d005b35a29b80413335.3.bundle.js.map