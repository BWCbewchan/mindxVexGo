
declare module Blockly {

    class ToolboxCategory extends ToolboxCategory__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ToolboxCategory__Class extends Blockly.ToolboxItem__Class implements Blockly.ISelectableToolboxItem  { 
    
            /**
             * Class for a category in a toolbox.
             * @param {!Blockly.utils.toolbox.CategoryInfo} categoryDef The information needed
             *     to create a category in the toolbox.
             * @param {!Blockly.IToolbox} toolbox The parent toolbox for the category.
             * @param {Blockly.ICollapsibleToolboxItem=} opt_parent The parent category or null if
             *     the category does not have a parent.
             * @constructor
             * @extends {Blockly.ToolboxItem}
             * @implements {Blockly.ISelectableToolboxItem}
             */
            constructor(categoryDef: Blockly.utils.toolbox.CategoryInfo, toolbox: Blockly.IToolbox, opt_parent?: Blockly.ICollapsibleToolboxItem);
    
            /**
             * The name that will be displayed on the category.
             * @type {string}
             * @protected
             */
            name_: string;
    
            /**
             * The colour of the category.
             * @type {Blockly.IToolboxCategoryColour}
             * @protected
             */
            colour_: Blockly.IToolboxCategoryColour;
    
            /**
             * The html container for the category.
             * @type {?Element}
             * @protected
             */
            htmlDiv_: Element;
    
            /**
             * The html element for the category row.
             * @type {?Element}
             * @protected
             */
            rowDiv_: Element;
    
            /**
             * The html element that holds children elements of the category row.
             * @type {?Element}
             * @protected
             */
            rowContents_: Element;
    
            /**
             * The html element for the toolbox icon.
             * @type {?Element}
             * @protected
             */
            iconDom_: Element;
    
            /**
             * All the css class names that are used to create a category.
             * @type {!Blockly.ToolboxCategory.CssConfig}
             * @protected
             */
            cssConfig_: Blockly.ToolboxCategory.CssConfig;
    
            /**
             * True if the category is meant to be hidden, false otherwise.
             * @type {boolean}
             * @protected
             */
            isHidden_: boolean;
    
            /**
             * True if this category is disabled, false otherwise.
             * @type {boolean}
             * @protected
             */
            isDisabled_: boolean;
    
            /**
             * The flyout items for this category.
             * @type {string|!Blockly.utils.toolbox.FlyoutItemInfoArray}
             * @protected
             */
            flyoutItems_: string|Blockly.utils.toolbox.FlyoutItemInfoArray;
    
            /**
             * Creates an object holding the default classes for a category.
             * @return {!Blockly.ToolboxCategory.CssConfig} The configuration object holding
             *    all the CSS classes for a category.
             * @protected
             */
            makeDefaultCssConfig_(): Blockly.ToolboxCategory.CssConfig;
    
            /**
             * Parses the contents array depending on if the category is a dynamic category,
             * or if its contents are meant to be shown in the flyout.
             * @param {!Blockly.utils.toolbox.CategoryInfo} categoryDef The information needed
             *     to create a category.
             * @protected
             */
            parseContents_(categoryDef: Blockly.utils.toolbox.CategoryInfo): void;
    
            /**
             * Creates the dom for the category.
             * @return {!Element} The parent element for the category.
             * @protected
             */
            createDom_(): Element;
    
            /**
             * Creates the container that holds the row and any subcategories.
             * @return {!Element} The div that holds the icon and the label.
             * @protected
             */
            createContainer_(): Element;
    
            /**
             * Creates the parent of the contents container. All clicks will happen on this
             * div.
             * @return {!Element} The div that holds the contents container.
             * @protected
             */
            createRowContainer_(): Element;
    
            /**
             * Creates the container for the label and icon.
             * This is necessary so we can set all subcategory pointer events to none.
             * @return {!Element} The div that holds the icon and the label.
             * @protected
             */
            createRowContentsContainer_(): Element;
    
            /**
             * Creates the span that holds the category icon.
             * @return {!Element} The span that holds the category icon.
             * @protected
             */
            createIconDom_(): Element;
    
            /**
             * Creates the span that holds the category label.
             * This should have an id for accessibility purposes.
             * @param {string} name The name of the category.
             * @return {!Element} The span that holds the category label.
             * @protected
             */
            createLabelDom_(name: string): Element;
    
            /**
             * Updates the colour for this category.
             * @public
             */
            refreshTheme(): void;
    
            /**
             * Add the strip of colour to the toolbox category.
             * @param {Blockly.IToolboxCategoryColour} colour The category colour.
             * @protected
             */
            addColourBorder_(colour: Blockly.IToolboxCategoryColour): void;
    
