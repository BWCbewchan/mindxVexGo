(window["webpackJsonpwebapp"] = window["webpackJsonpwebapp"] || []).push([[35],{

/***/ "./src/texteditor/blocklyTextEditor.tsx":
/*!**********************************************!*\
  !*** ./src/texteditor/blocklyTextEditor.tsx ***!
  \**********************************************/
/*! exports provided: BlocklyTextEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlocklyTextEditor", function() { return BlocklyTextEditor; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor */ "./src/texteditor/editor.tsx");
/* harmony import */ var _utils_registerLanguages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/registerLanguages */ "./src/texteditor/utils/registerLanguages.ts");
/* harmony import */ var _utils_registerTheme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/registerTheme */ "./src/texteditor/utils/registerTheme.ts");
/* harmony import */ var _autocomplete_VEXContextBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./autocomplete/VEXContextBuilder */ "./src/texteditor/autocomplete/VEXContextBuilder.ts");
/* harmony import */ var _vexLanguageClient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vexLanguageClient */ "./src/texteditor/vexLanguageClient.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _utils_monaco_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/monaco-utils */ "./src/texteditor/utils/monaco-utils.ts");
/* harmony import */ var _codeGen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../codeGen */ "./src/codeGen.ts");
/* harmony import */ var _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TextEditorFiles */ "./src/texteditor/TextEditorFiles.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("blocklyTextEditor");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// add history logger
var historyLogger = log.setHistoryLogger("blocklyTextEditor");
historyLogger.setLevel(log.levels.DEBUG);




//import(/* webpackChunkName: "monaco-editor" */ "monaco-editor");






