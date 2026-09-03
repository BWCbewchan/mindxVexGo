
declare module Blockly.blockRendering {

    /**
     * Whether or not the debugger is turned on.
     * @type {boolean}
     * @package
     */
    var useDebugger: boolean;

    /**
     * Registers a new renderer.
     * @param {string} name The name of the renderer.
     * @param {!Function} rendererClass The new renderer class
     *     to register.
     * @throws {Error} if a renderer with the same name has already been registered.
     */
    function register(name: string, rendererClass: Function): void;

    /**
     * Unregisters the renderer registered with the given name.
     * @param {string} name The name of the renderer.
     */
    function unregister(name: string): void;

    /**
     * Turn on the blocks debugger.
     * @package
     */
    function startDebugger(): void;

    /**
     * Turn off the blocks debugger.
     * @package
     */
    function stopDebugger(): void;

    /**
     * Initialize anything needed for rendering (constants, etc).
     * @param {!string} name Name of the renderer to initialize.
     * @param {!Blockly.Theme} theme The workspace theme object.
     * @param {Object=} opt_rendererOverrides Rendering constant overrides.
     * @return {!Blockly.blockRendering.Renderer} The new instance of a renderer.
     *     Already initialized.
     * @package
     */
    function init(name: string, theme: Blockly.Theme, opt_rendererOverrides?: Object): Blockly.blockRendering.Renderer;
}
