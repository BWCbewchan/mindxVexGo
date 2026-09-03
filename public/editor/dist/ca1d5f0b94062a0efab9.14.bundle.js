this["webpackChunkwebapp"]([14],{

/***/ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Dropdowns.ts ***!
  \***********************************************/
/*! exports provided: controllerList, motorList, visonSensorList, inertialSensorList, victorList, motor29List, servoList, limitList, encoderList, lineTrackerList, lightSensorList, potentiometerList, accelerometerList, rangeFinderList, bumperSwitchList, limitSwitchList, eventsDropdown, ledList, digitalOutList, digitalInList, gyroList, gyroAndInertialList, printTargetDropdown, penTargetDropdown, spinDirection, turnDirection, rotationUnits, distanceUnits, velocityUnits, angularVelocityUnits, torqueUnits, positionAxisUnits, principalAxisUnits, brakeMode, colorNames, controllerButtons, controllerAxies, controllerIsEnabled, magnetActions, magnetList, magnetDurations, opticalList, opticalOptions, onOffOptions, opticalColors, opticalGesture, opticalModes, rotationList, rotationVelocityUnits, distanceSensorList, distanceObjectSize, armList, gpsSensorList, gpsSensorPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerList", function() { return controllerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motorList", function() { return motorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visonSensorList", function() { return visonSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inertialSensorList", function() { return inertialSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "victorList", function() { return victorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motor29List", function() { return motor29List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "servoList", function() { return servoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitList", function() { return limitList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encoderList", function() { return encoderList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineTrackerList", function() { return lineTrackerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightSensorList", function() { return lightSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "potentiometerList", function() { return potentiometerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "accelerometerList", function() { return accelerometerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeFinderList", function() { return rangeFinderList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bumperSwitchList", function() { return bumperSwitchList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitSwitchList", function() { return limitSwitchList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsDropdown", function() { return eventsDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ledList", function() { return ledList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "digitalOutList", function() { return digitalOutList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "digitalInList", function() { return digitalInList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gyroList", function() { return gyroList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gyroAndInertialList", function() { return gyroAndInertialList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printTargetDropdown", function() { return printTargetDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "penTargetDropdown", function() { return penTargetDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spinDirection", function() { return spinDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turnDirection", function() { return turnDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationUnits", function() { return rotationUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceUnits", function() { return distanceUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocityUnits", function() { return velocityUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angularVelocityUnits", function() { return angularVelocityUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "torqueUnits", function() { return torqueUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positionAxisUnits", function() { return positionAxisUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "principalAxisUnits", function() { return principalAxisUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brakeMode", function() { return brakeMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorNames", function() { return colorNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerButtons", function() { return controllerButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerAxies", function() { return controllerAxies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerIsEnabled", function() { return controllerIsEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnetActions", function() { return magnetActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnetList", function() { return magnetList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnetDurations", function() { return magnetDurations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalList", function() { return opticalList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalOptions", function() { return opticalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onOffOptions", function() { return onOffOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalColors", function() { return opticalColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalGesture", function() { return opticalGesture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalModes", function() { return opticalModes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationList", function() { return rotationList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationVelocityUnits", function() { return rotationVelocityUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceSensorList", function() { return distanceSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceObjectSize", function() { return distanceObjectSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "armList", function() { return armList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gpsSensorList", function() { return gpsSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gpsSensorPosition", function() { return gpsSensorPosition; });
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _targetPlatform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../targetPlatform */ "./src/targetPlatform.ts");
/* harmony import */ var _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../V5_ConfigData */ "./src/Blockly/V5_ConfigData.ts");
/* harmony import */ var _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../PG_ConfigData */ "./src/Blockly/PG_ConfigData.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// we need blockly since we are extending the definitions...

// globals




// locals


function controllerList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getControllerOptions"]
  };
}
function motorList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("motor");
    }
    return [].concat(_toConsumableArray(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getMotorGroupOptions"]()), _toConsumableArray(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getMotorOptions"]()));
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function visonSensorList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getVisionSensorOptions"]
  };
}
function inertialSensorList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getInertialSensorOptions"]
  };
}
function victorList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getVictorOptions"]
  };
}
function motor29List(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getMotor29Options"]
  };
}
function servoList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getServoOptions"]
  };
}
function limitList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getLimitSwitchOptions"]
  };
}
function encoderList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getEncoderOptions"]
  };
}
function lineTrackerList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("line");
    }
    return _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getLineTrackerOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function lightSensorList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getLightSensorOptions"]
  };
}
function potentiometerList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getPotentiometerOptions"]
  };
}
function accelerometerList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getAccelerometerOptions"]
  };
}
function rangeFinderList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getRangeFinderOptions"]
  };
}
function bumperSwitchList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("bumper");
    }
    return _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getBumperSwitchOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function limitSwitchList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getLimitSwitchOptions"]
  };
}
function ledList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getLEDOptions"]
  };
}
function digitalOutList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getDigitalOutOptions"]
  };
}
function digitalInList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getDigitalInOptions"]
  };
}
function gyroList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getGyroOptions"]
  };
}
function gyroAndInertialList(fieldName) {
  // combines gyro list and inertial list
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getGyroAndInertialOptions"]
  };
}
function spinDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_motor_direction_forward"), "fwd"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_motor_direction_reverse"), "rev"]]
  };
}
function turnDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_turn_direction_left"), "left"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_turn_direction_right"), "right"]]
  };
}
function rotationUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_rotation_units_degrees"), "deg"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_rotation_units_turns"), "rev"]]
  };
}
function distanceUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["mm", "mm"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_distance_units_inches"), "in"]]
  };
}
function velocityUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: !_targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"] ? [["%", "pct"], ["rpm", "rpm"]] : [["%", "pct"]]
  };
}
function angularVelocityUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["dps", "dps"], ["rpm", "rpm"]]
  };
}
function rotationVelocityUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["rpm", "rpm"], ["dps", "dps"]]
  };
}
function torqueUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["Nm ", "Nm"], ["InLb", "InLb"]]
  };
}
function positionAxisUnits(fieldName) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var axisOptions = [["X", "X"], ["Y", "Y"]];
  if (dimension === 3) axisOptions.push(["Z", "Z"]);
  return {
    type: "field_dropdown",
    name: fieldName,
    options: axisOptions
  };
}
function principalAxisUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_roll"), "roll"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_pitch"), "pitch"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_yaw"), "yaw"]]
  };
}
function brakeMode(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_brake_mode_brake"), "brake"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_brake_mode_coast"), "coast"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_brake_mode_hold"), "hold"]]
  };
}
function colorNames(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_black"), "black"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_white"), "white"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_yellow"), "yellow"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_orange"), "orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_purple"), "purple"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_cyan"), "cyan"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_transparent"), "transparent"]]
  };
}
function controllerButtons(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_controller_up"), "ButtonUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_controller_down"), "ButtonDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_controller_left"), "ButtonLeft"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_controller_right"), "ButtonRight"], ["X", "ButtonX"], ["B", "ButtonB"], ["Y", "ButtonY"], ["A", "ButtonA"], ["L1", "ButtonL1"], ["L2", "ButtonL2"], ["R1", "ButtonR1"], ["R2", "ButtonR2"]]
  };
}
function controllerAxies(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["1", "Axis1"], ["2", "Axis2"], ["3", "Axis3"], ["4", "Axis4"]]
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

