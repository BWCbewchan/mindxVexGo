
declare module Blockly {

    class Icon extends Icon__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Icon__Class  { 
    
            /**
             * Class for an icon.
             * @param {Blockly.BlockSvg} block The block associated with this icon.
             * @constructor
             * @abstract
             */
            constructor(block: Blockly.BlockSvg);
    
            /**
             * The block this icon is attached to.
             * @type {Blockly.BlockSvg}
             * @protected
             */
            block_: Blockly.BlockSvg;
    
            /**
             * The icon SVG group.
             * @type {?SVGGElement}
             */
            iconGroup_: SVGGElement;
    
            /**
             * Does this icon get hidden when the block is collapsed.
             */
            collapseHidden: any /*missing*/;
    
            /**
             * Height and width of icons.
             */
            SIZE: any /*missing*/;
    
            /**
             * Bubble UI (if visible).
             * @type {Blockly.Bubble}
             * @protected
             */
            bubble_: Blockly.Bubble;
    
            /**
             * Absolute coordinate of icon's center.
             * @type {Blockly.utils.Coordinate}
             * @protected
             */
            iconXY_: Blockly.utils.Coordinate;
    
            /**
             * Create the icon on the block.
             */
            createIcon(): void;
    
            /**
             * Dispose of this icon.
             */
            dispose(): void;
    
            /**
             * Add or remove the UI indicating if this icon may be clicked or not.
             */
            updateEditable(): void;
    
            /**
             * Is the associated bubble visible?
             * @return {boolean} True if the bubble is visible.
             */
            isVisible(): boolean;
    
            /**
             * Clicking on the icon toggles if the bubble is visible.
             * @param {!Event} e Mouse click event.
             * @protected
             */
            iconClick_(e: Event): void;
    
            /**
             * Change the colour of the associated bubble to match its block.
             */
            applyColour(): void;
    
            /**
             * Notification that the icon has moved.  Update the arrow accordingly.
             * @param {!Blockly.utils.Coordinate} xy Absolute location in workspace coordinates.
             */
            setIconLocation(xy: Blockly.utils.Coordinate): void;
    
            /**
             * Notification that the icon has moved, but we don't really know where.
             * Recompute the icon's location from scratch.
             */
            computeIconLocation(): void;
    
            /**
             * Returns the center of the block's icon relative to the surface.
             * @return {Blockly.utils.Coordinate} Object with x and y properties in
             *     workspace coordinates.
             */
            getIconLocation(): Blockly.utils.Coordinate;
    
            /**
             * Get the size of the icon as used for rendering.
             * This differs from the actual size of the icon, because it bulges slightly
             * out of its row rather than increasing the height of its row.
             * @return {!Blockly.utils.Size} Height and width.
             */
            getCorrectedSize(): Blockly.utils.Size;
    
            /**
             * Draw the icon.
             * @param {!Element} group The icon group.
             * @protected
             */
            drawIcon_(group: Element): void;
    
            /**
             * Show or hide the icon.
             * @param {boolean} visible True if the icon should be visible.
             */
            setVisible(visible: boolean): void;
    } 
    
}
