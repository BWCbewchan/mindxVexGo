
declare module Blockly {

    class Toolbox extends Toolbox__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Toolbox__Class implements Blockly.IBlocklyActionable, Blockly.IDeleteArea, Blockly.IStyleable, Blockly.IToolbox  { 
    
            /**
             * Class for a Toolbox.
             * Creates the toolbox's DOM.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace in which to create new
             *     blocks.
             * @constructor
             * @implements {Blockly.IBlocklyActionable}
             * @implements {Blockly.IDeleteArea}
             * @implements {Blockly.IStyleable}
             * @implements {Blockly.IToolbox}
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * The workspace this toolbox is on.
             * @type {!Blockly.WorkspaceSvg}
             * @protected
             */
            workspace_: Blockly.WorkspaceSvg;
    
            /**
             * The JSON describing the contents of this toolbox.
             * @type {!Blockly.utils.toolbox.ToolboxInfo}
             * @protected
             */
            toolboxDef_: Blockly.utils.toolbox.ToolboxInfo;
    
            /**
             * The html container for the toolbox.
             * @type {?Element}
             */
            HtmlDiv: Element;
    
            /**
             * The html container for the contents of a toolbox.
             * @type {?Element}
             * @protected
             */
            contentsDiv_: Element;
    
            /**
             * The list of items in the toolbox.
             * @type {!Array<!Blockly.IToolboxItem>}
             * @protected
             */
            contents_: Blockly.IToolboxItem[];
    
            /**
             * The width of the toolbox.
             * @type {number}
             * @protected
             */
            width_: number;
    
            /**
             * The height of the toolbox.
             * @type {number}
             * @protected
             */
            height_: number;
    
            /**
             * Is RTL vs LTR.
             * @type {boolean}
             */
            RTL: boolean;
    
            /**
             * A map from toolbox item IDs to toolbox items.
             * @type {!Object<string, Blockly.IToolboxItem>}
             * @protected
             */
            contentMap_: { [key: string]: Blockly.IToolboxItem };
    
            /**
             * Position of the toolbox and flyout relative to the workspace.
             * @type {!Blockly.utils.toolbox.Position}
             */
            toolboxPosition: Blockly.utils.toolbox.Position;
    
            /**
             * The currently selected item.
             * @type {?Blockly.ISelectableToolboxItem}
             * @protected
             */
            selectedItem_: Blockly.ISelectableToolboxItem;
    
            /**
             * The previously selected item.
             * @type {?Blockly.ISelectableToolboxItem}
             * @protected
             */
            previouslySelectedItem_: Blockly.ISelectableToolboxItem;
    
            /**
             * Array holding info needed to unbind event handlers.
             * Used for disposing.
             * Ex: [[node, name, func], [node, name, func]].
             * @type {!Array<!Blockly.EventData>}
             * @protected
             */
            boundEvents_: Blockly.EventData[];
    
            /**
             * Initializes the toolbox
             * @public
             */
            init(): void;
    
            /**
             * Creates the dom for the toolbox.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace this toolbox is on.
             * @return {!Element} The html container for the toolbox.
             * @protected
             */
            createDom_(workspace: Blockly.WorkspaceSvg): Element;
    
            /**
             * Creates the container div for the toolbox.
             * @return {!Element} The html container for the toolbox.
             * @protected
             */
            createContainer_(): Element;
    
            /**
             * Creates the container for all the contents in the toolbox.
             * @return {!Element} The html container for the toolbox contents.
             * @protected
             */
            createContentsContainer_(): Element;
    
            /**
             * Adds event listeners to the toolbox container div.
             * @param {!Element} container The html container for the toolbox.
             * @param {!Element} contentsContainer The html container for the contents
             *     of the toolbox.
             * @protected
             */
            attachEvents_(container: Element, contentsContainer: Element): void;
    
            /**
             * Handles on click events for when the toolbox or toolbox items are clicked.
             * @param {!Event} e Click event to handle.
             * @protected
             */
            onClick_(e: Event): void;
    
            /**
             * Handles key down events for the toolbox.
             * @param {!KeyboardEvent} e The key down event.
             * @protected
             */
            onKeyDown_(e: KeyboardEvent): void;
    
            /**
             * Creates the flyout based on the toolbox layout.
             * @return {!Blockly.IFlyout} The flyout for the toolbox.
             * @throws {Error} If missing a require for `Blockly.HorizontalFlyout`,
             *     `Blockly.VerticalFlyout`, and no flyout plugin is specified.
             * @protected
             */
            createFlyout_(): Blockly.IFlyout;
    
