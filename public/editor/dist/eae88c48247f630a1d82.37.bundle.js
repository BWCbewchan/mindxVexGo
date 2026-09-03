this["webpackChunkwebapp"]([37],{

/***/ "./src/ErrorProcessor/BlocksOffsetCalculator.ts":
/*!******************************************************!*\
  !*** ./src/ErrorProcessor/BlocksOffsetCalculator.ts ***!
  \******************************************************/
/*! exports provided: buildCleanCode, adjustLineNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCleanCode", function() { return buildCleanCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustLineNumbers", function() { return adjustLineNumbers; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _codeGen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../codeGen */ "./src/codeGen.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("BlocksOffsetCalculator");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

log.setHistoryLogger("ErrorProcessing");


/**
 * generates clean code that matches the generated code, but with the block ID comments
 * @param input the original error output
 * @returns the lines of code in an array
 */
function buildCleanCode(input) {
  var code = Object(_codeGen__WEBPACK_IMPORTED_MODULE_1__["genPGCode"])(true, "python");
  var viewerCode = Object(_codeGen__WEBPACK_IMPORTED_MODULE_1__["genPGPythonUserCode"])(false, false, false);
  log.debug("code:", code);
  log.debug("viewerCode:", viewerCode);
  var srcLines = code.split("\n");
  var removedLines = [];
  for (var lineNumber = 0; lineNumber < srcLines.length; lineNumber++) {
    var line = srcLines[lineNumber];
    if (line.includes("highlight_block(") || line.includes("unhighlight_block(")) {
      log.debug("removed:", lineNumber, line);
      removedLines.push(lineNumber);
    } else if (line.trimStart().startsWith("global ")) {
      log.debug("removed:", lineNumber, line);
      removedLines.push(lineNumber);
    }
  }
  removedLines.reverse();

  // we need to find the number of lines hidden for the viewer vs the interpreter
  // start by removing the "removed lines" from the interpreter code
  var cleanedLines = srcLines.slice();
  for (var _i = 0, _removedLines = removedLines; _i < _removedLines.length; _i++) {
    var removedLine = _removedLines[_i];
    cleanedLines.splice(removedLine, 1);
  }
  log.debug("cleanedLines:", cleanedLines.join("\n"));

  // find and remove headers
  var firstViewerLine = viewerCode.split("\n")[0];
  var brainDefLine = cleanedLines.indexOf("brain=Brain()");
  if (brainDefLine === -1) {
    log.warn("how is there no brain constructor?");
  }
  var constructorsStart = brainDefLine + 2;
  var constructorsEnd = constructorsStart + cleanedLines.slice(constructorsStart).findIndex(function (line) {
    return line === "" || line === firstViewerLine;
  });
  var keepLastLine = cleanedLines[constructorsEnd] === firstViewerLine;
  log.debug("index:", constructorsStart, constructorsEnd);
  log.debug("removing:", cleanedLines.splice(0, constructorsEnd + (keepLastLine ? 0 : 1)));
  log.debug("cleanedLines without headers:", cleanedLines.join("\n"));
  return cleanedLines;
}

/**
 * will find the line numbers for the code viewer when the error is from blocks code
 * @param input the original error output
 * @returns the errors with the updated line numbers
 */
function adjustLineNumbers(input, initialOffset) {
  // TODO: find a way to have this use the buildCleanCode function to avoid duplicated code
  var code = Object(_codeGen__WEBPACK_IMPORTED_MODULE_1__["genPGCode"])(true, "python");
  var viewerCode = Object(_codeGen__WEBPACK_IMPORTED_MODULE_1__["genPGPythonUserCode"])(false, false, false);
  log.debug("code:", code);
  log.debug("viewerCode:", viewerCode);
  var srcLines = code.split("\n");
  var removedLines = [];
  for (var lineNumber = 0; lineNumber < srcLines.length; lineNumber++) {
    var line = srcLines[lineNumber];
    if (line.includes("highlight_block(") || line.includes("unhighlight_block(")) {
      log.debug("removed:", lineNumber, line);
      removedLines.push(lineNumber);
    } else if (line.trimStart().startsWith("global ")) {
      log.debug("removed:", lineNumber, line);
      removedLines.push(lineNumber);
    }
  }
  removedLines.reverse();

  // we need to find the number of lines hidden for the viewer vs the interpreter
  // start by removing the "removed lines" from the interpreter code
  var cleanedLines = srcLines.slice();
  for (var _i2 = 0, _removedLines2 = removedLines; _i2 < _removedLines2.length; _i2++) {
    var removedLine = _removedLines2[_i2];
    cleanedLines.splice(removedLine, 1);
  }
  log.debug("cleanedLines:", cleanedLines.join("\n"));

  // find the number of lines bw
  var codeStart = cleanedLines.indexOf("def when_started1():");
  var viewerCodeStart = viewerCode.split("\n").indexOf("def when_started1():");
  var startOffset = viewerCodeStart - codeStart;
  log.debug("startOffset:", startOffset);
  log.debug("input:", input);
  log.debug("removedLines:", removedLines);
  var _iterator = _createForOfIteratorHelper(input),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var errorOutput = _step.value;
      var _lineNumber = errorOutput.line;
      var _iterator2 = _createForOfIteratorHelper(removedLines),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _removedLine = _step2.value;
          if (_lineNumber > _removedLine) {
            log.debug("remove line");
            _lineNumber--;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      errorOutput.line = _lineNumber + startOffset;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  log.debug("output:", input);
  return input;
}


/***/ }),

/***/ "./src/ErrorProcessor/ErrorProcessor.ts":
/*!**********************************************!*\
  !*** ./src/ErrorProcessor/ErrorProcessor.ts ***!
  \**********************************************/
/*! exports provided: ErrorProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorProcessor", function() { return ErrorProcessor; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _BlocksOffsetCalculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlocksOffsetCalculator */ "./src/ErrorProcessor/BlocksOffsetCalculator.ts");
/* harmony import */ var _Blockly_BlocklyController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Blockly/BlocklyController */ "./src/Blockly/BlocklyController.ts");
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("ErrorProcessor");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();

