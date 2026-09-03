
declare module Blockly {

    class FieldTextInput extends FieldTextInput__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldTextInput__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for an editable text field.
             * @param {string=} opt_value The initial value of the field. Should cast to a
             *    string. Defaults to an empty string if null or undefined.
             * @param {?Function=} opt_validator A function that is called to validate
             *    changes to the field's value. Takes in a string & returns a validated
             *    string, or null to abort the change.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/text-input#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(opt_value?: string, opt_validator?: Function, opt_config?: Object);
    
            /**
             * Allow browser to spellcheck this field.
             * @type {boolean}
             * @protected
             */
            spellcheck_: boolean;
    
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
             * Ensure that the input value casts to a valid string.
             * @param {*=} opt_newValue The input value.
             * @return {*} A valid string, or null if invalid.
             * @protected
             */
            doClassValidation_(opt_newValue?: any): any;
    
            /**
             * Called by setValue if the text input is not valid. If the field is
             * currently being edited it reverts value of the field to the previous
             * value while allowing the display text to be handled by the htmlInput_.
             * @param {*} _invalidValue The input value that was determined to be invalid.
             *    This is not used by the text input because its display value is stored on
             *    the htmlInput_.
             * @protected
             */
            doValueInvalid_(_invalidValue: any): void;
    
            /**
             * Called by setValue if the text input is valid. Updates the value of the
             * field, and updates the text of the field if it is not currently being
             * edited (i.e. handled by the htmlInput_).
             * @param {*} newValue The value to be saved. The default validator guarantees
             * that this is a string.
             * @protected
             */
            doValueUpdate_(newValue: any): void;
    
            /**
             * Updates the colour of the htmlInput given the current validity of the
             * field's value.
             * @protected
             */
            render_(): void;
    
            /**
             * Set whether this field is spellchecked by the browser.
             * @param {boolean} check True if checked.
             */
            setSpellcheck(check: boolean): void;
    
            /**
             * Show the inline free-text editor on top of the text.
             * @param {boolean=} opt_quietInput True if editor should be created without
             *     focus.  Defaults to false.
             * @protected
             */
            showEditor_(opt_quietInput?: boolean): void;
    
            /**
             * Create the text input editor widget.
             * @return {!HTMLElement} The newly created text input editor.
             * @protected
             */
            widgetCreate_(): HTMLElement;
    
            /**
             * Bind handlers for user input on the text input field's editor.
             * @param {!HTMLElement} htmlInput The htmlInput to which event
             *    handlers will be bound.
             * @protected
             */
            bindInputEvents_(htmlInput: HTMLElement): void;
    
            /**
             * Handle key down to the editor.
             * @param {!Event} e Keyboard event.
             * @protected
             */
            onHtmlInputKeyDown_(e: Event): void;
    
            /**
             * Set the html input value and the field's internal value. The difference
             * between this and ``setValue`` is that this also updates the html input
             * value whilst editing.
             * @param {*} newValue New value.
             * @protected
             */
            setEditorValue_(newValue: any): void;
    
            /**
             * Resize the editor to fit the text.
             * @protected
             */
            resizeEditor_(): void;
    
            /**
             * Transform the provided value into a text to show in the html input.
             * Override this method if the field's html input representation is different
             * than the field's value. This should be coupled with an override of
             * `getValueFromEditorText_`.
             * @param {*} value The value stored in this field.
             * @returns {string} The text to show on the html input.
             * @protected
             */
            getEditorText_(value: any): string;
    
            /**
             * Transform the text received from the html input into a value to store
             * in this field.
             * Override this method if the field's html input representation is different
             * than the field's value. This should be coupled with an override of
             * `getEditorText_`.
             * @param {string} text Text received from the html input.
             * @returns {*} The value to store.
             * @protected
             */
            getValueFromEditorText_(text: string): any;
    } 
    
}

declare module Blockly.FieldTextInput {

    /**
     * Construct a FieldTextInput from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (text, and spellcheck).
     * @return {!Blockly.FieldTextInput} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldTextInput;

    /**
     * Point size of text.  Should match blocklyText's font-size in CSS.
     */
    var FONTSIZE: any /*missing*/;

    /**
     * Pixel size of input border radius.
     * Should match blocklyText's border-radius in CSS.
     */
    var BORDERRADIUS: any /*missing*/;

    /**
     * Ensure that only a number may be entered.
     * @param {string} text The user's text.
     * @return {?string} A string representing a valid number, or null if invalid.
     * @deprecated
     */
    function numberValidator(text: string): string;

    /**
     * Ensure that only a non-negative integer may be entered.
     * @param {string} text The user's text.
     * @return {?string} A string representing a valid int, or null if invalid.
     * @deprecated
     */
    function nonnegativeIntegerValidator(text: string): string;
}
