
declare module Blockly {

    class BubbleDragger extends BubbleDragger__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BubbleDragger__Class  { 
    
            /**
             * Class for a bubble dragger.  It moves things on the bubble canvas around the
             * workspace when they are being dragged by a mouse or touch.  These can be
             * block comments, mutators, warnings, or workspace comments.
             * @param {!Blockly.IBubble} bubble The item on the bubble canvas to drag.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace to drag on.
             * @constructor
             */
            constructor(bubble: Blockly.IBubble, workspace: Blockly.WorkspaceSvg);
    
            /**
             * Sever all links from this object.
             * @package
             * @suppress {checkTypes}
             */
            dispose(): void;
    
            /**
             * Start dragging a bubble.  This includes moving it to the drag surface.
             * @package
             */
            startBubbleDrag(): void;
    
            /**
             * Execute a step of bubble dragging, based on the given event.  Update the
             * display accordingly.
             * @param {!Event} e The most recent move event.
             * @param {!Blockly.utils.Coordinate} currentDragDeltaXY How far the pointer has
             *     moved from the position at the start of the drag, in pixel units.
             * @package
             */
            dragBubble(e: Event, currentDragDeltaXY: Blockly.utils.Coordinate): void;
    
            /**
             * Finish a bubble drag and put the bubble back on the workspace.
             * @param {!Event} e The mouseup/touchend event.
             * @param {!Blockly.utils.Coordinate} currentDragDeltaXY How far the pointer has
             *     moved from the position at the start of the drag, in pixel units.
             * @package
             */
            endBubbleDrag(e: Event, currentDragDeltaXY: Blockly.utils.Coordinate): void;
    } 
    
}