log.setHistoryLogger("ErrorProcessing");





/**
 * generic class to process error data from compiler/interpreter output.
 */
var ErrorProcessor = /*#__PURE__*/function () {
  function ErrorProcessor() {
    _classCallCheck(this, ErrorProcessor);
    _defineProperty(this, "lineOffset", 0);
  }
  _createClass(ErrorProcessor, [{
    key: "parseDataString",
    value:
    /**
     * will process the data provided and return a list of all errors found
     * @param errorData a list of the processed errors
     * @returns a list of all errors/warnings found in the data
     */
    function parseDataString(errorData) {
      return this.parseDataArray(errorData.split("\n"));
    }

    /**
     * will process the data provided and return a list of all errors found
     * @returns a list of all errors/warnings found in the data
     */
  }, {
    key: "parseDataArray",
    value: function parseDataArray(errorData) {
      var preprocessedData = this.preprocessData(errorData);
      var results = this.processData(preprocessedData);
      return this.extractErrorsFromResults(preprocessedData, results);
    }

    /**
     * will run thought the data and build the output while also building a log
     * of any lines of data that were not part of any found errors.
     * @param errorData the preprocessed data
     * @param result the results of the main error finding process
     */
  }, {
    key: "extractErrorsFromResults",
    value: function extractErrorsFromResults(errorData, results) {
      // the list of errors that will get returned
      var errors = [];
      // create an array that will keep track of if a line has been used in an error
      var lineUsed = Array.from(Array(errorData.length)).map(function () {
        return false;
      });
      var useBlockWarnings = _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"] && _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().mode === "Blocks";

      // build the list of errors
      var _iterator = _createForOfIteratorHelper(results),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var baseError = _step.value;
          var tmp = {
            column: baseError.column,
            line: baseError.line + this.lineOffset,
            message: baseError.message,
            type: baseError.type
          };
          if (useBlockWarnings) {
            tmp.blockID = baseError.blockId;
            tmp.blockMessage = baseError.blockMessage;
          }
          errors.push(tmp);

          // don't bother makring a line as used if we want to log the error lines
          if (baseError.logLines) {
            continue;
          }

          // mark used lines
          for (var index = baseError.startLine; index <= baseError.endLine; index++) {
            lineUsed[index] = true;
          }
        }

        // build list of lines that were not used
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var skippedLines = lineUsed.map(function (isUsed, lineNumber) {
        return isUsed ? null : errorData[lineNumber];
      }).filter(function (line) {
        return line !== null;
      }).join("\n").trim();

      // if we have any lines that were not included, we should log them so that we
      // can capture them later...
      if (skippedLines) {
        log.info("found lines that were not in any found errors...");
        log.debug(skippedLines);
      }
      log.debug(errors);

      // blocks needs line offset calculations
      var adjustLines = _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"] && _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().mode === "Blocks";
      var finalErrors = adjustLines ? Object(_BlocksOffsetCalculator__WEBPACK_IMPORTED_MODULE_3__["adjustLineNumbers"])(errors, this.lineOffset) : errors;

      // display block warnings
      if (useBlockWarnings) {
        var cleanLines = Object(_BlocksOffsetCalculator__WEBPACK_IMPORTED_MODULE_3__["buildCleanCode"])(errors);
        var blockIDRegex = /#Block ID:.+"/;
        var _iterator2 = _createForOfIteratorHelper(finalErrors),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var processedError = _step2.value;
            if (processedError.blockID) {
              Object(_Blockly_BlocklyController__WEBPACK_IMPORTED_MODULE_4__["addErrorWorkspaceBlockByID"])(processedError.blockID, processedError.blockMessage);
            } else {
              // TODO: create helper to reduce duplicate of checkErrorBlockID in VRPythonErrorProcessor.ts
              var errorLine = cleanLines[processedError.line - 1];
              log.debug("errorLine:", errorLine);
              var blockIDMatch = errorLine ? errorLine.match(blockIDRegex) : null;
              if (!blockIDMatch) {
                continue;
              }
              var blockIDString = blockIDMatch[0];
              var blockID = blockIDString.slice(12, blockIDString.length - 1);
              Object(_Blockly_BlocklyController__WEBPACK_IMPORTED_MODULE_4__["addErrorWorkspaceBlockByID"])(blockID, processedError.blockMessage);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      // return the actual errors
      return finalErrors;
    }

    /**
     * used to remove lines that we know we will never care about, or to 
     * adjust lines that always need a change
     * @param errorData the raw date that we need to preprocess
     * @returns the preprocessed version of the data
     */
  }]);
  return ErrorProcessor;
}();


/***/ }),

