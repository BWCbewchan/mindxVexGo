this["webpackChunkwebapp"]([6],{

/***/ "./src/Blockly/Blocks/V5/V5_Arm.ts":
/*!*****************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Arm.ts ***!
  \*****************************************/
/*! exports provided: createArmBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArmBlocks", function() { return createArmBlocks; });
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rm-vca/logger */ "./node_modules/@rm-vca/logger/dist/index.js");
/* harmony import */ var _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("V5 Arm blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createArmBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_linear_move"] = {
    /**
     * Block to linear move arm.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_linear_move"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
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
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_linear_moveangle"] = {
    /**
     * Block to linear move arm.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_linear_moveangle"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
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
        }, {
          type: "input_value",
          name: "ANGLE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_joint_move"] = {
    /**
     * Block to joint move arm.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_joint_move"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
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
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_joint_moveangle"] = {
    /**
     * Block to joint move arm.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_joint_moveangle"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
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
        }, {
          type: "input_value",
          name: "ANGLE",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_setangle"] = {
    /**
     * Block to joint move arm.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_setangle"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "field_dropdown",
          name: "ANGLE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_down"), "down"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_up"), "up"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_enter_mastering_mode"] = {
    /**
     * Block to set arm mastering values.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_enter_mastering_mode"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_mastering"] = {
    /**
     * Block to set arm mastering values.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_set_mastering"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "input_value",
          name: "J1",
          check: "Number"
        }, {
          type: "input_value",
          name: "J2",
          check: "Number"
        }, {
          type: "input_value",
          name: "J3",
          check: "Number"
        }, {
          type: "input_value",
          name: "J4",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_tool"] = {
    /**
     * Block to set arm r offset.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_set_tool"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "field_dropdown",
          name: "TOOL",
          options: [["none", "none"], ["electromagnet", "electromagnet"], ["marker", "marker"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_enable_manual_movement"] = {
    /**
     * Block to set arm r offset.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_enable_manual_movement"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_linear_speed"] = {
    /**
     * Block to set arm linear movement speed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "set %1 linear movement speed to %2",
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "input_value",
          name: "SPEED",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_joint_speed"] = {
    /**
     * Block to set arm linear movement speed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: "set %1 joint movement speed to %2",
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "input_value",
          name: "SPEED",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_linear_move_speed"] = {
    /**
     * Block to set arm linear movement speed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_set_linear_move_speed"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "field_dropdown",
          name: "SPEED",
          options: [["slow", "slow"], ["normal", "normal"], ["fast", "fast"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_joint_move_speed"] = {
    /**
     * Block to set arm joint movement speed.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_set_joint_move_speed"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM"), {
          type: "field_dropdown",
          name: "SPEED",
          options: [["slow", "slow"], ["normal", "normal"], ["fast", "fast"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_activate_emergency_stop"] = {
    /**
     * Block to activate emergency stop.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_arm_activate_emergency_stop"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_arm_set_origin"] = {
    /**
     * Block to set arm's current position to 0,0,0.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_sensing_arm_set_origin"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["armList"]("ARM")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.arm,
        style: "arm_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_BaseBlocks.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_BaseBlocks.ts ***!
  \************************************************/
/*! exports provided: createV5BaseBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createV5BaseBlocks", function() { return createV5BaseBlocks; });
/* harmony import */ var _Common_Strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common_Strings */ "./src/Blockly/Blocks/Common_Strings.ts");
/* harmony import */ var _Common_Variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common_Variables */ "./src/Blockly/Blocks/Common_Variables.ts");
/* harmony import */ var _Common_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common_Events */ "./src/Blockly/Blocks/Common_Events.ts");
/* harmony import */ var _Common_Controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common_Controls */ "./src/Blockly/Blocks/Common_Controls.ts");
/* harmony import */ var _Common_Operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common_Operators */ "./src/Blockly/Blocks/Common_Operators.ts");
/* harmony import */ var _Common_Inputs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common_Inputs */ "./src/Blockly/Blocks/Common_Inputs.ts");
/* harmony import */ var _CommentBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommentBlock */ "./src/Blockly/Blocks/CommentBlock.ts");
/* harmony import */ var _Common_Procedures__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Common_Procedures */ "./src/Blockly/Blocks/Common_Procedures.ts");
/* harmony import */ var _V5_Motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./V5_Motion */ "./src/Blockly/Blocks/V5/V5_Motion.ts");
/* harmony import */ var _V5_Drivetrain__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./V5_Drivetrain */ "./src/Blockly/Blocks/V5/V5_Drivetrain.ts");
/* harmony import */ var _V5_Looks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./V5_Looks */ "./src/Blockly/Blocks/V5/V5_Looks.ts");
/* harmony import */ var _V5_Sounds__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./V5_Sounds */ "./src/Blockly/Blocks/V5/V5_Sounds.ts");
/* harmony import */ var _V5_Event__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./V5_Event */ "./src/Blockly/Blocks/V5/V5_Event.ts");
/* harmony import */ var _V5_Control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./V5_Control */ "./src/Blockly/Blocks/V5/V5_Control.ts");
/* harmony import */ var _V5_Sensing__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./V5_Sensing */ "./src/Blockly/Blocks/V5/V5_Sensing.ts");
/* harmony import */ var _V5_Operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./V5_Operators */ "./src/Blockly/Blocks/V5/V5_Operators.ts");
/* harmony import */ var _V5_Variables__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./V5_Variables */ "./src/Blockly/Blocks/V5/V5_Variables.ts");
/* harmony import */ var _V5_Magnet__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./V5_Magnet */ "./src/Blockly/Blocks/V5/V5_Magnet.ts");
/* harmony import */ var _V5_Arm__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./V5_Arm */ "./src/Blockly/Blocks/V5/V5_Arm.ts");
// just to make sure we have blockly defined first




















