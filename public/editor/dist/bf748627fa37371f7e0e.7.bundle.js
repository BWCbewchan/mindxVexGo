this["webpackChunkwebapp"]([7],{

/***/ "./src/Blockly/Blocks/IQ/IQ_Dropdowns.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Dropdowns.ts ***!
  \***********************************************/
/*! exports provided: motorList, spinDirection, eventsDropdown, turnDirection, rotationUnits, distanceUnits, velocityUnits, currentUnits, brakeMode, bumperList, touchLEDList, gyroList, colorNames, sonarList, colorSensorList, controllerList, controllerButtons, controllerAxies, drivetrainList, visonSensorList, controllerIsEnabled, brainButtons, printTargetDropdown, opticalColors, opticalList, opticalOptions, opticalGesture, opticalModes, onOffOptions, distanceObjectSize, distanceSensorList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motorList", function() { return motorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spinDirection", function() { return spinDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsDropdown", function() { return eventsDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turnDirection", function() { return turnDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationUnits", function() { return rotationUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceUnits", function() { return distanceUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocityUnits", function() { return velocityUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentUnits", function() { return currentUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brakeMode", function() { return brakeMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bumperList", function() { return bumperList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchLEDList", function() { return touchLEDList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gyroList", function() { return gyroList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorNames", function() { return colorNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sonarList", function() { return sonarList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorSensorList", function() { return colorSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerList", function() { return controllerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerButtons", function() { return controllerButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerAxies", function() { return controllerAxies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drivetrainList", function() { return drivetrainList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visonSensorList", function() { return visonSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerIsEnabled", function() { return controllerIsEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brainButtons", function() { return brainButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printTargetDropdown", function() { return printTargetDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalColors", function() { return opticalColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalList", function() { return opticalList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalOptions", function() { return opticalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalGesture", function() { return opticalGesture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalModes", function() { return opticalModes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onOffOptions", function() { return onOffOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceObjectSize", function() { return distanceObjectSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceSensorList", function() { return distanceSensorList; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../IQ_ConfigData */ "./src/Blockly/IQ_ConfigData.ts");
/* harmony import */ var _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PG_ConfigData */ "./src/Blockly/PG_ConfigData.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../targetPlatform */ "./src/targetPlatform.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("IQDropdowns");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();






function motorList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"]("motor");
    }
    return [].concat(_toConsumableArray(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getMotorGroupOptions"]()), _toConsumableArray(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getMotorOptions"]()));
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function spinDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_motor_direction_forward"), "fwd"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_motor_direction_reverse"), "rev"]]
  };
}
function turnDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_turn_direction_left"), "left"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_turn_direction_right"), "right"]]
  };
}
function rotationUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_rotation_units_degrees"), "deg"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_rotation_units_turns"), "rev"]]
  };
}
function distanceUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["mm", "mm"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_distance_units_inches"), "in"]]
  };
}
function velocityUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: !_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"] ? [["%", "pct"], ["rpm", "rpm"]] : [["%", "pct"]]
  };
}
function brakeMode(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_brake_mode_brake"), "brake"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_brake_mode_coast"), "coast"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_brake_mode_hold"), "hold"]]
  };
}
function currentUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["amps", "AMPS"]]
  };
}
function bumperList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"]("bumper");
    }
    return _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getBumperOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function touchLEDList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getTouchLEDOptions"]
  };
}
function gyroList(fieldName) {
  var includeBuiltIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    type: "field_dropdown",
    name: fieldName,
    options: function options() {
      if (_AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
        return [["BrainInertial", "BrainInertial"]];
      } else {
        var considerBuiltIn = _AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetGen === "Second" && includeBuiltIn;
        var options = _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getGyroOptions"](considerBuiltIn);
        if (considerBuiltIn) {
          options.push.apply(options, _toConsumableArray(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getInertialOptions"]()));
        }
        return options;
      }
    }
  };
}
function colorNames(fieldName) {
  var includeNone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var options;
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"] && _AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().robotModel === "vrGO") {
    options = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_none"), "none"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_orange"), "orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_purple"), "purple"]];
  } else {
    options = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_none"), "none"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_white"), "white"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_yellow"), "yellow"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_orange"), "orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_purple"), "purple"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_red_violet"), "red_violet"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_violet"), "violet"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_blue_violet"), "blue_violet"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_blue_green"), "blue_green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_yellow_green"), "yellow_green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_yellow_orange"), "yellow_orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_red_orange"), "red_orange"]];
  }
  if (!includeNone) {
    options.shift();
  }
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function sonarList(fieldName) {
  var options = function options() {
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"]("distance");
    }
    return _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getSonarOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function colorSensorList(fieldName) {
  var options = function options() {
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"]("color");
    }
    return _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getColorOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function controllerList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getControllerOptions"]
  };
}
function controllerButtons(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: function options() {
      var buttonList = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_e_up"), "ButtonEUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_e_down"), "ButtonEDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_f_up"), "ButtonFUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_f_down"), "ButtonFDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_l_up"), "ButtonLUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_l_down"), "ButtonLDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_r_up"), "ButtonRUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_r_down"), "ButtonRDown"]];
      if (_AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetGen === "Second") {
        buttonList.push.apply(buttonList, [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_l3"), "ButtonL3"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_r3"), "ButtonR3"]]);
      }
      return buttonList;
    }
  };
}
function controllerAxies(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["A", "AxisA"], ["B", "AxisB"], ["C", "AxisC"], ["D", "AxisD"]]
  };
}
function drivetrainList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getDrivetrainOptions"]
  };
}
function eventsDropdown(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["MyEvent"] // TODO: get list of user events.
    ]
  };
}

