this["webpackChunkwebapp"]([5],{

/***/ "./src/Blockly/Blocks/123/VEX_123_Action.ts":
/*!**************************************************!*\
  !*** ./src/Blockly/Blocks/123/VEX_123_Action.ts ***!
  \**************************************************/
/*! exports provided: createActionBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createActionBlocks", function() { return createActionBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VEX_123_Dropdown */ "./src/Blockly/Blocks/123/VEX_123_Dropdown.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createActionBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_act_act"] = {
    /**
     * Blocks for robot actions.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_act_act"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_2__["actDropDown"]("ACT")
        // VEX_123_Dropdowns.blockIcon("123_act_act"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.act,
        style: "actions_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/123/VEX_123_Dropdown.ts":
/*!****************************************************!*\
  !*** ./src/Blockly/Blocks/123/VEX_123_Dropdown.ts ***!
  \****************************************************/
/*! exports provided: spinDirection, eventsDropdown, turnDirection, rotationUnits, driveUnits, distanceUnits, velocityUnits, currentUnits, colorNames, controllerButtons, controllerAxies, obstacles, buttons, acceleration, colors, actDropDown, eyeOnOff, sensingColors, blockIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spinDirection", function() { return spinDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsDropdown", function() { return eventsDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turnDirection", function() { return turnDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationUnits", function() { return rotationUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "driveUnits", function() { return driveUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceUnits", function() { return distanceUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocityUnits", function() { return velocityUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentUnits", function() { return currentUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorNames", function() { return colorNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerButtons", function() { return controllerButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllerAxies", function() { return controllerAxies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obstacles", function() { return obstacles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttons", function() { return buttons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acceleration", function() { return acceleration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actDropDown", function() { return actDropDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eyeOnOff", function() { return eyeOnOff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sensingColors", function() { return sensingColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blockIcon", function() { return blockIcon; });
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _platformInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../platformInfo */ "./src/platformInfo.ts");



// tablet and chromeos apps require a different path
var IS_TABLET_APP = _platformInfo__WEBPACK_IMPORTED_MODULE_1__["PlatformIsIOS"] || _platformInfo__WEBPACK_IMPORTED_MODULE_1__["PlatformIsAndroid"] || _platformInfo__WEBPACK_IMPORTED_MODULE_1__["PlatformIsChrome"];
var STATIC = IS_TABLET_APP ? "static/" : "../../../../static/";
function spinDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_motor_direction_forward"), "fwd"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_motor_direction_reverse"), "rev"]]
  };
}
function turnDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_turn_direction_left"), "left"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_turn_direction_right"), "right"]]
  };
}
function rotationUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_rotation_units_degrees"), "deg"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_rotation_units_turns"), "rev"]]
  };
}
function driveUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:123_options_distance_units_steps"), "step"], ["mm", "mm"]]
  };
}
function distanceUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:123_options_distance_units_steps"), "steps"]]
  };
}
function velocityUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["%", "pct"], ["rpm", "rpm"]]
  };
}
function obstacles(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_obstacle_object"), "object"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_obstacle_crash"), "crash"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_obstacle_line"), "line"]]
  };
}
function buttons(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[{
      src: "".concat(STATIC, "img/ui_imgs/ifbuttonleft.png"),
      width: 25,
      height: 25,
      alt: _i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_left")
    }, "leftPressed"], [{
      src: "".concat(STATIC, "img/ui_imgs/ifbuttonright.png"),
      width: 25,
      height: 25,
      alt: _i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_right")
    }, "rightPressed"], [{
      src: "".concat(STATIC, "img/ui_imgs/ifbuttonup.png"),
      width: 25,
      height: 25,
      alt: _i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_move")
    }, "movePressed"], [{
      src: "".concat(STATIC, "img/ui_imgs/ifbuttonsound.png"),
      width: 25,
      height: 25,
      alt: _i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_sound")
    }, "soundPressed"]]
  };
}
function acceleration(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["x", "x"], ["y", "y"], ["z", "z"]]
  };
}
function colors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_blue"), "blue"]]
  };
}
function currentUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["%", "PERCENT"], ["amps", "AMPS"]]
  };
}
function colorNames(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_colors_purple"), "purple"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_colors_off"), "off"]]
  };
}
function controllerButtons(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_e_up"), "ButtonEUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_e_down"), "ButtonEDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_f_up"), "ButtonFUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_f_down"), "ButtonFDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_l_up"), "ButtonLUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_l_down"), "ButtonLDown"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_r_up"), "ButtonRUp"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_controller_r_down"), "ButtonRDown"]]
  };
}
function controllerAxies(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["A", "AxisA"], ["B", "AxisB"], ["C", "AxisC"], ["D", "AxisD"]]
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

function actDropDown(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:123_act_sad"), "sad"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:123_act_happy"), "happy"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:123_act_crazy"), "crazy"]]
  };
}
function blockIcon(blockName) {
  return {
    type: "field_image",
    src: "static/blocks_media/".concat(blockName, ".svg"),
    width: 15,
    height: 15,
    alt: "",
    flipRtl: false
  };
}
function eyeOnOff(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_on"), "on"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_off"), "off"]]
  };
}
function sensingColors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].t("blockly:com_options_sensing_blue"), "blue"]]
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/123/VEX_123_Event.ts":
/*!*************************************************!*\
  !*** ./src/Blockly/Blocks/123/VEX_123_Event.ts ***!
  \*************************************************/
/*! exports provided: createEventsBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventsBlocks", function() { return createEventsBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VEX_123_Dropdown */ "./src/Blockly/Blocks/123/VEX_123_Dropdown.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createEventsBlocks() {
  // When Started Event
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_events_when_started"] = {
    /**
     * Block for when program started events.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_events_when_started"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_events_when_started"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // When Button Pressed/Released Event
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_events_when_button"] = {
    /**
     * Block to define button pressed event
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_events_when_button"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_2__["buttons"]("BUTTON"), {
          type: "field_dropdown",
          name: "EVENTTYPE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_pressed"), "pressed"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_released"), "released"]]
        }
        // VEX_123_Dropdowns.blockIcon("123_events_when_button"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // When Timer Event
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_events_when_timer"] = {
    /**
     * Block to define when the timer is greater than x seconds
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_events_when_timer"),
        args0: [{
          type: "input_value",
          name: "AMOUNT",
          check: "NumberOnly"
        }
        // VEX_123_Dropdowns.blockIcon("123_events_when_timer"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // When Received Event
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_events_when_broadcasted"] = {
    /**
     * Block to define broadcast event stack.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_events_when_broadcasted"),
        args0: [{
          type: "field_variable",
          name: "BROADCAST_OPTION",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BROADCAST_MESSAGE_VARIABLE_TYPE],
          variable: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }
        // VEX_123_Dropdowns.blockIcon("123_events_when_broadcasted"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };

  // When Broadcast Event
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_events_broadcast"] = {
    /**
     * Block to send broadcast message.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        id: "iq_events_broadcast",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_events_broadcast"),
        args0: [{
          type: "input_value",
          name: "BROADCAST_INPUT",
          check: "BROADMENU"
        }
        // VEX_123_Dropdowns.blockIcon("123_events_broadcast"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  // When Broadcast and Wait Event
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_events_broadcast_and_wait"] = {
    /**
     * Block to send broadcast message and wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        id: "iq_events_broadcast_and_wait",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_events_broadcast_and_wait"),
        args0: [{
          type: "input_value",
          name: "BROADCAST_INPUT",
          check: "BROADMENU"
        }
        // VEX_123_Dropdowns.blockIcon("123_events_broadcast_and_wait"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/123/VEX_123_Looks.ts":
/*!*************************************************!*\
  !*** ./src/Blockly/Blocks/123/VEX_123_Looks.ts ***!
  \*************************************************/