function createV5BaseBlocks() {
  Object(_Common_Strings__WEBPACK_IMPORTED_MODULE_0__["setCommonBlocklyStrings"])();

  // add the actual blocks
  Object(_Common_Variables__WEBPACK_IMPORTED_MODULE_1__["createCommonListBlocks"])();
  Object(_Common_Events__WEBPACK_IMPORTED_MODULE_2__["createCommonEventBlocks"])();
  Object(_Common_Controls__WEBPACK_IMPORTED_MODULE_3__["createCommonControlBlocks"])();
  Object(_Common_Operators__WEBPACK_IMPORTED_MODULE_4__["createCommonOperatorBlocks"])();
  Object(_Common_Inputs__WEBPACK_IMPORTED_MODULE_5__["createCommonInputBlocks"])();
  Object(_CommentBlock__WEBPACK_IMPORTED_MODULE_6__["createcommentBlocks"])();
  Object(_Common_Procedures__WEBPACK_IMPORTED_MODULE_7__["createCommonProcedures"])();
  Object(_Common_Procedures__WEBPACK_IMPORTED_MODULE_7__["createAugmentedProcedures"])();
  Object(_V5_Motion__WEBPACK_IMPORTED_MODULE_8__["createMotionBlocks"])();
  Object(_V5_Drivetrain__WEBPACK_IMPORTED_MODULE_9__["createDrivetrainBlocks"])();
  Object(_V5_Magnet__WEBPACK_IMPORTED_MODULE_17__["createMagnetBlocks"])();
  Object(_V5_Arm__WEBPACK_IMPORTED_MODULE_18__["createArmBlocks"])();
  Object(_V5_Looks__WEBPACK_IMPORTED_MODULE_10__["createLooksBlocks"])();
  Object(_V5_Sounds__WEBPACK_IMPORTED_MODULE_11__["createSoundsBlocks"])();
  Object(_V5_Event__WEBPACK_IMPORTED_MODULE_12__["createEventsBlocks"])();
  Object(_V5_Control__WEBPACK_IMPORTED_MODULE_13__["createControlBlocks"])();
  Object(_V5_Sensing__WEBPACK_IMPORTED_MODULE_14__["createSensingBlocks"])();
  Object(_V5_Operators__WEBPACK_IMPORTED_MODULE_15__["createOperatorBlocks"])();
  Object(_V5_Variables__WEBPACK_IMPORTED_MODULE_16__["createV5VariableBlocks"])();
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Control.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Control.ts ***!
  \*********************************************/
/*! exports provided: createControlBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createControlBlocks", function() { return createControlBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
// we need blockly since we are extending the definitions...


// globals

// locals

function createControlBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_wait"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_wait"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_repeat"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_repeat"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_forever"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_forever"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_if_then"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_if_then_else"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if_else"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_if_elseif_else"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if_elseif_else"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_wait_until"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_wait_until"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_repeat_until"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_repeat_until"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_while"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_while"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_break"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_break"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_control_stop_project"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_stop_project"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Drivetrain.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Drivetrain.ts ***!
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
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("V5 Drivetrain blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals

function createDrivetrainBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_drive"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_drive"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_drive_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_drive_for"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["spinDirection"]("DIRECTION"), {
          type: "input_value",
          name: "AMOUNT",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["distanceUnits"]("UNITS"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_turn"] = {
    /**
     * Block to turn drivetrain body.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_turn"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["turnDirection"]("TURNDIRECTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_turn_for"] = {
    /**
     * Block to spin motor specified direction and amount relative with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_turn_for"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["turnDirection"]("TURNDIRECTION"), {
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_turn_to_heading"] = {
    /**
     * Block to turn robot to absolute heading with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_turn_to_heading"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_turn_to_rotation"] = {
    /**
     * Block to turn robot to absolute heading with wait.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_turn_to_rotation"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_motion_stop_driving"] = {
    /**
     * Block to move steps.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_motion_stop_driving"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_set_drive_velocity"] = {
    /**
     * Block to set drivetrain velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_set_drive_velocity"),
        args0: [{
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_set_turn_velocity"] = {
    /**
     * Block to set drivetrain turn velocity.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_set_turn_velocity"),
        args0: [{
          type: "input_value",
          name: "VELOCITY",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["velocityUnits"]("UNITS")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_set_drive_stopping"] = {
    /**
     * Block to set drivetrain brake mode.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_set_drive_stopping"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["brakeMode"]("MODE")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.drivetrain,
        style: "drivetrain_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_set_drive_timeout"] = {
    /**
     * Block to set drivetrain timeout.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_set_drive_timeout"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_set_drive_heading"] = {
    /**
     * Block to set drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_set_drive_heading"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_drivetrain_set_drive_rotation"] = {
    /**
     * Block to set drivetrain heading.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_drivetrain_set_drive_rotation"),
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
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Looks.ts":
/*!*******************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Looks.ts ***!
  \*******************************************/
/*! exports provided: createLooksBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLooksBlocks", function() { return createLooksBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");
var _self$navigator;
// we need blockly since we are extending the definitions...


// globals



// locals


// This is pulled from platfromInfo.ts since we can't use window in webworkers and there is no point changing tha whole file for this
var isAndroid = ((_self$navigator = self.navigator) === null || _self$navigator === void 0 ? void 0 : _self$navigator.appVersion.includes("Android")) && self.AndroidNativeInterface !== undefined;
var isiOS = self.webkit && self.webkit.messageHandlers && self.webkit.messageHandlers.selectFileToOpen;
var isVirtual = _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual";
var showConsoleOption = !(isiOS || isAndroid || isVirtual);
function getPrintPrecisionVars() {
  if (Object(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["getTargetLang"])() === "python") {
    var targets = _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("", showConsoleOption).options().map(function (opt) {
      return opt[2];
    });
    return targets.map(function (target) {
      return {
        name: "vexcode_".concat(target.toLowerCase(), "_precision"),
        type: ""
      };
    });
  } else {
    var _targets = _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("", showConsoleOption).options().map(function (opt) {
      return opt[1];
    });
    return _targets.map(function (target) {
      return {
        name: "".concat(target, "_precision"),
        type: "int"
      };
    });
  }
}
function createLooksBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_print"] = {
    /**
     * Block to print to screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_print"),
        args0: [{
          type: "input_value",
          name: "DATA",
          check: ["Number", "String", "Boolean"]
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("TARGET", showConsoleOption), {
          type: "field_mutatortoggle",
          name: "andsetcursortonextrow_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_to_next_row")
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_print_virtual"] = {
    /**
     * Block to print to print console.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_print_virtual"),
        args0: [{
          type: "input_value",
          name: "DATA",
          check: ["Number", "String", "Boolean"]
        }, {
          type: "field_mutatortoggle",
          name: "andsetcursortonextrow_mutator",
          expandedText: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_to_next_row")
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_cursor"] = {
    /**
     * Block to set screen cursor position.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_cursor"),
        args0: [{
          type: "input_value",
          name: "ROW",
          check: "Number"
        }, {
          type: "input_value",
          name: "COLUMN",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("TARGET")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_next_row"] = {
    /**
     * Block to get new line on screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_next_row"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_next_row_virtual"] = {
    /**
     * Block to get new line on screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_next_row_virtual"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_print_precision"] = {
    /**
     * Block to set the print precision.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_print_precision"),
        args0: [{
          type: "field_dropdown",
          name: "PRECISION",
          options: [["1", "0"], ["0.1", "1"], ["0.01", "2"], ["0.001", "3"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com options all digits"), "-1"]]
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getPrintPrecisionVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_print_precision_virtual"] = {
    /**
     * Block to set the print precision.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_print_precision_virtual"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_clear_all_rows"] = {
    /**
     * Block to clear screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_clear_all_rows"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_clear_all_rows_virtual"] = {
    /**
     * Block to clear screen.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_clear_all_rows_virtual"),
        args0: [],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_clear_row"] = {
    /**
     * Block to clear line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_clear_row"),
        args0: [{
          type: "input_value",
          name: "ROW",
          check: "Number"
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["printTargetDropdown"]("TARGET")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_draw_pixel"] = {
    /**
     * Block to draw a pixel.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_draw_pixel"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_draw_line"] = {
    /**
     * Block to draw a line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_draw_line"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_draw_rectangle"] = {
    /**
     * Block to draw a line.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_draw_rectangle"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_draw_circle"] = {
    /**
     * Block to draw a circle.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_draw_circle"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_font"] = {
    /**
     * Block to set font.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_font"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_width"] = {
    /**
     * Block to set pen width.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_width"),
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_pen_color"] = {
    /**
     * Block to set pen color.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_pen_color"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["colorNames"]("COLOR"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["penTargetDropdown"]("TARGET", showConsoleOption)],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_fill_color"] = {
    /**
     * Block to set touchled color by name.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_fill_color"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["colorNames"]("COLOR")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_controller_play_rumble"] = {
    /**
     * Block to clear row.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_controller_play_rumble"),
        args0: [{
          type: "field_dropdown",
          name: "PATTERN",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_controller_rumble_long"), "----"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_controller_rumble_short"), "...."], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_controller_rumble_pulse"), "-.-."]]
        }, _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["controllerList"]("CONTROLLER")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_looks_set_led"] = {
    /**
     * Block to set led brightness.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_looks_set_led"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["ledList"]("LED"), {
          type: "field_dropdown",
          name: "STATE",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_on"), "on"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:com_off"), "off"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.looks,
        style: "looks_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Magnet.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Magnet.ts ***!
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
/* harmony import */ var _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./V5_Dropdowns */ "./src/Blockly/Blocks/V5/V5_Dropdowns.ts");
/* harmony import */ var _V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../V5_ConfigData */ "./src/Blockly/V5_ConfigData.ts");

