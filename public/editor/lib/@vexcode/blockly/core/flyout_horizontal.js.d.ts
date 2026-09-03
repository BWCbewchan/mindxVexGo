
declare module Blockly {

    class HorizontalFlyout extends HorizontalFlyout__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class HorizontalFlyout__Class extends Blockly.Flyout__Class  { 
    
            /**
             * Class for a flyout.
             * @param {!Blockly.Options} workspaceOptions Dictionary of options for the
             *     workspace.
             * @extends {Blockly.Flyout}
             * @constructor
             */
            constructor(workspaceOptions: Blockly.Options);
    
            /**
             * Return an object with all the metrics required to size scrollbars for the
             * flyout.  The following properties are computed:
             * .viewHeight: Height of the visible rectangle,
             * .viewWidth: Width of the visible rectangle,
             * .contentHeight: Height of the contents,
             * .contentWidth: Width of the contents,
             * .viewTop: Offset of top edge of visible rectangle from parent,
             * .contentTop: Offset of the top-most content from the y=0 coordinate,
             * .absoluteTop: Top-edge of view.
             * .viewLeft: Offset of the left edge of visible rectangle from parent,
             * .contentLeft: Offset of the left-most content from the x=0 coordinate,
             * .absoluteLeft: Left-edge of view.
             * @return {Blockly.utils.Metrics} Contains size and position metrics of the
             *     flyout.
             * @protected
             */
            getMetrics_(): Blockly.utils.Metrics;
    
            /**
             * Sets the translation of the flyout to match the scrollbars.
             * @param {!{x:number,y:number}} xyRatio Contains a y property which is a float
             *     between 0 and 1 specifying the degree of scrolling and a
             *     similar x property.
             * @protected
             */
            setMetrics_(xyRatio: { x: number; y: number }): void;
    
            /**
             * Move the flyout to the edge of the workspace.
             */
            position(): void;
    
            /**
             * Scroll the flyout to the top.
             */
            scrollToStart(): void;
    
            /**
             * Scroll the flyout.
             * @param {!Event} e Mouse wheel scroll event.
             * @protected
             */
            wheel_(e: Event): void;
    
            /**
             * Lay out the blocks in the flyout.
             * @param {!Array.<!Object>} contents The blocks and buttons to lay out.
             * @param {!Array.<number>} gaps The visible gaps between blocks.
             * @protected
             */
            layout_(contents: Object[], gaps: number[]): void;
    
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
    
            /**
             * Compute height of flyout.  Position mat under each block.
             * For RTL: Lay out the blocks right-aligned.
             * @protected
             */
            reflowInternal_(): void;
    } 
    
}