/*! exports provided: createLooksBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLooksBlocks", function() { return createLooksBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VEX_123_Dropdown */ "./src/Blockly/Blocks/123/VEX_123_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("123 Looks blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createLooksBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_looks_glow"] = {
    /**
     * Block to glow a 123 brain a certain color.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_looks_glow"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["colorNames"]("COLOR")
        // VEX_123_Dropdowns.blockIcon("123_looks_glow"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_looks_print"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_print"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_looks_set_print_precision"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_precision"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_looks_clear_all_rows"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_clear_all_rows"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_looks_next_row"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_next_row"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_looks_set_print_color"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_color"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/123/VEX_123_Sensing.ts":
/*!***************************************************!*\
  !*** ./src/Blockly/Blocks/123/VEX_123_Sensing.ts ***!
  \***************************************************/
/*! exports provided: createSensingBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSensingBlocks", function() { return createSensingBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VEX_123_Dropdown */ "./src/Blockly/Blocks/123/VEX_123_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("123 Motion blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createSensingBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_reset_timer"] = {
    /**
     * Block to reset brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_reset_timer"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_reset_timer"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_timer_value"] = {
    /**
     * Block to get brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_timer_value"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_timer_value"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_drive_is_done"] = {
    /**
     * Block to check if drivetrain is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_drive_is_done"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_drive_is_done"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_drive_is_moving"] = {
    /**
     * Block to check if drivetrain is moving.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_drive_is_moving"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_drive_is_moving"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_drive_heading"] = {
    /**
     * Block to drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_drive_heading"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_drive_heading"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_drive_velocity"] = {
    /**
     * Block to drivetrain velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_drive_velocity"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_drive_current"] = {
    /**
     * Block to drivetrain current.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_drive_current"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_brain_button_pressed"] = {
    /**
     * Block to check if brain button is pressed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        type: "field_image",
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_brain_button_pressed"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["buttons"]("BUTTONS")
        // VEX_123_Dropdowns.blockIcon("123_sensing_brain_button_pressed"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_brightness_of"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_brightness_of"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_brightness_of"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_line_detecting"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_line_detecting"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_line_detecting"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_calibrate_gyro"] = {
    /**
     * Block to calibrate gyro.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_calibrate_gyro"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_calibrate_gyro"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_set_gyro_heading"] = {
    /**
     * Block to reset gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_set_gyro_heading"),
        args0: [{
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }
        // VEX_123_Dropdowns.blockIcon("123_sensing_set_gyro_heading"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_heading_of_gyro"] = {
    /**
     * Block to get gyro heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_heading_of_gyro"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_heading_of_gyro"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_crash"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_crash"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_crash"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_acceleration"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_acceleration"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["acceleration"]("DIRECTIONS")
        // VEX_123_Dropdowns.blockIcon("123_sensing_acceleration"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_near_object"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_near_object"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_near_object"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_distance"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_distance"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNITS")
        // VEX_123_Dropdowns.blockIcon("123_sensing_distance"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_colors"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_colors"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["colors"]("COLORS")
        // VEX_123_Dropdowns.blockIcon("123_sensing_colors"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_color_name"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_color_name"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_color_name"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_hue"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_hue"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_hue"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_bright_object"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_bright_object"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_bright_object"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_brightness"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_brightness"),
        args0: [
          // VEX_123_Dropdowns.blockIcon("123_sensing_brightness"),
        ],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_eye_set_light_on"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_eye_set_light_on"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["eyeOnOff"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_eye_set_light_power"] = {
    /**
     * Block to set eye light power.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_eye_set_light_power"),
        args0: [{
          type: "input_value",
          name: "POWER",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_near_object"] = {
    /**
     * Block to get if eye sensor found an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_near_object"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_eye_brightness"] = {
    /**
     * Block to get whether an object is a bright object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_eye_brightness"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["123_sensing_eye_detect"] = {
    /**
     * Block to detect whether a color is being detected.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:123_sensing_eye_detect"),
        args0: [_VEX_123_Dropdown__WEBPACK_IMPORTED_MODULE_3__["sensingColors"]("COLORS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/123/VEX_123_Sounds.ts":
/*!**************************************************!*\
  !*** ./src/Blockly/Blocks/123/VEX_123_Sounds.ts ***!
  \**************************************************/
/*! exports provided: createSoundsBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSoundsBlocks", function() { return createSoundsBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createSoundsBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["123_sounds_play_sound"] = {
    /**
     * Blocks to play a sound.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:123_sounds_play_sound"),
        args0: [{
          type: "field_dropdown",
          name: "SOUND",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_honk"), "honk"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_doorbell"), "doorbell"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_crash"), "crash"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_random"), "random"]]
        }
        // VEX_123_Dropdowns.blockIcon("123_sounds_play_sound"),
        ],

        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sound,
        style: "sounds_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_Looks.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/Common_Looks.ts ***!
  \********************************************/
/*! exports provided: createCommonLooksBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommonLooksBlocks", function() { return createCommonLooksBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../i18n/i18n */ "./src/i18n/i18n.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Common Looks blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();



function createCommonLooksBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_color"] = {
    /**
     * Block to move pen up or down.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_set_print_color"),
        args0: [{
          type: "field_dropdown",
          name: "COLORS",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_colors_black"), "black"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_colors_blue"), "blue"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_print"] = {
    /**
     * Block to print to screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_print"),
        args0: [{
          type: "input_value",
          name: "DATA",
          check: ["Number", "String", "Boolean", "ColorName"]
        }, {
          type: "field_mutatortoggle",
          name: "andsetcursortonextrow_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_looks_set_to_next_row")
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return [{
        name: "vexcode_brain_precision",
        type: ""
      }];
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_precision"] = {
    /**
     * Block to set the print precision.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_set_print_precision"),
        args0: [{
          type: "field_dropdown",
          name: "PRECISION",
          options: [["1", "0"], ["0.1", "1"], ["0.01", "2"], ["0.001", "3"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com options all digits"), "-1"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return [{
        name: "vexcode_brain_precision",
        type: ""
      }];
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_clear_all_rows"] = {
    /**
     * Block to clear screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_clear_all_rows"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_next_row"] = {
    /**
     * Block to get new line on screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_next_row"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/Common_MixedMode.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/Common_MixedMode.ts ***!
  \************************************************/
