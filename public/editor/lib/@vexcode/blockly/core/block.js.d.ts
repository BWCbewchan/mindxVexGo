
declare module Blockly {

    class Block extends Block__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Block__Class implements Blockly.IASTNodeLocation  { 
    
            /**
             * Class for one block.
             * Not normally called directly, workspace.newBlock() is preferred.
             * @param {!Blockly.Workspace} workspace The block's workspace.
             * @param {!string} prototypeName Name of the language object containing
             *     type-specific functions for this block.
             * @param {string=} opt_id Optional ID.  Use this ID if provided, otherwise
             *     create a new ID.
             * @constructor
             * @implements {Blockly.IASTNodeLocation}
             * @throws When the prototypeName is not valid or not allowed.
             */
            constructor(workspace: Blockly.Workspace, prototypeName: string, opt_id?: string);
    
            /** @type {string} */
            id: string;
    
            /** @type {Blockly.Connection} */
            outputConnection: Blockly.Connection;
    
            /** @type {Blockly.Connection} */
            nextConnection: Blockly.Connection;
    
            /** @type {Blockly.Connection} */
            previousConnection: Blockly.Connection;
    
            /** @type {!Array.<!Blockly.Input>} */
            inputList: Blockly.Input[];
    
            /** @type {boolean|undefined} */
            inputsInline: boolean|any /*undefined*/;
    
            /** @type {!Blockly.Tooltip.TipInfo} */
            tooltip: Blockly.Tooltip.TipInfo;
    
            /** @type {boolean} */
            contextMenu: boolean;
    
            /**
             * @type {Blockly.Block}
             * @protected
             */
            parentBlock_: Blockly.Block;
    
            /**
             * @type {!Array.<!Blockly.Block>}
             * @protected
             */
            childBlocks_: Blockly.Block[];
    
            /**
             * @type {boolean}
             * @protected
             */
            collapsed_: boolean;
    
            /**
             * @type {?number}
             * @protected
             */
            outputShape_: number;
    
            /**
             * A string representing the comment attached to this block.
             * @type {string|Blockly.Comment}
             * @deprecated August 2019. Use getCommentText instead.
             */
            comment: string|Blockly.Comment;
    
            /**
             * A model of the comment attached to this block.
             * @type {!Blockly.Block.CommentModel}
             * @package
             */
            commentModel: Blockly.Block.CommentModel;
    
            /** @type {!Blockly.Workspace} */
            workspace: Blockly.Workspace;
    
            /** @type {boolean} */
            isInFlyout: boolean;
    
            /** @type {boolean} */
            isInMutator: boolean;
    
            /** @type {boolean} */
            RTL: boolean;
    
            /**
             * True if this block is an insertion marker.
             * @type {boolean}
             * @protected
             */
            isInsertionMarker_: boolean;
    
            /**
             * Name of the type of hat.
             * @type {string|undefined}
             */
            hat: string|any /*undefined*/;
    
            /** @type {?boolean} */
            rendered: boolean;
    
            /**
             * A count of statement inputs on the block.
             * @type {number}
             * @package
             */
            statementInputCount: number;
    
            /** @type {string} */
            type: string;
    
            /** @type {boolean|undefined} */
            inputsInlineDefault: boolean|any /*undefined*/;
    
            /**
             * Optional text data that round-trips between blocks and XML.
             * Has no effect. May be used by 3rd parties for meta information.
             * @type {?string}
             */
            data: string;
    
            /**
             * Has this block been disposed of?
             * @type {boolean}
             * @package
             */
            disposed: boolean;
    
            /**
             * Colour of the block in '#RRGGBB' format.
             * @type {string}
             * @protected
             */
            colour_: string;
    
            /**
             * Name of the block style.
             * @type {?string}
             * @protected
             */
            styleName_: string;
    
            /**
             * An optional method called during initialization.
             * @type {?function()}
             */
            init: { (): any /*missing*/ };
    
            /**
             * An optional callback method to use whenever the block's parent workspace
             * changes. This is usually only called from the constructor, the block type
             * initializer function, or an extension initializer function.
             * @type {?function(Blockly.Events.Abstract)}
             */
            onchange: { (_0: Blockly.Events.Abstract): any /*missing*/ };
    