function printTargetDropdown(fieldName) {
  var withConsoleOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode !== "Virtual") {
      var out = [["Brain", "Brain", "brain"]];
      if (withConsoleOption) {
        out.push(["Console", "Console", "console"]);
      }
      if (_V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["hasController"]()) {
        out.push.apply(out, _toConsumableArray(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getControllerOptions"]()));
      }
      return out;
    } else {
      return [["Brain", "Brain", "brain"]];
    }
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function penTargetDropdown(fieldName) {
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
function controllerIsEnabled(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_disable"), "false"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_enable"), "true"]]
  };
}
function magnetList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getElectromagnetOptions"]
  };
}
function magnetActions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:go_magnet_boost"), "boost"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:go_magnet_drop"), "drop"]]
  };
}
function magnetDurations(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_magnet_short"), "short"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_magnet_medium"), "medium"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_magnet_long"), "large"]]
  };
}
function opticalList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("optical");
    }
    return _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getOpticalSensorOptions"]();
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
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_optical_detect"), "detects"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_optical_loses"), "loses"]]
  };
}
function rotationList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("rotation");
    }
    return _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getRotationOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function distanceSensorList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("distance");
    }
    return _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getDistanceOptions"]();
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
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_distance_small"), "small"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_magnet_medium"), "medium"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_magnet_large"), "large"]]
  };
}
function onOffOptions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_on"), "on"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_off"), "off"]]
  };
}
function opticalColors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_yellow"), "yellow"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_orange"), "orange"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_purple"), "purple"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_cyan"), "cyan"]]
  };
}
function opticalGesture(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_direction_up"), "up"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_direction_down"), "down"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_turn_direction_left"), "left"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_turn_direction_right"), "right"]]
  };
}
function opticalModes(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_optical_color"), "color"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_optical_gesture"), "gesture"]]
  };
}
function armList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getRoboticArmOptions"]
  };
}
function gpsSensorList(fieldName) {
  var options = function options() {
    if (_AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_2__["targetIsPlaygrounds"]) {
      return _PG_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getListOptionsForType"]("location");
    }
    return _V5_ConfigData__WEBPACK_IMPORTED_MODULE_3__["getGPSOptions"]();
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function gpsSensorPosition(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_gps_position_x"), "X"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_gps_position_y"), "Y"]]
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Event.ts":
/*!*******************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Event.ts ***!
  \*******************************************/
/*! exports provided: createEventsBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventsBlocks", function() { return createEventsBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createEventsBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_started"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["event_started"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_autonomous"] = {
    /**
     * Block to define autonomous event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_autonomous"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_driver"] = {
    /**
     * Block to define driver control event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_driver"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_bumper"] = {
    /**
     * Block to define bumper pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_bumper"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["bumperSwitchList"]("BUMPER"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_limit"] = {
    /**
     * Block to define limit switch pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_limit"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["limitList"]("LIMIT"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_controller_button"] = {
    /**
     * Block to define controller button pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_controller_button"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerList"]("CONTROLLER"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerButtons"]("BUTTON"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_controller_axis"] = {
    /**
     * Block to define controller axis value change event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_controller_axis"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerList"]("CONTROLLER"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["controllerAxies"]("AXIS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_brain_screen"] = {
    /**
     * Block to define brain button pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_brain_screen"),
        args0: [{
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_timer"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_timer"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_broadcasted"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_broadcasted"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_broadcast"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_broadcast_and_wait"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast_and_wait"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_event_optical_detect_object"] = {
    /**
     * Block to define optical detects/loses an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_event_optical_detect_object"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalList"]("OPTICAL"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalOptions"]("OPTIONS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_event_optical_detect_gesture"] = {
    /**
     * Block to define optical detects a gesture.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_event_optical_detect_gesture"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalList"]("OPTICAL"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["opticalGesture"]("GESTURE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_events_when_gps_heading_changed"] = {
    /**
     * Block to define gps heading changed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_events_when_gps_heading_changed"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_2__["gpsSensorList"]("GPS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Motion.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Motion.ts ***!
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
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");
/* harmony import */ var _V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../V5_ConfigData */ "./src/Blockly/V5_ConfigData.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("V5 Motion blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals


