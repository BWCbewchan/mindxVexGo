this["webpackChunkwebapp"]([23],{

/***/ "./src/PdfExport.ts":
/*!**************************!*\
  !*** ./src/PdfExport.ts ***!
  \**************************/
/*! exports provided: createPDF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPDF", function() { return createPDF; });
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// tslint:disable-next-line: no-var-requires


// require("./NotoSans-Regular-normal");
// // switch (i18n.language) {
//   // case "ar":
// require("./NotoSansArabic-Regular-normal");
//     // break;
//   // case "ja":
// require("./NotoSansJP-Regular-normal");
//     // break;
//   // case "ko":
// require("./NotoSansKR-Regular-normal");
//     // break;
//   // case "th":
// require("./NotoSansThai-Regular-normal");
//     // break;
//   // case "zh-CN":
// require("./NotoSansSC-Regular-normal");
//     // break;
//   // case "zh-TW":/
// require("./NotoSansTC-Regular-normal");
//     // break;
//   // default:
//     // break;
// // }

// require("./")
// This is essential to import custom fonts.
// require("./NotoSans-Regular-normal")
// require("./NotoSansArabic-Regular-normal")
window.html2canvas = html2canvas__WEBPACK_IMPORTED_MODULE_0___default.a;
function prepareData(params) {
  var rowData = "";
  if (params.metadata.length > 0) {
    params.metadata.map(function (item) {
      if (item.type === "image") {
        rowData += "<img width='100%' src='" + item.value + "' alt='meta-image' />";
      } else if (item.type === "imageheight") {
        rowData += "<img height='780pt' src='" + item.value + "' alt='meta-image' />";
      } else if (item.type === "imageheightpad") {
        rowData += "<div style='page-break-before: always'><img height='780pt' src='" + item.value + "' alt='meta-image' /></div>";
      } else if (item.type === "imageArray") {
        var imageSet = "";
        item.value.map(function (image) {
          imageSet += "<img width='100%' src='" + image + "' alt='meta-image' />";
        });
        rowData += imageSet;
      }
    });
  }
  var htmlContent = "<div style=\"width: 550px; margin: 10px auto; \">" + rowData + "</div>";
  // debugger;
  return htmlContent;
}
function createPDF(_x, _x2) {
  return _createPDF.apply(this, arguments);
}
function _createPDF() {
  _createPDF = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(params, textHTML) {
    var _params$element;
    var htmlContent, pdf;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          htmlContent = !textHTML ? prepareData(params) + (((_params$element = params.element) === null || _params$element === void 0 ? void 0 : _params$element.innerHTML) || "") : textHTML; // if (params.type === "html" || !params.element) {
          pdf = new jspdf__WEBPACK_IMPORTED_MODULE_1__["jsPDF"]("portrait", "pt", "a4");
          _context.next = 4;
          return new Promise(function (resolve) {
            pdf.html(htmlContent, {
              callback: resolve,
              x: 0,
              y: 0,
              margin: [10, 0, 30, 0],
              autoPaging: "text"
            });
            var maxWidth = pdf.internal.pageSize.getWidth() - 30;
            var maxHeight = pdf.internal.pageSize.getHeight() - 70;
            var pageRatio = maxHeight / maxWidth;
            var firstPage = true;
            if (params.pngs) {
              var _iterator = _createForOfIteratorHelper(params.pngs),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var png = _step.value;
                  if (firstPage) {
                    firstPage = false;
                  } else {
                    pdf.addPage();
                  }
                  var imgRatio = png.height / png.width;
                  var height = 0;
                  var width = 0;
                  if (imgRatio > pageRatio) {
                    height = maxHeight;
                    width = height / imgRatio;
                  } else {
                    width = maxWidth;
                    height = width * imgRatio;
                  }
                  pdf.addImage(png.data, "PNG", 15, 15, width, height, undefined, "SLOW");
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          });
        case 4:
          return _context.abrupt("return", _context.sent);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createPDF.apply(this, arguments);
}

/***/ }),

/***/ "./src/share.ts":
/*!**********************!*\
  !*** ./src/share.ts ***!
  \**********************/
/*! exports provided: generatePDF, generateShareTextFile, generateShareText, grabWorkspaceSVGs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePDF", function() { return generatePDF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShareTextFile", function() { return generateShareTextFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShareText", function() { return generateShareText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grabWorkspaceSVGs", function() { return grabWorkspaceSVGs; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Blockly/BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./platformInfo */ "./src/platformInfo.ts");
/* harmony import */ var _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FileSys/ProjectManager */ "./src/FileSys/ProjectManager.ts");
/* harmony import */ var _nativeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nativeInterface */ "./src/nativeInterface.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _PdfExport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PdfExport */ "./src/PdfExport.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _texteditor_editor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./texteditor/editor */ "./src/texteditor/editor.tsx");
/* harmony import */ var _widget_Modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./widget/Modal */ "./src/widget/Modal.tsx");
/* harmony import */ var _SimWindow_SimWindowController__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SimWindow/SimWindowController */ "./src/SimWindow/SimWindowController.ts");
/* harmony import */ var _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./FeatureLock/Licenses */ "./src/FeatureLock/Licenses.ts");
/* harmony import */ var _FeatureLock_LicenseSystem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FeatureLock/LicenseSystem */ "./src/FeatureLock/LicenseSystem.ts");
/* harmony import */ var _FeatureLock_VRClassSystem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./FeatureLock/VRClassSystem */ "./src/FeatureLock/VRClassSystem.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("share system");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();












