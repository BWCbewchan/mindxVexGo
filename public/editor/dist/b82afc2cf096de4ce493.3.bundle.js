this["webpackChunkwebapp"]([3],{

/***/ "./src/HardwareInterface/IQEXPV5/IQEXPV5Interface.ts":
/*!***********************************************************!*\
  !*** ./src/HardwareInterface/IQEXPV5/IQEXPV5Interface.ts ***!
  \***********************************************************/
/*! exports provided: IQEXPV5Interface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IQEXPV5Interface", function() { return IQEXPV5Interface; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/HWErrors */ "./src/HardwareInterface/types/HWErrors.ts");
/* harmony import */ var _Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Compiler/compiler */ "./src/Compiler/compiler.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dispatcher */ "./src/dispatcher.ts");
/* harmony import */ var _widget_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../widget/Modal */ "./src/widget/Modal.tsx");
/* harmony import */ var _HWInterfaceBase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../HWInterfaceBase */ "./src/HardwareInterface/HWInterfaceBase.ts");
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../platformInfo */ "./src/platformInfo.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers */ "./src/HardwareInterface/helpers.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../AppInfo */ "./src/AppInfo.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("IQEXPV5Interface");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering interface-name

// interface types/enums



// TODO: cleanup imports









var fs = null;
if (_platformInfo__WEBPACK_IMPORTED_MODULE_7__["PlatformIsNWJS"]) {
  Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! fs */ "./node_modules/node-libs-browser/mock/empty.js", 7)).then(function (i) {
    fs = i;
  });
}
var IQEXPV5Interface = /*#__PURE__*/function (_HWInterfaceBase) {
  _inherits(IQEXPV5Interface, _HWInterfaceBase);
  var _super = _createSuper(IQEXPV5Interface);
  function IQEXPV5Interface() {
    var _this;
    _classCallCheck(this, IQEXPV5Interface);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "CurrentFirmwarePreviousFetch", null);
    _defineProperty(_assertThisInitialized(_this), "CurrentFirmwarePreviousFetchDate", null);
    _defineProperty(_assertThisInitialized(_this), "CurrentFirmwareIsFetching", false);
    _defineProperty(_assertThisInitialized(_this), "firmwareFetchHandlers", []);
    return _this;
  }

  //#region connection control
  /**
   * this will open a connection to the V5. This will return when the
   * connection is opened or if the connection fails to open.
   * @throws OperationNotSupportedError
   */
  _createClass(IQEXPV5Interface, [{
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
     * @returns the current connection state
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
    key: "isBrainConnected",
    value: function isBrainConnected() {
      return this.getConnectionState() === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected;
    }
    //#endregion brain info

    //#region program control
    /**
     * This will attempt to run the program loaded in the specified slot on
     * the brain.
     * @param slot the slot to run. 0 ndexed from 0-3 for IQ1 and 0-7 for IQ2/EXP/V5
     * @throws NoBrainConnectedError
     */
  }, {
    key: "downloadProject",
    value: //#endregion program control
    //#region project downloads
    /**
     * This will attempt to download the specified program to a Brain. If the
     * code is C++, the code will be compiled first.
     * @param code the code to download
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the project to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @param options various options to adjust the download process
     * @throws NoBrainConnectedError
     */
    function () {
      var _downloadProject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(code, slot, projectName, language, progressCallback, options) {
        var initialCheck, programDownloadProgressEvent, compileResult, compilerCode, internalProgressCallback, downloadResult;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              log.info("downloadProject", slot, projectName, language);
              _context.next = 3;
              return this.runInitialcheck(language);
            case 3:
              initialCheck = _context.sent;
              if (!initialCheck) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", initialCheck);
            case 6:
              if (!code) {
                _context.next = 43;
                break;
              }
              programDownloadProgressEvent = new _dispatcher__WEBPACK_IMPORTED_MODULE_4__["DispatcherEvent"]();
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].showDownloadProgress(programDownloadProgressEvent, language);
              _context.next = 11;
              return this.compileProject(code, slot, projectName, language, options);
            case 11:
              compileResult = _context.sent;
              compilerCode = compileResult.code;
              if (!(compilerCode !== _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].success)) {
                _context.next = 30;
                break;
              }
              log.warn("unable to download due to compiler/linter error -", _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"][compilerCode]);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].close();
              if (!(compilerCode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].notReachable)) {
                _context.next = 20;
                break;
              }
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].notReachable
              });
            case 20:
              if (!(compilerCode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].compilerTimeout)) {
                _context.next = 24;
                break;
              }
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].compilerTimeout
              });
            case 24:
              if (!(compilerCode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].shellDisabled)) {
                _context.next = 28;
                break;
              }
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].shellDisabled
              });
            case 28:
              if (!(compilerCode === _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].compilerError)) {
                _context.next = 30;
                break;
              }
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].compilerError,
                data: compileResult.logs
              });
            case 30:
              internalProgressCallback = function internalProgressCallback(data) {
                programDownloadProgressEvent.fire(data);
                if (progressCallback) {
                  progressCallback(data.progress);
                }
              };
              log.info("downloading program");
              _context.next = 34;
              return this.downloadProgram(slot, projectName, language, compileResult.bin, internalProgressCallback);
            case 34:
              downloadResult = _context.sent;
              if (downloadResult) {
                _context.next = 39;
                break;
              }
              log.warn("download failed");
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].close();
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].error
              });
            case 39:
              log.info("download success");
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].close();
              if (options && options.autoRun) {
                this.play(slot);
              }
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].success,
                data: compileResult.logs
              });
            case 43:
              log.warn("no code to download...");
              return _context.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["DownloadResultCode"].error
              });
            case 45:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
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
     * @param code the code to download
     * @param slot the slot to download the program to. (0-7)
     * @param projectName the name of the project to download
     * @param language the language of the project to download
     * @param progressCallback a callback to inform about how far along the download progress is
     * @param options various options to adjust the download process
     * @throws NoBrainConnectedError
     */
  }, {
    key: "compileProject",
    value: //#endregion project downloads
    //#region compilers
    /**
     * compile the provided source code and return the result.
     * @param code the code to compile.
     * @param slot the slot to compile the program for. (not used for V5)
     * @param projectName the name of the project to compile
     * @param language the language of the project to compile
     * @param options various options to adjust the compilation process
     */
    function () {
      var _compileProject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(code, slot, projectName, language, options) {
        var specialCharacters, output, logs, binName, compilerResult, errorLog, binData, _compilerResult, _errorLog, _binData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              specialCharacters = "/^`{}\"'|\\><;:,!@#$%\^&)(+=._-]$/?";
              output = null;
              logs = null;
              if (!(language === "cpp")) {
                _context2.next = 60;
                break;
              }
              binName = projectName.replace(/ /g, "");
              binName.split("").forEach(function (character) {
                if (specialCharacters.includes(character)) {
                  binName = binName.replace(character, "");
                }
              });
              log.info("compiling cpp code");
              compilerResult = null;
              if (!_targetPlatform__WEBPACK_IMPORTED_MODULE_8__["targetIsIQ"]) {
                _context2.next = 20;
                break;
              }
              if (!(options.generation === "Second")) {
                _context2.next = 15;
                break;
              }
              _context2.next = 12;
              return _Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["compileIQ2Program"](binName, code);
            case 12:
              compilerResult = _context2.sent;
              _context2.next = 18;
              break;
            case 15:
              _context2.next = 17;
              return _Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["compileIQProgram"](binName, code, slot + 1, options.hasController);
            case 17:
              compilerResult = _context2.sent;
            case 18:
              _context2.next = 29;
              break;
            case 20:
              if (!_targetPlatform__WEBPACK_IMPORTED_MODULE_8__["targetIsEXP"]) {
                _context2.next = 26;
                break;
              }
              _context2.next = 23;
              return _Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["compileEXPProgram"](binName, code);
            case 23:
              compilerResult = _context2.sent;
              _context2.next = 29;
              break;
            case 26:
              _context2.next = 28;
              return _Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["compileV5Program"](binName, code);
            case 28:
              compilerResult = _context2.sent;
            case 29:
              log.info("checking compiler result", compilerResult);
              if (!(compilerResult.err < 0)) {
                _context2.next = 52;
                break;
              }
              log.debug("compiler returned with error code?", compilerResult.err);
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["wasTimeout"](compilerResult)) {
                _context2.next = 37;
                break;
              }
              log.warn("compiler failed - process timed out");
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].compilerTimeout
              });
            case 37:
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["wasNotReachable"](compilerResult)) {
                _context2.next = 42;
                break;
              }
              log.warn("compiler failed - could not reach cloud compiler");
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].notReachable
              });
            case 42:
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["shellDisabledResult"](compilerResult)) {
                _context2.next = 47;
                break;
              }
              log.warn("compiler failed - shell disabled");
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].shellDisabled
              });
            case 47:
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["wasCompilationError"](compilerResult)) {
                _context2.next = 52;
                break;
              }
              errorLog = [];
              if (compilerResult.data && Array.isArray(compilerResult.data) && compilerResult.data.length > 0) {
                errorLog = compilerResult.data;
              } else if (compilerResult.msg) {
                errorLog = [compilerResult.msg];
              }
              log.warn("compiler failed - compilation error:", errorLog);
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].compilerError,
                logs: errorLog
              });
            case 52:
              log.debug("compiler returned with warnings?");
              if (compilerResult.output && Array.isArray(compilerResult.output) && compilerResult.output.length > 0) {
                logs = compilerResult.output;
              }
              log.info("compilation success");
              binData = null;
              if (_platformInfo__WEBPACK_IMPORTED_MODULE_7__["PlatformIsNWJS"] && _AppInfo__WEBPACK_IMPORTED_MODULE_10__["appState"].getAppState().compMode === "integrated") {
                log.debug("running in NWJS. need to read the bin file");
                binData = fs.readFileSync(compilerResult.data);
                log.debug("done reading bin file", binData);
              } else {
                binData = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["stringToArrayBuffer"])(atob(compilerResult.data));
              }
              output = {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].success,
                bin: binData,
                logs: logs
              };
              _context2.next = 96;
              break;
            case 60:
              if (!(language === "python")) {
                _context2.next = 96;
                break;
              }
              if (options.skipErrorCheck) {
                _context2.next = 93;
                break;
              }
              log.info("linting python code");
              _context2.next = 65;
              return _Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["lintPythonProgram"](projectName, code);
            case 65:
              _compilerResult = _context2.sent;
              if (!(_compilerResult.err < 0)) {
                _context2.next = 90;
                break;
              }
              log.debug("linter returned with error code?", _compilerResult.err);
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["wasTimeout"](_compilerResult)) {
                _context2.next = 73;
                break;
              }
              log.warn("linter failed - process timed out");
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].compilerTimeout
              });
            case 73:
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["wasNotReachable"](_compilerResult)) {
                _context2.next = 78;
                break;
              }
              log.warn("linter failed - could not reach cloud compiler");
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].notReachable
              });
            case 78:
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["shellDisabledResult"](_compilerResult)) {
                _context2.next = 83;
                break;
              }
              log.warn("linter failed - shell disabled");
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].shellDisabled
              });
            case 83:
              if (!_Compiler_compiler__WEBPACK_IMPORTED_MODULE_3__["wasCompilationError"](_compilerResult)) {
                _context2.next = 88;
                break;
              }
              _errorLog = [];
              if (_compilerResult.data && Array.isArray(_compilerResult.data) && _compilerResult.data.length > 0) {
                _errorLog = _compilerResult.data;
              } else if (_compilerResult.msg) {
                _errorLog = [_compilerResult.msg];
              }
              log.warn("compiler failed - compilation error:", _errorLog);
              return _context2.abrupt("return", {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].compilerError,
                logs: _errorLog
              });
            case 88:
              _context2.next = 91;
              break;
            case 90:
              log.info("linting done");
            case 91:
              _context2.next = 94;
              break;
            case 93:
              log.info("skipping python code linting");
            case 94:
              _binData = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["stringToArrayBuffer"])(code);
              output = {
                code: _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["CompilerResultCode"].success,
                bin: _binData,
                logs: logs
              };
            case 96:
              log.info("compilation result:", output);
              return _context2.abrupt("return", output);
            case 98:
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
    // none of the script commands methods are supported by IQ/EXP/V5
    //#region script commands
    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "executeScriptCommand",
    value: function executeScriptCommand(command) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "executeScriptCommands",
    value: function executeScriptCommands(commands) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "stopScriptEngine",
    value: function stopScriptEngine() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "setConfigPreset",
    value: function setConfigPreset(preset) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "setConfigForPort",
    value: function setConfigForPort(port, deviceType, flags) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "setEyeSensorMode",
    value: function setEyeSensorMode(mode) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "clearPortEvents",
    value: function clearPortEvents(port) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
    //#endregion script commands

    //#region remote control
    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "sendControllerButton",
    value: function sendControllerButton(command, buttonID, whenPressed) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "sendControllerJoystickPreset",
    value: function sendControllerJoystickPreset(newType, driveSensi, turnSensi) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "saveControllerConfig",
    value: function saveControllerConfig() {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }

    /**
     * not supported by IQ/EXP/V5
     * @throws OperationNotSupportedError
     */
  }, {
    key: "sendControllerValues",
    value: function sendControllerValues(leftX, leftY, rightX, rightY, buttons) {
      throw new _types_HWErrors__WEBPACK_IMPORTED_MODULE_2__["OperationNotSupportedError"]();
    }
    //#endregion remote control

    //#region firmware
  }, {
    key: "doesFirmwareUpdateOnConnect",
    value:
    /**
     * Use this to check if the interface will automatically try to update
     * the firmware for a brain that connects
     */
    function doesFirmwareUpdateOnConnect() {
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
     * this will find the current VEXos firmware version from the server
     * @returns
     */
  }, {
    key: "getCurrentFirmware",
    value: function () {
      var _getCurrentFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this2 = this;
        var elapsedTime;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.CurrentFirmwarePreviousFetch) {
                _context3.next = 4;
                break;
              }
              elapsedTime = (Date.now() - this.CurrentFirmwarePreviousFetchDate) / 1000;
              if (!(elapsedTime < 60)) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", this.CurrentFirmwarePreviousFetch);
            case 4:
              if (!this.CurrentFirmwareIsFetching) {
                _context3.next = 8;
                break;
              }
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                var handler = function handler(version) {
                  _this2.removeFirmwareFetchHandler(handler);
                  resolve(version);
                };
                _this2.addFirmwareFetchHandler(handler);
              }));
            case 8:
              return _context3.abrupt("return", this.fetchCurrentFirmware());
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getCurrentFirmware() {
        return _getCurrentFirmware.apply(this, arguments);
      }
      return getCurrentFirmware;
    }()
  }, {
    key: "fetchCurrentFirmware",
    value: function () {
      var _fetchCurrentFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var newFirmwareVersion;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              log.debug("pulling version from server");
              this.CurrentFirmwareIsFetching = true;
              _context4.next = 4;
              return this.fetchAndParseCurrentFirmware();
            case 4:
              newFirmwareVersion = _context4.sent;
              this.CurrentFirmwarePreviousFetch = newFirmwareVersion;
              this.CurrentFirmwarePreviousFetchDate = Date.now();
              this.CurrentFirmwareIsFetching = false;
              this.callFirmwareFetchHandlers(this.CurrentFirmwarePreviousFetch);
              return _context4.abrupt("return", this.CurrentFirmwarePreviousFetch);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function fetchCurrentFirmware() {
        return _fetchCurrentFirmware.apply(this, arguments);
      }
      return fetchCurrentFirmware;
    }()
  }, {
    key: "addFirmwareFetchHandler",
    value: function addFirmwareFetchHandler(callback) {
      if (this.firmwareFetchHandlers.indexOf(callback) >= 0) {
        return;
      }
      this.firmwareFetchHandlers.push(callback);
    }
  }, {
    key: "removeFirmwareFetchHandler",
    value: function removeFirmwareFetchHandler(callback) {
      var i = this.firmwareFetchHandlers.indexOf(callback);
      if (i < 0) {
        throw new Error("Unknown callback.");
      }
      this.firmwareFetchHandlers.splice(i, 1);
    }
  }, {
    key: "callFirmwareFetchHandlers",
    value: function callFirmwareFetchHandlers(version) {
      if (this.firmwareFetchHandlers) {
        this.firmwareFetchHandlers.forEach(function (callback) {
          callback(version);
        });
      }
    }

    /**
     * will pull the firmware version from the server
     * This should be per target
     */
  }]);
  return IQEXPV5Interface;
}(_HWInterfaceBase__WEBPACK_IMPORTED_MODULE_6__["HWInterfaceBase"]);


/***/ })

});
//# sourceMappingURL=b82afc2cf096de4ce493.3.bundle.js.map