
declare module Blockly {

    class ToolboxItem extends ToolboxItem__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ToolboxItem__Class implements Blockly.IToolboxItem  { 
    
            /**
             * Class for an item in the toolbox.
             * @param {!Blockly.utils.toolbox.ToolboxItemInfo} toolboxItemDef The JSON defining the
             *     toolbox item.
             * @param {!Blockly.IToolbox} toolbox The toolbox that holds the toolbox item.
             * @param {Blockly.ICollapsibleToolboxItem=} opt_parent The parent toolbox item
             *     or null if the category does not have a parent.
             * @constructor
             * @implements {Blockly.IToolboxItem}
             */
            constructor(toolboxItemDef: Blockly.utils.toolbox.ToolboxItemInfo, toolbox: Blockly.IToolbox, opt_parent?: Blockly.ICollapsibleToolboxItem);
    
            /**
             * The id for the category.
             * @type {string}
             * @protected
             */
            id_: string;
    
            /**
             * The parent of the category.
             * @type {?Blockly.ICollapsibleToolboxItem}
             * @protected
             */
            parent_: Blockly.ICollapsibleToolboxItem;
    
            /**
             * The level that the category is nested at.
             * @type {number}
             * @protected
             */
            level_: number;
    
            /**
             * The JSON definition of the toolbox item.
             * @type {!Blockly.utils.toolbox.ToolboxItemInfo}
             * @protected
             */
            toolboxItemDef_: Blockly.utils.toolbox.ToolboxItemInfo;
    
            /**
             * The toolbox this category belongs to.
             * @type {!Blockly.IToolbox}
             * @protected
             */
            parentToolbox_: Blockly.IToolbox;
    
            /**
             * The workspace of the parent toolbox.
             * @type {!Blockly.WorkspaceSvg}
             * @protected
             */
            workspace_: Blockly.WorkspaceSvg;
    
            /**
             * Initializes the toolbox item.
             * This includes creating the dom and updating the state of any items based
             * on the info object.
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
            dispose(): void;
    } 
    
}