var BlocklyEditorDummyElement = /*#__PURE__*/function () {
  function BlocklyEditorDummyElement(editor) {
    _classCallCheck(this, BlocklyEditorDummyElement);
    _defineProperty(this, "afterLoadQueue", []);
    //#region dummy element methods/properties
    _defineProperty(this, "defaultValue", null);
    this.editor = editor;
    this.focusMonaco = this.focusMonaco.bind(this);
    this.selectMonaco = this.selectMonaco.bind(this);
    this.onMonacoEditorLoaded = this.onMonacoEditorLoaded.bind(this);
  }
  _createClass(BlocklyEditorDummyElement, [{
    key: "value",
    get: function get() {
      return this.editor.getValue();
    },
    set: function set(newValue) {
      if (this.value === newValue) {
        return;
      }
      this.editor.setValue(newValue);
    }

    /** function to make this a dummy HTMLInputElement */
  }, {
    key: "focus",
    value: function focus() {
      log.debug("editor focus called");
      this.runAfterLoad(this.focusMonaco);
    }

    /** function to make this a dummy HTMLInputElement */
  }, {
    key: "select",
    value: function select() {
      log.debug("editor select called");
      this.runAfterLoad(this.selectMonaco);
    }

    /** function to make this a dummy HTMLInputElement */
  }, {
    key: "setAttribute",
    value: function setAttribute() {}

    /** function to make this a dummy HTMLInputElement */
  }, {
    key: "getAttribute",
    value: function getAttribute() {}

    /** function to make this a dummy HTMLInputElement */
  }, {
    key: "removeAttribute",
    value: function removeAttribute() {}
    //#endregion dummy element methods/properties

    /**
     * Tells the browser to focus on monaco. This should be called thru `runAfterLoad`.
     */
  }, {
    key: "focusMonaco",
    value: function focusMonaco() {
      log.debug("focusMonaco");
      this.editor.getMonacoInstance().editor.focus();
    }

    /**
     * Tells the monaco to select all. This should be called thru `runAfterLoad`.
     */
  }, {
    key: "selectMonaco",
    value: function selectMonaco() {
      log.debug("selectMonaco");
      var lines = this.value.split("\n");
      var lineCount = lines.length;
      var lastLineLength = lines[lineCount - 1].length;
      var selection = new BlocklyTextEditor.monacoObject.Selection(0, 0, lineCount, lastLineLength + 1);
      this.editor.getMonacoInstance().editor.setSelection(selection);
    }

    /**
     * will try to run the provided function. if the editor is loaded, it will
     * run immediately, otherwise it will be queued for after the editor loads.
     * @param func the function to run
     */
  }, {
    key: "runAfterLoad",
    value: function runAfterLoad(func) {
      if (this.editor.isLoaded) {
        func();
      } else {
        this.afterLoadQueue.push(func);
        this.editor.onEditorLoad = this.onMonacoEditorLoaded;
      }
    }

    /** will run queued functions after monaco is loaded */
  }, {
    key: "onMonacoEditorLoaded",
    value: function onMonacoEditorLoaded() {
      var tmp = this.afterLoadQueue.slice();
      this.afterLoadQueue = [];
      tmp.forEach(function (func) {
        func();
      });
      this.editor.onEditorLoad = null;
    }
  }]);
  return BlocklyEditorDummyElement;
}();
var BlocklyTextEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(BlocklyTextEditor, _React$Component);
  var _super = _createSuper(BlocklyTextEditor);
  // this is a hack
  // in NWJS, this file seems to be unable to get the global monaco object.
  // but the blocklyFile.tsx file has it, so before we create an instance there,
  // we are able to set this static value so that we know that we have the actual
  // object. this is far from ideal, but it works until we switch away from NWJS.

  function BlocklyTextEditor(props) {
    var _this;
    _classCallCheck(this, BlocklyTextEditor);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "onEditorLoad", null);
    _defineProperty(_assertThisInitialized(_this), "cleanRangeFolding", function () {
      if (_this.rangeFoldingProvider) {
        log.debug("disposing range folding provider");
        _this.rangeFoldingProvider.dispose();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onGoToPosition", function (position) {
      if (_this.currentEditorView) {
        var monacoPosition = {
          "lineNumber": position.lineNumber,
          "column": position.column
        };
        _this.currentEditorView.goToPosition(monacoPosition);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onEditCommand", function (cmd) {
      if (cmd && _this.currentEditorView) {
        _this.currentEditorView.runEditCommand(cmd);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getMonacoInstance", function () {
      return _this.currentEditorView.monaco;
    });
    _this.state = {};

    // part of the hack for the monaco instance
    if (!BlocklyTextEditor.monacoObject) {
      if (monaco) {
        BlocklyTextEditor.monacoObject = monaco;
      } else {
        log.error("unable to set local monaco");
      }
    }
    _this.textEditorInit = _this.textEditorInit.bind(_assertThisInitialized(_this));
    if (props.onCreateDummy) {
      var _dummy = new BlocklyEditorDummyElement(_assertThisInitialized(_this));
      _dummy.defaultValue = props.startingText;
      props.onCreateDummy(_dummy);
    }
    return _this;
  }
  _createClass(BlocklyTextEditor, [{
    key: "isLoaded",
    get: function get() {
      return !!this.currentEditorView;
    }
  }, {
    key: "textEditorInit",
    value: function () {
      var _textEditorInit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this2 = this;
        var currentState;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              log.debug("Initializing monaco text editor..");
              _context.next = 3;
              return _utils_monaco_utils__WEBPACK_IMPORTED_MODULE_8__["MonacoUtils"].initialize();
            case 3:
              _context.next = 5;
              return Object(_utils_registerTheme__WEBPACK_IMPORTED_MODULE_4__["default"])();
            case 5:
              _context.next = 7;
              return Object(_utils_registerLanguages__WEBPACK_IMPORTED_MODULE_3__["default"])();
            case 7:
              log.debug("setting text editor theme to LIGHT");
              Object(_utils_registerTheme__WEBPACK_IMPORTED_MODULE_4__["setTheme"])("Li");

              // clean existing model, so when switching from blocks to text will not cause duplicate model issue.
              cleanMonaco();
              //cleanup folding providers and the ranges set previously in the model/language
              this.cleanRangeFolding();
              // create main.cpp models in global scope only if they are not available
              // This must happen as part of the react life event.otherwise monaco will not be available and will throw exception.
              log.debug("current app lang:", _AppInfo__WEBPACK_IMPORTED_MODULE_7__["appState"].getAppState().lang);
              if (!_TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"]) {
                // textEditorFiles = new textFiles();
                _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].initialize();
              } else {
                log.debug("current monaco lang:", _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].currentLanguage);
                _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].initialize();
              }

              // create the monaco viewer instance
              this._view = new _editor__WEBPACK_IMPORTED_MODULE_2__["View"](_TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile);

              // set the text of the blockly editor instance
              this.updateText();
              this.forceUpdate(function () {
                log.debug("Force updated editor.");
              });

              // listen for changes so that we can pass them back to Blockly
              _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].onBlocklyChange = function () {
                // TODO: seems like this actually gets triggered 2 times
                log.debug("Blockly editor content changed...");
                _this2.props.onContentChange(_this2.getValue());
              };

              // make sure that the language system it set for the current config
              currentState = _AppInfo__WEBPACK_IMPORTED_MODULE_7__["appState"].getAppState();
              _vexLanguageClient__WEBPACK_IMPORTED_MODULE_6__["Init"](currentState.lang, "GO", currentState.targetMode, currentState.robotModel);

              // we seem to need this after the language client init so that it has the correct language for building the auto complete DB.
              this.updateText();
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function textEditorInit() {
        return _textEditorInit.apply(this, arguments);
      }
      return textEditorInit;
    }()
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.textEditorInit();
            case 2:
              window.addEventListener("resize", refreshEditor, false);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }
      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].onBlocklyChange = null;
      window.removeEventListener("resize", refreshEditor, false);
      //clean existing model, so when switching from blocks to text will not cause duplicate model issue.
      //vexLanguageClient.deInit(); // disabled auto-complete for Feb 2020 Beta 
      cleanMonaco();
      //cleanup folding providers and the ranges set previously in the model/language
      this.cleanRangeFolding();
    }
  }, {
    key: "updateText",
    value: function updateText() {
      try {
        this.setValue(this.props.startingText);
        BlocklyTextEditor.monacoObject.editor.setModelMarkers(_TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer, "compiler", []);
        var header = "brain = Brain()" + "\n" + _codeGen__WEBPACK_IMPORTED_MODULE_9__["genPGConstructors"]();
        log.debug("header:", header);
        _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].updateHeader(header);
        Object(_autocomplete_VEXContextBuilder__WEBPACK_IMPORTED_MODULE_5__["BuildContext"])(_AppInfo__WEBPACK_IMPORTED_MODULE_7__["appState"].getAppState().lang, "GO");
      } catch (ex) {
        //TODO show message in the text editor.
        if (ex.message !== "Your program is empty.") {
          log.error("error when generating code", ex);
        }
      }
    }
  }, {
    key: "wipeOutUndoRedoStack",
    value: function wipeOutUndoRedoStack() {
      // cruel & unofficial way to wipe out the stack, as there is no working official api for this at the time of implementation
      if (_TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer && _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer._commandManager.past) {
        log.debug("clearing undo history..");
        _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer._commandManager.past = [];
      }
      if (_TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer && _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer._commandManager.future) {
        log.debug("clearing redo history..");
        _TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer._commandManager.future = [];
      }
    }
  }, {
    key: "getFile",
    value: function getFile() {
      return this._view.file;
    }
  }, {
    key: "isDirty",
    value: function isDirty() {
      return this._view.file.isDirty;
    }
  }, {
    key: "save",
    value: function save() {
      this._view.file.save();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      this.save();
      return this._view.file.getData();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      BlocklyTextEditor.monacoObject.editor.setModelMarkers(_TextEditorFiles__WEBPACK_IMPORTED_MODULE_10__["textEditorFiles"].blocklyFile.buffer, "compiler", []);
      this._view.file.setData(value);
      this._view.file.save();
    }
  }, {
    key: "setEditorView",
    value: function setEditorView(editorView) {
      var _this3 = this;
      log.debug("setEditorView", editorView, this);
      if (this.currentEditorView && editorView) {
        return;
      }
      var wasSet = !!this.currentEditorView;
      this.currentEditorView = editorView;
      if (!editorView) {
        return;
      }
      if (!wasSet && this.onEditorLoad) {
        this.onEditorLoad();
      }

      // listen for escape key
      this.getMonacoInstance().editor.addCommand(BlocklyTextEditor.monacoObject.KeyCode.Escape, function () {
        log.warn("got escape?");
        if (_this3.props.onCancel) {
          _this3.props.onCancel();
        }
      }, null);
      // hide cursor gutter
      // TODO - remove this when updating Monaco to the latest. 
      // when updating Monaco :
      // gutter hiding would automatically work since editor options already has the correct settings for that "overviewRulerLanes : 0"
      this.currentEditorView.hideCursorOverviewRulerLane();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var fontSize = 16 * this.props.scale + "px";
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        style: {
          position: "absolute",
          "height": "100%",
          width: "100%"
        }
      }, this._view && this._view.file && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_editor__WEBPACK_IMPORTED_MODULE_2__["EditorView"], {
        ref: function ref(_ref) {
          return _this4.setEditorView(_ref);
        },
        view: this._view,
        primary: true,
        options: {
          // disable the line numbers ant the left gutter area
          lineNumbers: "off",
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 5,
          lineNumbersMinChars: 0,
          // set the font size to match blockly
          fontSize: fontSize,
          // hide the scrollbars
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden"
          },
          // disable the minimap
          minimap: {
            enabled: false
          },
          // prevent scrolling such that some text is hidden
          scrollBeyondLastLine: false,
          scrollBeyondLastColumn: 0,
          // disable the overview that is on the right side
          overviewRulerLanes: 0,
          overviewRulerBorder: false
          // hideCursorInOverviewRuler: true
        }
      }));
    }
  }]);
  return BlocklyTextEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]); // TODO: move these functions to a helper file as they are used in 2 places
