this["webpackChunkwebapp"]([2],{

/***/ "./src/Blockly/BlocklyController.ts":
/*!******************************************!*\
  !*** ./src/Blockly/BlocklyController.ts ***!
  \******************************************/
/*! exports provided: addMainController, removeMainController, setMainController, getCurrentMainController, findControllerByWorkspaceID, addMyBlockController, removeMyBlockController, undo, redo, hasUndo, hasRedo, clearUndoStack, highlightWorkspaceBlockByID, unhighlightWorkspaceBlockByID, addErrorWorkspaceBlockByID, clearAllBlockWarnings, reservedWords, variableExists, updateMyBlockArgumentVariableBlock, getBlocklyComplexVariables, javascriptVariableNames, javascriptVariableNamesByType, resetScale, setScale, getVarNameById, getVarInfo, isDefaultWorkspace, validBreaks, hasWhenStarted, hasMultipleWhenStarteds, hasMultipleOfBlock, addWhenStarted, disableIQGen2Blocks, hasIQGen2Blocks, disableMazePlusBlocks, disableNonMazePlusBlocks, disableEnhancedBlocks, hasEnhancedBlocks, hasMazePlusBlocks, hasNonMazePlusBlocks, disableWhenStarteds, isActiveHighlightable, loadBaseFullToolbox, hasMixedModeBlocks, on, off */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMainController", function() { return addMainController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeMainController", function() { return removeMainController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMainController", function() { return setMainController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentMainController", function() { return getCurrentMainController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findControllerByWorkspaceID", function() { return findControllerByWorkspaceID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMyBlockController", function() { return addMyBlockController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeMyBlockController", function() { return removeMyBlockController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undo", function() { return undo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redo", function() { return redo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasUndo", function() { return hasUndo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRedo", function() { return hasRedo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUndoStack", function() { return clearUndoStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightWorkspaceBlockByID", function() { return highlightWorkspaceBlockByID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unhighlightWorkspaceBlockByID", function() { return unhighlightWorkspaceBlockByID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addErrorWorkspaceBlockByID", function() { return addErrorWorkspaceBlockByID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAllBlockWarnings", function() { return clearAllBlockWarnings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reservedWords", function() { return reservedWords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variableExists", function() { return variableExists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMyBlockArgumentVariableBlock", function() { return updateMyBlockArgumentVariableBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlocklyComplexVariables", function() { return getBlocklyComplexVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "javascriptVariableNames", function() { return javascriptVariableNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "javascriptVariableNamesByType", function() { return javascriptVariableNamesByType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetScale", function() { return resetScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScale", function() { return setScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVarNameById", function() { return getVarNameById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVarInfo", function() { return getVarInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefaultWorkspace", function() { return isDefaultWorkspace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validBreaks", function() { return validBreaks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasWhenStarted", function() { return hasWhenStarted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMultipleWhenStarteds", function() { return hasMultipleWhenStarteds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMultipleOfBlock", function() { return hasMultipleOfBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addWhenStarted", function() { return addWhenStarted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableIQGen2Blocks", function() { return disableIQGen2Blocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIQGen2Blocks", function() { return hasIQGen2Blocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableMazePlusBlocks", function() { return disableMazePlusBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableNonMazePlusBlocks", function() { return disableNonMazePlusBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableEnhancedBlocks", function() { return disableEnhancedBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasEnhancedBlocks", function() { return hasEnhancedBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMazePlusBlocks", function() { return hasMazePlusBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasNonMazePlusBlocks", function() { return hasNonMazePlusBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableWhenStarteds", function() { return disableWhenStarteds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isActiveHighlightable", function() { return isActiveHighlightable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadBaseFullToolbox", function() { return loadBaseFullToolbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMixedModeBlocks", function() { return hasMixedModeBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vexcode/blockly-react-component */ "./node_modules/@vexcode/blockly-react-component/dist/index.js");
/* harmony import */ var _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../targetPlatform */ "./src/targetPlatform.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("BlocklyControllerAccess");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();



_vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Python.INDENT = "    ";
var gen2IQOnlyBlocks = ["iq_looks_draw_pixel", "iq_looks_draw_line", "iq_looks_draw_rectangle", "iq_looks_draw_circle", "iq_looks_set_font", "iq_looks_set_width", "iq_looks_set_pen_color", "iq_looks_set_fill_color", "iq_sensing_inertial_calibrate", "iq_sensing_inertial_acceleration", "iq_sensing_inertial_gyrorate", "iq_sensing_inertial_orientation", "iq_event_optical_detect_gesture", "iq_sensing_optical_set_mode", "iq_sensing_optical_gesture_detected"];
var gen2IQDropdownCheckBlocks = ["iq_sensing_set_gyro_heading", "iq_sensing_set_gyro_rotation", "iq_sensing_heading_of_gyro", "iq_sensing_rotation_of_gyro", "iq_events_when_controller_button", "iq_sensing_pressing_controller", "iq_looks_print_new", "iq_looks_next_row_new", "iq_looks_set_print_precision_new", "iq_looks_clear_all_rows_new"];
var mixedModeBlocks = ["mixed_singleline", "pg_mixed_singleline", "mixed_multiline_command", "pg_mixed_multiline_command", "mixed_c", "pg_mixed_c", "mixed_c_expandable", "pg_mixed_c_expandable", "mixed_singleline_text", "mixed_output_boolean", "pg_mixed_output_boolean", "mixed_conditional", "pg_mixed_conditional", "mixed_output_number", "pg_mixed_output_number", "mixed_definition"];

// Incase we have more enhanced blocks we do want to deactivate
var enhOnlyBlocks = [];
var enhOnlyBlockMap = {
  "pg_looks_set_pen_width": "Set Pen Width",
  "pg_looks_set_pen_color_plus": "Set Pen Color (with Color Picker)",
  "pg_looks_fill_color_plus": "Fill Area with Color (with Color Picker)",
  "pg_events_optical_detect_object_lefteye_detects": "When LeftEye detects an object",
  "pg_events_optical_detect_object_lefteye_loses": "When LeftEye loses an object",
  "pg_sensing_optical_near_object_lefteye": "LeftEye is near object?",
  "pg_sensing_optical_color_lefteye": "LeftEye detects color",
  "pg_sensing_optical_brightness_lefteye": "LeftEye brightness in %",
  "pg_events_optical_detect_object_righteye_detects": "When RightEye detects an object",
  "pg_events_optical_detect_object_righteye_loses": "When RightEye loses an object",
  "pg_sensing_optical_near_object_righteye": "RightEye is near object?",
  "pg_sensing_optical_color_righteye": "RightEye detects color",
  "pg_sensing_optical_brightness_righteye": "RightEye brightness in %",
  "pg_events_optical_detect_object_reareye_detects": "When RearEye detects an object",
  "pg_events_optical_detect_object_reareye_loses": "When RearEye loses an object",
  "pg_sensing_optical_near_object_reareye": "RearEye is near object?",
  "pg_sensing_optical_color_reareye": "RearEye detects color",
  "pg_sensing_optical_brightness_reareye": "RearEye brightness in %",
  "pg_sensing_distance_found_reardistance": "RearDistance found an object?",
  "pg_sensing_distance_distance_reardistance_mm": "RearDistance in mm",
  "pg_sensing_distance_distance_reardistance_inches": "RearDistance in inches"
};
var vrDistanceBlocks = ["pg_sensing_distance_found", "pg_sensing_distance_distance"];
var vrBumperBlocks = ["pg_sensing_bumper", "pg_events_when_bumper"];
var nonMazeBlocks = ["pg_magnet_set_magnet_state"];
var nonMazeBlockMap = {
  "pg_magnet_set_magnet_state_boost": "Energize Magnet to boost",
  "pg_magnet_set_magnet_state_drop": "Energize Magnet to drop",
  "pg_events_when_bumper_leftbumper": "When LeftBumper pressed",
  "pg_sensing_bumper_leftbumper": "LeftBumper pressed?",
  "pg_events_when_bumper_rightbumper": "When RightBumper pressed",
  "pg_sensing_bumper_rightbumper": "RightBumper pressed?",
  "pg_events_optical_detect_object_fronteye_detects": "When FrontEye detects an object",
  "pg_events_optical_detect_object_fronteye_loses": "When FrontEye loses an object",
  "pg_sensing_optical_near_object_fronteye": "FrontEye is near object?",
  "pg_sensing_optical_color_fronteye": "FrontEye detects color",
  "pg_sensing_optical_brightness_fronteye": "FrontEye brightness in %"
};
var vrOpticalBlocks = ["pg_sensing_optical_near_object", "pg_sensing_optical_color", "pg_sensing_optical_brightness", "pg_events_optical_detect_object"];
var mazePlusOnlyBlockMap = {
  "pg_sensing_distance_found_rightdistance": "RightDistance found an object?",
  "pg_sensing_distance_distance_rightdistance_mm": "RightDistance in mm",
  "pg_sensing_distance_distance_rightdistance_inches": "RightDistance in inches",
  "pg_sensing_distance_found_leftdistance": "LeftDistance found an object?",
  "pg_sensing_distance_distance_leftdistance_mm": "LeftDistance in mm",
  "pg_sensing_distance_distance_leftdistance_inches": "LeftDistance in inches",
  "pg_sensing_distance_distance_distanceLeft45_mm": "FrontLeftDistance in mm",
  "pg_sensing_distance_distance_distanceLeft45_inches": "FrontLeftDistance in inches"
};
var mazePlusOnlyDistanceNames = ["rightdistance", "leftdistance"];

//#region controller management
/**
 * list of all the workspace controllers in the app.
 */
var mainControllers = new Set();
/**
 * list of all the my block workspace controllers in the app.
 */
var myBlockControllers = new Set();

/**
 * pointer to the current main controller
 */
var currentMainController = null;

/**
 * this should be called any time we add a new main workspace controller
 * @param controller the controller to add
 */
function addMainController(controller) {
  mainControllers.add(controller);
  if (!currentMainController) {
    currentMainController = controller;
  }
}

/**
 * this should be called any time we remove main workspace controller
 * @param controller the controller to remove
 */
function removeMainController(controller) {
  mainControllers["delete"](controller);
  if (currentMainController.blocklyWorkspaceID === controller.blocklyWorkspaceID) {
    if (mainControllers.size > 0) {
      var _mainControllers = _slicedToArray(mainControllers, 1);
      currentMainController = _mainControllers[0];
    } else {
      currentMainController = undefined;
    }
  }
}

/**
 * this is called to set which workspace controller has focus
 * @param controller the controller that has focus
 */
function setMainController(controller) {
  currentMainController = controller;
}
function getCurrentMainController() {
  return currentMainController;
}

/**
 * searches the main workspace controllers for the one that is controlling the
 * workspace with the specified id.
 * @param id the workspace ID to search for
 * @returns the controller for the ID or null if not found
 */
function findControllerByWorkspaceID(id) {
  var _iterator = _createForOfIteratorHelper(mainControllers),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var controller = _step.value;
      if (controller.blocklyWorkspaceID === id) {
        return controller;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
}

/**
 * this should be called any time we add a new My Blocks workspace controller
 * @param controller the controller to add
 */
function addMyBlockController(controller) {
  myBlockControllers.add(controller);
}

/**
 * this should be called any time we remove main workspace controller
 * @param controller the controller to remove
 */
function removeMyBlockController(controller) {
  myBlockControllers["delete"](controller);
}

// function setMyBlockController(controller: BlocklyWorkspaceController) {
// }
//#endregion controller management

//#region main controller actions
//#region undo/redo
/**
 * will undo one event on the current main workspace
 */
function undo() {
  if (currentMainController) {
    currentMainController.undo();
  }
}

/**
 * will redo one event on the current main workspace
 */
function redo() {
  if (currentMainController) {
    currentMainController.redo();
  }
}

/**
 * checks to see if the current main workspace has any undo actions
 * @returns true if there are any actions in the undo stack
 */
function hasUndo() {
  var _currentMainControlle;
  return ((_currentMainControlle = currentMainController) === null || _currentMainControlle === void 0 ? void 0 : _currentMainControlle.hasUndo()) || false;
}

/**
 * checks to see if the current main workspace has any redo actions
 * @returns true if there are any actions in the redo stack
 */
function hasRedo() {
  var _currentMainControlle2;
  return ((_currentMainControlle2 = currentMainController) === null || _currentMainControlle2 === void 0 ? void 0 : _currentMainControlle2.hasRedo()) || false;
}

/**
 * will clear the undo/redo stack of the current main workspace
 */
function clearUndoStack() {
  if (currentMainController) {
    currentMainController.clearUndoRedoStack();
  }
}
//#endregion undo/redo

//#region highlight
/**
 * turn on highlight for the specified block in the current main workspace
 * @param id the ID of the block to highlight
 */
function highlightWorkspaceBlockByID(id) {
  if (currentMainController) {
    currentMainController.hightlightBlockByID(id);
  }
}

/**
 * turn off highlight for the specified block in the current main workspace
 * @param id the ID of the block to unhighlight
 */
function unhighlightWorkspaceBlockByID(id) {
  if (currentMainController) {
    currentMainController.unhightlightBlockByID(id);
  }
}
//#endregion highlight

//#region block warnings
/**
 * add error text for the specified block in the current main workspace
 * @param id the ID of the block to add error text
 * @param text the error text to apply to the block
 */
function addErrorWorkspaceBlockByID(id, text) {
  // TODO: make this so that we can apply this to a set workspace
  if (currentMainController) {
    var errorBlock = currentMainController.blocklyWorkspace.getBlockById(id);
    if (errorBlock) {
      errorBlock.setWarningText(text);
    }
  }
}

/**
 * clears all warnings from blocks in the current workspace
 */
function clearAllBlockWarnings() {
  // TODO: make this so that we can apply this to a set workspace
  if (currentMainController) {
    var blocks = currentMainController.blocklyWorkspace.getAllBlocks(false);
    blocks.forEach(function (block) {
      block.setWarningText(null);
    });
  }
}
//#endregion block warnings

/**
 * get a list of all the reserved words for the current workspace
 */
function reservedWords() {
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
    var _reservedWords = _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].JavaScript.RESERVED_WORDS_;
    var pythonReservedWords = _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Python.RESERVED_WORDS_;
    var reservedList = _reservedWords.split(",").concat(pythonReservedWords.split(","));
    log.debug("reservedList: ", reservedList);
    return reservedList;
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIs123OrGO"]) {
    var _reservedWords2 = _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].JavaScript.RESERVED_WORDS_;
    var _reservedList = _reservedWords2.split(",");
    return _reservedList;
  } else {
    var _reservedWords3 = _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].CPP.RESERVED_WORDS_;
    var _pythonReservedWords = _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Python.RESERVED_WORDS_;
    var _reservedList2 = _reservedWords3.split(",").concat(_pythonReservedWords.split(","));
    log.debug("reservedList: ", _reservedList2);
    return _reservedList2;
  }
}

/**
 * check to see if there is a variable with the specified name in the current main
 * workspace.
 * @param name the name you want to check exists
 * @returns true if there is a variable with the same name
 */
function variableExists(name) {
  var _currentMainControlle3;
  return ((_currentMainControlle3 = currentMainController) === null || _currentMainControlle3 === void 0 ? void 0 : _currentMainControlle3.doesVariableExist(name)) || false;
}

/**
 * this will run through the provided block and all inputs to make sure that any my
 * block argument blocks are only enabled when used in the stack for that particular
 * my block.
 * @param block the block to process
 */
function updateMyBlockArgumentVariableBlock(block) {
  if (currentMainController) {
    currentMainController.updateMyBlockArgumentVariableBlock(block);
  }
}

/**
 * returns a list of all list and 2d-list variables in the current workspace
 */
function getBlocklyComplexVariables() {
  if (!currentMainController) {
    return null;
  }
  return currentMainController.getBlocklyComplexVariables();
}

/**
 * get a list of all the variables in the current workspace as they would be in the
 * generated javascript code.
 * @returns the list of javascript variable names
 */
function javascriptVariableNames() {
  if (!currentMainController) {
    return null;
  }
  return currentMainController.getJavascriptVariableNames();
}

/**
 * get a list of all the variables in the current workspace as they would be
 * in the generated javascript code organized by the variable type.
 * @param varType the type of variable to process or undefined for all variables
 * @returns the list of javascript variable names
 */
function javascriptVariableNamesByType(varType) {
  if (!currentMainController) {
    return null;
  }
  return currentMainController.getJavascriptVariableNamesByType(varType);
}
function resetScale() {
  if (currentMainController) {
    currentMainController.blocklyWorkspace.setScale(0.72);
  }
}
function setScale(newScale) {
  if (currentMainController) {
    currentMainController.blocklyWorkspace.setScale(newScale);
  }
}
function getVarNameById(id) {
  if (!currentMainController) {
    return null;
  }
  var variable = currentMainController.blocklyWorkspace.getVariableById(id);
  var varName = variable.name;
  return varName;
}

/**
 * get metadata about the variable with the specified name
 * @param name the name of the variable to get the info for
 * @param info the info you want to get
 * @returns 
 */
function getVarInfo(name, info) {
  if (!currentMainController) {
    return null;
  }
  return currentMainController.getVarInfo(name, info);
}

/**
 * check to see if there are any invlaid break block in the current workspace
 * @returns true if there are no invlaid break blocks
 */
function validBreaks() {
  var currWorkspace = currentMainController.blocklyWorkspace;
  var breakBlocksValid = true;
  var _iterator2 = _createForOfIteratorHelper(currWorkspace.getAllBlocks(false)),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var block = _step2.value;
      var blockType = block.type.slice(3);
      if (blockType !== "control_break") {
        // Current block is not relevant; move on to the next one
        continue;
      } else {
        // Current block is a 'break' block, need to check if it's valid
        if (checkBreakValidity(block) === false) {
          log.debug("found invalid break block");
          breakBlocksValid = false;
          break;
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return breakBlocksValid;
}
var validLoops = ["control_repeat", "control_forever", "control_repeat_until", "control_while"];

/**
 * check to see if the specified break block is in a valid location
 * @param block the block to check
 * @returns true if the block is in a valid location
 */
function checkBreakValidity(block) {
  var currentBlock = block;
  var breakIsValid;

  // Orphaned tree precedence
  if (!currentBlock.getRootBlock().startHat_) {
    log.debug("root block is not a top level block, orphaned block tree encountered");
    breakIsValid = true;
    return breakIsValid;
  }

  // Surround parent precedence
  if (!currentBlock.getSurroundParent()) {
    log.debug("found a break block that does not have a surround parent");
    breakIsValid = false;
    return breakIsValid;
  }
  while (currentBlock !== null) {
    log.debug("current block: " + currentBlock);
    if (currentBlock.parentBlock_ === null && currentBlock.startHat_) {
      log.debug("reached the top of a non-orphaned block tree without encountering a valid loop");
      breakIsValid = false;
      break;
    }
    if (currentBlock.parentBlock_ && validLoops.includes(currentBlock.parentBlock_.type.slice(3))) {
      log.debug("encountered a loop structure, checking if break is valid");
      breakIsValid = checkSurroundParent(currentBlock);
      break;
    }
    currentBlock = currentBlock.parentBlock_;
  }
  return breakIsValid;
}
function checkSurroundParent(block) {
  if (!block.getSurroundParent()) {
    log.debug("reached the top of a stack of blocks");
    return false;
  } else if (validLoops.includes(block.getSurroundParent().type.slice(3))) {
    log.debug("found a valid surround parent loop");
    return true;
  }
  return checkSurroundParent(block.getSurroundParent());
}
function getWhenStartedName() {
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
    return "pg_events_when_started";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsGO"]) {
    return "go_events_when_started";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsEXP"]) {
    return "exp_events_when_started";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsV5"]) {
    return "v5_events_when_started";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsIQ"]) {
    return "iq_events_when_started";
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIs123"]) {
    return "123_events_when_started";
  }
  return "pg_events_when_started";
}

/**
 * checks to see if the current workspace has at least one when started block
 * @returns true if there is 1 or more when started blocks
 */
function hasWhenStarted() {
  if (!currentMainController) {
    return false;
  }
  var blockCounts = currentMainController.getBlockCount();
  var blockName = getWhenStartedName();
  return blockCounts[blockName] > 0;
}
function hasMultipleWhenStarteds(limit) {
  var countDisable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var whenStartedID = getWhenStartedName();
  return hasMultipleOfBlock(whenStartedID, limit, countDisable);
}
function hasMultipleOfBlock(blockName, limit) {
  var countDisable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!currentMainController) {
    return false;
  }
  var blockCounts = currentMainController.getBlockCount(countDisable);
  return blockCounts[blockName] > limit;
}
function addWhenStarted() {
  if (!currentMainController) {
    return;
  }
  _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var whenStartedID = getWhenStartedName();
  var workspace = currentMainController.blocklyWorkspace;
  // TODO: the second string may need changed per platform, for now it is working for VR
  var newBlock = workspace.newBlock(whenStartedID, ".NsXwU_L.OuU1l7Sho$F");
  newBlock.setDeletable(false);
  newBlock.moveBy(70, 110);
  currentMainController.rebuildWorkspaceBlocks();
  _vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}
function disableIQGen2Blocks(appGenData) {
  if (!currentMainController) {
    return false;
  }
  var didDisableBlock = false;
  if (appGenData === "First") {
    log.debug("disabling blocks");
    var _iterator3 = _createForOfIteratorHelper(currentMainController.blocklyWorkspace.getAllBlocks(false)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var block = _step3.value;
        log.debug("block:", block.type);
        // We want to disable if the block is only for gen2
        if (gen2IQOnlyBlocks.includes(block.type)) {
          block.setEnabled(false);
          didDisableBlock = true;
        }

        // Or if the block is using the internal inertial sensor
        if (gen2IQDropdownCheckBlocks.includes(block.type)) {
          if (block.getFieldValue("GYRO") === "BrainInertial") {
            block.setEnabled(false);
            didDisableBlock = true;
          }
          log.debug("field value", block.getFieldValue("BUTTON"));
          if (block.getFieldValue("BUTTON") === "ButtonL3" || block.getFieldValue("BUTTON") === "ButtonR3") {
            block.setEnabled(false);
            didDisableBlock = true;
          }
          if (block.getFieldValue("TARGET") === "Console") {
            block.setEnabled(false);
            didDisableBlock = true;
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  return didDisableBlock;
}
function hasIQGen2Blocks() {
  if (!currentMainController) {
    return false;
  }
  var _iterator4 = _createForOfIteratorHelper(currentMainController.blocklyWorkspace.getAllBlocks(false)),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var block = _step4.value;
      log.debug("block:", block);
      // We want to disable if the block is only for gen2
      if (gen2IQOnlyBlocks.includes(block.type)) {
        return true;
      }

      // Or if the block is using the internal inertial sensor
      if (gen2IQDropdownCheckBlocks.includes(block.type)) {
        if (block.getFieldValue("GYRO") === "BrainInertial") {
          return true;
        }
        if (block.getFieldValue("BUTTON") === "ButtonL3" || block.getFieldValue("BUTTON") === "ButtonR3") {
          return true;
        }
        if (block.getFieldValue("TARGET") === "Console") {
          return true;
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return false;
}
function disableEnhancedBlocks() {
  if (!currentMainController) {
    return [];
  }
  var disabledBlocks = new Set();
  log.debug("disabling blocks");
  var _iterator5 = _createForOfIteratorHelper(Object.values(currentMainController.blocklyWorkspace.getAllBlocks(false))),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var block = _step5.value;
      log.debug("block:", block.type);
      // We want to disable if the block is only for vrEnh
      if (vrOpticalBlocks.includes(block.type)) {
        var eyeName = block.getFieldValue("OPTICAL");
        if (eyeName !== "fronteye" && eyeName !== "downeye" && block.disabled !== true) {
          block.disabled = true;
          if (block.type === "pg_events_optical_detect_object") {
            var optionName = block.getFieldValue("OPTIONS");
            disabledBlocks.add(enhOnlyBlockMap[block.type + "_" + eyeName + "_" + optionName]);
          } else {
            disabledBlocks.add(enhOnlyBlockMap[block.type + "_" + eyeName]);
          }
        }
      } else if (vrDistanceBlocks.includes(block.type)) {
        var distanceName = block.getFieldValue("DISTANCE");
        if (mazePlusOnlyDistanceNames.includes(distanceName)) {
          block.disabled = true;
          if (block.type === "pg_sensing_distance_distance") {
            var units = block.getFieldValue("UNITS");
            disabledBlocks.add(enhOnlyBlockMap[block.type + "_" + distanceName + "_" + units]);
          } else {
            disabledBlocks.add(enhOnlyBlockMap[block.type + "_" + distanceName]);
          }
        }
      } else if (enhOnlyBlocks.includes(block.type) && block.disabled !== true) {
        block.disabled = true;
        disabledBlocks.add(enhOnlyBlockMap[block.type]);
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return _toConsumableArray(disabledBlocks);
}
function hasEnhancedBlocks() {
  if (!currentMainController) {
    return false;
  }
  log.debug("check ig blocks need disabled");
  var _iterator6 = _createForOfIteratorHelper(Object.values(currentMainController.blocklyWorkspace.getAllBlocks(false))),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var block = _step6.value;
      log.debug("block:", block.type);
      // We want to disable if the block is only for vrEnh
      if (enhOnlyBlocks.includes(block.type) && block.disabled !== true) {
        return true;
      } else if (vrDistanceBlocks.includes(block.type) && block.disabled !== true) {
        var distanceName = block.getFieldValue("DISTANCE");
        if (distanceName === "reardistance") {
          return true;
        }
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return false;
}
function disableMazePlusBlocks() {
  var disabledBlocks = new Set();
  log.debug("disabling blocks");
  var _iterator7 = _createForOfIteratorHelper(Object.values(currentMainController.blocklyWorkspace.getAllBlocks(false))),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var block = _step7.value;
      log.debug("block:", block.type);
      // We want to disable if the block is only for Wall Maze+
      if (vrDistanceBlocks.includes(block.type) && block.disabled !== true) {
        var distanceName = block.getFieldValue("DISTANCE");
        if (mazePlusOnlyDistanceNames.includes(distanceName)) {
          block.disabled = true;
          if (block.type === "pg_sensing_distance_distance") {
            var units = block.getFieldValue("UNITS");
            disabledBlocks.add(mazePlusOnlyBlockMap[block.type + "_" + distanceName + "_" + units]);
          } else {
            disabledBlocks.add(mazePlusOnlyBlockMap[block.type + "_" + distanceName]);
          }
        }
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return _toConsumableArray(disabledBlocks);
}
function hasMazePlusBlocks() {
  log.debug("checking if blocks need disabled");
  var _iterator8 = _createForOfIteratorHelper(Object.values(currentMainController.blocklyWorkspace.getAllBlocks(false))),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var block = _step8.value;
      log.debug("block:", block.type);
      // We want to disable if the block is only for Wall Maze+
      if (vrDistanceBlocks.includes(block.type) && block.disabled !== true) {
        var distanceName = block.getFieldValue("DISTANCE");
        if (mazePlusOnlyDistanceNames.includes(distanceName)) {
          return true;
        }
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  return false;
}
function disableNonMazePlusBlocks() {
  var disabledBlocks = new Set();
  log.debug("disabling blocks");
  var _iterator9 = _createForOfIteratorHelper(Object.values(currentMainController.blocklyWorkspace.getAllBlocks(false))),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var block = _step9.value;
      log.debug("block:", block.type);
      // We want to disable if the block is only for Wall Maze+
      if (vrOpticalBlocks.includes(block.type) && block.disabled !== true) {
        var eyeName = block.getFieldValue("OPTICAL");
        if (eyeName === "fronteye") {
          block.disabled = true;
          if (block.type === "pg_events_optical_detect_object") {
            var optionName = block.getFieldValue("OPTIONS");
            disabledBlocks.add(nonMazeBlockMap[block.type + "_" + eyeName + "_" + optionName]);
          } else {
            disabledBlocks.add(nonMazeBlockMap[block.type + "_" + eyeName]);
          }
        }
      } else if (vrBumperBlocks.includes(block.type) && block.disabled !== true) {
        block.disabled = true;
        var bumperName = block.getFieldValue("BUMPER");
        disabledBlocks.add(nonMazeBlockMap[block.type + "_" + bumperName]);
      } else if (block.type === "pg_magnet_set_magnet_state") {
        block.disabled = true;
        var magnetState = block.getFieldValue("ACTION");
        disabledBlocks.add(nonMazeBlockMap[block.type + "_" + magnetState]);
      } else if (nonMazeBlocks.includes(block.type) && block.disabled !== true) {
        block.disabled = true;
        disabledBlocks.add(nonMazeBlockMap[block.type]);
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  return _toConsumableArray(disabledBlocks);
}
function hasNonMazePlusBlocks() {
  log.debug("checking if blocks need disabled");
  var _iterator10 = _createForOfIteratorHelper(Object.values(currentMainController.blocklyWorkspace.getAllBlocks(false))),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var block = _step10.value;
      log.debug("block:", block.type);
      // We want to disable if the block is only for Wall Maze+
      if (nonMazeBlocks.includes(block.type) && block.disabled !== true) {
        return true;
      } else if (vrBumperBlocks.includes(block.type) && block.disabled !== true) {
        return true;
      } else if (vrOpticalBlocks.includes(block.type) && block.disabled !== true) {
        var eyeName = block.getFieldValue("OPTICAL");
        if (eyeName === "fronteye") {
          return true;
        }
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
}
function disableWhenStarteds(appGenData) {
  if (!currentMainController) {
    return false;
  }
  var didDisableWhenStarteds = false;
  if (appGenData === "First") {
    var orderedBlocks = currentMainController.blocklyWorkspace.getTopBlocks(true);
    var whenStartedName = "iq_events_when_started";
    var whenStarteds = 0;
    var _iterator11 = _createForOfIteratorHelper(orderedBlocks),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var block = _step11.value;
        if (block.type === whenStartedName && block.isEnabled() && whenStarteds < 3) {
          whenStarteds++;
        } else if (block.type === whenStartedName && whenStarteds >= 3) {
          block.setEnabled(false);
          didDisableWhenStarteds = true;
        }
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }
  return didDisableWhenStarteds;
}

/**
 * Utility function to prevent hat blocks from indefinitely highlighting
 * @param blockId {string} - the block id to check
 * @returns {boolean} - whether a block can be actively highlighted
 */
function isActiveHighlightable(blockId) {
  if (!currentMainController) {
    return false;
  }
  var block = currentMainController.blocklyWorkspace.getBlockById(blockId);
  if (block && !block.hat) {
    return true;
  }
  return false;
}

/**
 * Checks the workspace db to see if there are mixed mode blocks
 */
function hasMixedModeBlocks() {
  if (!currentMainController) {
    return false;
  }
  var _iterator12 = _createForOfIteratorHelper(currentMainController.blocklyWorkspace.getAllBlocks(false)),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var block = _step12.value;
      if (mixedModeBlocks.includes(block.type)) {
        return true;
      }
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  return false;
}
//#endregion main controller actions

//#region event system

var eventCallbacks = {
  checkboxValueChange: [],
  dropdownValueChange: [],
  toolboxRefresh: [],
  emptyUndoStack: []
};
function on(eventName, callback) {
  if (eventCallbacks[eventName].indexOf(callback) >= 0) {
    return;
  }
  eventCallbacks[eventName].push(callback);
}
function off(eventName, callback) {
  var i = eventCallbacks[eventName].indexOf(callback);
  if (i < 0) {
    throw new Error("Unknown callback.");
  }
  eventCallbacks[eventName].splice(i, 1);
}
function fireEvent(eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  log.debug("fire event", eventName);
  if (eventCallbacks[eventName]) {
    eventCallbacks[eventName].slice(0).forEach(function (callback) {
      callback.apply(void 0, args);
    });
  }
}
//#endregion event system

//#region checkboxes
// TODO: implement this
//#endregion checkboxes

function isDefaultWorkspace() {
  var workspace = currentMainController.blocklyWorkspace;
  return workspace.getAllBlocks(false).length === 1 && !!workspace.getBlockById(".NsXwU_L.OuU1l7Sho$F");
}
function loadBaseFullToolbox() {
  getCurrentMainController().setToolbox(_vexcode_blockly_react_component__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks.baseToolbox);
}


/***/ })

});
//# sourceMappingURL=f2a54da053a9cdd69bc4.2.bundle.js.map