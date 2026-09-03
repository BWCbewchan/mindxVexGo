
declare module Blockly.utils._string {

    /**
     * Fast prefix-checker.
     * Copied from Closure's goog.string.startsWith.
     * @param {string} str The string to check.
     * @param {string} prefix A string to look for at the start of `str`.
     * @return {boolean} True if `str` begins with `prefix`.
     */
    function startsWith(str: string, prefix: string): boolean;

    /**
     * Given an array of strings, return the length of the shortest one.
     * @param {!Array.<string>} array Array of strings.
     * @return {number} Length of shortest string.
     */
    function shortestStringLength(array: string[]): number;

    /**
     * Given an array of strings, return the length of the common prefix.
     * Words may not be split.  Any space after a word is included in the length.
     * @param {!Array.<string>} array Array of strings.
     * @param {number=} opt_shortest Length of shortest string.
     * @return {number} Length of common prefix.
     */
    function commonWordPrefix(array: string[], opt_shortest?: number): number;

    /**
     * Given an array of strings, return the length of the common suffix.
     * Words may not be split.  Any space after a word is included in the length.
     * @param {!Array.<string>} array Array of strings.
     * @param {number=} opt_shortest Length of shortest string.
     * @return {number} Length of common suffix.
     */
    function commonWordSuffix(array: string[], opt_shortest?: number): number;

    /**
     * Wrap text to the specified width.
     * @param {string} text Text to wrap.
     * @param {number} limit Width to wrap each line.
     * @return {string} Wrapped text.
     */
    function wrap(text: string, limit: number): string;
}
