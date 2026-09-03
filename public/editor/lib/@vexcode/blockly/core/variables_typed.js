/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Data Flyout components including variable and list blocks.
 * @author marisaleung@google.com (Marisa Leung)
 */
'use strict';

// This file is based on a scratch file and has been modified for typed variables

/**
 * @name Blockly.VariablesTyped
 * @namespace
 **/
goog.provide('Blockly.VariablesTyped');

goog.require('Blockly.Blocks');
goog.require('Blockly.utils');
goog.require('Blockly.utils.dom');
goog.require('Blockly.VariableModel');
goog.require('Blockly.Variables');
goog.require('Blockly.Workspace');

/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.VariablesTyped.flyoutCategory = function (workspace) {
    var variableModelList = workspace.getVariablesOfType('');
    variableModelList.sort(Blockly.VariableModel.compareByName);
    var xmlList = [];

    Blockly.VariablesTyped.addCreateButton(xmlList, workspace, 'VARIABLE');

    for (var i = 0; i < variableModelList.length; i++) {
        Blockly.VariablesTyped.addDataVariable(xmlList, variableModelList[i]);
    }

    if (variableModelList.length > 0) {
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
        var firstVariable = variableModelList[0];

        Blockly.VariablesTyped.addSetVariableTo(xmlList, firstVariable);
        Blockly.VariablesTyped.addChangeVariableBy(xmlList, firstVariable);
    }


    Blockly.VariablesTyped.addCreateButton(xmlList, workspace, 'BOOL');
    variableModelList = workspace.getVariablesOfType(Blockly.BOOL_VARIABLE_TYPE);
    variableModelList.sort(Blockly.VariableModel.compareByName);

    for (var i = 0; i < variableModelList.length; i++) {
        Blockly.VariablesTyped.addBoolVariable(xmlList, variableModelList[i]);
    }

    if (variableModelList.length > 0) {
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
        var firstVariable = variableModelList[0];

        Blockly.VariablesTyped.addSetBoolVariableTo(xmlList, firstVariable);
    }

    // Now add list variables to the flyout
    Blockly.VariablesTyped.addCreateButton(xmlList, workspace, 'LIST');
    variableModelList = workspace.getVariablesOfType(Blockly.LIST_VARIABLE_TYPE);
    variableModelList.sort(Blockly.VariableModel.compareByName);

    if (variableModelList.length > 0) {
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
        var firstVariable = variableModelList[0];

        Blockly.VariablesTyped.addItemOfList(xmlList, firstVariable);
        Blockly.VariablesTyped.addReplaceItemOfList(xmlList, firstVariable);
        Blockly.VariablesTyped.addSetList(xmlList, firstVariable);
        Blockly.VariablesTyped.addLengthOfList(xmlList, firstVariable);
    }

    // Now add 2d array variables to the flyout
    Blockly.VariablesTyped.addCreateButton(xmlList, workspace, 'ARRAY');
    variableModelList = workspace.getVariablesOfType(Blockly.ARRAY2D_VARIABLE_TYPE);
    variableModelList.sort(Blockly.VariableModel.compareByName);

    if (variableModelList.length > 0) {
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
        var firstVariable = variableModelList[0];

        Blockly.VariablesTyped.addItemOf2DArray(xmlList, firstVariable);
        Blockly.VariablesTyped.addSetItemOf2DArray(xmlList, firstVariable);
        Blockly.VariablesTyped.addSet2DArrayTo(xmlList, firstVariable);
        Blockly.VariablesTyped.addLengthOf2DArray(xmlList, firstVariable);
    }

    return xmlList;
};

