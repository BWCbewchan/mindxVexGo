
declare module Blockly {

    class Options extends Options__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Options__Class  { 
    
            /**
             * Parse the user-specified options, using reasonable defaults where behaviour
             * is unspecified.
             * @param {!Object} options Dictionary of options.  Specification:
             *   https://developers.google.com/blockly/guides/get-started/web#configuration
             * @constructor
             */
            constructor(options: Object);
    
            /** @deprecated  January 2019 */
            hasScrollbars: any /*missing*/;
    
            /**
             * The parent of the current workspace, or null if there is no parent workspace.
             * @type {Blockly.Workspace}
             */
            parentWorkspace: Blockly.Workspace;
    
            /**
             * If set, sets the translation of the workspace to match the scrollbars.
             */
            setMetrics: any /*missing*/;
    
            /**
             * Return an object with the metrics required to size the workspace.
             * @return {Object} Contains size and position metrics, or null.
             */
            getMetrics(): Object;
    } 
    
}

declare module Blockly.Options {

    /**
     * Parse the provided toolbox tree into a consistent DOM format.
     * @param {Node|string} tree DOM tree of blocks, or text representation of same.
     * @return {Node} DOM tree of blocks, or null.
     */
    function parseToolboxTree(tree: Node|string): Node;
}
