
declare module Blockly {

    class Options extends Options__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Options__Class  { 
    
            /**
             * Parse the user-specified options, using reasonable defaults where behaviour
             * is unspecified.
             * @param {!Blockly.BlocklyOptions} options Dictionary of options.
             *     Specification: https://developers.google.com/blockly/guides/get-started/web#configuration
             * @constructor
             */
            constructor(options: Blockly.BlocklyOptions);
    
            /** @type {boolean} */
            RTL: boolean;
    
            /** @type {boolean} */
            oneBasedIndex: boolean;
    
            /** @type {boolean} */
            collapse: boolean;
    
            /** @type {boolean} */
            comments: boolean;
    
            /** @type {boolean} */
            disable: boolean;
    
            /** @type {boolean} */
            readOnly: boolean;
    
            /** @type {number} */
            maxBlocks: number;
    
            /** @type {?Object.<string, number>} */
            maxInstances: { [key: string]: number };
    
            /** @type {string} */
            pathToMedia: string;
    
            /** @type {boolean} */
            hasCategories: boolean;
    
            /** @type {!Blockly.Options.MoveOptions} */
            moveOptions: Blockly.Options.MoveOptions;
    
            /** @deprecated  January 2019 */
            hasScrollbars: any /*missing*/;
    
            /** @type {boolean} */
            hasTrashcan: boolean;
    
            /** @type {number} */
            maxTrashcanContents: number;
    
            /** @type {boolean} */
            hasSounds: boolean;
    
            /** @type {boolean} */
            hasCss: boolean;
    
            /** @type {boolean} */
            horizontalLayout: boolean;
    
            /** @type {?Blockly.utils.toolbox.ToolboxInfo} */
            languageTree: Blockly.utils.toolbox.ToolboxInfo;
    
            /** @type {!Blockly.Options.GridOptions} */
            gridOptions: Blockly.Options.GridOptions;
    
            /** @type {!Blockly.Options.ZoomOptions} */
            zoomOptions: Blockly.Options.ZoomOptions;
    
            /** @type {!Blockly.utils.toolbox.Position} */
            toolboxPosition: Blockly.utils.toolbox.Position;
    
            /** @type {!Blockly.Theme} */
            theme: Blockly.Theme;
    
            /** @type {!Object<string,Blockly.Action>} */
            keyMap: { [key: string]: Blockly.Action };
    
            /** @type {string} */
            renderer: string;
    
            /** @type {?Object} */
            rendererOverrides: Object;
    
            /** @type {boolean} */
            hasMonitor: boolean;
    
            /**
             * The SVG element for the grid pattern.
             * Created during injection.
             * @type {?SVGElement}
             */
            gridPattern: SVGElement;
    
            /**
             * The parent of the current workspace, or null if there is no parent
             * workspace.  We can assert that this is of type WorkspaceSvg as opposed to
             * Workspace as this is only used in a rendered workspace.
             * @type {Blockly.WorkspaceSvg}
             */
            parentWorkspace: Blockly.WorkspaceSvg;
    
            /**
             * Map of plugin type to name of registered plugin or plugin class.
             * @type {!Object.<string, (function(new:?, ...?)|string)>}
             */
            plugins: any /*missing*/;
    
            /**
             * If set, sets the translation of the workspace to match the scrollbars.
             * @param {!{x:number,y:number}} xyRatio Contains an x and/or y property which
             *     is a float between 0 and 1 specifying the degree of scrolling.
             * @return {void}
             */
            setMetrics(xyRatio: { x: number; y: number }): void;
    
            /**
             * Return an object with the metrics required to size the workspace.
             * @return {!Blockly.utils.Metrics} Contains size and position metrics.
             */
            getMetrics(): Blockly.utils.Metrics;
    } 
    

    interface BlocklyOptions {
    }
}

declare module Blockly.Options {

    /**
     * Grid Options.
     * @typedef {{
     *     colour: string,
     *     length: number,
     *     snap: boolean,
     *     spacing: number
     * }}
     */
    interface GridOptions {
        colour: string;
        length: number;
        snap: boolean;
        spacing: number
    }

    /**
     * Move Options.
     * @typedef {{
     *     drag: boolean,
     *     scrollbars: boolean,
     *     wheel: boolean
     * }}
     */
    interface MoveOptions {
        drag: boolean;
        scrollbars: boolean;
        wheel: boolean
    }

    /**
     * Zoom Options.
     * @typedef {{
     *     controls: boolean,
     *     maxScale: number,
     *     minScale: number,
     *     pinch: boolean,
     *     scaleSpeed: number,
     *     startScale: number,
     *     wheel: boolean
     * }}
     */
    interface ZoomOptions {
        controls: boolean;
        maxScale: number;
        minScale: number;
        pinch: boolean;
        scaleSpeed: number;
        startScale: number;
        wheel: boolean
    }

    /**
     * Parse the provided toolbox tree into a consistent DOM format.
     * @param {?Node|?string} toolboxDef DOM tree of blocks, or text representation
     *    of same.
     * @return {?Node} DOM tree of blocks, or null.
     * @deprecated Use Blockly.utils.toolbox.parseToolboxTree. (2020 September 28)
     */
    function parseToolboxTree(toolboxDef: Node|string): Node;
}
