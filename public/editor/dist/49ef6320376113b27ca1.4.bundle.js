this["webpackChunkwebapp"]([4],{

/***/ "./src/FeatureLock/VRClassSystem.ts":
/*!******************************************!*\
  !*** ./src/FeatureLock/VRClassSystem.ts ***!
  \******************************************/
/*! exports provided: classSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classSystem", function() { return classSystem; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../platformInfo */ "./src/platformInfo.ts");
/* harmony import */ var _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../StorageInterface/VEXcodeStorage */ "./src/StorageInterface/VEXcodeStorage.ts");
/* harmony import */ var _Licenses__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Licenses */ "./src/FeatureLock/Licenses.ts");
/* harmony import */ var _GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GA/SwitchEvents */ "./src/GA/SwitchEvents.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("VRClassSystem");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();







//#region types

//#endregion types

//#region constants
var CLASS_CODE_KEY = "vrClassKey";
var CLASS_NAME_KEY = "vrClassName";
var CLASS_METHOD_KEY = "vrClassShareMethod";
var CLASS_LEVEL_KEY = "vrLevel";
var CLASS_EXPIRES_KEY = "vrClassExpires";
var LAST_CHECK_KEY = "vrLastCodeCheck";
var LAST_ATTEMPT_KEY = "vrLastCheckAttempt";
var STUDENT_ID_KEY = "vrStudentID";
var CHECK_URL = "".concat("localhost:8000", "/api/exercise/access/check?code=");
var ALIVE_URL = "".concat("localhost:8000", "/api/ping");

/** max age of a server check cache in days */
var CHECK_AGE = _platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsNWJS"] ? 30 : 7;
//#endregion constants