function createMotionBlocks() {
  //#region "Motion motor"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin"] = {
    /**
     * Block to spin motor in specified direction.
     * @this Blockly.Block
     */
    init: function init() {
      var _this = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_spin"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
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
          if (!!field) {
            var fieldValue = field.getValue();
            // we need to change the value so we get the list of values and select the
            // one that is not currently selected to change to before we change back
            var options = field.getOptions(false);
            var optionValue = options[0][1] === fieldValue ? options[1][1] : options[0][1];
            field.setValue(optionValue);
            field.setValue(fieldValue);
            _this2.sourceBlock_.getField("DIRECTION").forceRerender();
          }
        }, 10);
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      var _this3 = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_spin_for"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this3.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
          }
        }, {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["rotationUnits"]("UNITS"), {
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
          if (!!field) {
            var fieldValue = field.getValue();
            // we need to change the value so we get the list of values and select the
            // one that is not currently selected to change to before we change back
            var options = field.getOptions(false);
            var optionValue = options[0][1] === fieldValue ? options[1][1] : options[0][1];
            field.setValue(optionValue);
            field.setValue(fieldValue);
            _this4.sourceBlock_.getField("DIRECTION").forceRerender();
          }
        }, 10);
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin_to_position"] = {
    /**
     * Block to spin motor to specified absolute position with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_spin_to_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["rotationUnits"]("UNITS"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin_at_voltage"] = {
    /**
     * Block to spin motor at the specified voltage.
     * @this Blockly.Block
     */
    init: function init() {
      var _this5 = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_spin_at_voltage"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this5.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
          }
        }, {
          type: "input_value",
          name: "VOLTAGE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });

      // listen for changes to the selected motor to update the displayed direction name
      this.getField("MOTOR").setValidator(function (value) {
        var _this6 = this;
        var oldMotorValue = this.sourceBlock_.getFieldValue("MOTOR");
        if (value === oldMotorValue) {
          // the value did not actually change so there is no need to update anything...
          return value;
        }
        log.info("spin at voltage motor value changed");
        setTimeout(function () {
          var field = _this6.sourceBlock_.getField("DIRECTION");
          if (!!field) {
            var fieldValue = field.getValue();
            // we need to change the value so we get the list of values and select the
            // one that is not currently selected to change to before we change back
            var options = field.getOptions(false);
            var optionValue = options[0][1] === fieldValue ? options[1][1] : options[0][1];
            field.setValue(optionValue);
            field.setValue(fieldValue);
            _this6.sourceBlock_.getField("DIRECTION").forceRerender();
          }
        }, 10);
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_stop_motor"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_stop_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_motor_position"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_set_motor_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "DEGS",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["rotationUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_motor_velocity"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_set_motor_velocity"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_motor_stopping"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_set_motor_stopping"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["brakeMode"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_motor_torque"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_set_motor_torque"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_motor_timeout"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_set_motor_timeout"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motorList"]("MOTOR"), {
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
  //#endregion

  //#region "Motion victor"
  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin_victor"] = {
    /**
     * Spin victor motor.
     * @this Blockly.Block
     */
    init: function init() {
      var _this7 = this;
      this.jsonInit({
        message0: "spin %1 %2",
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["victorList"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this7.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
          }
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });

      // listen for changes to the selected motor to update the displayed direction name
      this.getField("MOTOR").setValidator(function (value) {
        var _this8 = this;
        var oldMotorValue = this.sourceBlock_.getFieldValue("MOTOR");
        if (value === oldMotorValue) {
          // the value did not actually change so there is no need to update anything...
          return value;
        }
        log.info("spin victor motor value changed");
        setTimeout(function () {
          var field = _this8.sourceBlock_.getField("DIRECTION");
          if (!!field) {
            var v = field.getValue();
            field.setValue("");
            field.setValue(v);
            _this8.sourceBlock_.getField("DIRECTION").forceRerender();
          }
        }, 10);
        return value;
      });
    }
  };

  // TODO: not used?
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_victor_motor_velocity"] = {
    /**
     * Set victor motor velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "set %1 velocity to %2 %%",
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["victorList"]("MOTOR"), {
          type: "input_value",
          name: "VELOCITY"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  //#endregion

  //#region "Motion motor controller"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin_motor_controller"] = {
    /**
     * Spin motor controller.
     * @this Blockly.Block
     */
    init: function init() {
      var _this9 = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_spin_motor_controller"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motor29List"]("MOTOR"), {
          type: "field_dropdown",
          name: "DIRECTION",
          options: function options() {
            var motorname = _this9.getFieldValue("MOTOR");
            log.debug("motor name for direction field: ", motorname);
            return Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getMotorDirectionOptions"])(motorname);
          }
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });

      // listen for changes to the selected motor to update the displayed direction name
      this.getField("MOTOR").setValidator(function (value) {
        var _this10 = this;
        var oldMotorValue = this.sourceBlock_.getFieldValue("MOTOR");
        if (value === oldMotorValue) {
          // the value did not actually change so there is no need to update anything...
          return value;
        }
        log.info("spin controller motor value changed");
        setTimeout(function () {
          var field = _this10.sourceBlock_.getField("DIRECTION");
          if (!!field) {
            var v = field.getValue();
            field.setValue("");
            field.setValue(v);
            _this10.sourceBlock_.getField("DIRECTION").forceRerender();
          }
        }, 10);
        return value;
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_set_motor_controller_velocity"] = {
    /**
     * Set motor controller velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_set_motor_controller_velocity"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motor29List"]("MOTOR"), {
          type: "input_value",
          name: "VELOCITY"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_stop_motor_controller"] = {
    /**
     * Stop motor controller.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_stop_motor_controller"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["motor29List"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  //#endregion

  //#region "Motion servo"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_spin_servo"] = {
    /**
     * Spin servo.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_spin_servo"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["servoList"]("SERVO"), {
          type: "input_value",
          name: "DEGS",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.motion,
        style: "motion_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  //#endregion
}



/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Sensing.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Sensing.ts ***!
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
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");
/* harmony import */ var _V5_ConfigData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../V5_ConfigData */ "./src/Blockly/V5_ConfigData.ts");
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
    var visionsPython = Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSensorOptions"])().map(function (opt) {
      return opt[2];
    });
    return visionsPython.map(function (vision) {
      return {
        name: "vexcode_".concat(vision.toLowerCase(), "_object_index"),
        initValue: "0"
      };
    });
  } else {
    var visionsCpp = Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSensorOptions"])().map(function (opt) {
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
    var visionsPython = Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSensorOptions"])().map(function (opt) {
      return opt[2];
    });
    return visionsPython.map(function (vision) {
      return "vexcode_".concat(vision.toLowerCase(), "_objects");
    });
  } else {
    // const visionsCpp = getVisionSensorOptions().map((opt) => opt[0]);
    return [];
  }
}
function createSensingBlocks() {
  //#region "Sensing Brain"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_reset_timer"] = {
    /**
     * Block to reset brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_reset_timer"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_timer_value"] = {
    /**
     * Block to get brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_timer_value"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_cursor_column"] = {
    /**
     * Block to get brain screen column.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_cursor_column"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_cursor_row"] = {
    /**
     * Block to get brain screen row.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_cursor_row"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["printTargetDropdown"]("TARGET")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_screen_pressed"] = {
    /**
     * Block to check if Brain screen has been pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_screen_pressed"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_screen_position"] = {
    /**
     * Block to check the Brain's x and y positions.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_screen_position"),
        args0: [{
          type: "field_dropdown",
          name: "AXIS",
          options: [["x", "x"], ["y", "y"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_battery_voltage"] = {
    /**
     * Block to get battery voltage (volts).
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_battery_voltage"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_battery_current"] = {
    /**
     * Block to get battery current (amps).
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_battery_current"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_battery_level"] = {
    /**
     * Block to get battery level.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_battery_level"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Controller"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_pressing_controller"] = {
    /**
     * Block to get controller button value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_pressing_controller"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerList"]("CONTROLLER"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerButtons"]("BUTTON")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_position_of_controller"] = {
    /**
     * Block to get controller axis value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_position_of_controller"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerList"]("CONTROLLER"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerAxies"]("AXIS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_controller_is_enabled"] = {
    /**
     * Block to enable or disable the generated controller code
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "Controller %1",
        //TODO: Set up for i18n
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerIsEnabled"]("isEnabled")],
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
        // return ["RemoteControlCodeEnabled"];
        return [];
      }
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_controller_cursor_column"] = {
    /**
     * Block to get controller column value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_controller_cursor_column"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerList"]("CONTROLLER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_controller_cursor_row"] = {
    /**
     * Block to get controller row value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_controller_cursor_row"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["controllerList"]("CONTROLLER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Motor"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_motor_is_done"] = {
    /**
     * Block to check if motor is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_motor_is_done"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_motor_is_spinning"] = {
    /**
     * Block to check if motor is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_motor_is_spinning"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_position_of_motor"] = {
    /**
     * Block to get motor position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_position_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_velocity_of_motor"] = {
    /**
     * Block to get motor velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_velocity_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_current_of_motor"] = {
    /**
     * Block to get motor current.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_current_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_power_of_motor"] = {
    /**
     * Block to get motor power.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_power_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_torque_of_motor"] = {
    /**
     * Block to get motor torque.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_torque_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["torqueUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_efficiency_of_motor"] = {
    /**
     * Block to get motor efficiency.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_efficiency_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_temperature_of_motor"] = {
    /**
     * Block to get motor temperature.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_temperature_of_motor"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["motorList"]("MOTOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };

  //#endregion

  //#region "Sensing Drivetrain"

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_calibrate_drivetrain"] = {
    /**
     * Block to calibrate drivetrain heading sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_calibrate_drivetrain"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_is_done"] = {
    /**
     * Block to check if drivetrain is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_is_done"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_is_moving"] = {
    /**
     * Block to check if drivetrain is moving.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_is_moving"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_heading"] = {
    /**
     * Block to drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_heading"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_rotation"] = {
    /**
     * Block to drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_rotation"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_velocity"] = {
    /**
     * Block to drivetrain velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_velocity"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_current"] = {
    /**
     * Block to drivetrain current.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_current"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_power"] = {
    /**
     * Block to get drive power.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_power"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_torque"] = {
    /**
     * Block to get motor torque.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_torque"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["torqueUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_efficiency"] = {
    /**
     * Block to get motor velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_efficiency"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_drive_temperature"] = {
    /**
     * Block to get motor temperature.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_drive_temperature"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Switches"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_pressing_bumper"] = {
    /**
     * Block to check if bumper is being pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_pressing_bumper"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["bumperSwitchList"]("BUMPER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_pressing_limit"] = {
    /**
     * Block to get motor limit.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_pressing_limit"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["limitList"]("LIMIT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  //#endregion

  //#region "Sensing Gyro"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_calibrate_gyro"] = {
    /**
     * Block to calibrate gyro.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_calibrate_gyro"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroAndInertialList"]("GYRO")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_set_gyro_heading"] = {
    /**
     * Block to set gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_set_gyro_heading"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroAndInertialList"]("GYRO"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_set_gyro_rotation"] = {
    /**
     * Block to set gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_set_gyro_rotation"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroAndInertialList"]("GYRO"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_heading_of_gyro"] = {
    /**
     * Block to get gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_heading_of_gyro"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroAndInertialList"]("GYRO")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_rotation_of_gyro"] = {
    /**
     * Block to get gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_rotation_of_gyro"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gyroAndInertialList"]("GYRO")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Inertial Sensor"

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_inertial_acceleration"] = {
    /**
     * Block to get inertial sensor's acceleration in specified axis.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_inertial_acceleration"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["inertialSensorList"]("INERTIAL"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_inertial_gyrorate"] = {
    /**
     * Block to get inertial sensor's acceleration in specified axis.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_inertial_gyrorate"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["inertialSensorList"]("INERTIAL"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_inertial_orientation"] = {
    /**
     * Block to get inertial sensor's acceleration in specified axis.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_inertial_orientation"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["inertialSensorList"]("INERTIAL"), {
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

  //#endregion

  //#region "Sensing Encoder"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_set_shaft_encoder_position"] = {
    /**
     * Block to set shaft encoder's position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_set_shaft_encoder_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["encoderList"]("ENCODER"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_position_of_shaft_encoder"] = {
    /**
     * Block to return position of the shaft encoder.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_position_of_shaft_encoder"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["encoderList"]("ENCODER"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_velocity_of_shaft_encoder"] = {
    /**
     * Block to return the velocity of the shaft encoder.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_velocity_of_shaft_encoder"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["encoderList"]("ENCODER"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["angularVelocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Line Tracker"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_reflectivity_of"] = {
    /**
     * Block to display the reflectivity of the line tracker
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_reflectivity_of"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["lineTrackerList"]("LINETRACKER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Light Tracker"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_brightness_of"] = {
    /**
     * Block to display the brightness of the light sensor
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_brightness_of"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["lightSensorList"]("LIGHTSENSOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Potentiometer"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_angle_of"] = {
    /**
     * Block to return the angle of the potentiometer.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_angle_of"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["potentiometerList"]("POTENTIOMETER"), {
          type: "field_dropdown",
          name: "UNITS",
          options: [["%", "pct"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_rotation_units_degrees"), "deg"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Accelerometer"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_acceleration_of"] = {
    /**
     * Block to display the current acceleration
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_acceleration_of"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["accelerometerList"]("ACCELERATION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Range"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_object_in_front"] = {
    /**
     * Block to check if object is in front of the sonar sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_object_in_front"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rangeFinderList"]("SONAR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_distance_from"] = {
    /**
     * Block to get gyro value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_distance_from"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rangeFinderList"]("SONAR"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion

  //#region "Sensing Vision"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_snapshot"] = {
    /**
     * Block to take a vision snapshot of the signature
     * @this Blockly.Block
     */
    init: function init() {
      var _this = this;
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_snapshot"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION"), {
          type: "field_dropdown",
          name: "SIGNATURE",
          options: function options() {
            var visionname = _this.getFieldValue("VISION");
            return Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_5__["getVisionSignatureOptions"])(visionname);
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_set_vision_object_index"] = {
    /**
     * Block to set the vision object index
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_set_vision_object_index"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_object_count"] = {
    /**
     * Block to display the count of objects in the vision sensor
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_object_count"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getVisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_object_exists"] = {
    /**
     * Block to check if Brain screen has been pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_object_exists"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getVisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_vision_object"] = {
    /**
     * Block to display the count of objects in the vision sensor
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_vision_object"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["visonSensorList"]("VISION"), {
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

  //#region "Sensing Optical"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_set_light"] = {
    /**
     * Block to set optical light on/off.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_set_light"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["onOffOptions"]("OPTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_set_light_power"] = {
    /**
     * Block to set optical light power.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_set_light_power"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_set_mode"] = {
    /**
     * Block to set optical gesture mode
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_set_mode"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalModes"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_found_object"] = {
    /**
     * Block to check if optical found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_found_object"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_detect"] = {
    /**
     * Block to check if optical found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_detect"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalColors"]("COLORS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_brightness"] = {
    /**
     * Block to get optical brightness.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_brightness"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_brightness_virtual"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_brightness"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_hue"] = {
    /**
     * Block to get optical hue.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_hue"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_optical_gesture_detected"] = {
    /**
     * Block to report if a gesture had been detected
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_optical_gesture_detected"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalList"]("OPTICAL"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["opticalGesture"]("GESTURE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  //#endregion "Sensing Optical"

  //#region "Sensing Rotation"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_rotation_set_position"] = {
    /**
     * Block to set rotation position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_rotation_set_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationList"]("ROTATION"), {
          type: "input_value",
          name: "POSITION",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_rotation_angle"] = {
    /**
     * Block to get rotation angle.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_rotation_angle"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationList"]("ROTATION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_rotation_position"] = {
    /**
     * Block to get rotation position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_rotation_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationList"]("ROTATION"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_rotation_velocity"] = {
    /**
     * Block to get rotation velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_rotation_velocity"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationList"]("ROTATION"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["rotationVelocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion "Sensing Rotation"

  //#region "Sensing Arm"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_arm_get_position"] = {
    /**
     * Block to get the arm position x/y/z.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_arm_get_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["armList"]("ARM"), {
          type: "field_dropdown",
          name: "AXIS",
          options: [["x", "xaxis"], ["y", "yaxis"], ["z", "zaxis"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_arm_set_position"] = {
    /**
     * Block to set arm's position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_arm_set_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["armList"]("ARM"), {
          type: "input_value",
          name: "X",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y",
          check: "Number"
        }, {
          type: "input_value",
          name: "Z",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_arm_get_joint_value"] = {
    /**
     * Block to get the arm joint value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_arm_get_joint_value"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["armList"]("ARM"), {
          type: "field_dropdown",
          name: "JOINT",
          options: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };

  //#endregion

  //#region "Sensing Distance"

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_distance_object_distance"] = {
    /**
     * Block to get object distance.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_distance_object_distance"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_distance_object_velocity"] = {
    /**
     * Block to get object velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_distance_object_velocity"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_distance_object_size"] = {
    /**
     * Block to check if object size is small/medium/large.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_distance_object_size"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceObjectSize"]("SIZE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_distance_found_object"] = {
    /**
     * Block to check if distance sensor found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_distance_found_object"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceSensorList"]("DISTANCE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"] : ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  //#endregion "Sensing Distance"

  //#region "Sensing Digital IO"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_digital_in_signal"] = {
    /**
     * Block to get digital in signal.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_digital_in_signal"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["digitalInList"]("DIGITALIN")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_set_digital_out"] = {
    /**
     * Block to set digital out signal.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_set_digital_out"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["digitalOutList"]("DIGITALOUT"), {
          type: "field_dropdown",
          name: "STATE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_digital_out_low"), "low"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_digital_out_high"), "high"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  //#endregion "Sensing Digital IO"

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_position"] = {
    /**
     * Block to get GPS position [X/Y] in [mm/inches]
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_position"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorPosition"]("POSITION"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_heading"] = {
    /**
     * Block to get GPS heading in degrees
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_heading"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        checkboxInFlyout: _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" || _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"],
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };

  //#region "Sensing GPS"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_calibrate"] = {
    /**
     * Block to calibrate GPS sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_calibrate"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_set_location"] = {
    /**
     * Block to set starting location of GPS sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_set_location"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS"), {
          type: "input_value",
          name: "X",
          check: "Number"
        }, {
          type: "input_value",
          name: "Y",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["distanceUnits"]("UNITS"), {
          type: "input_value",
          name: "DEGREES",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_acceleration"] = {
    /**
     * Block to report GPS acceleration.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_acceleration"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["positionAxisUnits"]("AXIS", 3)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_gyro_rate"] = {
    /**
     * Block to report GPS gyro rate.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_gyro_rate"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["positionAxisUnits"]("AXIS", 3), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["angularVelocityUnits"]("UNIT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_orientation"] = {
    /**
     * Block to report GPS orientation.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_orientation"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["principalAxisUnits"]("AXIS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: _targetPlatform__WEBPACK_IMPORTED_MODULE_3__["targetIsPlaygrounds"] ? ["output_number", "context_menu_convert_output_number", "enable_monitor"] : ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sensing_gps_signal_quality"] = {
    /**
     * Block to report GPS signal quality.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_gps_signal_quality"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_4__["gpsSensorList"]("GPS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number"]
      });
    }
  };
  //#endregion "Sensing GPS"
}



/***/ }),