            /**
             * An optional serialization method for defining how to serialize the
             * mutation state. This must be coupled with defining `domToMutation`.
             * @type {?function(...):!Element}
             */
            mutationToDom: any /*missing*/;
    
            /**
             * An optional deserialization method for defining how to deserialize the
             * mutation state. This must be coupled with defining `mutationToDom`.
             * @type {?function(!Element)}
             */
            domToMutation: { (_0: Element): any /*missing*/ };
    
            /**
             * An optional property for suppressing adding STATEMENT_PREFIX and
             * STATEMENT_SUFFIX to generated code.
             * @type {?boolean}
             */
            suppressPrefixSuffix: boolean;
    
            /**
             * An optional property for declaring developer variables.  Return a list of
             * variable names for use by generators.  Developer variables are never shown to
             * the user, but are declared as global variables in the generated code.
             * @type {?function():!Array.<string|Object>}
             */
            getDeveloperVariables: { (): string|Object[] };
    
            /**
             * Dispose of this block.
             * @param {boolean} healStack If true, then try to heal any gap by connecting
             *     the next statement with the previous statement.  Otherwise, dispose of
             *     all children of this block.
             * @suppress {checkTypes}
             */
            dispose(healStack: boolean): void;
    
            /**
             * Call initModel on all fields on the block.
             * May be called more than once.
             * Either initModel or initSvg must be called after creating a block and before
             * the first interaction with it.  Interactions include UI actions
             * (e.g. clicking and dragging) and firing events (e.g. create, delete, and
             * change).
             * @public
             */
            initModel(): void;
    
            /**
             * Unplug this block from its superior block.  If this block is a statement,
             * optionally reconnect the block underneath with the block on top.
             * @param {boolean=} opt_healStack Disconnect child statement and reconnect
             *   stack.  Defaults to false.
             */
            unplug(opt_healStack?: boolean): void;
    
            /**
             * Returns all connections originating from this block.
             * @param {boolean} _all If true, return all connections even hidden ones.
             * @return {!Array.<!Blockly.Connection>} Array of connections.
             * @package
             */
            getConnections_(_all: boolean): Blockly.Connection[];
    
            /**
             * Walks down a stack of blocks and finds the last next connection on the stack.
             * @return {Blockly.Connection} The last next connection on the stack, or null.
             * @package
             */
            lastConnectionInStack(): Blockly.Connection;
    
            /**
             * Bump unconnected blocks out of alignment.  Two blocks which aren't actually
             * connected should not coincidentally line up on screen.
             */
            bumpNeighbours(): void;
    
            /**
             * Return the parent block or null if this block is at the top level. The parent
             * block is either the block connected to the previous connection (for a statement
             * block) or the block connected to the output connection (for a value block).
             * @return {Blockly.Block} The block that holds the current block.
             */
            getParent(): Blockly.Block;
    
            /**
             * Return the input that connects to the specified block.
             * @param {!Blockly.Block} block A block connected to an input on this block.
             * @return {Blockly.Input} The input that connects to the specified block.
             */
            getInputWithBlock(block: Blockly.Block): Blockly.Input;
    
            /**
             * Return the parent block that surrounds the current block, or null if this
             * block has no surrounding block.  A parent block might just be the previous
             * statement, whereas the surrounding block is an if statement, while loop, etc.
             * @return {Blockly.Block} The block that surrounds the current block.
             */
            getSurroundParent(): Blockly.Block;
    
            /**
             * Return the next statement block directly connected to this block.
             * @return {Blockly.Block} The next statement block or null.
             */
            getNextBlock(): Blockly.Block;
    
            /**
             * Returns the block connected to the previous connection.
             * @return {Blockly.Block} The previous statement block or null.
             */
            getPreviousBlock(): Blockly.Block;
    
            /**
             * Return the connection on the first statement input on this block, or null if
             * there are none.
             * @return {Blockly.Connection} The first statement connection or null.
             * @package
             */
            getFirstStatementConnection(): Blockly.Connection;
    
            /**
             * Return the top-most block in this block's tree.
             * This will return itself if this block is at the top level.
             * @return {!Blockly.Block} The root block.
             */
            getRootBlock(): Blockly.Block;
    
