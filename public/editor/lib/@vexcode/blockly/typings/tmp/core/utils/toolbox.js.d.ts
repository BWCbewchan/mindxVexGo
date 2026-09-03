
declare module Blockly.utils.toolbox {

    /**
     * The information needed to create a block in the toolbox.
     * @typedef {{
     *            kind: string,
     *            blockxml: (?string|Node),
     *            type: (?string),
     *            gap: (?string|?number),
     *            disabled: (?string|?boolean)
     *          }}
     */
    interface BlockInfo {
        kind: string;
        blockxml: string|Node;
        type: string;
        gap: string|number;
        disabled: string|boolean
    }

    /**
     * The information needed to create a separator in the toolbox.
     * @typedef {{
     *            kind:string,
     *            id:?string,
     *            gap:?number,
     *            cssconfig:?Blockly.ToolboxSeparator.CssConfig
     *          }}
     */
    interface SeparatorInfo {
        kind: string;
        id: string;
        gap: number;
        cssconfig: Blockly.ToolboxSeparator.CssConfig
    }

    /**
     * The information needed to create a button in the toolbox.
     * @typedef {{
     *            kind:string,
     *            text:string,
     *            callbackkey:string
     *          }}
     */
    interface ButtonInfo {
        kind: string;
        text: string;
        callbackkey: string
    }

    /**
     * The information needed to create a label in the toolbox.
     * @typedef {{
     *            kind:string,
     *            id:?string,
     *            text:string
     *          }}
     */
    interface LabelInfo {
        kind: string;
        id: string;
        text: string
    }

    /**
     * The information needed to create either a button or a label in the flyout.
     * @typedef {Blockly.utils.toolbox.ButtonInfo|
     *           Blockly.utils.toolbox.LabelInfo}
     */
    type ButtonOrLabelInfo = Blockly.utils.toolbox.ButtonInfo|Blockly.utils.toolbox.LabelInfo;

    /**
     * The information needed to create a category in the toolbox.
     * @typedef {{
     *            kind:string,
     *            name:string,
     *            id:?string,
     *            categorystyle:?string,
     *            colour:?string,
     *            cssconfig:?Blockly.ToolboxCategory.CssConfig,
     *            contents:!Array<Blockly.utils.toolbox.ToolboxItemInfo>,
     *            hidden:?string
     *          }}
     */
    interface StaticCategoryInfo {
        kind: string;
        name: string;
        id: string;
        categorystyle: string;
        colour: string;
        cssconfig: Blockly.ToolboxCategory.CssConfig;
        contents: Blockly.utils.toolbox.ToolboxItemInfo[];
        hidden: string
    }

    /**
     * The information needed to create a custom category.
     * @typedef {{
     *            kind:string,
     *            custom:string,
     *            id:?string,
     *            categorystyle:?string,
     *            colour:?string,
     *            cssconfig:?Blockly.ToolboxCategory.CssConfig,
     *            hidden:?string
     *          }}
     */
    interface DynamicCategoryInfo {
        kind: string;
        custom: string;
        id: string;
        categorystyle: string;
        colour: string;
        cssconfig: Blockly.ToolboxCategory.CssConfig;
        hidden: string
    }

    /**
     * The information needed to create either a dynamic or static category.
     * @typedef {Blockly.utils.toolbox.StaticCategoryInfo|
     *           Blockly.utils.toolbox.DynamicCategoryInfo}
     */
    type CategoryInfo = Blockly.utils.toolbox.StaticCategoryInfo|Blockly.utils.toolbox.DynamicCategoryInfo;

    /**
     * Any information that can be used to create an item in the toolbox.
     * @typedef {Blockly.utils.toolbox.FlyoutItemInfo|
     *           Blockly.utils.toolbox.StaticCategoryInfo}
     */
    type ToolboxItemInfo = Blockly.utils.toolbox.FlyoutItemInfo|Blockly.utils.toolbox.StaticCategoryInfo;

    /**
     * All the different types that can be displayed in a flyout.
     * @typedef {Blockly.utils.toolbox.BlockInfo|
     *           Blockly.utils.toolbox.SeparatorInfo|
     *           Blockly.utils.toolbox.ButtonInfo|
     *           Blockly.utils.toolbox.LabelInfo|
     *           Blockly.utils.toolbox.DynamicCategoryInfo}
     */
    type FlyoutItemInfo = Blockly.utils.toolbox.BlockInfo|Blockly.utils.toolbox.SeparatorInfo|Blockly.utils.toolbox.ButtonInfo|Blockly.utils.toolbox.LabelInfo|Blockly.utils.toolbox.DynamicCategoryInfo;

