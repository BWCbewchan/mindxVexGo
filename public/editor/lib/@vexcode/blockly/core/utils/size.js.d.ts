
declare module Blockly.utils {

    class Size extends Size__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Size__Class  { 
    
            /**
             * Class for representing sizes consisting of a width and height.
             * @param {number} width Width.
             * @param {number} height Height.
             * @struct
             * @constructor
             */
            constructor(width: number, height: number);
    
            /**
             * Width
             * @type {number}
             */
            width: number;
    
            /**
             * Height
             * @type {number}
             */
            height: number;
    } 
    
}

declare module Blockly.utils.Size {

    /**
     * Compares sizes for equality.
     * @param {Blockly.utils.Size} a A Size.
     * @param {Blockly.utils.Size} b A Size.
     * @return {boolean} True iff the sizes have equal widths and equal
     *     heights, or if both are null.
     */
    function equals(a: Blockly.utils.Size, b: Blockly.utils.Size): boolean;
}