//#region error definitions
var ErrorDashboardServerAccess = /*#__PURE__*/function (_Error) {
  _inherits(ErrorDashboardServerAccess, _Error);
  var _super = _createSuper(ErrorDashboardServerAccess);
  function ErrorDashboardServerAccess(message) {
    var _this;
    _classCallCheck(this, ErrorDashboardServerAccess);
    _this = _super.call(this, message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof ErrorDashboardServerAccess ? this.constructor : void 0).prototype); // restore prototype chain
    _this.name = "ErrorDashboardServerAccess";
    return _this;
  }
  return _createClass(ErrorDashboardServerAccess);
}( /*#__PURE__*/_wrapNativeSuper(Error)); //#endregion error definitions
var VRClassSystem = /*#__PURE__*/function () {
  function VRClassSystem() {
    _classCallCheck(this, VRClassSystem);
    _defineProperty(this, "classCode_", null);
    _defineProperty(this, "className_", null);
    _defineProperty(this, "deliverMethod_", null);
    _defineProperty(this, "level_", "Standard");
    _defineProperty(this, "expires_", null);
    _defineProperty(this, "lastCheck_", new Date(Date.now() - CHECK_AGE * 86400000 - 1000));
    _defineProperty(this, "studentID_", null);
    _defineProperty(this, "isRefreshing", false);
    _defineProperty(this, "refreshListners", []);
    _defineProperty(this, "readlockout", false);
    log.debug("creating VRClassSystem instance");
    this.readStoredClassData();
    log.debug("done loading stored class data");
    _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]("FeatureLock.LevelChange");
    _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]("FeatureLock.DataUpdate");
    this.recheckServer().then(function () {
      log.debug("done checking server");
    });
  }

  /**
   * checks to see if we can talk to the api server.
   * @returns true if we can talk to the server.
   */
  _createClass(VRClassSystem, [{
    key: "checkServerCommunication",
    value: function () {
      var _checkServerCommunication = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var url, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = ALIVE_URL;
              log.debug("alive fetch", url);
              _context.prev = 2;
              _context.next = 5;
              return fetch(url);
            case 5:
              response = _context.sent;
              return _context.abrupt("return", response.ok);
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              log.debug(_context.t0);
              return _context.abrupt("return", false);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 9]]);
      }));
      function checkServerCommunication() {
        return _checkServerCommunication.apply(this, arguments);
      }
      return checkServerCommunication;
    }()
    /**
     * call this to login to an account. if all ready logged in, if the code matches,
     * nothing will happen. otherwise, the exsisting login will be logged out and we
     * will try the new one
     * @param code the class code from the dashboard to log in with
     * @returns Promise that resolves true if we were able to login
     */
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(code, studentID) {
        var result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.classCode_) {
                _context2.next = 4;
                break;
              }
              if (!(this.classCode_ === code)) {
                _context2.next = 4;
                break;
              }
              log.debug("trying to login with the same code we are logged in with...");
              return _context2.abrupt("return");
            case 4:
              _context2.prev = 4;
              _context2.next = 7;
              return this.checkServerCode(code);
            case 7:
              result = _context2.sent;
              this.storeClassData(result, studentID);
              Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("login");
              return _context2.abrupt("return", true);
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](4);
              if (_context2.t0 instanceof ErrorDashboardServerAccess) {
                log.warn("found server access error");
              } else {
                log.error(_context2.t0);
              }
              this.storeEmptyData();
              return _context2.abrupt("return", false);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[4, 13]]);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * will log out of the current class. will do nothing if not already logged in
     */
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.storeEmptyData();
              Object(_GA_SwitchEvents__WEBPACK_IMPORTED_MODULE_5__["sendSwitchEvent"])("logout");
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * will check the data on the server again to refresh the cahced data.
     * @param forceUpdate if true, will force the cache data to get updated even if the cache data is still valid
     */
  }, {
    key: "recheckServer",
    value: function () {
      var _recheckServer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this2 = this;
        var forceUpdate,
          result,
          _iterator,
          _step,
          listener,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              forceUpdate = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : false;
              log.debug("checking code", this.classCode_);
              if (!this.classCode_) {
                _context4.next = 22;
                break;
              }
              if (!this.isRefreshing) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                _this2.refreshListners.push(resolve);
              }));
            case 5:
              if (!(!forceUpdate && !this.shouldRecheck())) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return");
            case 7:
              _context4.prev = 7;
              this.isRefreshing = true;
              _context4.next = 11;
              return this.checkServerCode(this.classCode_);
            case 11:
              result = _context4.sent;
              this.storeClassData(result);
              _context4.next = 19;
              break;
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](7);
              if (_context4.t0 instanceof ErrorDashboardServerAccess) {
                log.warn("found server access error");
                // TODO: trigger GES event to let the user know that we could not verify the code
              } else {
                log.error(_context4.t0);
              }
              // if we are not in offline build store empty data to remove the license
              if (!_platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsNWJS"]) {
                this.storeEmptyData();
              }
            case 19:
              this.isRefreshing = false;
              _iterator = _createForOfIteratorHelper(this.refreshListners);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  listener = _step.value;
                  listener();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            case 22:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[7, 15]]);
      }));
      function recheckServer() {
        return _recheckServer.apply(this, arguments);
      }
      return recheckServer;
    }()
    /**
     * returns the current class name
     */
  }, {
    key: "getClassName",
    value: function getClassName() {
      return this.className_;
    }

    /**
     * get the current license level. this will also trigger a refresh of the cache data if the data is no longer valid.
     * will return the current value right away even if the data needs to be refreshed
     * @returns the current level
     */
  }, {
    key: "getLevelWithRefresh",
    value: function getLevelWithRefresh() {
      if (!this.classCode_) {
        return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard;
      }
      if (!this.isCacheDataValid() || !this.isLicenseValid()) {
        try {
          this.recheckServer();
        } catch (err) {
          log.warn("error while trying to recheck server with no wait");
          log.warn(err);
        }
      }
      if (this.isLicenseValid()) {
        return this.levelStringToEnum(this.level_);
      }
      return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard;
    }

    /** 
     * returns the current license level, but will wait to make sure the value is valid before it is returned.
     * @returns the current level after refresh if needed
     */
  }, {
    key: "getLevelAfterRefresh",
    value: function () {
      var _getLevelAfterRefresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (this.classCode_) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return", _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard);
            case 2:
              if (!(!this.isCacheDataValid() || !this.isLicenseValid())) {
                _context5.next = 12;
                break;
              }
              _context5.prev = 3;
              _context5.next = 6;
              return this.recheckServer();
            case 6:
              _context5.next = 12;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](3);
              log.warn("error while trying to recheck server");
              log.warn(_context5.t0);
            case 12:
              if (!this.isLicenseValid()) {
                _context5.next = 14;
                break;
              }
              return _context5.abrupt("return", this.levelStringToEnum(this.level_));
            case 14:
              return _context5.abrupt("return", _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard);
            case 15:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[3, 8]]);
      }));
      function getLevelAfterRefresh() {
        return _getLevelAfterRefresh.apply(this, arguments);
      }
      return getLevelAfterRefresh;
    }()
    /** 
     * returns the current license level, will never refresh the data
     * @returns the current level
     */
  }, {
    key: "getLevelNoRefresh",
    value: function getLevelNoRefresh() {
      if (!this.classCode_) {
        return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard;
      }
      if (this.isLicenseValid()) {
        return this.levelStringToEnum(this.level_);
      }
      return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard;
    }

    /**
     * returns the current class code. can also be used to see if connected to a class.
     * @returns the class code as a string or null if not connected to a class
     */
  }, {
    key: "getClassCode",
    value: function getClassCode() {
      return this.classCode_;
    }
  }, {
    key: "getStudentID",
    value: function getStudentID() {
      return this.studentID_;
    }
  }, {
    key: "shouldUseStudentID",
    get: function get() {
      return !!false;
    }
  }, {
    key: "getDeliveryInfo",
    value: function () {
      var _getDeliveryInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var result, _result, _result2, _result3, _result4;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              result = null;
              _context6.prev = 1;
              _context6.next = 4;
              return this.checkServerCode(this.classCode_);
            case 4:
              result = _context6.sent;
              this.storeClassData(result);
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);
              log.warn("unable to get current tokens from the server");
            case 11:
              if (!(!this.isLicenseValid() || this.deliverMethod_ === "Local Download")) {
                _context6.next = 13;
                break;
              }
              return _context6.abrupt("return", {
                deliveryMethod: "Local Download"
              });
            case 13:
              if (!(this.deliverMethod_ === "Dropbox")) {
                _context6.next = 17;
                break;
              }
              return _context6.abrupt("return", {
                deliveryMethod: "Dropbox",
                accessToken: (_result = result) === null || _result === void 0 ? void 0 : _result.dropbox,
                destination: (_result2 = result) === null || _result2 === void 0 ? void 0 : _result2.dropboxPath
              });
            case 17:
              if (!(this.deliverMethod_ === "Google Drive")) {
                _context6.next = 21;
                break;
              }
              return _context6.abrupt("return", {
                deliveryMethod: "Google Drive",
                accessToken: (_result3 = result) === null || _result3 === void 0 ? void 0 : _result3.google,
                destination: (_result4 = result) === null || _result4 === void 0 ? void 0 : _result4.googleFolderParent
              });
            case 21:
              if (!(this.deliverMethod_ === "email")) {
                _context6.next = 23;
                break;
              }
              return _context6.abrupt("return", {
                deliveryMethod: "email"
              });
            case 23:
              log.warn("unknown delivery method...", this.deliverMethod_);
              return _context6.abrupt("return", {
                deliveryMethod: "Local Download"
              });
            case 25:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[1, 8]]);
      }));
      function getDeliveryInfo() {
        return _getDeliveryInfo.apply(this, arguments);
      }
      return getDeliveryInfo;
    }()
    /**
     * checks to see if the cached delivery method is local download
     * @returns true if not in a class or if the delivery method is fro local download
     */
  }, {
    key: "isShareLocal",
    value: function isShareLocal() {
      return !this.isLicenseValid() || this.deliverMethod_ === "Local Download";
    }

    /**
     * returns the number of days before the cached data will expire
     */
  }, {
    key: "daysToCacheExpire",
    value: function daysToCacheExpire() {
      return this.daysToDate(this.lastCheck_);
    }
  }, {
    key: "daysToDate",
    value: function daysToDate(date) {
      if (!date) {
        return null;
      }
      var now = Date.now();
      var expire = date.getTime() + CHECK_AGE * 86400000;
      var seconds = Math.floor((expire - now) / 1000);
      var days = seconds / 86400; // 86400 seconds per day
      return days;
    }

    /**
     * will check to see if the cached data is still valid
     * @returns true if the data is valid
     */
  }, {
    key: "isCacheDataValid",
    value: function isCacheDataValid() {
      var daysToExpire = this.daysToCacheExpire();
      return daysToExpire && daysToExpire > 0;
    }

    /**
     * will check to see if the expire date has yet to pass
     * @returns true if the license is still valid
     */
  }, {
    key: "isLicenseValid",
    value: function isLicenseValid() {
      var now = new Date();
      return this.expires_ && this.expires_ > now;
    }
  }, {
    key: "shouldRecheck",
    value: function shouldRecheck() {
      if (this.readlockout) {
        return false;
      }
      var cacheInvalid = !this.isCacheDataValid();
      var lastAttempt = this.getLastCheckAttempt();
      if (!lastAttempt) {
        return true;
      }
      var now = Date.now();
      var seconds = Math.floor((now - lastAttempt.getTime()) / 1000);
      return cacheInvalid || seconds > 80000; // will check after about 22.2 hours
    }

    /** 
     * this is a helper to make it easy to store a blank standard account info in the storage
     */
  }, {
    key: "storeEmptyData",
    value: function storeEmptyData() {
      this.storeClassData({
        classCode: null,
        className: null,
        deliverMethod: null,
        expires: null,
        licenseLevel: "Standard"
      });
    }

    /**
     * fetch current data from the dashboard server for the specified code
     * @param code the code to check the status of on the server
     * @returns the data returned from the server
     * @throws ErrorDashboardServerAccess if unable to access the server
     */
  }, {
    key: "checkServerCode",
    value: function () {
      var _checkServerCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(code) {
        var _json$data$dropbox, _json$data$google;
        var url, response, json, license, result;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              url = CHECK_URL + code; // we want to set the last attempt point on each try
              this.setLastCheckAttempt();
              log.debug("fetch", url);
              // fetch the data from the server
              _context7.next = 5;
              return fetch(url);
            case 5:
              response = _context7.sent;
              if (response.ok) {
                _context7.next = 9;
                break;
              }
              log.error("unable to access", url);
              throw new ErrorDashboardServerAccess();
            case 9:
              _context7.next = 11;
              return response.json();
            case 11:
              json = _context7.sent;
              log.debug("json:", json);
              license = this.parseLicenses(json.data.licenses);
              result = {
                classCode: code,
                className: json.data["class"].class_name,
                deliverMethod: json.data["class"].delivery_method,
                expires: license ? license.expires_at : new Date(),
                licenseLevel: license ? license.level : "Standard",
                // TODO: figure this out
                dropbox: (_json$data$dropbox = json.data.dropbox) === null || _json$data$dropbox === void 0 ? void 0 : _json$data$dropbox.access_token,
                dropboxPath: json.data["class"].path,
                google: (_json$data$google = json.data.google) === null || _json$data$google === void 0 ? void 0 : _json$data$google.access_token,
                googleFolderParent: json.data["class"].google_folder_ref
              };
              log.debug("output:", result);
              return _context7.abrupt("return", result);
            case 17:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function checkServerCode(_x3) {
        return _checkServerCode.apply(this, arguments);
      }
      return checkServerCode;
    }()
  }, {
    key: "mapLicenseToLevel",
    value: function mapLicenseToLevel(platfrom) {
      switch (platfrom) {
        case "VEXcode VR Premium":
        case "Staff":
          return "Advanced";
        case "VEXcode VR Enhanced":
          return "Enhanced";
        default:
          return "Standard";
      }
    }
  }, {
    key: "parseLicenses",
    value: function parseLicenses(data) {
      log.debug("parseLicenses", data);
      // we will use this a lot...
      var now = new Date();
      // the timestamps from the 

      // we need a helper since the timestamps are from login.vex.com and
      // do not have timezone info...
      var parseLicenseDate = function parseLicenseDate(timestamp) {
        log.debug("parseLicenseDate:", timestamp);
        // hard coded to CDT time for now
        return new Date(timestamp.replace(" ", "T") + "Z");
      };
      var output = null;
      var _iterator2 = _createForOfIteratorHelper(data),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var license = _step2.value;
          log.debug("checking license:", license);
          // check to see if the license is valid
          var expires = parseLicenseDate(license.expires_at);
          var activates = parseLicenseDate(license.activated_at);
          if (now < activates || expires < now) {
            log.debug("license is invalid");
            continue;
          }

          // if (license.platform === "Staff") {
          //   continue;
          // }

          var level = this.mapLicenseToLevel(license.platform);
          var tmp = {
            level: level,
            expires_at: expires
          };
          if (license.platform === "VEXcode VR Premium") {
            return tmp;
          }
          output = tmp;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return output;
    }
  }, {
    key: "setLastCheckAttempt",
    value: function setLastCheckAttempt() {
      var nowString = new Date().toUTCString();
      _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(LAST_ATTEMPT_KEY, nowString);
    }
  }, {
    key: "getLastCheckAttempt",
    value: function getLastCheckAttempt() {
      var storedValue = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(LAST_ATTEMPT_KEY);
      if (!storedValue) {
        return null;
      }
      return new Date(storedValue);
    }

    /**
     * will store the provided data in the storage system so we can pull it up later
     * @param data the data to store
     */
  }, {
    key: "storeClassData",
    value: function storeClassData(data, studentID) {
      log.debug("storeClassData", data);
      if (data.classCode) {
        _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(CLASS_CODE_KEY, data.classCode);
      } else {
        _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].clearKey(CLASS_CODE_KEY);
      }
      var changed = this.classCode_ !== data.classCode;
      this.classCode_ = data.classCode;
      _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(CLASS_NAME_KEY, data.className);
      changed = changed || this.className_ !== data.className;
      this.className_ = data.className;
      _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(CLASS_METHOD_KEY, data.deliverMethod);
      changed = changed || this.deliverMethod_ !== data.deliverMethod;
      this.deliverMethod_ = data.deliverMethod;
      _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(CLASS_LEVEL_KEY, data.licenseLevel);
      var levelChanged = this.level_ !== data.licenseLevel;
      changed = changed || levelChanged;
      this.level_ = data.licenseLevel;
      _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(CLASS_EXPIRES_KEY, data.expires ? data.expires.toUTCString() : null);
      changed = changed || this.expires_ !== data.expires;
      this.expires_ = data.expires;
      this.lastCheck_ = new Date();
      _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(LAST_CHECK_KEY, this.lastCheck_.toUTCString());
      if (studentID) {
        _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].writeKey(STUDENT_ID_KEY, studentID);
        this.studentID_ = studentID;
      } else {
        _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].clearKey(STUDENT_ID_KEY);
      }
      if (levelChanged) {
        log.debug("license level changed", this.level_);
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]("FeatureLock.LevelChange");
      }
      if (changed) {
        _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_1__["fireEvent"]("FeatureLock.DataUpdate");
      }
    }
  }, {
    key: "readStoredClassData",
    value:
    /** 
     * will pull all the stored data. however, this will reset to loggout like (minus code) data if the data is too old
     */
    function readStoredClassData() {
      log.debug("readStoredClassData");
      var checkLimit = new Date(Date.now() - CHECK_AGE);

      // read data in storage
      if (!this.readlockout) {
        try {
          var lastCheck = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(LAST_CHECK_KEY);
          var classCodeRaw = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(CLASS_CODE_KEY);
          var classCode = classCodeRaw && classCodeRaw !== "null" ? classCodeRaw : null;
          var className = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(CLASS_NAME_KEY);
          var deliverMethod = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(CLASS_METHOD_KEY);
          var licenseLevel = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(CLASS_LEVEL_KEY);
          var expiresRaw = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(CLASS_EXPIRES_KEY);
          log.debug("lastCheck:", lastCheck);
          log.debug("classCodeRaw:", classCodeRaw);
          log.debug("classCode:", classCode);
          log.debug("className:", className);
          log.debug("deliverMethod:", deliverMethod);
          log.debug("licenseLevel:", licenseLevel);
          log.debug("expiresRaw:", expiresRaw);

          // we can always set the code
          this.classCode_ = classCode;

          // everything else depends on if the data is still valid...
          var daysToExpire = lastCheck && this.daysToDate(new Date(lastCheck));
          if (!lastCheck || daysToExpire <= 0 || !classCode) {
            log.debug("lastCheck:", lastCheck, checkLimit);
            // assume the data is not valid
            this.className_ = null;
            this.deliverMethod_ = null;
            this.level_ = "Standard";
            this.expires_ = null;
            this.studentID_ = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(STUDENT_ID_KEY);
          } else {
            this.className_ = className;
            this.deliverMethod_ = deliverMethod;
            this.level_ = licenseLevel;
            this.expires_ = expiresRaw ? new Date(expiresRaw) : null;
            this.lastCheck_ = new Date(lastCheck);
            this.studentID_ = _StorageInterface_VEXcodeStorage__WEBPACK_IMPORTED_MODULE_3__["storageInterface"].readKey(STUDENT_ID_KEY);
          }
          log.debug("post read cached data:", this);
        } catch (err) {
          this.readlockout = true;
          this.className_ = null;
          this.deliverMethod_ = null;
          this.level_ = "Standard";
          this.expires_ = null;
          return;
        }
      }
    }

    /** 
     * used to convert leve string to license level enum 
     * @param level the string to convert
     * @returns the enum level. defaults to standard if there is no match
     */
  }, {
    key: "levelStringToEnum",
    value: function levelStringToEnum(level) {
      switch (level) {
        case "Advanced":
          return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Advanced;
        case "Enhanced":
          return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Enhanced;
        default:
          return _Licenses__WEBPACK_IMPORTED_MODULE_4__["FeatureLockLicense"].Standard;
      }
    }
  }, {
    key: "getClassInfo",
    value: function getClassInfo() {
      return {
        classCode: this.classCode_,
        className: this.className_,
        studentID: this.shouldUseStudentID ? this.studentID_ : null
      };
    }
  }]);
  return VRClassSystem;
}();
var classSystem = new VRClassSystem();