    /**
     * The JSON definition of a toolbox.
     * @typedef {{
     *            kind: string,
     *            contents:!Array<Blockly.utils.toolbox.ToolboxItemInfo>
     *          }}
     */
    interface ToolboxInfo {
        kind: string;
        contents: Blockly.utils.toolbox.ToolboxItemInfo[]
    }

    /**
     * An array holding flyout items.
     * @typedef {
     *            Array<!Blockly.utils.toolbox.FlyoutItemInfo>
     *          }
     */
    interface FlyoutItemInfoArray extends Array<Blockly.utils.toolbox.FlyoutItemInfo> { }

    /**
     * All of the different types that can create a toolbox.
     * @typedef {Node|
     *           Blockly.utils.toolbox.ToolboxInfo|
     *           string}
     */
    type ToolboxDefinition = Node|Blockly.utils.toolbox.ToolboxInfo|string;

    /**
     * All of the different types that can be used to show items in a flyout.
     * @typedef {Blockly.utils.toolbox.FlyoutItemInfoArray|
     *           NodeList|
     *           Blockly.utils.toolbox.ToolboxInfo|
     *           Array<!Node>}
     */
    type FlyoutDefinition = Blockly.utils.toolbox.FlyoutItemInfoArray|NodeList|Blockly.utils.toolbox.ToolboxInfo|Node[];

    /**
     * The name used to identify a toolbox that has category like items.
     * This only needs to be used if a toolbox wants to be treated like a category
     * toolbox but does not actually contain any toolbox items with the kind
     * 'category'.
     * @const {string}
     */
    var CATEGORY_TOOLBOX_KIND: any /*missing*/;

    /**
     * The name used to identify a toolbox that has no categories and is displayed
     * as a simple flyout displaying blocks, buttons, or labels.
     * @const {string}
     */
    var FLYOUT_TOOLBOX_KIND: any /*missing*/;

    /**
     * Position of the the toolbox relative to the flyout.
     * @enum {number}
     */
    enum Position { TOP, BOTTOM, LEFT, RIGHT } 

    /**
     * Converts the toolbox definition into toolbox JSON.
     * @param {?Blockly.utils.toolbox.ToolboxDefinition} toolboxDef The definition
     *     of the toolbox in one of its many forms.
     * @return {?Blockly.utils.toolbox.ToolboxInfo} Object holding information
     *     for creating a toolbox.
     * @package
     */
    function convertToolboxDefToJson(toolboxDef: Blockly.utils.toolbox.ToolboxDefinition): Blockly.utils.toolbox.ToolboxInfo;

    /**
     * Converts the flyout definition into a list of flyout items.
     * @param {?Blockly.utils.toolbox.FlyoutDefinition|Array<Blockly.utils.toolbox.FlyoutDefinition>} flyoutDef The definition of
     *    the flyout in one of its many forms.
     * @return {!Blockly.utils.toolbox.FlyoutItemInfoArray} A list of flyout items.
     * @package
     */
    function convertFlyoutDefToJsonArray(flyoutDef: Blockly.utils.toolbox.FlyoutDefinition|Blockly.utils.toolbox.FlyoutDefinition[]): Blockly.utils.toolbox.FlyoutItemInfoArray;

    /**
     * Converts the flyout definition into a list of flyout items.
     * @param {?Array<Blockly.utils.toolbox.FlyoutDefinition>} flyoutDef The definition of
     *    the flyout in one of its many forms.
     * @return {!Blockly.utils.toolbox.FlyoutItemInfoArray} A list of flyout items.
     * @package
     */
    function convertFlyoutDefArrayToJsonArray(flyoutDef: Blockly.utils.toolbox.FlyoutDefinition[]): Blockly.utils.toolbox.FlyoutItemInfoArray;

    /**
     * Whether or not the toolbox definition has categories.
     * @param {?Blockly.utils.toolbox.ToolboxInfo} toolboxJson Object holding
     *     information for creating a toolbox.
     * @return {boolean} True if the toolbox has categories.
     * @package
     */
    function hasCategories(toolboxJson: Blockly.utils.toolbox.ToolboxInfo): boolean;

    /**
     * Whether or not the category is collapsible.
     * @param {!Blockly.utils.toolbox.CategoryInfo} categoryInfo Object holing
     *    information for creating a category.
     * @return {boolean} True if the category has subcategories.
     * @package
     */
    function isCategoryCollapsible(categoryInfo: Blockly.utils.toolbox.CategoryInfo): boolean;

    /**
     * Parse the provided toolbox tree into a consistent DOM format.
     * @param {?Node|?string} toolboxDef DOM tree of blocks, or text representation
     *    of same.
     * @return {?Node} DOM tree of blocks, or null.
     */
    function parseToolboxTree(toolboxDef: Node|string): Node;
}