// import {jsPDF} from "jspdf";



//#endregion types

//#region upload/download helpers
//#region local downloads
/**
 * A simple funtion to trigger a file download.
 * 
 * NOTE: there is no way to get information on the result or progress of the download
 * 
 * @param filename the name of the file
 * @param content the raw content to download
 * @param mimeType the MIME type of the file
 */
function downloadFile(filename, content, mimeType) {
  // TODO: use the filesystem or project manager in the future
  var element = document.createElement("a");
  element.setAttribute("href", "data:".concat(mimeType, ";base64,").concat(btoa(content)));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * will download the project and share pdf to the local machine
 * @param pdf the pdf to save
 * @param pdfFilename the name of the PDF file
 * @param projectData the raw project data
 * @param projectFilename the name of the project file
 */
function localDownload(_x, _x2, _x3, _x4) {
  return _localDownload.apply(this, arguments);
} //#endregion local downloads
//#region cloud uploaders
/**
 * will upload a file to dropbox at the provided location
 * @param token the API auth token
 * @param filename the name of the file with extension
 * @param data the content of the file to upload
 * @param path the path to upload the file to
 * 
 * @returns a promise that will resolve when the upload is complete
 */
function _localDownload() {
  _localDownload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(pdf, pdfFilename, projectData, projectFilename) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(_platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsNWJS"] || _platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsChrome"])) {
            _context.next = 3;
            break;
          }
          pdf.save(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName() + ".pdf");
          // nwDialogs.setDailogs(".png");
          // const nwjsPathInfo = await nwDialogs.forceClickDialog(currentProject.getProjectName(), ".png", true);
          // log.debug("NWJS pathInfo: ", nwjsPathInfo);
          // await nwDialogs.nwSave(nwjsPathInfo.path, unescape(encodeURIComponent(datastr)));
          return _context.abrupt("return");
        case 3:
          _context.prev = 3;
          if (!(_platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsIOS"] || _platformInfo__WEBPACK_IMPORTED_MODULE_2__["PlatformIsAndroid"])) {
            _context.next = 11;
            break;
          }
          _context.next = 7;
          return Object(_nativeInterface__WEBPACK_IMPORTED_MODULE_4__["sharePDF"])(pdf.output("datauristring"), pdfFilename, ".pdf");
        case 7:
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].close();
          return _context.abrupt("return");
        case 11:
          downloadFile(pdfFilename, pdf.output(), "application/applicationpdf");
        case 12:
          // downloadFile(projectFilename, projectData, "text/plain");
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].close();
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].showShareDownloadedPrompt();
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](3);
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].showShareDownloadFailedPrompt();
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 16]]);
  }));
  return _localDownload.apply(this, arguments);
}
function dropboxFileUpload(_x5, _x6, _x7, _x8) {
  return _dropboxFileUpload.apply(this, arguments);
}
/**
 * will upload a file to dropbox at the provided location
 * @param token the API auth token
 * @param filename the name of the file with extension
 * @param data the content of the file to upload
 * @param parent the ID of the parent folder to upload the file to
 * @param mimeType the mime type of the file getting uploaded
 * 
 * @returns a promise that will resolve when the upload is complete
 */
function _dropboxFileUpload() {
  _dropboxFileUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token, filename, data, path) {
    var myHeaders, requestOptions, dest, dropboxArgs, response, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          log.info("dropboxFileUpload", filename);
          myHeaders = new Headers();
          myHeaders.append("Content-Type", "text/plain; charset=dropbox-cors-hack");
          myHeaders.append("Authorization", "Bearer ".concat(token));
          requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
          };
          dest = "/".concat(path, "/").concat(filename).replace("//", "/");
          dropboxArgs = {
            "autorename": true,
            "mode": "add",
            "mute": false,
            "path": dest,
            "strict_conflict": false
          };
          _context2.next = 9;
          return fetch("https://content.dropboxapi.com/2/files/upload?arg=".concat(JSON.stringify(dropboxArgs)), requestOptions);
        case 9:
          response = _context2.sent;
          if (response.ok) {
            _context2.next = 12;
            break;
          }
          throw new Error("upload response not ok.");
        case 12:
          _context2.next = 14;
          return response.text();
        case 14:
          result = _context2.sent;
          log.debug("upload to", dest, result);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _dropboxFileUpload.apply(this, arguments);
}
function googleDriveFileUpload(_x9, _x10, _x11, _x12, _x13) {
  return _googleDriveFileUpload.apply(this, arguments);
} //#endregion cloud uploaders
/**
 * a fucntion to route the share data to the correct location base don if in a class and where that class
 * wants the data sent.
 * 
 * NOTE: if this uses a local download, we don't know when that is done so it returns as soon as the download
 * has been started
 * 
 * @param name the name of the student
 * @param assignement the assignement this is for
 * @param pdfData the raw data of the PDF
 * @returns Promise that resolves when the upload os done
 */
