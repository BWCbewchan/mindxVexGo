
declare module Blockly {

    class VariableMap extends VariableMap__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class VariableMap__Class  { 
    
            /**
             * Class for a variable map.  This contains a dictionary data structure with
             * variable types as keys and lists of variables as values.  The list of
             * variables are the type indicated by the key.
             * @param {!Blockly.Workspace} workspace The workspace this map belongs to.
             * @constructor
             */
            constructor(workspace: Blockly.Workspace);
    
            /**
             * The workspace this map belongs to.
             * @type {!Blockly.Workspace}
             */
            workspace: Blockly.Workspace;
    
            /**
             * Clear the variable map.
             */
            clear(): void;
    
            /**
             * Rename the given variable by updating its name in the variable map.
             * @param {!Blockly.VariableModel} variable Variable to rename.
             * @param {string} newName New variable name.
             * @package
             */
            renameVariable(variable: Blockly.VariableModel, newName: string): void;
    
            /**
             * Rename a variable by updating its name in the variable map. Identify the
             * variable to rename with the given ID.
             * @param {string} id ID of the variable to rename.
             * @param {string} newName New variable name.
             */
            renameVariableById(id: string, newName: string): void;
    
            /**
             * Create a variable with a given name, optional type, and optional ID.
             * @param {string} name The name of the variable. This must be unique across
             *     variables and procedures.
             * @param {?string=} opt_type The type of the variable like 'int' or 'string'.
             *     Does not need to be unique. Field_variable can filter variables based on
             *     their type. This will default to '' which is a specific type.
             * @param {?string=} opt_id The unique ID of the variable. This will default to
             *     a UUID.
             * @param {?number=} opt_arrayLength the lenght of the array if the variable is an array -RM
             * @param {?number=} opt_arrayWidth the widht of the array if the variable is an array -RM
             * @return {!Blockly.VariableModel} The newly created variable.
             */
            createVariable(name: string, opt_type?: string, opt_id?: string, opt_arrayLength?: number, opt_arrayWidth?: number): Blockly.VariableModel;
    
            /**
             * Delete a variable.
             * @param {!Blockly.VariableModel} variable Variable to delete.
             */
            deleteVariable(variable: Blockly.VariableModel): void;
    
            /**
             * Delete a variables by the passed in ID and all of its uses from this
             * workspace. May prompt the user for confirmation.
             * @param {string} id ID of variable to delete.
             */
            deleteVariableById(id: string): void;
    
            /**
             * Deletes a variable and all of its uses from this workspace without asking the
             * user for confirmation.
             * @param {!Blockly.VariableModel} variable Variable to delete.
             * @param {!Array.<!Blockly.Block>} uses An array of uses of the variable.
             * @package
             */
            deleteVariableInternal(variable: Blockly.VariableModel, uses: Blockly.Block[]): void;
    
            /**
             * Find the variable by the given name and type and return it.  Return null if
             *     it is not found.
             * @param {string} name The name to check for.
             * @param {?string=} opt_type The type of the variable.  If not provided it
             *     defaults to the empty string, which is a specific type.
             * @return {Blockly.VariableModel} The variable with the given name, or null if
             *     it was not found.
             */
            getVariable(name: string, opt_type?: string): Blockly.VariableModel;
    
            /**
             * Find the variable by the given ID and return it. Return null if it is not
             *     found.
             * @param {string} id The ID to check for.
             * @return {Blockly.VariableModel} The variable with the given ID.
             */
            getVariableById(id: string): Blockly.VariableModel;
    
            /**
             * Get a list containing all of the variables of a specified type. If type is
             *     null, return list of variables with empty string type.
             * @param {?string} type Type of the variables to find.
             * @return {!Array.<!Blockly.VariableModel>} The sought after variables of the
             *     passed in type. An empty array if none are found.
             */
            getVariablesOfType(type: string): Blockly.VariableModel[];
    
            /**
             * Return all variable and potential variable types.  This list always contains
             * the empty string.
             * @param {?Blockly.Workspace} ws The workspace used to look for potential
             * variables. This can be different than the workspace stored on this object
             * if the passed in ws is a flyout workspace.
             * @return {!Array.<string>} List of variable types.
             * @package
             */
            getVariableTypes(ws: Blockly.Workspace): string[];
    
            /**
             * Return all variables of all types.
             * @return {!Array.<!Blockly.VariableModel>} List of variable models.
             */
            getAllVariables(): Blockly.VariableModel[];
    
            /**
             * Returns all of the variable names of all types.
             * @return {!Array.<string>} All of the variable names of all types.
             */
            getAllVariableNames(): string[];
    
            /**
             * Find all the uses of a named variable.
             * @param {string} id ID of the variable to find.
             * @return {!Array.<!Blockly.Block>} Array of block usages.
             */
            getVariableUsesById(id: string): Blockly.Block[];
    } 
    
}
