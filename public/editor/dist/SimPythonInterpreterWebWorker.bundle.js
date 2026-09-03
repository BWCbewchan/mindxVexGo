var webapp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SimWindow/SimPythonInterpreter/SimPythonInterpreterWebWorker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@rm-vca/logger/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@rm-vca/logger/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const logger_1 = __webpack_require__(/*! ./logger */ "./node_modules/@rm-vca/logger/dist/logger.js");
const logger = new logger_1.Logger();
module.exports = logger;


/***/ }),

/***/ "./node_modules/@rm-vca/logger/dist/logger.js":
/*!****************************************************!*\
  !*** ./node_modules/@rm-vca/logger/dist/logger.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// based on loglevel - https://github.com/pimterry/loglevel

Object.defineProperty(exports, "__esModule", { value: true });
// Slightly dubious tricks to cut down minimized file size
// tslint:disable:no-empty
function noop() { }
// tslint:enable:no-empty
const undefinedType = "undefined";
const logMethods = [
    "trace",
    "debug",
    "info",
    "warn",
    "error",
];
const types_1 = __webpack_require__(/*! ./types */ "./node_modules/@rm-vca/logger/dist/types.js");
//#region helpers
// Cross-browser bind equivalent that works at least back to IE6
function bindMethod(obj, methodName) {
    const method = obj[methodName];
    if (typeof method.bind === "function") {
        return method.bind(obj);
    }
    else {
        return Function.prototype.bind.call(method, obj);
    }
}
// Build the best logging method possible for this env
// Wherever possible we want to bind, not wrap, to preserve stack traces
function realMethod(methodName) {
    if (methodName === "debug") {
        methodName = "log";
    }
    if (typeof console === undefinedType) {
        return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
    }
    else if (console[methodName] !== undefined) {
        return bindMethod(console, methodName);
    }
    else if (console.log !== undefined) {
        return bindMethod(console, "log");
    }
    else {
        return noop;
    }
}
//#endregion helpers
//#region prefix
function levelFormatter(level) {
    return (level.toUpperCase() + "     ").slice(0, 5);
}
function nameFormatter(name) {
    return name || "root";
}
function timestampFormater(date) {
    return date.toISOString();
}
function prefixFormatter(template, level, name, timestamp) {
    template = template.replace(/%t/, timestampFormater(timestamp));
    template = template.replace(/%l/, levelFormatter(level));
    template = template.replace(/%n/, nameFormatter(name));
    return template;
}
//#endregion prefix
//#region history
const historyLoggersByName = {};
class HistoryLogger {
    constructor(name, defaultLevel) {
        this.name = name;
        this.defaultLevel = defaultLevel;
        this.levels = types_1.LoggerLevels;
        this.lines = [];
        this.loggerList = new Set();
        // Initialize with the right level
        const initialLevel = this.defaultLevel == null ? "INFO" : this.defaultLevel;
        this.setLevel(initialLevel);
        this.maxLines = 1000;
    }
    getName() {
        return this.name;
    }
    getLevel() {
        return this.currentLevel;
    }
    setLevel(level) {
        if (typeof level === "string" && this.levels[level.toUpperCase()] !== undefined) {
            level = this.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= this.levels.SILENT) {
            this.currentLevel = level;
            // we need to rebuild any loggers that use this as the level change may
            // require updating the internal functions.
            const loggers = this.getLoggers();
            for (let logger of loggers) {
                logger.rebuildLogger();
            }
        }
        else {
            throw new RangeError("setLevel() called with invalid level: " + level);
        }
    }
    enableAll() {
        this.setLevel(this.levels.TRACE);
    }
    disableAll() {
        this.setLevel(this.levels.SILENT);
    }
    getMaxLines() {
        return this.maxLines;
    }
    setMaxLines(maxLines) {
        if (maxLines > 0) {
            this.maxLines = maxLines;
            while (this.lines.length >= this.maxLines) {
                this.lines.shift();
            }
        }
    }
    addToLogHistory(logEntry) {
        if (!logEntry) {
            return;
        }
        try {
            // compose the log output from args
            const output = logEntry.map((x) => {
                if (x === undefined) {
                    return "undefined";
                }
                else if (x === null) {
                    return "null";
                }
                else if (typeof x === "object") {
                    return JSON.stringify(x);
                }
                return x.toString();
            }).join(" ");
            // add to log
            if (this.lines.length === this.maxLines) {
                this.lines.shift();
            }
            this.lines.push(output);
        }
        catch (ex) {
            // log.error("error collecting logs", ex);
        }
    }
    getLogHistory() {
        return this.lines;
    }
    getLogHistoryAsString() {
        return this.getLogHistory().join("\n");
    }
    clearLogHistory() {
        this.lines = [];
    }
    addLogger(name) {
        this.loggerList.add(name);
    }
    removeLogger(name) {
        this.loggerList.delete(name);
    }
    getLoggers() {
        const out = [];
        for (let name of this.loggerList) {
            const logger = loggersByName[name];
            if (logger) {
                out.push(logger);
            }
        }
        return out;
    }
}
//#endregion history
// where all the loggers are stored
const loggersByName = {};
class Logger {
    constructor(name, defaultLevel) {
        this.name = name;
        this.defaultLevel = defaultLevel;
        this.levels = types_1.LoggerLevels;
        // Initialize with the right level
        let initialLevel = this.defaultLevel == null ? "WARN" : this.defaultLevel;
        this.setLevel(initialLevel);
    }
    /**
     * create a function to log the data
     * @param methodName the name of the "level". this is also used for what the level is in the prefix
     * @param level the limit for the nor
     * @param loggerName the name of the logger. this is used with the prefix logic
     * @returns
     */
    methodFactory(methodName, level, loggerName) {
        const originalMethod = realMethod(methodName);
        const levelNum = types_1.LoggerLevels[methodName.toUpperCase()];
        const scope = this;
        return function (...args) {
            const prefix = prefixFormatter('[%t] %l (%n):', methodName.toUpperCase(), loggerName, new Date());
            if (args.length && typeof args[0] === 'string') {
                // concat prefix with first argument to support string substitutions
                args[0] = prefix + ' ' + args[0];
            }
            else {
                args.unshift(prefix);
            }
            if (levelNum >= scope.currentLevel) {
                originalMethod.apply(undefined, args);
            }
            if (scope.historyLogger && levelNum >= scope.historyLogger.getLevel()) {
                scope.historyLogger.addToLogHistory(args);
            }
        };
    }
    getName() {
        return this.name;
    }
    getLevel() {
        return this.currentLevel;
    }
    setLevel(level) {
        if (typeof level === "string" && this.levels[level.toUpperCase()] !== undefined) {
            level = this.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= this.levels.SILENT) {
            this.currentLevel = level;
            this.replaceLoggingMethods(level, this.name);
            if (typeof console === undefinedType && level < this.levels.SILENT) {
                return "No console available for logging";
            }
        }
        else {
            throw new RangeError("log.setLevel() called with invalid level: " + level);
        }
    }
    enableAll() {
        this.setLevel(this.levels.TRACE);
    }
    disableAll() {
        this.setLevel(this.levels.SILENT);
    }
    getLogger(name) {
        if (typeof name !== "string" || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
        }
        let namedlogger = loggersByName[name];
        if (!namedlogger) {
            namedlogger = loggersByName[name] = new Logger(name, this.getLevel());
        }
        return namedlogger;
    }
    getLoggers() {
        return loggersByName;
    }
    /**
     * call this to set the fuinctions that are called by the logger. this lets us not do anything if
     * the function would be below the desired log level.
     * @param level the target log level
     * @param loggerName the name of the logger the functions are for
     */
    replaceLoggingMethods(level, loggerName) {
        const historyLevel = this.historyLogger ? this.historyLogger.getLevel() : this.levels.SILENT;
        const minLevel = Math.min(historyLevel, level);
        for (let i = 0; i < logMethods.length; i++) {
            const methodName = logMethods[i];
            const levelname = types_1.LoggerLevels[level];
            this[methodName] = (i < minLevel) ?
                noop :
                this.methodFactory(methodName, levelname, loggerName);
        }
        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }
    /**
     * this is for internal use but needs to be public so the HistoryLogger
     * class can access it.
     */
    rebuildLogger() {
        this.replaceLoggingMethods(this.currentLevel, this.name);
    }
    /**
     * will tell this logger to log to a history logger
     * @param name the name of the history logger to use for this logger
     * @returns
     */
    setHistoryLogger(name) {
        if (typeof name !== "string" || name === "") {
            throw new TypeError("You must supply a name when creating a HistoryLogger.");
        }
        if (this.historyLogger) {
            this.historyLogger.removeLogger(this.name);
        }
        this.historyLogger = historyLoggersByName[name];
        if (!this.historyLogger) {
            this.historyLogger = historyLoggersByName[name] = new HistoryLogger(name, this.getLevel());
        }
        this.historyLogger.addLogger(this.name);
        this.rebuildLogger();
        return this.historyLogger;
    }
    /**
     * Will return the current HistoryLogger object for this logger
     * @returns HistoryLogger for the logger
     */
    getHistoryLogger() {
        return this.historyLogger;
    }
    /**
     * tells the logger to stop logging to the configured history logger.
     */
    removehistoryLogger() {
        if (this.historyLogger) {
            this.historyLogger.removeLogger(this.name);
            this.historyLogger = undefined;
            this.rebuildLogger();
        }
    }
    /**
     * gets all the current history logger objects
     * @returns
     */
    getHistoryLoggers() {
        return historyLoggersByName;
    }
    /**
     * will find and return the hitoriy logger with the specified name,
     * or undefined if it does not exist
     */
    getHistoryLoggerByName(name) {
        return historyLoggersByName[name];
    }
}
exports.Logger = Logger;


/***/ }),

/***/ "./node_modules/@rm-vca/logger/dist/types.js":
/*!***************************************************!*\
  !*** ./node_modules/@rm-vca/logger/dist/types.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoggerLevels;
(function (LoggerLevels) {
    LoggerLevels[LoggerLevels["TRACE"] = 0] = "TRACE";
    LoggerLevels[LoggerLevels["DEBUG"] = 1] = "DEBUG";
    LoggerLevels[LoggerLevels["INFO"] = 2] = "INFO";
    LoggerLevels[LoggerLevels["WARN"] = 3] = "WARN";
    LoggerLevels[LoggerLevels["ERROR"] = 4] = "ERROR";
    LoggerLevels[LoggerLevels["SILENT"] = 5] = "SILENT";
})(LoggerLevels || (LoggerLevels = {}));
exports.LoggerLevels = LoggerLevels;


/***/ }),

/***/ "./src/Blockly/Extensions/utils/helpers.ts":
/*!*************************************************!*\
  !*** ./src/Blockly/Extensions/utils/helpers.ts ***!
  \*************************************************/
/*! exports provided: drivetrainTimeoutWrapper, drivetrainTimeoutWrapperSendCallback, motorTimeoutWrapper, waitms, setWrapper, mapRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drivetrainTimeoutWrapper", function() { return drivetrainTimeoutWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drivetrainTimeoutWrapperSendCallback", function() { return drivetrainTimeoutWrapperSendCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motorTimeoutWrapper", function() { return motorTimeoutWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitms", function() { return waitms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setWrapper", function() { return setWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapRange", function() { return mapRange; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../SimWindow/SimUnity/SimMessageHelper */ "./src/SimWindow/SimUnity/SimMessageHelper.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Extension Helpers");
log.setLevel(log.levels.WARN);

var PromiseTimeoutError = /*#__PURE__*/function (_Error) {
  _inherits(PromiseTimeoutError, _Error);
  var _super = _createSuper(PromiseTimeoutError);
  function PromiseTimeoutError() {
    var _this;
    _classCallCheck(this, PromiseTimeoutError);
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(params));
    _this.name = "Promise Timeout Error";
    return _this;
  }
  return _createClass(PromiseTimeoutError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
function timeoutWrapper(_x, _x2) {
  return _timeoutWrapper.apply(this, arguments);
}
function _timeoutWrapper() {
  _timeoutWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(prom, timeoutms) {
    var timeoutPromise;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(timeoutms <= 0)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", prom);
        case 2:
          timeoutPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
              reject(new PromiseTimeoutError());
            }, timeoutms);
          });
          return _context.abrupt("return", Promise.race([prom, timeoutPromise]));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _timeoutWrapper.apply(this, arguments);
}
function drivetrainTimeoutWrapper(_x3, _x4, _x5, _x6) {
  return _drivetrainTimeoutWrapper.apply(this, arguments);
}
function _drivetrainTimeoutWrapper() {
  _drivetrainTimeoutWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(msg, wait, timeoutms, msgSender) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!wait) {
            _context2.next = 17;
            break;
          }
          _context2.prev = 1;
          _context2.next = 4;
          return timeoutWrapper(msgSender(msg), timeoutms);
        case 4:
          _context2.next = 15;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          if (!(_context2.t0 instanceof PromiseTimeoutError)) {
            _context2.next = 14;
            break;
          }
          log.debug("drivetrain timeout");
          _context2.next = 12;
          return msgSender(_SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__["Drivetrain"].stop());
        case 12:
          _context2.next = 15;
          break;
        case 14:
          log.debug("drievtrain command rejected A", _context2.t0);
        case 15:
          _context2.next = 19;
          break;
        case 17:
          _context2.next = 19;
          return msgSender(msg);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return _drivetrainTimeoutWrapper.apply(this, arguments);
}
function drivetrainTimeoutWrapperSendCallback(_x7, _x8, _x9, _x10, _x11) {
  return _drivetrainTimeoutWrapperSendCallback.apply(this, arguments);
}
function _drivetrainTimeoutWrapperSendCallback() {
  _drivetrainTimeoutWrapperSendCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(msg, wait, timeoutms, msgSender, sendCallback) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!wait) {
            _context3.next = 18;
            break;
          }
          _context3.prev = 1;
          _context3.next = 4;
          return timeoutWrapper(msgSender(msg, sendCallback), timeoutms);
        case 4:
          _context3.next = 16;
          break;
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](1);
          if (!(_context3.t0 instanceof PromiseTimeoutError)) {
            _context3.next = 14;
            break;
          }
          log.debug("drivetrain timeout");
          _context3.next = 12;
          return msgSender(_SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__["Drivetrain"].stop());
        case 12:
          _context3.next = 16;
          break;
        case 14:
          log.debug("drievtrain command rejected B", _context3.t0);
          throw _context3.t0;
        case 16:
          _context3.next = 20;
          break;
        case 18:
          _context3.next = 20;
          return msgSender(msg, sendCallback);
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 6]]);
  }));
  return _drivetrainTimeoutWrapperSendCallback.apply(this, arguments);
}
function motorTimeoutWrapper(_x12, _x13, _x14, _x15, _x16) {
  return _motorTimeoutWrapper.apply(this, arguments);
}
function _motorTimeoutWrapper() {
  _motorTimeoutWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(port, msg, wait, timeoutms, msgSender) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!wait) {
            _context4.next = 16;
            break;
          }
          _context4.prev = 1;
          _context4.next = 4;
          return timeoutWrapper(msgSender(msg), timeoutms);
        case 4:
          _context4.next = 14;
          break;
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](1);
          if (!(_context4.t0 instanceof PromiseTimeoutError)) {
            _context4.next = 13;
            break;
          }
          _context4.next = 11;
          return msgSender(_SimWindow_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__["Motor"].stop(port));
        case 11:
          _context4.next = 14;
          break;
        case 13:
          log.warn(_context4.t0);
        case 14:
          _context4.next = 18;
          break;
        case 16:
          _context4.next = 18;
          return msgSender(msg);
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return _motorTimeoutWrapper.apply(this, arguments);
}
function waitms(_x17) {
  return _waitms.apply(this, arguments);
}
function _waitms() {
  _waitms = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ms) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
          }));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _waitms.apply(this, arguments);
}
function setWrapper(_x18, _x19) {
  return _setWrapper.apply(this, arguments);
}
function _setWrapper() {
  _setWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(msg, msgSender) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return msgSender(msg);
                  case 2:
                    _context6.next = 4;
                    return waitms(40);
                  case 4:
                    resolve();
                  case 5:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x20, _x21) {
              return _ref.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _setWrapper.apply(this, arguments);
}
function mapRange(value, x1, y1, x2, y2) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}


/***/ }),

/***/ "./src/PythonPreprocessor.ts":
/*!***********************************!*\
  !*** ./src/PythonPreprocessor.ts ***!
  \***********************************/
/*! exports provided: PythonPreprocessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PythonPreprocessor", function() { return PythonPreprocessor; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./targetPlatform */ "./src/targetPlatform.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Python Preprocessor");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

