
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
             * The SVG group element that will contain a text element for each text row
             *     when initialized.
             * @type {SVGGElement}
             */
            textGroup_: SVGGElement;
    
            /**
             * Property set by the custom editor system, used to handle dispose for the
             * custom editor before hiding the widget.
             * @type {function(): void}
             */
            customWidgetDispose_: { (): void };
    
            /**
             * property set by the config options. This tells the field if it should try
             * to use the custom editor/viewer options if they are configured. If the
             * custom editor/viewer options are not set, or this is false, the field will
             * use the standard editor/viewer system.
             * @type {boolean}
             */
            enableCustomEditor: boolean;
    
            /**
             * Property is set by the config options to tell the renderer if the monospace
             * font class should be added to the element
             * @type {boolean}
             */
            useMonospaceFontClass: boolean;
    
            /**
             * Serializes this field's value to XML. Should only be called by Blockly.Xml.
             * @param {!Element} fieldElement The element to populate with info about the
             *    field's state.
             * @return {!Element} The element containing info about the field's state.
             * @package
             */
            toXml(fieldElement: Element): Element;
    
            /**
             * Sets the field's value based on the given XML element. Should only be
             * called by Blockly.Xml.
             * @param {!Element} fieldElement The element containing info about the
             *    field's state.
             * @package
             */
            fromXml(fieldElement: Element): void;
    
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
     * Construct a FieldMultilineInput from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (text, and spellcheck).
     * @return {!Blockly.FieldMultilineInput} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldMultilineInput;

    /**
     * @param containerDiv the div that will contain the custom editor
     * @param currentValue the starting value to display in the editor
     * @param scale the current scale of the workspace
     * @param onChangeCallback a callback function that will get called any
     * time the value in the editor changes
     * @param onCancelCallback a callback function that will get called any
     * time editor detects that the escape button is pressed.
     * @param setDisposeFunction a function that gets called to tell Blockly
     * what function to call to handle disposing of the custom editor.
     * @returns a value (not undefined) if a custom editor was created
     * @typedef {(
     *     containerDiv: HTMLDivElement,
     *     currentValue: string,
     *     scale: number,
     *     onChangeCallback: (newValue: string) => void,
     *     onCancelCallback: () => void,
     *     setDisposeFunction: (disposeFunction: () => void) => void
     * ) => any}
     */
    function CustomEditorFunction(containerDiv: any /*missing*/, currentValue: any /*missing*/, scale: any /*missing*/, onChangeCallback: any /*missing*/, onCancelCallback: any /*missing*/, setDisposeFunction: any /*missing*/): void;

    /**
     * @param containerDiv the div that will contain the custom viewer
     * @param currentValue the starting value to display in the viewer
     * @returns a value (not undefined) if a custom viewer was created
     * @typedef {(
     *     containerDiv: HTMLDivElement,
     *     currentValue: string,
     * ) => boolean}
     */
    function CustomViewerFunction(containerDiv: any /*missing*/, currentValue: any /*missing*/): void;

    /**
     * a function that can be set to override the default editor used by the multiline input
     * @type {Blockly.FieldMultilineInput.CustomEditorFunction}
     */
    var customEditor: Blockly.FieldMultilineInput.CustomEditorFunction;

    /**
     * a function that can be set to override the default viewer used by the multiline input
     * @type {Blockly.FieldMultilineInput.CustomViewerFunction}
     */
    var customViewer: Blockly.FieldMultilineInput.CustomViewerFunction;
}