var log = _rm_vca_logger__WEBPACK_IMPORTED_MODULE_0__["getLogger"]("V5 Magnet blocks");
log.setLevel(log.levels.WARN);
// dev only
// log.enableAll();

// we need blockly since we are extending the definitions...


// globals


// locals


function getMagnetVars() {
  if (Object(_BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["getTargetLang"])() === "python") {
    var magnetPython = Object(_V5_ConfigData__WEBPACK_IMPORTED_MODULE_4__["getElectromagnetOptions"])().map(function (opt) {
      return opt[2];
    });
    return magnetPython.map(function (magnet) {
      return {
        name: "vexcode_".concat(magnet.toLowerCase(), "_duration"),
        // type is normally there, but it is not used if you use the initValue option
        // type: "",
        initValue: 500
      };
    });
  } else {
    return [];
  }
}
function createMagnetBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_magnet_energize"] = {
    /**
     * Block to control magnet.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_magnet_energize"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["magnetList"]("MAGNET"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["magnetActions"]("ACTION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.magnet,
        style: "magnet_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getMagnetVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_magnet_power"] = {
    /**
     * Block to set magnet power.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_magnet_power"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["magnetList"]("MAGNET"), {
          type: "input_value",
          name: "POWER",
          check: "Number"
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.magnet,
        style: "magnet_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getMagnetVars();
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Blocks["v5_magnet_duration"] = {
    /**
     * Block to control magnet.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["i18n"].t("blockly:v5_magnet_duration"),
        args0: [_V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["magnetList"]("MAGNET"), _V5_Dropdowns__WEBPACK_IMPORTED_MODULE_3__["magnetDurations"]("DURATION")],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_1__["Blockly"].Categories.magnet,
        style: "magnet_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    },
    getDeveloperVariables: function getDeveloperVariables() {
      return getMagnetVars();
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Operators.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Operators.ts ***!
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_and"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_and"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_or"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_or"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_operator_not"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_not"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Sounds.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Sounds.ts ***!
  \********************************************/