var loopRegex = /for /;
var whiteSpaceRegex = /^\s/;
var assignmentRegex = /=/;
var conditionalRegex = /(if |elif ).*/;
var PythonPreprocessor = /*#__PURE__*/function () {
  // TODO: make this passed in

  function PythonPreprocessor(classNames) {
    _classCallCheck(this, PythonPreprocessor);
    _defineProperty(this, "_deviceClassNames", []);
    _defineProperty(this, "deviceAsyncCalls", []);
    this._deviceClassNames = classNames || [];
    // TODO: as part of the genericizing, I can make another structure
    // like deviceAwaitCalls which is {deviceName: []} where the list is
    // the list of devices that need awaits added to them
  }
  _createClass(PythonPreprocessor, [{
    key: "preprocess",
    value: function preprocess(code) {
      var _this = this;
      log.debug("Code to process:\n" + code);

      // Process control wait
      code = code.replace(/(\s)wait(\s*)\(/gm, "$1await wait$2(");

      // TODO: genericize this for drivetrain and motors
      code = code.replace(/drivetrain\.(?=drive_for|drive_to|turn_for|turn_to|set_heading|set_rotation|go_to)/gm, "await drivetrain.");
      code = code.replace(/pen\.(?=move)/gm, "await pen.");
      if (_targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsV5"] || _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsPlaygrounds"]) {
        code = code.replace(/intake_motor_group\.(?=spin_for|spin_to_position|set_position)/gm, "await intake_motor_group.");
        code = code.replace(/fork_motor_group\.(?=spin_for|spin_to_position|set_position)/gm, "await fork_motor_group.");
        code = code.replace(/arm_motor_group\.(?=spin_for|spin_to_position|set_position)/gm, "await arm_motor_group.");
        code = code.replace(/rotation\.(?=set_position)/gm, "await rotation.");
      }
      if (_targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsIQ"] || _targetPlatform__WEBPACK_IMPORTED_MODULE_1__["targetIsPlaygrounds"]) {
        code = code.replace(/intake_motor\.(?=spin_for|spin_to_position|set_position)/gm, "await intake_motor.");
        code = code.replace(/catapult_motor\.(?=spin_for|spin_to_position|set_position)/gm, "await catapult_motor.");
        code = code.replace(/catapult_tension_motor\.(?=spin_for|spin_to_position|set_position)/gm, "await catapult_tension_motor.");
        code = code.replace(/arm_motor\.(?=spin_for|spin_to_position|set_position)/gm, "await arm_motor.");
      }
      code = code.replace(/rover\.(?=pickup|drop|use|absorb_radiation|detects|sees|angle|get_distance|location|enemy_level|enemy_radiation|standby)/gm, "await rover.");
      code = code.replace(/(\S*).(?=broadcast_and_wait\(\))/gm, "await $1.");

      // const pyFunctionDefRegex = /def(\s)*[a-zA-Z0-9_]*(\s)*\(/g;
      var pyFunctionDefRegex = /def(\s)*[a-zA-Z0-9_]*(\s)*\([,a-zA-Z0-9_ \*=]*\)(\s)*:/g;
      var initRegex = /def(\s)*(__init__)*(\s)*\([,a-zA-Z0-9_ \*=]*\)(\s)*:/g;
      var functionDefRegex = /(\s*def\s)/;
      var pyFunctionCallRegex = /(?!def.*)([a-zA-Z0-9_]+\()/g;
      var functionDefArr = code.match(pyFunctionDefRegex);
      var userFunctionDefs = new Set();
      log.debug("user functions found: " + functionDefArr);
      if (functionDefArr != null) {
        functionDefArr.forEach(function (functionDef) {
          if (!functionDef.match(initRegex)) {
            code = code.replace(functionDef, "async " + functionDef);
          }
          var functionSig = _this.getFunctionSignature(functionDef);
          log.debug("User function name: " + functionSig);
          if (!functionSig.match(/__init__\(/)) {
            userFunctionDefs.add(functionSig);
          }
        });
      }
      var codeLines = code.split("\n");
      for (var i = 0; i < codeLines.length; i++) {
        var functionCallArr = codeLines[i].match(pyFunctionCallRegex);
        // log.warn("code line: " + codeLines[i]);
        // If the function matches the regex, and it is not a global function (has whitespace in the beginning)
        if (functionCallArr !== null && !this.isGlobal(codeLines[i]) && !codeLines[i].match(functionDefRegex)) {
          if (this.hasLoop(codeLines[i])) {
            log.debug("Doing functions in loop");
            var _iterator = _createForOfIteratorHelper(userFunctionDefs),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var func = _step.value;
                if (this.isUserFunctionCall(codeLines[i], func)) {
                  codeLines[i] = this.addAwaits(codeLines[i], func);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          } else {
            log.debug("Doing normal function calls");
            var _iterator2 = _createForOfIteratorHelper(userFunctionDefs),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _func = _step2.value;
                log.debug("code line: " + codeLines[i] + "\nsig: " + _func);
                if (this.isUserFunctionCall(codeLines[i], _func)) {
                  log.debug("function sig: " + _func);
                  codeLines[i] = this.addAwaits(codeLines[i], _func);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }
      }
      code = codeLines.join("\n");
      code = code.replace(/await await/g, "await");
      log.debug("Post processed code: \n" + code);
      return code;
    }
  }, {
    key: "addAsyncDeviceCalls",
    value: function addAsyncDeviceCalls(asyncDeviceCall) {
      this.deviceAsyncCalls.push(asyncDeviceCall);
    }
  }, {
    key: "deviceClassNames",
    get: function get() {
      return this._deviceClassNames;
    },
    set: function set(classNames) {
      this._deviceClassNames = classNames;
    }
  }, {
    key: "getFunctionSignature",
    value: function getFunctionSignature(line) {
      var sig = line.replace("def ", "").split("(", 2)[0] + "(";
      return sig;
    }
  }, {
    key: "isGlobal",
    value: function isGlobal(codeLine) {
      return !whiteSpaceRegex.test(codeLine);
    }
  }, {
    key: "hasLoop",
    value: function hasLoop(codeLine) {
      return loopRegex.test(codeLine);
    }

    /**
     * This function will check if a line has a user function call
     * Cases that aren't a user function call:
     *  1. Comments
     *  2. If the function name is part of another function name
     *  3. If the function call is inside of a string
     */
  }, {
    key: "isUserFunctionCall",
    value: function isUserFunctionCall(codeLine, funcCall) {
      var noWhiteSpace = codeLine.replace(/\s+/g, "");
      var isLineComment = noWhiteSpace.charAt(0) === "#";
      var firstDoubleQuoteIndex = noWhiteSpace.indexOf("\"");
      var lastDoubleQuoteIndex = noWhiteSpace.lastIndexOf("\"");
      var firstSingleQuoteIndex = noWhiteSpace.indexOf("\'");
      var lastSingleQuoteIndex = noWhiteSpace.lastIndexOf("\'");
      var callIndex = noWhiteSpace.lastIndexOf(funcCall);
      var isInString = callIndex > firstDoubleQuoteIndex && callIndex < lastDoubleQuoteIndex || callIndex > firstSingleQuoteIndex && callIndex < lastSingleQuoteIndex;
      var isCorrectCall = !isLineComment && !isInString;
      if (isCorrectCall) {
        if (callIndex === 0) {
          isCorrectCall = true;
        } else if (this.isAnOperator(noWhiteSpace.charAt(callIndex - 1))) {
          isCorrectCall = true;
        } else if (noWhiteSpace.charAt(callIndex - 1) === "(") {
          isCorrectCall = true;
        } else if (noWhiteSpace.charAt(callIndex - 1) === ".") {
          // Need to check if the object calling this function is a configured device, and if it is not just a custom object with a device name on the end
          var _iterator3 = _createForOfIteratorHelper(this.deviceClassNames),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var deviceName = _step3.value;
              if (this.callIsDevice(deviceName, noWhiteSpace, callIndex - 1) && !this.isUserVariableDevice(codeLine, funcCall)) {
                isCorrectCall = false;
                break;
              }
              isCorrectCall = true;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else if (codeLine.includes("await") && noWhiteSpace.charAt(callIndex - 1) === "t") {
          isCorrectCall = true;
        } else {
          isCorrectCall = false;
        }
      }
      return codeLine.includes(funcCall) && isCorrectCall;
    }
  }, {
    key: "isAnOperator",
    value: function isAnOperator(character) {
      return character === "=" || character === "+" || character === "*" || character === "-" || character === "/" || character === "%" || character === "*" || character === ">" || character === "<";
    }
  }, {
    key: "callIsDevice",
    value: function callIsDevice(device, codeLine, startIndex) {
      var revIndex = startIndex - device.length;
      if (revIndex < 0) {
        return false;
      }

      // This is getting the object that is being called
      // Even if it's not the whole name, or is including other characters I don't care
      // The check is only cares if it's the same as the device
      var objectName = codeLine.substr(revIndex, device.length);
      log.debug(objectName);
      return device === objectName;
    }
  }, {
    key: "isUserVariableDevice",
    value: function isUserVariableDevice(codeLine, funcCall) {
      // TODO: have a list of operators instead of hard coding?
      codeLine.replace(/\=/g, " ").replace(/\*/g, " ").replace(/\+/g, " ").replace(/\-/g, " ").replace(/\//g, " ").replace(/\%/g, " ").replace(/\>/g, " ").replace(/\</g, " ");
      var lineTokens = codeLine.split(/\s+/g);
      var objFuncCall = lineTokens.find(function (t) {
        return t.includes(funcCall);
      });
      if (objFuncCall) {
        var callingObject = objFuncCall.split(".")[0];
        return !this.deviceClassNames.includes(callingObject);
      }
      return false;
    }
  }, {
    key: "addAwaits",
    value: function addAwaits(line, func) {
      var indexes = this.indexes(line, func);
      var newLine = line;
      var closeParenIndex = -1;
      var offset = 0;
      var regexToCheck = /(\s|=|\()/g;
      var _iterator4 = _createForOfIteratorHelper(indexes),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var index = _step4.value;
          index += offset;
          if (index > 0) {
            var prevChar = newLine.charAt(index - 1);
            if (!prevChar.match(/[a-zA-Z0-9_\.]/)) {
              closeParenIndex = this.matchingParenthesis(newLine, index);
              log.debug("closeParenIndex: " + closeParenIndex);
              if (closeParenIndex > 0) {
                newLine = this.placeAtIndex(newLine, "(await ", index);
                offset += 7;
                newLine = this.placeAtIndex(newLine, ")", closeParenIndex + 7);
              } else {
                newLine = this.placeAtIndex(newLine, "await ", index);
                offset += 6;
              }
            } else {
              // the previous character is a '.' so I need to find the front of the object
              closeParenIndex = this.matchingParenthesis(newLine, index);
              var insertIndex = index;
              // if this is calling what is returned from another function
              while (!prevChar.match(regexToCheck) && !(insertIndex <= 0)) {
                if (prevChar === ")") {
                  regexToCheck = /(\s|=)/g;
                }
                insertIndex--;
                prevChar = newLine.charAt(insertIndex);
                // log.warn("stuck line: ", line, insertIndex);
              }

              if (insertIndex < 0) {
                insertIndex = 0;
              }
              // check not being done here since it will need the 100% fix to work anyways
              if (insertIndex === 0) {
                newLine = this.placeAtIndex(newLine, "(await ", insertIndex);
              } else {
                newLine = this.placeAtIndex(newLine, "(await ", insertIndex + 1);
              }
              offset += 7;
              newLine = this.placeAtIndex(newLine, ")", closeParenIndex + 7);
              regexToCheck = /(\s|=|\()/g;
            }
          } else {
            closeParenIndex = this.matchingParenthesis(newLine, index);
            log.debug("closeParenIndex: " + closeParenIndex);
            if (closeParenIndex > 0) {
              newLine = this.placeAtIndex(newLine, "(await ", index);
              offset += 7;
              newLine = this.placeAtIndex(newLine, ")", closeParenIndex + 7);
            } else {
              newLine = this.placeAtIndex(newLine, "await ", index);
              offset += 6;
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return newLine;
    }
  }, {
    key: "indexes",
    value: function indexes(source, find) {
      var result = [];
      for (var i = 0; i < source.length; ++i) {
        // If you want to search case insensitive use
        // if (source.substring(i, i + find.length).toLowerCase() == find) {
        if (source.substring(i, i + find.length) === find) {
          result.push(i);
        }
      }
      return result;
    }
  }, {
    key: "matchingParenthesis",
    value: function matchingParenthesis(codeLine, startIndex) {
      var count = 0;
      var index = -1;
      var currChar;
      var foundFirstOpen = false;
      for (var i = startIndex; i < codeLine.length; i++) {
        currChar = codeLine.charAt(i);
        if (currChar === "(") {
          foundFirstOpen = true;
          count++;
        } else if (currChar === ")") {
          count--;
        }
        if (foundFirstOpen && count === 0) {
          index = i;
          break;
        }
      }
      return index;
    }
  }, {
    key: "placeAtIndex",
    value: function placeAtIndex(inputStr, str, index) {
      return inputStr.slice(0, index) + str + inputStr.slice(index);
    }
  }]);
  return PythonPreprocessor;
}();

/***/ }),

/***/ "./src/RobotConfiguration/ErrorHandling/RobotConfigErrors.ts":
/*!*******************************************************************!*\
  !*** ./src/RobotConfiguration/ErrorHandling/RobotConfigErrors.ts ***!
  \*******************************************************************/
/*! exports provided: RobotConfigErrors, configErrorTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotConfigErrors", function() { return RobotConfigErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configErrorTypes", function() { return configErrorTypes; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var RobotConfigErrors = /*#__PURE__*/function (_Error) {
  _inherits(RobotConfigErrors, _Error);
  var _super = _createSuper(RobotConfigErrors);
  function RobotConfigErrors(errorIndex) {
    var _this;
    _classCallCheck(this, RobotConfigErrors);
    var message = "";
    switch (errorIndex) {
      default:
      case configErrorTypes.none:
        message = "Generic Robot Configuration Error";
        break;
      case configErrorTypes.nullDispatcher:
        message = "Event Dispatcher is null";
        break;
    }
    _this = _super.call(this, message); // (1)
    _this.name = "Robot Configuration Error"; // (2)
    return _this;
  }
  return _createClass(RobotConfigErrors);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var configErrorTypes = /*#__PURE__*/function (configErrorTypes) {
  configErrorTypes[configErrorTypes["none"] = 0] = "none";
  configErrorTypes[configErrorTypes["nullDispatcher"] = 1] = "nullDispatcher";
  return configErrorTypes;
}(configErrorTypes || {});


/***/ }),

/***/ "./src/RobotConfiguration/Manager/VirtualRobotConfigManager.ts":
/*!*********************************************************************!*\
  !*** ./src/RobotConfiguration/Manager/VirtualRobotConfigManager.ts ***!
  \*********************************************************************/
/*! exports provided: VirtualRCManager, addModelChangeListener, removeModelChangeListner, getGivenConfig, getVirtualConstructorList, getVirtualRobotImport, getVirtualRobotModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualRCManager", function() { return VirtualRCManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addModelChangeListener", function() { return addModelChangeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeModelChangeListner", function() { return removeModelChangeListner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGivenConfig", function() { return getGivenConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualConstructorList", function() { return getVirtualConstructorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualRobotImport", function() { return getVirtualRobotImport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualRobotModel", function() { return getVirtualRobotModel; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ErrorHandling_RobotConfigErrors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ErrorHandling/RobotConfigErrors */ "./src/RobotConfiguration/ErrorHandling/RobotConfigErrors.ts");
/* harmony import */ var _VR_Configs_vrconfigs_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VR/Configs/vrconfigs.json */ "./src/RobotConfiguration/VR/Configs/vrconfigs.json");
var _VR_Configs_vrconfigs_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../VR/Configs/vrconfigs.json */ "./src/RobotConfiguration/VR/Configs/vrconfigs.json", 1);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//#region imports
//#region logger


var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("VirtualRCManager");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();
//#endregion logger

// TODO: we will need to load in all of the configs

var ModelChangeDispatcher = /*#__PURE__*/function () {
  function ModelChangeDispatcher() {
    _classCallCheck(this, ModelChangeDispatcher);
    _defineProperty(this, "handlers", new Set());
  }
  _createClass(ModelChangeDispatcher, [{
    key: "onChange",
    value: function onChange(config, update) {
      var _iterator = _createForOfIteratorHelper(this.handlers),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var h = _step.value;
          h(config, update);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "register",
    value: function register(handler) {
      this.handlers.add(handler);
    }
  }, {
    key: "removeHandler",
    value: function removeHandler(handler) {
      if (this.handlers.has(handler)) {
        this.handlers["delete"](handler);
      } else {
        log.debug("Did not find " + handler + " in....", this.handlers);
      }
    }
  }]);
  return ModelChangeDispatcher;
}();
var modelDispatcher = new ModelChangeDispatcher();

/**
* Adds a callback to the list of callbacks when the dispatcher is triggered
* @param {ModelChangeHandler} callback the callback added to the dispatch list
*/
function addModelChangeListener(callback) {
  if (modelDispatcher !== null) {
    modelDispatcher.register(callback);
  } else {
    throw new _ErrorHandling_RobotConfigErrors__WEBPACK_IMPORTED_MODULE_1__["RobotConfigErrors"](_ErrorHandling_RobotConfigErrors__WEBPACK_IMPORTED_MODULE_1__["configErrorTypes"].nullDispatcher);
  }
}

/**
* Removes a callback from the list of callbacks when the dispatcher is triggered
* @param {ModelChangeHandler} callback the callback removed from the dispatch list
*/
function removeModelChangeListner(callback) {
  if (modelDispatcher !== null) {
    modelDispatcher.removeHandler(callback);
  } else {
    throw new _ErrorHandling_RobotConfigErrors__WEBPACK_IMPORTED_MODULE_1__["RobotConfigErrors"](_ErrorHandling_RobotConfigErrors__WEBPACK_IMPORTED_MODULE_1__["configErrorTypes"].nullDispatcher);
  }
}
//#endregion dispatcher
var VirtualRobotConfigManager = /*#__PURE__*/function () {
  function VirtualRobotConfigManager() {
    _classCallCheck(this, VirtualRobotConfigManager);
    _defineProperty(this, "vrConfigFile", _VR_Configs_vrconfigs_json__WEBPACK_IMPORTED_MODULE_2__);
    this.currentModelConfig = this.vrConfigFile["vr"];
  }

  /**
   * Sets the Virtual Robot Configs current model to the preloaded
   * config for the model passed in
   * @param {VirtualRobotModel} model the model that will set the new robot config
   */
  _createClass(VirtualRobotConfigManager, [{
    key: "setCurrentModel",
    value: function setCurrentModel(model) {
      this.currentModelConfig = this.vrConfigFile[model];
      modelDispatcher.onChange(this.currentModelConfig, false);
    }

    /**
     * Returns all the current configured devices for a virtual robot
     * @return {ConfigDevice[]} returns all configured devices
     */
  }, {
    key: "getDevices",
    value: function getDevices() {
      return this.currentModelConfig.devices;
    }

    /**
     * Returns all the current configured devices of a specified type
     * for the current virtual robot
     * @param {VRDeviceType} type type of device you want 
     * @return {ConfigDevice[]} returns all configured devices
     */
  }, {
    key: "getDevicesOfType",
    value: function getDevicesOfType(type) {
      var devices = this.currentModelConfig.devices.filter(function (d) {
        return d.type === type;
      });
      return devices;
    }

    /**
     * @return {VRConfig} returns the current virtual config
     */
  }, {
    key: "getCurrentConfig",
    value: function getCurrentConfig() {
      return this.currentModelConfig;
    }

    /**
     * @return {VirtualRobotModel} returns the current robot model
     */
  }, {
    key: "getCurrentModel",
    value: function getCurrentModel() {
      return this.currentModelConfig.model;
    }
  }, {
    key: "getMotorDirectionNames",
    value: function getMotorDirectionNames() {
      var motorDetail = {};
      if (this.currentModelConfig.devices.length < 1) {
        log.debug("No devices are configured");
        return null;
      }
      this.currentModelConfig.devices.forEach(function (device) {
        var deviceType = device.type;
        if (deviceType === "motor") {
          var motor = device;
          motorDetail[motor.instanceName] = motor.directions;
        }
      });
      log.debug("motorDetail:", motorDetail);
      return motorDetail;
    }
  }]);
  return VirtualRobotConfigManager;
}();
function getGivenConfig(model) {
  return _VR_Configs_vrconfigs_json__WEBPACK_IMPORTED_MODULE_2__[model];
}
var VirtualRCManager = new VirtualRobotConfigManager();
function getVirtualConstructorList() {
  var configList = new Array();
  var _iterator2 = _createForOfIteratorHelper(VirtualRCManager.getDevices()),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var device = _step2.value;
      if (device.name === "gyro") {
        continue;
      }
      configList.push("".concat(device.pyName, " = ").concat(device.className, "(\"").concat(device.instanceName, "\", ").concat(device.port, ")\n"));
      if (device.name === "pen") {
        configList.push("pen.set_pen_width(THIN)\n");
      } else if (device.name === "FrontDistance" && !getVirtualRobotModel().startsWith("viqc")) {
        configList.push("distance = front_distance\n");
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return configList;
}
function getVirtualRobotModel() {
  return VirtualRCManager.getCurrentModel();
}
function getVirtualRobotImport() {
  switch (VirtualRCManager.getCurrentModel()) {
    case "vr":
    case "vrEnhMaze":
    case "rover":
    case "vrEnh":
    case "vrAdv":
      return "vexcode_vr";
    case "viqc22":
    case "viqc23":
    case "viqc24":
      return "vexcode_viqc";
    case "vrc22":
    case "vrc23":
    case "vrc24":
      return "vexcode_vrc";
    case "vr123":
      return "vexcode_123";
    case "vrGO":
      return "vexcode_go";
    default:
      return "vexcode_vr";
  }
}


/***/ }),

/***/ "./src/RobotConfiguration/VR/Configs/vrconfigs.json":
/*!**********************************************************!*\
  !*** ./src/RobotConfiguration/VR/Configs/vrconfigs.json ***!
  \**********************************************************/
/*! exports provided: rover, vr, vrEnhMaze, vrEnh, vrAdv, vr123, vrGO, viqc22, viqc23, viqc24, vrc22, vrc23, vrc24, default */
/***/ (function(module) {

module.exports = {"rover":{"model":"rover","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"ai","name":"ai","pyName":"rover","className":"Rover","instanceName":"ai","port":1},{"type":"distance","name":"distance","pyName":"distance","className":"Distance","instanceName":"distance","port":6}]},"vr":{"model":"vr","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"pen","name":"pen","pyName":"pen","className":"Pen","instanceName":"pen","port":8},{"type":"bumper","name":"LeftBumper","pyName":"left_bumper","className":"Bumper","instanceName":"leftBumper","port":2},{"type":"bumper","name":"RightBumper","pyName":"right_bumper","className":"Bumper","instanceName":"rightBumper","port":3},{"type":"eye","name":"FrontEye","pyName":"front_eye","className":"EyeSensor","instanceName":"frontEye","port":4},{"type":"eye","name":"DownEye","pyName":"down_eye","className":"EyeSensor","instanceName":"downEye","port":5},{"type":"distance","name":"FrontDistance","pyName":"front_distance","className":"Distance","instanceName":"frontdistance","port":6},{"type":"magnet","name":"electroMagnet","pyName":"magnet","className":"Electromagnet","instanceName":"magnet","port":7},{"type":"location","name":"location","pyName":"location","className":"Location","instanceName":"location","port":9},{"type":"gyro","name":"gyro","pyName":"gyro","className":"Gyro","instanceName":"gyro","port":-1}]},"vrEnhMaze":{"model":"vrEnhMaze","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"pen","name":"pen","pyName":"pen","className":"Pen","instanceName":"pen","port":8},{"type":"eye","name":"DownEye","pyName":"down_eye","className":"EyeSensor","instanceName":"downeye","port":5},{"type":"distance","name":"FrontDistance","pyName":"front_distance","className":"Distance","instanceName":"frontdistance","port":2},{"type":"distance","name":"LeftDistance","pyName":"left_distance","className":"Distance","instanceName":"leftdistance","port":3},{"type":"distance","name":"RightDistance","pyName":"right_distance","className":"Distance","instanceName":"rightdistance","port":4},{"type":"location","name":"location","pyName":"location","className":"Location","instanceName":"location","port":9},{"type":"gyro","name":"gyro","pyName":"gyro","className":"Gyro","instanceName":"gyro","port":-1}]},"vrEnh":{"model":"vrEnh","devices":[]},"vrAdv":{"model":"vrAdv","devices":[]},"vr123":{"model":"vr123","devices":[{"type":"gyro","name":"gyro","pyName":"gyro","className":"Gyro","instanceName":"gyro","port":-1},{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"led","name":"LED","pyName":"led","className":"LED","instanceName":"LED","port":2},{"type":"eye","name":"FrontEye","pyName":"front_eye","className":"EyeSensor","instanceName":"frontEye","port":3},{"type":"location","name":"location","pyName":"location","className":"Location","instanceName":"location","port":4},{"type":"pen","name":"pen","pyName":"pen","className":"Pen","instanceName":"pen","port":5}]},"vrGO":{"model":"vrGO","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"color","name":"FrontEye","pyName":"front_eye","className":"ColorSensor","instanceName":"frontEye","port":5},{"type":"motor","name":"ArmMotor","pyName":"arm_motor","className":"Motor","instanceName":"ArmMotor","port":2,"directions":{"fwd":"forward","rev":"reverse"}},{"type":"location","name":"location","pyName":"location","className":"Location","instanceName":"location","port":9},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]},"viqc22":{"model":"viqc22","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"motor","name":"IntakeMotor","pyName":"intake_motor","className":"Motor","instanceName":"IntakeMotor","port":2,"directions":{"fwd":"outtake","rev":"intake"}},{"type":"motor","name":"CatapultMotor","pyName":"catapult_motor","className":"Motor","instanceName":"CatapultMotor","port":4,"directions":{"fwd":"forward","rev":"reverse"}},{"type":"bumper","name":"Bumper","pyName":"bumper","className":"Bumper","instanceName":"Bumper","port":5},{"type":"distance","name":"Distance","pyName":"distance","className":"Distance","instanceName":"Distance","port":6},{"type":"color","name":"Color","pyName":"color","className":"ColorSensor","instanceName":"Color","port":7},{"type":"motor","name":"CatapultTensionMotor","pyName":"catapult_tension_motor","className":"Motor","instanceName":"CatapultTensionMotor","port":8,"directions":{"fwd":"forward","rev":"reverse"}},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]},"viqc23":{"model":"viqc23","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"motor","name":"IntakeMotor","pyName":"intake_motor","className":"Motor","instanceName":"IntakeMotor","port":1,"directions":{"fwd":"outtake","rev":"intake"}},{"type":"bumper","name":"IntakeBumper","pyName":"intake_bumper","className":"Bumper","instanceName":"IntakeBumper","port":2},{"type":"distance","name":"FrontDistance","pyName":"front_distance","className":"Distance","instanceName":"FrontDistance","port":3},{"type":"optical","name":"FrontOptical","pyName":"front_optical","className":"Optical","instanceName":"FrontOptical","port":5},{"type":"motor","name":"ArmMotor","pyName":"arm_motor","className":"Motor","instanceName":"ArmMotor","port":10,"directions":{"fwd":"forward","rev":"reverse"}},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]},"viqc24":{"model":"viqc24","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"bumper","name":"IntakeBumper","pyName":"intake_bumper","className":"Bumper","instanceName":"IntakeBumper","port":3},{"type":"optical","name":"FrontOptical","pyName":"front_optical","className":"Optical","instanceName":"FrontOptical","port":4},{"type":"motor","name":"IntakeMotorGroup","pyName":"intake_motor_group","className":"Motor","instanceName":"IntakeMotorGroup","port":5,"directions":{"fwd":"outtake","rev":"intake"}},{"type":"motor","name":"ArmMotorGroup","pyName":"arm_motor_group","className":"Motor","instanceName":"ArmMotorGroup","port":6,"directions":{"fwd":"forward","rev":"reverse"}},{"type":"distance","name":"FrontDistance","pyName":"front_distance","className":"Distance","instanceName":"FrontDistance","port":9},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]},"vrc22":{"model":"vrc22","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"location","name":"GPS","pyName":"gps","className":"GPS","instanceName":"GPS","port":8},{"type":"distance","name":"DistanceLeft","pyName":"left_distance","className":"Distance","instanceName":"DistanceLeft","port":12},{"type":"distance","name":"DistanceCenter","pyName":"center_distance","className":"Distance","instanceName":"DistanceCenter","port":13},{"type":"distance","name":"DistanceRight","pyName":"right_distance","className":"Distance","instanceName":"DistanceRight","port":20},{"type":"optical","name":"Optical","pyName":"optical","className":"Optical","instanceName":"Optical","port":19},{"type":"motor","name":"ForkMotorGroup","pyName":"fork_motor_group","className":"Motor","instanceName":"ForkMotorGroup","port":9,"directions":{"rev":"up","fwd":"down"}},{"type":"bumper","name":"Bumper","pyName":"bumper","className":"Bumper","instanceName":"Bumper","port":21},{"type":"rotation","name":"Rotation","pyName":"rotation","className":"Rotation","instanceName":"Rotation","port":4},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]},"vrc23":{"model":"vrc23","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"distance","name":"BottomDistance","pyName":"bottom_distance","className":"Distance","instanceName":"BottomDistance","port":18},{"type":"optical","name":"RollerOptical","pyName":"roller_optical","className":"Optical","instanceName":"RollerOptical","port":2},{"type":"motor","name":"IntakeMotorGroup","pyName":"intake_motor_group","className":"Motor","instanceName":"IntakeMotorGroup","port":10,"directions":{"fwd":"outtake","rev":"intake"}},{"type":"linetracker","name":"BottomLineTracker","pyName":"bottom_line_tracker","className":"LineTracker","instanceName":"BottomLineTracker","port":22},{"type":"linetracker","name":"MiddleLineTracker","pyName":"middle_line_tracker","className":"LineTracker","instanceName":"MiddleLineTracker","port":23},{"type":"linetracker","name":"TopLineTracker","pyName":"top_line_tracker","className":"LineTracker","instanceName":"TopLineTracker","port":24},{"type":"location","name":"GPS","pyName":"gps","className":"GPS","instanceName":"GPS","port":3},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]},"vrc24":{"model":"vrc24","devices":[{"type":"drivetrain","name":"drivetrain","pyName":"drivetrain","className":"Drivetrain","instanceName":"drivetrain","port":0},{"type":"motor","name":"ArmMotor","pyName":"arm_motor","className":"Motor","instanceName":"ArmMotor","port":3,"directions":{"fwd":"open","rev":"close"}},{"type":"rotation","name":"Rotation","pyName":"rotation","className":"Rotation","instanceName":"Rotation","port":7},{"type":"motor","name":"IntakeMotor","pyName":"intake_motor","className":"Motor","instanceName":"IntakeMotor","port":8,"directions":{"fwd":"outtake","rev":"intake"}},{"type":"optical","name":"Optical","pyName":"optical","className":"Optical","instanceName":"Optical","port":11},{"type":"location","name":"GPS","pyName":"gps","className":"GPS","instanceName":"GPS","port":20},{"type":"gyro","name":"gyro","pyName":"gyro","instanceName":"gyro","port":-1}]}};

/***/ }),

/***/ "./src/SimWindow/SimPythonInterpreter/SimPythonInterpreterWebWorker.ts":
/*!*****************************************************************************!*\
  !*** ./src/SimWindow/SimPythonInterpreter/SimPythonInterpreterWebWorker.ts ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _appVersionInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../appVersionInfo */ "./src/appVersionInfo.ts");
/* harmony import */ var _unityMessageEnums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../unityMessageEnums */ "./src/SimWindow/unityMessageEnums.ts");
/* harmony import */ var _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SimUnity/SimMessageHelper */ "./src/SimWindow/SimUnity/SimMessageHelper.ts");
/* harmony import */ var _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SimUnity/SimSensorValues */ "./src/SimWindow/SimUnity/SimSensorValues.ts");
/* harmony import */ var _VexcodeTimer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../VexcodeTimer */ "./src/VexcodeTimer.ts");
/* harmony import */ var _messageEnums__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../messageEnums */ "./src/SimWindow/messageEnums.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _PythonPreprocessor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../PythonPreprocessor */ "./src/PythonPreprocessor.ts");
/* harmony import */ var _SimPythonSensorsAPI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SimPythonSensorsAPI */ "./src/SimWindow/SimPythonInterpreter/SimPythonSensorsAPI.ts");
/* harmony import */ var _utils_uuid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/uuid */ "./src/utils/uuid.ts");
/* harmony import */ var _RobotConfiguration_Manager_VirtualRobotConfigManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../RobotConfiguration/Manager/VirtualRobotConfigManager */ "./src/RobotConfiguration/Manager/VirtualRobotConfigManager.ts");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
// tslint:disable: only-arrow-functions


var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("SimPyodide");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();