/***/ }),

/***/ "./src/StorageInterface/VEXcodeStorage.ts":
/*!************************************************!*\
  !*** ./src/StorageInterface/VEXcodeStorage.ts ***!
  \************************************************/
/*! exports provided: storageInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storageInterface", function() { return storageInterface; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("VEXcodeStorage");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
var VEXcodeLocalStorage = /*#__PURE__*/function () {
  function VEXcodeLocalStorage() {
    _classCallCheck(this, VEXcodeLocalStorage);
    if (this.storageAvailable()) {
      this.localStorage = window.localStorage;
    } else {
      this.localStorage = null;
    }
  }

  // Storage may be made unavailible if they are in private/incognito.
  // Local storage may also be disabled with policy on school computers, potentially.
  _createClass(VEXcodeLocalStorage, [{
    key: "storageAvailable",
    value: function storageAvailable() {
      var testString = "STORAGE_TEST";
      try {
        window.localStorage.setItem(testString, testString);
        window.localStorage.removeItem(testString);
        return true;
      } catch (e) {
        log.warn("No local storage available");
        return false;
      }
    }
  }, {
    key: "readKey",
    value: function readKey(key) {
      if (localStorage) {
        return localStorage.getItem(key);
      } else {
        return null;
      }
    }
  }, {
    key: "writeKey",
    value: function writeKey(key, value) {
      if (localStorage) {
        localStorage.setItem(key, value);
      }
    }
  }, {
    key: "clearKey",
    value: function clearKey(key) {
      if (localStorage) {
        localStorage.removeItem(key);
      }
    }
  }, {
    key: "clearAllKeys",
    value: function clearAllKeys() {
      if (localStorage) {
        localStorage.clear();
      }
    }
  }]);
  return VEXcodeLocalStorage;
}(); // The normal local storage interface can't be used for chromeOS
var storageInterface = new VEXcodeLocalStorage();


/***/ })

});
//# sourceMappingURL=49ef6320376113b27ca1.4.bundle.js.map