
declare module Blockly {

    interface IToolbox extends Blockly.IRegistrable {
    
        /**
          * Initializes the toolbox.
          * @return {void}
          */
        init(): void;
    
        /**
          * Fills the toolbox with new toolbox items and removes any old contents.
          * @param {!Blockly.utils.toolbox.ToolboxInfo} toolboxDef Object holding information
          *     for creating a toolbox.
          */
        render(toolboxDef: Blockly.utils.toolbox.ToolboxInfo): void;
    
        /**
          * Gets the width of the toolbox.
          * @return {number} The width of the toolbox.
          */
        getWidth(): number;
    
        /**
          * Gets the height of the toolbox.
          * @return {number} The width of the toolbox.
          */
        getHeight(): number;
    
        /**
          * Gets the toolbox flyout.
          * @return {?Blockly.IFlyout} The toolbox flyout.
          */
        getFlyout(): Blockly.IFlyout;
    
        /**
          * Gets the workspace for the toolbox.
          * @return {!Blockly.WorkspaceSvg} The parent workspace for the toolbox.
          */
        getWorkspace(): Blockly.WorkspaceSvg;
    
        /**
          * Gets whether or not the toolbox is horizontal.
          * @return {boolean} True if the toolbox is horizontal, false if the toolbox is
          *     vertical.
          */
        isHorizontal(): boolean;
    
        /**
          * Positions the toolbox based on whether it is a horizontal toolbox and whether
          * the workspace is in rtl.
          * @return {void}
          */
        position(): void;
    
        /**
          * Handles resizing the toolbox when a toolbox item resizes.
          * @return {void}
          */
        handleToolboxItemResize(): void;
    
        /**
          * Unhighlights any previously selected item.
          * @return {void}
          */
        clearSelection(): void;
    
        /**
          * Updates the category colours and background colour of selected categories.
          * @return {void}
          */
        refreshTheme(): void;
    
        /**
          * Updates the flyout's content without closing it.  Should be used in response
          * to a change in one of the dynamic categories, such as variables or
          * procedures.
          * @return {void}
          */
        refreshSelection(): void;
    
        /**
          * Sets the visibility of the toolbox.
          * @param {boolean} isVisible True if toolbox should be visible.
          */
        setVisible(isVisible: boolean): void;
    
        /**
          * Selects the toolbox item by it's position in the list of toolbox items.
          * @param {number} position The position of the item to select.
          * @return {void}
          */
        selectItemByPosition(position: number): void;
    
        /**
          * Gets the selected item.
          * @return {?Blockly.IToolboxItem} The selected item, or null if no item is
          *     currently selected.
          */
        getSelectedItem(): Blockly.IToolboxItem;
    
        /**
          * Disposes of this toolbox.
          * @return {void}
          */
        dispose(): void;
    }
}
