
declare module Blockly.utils {

    class Svg<T> extends Svg__Class<T> { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Svg__Class<T>  { 
    
            /**
             * A name with the type of the SVG element stored in the generic.
             * @param {string} tagName The SVG element tag name.
             * @constructor
             * @template T
             * @private
             */
            constructor(tagName: string);
    } 
    
}

declare module Blockly.utils.Svg {

    /** @type {!Blockly.utils.Svg<!SVGAnimateElement>}
     * @package
     */
    var ANIMATE: Blockly.utils.Svg<SVGAnimateElement>;

    /** @type {!Blockly.utils.Svg<!SVGCircleElement>}
    * @package
     */
    var CIRCLE: Blockly.utils.Svg<SVGCircleElement>;

    /** @type {!Blockly.utils.Svg<!SVGClipPathElement>}
     * @package
     */
    var CLIPPATH: Blockly.utils.Svg<SVGClipPathElement>;

    /** @type {!Blockly.utils.Svg<!SVGDefsElement>}
     * @package
     */
    var DEFS: Blockly.utils.Svg<SVGDefsElement>;

    /** @type {!Blockly.utils.Svg<!SVGFECompositeElement>}
     * @package
     */
    var FECOMPOSITE: Blockly.utils.Svg<SVGFECompositeElement>;

    /** @type {!Blockly.utils.Svg<!SVGFEComponentTransferElement>}
     * @package
     */
    var FECOMPONENTTRANSFER: Blockly.utils.Svg<SVGFEComponentTransferElement>;

    /** @type {!Blockly.utils.Svg<!SVGFEFloodElement>}
     * @package
     */
    var FEFLOOD: Blockly.utils.Svg<SVGFEFloodElement>;

    /** @type {!Blockly.utils.Svg<!SVGFEFuncAElement>}
     * @package
     */
    var FEFUNCA: Blockly.utils.Svg<SVGFEFuncAElement>;

    /** @type {!Blockly.utils.Svg<!SVGFEGaussianBlurElement>}
     * @package
     */
    var FEGAUSSIANBLUR: Blockly.utils.Svg<SVGFEGaussianBlurElement>;

    /** @type {!Blockly.utils.Svg<!SVGFEPointLightElement>}
     * @package
     */
    var FEPOINTLIGHT: Blockly.utils.Svg<SVGFEPointLightElement>;

    /** @type {!Blockly.utils.Svg<!SVGFESpecularLightingElement>}
     * @package
     */
    var FESPECULARLIGHTING: Blockly.utils.Svg<SVGFESpecularLightingElement>;

    /** @type {!Blockly.utils.Svg<!SVGFilterElement>}
     * @package
     */
    var FILTER: Blockly.utils.Svg<SVGFilterElement>;

    /** @type {!Blockly.utils.Svg<!SVGForeignObjectElement>}
     * @package
     */
    var FOREIGNOBJECT: Blockly.utils.Svg<SVGForeignObjectElement>;

    /** @type {!Blockly.utils.Svg<!SVGGElement>}
     * @package
     */
    var G: Blockly.utils.Svg<SVGGElement>;

    /** @type {!Blockly.utils.Svg<!SVGImageElement>}
     * @package
     */
    var IMAGE: Blockly.utils.Svg<SVGImageElement>;

    /** @type {!Blockly.utils.Svg<!SVGLineElement>}
     * @package
     */
    var LINE: Blockly.utils.Svg<SVGLineElement>;

    /** @type {!Blockly.utils.Svg<!SVGPathElement>}
     * @package
     */
    var PATH: Blockly.utils.Svg<SVGPathElement>;

    /** @type {!Blockly.utils.Svg<!SVGPatternElement>}
     * @package
     */
    var PATTERN: Blockly.utils.Svg<SVGPatternElement>;

    /** @type {!Blockly.utils.Svg<!SVGPolygonElement>}
     * @package
     */
    var POLYGON: Blockly.utils.Svg<SVGPolygonElement>;

    /** @type {!Blockly.utils.Svg<!SVGRectElement>}
     * @package
     */
    var RECT: Blockly.utils.Svg<SVGRectElement>;

    /** @type {!Blockly.utils.Svg<!SVGSVGElement>}
     * @package
     */
    var SVG: Blockly.utils.Svg<SVGSVGElement>;

    /** @type {!Blockly.utils.Svg<!SVGTextElement>}
     * @package
     */
    var TEXT: Blockly.utils.Svg<SVGTextElement>;

    /** @type {!Blockly.utils.Svg<!SVGTSpanElement>}
     * @package
     */
    var TSPAN: Blockly.utils.Svg<SVGTSpanElement>;
}