            /**
             * Gets either the colour or the style for a category.
             * @param {!Blockly.utils.toolbox.CategoryInfo} categoryDef The object holding
             *    information on the category.
             * @return {Blockly.IToolboxCategoryColour} The hex colour for the category.
             * @protected
             */
            getColour_(categoryDef: Blockly.utils.toolbox.CategoryInfo): Blockly.IToolboxCategoryColour;
    
            /**
             * Adds appropriate classes to display an open icon.
             * @param {?Element} iconDiv The div that holds the icon.
             * @protected
             */
            openIcon_(iconDiv: Element): void;
    
            /**
             * Adds appropriate classes to display a closed icon.
             * @param {?Element} iconDiv The div that holds the icon.
             * @protected
             */
            closeIcon_(iconDiv: Element): void;
    
            /**
             * Sets whether the category is visible or not.
             * For a category to be visible its parent category must also be expanded.
             * @param {boolean} isVisible True if category should be visible.
             * @protected
             */
            setVisible_(isVisible: boolean): void;
    
            /**
             * Hide the category.
             */
            hide(): void;
    
            /**
             * Show the category. Category will only appear if its parent category is also
             * expanded.
             */
            show(): void;
    
            /**
             * Whether the category is visible.
             * A category is only visible if all of its ancestors are expanded and isHidden_ is false.
             * @return {boolean} True if the category is visible, false otherwise.
             * @public
             */
            isVisible(): boolean;
    
            /**
             * Whether all ancestors of a category (parent and parent's parent, etc.) are expanded.
             * @return {boolean} True only if every ancestor is expanded
             * @protected
             */
            allAncestorsExpanded_(): boolean;
    
            /**
             * Handles when the toolbox item is clicked.
             * @param {!Event} _e Click event to handle.
             * @public
             */
            onClick(_e: Event): void;
    
            /**
             * Sets the current category as selected.
             * @param {boolean} isSelected True if this category is selected, false
             *     otherwise.
             * @public
             */
            setSelected(isSelected: boolean): void;
    
            /**
             * Sets whether the category is disabled.
             * @param {boolean} isDisabled True to disable the category, false otherwise.
             */
            setDisabled(isDisabled: boolean): void;
    
            /**
             * Gets the name of the category. Used for emitting events.
             * @return {string} The name of the toolbox item.
             * @public
             */
            getName(): string;
    
            /**
             * Gets the contents of the category. These are items that are meant to be
             * displayed in the flyout.
             * @return {!Blockly.utils.toolbox.FlyoutItemInfoArray|string} The definition
             *     of items to be displayed in the flyout.
             * @public
             */
            getContents(): Blockly.utils.toolbox.FlyoutItemInfoArray|string;
    
            /**
             * Gets the content item for a label for this category
             * @return {!Blockly.utils.toolbox.FlyoutItemInfoArray} The definition
             *     of item to display the label for the category
             * @public
             */
            getLabelItem(): Blockly.utils.toolbox.FlyoutItemInfoArray;
    
            /**
             * Updates the contents to be displayed in the flyout.
             * If the flyout is open when the contents are updated, refreshSelection on the
             * toolbox must also be called.
             * @param {!Blockly.utils.toolbox.FlyoutDefinition|string} contents The contents
             *     to be displayed in the flyout. A string can be supplied to create a
             *     dynamic category.
             * @public
             */
            updateFlyoutContents(contents: Blockly.utils.toolbox.FlyoutDefinition|string): void;
    } 
    
}

declare module Blockly.ToolboxCategory {

    /**
     * All the css class names that are used to create a category.
     * @typedef {{
     *            container:?string,
     *            row:?string,
     *            rowcontentcontainer:?string,
     *            icon:?string,
     *            label:?string,
     *            selected:?string,
     *            openicon:?string,
     *            closedicon:?string
     *          }}
     */
    interface CssConfig {
        container: string;
        row: string;
        rowcontentcontainer: string;
        icon: string;
        label: string;
        selected: string;
        openicon: string;
        closedicon: string
    }

    /**
     * Name used for registering a toolbox category.
     * @const {string}
     */
    var registrationName: any /*missing*/;

    /**
     * The number of pixels to move the category over at each nested level.
     * @type {number}
     */
    var nestedPadding: number;

    /**
     * The width in pixels of the strip of colour next to each category.
     * @type {number}
     */
    var borderWidth: number;

    /**
     * The default colour of the category. This is used as the background colour of
     * the category when it is selected.
     * @type {string}
     */
    var defaultBackgroundColour: string;
}
