
declare module Blockly.fieldRegistry {

    /**
     * Registers a field type.
     * Blockly.fieldRegistry.fromJson uses this registry to
     * find the appropriate field type.
     * @param {string} type The field type name as used in the JSON definition.
     * @param {!Blockly.IRegistrableField} fieldClass The field class containing a
     *     fromJson function that can construct an instance of the field.
     * @throws {Error} if the type name is empty, the field is already
     *     registered, or the fieldClass is not an object containing a fromJson
     *     function.
     */
    function register(type: string, fieldClass: Blockly.IRegistrableField): void;

    /**
     * Unregisters the field registered with the given type.
     * @param {string} type The field type name as used in the JSON definition.
     */
    function unregister(type: string): void;

    /**
     * Construct a Field from a JSON arg object.
     * Finds the appropriate registered field by the type name as registered using
     * Blockly.fieldRegistry.register.
     * @param {!Object} options A JSON object with a type and options specific
     *     to the field type.
     * @return {Blockly.Field} The new field instance or null if a field wasn't
     *     found with the given type name
     * @package
     */
    function fromJson(options: Object): Blockly.Field;
}
