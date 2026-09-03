
declare module Blockly {

    class VerticalFlyout extends VerticalFlyout__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class VerticalFlyout__Class extends Blockly.Flyout__Class  { 
    
            /**
             * Class for a flyout.
             * @param {!Object} workspaceOptions Dictionary of options for the workspace.
             * @extends {Blockly.Flyout}
             * @constructor
             */
            constructor(workspaceOptions: Object);
    
            /**
             * Move the flyout to the edge of the workspace.
             */
            position(): void;
    
            /**
             * Scroll the flyout to the top.
             */
            scrollToStart(): void;
    
            /**
             * Determine if a drag delta is toward the workspace, based on the position
             * and orientation of the flyout. This is used in determineDragIntention_ to
             * determine if a new block should be created or if the flyout should scroll.
             * @param {!Blockly.utils.Coordinate} currentDragDeltaXY How far the pointer has
             *     moved from the position at mouse down, in pixel units.
             * @return {boolean} True if the drag is toward the workspace.
             * @package
             */
            isDragTowardWorkspace(currentDragDeltaXY: Blockly.utils.Coordinate): boolean;
    
            /**
             * Return the deletion rectangle for this flyout in viewport coordinates.
             * @return {Blockly.utils.Rect} Rectangle in which to delete.
             */
            getClientRect(): Blockly.utils.Rect;
    } 
    
}
