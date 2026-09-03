
declare module Blockly.Extensions {

    /**
     * Registers a new extension function. Extensions are functions that help
     * initialize blocks, usually adding dynamic behavior such as onchange
     * handlers and mutators. These are applied using Block.applyExtension(), or
     * the JSON "extensions" array attribute.
     * @param {string} name The name of this extension.
     * @param {Function} initFn The function to initialize an extended block.
     * @throws {Error} if the extension name is empty, the extension is already
     *     registered, or extensionFn is not a function.
     */
    function register(name: string, initFn: Function): void;

    /**
     * Registers a new extension function that adds all key/value of mixinObj.
     * @param {string} name The name of this extension.
     * @param {!Object} mixinObj The values to mix in.
     * @throws {Error} if the extension name is empty or the extension is already
     *     registered.
     */
    function registerMixin(name: string, mixinObj: Object): void;

    /**
     * Registers a new extension function that adds a mutator to the block.
     * At register time this performs some basic sanity checks on the mutator.
     * The wrapper may also add a mutator dialog to the block, if both compose and
     * decompose are defined on the mixin.
     * @param {string} name The name of this mutator extension.
     * @param {!Object} mixinObj The values to mix in.
     * @param {(function())=} opt_helperFn An optional function to apply after
     *     mixing in the object.
     * @param {!Array.<string>=} opt_blockList A list of blocks to appear in the
     *     flyout of the mutator dialog.
     * @throws {Error} if the mutation is invalid or can't be applied to the block.
     */
    function registerMutator(name: string, mixinObj: Object, opt_helperFn?: { (): any /*missing*/ }, opt_blockList?: string[]): void;

    /**
     * Unregisters the extension registered with the given name.
     * @param {string} name The name of the extension to unregister.
     */
    function unregister(name: string): void;

    /**
     * Applies an extension method to a block. This should only be called during
     * block construction.
     * @param {string} name The name of the extension.
     * @param {!Blockly.Block} block The block to apply the named extension to.
     * @param {boolean} isMutator True if this extension defines a mutator.
     * @throws {Error} if the extension is not found.
     */
    function apply(name: string, block: Blockly.Block, isMutator: boolean): void;

    /**
     * Builds an extension function that will map a dropdown value to a tooltip
     * string.
     *
     * This method includes multiple checks to ensure tooltips, dropdown options,
     * and message references are aligned. This aims to catch errors as early as
     * possible, without requiring developers to manually test tooltips under each
     * option. After the page is loaded, each tooltip text string will be checked
     * for matching message keys in the internationalized string table. Deferring
     * this until the page is loaded decouples loading dependencies. Later, upon
     * loading the first block of any given type, the extension will validate every
     * dropdown option has a matching tooltip in the lookupTable.  Errors are
     * reported as warnings in the console, and are never fatal.
     * @param {string} dropdownName The name of the field whose value is the key
     *     to the lookup table.
     * @param {!Object.<string, string>} lookupTable The table of field values to
     *     tooltip text.
     * @return {!Function} The extension function.
     */
    function buildTooltipForDropdown(dropdownName: string, lookupTable: { [key: string]: string }): Function;

    /**
     * Builds an extension function that will install a dynamic tooltip. The
     * tooltip message should include the string '%1' and that string will be
     * replaced with the text of the named field.
     * @param {string} msgTemplate The template form to of the message text, with
     *     %1 placeholder.
     * @param {string} fieldName The field with the replacement text.
     * @return {!Function} The extension function.
     */
    function buildTooltipWithFieldText(msgTemplate: string, fieldName: string): Function;
}
