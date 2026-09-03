(window["webpackJsonpwebapp"] = window["webpackJsonpwebapp"] || []).push([[22],{

/***/ "./src/Blockly/Core/vexPrismLanguages.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Core/vexPrismLanguages.ts ***!
  \***********************************************/
/*! exports provided: updatePrismLang, convertArrayToRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePrismLang", function() { return updatePrismLang; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertArrayToRegex", function() { return convertArrayToRegex; });
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../texteditor/utils/languageDataList */ "./src/texteditor/utils/languageDataList.ts");
/* harmony import */ var _PrismInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PrismInterface */ "./src/PrismInterface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



// we are using the interface to import prism to make sure we are only useing a
// single instance of prism. see the doc at the start of the interface file to
// understand why

var Prism = null;
Object(_PrismInterface__WEBPACK_IMPORTED_MODULE_2__["getPrism"])().then(function (res) {
  Prism = res;
});

/**
 * Dynamically updates the Prism Language definition for Switch Tokenization based on robotModel.
 * 
 * The language definition is created/updated by extending the default Language/Grammar 
 * definition for Python in PrismJS
 */
function updatePrismLang() {
  return _updatePrismLang.apply(this, arguments);
}
/**
 * Converts a String Array of names for classes, members, functions, etc. into a RegExp pattern
 * Returns a newly created RegExp pattern. 
 * 
 * The pattern uses \b - a word boundary - which ensures that the match 
 * won't occur in the middle of a word. For instance, it prevents "and" from matching inside "land".
 * 
 * @param arr - an array of strings containing classes, members, etc. from the VEX namespace to be tokenized
 * @returns new RegExp pattern to match specific keywords passed in from the array
 * 
 */
function _updatePrismLang() {
  _updatePrismLang = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var robotModel, lang;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          robotModel = _AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().robotModel;
          lang = {};
          if (!(robotModel === "rover")) {
            _context.next = 8;
            break;
          }
          _context.next = 5;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_Rover"])();
        case 5:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 8:
          if (!(robotModel === "vrc22")) {
            _context.next = 14;
            break;
          }
          _context.next = 11;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_VRC"])();
        case 11:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 14:
          if (!(robotModel === "vrc23")) {
            _context.next = 20;
            break;
          }
          _context.next = 17;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_VRC"])();
        case 17:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 20:
          if (!(robotModel === "vrc24")) {
            _context.next = 26;
            break;
          }
          _context.next = 23;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_VRC"])();
        case 23:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 26:
          if (!(robotModel === "viqc22")) {
            _context.next = 32;
            break;
          }
          _context.next = 29;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_VIQC"])();
        case 29:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 32:
          if (!(robotModel === "viqc23")) {
            _context.next = 38;
            break;
          }
          _context.next = 35;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_VIQC"])();
        case 35:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 38:
          if (!(robotModel === "viqc24")) {
            _context.next = 44;
            break;
          }
          _context.next = 41;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_VIQC"])();
        case 41:
          lang = _context.sent;
          _context.next = 47;
          break;
        case 44:
          _context.next = 46;
          return Object(_texteditor_utils_languageDataList__WEBPACK_IMPORTED_MODULE_1__["language_List_PG_Python_Basic"])();
        case 46:
          lang = _context.sent;
        case 47:
          if (Prism) {
            _context.next = 50;
            break;
          }
          _context.next = 50;
          return Object(_PrismInterface__WEBPACK_IMPORTED_MODULE_2__["getPrism"])();
        case 50:
          // Eventually we may want to add support for highlighting/color-coding matching braces
          // Thankfully, PrismJS has a built in plugin to support this https://prismjs.com/plugins/match-braces/
          Prism.languages['vex-py'] = Prism.languages.extend('python', {
            'vexclass': {
              pattern: convertArrayToRegex(lang.vexclass),
              alias: 'vexclass'
            },
            'vexclassinstance': {
              pattern: convertArrayToRegex(lang.vexclassinstance),
              alias: 'vexclassinstance'
            },
            'vexfunctions': {
              pattern: convertArrayToRegex(lang.vexfunctions),
              alias: 'vexfunctions'
            },
            'vexenumglobals': {
              pattern: convertArrayToRegex(lang.vexenumglobals),
              alias: 'vexenumglobals'
            },
            'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|None|not|or|pass|raise|return|try|while|with|yield|abs|all|any|apply|basestring|bin|bool|buffer|bytearray|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|intern|int|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|raw_input|reduce|reload|repr|reversed|round|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/
          });
        case 51:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _updatePrismLang.apply(this, arguments);
}
function convertArrayToRegex(arr) {
  var regex1 = '\\b(?:'; // Beginning of pattern wrapper. converts to /\b?: via new RegExp
  var regex2 = ')\\b'; // End of pattern wrapper. converts to )\b/ via new RegExp
  var joined = arr.join('|');
  var pattern = new RegExp(regex1 + joined + regex2);
  return pattern;
}


/***/ })

}]);
//# sourceMappingURL=dbfbe079625e9a4bc6ea.22.bundle.js.map