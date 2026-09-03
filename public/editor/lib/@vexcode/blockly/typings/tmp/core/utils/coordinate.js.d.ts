
declare module Blockly.utils {

    class Coordinate extends Coordinate__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Coordinate__Class  { 
    
            /**
             * Class for representing coordinates and positions.
             * @param {number} x Left.
             * @param {number} y Top.
             * @struct
             * @constructor
             */
            constructor(x: number, y: number);
    
            /**
             * X-value
             * @type {number}
             */
            x: number;
    
            /**
             * Y-value
             * @type {number}
             */
            y: number;
    
            /**
             * Scales this coordinate by the given scale factor.
             * @param {number} s The scale factor to use for both x and y dimensions.
             * @return {!Blockly.utils.Coordinate} This coordinate after scaling.
             */
            scale(s: number): Blockly.utils.Coordinate;
    
            /**
             * Translates this coordinate by the given offsets.
             * respectively.
             * @param {number} tx The value to translate x by.
             * @param {number} ty The value to translate y by.
             * @return {!Blockly.utils.Coordinate} This coordinate after translating.
             */
            translate(tx: number, ty: number): Blockly.utils.Coordinate;
    } 
    
}

declare module Blockly.utils.Coordinate {

    /**
     * Compares coordinates for equality.
     * @param {Blockly.utils.Coordinate} a A Coordinate.
     * @param {Blockly.utils.Coordinate} b A Coordinate.
     * @return {boolean} True iff the coordinates are equal, or if both are null.
     */
    function equals(a: Blockly.utils.Coordinate, b: Blockly.utils.Coordinate): boolean;

    /**
     * Returns the distance between two coordinates.
     * @param {!Blockly.utils.Coordinate} a A Coordinate.
     * @param {!Blockly.utils.Coordinate} b A Coordinate.
     * @return {number} The distance between `a` and `b`.
     */
    function distance(a: Blockly.utils.Coordinate, b: Blockly.utils.Coordinate): number;

    /**
     * Returns the magnitude of a coordinate.
     * @param {!Blockly.utils.Coordinate} a A Coordinate.
     * @return {number} The distance between the origin and `a`.
     */
    function magnitude(a: Blockly.utils.Coordinate): number;

    /**
     * Returns the difference between two coordinates as a new
     * Blockly.utils.Coordinate.
     * @param {!Blockly.utils.Coordinate|!SVGPoint} a An x/y coordinate.
     * @param {!Blockly.utils.Coordinate|!SVGPoint} b An x/y coordinate.
     * @return {!Blockly.utils.Coordinate} A Coordinate representing the difference
     *     between `a` and `b`.
     */
    function difference(a: Blockly.utils.Coordinate|SVGPoint, b: Blockly.utils.Coordinate|SVGPoint): Blockly.utils.Coordinate;

    /**
     * Returns the sum of two coordinates as a new Blockly.utils.Coordinate.
     * @param {!Blockly.utils.Coordinate|!SVGPoint} a An x/y coordinate.
     * @param {!Blockly.utils.Coordinate|!SVGPoint} b An x/y coordinate.
     * @return {!Blockly.utils.Coordinate} A Coordinate representing the sum of
     *     the two coordinates.
     */
    function sum(a: Blockly.utils.Coordinate|SVGPoint, b: Blockly.utils.Coordinate|SVGPoint): Blockly.utils.Coordinate;
}