/***/ "./src/Blockly/V5_ConfigData.ts":
/*!**************************************!*\
  !*** ./src/Blockly/V5_ConfigData.ts ***!
  \**************************************/
/*! exports provided: setControllerList, getControllerOptions, isValidController, hasController, setDrivetrainList, getDrivetrainOptions, isValidDrivetrain, hasDrivetrain, setRoboticArmList, getRoboticArmOptions, isValidRoboticArm, hasRoboticArm, setMotorGroupList, getMotorGroupOptions, isValidMotorGroup, hasMotorGroup, setMotorList, getMotorOptions, isValidMotor, hasMotor, getVirtualMotorOptions, setVisionSensorList, getVisionSensorOptions, isValidVisionSensor, hasVisionSensor, setInertialSensorList, getInertialSensorOptions, isValidInertialSensor, hasInertialSensor, setOpticalSensorList, getOpticalSensorOptions, isValidOpticalSensor, hasOpticalSensor, getVirtualOpticalSensorOptions, setElectromagnetList, getElectromagnetOptions, isValidElectromagnet, hasElectromagnet, setRotationSensorList, getRotationOptions, isValidRotationSensor, hasRotationSensor, getVirtualRotationOptions, setDistanceList, getDistanceOptions, isValidDistance, hasDistance, getVirtualDistanceOptions, setGPSList, getGPSOptions, isValidGPS, hasGPS, getVirtualGPSOptions, setLimitSwitchList, getLimitSwitchOptions, isValidLimitSwitch, hasLimitSwitch, setBumperSwitchList, getBumperSwitchOptions, isValidBumperSwitch, hasBumperSwitch, getVirtualBumperSwitchOptions, setEncoderList, getEncoderOptions, isValidEncoder, hasEncoder, setLineTrackerList, getLineTrackerOptions, isValidLineTracker, hasLineTracker, getVirtualLineTrackerOptions, setRangeFinderList, getRangeFinderOptions, isValidRangeFinder, hasRangeFinder, setLightSensorList, getLightSensorOptions, isValidLightSensor, hasLightSensor, setPotentiometersList, getPotentiometerOptions, isValidPotentiometer, hasPotentiometer, setPotentiometersV2List, setLEDList, getLEDOptions, isValidLED, hasLED, setDigitalOutList, getDigitalOutOptions, isValidDigitalOut, hasDigitalOut, setDigitalInList, getDigitalInOptions, isValidDigitalIn, hasDigitalIn, setGyroList, getGyroOptions, isValidGyro, hasGyro, setAccelerometerList, getAccelerometerOptions, isValidAccelerometer, hasAccelerometer, setVictorList, getVictorOptions, isValidVictor, hasVictor, setMotor29List, getMotor29Options, isValidMotor29, hasMotor29, setServoList, getServoOptions, isValidServo, hasServo, init, getGyroAndInertialOptions, setMotorDirectionNames, getMotorDirectionOptions, setVisionSignatureNames, getVisionSignatureOptions, updateNames, updateDeviceNames, disableBlocksWithDeletedDevices, getV5SoundOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setControllerList", function() { return setControllerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getControllerOptions", function() { return getControllerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidController", function() { return isValidController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasController", function() { return hasController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDrivetrainList", function() { return setDrivetrainList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDrivetrainOptions", function() { return getDrivetrainOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDrivetrain", function() { return isValidDrivetrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDrivetrain", function() { return hasDrivetrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRoboticArmList", function() { return setRoboticArmList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoboticArmOptions", function() { return getRoboticArmOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidRoboticArm", function() { return isValidRoboticArm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRoboticArm", function() { return hasRoboticArm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorGroupList", function() { return setMotorGroupList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorGroupOptions", function() { return getMotorGroupOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMotorGroup", function() { return isValidMotorGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMotorGroup", function() { return hasMotorGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorList", function() { return setMotorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorOptions", function() { return getMotorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMotor", function() { return isValidMotor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMotor", function() { return hasMotor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualMotorOptions", function() { return getVirtualMotorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVisionSensorList", function() { return setVisionSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisionSensorOptions", function() { return getVisionSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidVisionSensor", function() { return isValidVisionSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasVisionSensor", function() { return hasVisionSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInertialSensorList", function() { return setInertialSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInertialSensorOptions", function() { return getInertialSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidInertialSensor", function() { return isValidInertialSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasInertialSensor", function() { return hasInertialSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpticalSensorList", function() { return setOpticalSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOpticalSensorOptions", function() { return getOpticalSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidOpticalSensor", function() { return isValidOpticalSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOpticalSensor", function() { return hasOpticalSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualOpticalSensorOptions", function() { return getVirtualOpticalSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElectromagnetList", function() { return setElectromagnetList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElectromagnetOptions", function() { return getElectromagnetOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElectromagnet", function() { return isValidElectromagnet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasElectromagnet", function() { return hasElectromagnet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRotationSensorList", function() { return setRotationSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotationOptions", function() { return getRotationOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidRotationSensor", function() { return isValidRotationSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRotationSensor", function() { return hasRotationSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualRotationOptions", function() { return getVirtualRotationOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDistanceList", function() { return setDistanceList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceOptions", function() { return getDistanceOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDistance", function() { return isValidDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDistance", function() { return hasDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualDistanceOptions", function() { return getVirtualDistanceOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGPSList", function() { return setGPSList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGPSOptions", function() { return getGPSOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidGPS", function() { return isValidGPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGPS", function() { return hasGPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualGPSOptions", function() { return getVirtualGPSOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLimitSwitchList", function() { return setLimitSwitchList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLimitSwitchOptions", function() { return getLimitSwitchOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidLimitSwitch", function() { return isValidLimitSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasLimitSwitch", function() { return hasLimitSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBumperSwitchList", function() { return setBumperSwitchList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBumperSwitchOptions", function() { return getBumperSwitchOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidBumperSwitch", function() { return isValidBumperSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasBumperSwitch", function() { return hasBumperSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualBumperSwitchOptions", function() { return getVirtualBumperSwitchOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEncoderList", function() { return setEncoderList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEncoderOptions", function() { return getEncoderOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidEncoder", function() { return isValidEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasEncoder", function() { return hasEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLineTrackerList", function() { return setLineTrackerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLineTrackerOptions", function() { return getLineTrackerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidLineTracker", function() { return isValidLineTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasLineTracker", function() { return hasLineTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualLineTrackerOptions", function() { return getVirtualLineTrackerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRangeFinderList", function() { return setRangeFinderList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRangeFinderOptions", function() { return getRangeFinderOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidRangeFinder", function() { return isValidRangeFinder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRangeFinder", function() { return hasRangeFinder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLightSensorList", function() { return setLightSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLightSensorOptions", function() { return getLightSensorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidLightSensor", function() { return isValidLightSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasLightSensor", function() { return hasLightSensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPotentiometersList", function() { return setPotentiometersList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPotentiometerOptions", function() { return getPotentiometerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidPotentiometer", function() { return isValidPotentiometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPotentiometer", function() { return hasPotentiometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPotentiometersV2List", function() { return setPotentiometersV2List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLEDList", function() { return setLEDList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLEDOptions", function() { return getLEDOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidLED", function() { return isValidLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasLED", function() { return hasLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDigitalOutList", function() { return setDigitalOutList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDigitalOutOptions", function() { return getDigitalOutOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDigitalOut", function() { return isValidDigitalOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDigitalOut", function() { return hasDigitalOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDigitalInList", function() { return setDigitalInList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDigitalInOptions", function() { return getDigitalInOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDigitalIn", function() { return isValidDigitalIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDigitalIn", function() { return hasDigitalIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGyroList", function() { return setGyroList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGyroOptions", function() { return getGyroOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidGyro", function() { return isValidGyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGyro", function() { return hasGyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAccelerometerList", function() { return setAccelerometerList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccelerometerOptions", function() { return getAccelerometerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidAccelerometer", function() { return isValidAccelerometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAccelerometer", function() { return hasAccelerometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVictorList", function() { return setVictorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVictorOptions", function() { return getVictorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidVictor", function() { return isValidVictor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasVictor", function() { return hasVictor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotor29List", function() { return setMotor29List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotor29Options", function() { return getMotor29Options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidMotor29", function() { return isValidMotor29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMotor29", function() { return hasMotor29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setServoList", function() { return setServoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServoOptions", function() { return getServoOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidServo", function() { return isValidServo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasServo", function() { return hasServo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGyroAndInertialOptions", function() { return getGyroAndInertialOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMotorDirectionNames", function() { return setMotorDirectionNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMotorDirectionOptions", function() { return getMotorDirectionOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVisionSignatureNames", function() { return setVisionSignatureNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisionSignatureOptions", function() { return getVisionSignatureOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNames", function() { return updateNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDeviceNames", function() { return updateDeviceNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableBlocksWithDeletedDevices", function() { return disableBlocksWithDeletedDevices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getV5SoundOptions", function() { return getV5SoundOptions; });
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

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("V5_ConfigData");
log.setLevel(log.levels.WARN);
// for dev only
// log.enableAll();







// these imports need to make sure we have react defined. if not we are in a webworker and it will cause errors

var RobotConfigManager = null;
var BlocklyController = null;
if (self.React) {
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(10), __webpack_require__.e(12), __webpack_require__.e(4), __webpack_require__.e(7), __webpack_require__.e(5), __webpack_require__.e(9), __webpack_require__.e(6), __webpack_require__.e(2), __webpack_require__.e(11), __webpack_require__.e(8), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ../RobotConfiguration */ "./src/RobotConfiguration/index.ts")).then(function (res) {
    RobotConfigManager = res.RobotConfigManager;
  });
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./BlocklyController */ "./src/Blockly/BlocklyController.ts")).then(function (res) {
    BlocklyController = res;
  });
}