function _googleDriveFileUpload() {
  _googleDriveFileUpload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(token, filename, data, parent, mimeType) {
    var myHeaders, metadata, metadataBlob, fileBlob, formdata, requestOptions, response, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          log.info("googleDriveFileUpload", filename);
          myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer ".concat(token));
          metadata = {
            "name": filename,
            mimeType: mimeType,
            "parents": [parent]
          };
          metadataBlob = new Blob([JSON.stringify(metadata)], {
            type: "application/json"
          });
          fileBlob = data instanceof Blob ? data : new Blob([data], {
            type: mimeType
          });
          formdata = new FormData();
          formdata.append("", metadataBlob, "metadata.json");
          formdata.append("", fileBlob, filename);
          requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
          _context3.next = 12;
          return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", requestOptions);
        case 12:
          response = _context3.sent;
          if (response.ok) {
            _context3.next = 15;
            break;
          }
          throw new Error("upload response not ok.");
        case 15:
          _context3.next = 17;
          return response.text();
        case 17:
          result = _context3.sent;
          log.debug("upload", filename, result);
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _googleDriveFileUpload.apply(this, arguments);
}
function uploadShareData(_x14, _x15, _x16) {
  return _uploadShareData.apply(this, arguments);
} //#endregion upload/download helpers
/**
 * call this to grab the blockly styles for the SVGs
 * @returns a style string with the Blockly styles
 */
function _uploadShareData() {
  _uploadShareData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(name, assignement, pdf) {
    var _PM$currentProject$pr;
    var forceLocal,
      projectContent,
      nameAssignment,
      baseFilename,
      pdfFilename,
      projectFilename,
      license,
      deleiveryInfo,
      accessToken,
      destination,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          forceLocal = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : false;
          log.info("uploadShareData");
          if ((_PM$currentProject$pr = _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].projectData) !== null && _PM$currentProject$pr !== void 0 && _PM$currentProject$pr.getFileContentString) {
            _context4.next = 5;
            break;
          }
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].showShareUploadFailedPrompt();
          return _context4.abrupt("return");
        case 5:
          projectContent = _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].projectData.getFileContentString();
          nameAssignment = "".concat(name, " - ").concat(assignement).trim();
          if (nameAssignment === "-") {
            nameAssignment = "";
          }
          baseFilename = nameAssignment ? nameAssignment : name ? name : _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName();
          log.warn("baseFilename:", baseFilename);
          pdfFilename = "".concat(baseFilename, ".pdf");
          projectFilename = "".concat(baseFilename, ".").concat(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["FileSystem"].getExtension());
          if (!forceLocal) {
            _context4.next = 17;
            break;
          }
          log.debug("using local download due to force local param");
          _context4.next = 16;
          return localDownload(pdf, pdfFilename, projectContent, projectFilename);
        case 16:
          return _context4.abrupt("return");
        case 17:
          license = _FeatureLock_LicenseSystem__WEBPACK_IMPORTED_MODULE_13__["getLicenseWithoutRefresh"]();
          if (!(license === _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_12__["FeatureLockLicense"].Standard || license === _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_12__["FeatureLockLicense"].VirtualSkillsIQ || license === _FeatureLock_Licenses__WEBPACK_IMPORTED_MODULE_12__["FeatureLockLicense"].VirtualSkillsV5)) {
            _context4.next = 23;
            break;
          }
          log.debug("using local download due to no VR class");
          _context4.next = 22;
          return localDownload(pdf, pdfFilename, projectContent, projectFilename);
        case 22:
          return _context4.abrupt("return");
        case 23:
          _context4.next = 25;
          return _FeatureLock_VRClassSystem__WEBPACK_IMPORTED_MODULE_14__["classSystem"].getDeliveryInfo();
        case 25:
          deleiveryInfo = _context4.sent;
          accessToken = deleiveryInfo.accessToken;
          destination = deleiveryInfo.destination;
          _context4.prev = 28;
          if (!(deleiveryInfo.deliveryMethod === "Dropbox")) {
            _context4.next = 38;
            break;
          }
          _context4.next = 32;
          return dropboxFileUpload(accessToken, pdfFilename, pdf.output("blob"), destination);
        case 32:
          _context4.next = 34;
          return dropboxFileUpload(accessToken, projectFilename, projectContent, destination);
        case 34:
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].showShareUploadedPrompt();
          return _context4.abrupt("return");
        case 38:
          if (!(deleiveryInfo.deliveryMethod === "Google Drive")) {
            _context4.next = 47;
            break;
          }
          _context4.next = 41;
          return googleDriveFileUpload(accessToken, pdfFilename, pdf.output("blob"), destination, "application/pdf");
        case 41:
          _context4.next = 43;
          return googleDriveFileUpload(accessToken, projectFilename, projectContent, destination, "text/plain");
        case 43:
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].showShareUploadedPrompt();
          return _context4.abrupt("return");
        case 47:
          if (!(deleiveryInfo.deliveryMethod === "email")) {
            _context4.next = 54;
            break;
          }
          log.warn("email deliver is not yet supported");
          _context4.next = 51;
          return localDownload(pdf, pdfFilename, projectContent, projectFilename);
        case 51:
          return _context4.abrupt("return");
        case 54:
          if (!(deleiveryInfo.deliveryMethod === "Local Download")) {
            _context4.next = 60;
            break;
          }
          _context4.next = 57;
          return localDownload(pdf, pdfFilename, projectContent, projectFilename);
        case 57:
          return _context4.abrupt("return");
        case 60:
          log.warn("found unexpected delivery method", deleiveryInfo.deliveryMethod);
          _context4.next = 63;
          return localDownload(pdf, pdfFilename, projectContent, projectFilename);
        case 63:
          return _context4.abrupt("return");
        case 64:
          _context4.next = 70;
          break;
        case 66:
          _context4.prev = 66;
          _context4.t0 = _context4["catch"](28);
          log.error(_context4.t0);
          _widget_Modal__WEBPACK_IMPORTED_MODULE_10__["MODALCONTROL"].showShareUploadFailedPrompt();
        case 70:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[28, 66]]);
  }));
  return _uploadShareData.apply(this, arguments);
}
function grabBlocklyStyles(doc) {
  // find all the style elements in the page so we can detect the blockly ones
  var styleElements = Array.from(doc.getElementsByTagName("style"));

  // create a serializer so that we don't need to create it multiple times
  var serializer = new XMLSerializer();

  // filter the styles so that we only have the ones added by Blockly
  var blocklyStyles = styleElements.filter(function (styleElem) {
    return serializer.serializeToString(styleElem).includes(".blockly");
  });
  log.warn("found", blocklyStyles.length, "blockly style elements");

  // process the blockly style
  var styleElementStrings = blocklyStyles.map(function (styleElem) {
    // clone the element so we can make changes without impacting the actual style
    var clonedStyle = styleElem.cloneNode(true);
    if (_platformInfo__WEBPACK_IMPORTED_MODULE_2__["isSafari"] && !_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      // needed to deal with bad escaping in safari
      if (!_platformInfo__WEBPACK_IMPORTED_MODULE_2__["OSisiOS"]) {
        clonedStyle.textContent = clonedStyle.textContent.replace(/>/g, "&gt;").replace(/</g, "&lt;");
      }
    }
    return serializer.serializeToString(clonedStyle);
  });

  // return the joined styles
  return styleElementStrings.join("\n");
}