/***/ "./src/ErrorProcessor/processors/VRPythonErrorProcessor.ts":
/*!*****************************************************************!*\
  !*** ./src/ErrorProcessor/processors/VRPythonErrorProcessor.ts ***!
  \*****************************************************************/
/*! exports provided: VRPythonErrorProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VRPythonErrorProcessor", function() { return VRPythonErrorProcessor; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ErrorProcessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ErrorProcessor */ "./src/ErrorProcessor/ErrorProcessor.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("ErrorProcessor");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();



/**
 * format of function to check for an error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data for the error found
 */

/**
 * will parse the error data to find the Blockly Block ID 
 * @param allData all the lines to check
 * @returns a string value containing the Block ID
 */
function checkErrorBlockID(allData) {
  var err = allData.join("");
  var lineIDRegex = /#Block ID:.+"/;
  var errorMatch = err ? err.match(lineIDRegex) : null;
  if (!errorMatch) {
    return null;
  }
  var blockIdString = errorMatch[0];
  var blockId = blockIdString.slice(12, blockIdString.length - 1);
  return blockId;
}

/**
 * will check to see if the line indicates that there is an indentation error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if an indentation error is found
 */
function checkIndentationError(allData, currentLine, lineNumber) {
  if (!currentLine.startsWith("IndentationError: ")) {
    // not an indentation error
    return null;
  }
  // could end with one of the following
  // "expected an indented block"
  // "unexpected indent"
  // "unindent does not match any outer indentation level"

  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    var checkLine = allData[checkLineNumber];
    if (line === -1 && checkLine.startsWith("  File ")) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);

  // search for detail of the error
  var tmpMessage = "Indentation Error: line indentation is incorrect";
  var tmpBlockMessage = "Indentation Error: \n Check that the code is consistently indented using spaces or tabs.";
  checkLineNumber = allData.length; // get the length of allData and array
  checkLineNumber--; // subtract 1 to get the last line number

  while (checkLineNumber > 1) {
    var _checkLine = allData[checkLineNumber];
    if (_checkLine.includes("expected an indented block")) {
      // log.warn("expected an indented block");
      tmpMessage = "Indentation Error: Expected an indented block on/around this line";
      ;
      tmpBlockMessage = "Indentation Error: \n Expected an indented block on/around this line.";
      break;
    } else if (_checkLine.includes("unexpected indent")) {
      tmpMessage = "Indentation Error: Unexpected indent on/around this line";
      tmpBlockMessage = "Indentation Error: \n Unexpected indent on/around this line. \n Check that the code is consistently indented using spaces or tabs.";
      break;
    } else if (_checkLine.includes("unindent does not match any outer indentation level")) {
      tmpMessage = "Indentation Error: Unindent does not match any outer indentation level on/around this line";
      tmpBlockMessage = "Indentation Error: \n Unindent does not match any outer indentation level on/around this line. \n Check that the code is consistently indented using spaces or tabs.";
      break;
    } else {
      checkLineNumber--;
    }
  }
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: tmpMessage,
    blockMessage: tmpBlockMessage,
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will check to see if the line indicates that there is a syntax error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if a syntax error is found
 */
