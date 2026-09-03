
declare module Blockly {

    class FieldMultilineInput extends FieldMultilineInput__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldMultilineInput__Class extends Blockly.FieldTextInput__Class  { 
    
            /**
             * Class for an editable text area field.
             * @param {string=} opt_value The initial content of the field. Should cast to a
             *    string. Defaults to an empty string if null or undefined.
             * @param {Function=} opt_validator An optional function that is called
             *     to validate any constraints on what the user entered.  Takes the new
             *     text as an argument and returns either the accepted text, a replacement
             *     text, or null to abort the change.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/text-input#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.FieldTextInput}
             * @constructor
             */
            constructor(opt_value?: string, opt_validator?: Function, opt_config?: Object);
    
            /**
             * Create the block UI for this field.
             * @package
             */
            initView(): void;
    
            /**
             * Updates the text of the textElement.
             * @protected
             */
            render_(): void;
    
            /**
             * Updates the size of the field based on the text.
             * @protected
             */
            updateSize_(): void;
    
            /**
             * Resize the editor to fit the text.
             * @protected
             */
            resizeEditor_(): void;
    
            /**
             * Create the text input editor widget.
             * @return {!HTMLTextAreaElement} The newly created text input editor.
             * @protected
             */
            widgetCreate_(): HTMLTextAreaElement;
    
            /**
             * Handle key down to the editor. Override the text input definition of this
             * so as to not close the editor when enter is typed in.
             * @param {!Event} e Keyboard event.
             * @protected
             */
            onHtmlInputKeyDown_(e: Event): void;
    } 
    
}

declare module Blockly.FieldMultilineInput {

    /**
     * The default height of a single line of text.
     * @type {number}
     * @const
     */
    var LINE_HEIGHT: number;

    /**
     * Construct a FieldMultilineInput from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (text, and spellcheck).
     * @return {!Blockly.FieldMultilineInput} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldMultilineInput;
}