/*! exports provided: createMixedModeBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMixedModeBlocks", function() { return createMixedModeBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("Common Mixed Mode");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();


var STATIC = "../../../../static";
function getPathToMedia() {
  var _mainWorkspace;
  return ((_mainWorkspace = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].mainWorkspace) === null || _mainWorkspace === void 0 ? void 0 : _mainWorkspace.options.pathToMedia) || "";
}
function createMixedModeBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_singleline"] = {
    /**
     * Block for single line mixed-mode input.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "input_value",
          name: "SINGLELINE_INPUT",
          check: "InputString"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.mixed,
        style: "mixed_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_singleline"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_singleline"];

  // TODO: make this fit our code better
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_multiline_command"] = {
    /**
     * Block for adding two numbers.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_multilinetext",
          name: "MULTILINE_INPUT",
          text: "",
          useCustomEditor: true,
          useMonospaceFont: true
        }],
        style: "mixed_blocks",
        extensions: ["shape_statement"
        //   "parent_tooltip_when_inline",
        ]
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_multiline_command"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_multiline_command"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_c"] = {
    /**
     * C-shaped Block with single line mixed-mode input
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        message1: "%1",
        args0: [{
          type: "field_multilinetext",
          name: "INPUT",
          text: "",
          useCustomEditor: true,
          useMonospaceFont: true
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.mixed,
        style: "mixed_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_c"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_c"];
  try {
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Extensions.registerMutator("mixed_c_expandable_mutator", {
      branchCount: 1,
      mutationToDom: function mutationToDom() {
        var container = document.createElement("mutation");
        container.setAttribute("branches", this.branchCount.toString());
        return container;
      },
      domToMutation: function domToMutation(xmlElement) {
        this.setBranchCount(parseInt((xmlElement === null || xmlElement === void 0 ? void 0 : xmlElement.getAttribute("branches")) || 1, 10));
      },
      setBranchCount: function setBranchCount(branches) {
        var skipEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        while (this.branchCount < branches) {
          this.addBranch(skipEvents);
        }
        while (this.branchCount > branches) {
          this.removeBranch(this.branchCount, skipEvents);
        }
        this.updateBranchButtons();
      },
      /**
       * Update "input" branches to add (or remove) mutator
       * buttons depending on whether they should be visible.
       * @this Block
       */
      updateBranchButtons: function updateBranchButtons() {
        var _this = this;
        var allowAdd = this.branchCount <= 6;
        var allowRemove = this.branchCount > 1;
        var addField = this.getField("BRANCH_ADD");
        addField.setOnClickHandler(function () {
          _this.addBranch();
          _this.updateBranchButtons();
        });
        var currentAdd = addField.getValue();
        var currentAddAllowed = currentAdd.endsWith("add.png");
        if (currentAddAllowed !== allowAdd) {
          addField.setValue(allowAdd ? this.icons.ADD : this.icons.BLANK);
        }
        var removeField = this.getField("BRANCH_REMOVE");
        removeField.setOnClickHandler(function () {
          _this.removeBranch(_this.branchCount);
          _this.updateBranchButtons();
        });
        var currentRemove = removeField.getValue();
        var currentRemoveAllowed = currentRemove.endsWith("remove.png");
        if (currentRemoveAllowed !== allowRemove) {
          removeField.setValue(allowRemove ? this.icons.REMOVE : this.icons.BLANK);
        }
      },
      /**
       * will add a new conditional branch to the block
       * @this Block
       */
      addBranch: function addBranch() {
        var skipEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        log.debug("addBranch: ", this.branchCount);
        if (this.branchCount > 6) {
          return;
        }
        var thisblock = this;
        var preAddMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        var newPosition = ++this.branchCount;
        var postAddMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        var blocklyWorkspace = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].getMainWorkspace();
        var hasGroup = !!_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.getGroup();
        if (!skipEvents) {
          if (!hasGroup) {
            _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(true);
          }
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.fire(new _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.BlockChange(this, "mutation", null, preAddMutation, postAddMutation));
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.disable();
        }

        // Create a new shadow block for the text input
        var tempShadowInputBlock = blocklyWorkspace.newBlock("mixed_singleline_text");
        tempShadowInputBlock.setShadow(true);
        tempShadowInputBlock.setFieldValue("", "INPUT");
        var tempShadowInputBlockXml = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.blockToDom(tempShadowInputBlock);
        tempShadowInputBlock.dispose(false);
        if (!skipEvents) {
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.enable();
        }

        // Create a new input
        var multilineInput = new _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].FieldMultilineInput(undefined, undefined, {
          useCustomEditor: true,
          useMonospaceFont: true
        });
        thisblock.appendDummyInput("DUMMYINPUT" + newPosition).appendField(multilineInput, "INPUT" + newPosition);
        thisblock.appendDummyInput("LABEL" + newPosition);
        thisblock.appendStatementInput("SUBSTACK" + newPosition);
        var i = thisblock.inputList.length;

        // Keep the mutator buttons as the last input
        thisblock.moveNumberedInputBefore(i - 4, i);
        if (!skipEvents && !hasGroup) {
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(false);
        }
        if (this.initSvg) {
          this.initSvg();
        }
      },
      /**
       * will the specified branch statement
       * @param position the position to remove
       * @this Block
       */
      removeBranch: function removeBranch(position) {
        var skipEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        log.debug("removeBranch:", position, this.branchCount);
        if (position > this.branchCount || this.branchCount < 2) {
          return;
        }
        var thisblock = this;
        var preRemoveMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        this.branchCount--;
        var postRemoveMutation = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Xml.domToText(this.mutationToDom());
        if (!skipEvents) {
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(true);
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.fire(new _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.BlockChange(this, "mutation", null, preRemoveMutation, postRemoveMutation));
        }
        thisblock.removeInput("DUMMYINPUT" + position, true);
        thisblock.removeInput("LABEL" + position, true);
        thisblock.removeInput("SUBSTACK" + position, true);
        for (var i = position; i < this.branchCount + 1; i++) {
          thisblock.getInput("DUMMYINPUT" + (i + 1)).name = "DUMMYINPUT" + i;
          thisblock.getField("INPUT" + (i + 1)).name = "INPUT" + i;
          thisblock.getInput("LABEL" + (i + 1)).name = "LABEL" + i;
          thisblock.getInput("SUBSTACK" + (i + 1)).name = "SUBSTACK" + i;
        }
        if (!skipEvents) {
          _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Events.setGroup(false);
        }
        if (this.initSvg) {
          this.initSvg();
        }
      }
    }, function () {
      this.updateBranchButtons();
    });
  } catch (err) {
    log.debug("error registering mixed_c_expandable_mutator mutator");
  }
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_c_expandable"] = {
    /**
     * Expandable C-shaped Block with single line mixed-mode inputs
     * @this Blockly.Block
     */
    init: function init() {
      var LOCAL_STATIC = getPathToMedia() + STATIC;
      var ADD = "".concat(LOCAL_STATIC, "/img/ui_imgs/elseif_add.png");
      var REMOVE = "".concat(LOCAL_STATIC, "/img/ui_imgs/elseif_remove.png");
      var BLANK = "".concat(LOCAL_STATIC, "/img/ui_imgs/elseif_blank.png");
      this.icons = {
        ADD: ADD,
        REMOVE: REMOVE,
        BLANK: BLANK
      };
      this.jsonInit({
        mutator: "mixed_c_expandable_mutator",
        message0: "%1",
        message1: "%1",
        message2: "%1 %2",
        args0: [{
          type: "field_multilinetext",
          name: "INPUT1",
          text: "",
          useCustomEditor: true,
          useMonospaceFont: true
        }],
        args1: [{
          type: "input_statement",
          name: "SUBSTACK1"
        }],
        args2: [{
          type: "field_image",
          name: "BRANCH_REMOVE",
          src: REMOVE,
          width: 30,
          height: 30
        }, {
          type: "field_image",
          name: "BRANCH_ADD",
          src: ADD,
          width: 30,
          height: 30
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.mixed,
        style: "mixed_blocks",
        extensions: ["shape_statement"]
      });
      this.inputList[2].setAlign(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ALIGN_RIGHT);
      this.updateBranchButtons();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_c_expandable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_c_expandable"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_output_boolean"] = {
    /**
     * Block for conditional mixed-mode input.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_multilinetext",
          name: "SINGLELINE_INPUT",
          check: "InputString",
          useCustomEditor: true,
          useMonospaceFont: true
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.mixed,
        style: "mixed_blocks",
        extensions: ["output_boolean"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_output_boolean"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_output_boolean"];
  // TODO: remove old definitions...
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_conditional"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_output_boolean"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_conditional"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_output_boolean"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_output_number"] = {
    /**
     * Block for mixed-mode number output.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_multilinetext",
          name: "SINGLELINE_INPUT",
          check: "InputString",
          useCustomEditor: true,
          useMonospaceFont: true
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.mixed,
        style: "mixed_blocks",
        extensions: ["output_number"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_mixed_output_number"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_output_number"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_singleline_text"] = {
    /**
     * Block for single line text.
     * @this Blockly.Block
     */
    init: function init() {
      var validator = function validator(text) {
        return text.length <= 100 ? text : null;
      };
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_input",
          name: "INPUT",
          "class": validator,
          textAlign: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].ALIGN_LEFT
        }],
        output: "InputString",
        // outputShape: Blockly.OUTPUT_SHAPE_SQUARE,
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.mixed,
        style: "text_blocks"

        // colour: "#FFFFFF",
        // colourSecondary: "#FFFFFF",
        // colourTertiary: "#FFFFFF",
      });
    }
  };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["mixed_definition"] = {
    /**
     * Block for defining a function in mixed mode code.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "%1",
        args0: [{
          type: "field_multilinetext",
          name: "MULTILINE_INPUT",
          text: "",
          useCustomEditor: true,
          useMonospaceFont: true
        }],
        style: "mixed_blocks_hat",
        extensions: ["shape_hat"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Actions.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Actions.ts ***!
  \*********************************************/
/*! exports provided: createActionBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createActionBlocks", function() { return createActionBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PG_Dropdown */ "./src/Blockly/Blocks/PG/PG_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PG Action Blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createActionBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_actions_interact_with_minerals"] = {
    /**
     * Block to interact with food.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_actions_interact_with_minerals"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["foodActions"]("ACTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.actions,
        style: "actions_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_actions_interact_with_enemy"] = {
    /**
     * Block to interact with enemy.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_actions_interact_with_enemy"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.actions,
        style: "actions_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_actions_standby"] = {
    /**
     * Block to interact hibernate.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_actions_standby"),
        args0: [{
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.actions,
        style: "actions_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_BaseBlocks.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_BaseBlocks.ts ***!
  \************************************************/
/*! exports provided: createPGBaseBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPGBaseBlocks", function() { return createPGBaseBlocks; });
/* harmony import */ var _Common_Strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common_Strings */ "./src/Blockly/Blocks/Common_Strings.ts");
/* harmony import */ var _Common_Variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common_Variables */ "./src/Blockly/Blocks/Common_Variables.ts");
/* harmony import */ var _Common_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common_Events */ "./src/Blockly/Blocks/Common_Events.ts");
/* harmony import */ var _Common_Inputs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common_Inputs */ "./src/Blockly/Blocks/Common_Inputs.ts");
/* harmony import */ var _Common_Controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common_Controls */ "./src/Blockly/Blocks/Common_Controls.ts");
/* harmony import */ var _Common_Looks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common_Looks */ "./src/Blockly/Blocks/Common_Looks.ts");
/* harmony import */ var _Common_Procedures__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Common_Procedures */ "./src/Blockly/Blocks/Common_Procedures.ts");
/* harmony import */ var _CommentBlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CommentBlock */ "./src/Blockly/Blocks/CommentBlock.ts");
/* harmony import */ var _Common_MixedMode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Common_MixedMode */ "./src/Blockly/Blocks/Common_MixedMode.ts");
/* harmony import */ var _PG_Control__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PG_Control */ "./src/Blockly/Blocks/PG/PG_Control.ts");
/* harmony import */ var _PG_Sensing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PG_Sensing */ "./src/Blockly/Blocks/PG/PG_Sensing.ts");
/* harmony import */ var _PG_Drivetrain__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PG_Drivetrain */ "./src/Blockly/Blocks/PG/PG_Drivetrain.ts");
/* harmony import */ var _PG_Events__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PG_Events */ "./src/Blockly/Blocks/PG/PG_Events.ts");
/* harmony import */ var _PG_Magnet__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PG_Magnet */ "./src/Blockly/Blocks/PG/PG_Magnet.ts");
/* harmony import */ var _PG_Actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./PG_Actions */ "./src/Blockly/Blocks/PG/PG_Actions.ts");
/* harmony import */ var _Common_Operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Common_Operators */ "./src/Blockly/Blocks/Common_Operators.ts");
/* harmony import */ var _PG_Variables__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./PG_Variables */ "./src/Blockly/Blocks/PG/PG_Variables.ts");
/* harmony import */ var _PG_Operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./PG_Operators */ "./src/Blockly/Blocks/PG/PG_Operators.ts");
/* harmony import */ var _PG_Looks__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./PG_Looks */ "./src/Blockly/Blocks/PG/PG_Looks.ts");
/* harmony import */ var _PG_Sounds__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./PG_Sounds */ "./src/Blockly/Blocks/PG/PG_Sounds.ts");
/* harmony import */ var _V5_V5_Motion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../V5/V5_Motion */ "./src/Blockly/Blocks/V5/V5_Motion.ts");
/* harmony import */ var _V5_V5_Sensing__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../V5/V5_Sensing */ "./src/Blockly/Blocks/V5/V5_Sensing.ts");
/* harmony import */ var _V5_V5_Event__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../V5/V5_Event */ "./src/Blockly/Blocks/V5/V5_Event.ts");
/* harmony import */ var _IQ_IQ_Motion__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../IQ/IQ_Motion */ "./src/Blockly/Blocks/IQ/IQ_Motion.ts");
/* harmony import */ var _IQ_IQ_Sensing__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../IQ/IQ_Sensing */ "./src/Blockly/Blocks/IQ/IQ_Sensing.ts");
/* harmony import */ var _IQ_IQ_Event__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../IQ/IQ_Event */ "./src/Blockly/Blocks/IQ/IQ_Event.ts");
/* harmony import */ var _IQ_IQ_Looks__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../IQ/IQ_Looks */ "./src/Blockly/Blocks/IQ/IQ_Looks.ts");
/* harmony import */ var _123_VEX_123_Action__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../123/VEX_123_Action */ "./src/Blockly/Blocks/123/VEX_123_Action.ts");
/* harmony import */ var _123_VEX_123_Event__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../123/VEX_123_Event */ "./src/Blockly/Blocks/123/VEX_123_Event.ts");
/* harmony import */ var _123_VEX_123_Sounds__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../123/VEX_123_Sounds */ "./src/Blockly/Blocks/123/VEX_123_Sounds.ts");
/* harmony import */ var _123_VEX_123_Sensing__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../123/VEX_123_Sensing */ "./src/Blockly/Blocks/123/VEX_123_Sensing.ts");
/* harmony import */ var _123_VEX_123_Looks__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../123/VEX_123_Looks */ "./src/Blockly/Blocks/123/VEX_123_Looks.ts");
// just to make sure we have blockly defined first






