function checkSyntaxError(allData, currentLine, lineNumber) {
  if (!currentLine.startsWith("SyntaxError: ")) {
    // not a syntax error
    return null;
  }
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to fine a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && checkLine.startsWith("  File ")) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: "Syntax Error: Check for missing or incorrect syntax.",
    blockMessage: "Syntax Error: \n Check for missing or incorrect syntax, \n such as missing parentheses, brackets, or quotation marks.",
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will check to see if the line indicates that there is a type error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if a type error is found
 */
function checkTypeError(allData, currentLine, lineNumber) {
  if (!/^TypeError: /.test(currentLine)) {
    // not a type error
    return null;
  }
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to fine a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && (checkLine.startsWith("  File ") || checkLine.startsWith("  line "))) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: currentLine.replace("TypeError: ", "TypeError: Found incorrect type - "),
    blockMessage: "TypeError: \nCheck the data types being used in the operation and ensure they are compatible.",
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will check to see if the line indicates that there is a value error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if a value error is found
 */
function checkValueError(allData, currentLine, lineNumber) {
  if (!/^ValueError: /.test(currentLine)) {
    // not a value error
    return null;
  }
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to fine a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && (checkLine.startsWith("  File ") || checkLine.startsWith("  line "))) {
      line = parseInt(checkLine.split("line ")[1], 10);
      // const arrowLine = allData[checkLineNumber+2];
      // const columnTmp = arrowLine.indexOf("^");
      // if (columnTmp >= 0) {
      //   column = columnTmp;
      // }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: currentLine.replace("ValueError: ", "Found unsupported parameter value - "),
    blockMessage: "function has incorrect parameter type provided",
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will check to see if the line indicates that there is a name error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if a name error is found
 */
function checkNameError(allData, currentLine, lineNumber) {
  if (!/^NameError: /.test(currentLine)) {
    // not a name error
    return null;
  }
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to fine a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && (checkLine.startsWith("  File ") || checkLine.startsWith("  line "))) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }

  // TODO: move this outside the checker function
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: currentLine.replace("NameError: ", "NameError: Found a variable/function that does not exist in the code - "),
    blockMessage: "NameErrors: \n Check the spelling of variable or function names, \n and make sure they are defined before use.",
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will check to see if the line indicates that there is an attribution error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if an attribution error is found
 */
