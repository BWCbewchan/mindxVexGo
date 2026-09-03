
declare module Blockly.utils.aria {

    /**
     * ARIA role values.
     * Copied from Closure's goog.a11y.aria.Role
     * @enum {string}
     */
    enum Role { ALERT, ALERTDIALOG, APPLICATION, ARTICLE, BANNER, BUTTON, CHECKBOX, COLUMNHEADER, COMBOBOX, COMPLEMENTARY, CONTENTINFO, DEFINITION, DIALOG, DIRECTORY, DOCUMENT, FORM, GRID, GRIDCELL, GROUP, HEADING, IMG, LINK, LIST, LISTBOX, LISTITEM, LOG, MAIN, MARQUEE, MATH, MENU, MENUBAR, MENUITEM, MENUITEMCHECKBOX, MENUITEMRADIO, NAVIGATION, NOTE, OPTION, PRESENTATION, PROGRESSBAR, RADIO, RADIOGROUP, REGION, ROW, ROWGROUP, ROWHEADER, SCROLLBAR, SEARCH, SEPARATOR, SLIDER, SPINBUTTON, STATUS, TAB, TABLE, TABLIST, TABPANEL, TEXTBOX, TEXTINFO, TIMER, TOOLBAR, TOOLTIP, TREE, TREEGRID, TREEITEM } 

    /**
     * ARIA states and properties.
     * Copied from Closure's goog.a11y.aria.State
     * @enum {string}
     */
    enum State { ACTIVEDESCENDANT, ATOMIC, AUTOCOMPLETE, BUSY, CHECKED, COLINDEX, CONTROLS, DESCRIBEDBY, DISABLED, DROPEFFECT, EXPANDED, FLOWTO, GRABBED, HASPOPUP, HIDDEN, INVALID, LABEL, LABELLEDBY, LEVEL, LIVE, MULTILINE, MULTISELECTABLE, ORIENTATION, OWNS, POSINSET, PRESSED, READONLY, RELEVANT, REQUIRED, ROWINDEX, SELECTED, SETSIZE, SORT, VALUEMAX, VALUEMIN, VALUENOW, VALUETEXT } 

    /**
     * Sets the role of an element. If the roleName is
     * empty string or null, the role for the element is removed.
     * We encourage clients to call the goog.a11y.aria.removeRole
     * method instead of setting null and empty string values.
     * Special handling for this case is added to ensure
     * backword compatibility with existing code.
     *
     * Similar to Closure's goog.a11y.aria
     *
     * @param {!Element} element DOM node to set role of.
     * @param {!Blockly.utils.aria.Role|string} roleName role name(s).
     */
    function setRole(element: Element, roleName: Blockly.utils.aria.Role|string): void;

    /**
     * Gets role of an element.
     * Copied from Closure's goog.a11y.aria
     * @param {!Element} element DOM element to get role of.
     * @return {?Blockly.utils.aria.Role} ARIA Role name.
     */
    function getRole(element: Element): Blockly.utils.aria.Role;

    /**
     * Removes role of an element.
     * Copied from Closure's goog.a11y.aria
     * @param {!Element} element DOM element to remove the role from.
     */
    function removeRole(element: Element): void;

    /**
     * Sets the state or property of an element.
     * Copied from Closure's goog.a11y.aria
     * @param {!Element} element DOM node where we set state.
     * @param {!(Blockly.utils.aria.State|string)} stateName State attribute being set.
     *     Automatically adds prefix 'aria-' to the state name if the attribute is
     *     not an extra attribute.
     * @param {string|boolean|number|!Array.<string>} value Value
     * for the state attribute.
     */
    function setState(element: Element, stateName: Blockly.utils.aria.State|string, value: string|boolean|number|string[]): void;
}