function visonSensorList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getVisionSensorOptions"]
  };
}
// Controller Enable/Disable
function controllerIsEnabled(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_disable"), "false"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_enable"), "true"]]
  };
}
function brainButtons(fieldName) {
  var firstOptions = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_up"), "Up"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_down"), "Down"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_check"), "Check"]];
  var secondOptions = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_left"), "Up"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_controller_right"), "Down"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_check"), "Check"]];
  var options = _AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetGen === "First" ? firstOptions : secondOptions;
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function printTargetDropdown(fieldName) {
  var withConsoleOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = function options() {
    var out = [["Brain", "Brain", "brain"]];
    if (withConsoleOption) {
      out.push(["Console", "Console", "console"]);
    }
    return out;
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function opticalList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"]("optical");
    }
    return _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getOpticalSensorOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function opticalOptions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_optical_detect"), "detects"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_optical_loses"), "loses"]]
  };
}
function opticalColors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: !(_AppInfo__WEBPACK_IMPORTED_MODULE_4__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) ? [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_yellow"), "yellow"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_orange"), "orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_purple"), "purple"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_cyan"), "cyan"]] : [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_yellow"), "yellow"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_orange"), "orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_colors_purple"), "purple"]]
  };
}
function opticalGesture(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_direction_up"), "up"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_direction_down"), "down"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_turn_direction_left"), "left"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_turn_direction_right"), "right"]]
  };
}
function opticalModes(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_optical_color"), "color"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_options_optical_gesture"), "gesture"]]
  };
}
function onOffOptions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_on"), "on"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:com_off"), "off"]]
  };
}
function distanceSensorList(fieldName) {
  var options = function options() {
    if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"]("distance");
    }
    return _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_1__["getDistanceOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function distanceObjectSize(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:v5_distance_small"), "small"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:v5_magnet_medium"), "medium"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].t("blockly:v5_magnet_large"), "large"]]
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Event.ts":
/*!*******************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Event.ts ***!
  \*******************************************/
/*! exports provided: createEventsBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventsBlocks", function() { return createEventsBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IQ_Dropdowns */ "./src/Blockly/Blocks/IQ/IQ_Dropdowns.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createEventsBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_started"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["event_started"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_bumper"] = {
    /**
     * Block to define bumper pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_events_when_bumper"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["bumperList"]("BUMPER"), {
          type: "field_dropdown",
          name: "EVENTTYPE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_pressed"), "pressed"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_released"), "released"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // TODO: not used
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_bumper_pressed"] = {
    /**
     * Block to define bumper pressed event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "when %1 pressed",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["bumperList"]("BUMPER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // TODO: not used
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_bumper_released"] = {
    /**
     * Block to define bumper released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "when %1 released",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["bumperList"]("BUMPER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_touchled"] = {
    /**
     * Block to define TouchLED pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_events_when_touchled"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["touchLEDList"]("TOUCHLED"), {
          type: "field_dropdown",
          name: "EVENTTYPE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_pressed"), "pressed"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_released"), "released"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_brain_button"] = {
    /**
     * Block to define brain button pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_events_when_brain_button"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["brainButtons"]("BUTTON"), {
          type: "field_dropdown",
          name: "EVENTTYPE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_pressed"), "pressed"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_released"), "released"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_gyro_changed"] = {
    /**
     * Block to define gyro changed event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "when %1 changed",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["gyroList"]("GYRO")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_controller_button"] = {
    /**
     * Block to define controller button pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_events_when_controller_button"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerButtons"]("BUTTON"), {
          type: "field_dropdown",
          name: "EVENTTYPE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_pressed"), "pressed"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_released"), "released"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_controller_axis"] = {
    /**
     * Block to define controller axis value change event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_events_when_controller_axis"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerAxies"]("AXIS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_buttonpressed"] = {
    /**
     * Block to define controller button pressed event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "when controller button %1 pressed",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerButtons"]("BUTTON")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_event_optical_detect_object"] = {
    /**
     * Block to define optical detects/loses an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_event_optical_detect_object"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalList"]("OPTICAL"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalOptions"]("OPTIONS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_event_optical_detect_gesture"] = {
    /**
     * Block to define optical detects a gesture.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_event_optical_detect_gesture"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalList"]("OPTICAL"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalGesture"]("GESTURE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_timer"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_timer"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_when_broadcasted"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_broadcasted"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_broadcast"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_events_broadcast_and_wait"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast_and_wait"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Looks.ts":
/*!*******************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Looks.ts ***!
  \*******************************************/
/*! exports provided: createLooksBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLooksBlocks", function() { return createLooksBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IQ_Dropdowns */ "./src/Blockly/Blocks/IQ/IQ_Dropdowns.ts");
var _self$navigator;
// we need blockly since we are extending the definitions...


// globals




// locals


// This is pulled from platfromInfo.ts since we can't use window in webworkers and there is no point changing tha whole file for this
var isAndroid = ((_self$navigator = self.navigator) === null || _self$navigator === void 0 ? void 0 : _self$navigator.appVersion.includes("Android")) && self.AndroidNativeInterface !== undefined;
var isiOS = self.webkit && self.webkit.messageHandlers && self.webkit.messageHandlers.selectFileToOpen;
var isVirtual = _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual";
var showConsoleOption = false;
function getPrintPrecisionVars() {
  if (_targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"]) {
    var targets = _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("", true).options().map(function (opt) {
      return opt[2];
    });
    return [{
      name: "vexcode_brain_precision",
      type: ""
    }];
  } else if (Object(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["getTargetLang"])() === "python") {
    var _targets = _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("", true).options().map(function (opt) {
      return opt[2];
    });
    return _targets.map(function (target) {
      return {
        name: "vexcode_".concat(target.toLowerCase(), "_precision"),
        type: ""
      };
    });
  } else {
    var _targets2 = _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("", true).options().map(function (opt) {
      return opt[1];
    });
    return _targets2.map(function (target) {
      return {
        name: "".concat(target, "_precision"),
        type: "int"
      };
    });
  }
}
function createLooksBlocks() {
  // When the appState changes, the blocks are rebuilt
  // We need to recheck whether to show console options
  showConsoleOption = !(isiOS || isAndroid || isVirtual) && _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetGen === "Second";
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_colorlist"] = {
    /**
     * Block to set touchled color by name or hue.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorNames"]("COLOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["output_number"]
      });
      this.setOutputShape(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_ROUND);
      this.setOutput(true, "ColorName");
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_touchled_color"] = {
    /**
     * Block to set touchled color by name.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_touchled_color"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED"), {
          type: "input_value",
          name: "COLOR",
          check: "ColorName"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_setcolor_name"] = {
    /**
     * Block to set touchled color by name.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "🎨 %1 set color %2",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorNames"]("color")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_setcolor_hue"] = {
    /**
     * Block to set touchled color by hue.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 set hue %2",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED"), {
          type: "input_value",
          name: "color",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_touchled_fade"] = {
    /**
     * Block to set touchled fade speed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_touchled_fade"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED"), {
          type: "field_dropdown",
          name: "setting",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_slow"), "slow"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_fast"), "fast"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_off"), "off"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_setstate"] = {
    /**
     * Block to set touchled state.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "set %1 light to %2",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED"), {
          type: "field_dropdown",
          name: "STATE",
          options: [["on", "on"], ["off", "off"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_touchled_brightness"] = {
    /**
     * Block to set touchled brightness.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_touchled_brightness"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED"), {
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_off"] = {
    /**
     * Block to turn touchled off.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1 off",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_print"] = {
    /**
     * Block to print to screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_print"),
        args0: [{
          type: "input_value",
          name: "DATA",
          check: ["Number", "String", "Boolean", "ColorName"]
        }, {
          type: "field_mutatortoggle",
          name: "andsetcursortonextrow_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_to_next_row")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getPrintPrecisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_cursor"] = {
    /**
     * Block to set screen cursor position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_cursor"),
        args0: [{
          type: "input_value",
          name: "ROW",
          check: "Number"
        }, {
          type: "input_value",
          name: "COLUMN",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_print_precision"] = {
    /**
     * Block to set the print precision.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_print_precision"),
        args0: [{
          type: "field_dropdown",
          name: "PRECISION",
          options: [["1", "0"], ["0.1", "1"], ["0.01", "2"], ["0.001", "3"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com options all digits"), "-1"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getPrintPrecisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_clear_all_rows"] = {
    /**
     * Block to clear screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_clear_all_rows"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_clear_row"] = {
    /**
     * Block to clear line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_clear_row"),
        args0: [{
          type: "input_value",
          name: "ROW",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_next_row"] = {
    /**
     * Block to get new line on screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_next_row"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_lightstate"] = {
    /**
     * Block to turn color sensor LED on/off.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "set %1 light to %2",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR"), {
          type: "field_dropdown",
          name: "STATE",
          options: [["on", "on"], ["off", "off"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_color_sensor_brightness"] = {
    /**
     * Block to turn color sensor LED on/off.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_color_sensor_brightness"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR"), {
          type: "input_value",
          name: "LEVEL",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  //#region IQ Gen 2 blocks
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_print_new"] = {
    /**
     * Block to print to screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_print_new"),
        args0: [{
          type: "input_value",
          name: "DATA",
          check: ["Number", "String", "Boolean", "ColorName"]
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET", showConsoleOption), {
          type: "field_mutatortoggle",
          name: "andsetcursortonextrow_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_to_next_row")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getPrintPrecisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_cursor_new"] = {
    /**
     * Block to set screen cursor position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_cursor_new"),
        args0: [{
          type: "input_value",
          name: "ROW",
          check: "Number"
        }, {
          type: "input_value",
          name: "COLUMN",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_next_row_new"] = {
    /**
     * Block to get new line on screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_next_row_new"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_print_precision_new"] = {
    /**
     * Block to set the print precision.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_print_precision_new"),
        args0: [{
          type: "field_dropdown",
          name: "PRECISION",
          options: [["1", "0"], ["0.1", "1"], ["0.01", "2"], ["0.001", "3"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com options all digits"), "-1"]]
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getPrintPrecisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_clear_all_rows_new"] = {
    /**
     * Block to clear screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_clear_all_rows_new"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_clear_row_new"] = {
    /**
     * Block to clear line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_clear_row_new"),
        args0: [{
          type: "input_value",
          name: "ROW",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_draw_pixel"] = {
    /**
     * Block to draw a pixel.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_draw_pixel"),
        args0: [{
          type: "input_value",
          name: "X",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_draw_line"] = {
    /**
     * Block to draw a line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_draw_line"),
        args0: [{
          type: "input_value",
          name: "X1",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y1",
          check: "Number"
        }, {
          type: "input_value",
          name: "X2",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y2",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_draw_rectangle"] = {
    /**
     * Block to draw a line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_draw_rectangle"),
        args0: [{
          type: "input_value",
          name: "X",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y",
          check: "Number"
        }, {
          type: "input_value",
          name: "WIDTH",
          check: "Number"
        }, {
          type: "input_value",
          name: "HEIGHT",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_draw_circle"] = {
    /**
     * Block to draw a circle.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_draw_circle"),
        args0: [{
          type: "input_value",
          name: "X",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y",
          check: "Number"
        }, {
          type: "input_value",
          name: "RADIUS",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_font"] = {
    /**
     * Block to set font.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_font"),
        args0: [{
          type: "field_dropdown",
          name: "FONT",
          options: [["Mono Extra Small", "mono12"], ["Mono Small", "mono15"], ["Mono Medium", "mono20"], ["Mono Large", "mono30"], ["Mono Extra Large", "mono40"], ["Mono Super Large", "mono60"], ["Prop Medium", "prop20"], ["Prop Large", "prop30"], ["Prop Extra Large", "prop40"], ["Prop Super Large", "prop60"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_width"] = {
    /**
     * Block to set pen width.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_width"),
        args0: [{
          type: "input_value",
          name: "WIDTH",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_pen_color"] = {
    /**
     * Block to set pen color.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_pen_color"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorNames"]("COLOR", false), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_looks_set_fill_color"] = {
    /**
     * Block to set touchled color by name.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_looks_set_fill_color"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorNames"]("COLOR", false)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  //#endregion IQ Gen 2 blocks
}



/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Motion.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Motion.ts ***!
  \********************************************/
/*! exports provided: createMotionBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMotionBlocks", function() { return createMotionBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IQ_Dropdowns */ "./src/Blockly/Blocks/IQ/IQ_Dropdowns.ts");
/* harmony import */ var _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../IQ_ConfigData */ "./src/Blockly/IQ_ConfigData.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("IQ Motion blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals


function createMotionBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_spin"] = {
    /**
     * Block to spin motor in specified direction.
     * @this Blockly.Block
     */
    init: function init() {
      var _this = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_spin"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
          }
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });

      // listen for changes to the selected motor to update the displayed direction name
      this.getField("MOTOR").setValidator(function (value) {
        var _this2 = this;
        var oldMotorValue = this.sourceBlock_.getFieldValue("MOTOR");
        if (value === oldMotorValue) {
          // the value did not actually change so there is no need to update anything...
          return value;
        }
        log.info("spin motor value changed");
        setTimeout(function () {
          var field = _this2.sourceBlock_.getField("DIRECTION");
          var fieldValue = field.getValue();
          // we need to change the value so we get the list of values and select the
          // one that is not currently selected to change to before we change back
          var options = field.getOptions(false);
          var optionValue = options[0][1] === fieldValue ? options[1][1] : options[0][1];
          field.setValue(optionValue);
          field.setValue(fieldValue);
          _this2.sourceBlock_.getField("DIRECTION").forceRerender();
        }, 10);
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_spin_to_position"] = {
    /**
     * Block to spin motor to specified absolute position with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_spin to position"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["rotationUnits"]("UNITS"), {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_spin_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      var _this3 = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_spin_for"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this3.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
          }
        }, {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["rotationUnits"]("UNITS"), {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });

      // listen for changes to the selected motor to update the displayed direction name
      this.getField("MOTOR").setValidator(function (value) {
        var _this4 = this;
        var oldMotorValue = this.sourceBlock_.getFieldValue("MOTOR");
        if (value === oldMotorValue) {
          // the value did not actually change so there is no need to update anything...
          return value;
        }
        log.info("spin for motor value changed");
        setTimeout(function () {
          var field = _this4.sourceBlock_.getField("DIRECTION");
          var fieldValue = field.getValue();
          // we need to change the value so we get the list of values and select the
          // one that is not currently selected to change to before we change back
          var options = field.getOptions(false);
          var optionValue = options[0][1] === fieldValue ? options[1][1] : options[0][1];
          field.setValue(optionValue);
          field.setValue(fieldValue);
          _this4.sourceBlock_.getField("DIRECTION").forceRerender();
        }, 10);
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_stop_motor"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_stop_motor"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_set_motor_position"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_set_motor_position"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "DEGS",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["rotationUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_set_motor_velocity"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_set_motor_velocity"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_set_motor_stopping"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_set_motor_stopping"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["brakeMode"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_set_motor_torque"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_set_motor_torque"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "TORQUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_set_motor_timeout"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_set_motor_timeout"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "TIMEOUT",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_drive"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_drive"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_drive_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_drive_for"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION"), {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNITS"), {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_turn"] = {
    /**
     * Block to turn drivetrain body.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_turn"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["turnDirection"]("TURNDIRECTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_turn_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_turn_for"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["turnDirection"]("TURNDIRECTION"), {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_turn_to_heading"] = {
    /**
     * Block to turn robot to absolute heading with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_turn_to_heading"),
        args0: [{
          type: "input_value",
          name: "HEADING",
          check: "Number"
        }, {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_turn_to_rotation"] = {
    /**
     * Block to turn robot to absolute heading with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_turn_to_rotation"),
        args0: [{
          type: "input_value",
          name: "HEADING",
          check: "Number"
        }, {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_stop_driving"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_stop_driving"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_set_drive_velocity"] = {
    /**
     * Block to set drivetrain velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_set_drive_velocity"),
        args0: [{
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_set_turn_velocity"] = {
    /**
     * Block to set drivetrain turn velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_set_turn_velocity"),
        args0: [{
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }, _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_set_drive_stopping"] = {
    /**
     * Block to set drivetrain brake mode.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_set_drive_stopping"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["brakeMode"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_set_drive_timeout"] = {
    /**
     * Block to set drivetrain timeout.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_set_drive_timeout"),
        args0: [{
          type: "input_value",
          name: "TIMEOUT",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_set_drive_heading"] = {
    /**
     * Block to set drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_set_drive_heading"),
        args0: [{
          type: "input_value",
          name: "HEADING",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_drivetrain_set_drive_rotation"] = {
    /**
     * Block to set drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_drivetrain_set_drive_rotation"),
        args0: [{
          type: "input_value",
          name: "HEADING",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  //#region "Motion pneumatics"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_pneumatics_cylinder"] = {
    /**
     * Block to set pneumatic cylinder state
     * @this Blockly.Block
     */
    init: function init() {
      var _this5 = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_pneumatics_cylinder"),
        args0: [{
          type: "field_dropdown",
          name: "PNEUMATIC",
          options: _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getPneumaticOptions"]
        }, {
          type: "field_dropdown",
          name: "CYLINDER",
          options: function options() {
            var pneumaticName = _this5.getFieldValue("PNEUMATIC");
            if (pneumaticName) {
              log.debug("pneumatic name for direction field: ", pneumaticName);
              return Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getPneumaticCylinderOptions"])(pneumaticName);
            } else {
              var defaultPneumaticName = Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getPneumaticOptions"])()[0][1];
              log.debug("default pneumatic name for direction field: ", defaultPneumaticName);
              return Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getPneumaticCylinderOptions"])(defaultPneumaticName);
            }
          }
        }, {
          type: "field_dropdown",
          name: "STATE",
          options: [["extend", "extend"], ["retract", "retract"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });

      // listen for changes to the selected pneumatic to update the displayed direction name
      this.getField("PNEUMATIC").setValidator(function (value) {
        var _this6 = this;
        // we don't actually do any validation here, but this gets called every time
        // the PNEUMATIC field gets changed. so it is a very easy way to monitor
        // when we need to update the cylinder name
        log.info("pneumatic cylinder device changed");
        setTimeout(function () {
          var cylinderField = _this6.sourceBlock_.getField("CYLINDER");
          var cylinderValue = cylinderField.getValue();
          cylinderField.setValue("");
          cylinderField.setValue(cylinderValue);
          _this6.sourceBlock_.getField("CYLINDER").forceRerender();
        }, 10);
        // Since we are just using this to monitor for changes, we need to return
        // the value unchanged so that the change is not blocked
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["iq_motion_pneumatics_compressor"] = {
    /**
     * Block to control pneumatic compressor state
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_motion_pneumatics_compressor"),
        args0: [{
          type: "field_dropdown",
          name: "PNEUMATIC",
          options: _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getPneumaticOptions"]
        }, {
          type: "field_dropdown",
          name: "STATE",
          options: [["on", "on"], ["off", "off"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  //#endregion "Motion pneumatics"
}



/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Sensing.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Sensing.ts ***!
  \*********************************************/
/*! exports provided: createSensingBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSensingBlocks", function() { return createSensingBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IQ_Dropdowns */ "./src/Blockly/Blocks/IQ/IQ_Dropdowns.ts");
/* harmony import */ var _IQ_ConfigData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../IQ_ConfigData */ "./src/Blockly/IQ_ConfigData.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// we need blockly since we are extending the definitions...


// globals




// locals


function getVisionIndexVars() {
  if (Object(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["getTargetLang"])() === "python") {
    var visionsPython = Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSensorOptions"])().map(function (opt) {
      return opt[2];
    });
    return visionsPython.map(function (vision) {
      return {
        name: "vexcode_".concat(vision.toLowerCase(), "_object_index"),
        initValue: "0"
      };
    });
  } else {
    var visionsCpp = Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSensorOptions"])().map(function (opt) {
      return opt[0];
    });
    var data = visionsCpp.map(function (vision) {
      return {
        name: "".concat(vision, "_objectIndex"),
        type: "int"
      };
    });
    return data;
  }
}
function getVisionVars() {
  if (Object(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["getTargetLang"])() === "python") {
    var visionsPython = Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSensorOptions"])().map(function (opt) {
      return opt[2];
    });
    return visionsPython.map(function (vision) {
      return "vexcode_".concat(vision.toLowerCase(), "_objects");
    });
  } else {
    return [];
  }
}
function createSensingBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_motor_is_done"] = {
    /**
     * Block to check if motor is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_motor_is_done"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_position_of_motor"] = {
    /**
     * Block to get motor position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_position_of_motor"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_velocity_of_motor"] = {
    /**
     * Block to get motor velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_velocity_of_motor"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_current_of_motor"] = {
    /**
     * Block to get motor current.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_current_of_motor"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["currentUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_motor_is_spinning"] = {
    /**
     * Block to check if motor is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_motor_is_spinning"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_pressing_bumper"] = {
    /**
     * Block to check if bunper is being pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_pressing_bumper"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["bumperList"]("BUMPER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_pressing_touchled"] = {
    /**
     * Block to check if touch is being pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_pressing_touchled"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["touchLEDList"]("TOUCHLED")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_calibrate_gyro"] = {
    /**
     * Block to calibrate gyro.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_calibrate_gyro"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroList"]("GYRO"), {
          type: "field_dropdown",
          name: "setting",
          options: [["2", "quick"], ["4", "slow"], ["8", "accurate"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_set_gyro_heading"] = {
    /**
     * Block to reset gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_set_gyro_heading"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroList"]("GYRO", true), {
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_set_gyro_rotation"] = {
    /**
     * Block to reset gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_set_gyro_rotation"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroList"]("GYRO", true), {
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_heading_of_gyro"] = {
    /**
     * Block to get gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_heading_of_gyro"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroList"]("GYRO", true)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_rotation_of_gyro"] = {
    /**
     * Block to get gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_rotation_of_gyro"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroList"]("GYRO", true)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_rate_of_gyro"] = {
    /**
     * Block to get gyro rate.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_rate_of_gyro"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroList"]("GYRO")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_inertial_calibrate"] = {
    /**
     * Block to calibrate inertial.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_inertial_calibrate"),
        args0: [{
          type: "field_dropdown",
          name: "INERTIAL",
          options: [["BrainInertial", "BrainInertial"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_inertial_acceleration"] = {
    /**
     * Block to get inertial sensor's acceleration in specified axis.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_inertial_acceleration"),
        args0: [{
          type: "field_dropdown",
          name: "INERTIAL",
          options: [["BrainInertial", "BrainInertial"]]
        }, {
          type: "field_dropdown",
          name: "AXIS",
          options: [["x", "xaxis"], ["y", "yaxis"], ["z", "zaxis"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_inertial_gyrorate"] = {
    /**
     * Block to get inertial sensor's acceleration in specified axis.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_inertial_gyrorate"),
        args0: [{
          type: "field_dropdown",
          name: "INERTIAL",
          options: [["BrainInertial", "BrainInertial"]]
        }, {
          type: "field_dropdown",
          name: "AXIS",
          options: [["x", "xaxis"], ["y", "yaxis"], ["z", "zaxis"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_inertial_orientation"] = {
    /**
     * Block to get inertial sensor's acceleration in specified axis.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_inertial_orientation"),
        args0: [{
          type: "field_dropdown",
          name: "INERTIAL",
          options: [["BrainInertial", "BrainInertial"]]
        }, {
          type: "field_dropdown",
          name: "AXIS",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_roll"), "roll"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_pitch"), "pitch"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_yaw"), "yaw"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };

  //#region "Sensing Optical"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_set_light"] = {
    /**
     * Block to set optical light on/off.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_set_light"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["onOffOptions"]("OPTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_set_light_power"] = {
    /**
     * Block to set optical light power.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_set_light_power"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), {
          type: "input_value",
          name: "POWER",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_set_mode"] = {
    /**
     * Block to set optical gesture mode
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_set_mode"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalModes"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_found_object"] = {
    /**
     * Block to check if optical found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_found_object"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_detect"] = {
    /**
     * Block to check if optical found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_detect"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalColors"]("COLORS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_color"] = {
    /**
     * Block to get the color that the Optical Sensor
     * currently detects
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_color"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
      this.setOutputShape(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_ROUND);
      this.setOutput(true, "ColorName");
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_brightness"] = {
    /**
     * Block to get optical brightness.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_brightness"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_hue"] = {
    /**
     * Block to get optical hue.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_hue"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_optical_gesture_detected"] = {
    /**
     * Block to report if a gesture had been detected
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_optical_gesture_detected"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalGesture"]("GESTURE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  //#endregion "Sensing Optical"

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_object_in_front"] = {
    /**
     * Block to check if object is in front of the distance sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_object_in_front"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["sonarList"]("SONAR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_distance_from"] = {
    /**
     * Block to get distance sensor distance value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_distance_from"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["sonarList"]("SONAR"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_object_is_near"] = {
    /**
     * Block to check if a object is near the color sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_object_is_near"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_brightness_of"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_brightness_of"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_hue_of"] = {
    /**
     * Block to get color sensro hue value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_hue_of"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };

  // TODO: this block should be called "iq_sensing_color_detects_color"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_color_detects_color"] = {
    /**
     * Block for color comparison.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_color_detects_color"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorNames"]("color", false)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_color_of"] = {
    /**
     * Block to get color sensor color value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_color_of"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode !== "Virtual" ? ["output_number", "context_menu_convert_output_number"] : ["output_string"]
      });
      this.setOutputShape(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_ROUND);
      if (_AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode !== "Virtual") {
        this.setOutput(true, "ColorName");
      }
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_color_name3"] = {
    /**
     * Block to get color sensro hue value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "🎨 %1 3 color",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
      this.setOutputShape(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_ROUND);
      this.setOutput(true, "ColorName");
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_color_name12"] = {
    /**
     * Block to get color sensro hue value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "🎨 %1 12 color",
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["colorSensorList"]("COLORSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
      this.setOutputShape(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].OUTPUT_SHAPE_ROUND);
      this.setOutput(true, "ColorName");
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_timer_value"] = {
    /**
     * Block to get brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_timer_value"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_reset_timer"] = {
    /**
     * Block to reset brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_reset_timer"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_cursor_column"] = {
    /**
     * Block to get brain screen column.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_cursor_column"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_cursor_row"] = {
    /**
     * Block to get brain screen row.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_cursor_row"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_brain_button_pressed"] = {
    /**
     * Block to check if brain button is pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_brain_button_pressed"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["brainButtons"]("BUTTON")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_battery_level"] = {
    /**
     * Block to get battery voltage.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_battery_level"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_pressing_controller"] = {
    /**
     * Block to get controller button value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_pressing_controller"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerButtons"]("BUTTON")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_position_of_controller"] = {
    /**
     * Block to get controller axis value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_position_of_controller"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerAxies"]("AXIS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  // Controller Enable/Disable
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_controller_is_enabled"] = {
    /**
     * Block to enable or disable the generated controller code
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_controller_is_enabled"),
        //TODO: Set up for i18n
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerIsEnabled"]("isEnabled")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      if (Object(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["getTargetLang"])() === "python") {
        return [{
          name: "remote_control_code_enabled",
          initValue: "True"
        }];
      } else {
        return [];
      }
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_drive_heading"] = {
    /**
     * Block to drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_drive_heading"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_drive_rotation"] = {
    /**
     * Block to drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_drive_rotation"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_drive_velocity"] = {
    /**
     * Block to drivetrain velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_drive_velocity"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_drive_current"] = {
    /**
     * Block to drivetrain current.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_drive_current"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["currentUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_drive_is_moving"] = {
    /**
     * Block to check if drivetrain is moving.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_drive_is_moving"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_drive_is_done"] = {
    /**
     * Block to check if drivetrain is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_drive_is_done"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };

  //#region "Sensing Vision"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_snapshot"] = {
    /**
     * Block to take a vision snapshot of the signature
     * @this Blockly.Block
     */
    init: function init() {
      var _this = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_snapshot"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION"), {
          type: "field_dropdown",
          name: "SIGNATURE",
          options: function options() {
            var visionname = _this.getFieldValue("VISION");
            return Object(_IQ_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSignatureOptions"])(visionname);
          }
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });

      // listen for changes to the selected vision sensor to update the selected signature
      this.getField("VISION").setValidator(function (value) {
        var _this2 = this;
        var oldValue = this.sourceBlock_.getField("VISION").getValue();
        // bypass the update if any value is falsey or if the value is not actually changing...
        if (!oldValue || !value || oldValue === value) {
          return value;
        }
        setTimeout(function () {
          var field = _this2.sourceBlock_.getField("SIGNATURE");
          var options = field.getOptions(false);
          var optionValue = options[0][1];
          field.setValue(optionValue);
          _this2.sourceBlock_.getField("SIGNATURE").forceRerender();
        }, 10);
        return value;
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getVisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_set_vision_object_index"] = {
    /**
     * Block to set the vision object index
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_set_vision_object_index"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION"), {
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getVisionIndexVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_object_count"] = {
    /**
     * Block to display the count of objects in the vision sensor
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_object_count"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getVisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_object_exists"] = {
    /**
     * Block to check if Brain screen has been pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_object_exists"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getVisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_vision_object"] = {
    /**
     * Block to display the count of objects in the vision sensor
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_vision_object"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION"), {
          type: "field_dropdown",
          name: "PROPERTY",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_vision_width"), "width"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_vision_height"), "height"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_vision_centerX"), "centerX"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_vision_centerY"), "centerY"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_vision_angle"), "angle"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return [].concat(_toConsumableArray(getVisionIndexVars()), _toConsumableArray(getVisionVars()));
    }
  };
  //#endregion

  //#region "Sensing Distance"

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_distance_object_distance"] = {
    /**
     * Block to get object distance.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_distance_object_distance"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_distance_object_velocity"] = {
    /**
     * Block to get object velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_distance_object_velocity"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_distance_object_size"] = {
    /**
     * Block to check if object size is small/medium/large.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_distance_object_size"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE"), _IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceObjectSize"]("SIZE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sensing_distance_found_object"] = {
    /**
     * Block to check if distance sensor found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:iq_sensing_distance_found_object"),
        args0: [_IQ_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  //#endregion "Sensing Distance"
}



/***/ }),

/***/ "./src/Blockly/IQ_ConfigData.ts":
/*!**************************************!*\
  !*** ./src/Blockly/IQ_ConfigData.ts ***!
  \**************************************/
/*! exports provided: setControllerList, setDrivetrainList, setMotorList, setPneumaticList, setBumperList, setGyroList, setColorList, setSonarList, setTouchLEDList, setVisionSensorList, setMotorGroupList, isValidController, isValidDrivetrain, isValidMotor, isValidPneumatic, isValidBumper, isValidGyro, isValidColor, isValidSonar, isValidTouchLED, isValidVisionSensor, isValidMotorGroup, getControllerOptions, getDrivetrainOptions, getMotorOptions, getVirtualMotorOptions, getPneumaticOptions, getBumperOptions, getVirtualBumperOptions, getGyroOptions, getColorOptions, getVirtualColorSensorOptions, getSonarOptions, getVirtualSonarOptions, getTouchLEDOptions, getVisionSensorOptions, getMotorGroupOptions, hasController, hasDrivetrain, hasMotor, hasPneumatic, hasBumper, hasGyro, hasColorSensor, hasSonar, hasTouchLED, hasVisionSensor, hasMotorGroup, setOpticalSensorList, getOpticalSensorOptions, isValidOpticalSensor, hasOpticalSensor, getVirtualOpticalSensorOptions, setDistanceList, getDistanceOptions, isValidDistance, hasDistance, getVirtualDistanceOptions, setInertialList, getInertialOptions, isValidInertial, hasInertial, setMotorDirectionNames, setMotorDirectionNamesIQ, getMotorDirectionOptions, setPneumaticCylinderNames, getPneumaticCylinderOptions, setVisionSignatureNames, getVisionSignatureOptions, init, updateDirectionNames, updateDeviceNames, disableBlocksWithDeletedDevices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setControllerList", function() { return setControllerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDrivetrainList", function() { return setDrivetrainList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorList", function() { return setMotorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPneumaticList", function() { return setPneumaticList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBumperList", function() { return setBumperList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGyroList", function() { return setGyroList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setColorList", function() { return setColorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSonarList", function() { return setSonarList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTouchLEDList", function() { return setTouchLEDList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVisionSensorList", function() { return setVisionSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorGroupList", function() { return setMotorGroupList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidController", function() { return isValidController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDrivetrain", function() { return isValidDrivetrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMotor", function() { return isValidMotor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidPneumatic", function() { return isValidPneumatic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidBumper", function() { return isValidBumper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidGyro", function() { return isValidGyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidColor", function() { return isValidColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidSonar", function() { return isValidSonar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidTouchLED", function() { return isValidTouchLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidVisionSensor", function() { return isValidVisionSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMotorGroup", function() { return isValidMotorGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getControllerOptions", function() { return getControllerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDrivetrainOptions", function() { return getDrivetrainOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorOptions", function() { return getMotorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualMotorOptions", function() { return getVirtualMotorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPneumaticOptions", function() { return getPneumaticOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBumperOptions", function() { return getBumperOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualBumperOptions", function() { return getVirtualBumperOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGyroOptions", function() { return getGyroOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColorOptions", function() { return getColorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualColorSensorOptions", function() { return getVirtualColorSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSonarOptions", function() { return getSonarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualSonarOptions", function() { return getVirtualSonarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTouchLEDOptions", function() { return getTouchLEDOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisionSensorOptions", function() { return getVisionSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorGroupOptions", function() { return getMotorGroupOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasController", function() { return hasController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDrivetrain", function() { return hasDrivetrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMotor", function() { return hasMotor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPneumatic", function() { return hasPneumatic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasBumper", function() { return hasBumper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGyro", function() { return hasGyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasColorSensor", function() { return hasColorSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasSonar", function() { return hasSonar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTouchLED", function() { return hasTouchLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasVisionSensor", function() { return hasVisionSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMotorGroup", function() { return hasMotorGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpticalSensorList", function() { return setOpticalSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOpticalSensorOptions", function() { return getOpticalSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidOpticalSensor", function() { return isValidOpticalSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOpticalSensor", function() { return hasOpticalSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualOpticalSensorOptions", function() { return getVirtualOpticalSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDistanceList", function() { return setDistanceList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceOptions", function() { return getDistanceOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDistance", function() { return isValidDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDistance", function() { return hasDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualDistanceOptions", function() { return getVirtualDistanceOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInertialList", function() { return setInertialList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInertialOptions", function() { return getInertialOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidInertial", function() { return isValidInertial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasInertial", function() { return hasInertial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorDirectionNames", function() { return setMotorDirectionNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorDirectionNamesIQ", function() { return setMotorDirectionNamesIQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorDirectionOptions", function() { return getMotorDirectionOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPneumaticCylinderNames", function() { return setPneumaticCylinderNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPneumaticCylinderOptions", function() { return getPneumaticCylinderOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVisionSignatureNames", function() { return setVisionSignatureNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisionSignatureOptions", function() { return getVisionSignatureOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDirectionNames", function() { return updateDirectionNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDeviceNames", function() { return updateDeviceNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableBlocksWithDeletedDevices", function() { return disableBlocksWithDeletedDevices; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _RobotConfiguration_Manager_VirtualRobotConfigManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../RobotConfiguration/Manager/VirtualRobotConfigManager */ "./src/RobotConfiguration/Manager/VirtualRobotConfigManager.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../targetPlatform */ "./src/targetPlatform.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("IQ_ConfigData");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();







// these imports need to make sure we have react defined. if not we are in a webworker and it will cause errors

var RobotConfigManager = null;
var BlocklyController = null;
if (self.React) {
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(10), __webpack_require__.e(12), __webpack_require__.e(4), __webpack_require__.e(14), __webpack_require__.e(5), __webpack_require__.e(9), __webpack_require__.e(6), __webpack_require__.e(2), __webpack_require__.e(11), __webpack_require__.e(8), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ../RobotConfiguration */ "./src/RobotConfiguration/index.ts")).then(function (res) {
    RobotConfigManager = res.RobotConfigManager;
  });
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./BlocklyController */ "./src/Blockly/BlocklyController.ts")).then(function (res) {
    BlocklyController = res;
  });
}
var controllerList = [];
var drivetrainList = [];
var motorGroupList = [];
var motorList = [];
var pneumaticList = [];
var bumperList = [];
var gyroList = [];
var inertialList = [];
var colorList = [];
var sonarList = [];
var touchLEDList = [];
var visionSensorList = [];
var opticalSensorList = [];
var distanceList = [];
function getListOptions(list, noOptionStr, noPlaceholderOption) {
  if (list.length === 0) {
    var placeholderOptions = [];
    if (noOptionStr) {
      placeholderOptions = [[noOptionStr, noOptionStr, noOptionStr]];
    } else {
      placeholderOptions = [["NO OPTIONS", "NO OPTIONS", "NO OPTIONS"]];
    }
    return noPlaceholderOption ? [] : placeholderOptions;
  }
  return list.map(function (item) {
    return [item[0], item[0], item[1]];
  });
}
function filterListInput(list) {
  if (list === undefined || list == null) {
    return [];
  } else if (!Array.isArray(list)) {
    throw new TypeError("input must be an array of an array of strings");
  } else if (!list.every(function (item) {
    return Array.isArray(item);
  })) {
    throw new TypeError("input must be an array of an array of strings");
  } else if (!list.every(function (item) {
    return item.every(function (subitem) {
      return typeof subitem === "string";
    });
  })) {
    throw new TypeError("input must be an array of an array of strings");
  } else {
    return list;
  }
}
function deviceInList(list, name) {
  // tslint:disable-next-line: prefer-for-of
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] === name) {
      return true;
    }
  }
  return false;
}