/**
 * create a styled SVG from the blocks and option notes provided
 * 
 * NOTE: cloned objects do not have a bounding box, so we pass that in as params to handle that case
 * @param styleXML the styles to apply to the SVG
 * @param blocks the SVG g element with the blocks to show
 * @param blocksBBox the bounding box of the blocke element
 * @param notes the SVG g element with the notes to show
 * @returns the SVG data for the requested content
 */
function buildSVGFromElement(styleXML, blocks, blocksBBox, notes, notesBBox) {
  // Creates a complete SVG document with the correct bounds
  if (!notesBBox) {
    notesBBox = blocksBBox;
  }
  log.debug("block bbox: ", blocksBBox);
  log.debug("notes bbox: ", notesBBox);
  var minx = blocksBBox.x < notesBBox.x ? blocksBBox.x : notesBBox.x;
  var miny = blocksBBox.y < notesBBox.y ? blocksBBox.y : notesBBox.y;
  var blocksMaxX = blocksBBox.x + blocksBBox.width;
  var blocksMaxY = blocksBBox.y + blocksBBox.height;
  var notesMaxX = notesBBox.x + notesBBox.width;
  var notesMaxY = notesBBox.y + notesBBox.height;
  var maxx = Math.ceil((blocksMaxX > notesMaxX ? blocksMaxX : notesMaxX) * 100) / 100;
  var maxy = Math.ceil((blocksMaxY > notesMaxY ? blocksMaxY : notesMaxY) * 100) / 100;
  var bbox = {
    x: minx,
    y: miny,
    width: maxx - minx,
    height: maxy - miny
  };
  log.debug("used bbox: ", bbox);
  var blocksXML = new XMLSerializer().serializeToString(blocks);
  var notesXML = notes ? new XMLSerializer().serializeToString(notes) : "";
  var xmlRootAttributes = ["version=\"1.1\"", "xmlns=\"http://www.w3.org/2000/svg\"", "xmlns:xlink=\"http://www.w3.org/1999/xlink\"", "width=\"".concat(bbox.width, "\""), "height=\"".concat(bbox.height, "\""), "viewBox=\"".concat(bbox.x, " ").concat(bbox.y, " ").concat(bbox.width, " ").concat(bbox.height, "\"")].join(" ");
  var backgroundRect = "<rect x=\"".concat(bbox.x - 10, "\" y=\"").concat(bbox.y - 10, "\" width=\"").concat(bbox.width + 20, "\" height=\"").concat(bbox.height + 20, "\" fill=\"white\" />");
  var xml = "<svg ".concat(xmlRootAttributes, ">").concat(backgroundRect).concat(styleXML, "<g>").concat(blocksXML).concat(notesXML, "</g></svg>");

  // needed to deal with bad escaping in safari
  if (_platformInfo__WEBPACK_IMPORTED_MODULE_2__["isSafari"] && !_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
    xml = xml.replace(/&nbsp;/g, " ");
  }
  var SVG = {
    width: bbox.width,
    height: bbox.height,
    xml: xml
  };
  log.debug("SVG:", SVG.xml);
  return SVG;
}
function grabStackSVG(blockCanvas, blockID, styleXML) {
  // get the SVG group
  var groups = Array.from(blockCanvas.getElementsByTagName("g")).filter(function (node) {
    return node.getAttribute("data-id") === blockID;
  });
  if (groups.length !== 1) {
    log.error("unexpected number of groups when looking for stack group", groups);
    return null;
  }
  var stackGroupOriginal = groups[0];
  var stackGroup = stackGroupOriginal.cloneNode(true);

  // we want the block to be at origin
  stackGroup.removeAttribute("width");
  stackGroup.removeAttribute("height");
  stackGroup.removeAttribute("transform");
  return buildSVGFromElement(styleXML, stackGroup, stackGroupOriginal.getBBox());
}
function grabWorkspaceSVGs(doc) {
  var workspace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace;
  var SVGs = [];
  var topNotes = workspace.getTopComments(true);
  for (var i = 0; i < topNotes.length; i++) {
    var topNote = topNotes[i];
    topNote.textarea_.innerText = topNote.content_;
  }
  var blocksGroup = workspace.svgBlockCanvas_;
  var notesGroup = workspace.svgBubbleCanvas_;

  //Zelos-renderer styling does not apply to SVG's so it must be removed in order to properly apply SVG styling for sharing PDF
  //TODO: Will have to be changed when adding themes to switch svg blocks
  var stylesXML = grabBlocklyStyles(doc).replace(/\.Zelos-renderer\.VEXcode-theme /g, "");

  // get overview image
  var blocksNode = blocksGroup.cloneNode(true);
  blocksNode.removeAttribute("width");
  blocksNode.removeAttribute("height");
  blocksNode.removeAttribute("transform");
  var notesNode = notesGroup.cloneNode(true);
  notesNode.removeAttribute("width");
  notesNode.removeAttribute("height");
  notesNode.removeAttribute("transform");
  SVGs.push(buildSVGFromElement(stylesXML, blocksNode, blocksGroup.getBBox(), notesNode, notesGroup.getBBox()));

  // get image for each stack
  var topBlocks = workspace.getTopBlocks(true);
  for (var index = 0; index < topBlocks.length; index++) {
    var topBlock = topBlocks[index];
    SVGs.push(grabStackSVG(blocksGroup, topBlock.id, stylesXML));
  }
  return SVGs;
}
var maxHeight = 775 * 2;
var maxWidth = 570 * 2;
var limitRatio = maxHeight / maxWidth;
function convertSvgToPng(_x17) {
  return _convertSvgToPng.apply(this, arguments);
}
function _convertSvgToPng() {
  _convertSvgToPng = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(svgData) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            var canvasElem = document.createElement("canvas");
            var width = svgData.width + 1;
            var height = svgData.height + 1;

            // limit to a max size to prevent large images
            var imgRatio = height / width;
            if (imgRatio > limitRatio) {
              height = maxHeight;
              width = height / imgRatio;
            } else {
              width = maxWidth;
              height = width * imgRatio;
            }
            canvasElem.setAttribute("width", width + "px");
            canvasElem.setAttribute("height", height + "px");
            log.debug("canvas: ", canvasElem);
            var ctx = canvasElem.getContext("2d");
            var img = new Image();
            img.onload = function () {
              log.debug("image loaded");

              // create image by drawing the svg to the canvas, then getting the png from the canvas
              ctx.drawImage(img, 0, 0, width, height);
              var datauri = canvasElem.toDataURL("image/png");
              resolve({
                data: datauri,
                width: width,
                height: height
              });
            };
            img.onerror = function (event, source, lineno, colno, error) {
              log.error("img error: ", error);
              log.debug("img source: ", source);
              log.debug("img event: ", event);
              reject(error);
            };
            img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData.xml)));
            log.debug("img.src set");
          }));
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _convertSvgToPng.apply(this, arguments);
}
function downloadSharePdfFile(filename, content) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:application/applicationpdf;base64," + btoa(content));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function downloadShareTextFile(filename, content) {
  var element = document.createElement("a");
  var encodedFile = "data:text/plain;base64," + b64EncodeUnicode(content);
  element.setAttribute("href", encodedFile);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Returns a url pointing the logo. Logos are located in static/img/icons/vex_logos
 * @returns url for the header logo depending on which platform the target is on
 */