var PromiseTimeoutError = /*#__PURE__*/function (_Error) {
  _inherits(PromiseTimeoutError, _Error);
  var _super = _createSuper(PromiseTimeoutError);
  function PromiseTimeoutError() {
    var _this;
    _classCallCheck(this, PromiseTimeoutError);
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(params)); // (1)
    _this.name = "Promise Timeout Error"; // (2)
    return _this;
  }
  return _createClass(PromiseTimeoutError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var vexImportAndTimer = "from js import vexcode_api\nvexcode_api.timerStart()\n\n";
var brainTimer = new _VexcodeTimer__WEBPACK_IMPORTED_MODULE_5__["VexcodeTimer"](0, true);
brainTimer.pause();
var projectRunning = false;
var isUnityReady = false;
var pythonReady = false;

// extend self type to prevent warnings/errors

var prafCallbacks = [];
setInterval(function () {
  var copy = _toConsumableArray(prafCallbacks);
  prafCallbacks = [];
  var len = copy.length;
  var timestamp = performance.now();
  for (var i = 0; i < len; i++) {
    copy[i](timestamp);
  }
}, 20);
var deviceInstanceNames = ["drivetrain", "brain", "distance", "left_distance", "center_distance", "right_distance", "optical", "gps", "intake_motor_group", "bumper", "magnet", "pen"];
var preprocessor;
// load pyodide
log.info("init pyodide...");
self.languagePluginUrl = "/lib/pyodide-0.17.0/";
self.pyodideUrlSuffixVersion = "".concat(Object(_appVersionInfo__WEBPACK_IMPORTED_MODULE_1__["appVersionString"])());
importScripts("/lib/pyodide-0.17.0/pyodide.js?v=".concat(Object(_appVersionInfo__WEBPACK_IMPORTED_MODULE_1__["appVersionString"])()));
languagePluginLoader.then(function () {
  // TODO: add back error handling
  log.debug("python ready");
  log.debug("pyodide version:", self.pyodide.version);
  self.pyodide.runPythonAsync(pyHeader, function () {
    log.info("something happens here?");
  }).then(function (results) {
    preprocessor = new _PythonPreprocessor__WEBPACK_IMPORTED_MODULE_8__["PythonPreprocessor"](deviceInstanceNames);
    sendPythonReady();
    log.debug("done loading base headers");
    // setHiwireErrorHandler();
  });
})["catch"](function (e) {
  log.error("error loading Pyodide...");
  log.error(e);
});
function runSyntaxCheck(_x) {
  return _runSyntaxCheck.apply(this, arguments);
}
function _runSyntaxCheck() {
  _runSyntaxCheck = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(code) {
    var escapedCode, pyCode;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          escapedCode = code.replace(/\\/g, "\\\\").replace(/"""/g, '\\"\\"\\"');
          pyCode = "\nimport io\nimport sys\n\nvexcode_syntax_check_output = io.StringIO()\n\ntry:\n    compile(\"\"\"".concat(escapedCode, "\"\"\", \"<exec>\", \"exec\")\nexcept:\n    info = sys.exc_info()\n    import traceback\n    traceback.print_exception(info[0], info[1], info[2], file=vexcode_syntax_check_output)\n");
          log.debug("pyCode:", pyCode);
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            self.pyodide.runPythonAsync(pyCode, function () {
              log.info("something happens here? but not sure what");
            }).then(function (results) {
              log.debug("check results:", results);
              var res = self.pyodide.runPython("vexcode_syntax_check_output.getvalue()");
              log.info("python syntax check result:", res);
              resolve(res);
            })["catch"](function (err) {
              log.warn("python syntax check error:", err);
              resolve(err);
            });
          }));
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _runSyntaxCheck.apply(this, arguments);
}
function sendPythonError(err) {
  log.error(err);
  err = typeof err === "string" ? err : err.toString();
  var msg = {
    command: "PythonError",
    error: err,
    source: "runtime"
  };
  self.postMessage(msg);
}
function sendPythonLinterError(err) {
  log.debug(err);
  err = typeof err === "string" ? err : err.toString();
  var msg = {
    command: "PythonError",
    error: err,
    source: "linter"
  };
  self.postMessage(msg);
}
function sendPythonReady() {
  pythonReady = true;
  log.debug("sending python ready - web worker");
  sendPythonReadyMessage();
  sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].stopped);
}
function sendPythonRunComplete() {
  sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].stopped);
}
function sendPythonRunning() {
  log.debug("pyhon running");
  sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].running);
}
function sendWatchdogReset() {
  log.debug("sending watchdog reset");
  var msg = {
    command: "InterpreterWatchdogReset"
  };
  self.postMessage(msg);
}
setInterval(sendWatchdogReset, 100);
function executePythonCode(_x2) {
  return _executePythonCode.apply(this, arguments);
}
function _executePythonCode() {
  _executePythonCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(pythonCode) {
    var syntaxCheckRes;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // TODO: preprocess here
          pythonCode = preprocessor.preprocess(pythonCode);
          log.debug("executePythonCode", pythonCode);
          if (self.pyodide) {
            _context4.next = 4;
            break;
          }
          throw new Error("Pyodide not ready");
        case 4:
          sendPythonRunning();
          _context4.next = 7;
          return runSyntaxCheck(pythonCode);
        case 7:
          syntaxCheckRes = _context4.sent;
          if (!syntaxCheckRes) {
            _context4.next = 12;
            break;
          }
          sendPythonRunComplete();
          sendPythonLinterError(syntaxCheckRes);
          return _context4.abrupt("return");
        case 12:
          sendSetPrintConsoleColor(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimPrintColorEnum"].black);
          brainTimer.reset();
          startSendVariables();
          self.pyodide.runPythonAsync(pythonCode, function () {
            log.info("something happens here?");
          }).then(function (results) {
            log.debug("done executing");
          })["catch"](function (err) {
            sendPythonRunComplete();
            sendPythonError(err);
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _executePythonCode.apply(this, arguments);
}
var robotModel = "vr";
var robotConfig = null;
self.onmessage = function messageHanlder(message) {
  var data = message.data;
  // log.debug("Python received message:", data);
  var command = data.command;
  if (command) {
    if (command === "SetGeneratedCode") {
      log.debug("SetGeneratedCode");
      handleSetGeneratedCode(data);
    } else if (command === "StartInterpreter") {
      log.debug("StartInterpreter");
      handleStartInterpreter(data);
    } else if (command === "UnityReadyUpdate") {
      handleUnityReadyUpdate(data);
    } else if (command === "StopInterpreter") {
      log.debug("StopInterpreter");
      handleStopInterpreter(data);
    } else if (command === "RobotCommandStatus") {
      // log.debug("RobotCommandStatus");
      handleRobotCommandStatus(data);
    } else if (command === "RobotSensorUpdate") {
      handleRobotSensorUpdate(data);
    } else if (command === "UnityFeedback") {
      // log.debug("handle feedback data: ", data as SimInterpreterMessageFeedback);
    } else if (command === "SetRobotModel") {
      robotModel = data.model;
    } else if (command === "SetRobotConfig") {
      robotConfig = data.config;
    }
    {
      // log.warn("unhandles command", command);
    }
  } else {
    log.warn("unexpected message", message);
  }
};

//#region sensor events
// bumper event
var bumperEventOpcode = _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIQ"] ? "iqBlocks_iq_events_when_bumper" : "v5Blocks_v5_events_when_bumper";
_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["on"]("bumperChange", function (port, name, pressed) {
  if (projectRunning) {
    self.pyodide.globals.get("sensor_events").trigger_event(port, pressed);
  }
});

// optical event
_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["on"]("opticalChange", function (port, name, detects) {
  if (projectRunning) {
    var se = self.pyodide.globals.get("sensor_events");
    self.pyodide.globals.get("sensor_events").trigger_event(port, detects);
  }
});

// misc event
_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["on"]("underAttack", function () {
  if (projectRunning) {
    self.pyodide.globals.get("brain_events").trigger_event("attack");
  }
});
_SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["on"]("levelUp", function () {
  if (projectRunning) {
    self.pyodide.globals.get("brain_events").trigger_event("level");
  }
});

//#endregion sensor events

//#region "message handlers"
var code;
function handleStartInterpreter(_x3) {
  return _handleStartInterpreter.apply(this, arguments);
}
function _handleStartInterpreter() {
  _handleStartInterpreter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(msg) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          log.debug("handleStartInterpreter");
          resetMonitoredVariablesAndSensors();
          _context5.next = 4;
          return executePythonCode(code);
        case 4:
          sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].running);
          projectRunning = true;
          if (brainTimer) {
            brainTimer.resume();
          }
          sendTimer();
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _handleStartInterpreter.apply(this, arguments);
}
var isHibernating = false;
function handleStopInterpreter(_x4) {
  return _handleStopInterpreter.apply(this, arguments);
}
function _handleStopInterpreter() {
  _handleStopInterpreter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(msg) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          log.debug("SimPythonInterpreterWebWorker - handleStopInterpreter");
          projectRunning = false;
          stopSendVariables();
          sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].stopped);
          stopSendTimer();
          if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && commandReturns["Rover"] && commandReturns["Rover"][0]) {
            delete commandReturns["Rover"][0]["hibernate"];
          }
          isHibernating = false;
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _handleStopInterpreter.apply(this, arguments);
}
function handleRobotSensorUpdate(msg) {
  // log.debug("handleRobotSensorUpdate");
  _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["updateValues"](msg.data);
}
function handleSetGeneratedCode(msg) {
  log.debug("handleSetGeneratedCode, isUnityReady: ", isUnityReady);
  sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].loading);
  code = vexImportAndTimer + msg.code;
  log.debug("handleSetGeneratedCode, code: ", code);

  // if (targetIsPlaygrounds) {
  //   const headers = getVRHeader();
  //   log.debug("loading headers");
  //   self.pyodide.runPythonAsync(headers, () => {
  //     log.info("something happens here?");
  //   })
  //   .then((results) => {
  //     log.warn("done with headers");
  //     sendInterpreterStatusMessage(isUnityReady ? SimInterpreterStateEnum.stopped : SimInterpreterStateEnum.waiting);
  //   });
  // } else {
  sendInterpreterStatusMessage(isUnityReady ? _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].stopped : _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].waiting);
  // }
}
function handleUnityReadyUpdate(_x5) {
  return _handleUnityReadyUpdate.apply(this, arguments);
} //#endregion
function _handleUnityReadyUpdate() {
  _handleUnityReadyUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(msg) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          log.debug("handleUnityReadyUpdate: ", msg.isReady);
          isUnityReady = msg.isReady;
          // If the interpreter is ready before Unity, we want to send the message
          log.debug("python ready - web worker:", pythonReady);
          if (pythonReady) {
            sendPythonReadyMessage();
            sendInterpreterStatusMessage(isUnityReady ? _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].stopped : _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].waiting);
          }
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _handleUnityReadyUpdate.apply(this, arguments);
}
function timeoutWrapper(_x6, _x7) {
  return _timeoutWrapper.apply(this, arguments);
} //#region "drivetrain"
function _timeoutWrapper() {
  _timeoutWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(prom, timeoutms) {
    var timeoutPromise;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!(!timeoutms || timeoutms <= 0)) {
            _context8.next = 2;
            break;
          }
          return _context8.abrupt("return", prom);
        case 2:
          // create a promise that will throw an error after set timeout
          timeoutPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
              reject(new PromiseTimeoutError());
            }, timeoutms);
          }); // use a race to return which ever promise completes first.
          return _context8.abrupt("return", Promise.race([prom, timeoutPromise]));
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _timeoutWrapper.apply(this, arguments);
}
function drivetrainTimeoutWrapper(_x8, _x9, _x10) {
  return _drivetrainTimeoutWrapper.apply(this, arguments);
}
function _drivetrainTimeoutWrapper() {
  _drivetrainTimeoutWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(msg, wait, timeoutms) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (!wait) {
            _context9.next = 16;
            break;
          }
          _context9.prev = 1;
          _context9.next = 4;
          return timeoutWrapper(sendCommandMessage(msg), timeoutms);
        case 4:
          _context9.next = 14;
          break;
        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](1);
          if (!(_context9.t0 instanceof PromiseTimeoutError)) {
            _context9.next = 13;
            break;
          }
          _context9.next = 11;
          return sendCommandMessage(_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop());
        case 11:
          _context9.next = 14;
          break;
        case 13:
          log.warn(_context9.t0);
        case 14:
          _context9.next = 18;
          break;
        case 16:
          _context9.next = 18;
          return sendCommandMessage(msg);
        case 18:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 6]]);
  }));
  return _drivetrainTimeoutWrapper.apply(this, arguments);
}
function drivetrainTimeoutWrapperSendCallback(_x11, _x12, _x13, _x14, _x15) {
  return _drivetrainTimeoutWrapperSendCallback.apply(this, arguments);
}
function _drivetrainTimeoutWrapperSendCallback() {
  _drivetrainTimeoutWrapperSendCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(msg, wait, timeoutms, msgSender, sendCallback) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (!wait) {
            _context10.next = 18;
            break;
          }
          _context10.prev = 1;
          _context10.next = 4;
          return timeoutWrapper(msgSender(msg, sendCallback), timeoutms);
        case 4:
          _context10.next = 16;
          break;
        case 6:
          _context10.prev = 6;
          _context10.t0 = _context10["catch"](1);
          if (!(_context10.t0 instanceof PromiseTimeoutError)) {
            _context10.next = 14;
            break;
          }
          log.debug("drivetrain timeout");
          _context10.next = 12;
          return msgSender(_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop());
        case 12:
          _context10.next = 16;
          break;
        case 14:
          log.debug("drievtrain command rejected B", _context10.t0);
          throw _context10.t0;
        case 16:
          _context10.next = 20;
          break;
        case 18:
          _context10.next = 20;
          return msgSender(msg, sendCallback);
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 6]]);
  }));
  return _drivetrainTimeoutWrapperSendCallback.apply(this, arguments);
}
function drivetrainDrive(_x16, _x17) {
  return _drivetrainDrive.apply(this, arguments);
}
function _drivetrainDrive() {
  _drivetrainDrive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(port, direction) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].drive(direction);
          _context11.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _drivetrainDrive.apply(this, arguments);
}
function drivetrainDriveFor(_x18, _x19, _x20, _x21, _x22) {
  return _drivetrainDriveFor.apply(this, arguments);
}
function _drivetrainDriveFor() {
  _drivetrainDriveFor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(port, direction, distance, wait, timeoutms) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].driveFor(direction, distance);
          msg.wait = wait;
          _context12.next = 4;
          return drivetrainTimeoutWrapper(msg, wait, timeoutms);
        case 4:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _drivetrainDriveFor.apply(this, arguments);
}
function drivetrainDriveTo(_x23, _x24, _x25, _x26) {
  return _drivetrainDriveTo.apply(this, arguments);
}
function _drivetrainDriveTo() {
  _drivetrainDriveTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(port, object, wait, timeoutms) {
    var stopMsg, key, amount, offset, direction, commandMsg, prom;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          stopMsg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop();
          _context13.next = 3;
          return sendCommandMessage(stopMsg);
        case 3:
          _context13.next = 5;
          return waitms(10);
        case 5:
          _context13.next = 7;
          return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
        case 7:
          _context13.next = 9;
          return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
        case 9:
          key = object === "minerals" ? "battery" : object;
          amount = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["getCurrentAIValue"]("vision", "Distance", {
            OBJECT: key
          });
          if (key === "base") {
            amount = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["VR"].AI.homeDistance(1);
          }

          // offset is required due to size of rover. the offset amount changes based on target
          offset = key === "enemy" ? 85 : 35;
          amount = amount - offset; // offset required due to size of rover
          direction = _unityMessageEnums__WEBPACK_IMPORTED_MODULE_2__["DrivetrainDirection"].forward;
          commandMsg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].driveFor(direction, amount);
          commandMsg.wait = wait;
          prom = drivetrainTimeoutWrapper(commandMsg, wait, timeoutms);
          if (wait) {
            _context13.next = 22;
            break;
          }
          _context13.next = 21;
          return prom;
        case 21:
          return _context13.abrupt("return", _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](10));
        case 22:
          return _context13.abrupt("return", prom);
        case 23:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return _drivetrainDriveTo.apply(this, arguments);
}
function drivetrainStop(_x27) {
  return _drivetrainStop.apply(this, arguments);
}
function _drivetrainStop() {
  _drivetrainStop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(port) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop();
          _context14.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _drivetrainStop.apply(this, arguments);
}
function drivetrainTurn(_x28, _x29) {
  return _drivetrainTurn.apply(this, arguments);
}
function _drivetrainTurn() {
  _drivetrainTurn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(port, direction) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].turn(direction);
          _context15.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _drivetrainTurn.apply(this, arguments);
}
function drivetrainTurnFor(_x30, _x31, _x32, _x33, _x34) {
  return _drivetrainTurnFor.apply(this, arguments);
}
function _drivetrainTurnFor() {
  _drivetrainTurnFor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(port, direction, degrees, wait, timeoutms) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].turnFor(direction, degrees);
          msg.wait = wait;
          _context16.next = 4;
          return drivetrainTimeoutWrapper(msg, wait, timeoutms);
        case 4:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _drivetrainTurnFor.apply(this, arguments);
}
function drivetrainTurnTo(_x35, _x36, _x37, _x38) {
  return _drivetrainTurnTo.apply(this, arguments);
}
function _drivetrainTurnTo() {
  _drivetrainTurnTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(port, object, wait, timeoutms) {
    var stopMsg, key, amount, direction, commandMsg, prom;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          stopMsg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop();
          _context17.next = 3;
          return sendCommandMessage(stopMsg);
        case 3:
          _context17.next = 5;
          return waitms(10);
        case 5:
          _context17.next = 7;
          return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
        case 7:
          _context17.next = 9;
          return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
        case 9:
          key = object === "minerals" ? "battery" : object;
          amount = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["getCurrentAIValue"]("vision", "Angle", {
            OBJECT: key
          });
          if (key === "base") {
            amount = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["VR"].AI.homeDirection(1);
          }
          direction = _unityMessageEnums__WEBPACK_IMPORTED_MODULE_2__["DrivetrainDirection"].right;
          commandMsg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].turnFor(direction, amount);
          commandMsg.wait = wait;
          prom = drivetrainTimeoutWrapper(commandMsg, wait, timeoutms);
          if (wait) {
            _context17.next = 20;
            break;
          }
          _context17.next = 19;
          return prom;
        case 19:
          return _context17.abrupt("return", _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](10));
        case 20:
          return _context17.abrupt("return", prom);
        case 21:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _drivetrainTurnTo.apply(this, arguments);
}
function drivetrainTurnToHeading(_x39, _x40, _x41, _x42) {
  return _drivetrainTurnToHeading.apply(this, arguments);
}
function _drivetrainTurnToHeading() {
  _drivetrainTurnToHeading = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(port, heading, wait, timeoutms) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].turnToHeading(heading);
          msg.wait = wait;
          _context18.next = 4;
          return drivetrainTimeoutWrapper(msg, wait, timeoutms);
        case 4:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return _drivetrainTurnToHeading.apply(this, arguments);
}
function drivetrainTurnToRotation(_x43, _x44, _x45, _x46) {
  return _drivetrainTurnToRotation.apply(this, arguments);
}
function _drivetrainTurnToRotation() {
  _drivetrainTurnToRotation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(port, rotation, wait, timeoutms) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].turnToRotation(rotation);
          msg.wait = wait;
          _context19.next = 4;
          return drivetrainTimeoutWrapper(msg, wait, timeoutms);
        case 4:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return _drivetrainTurnToRotation.apply(this, arguments);
}
var goToIdMaster = 0;
function drivetrainGoTo(_x47, _x48, _x49, _x50) {
  return _drivetrainGoTo.apply(this, arguments);
}
function _drivetrainGoTo() {
  _drivetrainGoTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(port, object, wait, timeoutms) {
    var key, AIP, aiPort, goToId, timeout, offset, getClosestObjectID, getDirection, getDistance, turnTo, driveFor;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          driveFor = function _driveFor(driveAmount) {
            log.debug("drive amount:", driveAmount);
            var drievCommandMessage = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].driveFor(_unityMessageEnums__WEBPACK_IMPORTED_MODULE_2__["DrivetrainDirection"].forward, driveAmount, true);
            return drivetrainTimeoutWrapperSendCallback(drievCommandMessage, true, timeout, sendCommandMessage, function () {});
          };
          turnTo = function _turnTo(turnAmount, sendCallback) {
            log.debug("turn amount:", turnAmount);
            var turnCommandMessage = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].turnFor(_unityMessageEnums__WEBPACK_IMPORTED_MODULE_2__["DrivetrainDirection"].right, turnAmount, true);
            return drivetrainTimeoutWrapperSendCallback(turnCommandMessage, true, timeout, sendCommandMessage, sendCallback);
          };
          getDistance = function _getDistance(id) {
            if (id === "base") {
              return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["VR"].AI.homeDistance(aiPort);
            }
            return AIP.getObjectValueByID(id, key, "Distance");
          };
          getDirection = function _getDirection(id) {
            if (id === "base") {
              return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["VR"].AI.homeDirection(aiPort);
            }
            return AIP.getObjectValueByID(id, key, "Angle");
          };
          getClosestObjectID = function _getClosestObjectID() {
            // special result for home
            if (key === "base") {
              return "base";
            }
            var object = AIP.getClosestObject("vision", key);
            if (object) {
              return object.ID;
            }
            return null;
          };
          // constants
          key = object === "minerals" ? "battery" : object;
          AIP = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["VR"].AI.processor;
          aiPort = getPortData("ai");
          goToId = goToIdMaster;
          goToIdMaster++;
          timeout = timeoutms;
          log.debug("go to object -", key, goToId, "- start - wait", wait);

          // offset is required due to size of rover. the offset amount changes based on target
          offset = key === "enemy" ? 85 : 35;
          /** will get the id of the current closest object that can be seen or null if none */
          return _context24.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(resolve, reject) {
              var stopCommandMessage, id, turnSendCallback, turnAmount, dist;
              return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                while (1) switch (_context23.prev = _context23.next) {
                  case 0:
                    // make sure we look like we are moving
                    _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["lockIsDrivingOn"](true);

                    // stop movement
                    log.debug("stop motion to make sure we get good sensor readings");
                    stopCommandMessage = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop();
                    _context23.next = 5;
                    return sendCommandMessage(stopCommandMessage);
                  case 5:
                    // wait for next sensor update
                    log.debug("wait after stop");
                    _context23.next = 8;
                    return waitms(10);
                  case 8:
                    log.debug("wait for sensor update");
                    _context23.next = 11;
                    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
                  case 11:
                    _context23.next = 13;
                    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
                  case 13:
                    // get the id for the object now that we are stable
                    id = getClosestObjectID();
                    if (id) {
                      _context23.next = 18;
                      break;
                    }
                    // nothing to drive to. clear the lock and return
                    _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["lockIsDrivingOn"](false);
                    resolve();
                    return _context23.abrupt("return");
                  case 18:
                    // this is how we return after sending the first turn command when we don't want to wait
                    turnSendCallback = /*#__PURE__*/function () {
                      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
                        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                          while (1) switch (_context20.prev = _context20.next) {
                            case 0:
                              log.debug("turn command - sent");
                              if (wait) {
                                _context20.next = 8;
                                break;
                              }
                              _context20.next = 4;
                              return waitms(20);
                            case 4:
                              _context20.next = 6;
                              return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](5);
                            case 6:
                              log.debug("go to object -", key, "- returned - no wait");
                              resolve();
                            case 8:
                            case "end":
                              return _context20.stop();
                          }
                        }, _callee20);
                      }));
                      return function turnSendCallback() {
                        return _ref4.apply(this, arguments);
                      };
                    }();
                    _context23.prev = 19;
                    // first turn
                    turnAmount = getDirection(id);
                    _context23.next = 23;
                    return turnTo(turnAmount, turnSendCallback);
                  case 23:
                    if (wait) {
                      _context23.next = 35;
                      break;
                    }
                    dist = getDistance(id) - offset; // offset is needed for rover due to size
                    _context23.prev = 25;
                    _context23.next = 28;
                    return driveFor(dist);
                  case 28:
                    log.debug("go to object -", key, goToId, "- complete - no wait");
                    _context23.next = 34;
                    break;
                  case 31:
                    _context23.prev = 31;
                    _context23.t0 = _context23["catch"](25);
                    log.debug("go to object -", key, goToId, "- complete interrupted - no wait");
                  case 34:
                    return _context23.abrupt("return");
                  case 35:
                    _context23.next = 37;
                    return new Promise( /*#__PURE__*/function () {
                      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(resolveLoop, rejectLoop) {
                        var ignoreDriveCancel, isDriving, continueLoop, driveForWrapper, _driveForWrapper, angle, _dist;
                        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                          while (1) switch (_context22.prev = _context22.next) {
                            case 0:
                              _driveForWrapper = function _driveForWrapper3() {
                                _driveForWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(driveAmount) {
                                  return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                                    while (1) switch (_context21.prev = _context21.next) {
                                      case 0:
                                        log.debug("driveForWrapper", ignoreDriveCancel, isDriving, continueLoop);
                                        _context21.prev = 1;
                                        isDriving = true;
                                        _context21.next = 5;
                                        return driveFor(driveAmount);
                                      case 5:
                                        isDriving = false;
                                        _context21.next = 16;
                                        break;
                                      case 8:
                                        _context21.prev = 8;
                                        _context21.t0 = _context21["catch"](1);
                                        isDriving = false;
                                        if (!ignoreDriveCancel) {
                                          _context21.next = 15;
                                          break;
                                        }
                                        return _context21.abrupt("return");
                                      case 15:
                                        throw _context21.t0;
                                      case 16:
                                      case "end":
                                        return _context21.stop();
                                    }
                                  }, _callee21, null, [[1, 8]]);
                                }));
                                return _driveForWrapper.apply(this, arguments);
                              };
                              driveForWrapper = function _driveForWrapper2(_x128) {
                                return _driveForWrapper.apply(this, arguments);
                              };
                              ignoreDriveCancel = false;
                              isDriving = false;
                              continueLoop = true;
                            case 5:
                              if (!continueLoop) {
                                _context22.next = 26;
                                break;
                              }
                              angle = getDirection(id);
                              _dist = getDistance(id) - offset; // offset is needed for rover due to size
                              if (!(_dist < 10)) {
                                _context22.next = 12;
                                break;
                              }
                              log.debug("reached target");
                              resolveLoop();
                              return _context22.abrupt("break", 26);
                            case 12:
                              if (!(Math.abs(angle) > 5)) {
                                _context22.next = 21;
                                break;
                              }
                              ignoreDriveCancel = true;
                              log.debug("before adjust turn:", ignoreDriveCancel, isDriving, continueLoop);
                              _context22.next = 17;
                              return turnTo(angle);
                            case 17:
                              ignoreDriveCancel = false;
                              log.debug("after adjust turn:", ignoreDriveCancel, isDriving, continueLoop);
                              _context22.next = 24;
                              break;
                            case 21:
                              if (!isDriving) {
                                driveForWrapper(_dist).then(function () {
                                  log.debug("wrapper returned", ignoreDriveCancel, isDriving, continueLoop);
                                  if (ignoreDriveCancel) {
                                    ignoreDriveCancel = false;
                                    return;
                                  }
                                  continueLoop = false;
                                  resolveLoop();
                                })["catch"](function (err) {
                                  log.debug("wrapper rejected", ignoreDriveCancel, isDriving, continueLoop);
                                  continueLoop = false;
                                  resolveLoop();
                                });
                              }
                              _context22.next = 24;
                              return waitms(500);
                            case 24:
                              _context22.next = 5;
                              break;
                            case 26:
                            case "end":
                              return _context22.stop();
                          }
                        }, _callee22);
                      }));
                      return function (_x126, _x127) {
                        return _ref5.apply(this, arguments);
                      };
                    }());
                  case 37:
                    log.debug("wait after stop");
                    _context23.next = 40;
                    return waitms(15);
                  case 40:
                    log.debug("wait for sensor update");
                    _context23.next = 43;
                    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["waitForSensorUpdateMin"](3);
                  case 43:
                    // we have either reached our target or the command was interrupted
                    _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["lockIsDrivingOn"](false);
                    log.debug("go to object -", key, goToId, "- complete - wait");
                    resolve();
                    _context23.next = 53;
                    break;
                  case 48:
                    _context23.prev = 48;
                    _context23.t1 = _context23["catch"](19);
                    log.debug(_context23.t1);
                    _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__["lockIsDrivingOn"](false);
                    resolve();
                  case 53:
                  case "end":
                    return _context23.stop();
                }
              }, _callee23, null, [[19, 48], [25, 31]]);
            }));
            return function (_x124, _x125) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 14:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return _drivetrainGoTo.apply(this, arguments);
}
function drivetrainSetDriveVelocity(_x51, _x52) {
  return _drivetrainSetDriveVelocity.apply(this, arguments);
}
function _drivetrainSetDriveVelocity() {
  _drivetrainSetDriveVelocity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(port, velocity) {
    var val, msg;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          val = velocity;
          if (val < 1) {
            val = 1;
          } else if (val > 100) {
            val = 100;
          }
          if (getRobotModel() === "rover") {
            val = mapRange(velocity, 0, 100, 0, 300);
          }
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].setDriveSpeed(val);
          _context25.next = 6;
          return sendCommandMessage(msg);
        case 6:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  }));
  return _drivetrainSetDriveVelocity.apply(this, arguments);
}
function drivetrainSetTurnVelocity(_x53, _x54) {
  return _drivetrainSetTurnVelocity.apply(this, arguments);
}
function _drivetrainSetTurnVelocity() {
  _drivetrainSetTurnVelocity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(port, velocity) {
    var val, msg;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          val = velocity;
          if (val < 1) {
            val = 1;
          } else if (val > 100) {
            val = 100;
          }
          if (getRobotModel() === "rover") {
            val = mapRange(velocity, 0, 100, 0, 300);
          }
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].setTurnSpeed(val);
          _context26.next = 6;
          return sendCommandMessage(msg);
        case 6:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return _drivetrainSetTurnVelocity.apply(this, arguments);
}
function drivetrainSetDriveHeading(_x55, _x56) {
  return _drivetrainSetDriveHeading.apply(this, arguments);
}
function _drivetrainSetDriveHeading() {
  _drivetrainSetDriveHeading = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(port, heading) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].setHeading(heading);
          _context27.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return _drivetrainSetDriveHeading.apply(this, arguments);
}
function drivetrainSetDriveRotation(_x57, _x58) {
  return _drivetrainSetDriveRotation.apply(this, arguments);
} //#endregion
//#region "motor"
function _drivetrainSetDriveRotation() {
  _drivetrainSetDriveRotation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(port, rotation) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].setRotation(rotation, port);
          _context28.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context28.stop();
      }
    }, _callee28);
  }));
  return _drivetrainSetDriveRotation.apply(this, arguments);
}
function motorTimeoutWrapper(_x59, _x60, _x61, _x62) {
  return _motorTimeoutWrapper.apply(this, arguments);
}
function _motorTimeoutWrapper() {
  _motorTimeoutWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(port, msg, wait, timeoutms) {
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          if (!wait) {
            _context29.next = 16;
            break;
          }
          _context29.prev = 1;
          _context29.next = 4;
          return timeoutWrapper(sendCommandMessage(msg), timeoutms);
        case 4:
          _context29.next = 14;
          break;
        case 6:
          _context29.prev = 6;
          _context29.t0 = _context29["catch"](1);
          if (!(_context29.t0 instanceof PromiseTimeoutError)) {
            _context29.next = 13;
            break;
          }
          _context29.next = 11;
          return sendCommandMessage(_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].stop(port));
        case 11:
          _context29.next = 14;
          break;
        case 13:
          log.warn(_context29.t0);
        case 14:
          _context29.next = 18;
          break;
        case 16:
          _context29.next = 18;
          return sendCommandMessage(msg);
        case 18:
        case "end":
          return _context29.stop();
      }
    }, _callee29, null, [[1, 6]]);
  }));
  return _motorTimeoutWrapper.apply(this, arguments);
}
function motorSpin(_x63, _x64) {
  return _motorSpin.apply(this, arguments);
}
function _motorSpin() {
  _motorSpin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(port, direction) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].spin(port, direction);
          _context30.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context30.stop();
      }
    }, _callee30);
  }));
  return _motorSpin.apply(this, arguments);
}
function motorSpinFor(_x65, _x66, _x67, _x68, _x69) {
  return _motorSpinFor.apply(this, arguments);
}
function _motorSpinFor() {
  _motorSpinFor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(port, direction, amount, wait, timeoutms) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          log.debug("spin for amount: ", amount);
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].spinFor(port, direction, amount);
          msg.wait = wait;
          _context31.next = 5;
          return motorTimeoutWrapper(port, msg, wait, timeoutms);
        case 5:
        case "end":
          return _context31.stop();
      }
    }, _callee31);
  }));
  return _motorSpinFor.apply(this, arguments);
}
function motorSpinTo(_x70, _x71, _x72, _x73) {
  return _motorSpinTo.apply(this, arguments);
}
function _motorSpinTo() {
  _motorSpinTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(port, position, wait, timeoutms) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].spinTo(port, position, wait);
          msg.wait = wait;
          _context32.next = 4;
          return motorTimeoutWrapper(port, msg, wait, timeoutms);
        case 4:
        case "end":
          return _context32.stop();
      }
    }, _callee32);
  }));
  return _motorSpinTo.apply(this, arguments);
}
function motorStop(_x74) {
  return _motorStop.apply(this, arguments);
}
function _motorStop() {
  _motorStop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(port) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].stop(port);
          _context33.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context33.stop();
      }
    }, _callee33);
  }));
  return _motorStop.apply(this, arguments);
}
function motorSetPosition(_x75, _x76) {
  return _motorSetPosition.apply(this, arguments);
}
function _motorSetPosition() {
  _motorSetPosition = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(port, position) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].setPosition(port, position);
          _context34.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context34.stop();
      }
    }, _callee34);
  }));
  return _motorSetPosition.apply(this, arguments);
}
function motorSetVelocity(_x77, _x78) {
  return _motorSetVelocity.apply(this, arguments);
} //#endregion
//#region "magnet"
function _motorSetVelocity() {
  _motorSetVelocity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(port, velocity) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].setVelocity(port, velocity);
          _context35.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context35.stop();
      }
    }, _callee35);
  }));
  return _motorSetVelocity.apply(this, arguments);
}
function magnetEnergize(_x79, _x80) {
  return _magnetEnergize.apply(this, arguments);
} //#endregion
//#region "gyro"
function _magnetEnergize() {
  _magnetEnergize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(port, state) {
    var devicePort, msg;
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          // TODO: Change port to not be hardcoded
          devicePort = port ? port : 7;
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Electromagnet"].setState(state, devicePort);
          _context36.next = 4;
          return sendCommandMessage(msg);
        case 4:
        case "end":
          return _context36.stop();
      }
    }, _callee36);
  }));
  return _magnetEnergize.apply(this, arguments);
}
function gyroSetHeading(_x81, _x82, _x83) {
  return _gyroSetHeading.apply(this, arguments);
}
function _gyroSetHeading() {
  _gyroSetHeading = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(port, heading, units) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Gyro"].setHeading(port, heading, units);
          _context37.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context37.stop();
      }
    }, _callee37);
  }));
  return _gyroSetHeading.apply(this, arguments);
}
function gyroSetRotation(_x84, _x85, _x86) {
  return _gyroSetRotation.apply(this, arguments);
}
function _gyroSetRotation() {
  _gyroSetRotation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38(port, rotation, units) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Gyro"].setRotation(port, rotation, units);
          _context38.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context38.stop();
      }
    }, _callee38);
  }));
  return _gyroSetRotation.apply(this, arguments);
}
function gyroCalibrate(_x87, _x88) {
  return _gyroCalibrate.apply(this, arguments);
} //#endregion
//#region "inertial"
function _gyroCalibrate() {
  _gyroCalibrate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39(port, type) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Gyro"].calibrate(port, type);
          _context39.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context39.stop();
      }
    }, _callee39);
  }));
  return _gyroCalibrate.apply(this, arguments);
}
function inertialSetHeading(_x89, _x90, _x91) {
  return _inertialSetHeading.apply(this, arguments);
}
function _inertialSetHeading() {
  _inertialSetHeading = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(port, heading, units) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Inertial"].setHeading(port, heading, units);
          _context40.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context40.stop();
      }
    }, _callee40);
  }));
  return _inertialSetHeading.apply(this, arguments);
}
function inertialSetRotation(_x92, _x93, _x94) {
  return _inertialSetRotation.apply(this, arguments);
}
function _inertialSetRotation() {
  _inertialSetRotation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41(port, rotation, units) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee41$(_context41) {
      while (1) switch (_context41.prev = _context41.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Inertial"].setRotation(port, rotation, units);
          _context41.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context41.stop();
      }
    }, _callee41);
  }));
  return _inertialSetRotation.apply(this, arguments);
}
function inertialCalibrate(_x95) {
  return _inertialCalibrate.apply(this, arguments);
} //#endregion
//#region "pen"
function _inertialCalibrate() {
  _inertialCalibrate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(port) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Inertial"].calibrate(port);
          _context42.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context42.stop();
      }
    }, _callee42);
  }));
  return _inertialCalibrate.apply(this, arguments);
}
function penMovePen(_x96, _x97) {
  return _penMovePen.apply(this, arguments);
}
function _penMovePen() {
  _penMovePen = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(port, state) {
    var devicePort, msg;
    return _regeneratorRuntime().wrap(function _callee43$(_context43) {
      while (1) switch (_context43.prev = _context43.next) {
        case 0:
          // TODO: Change port to not be hardcoded
          devicePort = port ? port : 8;
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Looks"].movePen(state, devicePort);
          _context43.next = 4;
          return sendCommandMessage(msg);
        case 4:
        case "end":
          return _context43.stop();
      }
    }, _callee43);
  }));
  return _penMovePen.apply(this, arguments);
}
function penSetColor(_x98, _x99) {
  return _penSetColor.apply(this, arguments);
}
function _penSetColor() {
  _penSetColor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(port, state) {
    var devicePort, msg;
    return _regeneratorRuntime().wrap(function _callee44$(_context44) {
      while (1) switch (_context44.prev = _context44.next) {
        case 0:
          // TODO: Change port to not be hardcoded
          devicePort = port ? port : 8;
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Looks"].setPen(state, devicePort);
          _context44.next = 4;
          return sendCommandMessage(msg);
        case 4:
        case "end":
          return _context44.stop();
      }
    }, _callee44);
  }));
  return _penSetColor.apply(this, arguments);
}
function penSetWidth(_x100, _x101) {
  return _penSetWidth.apply(this, arguments);
}
function _penSetWidth() {
  _penSetWidth = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(port, state) {
    var size, devicePort, msg;
    return _regeneratorRuntime().wrap(function _callee45$(_context45) {
      while (1) switch (_context45.prev = _context45.next) {
        case 0:
          log.debug("pen width:", state);
          size = 5; // TODO: move this to a common place
          _context45.t0 = state;
          _context45.next = _context45.t0 === _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["PenWidth"].extraSmall ? 5 : _context45.t0 === _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["PenWidth"].small ? 7 : _context45.t0 === _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["PenWidth"].normal ? 9 : _context45.t0 === _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["PenWidth"].wide ? 11 : _context45.t0 === _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["PenWidth"].extraWide ? 13 : 15;
          break;
        case 5:
          size = 5;
          return _context45.abrupt("break", 15);
        case 7:
          size = 20;
          return _context45.abrupt("break", 15);
        case 9:
          size = 40;
          return _context45.abrupt("break", 15);
        case 11:
          size = 60;
          return _context45.abrupt("break", 15);
        case 13:
          size = 80;
          return _context45.abrupt("break", 15);
        case 15:
          // TODO: Change port to not be hardcoded
          devicePort = port ? port : 8;
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Looks"].setPenWidth(size, devicePort);
          _context45.next = 19;
          return sendCommandMessage(msg);
        case 19:
        case "end":
          return _context45.stop();
      }
    }, _callee45);
  }));
  return _penSetWidth.apply(this, arguments);
}
function penSetColorRGB(_x102, _x103, _x104, _x105, _x106) {
  return _penSetColorRGB.apply(this, arguments);
}
function _penSetColorRGB() {
  _penSetColorRGB = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(port, r, g, b, a) {
    var devicePort, msg;
    return _regeneratorRuntime().wrap(function _callee46$(_context46) {
      while (1) switch (_context46.prev = _context46.next) {
        case 0:
          // TODO: Change port to not be hardcoded
          devicePort = port ? port : 8;
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Looks"].setPenColorPlus(r, g, b, a, devicePort);
          _context46.next = 4;
          return sendCommandMessage(msg);
        case 4:
        case "end":
          return _context46.stop();
      }
    }, _callee46);
  }));
  return _penSetColorRGB.apply(this, arguments);
}
function penFill(_x107, _x108, _x109, _x110, _x111) {
  return _penFill.apply(this, arguments);
} //#endregion
//#region "print commands"
function _penFill() {
  _penFill = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(port, r, g, b, a) {
    var devicePort, msg;
    return _regeneratorRuntime().wrap(function _callee47$(_context47) {
      while (1) switch (_context47.prev = _context47.next) {
        case 0:
          // TODO: Change port to not be hardcoded
          devicePort = port ? port : 8;
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Looks"].fillPenColorPlus(r, g, b, a, devicePort);
          _context47.next = 4;
          return sendCommandMessage(msg);
        case 4:
        case "end":
          return _context47.stop();
      }
    }, _callee47);
  }));
  return _penFill.apply(this, arguments);
}
function sendPrintText(text) {
  sendPrintToConsole(text);
}
function sendPrintNewLine() {
  sendNewLineToConsole();
}
function sendPrintSetColor(textColor) {
  var textColorEnum = _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimPrintColorEnum"].black;
  if (textColor === "RED") {
    textColorEnum = _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimPrintColorEnum"].red;
  } else if (textColor === "GREEN") {
    textColorEnum = _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimPrintColorEnum"].green;
  } else if (textColor === "BLUE") {
    textColorEnum = _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimPrintColorEnum"].blue;
  }
  sendSetPrintConsoleColor(textColorEnum);
}
function sendPrintClearLines() {
  sendClearPrintConsole();
}
//#endregion

//#region "mixed-mode block highlighting"
function sendHighlightUpdates(updates) {
  var msg = {
    command: "HighlightUpdate",
    updates: updates
  };
  self.postMessage(msg);
}
var activeBlocks = [];
var changeBlocks = {};
function clearActiveBlockList() {
  activeBlocks = [];
  changeBlocks = {};
}
clearActiveBlockList();
function highlightBlock(blockId) {
  log.debug("highlight", blockId);
  if (activeBlocks.indexOf(blockId) === -1) {
    activeBlocks.push(blockId);
  }
  changeBlocks[blockId] = _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimHighlightState"].active;
}
function unhighlightBlock(blockId) {
  log.debug("unhighlight", blockId);
  var index = activeBlocks.indexOf(blockId);
  if (index >= 0) {
    activeBlocks.splice(index, 1);
    changeBlocks[blockId] = _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimHighlightState"].inactive;
  }
}
function sendHighlightUpdate() {
  var changes = Object.assign({}, changeBlocks);
  changeBlocks = {};
  var changeIds = Object.keys(changes);
  var changeLen = changeIds.length;
  if (changeIds.length > 0) {
    var list = [];
    for (var i = 0; i < changeLen; i++) {
      var changeId = changeIds[i];
      list.push({
        id: changeId,
        state: changes[changeId]
      });
    }
    sendHighlightUpdates(list);
  }
}
setInterval(sendHighlightUpdate, 10);
//#endregion "mixed-mode block highlighting"

//#region "monitoring system"
var sendVariablesInterval = null;
function startSendVariables() {
  log.debug("startSendVariables");
  sendVariablesInterval = self.setInterval(sendVariablesToMonitor, 50);
}
function stopSendVariables() {
  if (sendVariablesInterval) {
    log.debug("stopSendVariables");
    clearInterval(sendVariablesInterval);
    sendVariablesInterval = null;
  }
}
var monitoredVariables = [];
var monitoredSensors = [];
function addVariableToMonitor(variableName) {
  if (!monitoredVariables.includes(variableName)) {
    monitoredVariables.push(variableName);
  }
}
function addSensorToMonitor(sensorName) {
  log.debug("addSensorToMonitor:", sensorName);
  var pythonSensorNameLookup = _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] ? pythonVRSensorNameLookup : _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIQ"] ? pythonVSIQSensorNameLookup : pythonVSSensorNameLookup;
  var mapped = pythonSensorNameLookup[sensorName];
  if (mapped) {
    if (typeof mapped === "string") {
      mapped = [mapped];
    }
    var updated = false;
    mapped.forEach(function (sensor) {
      if (!monitoredSensors.includes(sensor)) {
        monitoredSensors.push(sensor);
        updated = true;
      }
    });
    if (updated) {
      sendSensorsToMonitor();
    }
  }
}
function resetMonitoredVariablesAndSensors() {
  monitoredVariables = [];
  monitoredSensors = [];
  sendSensorsToMonitor();
}
function getMonitoredVariables() {
  var output = [];
  monitoredVariables.forEach(function (varName) {
    var varValue = self.pyodide.globals[varName];
    var varInfo = {
      name: varName,
      label: varName,
      value: varValue
    };
    if (_typeof(varValue) === "object") {
      varInfo.value = varValue.toJs();
    }
    output.push(varInfo);
  });
  return output;
}
function sendVariablesToMonitor() {
  var msg = {
    command: "VariableUpdates",
    data: getMonitoredVariables()
  };
  self.postMessage(msg);
}
function sendSensorsToMonitor() {
  var msg = {
    command: "SensorsToMonitor",
    data: monitoredSensors
  };
  self.postMessage(msg);
}
//#endregion

//#region "brain timer"
function getTimer() {
  return brainTimer.getTime();
}
function resetTimer() {
  brainTimer.reset();
}
//#endregion

//#region "control"
function stopProject() {
  if (brainTimer) {
    brainTimer.stop();
  }
  sendProgramMessage({
    device: "program",
    command: "stop"
  });
  sendInterpreterStatusMessage(_messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"].stopped);
  sendCommandMessage(_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Drivetrain"].stop(_RobotConfiguration_Manager_VirtualRobotConfigManager__WEBPACK_IMPORTED_MODULE_11__["VirtualRCManager"].getDevicesOfType("drivetrain")[0].port));
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIQ"]) {
    var motorPorts = [2, 4, 8];
    motorPorts.forEach( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(port) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return sendCommandMessage(_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].stop(port));
            case 2:
              return _context.abrupt("return", _context.sent);
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x112) {
        return _ref.apply(this, arguments);
      };
    }());
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsV5"]) {
    var _motorPorts = [9];
    _motorPorts.forEach( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(port) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return sendCommandMessage(_SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Motor"].stop(port));
            case 2:
              return _context2.abrupt("return", _context2.sent);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x113) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
}
//#endregion

//#region "brain"
function pickup(_x114) {
  return _pickup.apply(this, arguments);
}
function _pickup() {
  _pickup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(object) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee48$(_context48) {
      while (1) switch (_context48.prev = _context48.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Actions"].interact("pickup");
          _context48.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context48.stop();
      }
    }, _callee48);
  }));
  return _pickup.apply(this, arguments);
}
function drop(_x115) {
  return _drop.apply(this, arguments);
}
function _drop() {
  _drop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49(object) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee49$(_context49) {
      while (1) switch (_context49.prev = _context49.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Actions"].interact("drop");
          _context49.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context49.stop();
      }
    }, _callee49);
  }));
  return _drop.apply(this, arguments);
}
function use(_x116) {
  return _use.apply(this, arguments);
}
function _use() {
  _use = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50(object) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee50$(_context50) {
      while (1) switch (_context50.prev = _context50.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Actions"].interact("recharge");
          _context50.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context50.stop();
      }
    }, _callee50);
  }));
  return _use.apply(this, arguments);
}
function absorb_radiation(_x117) {
  return _absorb_radiation.apply(this, arguments);
}
function _absorb_radiation() {
  _absorb_radiation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee51(target) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee51$(_context51) {
      while (1) switch (_context51.prev = _context51.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Actions"].interact("attack");
          _context51.next = 3;
          return sendCommandMessage(msg);
        case 3:
        case "end":
          return _context51.stop();
      }
    }, _callee51);
  }));
  return _absorb_radiation.apply(this, arguments);
}
function standby(_x118, _x119) {
  return _standby.apply(this, arguments);
} //#endregion "brain"
//#region "vr timer"
function _standby() {
  _standby = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee52(port, percent) {
    var threshold, commandMessage;
    return _regeneratorRuntime().wrap(function _callee52$(_context52) {
      while (1) switch (_context52.prev = _context52.next) {
        case 0:
          threshold = percent < 0 ? 0 : percent;
          commandMessage = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Actions"].standby(threshold);
          _context52.next = 4;
          return sendCommandMessage(commandMessage);
        case 4:
        case "end":
          return _context52.stop();
      }
    }, _callee52);
  }));
  return _standby.apply(this, arguments);
}
function timerStart() {
  return _timerStart.apply(this, arguments);
}
function _timerStart() {
  _timerStart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee53() {
    var msg;
    return _regeneratorRuntime().wrap(function _callee53$(_context53) {
      while (1) switch (_context53.prev = _context53.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Timer"].start();
          sendTimerMessage(msg);
        case 2:
        case "end":
          return _context53.stop();
      }
    }, _callee53);
  }));
  return _timerStart.apply(this, arguments);
}
function timerStop() {
  return _timerStop.apply(this, arguments);
}
function _timerStop() {
  _timerStop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee54() {
    var msg;
    return _regeneratorRuntime().wrap(function _callee54$(_context54) {
      while (1) switch (_context54.prev = _context54.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Timer"].stop();
          sendTimerMessage(msg);
        case 2:
        case "end":
          return _context54.stop();
      }
    }, _callee54);
  }));
  return _timerStop.apply(this, arguments);
}
function timerReset() {
  return _timerReset.apply(this, arguments);
} //#endregion
//#region "message sending"
function _timerReset() {
  _timerReset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee55() {
    var msg;
    return _regeneratorRuntime().wrap(function _callee55$(_context55) {
      while (1) switch (_context55.prev = _context55.next) {
        case 0:
          msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_3__["Timer"].reset();
          sendTimerMessage(msg);
        case 2:
        case "end":
          return _context55.stop();
      }
    }, _callee55);
  }));
  return _timerReset.apply(this, arguments);
}
var lastCommands = {};
function updateLastCommand(cmd) {
  var deviceName = cmd.command.device;
  var port = cmd.command.port ? cmd.command.port : 0;
  if (lastCommands[deviceName]) {
    lastCommands[deviceName][port] = cmd;
  } else {
    lastCommands[deviceName] = {
      port: cmd
    };
  }
}
function isSameCommand(cmd) {
  var deviceName = cmd.command.device;
  var port = cmd.command.port ? cmd.command.port : 0;
  if (!lastCommands[deviceName]) {
    lastCommands[deviceName] = {};
  }
  var lastCommand = lastCommands[deviceName][port];
  if (!lastCommand || cmd.wait !== lastCommand.wait || cmd.command.device !== lastCommand.command.device || cmd.command.command !== lastCommand.command.command) {
    return false;
  }
  var res = JSON.stringify(lastCommand.command.param) === JSON.stringify(cmd.command.param);
  return res;
}
function sendCommandMessage(_x120, _x121) {
  return _sendCommandMessage.apply(this, arguments);
}
function _sendCommandMessage() {
  _sendCommandMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee56(msg, sentCallback) {
    var isSame, cmd;
    return _regeneratorRuntime().wrap(function _callee56$(_context56) {
      while (1) switch (_context56.prev = _context56.next) {
        case 0:
          if (!(msg.preventDuplicate && isHibernating)) {
            _context56.next = 3;
            break;
          }
          if (sentCallback) {
            sentCallback();
          }
          return _context56.abrupt("return");
        case 3:
          isSame = msg.preventDuplicate && isSameCommand(msg);
          updateLastCommand(msg);
          if (!isSame) {
            _context56.next = 8;
            break;
          }
          if (sentCallback) {
            sentCallback();
          }
          return _context56.abrupt("return");
        case 8:
          cmd = msg.command.command;
          if (msg.command.device === "drivetrain") {
            log.debug("sending command:", cmd, msg.command.param, msg.wait);
          }
          _context56.next = 12;
          return sendCommand(msg.command, msg.wait, sentCallback);
        case 12:
          if (msg.command.device === "drivetrain") {
            log.debug("sent command:", cmd, msg.command.param, msg.wait);
          }
        case 13:
        case "end":
          return _context56.stop();
      }
    }, _callee56);
  }));
  return _sendCommandMessage.apply(this, arguments);
}
var commandReturns = {};
function sendCommand(_x122) {
  return _sendCommand.apply(this, arguments);
}
function _sendCommand() {
  _sendCommand = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee57(command) {
    var wait,
      sentCallback,
      _args57 = arguments;
    return _regeneratorRuntime().wrap(function _callee57$(_context57) {
      while (1) switch (_context57.prev = _context57.next) {
        case 0:
          wait = _args57.length > 1 && _args57[1] !== undefined ? _args57[1] : true;
          sentCallback = _args57.length > 2 ? _args57[2] : undefined;
          return _context57.abrupt("return", new Promise(function (resolve, reject) {
            var deviceName = command.device;
            var commandName = command.command;
            var port = command.port ? command.port : 0;
            // make sure we reject a promise if it has not already been cleared
            if (!commandReturns[deviceName]) {
              commandReturns[deviceName] = {};
            }
            if (!commandReturns[deviceName][port]) {
              commandReturns[deviceName][port] = {};
            } else {
              // since some commands should reject any existing commands for a device
              // we have this flag and logic
              if (!!command.rejectAllDeviceCommands) {
                var promises = commandReturns[deviceName][port];
                for (var _command in promises) {
                  if (Object.prototype.hasOwnProperty.call(promises, _command)) {
                    promises[_command].reject();
                    delete promises[_command];
                  }
                }
              } else {
                if (commandReturns[deviceName][port][commandName]) {
                  commandReturns[deviceName][port][commandName].reject();
                }
              }
            }
            var id = Object(_utils_uuid__WEBPACK_IMPORTED_MODULE_10__["generateShortUUID"])();
            // store the promise resolve/rejcet functions
            commandReturns[deviceName][port][commandName] = {
              resolve: resolve,
              reject: reject,
              id: id
            };
            if (deviceName === "Rover" && commandName === "hibernate") {
              isHibernating = true;
            }
            setTimeout(function () {
              sendRobotCommand(command.device, command.command, command.param, command.port, id);
              log.debug("posted command message", command.device, command.command, id);
              if (sentCallback) {
                sentCallback();
              }
              if (!wait) {
                resolve();
                if (!command.skipIfExistingSent) {
                  delete commandReturns[deviceName][port][commandName];
                }
              }
            }, 0);
          }));
        case 3:
        case "end":
          return _context57.stop();
      }
    }, _callee57);
  }));
  return _sendCommand.apply(this, arguments);
}
function sendRobotCommand(device, instruction, param, port, id) {
  var msg = {
    command: "RobotCommand",
    device: device,
    instruction: instruction,
    param: param,
    port: port,
    id: id
  };
  log.debug("sendRobotCommand: ", msg);
  self.postMessage(msg);
}
function handleRobotCommandStatus(msg) {
  var deviceName = msg.device;
  var commandName = msg.instruction;
  var port = msg.port ? msg.port : 0;
  if (deviceName === "Rover" && commandName === "hibernate") {
    log.debug("got hibernate status", msg);
    isHibernating = false;
  }
  if (commandReturns[deviceName] && commandReturns[deviceName][port] && commandReturns[deviceName][port][commandName]) {
    var id = msg.id;
    var promData = commandReturns[deviceName][port][commandName];
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"] && (id === promData.id || !id)) {
      promData.resolve();
      delete commandReturns[deviceName][port][commandName];
    } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsNotPlaygrounds"]) {
      promData.resolve();
      delete commandReturns[deviceName][port][commandName];
    }
  }
}
var printActionQueue = [];
function sendPrintToConsole(text) {
  var last = printActionQueue[printActionQueue.length - 1];
  if (last && last.action === "print") {
    last.text += text;
  } else {
    var _msg = {
      action: "print",
      text: text
    };
    printActionQueue.push(_msg);
  }
}
function sendNewLineToConsole() {
  var msg = {
    action: "newline"
  };
  printActionQueue.push(msg);
}
function sendClearPrintConsole() {
  var msg = {
    action: "clear"
  };
  printActionQueue = printActionQueue.filter(function (a) {
    return a.action === "color";
  });
  printActionQueue.push(msg);
}
function sendSetPrintConsoleColor(consoleColor) {
  var msg = {
    action: "color",
    color: consoleColor
  };
  printActionQueue.push(msg);
}
setInterval(sentPrintQueue, 30);
function sentPrintQueue() {
  if (printActionQueue.length > 0) {
    var actions = printActionQueue.slice();
    printActionQueue = [];
    var _msg2 = {
      command: "PrintUpdate",
      actions: actions
    };
    self.postMessage(_msg2);
  }
}
function sendInterpreterStatusMessage(status) {
  var msg = {
    command: "InterpreterStatus",
    status: status
  };
  log.info("sendInterpreterStatusMessage", _messageEnums__WEBPACK_IMPORTED_MODULE_6__["SimInterpreterStateEnum"][status], msg);
  self.postMessage(msg);
}
function sendPythonReadyMessage() {
  var msg = {
    command: "PythonReadyUpdate",
    isReady: pythonReady
  };
  self.postMessage(msg);
}
function sendInterpreterResetMessage() {
  var msg = {
    command: "ResetInterpreter"
  };
  log.info("sendInterpreterResetMessage");
  self.postMessage(msg);
}
function sendTimerMessage(timerMessage) {
  var msg = {
    command: "TimerCommand",
    device: timerMessage.device,
    instruction: timerMessage.command
  };
  self.postMessage(msg);
}
function sendProgramMessage(programMessage) {
  var msg = {
    command: "ProgramCommand",
    device: programMessage.device,
    instruction: programMessage.command
  };
  self.postMessage(msg);
}
var sendTimerInterval = null;
function sendTimerTimeMessage() {
  var msg = {
    command: "TimerUpdate",
    data: getTimer()
  };
  self.postMessage(msg);
}
function sendTimer() {
  if (projectRunning) {
    log.debug("sendTimer");
    sendTimerInterval = self.setInterval(sendTimerTimeMessage, 50);
  }
}
function stopSendTimer() {
  if (sendTimerInterval) {
    log.debug("stopSendTimer");
    clearInterval(sendTimerInterval);
    sendTimerInterval = null;
  }
}

//#endregion

//#region utils
function waitms(_x123) {
  return _waitms.apply(this, arguments);
}
function _waitms() {
  _waitms = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee58(ms) {
    return _regeneratorRuntime().wrap(function _callee58$(_context58) {
      while (1) switch (_context58.prev = _context58.next) {
        case 0:
          return _context58.abrupt("return", new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
          }));
        case 1:
        case "end":
          return _context58.stop();
      }
    }, _callee58);
  }));
  return _waitms.apply(this, arguments);
}
function getRobotModel() {
  return robotModel;
}
function getRobotConfig() {
  return robotConfig;
}
function mapRange(value, x1, y1, x2, y2) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}
function getPortData(deviceName) {
  var config = getRobotConfig();
  var port = 0;
  config.devices.forEach(function (dist) {
    if (dist.instanceName.toLowerCase() === deviceName) {
      port = dist.port;
    }
  });
  return port;
}
//#endregion utils

self.sendCommandMessage = sendCommandMessage;
self.vexcode_api = {
  getTimer: getTimer,
  resetTimer: resetTimer,
  sendPrintText: sendPrintText,
  sendPrintNewLine: sendPrintNewLine,
  sendPrintSetColor: sendPrintSetColor,
  sendPrintClearLines: sendPrintClearLines,
  sendPythonError: sendPythonError,
  sendPythonRunComplete: sendPythonRunComplete,
  SensorValues: _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_4__,
  motorSpin: motorSpin,
  motorSpinFor: motorSpinFor,
  motorSpinTo: motorSpinTo,
  motorStop: motorStop,
  motorSetPosition: motorSetPosition,
  motorSetVelocity: motorSetVelocity,
  drivetrainDrive: drivetrainDrive,
  drivetrainDriveFor: drivetrainDriveFor,
  drivetrainDriveTo: drivetrainDriveTo,
  drivetrainStop: drivetrainStop,
  drivetrainTurn: drivetrainTurn,
  drivetrainTurnFor: drivetrainTurnFor,
  drivetrainTurnTo: drivetrainTurnTo,
  drivetrainTurnToHeading: drivetrainTurnToHeading,
  drivetrainTurnToRotation: drivetrainTurnToRotation,
  drivetrainGoTo: drivetrainGoTo,
  drivetrainSetDriveVelocity: drivetrainSetDriveVelocity,
  drivetrainSetTurnVelocity: drivetrainSetTurnVelocity,
  drivetrainSetDriveHeading: drivetrainSetDriveHeading,
  drivetrainSetDriveRotation: drivetrainSetDriveRotation,
  gyroSetHeading: gyroSetHeading,
  gyroSetRotation: gyroSetRotation,
  gyroCalibrate: gyroCalibrate,
  inertialSetHeading: inertialSetHeading,
  inertialSetRotation: inertialSetRotation,
  inertialCalibrate: inertialCalibrate,
  penMovePen: penMovePen,
  penSetColor: penSetColor,
  penSetWidth: penSetWidth,
  penSetColorRGB: penSetColorRGB,
  penFill: penFill,
  magnetEnergize: magnetEnergize,
  addVariableToMonitor: addVariableToMonitor,
  addSensorToMonitor: addSensorToMonitor,
  pickup: pickup,
  drop: drop,
  use: use,
  absorb_radiation: absorb_radiation,
  standby: standby,
  timerStart: timerStart,
  timerStop: timerStop,
  timerReset: timerReset,
  stopProject: stopProject,
  highlightBlock: highlightBlock,
  unhighlightBlock: unhighlightBlock
};
if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsV5"]) {
  Object(_SimPythonSensorsAPI__WEBPACK_IMPORTED_MODULE_9__["addSensorAPIForVS"])();
} else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIQ"]) {
  Object(_SimPythonSensorsAPI__WEBPACK_IMPORTED_MODULE_9__["addSensorAPIForIQVS"])();
} else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsPlaygrounds"]) {
  Object(_SimPythonSensorsAPI__WEBPACK_IMPORTED_MODULE_9__["addSensorAPIForVR"])();
}

//#region "classes"

var pythonVSSensorNameLookup = {
  "brain.timer.time": "timerValue",
  "drivetrain.is_done": "drivetrainDriveIsDone",
  "drivetrain.is_moving": "drivetrainDriveIsMoving",
  "drivetrain.heading": "drivetrainDriveHeading",
  "drivetrain.rotation": "drivetrainDriveRotation",
  "drivetrain.velocity_rpm": "driveVelocityInrpm",
  "drivetrain.velocity_percent": "driveVelocityInpct",
  "fork_motor_group.is_done": "forkMotorGroupIsDone",
  "fork_motor_group.is_spinning": "forkMotorGroupIsSpinning",
  "fork_motor_group.position_degrees": "forkMotorGroupPositiondeg",
  "fork_motor_group.position_turns": "forkMotorGroupPositionrev",
  "fork_motor_group.velocity_rpm": "forkMotorGroupVelocityrpm",
  "fork_motor_group.velocity_percent": "forkMotorGroupVelocitypct",
  "intake_motor_group.is_done": "intakeMotorGroupIsDone",
  "intake_motor_group.is_spinning": "intakeMotorGroupIsSpinning",
  "intake_motor_group.position_degrees": "intakeMotorGroupPositiondeg",
  "intake_motor_group.position_turns": "intakeMotorGroupPositionrev",
  "intake_motor_group.velocity_rpm": "intakeMotorGroupVelocityrpm",
  "intake_motor_group.velocity_percent": "intakeMotorGroupVelocitypct",
  "bumper.pressing": "bumperPressed",
  "bottom_distance.is_object_detected": "distanceObjectFound",
  "bottom_distance.object_distance_mm": "distanceObjectDistanceInMM",
  "bottom_distance.object_distance_inches": "distanceObjectDistanceInIN",
  "front_distance.found_object": "distanceRightFound",
  "right_distance.found_object": "distanceRightFound",
  "left_distance.found_object": "leftDistanceObjectFound",
  "roller_optical.is_near_object": "opticalFoundObject",
  "roller_optical.color": ["opticalDetectsRed", "opticalDetectsGreen", "opticalDetectsBlue", "ppticalDetectsYellow", "opticalDetectsOrange", "opticalDetectsPurple", "opticalDetectsCyan"],
  "roller_optical.brightness": "opticalBrightness",
  "roller_optical.hue": "opticalHue",
  "gps.position_mm": "gpsPositionInMM",
  "gps.position_inches": "gpsPositionInIN",
  "gps.heading": "gpsHeading",
  "bottom_line_tracker.reflectivity": "bottomLineTrackerReflectivity",
  "middle_line_tracker.reflectivity": "middleLineTrackerReflectivity",
  "top_line_tracker.reflectivity": "topLineTrackerReflectivity"
};
var pythonVSIQSensorNameLookup = {
  "brain.timer.time": "timerValue",
  "drivetrain.is_done": "drivetrainDriveIsDone",
  "drivetrain.is_moving": "drivetrainDriveIsMoving",
  "drivetrain.heading": "drivetrainDriveHeading",
  "drivetrain.rotation": "drivetrainDriveRotation",
  "drivetrain.velocity_rpm": "driveVelocityInrpm",
  "drivetrain.velocity_percent": "driveVelocityInpct",
  "intake_motor.is_done": "intakeMotorIsDone",
  "intake_motor.is_spinning": "intakeMotorIsSpinning",
  "intake_motor.position_degrees": "intakeMotorPositionDeg",
  "intake_motor.position_turns": "intakeMotorPositionRev",
  "intake_motor.velocity_rpm": "intakeMotorVelocityRPM",
  "intake_motor.velocity_percent": "intakeMotorVelocityPCT",
  "arm_motor.is_done": "armMotorIsDone",
  "arm_motor.is_spinning": "armMotorIsSpinning",
  "arm_motor.position_degrees": "armMotorPositionDeg",
  "arm_motor.position_turns": "armMotorPositionRev",
  "arm_motor.velocity_rpm": "armMotorVelocityRPM",
  "arm_motor.velocity_percent": "armMotorVelocityPCT",
  "intake_bumper.pressing": "intakeBumperPressed",
  "front_distance.is_object_detected": "distance2ndObjectFound",
  "front_distance.object_distance_mm": "distance2ndObjectDistanceInMM",
  "front_distance.object_distance_inches": "distance2ndObjectDistanceInin",
  "front_optical.is_near_object": "frontOpticalFoundObject",
  "front_optical.color": ["frontOpticalDetectsRed", "frontOpticalDetectsGreen", "frontOpticalDetectsBlue", "frontOpticalDetectsYellow", "frontOpticalDetectsOrange", "frontOpticalDetectsPurple", "frontOpticalDetectsCyan"],
  "front_optical.brightness": "frontOpticalBrightness",
  "front_optical.hue": "frontOpticalHue"
};
var pythonVRSensorNameLookup = {
  "brain.timer_time": "timerValue",
  "drivetrain.is_done": "drivetrainDriveIsDone",
  "drivetrain.is_moving": "drivetrainDriveIsMoving",
  "drivetrain.heading": "drivetrainDriveHeading",
  "drivetrain.rotation": "drivetrainDriveRotation",
  "left_bumper.pressed": "bumperPressedLeft",
  "right_bumper.pressed": "bumperPressedRight",
  "distance.found_object": "distanceObjectFound",
  "front_distance.found_object": "frontDistanceObjectFound",
  "right_distance.found_object": "rightDistanceObjectFound",
  "left_distance.found_object": "leftDistanceObjectFound",
  "distance.get_distance": ["frontDistanceObjectDistanceInMM", "frontDistanceObjectDistanceInIN"],
  "front_distance.get_distance": ["frontDistanceObjectDistanceInMM", "frontDistanceObjectDistanceInIN"],
  "left_distance.get_distance": ["leftDistanceObjectDistanceInMM", "leftDistanceObjectDistanceInIN"],
  "right_distance.get_distance": ["rightDistanceObjectDistanceInMM", "rightDistanceObjectDistanceInIN"],
  "front_eye.near_object": "frontEyeNear",
  "front_eye.detect": ["frontEyeDetectsNone", "frontEyeDetectsRed", "frontEyeDetectsGreen", "frontEyeDetectsBlue"],
  "front_eye.brightness": "frontEyeBrightness",
  "down_eye.near_object": "downEyeNear",
  "down_eye.detect": ["downEyeDetectsNone", "downEyeDetectsRed", "downEyeDetectsGreen", "downEyeDetectsBlue"],
  "down_eye.brightness": "downEyeBrightness",
  // "left_eye.near_object": "eyeNearObject",
  // "left_eye.detect": [
  //   "eyeDetectsRed",
  //   "eyeDetectsGreen",
  //   "eyeDetectsBlue",
  //   "eyeDetectsNone",
  // ],
  // "left_eye.brightness": "eyeBrightness",
  // "right_eye.near_object": "eyeNearObject",
  // "right_eye.detect": [
  //   "eyeDetectsRed",
  //   "eyeDetectsGreen",
  //   "eyeDetectsBlue",
  //   "eyeDetectsNone",
  // ],
  // "right_eye.brightness": "eyeBrightness",
  // "rear_eye.near_object": "eyeNearObject",
  // "rear_eye.detect": [
  //   "eyeDetectsRed",
  //   "eyeDetectsGreen",
  //   "eyeDetectsBlue",
  //   "eyeDetectsNone",
  // ],
  // "rear_eye.brightness": "eyeBrightness",
  "location.position": ["positionInMMX", "positionInMMY", "positionInInchesX", "positionInInchesY"],
  "location.position_angle": "positionAngle",
  "brain.timer.time": "timerValue",
  "drivetrain.velocity": ["driveVelocityInrpm", "driveVelocityInpct"],
  "drivetrain.velocity_rpm": "driveVelocityInrpm",
  "drivetrain.velocity_percent": "driveVelocityInpct",
  "fork_motor_group.is_done": "forkMotorGroupIsDone",
  "fork_motor_group.is_spinning": "forkMotorGroupIsSpinning",
  "fork_motor_group.position": ["forkMotorGroupPositiondeg", "forkMotorGroupPositionrev"],
  "fork_motor_group.position_degrees": "forkMotorGroupPositiondeg",
  "fork_motor_group.position_turns": "forkMotorGroupPositionrev",
  "fork_motor_group.velocity": ["forkMotorGroupVelocityrpm", "forkMotorGroupVelocitypct"],
  "fork_motor_group.velocity_rpm": "forkMotorGroupVelocityrpm",
  "fork_motor_group.velocity_percent": "forkMotorGroupVelocitypct",
  "intake_motor_group.is_done": "intakeMotorGroupIsDone",
  "intake_motor_group.is_spinning": "intakeMotorGroupIsSpinning",
  "intake_motor_group.position": ["intakeMotorGroupPositiondeg", "intakeMotorGroupPositionrev"],
  "intake_motor_group.position_degrees": "intakeMotorGroupPositiondeg",
  "intake_motor_group.position_turns": "intakeMotorGroupPositionrev",
  "intake_motor_group.velocity": ["intakeMotorGroupVelocityrpm", "intakeMotorGroupVelocitypct"],
  "intake_motor_group.velocity_rpm": "intakeMotorGroupVelocityrpm",
  "intake_motor_group.velocity_percent": "intakeMotorGroupVelocitypct",
  "bumper.pressing": "bumperPressed",
  "bottom_distance.is_object_detected": "bottomDistanceObjectFound",
  "bottom_distance.object_distance": ["bottomDistanceObjectDistanceInMM", "bottomDistanceObjectDistanceInIN"],
  "bottom_distance.object_distance_mm": "bottomDistanceObjectDistanceInMM",
  "bottom_distance.object_distance_inches": "bottomDistanceObjectDistanceInIN",
  "left_distance.is_object_detected": "distanceLeftObjectFound",
  "left_distance.object_distance": ["distanceLeftObjectDistanceInMM", "distanceLeftObjectDistanceInIN"],
  "left_distance.object_distance_mm": "distanceLeftObjectDistanceInIN",
  "left_distance.object_distance_inches": "distanceLeftObjectDistanceInMM",
  "right_distance.is_object_detected": "distanceRightObjectFound",
  "right_distance.object_distance": ["distanceRightObjectDistanceInMM", "distanceRightObjectDistanceInIN"],
  "right_distance.object_distance_mm": "distanceRightObjectDistanceInMM",
  "right_distance.object_distance_inches": "distanceRightObjectDistanceInIN",
  "center_distance.is_object_detected": "distanceCenterObjectFound",
  "center_distance.object_distance": ["distanceCenterObjectDistanceInMM", "distanceCenterObjectDistanceInIN"],
  "center_distance.object_distance_mm": "distanceCenterObjectDistanceInMM",
  "center_distance.object_distance_inches": "distanceCenterObjectDistanceInIN",
  "roller_optical.is_near_object": "rollerOpticalFoundObject",
  "roller_optical.color": ["rollerOpticalDetectsRed", "rollerOpticalDetectsGreen", "rollerOpticalDetectsBlue", "rollerOpticalDetectsYellow", "rollerOpticalDetectsOrange", "rollerOpticalDetectsPurple", "rollerOpticalDetectsCyan"],
  "optical.is_near_object": "opticalFoundObject",
  "optical.color": ["opticalDetectsRed", "opticalDetectsGreen", "opticalDetectsBlue", "opticalDetectsYellow", "opticalDetectsOrange", "opticalDetectsPurple", "opticalDetectsCyan"],
  "roller_optical.brightness": "rollerOpticalBrightness",
  "roller_optical.hue": "rollerOpticalHue",
  "optical.brightness": "opticalBrightness",
  "optical.hue": "opticalHue",
  "gps.x_position": ["gpsPositionInMM", "gpsPositionInIN"],
  "gps.y_position": ["gpsPositionInMM", "gpsPositionInIN"],
  "gps.position": ["gpsPositionInMM", "gpsPositionInIN"],
  "gps.position_mm": ["gpsPositionInMMX", "gpsPositionInMMY"],
  "gps.position_inches": ["gpsPositionInINX", "gpsPositionInINY"],
  "gps.heading": "gpsHeading",
  "bottom_line_tracker.reflectivity": "bottomLineTrackerReflectivity",
  "middle_line_tracker.reflectivity": "middleLineTrackerReflectivity",
  "top_line_tracker.reflectivity": "topLineTrackerReflectivity",
  "rotation.angle": "rotationAngle",
  "rotation.position": ["rotationPositiondeg", "rotationPositionrev"],
  "rotation.position_degrees": "rotationPositiondeg",
  "rotation.position_turns": "rotationPositionrev",
  "rotation.velocity": ["rotationVelocityrpm", "rotationVelocitydps"],
  "rotation.velocity_rpm": "rotationVelocityrpm",
  "rotation.velocity_dps": "rotationVelocitydps",
  //#region IQ Sensors

  "intake_motor.is_done": "intakeMotorIsDone",
  "intake_motor.is_spinning": "intakeMotorIsSpinning",
  "intake_motor.position_degrees": "intakeMotorPositiondeg",
  "intake_motor.position_turns": "intakeMotorPositionrev",
  "intake_motor.velocity_rpm": "intakeMotorVelocityrpm",
  "intake_motor.velocity_percent": "intakeMotorVelocitypct",
  "intake_motor.position": ["intakemotorPositiondeg", "intakemotorPositionrev"],
  "intake_motor.velocity": ["intakemotorVelocityrpm", "intakemotorVelocitypct"],
  "arm_motor.is_done": "armMotorIsDone",
  "arm_motor.is_spinning": "armMotorIsSpinning",
  "arm_motor.position_degrees": "armMotorPositiondeg",
  "arm_motor.position_turns": "armMotorPositionrev",
  "arm_motor.velocity_rpm": "armMotorVelocityrpm",
  "arm_motor.velocity_percent": "armMotorVelocitypct",
  "arm_motor.position": ["armMotorPositiondeg", "armMotorPositionrev"],
  "arm_motor.velocity": ["armMotorVelocityrpm", "armMotorVelocitypct"],
  "intake_bumper.pressing": "intakeBumperPressed",
  //#region viqc2023

  "front_distance.is_object_detected": "frontDistanceObjectFound",
  "front_distance.object_distance": ["frontDistanceObjectDistanceInMM", "frontDistanceObjectDistanceInIN"],
  "front_distance.object_distance_mm": "frontDistanceObjectDistanceInMM",
  "front_distance.object_distance_inches": "frontDistanceObjectDistanceInIN",
  "front_optical.is_near_object": "frontOpticalObjectFound",
  "front_optical.color": ["frontOpticalDetectsColorRed", "frontOpticalDetectsColorGreen", "frontOpticalDetectsColorBlue", "frontOpticalDetectsColorYellow", "frontOpticalDetectsColorOrange", "frontOpticalDetectsColorPurple", "frontOpticalDetectsColorCyan"],
  "front_optical.brightness": "frontOpticalBrightness",
  "front_optical.hue": "frontOpticalHue",
  //#endregion viqc2023

  //#region viqc2022
  "catapult_motor.is_done": "catapultMotorIsDone",
  "catapult_motor.is_spinning": "catapultMotorIsSpinning",
  "catapult_motor.position_degrees": "catapultMotorPositiondeg",
  "catapult_motor.position_turns": "catapultMotorPositionrev",
  //  "catapult_motor.velocity_rpm": "intakemotorVelocityrpm",
  "catapult_motor.velocity_percent": "catapultMotorVelocitypct",
  "catapult_motor.position": ["catapultMotorPositiondeg", "catapultMotorPositionrev"],
  "catapult_motor.velocity": [
  //     "intakemotorVelocityrpm",
  "intakemotorVelocitypct"],
  "catapult_tension_motor.is_done": "catapultTensionMotorIsDone",
  "catapult_tension_motor.is_spinning": "catapultTensionMotorIsSpinning",
  "catapult_tension_motor.position_degrees": "catapultTensionMotorPositiondeg",
  "catapult_tension_motor.position_turns": "catapultTensionMotorPositionrev",
  "catapult_tension_motor.velocity_percent": "catapultTensionMotorVelocitypct",
  "catapult_tension_motor.position": ["catapultTensionMotorPositiondeg", "catapultTensionMotorPositionrev"],
  "catapult_tension_motor.velocity": ["catapultTensionMotorVelocitypct"],
  "distance.is_object_detected": "distanceObjectFound",
  "distance.object_distance": ["distanceObjectDistanceInMM", "distanceObjectDistanceInIN"],
  "distance.object_distance_mm": "distanceObjectDistanceInMM",
  "distance.object_distance_inches": "distanceObjectDistanceInIN",
  "color.is_near_object": "colorIsNear",
  "color.color": "colorOf",
  "color.brightness": "colorBrightness",
  "color.hue": "colorHue",
  //#endregion viqc2022

  //#endregion IQ Sensors

  //#region Rover Rescue Sensors
  "rover.battery": "brainBattery",
  "rover.minerals_stored": "roverMineralsStored",
  // "rover.position": [ 
  //   "roverSeesLocationRoverInMM",
  //   "roverSeesLocationRoverInInches"
  //               ],
  "rover.level": "roverLevel",
  "rover.exp": "roverExp",
  "rover.storage_capacity": "roverStorageCapacity",
  "rover.under_attack": "roverUnderAttack",
  // We need to add the await because the preprocessor adds it, these are the only awaited sensing functions. 
  // If any more sensing functions need to be awaited, use the same method to enable monitoring.
  "await rover.enemy_radiation": "enemyRadiation",
  "await rover.enemy_level": "enemyLevel",
  "await rover.angle": ["roverSeesDirectionMinerals", "roverSeesDirectionEnemy", "roverSeesDirectionBase"],
  "await rover.location": ["roverSeesLocationRoverInMM", "roverSeesLocationRoverInInches", "roverSeesLocationMineralsInMM", "roverSeesLocationMineralsInInches", "roverSeesLocationEnemyInMM", "roverSeesLocationEnemyInInches", "roverSeesLocationBaseInMM", "roverSeesLocationBaseInInches", "roverSeesLocationObstacleInMM", "roverSeesLocationObstacleInInches", "roverSeesLocationHazardInMM", "roverSeesLocationHazardInInches"],
  "await rover.detects": ["roverDetectsMinerals", "roverDetectsEnemy"],
  "await rover.sees": ["roverSeesFood", "roverSeesEnemy", "roverSeesHome", "roverSeesObstacle", "roverSeesHazard"],
  "await rover.get_distance": ["roverSeesDistanceFoodInMM", "roverSeesDistanceFoodInInches", "roverSeesDistanceEnemyInMM", "roverSeesDistanceEnemyInInches", "roverSeesDistanceHomeInMM", "roverSeesDistanceHomeInInches", "roverSeesDistanceObstacleInMM", "roverSeesDistanceObstacleInInches", "roverSeesDistanceHazardInMM", "roverSeesDistanceHazardInInches"]
  //#region Rover Rescue Sensors
};

var vrThread = "# vr_thread wrapper function\ndef vexcode_handle_task_exception(exc):\n    exc_type = type(exc).__name__\n    exc_tb = exc.__traceback__\n    import io\n    vexcode_syntax_check_output = io.StringIO()\n    import traceback\n    traceback.print_exception(exc_type, exc, exc_tb, file=vexcode_syntax_check_output)\n    vexcode_api.sendPythonError(vexcode_syntax_check_output.getvalue())\n    vexcode_api.sendPythonRunComplete()\n\ndef vr_thread(func):\n    coro = func if asyncio.iscoroutine(func) else func()\n    task = asyncio.create_task(coro)\n    def task_complete(fut):\n        excep = fut.exception()\n        if excep:\n            vexcode_handle_task_exception(excep)\n    task.add_done_callback(task_complete)\n";
var stop_project = "# stop_project wrapper function\ndef stop_project():\n    vexcode_api.stopProject()\n";
var pyImportsV5 = "\nimport math\nimport random\nfrom vexcode_vrc import *\nfrom vexcode_vrc.events import get_Task_func\n";
var pyImportsIQ = "\nimport math\nimport random\nfrom vexcode_viqc import *\nfrom vexcode_viqc.events import get_Task_func\n";
var pyImportsVR = "\nimport math\nimport random\nfrom vexcode_vr_enhanced_robot import *\nfrom vexcode_vr_enhanced_robot.events import get_Task_func\n";
var pyImports = _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsV5"] ? pyImportsV5 : _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIQ"] ? pyImportsIQ : pyImportsVR;
var constructorsV5 = "# constructors\n\ndrivetrain = Drivetrain()\nbrain = Brain()\nbottom_distance = Distance(\"BottomDistance\", 18)\nroller_optical = Optical(\"RollerOptical\", 2)\ngps = GPS(\"GPS\", 3)\nintake_motor_group = Motor(\"IntakeMotorGroup\", 10)\nbottom_line_tracker = LineTracker(\"BottomLineTracker\", 22)\nmiddle_line_tracker = LineTracker(\"MiddleLineTracker\", 23)\ntop_line_tracker = LineTracker(\"TopLineTracker\", 24)\n\n";

// bumper = Bumper("Bumper", 21)
// center_distance = Distance("DistanceCenter", 13)
// right_distance = Distance("DistanceRight", 20)

var constructorsIQ = "# constructors\n\ndrivetrain = Drivetrain()\nbrain = Brain()\nintake_motor = Motor(\"IntakeMotor\", 1)\nintake_bumper = Bumper(\"Bumper\", 2)\nfront_distance = Distance(\"Distance\", 3)\nfront_optical = Optical(\"Optical\", 5)\narm_motor = Motor(\"ArmMotor\", 10)\n\n";
var constructorsVR = "# constructors\n\ndrivetrain = Drivetrain()\nmagnet = Electromagnet(\"magnet\", 0)\npen = Pen()\nbrain = Brain()\nleft_bumper = Bumper(\"leftBumper\", 1)\nright_bumper = Bumper(\"rightBumper\", 2)\nfront_eye = EyeSensor(\"fronteye\", 3)\ndown_eye = EyeSensor(\"downeye\", 4)\nright_eye = EyeSensor(\"righteye\", 5)\nleft_eye = EyeSensor(\"lefteye\", 6)\nrear_eye = EyeSensor(\"reareye\", 7)\nfront_distance = Distance(\"frontdistance\", 8)\nrear_distance = Distance(\"reardistance\", 9)\nleft_distance = Distance(\"leftdistance\", 10)\nright_distance = Distance(\"rightdistance\", 11)\nlocation = Location()\npen.set_pen_width(THIN)\ndistance = front_distance\n";
function getVRHeader() {
  var model = getRobotModel();
  var imports = pyImportsVR;
  return imports + constructorsVR;
}
var constructors = _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsV5"] ? constructorsV5 : _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIQ"] ? constructorsIQ : constructorsVR;
var monitorCode = "\nfrom js import vexcode_api\n\ndef monitor_variable(*var_names):\n    for var_name in var_names:\n        if not isinstance(var_name, str):\n            raise TypeError(\"variable names must be a string\")\n        vexcode_api.addVariableToMonitor(var_name)\n\ndef monitor_sensor(*sensor_names):\n    for sensor_name in sensor_names:\n        if not isinstance(sensor_name, str):\n            raise TypeError(\"sensor names must be a string\")\n        vexcode_api.addSensorToMonitor(sensor_name)\n";
var highlightBlockCode = "\ndef highlight_block(id):\n    vexcode_api.highlightBlock(id)\n\ndef unhighlight_block(id):\n    vexcode_api.unhighlightBlock(id)\n";

//#endregion

// const pyHeader = [pyImports, enums, classes, constructors].join("\n\n");
var vrHeaders = [pyImports, constructors, stop_project, monitorCode, highlightBlockCode].join("\n\n").replace(/\r\n/g, "\n");
var v5IQHeaders = [pyImports, vrThread, constructors, stop_project, monitorCode].join("\n\n").replace(/\r\n/g, "\n");
var pyHeader = _targetPlatform__WEBPACK_IMPORTED_MODULE_7__["targetIsIqOrV5"] ? v5IQHeaders : vrHeaders;

/***/ }),

/***/ "./src/SimWindow/SimPythonInterpreter/SimPythonSensorsAPI.ts":
/*!*******************************************************************!*\
  !*** ./src/SimWindow/SimPythonInterpreter/SimPythonSensorsAPI.ts ***!
  \*******************************************************************/
/*! exports provided: addSensorAPIForVS, addSensorAPIForVR, addSensorAPIForIQVS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSensorAPIForVS", function() { return addSensorAPIForVS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSensorAPIForVR", function() { return addSensorAPIForVR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSensorAPIForIQVS", function() { return addSensorAPIForIQVS; });
/* harmony import */ var _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SimUnity/SimSensorValues */ "./src/SimWindow/SimUnity/SimSensorValues.ts");
/* harmony import */ var _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SimUnity/SimMessageHelper */ "./src/SimWindow/SimUnity/SimMessageHelper.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function addSensorAPIForVS() {
  //#region "sensing drivetrain"
  function drivetrainGetDriveIsDone() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].isDone();
  }
  function drivetrainGetDriveIsMoving() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].isMoving();
  }
  function drivetrainGetDriveRotation() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].rotation();
  }
  function drivetrainGetDriveHeading() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].heading();
  }
  function drivetrainGetDriveVelocity() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].velocity();
  }
  //#endregion

  //#region "distnce sensing"
  function distanceIsObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].isObjectFound(port);
  }
  function distance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].distance(port);
  }
  //#endregion

  //#region "rotation sensing"
  function rotationAngle(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Rotation"].angle(port);
  }
  function rotationPosition(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Rotation"].position(port);
  }
  function rotationSetPosition(_x, _x2) {
    return _rotationSetPosition.apply(this, arguments);
  }
  function _rotationSetPosition() {
    _rotationSetPosition = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(port, position) {
      var msg;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__["Rotation"].setPosition(position);
            _context.next = 3;
            return self.sendCommandMessage(msg);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _rotationSetPosition.apply(this, arguments);
  }
  function rotationVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Rotation"].velocity(port);
  }
  //#endregion

  //#region "optical sensor"
  function opticalDetectsObject(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].isObjectFound(port);
  }
  function opticalColor(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].color(port);
  }
  function opticalHue(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].hue(port);
  }
  function opticalBrightness(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].brightness(port);
  }
  //#endregion

  //#region "bumper sensor"
  function bumperPressed(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Bumper"].pressed(port);
  }
  //#endregion

  //#region "distance sensor"
  function distanceGetObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].isObjectFound(port);
  }
  function distanceGetDistance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].distance(port);
  }
  //#endregion

  //#region "gps sensor"
  function gpsPositionX(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["GPS"].x(port);
  }
  function gpsPositionY(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["GPS"].y(port);
  }
  function gpsAngle(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["GPS"].angle(port);
  }
  //#endregion

  //#region "linetracker sensor"
  function lineTrackerReflectivity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["LineTracker"].reflectivity(port);
  }
  //#endregion

  //#region "motor sensing commands"
  function motorIsDone(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].isDone(port);
  }
  function motorIsMoving(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].isMoving(port);
  }
  function motorPosition(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].position(port);
  }
  function motorVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].velocity(port);
  }
  //#endregion

  Object.assign(self.vexcode_api, {
    drivetrainGetDriveIsDone: drivetrainGetDriveIsDone,
    drivetrainGetDriveIsMoving: drivetrainGetDriveIsMoving,
    drivetrainGetDriveRotation: drivetrainGetDriveRotation,
    drivetrainGetDriveHeading: drivetrainGetDriveHeading,
    drivetrainGetDriveVelocity: drivetrainGetDriveVelocity,
    distance: distance,
    distanceIsObjectFound: distanceIsObjectFound,
    opticalDetectsObject: opticalDetectsObject,
    opticalColor: opticalColor,
    opticalHue: opticalHue,
    opticalBrightness: opticalBrightness,
    gpsAngle: gpsAngle,
    gpsPositionX: gpsPositionX,
    gpsPositionY: gpsPositionY,
    lineTrackerReflectivity: lineTrackerReflectivity,
    bumperPressed: bumperPressed,
    distanceGetObjectFound: distanceGetObjectFound,
    distanceGetDistance: distanceGetDistance,
    rotationAngle: rotationAngle,
    rotationPosition: rotationPosition,
    rotationSetPosition: rotationSetPosition,
    rotationVelocity: rotationVelocity,
    motorIsDone: motorIsDone,
    motorIsMoving: motorIsMoving,
    motorPosition: motorPosition,
    motorVelocity: motorVelocity
  });
}
function addSensorAPIForIQVS() {
  //#region "sensing drivetrain"
  function drivetrainGetDriveIsDone() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].isDone();
  }
  function drivetrainGetDriveIsMoving() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].isMoving();
  }
  function drivetrainGetDriveRotation() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].rotation();
  }
  function drivetrainGetDriveHeading() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].heading();
  }
  function drivetrainGetDriveVelocity() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].velocity();
  }
  //#endregion

  //#region "distnce sensing"
  function distanceIsObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].isObjectFound(port);
  }
  function distance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].distance(port);
  }
  //#endregion

  //#region "optical sensor"
  function opticalDetectsObject(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].isObjectFound(port);
  }
  function opticalColor(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].color(port);
  }
  function opticalHue(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].hue(port);
  }
  function opticalBrightness(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].brightness(port);
  }
  //#endregion

  //#region "bumper sensor"
  function bumperPressed(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Bumper"].pressed(port);
  }
  //#endregion

  //#region "distance sensor"
  function distanceGetObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].isObjectFound(port);
  }
  function distanceGetDistance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].distance(port);
  }
  //#endregion

  //#region "distance 2nd gen sensor"
  function distance2ndGetObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].isObjectFound(port);
  }
  function distance2ndGetDistance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].distance(port);
  }
  function distance2ndGetVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].velocity(port);
  }
  function distance2ndGetSize(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].size(port);
  }
  //#endregion

  //#region "gyro"
  function gyroGetHeading(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Gyro"].heading(port);
  }
  function gyroGetRotation(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Gyro"].rotation(port);
  }
  function gyroGetRate(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Gyro"].rate(port);
  }
  //#endregion

  //#region "inertial"
  function inertialGetHeading() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].heading();
  }
  function inertialGetRotation() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].rotation();
  }
  function inertialGetGyroRateX() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].gyroRateX();
  }
  function inertialGetGyroRateY() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].gyroRateY();
  }
  function inertialGetGyroRateZ() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].gyroRateZ();
  }
  function inertialGetOrientationPitch() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].orientationPitch();
  }
  function inertialGetOrientationRoll() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].orientationRoll();
  }
  function inertialGetOrientationYaw() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].orientationYaw();
  }
  //#endregion

  //#region "color"

  function colorDetectsObject(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].isObjectFound(port);
  }
  function colorGetColor(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].color(port);
  }
  function colorGetBrightness(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].brightness(port);
  }
  function colorGetHue(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].hue(port);
  }

  //#endregion

  //#region "motor sensing commands"
  function motorIsDone(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].isDone(port);
  }
  function motorIsMoving(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].isMoving(port);
  }
  function motorPosition(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].position(port);
  }
  function motorVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].velocity(port);
  }
  //#endregion

  Object.assign(self.vexcode_api, {
    drivetrainGetDriveIsDone: drivetrainGetDriveIsDone,
    drivetrainGetDriveIsMoving: drivetrainGetDriveIsMoving,
    drivetrainGetDriveRotation: drivetrainGetDriveRotation,
    drivetrainGetDriveHeading: drivetrainGetDriveHeading,
    drivetrainGetDriveVelocity: drivetrainGetDriveVelocity,
    distance: distance,
    distanceIsObjectFound: distanceIsObjectFound,
    opticalDetectsObject: opticalDetectsObject,
    opticalColor: opticalColor,
    opticalHue: opticalHue,
    opticalBrightness: opticalBrightness,
    bumperPressed: bumperPressed,
    distanceGetObjectFound: distanceGetObjectFound,
    distanceGetDistance: distanceGetDistance,
    gyroGetHeading: gyroGetHeading,
    gyroGetRotation: gyroGetRotation,
    distance2ndGetObjectFound: distance2ndGetObjectFound,
    distance2ndGetDistance: distance2ndGetDistance,
    distance2ndGetVelocity: distance2ndGetVelocity,
    distance2ndGetSize: distance2ndGetSize,
    inertialGetHeading: inertialGetHeading,
    inertialGetRotation: inertialGetRotation,
    inertialGetGyroRateX: inertialGetGyroRateX,
    inertialGetGyroRateY: inertialGetGyroRateY,
    inertialGetGyroRateZ: inertialGetGyroRateZ,
    inertialGetOrientationPitch: inertialGetOrientationPitch,
    inertialGetOrientationRoll: inertialGetOrientationRoll,
    inertialGetOrientationYaw: inertialGetOrientationYaw,
    colorDetectsObject: colorDetectsObject,
    colorGetColor: colorGetColor,
    colorGetBrightness: colorGetBrightness,
    colorGetHue: colorGetHue,
    motorIsDone: motorIsDone,
    motorIsMoving: motorIsMoving,
    motorPosition: motorPosition,
    motorVelocity: motorVelocity
  });
}
function addSensorAPIForVR() {
  //#region "sensing drivetrain"
  function drivetrainGetDriveIsDone() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Drivetrain.isDone();
  }
  function drivetrainGetDriveIsMoving() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Drivetrain.isMoving();
  }
  function drivetrainGetDriveRotation() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Drivetrain.rotation();
  }
  function drivetrainGetDriveHeading() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Drivetrain.heading();
  }
  function drivetrainGetDriveVelocity() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Drivetrain"].velocity();
  }
  //#endregion

  //#region "sensing distance"
  function distanceGetDistance(port) {
    var distanceSensor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "distance";
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Distance.distance(port);
  }
  function distanceGetObjectFound(port) {
    var distanceSensor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "distance";
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Distance.objectFound(port);
  }
  //#endregion

  //#region "sensing location"
  function locationPosition(port, axis) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Position.location(port, axis);
  }
  function locationAngle(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Position.angle(port);
  }
  //#endregion

  function bumperPressed(port, bumper) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].Bumper.pressed(port);
  }

  //#region "sensing eye sensor"
  function eyeSensorNearObject(port, colorSensor) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].ColorSensor.nearObject(port);
  }
  function eyeSensorDetect(port, colorSensor) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].ColorSensor.color(port);
  }
  function eyeSensorBrightness(port, colorSensor) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].ColorSensor.brightness(port);
  }
  //#endregion

  //#region "distnce sensing"
  function distanceIsObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].isObjectFound(port);
  }
  function distance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance"].distance(port);
  }
  //#endregion

  //#region "rotation sensing"
  function rotationAngle(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Rotation"].angle(port);
  }
  function rotationPosition(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Rotation"].position(port);
  }
  function rotationSetPosition(_x3, _x4) {
    return _rotationSetPosition2.apply(this, arguments);
  }
  function _rotationSetPosition2() {
    _rotationSetPosition2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(port, position) {
      var msg;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            msg = _SimUnity_SimMessageHelper__WEBPACK_IMPORTED_MODULE_1__["Rotation"].setPosition(position);
            _context2.next = 3;
            return self.sendCommandMessage(msg);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _rotationSetPosition2.apply(this, arguments);
  }
  function rotationVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Rotation"].velocity(port);
  }
  //#endregion

  //#region "optical sensor"
  function opticalDetectsObject(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].isObjectFound(port);
  }
  function opticalColor(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].color(port);
  }
  function opticalHue(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].hue(port);
  }
  function opticalBrightness(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Optical"].brightness(port);
  }
  //#endregion

  //#region "gps sensor"
  function gpsPositionX(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["GPS"].x(port);
  }
  function gpsPositionY(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["GPS"].y(port);
  }
  function gpsAngle(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["GPS"].angle(port);
  }
  //#endregion

  //#region "linetracker sensor"
  function lineTrackerReflectivity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["LineTracker"].reflectivity(port);
  }
  //#endregion

  //#region "motor sensing commands"
  function motorIsDone(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].isDone(port);
  }
  function motorIsMoving(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].isMoving(port);
  }
  function motorPosition(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].position(port);
  }
  function motorVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Motor"].velocity(port);
  }
  //#endregion

  //#region "distance 2nd gen sensor"
  function distance2ndGetObjectFound(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].isObjectFound(port);
  }
  function distance2ndGetDistance(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].distance(port);
  }
  function distance2ndGetVelocity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].velocity(port);
  }
  function distance2ndGetSize(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Distance2nd"].size(port);
  }
  //#endregion

  //#region "gyro"
  function gyroGetHeading(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Gyro"].heading(port);
  }
  function gyroGetRotation(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Gyro"].rotation(port);
  }
  function gyroGetRate(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Gyro"].rate(port);
  }
  //#endregion

  //#region "inertial"
  function inertialGetHeading() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].heading();
  }
  function inertialGetRotation() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].rotation();
  }
  function inertialGetGyroRateX() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].gyroRateX();
  }
  function inertialGetGyroRateY() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].gyroRateY();
  }
  function inertialGetGyroRateZ() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].gyroRateZ();
  }
  function inertialGetOrientationPitch() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].orientationPitch();
  }
  function inertialGetOrientationRoll() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].orientationRoll();
  }
  function inertialGetOrientationYaw() {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Inertial"].orientationYaw();
  }
  //#endregion

  //#region "color"

  function colorDetectsObject(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].isObjectFound(port);
  }
  function colorGetColor(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].color(port);
  }
  function colorGetBrightness(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].brightness(port);
  }
  function colorGetHue(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["Color"].hue(port);
  }

  //#endregion

  //#region "sensing rover"
  function battery(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.batteryCapacity(port);
  }
  function mineralsStored(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.batteryStored(port, "back");
  }
  function level(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.playerLevel(port);
  }
  function exp(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.playerExp(port);
  }
  function storageCapacity(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.playerCapacity(port);
  }
  function enemyLevel(_x5) {
    return _enemyLevel.apply(this, arguments);
  }
  function _enemyLevel() {
    _enemyLevel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(port) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIValueWithWait"]("vision", "Level", {
              OBJECT: "enemy"
            });
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _enemyLevel.apply(this, arguments);
  }
  function enemyRadiation(_x6) {
    return _enemyRadiation.apply(this, arguments);
  }
  function _enemyRadiation() {
    _enemyRadiation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(port) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIValueWithWait"]("vision", "Health", {
              OBJECT: "enemy"
            });
          case 2:
            return _context4.abrupt("return", _context4.sent);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return _enemyRadiation.apply(this, arguments);
  }
  function underAttack(port) {
    return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.playerUnderAttack(port);
  }
  function detects(_x7, _x8) {
    return _detects.apply(this, arguments);
  }
  function _detects() {
    _detects = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(port, object) {
      var key, value;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            key = object === "minerals" ? "battery" : object;
            _context5.next = 3;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIObjectPresentWithWait"]("smell", key);
          case 3:
            value = _context5.sent;
            return _context5.abrupt("return", value);
          case 5:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return _detects.apply(this, arguments);
  }
  function sees(_x9, _x10) {
    return _sees.apply(this, arguments);
  }
  function _sees() {
    _sees = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(port, object) {
      var key, value;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            key = object === "minerals" ? "battery" : object;
            _context6.next = 3;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIObjectPresentWithWait"]("vision", key);
          case 3:
            value = _context6.sent;
            return _context6.abrupt("return", value);
          case 5:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return _sees.apply(this, arguments);
  }
  function seesAngle(_x11, _x12) {
    return _seesAngle.apply(this, arguments);
  }
  function _seesAngle() {
    _seesAngle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(port, object) {
      var key, value;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            key = object === "minerals" ? "battery" : object;
            if (!(key === "base")) {
              _context7.next = 5;
              break;
            }
            _context7.t0 = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.homeDirection(port);
            _context7.next = 8;
            break;
          case 5:
            _context7.next = 7;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIValueWithWait"]("vision", "Angle", {
              OBJECT: key
            });
          case 7:
            _context7.t0 = _context7.sent;
          case 8:
            value = _context7.t0;
            return _context7.abrupt("return", value);
          case 10:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return _seesAngle.apply(this, arguments);
  }
  function seesDistance(_x13, _x14) {
    return _seesDistance.apply(this, arguments);
  }
  function _seesDistance() {
    _seesDistance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(port, object) {
      var key, value;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            key = object === "minerals" ? "battery" : object;
            if (!(key === "base")) {
              _context8.next = 5;
              break;
            }
            _context8.t0 = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.homeDistance(port);
            _context8.next = 8;
            break;
          case 5:
            _context8.next = 7;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIValueWithWait"]("vision", "Distance", {
              OBJECT: key
            });
          case 7:
            _context8.t0 = _context8.sent;
          case 8:
            value = _context8.t0;
            return _context8.abrupt("return", value);
          case 10:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return _seesDistance.apply(this, arguments);
  }
  function seesLocation(_x15, _x16, _x17) {
    return _seesLocation.apply(this, arguments);
  } //#endregion "sensing rover"
  function _seesLocation() {
    _seesLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(port, object, axis) {
      var key, value;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            key = object === "minerals" ? "battery" : object;
            if (!(key === "base")) {
              _context9.next = 5;
              break;
            }
            _context9.t0 = _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.homeLocation(port, axis);
            _context9.next = 15;
            break;
          case 5:
            if (!(key === "rover")) {
              _context9.next = 11;
              break;
            }
            _context9.next = 8;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"].AI.playerPosition(port, axis);
          case 8:
            _context9.t1 = _context9.sent;
            _context9.next = 14;
            break;
          case 11:
            _context9.next = 13;
            return _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["getCurrentAIValueWithWait"]("vision", "Location", {
              OBJECT: key,
              AXIS: axis
            });
          case 13:
            _context9.t1 = _context9.sent;
          case 14:
            _context9.t0 = _context9.t1;
          case 15:
            value = _context9.t0;
            return _context9.abrupt("return", value);
          case 17:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return _seesLocation.apply(this, arguments);
  }
  Object.assign(self.vexcode_api, {
    drivetrainGetDriveIsDone: drivetrainGetDriveIsDone,
    drivetrainGetDriveIsMoving: drivetrainGetDriveIsMoving,
    drivetrainGetDriveRotation: drivetrainGetDriveRotation,
    drivetrainGetDriveHeading: drivetrainGetDriveHeading,
    locationPosition: locationPosition,
    locationAngle: locationAngle,
    bumperPressed: bumperPressed,
    distanceGetObjectFound: distanceGetObjectFound,
    distanceGetDistance: distanceGetDistance,
    eyeSensorNearObject: eyeSensorNearObject,
    eyeSensorDetect: eyeSensorDetect,
    eyeSensorBrightness: eyeSensorBrightness,
    drivetrainGetDriveVelocity: drivetrainGetDriveVelocity,
    distanceIsObjectFound: distanceIsObjectFound,
    distance: distance,
    rotationAngle: rotationAngle,
    rotationPosition: rotationPosition,
    rotationSetPosition: rotationSetPosition,
    rotationVelocity: rotationVelocity,
    opticalDetectsObject: opticalDetectsObject,
    opticalColor: opticalColor,
    opticalHue: opticalHue,
    opticalBrightness: opticalBrightness,
    gpsPositionX: gpsPositionX,
    gpsPositionY: gpsPositionY,
    gpsAngle: gpsAngle,
    lineTrackerReflectivity: lineTrackerReflectivity,
    motorIsDone: motorIsDone,
    motorIsMoving: motorIsMoving,
    motorPosition: motorPosition,
    motorVelocity: motorVelocity,
    battery: battery,
    mineralsStored: mineralsStored,
    level: level,
    exp: exp,
    enemyLevel: enemyLevel,
    enemyRadiation: enemyRadiation,
    storageCapacity: storageCapacity,
    underAttack: underAttack,
    detects: detects,
    sees: sees,
    seesAngle: seesAngle,
    seesDistance: seesDistance,
    seesLocation: seesLocation,
    distance2ndGetObjectFound: distance2ndGetObjectFound,
    distance2ndGetDistance: distance2ndGetDistance,
    distance2ndGetVelocity: distance2ndGetVelocity,
    distance2ndGetSize: distance2ndGetSize,
    gyroGetHeading: gyroGetHeading,
    gyroGetRotation: gyroGetRotation,
    gyroGetRate: gyroGetRate,
    inertialGetHeading: inertialGetHeading,
    inertialGetRotation: inertialGetRotation,
    inertialGetGyroRateX: inertialGetGyroRateX,
    inertialGetGyroRateY: inertialGetGyroRateY,
    inertialGetGyroRateZ: inertialGetGyroRateZ,
    inertialGetOrientationPitch: inertialGetOrientationPitch,
    inertialGetOrientationRoll: inertialGetOrientationRoll,
    inertialGetOrientationYaw: inertialGetOrientationYaw,
    colorDetectsObject: colorDetectsObject,
    colorGetColor: colorGetColor,
    colorGetBrightness: colorGetBrightness,
    colorGetHue: colorGetHue,
    // The VR sensors are a little different and placed here for the existing API code to work with
    SensorValues: _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__["VR"],
    SensorValuesRaw: _SimUnity_SimSensorValues__WEBPACK_IMPORTED_MODULE_0__
  });
}


/***/ }),

/***/ "./src/SimWindow/SimUnity/SimMessageHelper.ts":
/*!****************************************************!*\
  !*** ./src/SimWindow/SimUnity/SimMessageHelper.ts ***!
  \****************************************************/
/*! exports provided: Drivetrain, Motor, Program, Timer, Rotation, Gyro, Inertial, LED, Electromagnet, Actions, PenPosition, PenColor, PenWidth, Actions123, Sounds123, LEDColors, Looks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drivetrain", function() { return Drivetrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Motor", function() { return Motor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return Program; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rotation", function() { return Rotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gyro", function() { return Gyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inertial", function() { return Inertial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LED", function() { return LED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Electromagnet", function() { return Electromagnet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actions", function() { return Actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PenPosition", function() { return PenPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PenColor", function() { return PenColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PenWidth", function() { return PenWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actions123", function() { return Actions123; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sounds123", function() { return Sounds123; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEDColors", function() { return LEDColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Looks", function() { return Looks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../unityMessageEnums */ "./src/SimWindow/unityMessageEnums.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("SimMessageHelper");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();



//#region "robot device commands"
// TODO: reconfigure message helper paramaters so that "port" is always first and no longer optional
//#region "drivetrain commands"
var Drivetrain = {
  drive: function drive(direction, port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].drive,
        param: {
          direction: direction
        },
        rejectAllDeviceCommands: true
      },
      wait: false,
      preventDuplicate: true
    };
  },
  driveFor: function driveFor(direction, distance) {
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var port = arguments.length > 3 ? arguments[3] : undefined;
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].driveFor,
        param: {
          direction: direction,
          distance: distance
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  driveUntil: function driveUntil(direction, event) {
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var port = arguments.length > 3 ? arguments[3] : undefined;
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].driveUntil,
        param: {
          direction: direction,
          event: event
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  turn: function turn(direction, port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].turn,
        param: {
          direction: direction
        },
        rejectAllDeviceCommands: true
      },
      wait: false,
      preventDuplicate: true
    };
  },
  turnFor: function turnFor(direction, degrees) {
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var port = arguments.length > 3 ? arguments[3] : undefined;
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].turnFor,
        param: {
          direction: direction,
          degrees: degrees
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  turnToHeading: function turnToHeading(heading) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var port = arguments.length > 2 ? arguments[2] : undefined;
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].turnToHeading,
        param: {
          heading: heading
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  turnToRotation: function turnToRotation(rotation) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var port = arguments.length > 2 ? arguments[2] : undefined;
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].turnToRotation,
        param: {
          rotation: rotation
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  setDriveSpeed: function setDriveSpeed(speed, port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].driveSpeed,
        param: {
          speed: speed
        }
      },
      wait: false,
      preventDuplicate: true
    };
  },
  setTurnSpeed: function setTurnSpeed(speed, port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].turnSpeed,
        param: {
          speed: speed
        }
      },
      wait: false,
      preventDuplicate: true
    };
  },
  stop: function stop(port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].stop,
        rejectAllDeviceCommands: true
      },
      wait: false,
      preventDuplicate: true
    };
  },
  setHeading: function setHeading(heading, port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].setHeading,
        param: {
          heading: heading
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  setRotation: function setRotation(rotation, port) {
    return {
      command: {
        device: "drivetrain",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["DrivetrainCommand"].setRotation,
        param: {
          rotation: rotation
        }
      },
      wait: false,
      preventDuplicate: false
    };
  }
};
//#endregion

//#region program
var Program = {
  start: function start() {
    return {
      device: "program",
      command: "start"
    };
  },
  stop: function stop() {
    return {
      device: "program",
      command: "stop"
    };
  }
};
//#endregion

//#region "timer"
var Timer = {
  start: function start() {
    return {
      device: "timer",
      command: "start"
    };
  },
  stop: function stop() {
    return {
      device: "timer",
      command: "stop"
    };
  },
  reset: function reset() {
    return {
      device: "timer",
      command: "reset"
    };
  }
};
//#endregion

//#region "motor commands"
var Motor = {
  spin: function spin(port, direction) {
    return {
      command: {
        device: "motor",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["MotorCommand"].spin,
        param: {
          direction: direction
        },
        rejectAllDeviceCommands: true
      },
      wait: false,
      preventDuplicate: true
    };
  },
  spinFor: function spinFor(port, direction, degrees) {
    var wait = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return {
      command: {
        device: "motor",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["MotorCommand"].spinFor,
        param: {
          direction: direction,
          degrees: degrees
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  spinTo: function spinTo(port, degrees) {
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return {
      command: {
        device: "motor",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["MotorCommand"].spinTo,
        param: {
          degrees: degrees
        },
        rejectAllDeviceCommands: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  stop: function stop(port) {
    return {
      command: {
        device: "motor",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["MotorCommand"].stop,
        rejectAllDeviceCommands: true
      },
      wait: false,
      preventDuplicate: true
    };
  },
  setVelocity: function setVelocity(port, velocity) {
    return {
      command: {
        device: "motor",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["MotorCommand"].setVelocity,
        param: {
          velocity: velocity
        }
      },
      wait: false,
      preventDuplicate: true
    };
  },
  setPosition: function setPosition(port, position) {
    return {
      command: {
        device: "motor",
        port: port,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["MotorCommand"].setPosition,
        param: {
          position: position
        }
      },
      wait: false,
      preventDuplicate: false
    };
  }
};
//#endregion

//#region "rotation"
var Rotation = {
  setPosition: function setPosition(position) {
    return {
      command: {
        device: "rotation",
        port: 4,
        command: _unityMessageEnums__WEBPACK_IMPORTED_MODULE_1__["RotationCommand"].setPosition,
        param: {
          position: position
        }
      },
      wait: false,
      preventDuplicate: false
    };
  }
};
//#endregion "rotation"

//#region "electromagnet"

var Electromagnet = {
  setState: function setState(state, port) {
    return {
      command: {
        device: "Magnet",
        port: port,
        command: state
      },
      wait: false,
      preventDuplicate: false
    };
  }
};
//#endregion

//#region "gyro"

var Gyro = {
  setHeading: function setHeading(port, heading, units) {
    return {
      command: {
        device: "Gyro",
        command: "heading",
        port: port,
        param: {
          heading: heading,
          units: units
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  setRotation: function setRotation(port, rotation, units) {
    return {
      command: {
        device: "Gyro",
        command: "rotation",
        port: port,
        param: {
          rotation: rotation,
          units: units
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  calibrate: function calibrate(port, type) {
    return {
      command: {
        device: "Gyro",
        command: "calibrate",
        port: port,
        param: {
          type: type
        }
      },
      wait: false,
      preventDuplicate: false
    };
  }
};

//#endregion

//#region "inertial"

var Inertial = {
  setHeading: function setHeading(port, heading, units) {
    return {
      command: {
        device: "Inertial",
        command: "heading",
        port: port,
        param: {
          heading: heading,
          units: units
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  setRotation: function setRotation(port, rotation, units) {
    return {
      command: {
        device: "Inertial",
        command: "rotation",
        port: port,
        param: {
          rotation: rotation,
          units: units
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  calibrate: function calibrate(port) {
    return {
      command: {
        device: "Inertial",
        command: "calibrate",
        port: port
      },
      wait: false,
      preventDuplicate: false
    };
  }
};

//#endregion

//#region "actions"
var Actions123 = /*#__PURE__*/function (Actions123) {
  Actions123[Actions123["Happy"] = 1] = "Happy";
  Actions123[Actions123["Sad"] = 2] = "Sad";
  Actions123[Actions123["Crazy"] = 3] = "Crazy";
  return Actions123;
}(Actions123 || {});
var Sounds123 = /*#__PURE__*/function (Sounds123) {
  Sounds123[Sounds123["Honk"] = 11] = "Honk";
  Sounds123[Sounds123["Doorbell"] = 18] = "Doorbell";
  Sounds123[Sounds123["Crash"] = 19] = "Crash";
  return Sounds123;
}(Sounds123 || {});
var Actions = {
  interact: function interact(action) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      command: {
        device: "Rover",
        command: action
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  standby: function standby(battery) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      command: {
        device: "Rover",
        command: "hibernate",
        param: {
          battery: battery
        },
        skipIfExistingSent: true
      },
      wait: wait,
      preventDuplicate: false
    };
  },
  act: function act(behavior) {
    return {
      command: {
        device: "brain",
        command: "act",
        param: {
          behavior: behavior
        }
      },
      wait: true,
      preventDuplicate: false
    };
  },
  playSound: function playSound(clip) {
    return {
      command: {
        device: "brain",
        command: "play_sound",
        param: {
          clip: clip
        }
      },
      wait: false,
      preventDuplicate: false
    };
  }
};
//#endregion "actions"

//#region "led"
var LEDColors = /*#__PURE__*/function (LEDColors) {
  LEDColors[LEDColors["off"] = 0] = "off";
  LEDColors[LEDColors["green"] = 2] = "green";
  LEDColors[LEDColors["blue"] = 3] = "blue";
  LEDColors[LEDColors["purple"] = 6] = "purple";
  return LEDColors;
}(LEDColors || {});
var LED = {
  glow: function glow(state, port) {
    return {
      command: {
        device: "led",
        command: "glow",
        port: port,
        param: {
          state: state
        }
      },
      wait: false,
      preventDuplicate: false
    };
  }
};

//#endregion

//#region "looks"
var PenPosition = /*#__PURE__*/function (PenPosition) {
  PenPosition[PenPosition["Up"] = 0] = "Up";
  PenPosition[PenPosition["Down"] = 1] = "Down";
  return PenPosition;
}(PenPosition || {});
var PenColor = /*#__PURE__*/function (PenColor) {
  PenColor[PenColor["Black"] = 0] = "Black";
  PenColor[PenColor["Red"] = 1] = "Red";
  PenColor[PenColor["Green"] = 2] = "Green";
  PenColor[PenColor["Blue"] = 3] = "Blue";
  return PenColor;
}(PenColor || {});
var PenWidth = /*#__PURE__*/function (PenWidth) {
  PenWidth[PenWidth["extraSmall"] = 0] = "extraSmall";
  PenWidth[PenWidth["small"] = 1] = "small";
  PenWidth[PenWidth["normal"] = 3] = "normal";
  PenWidth[PenWidth["wide"] = 4] = "wide";
  PenWidth[PenWidth["extraWide"] = 5] = "extraWide";
  return PenWidth;
}(PenWidth || {});
var Looks = {
  movePen: function movePen(state, port) {
    return {
      command: {
        device: "pen",
        port: port,
        command: "state",
        param: {
          state: state
        }
      },
      wait: true,
      preventDuplicate: false
    };
  },
  setPen: function setPen(color, port) {
    return {
      command: {
        device: "pen",
        port: port,
        command: "color",
        param: {
          color: color
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  setPenWidth: function setPenWidth(width, port) {
    return {
      command: {
        device: "pen",
        port: port,
        command: "width",
        param: {
          width: width
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  setPenColorPlus: function setPenColorPlus(r, g, b, a, port) {
    return {
      command: {
        device: "pen",
        port: port,
        command: "rgb",
        param: {
          r: r,
          g: g,
          b: b,
          a: a
        }
      },
      wait: false,
      preventDuplicate: false
    };
  },
  fillPenColorPlus: function fillPenColorPlus(r, g, b, a, port) {
    return {
      command: {
        device: "pen",
        port: port,
        command: "fill",
        param: {
          r: r,
          g: g,
          b: b,
          a: a
        }
      },
      wait: true,
      preventDuplicate: false
    };
  }
};
//#endregion
//#endregion



/***/ }),

/***/ "./src/SimWindow/SimUnity/SimSensorDataHelpers.ts":
/*!********************************************************!*\
  !*** ./src/SimWindow/SimUnity/SimSensorDataHelpers.ts ***!
  \********************************************************/
/*! exports provided: deviceDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceDefaults", function() { return deviceDefaults; });
// import type { DrivetrainSimSensorData }
var deviceDefaults = {
  "drivetrain": function drivetrain(name) {
    return {
      deviceType: "drivetrain",
      name: name,
      heading: 0,
      rotation: 0,
      velocity: 50,
      isMoving: false,
      isDone: true
    };
  },
  "gyro": function gyro(name) {
    return {
      deviceType: "gyro",
      name: name,
      heading: 0,
      rotation: 0,
      rate: 0
    };
  },
  "inertial": function inertial(name) {
    return {
      deviceType: "inertial",
      name: name,
      heading: 0,
      rotation: 0,
      acceleration: 0,
      gyroRateX: 0,
      gyroRateY: 0,
      gyroRateZ: 0,
      orientationPitch: 0,
      orientationRoll: 0,
      orientationYaw: 0
    };
  },
  "bumper": function bumper(name) {
    return {
      deviceType: "bumper",
      name: name,
      state: 0
    };
  },
  "linetracker": function linetracker(name) {
    return {
      deviceType: "linetracker",
      name: name,
      reflectivity: 0
    };
  },
  "motor": function motor(name) {
    return {
      deviceType: "motor",
      name: name,
      isMoving: false,
      isDone: true,
      position: 0,
      velocity: 50,
      motorMaxRPM: 600,
      motorTimeoutMS: 0
    };
  },
  "distance": function distance(name) {
    return {
      deviceType: "distance",
      name: name,
      distance: 0,
      isObjectFound: 0
    };
  },
  "distance2nd": function distance2nd(name) {
    return {
      deviceType: "distance2nd",
      name: name,
      distance: 0,
      velocity: 0,
      isObjectFound: 0,
      size: ""
    };
  },
  "eye": function eye(name) {
    return {
      deviceType: "color",
      name: name,
      isObjectFound: 0,
      color: 0,
      hue: 0,
      brightness: 100.0
    };
  },
  "color": function color(name) {
    return {
      deviceType: "color",
      name: name,
      isObjectFound: 0,
      color: 0,
      hue: 0,
      brightness: 100.0
    };
  },
  "optical": function optical(name) {
    return {
      deviceType: "optical",
      name: name,
      isObjectFound: 0,
      color: 0,
      hue: 0,
      brightness: 0.0
    };
  },
  "rotation": function rotation(name) {
    return {
      deviceType: "rotation",
      name: name,
      angle: 0,
      position: 0,
      velocity: 0
    };
  },
  "location": function location(name) {
    return {
      deviceType: "gps",
      name: name,
      x: 0,
      y: 0,
      angle: 0
    };
  },
  "ai": function ai(name) {
    return {
      deviceType: "ai",
      name: name,
      vision: {
        objectsDetected: []
      },
      smell: {
        objectsDetected: []
      },
      base: {
        ID: "",
        Name: "Base",
        Distance: 0,
        Angle: 0,
        X: 0,
        Y: 0,
        Storage: 0
      },
      player: {
        X: 0,
        Y: 0,
        Charge: 0,
        Storage: 0,
        XP: 0,
        CurrentXP: 0,
        isUnderAttack: false,
        Level: 0,
        DaysSurvived: 0,
        FoodEaten: 0,
        FoodCollected: 0,
        EnemiesDefeated: 0,
        DistanceTravelled: 0,
        isHibernating: false
      },
      allTrackables: []
    };
  }
};


/***/ }),

/***/ "./src/SimWindow/SimUnity/SimSensorValues.ts":
/*!***************************************************!*\
  !*** ./src/SimWindow/SimUnity/SimSensorValues.ts ***!
  \***************************************************/
/*! exports provided: sensorValues, updateValues, resetValues, lockIsDrivingOn, getCurrentAIObjectPresent, getCurrentAIObjectPresentWithWait, getCurrentAIValue, getCurrentAIValueWithWait, on, off, waitForSensorUpdate, waitForSensorUpdateMin, Drivetrain, Motor, Bumper, Distance, Color, Optical, Rotation, GPS, Distance2nd, Gyro, Inertial, LineTracker, VR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sensorValues", function() { return sensorValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateValues", function() { return updateValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetValues", function() { return resetValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lockIsDrivingOn", function() { return lockIsDrivingOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentAIObjectPresent", function() { return getCurrentAIObjectPresent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentAIObjectPresentWithWait", function() { return getCurrentAIObjectPresentWithWait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentAIValue", function() { return getCurrentAIValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentAIValueWithWait", function() { return getCurrentAIValueWithWait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForSensorUpdate", function() { return waitForSensorUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waitForSensorUpdateMin", function() { return waitForSensorUpdateMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drivetrain", function() { return Drivetrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Motor", function() { return Motor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bumper", function() { return Bumper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Distance", function() { return Distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Optical", function() { return Optical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rotation", function() { return Rotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GPS", function() { return GPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Distance2nd", function() { return Distance2nd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gyro", function() { return Gyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inertial", function() { return Inertial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineTracker", function() { return LineTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VR", function() { return VR; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Blockly_Extensions_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Blockly/Extensions/utils/helpers */ "./src/Blockly/Extensions/utils/helpers.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _SimSensorDataHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SimSensorDataHelpers */ "./src/SimWindow/SimUnity/SimSensorDataHelpers.ts");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("SimSensorValues");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

var sensorValuesIQ = {
  0: {
    deviceType: "drivetrain",
    name: "",
    heading: 0,
    rotation: 0,
    velocity: 0,
    isMoving: false,
    isDone: true
  },
  1: {
    deviceType: "motor",
    name: "IntakeMotor",
    isDone: true,
    isMoving: false,
    position: 0,
    velocity: 0
  },
  2: {
    deviceType: "bumper",
    name: "IntakeBumper",
    state: 0
  },
  3: {
    deviceType: "distance2nd",
    name: "FrontDistance2nd",
    isObjectFound: 0,
    distance: 0,
    velocity: 0,
    size: ""
  },
  5: {
    deviceType: "optical",
    name: "FrontOptical",
    isObjectFound: 0,
    color: 0,
    // 0-none, 1-red, 2-green, 3-blue, 4-yellow, 5-orange, 6-purple, 7-cyan, 8-white
    hue: 0,
    brightness: 0.0
  },
  7: {
    deviceType: "color",
    name: "Color",
    isObjectFound: 0,
    color: 0,
    hue: 0,
    brightness: 0.0
  },
  9: {
    deviceType: "gyro",
    name: "Gyro",
    heading: 0,
    rotation: 0,
    rate: 0
  },
  10: {
    deviceType: "motor",
    name: "ArmMotor",
    isDone: true,
    isMoving: false,
    position: 0,
    velocity: 0
  },
  11: {
    deviceType: "inertial",
    name: "Inertial",
    heading: 0,
    rotation: 0,
    acceleration: 0,
    gyroRateX: 0,
    gyroRateY: 0,
    gyroRateZ: 0,
    orientationPitch: 0,
    orientationRoll: 0,
    orientationYaw: 0
  }
};
var sensorValuesV5 = {
  0: {
    deviceType: "drivetrain",
    name: "",
    heading: 0,
    rotation: 0,
    velocity: 0,
    isMoving: false,
    isDone: true
  },
  10: {
    deviceType: "motor",
    name: "IntakeMotorGroup",
    isDone: true,
    isMoving: false,
    position: 0,
    velocity: 0
  },
  21: {
    deviceType: "bumper",
    name: "bumper",
    state: 0
  },
  18: {
    deviceType: "distance",
    name: "BottomDistance",
    distance: 0,
    isObjectFound: 0
  },
  2: {
    deviceType: "optical",
    name: "RollerOptical",
    isObjectFound: 0,
    color: 0,
    // 0-none, 1-red, 2-green, 3-blue, 4-yellow, 5-orange, 6-purple, 7-cyan, 8-white
    hue: 0,
    brightness: 0.0
  },
  3: {
    deviceType: "gps",
    name: "gps",
    x: 0,
    y: 0,
    angle: 0
  },
  22: {
    deviceType: "linetracker",
    name: "BottomLineTracker",
    reflectivity: 0
  },
  23: {
    deviceType: "linetracker",
    name: "MiddleLineTracker",
    reflectivity: 0
  },
  24: {
    deviceType: "linetracker",
    name: "TopLineTracker",
    reflectivity: 0
  }
};
var sensorValuesVR = {
  0: {
    deviceType: "drivetrain",
    name: "drivetrain",
    heading: 0,
    rotation: 0,
    velocity: 50,
    isMoving: false,
    isDone: true
  }
};
var sensorValues = _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"] ? sensorValuesVR : _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsIQ"] ? sensorValuesIQ : sensorValuesV5;

//#region event system

var eventCallbacks = {
  "bumperChange": [],
  "opticalChange": [],
  "underAttack": [],
  "levelUp": [],
  "sensorDataUpdated": []
};
function on(eventName, callback) {
  log.debug("on event", eventName, callback.name);
  if (eventCallbacks[eventName].indexOf(callback) >= 0) {
    log.warn("Duplicate callback.", eventName, callback.name);
    return;
  }
  eventCallbacks[eventName].push(callback);
}
function off(eventName, callback) {
  log.debug("off event", eventName, callback.name);
  var i = eventCallbacks[eventName].indexOf(callback);
  if (i < 0) {
    log.warn("Unknown callback.", eventName, callback.name);
    return;
  }
  eventCallbacks[eventName].splice(i, 1);
}
function fireEvent(eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  log.debug.apply(log, ["fireEvent", eventName].concat(args));
  if (eventCallbacks[eventName]) {
    eventCallbacks[eventName].slice(0).forEach(function (callback) {
      callback.apply(void 0, args);
    });
  }
}
//#endregion event system

function updateValuesVS(newData) {
  var sv = sensorValues;
  for (var _port in newData) {
    if (Object.prototype.hasOwnProperty.call(newData, _port)) {
      var portNum = parseInt(_port, 10);
      var newPortInfo = newData[_port];
      var oldPortInfo = sv[_port];
      var deviceType = newPortInfo.deviceType;
      var deviceName = newPortInfo.name.toUpperCase();
      if (deviceType === "bumper" && oldPortInfo) {
        var newBumperInfo = newPortInfo;
        var oldBumperInfo = oldPortInfo;
        if (oldBumperInfo.state !== newBumperInfo.state) {
          fireEvent("bumperChange", portNum, deviceName, newBumperInfo.state !== 0);
        }
      } else if (deviceType === "color" && oldPortInfo) {
        var newOpticalInfo = newPortInfo;
        var oldOpticalInfo = oldPortInfo;
        if (oldOpticalInfo.isObjectFound !== newOpticalInfo.isObjectFound) {
          fireEvent("opticalChange", portNum, deviceName, newOpticalInfo.isObjectFound !== 0);
        }
      }
    }
  }
  Object.assign(sensorValues, newData);
  log.debug("new sensor values:", sensorValues);
}
var isDrivingLockedOn = false;

/**
 * use this to lock the drivetrain.isMoving to true.
 * @param active iindicates if the value should be locked on
 */
function lockIsDrivingOn(active) {
  isDrivingLockedOn = active;
  if (isDrivingLockedOn) {
    var sv = sensorValues;
    sv[0].isMoving = true;
    sv[0].isDone = false;
  }
}

// front_eye = EyeSensor("fronteye", 3)
// down_eye = EyeSensor("downeye", 4)
function updateValuesVR(newData) {
  log.info(newData);
  var sv = sensorValues;
  var firedUnderAttackEvent = false;
  var firedLevelUpEvent = false;
  for (var _port2 in newData) {
    if (Object.prototype.hasOwnProperty.call(newData, _port2)) {
      var portNum = parseInt(_port2, 10);
      if (isNaN(portNum)) {
        // for some reason we are getting random messages that are old rover ai data.
        // we are only expecting the new standard port data stucture, so this unexpected
        // data causes issues with events. as such, we want to ignore any data that is
        // not using the port data structure.
        log.debug("portNum is NaN... skip data", portNum, newData);
        continue;
      }
      var newPortInfo = newData[_port2];
      var oldPortInfo = sv[_port2];
      var deviceType = newPortInfo.deviceType;
      if (deviceType !== "ai") {
        var deviceName = newPortInfo.name.toUpperCase();
        if (deviceType === "bumper" && oldPortInfo) {
          var newBumperInfo = newPortInfo;
          var oldBumperInfo = oldPortInfo;
          if (oldBumperInfo.state !== newBumperInfo.state) {
            fireEvent("bumperChange", portNum, deviceName, newBumperInfo.state !== 0);
          }
        } else if (deviceType === "color" && oldPortInfo) {
          var newOpticalInfo = newPortInfo;
          var oldOpticalInfo = oldPortInfo;
          if (oldOpticalInfo.isObjectFound !== newOpticalInfo.isObjectFound) {
            fireEvent("opticalChange", portNum, deviceName, newOpticalInfo.isObjectFound !== 0);
          }
        }
      } else {
        if (oldPortInfo) {
          var newRoverInfo = newPortInfo.player;
          var oldRoverInfo = oldPortInfo.player;
          if (!oldRoverInfo.isUnderAttack && newRoverInfo.isUnderAttack) {
            if (!firedUnderAttackEvent) {
              fireEvent("underAttack");
              firedUnderAttackEvent = true;
            }
          }
          if (oldRoverInfo.Level !== newRoverInfo.Level) {
            if (!firedLevelUpEvent) {
              fireEvent("levelUp");
              firedLevelUpEvent = true;
            }
          }
        }
      }
    }
  }

  // TODO: we need to handle Rover Rescue sensors

  Object.assign(sensorValues, newData);

  // hack to keep the is moving flag set when using fake commands like rover go to
  // if (isDrivingLockedOn) {
  //   const sv = sensorValues as SimSensorDataVR;
  //   sv.drivetrain.isMoving = true;
  //   sv.drivetrain.isDone = false;
  // }

  log.debug("new sensor values:", sensorValues);
  fireEvent("sensorDataUpdated");
}
function updateValues(newData) {
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
    updateValuesVR(newData);
  } else {
    updateValuesVS(newData);
  }
}
function resetValuesIQ() {
  var defaultValues = {
    0: {
      deviceType: "drivetrain",
      name: "",
      heading: 0,
      rotation: 0,
      velocity: 0,
      isMoving: false,
      isDone: true
    },
    1: {
      deviceType: "motor",
      name: "IntakeMotor",
      isDone: true,
      isMoving: false,
      position: 0,
      velocity: 0
    },
    2: {
      deviceType: "bumper",
      name: "IntakeBumper",
      state: 0
    },
    3: {
      deviceType: "distance2nd",
      name: "FrontDistance2nd",
      isObjectFound: 0,
      distance: 0,
      velocity: 0,
      size: ""
    },
    5: {
      deviceType: "optical",
      name: "FrontOptical",
      isObjectFound: 0,
      color: 0,
      // 0-none, 1-red, 2-green, 3-blue, 4-yellow, 5-orange, 6-purple, 7-cyan, 8-white
      hue: 0,
      brightness: 0.0
    },
    9: {
      deviceType: "gyro",
      name: "Gyro",
      heading: 0,
      rotation: 0,
      rate: 0
    },
    10: {
      deviceType: "motor",
      name: "ArmMotor",
      isDone: true,
      isMoving: false,
      position: 0,
      velocity: 0
    },
    11: {
      deviceType: "inertial",
      name: "Inertial",
      heading: 0,
      rotation: 0,
      acceleration: 0,
      gyroRateX: 0,
      gyroRateY: 0,
      gyroRateZ: 0,
      orientationPitch: 0,
      orientationRoll: 0,
      orientationYaw: 0
    }
  };
  Object.assign(sensorValues, defaultValues);
  log.debug("reset sensor values:", sensorValues);
}
function resetValuesV5() {
  var defaultValues = {
    0: {
      deviceType: "drivetrain",
      name: "",
      heading: 0,
      rotation: 0,
      velocity: 0,
      isMoving: false,
      isDone: true
    },
    10: {
      deviceType: "motor",
      name: "IntakeMotorGroup",
      isDone: true,
      isMoving: false,
      position: 0,
      velocity: 0
    },
    21: {
      deviceType: "bumper",
      name: "bumper",
      state: 0
    },
    18: {
      deviceType: "distance",
      name: "BottomDistance",
      distance: 0,
      isObjectFound: 0
    },
    2: {
      deviceType: "optical",
      name: "RollerOptical",
      isObjectFound: 0,
      color: 0,
      // 0-none, 1-red, 2-green, 3-blue, 4-yellow, 5-orange, 6-purple, 7-cyan, 8-white
      hue: 0,
      brightness: 0.0
    },
    3: {
      deviceType: "gps",
      name: "gps",
      x: 0,
      y: 0,
      angle: 0
    },
    22: {
      deviceType: "linetracker",
      name: "BottomLineTracker",
      reflectivity: 0
    },
    23: {
      deviceType: "linetracker",
      name: "MiddleLineTracker",
      reflectivity: 0
    },
    24: {
      deviceType: "linetracker",
      name: "TopLineTracker",
      reflectivity: 0
    }
  };
  Object.assign(sensorValues, defaultValues);
  log.debug("reset sensor values:", sensorValues);
}
function resetValuesVR(currentConfig) {
  var defaultValues;
  for (var _key2 in currentConfig) {
    if (Object.prototype.hasOwnProperty.call(currentConfig, _key2)) {
      var device = currentConfig[_key2];
      if (_SimSensorDataHelpers__WEBPACK_IMPORTED_MODULE_3__["deviceDefaults"][device.type]) {
        defaultValues[device.port] = _SimSensorDataHelpers__WEBPACK_IMPORTED_MODULE_3__["deviceDefaults"][device.type](device.type);
      }
    }
  }
  Object.assign(sensorValues, defaultValues);
}
function resetValues(currentConfig) {
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsIQ"]) {
    resetValuesIQ();
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsV5"]) {
    resetValuesV5();
  } else {
    resetValuesVR(currentConfig);
  }
}

//#region AI sensor data helpers
var VRAIProcessor = /*#__PURE__*/function () {
  function VRAIProcessor() {
    _classCallCheck(this, VRAIProcessor);
    this.port = 1;
  }

  /**
   * sets the port of the AI sensor
   * @param port the port of the AI sensor
   */
  _createClass(VRAIProcessor, [{
    key: "setPort",
    value: function setPort(port) {
      this.port = port;
    }

    /**
     * returns all objects of a given type for the specified sense
     * @param senseType the sense to check agains
     * @param objectType the type (name) of the objects to return
     * @returns the list of objects matching the filter params
     */
  }, {
    key: "getObjectsFromSense",
    value: function getObjectsFromSense(senseType, objectType) {
      return this.filterObjectsByType(this.getAllObjectsFromSense(senseType), objectType);
    }

    /**
     * check to see if the object type is present for the selected sense
     * @param senseType the sense that should be checked against
     * @param objectType the object type to look for
     * @returns true if there is at least on of the object type found by the sense
     */
  }, {
    key: "isObjectPresent",
    value: function isObjectPresent(senseType, objectType) {
      return this.getObjectsFromSense(senseType, objectType).length > 0;
    }

    /**
     * will find the closet object based on the parameters
     * @param senseType the sense that should be checked against
     * @param objectType the object type to look for
     * @returns 
     */
  }, {
    key: "getClosestObject",
    value: function getClosestObject(senseType, objectType) {
      var relevantObjects = this.sortObjectsByDistance(this.getObjectsFromSense(senseType, objectType));
      if (relevantObjects.length > 0) {
        return relevantObjects[0];
      }
      return null;
    }

    /**
     * get the param value of the AI object if it exists
     * @param senseType the sense that should be checked against
     * @param objectType the object type to look for
     * @param property the propert from the object
     * @param axis if location, the axis is which axis of the location. ignored for other properties
     * @returns the value
     */
  }, {
    key: "getObjectValue",
    value: function getObjectValue(senseType, objectType, property, axis) {
      var closestObject = this.getClosestObject(senseType, objectType);
      if (!closestObject) {
        if (property === "Distance" && (objectType === "obstacle" || objectType === "hazard")) {
          return 1000;
        }
        return 0;
      }
      if (property !== "Location") {
        return closestObject[property];
      } else {
        return closestObject[axis];
      }
    }
  }, {
    key: "getObjectById",
    value: function getObjectById(id) {
      var objects = this.getAllObjectsFromSense("all");
      var _iterator = _createForOfIteratorHelper(objects),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var obj = _step.value;
          if (obj.ID === id) {
            return obj;
          }
        }
        // TODO: remove this after Raj fixes the data...
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var objectsVision = this.getAllObjectsFromSense("vision");
      var _iterator2 = _createForOfIteratorHelper(objectsVision),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _obj = _step2.value;
          if (_obj.ID === id) {
            return _obj;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var objectsSmell = this.getAllObjectsFromSense("smell");
      var _iterator3 = _createForOfIteratorHelper(objectsSmell),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _obj2 = _step3.value;
          if (_obj2.ID === id) {
            return _obj2;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return null;
    }

    /**
    * get the param value of the AI object if it exists
    * @param senseType the sense that should be checked against
    * @param objectType the object type to look for
    * @param property the propert from the object
    * @param axis if location, the axis is which axis of the location. ignored for other properties
    * @returns the value
    */
  }, {
    key: "getObjectValueByID",
    value: function getObjectValueByID(id, objectType, property, axis) {
      var obj = this.getObjectById(id);
      if (!obj) {
        if (property === "Distance" && (objectType === "obstacle" || objectType === "hazard")) {
          return 1000;
        }
        return 0;
      }
      if (property !== "Location") {
        return obj[property];
      } else {
        return obj[axis];
      }
    }
    /**
     * will return all of the current objects for a given sense
     * @param senseType the sense to pull the objects for
     * @returns the current objects for the given sense
     */
  }, {
    key: "getAllObjectsFromSense",
    value: function getAllObjectsFromSense(senseType) {
      if (senseType === "all") {
        return sensorValues[this.port].allTrackables;
      } else {
        return sensorValues[this.port][senseType].objectsDetected;
      }
    }

    /**
     * will return only the objects of the given type
     * @param objects the source list of objects
     * @param objectType the type (name) of the objects to return
     * @returns the filter list of objects
     */
  }, {
    key: "filterObjectsByType",
    value: function filterObjectsByType(objects, objectType) {
      return objects.filter(function (currentObject) {
        return currentObject.Name === VRObjectLookup[objectType];
      });
    }
  }, {
    key: "sortObjectsByDistance",
    value: function sortObjectsByDistance(objects) {
      return objects.sort(function (a, b) {
        return a.Distance - b.Distance;
      });
    }
  }]);
  return VRAIProcessor;
}();
;
var AIProcessor = new VRAIProcessor();

// TODO: move to direct instance access
function getCurrentAIObjectPresent(objectType, object) {
  return AIProcessor.isObjectPresent(objectType, object);
}

// TODO: move to direct instance access
function getCurrentAIValue(type, property, params) {
  return AIProcessor.getObjectValue(type, params.OBJECT, property, params.AXIS);
}

// TODO: move to direct instance access
function getCurrentAIObjectPresentWithWait(_x, _x2) {
  return _getCurrentAIObjectPresentWithWait.apply(this, arguments);
}
function _getCurrentAIObjectPresentWithWait() {
  _getCurrentAIObjectPresentWithWait = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(objectType, object) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return waitForSensorUpdate();
        case 2:
          return _context.abrupt("return", getCurrentAIObjectPresent(objectType, object));
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getCurrentAIObjectPresentWithWait.apply(this, arguments);
}
function getCurrentAIValueWithWait(_x3, _x4, _x5) {
  return _getCurrentAIValueWithWait.apply(this, arguments);
} //#endregion AI sensor data helpers
function _getCurrentAIValueWithWait() {
  _getCurrentAIValueWithWait = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(type, property, params) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return waitForSensorUpdate();
        case 2:
          return _context2.abrupt("return", getCurrentAIValue(type, property, params));
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getCurrentAIValueWithWait.apply(this, arguments);
}
var Drivetrain = {
  isDone: function isDone() {
    return sensorValues["0"].isDone;
  },
  isMoving: function isMoving() {
    return sensorValues["0"].isMoving;
  },
  heading: function heading() {
    return sensorValues["0"].heading;
  },
  rotation: function rotation() {
    return sensorValues["0"].rotation;
  },
  velocity: function velocity() {
    return sensorValues["0"].velocity;
  }
};
var Motor = {
  isDone: function isDone(port) {
    var motorDevice = sensorValues[port];
    if ("isDone" in motorDevice) {
      return motorDevice.isDone;
    }
  },
  isMoving: function isMoving(port) {
    var motorDevice = sensorValues[port];
    if ("isMoving" in motorDevice) {
      return motorDevice.isMoving;
    }
  },
  position: function position(port) {
    var motorDevice = sensorValues[port];
    if ("position" in motorDevice) {
      return motorDevice.position;
    }
  },
  velocity: function velocity(port) {
    var motorDevice = sensorValues[port];
    if ("velocity" in motorDevice) {
      return motorDevice.velocity;
    }
  }
};
var Bumper = {
  pressed: function pressed(port) {
    var bumperDevice = sensorValues[port];
    if ("state" in bumperDevice) {
      return bumperDevice.state;
    }
  }
};
var LineTracker = {
  reflectivity: function reflectivity(port) {
    var lineTrackerDevice = sensorValues[port];
    if ("reflectivity" in lineTrackerDevice) {
      return lineTrackerDevice.reflectivity;
    }
  }
};
var Distance = {
  isObjectFound: function isObjectFound(port) {
    var distanceDevice = sensorValues[port];
    if ("isObjectFound" in distanceDevice) {
      return distanceDevice.isObjectFound;
    }
  },
  distance: function distance(port) {
    var distanceDevice = sensorValues[port];
    if ("distance" in distanceDevice) {
      return distanceDevice.distance;
    }
  }
};
var Distance2nd = {
  isObjectFound: function isObjectFound(port) {
    var distanceDevice = sensorValues[port];
    if ("isObjectFound" in distanceDevice) {
      return distanceDevice.isObjectFound;
    }
  },
  distance: function distance(port) {
    var distanceDevice = sensorValues[port];
    if ("distance" in distanceDevice) {
      return distanceDevice.distance;
    }
  },
  velocity: function velocity(port) {
    var distanceDevice = sensorValues[port];
    if ("velocity" in distanceDevice) {
      return distanceDevice.velocity;
    }
  },
  size: function size(port) {
    var distanceDevice = sensorValues[port];
    if ("size" in distanceDevice) {
      return distanceDevice.size;
    }
  }
};
var Color = {
  isObjectFound: function isObjectFound(port) {
    var colorDevice = sensorValues[port];
    if ("isObjectFound" in colorDevice) {
      return colorDevice.isObjectFound;
    }
  },
  color: function color(port) {
    var colorDevice = sensorValues[port];
    if ("color" in colorDevice) {
      return colorDevice.color;
    }
  },
  hue: function hue(port) {
    var colorDevice = sensorValues[port];
    if ("hue" in colorDevice) {
      return colorDevice.hue;
    }
  },
  brightness: function brightness(port) {
    var colorDevice = sensorValues[port];
    if ("brightness" in colorDevice) {
      return colorDevice.brightness;
    }
  }
};
var Optical = {
  isObjectFound: function isObjectFound(port) {
    var opticalDevice = sensorValues[port];
    if ("isObjectFound" in opticalDevice) {
      return opticalDevice.isObjectFound === 1;
    }
  },
  color: function color(port) {
    var opticalDevice = sensorValues[port];
    if ("color" in opticalDevice) {
      return opticalDevice.color;
    }
  },
  hue: function hue(port) {
    var opticalDevice = sensorValues[port];
    if ("hue" in opticalDevice) {
      return opticalDevice.hue;
    }
  },
  brightness: function brightness(port) {
    var opticalDevice = sensorValues[port];
    if ("brightness" in opticalDevice) {
      return opticalDevice.brightness;
    }
  }
};
var Rotation = {
  angle: function angle(port) {
    var rotationDevice = sensorValues[port];
    if ("angle" in rotationDevice) {
      return rotationDevice.angle;
    }
  },
  position: function position(port) {
    var rotationDevice = sensorValues[port];
    if ("position" in rotationDevice) {
      return rotationDevice.position;
    }
  },
  velocity: function velocity(port) {
    var rotationDevice = sensorValues[port];
    if ("velocity" in rotationDevice) {
      return rotationDevice.velocity;
    }
  }
};
var GPS = {
  x: function x(port) {
    var gpsDevice = sensorValues[port];
    if ("x" in gpsDevice) {
      return gpsDevice.x;
    }
  },
  y: function y(port) {
    var gpsDevice = sensorValues[port];
    if ("y" in gpsDevice) {
      return gpsDevice.y;
    }
  },
  angle: function angle(port) {
    var gpsDevice = sensorValues[port];
    if ("angle" in gpsDevice) {
      return gpsDevice.angle;
    }
  }
};
var Gyro = {
  heading: function heading(port) {
    var gyroDevice = sensorValues[port];
    if ("heading" in gyroDevice) {
      return gyroDevice.heading;
    }
  },
  rotation: function rotation(port) {
    var gyroDevice = sensorValues[port];
    if ("rotation" in gyroDevice) {
      return gyroDevice.rotation;
    }
  },
  rate: function rate(port) {
    var gyroDevice = sensorValues[port];
    if ("rate" in gyroDevice) {
      return gyroDevice.rate;
    }
  }
};
var Inertial = {
  heading: function heading() {
    var gyroDevice = sensorValues[11];
    if ("heading" in gyroDevice) {
      return gyroDevice.heading;
    }
  },
  rotation: function rotation() {
    var gyroDevice = sensorValues[11];
    if ("rotation" in gyroDevice) {
      return gyroDevice.rotation;
    }
  },
  acceleration: function acceleration() {
    var gyroDevice = sensorValues[11];
    if ("acceleration" in gyroDevice) {
      return gyroDevice.acceleration;
    }
  },
  gyroRateX: function gyroRateX() {
    var gyroDevice = sensorValues[11];
    if ("gyroRateX" in gyroDevice) {
      return gyroDevice.gyroRateX;
    }
  },
  gyroRateY: function gyroRateY() {
    var gyroDevice = sensorValues[11];
    if ("gyroRateY" in gyroDevice) {
      return gyroDevice.gyroRateY;
    }
  },
  gyroRateZ: function gyroRateZ() {
    var gyroDevice = sensorValues[11];
    if ("gyroRateZ" in gyroDevice) {
      return gyroDevice.gyroRateZ;
    }
  },
  orientationPitch: function orientationPitch() {
    var gyroDevice = sensorValues[11];
    if ("orientationPitch" in gyroDevice) {
      return gyroDevice.orientationPitch;
    }
  },
  orientationRoll: function orientationRoll() {
    var gyroDevice = sensorValues[11];
    if ("orientationRoll" in gyroDevice) {
      return gyroDevice.orientationRoll;
    }
  },
  orientationYaw: function orientationYaw() {
    var gyroDevice = sensorValues[11];
    if ("orientationYaw" in gyroDevice) {
      return gyroDevice.orientationYaw;
    }
  }
};
var VRObjectLookup = {
  battery: "Minerals",
  enemy: "Hostile",
  home: "Base",
  obstacle: "Obstacle",
  hazard: "Hazard"
};
var VR = {
  Drivetrain: {
    isDone: function isDone() {
      return sensorValues["0"].isDone;
    },
    isMoving: function isMoving() {
      return sensorValues["0"].isMoving;
    },
    heading: function heading() {
      return sensorValues["0"].heading;
    },
    rotation: function rotation() {
      return sensorValues["0"].rotation;
    }
  },
  Distance: {
    distance: function distance(port) {
      return sensorValues[port].distance;
    },
    // objectFound: (distanceSensor: string = "distance"): boolean => {
    //   if (distanceSensor === "distance" || distanceSensor === "frontdistance") {
    //     return (sensorValues as SimSensorDataVR).distance.isObjectFound === 1
    //   } else if (distanceSensor === "reardistance") {
    //     return (sensorValues as SimSensorDataVR).distanceRear.isObjectFound === 1
    //   } else if (distanceSensor === "leftdistance") {
    //     return (sensorValues as SimSensorDataVR).distanceLeft.isObjectFound === 1
    //   } else if (distanceSensor === "rightdistance") {
    //     return (sensorValues as SimSensorDataVR).distanceRight.isObjectFound === 1
    //   }
    // },
    objectFound: function objectFound(port) {
      // const distanceDevice = (sensorValues as SimSensorDataVS)[port];
      var distanceDevice = sensorValues[port];
      return distanceDevice.isObjectFound === 1;
    }
  },
  Gyro: {
    crashDetected: function crashDetected(port) {
      var gyroDevice = sensorValues[port];
      return gyroDevice.isCrashDetected;
    }
  },
  Position: {
    location: function location(port, axis) {
      var device = sensorValues[port];
      if (axis === "X") {
        return device.x;
      } else if (axis === "Y") {
        return device.y;
      }
    },
    angle: function angle(port) {
      var device = sensorValues[port];
      return device.angle;
    }
  },
  GPS: {
    x: function x(port) {
      var gpsDevice = sensorValues[port];
      console.log("device:", gpsDevice);
      if ("x" in gpsDevice) {
        return gpsDevice.x;
      }
    },
    y: function y(port) {
      var gpsDevice = sensorValues[port];
      if ("y" in gpsDevice) {
        return gpsDevice.y;
      }
    },
    angle: function angle(port) {
      var gpsDevice = sensorValues[port];
      if ("angle" in gpsDevice) {
        return gpsDevice.angle;
      }
    }
  },
  ColorSensor: {
    nearObject: function nearObject(port) {
      var device = sensorValues[port];
      return device.isObjectFound === 1;
    },
    color: function color(port) {
      var device = sensorValues[port];
      return device.color;
    },
    colorPlus: function colorPlus(port) {
      var device = sensorValues[port];
      return {
        R: 0,
        G: 0,
        B: 0
      };
    },
    brightness: function brightness(port) {
      var device = sensorValues[port];
      return device.brightness;
    }
  },
  Bumper: {
    pressed: function pressed(port) {
      var device = sensorValues[port];
      return device.state === 1;
    }
  },
  AI: {
    batteryCapacity: function batteryCapacity(port) {
      return sensorValues[port].player.Charge;
    },
    batteryStored: function batteryStored(port, location) {
      if (location === "back") {
        return sensorValues[port].player.Storage;
      }
      return sensorValues[port].base.Storage;
    },
    playerPosition: function playerPosition(port, axis) {
      return sensorValues[port].player[axis];
    },
    playerUnderAttack: function playerUnderAttack(port) {
      return sensorValues[port].player.isUnderAttack;
    },
    playerLevel: function playerLevel(port) {
      return sensorValues[port].player.Level;
    },
    playerExp: function playerExp(port) {
      return sensorValues[port].player.CurrentXP;
    },
    playerCapacity: function playerCapacity(port) {
      return sensorValues[port].player.Level + 1;
    },
    homeDirection: function homeDirection(port) {
      return sensorValues[port].base.Angle;
    },
    homeDistance: function homeDistance(port) {
      return sensorValues[port].base.Distance;
    },
    homeLocation: function homeLocation(port, axis) {
      return sensorValues[port].base[axis];
    },
    processor: AIProcessor
  }
};

// TODO: Rotation and GPS for V5

// TODO: we will need a helper function that will return the will get the device type for
//       a port given the deviceType dield. We are hard coding drivetrain on 0 so we don't
//       need it for the drivetrain device.

function waitForSensorUpdate() {
  return new Promise(function (resolve, reject) {
    var updateWaiter = function updateWaiter() {
      off("sensorDataUpdated", updateWaiter);
      resolve();
    };
    on("sensorDataUpdated", updateWaiter);
  });
}
function waitForSensorUpdateMin(_x6) {
  return _waitForSensorUpdateMin.apply(this, arguments);
}
function _waitForSensorUpdateMin() {
  _waitForSensorUpdateMin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(min) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            var minTimePassed = false;
            waitForSensorUpdate().then(function () {
              if (minTimePassed) {
                resolve();
              } else {
                waitForSensorUpdate().then(resolve);
              }
            });
            // make sure min time passed
            Object(_Blockly_Extensions_utils_helpers__WEBPACK_IMPORTED_MODULE_1__["waitms"])(min).then(function () {
              minTimePassed = true;
            });
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _waitForSensorUpdateMin.apply(this, arguments);
}


/***/ }),

/***/ "./src/SimWindow/messageEnums.ts":
/*!***************************************!*\
  !*** ./src/SimWindow/messageEnums.ts ***!
  \***************************************/
/*! exports provided: SimInterpreterStateEnum, SimPrintColorEnum, SimColorSensorColorEnum, SimHighlightState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimInterpreterStateEnum", function() { return SimInterpreterStateEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimPrintColorEnum", function() { return SimPrintColorEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimColorSensorColorEnum", function() { return SimColorSensorColorEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimHighlightState", function() { return SimHighlightState; });
// all global enums should go here. this should not import any other files
var SimInterpreterStateEnum = /*#__PURE__*/function (SimInterpreterStateEnum) {
  SimInterpreterStateEnum[SimInterpreterStateEnum["init"] = 0] = "init";
  SimInterpreterStateEnum[SimInterpreterStateEnum["loading"] = 1] = "loading";
  SimInterpreterStateEnum[SimInterpreterStateEnum["running"] = 2] = "running";
  SimInterpreterStateEnum[SimInterpreterStateEnum["stopped"] = 3] = "stopped";
  SimInterpreterStateEnum[SimInterpreterStateEnum["waiting"] = 4] = "waiting";
  SimInterpreterStateEnum[SimInterpreterStateEnum["notRunning"] = 5] = "notRunning";
  SimInterpreterStateEnum[SimInterpreterStateEnum["stepping"] = 6] = "stepping";
  SimInterpreterStateEnum[SimInterpreterStateEnum["paused"] = 7] = "paused";
  return SimInterpreterStateEnum;
}(SimInterpreterStateEnum || {});
var SimPrintColorEnum = /*#__PURE__*/function (SimPrintColorEnum) {
  SimPrintColorEnum[SimPrintColorEnum["black"] = 0] = "black";
  SimPrintColorEnum[SimPrintColorEnum["red"] = 1] = "red";
  SimPrintColorEnum[SimPrintColorEnum["green"] = 2] = "green";
  SimPrintColorEnum[SimPrintColorEnum["blue"] = 3] = "blue";
  return SimPrintColorEnum;
}(SimPrintColorEnum || {}); // TODO: add any extra colors
var SimColorSensorColorEnum = /*#__PURE__*/function (SimColorSensorColorEnum) {
  SimColorSensorColorEnum[SimColorSensorColorEnum["none"] = 0] = "none";
  SimColorSensorColorEnum[SimColorSensorColorEnum["red"] = 1] = "red";
  SimColorSensorColorEnum[SimColorSensorColorEnum["green"] = 2] = "green";
  SimColorSensorColorEnum[SimColorSensorColorEnum["blue"] = 3] = "blue";
  SimColorSensorColorEnum[SimColorSensorColorEnum["yellow"] = 4] = "yellow";
  SimColorSensorColorEnum[SimColorSensorColorEnum["orange"] = 5] = "orange";
  SimColorSensorColorEnum[SimColorSensorColorEnum["purple"] = 6] = "purple";
  SimColorSensorColorEnum[SimColorSensorColorEnum["cyan"] = 7] = "cyan";
  SimColorSensorColorEnum[SimColorSensorColorEnum["white"] = 8] = "white";
  SimColorSensorColorEnum[SimColorSensorColorEnum["red_violet"] = 9] = "red_violet";
  SimColorSensorColorEnum[SimColorSensorColorEnum["violet"] = 10] = "violet";
  SimColorSensorColorEnum[SimColorSensorColorEnum["blue_violet"] = 11] = "blue_violet";
  SimColorSensorColorEnum[SimColorSensorColorEnum["blue_green"] = 12] = "blue_green";
  SimColorSensorColorEnum[SimColorSensorColorEnum["yellow_green"] = 13] = "yellow_green";
  SimColorSensorColorEnum[SimColorSensorColorEnum["yellow_orange"] = 14] = "yellow_orange";
  SimColorSensorColorEnum[SimColorSensorColorEnum["red_orange"] = 15] = "red_orange";
  return SimColorSensorColorEnum;
}(SimColorSensorColorEnum || {}); // TODO: add any extra colors
var SimHighlightState = /*#__PURE__*/function (SimHighlightState) {
  SimHighlightState[SimHighlightState["queued"] = 0] = "queued";
  SimHighlightState[SimHighlightState["active"] = 1] = "active";
  SimHighlightState[SimHighlightState["inactive"] = 2] = "inactive";
  return SimHighlightState;
}(SimHighlightState || {});


/***/ }),

/***/ "./src/SimWindow/unityMessageEnums.ts":
/*!********************************************!*\
  !*** ./src/SimWindow/unityMessageEnums.ts ***!
  \********************************************/
/*! exports provided: DrivetrainCommand, DrivetrainDirection, MotorCommand, MotorDirection, MotorPort, RotationCommand */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrivetrainCommand", function() { return DrivetrainCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrivetrainDirection", function() { return DrivetrainDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotorCommand", function() { return MotorCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotorDirection", function() { return MotorDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotorPort", function() { return MotorPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotationCommand", function() { return RotationCommand; });
//#region "message structures"
/**
 * message sent from unity to ask for the skills auth information
 */
/**
 * message sent from VEXcode with the skills auth information
 */
//#endregion
//#region "message enums"
var DrivetrainCommand = /*#__PURE__*/function (DrivetrainCommand) {
  DrivetrainCommand["drive"] = "drive";
  DrivetrainCommand["driveFor"] = "driveFor";
  DrivetrainCommand["driveUntil"] = "driveUntil";
  DrivetrainCommand["turn"] = "turn";
  DrivetrainCommand["turnFor"] = "turnFor";
  DrivetrainCommand["turnToHeading"] = "turnToHeading";
  DrivetrainCommand["turnToRotation"] = "turnToRotation";
  DrivetrainCommand["driveSpeed"] = "driveSpeed";
  DrivetrainCommand["turnSpeed"] = "turnSpeed";
  DrivetrainCommand["setHeading"] = "setHeading";
  DrivetrainCommand["setRotation"] = "setRotation";
  DrivetrainCommand["stop"] = "stop";
  return DrivetrainCommand;
}(DrivetrainCommand || {});
var DrivetrainDirection = /*#__PURE__*/function (DrivetrainDirection) {
  DrivetrainDirection[DrivetrainDirection["right"] = 1] = "right";
  DrivetrainDirection[DrivetrainDirection["left"] = -1] = "left";
  DrivetrainDirection[DrivetrainDirection["forward"] = 1] = "forward";
  DrivetrainDirection[DrivetrainDirection["backward"] = -1] = "backward";
  return DrivetrainDirection;
}(DrivetrainDirection || {});
var MotorCommand = /*#__PURE__*/function (MotorCommand) {
  MotorCommand["spin"] = "spin";
  MotorCommand["spinTo"] = "spinTo";
  MotorCommand["spinFor"] = "spinFor";
  MotorCommand["stop"] = "stop";
  MotorCommand["setPosition"] = "setPosition";
  MotorCommand["setVelocity"] = "setVelocity";
  return MotorCommand;
}(MotorCommand || {});
var MotorDirection = /*#__PURE__*/function (MotorDirection) {
  MotorDirection[MotorDirection["forward"] = 1] = "forward";
  MotorDirection[MotorDirection["backward"] = -1] = "backward";
  return MotorDirection;
}(MotorDirection || {});
var MotorPort = /*#__PURE__*/function (MotorPort) {
  MotorPort[MotorPort["intake"] = 2] = "intake";
  MotorPort[MotorPort["catapult"] = 4] = "catapult";
  MotorPort[MotorPort["rubberband"] = 8] = "rubberband";
  return MotorPort;
}(MotorPort || {});
var RotationCommand = /*#__PURE__*/function (RotationCommand) {
  RotationCommand["setPosition"] = "setPosition";
  return RotationCommand;
}(RotationCommand || {}); //#endregion


/***/ }),

/***/ "./src/VexcodeTimer.ts":
/*!*****************************!*\
  !*** ./src/VexcodeTimer.ts ***!
  \*****************************/
/*! exports provided: VexcodeTimer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VexcodeTimer", function() { return VexcodeTimer; });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var VexcodeTimer = /*#__PURE__*/function () {
  /**
   * used as a generic timer with pause support
   * @param initialTime initial timer value in ms
   * @param countUp true if the timer should increase over time
   */
  function VexcodeTimer(initialTime, countUp) {
    _classCallCheck(this, VexcodeTimer);
    _defineProperty(this, "finalTimeMS", null);
    this.initialTime = initialTime;
    this.countUp = countUp;
    this.reset();
  }

  /**
   * resets the timer to the iinitial conditions and starts the timer again
   */
  _createClass(VexcodeTimer, [{
    key: "reset",
    value: function reset() {
      var startTimer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.startTimeMS = new Date().getTime();
      this.pauseStartTimeMS = null;
      this.timerOffsetMS = 0;
      this.finalTimeMS = startTimer ? null : 0;
    }

    /**
     * stops the timer and locks the returned value
     */
  }, {
    key: "stop",
    value: function stop() {
      this.finalTimeMS = this.getTime();
    }

    /**
     * pauses the timer
     */
  }, {
    key: "pause",
    value: function pause() {
      var now = new Date().getTime();
      if (!this.pauseStartTimeMS) {
        this.pauseStartTimeMS = now;
      }
    }

    /**
     * resume the timer counting after a pause
     */
  }, {
    key: "resume",
    value: function resume() {
      var now = new Date().getTime();
      if (this.pauseStartTimeMS) {
        this.timerOffsetMS += now - this.pauseStartTimeMS;
        this.pauseStartTimeMS = null;
      }
    }

    /**
     * returns the current timer value in ms
     */
  }, {
    key: "getTime",
    value: function getTime() {
      var now = new Date().getTime();
      if (this.finalTimeMS != null) {
        return this.finalTimeMS;
      }
      var pauseOffset = 0;
      if (this.pauseStartTimeMS) {
        pauseOffset = now - this.pauseStartTimeMS;
      }
      var time = now - this.startTimeMS - (this.timerOffsetMS + pauseOffset);
      return this.countUp ? this.initialTime + time : this.initialTime - time;
    }
  }]);
  return VexcodeTimer;
}();


/***/ }),

/***/ "./src/appVersionInfo.ts":
/*!*******************************!*\
  !*** ./src/appVersionInfo.ts ***!
  \*******************************/
/*! exports provided: appVersionString, sdkVersionString, isNewerVersion, sdkVersionIQ, sdkVersionIQ2, sdkVersionEXP, sdkVersionV5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appVersionString", function() { return appVersionString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sdkVersionString", function() { return sdkVersionString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNewerVersion", function() { return isNewerVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sdkVersionIQ", function() { return sdkVersionIQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sdkVersionIQ2", function() { return sdkVersionIQ2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sdkVersionEXP", function() { return sdkVersionEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sdkVersionV5", function() { return sdkVersionV5; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _version_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./version.json */ "./src/version.json");
var _version_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./version.json */ "./src/version.json", 1);

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("appVersionInfo");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();


var appInfo = _version_json__WEBPACK_IMPORTED_MODULE_1__;
var appVersionString = function appVersionString() {
  return appInfo.version;
};
var sdkVersionIQ = function sdkVersionIQ() {
  return appInfo.sdkVersionIQ;
};
var sdkVersionIQ2 = function sdkVersionIQ2() {
  return appInfo.sdkVersionIQ2;
};
var sdkVersionEXP = function sdkVersionEXP() {
  return appInfo.sdkVersionEXP;
};
var sdkVersionV5 = function sdkVersionV5() {
  return appInfo.sdkVersionV5;
};
var sdkVersionString = function sdkVersionString() {
  return  false ? undefined :  false ? undefined : sdkVersionV5();
};
var isNewerVersion = function isNewerVersion(dataVersion, storedVersion) {
  log.debug("Comparing Versions: ".concat(dataVersion, " and ").concat(storedVersion));
  var s1 = dataVersion.split(/[.-]/gm);
  var s2 = storedVersion.split(/[.-]/gm);
  var maxLength = Math.max(s1.length, s2.length);
  for (var i = 0; i < maxLength; i++) {
    var v1 = i < s1.length ? parseInt(s1[i], 10) : 0;
    var v2 = i < s2.length ? parseInt(s2[i], 10) : 0;
    if (v1 > v2) {
      // Build version is newer
      log.debug("data version is newer");
      return true;
    }
  }
  return false;
};


/***/ }),

/***/ "./src/targetPlatform.ts":
/*!*******************************!*\
  !*** ./src/targetPlatform.ts ***!
  \*******************************/
/*! exports provided: targetIsIQ, targetIsV5, targetIsEXP, targetIsPilot, targetIsGO, targetIs123, targetIsPlaygrounds, targetIsNotPlaygrounds, targetIsV5OrEXP, targetIsIqOrV5, targetIsIqOrV5OrEXP, targetIs123OrGO, targetPlatformName, currentTargetName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsIQ", function() { return targetIsIQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsV5", function() { return targetIsV5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsEXP", function() { return targetIsEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsPilot", function() { return targetIsPilot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsGO", function() { return targetIsGO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIs123", function() { return targetIs123; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsPlaygrounds", function() { return targetIsPlaygrounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsNotPlaygrounds", function() { return targetIsNotPlaygrounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsV5OrEXP", function() { return targetIsV5OrEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsIqOrV5", function() { return targetIsIqOrV5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIsIqOrV5OrEXP", function() { return targetIsIqOrV5OrEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetIs123OrGO", function() { return targetIs123OrGO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetPlatformName", function() { return targetPlatformName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentTargetName", function() { return currentTargetName; });
var targetIsV5 = "GO" === "V5";
var targetIsEXP = "GO" === "EXP";
var targetIsIQ = "GO" === "IQ";
var targetIsPilot = false; // (APP_PLATFORM === "PILOT");

var targetIsGO = "GO" === "GO";
var targetIs123 = "GO" === "123";
var targetIsV5OrEXP = targetIsV5 || targetIsEXP;
var targetIsIqOrV5 = targetIsIQ || targetIsV5;
var targetIsIqOrV5OrEXP = targetIsIQ || targetIsV5 || targetIsEXP;
var targetIs123OrGO = targetIs123 || targetIsGO;
var targetIsNotPlaygrounds = targetIs123OrGO || targetIsIqOrV5OrEXP;
var targetIsPlaygrounds = "GO" === "PG";

// User facing string
var targetPlatformName = {
  IQ: "IQ",
  V5: "V5",
  EXP: "EXP",
  PILOT: "Pilot",
  123: "123",
  GO: "GO",
  PG: "VR" // TODO: should this be i18n?
};

var knownTarget = Object.keys(targetPlatformName).includes("GO");
var currentTargetName = knownTarget ? targetPlatformName["GO"] : "unknown";


/***/ }),

/***/ "./src/utils/uuid.ts":
/*!***************************!*\
  !*** ./src/utils/uuid.ts ***!
  \***************************/
/*! exports provided: generateUUID, generateShortUUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return generateUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShortUUID", function() { return generateShortUUID; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("vrRobotModelSwitcher");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

var generateUUID = function generateUUID() {
  // tslint:disable: no-bitwise
  var d = new Date().getTime();
  var randDigit = function randDigit(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
  };
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, randDigit);
};
var generateShortUUID = function generateShortUUID() {
  // tslint:disable: no-bitwise
  var d = new Date().getTime();
  var randDigit = function randDigit(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
  };
  return "xxxxxxxx-xxxx".replace(/[xy]/g, randDigit);
};


/***/ }),

/***/ "./src/version.json":
/*!**************************!*\
  !*** ./src/version.json ***!
  \**************************/
/*! exports provided: version, sdkVersionIQ, sdkVersionIQ2, sdkVersionEXP, sdkVersionV5, copyright, vr_copyright, name, default */
/***/ (function(module) {

module.exports = {"version":"3.0.3-1","sdkVersionIQ":"20230627.09.00.00","sdkVersionIQ2":"20230627.09.00.00","sdkVersionEXP":"20220726.10.00.00","sdkVersionV5":"20220726.10.00.00","copyright":"Copyright © 2023 VEX Robotics, Inc.","vr_copyright":"Copyright © 2023 VEX Robotics, Inc.","name":"VEXcode"};

/***/ })

/******/ });
//# sourceMappingURL=SimPythonInterpreterWebWorker.bundle.js.map