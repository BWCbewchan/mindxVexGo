
declare module Blockly.utils.object {

    /**
     * Inherit the prototype methods from one constructor into another.
     *
     * @param {!Function} childCtor Child class.
     * @param {!Function} parentCtor Parent class.
     * @suppress {strictMissingProperties} superClass_ is not defined on Function.
     */
    function inherits(childCtor: Function, parentCtor: Function): void;

    /**
     * Copies all the members of a source object to a target object.
     * @param {!Object} target Target.
     * @param {!Object} source Source.
     */
    function mixin(target: Object, source: Object): void;

    /**
     * Complete a deep merge of all members of a source object with a target object.
     * @param {!Object} target Target.
     * @param {!Object} source Source.
     * @return {!Object} The resulting object.
     */
    function deepMerge(target: Object, source: Object): Object;

    /**
     * Returns an array of a given object's own enumerable property values.
     * @param {!Object} obj Object containing values.
     * @return {!Array} Array of values.
     */
    function values(obj: Object): any[];
}
