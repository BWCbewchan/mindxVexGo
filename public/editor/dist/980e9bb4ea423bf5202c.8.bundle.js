this["webpackChunkwebapp"]([8],{

/***/ "./src/Blockly/Blocks/IQ/IQ_BaseBlocks.ts":
/*!************************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_BaseBlocks.ts ***!
  \************************************************/
/*! exports provided: createIQBaseBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIQBaseBlocks", function() { return createIQBaseBlocks; });
/* harmony import */ var _Common_Strings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common_Strings */ "./src/Blockly/Blocks/Common_Strings.ts");
/* harmony import */ var _Common_Variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common_Variables */ "./src/Blockly/Blocks/Common_Variables.ts");
/* harmony import */ var _Common_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common_Events */ "./src/Blockly/Blocks/Common_Events.ts");
/* harmony import */ var _Common_Controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common_Controls */ "./src/Blockly/Blocks/Common_Controls.ts");
/* harmony import */ var _Common_Operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common_Operators */ "./src/Blockly/Blocks/Common_Operators.ts");
/* harmony import */ var _Common_Inputs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common_Inputs */ "./src/Blockly/Blocks/Common_Inputs.ts");
/* harmony import */ var _CommentBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommentBlock */ "./src/Blockly/Blocks/CommentBlock.ts");
/* harmony import */ var _Common_Procedures__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Common_Procedures */ "./src/Blockly/Blocks/Common_Procedures.ts");
/* harmony import */ var _IQ_Motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./IQ_Motion */ "./src/Blockly/Blocks/IQ/IQ_Motion.ts");
/* harmony import */ var _IQ_Looks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./IQ_Looks */ "./src/Blockly/Blocks/IQ/IQ_Looks.ts");
/* harmony import */ var _IQ_Sounds__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./IQ_Sounds */ "./src/Blockly/Blocks/IQ/IQ_Sounds.ts");
/* harmony import */ var _IQ_Event__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./IQ_Event */ "./src/Blockly/Blocks/IQ/IQ_Event.ts");
/* harmony import */ var _IQ_Control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./IQ_Control */ "./src/Blockly/Blocks/IQ/IQ_Control.ts");
/* harmony import */ var _IQ_Sensing__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./IQ_Sensing */ "./src/Blockly/Blocks/IQ/IQ_Sensing.ts");
/* harmony import */ var _IQ_Operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./IQ_Operators */ "./src/Blockly/Blocks/IQ/IQ_Operators.ts");
/* harmony import */ var _IQ_Variables__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./IQ_Variables */ "./src/Blockly/Blocks/IQ/IQ_Variables.ts");
// just to make sure we have blockly defined first

















function createIQBaseBlocks() {
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
  Object(_IQ_Motion__WEBPACK_IMPORTED_MODULE_8__["createMotionBlocks"])();
  Object(_IQ_Looks__WEBPACK_IMPORTED_MODULE_9__["createLooksBlocks"])();
  Object(_IQ_Sounds__WEBPACK_IMPORTED_MODULE_10__["createSoundsBlocks"])();
  Object(_IQ_Event__WEBPACK_IMPORTED_MODULE_11__["createEventsBlocks"])();
  Object(_IQ_Control__WEBPACK_IMPORTED_MODULE_12__["createControlBlocks"])();
  Object(_IQ_Sensing__WEBPACK_IMPORTED_MODULE_13__["createSensingBlocks"])();
  Object(_IQ_Operators__WEBPACK_IMPORTED_MODULE_14__["createOperatorBlocks"])();
  Object(_IQ_Variables__WEBPACK_IMPORTED_MODULE_15__["createIQVariableBlocks"])();
}


/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Control.ts":
/*!*********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Control.ts ***!
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_wait"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_wait"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_repeat"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_repeat"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_forever"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_forever"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_if_then"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_if_then_else"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if_else"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_if_elseif_else"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_if_elseif_else"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_wait_until"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_wait_until"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_repeat_until"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_repeat_until"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_break"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_break"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_while"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_while"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_control_stop_project"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["control_stop_project"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Operators.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Operators.ts ***!
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_and"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_and"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_or"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_or"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_operator_not"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["operator_not"];
}


/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Sounds.ts":
/*!********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Sounds.ts ***!
  \********************************************/
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
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sounds_play_sound"] = {
    /**
     * Block to play a sound.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_sounds_play_sound"),
        args0: [{
          type: "field_dropdown",
          name: "SOUND",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_siren"), "siren2"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_wrongway"), "wrongWay"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_wrongway_slow"), "wrongWays"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_fill_up"), "gasFillup"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_headlight_on"), "headlightsOn"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_headlight_off"), "headlightsOff"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_tollboth"), "tollBooth"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_alarm"), "carAlarm2"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_tada"), "tada"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_door_close"), "garageDoorClose"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_ratchet"), "ratchet"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_wrench"), "airWrench"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_siren2"), "siren4"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_ratchet2"), "ratchet4"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_alarm2"), "carAlarm4"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sounds_power_down"), "powerOff2"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sound,
        style: "sounds_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_sounds_play_note"] = {
    /**
     * Block to play a note.
     * @this Blockly.Block
     */
    init: function init() {
      this.jsonInit({
        message0: _i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:iq_sounds_play_note"),
        args0: [{
          type: "field_dropdown",
          name: "NOTE",
          options: [["C", "0"], ["D", "1"], ["E", "2"], ["F", "3"], ["G", "4"], ["A", "5"], ["B", "6"]]
        }, {
          type: "field_dropdown",
          name: "DURATION",
          options: [[_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sound_duration_whole"), "4"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sound_duration_half"), "2"], [_i18n_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].t("blockly:com_sound_duration_quarter"), "1"]]
        }],
        category: _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Categories.sound,
        style: "sounds_blocks",
        extensions: ["shape_statement", "context_menu_convert"]
      });
    }
  };
}


