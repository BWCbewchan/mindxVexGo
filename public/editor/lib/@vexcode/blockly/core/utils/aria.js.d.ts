
declare module Blockly.utils.aria {

    /**
     * ARIA role values.
     * Copied from Closure's goog.a11y.aria.Role
     * @enum {string}
     */
    enum Role { GRID, GRIDCELL, GROUP, LISTBOX, MENU, MENUITEM, MENUITEMCHECKBOX, OPTION, PRESENTATION, ROW, TREE, TREEITEM } 

    /**
     * ARIA states and properties.
     * Copied from Closure's goog.a11y.aria.State
     * @enum {string}
     */
    enum State { ACTIVEDESCENDANT, COLCOUNT, DISABLED, EXPANDED, INVALID, LABEL, LABELLEDBY, LEVEL, ORIENTATION, POSINSET, ROWCOUNT, SELECTED, SETSIZE, VALUEMAX, VALUEMIN } 

    /**
     * Sets the role of an element.
     *
     * Similar to Closure's goog.a11y.aria
     *
     * @param {!Element} element DOM node to set role of.
     * @param {!Blockly.utils.aria.Role} roleName Role name.
     */
    function setRole(element: Element, roleName: Blockly.utils.aria.Role): void;

    /**
     * Sets the state or property of an element.
     * Copied from Closure's goog.a11y.aria
     * @param {!Element} element DOM node where we set state.
     * @param {!Blockly.utils.aria.State} stateName State attribute being set.
     *     Automatically adds prefix 'aria-' to the state name if the attribute is
     *     not an extra attribute.
     * @param {string|boolean|number|!Array.<string>} value Value
     * for the state attribute.
     */
    function setState(element: Element, stateName: Blockly.utils.aria.State, value: string|boolean|number|string[]): void;
}