//#region "robot config monitor"
var updateLookupTable = {
  controller: setControllerList,
  motor: setMotorList,
  pneumatic: setPneumaticList,
  bumper: setBumperList,
  gyro: setGyroList,
  sonar: setSonarList,
  colorsensor: setColorList,
  touchled: setTouchLEDList,
  vision: setVisionSensorList,
  smartdrive: setDrivetrainList,
  motor_group: setMotorGroupList,
  optical: setOpticalSensorList,
  distance: setDistanceList
};
function onRobotConfigChange() {
  log.info("updating blockly with new info from robot config");

  // create a variable to store a temp list of  the current device info
  var tmpList = {};
  for (var _i = 0, _Object$keys = Object.keys(updateLookupTable); _i < _Object$keys.length; _i++) {
    var _key = _Object$keys[_i];
    tmpList[_key] = [];
  }

  // go through the list of devices and place the info in a temp location
  var _iterator = _createForOfIteratorHelper(RobotConfigManager.currentConfiguration),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var device = _step.value;
      try {
        if (device.isCustomName) {
          tmpList[device.deviceType["class"]].push([device.name, device.name]);
        } else {
          tmpList[device.deviceType["class"]].push([device.name, device.defaultPythonName]);
        }
      } catch (e) {
        log.error("The class ".concat(device.deviceType["class"], " does not exist in blockly list"));
        log.error(e);
      }
    }

    // some debug statements to make sure things are working as expected
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  log.debug("tmpList:", tmpList);
  log.debug("updateLookupTable:", updateLookupTable);

  // take the info from the temp location and update the actual lists
  for (var _i2 = 0, _Object$keys2 = Object.keys(tmpList); _i2 < _Object$keys2.length; _i2++) {
    var _key2 = _Object$keys2[_i2];
    try {
      updateLookupTable[_key2](tmpList[_key2]);
    } catch (e) {
      log.error("Blockly missed a callback for", _key2, e);
    }
  }
  log.info("blockly device info has been updated");
}
function onAppTargetGenChange(newState) {
  if (newState.targetGen === "First") {
    setInertialList([]);
  } else if (newState.targetGen === "Second") {
    setInertialList([["BrainInertial", "BrainInertial", "brain_inertial"]]);
  }
}
function init() {
  log.debug("init", RobotConfigManager);
  RobotConfigManager.addDeviceChangeListener(onRobotConfigChange);
  _AppInfo__WEBPACK_IMPORTED_MODULE_3__["appState"].registerEventListener(onAppTargetGenChange);
}
//#endregion

