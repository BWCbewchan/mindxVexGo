
declare module Blockly {

    class FieldNumber extends FieldNumber__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldNumber__Class extends Blockly.FieldTextInput__Class  { 
    
            /**
             * Class for an editable number field.
             * @param {string|number=} opt_value The initial value of the field. Should cast
             *    to a number. Defaults to 0.
             * @param {?(string|number)=} opt_min Minimum value.
             * @param {?(string|number)=} opt_max Maximum value.
             * @param {?(string|number)=} opt_precision Precision for value.
             * @param {?Function=} opt_validator A function that is called to validate
             *    changes to the field's value. Takes in a number & returns a validated
             *    number, or null to abort the change.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/number#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.FieldTextInput}
             * @constructor
             */
            constructor(opt_value?: string|number, opt_min?: string|number, opt_max?: string|number, opt_precision?: string|number, opt_validator?: Function, opt_config?: Object);
    
            /**
             * The minimum value this number field can contain.
             * @type {number}
             * @protected
             */
            min_: number;
    
            /**
             * The maximum value this number field can contain.
             * @type {number}
             * @protected
             */
            max_: number;
    
            /**
             * The multiple to which this fields value is rounded.
             * @type {number}
             * @protected
             */
            precision_: number;
    
            /**
             * The default value for this field.
             * @type {*}
             * @protected
             */
            DEFAULT_VALUE: any;
    
            /**
             * Serializable fields are saved by the XML renderer, non-serializable fields
             * are not. Editable fields should also be serializable.
             * @type {boolean}
             */
            SERIALIZABLE: boolean;
    
            /**
             * Set the maximum, minimum and precision constraints on this field.
             * Any of these properties may be undefined or NaN to be disabled.
             * Setting precision (usually a power of 10) enforces a minimum step between
             * values. That is, the user's value will rounded to the closest multiple of
             * precision. The least significant digit place is inferred from the precision.
             * Integers values can be enforces by choosing an integer precision.
             * @param {?(number|string|undefined)} min Minimum value.
             * @param {?(number|string|undefined)} max Maximum value.
             * @param {?(number|string|undefined)} precision Precision for value.
             */
            setConstraints(min: number|string|any /*undefined*/, max: number|string|any /*undefined*/, precision: number|string|any /*undefined*/): void;
    
            /**
             * Sets the minimum value this field can contain. Updates the value to reflect.
             * @param {?(number|string|undefined)} min Minimum value.
             */
            setMin(min: number|string|any /*undefined*/): void;
    
            /**
             * Returns the current minimum value this field can contain. Default is
             * -Infinity.
             * @return {number} The current minimum value this field can contain.
             */
            getMin(): number;
    
            /**
             * Sets the maximum value this field can contain. Updates the value to reflect.
             * @param {?(number|string|undefined)} max Maximum value.
             */
            setMax(max: number|string|any /*undefined*/): void;
    
            /**
             * Returns the current maximum value this field can contain. Default is
             * Infinity.
             * @return {number} The current maximum value this field can contain.
             */
            getMax(): number;
    
            /**
             * Sets the precision of this field's value, i.e. the number to which the
             * value is rounded. Updates the field to reflect.
             * @param {?(number|string|undefined)} precision The number to which the
             *    field's value is rounded.
             */
            setPrecision(precision: number|string|any /*undefined*/): void;
    
            /**
             * Returns the current precision of this field. The precision being the
             * number to which the field's value is rounded. A precision of 0 means that
             * the value is not rounded.
             * @return {number} The number to which this field's value is rounded.
             */
            getPrecision(): number;
    } 
    
}

declare module Blockly.FieldNumber {

    /**
     * Construct a FieldNumber from a JSON arg object.
     * @param {!Object} options A JSON object with options (value, min, max, and
     *                          precision).
     * @return {!Blockly.FieldNumber} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldNumber;
}