/**
 * Construct and add a data_variable block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addDataVariable = function (xmlList, variable) {
    // <block id="variableId" type="data_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_variable', 'VARIABLE');
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute('id', variable.getId());
};

/**
 * Construct and add a data_setvariableto block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addSetVariableTo = function (xmlList, variable) {
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
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_setvariableto',
        'VARIABLE', ['VALUE', 'math_number', 0]);
};

/**
 * Construct and add a data_changevariableby block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addChangeVariableBy = function (xmlList, variable) {
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
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_changevariableby',
        'VARIABLE', ['VALUE', 'math_number', 1]);
};

/**
 * Construct and add a data_bool_variable block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addBoolVariable = function (xmlList, variable) {
    // <block id="variableId" type="data_bool_variable">
    //    <field name="VARIABLE">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_bool_variable', 'VARIABLE');
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute('id', variable.getId());
};

/**
 * Construct and add a data_setboolvariableto block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addSetBoolVariableTo = function (xmlList, variable) {
    // <block type="data_setboolvariableto" gap="20">
    //   <value name="VARIABLE">
    //    <shadow type="data_variablemenu"></shadow>
    //   </value>
    //   <value name="VALUE">
    //     <shadow type="bool_input">
    //       <field name="VALUE">0</field>
    //     </shadow>
    //   </value>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_setboolvariableto',
        'VARIABLE', ['VALUE', 'bool_input', "true"]);
};

/**
 * Construct and add a data_listcontents block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addDataList = function (xmlList, variable) {
    // <block id="variableId" type="data_listcontents">
    //    <field name="LIST">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_listcontents', 'LIST');
    // In the flyout, this ID must match variable ID for monitor syncing reasons
    xmlList[xmlList.length - 1].setAttribute('id', variable.getId());
};

/**
 * Construct and add a data_listsetvalue block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addSetList = function (xmlList, variable) {
    // <block type="data_listsetvalue">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_listsetvalue', 'LIST');
    // Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_listsetvalue', 'LIST',
    //     ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
};

/**
 * Construct and add a data_addtolist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addAddToList = function (xmlList, variable) {
    // <block type="data_addtolist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="ITEM">
    //     <shadow type="text">
    //       <field name="TEXT">thing</field>
    //     </shadow>
    //   </value>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_addtolist', 'LIST',
        ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
};

/**
 * Construct and add a data_deleteoflist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addDeleteOfList = function (xmlList, variable) {
    // <block type="data_deleteoflist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="INDEX">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_deleteoflist', 'LIST',
        ['INDEX', 'math_integer', 1]);
};

/**
 * Construct and add a data_deleteoflist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addDeleteAllOfList = function (xmlList, variable) {
    // <block type="data_deletealloflist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_deletealloflist',
        'LIST');
};

/**
 * Construct and add a data_insertatlist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addInsertAtList = function (xmlList, variable) {
    // <block type="data_insertatlist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="INDEX">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    //   <value name="ITEM">
    //     <shadow type="text">
    //       <field name="TEXT">thing</field>
    //     </shadow>
    //   </value>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_insertatlist', 'LIST',
        ['INDEX', 'math_integer', 1], ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
};

/**
 * Construct and add a data_replaceitemoflist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addReplaceItemOfList = function (xmlList, variable) {
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
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_replaceitemoflist',
        'LIST', ['INDEX', 'math_integer', 1], ['ITEM', 'math_integer', 1]);
};

/**
 * Construct and add a data_itemoflist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addItemOfList = function (xmlList, variable) {
    // <block type="data_itemoflist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="INDEX">
    //     <shadow type="math_integer">
    //       <field name="NUM">1</field>
    //     </shadow>
    //   </value>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_itemoflist', 'LIST',
        ['INDEX', 'math_integer', 1]);
};

/** Construct and add a data_itemnumoflist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addItemNumberOfList = function (xmlList, variable) {
    // <block type="data_itemnumoflist">
    //   <value name="ITEM">
    //     <shadow type="text">
    //       <field name="TEXT">thing</field>
    //     </shadow>
    //   </value>
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_itemnumoflist',
        'LIST', ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
};

/**
 * Construct and add a data_lengthoflist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addLengthOfList = function (xmlList, variable) {
    // <block type="data_lengthoflist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_lengthoflist', 'LIST');
};

/**
 * Construct and add a data_listcontainsitem block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addListContainsItem = function (xmlList, variable) {
    // <block type="data_listcontainsitem">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    //   <value name="ITEM">
    //     <shadow type="text">
    //       <field name="TEXT">thing</field>
    //     </shadow>
    //   </value>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_listcontainsitem',
        'LIST', ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
};

/**
 * Construct and add a data_itemof2darray block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addItemOf2DArray = function (xmlList, variable) {
    // <block type="data_itemof2darray">
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
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_itemof2darray', 'ARRAY',
        ['ROW', 'math_integer', 1], ['COLUMN', 'math_integer', 1]);
};

/**
 * Construct and add a data_setitemof2darray block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addSetItemOf2DArray = function (xmlList, variable) {
    // <block type="data_setitemof2darray">
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
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_setitemof2darray',
        'ARRAY', ['ROW', 'math_integer', 1], ['COLUMN', 'math_integer', 1], ['VALUE', 'math_integer', 1]);
};

/**
 * Construct and add a data_set2darrayto block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addSet2DArrayTo = function (xmlList, variable) {
    // <block type="data_set2darrayto">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_set2darrayto', 'ARRAY');
    // Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_set2darrayto', 'LIST',
    //     ['ITEM', 'text', Blockly.Msg.DEFAULT_LIST_ITEM]);
};

/**
 * Construct and add a data_lengthof2darray block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addLengthOf2DArray = function (xmlList, variable) {
    // <block type="data_lengthof2darray">
    //   <field name="ARRAY" variabletype="array2d" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_lengthof2darray', 'ARRAY');
};

/**
 * Construct and add a data_showlist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addShowList = function (xmlList, variable) {
    // <block type="data_showlist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_showlist', 'LIST');
};

/**
 * Construct and add a data_hidelist block to xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 */