            /**
             * Walk up from the given block up through the stack of blocks to find
             * the top block of the sub stack. If we are nested in a statement input only
             * find the top-most nested block. Do not go all the way to the root block.
             * @return {!Blockly.Block} The top block in a stack.
             * @package
             */
            getTopStackBlock(): Blockly.Block;
    
            /**
             * Find all the blocks that are directly nested inside this one.
             * Includes value and statement inputs, as well as any following statement.
             * Excludes any connection on an output tab or any preceding statement.
             * Blocks are optionally sorted by position; top to bottom.
             * @param {boolean} ordered Sort the list if true.
             * @return {!Array.<!Blockly.Block>} Array of blocks.
             */
            getChildren(ordered: boolean): Blockly.Block[];
    
            /**
             * Set parent of this block to be a new block or null.
             * @param {Blockly.Block} newParent New parent block.
             */
            setParent(newParent: Blockly.Block): void;
    
            /**
             * Find all the blocks that are directly or indirectly nested inside this one.
             * Includes this block in the list.
             * Includes value and statement inputs, as well as any following statements.
             * Excludes any connection on an output tab or any preceding statements.
             * Blocks are optionally sorted by position; top to bottom.
             * @param {boolean} ordered Sort the list if true.
             * @return {!Array.<!Blockly.Block>} Flattened array of blocks.
             */
            getDescendants(ordered: boolean): Blockly.Block[];
    
            /**
             * Get whether this block is deletable or not.
             * @return {boolean} True if deletable.
             */
            isDeletable(): boolean;
    
            /**
             * Set whether this block is deletable or not.
             * @param {boolean} deletable True if deletable.
             */
            setDeletable(deletable: boolean): void;
    
            /**
             * Get whether this block is movable or not.
             * @return {boolean} True if movable.
             */
            isMovable(): boolean;
    
            /**
             * Set whether this block is movable or not.
             * @param {boolean} movable True if movable.
             */
            setMovable(movable: boolean): void;
    
            /**
             * Get whether is block is duplicatable or not. If duplicating this block and
             * descendants will put this block over the workspace's capacity this block is
             * not duplicatable. If duplicating this block and descendants will put any
             * type over their maxInstances this block is not duplicatable.
             * @return {boolean} True if duplicatable.
             */
            isDuplicatable(): boolean;
    
            /**
             * Get whether this block is a shadow block or not.
             * @return {boolean} True if a shadow.
             */
            isShadow(): boolean;
    
            /**
             * Set whether this block is a shadow block or not.
             * @param {boolean} shadow True if a shadow.
             */
            setShadow(shadow: boolean): void;
    
            /**
             * Get whether this block is an insertion marker block or not.
             * @return {boolean} True if an insertion marker.
             * @package
             */
            isInsertionMarker(): boolean;
    
            /**
             * Set whether this block is an insertion marker block or not.
             * Once set this cannot be unset.
             * @param {boolean} insertionMarker True if an insertion marker.
             * @package
             */
            setInsertionMarker(insertionMarker: boolean): void;
    
            /**
             * Get whether this block is editable or not.
             * @return {boolean} True if editable.
             */
            isEditable(): boolean;
    
            /**
             * Set whether this block is editable or not.
             * @param {boolean} editable True if editable.
             */
            setEditable(editable: boolean): void;
    
            /**
             * Returns if this block has been disposed of / deleted.
             * @return {boolean} True if this block has been disposed of / deleted.
             */
            isDisposed(): boolean;
    
            /**
             * Find the connection on this block that corresponds to the given connection
             * on the other block.
             * Used to match connections between a block and its insertion marker.
             * @param {!Blockly.Block} otherBlock The other block to match against.
             * @param {!Blockly.Connection} conn The other connection to match.
             * @return {Blockly.Connection} The matching connection on this block, or null.
             * @package
             */
            getMatchingConnection(otherBlock: Blockly.Block, conn: Blockly.Connection): Blockly.Connection;
    
            /**
             * Set the URL of this block's help page.
             * @param {string|Function} url URL string for block help, or function that
             *     returns a URL.  Null for no help.
             */
            setHelpUrl(url: string|Function): void;
    
            /**
             * Sets the tooltip for this block.
             * @param {!Blockly.Tooltip.TipInfo} newTip The text for the tooltip, a function
             *     that returns the text for the tooltip, or a parent object whose tooltip
             *     will be used. To not display a tooltip pass the empty string.
             */
            setTooltip(newTip: Blockly.Tooltip.TipInfo): void;
    