function getLogoSRC() {
  var src = "../static/img/icons/vex_logos/";
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIs123"]) {
    src += "logo-vex-123.png";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsGO"]) {
    src += "logo-vex-go.png";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsEXP"]) {
    src += "logo-vex-exp.png";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsIQ"]) {
    src += "logo-vex-iq.png";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsV5"]) {
    src += "logo-vex-v5.png";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
    src += "logo-vexcode-vr.png";
  } else {
    src += "logo-vex-robotics.png";
  }
  return src;
}
/**
 * Generates a meta data for the information of the project
 * @param data meta data
 * @returns array of PdfMetadata
 */
function generateMetaData(data) {
  var metadata = [];
  metadata.push({
    property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Student Name"),
    type: "string",
    value: "".concat(data.name)
  });
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
    // Should this change with the Virtual Skills licenses?
    var className = _FeatureLock_VRClassSystem__WEBPACK_IMPORTED_MODULE_14__["classSystem"].getClassName();
    var classCode = _FeatureLock_VRClassSystem__WEBPACK_IMPORTED_MODULE_14__["classSystem"].getClassCode();
    if (className && classCode) {
      metadata.push({
        property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Class"),
        type: "string",
        value: "".concat(className, " (").concat(classCode, ")")
      });
    }
  }
  metadata.push({
    property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Assignment"),
    type: "string",
    value: "".concat(data.assignment)
  });
  metadata.push({
    property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Notes"),
    type: "string",
    value: "".concat(data.notes)
  });
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
    var scene = _SimWindow_SimWindowController__WEBPACK_IMPORTED_MODULE_11__["simWindowController"].getSceneName();
    if (scene !== "default") {
      metadata.push({
        property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Playground"),
        type: "string",
        value: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Playground ".concat(scene))
      });
    }
  }
  // Project name
  metadata.push({
    property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Project Name"),
    type: "string",
    value: _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName()
  });

  // Project Type
  metadata.push({
    property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Project Type"),
    type: "string",
    value: function () {
      var state = _AppInfo__WEBPACK_IMPORTED_MODULE_7__["appState"].getAppState();
      if (state.mode === "Blocks") {
        return _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Blocks");
      } else {
        switch (state.lang) {
          case "python":
            return _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Python");
          case "cpp":
            return _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("C++");
          default:
            return state.lang;
        }
      }
    }()
  });

  // Date the pdf is exported
  metadata.push({
    property: _i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].t("Date"),
    type: "string",
    value: new Date().toDateString()
  });
  return metadata;
}
function getNotoSans() {
  switch (_i18n_i18n__WEBPACK_IMPORTED_MODULE_8__["i18n"].language) {
    case "ar":
      return "NotoSansArabic-Regular-normal";
    case "ja":
      return "NotoSansJapanese-Regular-normal";
    case "ko":
      return "NotoSansKR-Regular-normal";
    case "th":
      return "NotoSansThai-Regular-normal";
    case "zh-CN":
      return "NotoSansSC-Regular-normal";
    case "zh-TW":
      return "NotoSansTC-Regular-normal";
    default:
      return "NotoSans-Regular-normal";
  }
}
/**
 * Generates a pdf and saves it
 * @param doc instance of the page document object. needed since NWJS does strange things...
 * @param data PDFMetaData
 */
