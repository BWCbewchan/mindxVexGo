
declare module Blockly.utils.colour {

    /**
     * Parses a colour from a string.
     * .parse('red') -> '#ff0000'
     * .parse('#f00') -> '#ff0000'
     * .parse('#ff0000') -> '#ff0000'
     * .parse('0xff0000') -> '#ff0000'
     * .parse('0xf000') -> '#ff000000'
     * .parse('0xff000000') -> '#ff000000'
     * .parse('rgb(255, 0, 0)') -> '#ff0000'
     * @param {string|number} str Colour in some CSS format.
     * @return {?string} A string containing a hex representation of the colour,
     *   or null if can't be parsed.
     */
    function parse(str: string|number): string;

    /**
     * Converts a colour from RGB to hex representation.
     * @param {number} r Amount of red, int between 0 and 255.
     * @param {number} g Amount of green, int between 0 and 255.
     * @param {number} b Amount of blue, int between 0 and 255.
     * @return {string} Hex representation of the colour.
     */
    function rgbToHex(r: number, g: number, b: number): string;

    /**
     * Converts a color from RGBA to hex representation.
     * @param {number} r Amount of red, int between 0 and 255.
     * @param {number} g Amount of green, int between 0 and 255.
     * @param {number} b Amount of blue, int between 0 and 255.
     * @param {number} a Amount of alpha, float between 0 and 1.
     * @return {string} hex representation of the color.
     */
    function rgbaToHex(r: number, g: number, b: number, a: number): string;

    /**
     * Converts an 8-hex representation of a color to RGBA.
     * @param {string} hexColor Color to convert.
     * @return {!Array<number>} array containing [r, g, b, a].
     *     r, g, b are ints between 0
     *     and 255, and a is a value between 0 and 1.
     */
    function hexToRgba(hexColor: string): number[];

    /**
     * Converts a colour to RGB.
     * @param {string} colour String representing colour in any
     *     colour format ('#ff0000', 'red', '0xff000', etc).
     * @return {!Array.<number>} RGB representation of the colour.
     */
    function hexToRgb(colour: string): number[];

    /**
     * Converts an HSV triplet to hex representation.
     * @param {number} h Hue value in [0, 360].
     * @param {number} s Saturation value in [0, 1].
     * @param {number} v Brightness in [0, 255].
     * @return {string} Hex representation of the colour.
     */
    function hsvToHex(h: number, s: number, v: number): string;

    /**
     * Blend two colours together, using the specified factor to indicate the
     * weight given to the first colour.
     * @param {string} colour1 First colour.
     * @param {string} colour2 Second colour.
     * @param {number} factor The weight to be given to colour1 over colour2.
     *     Values should be in the range [0, 1].
     * @return {?string} Combined colour represented in hex.
     */
    function blend(colour1: string, colour2: string, factor: number): string;

    /**
     * A map that contains the 16 basic colour keywords as defined by W3C:
     * https://www.w3.org/TR/2018/REC-css-color-3-20180619/#html4
     * The keys of this map are the lowercase "readable" names of the colours,
     * while the values are the "hex" values.
     *
     * @type {!Object<string, string>}
     */
    var names: { [key: string]: string };
}