            /**
             * Returns the tooltip text for this block.
             * @returns {!string} The tooltip text for this block.
             */
            getTooltip(): string;
    
            /**
             * Get the colour of a block.
             * @return {string} #RRGGBB string.
             */
            getColour(): string;
    
            /**
             * Get the name of the block style.
             * @return {?string} Name of the block style.
             */
            getStyleName(): string;
    
            /**
             * Get the HSV hue value of a block.  Null if hue not set.
             * @return {?number} Hue value (0-360).
             */
            getHue(): number;
    
            /**
             * Change the colour of a block.
             * @param {number|string} colour HSV hue value (0 to 360), #RRGGBB string,
             *     or a message reference string pointing to one of those two values.
             */
            setColour(colour: number|string): void;
    
            /**
             * Set the style and colour values of a block.
             * @param {string} blockStyleName Name of the block style
             */
            setStyle(blockStyleName: string): void;
    
            /**
             * Sets a callback function to use whenever the block's parent workspace
             * changes, replacing any prior onchange handler. This is usually only called
             * from the constructor, the block type initializer function, or an extension
             * initializer function.
             * @param {function(Blockly.Events.Abstract)} onchangeFn The callback to call
             *     when the block's workspace changes.
             * @throws {Error} if onchangeFn is not falsey and not a function.
             */
            setOnChange(onchangeFn: { (_0: Blockly.Events.Abstract): any /*missing*/ }): void;
    
            /**
             * Returns the named field from a block.
             * @param {string} name The name of the field.
             * @return {Blockly.Field} Named field, or null if field does not exist.
             */
            getField(name: string): Blockly.Field;
    
            /**
             * Return all variables referenced by this block.
             * @return {!Array.<string>} List of variable names.
             */
            getVars(): string[];
    
            /**
             * Return all variables referenced by this block.
             * @return {!Array.<!Blockly.VariableModel>} List of variable models.
             * @package
             */
            getVarModels(): Blockly.VariableModel[];
    
            /**
             * Notification that a variable is renaming but keeping the same ID.  If the
             * variable is in use on this block, rerender to show the new name.
             * @param {!Blockly.VariableModel} variable The variable being renamed.
             * @package
             */
            updateVarName(variable: Blockly.VariableModel): void;
    
            /**
             * Notification that a variable is renaming.
             * If the ID matches one of this block's variables, rename it.
             * @param {string} oldId ID of variable to rename.
             * @param {string} newId ID of new variable.  May be the same as oldId, but with
             *     an updated name.
             */
            renameVarById(oldId: string, newId: string): void;
    
            /**
             * Returns the language-neutral value of the given field.
             * @param {string} name The name of the field.
             * @return {*} Value of the field or null if field does not exist.
             */
            getFieldValue(name: string): any;
    
            /**
             * Sets the value of the given field for this block.
             * @param {*} newValue The value to set.
             * @param {!string} name The name of the field to set the value of.
             */
            setFieldValue(newValue: any, name: string): void;
    
            /**
             * Set whether this block can chain onto the bottom of another block.
             * @param {boolean} newBoolean True if there can be a previous statement.
             * @param {(string|Array.<string>|null)=} opt_check Statement type or
             *     list of statement types.  Null/undefined if any type could be connected.
             */
            setPreviousStatement(newBoolean: boolean, opt_check?: string|string[]|any /*null*/): void;
    
            /**
             * Set whether another block can chain onto the bottom of this block.
             * @param {boolean} newBoolean True if there can be a next statement.
             * @param {(string|Array.<string>|null)=} opt_check Statement type or
             *     list of statement types.  Null/undefined if any type could be connected.
             */
            setNextStatement(newBoolean: boolean, opt_check?: string|string[]|any /*null*/): void;
    
            /**
             * Set whether this block returns a value.
             * @param {boolean} newBoolean True if there is an output.
             * @param {(string|Array.<string>|null)=} opt_check Returned type or list
             *     of returned types.  Null or undefined if any type could be returned
             *     (e.g. variable get).
             */
            setOutput(newBoolean: boolean, opt_check?: string|string[]|any /*null*/): void;
    
