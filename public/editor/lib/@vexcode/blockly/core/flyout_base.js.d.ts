
declare module Blockly {

    class Flyout extends Flyout__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Flyout__Class implements Blockly.IBlocklyActionable, Blockly.IDeleteArea, Blockly.IFlyout  { 
    
            /**
             * Class for a flyout.
             * @param {!Blockly.Options} workspaceOptions Dictionary of options for the
             *     workspace.
             * @constructor
             * @abstract
             * @implements {Blockly.IBlocklyActionable}
             * @implements {Blockly.IDeleteArea}
             * @implements {Blockly.IFlyout}
             */
            constructor(workspaceOptions: Blockly.Options);
    
            /**
             * @type {!Blockly.WorkspaceSvg}
             * @protected
             */
            workspace_: Blockly.WorkspaceSvg;
    
            /**
             * Is RTL vs LTR.
             * @type {boolean}
             */
            RTL: boolean;
    
            /**
             * Whether the flyout should be laid out horizontally or not.
             * @type {boolean}
             * @package
             */
            horizontalLayout: boolean;
    
            /**
             * Position of the toolbox and flyout relative to the workspace.
             * @type {number}
             * @protected
             */
            toolboxPosition_: number;
    
            /**
             * List of visible buttons.
             * @type {!Array.<!Blockly.FlyoutButton>}
             * @protected
             */
            buttons_: Blockly.FlyoutButton[];
    
            /**
             * Width of output tab.
             * @type {number}
             * @protected
             * @const
             */
            tabWidth_: number;
    
            /**
             * The target workspace
             * @type {?Blockly.WorkspaceSvg}
             * @package
             */
            targetWorkspace: Blockly.WorkspaceSvg;
    
            /**
             * Does the flyout automatically close when a block is created?
             * @type {boolean}
             */
            autoClose: boolean;
    
            /**
             * Corner radius of the flyout background.
             * @type {number}
             * @const
             */
            CORNER_RADIUS: number;
    
            /**
             * Margin around the edges of the blocks in the flyout.
             * @type {number}
             * @const
             */
            MARGIN: number;
    
            /**
             * Gap between items in horizontal flyouts. Can be overridden with the "sep"
             * element.
             * @const {number}
             */
            GAP_X: any /*missing*/;
    
            /**
             * Gap between items in vertical flyouts. Can be overridden with the "sep"
             * element.
             * @const {number}
             */
            GAP_Y: any /*missing*/;
    
            /**
             * Top/bottom padding between scrollbar and edge of flyout background.
             * @type {number}
             * @const
             */
            SCROLLBAR_PADDING: number;
    
            /**
             * Width of flyout.
             * @type {number}
             * @protected
             */
            width_: number;
    
            /**
             * Height of flyout.
             * @type {number}
             * @protected
             */
            height_: number;
    
            /**
             * Range of a drag angle from a flyout considered "dragging toward workspace".
             * Drags that are within the bounds of this many degrees from the orthogonal
             * line to the flyout edge are considered to be "drags toward the workspace".
             * Example:
             * Flyout                                                  Edge   Workspace
             * [block] /  <-within this angle, drags "toward workspace" |
             * [block] ---- orthogonal to flyout boundary ----          |
             * [block] \                                                |
             * The angle is given in degrees from the orthogonal.
             *
             * This is used to know when to create a new block and when to scroll the
             * flyout. Setting it to 360 means that all drags create a new block.
             * @type {number}
             * @protected
            */
            dragAngleRange_: number;
    
            /**
             * Creates the flyout's DOM.  Only needs to be called once.  The flyout can
             * either exist as its own svg element or be a g element nested inside a
             * separate svg element.
             * @param {string|
             * !Blockly.utils.Svg<!SVGSVGElement>|
             * !Blockly.utils.Svg<!SVGGElement>} tagName The type of tag to
             *     put the flyout in. This should be <svg> or <g>.
             * @return {!SVGElement} The flyout's SVG group.
             */
            createDom(tagName: string|Blockly.utils.Svg<SVGSVGElement>|Blockly.utils.Svg<SVGGElement>): SVGElement;
    