            /**
             * Fills the toolbox with new toolbox items and removes any old contents.
             * @param {!Blockly.utils.toolbox.ToolboxInfo} toolboxDef Object holding information
             *     for creating a toolbox.
             * @package
             */
            render(toolboxDef: Blockly.utils.toolbox.ToolboxInfo): void;
    
            /**
             * Adds all the toolbox items to the toolbox.
             * @param {!Array<!Blockly.utils.toolbox.ToolboxItemInfo>} toolboxDef Array
             *     holding objects containing information on the contents of the toolbox.
             * @protected
             */
            renderContents_(toolboxDef: Blockly.utils.toolbox.ToolboxItemInfo[]): void;
    
            /**
             * Adds an item to the toolbox.
             * @param {!Blockly.IToolboxItem} toolboxItem The item in the toolbox.
             * @protected
             */
            addToolboxItem_(toolboxItem: Blockly.IToolboxItem): void;
    
            /**
             * Gets the items in the toolbox.
             * @return {!Array<!Blockly.IToolboxItem>} The list of items in the toolbox.
             * @public
             */
            getToolboxItems(): Blockly.IToolboxItem[];
    
            /**
             * Adds a style on the toolbox. Usually used to change the cursor.
             * @param {string} style The name of the class to add.
             * @package
             */
            addStyle(style: string): void;
    
            /**
             * Removes a style from the toolbox. Usually used to change the cursor.
             * @param {string} style The name of the class to remove.
             * @package
             */
            removeStyle(style: string): void;
    
            /**
             * Return the deletion rectangle for this toolbox.
             * @return {?Blockly.utils.Rect} Rectangle in which to delete.
             * @public
             */
            getClientRect(): Blockly.utils.Rect;
    
            /**
             * Gets the toolbox item with the given id.
             * @param {string} id The id of the toolbox item.
             * @return {?Blockly.IToolboxItem} The toolbox item with the given id, or null if
             *     no item exists.
             * @public
             */
            getToolboxItemById(id: string): Blockly.IToolboxItem;
    
            /**
             * Gets the width of the toolbox.
             * @return {number} The width of the toolbox.
             * @public
             */
            getWidth(): number;
    
            /**
             * Gets the height of the toolbox.
             * @return {number} The width of the toolbox.
             * @public
             */
            getHeight(): number;
    
            /**
             * Gets the toolbox flyout.
             * @return {?Blockly.IFlyout} The toolbox flyout.
             * @public
             */
            getFlyout(): Blockly.IFlyout;
    
            /**
             * Gets the workspace for the toolbox.
             * @return {!Blockly.WorkspaceSvg} The parent workspace for the toolbox.
             * @public
             */
            getWorkspace(): Blockly.WorkspaceSvg;
    
            /**
             * Gets the selected item.
             * @return {?Blockly.ISelectableToolboxItem} The selected item, or null if no item is
             *     currently selected.
             * @public
             */
            getSelectedItem(): Blockly.ISelectableToolboxItem;
    
            /**
             * Gets the previously selected item.
             * @return {?Blockly.ISelectableToolboxItem} The previously selected item, or null if no
             *     item was previously selected.
             * @public
             */
            getPreviouslySelectedItem(): Blockly.ISelectableToolboxItem;
    
            /**
             * Gets whether or not the toolbox is horizontal.
             * @return {boolean} True if the toolbox is horizontal, false if the toolbox is
             *     vertical.
             * @public
             */
            isHorizontal(): boolean;
    
            /**
             * Positions the toolbox based on whether it is a horizontal toolbox and whether
             * the workspace is in rtl.
             * @public
             */
            position(): void;
    
            /**
             * Handles resizing the toolbox when a toolbox item resizes.
             * @package
             */
            handleToolboxItemResize(): void;
    
            /**
             * Unhighlights any previously selected item.
             * @public
             */
            clearSelection(): void;
    
            /**
             * Updates the category colours and background colour of selected categories.
             * @package
             */
            refreshTheme(): void;
    
            /**
             * Updates the flyout's content without closing it.  Should be used in response
             * to a change in one of the dynamic categories, such as variables or
             * procedures.
             * @public
             */
            refreshSelection(): void;
    
            /**
             * builds a list of the flyout contents
             * @protectd
             */
            getContents_(): void;
    
