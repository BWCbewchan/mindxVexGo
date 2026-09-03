
declare module Blockly {

    /**
     * Inject a Blockly editor into the specified container element (usually a div).
     * @param {!Element|string} container Containing element, or its ID,
     *     or a CSS selector.
     * @param {Object=} opt_options Optional dictionary of options.
     * @return {!Blockly.Workspace} Newly created main workspace.
     */
    function inject(container: Element|string, opt_options?: Object): Blockly.Workspace;
}