/**
 * tell blockly what the current list of controller names is.
 * @param controllers the configured list of controller names
 */
function setControllerList(controllers) {
  controllerList = filterListInput(controllers);
}
function getControllerOptions() {
  return getListOptions(controllerList, "Controller");
}
function isValidController(controller) {
  return deviceInList(controllerList, controller);
}
function hasController() {
  return controllerList.length > 0;
}

/**
 * tell blockly what the current list of drivetrain names is.
 * @param drivetrains the configured list of drivetrain names
 */
function setDrivetrainList(drivetrains) {
  drivetrainList = filterListInput(drivetrains);
}
function getDrivetrainOptions() {
  return getListOptions(drivetrainList, "Drivetrain");
}
function isValidDrivetrain(drivetrain) {
  return deviceInList(drivetrainList, drivetrain);
}
function hasDrivetrain() {
  return drivetrainList.length > 0;
}

/**
 * tell blockly what the current list of motor group names is.
 * @param motorGroups the configured list of motor group names
 */
function setMotorGroupList(motorGroups) {
  motorGroupList = filterListInput(motorGroups);
}
function getMotorGroupOptions() {
  return getListOptions(motorGroupList, "MotorGroup1", hasMotor());
}
function isValidMotorGroup(motorGroup) {
  return deviceInList(motorGroupList, motorGroup);
}
function hasMotorGroup() {
  return motorGroupList.length > 0;
}

