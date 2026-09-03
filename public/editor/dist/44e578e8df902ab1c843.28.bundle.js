(window["webpackJsonpwebapp"] = window["webpackJsonpwebapp"] || []).push([[28],{

/***/ "./src/HardwareInterface/IQEXPV5/EXP/EXPWebSerial.ts":
/*!***********************************************************!*\
  !*** ./src/HardwareInterface/IQEXPV5/EXP/EXPWebSerial.ts ***!
  \***********************************************************/
/*! exports provided: EXPWebSerial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPWebSerial", function() { return EXPWebSerial; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/HWEnums */ "./src/HardwareInterface/types/HWEnums.ts");
/* harmony import */ var _EXPInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EXPInterface */ "./src/HardwareInterface/IQEXPV5/EXP/EXPInterface.ts");
/* harmony import */ var _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rm-vca/vexcode-webserial */ "./node_modules/@rm-vca/vexcode-webserial/dist/index.js");
/* harmony import */ var _VexVersion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../VexVersion */ "./src/HardwareInterface/VexVersion.ts");
/* harmony import */ var _widget_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../widget/Modal */ "./src/widget/Modal.tsx");
/* harmony import */ var _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../GlobalEventSystem */ "./src/GlobalEventSystem.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../dispatcher */ "./src/dispatcher.ts");
/* harmony import */ var _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @rm-vca/vexcode-webserial/dist/errors */ "./node_modules/@rm-vca/vexcode-webserial/dist/errors.js");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../helpers */ "./src/helpers.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("EXPWebSerial");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering

// interface types/enums

// TODO: cleanup imports