            /**
             * Set whether value inputs are arranged horizontally or vertically.
             * @param {boolean} newBoolean True if inputs are horizontal.
             */
            setInputsInline(newBoolean: boolean): void;
    
            /**
             * Get whether value inputs are arranged horizontally or vertically.
             * @return {boolean} True if inputs are horizontal.
             */
            getInputsInline(): boolean;
    
            /**
             * Set the block's output shape.
             * @param {?number} outputShape Value representing an output shape.
             */
            setOutputShape(outputShape: number): void;
    
            /**
             * Get the block's output shape.
             * @return {?number} Value representing output shape if one exists.
             */
            getOutputShape(): number;
    
            /**
             * Set whether the block is disabled or not.
             * @param {boolean} disabled True if disabled.
             * @deprecated May 2019
             */
            setDisabled(disabled: boolean): void;
    
            /**
             * Get whether this block is enabled or not.
             * @return {boolean} True if enabled.
             */
            isEnabled(): boolean;
    
            /**
             * Set whether the block is enabled or not.
             * @param {boolean} enabled True if enabled.
             */
            setEnabled(enabled: boolean): void;
    
            /**
             * Get whether the block is disabled or not due to parents.
             * The block's own disabled property is not considered.
             * @return {boolean} True if disabled.
             */
            getInheritedDisabled(): boolean;
    
            /**
             * Get whether the block is collapsed or not.
             * @return {boolean} True if collapsed.
             */
            isCollapsed(): boolean;
    
            /**
             * Set whether the block is collapsed or not.
             * @param {boolean} collapsed True if collapsed.
             */
            setCollapsed(collapsed: boolean): void;
    
            /**
             * Create a human-readable text representation of this block and any children.
             * @param {number=} opt_maxLength Truncate the string to this length.
             * @param {string=} opt_emptyToken The placeholder string used to denote an
             *     empty field. If not specified, '?' is used.
             * @return {string} Text of block.
             */
            toString(opt_maxLength?: number, opt_emptyToken?: string): string;
    
            /**
             * Shortcut for appending a value input row.
             * @param {string} name Language-neutral identifier which may used to find this
             *     input again.  Should be unique to this block.
             * @return {!Blockly.Input} The input object created.
             */
            appendValueInput(name: string): Blockly.Input;
    
            /**
             * Shortcut for appending a statement input row.
             * @param {string} name Language-neutral identifier which may used to find this
             *     input again.  Should be unique to this block.
             * @return {!Blockly.Input} The input object created.
             */
            appendStatementInput(name: string): Blockly.Input;
    
            /**
             * Shortcut for appending a dummy input row.
             * @param {string=} opt_name Language-neutral identifier which may used to find
             *     this input again.  Should be unique to this block.
             * @return {!Blockly.Input} The input object created.
             */
            appendDummyInput(opt_name?: string): Blockly.Input;
    
            /**
             * Initialize this block using a cross-platform, internationalization-friendly
             * JSON description.
             * @param {!Object} json Structured data describing the block.
             */
            jsonInit(json: Object): void;
    
            /**
             * Add key/values from mixinObj to this block object. By default, this method
             * will check that the keys in mixinObj will not overwrite existing values in
             * the block, including prototype values. This provides some insurance against
             * mixin / extension incompatibilities with future block features. This check
             * can be disabled by passing true as the second argument.
             * @param {!Object} mixinObj The key/values pairs to add to this block object.
             * @param {boolean=} opt_disableCheck Option flag to disable overwrite checks.
             */
            mixin(mixinObj: Object, opt_disableCheck?: boolean): void;
    
            /**
             * Add a value input, statement input or local variable to this block.
             * @param {number} type Either Blockly.INPUT_VALUE or Blockly.NEXT_STATEMENT or
             *     Blockly.DUMMY_INPUT.
             * @param {string} name Language-neutral identifier which may used to find this
             *     input again.  Should be unique to this block.
             * @return {!Blockly.Input} The input object created.
             * @protected
             */
            appendInput_(type: number, name: string): Blockly.Input;
    
            /**
             * Move a named input to a different location on this block.
             * @param {string} name The name of the input to move.
             * @param {?string} refName Name of input that should be after the moved input,
             *   or null to be the input at the end.
             */
            moveInputBefore(name: string, refName: string): void;
    
