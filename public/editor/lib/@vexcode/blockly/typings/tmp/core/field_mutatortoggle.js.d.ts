
declare module Blockly {

    class FieldMutatorTogle extends FieldMutatorTogle__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldMutatorTogle__Class extends Blockly.Field__Class  { 
    
            /**
             * Class for an FieldMutatorTogle on a block.
             * @param {boolean|string} active true if the mutation is active.
             * @param {string} expandedText the text to display when the mutator is expanded
             * @param {Function} callback callback for when the mutator is toggled.
             * @extends {Blockly.Field}
             * @constructor
             */
            constructor(active: boolean|string, expandedText: string, callback: Function);
    
            /**
             * Editable fields are saved by the XML renderer, non-editable fields are not.
             */
            EDITABLE: any /*missing*/;
    
            /**
             * Serializable fields are saved by the XML renderer, non-serializable fields
             * are not.  Editable fields should be serialized.
             * @type {boolean}
             * @public
             */
            SERIALIZABLE: boolean;
    
            /**
             * Mouse cursor style when over the hotspot that initiates editability.
             */
            CURSOR: any /*missing*/;
    
            /**
             * Create the block UI for this field.
             * @package
             */
            initView(): void;
    
            /**
             * Dispose of all DOM objects belonging to this text.
             */
            dispose(): void;
    
            /**
             * Ensure that the input value is valid.
             * @param {(string|boolean)=} newValue The input value.
             * @return {?boolean} A valid value, or null if invalid.
             * @protected
             */
            doClassValidation_(newValue?: string|boolean): boolean;
    
            /**
             * Update the value of this dropdown field.
             * @param {boolean} newValue The value to be saved. The default validator guarantees
             * that this is one of the valid dropdown options.
             * @protected
             */
            doValueUpdate_(newValue: boolean): void;
    
            /**
             * Draws the border with the correct width.
             * @protected
             */
            render_(): void;
    
            /**
             * Create an SVG based arrow.
             * @protected
             */
            createSVGArrow_(): void;
    } 
    
}

declare module Blockly.FieldMutatorTogle {

    /**
     * Construct a FieldMutatorTogle from a JSON arg object,
     * dereferencing any string table references.
     * @param {!Object} options A JSON object with options (active, callback).
     * @returns {!Blockly.FieldMutatorTogle} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldMutatorTogle;
}
