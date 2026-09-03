
declare module Blockly {

    class FieldCheckbox extends FieldCheckbox__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldCheckbox__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for a checkbox field.
             * @param {string|boolean=} opt_value The initial value of the field. Should
             *    either be 'TRUE', 'FALSE' or a boolean. Defaults to 'FALSE'.
             * @param {Function=} opt_validator  A function that is called to validate
             *    changes to the field's value. Takes in a value ('TRUE' or 'FALSE') &
             *    returns a validated value ('TRUE' or 'FALSE'), or null to abort the
             *    change.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/checkbox#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(opt_value?: string|boolean, opt_validator?: Function, opt_config?: Object);
    
            /**
             * The default value for this field.
             * @type {*}
             * @protected
             */
            DEFAULT_VALUE: any;
    
            /**
             * Serializable fields are saved by the XML renderer, non-serializable fields
             * are not. Editable fields should also be serializable.
             * @type {boolean}
             */
            SERIALIZABLE: boolean;
    
            /**
             * Mouse cursor style when over the hotspot that initiates editability.
             */
            CURSOR: any /*missing*/;
    
            /**
             * Create the block UI for this checkbox.
             * @package
             */
            initView(): void;
    
            /**
             * Set the character used for the check mark.
             * @param {?string} character The character to use for the check mark, or
             *    null to use the default.
             */
            setCheckCharacter(character: string): void;
    
            /**
             * Toggle the state of the checkbox on click.
             * @protected
             */
            showEditor_(): void;
    
            /**
             * Ensure that the input value is valid ('TRUE' or 'FALSE').
             * @param {*=} opt_newValue The input value.
             * @return {?string} A valid value ('TRUE' or 'FALSE), or null if invalid.
             * @protected
             */
            doClassValidation_(opt_newValue?: any): string;
    
            /**
             * Update the value of the field, and update the checkElement.
             * @param {*} newValue The value to be saved. The default validator guarantees
             * that this is a either 'TRUE' or 'FALSE'.
             * @protected
             */
            doValueUpdate_(newValue: any): void;
    
            /**
             * Get the value of this field, either 'TRUE' or 'FALSE'.
             * @return {string} The value of this field.
             */
            getValue(): string;
    
            /**
             * Get the boolean value of this field.
             * @return {boolean} The boolean value of this field.
             */
            getValueBoolean(): boolean;
    
            /**
             * Get the text of this field. Used when the block is collapsed.
             * @return {string} Text representing the value of this field
             *    ('true' or 'false').
             */
            getText(): string;
    } 
    
}

declare module Blockly.FieldCheckbox {

    /**
     * Construct a FieldCheckbox from a JSON arg object.
     * @param {!Object} options A JSON object with options (checked).
     * @return {!Blockly.FieldCheckbox} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldCheckbox;

    /**
     * Default character for the checkmark.
     * @type {string}
     * @const
     */
    var CHECK_CHAR: string;
}
