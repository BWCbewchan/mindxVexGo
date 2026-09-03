
declare module Blockly {

    interface IBoundedElement {
    
        /**
          * Returns the coordinates of a bounded element describing the dimensions of the
          * element.
          * Coordinate system: workspace coordinates.
          * @return {!Blockly.utils.Rect} Object with coordinates of the bounded element.
          */
        getBoundingRectangle(): Blockly.utils.Rect;
    }
}