//#region "Lists"

// special lists
var controllerList = [];
var drivetrainList = [];
var roboticArmList = [];
var motorGroupList = [];

// smart port lists
var motorList = [];
var visionSensorList = [];
var inertialSensorList = [];
var opticalSensorList = [];
var electromagnetList = [];
var rotationSensorList = [];
var distanceList = [];
var gpsList = [];

// ADI lists
var limitSwitchList = [];
var bumperSwitchList = [];
var encoderList = [];
var lineTrackerList = [];
var rangeFinderList = [];
var lightSensorList = [];
var potentiometerList = [];
var potentiometerV2List = [];
var ledList = [];
var digitalOutList = [];
var digitalInList = [];
var gyroList = [];
var accelerometerList = [];
var victorList = [];
var motor29List = [];
var servoList = [];

//#endregion

//#region "List helpers"

/**
 * @param list list of device names to be converted into option list
 * @param noOptionStr name to display if there is no device to show
 * @param noPlaceholderOption if true, will return empty array instead of filling it with placeholder option
 */
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

//#endregion

//#region "robot config monitor"
var updateLookupTable = {
  controller: setControllerList,
  smartdrive: setDrivetrainList,
  RoboticArm: setRoboticArmList,
  motor_group: setMotorGroupList,
  motor: setMotorList,
  vision: setVisionSensorList,
  inertial: setInertialSensorList,
  optical: setOpticalSensorList,
  electromagnet: setElectromagnetList,
  rotation: setRotationSensorList,
  distance: setDistanceList,
  gps: setGPSList,
  limit: setLimitSwitchList,
  bumper: setBumperSwitchList,
  encoder: setEncoderList,
  line: setLineTrackerList,
  sonar: setRangeFinderList,
  light: setLightSensorList,
  pot: setPotentiometersList,
  potV2: setPotentiometersV2List,
  led: setLEDList,
  digital_out: setDigitalOutList,
  digital_in: setDigitalInList,
  gyro: setGyroList,
  accelerometer: setAccelerometerList,
  victor: setVictorList,
  motor29: setMotor29List,
  servo: setServoList
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
      if (device.deviceType["class"] === "triport") {
        // Go to next device since Blockly doesn't need to know about the expanders
        log.debug("Current device is a triport expander, no Blockly lists to update");
        continue;
      }
      try {
        if (device.isCustomName) {
          tmpList[device.deviceType["class"]].push([device.name, device.name]);
        } else {
          tmpList[device.deviceType["class"]].push([device.name, device.defaultPythonName]);
        }
      } catch (e) {
        log.error("The class ".concat(device.deviceType["class"], " does not exists in blockly list"));
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
      log.error("Blockly missed a callback for" + _key2 + " " + e);
    }
  }
  log.info("blockly device info has been updated");
}
function init() {
  RobotConfigManager.addDeviceChangeListener(onRobotConfigChange);
}
//#endregion