/**
 * tell blockly what the current list of motor names is.
 * @param motors the configured list of motor names
 */
function setMotorList(motors) {
  motorList = filterListInput(motors);
}
function getMotorOptions() {
  return getListOptions(motorList, "Motor1", hasMotorGroup());
}
function isValidMotor(motor) {
  return deviceInList(motorList, motor);
}
function hasMotor() {
  return motorList.length > 0;
}
function getVirtualMotorOptions() {
  var motorNamelist = [];
  var motorList = _RobotConfiguration_Manager_VirtualRobotConfigManager__WEBPACK_IMPORTED_MODULE_4__["VirtualRCManager"].getDevicesOfType("motor");
  motorList.forEach(function (motor) {
    motorNamelist.push([motor.name, motor.name, motor.name]);
  });
  return motorNamelist;
}

/**
 * tell blockly what the current list of pneumatics names is.
 * @param pneumatics the configured list of pneumatics names
 */
function setPneumaticList(pneumatics) {
  pneumaticList = filterListInput(pneumatics);
}
function getPneumaticOptions() {
  return getListOptions(pneumaticList, "Pneumatic1");
}
function isValidPneumatic(pneumatic) {
  return deviceInList(pneumaticList, pneumatic);
}
function hasPneumatic() {
  return pneumaticList.length > 0;
}