function generatePDF(_x18, _x19) {
  return _generatePDF.apply(this, arguments);
}
function _generatePDF() {
  _generatePDF = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(doc, data) {
    var isText,
      forceLocal,
      endgameScreenshotData,
      metadata,
      pngs,
      svgs,
      _iterator,
      _step,
      stackSVG,
      pdf,
      height,
      width,
      heightTracker,
      generatedInfoPage,
      handleCreatingPages,
      addCenteredImage,
      addText,
      _iterator2,
      _step2,
      itemFromMetaData,
      pageCount,
      i,
      _i,
      dataName,
      dataAssignment,
      footerInfo,
      footerString,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          addText = function _addText(text) {
            var marginTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
            var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;
            var xMargin = 20;
            var textDimensions = pdf.getTextDimensions(text, {
              maxWidth: width - xMargin * 2,
              fontSize: fontSize
            });
            var contentHeight = marginTop + textDimensions.h;
            handleCreatingPages(contentHeight);
            pdf.setFontSize(fontSize);
            pdf.text(text, xMargin, heightTracker + marginTop, {
              maxWidth: width - xMargin * 2
            });
            heightTracker += contentHeight;
          };
          addCenteredImage = function _addCenteredImage(url) {
            var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
            var imageMarginTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
            var caption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
            var captionMarginTop = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
            var captionFontSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;
            try {
              var imagePropties = pdf.getImageProperties(url);
              var imageWidth = imagePropties.width * scale;
              imageWidth = scale === -1 ? 480 : imageWidth;
              var imageHeight = imagePropties.height * scale;
              imageHeight = scale === -1 ? 270 : imageHeight;
              var imageType = imagePropties.fileType;
              var isCaptionValid = caption && caption.length > 0 && caption !== "null" ? true : false;
              // If caption is give, find the height it takes up
              // tslint:disable-next-line: max-line-length
              var captionDimensions = isCaptionValid ? pdf.getTextDimensions(caption, {
                align: "center",
                maxWidth: width - 40,
                fontSize: captionFontSize
              }) : {
                h: 0,
                w: 0
              };
              var contentHeight = imageMarginTop + imageHeight + captionMarginTop + captionDimensions.h;
              contentHeight += isCaptionValid ? captionMarginTop : 0;
              handleCreatingPages(contentHeight);
              // tslint:disable-next-line: max-line-length
              pdf.addImage(url, imageType, (width - imageWidth) / 2, heightTracker + imageMarginTop, imageWidth, imageHeight, undefined, "SLOW");
              if (isCaptionValid) {
                pdf.setFontSize(captionFontSize);
                // tslint:disable-next-line: max-line-length
                pdf.text(caption, width / 2, heightTracker + imageMarginTop + imageHeight + captionMarginTop, {
                  align: "center",
                  maxWidth: width - 40
                });
              }
              heightTracker += contentHeight;
            } catch (error) {
              log.debug("JSPDF: Failed to get the image from the URL");
            }
          };
          handleCreatingPages = function _handleCreatingPages(contentHeight) {
            if (generatedInfoPage < 1) {
              pdf.addPage();
              generatedInfoPage++;
            } else if (height - 30 < heightTracker + contentHeight) {
              pdf.addPage();
              generatedInfoPage++;
              heightTracker = 0;
            }
          };
          isText = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : false;
          forceLocal = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;
          _context6.next = 7;
          return _SimWindow_SimWindowController__WEBPACK_IMPORTED_MODULE_11__["simWindowController"].getUnityScreenshot();
        case 7:
          endgameScreenshotData = _context6.sent;
          metadata = generateMetaData(data);
          pngs = []; // let svgs: SVGData[] = [];
          if (isText) {
            _context6.next = 40;
            break;
          }
          svgs = grabWorkspaceSVGs(doc);
          if (!(svgs.length === 2)) {
            _context6.next = 20;
            break;
          }
          _context6.t0 = pngs;
          _context6.next = 16;
          return convertSvgToPng(svgs[0]);
        case 16:
          _context6.t1 = _context6.sent;
          _context6.t0.push.call(_context6.t0, _context6.t1);
          _context6.next = 40;
          break;
        case 20:
          _iterator = _createForOfIteratorHelper(svgs);
          _context6.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context6.next = 32;
            break;
          }
          stackSVG = _step.value;
          _context6.t2 = pngs;
          _context6.next = 28;
          return convertSvgToPng(stackSVG);
        case 28:
          _context6.t3 = _context6.sent;
          _context6.t2.push.call(_context6.t2, _context6.t3);
        case 30:
          _context6.next = 23;
          break;
        case 32:
          _context6.next = 37;
          break;
        case 34:
          _context6.prev = 34;
          _context6.t4 = _context6["catch"](21);
          _iterator.e(_context6.t4);
        case 37:
          _context6.prev = 37;
          _iterator.f();
          return _context6.finish(37);
        case 40:
          if (isText) {
            _context6.next = 46;
            break;
          }
          _context6.next = 43;
          return Object(_PdfExport__WEBPACK_IMPORTED_MODULE_6__["createPDF"])({
            type: "html",
            metadata: metadata,
            pngs: pngs
          });
        case 43:
          pdf = _context6.sent;
          _context6.next = 49;
          break;
        case 46:
          _context6.next = 48;
          return Object(_PdfExport__WEBPACK_IMPORTED_MODULE_6__["createPDF"])({
            type: "html",
            metadata: metadata
          }, doc);
        case 48:
          pdf = _context6.sent;
        case 49:
          height = pdf.internal.pageSize.getHeight();
          width = pdf.internal.pageSize.getWidth(); // Height tracker is increamented when a content is added to the page
          // It will allows us to track how much space is left before we have to make another page
          heightTracker = 0; // This will keep track of how many pages we created
          // Know that doc has already pdf pages from converting html to pdf, when we are adding a page,
          // we are simply appending a page at the bottom of the document.
          // Later we have to move all the generated pages to the top
          generatedInfoPage = 0;
          /**
           * Given the height of the content that is being added to the page, this function will decide wheather to
           * to create another page or just append the content to the current page
           * @param {*} contentHeight total heigh of the content you are adding, including the margins
           */
          // VR only for now, we can remove this 'if' when expanding to other platforms
          // if (targetIsPlaygrounds) {
          // Logo on top
          addCenteredImage(getLogoSRC(), 0.3);
          addText("  ", 20); // Blankline

          // Print the metadata one by one
          _iterator2 = _createForOfIteratorHelper(metadata);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              itemFromMetaData = _step2.value;
              if (itemFromMetaData.type === "string") {
                addText(itemFromMetaData.property + ": " + itemFromMetaData.value);
              }
            }

            // END GAME Screenshot
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (endgameScreenshotData && endgameScreenshotData.length > 1) {
            // Add playground end game image here: replace getLogoSRC() with url to img
            addCenteredImage(endgameScreenshotData, -1, 25);
          } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
            // No playground was found
            addCenteredImage("../static/img/icons/vex_logos/NoPlaygroundRuns.png", -1, 25);
          }

          //  Moves all the pages there were generated to the top.
          pageCount = pdf.internal.getNumberOfPages();
          for (i = generatedInfoPage; i > 0; i--) {
            pdf.movePage(pageCount, 1);
          }

          // For each page, print the page number and the total pages
          for (_i = 1; _i <= pageCount; _i++) {
            pdf.setPage(_i);
            pdf.setFontSize(10);
            dataName = data.name && data.name.length > 1 ? data.name + " - " : "";
            dataAssignment = data.assignment && data.assignment.length > 1 ? data.assignment + " - " : "";
            footerInfo = "".concat(dataName).concat(dataAssignment);
            footerString = footerInfo + "Page " + String(_i) + " of " + String(pageCount);
            pdf.text(footerString, width / 2, height - 20, null, null, "center");
          }
          // }
          _context6.next = 63;
          return uploadShareData(data.name, data.assignment, pdf, forceLocal);
        case 63:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[21, 34, 37, 40]]);
  }));
  return _generatePDF.apply(this, arguments);
}
function generateShareTextFile() {
  return _generateShareTextFile.apply(this, arguments);
}
function _generateShareTextFile() {
  _generateShareTextFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var projectData, textContent, extension;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          projectData = _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].projectData;
          textContent = projectData.getShareFileContentString();
          extension = projectData.getShareFileExtension();
          _context7.t0 = _platformInfo__WEBPACK_IMPORTED_MODULE_2__["currentPlatform"];
          _context7.next = _context7.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].NWJSWindows ? 6 : _context7.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].NWJSmacOS ? 6 : _context7.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].ChromeOS ? 7 : _context7.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].iOS ? 8 : _context7.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].Android ? 9 : 10;
          break;
        case 6:
          return _context7.abrupt("break", 11);
        case 7:
          return _context7.abrupt("break", 11);
        case 8:
          return _context7.abrupt("break", 11);
        case 9:
          return _context7.abrupt("break", 11);
        case 10:
          downloadShareTextFile(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName() + extension, textContent);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _generateShareTextFile.apply(this, arguments);
}
function generateShareText() {
  return _generateShareText.apply(this, arguments);
} // Encoding UTF8 ⇢ base64
function _generateShareText() {
  _generateShareText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var html, header, firstDivReplace, divMargin, marginIndex, injectNumber, notoSans, replaceNonASCII, res, footer;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          replaceNonASCII = function _replaceNonASCII(match) {
            return "<span style=\"font-family: Menlo, Monaco, 'Courier New', monospace;\">" + match + "</span";
          };
          injectNumber = function _injectNumber(match) {
            marginIndex += 1;
            // tslint:disable-next-line: max-line-length
            var leftMargin = marginIndex > 999 ? "" : marginIndex > 99 ? "&nbsp;" : marginIndex > 9 ? "&nbsp;&nbsp;" : "&nbsp;&nbsp;&nbsp;";
            if (match === "<div>") {
              return "".concat(divMargin, "<span style=\"font-size: 11px\">").concat(marginIndex, "</span>").concat(leftMargin, "   ");
            } else if (match === "<br>") {
              return "".concat(divMargin, "<span style=\"font-size: 11px\">").concat(marginIndex, "</span>   </div>");
            } else {
              return "";
            }
          };
          html = _texteditor_editor__WEBPACK_IMPORTED_MODULE_9__["monacoEditor"].getHTMLToCopy();
          header = "<html>\n  <head>\n      <meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\">\n  </head>\n  <body>\n  <style>\n  .root {\n      width: 530px;\n      word-break: break-all;\n      color: #000000;\n      background-color: #ffffff;\n      font-size: 10px;\n      line-height: 14px;\n      font-family: 'Courier New', monospace;\n      white-space: break-spaces;\n      text-indent: -15px;\n      margin: 0px 0px 0px 15px;\n  }\n  </style>";
          firstDivReplace = "<div class=\"root\">";
          html = html.replace(/<div(.*?)white-space:.pre;">/ig, firstDivReplace);
          divMargin = "<div style=\"margin: 0px 0px 0px 5px\">";
          marginIndex = 0;
          notoSans = getNotoSans();
          res = html.replace(/<div>|<br>/g, injectNumber); // const res = html.replace(/[^\x00-\x7F]+/g, replaceNonASCII);
          footer = "</body></html>";
          return _context8.abrupt("return", header + res + footer);
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _generateShareText.apply(this, arguments);
}
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}


/***/ })

});
//# sourceMappingURL=35f1d687fa12027c20cd.23.bundle.js.map