Blockly.VariablesTyped.addHideList = function (xmlList, variable) {
    // <block type="data_hidelist">
    //   <field name="LIST" variabletype="list" id="">variablename</field>
    // </block>
    Blockly.VariablesTyped.addBlock(xmlList, variable, 'data_hidelist', 'LIST');
};

/**
 * Construct a create variable button and push it to the xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {Blockly.Workspace} workspace Workspace to register callback to.
 * @param {string} type Type of variable this is for. For example, 'LIST' or
 *     'VARIABLE'.
 */
Blockly.VariablesTyped.addCreateButton = function (xmlList, workspace, type) {
    var button = Blockly.utils.dom.createDom('button');
    // Set default msg, callbackKey, and callback values for type 'VARIABLE'
    var msg = Blockly.Msg.NEW_VARIABLE;
    var callbackKey = 'CREATE_VARIABLE';
    var callback = function (button) {
        Blockly.Variables.createVariable(button.getTargetWorkspace(), null, '');
    };

    if (type === 'LIST') {
        msg = Blockly.Msg.NEW_LIST;
        callbackKey = 'CREATE_LIST';
        callback = function (button) {
            Blockly.Variables.createVariable(button.getTargetWorkspace(), null,
                Blockly.LIST_VARIABLE_TYPE);
        };
    } else if (type === 'ARRAY') {
        msg = Blockly.Msg.NEW_ARRAY;
        callbackKey = 'CREATE_ARRAY';
        callback = function (button) {
            Blockly.Variables.createVariable(button.getTargetWorkspace(), null,
                Blockly.ARRAY2D_VARIABLE_TYPE);
        };
    } else if (type === 'BOOL') {
        msg = Blockly.Msg.NEW_BOOL;
        var callbackKey = 'CREATE_BOOL_VARIABLE';
        callback = function (button) {
            Blockly.Variables.createVariable(button.getTargetWorkspace(), null,
                Blockly.BOOL_VARIABLE_TYPE);
        };
    }
    button.setAttribute('text', msg);
    button.setAttribute('callbackKey', callbackKey);
    workspace.registerButtonCallback(callbackKey, callback);
    xmlList.push(button);
};

/**
 * Construct a variable block with the given variable, blockType, and optional
 *     value tags. Add the variable block to the given xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {?Blockly.VariableModel} variable Variable to select in the field.
 * @param {string} blockType Type of block. For example, 'data_hidelist' or
 *     data_showlist'.
 * @param {string} fieldName Name of field in block. For example: 'VARIABLE' or
 *     'LIST'.
 * @param {?Array.<string>=} opt_value Optional array containing the value name
 *     and shadow type of value tags.
 * @param {?Array.<string>=} opt_secondValue Optional array containing the value
 *     name and shadow type of a second pair of value tags.
 * @param {?Array.<string>=} opt_thirdValue Optional array containing the value
 *     name and shadow type of a third pair of value tags.
 */
Blockly.VariablesTyped.addBlock = function (xmlList, variable, blockType,
    fieldName, opt_value, opt_secondValue, opt_thirdValue) {
    if (Blockly.Blocks[blockType]) {
        var firstValueField = "";
        var secondValueField = "";
        var thirdValueField = "";
        if (opt_value) {
            firstValueField = Blockly.VariablesTyped.createValue(opt_value[0],
                opt_value[1], opt_value[2]);
        }
        if (opt_secondValue) {
            secondValueField = Blockly.VariablesTyped.createValue(opt_secondValue[0],
                opt_secondValue[1], opt_secondValue[2]);
        }
        if (opt_thirdValue) {
            thirdValueField = Blockly.VariablesTyped.createValue(opt_thirdValue[0],
                opt_thirdValue[1], opt_thirdValue[2]);
        }

        var gap = 8;
        var blockText = '<xml>' +
            '<block type="' + blockType + '" gap="' + gap + '">' +
            Blockly.Variables.generateVariableFieldXml_(variable, fieldName) +
            firstValueField + secondValueField + thirdValueField +
            '</block>' +
            '</xml>';
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
    }
};