            /**
             * Initializes the flyout.
             * @param {!Blockly.WorkspaceSvg} targetWorkspace The workspace in which to
             *     create new blocks.
             */
            init(targetWorkspace: Blockly.WorkspaceSvg): void;
    
            /**
             * @type {!Blockly.Scrollbar}
             * @package
             */
            scrollbar: Blockly.Scrollbar;
    
            /**
             * Dispose of this flyout.
             * Unlink from all DOM elements to prevent memory leaks.
             * @suppress {checkTypes}
             */
            dispose(): void;
    
            /**
             * Get the width of the flyout.
             * @return {number} The width of the flyout.
             */
            getWidth(): number;
    
            /**
             * Get the height of the flyout.
             * @return {number} The width of the flyout.
             */
            getHeight(): number;
    
            /**
             * Get the workspace inside the flyout.
             * @return {!Blockly.WorkspaceSvg} The workspace inside the flyout.
             * @package
             */
            getWorkspace(): Blockly.WorkspaceSvg;
    
            /**
             * Is the flyout visible?
             * @return {boolean} True if visible.
             */
            isVisible(): boolean;
    
            /**
             * Set whether the flyout is visible. A value of true does not necessarily mean
             * that the flyout is shown. It could be hidden because its container is hidden.
             * @param {boolean} visible True if visible.
             */
            setVisible(visible: boolean): void;
    
            /**
             * Set whether this flyout's container is visible.
             * @param {boolean} visible Whether the container is visible.
             */
            setContainerVisible(visible: boolean): void;
    
            /**
             * Update the view based on coordinates calculated in position().
             * @param {number} width The computed width of the flyout's SVG group
             * @param {number} height The computed height of the flyout's SVG group.
             * @param {number} x The computed x origin of the flyout's SVG group.
             * @param {number} y The computed y origin of the flyout's SVG group.
             * @protected
             */
            positionAt_(width: number, height: number, x: number, y: number): void;
    
            /**
             * Hide and empty the flyout.
             */
            hide(): void;
    
            /**
             * Show and populate the flyout.
             * @param {!Blockly.utils.toolbox.FlyoutDefinition|string} flyoutDef Contents to display
             *     in the flyout. This is either an array of Nodes, a NodeList, a
             *     toolbox definition, or a string with the name of the dynamic category.
             */
            show(flyoutDef: Blockly.utils.toolbox.FlyoutDefinition|string): void;
    
            /**
             * Add listeners to a block that has been added to the flyout.
             * @param {!SVGElement} root The root node of the SVG group the block is in.
             * @param {!Blockly.BlockSvg} block The block to add listeners for.
             * @param {!SVGElement} rect The invisible rectangle under the block that acts
             *     as a mat for that block.
             * @protected
             */
            addBlockListeners_(root: SVGElement, block: Blockly.BlockSvg, rect: SVGElement): void;
    
            /**
             * Does this flyout allow you to create a new instance of the given block?
             * Used for deciding if a block can be "dragged out of" the flyout.
             * @param {!Blockly.BlockSvg} block The block to copy from the flyout.
             * @return {boolean} True if you can create a new instance of the block, false
             *    otherwise.
             * @package
             */
            isBlockCreatable_(block: Blockly.BlockSvg): boolean;
    
            /**
             * Create a copy of this block on the workspace.
             * @param {!Blockly.BlockSvg} originalBlock The block to copy from the flyout.
             * @return {!Blockly.BlockSvg} The newly created block.
             * @throws {Error} if something went wrong with deserialization.
             * @package
             */
            createBlock(originalBlock: Blockly.BlockSvg): Blockly.BlockSvg;
    
            /**
             * Initialize the given button: move it to the correct location,
             * add listeners, etc.
             * @param {!Blockly.FlyoutButton} button The button to initialize and place.
             * @param {number} x The x position of the cursor during this layout pass.
             * @param {number} y The y position of the cursor during this layout pass.
             * @protected
             */
            initFlyoutButton_(button: Blockly.FlyoutButton, x: number, y: number): void;
    