_defineProperty(BlocklyTextEditor, "monacoObject", null);
var layoutThrottleDuration = 10;
var layoutTimeout = undefined;
function refreshEditor() {
  log.debug("editor refresh called!");
  if (layoutTimeout) {
    window.clearTimeout(layoutTimeout);
  }
  layoutTimeout = window.setTimeout(function () {
    layoutTimeout = undefined;
    log.debug("dispatching layout event..");
    document.dispatchEvent(new Event("layout"));
  }, layoutThrottleDuration);
}
// do the model cleanup only when all the editor's content are saved.
function cleanMonaco() {
  try {
    log.debug("cleaning Monaco..");
    var monacoModels = BlocklyTextEditor.monacoObject.editor.getModels();
    for (var i = 0; i < monacoModels.length; i++) {
      log.debug(monacoModels[i]);
      // vexpro authority files are not disposed
      // used for things like output ansd terminal
      // TODO: make sure to set the authority for out put and terminal as vexpro.
      // TODO: External models ( for GoToDef ,peek etc ) needs to disposed when those features added in future
      if (monacoModels[i].uri.authority != "vexcode") {
        monacoModels[i].dispose(); // in theory this is supposed to release the model for GC cleanup, so that new project
      }
    }
  } catch (e) {
    log.error("Error during monaco model disposal : ", e);
  }
}


/***/ })

}]);
//# sourceMappingURL=e436005a2281fb4b0619.35.bundle.js.map