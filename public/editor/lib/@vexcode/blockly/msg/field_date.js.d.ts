
declare module Blockly {

    class FieldDate extends FieldDate__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldDate__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for a date input field.
             * @param {string=} opt_value The initial value of the field. Should be in
             *    'YYYY-MM-DD' format. Defaults to the current date.
             * @param {Function=} opt_validator A function that is called to validate
             *    changes to the field's value. Takes in a date string & returns a
             *    validated date string ('YYYY-MM-DD' format), or null to abort the change.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(opt_value?: string, opt_validator?: Function);
    
            /**
             * Serializable fields are saved by the XML renderer, non-serializable fields
             * are not. Editable fields should also be serializable.
             * @type {boolean}
             */
            SERIALIZABLE: boolean;
    
            /**
             * Mouse cursor style when over the hotspot that initiates the editor.
             */
            CURSOR: any /*missing*/;
    
            /**
             * Ensure that the input value is a valid date.
             * @param {*=} opt_newValue The input value.
             * @return {?string} A valid date, or null if invalid.
             * @protected
             */
            doClassValidation_(opt_newValue?: any): string;
    
            /**
             * Render the field. If the picker is shown make sure it has the current
             * date selected.
             * @protected
             */
            render_(): void;
    
            /**
             * Updates the field's colours to match those of the block.
             * @package
             */
            updateColour(): void;
    } 
    
}

declare module Blockly.FieldDate {

    /**
     * Construct a FieldDate from a JSON arg object.
     * @param {!Object} options A JSON object with options (date).
     * @return {!Blockly.FieldDate} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldDate;
}

declare module goog {

    /**
     * Back up original getMsg function.
     * @type {!Function}
     */
    var getMsgOrig: Function;

    /**
     * Gets a localized message.
     * Overrides the default Closure function to check for a Blockly.Msg first.
     * Used infrequently, only known case is TODAY button in date picker.
     * @param {string} str Translatable string, places holders in the form {$foo}.
     * @param {Object.<string, string>=} opt_values Maps place holder name to value.
     * @return {string} Message with placeholders filled.
     * @suppress {duplicate}
     */
    function getMsg(str: string, opt_values?: { [key: string]: string }): string;
}

declare module goog.getMsg {

    /**
     * Mapping of Closure messages to Blockly.Msg names.
     */
    var blocklyMsgMap: any /*missing*/;
}