/**
 * Create the text representation of a value dom element with a shadow of the
 *     indicated type inside.
 * @param {string} valueName Name of the value tags.
 * @param {string} type The type of the shadow tags.
 * @param {string|number} value The default shadow value.
 * @return {string} The generated dom element in text.
 */
Blockly.VariablesTyped.createValue = function (valueName, type, value) {
    var fieldName;
    switch (valueName) {
        case 'ITEM':
            fieldName = 'TEXT';
            break;
        case 'ROW':
        case 'COLUMN':
        case 'INDEX':
            fieldName = 'NUM';
            break;
        case 'VALUE':
            if (type === 'math_number') {
                fieldName = 'NUM';
            } else if (type === 'bool_input') {
                fieldName = 'VALUE';
            } else {
                fieldName = 'TEXT';
            }
            break;
    }
    var valueField =
        '<value name="' + valueName + '">' +
        '<shadow type="' + type + '">' +
        '<field name="' + fieldName + '">' + value + '</field>' +
        '</shadow>' +
        '</value>';
    return valueField;
};

/**
 * Construct a block separator. Add the separator to the given xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 */
Blockly.VariablesTyped.addSep = function (xmlList) {
    var gap = 36;
    var sepText = '<xml>' +
        '<sep gap="' + gap + '"/>' +
        '</xml>';
    var sep = Blockly.Xml.textToDom(sepText).firstChild;
    xmlList.push(sep);
};

/**
 * Callback factory for dropdown menu options associated with a variable getter
 * block.  Each variable on the workspace gets its own item in the dropdown
 * menu, and clicking on that item changes the text of the field on the source
 * block.
 * RM CHANGES -> Upgraded to develop branch of Scratch Blocks 
 * @param {!Blockly.Block} block The block to update.
 * @param {string} id The id of the variable to set on this block.
 * @param {string} fieldName The name of the field to update on the block.
 * @return {!function()} A function that updates the block with the new name.
 */
Blockly.VariablesTyped.VARIABLE_OPTION_CALLBACK_FACTORY = function (block,
    id, fieldName) {
    return function () {
        var variableField = block.getField(fieldName);
        if (!variableField) {
            console.log("Tried to get a variable field on the wrong type of block.");
        }
        variableField.setValue(id);
    };
};

/**
 * Callback for rename variable dropdown menu option associated with a
 * variable getter block.
 * @param {!Blockly.Block} block The block with the variable to rename.
 * @return {!function()} A function that renames the variable.
 */
Blockly.VariablesTyped.RENAME_OPTION_CALLBACK_FACTORY = function (block) {
    return function () {
        var workspace = block.workspace;
        var variable = block.getField('VARIABLE').getVariable();
        Blockly.Variables.renameVariable(workspace, variable);
    };
};

/**
 * Callback for delete variable dropdown menu option associated with a
 * variable getter block.
 * @param {!Blockly.Block} block The block with the variable to delete.
 * @return {!function()} A function that deletes the variable.
 */
Blockly.VariablesTyped.DELETE_OPTION_CALLBACK_FACTORY = function (block) {
    return function () {
        var workspace = block.workspace;
        var variable = block.getField('VARIABLE').getVariable();
        workspace.deleteVariableById(variable.getId());
    };
};