//#region "Special list functions"

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
 * tell blockly what the current list of arm names is.
 * @param roboticArms the configured list of arm names
 */
function setRoboticArmList(roboticArms) {
  roboticArmList = filterListInput(roboticArms);
}
function getRoboticArmOptions() {
  return getListOptions(roboticArmList, "RoboticArm");
}
function isValidRoboticArm(roboticArm) {
  return deviceInList(roboticArmList, roboticArm);
}
function hasRoboticArm() {
  return roboticArmList.length > 0;
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

//#endregion

//#region "smart port device lists"

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
 * tell blockly what the current list of vision sensor names is.
 * @param visionSensors the configured list of vision sensor names names
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
 * tell blockly what the current list of inertial sensor names is.
 * @param inertialSensors the configured list of vision sensor names names
 */
function setInertialSensorList(inertialSensors) {
  inertialSensorList = filterListInput(inertialSensors);
}
function getInertialSensorOptions() {
  return getListOptions(inertialSensorList, "Inertial1");
}
function isValidInertialSensor(inertialSensor) {
  return deviceInList(inertialSensorList, inertialSensor);
}
function hasInertialSensor() {
  return inertialSensorList.length > 0;
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
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("RollerOptical"), "RollerOptical"]];
}

/*
 * Informs Blockly about the current list of configured electromagnet devices
 * @param electromagnets the configured list of electromagnets
 */
function setElectromagnetList(electromagnets) {
  electromagnetList = filterListInput(electromagnets);
}
function getElectromagnetOptions() {
  return getListOptions(electromagnetList, "Electromagnet1");
}
function isValidElectromagnet(electromagnet) {
  return deviceInList(electromagnetList, electromagnet);
}
function hasElectromagnet() {
  return electromagnetList.length > 0;
}

/**
 * Informs Blockly about the current list of configured rotation sensors
 * @param rotationSensors the configured list of rotation sensors
 */

function setRotationSensorList(rotationSensors) {
  rotationSensorList = filterListInput(rotationSensors);
}
function getRotationOptions() {
  return getListOptions(rotationSensorList, "RotationSensor1");
}
function isValidRotationSensor(rotationSensor) {
  return deviceInList(rotationSensorList, rotationSensor);
}
function hasRotationSensor() {
  return rotationSensorList.length > 0;
}
function getVirtualRotationOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("Rotation"), "Rotation"]];
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
function getVirtualDistanceOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("BottomDistance"), "BottomDistance"]];
}

/***
 * Informs Blockly about the current list of configured gps devices
 * @param gps the configured list of gps sensors
 */
function setGPSList(gps) {
  gpsList = filterListInput(gps);
}
function getGPSOptions() {
  var gpsOptions = [];
  var gpsDrivetrain = getGPSFromDrivetrain();
  if (gpsDrivetrain) {
    gpsOptions.push.apply(gpsOptions, gpsDrivetrain);
  }
  gpsOptions.push.apply(gpsOptions, _toConsumableArray(getListOptions(gpsList, "GPS1", hasGPS())));
  return gpsOptions;
}
function isValidGPS(gps) {
  var gpsDrivetrain = getGPSFromDrivetrain();
  return deviceInList(gpsList, gps) || gpsDrivetrain && gpsDrivetrain[0][1] === gps;
}
function hasGPS() {
  var _getGPSFromDrivetrain;
  var hasGPS = gpsList.length > 0 || hasDrivetrain() && ((_getGPSFromDrivetrain = getGPSFromDrivetrain()) === null || _getGPSFromDrivetrain === void 0 ? void 0 : _getGPSFromDrivetrain.length) > 0;
  return hasGPS;
}
function getGPSFromDrivetrain() {
  if (!hasDrivetrain()) {
    return null;
  }
  var configuredDevices = RobotConfigManager.currentConfiguration;
  for (var i = 0; i < configuredDevices.length; i++) {
    var configuredDevice = configuredDevices[i];
    if (configuredDevice.deviceType["class"] === "smartdrive") {
      if (configuredDevice.setting.gyroType === "gps") {
        return [["DrivetrainGPS", "DrivetrainGPS", "drivetrain_gps"]];
      }
    }
  }
  return null;
}
function getVirtualGPSOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("GPS"), "GPS"]];
}

//#endregion

//#region "ADI device lists"

/**
 * tell blockly what the current list of limit switch names is.
 * @param limitSwitches the configured list of limit switch names
 */
function setLimitSwitchList(limitSwitches) {
  limitSwitchList = filterListInput(limitSwitches);
}
function getLimitSwitchOptions() {
  return getListOptions(limitSwitchList, "LimitSwitchA");
}
function isValidLimitSwitch(LimitSwitch) {
  return deviceInList(limitSwitchList, LimitSwitch);
}
function hasLimitSwitch() {
  return limitSwitchList.length > 0;
}

/**
 * tell blockly what the current list of bumper switch names is.
 * @param bumperSwitches the configured list of bumper switch names
 */
function setBumperSwitchList(bumperSwitches) {
  bumperSwitchList = filterListInput(bumperSwitches);
}
function getBumperSwitchOptions() {
  return getListOptions(bumperSwitchList, "BumperA");
}
function isValidBumperSwitch(bumperSwitch) {
  return deviceInList(bumperSwitchList, bumperSwitch);
}
function hasBumperSwitch() {
  return bumperSwitchList.length > 0;
}
function getVirtualBumperSwitchOptions() {
  return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("bumper"), "Bumper"]];
}

/**
 * tell blockly what the current list of encoder names is.
 * @param encoders the configured list of encoder names
 */
