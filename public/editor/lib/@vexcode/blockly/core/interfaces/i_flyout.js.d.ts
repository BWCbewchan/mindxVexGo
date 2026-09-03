
declare module Blockly {

    interface IFlyout extends Blockly.IRegistrable {
    
        /**
          * Whether the flyout is laid out horizontally or not.
          * @type {boolean}
          */
        horizontalLayout: boolean;
    
        /**
          * Is RTL vs LTR.
          * @type {boolean}
          */
        RTL: boolean;
    
        /**
          * The target workspace
          * @type {?Blockly.WorkspaceSvg}
          */
        targetWorkspace: Blockly.WorkspaceSvg;
    
        /**
          * Margin around the edges of the blocks in the flyout.
          * @type {number}
          * @const
          */
        MARGIN: number;
    
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
          * Dispose of this flyout.
          * Unlink from all DOM elements to prevent memory leaks.
          */
        dispose: any /*missing*/;
    
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
          * Hide and empty the flyout.
          */
        hide: any /*missing*/;
    
        /**
          * Show and populate the flyout.
          * @param {!Blockly.utils.toolbox.FlyoutDefinition|string} flyoutDef Contents to
          *     display in the flyout. This is either an array of Nodes, a NodeList, a
          *     toolbox definition, or a string with the name of the dynamic category.
          */
        show(flyoutDef: Blockly.utils.toolbox.FlyoutDefinition|string): void;
    
        /**
          * Create a copy of this block on the workspace.
          * @param {!Blockly.BlockSvg} originalBlock The block to copy from the flyout.
          * @return {!Blockly.BlockSvg} The newly created block.
          * @throws {Error} if something went wrong with deserialization.
          */
        createBlock(originalBlock: Blockly.BlockSvg): Blockly.BlockSvg;
    
        /**
          * Reflow blocks and their mats.
          */
        reflow: any /*missing*/;
    
        /**
          * @return {boolean} True if this flyout may be scrolled with a scrollbar or by
          *     dragging.
          */
        isScrollable(): boolean;
    
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
          */
        isDragTowardWorkspace(currentDragDeltaXY: Blockly.utils.Coordinate): boolean;
    }
}
