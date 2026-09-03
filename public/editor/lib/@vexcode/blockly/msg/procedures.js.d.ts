
declare module Blockly.Procedures {

    /**
     * Constant to separate procedure names from variables and generated functions
     * when running generators.
     * @deprecated Use Blockly.PROCEDURE_CATEGORY_NAME
     */
    var NAME_TYPE: any /*missing*/;

    /**
     * Find all user-created procedure definitions in a workspace.
     * @param {!Blockly.Workspace} root Root workspace.
     * @return {!Array.<!Array.<!Array>>} Pair of arrays, the
     *     first contains procedures without return variables, the second with.
     *     Each procedure is defined by a three-element list of name, parameter
     *     list, and return value boolean.
     */
    function allProcedures(root: Blockly.Workspace): any[][][];

    /**
     * Ensure two identically-named procedures don't exist.
     * Take the proposed procedure name, and return a legal name i.e. one that
     * is not empty and doesn't collide with other procedures.
     * @param {string} name Proposed procedure name.
     * @param {!Blockly.Block} block Block to disambiguate.
     * @return {string} Non-colliding name.
     */
    function findLegalName(name: string, block: Blockly.Block): string;

    /**
     * Return if the given name is already a procedure name.
     * @param {string} name The questionable name.
     * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
     * @param {Blockly.Block=} opt_exclude Optional block to exclude from
     *     comparisons (one doesn't want to collide with oneself).
     * @return {boolean} True if the name is used, otherwise return false.
     */
    function isNameUsed(name: string, workspace: Blockly.Workspace, opt_exclude?: Blockly.Block): boolean;

    /**
     * Rename a procedure.  Called by the editable field.
     * @param {string} name The proposed new name.
     * @return {string} The accepted name.
     * @this {Blockly.Field}
     */
    function rename(name: string): string;

    /**
     * Construct the blocks required by the flyout for the procedure category.
     * @param {!Blockly.Workspace} workspace The workspace containing procedures.
     * @return {!Array.<!Element>} Array of XML block elements.
     */
    function flyoutCategory(workspace: Blockly.Workspace): Element[];

    /**
     * Find all the callers of a named procedure.
     * @param {string} name Name of procedure.
     * @param {!Blockly.Workspace} workspace The workspace to find callers in.
     * @return {!Array.<!Blockly.Block>} Array of caller blocks.
     */
    function getCallers(name: string, workspace: Blockly.Workspace): Blockly.Block[];

    /**
     * When a procedure definition changes its parameters, find and edit all its
     * callers.
     * @param {!Blockly.Block} defBlock Procedure definition block.
     */
    function mutateCallers(defBlock: Blockly.Block): void;

    /**
     * Find the definition block for the named procedure.
     * @param {string} name Name of procedure.
     * @param {!Blockly.Workspace} workspace The workspace to search.
     * @return {Blockly.Block} The procedure definition block, or null not found.
     */
    function getDefinition(name: string, workspace: Blockly.Workspace): Blockly.Block;
}