function setEncoderList(encoders) {
  encoderList = filterListInput(encoders);
}
function getEncoderOptions() {
  return getListOptions(encoderList, "EncoderA");
}
function isValidEncoder(encoder) {
  return deviceInList(encoderList, encoder);
}
function hasEncoder() {
  return encoderList.length > 0;
}

/**
 * tell blockly what the current list of line tracker names is.
 * @param lineTrackers the configured list of line tracker names
 */
function setLineTrackerList(lineTrackers) {
  lineTrackerList = filterListInput(lineTrackers);
}
function getLineTrackerOptions() {
  return getListOptions(lineTrackerList, "LineTrackerA");
}
function isValidLineTracker(lineTracker) {
  return deviceInList(lineTrackerList, lineTracker);
}
function hasLineTracker() {
  return lineTrackerList.length > 0;
}
function getVirtualLineTrackerOptions() {
  return [["BottomLineTracker", "BottomLineTracker", "BottomLineTracker"], ["MiddleLineTracker", "MiddleLineTracker", "MiddleLineTracker"], ["TopLineTracker", "TopLineTracker", "TopLineTracker"]];
}

/**
 * tell blockly what the current list of distacne names is.
 * @param rangeFinderSensors the configured list of range finder names
 */
function setRangeFinderList(rangeFinderSensors) {
  rangeFinderList = filterListInput(rangeFinderSensors);
}
function getRangeFinderOptions() {
  return getListOptions(rangeFinderList, "RangeFinderA");
}
function isValidRangeFinder(rangeFinder) {
  return deviceInList(rangeFinderList, rangeFinder);
}
function hasRangeFinder() {
  return rangeFinderList.length > 0;
}

/**
 * tell blockly what the current list of light sensor names is.
 * @param lightSensors the configured list of light sensor names
 */
function setLightSensorList(lightSensors) {
  lightSensorList = filterListInput(lightSensors);
}
function getLightSensorOptions() {
  return getListOptions(lightSensorList, "LightA");
}
function isValidLightSensor(lightSensor) {
  return deviceInList(lightSensorList, lightSensor);
}
function hasLightSensor() {
  return lightSensorList.length > 0;
}

/**
 * tell blockly what the current list of potentiometer names is.
 * @param potentiometers the configured list of potentiometer names
 */
function setPotentiometersList(potentiometers) {
  potentiometerList = filterListInput(potentiometers);
}
function setPotentiometersV2List(potentiometers) {
  potentiometerV2List = filterListInput(potentiometers);
}
function getPotentiometerOptions() {
  return getListOptions([].concat(_toConsumableArray(potentiometerList), _toConsumableArray(potentiometerV2List)), "PotentiometerA");
}
function isValidPotentiometer(potentiometer) {
  return deviceInList(potentiometerList, potentiometer) || deviceInList(potentiometerV2List, potentiometer);
}
function hasPotentiometer() {
  return potentiometerList.length > 0 || potentiometerV2List.length > 0;
}

/**
 * tell blockly what the current list of led names is.
 * @param leds the configured list of led names
 */
function setLEDList(leds) {
  ledList = filterListInput(leds);
}
function getLEDOptions() {
  return getListOptions(ledList, "LEDA");
}
function isValidLED(led) {
  return deviceInList(ledList, led);
}
function hasLED() {
  return ledList.length > 0;
}

/**
 * tell blockly what the current list of digital out names is.
 * @param digitalOuts the configured list of digital out names
 */
function setDigitalOutList(digitalOuts) {
  digitalOutList = filterListInput(digitalOuts);
}
function getDigitalOutOptions() {
  return getListOptions(digitalOutList, "DigitalOutA");
}
function isValidDigitalOut(digitalOut) {
  return deviceInList(digitalOutList, digitalOut);
}
function hasDigitalOut() {
  return digitalOutList.length > 0;
}

/**
 * tell blockly what the current list of digital in names is.
 * @param digitalOuts the configured list of digital out names
 */
function setDigitalInList(digitalIns) {
  digitalInList = filterListInput(digitalIns);
}
function getDigitalInOptions() {
  return getListOptions(digitalInList, "DigitalInA");
}
function isValidDigitalIn(digitalIn) {
  return deviceInList(digitalInList, digitalIn);
}
function hasDigitalIn() {
  return digitalInList.length > 0;
}

/**
 * tell blockly what the current list of gyro names is.
 * @param gyros the configured list of gyro names
 */
function setGyroList(gyros) {
  gyroList = filterListInput(gyros);
}
function getGyroOptions() {
  return getListOptions(gyroList, "GyroA");
}
function isValidGyro(gyro) {
  return deviceInList(gyroList, gyro);
}
function hasGyro() {
  return gyroList.length > 0;
}

/**
 * tell blockly what the current list of accelerometer names is.
 * @param accelerometers the configured list of accelerometer names
 */
function setAccelerometerList(accelerometers) {
  accelerometerList = filterListInput(accelerometers);
}
function getAccelerometerOptions() {
  return getListOptions(accelerometerList, "Accel2GA");
}
function isValidAccelerometer(accelerometer) {
  return deviceInList(accelerometerList, accelerometer);
}
function hasAccelerometer() {
  return accelerometerList.length > 0;
}

/**
 * tell blockly what the current list of vistor names is.
 * @param victors the configured list of vistor names
 */
function setVictorList(victors) {
  victorList = filterListInput(victors);
}
function getVictorOptions() {
  return getListOptions(victorList, "VictorA");
}
function isValidVictor(victor) {
  return deviceInList(victorList, victor);
}
function hasVictor() {
  return victorList.length > 0;
}

/**
 * tell blockly what the current list of motor29 names is.
 * @param motor29s the configured list of motor29 names
 */
function setMotor29List(motor29s) {
  motor29List = filterListInput(motor29s);
}
function getMotor29Options() {
  return getListOptions(motor29List, "Motor393A");
}
function isValidMotor29(motor29) {
  return deviceInList(motor29List, motor29);
}
function hasMotor29() {
  return motor29List.length > 0;
}

/**
 * tell blockly what the current list of servo names is.
 * @param servos the configured list of servo names
 */
function setServoList(servos) {
  servoList = filterListInput(servos);
}
function getServoOptions() {
  return getListOptions(servoList, "ServoA");
}
function isValidServo(servo) {
  return deviceInList(servoList, servo);
}
function hasServo() {
  return servoList.length > 0;
}

//#endregion

//#region "Combined device lists"

/**
 * Takes an array of tuple you would send to getListOptions,
 * and outputs concatonated version of all output, with one twist:
 * it will include placeholer name of only the first device list
 * with a valid device.
 * @param deviceTupleList
 */
function combineOptions(deviceTupleList) {
  var _ref, _ref2;
  var devLi = deviceTupleList;

  // Find the first devList to contain a device.
  // This list's device will be the placeholder for the option dropdown.
  var devListWithDev = null;
  for (var i = 0; i < devLi.length; i++) {
    if (devLi[i][0].length > 0) {
      devListWithDev = i;
      break;
    }
  }
  // zero out the devList index if null
  devListWithDev = devListWithDev === null ? 0 : devListWithDev;
  var noPlaceholderOption = true;
  var combinedOptionList = devLi.map(function (devTuple, ind) {
    if (ind === devListWithDev) {
      // this device list is the first one to contain device.
      // return option list WITH placeholder
      return getListOptions(devTuple[0], devTuple[1]);
    } else {
      // return option list without placeholder
      return getListOptions(devTuple[0], "", noPlaceholderOption);
    }
  });
  log.debug("Comined option list: ", (_ref = []).concat.apply(_ref, _toConsumableArray(combinedOptionList)));
  return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(combinedOptionList));
}
function getGyroAndInertialOptions() {
  // if one of the device is not len 0, that will be the placeholder,
  // the other ones must be empty
  var deviceLists = [[gyroList, "GyroA"], [inertialSensorList, "Inertial1"]];
  return combineOptions(deviceLists);
}
//#endregion

// type ColorData = {primary: string, secondary: string, tertiary: string};
// type ColorDataList = { [key: string]: ColorData };

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

//#region "field names"

