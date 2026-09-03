
declare module Blockly {

    class ZoomControls extends ZoomControls__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ZoomControls__Class  { 
    
            /**
             * Class for a zoom controls.
             * @param {!Blockly.WorkspaceSvg} workspace The workspace to sit in.
             * @constructor
             */
            constructor(workspace: Blockly.WorkspaceSvg);
    
            /**
             * Create the zoom controls.
             * @return {!SVGElement} The zoom controls SVG group.
             */
            createDom(): SVGElement;
    
            /**
             * Initialize the zoom controls.
             * @param {number} verticalSpacing Vertical distances from workspace edge to the
             *    same edge of the controls.
             * @return {number} Vertical distance from workspace edge to the opposite
             *    edge of the controls.
             */
            init(verticalSpacing: number): number;
    
            /**
             * Dispose of this zoom controls.
             * Unlink from all DOM elements to prevent memory leaks.
             */
            dispose(): void;
    
            /**
             * Position the zoom controls.
             * It is positioned in the opposite corner to the corner the
             * categories/toolbox starts at.
             */
            position(): void;
    } 
    
}