/***/ }),

/***/ "./src/Blockly/Blocks/IQ/IQ_Variables.ts":
/*!***********************************************!*\
  !*** ./src/Blockly/Blocks/IQ/IQ_Variables.ts ***!
  \***********************************************/
/*! exports provided: createIQVariableBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIQVariableBlocks", function() { return createIQVariableBlocks; });
/* harmony import */ var _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BlocklyAccess */ "./src/Blockly/BlocklyAccess.ts");
/* harmony import */ var _AppInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../AppInfo */ "./src/AppInfo.ts");
// we need blockly since we are extending the definitions...


// globals

// locals

function createIQVariableBlocks() {
  //#region "variables"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_variable"] = _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" ? _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_variable_with_checkbox"] : _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_variable"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_set_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setvariableto"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_change_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_changevariableby"];
  //#endregion

  //#region "booleans"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_boolean_variable"] = _AppInfo__WEBPACK_IMPORTED_MODULE_1__["appState"].getAppState().targetMode === "Virtual" ? _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_bool_variable_with_checkbox"] : _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_bool_variable"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_set_boolean_variable"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setboolvariableto"];

  /**
   * Construct and add a iq_variables_boolean_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBoolVariable = function (xmlList, variable) {
    // <block id="variableId" type="iq_variables_boolean_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_boolean_variable", "VARIABLE");
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute("id", variable.getId());
  };

  /**
   * Construct and add a iq_variables_set_boolean_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetBoolVariableTo = function (xmlList, variable) {
    // <block type="iq_variables_set_boolean_variable" gap="20">
    //   <value name="VARIABLE">
    //    <shadow type="data_variablemenu"></shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="bool_input">
    //       <field name="VALUE">0</field>
    //     </shadow>
    //   </value>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_set_boolean_variable", "VARIABLE", ["VALUE", "bool_input", "true"]);
  };
  //#endregion

  //#reegion "list"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_item_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_itemoflist"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_set_item_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_replaceitemoflist"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_set_array_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_listsetvalue"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_size_of_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_lengthoflist"];
  // Blockly.Blocks["iq_variables_"] = Blockly.Blocks["control_wait"];

  /**
   * Construct and add a data_variable block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addDataVariable = function (xmlList, variable) {
    // <block id="variableId" type="data_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_variable", "VARIABLE");
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_set_variable", "VARIABLE", ["VALUE", "math_number", "0"]);
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_change_variable", "VARIABLE", ["VALUE", "math_number", "1"]);
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_set_array_to", "LIST");
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_set_item_of_array", "LIST", ["INDEX", "math_integer", "1"], ["ITEM", "math_integer", "1"]);
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_item_of_array", "LIST", ["INDEX", "math_integer", "1"]);
  };

  /**
   * Construct and add a iq_variables_size_of_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addLengthOfList = function (xmlList, variable) {
    // <block type="iq_variables_size_of_array">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_size_of_array", "LIST");
  };
  //#endregion

  //#region "2d arrays"
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_item_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_itemof2darray"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_set_item_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_setitemof2darray"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_set_2d_array_to"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_set2darrayto"];
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["iq_variables_length_of_2d_array"] = _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].Blocks["data_lengthof2darray"];

  /**
   * Construct and add a iq_variables_item_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addItemOf2DArray = function (xmlList, variable) {
    // <block type="iq_variables_item_of_2d_array">
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_item_of_2d_array", "ARRAY", ["ROW", "math_integer", "1"], ["COLUMN", "math_integer", "1"]);
  };

  /**
   * Construct and add a iq_variables_set_item_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSetItemOf2DArray = function (xmlList, variable) {
    // <block type="iq_variables_set_item_of_2d_array">
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
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_set_item_of_2d_array", "ARRAY", ["ROW", "math_integer", "1"], ["COLUMN", "math_integer", "1"], ["VALUE", "math_integer", "1"]);
  };

  /**
   * Construct and add a iq_variables_set_2d_array_to block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addSet2DArrayTo = function (xmlList, variable) {
    // <block type="iq_variables_set_2d_array_to">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_set_2d_array_to", "ARRAY");
    // Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_set2darrayto', 'LIST',
    //     ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
  };

  /**
   * Construct and add a iq_variables_length_of_2d_array block to xmlList.
   * @param {!Array.<!Element>} xmlList Array of XML block elements.
   * @param {?Blockly.VariableModel} variable Variable to select in the field.
   */
  _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addLengthOf2DArray = function (xmlList, variable) {
    // <block type="iq_variables_length_of_2d_array">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    _BlocklyAccess__WEBPACK_IMPORTED_MODULE_0__["Blockly"].VariablesTyped.addBlock(xmlList, variable, "iq_variables_length_of_2d_array", "ARRAY");
  };
  //#endregion
}



/***/ })

});
//# sourceMappingURL=980e9bb4ea423bf5202c.8.bundle.js.map