            /**
             * Create and place a rectangle corresponding to the given block.
             * @param {!Blockly.BlockSvg} block The block to associate the rect to.
             * @param {number} x The x position of the cursor during this layout pass.
             * @param {number} y The y position of the cursor during this layout pass.
             * @param {!{height: number, width: number}} blockHW The height and width of the
             *     block.
             * @param {number} index The index into the mats list where this rect should be
             *     placed.
             * @return {!SVGElement} Newly created SVG element for the rectangle behind the
             *     block.
             * @protected
             */
            createRect_(block: Blockly.BlockSvg, x: number, y: number, blockHW: { height: number; width: number }, index: number): SVGElement;
    
            /**
             * Move a rectangle to sit exactly behind a block, taking into account tabs,
             * hats, and any other protrusions we invent.
             * @param {!SVGElement} rect The rectangle to move directly behind the block.
             * @param {!Blockly.BlockSvg} block The block the rectangle should be behind.
             * @protected
             */
            moveRectToBlock_(rect: SVGElement, block: Blockly.BlockSvg): void;
    
            /**
             * Reflow blocks and their mats.
             */
            reflow(): void;
    
            /**
             * @return {boolean} True if this flyout may be scrolled with a scrollbar or by
             *     dragging.
             * @package
             */
            isScrollable(): boolean;
    
            /**
             * data for where each category is in the flyout for scrolling
             * @type {?Array<Blockly.IFlyoutCategoryPositionData>}
             */
            categoryScrollPositions: Blockly.IFlyoutCategoryPositionData[];
    
            /**
            * Select a category using the scroll position.
            * @param {number} pos The scroll position in pixels.
            * @package
            */
            selectCategoryByScrollPosition(pos: number): void;
    
            /**
            * Get the scaled scroll position.
            * @return {number} The current scroll position.
            */
            getScrollPos(): number;
    
            /**
             * Set the scroll position, scaling it.
             * @param {number} pos The scroll position to set.
             */
            setScrollPos(pos: number): void;
    
            /**
             * The fraction of the distance to the scroll target to move the flyout on
             * each animation frame, when auto-scrolling. Values closer to 1.0 will make
             * the scroll animation complete faster. Use 1.0 for no animation.
             * @type {number}
             */
            scrollAnimationFraction: number;
    
            /**
             * Step the scrolling animation by scrolling a fraction of the way to
             * a scroll target, and request the next frame if necessary.
             * @package
             */
            stepScrollAnimation(): void;
    
            /**
             * Handles the given action.
             * This is only triggered when keyboard accessibility mode is enabled.
             * @param {!Blockly.Action} action The action to be handled.
             * @return {boolean} True if the flyout handled the action, false otherwise.
             * @package
             */
            onBlocklyAction(action: Blockly.Action): boolean;
    
            /**
             * Return the deletion rectangle for this flyout in viewport coordinates.
             * @return {Blockly.utils.Rect} Rectangle in which to delete.
             */
            getClientRect(): Blockly.utils.Rect;
    
            /**
             * Position the flyout.
             * @return {void}
             */
            position(): void;
    
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
             * Return an object with all the metrics required to size scrollbars for the
             * flyout.
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
             * Lay out the blocks in the flyout.
             * @param {!Array.<!Object>} contents The blocks and buttons to lay out.
             * @param {!Array.<number>} gaps The visible gaps between blocks.
             * @protected
             */
            layout_(contents: Object[], gaps: number[]): void;
    
            /**
             * Scroll the flyout.
             * @param {!Event} e Mouse wheel scroll event.
             * @protected
             */
            wheel_(e: Event): void;
    
            /**
             * Compute height of flyout.  Position mat under each block.
             * For RTL: Lay out the blocks right-aligned.
             * @return {void}
             * @protected
             */
            reflowInternal_(): void;
    } 
    
}