/**
 * Mixin for mutator functions in the 'data_set_list_contents_mutator'
 * extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.VariablesTyped.SET_LIST_CONTENTS_MUTATOR_MIXIN = {

    /**
     * Create XML to represent how many field inputs should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        const varID = this.getFieldValue('LIST');
        const variable = this.workspace.getVariableById(varID);
        container.setAttribute('arraylength', variable ? variable.arrayLength : 0);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var arrayLength = parseInt(xmlElement.getAttribute('arraylength'));
        if (arrayLength === 0) {
            const varID = this.getFieldValue('LIST');
            const variable = this.workspace.getVariableById(varID);
            arrayLength = variable ? variable.arrayLength : 0;
        }
        this.updateShape_(arrayLength);
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {number} arrayLength number of array elements.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function (arrayLength) {
        const doesInputExist = (name) => {
            return (this.getInput(name) !== null);
        }

        const addShadowInput = (input) => {
            const numberShadowBlock = this.workspace.newBlock('math_number');
            numberShadowBlock.setShadow(true);
            if (numberShadowBlock.initSvg) {
                numberShadowBlock.initSvg();
            } else {
                numberShadowBlock.initModel();
            }
            if (numberShadowBlock.render) {
                numberShadowBlock.render();
            }
            // get shadow block output
            const ob = numberShadowBlock.outputConnection;
            // connect shadow block
            input.connection.connect(ob);
        };

        if (doesInputExist(`VALUE${arrayLength - 1}`)) {
            // remove extra inputs.
            console.log("checking for extra inputs");
            var i = arrayLength;
            while (doesInputExist(`VALUE${i}`)) {
                console.log(`removing input VALUE${i}`)
                this.removeInput(`VALUE${i}`);
                i++;
            }
        } else {
            // add required inputs
            for (var i = 0; i < arrayLength; i++) {
                const inputName = `VALUE${i}`;
                if (!doesInputExist(inputName)) {
                    this.appendValueInput(inputName)
                        .setCheck('Number');
                    if (!this.isInsertionMarker()) {
                        addShadowInput(this.getInput(inputName));
                    }
                }
            }
        }
    }
};

/**
 * 'data_set_list_contents_mutator' extension to the 'data_listsetvalue' block that
 * can update the block shape (add/remove value inputs) based on list length.
 * @this Blockly.Block
 * @package
 */
Blockly.VariablesTyped.SET_LIST_CONTENTS_MUTATOR_EXTENSION = function () {
    this.getField('LIST').setValidator(function (varID) {
        const variable = this.sourceBlock_.workspace.getVariableById(varID);
        this.sourceBlock_.updateShape_(variable.arrayLength);
    });
};

Blockly.Extensions.registerMutator('data_set_list_contents_mutator',
    Blockly.VariablesTyped.SET_LIST_CONTENTS_MUTATOR_MIXIN,
    Blockly.VariablesTyped.SET_LIST_CONTENTS_MUTATOR_EXTENSION);

