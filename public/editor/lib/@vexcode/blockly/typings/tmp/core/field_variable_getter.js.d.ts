
declare module Blockly {

    class FieldVariableGetter extends FieldVariableGetter__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldVariableGetter__Class extends Blockly.FieldLabel__Class  { 
    
            /**
             * Class for a variable getter field.
             * @param {string} text The initial content of the field.
             * @param {string} name the field name.
             * @param {string=} opt_varType The type of variable this field is associated with.
             * @extends {Blockly.FieldLabel}
             * @constructor
             *
             */
            constructor(text: string, name: string, opt_varType?: string);
    
            /**
             * Maximum characters of text to display before adding an ellipsis.
             * Same for strings and numbers.
             * @type {number}
             */
            maxDisplayLength: number;
    
            /**
             * Editable fields usually show some sort of UI for the user to change them.
             * This field should be serialized, but only edited programmatically.
             * @type {boolean}
             * @public
             */
            EDITABLE: boolean;
    
            /**
             * Serializable fields are saved by the XML renderer, non-serializable fields
             * are not.  This field should be serialized, but only edited programmatically.
             * @type {boolean}
             * @public
             */
            SERIALIZABLE: boolean;
    
            /**
             * Initialize the model for this field if it has not already been initialized.
             * If the value has not been set to a variable by the first render, we make up a
             * variable rather than let the value be invalid.
             * @package
             */
            initModel(): void;
    
            /**
             * Initialize this field based on the given XML.
             * @param {!Element} fieldElement The element containing information about the
             *    variable field's state.
             */
            fromXml(fieldElement: Element): void;
    
            /**
             * Serialize this field to XML.
             * @param {!Element} fieldElement The element to populate with info about the
             *    field's state.
             * @return {!Element} The element containing info about the field's state.
             */
            toXml(fieldElement: Element): Element;
    
            /**
             * Get the variable's ID.
             * @return {string} Current variable's ID.
             */
            getValue(): string;
    
            /**
             * Get the text from this field.
             * @return {string} Current text.
             */
            getText(): string;
    
            /**
             * Get the variable model for the variable associated with this field.
             * Not guaranteed to be in the variable map on the workspace (e.g. if accessed
             * after the variable has been deleted).
             * @return {?Blockly.VariableModel} the selected variable, or null if none was
             *     selected.
             * @package
             */
            getVariable(): Blockly.VariableModel;
    
            /**
             * Used to validate a value. Returns input by default. Can be overridden by
             * subclasses, see FieldDropdown.
             * @param {*=} opt_newValue The value to be validated.
             * @return {*} The validated value, same as input by default.
             * @protected
             * @suppress {deprecated} Suppress deprecated this.classValidator call.
             */
            doClassValidation_(opt_newValue?: any): any;
    
            /**
             * Update the value of this variable field, as well as its variable and text.
             *
             * The variable ID should be valid at this point, but if a variable field
             * validator returns a bad ID, this could break.
             * @param {*} newId The value to be saved.
             * @protected
             */
            doValueUpdate_(newId: any): void;
    
            /**
             * Updates the dropdown arrow to match the colour/style of the block.
             * @package
             */
            applyColour(): void;
    
            /**
             * Add or remove the UI indicating if this field is editable or not.
             * This field is editable, but only through the right-click menu.
             * Suppress default editable behaviour.
             */
            updateEditable(): void;
    
            /**
             * Whether this field references any Blockly variables.  If true it may need to
             * be handled differently during serialization and deserialization.  Subclasses
             * may override this.
             * @return {boolean} True if this field has any variable references.
             * @package
             */
            referencesVariables(): boolean;
    } 
    
}

declare module Blockly.FieldVariableGetter {

    /**
     * Construct a FieldVariableGetter from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (variable,
     *                          variableTypes, and defaultType).
     * @returns {!Blockly.FieldVariableGetter} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldVariableGetter;

    /**
     * Mixin to add a context menu for a data_variable block.  It adds one item for
     * each variable defined on the workspace.
     * RM CHANGES -> Upgraded to develop branch of Scratch Blocks 
     * @mixin
     * @augments Blockly.Block
     * @package
     * @readonly
     */
    var CUSTOM_CONTEXT_MENU_GET_VARIABLE_MIXIN: any /*missing*/;
}