            /**
             * Shows or hides the toolbox.
             * @param {boolean} isVisible True if toolbox should be visible.
             * @public
             */
            setVisible(isVisible: boolean): void;
    
            /**
             * Sets the given item as selected.
             * No-op if the item is not selectable.
             * @param {?Blockly.IToolboxItem} newItem The toolbox item to select.
             * @public
             */
            setSelectedItem(newItem: Blockly.IToolboxItem): void;
    
            /**
             * Decides whether the old item should be deselected.
             * @param {?Blockly.ISelectableToolboxItem} oldItem The previously selected
             *     toolbox item.
             * @param {?Blockly.ISelectableToolboxItem} newItem The newly selected toolbox
             *     item.
             * @return {boolean} True if the old item should be deselected, false otherwise.
             * @protected
             */
            shouldDeselectItem_(oldItem: Blockly.ISelectableToolboxItem, newItem: Blockly.ISelectableToolboxItem): boolean;
    
            /**
             * Decides whether the new item should be selected.
             * @param {?Blockly.ISelectableToolboxItem} oldItem The previously selected
             *     toolbox item.
             * @param {?Blockly.ISelectableToolboxItem} newItem The newly selected toolbox
             *     item.
             * @return {boolean} True if the new item should be selected, false otherwise.
             * @protected
             */
            shouldSelectItem_(oldItem: Blockly.ISelectableToolboxItem, newItem: Blockly.ISelectableToolboxItem): boolean;
    
            /**
             * Deselects the given item, marks it as unselected, and updates aria state.
             * @param {!Blockly.ISelectableToolboxItem} item The previously selected
             *     toolbox item which should be deselected.
             * @protected
             */
            deselectItem_(item: Blockly.ISelectableToolboxItem): void;
    
            /**
             * Selects the given item, marks it selected, and updates aria state.
             * @param {?Blockly.ISelectableToolboxItem} oldItem The previously selected
             *     toolbox item.
             * @param {!Blockly.ISelectableToolboxItem} newItem The newly selected toolbox
             *     item.
             * @protected
             */
            selectItem_(oldItem: Blockly.ISelectableToolboxItem, newItem: Blockly.ISelectableToolboxItem): void;
    
            /**
             * Selects the toolbox item by its position in the list of toolbox items.
             * @param {number} position The position of the item to select.
             * @public
             */
            selectItemByPosition(position: number): void;
    
            /**
             * Decides whether to hide or show the flyout depending on the selected item.
             * @param {?Blockly.ISelectableToolboxItem} oldItem The previously selected toolbox item.
             * @param {?Blockly.ISelectableToolboxItem} newItem The newly selected toolbox item.
             * @protected
             */
            updateFlyout_(oldItem: Blockly.ISelectableToolboxItem, newItem: Blockly.ISelectableToolboxItem): void;
    
            /**
             * Handles the given Blockly action on a toolbox.
             * This is only triggered when keyboard accessibility mode is enabled.
             * @param {!Blockly.Action} action The action to be handled.
             * @return {boolean} True if the field handled the action, false otherwise.
             * @package
             */
            onBlocklyAction(action: Blockly.Action): boolean;
    
            /**
             * Disposes of this toolbox.
             * @public
             */
            dispose(): void;
    
            /**
             * Select and scroll to a category by name.
             * @param {string} name The name of the category to select and scroll to.
             */
            setSelectedCategoryByName(name: string): void;
    
            /**
             * Select and scroll to a category by id.
             * @param {string} id The id of the category to select and scroll to.
             * @public
             */
            setSelectedCategoryById(id: string): void;
    
            /**
             * Scroll to a category by name.
             * @param {string} name The name of the category to scroll to.
             * @package
             */
            scrollToCategoryByName(name: string): void;
    
            /**
             * Scroll to a category by id.
             * @param {string} id The id of the category to scroll to.
             * @public
             */
            scrollToCategoryById(id: string): void;
    
            /**
             * Get a category by its index.
             * @param  {number} index The index of the category.
             * @return {Blockly.ToolboxCategory} the category, or null if there are no categories.
             * @package
             */
            getCategoryByIndex(index: number): Blockly.ToolboxCategory;
    
            /**
             * Select a category by name.
             * @param {string} name The name of the category to select.
             * @package
             */
            selectCategoryByName(name: string): void;
    
            /**
             * Select a category by id.
             * @param {string} id The id of the category to select.
             * @package
             * RM Changes -> Override in Blockly Controller
             */
            selectCategoryById(id: string): void;
    } 
    
}