/**
* Mixin for mutator functions in the 'data_set_2darray_contents_mutator'
* extension.
* @mixin
* @augments Blockly.Block
* @package
*/
Blockly.VariablesTyped.SET_2DARRAY_CONTENTS_MUTATOR_MIXIN = {

    /**
     * Create XML to represent how many field inputs should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        const container = document.createElement('mutation');
        const varID = this.getFieldValue('ARRAY');
        const variable = this.workspace.getVariableById(varID);
        container.setAttribute('arraylength', variable ? variable.arrayLength : 0);
        container.setAttribute('arraywidth', variable ? variable.arrayWidth : 0);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        let arrayLength = parseInt(xmlElement.getAttribute('arraylength'));
        let arrayWidth = parseInt(xmlElement.getAttribute('arraywidth'));
        if (arrayLength === 0 || arrayWidth === 0) {
            const varID = this.getFieldValue('ARRAY');
            const variable = this.workspace.getVariableById(varID);
            arrayLength = variable ? variable.arrayLength : 0;
            arrayWidth = variable ? variable.arrayWidth : 0;
        }

        // This is a hack to get the input updates to work. the new version of
        // blockly changed the order of events...
        if (this.initSvg) {
            // Mutation may have added some elements that need initializing.
            this.initSvg();
        }

        this.updateShape_(arrayLength, arrayWidth);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @param {number} arrayLength number of array elements.
     * @param {number} arrayWidth number of array elements.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function (arrayLength, arrayWidth) {
        const doesInputExist = (name) => {
            return (this.getInput(name) !== null);
        };

        const addShadowInput = (input) => {
            const numberShadowBlock = this.workspace.newBlock('data_2darrayrow');
            numberShadowBlock.setShadow(true);
            if (numberShadowBlock.initSvg) {
                numberShadowBlock.initSvg();
            } else {
                numberShadowBlock.initModel();
            }
            if (numberShadowBlock.render) {
                numberShadowBlock.render();
            }
            // get shadow block output
            const ob = numberShadowBlock.outputConnection;
            // connect shadow block
            input.connection.connect(ob);
            numberShadowBlock.updateShape_(arrayWidth);
        };

        if (doesInputExist(`ROW${arrayLength - 1}`)) {
            // remove extra inputs.
            console.log("checking for extra inputs");
            let i = arrayLength;
            while (doesInputExist(`ROW${i}`)) {
                console.log(`removing input ROW${i}`);
                this.removeInput(`ROW${i}`);
                i++;
            }
        } else {
            // add required inputs
            for (let i = 0; i < arrayLength; i++) {
                const inputName = `ROW${i}`;
                if (!doesInputExist(inputName)) {
                    this.appendValueInput(inputName)
                        .setCheck('ARRAY_ROW');
                    if (!this.isInsertionMarker()) {
                        addShadowInput(this.getInput(inputName));
                    }
                }
            }
        }

        // make sure inputs are sized correctly
        for (let i = 0; i < arrayLength; i++) {
            const inputName = `ROW${i}`;
            const input = this.getInput(inputName);
            if (input.connection.targetConnection) {
                const rowBlock = input.connection.targetConnection.sourceBlock_;
                if (rowBlock) {
                    rowBlock.updateShape_(arrayWidth);
                }
            }
        }
    }
};

/**
 * 'data_set_2darray_contents_mutator' extension to the 'data_set2darrayto' block that
 * can update the block shape (add/remove value inputs) based on list length.
 * @this Blockly.Block
 * @package
 */
Blockly.VariablesTyped.SET_2DARRAY_CONTENTS_MUTATOR_EXTENSION = function () {
    this.getField('ARRAY').setValidator(function (varID) {
        const variable = this.sourceBlock_.workspace.getVariableById(varID);
        this.sourceBlock_.updateShape_(variable.arrayLength, variable.arrayWidth);
    });
};

Blockly.Extensions.registerMutator('data_set_2darray_contents_mutator',
    Blockly.VariablesTyped.SET_2DARRAY_CONTENTS_MUTATOR_MIXIN,
    Blockly.VariablesTyped.SET_2DARRAY_CONTENTS_MUTATOR_EXTENSION);

/**
 * Mixin for mutator functions in the 'data_set_2darrayrow_contents_mutator'
 * extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.VariablesTyped.SET_2DARRAYROW_CONTENTS_MUTATOR_MIXIN = {

    /**
     * Create XML to represent how many field inputs should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        const container = document.createElement('mutation');
        container.setAttribute('arraywidth', this.arrayWidth);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        const arrayWidth = parseInt(xmlElement.getAttribute('arraywidth'), 10);
        this.arrayWidth = arrayWidth;
        this.updateShape_(arrayWidth);
    },

    /**
     * Modify this block to have (or not have) correct number of inputs.
     * @param {number} arrayWidth number of array elements.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function (arrayWidth) {
        this.arrayWidth = arrayWidth;
        const doesInputExist = (name) => {
            return (this.getInput(name) !== null);
        };

        const addShadowInput = (input) => {
            const numberShadowBlock = this.workspace.newBlock('math_number');
            numberShadowBlock.setShadow(true);
            if (numberShadowBlock.initSvg) {
                numberShadowBlock.initSvg();
            } else {
                numberShadowBlock.initModel();
            }
            if (numberShadowBlock.render) {
                numberShadowBlock.render();
            }
            // get shadow block output
            const ob = numberShadowBlock.outputConnection;
            // connect shadow block
            input.connection.connect(ob);
        };
        if (doesInputExist(`VALUE${arrayWidth - 1}`)) {
            // remove extra inputs.
            let i = arrayWidth;
            while (doesInputExist(`VALUE${i}`)) {

                this.removeInput(`VALUE${i}`);
                i++;
            }
        } else {
            // add required inputs
            for (let i = 0; i < arrayWidth; i++) {
                const inputName = `VALUE${i}`;
                if (!doesInputExist(inputName)) {
                    this.appendValueInput(inputName)
                        .setCheck('Number');
                    if (!this.isInsertionMarker()) {
                        addShadowInput(this.getInput(inputName));
                    }
                }
            }
        }
    }
};

/**
 * 'data_set_2darrayrow_contents_mutator' extension to the 'data_2darrayrow' block that
 * can update the block shape (add/remove value inputs) based on list length.
 * @this Blockly.Block
 * @package
 */
Blockly.VariablesTyped.SET_2DARRAYROW_CONTENTS_MUTATOR_EXTENSION = function () {
    this.arrayWidth = 0;
};

Blockly.Extensions.registerMutator('data_set_2darrayrow_contents_mutator',
    Blockly.VariablesTyped.SET_2DARRAYROW_CONTENTS_MUTATOR_MIXIN,
    Blockly.VariablesTyped.SET_2DARRAYROW_CONTENTS_MUTATOR_EXTENSION);
  