// V5 imports



// IQ imports




// 123 imports





function createPGBaseBlocks() {
  Object(_Common_Strings__WEBPACK_IMPORTED_MODULE_0__["setCommonBlocklyStrings"])();
  Object(_Common_Variables__WEBPACK_IMPORTED_MODULE_1__["createCommonListBlocks"])();
  Object(_Common_Inputs__WEBPACK_IMPORTED_MODULE_3__["createCommonInputBlocks"])();
  Object(_Common_Events__WEBPACK_IMPORTED_MODULE_2__["createCommonEventBlocks"])();
  Object(_Common_Controls__WEBPACK_IMPORTED_MODULE_4__["createCommonControlBlocks"])();
  Object(_Common_Operators__WEBPACK_IMPORTED_MODULE_15__["createCommonOperatorBlocks"])();
  Object(_Common_Looks__WEBPACK_IMPORTED_MODULE_5__["createCommonLooksBlocks"])();
  Object(_Common_Procedures__WEBPACK_IMPORTED_MODULE_6__["createCommonProcedures"])();
  Object(_Common_Procedures__WEBPACK_IMPORTED_MODULE_6__["createAugmentedProcedures"])();
  Object(_CommentBlock__WEBPACK_IMPORTED_MODULE_7__["createcommentBlocks"])();

  // Add actual blocks for Playground
  Object(_PG_Variables__WEBPACK_IMPORTED_MODULE_16__["createpgVariableBlocks"])();
  Object(_PG_Operators__WEBPACK_IMPORTED_MODULE_17__["createOperatorBlocks"])();
  Object(_PG_Looks__WEBPACK_IMPORTED_MODULE_18__["createLooksBlocks"])();
  Object(_PG_Sounds__WEBPACK_IMPORTED_MODULE_19__["createSoundsBlocks"])();
  Object(_PG_Control__WEBPACK_IMPORTED_MODULE_9__["createControlBlocks"])();
  Object(_PG_Events__WEBPACK_IMPORTED_MODULE_12__["createEventBlocks"])();
  Object(_PG_Sensing__WEBPACK_IMPORTED_MODULE_10__["createSensingBlocks"])();
  Object(_PG_Drivetrain__WEBPACK_IMPORTED_MODULE_11__["createDrivetrainBlocks"])();
  Object(_PG_Magnet__WEBPACK_IMPORTED_MODULE_13__["createMagnetBlocks"])();
  Object(_PG_Actions__WEBPACK_IMPORTED_MODULE_14__["createActionBlocks"])();
  Object(_Common_MixedMode__WEBPACK_IMPORTED_MODULE_8__["createMixedModeBlocks"])();

  // Add v5 blocks for VRC Playgrounds
  _V5_V5_Motion__WEBPACK_IMPORTED_MODULE_20__["createMotionBlocks"]();
  _V5_V5_Sensing__WEBPACK_IMPORTED_MODULE_21__["createSensingBlocks"]();
  _V5_V5_Event__WEBPACK_IMPORTED_MODULE_22__["createEventsBlocks"]();
  // Add iq blocks for VIQC Playgrounds
  _IQ_IQ_Motion__WEBPACK_IMPORTED_MODULE_23__["createMotionBlocks"]();
  _IQ_IQ_Sensing__WEBPACK_IMPORTED_MODULE_24__["createSensingBlocks"]();
  _IQ_IQ_Event__WEBPACK_IMPORTED_MODULE_25__["createEventsBlocks"]();
  _IQ_IQ_Looks__WEBPACK_IMPORTED_MODULE_26__["createLooksBlocks"]();
  // Add 123 blocks for 123 Playgrounds
  _123_VEX_123_Action__WEBPACK_IMPORTED_MODULE_27__["createActionBlocks"]();
  _123_VEX_123_Event__WEBPACK_IMPORTED_MODULE_28__["createEventsBlocks"]();
  _123_VEX_123_Sounds__WEBPACK_IMPORTED_MODULE_29__["createSoundsBlocks"]();
  _123_VEX_123_Sensing__WEBPACK_IMPORTED_MODULE_30__["createSensingBlocks"]();
  _123_VEX_123_Looks__WEBPACK_IMPORTED_MODULE_31__["createLooksBlocks"]();
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Control.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Control.ts ***!
  \*********************************************/
/*! exports provided: createControlBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createControlBlocks", function() { return createControlBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createControlBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_wait"] = {
    /**
     * Block to wait until a condition becomes true.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_control_wait"),
        args0: [{
          type: "input_value",
          name: "DURATION",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_repeat"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_repeat"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_forever"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_forever"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_if_then"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_if_then_else"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if_else"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_if_elseif_else"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if_elseif_else"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_wait_until"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_wait_until"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_repeat_until"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_repeat_until"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_break"] = {
    /**
     * Block to break out of loop.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_control_break"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_while"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_while"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_control_stop_project"] = {
    /**
     * Block to stop project.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_control_stop_project"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.control,
        style: "control_blocks",
        extensions: ["shape_end", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Drivetrain.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Drivetrain.ts ***!
  \************************************************/
/*! exports provided: createDrivetrainBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDrivetrainBlocks", function() { return createDrivetrainBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PG_Dropdown */ "./src/Blockly/Blocks/PG/PG_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PG Motion blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals



// locals

function createDrivetrainBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_drive"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_drive"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_drive_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_drive_for"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION"), {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["driveUnits"]("UNITS"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["go_drivetrain_drive_until"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:go_drivetrain_drive_until"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["driveUntilUnits"]("OBSTACLES"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_drive_to_object"] = {
    /**
     * Block to drive robot to closest selected object with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_drive_to_object"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT", false), {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        catepgry: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_turn"] = {
    /**
     * Block to turn drivetrain body.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_turn"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["turnDirection"]("TURNDIRECTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_turn_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_turn_for"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["turnDirection"]("TURNDIRECTION"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_turn_to_object"] = {
    /**
     * Block to turn robot to closest selected object with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_turn_to_object"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT", false), {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        catepgry: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_turn_to_heading"] = {
    /**
     * Block to turn robot to absolute heading with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_turn_to_heading"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_turn_to_rotation"] = {
    /**
     * Block to turn robot to a relative rotation with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_turn_to_rotation"),
        args0: [{
          type: "input_value",
          name: "ROTATION",
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_go_to_object"] = {
    /**
     * Block to move robot to closest selected object with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_go_to_object"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT", false), {
          type: "field_mutatortoggle",
          name: "anddontwait_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_block_and_dont_wait")
        }],
        catepgry: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_stop_driving"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_stop_driving"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_set_drive_velocity"] = {
    /**
     * Block to set drivetrain velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_set_drive_velocity"),
        args0: [{
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_set_turn_velocity"] = {
    /**
     * Block to set drivetrain turn velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_set_turn_velocity"),
        args0: [{
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_set_drive_heading"] = {
    /**
     * Block to set drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_set_drive_heading"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_set_drive_rotation"] = {
    /**
     * Block to set drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_set_drive_rotation"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_drivetrain_set_drive_timeout"] = {
    /**
     * Block to set drivetrain timeout.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_drivetrain_set_drive_timeout"),
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
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Dropdown.ts":
/*!**********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Dropdown.ts ***!
  \**********************************************/
/*! exports provided: bumperList, opticalSensorList, rgbList, enhancedDistanceSensors, rotationUnits, currentUnits, driveUnits, distanceUnits, driveUntilUnits, velocityUnits, locationPos, spinDirection, turnDirection, penDirection, brakeMode, colors, sensingColors, penColors, eventsDropdown, penWidths, magnetActions, magnetList, foodActions, enemyActions, smellables, seeables, homeDataOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bumperList", function() { return bumperList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opticalSensorList", function() { return opticalSensorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbList", function() { return rgbList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhancedDistanceSensors", function() { return enhancedDistanceSensors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationUnits", function() { return rotationUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentUnits", function() { return currentUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "driveUnits", function() { return driveUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceUnits", function() { return distanceUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "driveUntilUnits", function() { return driveUntilUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocityUnits", function() { return velocityUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationPos", function() { return locationPos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spinDirection", function() { return spinDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turnDirection", function() { return turnDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "penDirection", function() { return penDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brakeMode", function() { return brakeMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sensingColors", function() { return sensingColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "penColors", function() { return penColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsDropdown", function() { return eventsDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "penWidths", function() { return penWidths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnetActions", function() { return magnetActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnetList", function() { return magnetList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foodActions", function() { return foodActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enemyActions", function() { return enemyActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smellables", function() { return smellables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "seeables", function() { return seeables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homeDataOptions", function() { return homeDataOptions; });
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PG_ConfigData */ "./src/Blockly/PG_ConfigData.ts");
// we need blockly since we are extending the definitions...

// globals



// locals
// Depending on the context we need to check the correct location for the robot model
function getRobotModel() {
  if (self.VMWorkerAPI) {
    return self.VMWorkerAPI.getRobotModel();
  } else {
    return _AppInfo__WEBPACK_IMPORTED_MODULE_0__["appState"].getAppState().robotModel;
  }
}

//#region "devices"
/**
 * List of bumpers are currently hard-coded to a default.
 * Needs to be updated to be dynamic once config is set up.
 */
function bumperList(fieldName) {
  var options = function options() {
    return Object(_PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"])("bumper");
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function opticalSensorList(fieldName) {
  var options = function options() {
    return Object(_PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"])("eye");
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function enhancedDistanceSensors(fieldName) {
  var options = function options() {
    return Object(_PG_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getListOptionsForType"])("distance");
  };
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function rgbList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blue"), "blue"]]
  };
}
//#endregion

//#region "units"
function rotationUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_rotation_units_degrees"), "deg"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_rotation_units_turns"), "rev"]]
  };
}
function locationPos(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["X", "X"], ["Y", "Y"]]
  };
}
function currentUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["%", "PERCENT"], ["amps", "AMPS"]]
  };
}
function driveUnits(fieldName) {
  var robotModel = getRobotModel();
  return {
    type: "field_dropdown",
    name: fieldName,
    options: robotModel !== "vr123" ? [["mm", "mm"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_distance_units_inches"), "in"]] : [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_distance_units_steps"), "steps"], ["mm", "mm"]]
  };
}
function distanceUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["mm", "mm"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_distance_units_inches"), "inches"]]
  };
}
function velocityUnits(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [["%", "pct"], ["rpm", "rpm"]]
  };
}

