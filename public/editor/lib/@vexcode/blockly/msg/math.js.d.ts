
declare module Blockly.utils.math {

    /**
     * Converts degrees to radians.
     * Copied from Closure's goog.math.toRadians.
     * @param {number} angleDegrees Angle in degrees.
     * @return {number} Angle in radians.
     */
    function toRadians(angleDegrees: number): number;

    /**
     * Converts radians to degrees.
     * Copied from Closure's goog.math.toDegrees.
     * @param {number} angleRadians Angle in radians.
     * @return {number} Angle in degrees.
     */
    function toDegrees(angleRadians: number): number;

    /**
     * Clamp the provided number between the lower bound and the upper bound.
     * @param {number} lowerBound The desired lower bound.
     * @param {number} number The number to clamp.
     * @param {number} upperBound The desired upper bound.
     * @return {number} The clamped number.
     */
    function clamp(lowerBound: number, number: number, upperBound: number): number;
}
