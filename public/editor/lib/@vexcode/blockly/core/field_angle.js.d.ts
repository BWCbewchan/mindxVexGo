
declare module Blockly {

    class FieldAngle extends FieldAngle__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FieldAngle__Class extends Blockly.FieldTextInput__Class  { 
    
            /**
             * Class for an editable angle field.
             * @param {string|number=} opt_value The initial value of the field. Should cast
             *    to a number. Defaults to 0.
             * @param {Function=} opt_validator A function that is called to validate
             *    changes to the field's value. Takes in a number & returns a
             *    validated number, or null to abort the change.
             * @param {Object=} opt_config A map of options used to configure the field.
             *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/angle#creation}
             *    for a list of properties this parameter supports.
             * @extends {Blockly.FieldTextInput}
             * @constructor
             */
            constructor(opt_value?: string|number, opt_validator?: Function, opt_config?: Object);
    
            /**
             * The angle picker's gauge path depending on the value.
             * @type {SVGElement}
             */
            gauge_: SVGElement;
    
            /**
             * The angle picker's line drawn representing the value's angle.
             * @type {SVGElement}
             */
            line_: SVGElement;
    
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
             * Create the block UI for this field.
             * @package
             */
            initView(): void;
    
            /**
             * Create and show the angle field's editor.
             * @param {Event=} opt_e Optional mouse event that triggered the field to open,
             *     or undefined if triggered programmatically.
             * @protected
             */
            showEditor_(opt_e?: Event): void;
    
            /**
             * Set the angle to match the mouse's position.
             * @param {!Event} e Mouse move event.
             * @protected
             */
            onMouseMove_(e: Event): void;
    } 
    
}

declare module Blockly.FieldAngle {

    /**
     * Construct a FieldAngle from a JSON arg object.
     * @param {!Object} options A JSON object with options (angle).
     * @return {!Blockly.FieldAngle} The new field instance.
     * @package
     * @nocollapse
     */
    function fromJson(options: Object): Blockly.FieldAngle;

    /**
     * The default amount to round angles to when using a mouse or keyboard nav
     * input. Must be a positive integer to support keyboard navigation.
     * @const {number}
     */
    var ROUND: any /*missing*/;

    /**
     * Half the width of protractor image.
     * @const {number}
     */
    var HALF: any /*missing*/;

    /**
     * Default property describing which direction makes an angle field's value
     * increase. Angle increases clockwise (true) or counterclockwise (false).
     * @const {boolean}
     */
    var CLOCKWISE: any /*missing*/;

    /**
     * The default offset of 0 degrees (and all angles). Always offsets in the
     * counterclockwise direction, regardless of the field's clockwise property.
     * Usually either 0 (0 = right) or 90 (0 = up).
     * @const {number}
     */
    var OFFSET: any /*missing*/;

    /**
     * The default maximum angle to allow before wrapping.
     * Usually either 360 (for 0 to 359.9) or 180 (for -179.9 to 180).
     * @const {number}
     */
    var WRAP: any /*missing*/;

    /**
     * Radius of protractor circle.  Slightly smaller than protractor size since
     * otherwise SVG crops off half the border at the edges.
     * @const {number}
     */
    var RADIUS: any /*missing*/;
}
