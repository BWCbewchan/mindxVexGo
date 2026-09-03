
declare module Blockly {

    /**
     * A registrable field.
     * Note: We are not using an interface here as we are interested in defining the
     * static methods of a field rather than the instance methods.
     * @typedef {{
     *     fromJson:Blockly.IRegistrableField.fromJson
     * }}
     */
    interface IRegistrableField {
        fromJson: Blockly.IRegistrableField.fromJson
    }
}

declare module Blockly.IRegistrableField {

    /**
     * @typedef {function(!Object): Blockly.Field}
     */
    interface fromJson {
        (_0: Object): Blockly.Field
    }
}
