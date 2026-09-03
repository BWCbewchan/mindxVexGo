
declare module Blockly.utils {

    class Rect extends Rect__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Rect__Class  { 
    
            /**
             * Class for representing rectangular regions.
             * @param {number} top Top.
             * @param {number} bottom Bottom.
             * @param {number} left Left.
             * @param {number} right Right.
             * @struct
             * @constructor
             */
            constructor(top: number, bottom: number, left: number, right: number);
    
            /** @type {number} */
            top: number;
    
            /** @type {number} */
            bottom: number;
    
            /** @type {number} */
            left: number;
    
            /** @type {number} */
            right: number;
    
            /**
             * Tests whether this rectangle contains a x/y coordinate.
             *
             * @param {number} x The x coordinate to test for containment.
             * @param {number} y The y coordinate to test for containment.
             * @return {boolean} Whether this rectangle contains given coordinate.
             */
            contains(x: number, y: number): boolean;
    } 
    
}
