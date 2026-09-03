
declare module Blockly {

    class Workspace extends Workspace__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Workspace__Class  { 
    
            /**
             * Class for a workspace.  This is a data structure that contains blocks.
             * There is no UI, and can be created headlessly.
             * @param {!Blockly.Options=} opt_options Dictionary of options.
             * @constructor
             */
            constructor(opt_options?: Blockly.Options);
    
            /** @type {string} */
            id: string;
    
            /** @type {!Blockly.Options} */
            options: Blockly.Options;
    
            /** @type {boolean} */
            RTL: boolean;
    
            /** @type {boolean} */
            horizontalLayout: boolean;
    
            /** @type {number} */
            toolboxPosition: number;
    
            /**
             * @type {!Array.<!Blockly.Events.Abstract>}
             * @protected
             */
            undoStack_: Blockly.Events.Abstract[];
    
            /**
             * @type {!Array.<!Blockly.Events.Abstract>}
             * @protected
             */
            redoStack_: Blockly.Events.Abstract[];
    
            /**
             * The cursor used to navigate around the AST for keyboard navigation.
             * @type {!Blockly.Cursor}
             * @protected
             */
            cursor_: Blockly.Cursor;
    
            /**
             * The marker used to mark a location for keyboard navigation.
             * @type {!Blockly.MarkerCursor}
             * @protected
             */
            marker_: Blockly.MarkerCursor;
    
            /**
             * Object in charge of storing and updating the workspace theme.
             * @type {!Blockly.ThemeManager}
             * @protected
             */
            themeManager_: Blockly.ThemeManager;
    
            /**
             * Returns `true` if the workspace is visible and `false` if it's headless.
             * @type {boolean}
             */
            rendered: boolean;
    
            /**
             * Returns `true` if the workspace is currently in the process of a bulk clear.
             * @type {boolean}
             * @package
             */
            isClearing: boolean;
    
            /**
             * Maximum number of undo events in stack. `0` turns off undo, `Infinity` sets
             * it to unlimited.
             * @type {number}
             */
            MAX_UNDO: number;
    
            /**
             * Set of databases for rapid lookup of connection locations.
             * @type {Array.<!Blockly.ConnectionDB>}
             */
            connectionDBList: Blockly.ConnectionDB[];
    
            /**
             * Sets the cursor for keyboard navigation.
             * @param {Blockly.Cursor} cursor The cursor used to navigate around the Blockly
             *     AST for keyboard navigation.
             */
            setCursor(cursor: Blockly.Cursor): void;
    
            /**
             * Sets the marker for keyboard navigation.
             * @param {Blockly.MarkerCursor} marker The marker used to mark a location for
             *     keyboard navigation.
             */
            setMarker(marker: Blockly.MarkerCursor): void;
    
            /**
             * Get the cursor used to navigate around the AST for keyboard navigation.
             * @return {Blockly.Cursor} The cursor for this workspace.
             */
            getCursor(): Blockly.Cursor;
    
            /**
             * Get the marker used to mark a location for keyboard navigation.
             * @return {Blockly.MarkerCursor} the marker for this workspace.
             */
            getMarker(): Blockly.MarkerCursor;
    
            /**
             * Get the workspace theme object.
             * @return {!Blockly.Theme} The workspace theme object.
             */
            getTheme(): Blockly.Theme;
    
            /**
             * Set the workspace theme object.
             * If no theme is passed, default to the `Blockly.Themes.Classic` theme.
             * @param {Blockly.Theme} theme The workspace theme object.
             */
            setTheme(theme: Blockly.Theme): void;
    
            /**
             * Refresh all blocks on the workspace after a theme update.
             * @package
             */
            refreshTheme(): void;
    
            /**
             * Dispose of this workspace.
             * Unlink from all DOM elements to prevent memory leaks.
             * @suppress {checkTypes}
             */
            dispose(): void;
    
            /**
             * Add a block to the list of top blocks.
             * @param {!Blockly.Block} block Block to add.
             */
            addTopBlock(block: Blockly.Block): void;
    
            /**
             * Remove a block from the list of top blocks.
             * @param {!Blockly.Block} block Block to remove.
             */
            removeTopBlock(block: Blockly.Block): void;
    
            /**
             * Finds the top-level blocks and returns them.  Blocks are optionally sorted
             * by position; top to bottom (with slight LTR or RTL bias).
             * @param {boolean} ordered Sort the list if true.
             * @return {!Array.<!Blockly.Block>} The top-level block objects.
             */
            getTopBlocks(ordered: boolean): Blockly.Block[];
    