/**
 * tell blockly what the current list of bumper names is.
 * @param bumpers the configured list of bumper names
 */
function setBumperList(bumpers) {
  bumperList = filterListInput(bumpers);
}
function getBumperOptions() {
  return getListOptions(bumperList, "Bumper1");
}
function isValidBumper(bumper) {
  return deviceInList(bumperList, bumper);
}
function hasBumper() {
  return bumperList.length > 0;
}
function getVirtualBumperOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("IntakeBumper"), "IntakeBumper"]];
}

/**
 * tell blockly what the current list of gyro names is.
 * @param gyros the configured list of gyro names
 */
function setGyroList(gyros) {
  gyroList = filterListInput(gyros);
}
function getGyroOptions(considerBuiltIn) {
  return getListOptions(gyroList, "Gyro1", considerBuiltIn && hasInertial());
}
function isValidGyro(gyro) {
  return deviceInList(gyroList, gyro);
}
function hasGyro() {
  return gyroList.length > 0;
}

/**
 * tell blockly what the current list of inertial names are
 * @param inertials the configured list of inertial names
 */
function setInertialList(inertials) {
  inertialList = filterListInput(inertials);
}
function getInertialOptions() {
  return getListOptions(inertialList, "BrainInertial", hasGyro());
}
function isValidInertial(inertial) {
  return deviceInList(inertialList, inertial);
}
function hasInertial() {
  return inertialList.length > 0;
}

