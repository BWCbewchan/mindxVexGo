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
 * @fileoverview Variable getter field.  Appears as a label but has a variable
 *     picker in the right-click menu.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.FieldVariableGetter');

goog.require('Blockly.Events');
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.Field');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Size');
goog.require('Blockly.Variables');


/**
 * Class for a variable getter field.
 * @param {string} text The initial content of the field.
 * @param {string} name the field name.
 * @param {string=} opt_varType The type of variable this field is associated with.
 * @extends {Blockly.FieldLabel}
 * @constructor
 *
 */
Blockly.FieldVariableGetter = function (text, name, opt_varType) {
    this.size_ = new Blockly.utils.Size(Blockly.BlockSvg.FIELD_WIDTH,
        Blockly.BlockSvg.FIELD_HEIGHT);
    this.text_ = text;

    /**
     * Maximum characters of text to display before adding an ellipsis.
     * Same for strings and numbers.
     * @type {number}
     */
    this.maxDisplayLength = Blockly.BlockSvg.MAX_DISPLAY_LENGTH;

    this.name_ = name;
    this.variableType_ = opt_varType ? opt_varType : '';
};
Blockly.utils.object.inherits(Blockly.FieldVariableGetter, Blockly.Field);

/**
 * Construct a FieldVariableGetter from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (variable,
 *                          variableTypes, and defaultType).
 * @returns {!Blockly.FieldVariableGetter} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldVariableGetter.fromJson = function (options) {
    var varname = Blockly.utils.replaceMessageReferences(options['text']);
    return new Blockly.FieldVariableGetter(varname, options['name'],
        options['class'], options['variableType']);
};

/**
 * Editable fields usually show some sort of UI for the user to change them.
 * This field should be serialized, but only edited programmatically.
 * @type {boolean}
 * @public
 */
Blockly.FieldVariableGetter.prototype.EDITABLE = false;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not.  This field should be serialized, but only edited programmatically.
 * @type {boolean}
 * @public
 */
Blockly.FieldVariableGetter.prototype.SERIALIZABLE = true;

/**
 * Initialize the model for this field if it has not already been initialized.
 * If the value has not been set to a variable by the first render, we make up a
 * variable rather than let the value be invalid.
 * @package
 */
Blockly.FieldVariableGetter.prototype.initModel = function () {
    if (this.variable_) {
        return; // Initialization already happened.
    }
    var variable = Blockly.Variables.getOrCreateVariablePackage(
        this.sourceBlock_.workspace, null,
        this.defaultVariableName, this.defaultType_);

    // Don't call setValue because we don't want to cause a rerender.
    this.doValueUpdate_(variable.getId());
};

/**
 * Initialize this field based on the given XML.
 * @param {!Element} fieldElement The element containing information about the
 *    variable field's state.
 */
Blockly.FieldVariableGetter.prototype.fromXml = function (fieldElement) {
    var id = fieldElement.getAttribute('id');
    var variableName = fieldElement.textContent;
    // 'variabletype' should be lowercase, but until July 2019 it was sometimes
    // recorded as 'variableType'.  Thus we need to check for both.
    var variableType = fieldElement.getAttribute('variabletype') ||
        fieldElement.getAttribute('variableType') || '';

    // this.workspace_ = this.sourceBlock_.workspace;
    var variable = Blockly.Variables.getOrCreateVariablePackage(
        this.sourceBlock_.workspace, id, variableName, variableType);

    // This should never happen :)
    if (variableType != null && variableType !== variable.type) {
        throw Error('Serialized variable type with id \'' +
            variable.getId() + '\' had type ' + variable.type + ', and ' +
            'does not match variable field that references it: ' +
            Blockly.Xml.domToText(fieldElement) + '.');
    }

    this.setValue(variable.getId());
};

/**
 * Serialize this field to XML.
 * @param {!Element} fieldElement The element to populate with info about the
 *    field's state.
 * @return {!Element} The element containing info about the field's state.
 */
Blockly.FieldVariableGetter.prototype.toXml = function(fieldElement) {
    // Make sure the variable is initialized.
    this.initModel();
  
    fieldElement.id = this.variable_.getId();
    fieldElement.textContent = this.variable_.name;
    if (this.variable_.type) {
        fieldElement.setAttribute('variabletype', this.variable_.type);
    }
    return fieldElement;
};
  
/**
 * Get the variable's ID.
 * @return {string} Current variable's ID.
 */
Blockly.FieldVariableGetter.prototype.getValue = function () {
    return this.variable_ ? this.variable_.getId() : '';
};

/**
 * Get the text from this field.
 * @return {string} Current text.
 */
Blockly.FieldVariableGetter.prototype.getText = function () {
    return this.variable_ ? this.variable_.name : '';
};

/**
 * Get the variable model for the variable associated with this field.
 * Not guaranteed to be in the variable map on the workspace (e.g. if accessed
 * after the variable has been deleted).
 * @return {?Blockly.VariableModel} the selected variable, or null if none was
 *     selected.
 * @package
 */
Blockly.FieldVariableGetter.prototype.getVariable = function () {
    return this.variable_;
};

/**
 * Gets the validation function for this field, or null if not set.
 * Returns null if the variable is not set, because validators should not
 * run on the initial setValue call, because the field won't be attached to
 * a block and workspace at that point.
 * @return {Function} Validation function, or null.
 */
