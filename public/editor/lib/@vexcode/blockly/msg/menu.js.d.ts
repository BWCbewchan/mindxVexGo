
declare module Blockly {

    class Menu extends Menu__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Menu__Class extends Blockly.Component__Class  { 
    
            /**
             * A basic menu class.
             * @constructor
             * @extends {Blockly.Component}
             */
            constructor();
    
            /**
             * Focus the menu element.
             * @package
             */
            focus(): void;
    
            /**
             * Blur the menu element.
             * @package
             */
            blur(): void;
    
            /**
             * Set the menu accessibility role.
             * @param {!Blockly.utils.aria.Role|string} roleName role name.
             * @package
             */
            setRole(roleName: Blockly.utils.aria.Role|string): void;
    
            /**
             * Returns the child menuitem that owns the given DOM node, or null if no such
             * menuitem is found.
             * @param {Node} node DOM node whose owner is to be returned.
             * @return {?Blockly.MenuItem} menuitem for which the DOM node belongs to.
             * @protected
             */
            getMenuItem(node: Node): Blockly.MenuItem;
    
            /**
             * Unhighlight the current highlighted item.
             * @protected
             */
            unhighlightCurrent(): void;
    
            /**
             * Clears the currently highlighted item.
             * @protected
             */
            clearHighlighted(): void;
    
            /**
             * Returns the currently highlighted item (if any).
             * @return {?Blockly.Component} Highlighted item (null if none).
             * @protected
             */
            getHighlighted(): Blockly.Component;
    
            /**
             * Highlights the item at the given 0-based index (if any). If another item
             * was previously highlighted, it is un-highlighted.
             * @param {number} index Index of item to highlight (-1 removes the current
             *     highlight).
             * @protected
             */
            setHighlightedIndex(index: number): void;
    
            /**
             * Highlights the given item if it exists and is a child of the container;
             * otherwise un-highlights the currently highlighted item.
             * @param {Blockly.MenuItem} item Item to highlight.
             * @protected
             */
            setHighlighted(item: Blockly.MenuItem): void;
    
            /**
             * Highlights the next highlightable item (or the first if nothing is currently
             * highlighted).
             * @package
             */
            highlightNext(): void;
    
            /**
             * Highlights the previous highlightable item (or the last if nothing is
             * currently highlighted).
             * @package
             */
            highlightPrevious(): void;
    
            /**
             * Helper function that manages the details of moving the highlight among
             * child menuitems in response to keyboard events.
             * @param {function(this: Blockly.Component, number, number) : number} fn
             *     Function that accepts the current and maximum indices, and returns the
             *     next index to check.
             * @param {number} startIndex Start index.
             * @return {boolean} Whether the highlight has changed.
             * @protected
             */
            highlightHelper(fn: { (_0: number, _1: number): number }, startIndex: number): boolean;
    
            /**
             * Returns whether the given item can be highlighted.
             * @param {Blockly.MenuItem} item The item to check.
             * @return {boolean} Whether the item can be highlighted.
             * @protected
             */
            canHighlightItem(item: Blockly.MenuItem): boolean;
    
            /**
             * Attempts to handle a keyboard event, if the menuitem is enabled, by calling
             * {@link handleKeyEventInternal}.  Considered protected; should only be used
             * within this package and by subclasses.
             * @param {Event} e Key event to handle.
             * @return {boolean} Whether the key event was handled.
             * @protected
             */
            handleKeyEvent(e: Event): boolean;
    
            /**
             * Attempts to handle a keyboard event; returns true if the event was handled,
             * false otherwise.  If the container is enabled, and a child is highlighted,
             * calls the child menuitem's `handleKeyEvent` method to give the menuitem
             * a chance to handle the event first.
             * @param {Event} e Key event to handle.
             * @return {boolean} Whether the event was handled by the container (or one of
             *     its children).
             * @protected
             */
            handleKeyEventInternal(e: Event): boolean;
    } 
    
}
