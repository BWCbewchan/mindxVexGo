
declare module Blockly.utils.xml {

    /**
     * Namespace for Blockly's XML.
     */
    var NAME_SPACE: any /*missing*/;

    /**
     * Get the document object.  This method is overridden in the Node.js build of
     * Blockly. See gulpfile.js, package-blockly-node task.
     * @return {!Document} The document object.
     * @public
     */
    function document(): Document;

    /**
     * Create DOM element for XML.
     * @param {string} tagName Name of DOM element.
     * @return {!Element} New DOM element.
     * @public
     */
    function createElement(tagName: string): Element;

    /**
     * Create text element for XML.
     * @param {string} text Text content.
     * @return {!Text} New DOM text node.
     * @public
     */
    function createTextNode(text: string): Text;

    /**
     * Converts an XML string into a DOM tree.
     * @param {string} text XML string.
     * @return {Document} The DOM document.
     * @throws if XML doesn't parse.
     * @public
     */
    function textToDomDocument(text: string): Document;

    /**
     * Converts a DOM structure into plain text.
     * Currently the text format is fairly ugly: all one line with no whitespace.
     * @param {!Node} dom A tree of XML nodes.
     * @return {string} Text representation.
     * @public
     */
    function domToText(dom: Node): string;
}
