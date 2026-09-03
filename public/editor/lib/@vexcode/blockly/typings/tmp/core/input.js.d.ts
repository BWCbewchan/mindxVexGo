
declare module Blockly {

    class Input extends Input__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Input__Class  { 
    
            /**
             * Class for an input with an optional field.
             * @param {number} type The type of the input.
             * @param {string} name Language-neutral identifier which may used to find this
             *     input again.
             * @param {!Blockly.Block} block The block containing this input.
             * @param {Blockly.Connection} connection Optional connection for this input.
             * @constructor
             */
            constructor(type: number, name: string, block: Blockly.Block, connection: Blockly.Connection);
    
            /** @type {number} */
            type: number;
    
            /** @type {string} */
            name: string;
    
            /** @type {Blockly.Connection} */
            connection: Blockly.Connection;
    
            /** @type {!Array.<!Blockly.Field>} */
            fieldRow: Blockly.Field[];
    
            /**
             * Alignment of input's fields (left, right or centre).
             * @type {number}
             */
            align: number;
    
            /**
             * Get the source block for this input.
             * @return {Blockly.Block} The source block, or null if there is none.
             */
            getSourceBlock(): Blockly.Block;
    
            /**
             * Add a field (or label from string), and all prefix and suffix fields, to the
             * end of the input's field row.
             * @param {string|!Blockly.Field} field Something to add as a field.
             * @param {string=} opt_name Language-neutral identifier which may used to find
             *     this field again.  Should be unique to the host block.
             * @return {!Blockly.Input} The input being append to (to allow chaining).
             */
            appendField(field: string|Blockly.Field, opt_name?: string): Blockly.Input;
    
            /**
             * Inserts a field (or label from string), and all prefix and suffix fields, at
             * the location of the input's field row.
             * @param {number} index The index at which to insert field.
             * @param {string|!Blockly.Field} field Something to add as a field.
             * @param {string=} opt_name Language-neutral identifier which may used to find
             *     this field again.  Should be unique to the host block.
             * @return {number} The index following the last inserted field.
             */
            insertFieldAt(index: number, field: string|Blockly.Field, opt_name?: string): number;
    
            /**
             * Remove a field from this input.
             * @param {string} name The name of the field.
             * @param {boolean=} opt_quiet True to prevent an error if field is not present.
             * @return {boolean} True if operation succeeds, false if field is not present
             *     and opt_quiet is true.
             * @throws {Error} if the field is not present and opt_quiet is false.
             */
            removeField(name: string, opt_quiet?: boolean): boolean;
    
            /**
             * Gets whether this input is visible or not.
             * @return {boolean} True if visible.
             */
            isVisible(): boolean;
    
            /**
             * Sets whether this input is visible or not.
             * Should only be used to collapse/uncollapse a block.
             * @param {boolean} visible True if visible.
             * @return {!Array.<!Blockly.BlockSvg>} List of blocks to render.
             * @package
             */
            setVisible(visible: boolean): Blockly.BlockSvg[];
    
            /**
             * Mark all fields on this input as dirty.
             * @package
             */
            markDirty(): void;
    
            /**
             * Change a connection's compatibility.
             * @param {string|Array.<string>|null} check Compatible value type or
             *     list of value types.  Null if all types are compatible.
             * @return {!Blockly.Input} The input being modified (to allow chaining).
             */
            setCheck(check: string|string[]|any /*null*/): Blockly.Input;
    
            /**
             * Change the alignment of the connection's field(s).
             * @param {number} align One of Blockly.ALIGN_LEFT, ALIGN_CENTRE, ALIGN_RIGHT.
             *   In RTL mode directions are reversed, and ALIGN_RIGHT aligns to the left.
             * @return {!Blockly.Input} The input being modified (to allow chaining).
             */
            setAlign(align: number): Blockly.Input;
    
            /**
             * Changes the connection's shadow block.
             * @param {Element} shadow DOM representation of a block or null.
             * @return {Blockly.Input} The input being modified (to allow chaining).
             */
            setShadowDom(shadow: Element): Blockly.Input;
    
            /**
             * Returns the xml representation of the connection's shadow block.
             * @return {Element} Shadow DOM representation of a block or null.
             */
            getShadowDom(): Element;
    
            /**
             * Initialize the fields on this input.
             */
            init(): void;
    
            /**
             * Sever all links to this input.
             * @suppress {checkTypes}
             */
            dispose(): void;
    } 
    
}