/**
 * tell blockly what the current list of color sensor names is.
 * @param colors the configured list of color sensor names
 */
function setColorList(colors) {
  colorList = filterListInput(colors);
}
function getColorOptions() {
  return getListOptions(colorList, "Color1");
}
function isValidColor(color) {
  return deviceInList(colorList, color);
}
function hasColorSensor() {
  return colorList.length > 0;
}
function getVirtualColorSensorOptions() {
  return [["Color", "Color"]];
}

/**
 * tell blockly what the current list of sonar names is.
 * @param sonars the configured list of sonar names
 */
function setSonarList(sonars) {
  sonarList = filterListInput(sonars);
}
function getSonarOptions() {
  return getListOptions(sonarList, "Sonar1");
}
function isValidSonar(sonar) {
  return deviceInList(sonarList, sonar);
}
function hasSonar() {
  return sonarList.length > 0;
}
function getVirtualSonarOptions() {
  return [["Distance", "Distance"]];
}

/**
 * tell blockly what the current list of touchLED sensor names is.
 * @param touchLEDs the configured list of touchLED sensor names
 */
function setTouchLEDList(touchLEDs) {
  touchLEDList = filterListInput(touchLEDs);
}
function getTouchLEDOptions() {
  return getListOptions(touchLEDList, "TouchLED1");
}
function isValidTouchLED(touchLED) {
  return deviceInList(touchLEDList, touchLED);
}
function hasTouchLED() {
  return touchLEDList.length > 0;
}

/**
 * tell blockly what the current list of vision sensor names is.
 * @param visionSensors the configured list of vision sensor names
 */
function setVisionSensorList(visionSensors) {
  visionSensorList = filterListInput(visionSensors);
}
function getVisionSensorOptions() {
  return getListOptions(visionSensorList, "Vision1");
}
function isValidVisionSensor(visionSensor) {
  return deviceInList(visionSensorList, visionSensor);
}
function hasVisionSensor() {
  return visionSensorList.length > 0;
}

/**
 * Informs Blockly about the current list of configured optical sensors
 * @param opticalSensors the configured list of optical sensors
 */
function setOpticalSensorList(opticalSensors) {
  opticalSensorList = filterListInput(opticalSensors);
}
function getOpticalSensorOptions() {
  return getListOptions(opticalSensorList, "Optical1");
}
function isValidOpticalSensor(opticalSensor) {
  return deviceInList(opticalSensorList, opticalSensor);
}
function hasOpticalSensor() {
  return opticalSensorList.length > 0;
}
function getVirtualOpticalSensorOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("FrontOptical"), "FrontOptical"]];
}

/***
 * Informs Blockly about the current list of configured distance devices
 * @param distance the configured list of distance sensors
 */
function setDistanceList(distance) {
  distanceList = filterListInput(distance);
}
function getDistanceOptions() {
  return getListOptions(distanceList, "Distance1");
}
function isValidDistance(distance) {
  return deviceInList(distanceList, distance);
}
function hasDistance() {
  return distanceList.length > 0;
}

// type ColorData = {primary: string, secondary: string, tertiary: string};
// type ColorDataList = { [key: string]: ColorData }
function getVirtualDistanceOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("FrontDistance"), "FrontDistance"]];
}

// function setBlockColorByCategory(block: any, category: string) {
//   const colorsList = (Blockly.Colours as any) as ColorDataList;
//   if (colorsList[category]) {
//     const colors = colorsList[category];
//     block.setColourFromRawValues_(colors.primary, colors.secondary,
//       colors.tertiary);
//   } else {
//     log.warn(`colors are not defined for category ${category}`);
//   }
// }