var motorDirectionNames = {};
var virtualMotorDirectionNames = {
  intakemotorgroup: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_outtake"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_intake")
  },
  forkmotorgroup: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_down"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_up")
  },
  IntakeMotorGroup: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_outtake"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_intake")
  },
  ForkMotorGroup: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_down"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_up")
  },
  intakemotor: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_intake"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_outtake")
  },
  armmotor: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_open"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_close")
  },
  IntakeMotor: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_outtake"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_intake")
  },
  ArmMotor: {
    fwd: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_open"),
    rev: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_options_motor_direction_close")
  }
};
function setMotorDirectionNames(dirNames) {
  log.debug("new direction names: ", dirNames);
  motorDirectionNames = dirNames;
  setTimeout(function () {
    updateNames();
  }, 100);
}
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
var visionSignatureNames = {};
function setVisionSignatureNames(sigNames) {
  log.debug("new signature names: ", sigNames);
  visionSignatureNames = sigNames;
  setTimeout(function () {
    updateNames();
  }, 100);
}
function getVisionSignatureOptions(visionName) {
  // make sure that we always have a actual sensor to look for...
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
function updateNames() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  // TODO: change this so that it will work with multiple workspaces
  var _iterator2 = _createForOfIteratorHelper(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Workspace.getAll()),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var workspace = _step2.value;
      var allBlocks = workspace.getAllBlocks(false);
      allBlocks.forEach(function (block) {
        if (block.type === "v5_motion_spin_for" || block.type === "v5_motion_spin" || block.type === "v5_motion_spin_victor" || block.type === "v5_motion_spin_motor_controller" || block.type === "v5_motion_spin_at_voltage") {
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
function updateDeviceNames(oldDeviceName, newDevName, deviceClass) {
  if (!self.React) {
    log.warn("not running in main context. skipping update");
    return;
  }
  if (oldDeviceName === newDevName) {
    log.debug("skipping the device rename logic as the names are the same");
    return;
  }
  if (_AppInfo__WEBPACK_IMPORTED_MODULE_3__["appState"].getAppState().mode === "Text") {
    log.debug("skipping the device rename logic as this is a text project...");
    return;
  }
  var deviceFieldNames = getDeviceFieldNameByClass(deviceClass);
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var blocksWorkspace = BlocklyController.getCurrentMainController().blocklyWorkspace;
  var toolboxWorkspace = blocksWorkspace.getToolbox().getFlyout().getWorkspace();
  var workspaceArray = [blocksWorkspace, toolboxWorkspace];
  for (var _i3 = 0, _workspaceArray = workspaceArray; _i3 < _workspaceArray.length; _i3++) {
    var workspace = _workspaceArray[_i3];
    var allBlocks = workspace.getAllBlocks(false);
    allBlocks.forEach(function (block) {
      var fieldResult = getDeviceField(block, deviceFieldNames);
      var isHat = block.isHatBlock();
      if (!!fieldResult && !isHat) {
        var field = fieldResult.field,
          fieldName = fieldResult.fieldName;
        var fieldValue = field.getValue();
        if (fieldValue === oldDeviceName) {
          var options = field.getOptions(false);
          var optionValues = options.map(function (option) {
            return option[1];
          });
          if (!optionValues.includes(newDevName)) {
            log.warn("the block does not have the device option", newDevName, options);
          }
          block.setFieldValue(newDevName, fieldName);
        }
      }
    });
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}
function disableBlocksWithDeletedDevices(name, deviceClass) {
  if (!self.React) {
    log.warn("not running in main context. skipping update");
    return;
  }
  if (_AppInfo__WEBPACK_IMPORTED_MODULE_3__["appState"].getAppState().mode === "Text") {
    log.debug("skipping the device delete logic as this is a text project...");
    return;
  }
  var deviceFieldNames = getDeviceFieldNameByClass(deviceClass);
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
  var blocksWorkspace = BlocklyController.getCurrentMainController().blocklyWorkspace;
  var toolboxWorkspace = blocksWorkspace.getToolbox().getFlyout().getWorkspace();
  var workspaceArray = [blocksWorkspace, toolboxWorkspace];
  for (var _i4 = 0, _workspaceArray2 = workspaceArray; _i4 < _workspaceArray2.length; _i4++) {
    var workspace = _workspaceArray2[_i4];
    var allBlocks = workspace.getAllBlocks(false);
    allBlocks.forEach(function (block) {
      var fieldResult = getDeviceField(block, deviceFieldNames);
      var isHat = block.isHatBlock();
      if (!!fieldResult && !isHat) {
        var fieldValue = fieldResult.field.getValue();
        if (fieldValue === name && block.workspace === blocksWorkspace) {
          block.setEnabled(false);
        }
      }
    });
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
}

/**
 * Maps the device name to the possible block field names. some devices may
 * show up in blocks with different fields so this returns a list of all the
 * field names.
 * 
 * When checking for the fields on the blocks, we need to check all the names
 * and not just the first name.
 * 
 * @param deviceClass the device class that we are looking for in the blocks
 * @returns a list of the possible block field names.
 */
function getDeviceFieldNameByClass(deviceClass) {
  switch (deviceClass.toLowerCase()) {
    case "roboticarm":
      return ["ARM"];
    case "motor":
    case "motor_group":
    case "motor29":
      return ["MOTOR"];
    case "electromagnet":
      return ["MAGNET"];
    case "gyro":
      return ["GYRO"];
    case "inertial":
      return ["GYRO", "INERTIAL"];
    case "pot":
    case "potv2":
      return ["POTENTIOMETER"];
    case "accelerometer":
      return ["ACCELERATION"];
    case "light":
      return ["LIGHTSENSOR"];
    case "digital_in":
      return ["DIGITALIN"];
    case "digital_out":
      return ["DIGITALOUT"];
    case "line":
      return ["LINETRACKER"];
    case "smartdrive":
    case "vision":
    case "controller":
    case "optical":
    case "rotation":
    case "distance":
    case "gps":
    case "triport":
    case "color":
    case "bumper":
    case "servo":
    case "limit":
    case "encoder":
    case "led":
      return [deviceClass.toUpperCase()];
    default:
      console.log("Cannot find field name for unknown class: ", deviceClass);
      return [deviceClass.toUpperCase()];
  }
}

/**
 * helper to grab the field for the device. Since this will usually be called
 * in a loop over the blocks in a workspace, This does not take in the device
 * class. instead it is expected that you will grab the possible field names
 * before the loop and pass them to this function. This is to help with
 * performance for slower devices (Android....)
 * @param block the block to grab the field from 
 * @param fieldNames the possible field names to check for
 * @returns the field object and name or null if no matching field is found
 */
function getDeviceField(block, fieldNames) {
  for (var _index = 0; _index < fieldNames.length; _index++) {
    var fieldName = fieldNames[_index];
    var field = block.getField(fieldName);
    if (field) {
      return {
        field: field,
        fieldName: fieldName
      };
    }
  }
  return null;
}
//#endregion

//#region sounds
// handle annoying import due to getting imported in webworker...

var ProjectManager = null;
if (self.React) {
  Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(10), __webpack_require__.e(12), __webpack_require__.e(4), __webpack_require__.e(7), __webpack_require__.e(5), __webpack_require__.e(9), __webpack_require__.e(6), __webpack_require__.e(2), __webpack_require__.e(11), __webpack_require__.e(8), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ../FileSys/ProjectManager */ "./src/FileSys/ProjectManager.ts")).then(function (res) {
    ProjectManager = res;
  });
}

/**
 * grabs a list of the sounds in the current project file
 * @returns the dropdown options for the project sounds
 */
function getV5SoundOptions() {
  var _ProjectManager, _ProjectManager$curre, _ProjectManager$curre2;
  var projectSounds = (_ProjectManager = ProjectManager) === null || _ProjectManager === void 0 ? void 0 : (_ProjectManager$curre = _ProjectManager.currentProject) === null || _ProjectManager$curre === void 0 ? void 0 : (_ProjectManager$curre2 = _ProjectManager$curre.projectData) === null || _ProjectManager$curre2 === void 0 ? void 0 : _ProjectManager$curre2.v5Sounds;
  if (!projectSounds) {
    log.warn("we should not get here with a correct project...");
    return [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_sounds_siren"), "siren2"]];
  }
  var sounds = projectSounds.map(function (soundItem) {
    return soundItem.name;
  });
  return sounds.map(function (soundName) {
    return [soundName, soundName];
  });
}
//#endregion sounds



/***/ })

});
//# sourceMappingURL=ca1d5f0b94062a0efab9.14.bundle.js.map