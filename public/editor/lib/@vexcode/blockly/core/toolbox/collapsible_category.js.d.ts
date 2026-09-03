
declare module Blockly {

    class CollapsibleToolboxCategory extends CollapsibleToolboxCategory__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class CollapsibleToolboxCategory__Class extends Blockly.ToolboxCategory__Class implements Blockly.ICollapsibleToolboxItem  { 
    
            /**
             * Class for a category in a toolbox that can be collapsed.
             * @param {!Blockly.utils.toolbox.CategoryInfo} categoryDef The information needed
             *     to create a category in the toolbox.
             * @param {!Blockly.IToolbox} toolbox The parent toolbox for the category.
             * @param {Blockly.ICollapsibleToolboxItem=} opt_parent The parent category or null if
             *     the category does not have a parent.
             * @constructor
             * @extends {Blockly.ToolboxCategory}
             * @implements {Blockly.ICollapsibleToolboxItem}
             */
            constructor(categoryDef: Blockly.utils.toolbox.CategoryInfo, toolbox: Blockly.IToolbox, opt_parent?: Blockly.ICollapsibleToolboxItem);
    
            /**
             * Container for any child categories.
             * @type {?Element}
             * @protected
             */
            subcategoriesDiv_: Element;
    
            /**
             * Whether or not the category should display its subcategories.
             * @type {boolean}
             * @protected
             */
            expanded_: boolean;
    
            /**
             * The child toolbox items for this category.
             * @type {!Array<!Blockly.ToolboxItem>}
             * @protected
             */
            toolboxItems_: Blockly.ToolboxItem[];
    
            /**
             * Create the dom for all subcategories.
             * @param {!Array<!Blockly.ToolboxItem>} subcategories The subcategories.
             * @return {!Element} The div holding all the subcategories.
             * @protected
             */
            createSubCategoriesDom_(subcategories: Blockly.ToolboxItem[]): Element;
    
            /**
             * Opens or closes the current category.
             * @param {boolean} isExpanded True to expand the category, false to close.
             * @public
             */
            setExpanded(isExpanded: boolean): void;
    
            /**
             * Whether the category is expanded to show its child subcategories.
             * @return {boolean} True if the toolbox item shows its children, false if it
             *     is collapsed.
             * @public
             */
            isExpanded(): boolean;
    
            /**
             * Toggles whether or not the category is expanded.
             * @public
             */
            toggleExpanded(): void;
    
            /**
             * Gets any children toolbox items. (ex. Gets the subcategories)
             * @return {!Array<!Blockly.IToolboxItem>} The child toolbox items.
             */
            getChildToolboxItems(): Blockly.IToolboxItem[];
    } 
    
}

declare module Blockly.CollapsibleToolboxCategory {

    /**
     * All the css class names that are used to create a collapsible
     * category. This is all the properties from the regular category plus contents.
     * @typedef {{
     *            container:?string,
     *            row:?string,
     *            rowcontentcontainer:?string,
     *            icon:?string,
     *            label:?string,
     *            selected:?string,
     *            openicon:?string,
     *            closedicon:?string,
     *            contents:?string
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
        closedicon: string;
        contents: string
    }

    /**
     * Name used for registering a collapsible toolbox category.
     * @const {string}
     */
    var registrationName: any /*missing*/;
}
