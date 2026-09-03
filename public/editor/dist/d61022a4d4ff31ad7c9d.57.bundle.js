this["webpackChunkwebapp"]([57],{

/***/ "./src/oldShare.ts":
/*!*************************!*\
  !*** ./src/oldShare.ts ***!
  \*************************/
/*! exports provided: generatePDF, generateShareTextFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePDF", function() { return generatePDF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShareTextFile", function() { return generateShareTextFile; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Blockly/BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./platformInfo */ "./src/platformInfo.ts");
/* harmony import */ var _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FileSys/ProjectManager */ "./src/FileSys/ProjectManager.ts");
/* harmony import */ var _nativeInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nativeInterface */ "./src/nativeInterface.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./targetPlatform */ "./src/targetPlatform.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("share system");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();




// tslint:disable-next-line: no-var-requires
var jsPDF = __webpack_require__(/*! ../node_modules/jspdf-yworks/dist/jspdf.min */ "./node_modules/jspdf-yworks/dist/jspdf.min.js");
/// <reference path='./svg2pdf.d.ts' />




function getWorkspaceSVG(doc) {
  // Any modifications are executed on a deep copy of the element
  var styleElem = doc.getElementsByTagName("style")[0].cloneNode(true);
  if (_platformInfo__WEBPACK_IMPORTED_MODULE_2__["isSafari"] && !_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
    // needed to deal with bad escaping in safari
    if (!_platformInfo__WEBPACK_IMPORTED_MODULE_2__["OSisiOS"]) {
      styleElem.textContent = styleElem.textContent.replace(/>/g, "&gt;").replace(/</g, "&lt;");
    }
  }
  var blocksNode = _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace.svgBlockCanvas_.cloneNode(true);
  blocksNode.removeAttribute("width");
  blocksNode.removeAttribute("height");
  blocksNode.removeAttribute("transform");
  var notesNode = _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace.svgBubbleCanvas_.cloneNode(true);
  notesNode.removeAttribute("width");
  notesNode.removeAttribute("height");
  notesNode.removeAttribute("transform");
  log.debug("cp: ", notesNode);

  // Creates a complete SVG document with the correct bounds
  //   (it is necessary to get the viewbox right, in the case of negative offsets)
  var blocksBBox = _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace.svgBlockCanvas_.getBBox();
  var notesBBox = _Blockly_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace.svgBubbleCanvas_.getBBox();
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
  var styleXML = new XMLSerializer().serializeToString(styleElem);
  var blocksXML = new XMLSerializer().serializeToString(blocksNode);
  var notesXML = new XMLSerializer().serializeToString(notesNode);
  var xml = styleXML + "<g>" + blocksXML + notesXML + "</g>";
  xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="' + bbox.x + " " + bbox.y + " " + bbox.width + " " + bbox.height + '"><rect width="100%" height="100%" fill="white"></rect>' + xml + "</svg>";
  if (_platformInfo__WEBPACK_IMPORTED_MODULE_2__["isSafari"] && !_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
    // needed to deal with bad escaping in safari
    xml = xml.replace(/&nbsp;/g, " ");
  }
  log.debug("svg xml: ", xml);
  return {
    xml: xml,
    width: bbox.width,
    height: bbox.height
  };
}
function convertSvgToPng(_x) {
  return _convertSvgToPng.apply(this, arguments);
}
function _convertSvgToPng() {
  _convertSvgToPng = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(svgData) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            var canvasElem = document.createElement("canvas");
            var width = svgData.width + 1;
            var height = svgData.height + 1;
            canvasElem.setAttribute("width", width + "px");
            canvasElem.setAttribute("height", height + "px");
            log.debug("canvas: ", canvasElem);
            var ctx = canvasElem.getContext("2d");
            var img = new Image();
            img.onload = function () {
              log.debug("image loaded");

              // create image by drawing the svg to the canvas, then getting the png from the canvas
              ctx.drawImage(img, 0, 0);
              var datauri = canvasElem.toDataURL("image/png");
              resolve(datauri);
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
          return _context.stop();
      }
    }, _callee);
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
function generatePDF(_x2) {
  return _generatePDF.apply(this, arguments);
}
function _generatePDF() {
  _generatePDF = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(doc) {
    var svg, width, height, datauri, pdf;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          svg = getWorkspaceSVG(doc);
          log.debug("svg: ", svg);
          width = svg.width + 1;
          height = svg.height + 1;
          _context2.next = 6;
          return convertSvgToPng(svg);
        case 6:
          datauri = _context2.sent;
          log.debug("datauri: ", datauri);
          // Clipboard.copy(datauri.slice(10));

          // create a new jsPDF instance
          pdf = new jsPDF(width > height ? "l" : "p", "pt", [width, height]); // add the png to the pdf
          pdf = pdf.addImage(datauri, "png", 0, 0, width, height);

          // save the pdf
          _context2.t0 = _platformInfo__WEBPACK_IMPORTED_MODULE_2__["currentPlatform"];
          _context2.next = _context2.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].NWJSWindows ? 13 : _context2.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].NWJSmacOS ? 13 : _context2.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].ChromeOS ? 15 : _context2.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].iOS ? 17 : _context2.t0 === _platformInfo__WEBPACK_IMPORTED_MODULE_2__["Platform"].Android ? 17 : 20;
          break;
        case 13:
          pdf.save(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName() + ".pdf");
          // nwDialogs.setDailogs(".png");
          // const nwjsPathInfo = await nwDialogs.forceClickDialog(currentProject.getProjectName(), ".png", true);
          // log.debug("NWJS pathInfo: ", nwjsPathInfo);
          // await nwDialogs.nwSave(nwjsPathInfo.path, unescape(encodeURIComponent(datastr)));
          return _context2.abrupt("break", 21);
        case 15:
          pdf.save(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName() + ".pdf");
          // const chromePathInfo = await chromeFileDialogs.displaySaveAsDialog(currentProject.getProjectName(), "png");
          // log.debug("chrome pathInfo: ", chromePathInfo);
          // await chromeFileDialogs.writeFileEntry(chromePathInfo.chromeEntry, datastr);
          return _context2.abrupt("break", 21);
        case 17:
          log.debug("saving pdf on mobile");
          Object(_nativeInterface__WEBPACK_IMPORTED_MODULE_4__["sharePDF"])(pdf.output("datauristring"), _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName(), ".pdf");
          return _context2.abrupt("break", 21);
        case 20:
          downloadSharePdfFile(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName() + ".pdf", pdf.output());
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _generatePDF.apply(this, arguments);
}
function generateShareTextFile() {
  return _generateShareTextFile.apply(this, arguments);
} // Encoding UTF8 ⇢ base64
function _generateShareTextFile() {
  _generateShareTextFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var projectData, textContent, extension;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          projectData = _FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].projectData;
          textContent = projectData.getShareFileContentString();
          extension = projectData.getShareFileExtension();
          downloadShareTextFile(_FileSys_ProjectManager__WEBPACK_IMPORTED_MODULE_3__["currentProject"].getProjectName() + extension, textContent);

          // switch (currentPlatform) {
          //   case Platform.NWJSWindows:
          //   case Platform.NWJSmacOS:
          //     // TO DO
          //     break;
          //   case Platform.ChromeOS:
          //     // TO DO
          //     break;
          //   case Platform.iOS:
          //     // TO DO
          //     break;
          //   case Platform.Android:
          //     // TODO: finish this
          //     break;
          //   default:
          // }
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _generateShareTextFile.apply(this, arguments);
}
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}


/***/ })

});
//# sourceMappingURL=d61022a4d4ff31ad7c9d.57.bundle.js.map