var EXPWebSerial = /*#__PURE__*/function (_EXPInterface) {
  _inherits(EXPWebSerial, _EXPInterface);
  var _super = _createSuper(EXPWebSerial);
  // TODO: use actual EXP interface
  // tslint:disable-next-line: variable-name

  function EXPWebSerial() {
    var _this;
    _classCallCheck(this, EXPWebSerial);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "_serial", new _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexEXPWebSerial"]());
    _defineProperty(_assertThisInitialized(_this), "lastSerialState", _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"].Disconnected);
    _defineProperty(_assertThisInitialized(_this), "onConnectedToInvalidPort", function () {
      log.warn("onConnectedToInvalidPort");
      var message = _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Incorrect WebSerial Port", {
        platform: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("EXP")
      });
      _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].showWebSerialPrompt(message, null, _this.onControlButtonClick);
    });
    _defineProperty(_assertThisInitialized(_this), "lastUserPortState", _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"].Disconnected);
    _this.onSerialStateChange = _this.onSerialStateChange.bind(_assertThisInitialized(_this));
    _this._serial.on("connectionStateChange", _this.onSerialStateChange);
    _this.onSerialStateChangeUserPort = _this.onSerialStateChangeUserPort.bind(_assertThisInitialized(_this));
    _this._serial.on("connectionStateChangeUserPort", _this.onSerialStateChangeUserPort);
    _this.onConnectedToInvalidPort = _this.onConnectedToInvalidPort.bind(_assertThisInitialized(_this));
    _this._serial.on("connectedToInvalidPort", _this.onConnectedToInvalidPort);
    _this.onControlButtonClick = _this.onControlButtonClick.bind(_assertThisInitialized(_this));
    _this.onInterfaceDeviceInfoupdated = _this.onInterfaceDeviceInfoupdated.bind(_assertThisInitialized(_this));
    _this._serial.on("deviceInfoUpdated", _this.onInterfaceDeviceInfoupdated);
    _this._serial.on("receivedUserData", function (data) {
      log.debug("print to terminal:", data);
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.TerminalDataUpdate", data);
    });
    return _this;
  }
  _createClass(EXPWebSerial, [{
    key: "onSerialStateChange",
    value: function onSerialStateChange(state) {
      log.debug("onSerialStateChange - new state:", _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"][state]);
      if (this.lastSerialState === state) {
        return;
      }
      this.lastSerialState = state;
      var newState = this.getConnectionState();
      this.fireEvent("connectionStateChange", newState);
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.ConnectionStateChange", newState);
      if (state === _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"].Connected) {
        this.onBrainConnected();
      } else if (state === _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"].Disconnected) {
        this.onBrainDisconnected();
      }
    }
  }, {
    key: "onInterfaceDeviceInfoupdated",
    value: function onInterfaceDeviceInfoupdated(data) {
      log.debug("onInterfaceDeviceInfoupdated");
      var newBrainInfo = this.getBrainInfo();
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.BrainInfoUpdated", newBrainInfo);
    }
  }, {
    key: "onControlButtonClick",
    value: function () {
      var _onControlButtonClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.openConnection();
            case 2:
              return _context.abrupt("return", _context.sent);
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function onControlButtonClick() {
        return _onControlButtonClick.apply(this, arguments);
      }
      return onControlButtonClick;
    }() //#region connection control
  }, {
    key: "openConnection",
    value: function () {
      var _openConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this._serial.isSupported) {
                _context2.next = 3;
                break;
              }
              log.error("WebSerial is not supported on this system");
              return _context2.abrupt("return");
            case 3:
              return _context2.abrupt("return", this._serial.openConnection());
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function openConnection() {
        return _openConnection.apply(this, arguments);
      }
      return openConnection;
    }()
  }, {
    key: "closeConnection",
    value: function () {
      var _closeConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (this._serial.isSupported) {
                _context3.next = 3;
                break;
              }
              log.error("WebSerial is not supported on this system");
              return _context3.abrupt("return");
            case 3:
              _context3.next = 5;
              return this._serial.closeConnection();
            case 5:
              return _context3.abrupt("return", true);
            case 6:
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
    key: "getConnectionState",
    value: function getConnectionState() {
      var state = this._serial.connectionState;
      var isConnected = state === _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"].Connected;
      return isConnected ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
    }
    //#endregion connection control

    //#region brain info
  }, {
    key: "getBrainInfo",
    value: function getBrainInfo() {
      var tmpInfo = this._serial.getBrainInfo();
      var version = tmpInfo.brainVersion ? _VexVersion__WEBPACK_IMPORTED_MODULE_4__["VexVersion"].fromString(tmpInfo.brainVersion.toInternalString()) : _VexVersion__WEBPACK_IMPORTED_MODULE_4__["VexVersion"].fromString("0.0.0");
      var isController = tmpInfo.deviceType === "EXPController";
      var deviceType = isController ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXEXP_Controller : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexDeviceType"].VEXEXP;
      var info = {
        serial: tmpInfo.serial,
        version: version,
        versionFW: version,
        name: tmpInfo.name,
        team: tmpInfo.team,
        deviceType: deviceType,
        connectionMethod: isController ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].RC_Radio : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["VexConnectionMethod"].USB,
        brainConnected: !isController,
        // TODO: change this with the controller connections

        needsFWUpdate: tmpInfo.updateNeededBrain ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate,
        canUpdate: this.canUpdateFirmware(),
        battery: tmpInfo.battery,
        batteryLow: false
      };
      if (isController) {
        info.versionCTRL = {
          atmel: tmpInfo.atmelVersion,
          radio: tmpInfo.radioVersion
        };
        info.needsCTRLUpdate = tmpInfo.updateNeededController ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].NeedsUpdate : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["UpdateNeededOptions"].UpToDate;
      }
      return info;
    }
  }, {
    key: "getTargetBrainInfo",
    value: function getTargetBrainInfo() {
      throw new Error("Method not implemented.");
    }
  }, {
    key: "setBrainName",
    value: function () {
      var _setBrainName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(name) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._serial.setBrainName(name);
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function setBrainName(_x) {
        return _setBrainName.apply(this, arguments);
      }
      return setBrainName;
    }()
  }, {
    key: "setTeamNumber",
    value: function () {
      var _setTeamNumber = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(team) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this._serial.setBrainTeamNumber(team);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
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
      var _play = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(slot) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", this._serial.play(slot));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function play(_x3) {
        return _play.apply(this, arguments);
      }
      return play;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this._serial.stop();
            case 2:
              return _context7.abrupt("return", true);
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
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
        var isBlocks, isCPP, icon, ide, programInfo;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              log.info("downloadProgram", slot, projectName, language);
              isBlocks = _AppInfo__WEBPACK_IMPORTED_MODULE_7__["appState"].getAppState().mode === "Blocks";
              isCPP = language === "cpp";
              icon = isBlocks ? _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodeBlocks : isCPP ? _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodeCPP : _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXcodeIcons"].VEXcodePython;
              ide = isBlocks ? "Blocks" : isCPP ? "C++" : "Python";
              programInfo = {
                slot: slot,
                name: projectName,
                description: "",
                icon: icon,
                ide: ide,
                ports: [],
                triports: [],
                controller1: null,
                language: language
              };
              return _context8.abrupt("return", this._serial.downloadProgram(data, programInfo, function (downloadData) {
                var progress = downloadData.progress,
                  state = downloadData.state;
                progressCallback({
                  progress: progress,
                  step: state
                });
              }));
            case 7:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function downloadProgram(_x4, _x5, _x6, _x7, _x8) {
        return _downloadProgram.apply(this, arguments);
      }
      return downloadProgram;
    }() //#endregion project downloads
    //#region compilers
    //#endregion compilers
    //#region firmware
  }, {
    key: "canUpdateFirmware",
    value: function canUpdateFirmware() {
      return true;
    }
  }, {
    key: "updateFirmware",
    value: function () {
      var _updateFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(progress) {
        var updateProgressEvent, requestConnectEvent, continueReconnectResolver, reconnectCallback, progressHandler, reconnectHandler, msg1Key, msg2Key, platform;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              log.debug("starting brain firmware update...");
              updateProgressEvent = new _dispatcher__WEBPACK_IMPORTED_MODULE_9__["DispatcherEvent"]();
              requestConnectEvent = new _dispatcher__WEBPACK_IMPORTED_MODULE_9__["DispatcherEvent"]();
              continueReconnectResolver = null;
              reconnectCallback = function reconnectCallback(continueUpdate) {
                if (continueReconnectResolver) {
                  continueReconnectResolver(continueUpdate);
                  continueReconnectResolver = null;
                } else {
                  log.warn("should not be here if the resolver was not set");
                  requestConnectEvent.fire({
                    isFirstConnect: false,
                    isDfu: false
                  });
                }
              };
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].showWebBrainUpdateProgress(updateProgressEvent, requestConnectEvent, reconnectCallback);
              progressHandler = function progressHandler(state, percent, msg) {
                log.debug("progressHandler:", percent, _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXBrainUpdateStates"][state], msg);
                updateProgressEvent.fire({
                  state: state,
                  percent: percent,
                  msg: msg
                });
              };
              reconnectHandler = function reconnectHandler(isFirstConnect, isDfu) {
                return new Promise(function (resolve, reject) {
                  continueReconnectResolver = resolve;
                  requestConnectEvent.fire({
                    isFirstConnect: isFirstConnect,
                    isDfu: isDfu
                  });
                });
              };
              _context9.next = 11;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_12__["waitms"])(5);
            case 11:
              _context9.next = 13;
              return this._serial.updateFirmware(progressHandler, reconnectHandler);
            case 13:
              return _context9.abrupt("return", true);
            case 16:
              _context9.prev = 16;
              _context9.t0 = _context9["catch"](0);
              log.error(_context9.t0);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].close();
              msg1Key = "WebSerial Update Failed - unknown error";
              msg2Key = "WebSerial Update Failed - retry message";
              if (_context9.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["WebSerialUnsupportedError"]) {
                msg1Key = "WebSerial Update Failed - webserial not supported";
              } else if (_context9.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["NoBrainConnectedError"]) {
                msg1Key = "WebSerial Update Failed - no device";
              } else if (_context9.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["OperationNotSupportedError"]) {
                msg1Key = "WebSerial Update Failed - not supported";
              } else if (_context9.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["ErrorUpdatingBrainGolden"]) {
                msg1Key = "WebSerial Update Failed - recovery update failed";
              } else if (_context9.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["ErrorUpdatingBrainBoot"]) {
                msg1Key = "WebSerial Update Failed - main update failed";
              } else if (_context9.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["ErrorUpdatingBrainAssets"]) {
                msg1Key = "WebSerial Update Failed - asset update failed";
              }
              platform = _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t(_targetPlatform__WEBPACK_IMPORTED_MODULE_11__["currentTargetName"]);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].showWebSerialUpdateError(_i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t(msg1Key, {
                platform: platform
              }), msg2Key ? _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t(msg2Key, {
                platform: platform
              }) : null, "https://kb.vex.com/hc/en-us/articles/4419503223700-Troubleshooting-Connecting-to-Web-based-VEXcode-EXP");
              return _context9.abrupt("return", false);
            case 26:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 16]]);
      }));
      function updateFirmware(_x9) {
        return _updateFirmware.apply(this, arguments);
      }
      return updateFirmware;
    }()
  }, {
    key: "updateControllerFirmware",
    value: function () {
      var _updateControllerFirmware = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(progress) {
        var isDFU,
          updateState,
          _updateProgressEvent,
          _requestConnectEvent,
          _continueReconnectResolver,
          reconnectCallback,
          progressHandler,
          reconnectHandler,
          msg1Key,
          msg2Key,
          platform,
          _args10 = arguments;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              isDFU = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : false;
              updateState = null;
              _context10.prev = 2;
              log.debug("starting controller firmware update...");
              _updateProgressEvent = new _dispatcher__WEBPACK_IMPORTED_MODULE_9__["DispatcherEvent"]();
              _requestConnectEvent = new _dispatcher__WEBPACK_IMPORTED_MODULE_9__["DispatcherEvent"]();
              _continueReconnectResolver = null;
              reconnectCallback = function reconnectCallback(continueUpdate) {
                if (_continueReconnectResolver) {
                  _continueReconnectResolver(continueUpdate);
                  _continueReconnectResolver = null;
                } else {
                  log.warn("whould not be here if the resolver was not set");
                  _requestConnectEvent.fire({
                    isFirstConnect: false,
                    isDfu: false
                  });
                }
              };
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].showWebControllerUpdateProgress(_updateProgressEvent, _requestConnectEvent, reconnectCallback);
              progressHandler = function progressHandler(state, percent, msg) {
                log.debug("progressHandler:", percent, _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXControllerUpdateStates"][state], msg);
                _updateProgressEvent.fire({
                  state: state,
                  percent: percent,
                  msg: msg
                });
                updateState = state;
              };
              reconnectHandler = function reconnectHandler(isFirstConnect, isDfu) {
                return new Promise(function (resolve, reject) {
                  _continueReconnectResolver = resolve;
                  _requestConnectEvent.fire({
                    isFirstConnect: isFirstConnect,
                    isDfu: isDfu
                  });
                });
              }; // TODO: figure out if we need to force the update each time
              _context10.next = 13;
              return this._serial.controllerUpdate(progressHandler, reconnectHandler, isDFU);
            case 13:
              return _context10.abrupt("return", true);
            case 16:
              _context10.prev = 16;
              _context10.t0 = _context10["catch"](2);
              log.error(_context10.t0);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].close();
              msg1Key = "WebSerial Update Failed - unknown error";
              msg2Key = "WebSerial Update Failed - retry message";
              if (_context10.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["WebSerialUnsupportedError"]) {
                msg1Key = "WebSerial Update Failed - webserial not supported";
              } else if (_context10.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["NoControllerConnectedError"]) {
                msg1Key = "WebSerial Update Failed - no device";
              } else if (_context10.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["OperationNotSupportedError"]) {
                msg1Key = "WebSerial Update Failed - not supported";
              } else if (_context10.t0 instanceof _rm_vca_vexcode_webserial_dist_errors__WEBPACK_IMPORTED_MODULE_10__["UpdateCanceled"]) {
                msg1Key = "WebSerial Update Failed - user canceled reconnect";
              } else {
                if (updateState === _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXControllerUpdateStates"].UpdatingRadio) {
                  msg1Key = "WebSerial Update Failed - radio update failed";
                } else if (updateState === _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VEXControllerUpdateStates"].UpdatingAtmel) {
                  msg1Key = "WebSerial Update Failed - atmel update failed";
                }
              }
              platform = _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t(_targetPlatform__WEBPACK_IMPORTED_MODULE_11__["currentTargetName"]);
              _widget_Modal__WEBPACK_IMPORTED_MODULE_5__["MODALCONTROL"].showWebSerialUpdateError(_i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t(msg1Key, {
                platform: platform
              }), msg2Key ? _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t(msg2Key, {
                platform: platform
              }) : null, "https://kb.vex.com/hc/en-us/articles/4419503223700-Troubleshooting-Connecting-to-Web-based-VEXcode-EXP");
              return _context10.abrupt("return", false);
            case 26:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[2, 16]]);
      }));
      function updateControllerFirmware(_x10) {
        return _updateControllerFirmware.apply(this, arguments);
      }
      return updateControllerFirmware;
    }() //#endregion firmware
    //#region User Port comms
  }, {
    key: "supportsUserPort",
    get: function get() {
      return true;
    }
  }, {
    key: "requiresUserPortConnectionProcess",
    get: function get() {
      return true;
    }
  }, {
    key: "openConnectionUserPort",
    value: function () {
      var _openConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", this._serial.openConnectionUserPort());
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function openConnectionUserPort() {
        return _openConnectionUserPort.apply(this, arguments);
      }
      return openConnectionUserPort;
    }()
  }, {
    key: "closeConnectionUserPort",
    value: function () {
      var _closeConnectionUserPort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this._serial.closeConnectionUserPort();
            case 2:
              return _context12.abrupt("return", true);
            case 3:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function closeConnectionUserPort() {
        return _closeConnectionUserPort.apply(this, arguments);
      }
      return closeConnectionUserPort;
    }()
  }, {
    key: "getConnectionStateUserPort",
    value: function getConnectionStateUserPort() {
      var state = this._serial.connectionStateUserPort;
      var isConnected = this.isBrainConnected() && state === _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"].Connected;
      return isConnected ? _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Connected : _types_HWEnums__WEBPACK_IMPORTED_MODULE_1__["BrainConnectionState"].Disconnected;
    }
  }, {
    key: "sendDataUserPort",
    value: function sendDataUserPort(data) {
      this._serial.sendDataUserPort(data);
    }
  }, {
    key: "onSerialStateChangeUserPort",
    value: function onSerialStateChangeUserPort(state) {
      log.debug("onSerialStateChange - new state:", _rm_vca_vexcode_webserial__WEBPACK_IMPORTED_MODULE_3__["VexWebSerialConnectionStates"][state]);
      if (this.lastUserPortState === state) {
        return;
      }
      this.lastUserPortState = state;
      var newState = this.getConnectionStateUserPort();
      this.fireEvent("connectionStateChange", newState);
      _GlobalEventSystem__WEBPACK_IMPORTED_MODULE_6__["fireEvent"]("HWInterface.ConnectionStateChangeUserPort", newState);
    }
    //#endregion User Port comms

    //#region events
    //#endregion

    //#region low-level logger
  }, {
    key: "getLowLevelLogger",
    value: function getLowLevelLogger() {
      // TODO: actually get this part working
      // return this._serial.logger;
      return null;
    }
    //#endregion low-level logger
  }]);
  return EXPWebSerial;
}(_EXPInterface__WEBPACK_IMPORTED_MODULE_2__["EXPInterface"]);


/***/ })

}]);
//# sourceMappingURL=44e578e8df902ab1c843.28.bundle.js.map