/*! exports provided: createSoundsBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSoundsBlocks", function() { return createSoundsBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _V5_ConfigData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../V5_ConfigData */ "./src/Blockly/V5_ConfigData.ts");



function createSoundsBlocks() {
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_sounds_play_sound"] = {
    /**
     * Block to play a sound.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:v5_sounds_play_sound"),
        args0: [{
          type: "field_dropdown",
          name: "SOUND",
          options: _V5_ConfigData__WEBPACK_IMPORTED_MODULE_2__["getV5SoundOptions"]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sound,
        style: "sounds_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/V5/V5_Variables.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/V5/V5_Variables.ts ***!
  \***********************************************/
/*! exports provided: createV5VariableBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createV5VariableBlocks", function() { return createV5VariableBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
// we need blockly since we are extending the definitions...


// globals

// locals

function createV5VariableBlocks() {
  //#region "variables"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_variable"] = _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" ? _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_variable_with_checkbox"] : _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_variable"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_set_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setvariableto"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_change_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_changevariableby"];
  //#endregion

  //#region "booleans"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_boolean_variable"] = _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" ? _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_bool_variable_with_checkbox"] : _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_bool_variable"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_set_boolean_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setboolvariableto"];

  /**
   * Construct and add a v5_variables_boolean_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBoolVariable = function (xmlList, variable) {
    // <block id="variableId" type="v5_variables_boolean_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_boolean_variable", "VARIABLE");
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute("id", variable.getId());
  };

  /**
   * Construct and add a v5_variables_set_boolean_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetBoolVariableTo = function (xmlList, variable) {
    // <block type="v5_variables_set_boolean_variable" gap="20">
    //   <value name="VARIABLE">
    //    <shadow type="data_variablemenu"></shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="bool_input">
    //       <field name="VALUE">0</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_set_boolean_variable", "VARIABLE", ["VALUE", "bool_input", "true"]);
  };
  //#endregion

  //#reegion "list"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_item_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_itemoflist"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_set_item_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_replaceitemoflist"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_set_array_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_listsetvalue"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_size_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_lengthoflist"];
  // Blockly.Blocks["v5_variables_"] = Blockly.Blocks["control_wait"];

  /**
   * Construct and add a data_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addDataVariable = function (xmlList, variable) {
    // <block id="variableId" type="data_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_variable", "VARIABLE");
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_set_variable", "VARIABLE", ["VALUE", "math_number", "0"]);
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_change_variable", "VARIABLE", ["VALUE", "math_number", "1"]);
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_set_array_to", "LIST");
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_set_item_of_array", "LIST", ["INDEX", "math_integer", "1"], ["ITEM", "math_integer", "1"]);
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_item_of_array", "LIST", ["INDEX", "math_integer", "1"]);
  };

  /**
   * Construct and add a v5_variables_size_of_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addLengthOfList = function (xmlList, variable) {
    // <block type="v5_variables_size_of_array">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_size_of_array", "LIST");
  };
  //#endregion

  //#region "2d arrays"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_item_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_itemof2darray"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_set_item_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setitemof2darray"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_set_2d_array_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_set2darrayto"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["v5_variables_length_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_lengthof2darray"];

  /**
   * Construct and add a v5_variables_item_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addItemOf2DArray = function (xmlList, variable) {
    // <block type="v5_variables_item_of_2d_array">
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_item_of_2d_array", "ARRAY", ["ROW", "math_integer", "1"], ["COLUMN", "math_integer", "1"]);
  };

  /**
   * Construct and add a v5_variables_set_item_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetItemOf2DArray = function (xmlList, variable) {
    // <block type="v5_variables_set_item_of_2d_array">
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_set_item_of_2d_array", "ARRAY", ["ROW", "math_integer", "1"], ["COLUMN", "math_integer", "1"], ["VALUE", "math_integer", "1"]);
  };

  /**
   * Construct and add a v5_variables_set_2d_array_to block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSet2DArrayTo = function (xmlList, variable) {
    // <block type="v5_variables_set_2d_array_to">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_set_2d_array_to", "ARRAY");
    // Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_set2darrayto', 'LIST',
    //     ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
  };

  /**
   * Construct and add a v5_variables_length_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addLengthOf2DArray = function (xmlList, variable) {
    // <block type="v5_variables_length_of_2d_array">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "v5_variables_length_of_2d_array", "ARRAY");
  };
  //#endregion
}



/***/ })

});
//# sourceMappingURL=9452a06d841e86900b7d.6.bundle.js.map