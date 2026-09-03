
declare module Blockly {

    class FieldLabel extends FieldLabel__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldLabel__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for a non-editable, non-serializable text field.
             * @param {string=} opt_value The initial value of the field. Should cast to a
             *    string. Defaults to an empty string if null or undefined.
             * @param {string=} opt_class Optional CSS class for the field's text.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/label#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(opt_value?: string, opt_class?: string, opt_config?: Object);
    
            /**
             * The default value for this field.
             * @type {*}
             * @protected
             */
            DEFAULT_VALUE: any;
    
            /**
             * Editable fields usually show some sort of UI indicating they are
             * editable. This field should not.
             * @type {boolean}
             */
            EDITABLE: boolean;
    
            /**
             * Create block UI for this label.
             * @package
             */
            initView(): void;
    
            /**
             * Ensure that the input value casts to a valid string.
             * @param {*=} opt_newValue The input value.
             * @return {?string} A valid string, or null if invalid.
             * @protected
             */
            doClassValidation_(opt_newValue?: any): string;
    
            /**
             * Set the css class applied to the field's textElement_.
             * @param {?string} cssClass The new css class name, or null to remove.
             */
            setClass(cssClass: string): void;
    } 
    
}

declare module Blockly.FieldLabel {

    /**
     * Construct a FieldLabel from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (text, and class).
     * @return {!Blockly.FieldLabel} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldLabel;
}
