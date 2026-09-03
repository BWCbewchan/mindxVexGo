
declare module Blockly.Xml {

    /**
     * Encode a block tree as XML.
     * @param {!Blockly.Workspace} workspace The workspace containing blocks.
     * @param {boolean=} opt_noId True if the encoder should skip the block IDs.
     * @return {!Element} XML DOM element.
     */
    function workspaceToDom(workspace: Blockly.Workspace, opt_noId?: boolean): Element;

    /**
     * Encode a list of variables as XML.
     * @param {!Array.<!Blockly.VariableModel>} variableList List of all variable
     *     models.
     * @return {!Element} Tree of XML elements.
     */
    function variablesToDom(variableList: Blockly.VariableModel[]): Element;

    /**
     * Encode a block subtree as XML with XY coordinates.
     * @param {!Blockly.Block} block The root block to encode.
     * @param {boolean=} opt_noId True if the encoder should skip the block ID.
     * @return {!Element|!DocumentFragment} Tree of XML elements or an empty document
     *     fragment if the block was an insertion marker.
     */
    function blockToDomWithXY(block: Blockly.Block, opt_noId?: boolean): Element|DocumentFragment;

    /**
     * Encode a block subtree as XML.
     * @param {!Blockly.Block} block The root block to encode.
     * @param {boolean=} opt_noId True if the encoder should skip the block ID.
     * @return {!Element|!DocumentFragment} Tree of XML elements or an empty document
     *     fragment if the block was an insertion marker.
     */
    function blockToDom(block: Blockly.Block, opt_noId?: boolean): Element|DocumentFragment;

    /**
     * Converts a DOM structure into plain text.
     * Currently the text format is fairly ugly: all one line with no whitespace,
     * unless the DOM itself has whitespace built-in.
     * @param {!Node} dom A tree of XML nodes.
     * @return {string} Text representation.
     */
    function domToText(dom: Node): string;

    /**
     * Converts a DOM structure into properly indented text.
     * @param {!Node} dom A tree of XML elements.
     * @return {string} Text representation.
     */
    function domToPrettyText(dom: Node): string;

    /**
     * Converts an XML string into a DOM structure.
     * @param {string} text An XML string.
     * @return {!Element} A DOM object representing the singular child of the
     *     document element.
     * @throws if the text doesn't parse.
     */
    function textToDom(text: string): Element;

    /**
     * Clear the given workspace then decode an XML DOM and
     * create blocks on the workspace.
     * @param {!Element} xml XML DOM.
     * @param {!Blockly.Workspace} workspace The workspace.
     * @return {Array.<string>} An array containing new block ids.
     */
    function clearWorkspaceAndLoadFromXml(xml: Element, workspace: Blockly.Workspace): string[];

    /**
     * Decode an XML DOM and create blocks on the workspace.
     * @param {!Element} xml XML DOM.
     * @param {!Blockly.Workspace} workspace The workspace.
     * @return {!Array.<string>} An array containing new block IDs.
     * @suppress {strictModuleDepCheck} Suppress module check while workspace
     *     comments are not bundled in.
     */
    function domToWorkspace(xml: Element, workspace: Blockly.Workspace): string[];

    /**
     * Decode an XML DOM and create blocks on the workspace. Position the new
     * blocks immediately below prior blocks, aligned by their starting edge.
     * @param {!Element} xml The XML DOM.
     * @param {!Blockly.Workspace} workspace The workspace to add to.
     * @return {Array.<string>} An array containing new block IDs.
     */
    function appendDomToWorkspace(xml: Element, workspace: Blockly.Workspace): string[];

    /**
     * Decode an XML block tag and create a block (and possibly sub blocks) on the
     * workspace.
     * @param {!Element} xmlBlock XML block element.
     * @param {!Blockly.Workspace} workspace The workspace.
     * @return {!Blockly.Block} The root block created.
     */
    function domToBlock(xmlBlock: Element, workspace: Blockly.Workspace): Blockly.Block;

    /**
     * Decode an XML list of variables and add the variables to the workspace.
     * @param {!Element} xmlVariables List of XML variable elements.
     * @param {!Blockly.Workspace} workspace The workspace to which the variable
     *     should be added.
     */
    function domToVariables(xmlVariables: Element, workspace: Blockly.Workspace): void;

    /**
     * Remove any 'next' block (statements in a stack).
     * @param {!Element|!DocumentFragment} xmlBlock XML block element or an empty
     *     DocumentFragment if the block was an insertion marker.
     */
    function deleteNext(xmlBlock: Element|DocumentFragment): void;
}
