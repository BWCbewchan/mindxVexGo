
declare module Blockly.utils.deprecation {

    /**
     * Warn developers that a function is deprecated.
     * @param {string} functionName The name of the function.
     * @param {string} deprecationDate The date when the function was deprecated.
     *     Prefer 'month yyyy' or 'quarter yyyy' format.
     * @param {string} deletionDate The date when the function will be deleted, in
     *     the same format as the deprecation date.
     * @param {string=} opt_use The name of a function to use instead, if any.
     * @package
     */
    function warn(functionName: string, deprecationDate: string, deletionDate: string, opt_use?: string): void;
}
