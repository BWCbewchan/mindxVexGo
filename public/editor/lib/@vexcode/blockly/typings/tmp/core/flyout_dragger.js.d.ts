
declare module Blockly {

    class FlyoutDragger extends FlyoutDragger__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class FlyoutDragger__Class extends Blockly.WorkspaceDragger__Class  { 
    
            /**
             * Class for a flyout dragger.  It moves a flyout workspace around when it is
             * being dragged by a mouse or touch.
             * Note that the workspace itself manages whether or not it has a drag surface
             * and how to do translations based on that.  This simply passes the right
             * commands based on events.
             * @param {!Blockly.IFlyout} flyout The flyout to drag.
             * @extends {Blockly.WorkspaceDragger}
             * @constructor
             */
            constructor(flyout: Blockly.IFlyout);
    
            /**
             * Move the flyout based on the most recent mouse movements.
             * @param {!Blockly.utils.Coordinate} currentDragDeltaXY How far the pointer has
             *     moved from the position at the start of the drag, in pixel coordinates.
             * @package
             */
            drag(currentDragDeltaXY: Blockly.utils.Coordinate): void;
    } 
    
}
