
declare module Blockly {

    class FieldImage extends FieldImage__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldImage__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for an image on a block.
             * @param {string} src The URL of the image.
             * @param {!(string|number)} width Width of the image.
             * @param {!(string|number)} height Height of the image.
             * @param {string=} opt_alt Optional alt text for when block is collapsed.
             * @param {function(!Blockly.FieldImage)=} opt_onClick Optional function to be
             *     called when the image is clicked. If opt_onClick is defined, opt_alt must
             *     also be defined.
             * @param {boolean=} opt_flipRtl Whether to flip the icon in RTL.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/image#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(src: string, width: string|number, height: string|number, opt_alt?: string, opt_onClick?: { (_0: Blockly.FieldImage): any /*missing*/ }, opt_flipRtl?: boolean, opt_config?: Object);
    
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
             * Used to tell if the field needs to be rendered the next time the block is
             * rendered. Image fields are statically sized, and only need to be
             * rendered at initialization.
             * @type {boolean}
             * @protected
             */
            isDirty_: boolean;
    
            /**
             * Create the block UI for this image.
             * @package
             */
            initView(): void;
    
            /**
             * Ensure that the input value (the source URL) is a string.
             * @param {*=} opt_newValue The input value.
             * @return {?string} A string, or null if invalid.
             * @protected
             */
            doClassValidation_(opt_newValue?: any): string;
    
            /**
             * Update the value of this image field, and update the displayed image.
             * @param {*} newValue The value to be saved. The default validator guarantees
             * that this is a string.
             * @protected
             */
            doValueUpdate_(newValue: any): void;
    
            /**
             * Set the alt text of this image.
             * @param {?string} alt New alt text.
             * @public
             */
            setAlt(alt: string): void;
    
            /**
             * If field click is called, and click handler defined,
             * call the handler.
             * @protected
             */
            showEditor_(): void;
    
            /**
             * Set the function that is called when this image  is clicked.
             * @param {?function(!Blockly.FieldImage)} func The function that is called
             *    when the image is clicked, or null to remove.
             */
            setOnClickHandler(func: { (_0: Blockly.FieldImage): any /*missing*/ }): void;
    } 
    
}

declare module Blockly.FieldImage {

    /**
     * Construct a FieldImage from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (src, width, height,
     *    alt, and flipRtl).
     * @return {!Blockly.FieldImage} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldImage;
}
