
declare module Blockly {

    class FieldColourSliderRGB extends FieldColourSliderRGB__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldColourSliderRGB__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for a slider-based colour input field.
             * @param {string} colour The initial colour in '#rrggbb' format.
             * @param {Function=} opt_validator A function that is executed when a new
             *     colour is selected.  Its sole argument is the new colour value.  Its
             *     return value becomes the selected colour, unless it is undefined, in
             *     which case the new colour stands, or it is null, in which case the change
             *     is aborted.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(colour: string, opt_validator?: Function);
    
            /**
             * Install this field on a block.
             */
            init(): void;
    
            /**
             * Return the current colour.
             * @return {string} Current colour in '#rrggbbaa' format.
             */
            getValue(): string;
    
            /**
             * Ensure that the input value is a valid colour.
             * @param {*=} opt_newValue The input value.
             * @return {?string} A valid colour, or null if invalid.
             * @protected
             */
            doClassValidation_(opt_newValue?: any): string;
    
            /**
             * Update the value of this colour field, and update the displayed colour.
             * @param {*} colour The value to be saved. The default validator guarantees
             * that this is a colour in '#rrggbb' format.
             * @protected
             */
            doValueUpdate_(colour: any): void;
    
            /**
             * Get the text from this field.  Used when the block is collapsed.
             * @return {string} Current text.
             */
            getText(): string;
    } 
    
}

declare module Blockly.FieldColourSliderRGB {

    /**
     * Construct a FieldColourSliderRGB from a JSON arg object.
     * @param {!Object} options A JSON object with options (colour).
     * @returns {!Blockly.FieldColourSliderRGB} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldColourSliderRGB;
}
