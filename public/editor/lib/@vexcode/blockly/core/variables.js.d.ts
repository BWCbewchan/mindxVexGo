
declare module Blockly.Variables {

    /**
     * Constant to separate variable names from procedures and generated functions
     * when running generators.
     * @deprecated Use Blockly.VARIABLE_CATEGORY_NAME
     */
    var NAME_TYPE: any /*missing*/;

    /**
     * Find all user-created variables that are in use in the workspace.
     * For use by generators.
     * To get a list of all variables on a workspace, including unused variables,
     * call Workspace.getAllVariables.
     * @param {!Blockly.Workspace} ws The workspace to search for variables.
     * @return {!Array.<!Blockly.VariableModel>} Array of variable models.
     */
    function allUsedVarModels(ws: Blockly.Workspace): Blockly.VariableModel[];

    /**
     * Find all developer variables used by blocks in the workspace.
     * Developer variables are never shown to the user, but are declared as global
     * variables in the generated code.
     * To declare developer variables, define the getDeveloperVariables function on
     * your block and return a list of variable names.
     * For use by generators.
     * @param {!Blockly.Workspace} workspace The workspace to search.
     * @return {!Array.<string>} A list of non-duplicated variable names.
     */
    function allDeveloperVariables(workspace: Blockly.Workspace): string[];

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

    /**
     * Return a new variable name that is not yet being used. This will try to
     * generate single letter variable names in the range 'i' to 'z' to start with.
     * If no unique name is located it will try 'i' to 'z', 'a' to 'h',
     * then 'i2' to 'z2' etc.  Skip 'l'.
     * @param {!Blockly.Workspace} workspace The workspace to be unique in.
     * @return {string} New variable name.
     */
    function generateUniqueName(workspace: Blockly.Workspace): string;

    /**
     * Returns a unique name that is not present in the usedNames array. This
     * will try to generate single letter names in the range a -> z (skip l). It
     * will start with the character passed to startChar.
     * @param {string} startChar The character to start the search at.
     * @param {!Array.<string>} usedNames A list of all of the used names.
     * @return {string} A unique name that is not present in the usedNames array.
     */
    function generateUniqueNameFromOptions(startChar: string, usedNames: string[]): string;

    /**
     * Handles "Create Variable" button in the default variables toolbox category.
     * It will prompt the user for a variable name, including re-prompts if a name
     * is already in use among the workspace's variables.
     *
     * Custom button handlers can delegate to this function, allowing variables
     * types and after-creation processing. More complex customization (e.g.,
     * prompting for variable type) is beyond the scope of this function.
     *
     * @param {!Blockly.Workspace} workspace The workspace on which to create the
     *     variable.
     * @param {function(?string=)=} opt_callback A callback. It will be passed an
     *     acceptable new variable name, or null if change is to be aborted (cancel
     *     button), or undefined if an existing variable was chosen.
     * @param {string=} opt_type The type of the variable like 'int', 'string', or
     *     ''. This will default to '', which is a specific type.
     */
    function createVariableButtonHandler(workspace: Blockly.Workspace, opt_callback?: { (_0: string): any /*missing*/ }, opt_type?: string): void;

    /**
     * Original name of Blockly.Variables.createVariableButtonHandler(..).
     * @deprecated Use Blockly.Variables.createVariableButtonHandler(..).
     *
     * @param {!Blockly.Workspace} workspace The workspace on which to create the
     *     variable.
     * @param {function(?string=)=} opt_callback A callback. It will be passed an
     *     acceptable new variable name, or null if change is to be aborted (cancel
     *     button), or undefined if an existing variable was chosen.
     * @param {string=} opt_type The type of the variable like 'int', 'string', or
     *     ''. This will default to '', which is a specific type.
     */
    function createVariable(workspace: Blockly.Workspace, opt_callback?: { (_0: string): any /*missing*/ }, opt_type?: string): void;

    /**
     * Opens a prompt that allows the user to enter a new name for a variable.
     * Triggers a rename if the new name is valid. Or re-prompts if there is a
     * collision.
     * @param {!Blockly.Workspace} workspace The workspace on which to rename the
     *     variable.
     * @param {Blockly.VariableModel} variable Variable to rename.
     * @param {function(?string=)=} opt_callback A callback. It will
     *     be passed an acceptable new variable name, or null if change is to be
     *     aborted (cancel button), or undefined if an existing variable was chosen.
     */
    function renameVariable(workspace: Blockly.Workspace, variable: Blockly.VariableModel, opt_callback?: { (_0: string): any /*missing*/ }): void;

