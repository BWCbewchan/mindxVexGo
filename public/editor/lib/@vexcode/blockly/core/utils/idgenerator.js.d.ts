
declare module Blockly.utils.IdGenerator {

    /**
     * Gets the next unique ID.
     * IDs are compatible with the HTML4 id attribute restrictions:
     * Use only ASCII letters, digits, '_', '-' and '.'
     * @return {string} The next unique identifier.
     */
    function getNextUniqueId(): string;
}