            /**
             * Add a block to the list of blocks keyed by type.
             * @param {!Blockly.Block} block Block to add.
             */
            addTypedBlock(block: Blockly.Block): void;
    
            /**
             * Remove a block from the list of blocks keyed by type.
             * @param {!Blockly.Block} block Block to remove.
             */
            removeTypedBlock(block: Blockly.Block): void;
    
            /**
             * Finds the blocks with the associated type and returns them. Blocks are
             * optionally sorted by position; top to bottom (with slight LTR or RTL bias).
             * @param {string} type The type of block to search for.
             * @param {boolean} ordered Sort the list if true.
             * @return {!Array.<!Blockly.Block>} The blocks of the given type.
             */
            getBlocksByType(type: string, ordered: boolean): Blockly.Block[];
    
            /**
             * Add a comment to the list of top comments.
             * @param {!Blockly.WorkspaceComment} comment comment to add.
             * @package
             */
            addTopComment(comment: Blockly.WorkspaceComment): void;
    
            /**
             * Remove a comment from the list of top comments.
             * @param {!Blockly.WorkspaceComment} comment comment to remove.
             * @package
             */
            removeTopComment(comment: Blockly.WorkspaceComment): void;
    
            /**
             * Finds the top-level comments and returns them.  Comments are optionally
             * sorted by position; top to bottom (with slight LTR or RTL bias).
             * @param {boolean} ordered Sort the list if true.
             * @return {!Array.<!Blockly.WorkspaceComment>} The top-level comment objects.
             * @package
             */
            getTopComments(ordered: boolean): Blockly.WorkspaceComment[];
    
            /**
             * Find all blocks in workspace.  Blocks are optionally sorted
             * by position; top to bottom (with slight LTR or RTL bias).
             * @param {boolean} ordered Sort the list if true.
             * @return {!Array.<!Blockly.Block>} Array of blocks.
             */
            getAllBlocks(ordered: boolean): Blockly.Block[];
    
            /**
             * Dispose of all blocks and comments in workspace.
             */
            clear(): void;
    
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
             * @return {Blockly.VariableModel} The newly created variable.
             */
            createVariable(name: string, opt_type?: string, opt_id?: string): Blockly.VariableModel;
    
            /**
             * Find all the uses of the given variable, which is identified by ID.
             * @param {string} id ID of the variable to find.
             * @return {!Array.<!Blockly.Block>} Array of block usages.
             */
            getVariableUsesById(id: string): Blockly.Block[];
    
            /**
             * Delete a variables by the passed in ID and all of its uses from this
             * workspace. May prompt the user for confirmation.
             * @param {string} id ID of variable to delete.
             */
            deleteVariableById(id: string): void;
    
            /**
             * Check whether a variable exists with the given name.  The check is
             * case-insensitive.
             * @param {string} _name The name to check for.
             * @return {number} The index of the name in the variable list, or -1 if it is
             *     not present.
             * @deprecated April 2017
             */
            variableIndexOf(_name: string): number;
    
            /**
             * Find the variable by the given name and return it. Return null if it is not
             *     found.
             * @param {string} name The name to check for.
             * @param {string=} opt_type The type of the variable.  If not provided it
             *     defaults to the empty string, which is a specific type.
             * @return {Blockly.VariableModel} The variable with the given name.
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
             * Find the variable with the specified type. If type is null, return list of
             *     variables with empty string type.
             * @param {?string} type Type of the variables to find.
             * @return {Array.<Blockly.VariableModel>} The sought after variables of the
             *     passed in type. An empty array if none are found.
             */
            getVariablesOfType(type: string): Blockly.VariableModel[];
    
            /**
             * Return all variable types.
             * @return {!Array.<string>} List of variable types.
             * @package
             */
            getVariableTypes(): string[];
    
            /**
             * Return all variables of all types.
             * @return {!Array.<!Blockly.VariableModel>} List of variable models.
             */
            getAllVariables(): Blockly.VariableModel[];
    
            /**
             * Returns the horizontal offset of the workspace.
             * Intended for LTR/RTL compatibility in XML.
             * Not relevant for a headless workspace.
             * @return {number} Width.
             */
            getWidth(): number;
    
            /**
             * Obtain a newly created block.
             * @param {?string} prototypeName Name of the language object containing
             *     type-specific functions for this block.
             * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
             *     create a new ID.
             * @return {!Blockly.Block} The created block.
             */
            newBlock(prototypeName: string, opt_id?: string): Blockly.Block;
    
