
declare module Blockly {

    class WorkspaceDragger extends WorkspaceDragger__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class WorkspaceDragger__Class  { 
    
            /**
             * Class for a workspace dragger.  It moves the workspace around when it is
             * being dragged by a mouse or touch.
             * Note that the workspace itself manages whether or not it has a drag surface
             * and how to do translations based on that.  This simply passes the right
             * commands based on events.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace to drag.
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * The scroll position of the workspace at the beginning of the drag.
             * Coordinate system: pixel coordinates.
             * @type {!Blockly.utils.Coordinate}
             * @protected
             */
            startScrollXY_: Blockly.utils.Coordinate;
    
            /**
             * Sever all links from this object.
             * @package
             * @suppress {checkTypes}
             */
            dispose(): void;
    
            /**
             * Start dragging the workspace.
             * @package
             */
            startDrag(): void;
    
            /**
             * Finish dragging the workspace and put everything back where it belongs.
             * @param {!Blockly.utils.Coordinate} currentDragDeltaXY How far the pointer has
             *     moved from the position at the start of the drag, in pixel coordinates.
             * @package
             */
            endDrag(currentDragDeltaXY: Blockly.utils.Coordinate): void;
    
            /**
             * Move the workspace based on the most recent mouse movements.
             * @param {!Blockly.utils.Coordinate} currentDragDeltaXY How far the pointer has
             *     moved from the position at the start of the drag, in pixel coordinates.
             * @package
             */
            drag(currentDragDeltaXY: Blockly.utils.Coordinate): void;
    } 
    
}
