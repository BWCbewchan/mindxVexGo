
declare module Blockly {

    interface IToolboxItem {
    
        /**
          * Initializes the toolbox item.
          * This includes creating the dom and updating the state of any items based
          * on the info object.
          * @return {void}
          * @public
          */
        init(): void;
    
        /**
          * Gets the div for the toolbox item.
          * @return {?Element} The div for the toolbox item.
          * @public
          */
        getDiv(): Element;
    
        /**
          * Gets a unique identifier for this toolbox item.
          * @return {string} The id for the toolbox item.
          * @public
          */
        getId(): string;
    
        /**
          * Gets the parent if the toolbox item is nested.
          * @return {?Blockly.IToolboxItem} The parent toolbox item, or null if
          *     this toolbox item is not nested.
          * @public
          */
        getParent(): Blockly.IToolboxItem;
    
        /**
          * Gets the nested level of the category.
          * @return {number} The nested level of the category.
          * @package
          */
        getLevel(): number;
    
        /**
          * Whether the toolbox item is selectable.
          * @return {boolean} True if the toolbox item can be selected.
          * @public
          */
        isSelectable(): boolean;
    
        /**
          * Whether the toolbox item is collapsible.
          * @return {boolean} True if the toolbox item is collapsible.
          * @public
          */
        isCollapsible(): boolean;
    
        /**
          * Dispose of this toolbox item. No-op by default.
          * @public
          */
        dispose: any /*missing*/;
    }

    interface ISelectableToolboxItem extends Blockly.IToolboxItem {
    
        /**
          * Gets the name of the toolbox item. Used for emitting events.
          * @return {string} The name of the toolbox item.
          * @public
          */
        getName(): string;
    
        /**
          * Gets the contents of the toolbox item. These are items that are meant to be
          * displayed in the flyout.
          * @return {!Blockly.utils.toolbox.FlyoutItemInfoArray|string} The definition
          *     of items to be displayed in the flyout.
          * @public
          */
        getContents(): Blockly.utils.toolbox.FlyoutItemInfoArray|string;
    
        /**
          * Sets the current toolbox item as selected.
          * @param {boolean} _isSelected True if this category is selected, false
          *     otherwise.
          * @public
          */
        setSelected(_isSelected: boolean): void;
    
        /**
          * Handles when the toolbox item is clicked.
          * @param {!Event} _e Click event to handle.
          * @public
          */
        onClick(_e: Event): void;
    }

    interface ICollapsibleToolboxItem extends Blockly.ISelectableToolboxItem {
    
        /**
          * Gets any children toolbox items. (ex. Gets the subcategories)
          * @return {!Array<!Blockly.IToolboxItem>} The child toolbox items.
          */
        getChildToolboxItems(): Blockly.IToolboxItem[];
    
        /**
          * Whether the toolbox item is expanded to show its child subcategories.
          * @return {boolean} True if the toolbox item shows its children, false if it
          *     is collapsed.
          * @public
          */
        isExpanded(): boolean;
    
        /**
          * Toggles whether or not the toolbox item is expanded.
          * @public
          */
        toggleExpanded: any /*missing*/;
    }
}
