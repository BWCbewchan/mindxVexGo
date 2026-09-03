
declare module Blockly {

    class FieldTextInputRemovable extends FieldTextInputRemovable__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldTextInputRemovable__Class extends Blockly.FieldTextInput__Class  { 
    
            /**
             * Class for an editable text field displaying a deletion icon when selected.
             * @param {string} text The initial content of the field.
             * @param {Function=} opt_validator An optional function that is called
             *     to validate any constraints on what the user entered.  Takes the new
             *     text as an argument and returns either the accepted text, a replacement
             *     text, or null to abort the change.
             * @param {RegExp=} opt_restrictor An optional regular expression to restrict
             *     typed text to. Text that doesn't match the restrictor will never show
             *     in the text field.
             * @extends {Blockly.FieldTextInput}
             * @constructor
             */
            constructor(text: string, opt_validator?: Function, opt_restrictor?: RegExp);
    } 
    
}

declare module Blockly.FieldTextInputRemovable {

    /**
     * Helper function to construct a FieldTextInputRemovable from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (text, class, and
     *                          spellcheck).
     * @returns {!Blockly.FieldTextInputRemovable} The new text input.
     * @public
     */
    function fromJson(options: Object): Blockly.FieldTextInputRemovable;
}