Blockly.FieldVariable.prototype.getValidator = function() {
    // Validators shouldn't operate on the initial setValue call.
    // Normally this is achieved by calling setValidator after setValue, but
    // this is not a possibility with variable fields.
    if (this.variable_) {
        return this.validator_;
    }
    return null;
};
  
/**
 * Used to validate a value. Returns input by default. Can be overridden by
 * subclasses, see FieldDropdown.
 * @param {*=} opt_newValue The value to be validated.
 * @return {*} The validated value, same as input by default.
 * @protected
 * @suppress {deprecated} Suppress deprecated this.classValidator call.
 */
Blockly.FieldVariableGetter.prototype.doClassValidation_ = function (opt_newValue) {
    if (opt_newValue === null) {
        return null;
    }
    var newId = /** @type {string} */ (opt_newValue);
    var variable = Blockly.Variables.getVariable(
        this.sourceBlock_.workspace, newId);
    if (!variable) {
        console.warn('Variable id doesn\'t point to a real variable! ' +
            'ID was ' + newId);
        return null;
    }
    return newId;
};
  
/**
 * Update the value of this variable field, as well as its variable and text.
 *
 * The variable ID should be valid at this point, but if a variable field
 * validator returns a bad ID, this could break.
 * @param {*} newId The value to be saved.
 * @protected
 */
Blockly.FieldVariableGetter.prototype.doValueUpdate_ = function(newId) {
    // const workspace = this.getWorkspace();
    this.variable_ = Blockly.Variables.getVariable(this.sourceBlock_.workspace, newId);

    Blockly.FieldVariableGetter.superClass_.doValueUpdate_.call(this, newId);
};
  
/**
 * Updates the dropdown arrow to match the colour/style of the block.
 * @package
 */
Blockly.FieldVariableGetter.prototype.applyColour = function () {
    if (this.borderRect_) {
        this.borderRect_.setAttribute('stroke',
            this.sourceBlock_.style.colourPrimary);
        this.borderRect_.setAttribute('fill', 'transparent');
    }
};
  
/**
 * This field is editable, but only through the right-click menu.
 * @private
 */
Blockly.FieldVariableGetter.prototype.showEditor_ = function () {
    // nop.
};

/**
 * Add or remove the UI indicating if this field is editable or not.
 * This field is editable, but only through the right-click menu.
 * Suppress default editable behaviour.
 */
Blockly.FieldVariableGetter.prototype.updateEditable = function () {
    // nop.
};

/**
 * Whether this field references any Blockly variables.  If true it may need to
 * be handled differently during serialization and deserialization.  Subclasses
 * may override this.
 * @return {boolean} True if this field has any variable references.
 * @package
 */
Blockly.FieldVariableGetter.prototype.referencesVariables = function () {
    return true;
};

Blockly.fieldRegistry.register('field_variable_getter', Blockly.FieldVariableGetter);

/**
 * Mixin to add a context menu for a data_variable block.  It adds one item for
 * each variable defined on the workspace.
 * RM CHANGES -> Upgraded to develop branch of Scratch Blocks 
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.FieldVariableGetter.CUSTOM_CONTEXT_MENU_GET_VARIABLE_MIXIN = {
    /**
     * Add context menu option to change the selected variable.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var fieldName = 'VARIABLE';
        if (this.isCollapsed()) {
            return;
        }
        var currentVarName = this.getField(fieldName).text_;
        if (!this.isInFlyout) {
            // Only RM-Change for booleans vs. scalar variables.
            const outputType = this.outputConnection.getCheck()[0];
            const varType = outputType === "Boolean" ? Blockly.BOOL_VARIABLE_TYPE : Blockly.SCALAR_VARIABLE_TYPE;

            var variablesList = this.workspace.getVariablesOfType(varType);
            variablesList.sort(function (a, b) {
                return Blockly.utils.scratch.compareStrings(a.name, b.name);
            });
            for (var i = 0; i < variablesList.length; i++) {
                var varName = variablesList[i].name;
                if (varName == currentVarName) continue;

                var option = { enabled: true };
                // TODO: use message for translation
                option.text = "change to " + varName;

                option.callback =
                    Blockly.VariablesTyped.VARIABLE_OPTION_CALLBACK_FACTORY(this,
                        variablesList[i].getId(), fieldName);
                options.push(option);
            }
        } else {
            var renameOption = {
                text: Blockly.Msg.RENAME_VARIABLE,
                enabled: true,
                callback: Blockly.VariablesTyped.RENAME_OPTION_CALLBACK_FACTORY(this,
                    fieldName)
            };
            var deleteOption = {
                text: Blockly.Msg.DELETE_VARIABLE.replace('%1', currentVarName),
                enabled: true,
                callback: Blockly.VariablesTyped.DELETE_OPTION_CALLBACK_FACTORY(this,
                    fieldName)
            };
            options.push(renameOption);
            options.push(deleteOption);
        }
    }
};

Blockly.Extensions.registerMixin('contextMenu_getVariableBlock',
    Blockly.FieldVariableGetter.CUSTOM_CONTEXT_MENU_GET_VARIABLE_MIXIN);
