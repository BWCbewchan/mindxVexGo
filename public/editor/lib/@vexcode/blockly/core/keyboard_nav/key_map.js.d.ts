
declare module Blockly.user.keyMap {

    /**
     * Object holding valid modifiers.
     * @enum {string}
     */
    enum modifierKeys { SHIFT, CONTROL, ALT, META } 

    /**
     * Update the key map to contain the new action.
     * @param {string} keyCode The key code serialized by the serializeKeyEvent.
     * @param {!Blockly.Action} action The action to be executed when the keys
     *     corresponding to the serialized key code is pressed.
     */
    function setActionForKey(keyCode: string, action: Blockly.Action): void;

    /**
     * Creates a new key map.
     * @param {!Object<string, Blockly.Action>} keyMap The object holding the key
     *     to action mapping.
     */
    function setKeyMap(keyMap: { [key: string]: Blockly.Action }): void;

    /**
     * Gets the current key map.
     * @return {Object<string,Blockly.Action>} The object holding the key to
     *     action mapping.
     */
    function getKeyMap(): { [key: string]: Blockly.Action };

    /**
     * Get the action by the serialized key code.
     * @param {string} keyCode The serialized key code.
     * @return {Blockly.Action|undefined} The action holding the function to
     *     call when the given keyCode is used or undefined if no action exists.
     */
    function getActionByKeyCode(keyCode: string): Blockly.Action|any /*undefined*/;

    /**
     * Get the serialized key that corresponds to the action.
     * @param {!Blockly.Action} action The action for which we want to get
     *     the key.
     * @return {?string} The serialized key or null if the action does not have
     *     a key mapping.
     */
    function getKeyByAction(action: Blockly.Action): string;

    /**
     * Serialize the key event.
     * @param {!KeyboardEvent} e A key up event holding the key code.
     * @return {string} A string containing the serialized key event.
     * @package
     */
    function serializeKeyEvent(e: KeyboardEvent): string;

    /**
     * Create the serialized key code that will be used in the key map.
     * @param {number} keyCode Number code representing the key.
     * @param {!Array.<string>} modifiers List of modifiers to be used with the key.
     *     All valid modifiers can be found in the Blockly.user.keyMap.modifierKeys.
     * @return {string} The serialized key code for the given modifiers and key.
     */
    function createSerializedKey(keyCode: number, modifiers: string[]): string;

    /**
     * Creates the default key map.
     * @return {!Object<string,Blockly.Action>} An object holding the default key
     *     to action mapping.
     */
    function createDefaultKeyMap(): { [key: string]: Blockly.Action };
}