//#endregion

//#region "options"
function spinDirection(fieldName) {
  var forwardOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_motor_direction_forward"), "fwd"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_motor_direction_reverse"), "rev"]];
  if (forwardOnly) {
    options.pop();
  }
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function turnDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_turn_direction_left"), "left"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_turn_direction_right"), "right"]]
  };
}
function driveUntilUnits(fieldName) {
  var robotModel = getRobotModel();
  return {
    type: "field_dropdown",
    name: fieldName,
    options: robotModel === "vrGO" ? [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_obstacle_object"), "object"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_obstacle_crash"), "crash"]] : [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_obstacle_object"), "object"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_obstacle_crash"), "crash"]
    // [i18n.t("blockly:com_options_obstacle_line"), "line"],
    ]
  };
}

function penDirection(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_direction_down"), "down"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_direction_up"), "up"]]
  };
}
function brakeMode(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_brake_mode_brake"), "brake"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_brake_mode_coast"), "coast"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_options_brake_mode_hold"), "hold"]]
  };
}
function colors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_off"), "off"]]
  };
}
function sensingColors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_blue"), "blue"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_none"), "none"]]
  };
}
function penColors(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_black"), "black"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_red"), "red"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_green"), "green"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_colors_blue"), "blue"]]
  };
}
function penWidths(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_width_extra_thin"), "extra_thin"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_width_thin"), "thin"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_width_medium"), "medium"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_width_wide"), "wide"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_width_extra_wide"), "extra_wide"]]
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

