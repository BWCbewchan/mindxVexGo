this["webpackChunkwebapp"]([0],{

/***/ "./src/HardwareInterface/HWInterfaceBase.ts":
/*!**************************************************!*\
  !*** ./src/HardwareInterface/HWInterfaceBase.ts ***!
  \**************************************************/
/*! exports provided: HWInterfaceBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HWInterfaceBase", function() { return HWInterfaceBase; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("HWInterfaceBase");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

log.setHistoryLogger("HWInterface");

// tslint:disable: member-ordering object-literal-key-quotes unified-signatures
var HWInterfaceBase = /*#__PURE__*/function () {
  function HWInterfaceBase() {
    _classCallCheck(this, HWInterfaceBase);
    //#endregion User Port comms
    //#region events
    _defineProperty(this, "eventCallbacks", {
      "connectionStateChange": [],
      "connectionStateChangeUserPort": [],
      "brainInfoUpdate": [],
      "brainConnected": [],
      "brainDisconnected": []
    });
    //#endregion
    //#region low-level logger
    _defineProperty(this, "lowLevelLogLines", []);
    _defineProperty(this, "lowLevelLogMaxLineLimit", 1000);
    _defineProperty(this, "lowLevelLogLevel", log.levels.WARN);
    _defineProperty(this, "isLowLevelLoggerBound", false);
    this.bindLowLevelLogger();
  }

  //#region connection control
  /**
   * this will open a connection to the brain. This will return when the
   * connection is opened or if the connection fails to open.
   * @throws OperationNotSupportedError
   */
  _createClass(HWInterfaceBase, [{
    key: "didTryFirmwareUpdate",
    get:
    /**
     * indicates if a firmware update hass been attempted for the currently connected brain
     */
    function get() {
      return false;
    }
  }, {
    key: "didTryControllerFirmwareUpdate",
    get:
    /**
     * indicates if a firmware update hass been attempted for the currently connected controller
     */
    function get() {
      return false;
    }

    /**
     * Call this to update the firmware of the connected controller.
     * @param progress a callback that can return the update progress
     * @param isDFU true if the device is in DFU mode (forces a update of at least the atmel firmware)
     * @throws OperationNotSupportedError
     * @throws NoControllerConnectedError
     */
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (this.eventCallbacks[eventName].indexOf(callback) >= 0) {
        return;
      }
      this.eventCallbacks[eventName].push(callback);
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      var i = this.eventCallbacks[eventName].indexOf(callback);
      if (i < 0) {
        log.warn("Unknown callback.");
        return;
      }
      this.eventCallbacks[eventName].splice(i, 1);
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      log.debug.apply(log, ["fire event", eventName].concat(args));
      if (this.eventCallbacks[eventName]) {
        this.eventCallbacks[eventName].slice(0).forEach(function (callback) {
          callback.apply(void 0, args);
        });
      }
    }
  }, {
    key: "onBrainConnected",
    value: function onBrainConnected() {
      log.debug("onBrainConnected");
      this.fireEvent("brainConnected", this.getBrainInfo());
    }
  }, {
    key: "onBrainDisconnected",
    value: function onBrainDisconnected() {
      log.debug("onBrainDisconnected");
      this.fireEvent("brainDisconnected");
    }
  }, {
    key: "getLowLevelLog",
    value:
    /**
     * grab all the cached low level interface logs as an array of lines
     * @returns
     */
    function getLowLevelLog() {
      return this.lowLevelLogLines;
    }

    /**
     * grab all the cached low level interface logs as a single string with
     * new lines inserted
     * @returns
     */
  }, {
    key: "getLowLevelLogAsString",
    value: function getLowLevelLogAsString() {
      return this.lowLevelLogLines.join("\n");
    }
  }, {
    key: "clearLowLevelLog",
    value: function clearLowLevelLog() {
      this.lowLevelLogLines = [];
    }
  }, {
    key: "getLowLevelLogLevel",
    value:
    /**
     * Get the current lowlevel log print level. This is what level will be sent
     * to the dev tools console.
     * @returns
     */
    function getLowLevelLogLevel() {
      return this.lowLevelLogLevel;
    }

    /**
     * Get the current lowlevel log print level. This is what level will be sent
     * to the dev tools console.
     * @returns
     */
  }, {
    key: "setLowLevelLogLevel",
    value: function setLowLevelLogLevel(level) {
      if (typeof level === "string" && log.levels[level] !== undefined) {
        level = log.levels[level];
      }
      if (typeof level === "number" && level >= 0 && level <= log.levels.SILENT) {
        this.lowLevelLogLevel = level;
      } else {
        throw new RangeError("setLowLevelLogLevel() called with invalid level: " + level);
      }
    }

    // adding the log to a local array
  }, {
    key: "addToLowLevelLog",
    value: function addToLowLevelLog(methodName, loggerName, logLevel, logEntry) {
      if (!logEntry) {
        return;
      }
      try {
        // compose the log output from args
        var output = logEntry.map(function (x) {
          if (x === undefined) {
            return "undefined";
          } else if (x === null) {
            return "null";
          }
          return x.toString();
        }).join(" ");
        var finalConsoleOut = "[".concat(new Date().toISOString(), "] ").concat(methodName, " (").concat(loggerName, "): ") + output;

        // add to log
        if (this.lowLevelLogLines.length === this.lowLevelLogMaxLineLimit) {
          this.lowLevelLogLines.shift();
        }
        this.lowLevelLogLines.push(finalConsoleOut);
      } catch (ex) {
        log.error("error collecting logs", ex);
      }
    }
  }, {
    key: "bindLowLevelLogger",
    value: function bindLowLevelLogger() {
      var _this = this;
      if (this.isLowLevelLoggerBound) {
        log.warn("the low-level logger has allready been bound");
        return;
      }
      var lowLevelLogger = this.getLowLevelLogger();
      if (!lowLevelLogger) {
        log.warn("no logger to bind");
        return;
      }
      var originalFactory = lowLevelLogger.methodFactory;
      lowLevelLogger.methodFactory = function (methodName, logLevel, loggerName) {
        var rawMethod = originalFactory(methodName, logLevel, loggerName);
        return function () {
          for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            message[_key2] = arguments[_key2];
          }
          // log levels set in the module
          _this.addToLowLevelLog(methodName, loggerName, logLevel, message);
          // print only warnings and errors in dev console
          // note: logLevel always comes as info(2) as it the set level in the module. use methodName
          try {
            if (log.levels[methodName.toUpperCase()] >= _this.lowLevelLogLevel) {
              rawMethod.apply(void 0, message);
            }
          } catch (_unused) {
            // nothing to do here...
          }
        };
      };
      lowLevelLogger.setLevel(lowLevelLogger.getLevel());
      this.isLowLevelLoggerBound = true;
    }

    /**
     * This will grab the logger instance for the low-level interface. This can
     * return null if there is no logger like for iOS/Android native BLE.
     */
  }, {
    key: "getHardwareInfo",
    value: //#endregion low-level logger
    function () {
      var _getHardwareInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", null);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getHardwareInfo() {
        return _getHardwareInfo.apply(this, arguments);
      }
      return getHardwareInfo;
    }()
  }]);
  return HWInterfaceBase;
}();


