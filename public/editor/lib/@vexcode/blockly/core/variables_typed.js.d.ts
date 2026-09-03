
declare module Blockly.VariablesTyped {

    /**
     * Construct the blocks required by the flyout for the variable category.
     * @param {!Blockly.Workspace} workspace The workspace containing variables.
     * @return {!Array.<!Element>} Array of XML block elements.
     */
    function flyoutCategory(workspace: Blockly.Workspace): Element[];

    /**
     * Construct and add a data_variable block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addDataVariable(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_setvariableto block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addSetVariableTo(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_changevariableby block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addChangeVariableBy(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_bool_variable block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addBoolVariable(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_setboolvariableto block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addSetBoolVariableTo(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_listcontents block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addDataList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_listsetvalue block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addSetList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_addtolist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addAddToList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_deleteoflist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addDeleteOfList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_deleteoflist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addDeleteAllOfList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_insertatlist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addInsertAtList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_replaceitemoflist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addReplaceItemOfList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_itemoflist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addItemOfList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /** Construct and add a data_itemnumoflist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addItemNumberOfList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_lengthoflist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addLengthOfList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_listcontainsitem block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addListContainsItem(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_itemof2darray block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addItemOf2DArray(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_setitemof2darray block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addSetItemOf2DArray(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_set2darrayto block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addSet2DArrayTo(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_lengthof2darray block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addLengthOf2DArray(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_showlist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addShowList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct and add a data_hidelist block to xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     */
    function addHideList(xmlList: Element[], variable: Blockly.VariableModel): void;

    /**
     * Construct a create variable button and push it to the xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {Blockly.Workspace} workspace Workspace to register callback to.
     * @param {string} type Type of variable this is for. For example, 'LIST' or
     *     'VARIABLE'.
     */
    function addCreateButton(xmlList: Element[], workspace: Blockly.Workspace, type: string): void;

    /**
     * Construct a variable block with the given variable, blockType, and optional
     *     value tags. Add the variable block to the given xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     * @param {?Blockly.VariableModel} variable Variable to select in the field.
     * @param {string} blockType Type of block. For example, 'data_hidelist' or
     *     data_showlist'.
     * @param {string} fieldName Name of field in block. For example: 'VARIABLE' or
     *     'LIST'.
     * @param {?Array.<string>=} opt_value Optional array containing the value name
     *     and shadow type of value tags.
     * @param {?Array.<string>=} opt_secondValue Optional array containing the value
     *     name and shadow type of a second pair of value tags.
     * @param {?Array.<string>=} opt_thirdValue Optional array containing the value
     *     name and shadow type of a third pair of value tags.
     */
    function addBlock(xmlList: Element[], variable: Blockly.VariableModel, blockType: string, fieldName: string, opt_value?: string[], opt_secondValue?: string[], opt_thirdValue?: string[]): void;

    /**
     * Create the text representation of a value dom element with a shadow of the
     *     indicated type inside.
     * @param {string} valueName Name of the value tags.
     * @param {string} type The type of the shadow tags.
     * @param {string|number} value The default shadow value.
     * @return {string} The generated dom element in text.
     */
    function createValue(valueName: string, type: string, value: string|number): string;

    /**
     * Construct a block separator. Add the separator to the given xmlList.
     * @param {!Array.<!Element>} xmlList Array of XML block elements.
     */
    function addSep(xmlList: Element[]): void;

    /**
     * Callback factory for dropdown menu options associated with a variable getter
     * block.  Each variable on the workspace gets its own item in the dropdown
     * menu, and clicking on that item changes the text of the field on the source
     * block.
     * RM CHANGES -> Upgraded to develop branch of Scratch Blocks 
     * @param {!Blockly.Block} block The block to update.
     * @param {string} id The id of the variable to set on this block.
     * @param {string} fieldName The name of the field to update on the block.
     * @return {!function()} A function that updates the block with the new name.
     */
    function VARIABLE_OPTION_CALLBACK_FACTORY(block: Blockly.Block, id: string, fieldName: string): { (): any /*missing*/ };

    /**
     * Callback for rename variable dropdown menu option associated with a
     * variable getter block.
     * @param {!Blockly.Block} block The block with the variable to rename.
     * @return {!function()} A function that renames the variable.
     */
    function RENAME_OPTION_CALLBACK_FACTORY(block: Blockly.Block): { (): any /*missing*/ };

    /**
     * Callback for delete variable dropdown menu option associated with a
     * variable getter block.
     * @param {!Blockly.Block} block The block with the variable to delete.
     * @return {!function()} A function that deletes the variable.
     */
    function DELETE_OPTION_CALLBACK_FACTORY(block: Blockly.Block): { (): any /*missing*/ };

    /**
     * Mixin for mutator functions in the 'data_set_list_contents_mutator'
     * extension.
     * @mixin
     * @augments Blockly.Block
     * @package
     */
    var SET_LIST_CONTENTS_MUTATOR_MIXIN: any /*missing*/;

    /**
     * 'data_set_list_contents_mutator' extension to the 'data_listsetvalue' block that
     * can update the block shape (add/remove value inputs) based on list length.
     * @this Blockly.Block
     * @package
     */
    function SET_LIST_CONTENTS_MUTATOR_EXTENSION(): void;

    /**
    * Mixin for mutator functions in the 'data_set_2darray_contents_mutator'
    * extension.
    * @mixin
    * @augments Blockly.Block
    * @package
    */
    var SET_2DARRAY_CONTENTS_MUTATOR_MIXIN: any /*missing*/;

    /**
     * 'data_set_2darray_contents_mutator' extension to the 'data_set2darrayto' block that
     * can update the block shape (add/remove value inputs) based on list length.
     * @this Blockly.Block
     * @package
     */
    function SET_2DARRAY_CONTENTS_MUTATOR_EXTENSION(): void;

    /**
     * Mixin for mutator functions in the 'data_set_2darrayrow_contents_mutator'
     * extension.
     * @mixin
     * @augments Blockly.Block
     * @package
     */
    var SET_2DARRAYROW_CONTENTS_MUTATOR_MIXIN: any /*missing*/;

    /**
     * 'data_set_2darrayrow_contents_mutator' extension to the 'data_2darrayrow' block that
     * can update the block shape (add/remove value inputs) based on list length.
     * @this Blockly.Block
     * @package
     */
    function SET_2DARRAYROW_CONTENTS_MUTATOR_EXTENSION(): void;
}