function magnetList(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("Magnet"), "Magnet"]]
  };
}
function magnetActions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:go_magnet_boost"), "boost"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:go_magnet_drop"), "drop"]]
  };
}
function foodActions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:actions_pickup"), "pickup"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:actions_drop"), "drop"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:actions_use"), "use"]]
  };
}
function enemyActions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:actions_absorb"), "absorb_radiation"]]
  };
}
function smellables(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:minerals"), "minerals"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:enemy"), "enemy"]]
  };
}
function seeables(fieldName) {
  var includeLarge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var includeRover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var options = [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:minerals"), "minerals"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:enemy"), "enemy"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:base"), "base"]];
  if (includeLarge) {
    options.push([_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:obstacle"), "obstacle"]);
    options.push([_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:hazard"), "hazard"]);
  }
  if (includeRover) {
    options.push([_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:rover"), "rover"]);
  }
  return {
    type: "field_dropdown",
    name: fieldName,
    options: options
  };
}
function homeDataOptions(fieldName) {
  return {
    type: "field_dropdown",
    name: fieldName,
    options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:direction"), "angle"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:distance"), "distance"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:x_location"), "x"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:y_location"), "y"]]
  };
}

// function batteryStorageOptions(fieldName: string) {
//   return {
//     type: "field_dropdown",
//     name: fieldName,
//     options: [
//       [i18n.t("blockly:food_storage_home"), "base"],
//       [i18n.t("blockly:food_storage_back"), "storage"],
//     ],
//   };
// }
//#endregion



/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Events.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Events.ts ***!
  \********************************************/
/*! exports provided: createEventBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventBlocks", function() { return createEventBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_Dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PG_Dropdown */ "./src/Blockly/Blocks/PG/PG_Dropdown.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createEventBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_when_started"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["event_started"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_when_bumper"] = {
    /**
     * Block to define bumper pressed/released event.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_events_when_bumper"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_2__["bumperList"]("BUMPER"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_when_timer"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_timer"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_when_broadcasted"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_when_broadcasted"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_broadcast"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_broadcast_and_wait"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["com_events_broadcast_and_wait"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_optical_detect_object"] = {
    /**
     * Block to define optical detects/loses an object.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_events_optical_detect_object"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_2__["opticalSensorList"]("OPTICAL"), {
          type: "field_dropdown",
          name: "OPTIONS",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_optical_detect"), "detects"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_optical_loses"), "loses"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_when_under_attack"] = {
    /**
     * Block to an event block that runs when the robot comes under attack.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_events_when_under_attack"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_events_when_level_up"] = {
    /**
     * Block to an event block that runs when the robot levels up.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:pg_events_when_level_up"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.event,
        style: "event_blocks_hat",
        extensions: ["shape_hat", "context_menu_convert", "context_menu_convert_dummy"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Looks.ts":
/*!*******************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Looks.ts ***!
  \*******************************************/
/*! exports provided: createLooksBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLooksBlocks", function() { return createLooksBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PG_Dropdown */ "./src/Blockly/Blocks/PG/PG_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PG Looks blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createLooksBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_set_bumper"] = {
    /**
     * Block to set bumper color.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_set_bumper"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["bumperList"]("BUMPER"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["colors"]("COLORS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_move_pen"] = {
    /**
     * Block to move pen up or down.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_move_pen"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["penDirection"]("DIRECTIONS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_set_pen_color"] = {
    /**
     * Block to move pen up or down.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_set_pen_color"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["penColors"]("COLORS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_set_pen_width"] = {
    /**
     * Block to move pen up or down.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_set_pen_width"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["penWidths"]("WIDTHS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_set_pen_color_plus"] = {
    /**
     * Block to change pen color with sliders
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_set_pen_color_plus"),
        args0: [{
          type: "input_value",
          name: "COLOR",
          check: "Colour"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_fill_color_plus"] = {
    /**
     * Block to paint a fill with the given color
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_looks_fill_color_plus"),
        args0: [{
          type: "input_value",
          name: "COLOR",
          check: "Colour"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_looks_print_virtual"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_print"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_looks_next_row_virtual"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_next_row"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_looks_set_print_precision_virtual"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_precision"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_looks_clear_all_rows_virtual"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_clear_all_rows"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_set_print_color"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_color"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_print"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_print"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_set_print_precision"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_set_print_precision"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_clear_all_rows"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_clear_all_rows"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_looks_next_row"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["looks_next_row"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Magnet.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Magnet.ts ***!
  \********************************************/
/*! exports provided: createMagnetBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMagnetBlocks", function() { return createMagnetBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PG_Dropdown */ "./src/Blockly/Blocks/PG/PG_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PG Magnet blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createMagnetBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_magnet_set_magnet_state"] = {
    /**
     * Block to control magnet.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_magnet_set_magnet_state"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["magnetList"]("MAGNET"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["magnetActions"]("ACTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.magnet,
        style: "magnet_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Operators.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Operators.ts ***!
  \***********************************************/
/*! exports provided: createOperatorBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOperatorBlocks", function() { return createOperatorBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
// we need blockly since we are extending the definitions...


// globals

// locals

function createOperatorBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_add"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_add"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_subtract"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_subtract"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_multiply"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_multiply"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_divide"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_divide"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_random"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_random"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_greater_than"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_greater_than"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_less_than"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_less_than"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_equal_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_equal_to"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_and"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_and"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_or"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_or"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_not"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_not"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_round"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_round"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_function"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_function"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_operator_remainder"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_remainder"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Sensing.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Sensing.ts ***!
  \*********************************************/
/*! exports provided: createSensingBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSensingBlocks", function() { return createSensingBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PG_Dropdown */ "./src/Blockly/Blocks/PG/PG_Dropdown.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("go Motion blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createSensingBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_reset_timer"] = {
    /**
     * Block to reset brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_reset_timer"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        style: "sensing_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_timer_value"] = {
    /**
     * Block to get brain timer value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_timer_value"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_drive_is_done"] = {
    /**
     * Block to check if drivetrain is done.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_drive_is_done"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_drive_is_moving"] = {
    /**
     * Block to check if drivetrain is moving.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_drive_is_moving"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_drive_heading"] = {
    /**
     * Block to drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_drive_heading"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_drive_rotation"] = {
    /**
     * Block to drivetrain rotation.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_drive_rotation"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_bumper"] = {
    /**
     * Block to detect metal with the electromagnet.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_bumper"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["bumperList"]("BUMPER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };

  // Blockly.Blocks["pg_sensing_distance_found"] = {
  //   /**
  //    * Block to check if object is in front of the distance sensor.
  //    * @this Blockly.Block
  //    */
  //   init() {
  //     this.jsonInit({
  //       message0: i18n.t("blockly:pg_sensing_distance_found"),
  //       args0: [],
  //       category: Blockly.Categories.sensing,
  //       checkboxInFlyout: true,
  //       extensions: ["colours_sensing", "output_boolean"],
  //     });
  //   },
  // };

  // Blockly.Blocks["pg_sensing_distance_distance"] = {
  //   /**
  //    * Block to distance sensor distance.
  //    * @this Blockly.Block
  //    */
  //   init() {
  //     this.jsonInit({
  //       message0: i18n.t("blockly:pg_sensing_distance_distance"),
  //       args0: [
  //         pg_Dropdowns.distanceUnits("UNITS"),
  //       ],
  //       category: Blockly.Categories.sensing,
  //       checkboxInFlyout: true,
  //       extensions: ["colours_sensing", "output_number"],
  //     });
  //   },
  // };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_distance_found"] = {
    /**
     * Block to check if object is in front of the distance sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_distance_found"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["enhancedDistanceSensors"]("DISTANCE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_distance_distance"] = {
    /**
     * Block to distance sensor distance.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_distance_distance"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["enhancedDistanceSensors"]("DISTANCE"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_optical_near_object"] = {
    /**
     * Block to check if object is in front of the optical sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_optical_near_object"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["opticalSensorList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_optical_color"] = {
    /**
     * Block to check color of the object from optical sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_optical_color"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["opticalSensorList"]("OPTICAL"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["sensingColors"]("COLORS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_optical_color_plus"] = {
    /**
     * Block to check color of the object from optical sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_optical_color_plus"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["opticalSensorList"]("OPTICAL"), {
          type: "input_value",
          name: "COLOR1",
          check: "Colour"
        }, {
          type: "input_value",
          name: "COLOR2",
          check: "Colour"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_optical_rgb_plus"] = {
    /**
     * Block to check color of the object from optical sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_optical_rgb_plus"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["opticalSensorList"]("OPTICAL"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["rgbList"]("RGB")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_optical_brightness"] = {
    /**
     * Block to brightness of the object from optical sensor.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_optical_brightness"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["opticalSensorList"]("OPTICAL")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_position"] = {
    /**
     * Block to location.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_position"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["locationPos"]("LOCATION"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_position_angle"] = {
    /**
     * Block to location angle.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_position_angle"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_under_attack"] = {
    /**
     * Block that reports if the robot is currently under attack.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_under_attack"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_ai_smells"] = {
    /**
     * Block that reports if AI smells something.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_ai_smells"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["smellables"]("OBJECT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_ai_sees"] = {
    /**
     * Block that reports if AI sees something.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_ai_sees"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_ai_smells_direction"] = {
    /**
     * Block that reports the direction of the closest instance of a smelled entity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_ai_smells_direction"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["smellables"]("OBJECT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_ai_sees_direction"] = {
    /**
     * Block that reports the direction of the closest instance of a seen entity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_ai_sees_direction"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT", false)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_ai_sees_distance"] = {
    /**
     * Block that reports the distance of the closest instance of a seen entity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_ai_sees_distance"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNIT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_ai_sees_location"] = {
    /**
     * Block that reports the location of the closest instance of a seen entity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_ai_sees_location"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["seeables"]("OBJECT", true, true), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["locationPos"]("AXIS"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNIT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_home_direction"] = {
    /**
     * Block that reports direction information about home.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_home_direction"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_home_distance"] = {
    /**
     * Block that reports distance information about home.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_home_distance"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNIT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_home_location"] = {
    /**
     * Block that reports location information about home.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_home_location"),
        args0: [_PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["locationPos"]("AXIS"), _PG_Dropdown__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNIT")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_robot_battery_capacity"] = {
    /**
     * Block that reports information about a nano's battery capacity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_robot_battery_capacity"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_robot_minerals_stored"] = {
    /**
     * Block that reports information about a nano's stored batteries.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_robot_minerals_stored"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };

  // Blockly.Blocks["pg_sensing_nano_location"] = {
  //   /**
  //    * Block that reports information about a nano's location.
  //    * @this Blockly.Block
  //    */
  //   init() {
  //     this.jsonInit({
  //       message0: i18n.t("blockly:pg_sensing_nano_location"),
  //       args0: [
  //         pg_Dropdowns.locationPos("AXIS"),
  //         pg_Dropdowns.distanceUnits("UNIT"),
  //       ],
  //       category: Blockly.Categories.sensing,
  //       checkboxInFlyout: true,
  //       extensions: ["colours_sensing", "output_number"],
  //     });
  //   },
  // };

  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_robot_level"] = {
    /**
     * Block that reports information about a nano's level.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_robot_level"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_robot_exp"] = {
    /**
     * Block that reports information about a nano's exp.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_robot_exp"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_robot_carry_capacity"] = {
    /**
     * Block that reports information about a nano's carry capacity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_robot_carry_capacity"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_enemy_level"] = {
    /**
     * Block that reports information about an enemy's level.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_enemy_level"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sensing_enemy_charge"] = {
    /**
     * Block that reports information about an enemy's health/charge.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sensing_enemy_charge"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_number", "context_menu_convert_output_number", "enable_monitor"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["go_sensing_crash"] = {
    /**
     * Block to get color sensor greyscale value.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:go_sensing_crash"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sensing,
        checkboxInFlyout: true,
        style: "sensing_blocks",
        extensions: ["output_boolean", "context_menu_convert_output_boolean", "enable_monitor"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Sounds.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Sounds.ts ***!
  \********************************************/
/*! exports provided: createSoundsBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSoundsBlocks", function() { return createSoundsBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("PG Sound blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createSoundsBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["pg_sounds_play_sound"] = {
    /**
     * Block to play a sound.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sounds_play_sound"),
        args0: [{
          type: "field_dropdown",
          name: "SOUND",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sounds_a"), "sounda"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sounds_b"), "soundb"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sounds_c"), "soundc"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sounds_d"), "soundd"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:pg_sounds_e"), "sounde"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.sound,
        style: "sounds_blocks",
        extensions: ["shape_statement"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/PG/PG_Variables.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/PG/PG_Variables.ts ***!
  \***********************************************/
/*! exports provided: createpgVariableBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createpgVariableBlocks", function() { return createpgVariableBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
// we need blockly since we are extending the definitions...


// globals


// locals

function createpgVariableBlocks() {
  //#region "variables"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_variable_with_checkbox"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_set_variable"] = {
    /**
     * Block to set variable to a certain value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_variable_to"),
        args0: [{
          type: "field_variable",
          name: "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE
        }, {
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_change_variable"] = {
    /**
     * Block to change variable by a certain value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_change_variable_by"),
        args0: [{
          type: "field_variable",
          name: "VARIABLE",
          "variableTypes": [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].SCALAR_VARIABLE_TYPE
        }, {
          type: "input_value",
          name: "VALUE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  //#endregion

  //#region "booleans"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_boolean_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_bool_variable_with_checkbox"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_set_boolean_variable"] = {
    /**
     * Block to set boolean variable to a certain value
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_boolean_variable"),
        args0: [{
          type: "field_variable",
          name: "VARIABLE",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].BOOL_VARIABLE_TYPE
        }, {
          type: "input_value",
          name: "VALUE",
          check: "Boolean"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.data,
        style: "data_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };

  /**
   * Construct and add a pg_variables_boolean_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBoolVariable = function (xmlList, variable) {
    // <block id="variableId" type="pg_variables_boolean_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_boolean_variable", "VARIABLE");
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute("id", variable.getId());
  };

  /**
   * Construct and add a pg_variables_set_boolean_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetBoolVariableTo = function (xmlList, variable) {
    // <block type="pg_variables_set_boolean_variable" gap="20">
    //   <value name="VARIABLE">
    //    <shadow type="data_variablemenu"></shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="bool_input">
    //       <field name="VALUE">0</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_set_boolean_variable", "VARIABLE", ["VALUE", "bool_input", "true"]);
  };
  //#endregion

  //#region "list"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_item_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_itemoflist"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_set_item_of_array"] = {
    /**
     * Block to insert item to list.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_item_of_array"),
        args0: [{
          type: "input_value",
          name: "INDEX",
          check: "Number"
        }, {
          type: "field_variable",
          name: "LIST",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE
        }, {
          type: "input_value",
          name: "ITEM",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_set_array_to"] = {
    /**
     * Block to list contents.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_variables_set_array_to"),
        args0: [{
          type: "field_variable",
          name: "LIST",
          variableTypes: [_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE],
          defaultType: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].LIST_VARIABLE_TYPE
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.dataLists,
        style: "data_lists_blocks",
        extensions: ["shape_statement", "context_menu_convert"],
        mutator: "data_set_list_contents_mutator"
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_size_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_lengthoflist"];
  // Blockly.Blocks["pg_variables_"] = Blockly.Blocks["control_wait"];

  /**
   * Construct and add a data_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addDataVariable = function (xmlList, variable) {
    // <block id="variableId" type="data_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_variable", "VARIABLE");
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute("id", variable.getId());
  };

  /**
   * Construct and add a data_setvariableto block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetVariableTo = function (xmlList, variable) {
    // <block type="data_setvariableto" gap="20">
    //   <value name="VARIABLE">
    //    <shadow type="data_variablemenu"></shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="text">
    //       <field name="TEXT">0</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_set_variable", "VARIABLE", ["VALUE", "math_number", "0"]);
  };

  /**
   * Construct and add a data_changevariableby block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addChangeVariableBy = function (xmlList, variable) {
    // <block type="data_changevariableby">
    //   <value name="VARIABLE">
    //    <shadow type="data_variablemenu"></shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="math_number">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_change_variable", "VARIABLE", ["VALUE", "math_number", "1"]);
  };

  /**
   * Construct and add a data_addtolist block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetList = function (xmlList, variable) {
    // <block type="data_listsetvalue">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_set_array_to", "LIST");
  };

  /**
   * Construct and add a data_replaceitemoflist block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addReplaceItemOfList = function (xmlList, variable) {
    // <block type="data_replaceitemoflist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="INDEX">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    //   <value name="math_integer">
    //     <shadow type="text">
    //       <field name="TEXT">thing</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_set_item_of_array", "LIST", ["INDEX", "math_integer", "1"], ["ITEM", "math_integer", "1"]);
  };

  /**
   * Construct and add a data_itemoflist block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addItemOfList = function (xmlList, variable) {
    // <block type="data_itemoflist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="INDEX">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_item_of_array", "LIST", ["INDEX", "math_integer", "1"]);
  };

  /**
   * Construct and add a pg_variables_size_of_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addLengthOfList = function (xmlList, variable) {
    // <block type="pg_variables_size_of_array">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_size_of_array", "LIST");
  };
  //#endregion

  //#region "2d arrays"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_item_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_itemof2darray"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_set_item_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setitemof2darray"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_set_2d_array_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_set2darrayto"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["pg_variables_length_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_lengthof2darray"];

  /**
   * Construct and add a pg_variables_item_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addItemOf2DArray = function (xmlList, variable) {
    // <block type="pg_variables_item_of_2d_array">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    //   <value name="ROW">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    //   <value name="COLUMN">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_item_of_2d_array", "ARRAY", ["ROW", "math_integer", "1"], ["COLUMN", "math_integer", "1"]);
  };

  /**
   * Construct and add a pg_variables_set_item_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetItemOf2DArray = function (xmlList, variable) {
    // <block type="pg_variables_set_item_of_2d_array">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    //   <value name="ROW">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    //   <value name="COLUMN">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_set_item_of_2d_array", "ARRAY", ["ROW", "math_integer", "1"], ["COLUMN", "math_integer", "1"], ["VALUE", "math_integer", "1"]);
  };

  /**
   * Construct and add a pg_variables_set_2d_array_to block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSet2DArrayTo = function (xmlList, variable) {
    // <block type="pg_variables_set_2d_array_to">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_set_2d_array_to", "ARRAY");
    // Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_set2darrayto', 'LIST',
    //     ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
  };

  /**
   * Construct and add a pg_variables_length_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addLengthOf2DArray = function (xmlList, variable) {
    // <block type="pg_variables_length_of_2d_array">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "pg_variables_length_of_2d_array", "ARRAY");
  };
  //#endregion
}



/***/ })

});
//# sourceMappingURL=b9c5c549df007da14db7.5.bundle.js.map