/***/ }),

/***/ "./src/HardwareInterface/helpers.ts":
/*!******************************************!*\
  !*** ./src/HardwareInterface/helpers.ts ***!
  \******************************************/
/*! exports provided: isFirmwareUpToDate, vexFirmwareChannels, firmwareChannel, fwUpdateMessages, blUpdateMessages, minUpdateBattery, vex123FWUpdateMessages, stringToArrayBuffer, arrayBufferToString, forceBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirmwareUpToDate", function() { return isFirmwareUpToDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vexFirmwareChannels", function() { return vexFirmwareChannels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firmwareChannel", function() { return firmwareChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fwUpdateMessages", function() { return fwUpdateMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blUpdateMessages", function() { return blUpdateMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minUpdateBattery", function() { return minUpdateBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vex123FWUpdateMessages", function() { return vex123FWUpdateMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToArrayBuffer", function() { return stringToArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayBufferToString", function() { return arrayBufferToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceBuffer", function() { return forceBuffer; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../targetPlatform */ "./src/targetPlatform.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Helper");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();


function splitVersionStr(str) {
  return str.toLowerCase().replace("b", ".").replace("..", ".").split(".").map(function (v) {
    return parseInt(v, 10);
  });
}
function isFirmwareUpToDate(currentFirmwareStr, brainFirmwareStr) {
  var currentFirmware = splitVersionStr(currentFirmwareStr);
  var brainFirmware = splitVersionStr(brainFirmwareStr);
  var needsUpdate = false;
  if (brainFirmware[0] < currentFirmware[0]) {
    needsUpdate = true;
  } else if (brainFirmware[0] === currentFirmware[0]) {
    if (brainFirmware[1] < currentFirmware[1]) {
      needsUpdate = true;
    } else if (brainFirmware[1] === currentFirmware[1]) {
      if (brainFirmware[2] < currentFirmware[2]) {
        needsUpdate = true;
      } else if (brainFirmware[2] === currentFirmware[2]) {
        if (brainFirmware[3] < currentFirmware[3] || currentFirmware[3] === 0 && brainFirmware[3] !== 0) {
          needsUpdate = true;
        }
      }
    }
  }
  return !needsUpdate;
}
var vexFirmwareChannels = /*#__PURE__*/function (vexFirmwareChannels) {
  vexFirmwareChannels[vexFirmwareChannels["Release"] = 1] = "Release";
  vexFirmwareChannels[vexFirmwareChannels["Beta"] = 2] = "Beta";
  vexFirmwareChannels[vexFirmwareChannels["Developer"] = 3] = "Developer";
  vexFirmwareChannels[vexFirmwareChannels["Bootloader"] = 4] = "Bootloader";
  return vexFirmwareChannels;
}(vexFirmwareChannels || {});
var fwUpdateMessages = ["GO FW Update In-Progress-1", "GO Update In-Progress-2"];
var blUpdateMessages = ["GO BL Update In-Progress-1", "GO Update In-Progress-2"];
var vex123FWUpdateMessages = ["GO FW Update In-Progress-1", "123 Update In-Progress-2"];
var firmwareChannelGO = vexFirmwareChannels.Release;
var firmwareChannel123 = vexFirmwareChannels.Release;
var minUpdateBattery = 60;
var firmwareChannel = _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsGO"] ? firmwareChannelGO : firmwareChannel123;
function stringToArrayBuffer(str) {
  var abLen = str.length;
  var ab = new Uint8Array(abLen);
  for (var i = 0; i < abLen; i++) {
    ab[i] = str.charCodeAt(i);
  }
  return ab.buffer;
}
function arrayBufferToString(ab) {
  var output = "";
  var bytes = new Uint8Array(ab);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    output += String.fromCharCode(bytes[i]);
  }
  return output;
}
function forceBuffer(data) {
  if (data && data instanceof Buffer) {
    return data;
  }
  return new Buffer(data);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ })

});
//# sourceMappingURL=e0e04d1e6e14e8494cf8.0.bundle.js.map