
declare module Blockly.Procedures {

    /**
     * Constant to separate procedure names from variables and generated functions
     * when running generators.
     * @deprecated Use Blockly.PROCEDURE_CATEGORY_NAME
     */
    var NAME_TYPE: any /*missing*/;

    /**
     * The default argument for a procedures_mutatorarg block.
     * @type {string}
     */
    var DEFAULT_ARG: string;

    /**
     * Procedure block type.
     * @typedef {{
     *    getProcedureCall: function():string,
     *    renameProcedure: function(string,string),
     *    getProcedureDef: function():!Array
     * }}
     */
    interface ProcedureBlock {
        getProcedureCall: { (): string };
        renameProcedure: { (_0: string, _1: string): any /*missing*/ };
        getProcedureDef: { (): any[] }
    }

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
     * Listens for when a procedure mutator is opened. Then it triggers a flyout
     * update and adds a mutator change listener to the mutator workspace.
     * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
     * @package
     */
    function mutatorOpenListener(e: Blockly.Events.Abstract): void;

    /**
     * Find all callers of a named procedure.
     * @param {string} name Name of procedure (procCode in scratch-blocks).
     * @param {!Blockly.Workspace} ws The workspace to find callers in.
     * @param {!Blockly.Block} definitionRoot The root of the stack where the
     *     procedure is defined.
     * @param {boolean} allowRecursive True if the search should include recursive
     *     procedure calls.  False if the search should ignore the stack starting
     *     with definitionRoot.
     * @return {!Array.<!Blockly.Block>} Array of caller blocks.
     * @package
     */
    function getCallers(name: string, ws: Blockly.Workspace, definitionRoot: Blockly.Block, allowRecursive: boolean): Blockly.Block[];

    /**
     * When a procedure definition changes its parameters, find and edit all its
     * callers.
     * @param {!Blockly.Block} defBlock Procedure definition block.
     */
    function mutateCallers(defBlock: Blockly.Block): void;

    /**
     * Find the definition block for the named procedure.
     * @param {string} procCode The identifier of the procedure.
     * @param {!Blockly.Workspace} workspace The workspace to search.
     * @return {Blockly.Block} The procedure definition block, or null not found.
     */
    function getDefinition(procCode: string, workspace: Blockly.Workspace): Blockly.Block;

    /**
     * Find all user-created procedure definition mutations in a workspace.
     * @param {!Blockly.Workspace} root Root workspace.
     * @return {!Array.<Element>} Array of mutation xml elements.
     * @package
     */
    function allProcedureMutations(root: Blockly.Workspace): Element[];

    /**
     * Find all procedure variable blocks of a named procedure.
     * @param {string} name Name of procedure (funcName).
     * @param {!Blockly.Workspace} ws The workspace to find callers in.
     * @param {!Blockly.Block} definitionRoot The root of the stack where the
     *     procedure is defined.
     * @param {boolean} allowRecursive True if the search should include recursive
     *     procedure calls.  False if the search should ignore the stack starting
     *     with definitionRoot.
     * @return {!Array.<!Blockly.Block>} Array of caller blocks.
     * @package
     */
    function getVariables(name: string, ws: Blockly.Workspace, definitionRoot: Blockly.Block, allowRecursive: boolean): Blockly.Block[];

    /**
     * Find and edit all callers with a procCode using a new mutation.
     * @param {string} name Name of procedure (procCode in scratch-blocks).
     * @param {!Blockly.Workspace} ws The workspace to find callers in.
     * @param {!Element} mutation New mutation for the callers.
     * @package
     */
    function mutateCallersAndPrototype(name: string, ws: Blockly.Workspace, mutation: Element): void;

    /**
     * Find the definition block for the named procedure.
     * @param {string} procCode The identifier of the procedure.
     * @param {!Blockly.Workspace} workspace The workspace to search.
     * @return {Blockly.Block} The procedure definition block, or null not found.
     * @package
     */
    function getDefineBlock(procCode: string, workspace: Blockly.Workspace): Blockly.Block;

    /**
     * Find the prototype block for the named procedure.
     * @param {string} procCode The identifier of the procedure.
     * @param {!Blockly.Workspace} workspace The workspace to search.
     * @return {Blockly.Block} The procedure prototype block, or null not found.
     * @package
     */
    function getPrototypeBlock(procCode: string, workspace: Blockly.Workspace): Blockly.Block;

    /**
     * Create a mutation for a brand new custom procedure.
     * @return {Element} The mutation for a new custom procedure
     * @package
     */
    function newProcedureMutation(): Element;

    /**
     * Callback to open the modal for editing custom procedures.
     * @param {!Blockly.Block} block The block that was right-clicked.
     */
    function editProcedureCallback(block: Blockly.Block): void;

    /**
     * Callback to create a new procedure custom command block.
     * @param {Element} mutator the data for the my block
     * @param {Function} callback the function to call when the edit is done
     * @public
     */
    function externalProcedureDefCallback(mutator: Element, callback: Function): void;

    /**
     * Callback to try to delete a custom block definitions.
     * @param {string} procCode The identifier of the procedure to delete.
     * @param {!Blockly.Block} definitionRoot The root block of the stack that
     *     defines the custom procedure.
     * @return {boolean} True if the custom procedure was deleted, false otherwise.
     */
    function deleteProcedureDefCallback(procCode: string, definitionRoot: Blockly.Block): boolean;
}