function checkAttributeError(allData, currentLine, lineNumber) {
  if (!currentLine.startsWith("AttributeError: ")) {
    // not a syntax error
    return null;
  }
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to find a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && (checkLine.startsWith("  File ") || checkLine.startsWith("  line "))) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: currentLine.replace("AttributeError: ", "Attribute Error: Check that the attribute being accessed exists on the object. - "),
    blockMessage: "Attribute Error: \n Check that the attribute being accessed exists on the object.",
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will check to see if the line indicates that there is an zero division error
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if an zero division error is found
 */
function checkZeroDivisionError(allData, currentLine, lineNumber) {
  if (!currentLine.startsWith("ZeroDivisionError: ")) {
    // not a syntax error
    return null;
  }
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to find a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && (checkLine.startsWith("  File ") || checkLine.startsWith("  line "))) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: "Zero Division Error: Check that the denominator is not zero before performing the division.",
    blockMessage: "Zero Division Error: \n Check that the denominator is not zero before performing the division.",
    type: "error",
    startLine: startLine,
    endLine: lineNumber
  };
}

/**
 * will catch all uncaught errors
 * @param allData all the lines to check
 * @param currentLine the string of the current line
 * @param currentLineNumber the line number that should be checked right now
 * @returns null if does not match error or the data if an syntax error is found
 */
function checkGenericError(allData, currentLine, lineNumber) {
  if (!/^\w+: /.test(currentLine)) {
    // not a generic error
    return null;
  }
  log.warn("found generic error:", currentLine);
  var column = 0;
  var line = -1;
  var startLine = -1;
  var checkLineNumber = lineNumber;

  // search for the line number, column number and start of the error
  while (startLine === -1) {
    checkLineNumber--;
    if (checkLineNumber < 0) {
      log.warn("unable to find a line number????");
      break;
    }
    var checkLine = allData[checkLineNumber];
    if (line === -1 && (checkLine.startsWith("  File ") || checkLine.startsWith("  line "))) {
      line = parseInt(checkLine.split("line ")[1], 10);
      var arrowLine = allData[checkLineNumber + 2];
      var columnTmp = arrowLine.indexOf("^");
      if (columnTmp >= 0) {
        column = columnTmp;
      }
    } else if (checkLine === "Traceback (most recent call last):") {
      startLine = checkLineNumber;
    }
  }
  var blockId = checkErrorBlockID(allData);
  return {
    column: column,
    line: line,
    blockId: blockId,
    message: "generic: " + currentLine,
    blockMessage: "",
    // TODO: should we return something for this?
    type: "error",
    startLine: startLine,
    endLine: lineNumber,
    logLines: true
  };
}
var VRPythonErrorProcessor = /*#__PURE__*/function (_ErrorProcessor) {
  _inherits(VRPythonErrorProcessor, _ErrorProcessor);
  var _super = _createSuper(VRPythonErrorProcessor);
  function VRPythonErrorProcessor() {
    var _this;
    _classCallCheck(this, VRPythonErrorProcessor);
    _this = _super.call(this);

    // add more error check functions here
    _defineProperty(_assertThisInitialized(_this), "checkFunctions", []);
    _this.checkFunctions = [checkIndentationError, checkSyntaxError, checkTypeError, checkValueError, checkNameError, checkAttributeError, checkZeroDivisionError,
    // this is a catch all. actual error parsing should be before this
    checkGenericError];
    return _this;
  }
  _createClass(VRPythonErrorProcessor, [{
    key: "preprocessData",
    value: function preprocessData(errorData) {
      // TODO: extend this if needed
      return errorData;
    }
  }, {
    key: "processData",
    value: function processData(errorData) {
      var output = [];
      log.debug(errorData); //log the full error data.

      for (var _lineNumber = 0; _lineNumber < errorData.length; _lineNumber++) {
        var _currentLine = errorData[_lineNumber];
        var _iterator = _createForOfIteratorHelper(this.checkFunctions),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var checkFunction = _step.value;
            var result = checkFunction(errorData, _currentLine, _lineNumber);
            if (result) {
              output.push(result);
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return output;
    }
  }]);
  return VRPythonErrorProcessor;
}(_ErrorProcessor__WEBPACK_IMPORTED_MODULE_1__["ErrorProcessor"]);


/***/ })

});
//# sourceMappingURL=eae88c48247f630a1d82.37.bundle.js.map