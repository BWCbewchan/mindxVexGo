
declare module Blockly.Css {

    /**
     * Add some CSS to the blob that will be injected later.  Allows optional
     * components such as fields and the toolbox to store separate CSS.
     * The provided array of CSS will be destroyed by this function.
     * @param {!Array.<string>} cssArray Array of CSS strings.
     */
    function register(cssArray: string[]): void;

    /**
     * Inject the CSS into the DOM.  This is preferable over using a regular CSS
     * file since:
     * a) It loads synchronously and doesn't force a redraw later.
     * b) It speeds up loading by not blocking on a separate HTTP transfer.
     * c) The CSS content may be made dynamic depending on init options.
     * @param {boolean} hasCss If false, don't inject CSS
     *     (providing CSS becomes the document's responsibility).
     * @param {string} pathToMedia Path from page to the Blockly media directory.
     */
    function inject(hasCss: boolean, pathToMedia: string): void;

    /**
     * Array making up the CSS content for Blockly.
     */
    var CONTENT: any /*missing*/;
}