            /**
             * The number of blocks that may be added to the workspace before reaching
             *     the maxBlocks.
             * @return {number} Number of blocks left.
             */
            remainingCapacity(): number;
    
            /**
             * The number of blocks of the given type that may be added to the workspace
             *    before reaching the maxInstances allowed for that type.
             * @param {string} type Type of block to return capacity for.
             * @return {number} Number of blocks of type left.
             */
            remainingCapacityOfType(type: string): number;
    
            /**
             * Check if there is remaining capacity for blocks of the given counts to be
             *    created. If the total number of blocks represented by the map is more than
             *    the total remaining capacity, it returns false. If a type count is more
             *    than the remaining capacity for that type, it returns false.
             * @param {!Object} typeCountsMap A map of types to counts (usually representing
             *    blocks to be created).
             * @return {boolean} True if there is capacity for the given map,
             *    false otherwise.
             */
            isCapacityAvailable(typeCountsMap: Object): boolean;
    
            /**
             * Checks if the workspace has any limits on the maximum number of blocks,
             *    or the maximum number of blocks of specific types.
             * @return {boolean} True if it has block limits, false otherwise.
             */
            hasBlockLimits(): boolean;
    
            /**
             * Undo or redo the previous action.
             * @param {boolean} redo False if undo, true if redo.
             */
            undo(redo: boolean): void;
    
            /**
             * Clear the undo/redo stacks.
             */
            clearUndo(): void;
    
            /**
             * When something in this workspace changes, call a function.
             * Note that there may be a few recent events already on the stack.  Thus the
             * new change listener might be called with events that occurred a few
             * milliseconds before the change listener was added.
             * @param {!Function} func Function to call.
             * @return {!Function} Obsolete return value, ignore.
             */
            addChangeListener(func: Function): Function;
    
            /**
             * Stop listening for this workspace's changes.
             * @param {Function} func Function to stop calling.
             */
            removeChangeListener(func: Function): void;
    
            /**
             * Fire a change event.
             * @param {!Blockly.Events.Abstract} event Event to fire.
             */
            fireChangeListener(event: Blockly.Events.Abstract): void;
    
            /**
             * Find the block on this workspace with the specified ID.
             * @param {string} id ID of block to find.
             * @return {Blockly.Block} The sought after block, or null if not found.
             */
            getBlockById(id: string): Blockly.Block;
    
            /**
             * Find the comment on this workspace with the specified ID.
             * @param {string} id ID of comment to find.
             * @return {Blockly.WorkspaceComment} The sought after comment, or null if not
             *     found.
             * @package
             */
            getCommentById(id: string): Blockly.WorkspaceComment;
    
            /**
             * Checks whether all value and statement inputs in the workspace are filled
             * with blocks.
             * @param {boolean=} opt_shadowBlocksAreFilled An optional argument controlling
             *     whether shadow blocks are counted as filled. Defaults to true.
             * @return {boolean} True if all inputs are filled, false otherwise.
             */
            allInputsFilled(opt_shadowBlocksAreFilled?: boolean): boolean;
    
            /**
             * Return the variable map that contains "potential" variables.
             * These exist in the flyout but not in the workspace.
             * @return {Blockly.VariableMap} The potential variable map.
             * @package
             */
            getPotentialVariableMap(): Blockly.VariableMap;
    
            /**
             * Create and store the potential variable map for this workspace.
             * @package
             */
            createPotentialVariableMap(): void;
    
            /**
             * Return the map of all variables on the workspace.
             * @return {Blockly.VariableMap} The variable map.
             */
            getVariableMap(): Blockly.VariableMap;
    
            /**
             * Get the theme manager for this workspace.
             * @return {!Blockly.ThemeManager} The theme manager for this workspace.
             * @package
             */
            getThemeManager(): Blockly.ThemeManager;
    } 
    
}

declare module Blockly.Workspace {

    /**
     * Angle away from the horizontal to sweep for blocks.  Order of execution is
     * generally top to bottom, but a small angle changes the scan to give a bit of
     * a left to right bias (reversed in RTL).  Units are in degrees.
     * See: https://tvtropes.org/pmwiki/pmwiki.php/Main/DiagonalBilling
     */
    var SCAN_ANGLE: any /*missing*/;

    /**
     * Find the workspace with the specified ID.
     * @param {string} id ID of workspace to find.
     * @return {Blockly.Workspace} The sought after workspace or null if not found.
     */
    function getById(id: string): Blockly.Workspace;

    /**
     * Find all workspaces.
     * @return {!Array.<!Blockly.Workspace>} Array of workspaces.
     */
    function getAll(): Blockly.Workspace[];
}