var motorDirectionNames = {};
var virtualMotorDirectionNames = {
  intakemotor: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_intake"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_outtake")
  }
};
function setMotorDirectionNames(dirNames) {
  log.debug("new direction names: ", dirNames);
  motorDirectionNames = dirNames;
  setTimeout(function () {
    updateDirectionNames();
  }, 100);
}
var setMotorDirectionNamesIQ = setMotorDirectionNames;
function getMotorDirectionOptions(motorName) {
  // if we don't have a name, we should just get the first motor in the list as
  // it is probably a new block
  if (!motorName) {
    var motorOptions = _targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"] ? getVirtualMotorOptions() : [].concat(_toConsumableArray(getMotorGroupOptions()), _toConsumableArray(getMotorOptions()));
    if (motorOptions && motorOptions[0]) {
      motorName = motorOptions[0][1];
    }
  }
  if (motorDirectionNames && motorDirectionNames[motorName]) {
    var dirNames = motorDirectionNames[motorName];
    return [[dirNames.fwd, "fwd"], [dirNames.rev, "rev"]];
  } else if (_targetPlatform__WEBPACK_IMPORTED_MODULE_5__["targetIsPlaygrounds"] && virtualMotorDirectionNames && virtualMotorDirectionNames[motorName]) {
    var _dirNames = virtualMotorDirectionNames[motorName];
    return [[_dirNames.fwd, "fwd"], [_dirNames.rev, "rev"]];
  } else {
    return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_forward"), "fwd"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_reverse"), "rev"]];
  }
}
function updateDirectionNames() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var _iterator2 = _createForOfIteratorHelper(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Workspace.getAll()),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var workspace = _step2.value;
      var allBlocks = workspace.getAllBlocks(false);
      allBlocks.forEach(function (block) {
        if (block.type === "iq_motion_spin_for" || block.type === "iq_motion_spin") {
          var motorName = block.getFieldValue("MOTOR");
          var options = getMotorDirectionOptions(motorName);
          var directionField = block.getField("DIRECTION");
          var directionValue = directionField.getValue();
          var expected = options[directionValue === "fwd" ? 0 : 1][0];
          var actual = directionField.getText();
          if (expected !== actual) {
            log.debug("expected (".concat(expected, ") does not match actual (").concat(actual, ") for "), block);
            directionField.setValue(directionValue === "fwd" ? "rev" : "fwd");
            directionField.setValue(directionValue);
          }
        }
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}

//#region pneumatic names
/** simple structure to hold the names of the 2 pneumatic cylinders */

/** list of all the pneumatic devices and the cylinder names */
var PneumaticCylinderNames = {};

/**
 * used to set the names of the cylinders for the different pneumatic devices.
 * This will also trigger an update of the workspace to make sure the names
 * update in the blocks. This is only useful for blocks project as we don't
 * support custom names for text.
 * @param cylinderNames the names of the cylinders for all the configured pneumatic devices
 */
function setPneumaticCylinderNames(cylinderNames) {
  log.debug("new Pneumatic Cylinder names: ", cylinderNames);
  PneumaticCylinderNames = cylinderNames;
  setTimeout(function () {
    updatePneumaticCylinderNames();
  }, 100);
}

/**
 * returns the blockly options array for the specified pneumatic device.
 * @param pneumaticName the name of the pneumatic device to get the cylinders for
 * @returns the array of the cylinder options. this is already formatted for use by blockly dropdown
 */
function getPneumaticCylinderOptions(pneumaticName) {
  if (PneumaticCylinderNames && PneumaticCylinderNames[pneumaticName]) {
    var dirNames = PneumaticCylinderNames[pneumaticName];
    return [[dirNames.cylinder1, "cylinder1"], [dirNames.cylinder2, "cylinder2"]];
  } else {
    return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_pneumatic_cylinder1"), "cylinder1"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_pneumatic_cylinder2"), "cylinder2"]];
  }
}

/**
 * checks the workspace for any pneumatic cylinder blocks and makes sure that
 * they have the correct cylinder names.
 */
function updatePneumaticCylinderNames() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var _iterator3 = _createForOfIteratorHelper(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Workspace.getAll()),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var workspace = _step3.value;
      var allBlocks = workspace.getAllBlocks(false);
      allBlocks.forEach(function (block) {
        if (block.type === "iq_motion_pneumatics_cylinder") {
          var pneumaticName = block.getFieldValue("PNEUMATIC");
          var options = getPneumaticCylinderOptions(pneumaticName);
          var cylinderField = block.getField("CYLINDER");
          var cylinderValue = cylinderField.getValue();
          var expected = options[cylinderValue === "cylinder1" ? 0 : 1][0];
          var actual = cylinderField.getText();
          if (expected !== actual) {
            log.debug("expected (".concat(expected, ") does not match actual (").concat(actual, ") for "), block);
            cylinderField.setValue("");
            cylinderField.setValue(cylinderValue);
          }
        }
      });
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}
//#endregion pneumatic names

var visionSignatureNames = {};
function setVisionSignatureNames(sigNames) {
  log.debug("new signature names: ", sigNames);
  visionSignatureNames = sigNames;
}
function getVisionSignatureOptions(visionName) {
  if (!visionName) {
    visionName = getVisionSensorOptions()[0][1];
  }
  if (visionSignatureNames && visionSignatureNames[visionName]) {
    var names = visionSignatureNames[visionName];
    var out = [];
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (name) {
        out.push([name, name]);
      }
    }
    if (out.length > 0) {
      return out;
    }
  }
  return [["SELECT_A_SIG", "SELECT_A_SIG"]];
}
function updateDeviceNames(oldDeviceName, newDevName, deviceClass) {
  if (oldDeviceName === newDevName) {
    log.debug("skipping the device rename logic as the names are the same");
    return;
  }
  var deviceFieldName = getDeviceFieldNameByClass(deviceClass);
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var blocksWorkspace = BlocklyController.getCurrentMainController().blocklyWorkspace;
  var toolboxWorkspace = blocksWorkspace.getToolbox().getFlyout().getWorkspace();
  var workspaceArray = [blocksWorkspace, toolboxWorkspace];
  for (var _i3 = 0, _workspaceArray = workspaceArray; _i3 < _workspaceArray.length; _i3++) {
    var workspace = _workspaceArray[_i3];
    var allBlocks = workspace.getAllBlocks(false);
    allBlocks.forEach(function (block) {
      var field = block.getField(deviceFieldName);
      var isHat = block.isHatBlock();
      if (!!field && !isHat) {
        var fieldval = field.getValue();
        if (fieldval === oldDeviceName) {
          var options = field.getOptions(false);
          var optionValues = options.map(function (option) {
            return option[1];
          });
          if (!optionValues.includes(newDevName)) {
            log.warn("the block does not have the device option", newDevName, options);
          }
          block.setFieldValue(newDevName, deviceFieldName);
        }
      }
    });
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}
function disableBlocksWithDeletedDevices(name, deviceClass) {
  var deviceFieldName = getDeviceFieldNameByClass(deviceClass);
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var blocksWorkspace = BlocklyController.getCurrentMainController().blocklyWorkspace;
  var toolboxWorkspace = blocksWorkspace.getToolbox().getFlyout().getWorkspace();
  var workspaceArray = [blocksWorkspace, toolboxWorkspace];
  for (var _i4 = 0, _workspaceArray2 = workspaceArray; _i4 < _workspaceArray2.length; _i4++) {
    var workspace = _workspaceArray2[_i4];
    var allBlocks = workspace.getAllBlocks(false);
    allBlocks.forEach(function (block) {
      var field = block.getField(deviceFieldName);
      var isHat = block.isHatBlock();
      if (!!field && !isHat) {
        var fieldval = field.getValue();
        if (fieldval === name && block.workspace === blocksWorkspace) {
          block.setEnabled(false);
        }
      }
    });
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}
function getDeviceFieldNameByClass(deviceClass) {
  switch (deviceClass.toLowerCase()) {
    case "motor":
    case "motor_group":
      return "MOTOR";
    case "gyro":
    case "inertial":
    case "vision":
    case "controller":
    case "optical":
    case "distance":
    case "colorsensor":
    case "sonar":
    case "bumper":
    case "pneumatic":
    case "touchled":
      return deviceClass.toUpperCase();
    default:
      console.log("Cannot find field name for unknown class: ", deviceClass);
      return deviceClass.toUpperCase();
  }
}


/***/ })

});
//# sourceMappingURL=bf748627fa37371f7e0e.7.bundle.js.map