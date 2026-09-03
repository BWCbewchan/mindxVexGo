
declare module Blockly.blockRendering {

    class Icon extends Icon__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Icon__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the space an icon takes up during
             * rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Icon} icon The icon to measure and store information for.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, icon: Blockly.Icon);
    } 
    

    class JaggedEdge extends JaggedEdge__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class JaggedEdge__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the jagged edge of a collapsed block
             * takes up during rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    } 
    

    class Field extends Field__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Field__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the space a field takes up during
             * rendering
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {!Blockly.Field} field The field to measure and store information for.
             * @param {!Blockly.Input} parentInput The parent input for the field.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, field: Blockly.Field, parentInput: Blockly.Input);
    } 
    

    class Hat extends Hat__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Hat__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the space a hat takes up during
             * rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider);
    } 
    

    class SquareCorner extends SquareCorner__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class SquareCorner__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the space a square corner takes up
             * during rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {string=} opt_position The position of this corner.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, opt_position?: string);
    } 
    

    class RoundCorner extends RoundCorner__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class RoundCorner__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the space a rounded corner takes up
             * during rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {string=} opt_position The position of this corner.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, opt_position?: string);
    } 
    

    class RoundCornerLarge extends RoundCornerLarge__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class RoundCornerLarge__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about the space a large rounded corner takes up
             * during rendering.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {string=} opt_position The position of this corner.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, opt_position?: string);
    } 
    

    class InRowSpacer extends InRowSpacer__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class InRowSpacer__Class extends Blockly.blockRendering.Measurable__Class  { 
    
            /**
             * An object containing information about a spacer between two elements on a
             * row.
             * @param {!Blockly.blockRendering.ConstantProvider} constants The rendering
             *   constants provider.
             * @param {number} width The width of the spacer.
             * @package
             * @constructor
             * @extends {Blockly.blockRendering.Measurable}
             */
            constructor(constants: Blockly.blockRendering.ConstantProvider, width: number);
    } 
    
}