    /**
     * Prompt the user for a new variable name.
     * @param {string} promptText The string of the prompt.
     * @param {string} defaultText The default value to show in the prompt's field.
     * @param {function(?string,{arrayLength: number, arrayWidth: number}=)} callback 
     *     A callback. It will return the new variable name, or null if the user 
     *     picked something illegal.
     * @param {string=} opt_title An optional title for the prompt. -RM
     * @param {string=} opt_varType An optional variable type for variable specific -RM
     */
    function promptName(promptText: string, defaultText: string, callback: { (_0: string, _1: { arrayLength: number; arrayWidth: number }): any /*missing*/ }, opt_title?: string, opt_varType?: string): void;

    /**
     * Check whether there exists a variable with the given name of any type.
     * @param {string} name The name to search for.
     * @param {!Blockly.Workspace} workspace The workspace to search for the
     *     variable.
     * @return {Blockly.VariableModel} The variable with the given name,
     *     or null if none was found.
     */
    function nameUsedWithAnyType(name: string, workspace: Blockly.Workspace): Blockly.VariableModel;

    /**
     * Generate DOM objects representing a variable field.
     * @param {!Blockly.VariableModel} variableModel The variable model to
     *     represent.
     * @return {Element} The generated DOM.
     * @public
     */
    function generateVariableFieldDom(variableModel: Blockly.VariableModel): Element;

    /**
     * Helper function to look up or create a variable on the given workspace.
     * If no variable exists, creates and returns it.
     * @param {!Blockly.Workspace} workspace The workspace to search for the
     *     variable.  It may be a flyout workspace or main workspace.
     * @param {?string} id The ID to use to look up or create the variable, or null.
     * @param {string=} opt_name The string to use to look up or create the
     *     variable.
     * @param {string=} opt_type The type to use to look up or create the variable.
     * @return {!Blockly.VariableModel} The variable corresponding to the given ID
     *     or name + type combination.
     */
    function getOrCreateVariablePackage(workspace: Blockly.Workspace, id: string, opt_name?: string, opt_type?: string): Blockly.VariableModel;

    /**
     * Look up  a variable on the given workspace.
     * Always looks in the main workspace before looking in the flyout workspace.
     * Always prefers lookup by ID to lookup by name + type.
     * @param {!Blockly.Workspace} workspace The workspace to search for the
     *     variable.  It may be a flyout workspace or main workspace.
     * @param {?string} id The ID to use to look up the variable, or null.
     * @param {string=} opt_name The string to use to look up the variable.
     *     Only used if lookup by ID fails.
     * @param {string=} opt_type The type to use to look up the variable.
     *     Only used if lookup by ID fails.
     * @return {Blockly.VariableModel} The variable corresponding to the given ID
     *     or name + type combination, or null if not found.
     * @public
     */
    function getVariable(workspace: Blockly.Workspace, id: string, opt_name?: string, opt_type?: string): Blockly.VariableModel;

    /**
     * Helper function to get the list of variables that have been added to the
     * workspace after adding a new block, using the given list of variables that
     * were in the workspace before the new block was added.
     * @param {!Blockly.Workspace} workspace The workspace to inspect.
     * @param {!Array.<!Blockly.VariableModel>} originalVariables The array of
     *     variables that existed in the workspace before adding the new block.
     * @return {!Array.<!Blockly.VariableModel>} The new array of variables that
     *     were freshly added to the workspace after creating the new block,
     *     or [] if no new variables were added to the workspace.
     * @package
     */
    function getAddedVariables(workspace: Blockly.Workspace, originalVariables: Blockly.VariableModel[]): Blockly.VariableModel[];

    /**
     * Find all developer variables used by blocks in the workspace.
     * Developer variables are never shown to the user, but are declared as global
     * variables in the generated code.
     * To declare developer variables, define the getDeveloperVariables function on
     * your block and return a list of variable names.
     * For use by generators.
     * @param {!Blockly.Workspace} workspace The workspace to search.
     * @return {!Array.<string|Object>} A list of non-duplicated variables data.
     */
    function allDeveloperVariablesData(workspace: Blockly.Workspace): string|Object[];
}
