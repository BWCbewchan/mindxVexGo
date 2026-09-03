
declare module Blockly {

    class ToolboxSeparator extends ToolboxSeparator__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ToolboxSeparator__Class extends Blockly.ToolboxItem__Class implements Blockly.IToolboxItem  { 
    
            /**
             * Class for a toolbox separator. This is the thin visual line that appears on
             * the toolbox. This item is not interactable.
             * @param {!Blockly.utils.toolbox.SeparatorInfo} separatorDef The information
             *     needed to create a separator.
             * @param {!Blockly.IToolbox} toolbox The parent toolbox for the separator.
             * @constructor
             * @extends {Blockly.ToolboxItem}
             * @implements {Blockly.IToolboxItem}
             */
            constructor(separatorDef: Blockly.utils.toolbox.SeparatorInfo, toolbox: Blockly.IToolbox);
    
            /**
             * All the css class names that are used to create a separator.
             * @type {!Blockly.ToolboxSeparator.CssConfig}
             * @protected
             */
            cssConfig_: Blockly.ToolboxSeparator.CssConfig;
    
            /**
             * Creates the dom for a separator.
             * @return {!Element} The parent element for the separator.
             * @protected
             */
            createDom_(): Element;
    } 
    
}

declare module Blockly.ToolboxSeparator {

    /**
     * All the css class names that are used to create a separator.
     * @typedef {{
     *            container:?string
     *          }}
     */
    interface CssConfig {
        container: string
    }

    /**
     * Name used for registering a toolbox separator.
     * @const {string}
     */
    var registrationName: any /*missing*/;
}