            /**
             * Move a numbered input to a different location on this block.
             * @param {number} inputIndex Index of the input to move.
             * @param {number} refIndex Index of input that should be after the moved input.
             */
            moveNumberedInputBefore(inputIndex: number, refIndex: number): void;
    
            /**
             * Remove an input from this block.
             * @param {string} name The name of the input.
             * @param {boolean=} opt_quiet True to prevent an error if input is not present.
             * @return {boolean} True if operation succeeds, false if input is not present and opt_quiet is true
             * @throws {Error} if the input is not present and opt_quiet is not true.
             */
            removeInput(name: string, opt_quiet?: boolean): boolean;
    
            /**
             * Fetches the named input object.
             * @param {string} name The name of the input.
             * @return {Blockly.Input} The input object, or null if input does not exist.
             */
            getInput(name: string): Blockly.Input;
    
            /**
             * Fetches the block attached to the named input.
             * @param {string} name The name of the input.
             * @return {Blockly.Block} The attached value block, or null if the input is
             *     either disconnected or if the input does not exist.
             */
            getInputTargetBlock(name: string): Blockly.Block;
    
            /**
             * Returns the comment on this block (or null if there is no comment).
             * @return {?string} Block's comment.
             */
            getCommentText(): string;
    
            /**
             * Set this block's comment text.
             * @param {?string} text The text, or null to delete.
             */
            setCommentText(text: string): void;
    
            /**
             * Set this block's warning text.
             * @param {?string} _text The text, or null to delete.
             * @param {string=} _opt_id An optional ID for the warning text to be able to
             *     maintain multiple warnings.
             */
            setWarningText(_text: string, _opt_id?: string): void;
    
            /**
             * Give this block a mutator dialog.
             * @param {Blockly.Mutator} _mutator A mutator dialog instance or null to
             *     remove.
             */
            setMutator(_mutator: Blockly.Mutator): void;
    
            /**
             * Return the coordinates of the top-left corner of this block relative to the
             * drawing surface's origin (0,0), in workspace units.
             * @return {!Blockly.utils.Coordinate} Object with .x and .y properties.
             */
            getRelativeToSurfaceXY(): Blockly.utils.Coordinate;
    
            /**
             * Move a block by a relative offset.
             * @param {number} dx Horizontal offset, in workspace units.
             * @param {number} dy Vertical offset, in workspace units.
             */
            moveBy(dx: number, dy: number): void;
    
            /**
             * Create a connection of the specified type.
             * @param {number} type The type of the connection to create.
             * @return {!Blockly.Connection} A new connection of the specified type.
             * @protected
             */
            makeConnection_(type: number): Blockly.Connection;
    
            /**
             * Recursively checks whether all statement and value inputs are filled with
             * blocks. Also checks all following statement blocks in this stack.
             * @param {boolean=} opt_shadowBlocksAreFilled An optional argument controlling
             *     whether shadow blocks are counted as filled. Defaults to true.
             * @return {boolean} True if all inputs are filled, false otherwise.
             */
            allInputsFilled(opt_shadowBlocksAreFilled?: boolean): boolean;
    
            /**
             * This method returns a string describing this Block in developer terms (type
             * name and ID; English only).
             *
             * Intended to on be used in console logs and errors. If you need a string that
             * uses the user's native language (including block text, field values, and
             * child blocks), use [toString()]{@link Blockly.Block#toString}.
             * @return {string} The description.
             */
            toDevString(): string;
    
            /**
             * Get whether this block is a hat block.
             * @return {boolean} True if a hat block.
             * @this {Blockly.Block}
             */
            isHatBlock(): boolean;
    } 
    
}

declare module Blockly.Block {

    /**
     * @typedef {{
     *            text:?string,
     *            pinned:boolean,
     *            size:Blockly.utils.Size
     *          }}
     */
    interface CommentModel {
        text: string;
        pinned: boolean;
        size: Blockly.utils.Size
    }

    /**
     * The language-neutral id given to the collapsed input.
     * @const {string}
     */
    var COLLAPSED_INPUT_NAME: any /*missing*/;

    /**
     * The language-neutral id given to the collapsed field.
     * @const {string}
     */
    var COLLAPSED_FIELD_NAME: any /*missing*/;
}
