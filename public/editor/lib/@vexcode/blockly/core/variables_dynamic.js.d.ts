
declare module Blockly.VariablesDynamic {

    /**
     * Construct the elements (blocks and button) required by the flyout for the
     * variable category.
     * @param {!Blockly.Workspace} workspace The workspace containing variables.
     * @return {!Array.<!Element>} Array of XML elements.
     */
    function flyoutCategory(workspace: Blockly.Workspace): Element[];

    /**
     * Construct the blocks required by the flyout for the variable category.
     * @param {!Blockly.Workspace} workspace The workspace containing variables.
     * @return {!Array.<!Element>} Array of XML block elements.
     */
    function flyoutCategoryBlocks(workspace: Blockly.Workspace): Element[];
}
