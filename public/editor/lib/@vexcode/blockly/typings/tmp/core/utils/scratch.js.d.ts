
declare module Blockly.utils.scratch {

    /**
      * Measure some text using a canvas in-memory.
      * Does not exist in Blockly, but needed in scratch-blocks
      * @param {string} fontSize E.g., '10pt'
      * @param {string} fontFamily E.g., 'Arial'
      * @param {string} fontWeight E.g., '600'
      * @param {string} text The actual text to measure
      * @return {number} Width of the text in px.
      * @package
      */
    function measureText(fontSize: string, fontFamily: string, fontWeight: string, text: string): number;

    /**
      * Encode a string's HTML entities.
      * E.g., <a> -> &lt;a&gt;
      * Does not exist in Blockly, but needed in scratch-blocks
      * @param {string} rawStr Unencoded raw string to encode.
      * @return {string} String with HTML entities encoded.
      * @package
      */
    function encodeEntities(rawStr: string): string;

    /**
      * Re-assign obscured shadow blocks new IDs to prevent collisions
      * Scratch specific to help the VM handle deleting obscured shadows.
      * @param {Blockly.Block} block the root block to be processed.
      * @package
      */
    function changeObscuredShadowIds(block: Blockly.Block): void;

    /**
      * Whether a block is both a shadow block and an argument reporter.  These
      * blocks have special behaviour in scratch-blocks: they're duplicated when
      * dragged, and they are rendered slightly differently from normal shadow
      * blocks.
      * @param {!Blockly.BlockSvg} block The block that should be used to make this
      *     decision.
      * @return {boolean} True if the block should be duplicated on drag.
      * @package
      */
    function isShadowArgumentReporter(block: Blockly.BlockSvg): boolean;

    /**
      * Compare strings with natural number sorting.
      * @param {string} str1 First input.
      * @param {string} str2 Second input.
      * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
      */
    function compareStrings(str1: string, str2: string): number;

    /**
      * Determine if this block can be recycled in the flyout.  Blocks that have no
      * variablees and are not dynamic shadows can be recycled.
      * @param {Blockly.Block} block The block to check.
      * @return {boolean} True if the block can be recycled.
      * @package
      */
    function blockIsRecyclable(block: Blockly.Block): boolean;

    /**
      * Creates a callback function for a click on the "duplicate" context menu
      * option in Scratch Blocks.  The block is duplicated and attached to the mouse,
      * which acts as though it were pressed and mid-drag.  Clicking the mouse
      * releases the new dragging block.
      * @param {!Blockly.BlockSvg} oldBlock The block that will be duplicated.
      * @param {!Event} event Event that caused the context menu to open.
      * @return {Function} A callback function that duplicates the block and starts a
      *     drag.
      * @package
      */
    function duplicateAndDragCallback(oldBlock: Blockly.BlockSvg, event: Event): Function;

    /**
      * RM Changes
      * Creates a callback function for a click on the "convert" context menu
      * option in Scratch Blocks. The block is replaced with the equivalent mixed-mode block.
      * @param {!Blockly.BlockSvg} oldBlock The block that will be converted.
      * @return {Function} A callback function that converts the block.
      */
    function convertCallback(oldBlock: Blockly.BlockSvg): Function;
}
