
declare module Blockly.tree {

    class BaseNode extends BaseNode__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BaseNode__Class extends Blockly.Component__Class  { 
    
            /**
             * An abstract base class for a node in the tree.
             * Similar to goog.ui.tree.BaseNode
             *
             * @param {string} content The content of the node label treated as
             *     plain-text and will be HTML escaped.
             * @param {!Blockly.tree.BaseNode.Config} config The configuration for the tree.
             * @constructor
             * @extends {Blockly.Component}
             */
            constructor(content: string, config: Blockly.tree.BaseNode.Config);
    
            /**
             * @type {Blockly.tree.TreeControl}
             * @protected
             */
            tree: Blockly.tree.TreeControl;
    
            /**
             * Adds roles and states.
             * @protected
             */
            initAccessibility(): void;
    
            /**
             * Appends a node as a child to the current node.
             * @param {Blockly.tree.BaseNode} child The child to add.
             * @package
             */
            add(child: Blockly.tree.BaseNode): void;
    
            /**
             * Returns the tree.
             * @return {?Blockly.tree.TreeControl} tree
             * @protected
             */
            getTree(): Blockly.tree.TreeControl;
    
            /**
             * Returns the depth of the node in the tree. Should not be overridden.
             * @return {number} The non-negative depth of this node (the root is zero).
             * @protected
             */
            getDepth(): number;
    
            /**
             * Returns true if the node is a descendant of this node
             * @param {Blockly.tree.BaseNode} node The node to check.
             * @return {boolean} True if the node is a descendant of this node, false
             *    otherwise.
             * @protected
             */
            contains(node: Blockly.tree.BaseNode): boolean;
    
            /**
             * This is re-defined here to indicate to the closure compiler the correct
             * child return type.
             * @param {number} index 0-based index.
             * @return {Blockly.tree.BaseNode} The child at the given index; null if none.
             * @protected
             */
            getChildAt(index: number): Blockly.tree.BaseNode;
    
            /**
             * Returns the children of this node.
             * @return {!Array.<!Blockly.tree.BaseNode>} The children.
             * @package
             */
            getChildren(): Blockly.tree.BaseNode[];
    
            /**
             * @return {Blockly.tree.BaseNode} The first child of this node.
             * @protected
             */
            getFirstChild(): Blockly.tree.BaseNode;
    
            /**
             * @return {Blockly.tree.BaseNode} The last child of this node.
             * @protected
             */
            getLastChild(): Blockly.tree.BaseNode;
    
            /**
             * @return {Blockly.tree.BaseNode} The previous sibling of this node.
             * @protected
             */
            getPreviousSibling(): Blockly.tree.BaseNode;
    
            /**
             * @return {Blockly.tree.BaseNode} The next sibling of this node.
             * @protected
             */
            getNextSibling(): Blockly.tree.BaseNode;
    
            /**
             * @return {boolean} Whether the node is the last sibling.
             * @protected
             */
            isLastSibling(): boolean;
    
            /**
             * @return {boolean} Whether the node is selected.
             * @protected
             */
            isSelected(): boolean;
    
            /**
             * Selects the node.
             * @protected
             */
            select(): void;
    
            /**
             * Selects the first node.
             * @protected
             */
            selectFirst(): void;
    
            /**
             * Called from the tree to instruct the node change its selection state.
             * @param {boolean} selected The new selection state.
             * @protected
             */
            setSelectedInternal(selected: boolean): void;
    
            /**
             * @return {boolean} Whether the node is expanded.
             * @protected
             */
            getExpanded(): boolean;
    
            /**
             * Sets the node to be expanded internally, without state change events.
             * @param {boolean} expanded Whether to expand or close the node.
             * @protected
             */
            setExpandedInternal(expanded: boolean): void;
    
            /**
             * Sets the node to be expanded.
             * @param {boolean} expanded Whether to expand or close the node.
             * @package
             */
            setExpanded(expanded: boolean): void;
    
            /**
             * Used to notify a node of that we have expanded it.
             * Can be overidden by subclasses, see Blockly.tree.TreeNode.
             * @protected
             */
            doNodeExpanded(): void;
    
            /**
             * Used to notify a node that we have collapsed it.
             * Can be overidden by subclasses, see Blockly.tree.TreeNode.
             * @protected
             */
            doNodeCollapsed(): void;
    
            /**
             * Toggles the expanded state of the node.
             * @protected
             */
            toggle(): void;
    
            /**
             * @return {boolean} Whether the node is collapsible by user actions.
             * @protected
             */
            isUserCollapsible(): boolean;
    
            /**
             * Creates HTML Element for the node.
             * @return {!Element} HTML element
             * @protected
             */
            toDom(): Element;
    
            /**
             * @return {!Element} The HTML element for the row.
             * @protected
             */
            getRowDom(): Element;
    
            /**
             * @return {string} The class name for the row.
             * @protected
             */
            getRowClassName(): string;
    
            /**
             * @return {!Element} The HTML element for the label.
             * @protected
             */
            getLabelDom(): Element;
    
            /**
             * @return {!Element} The HTML for the icon.
             * @protected
             */
            getIconDom(): Element;
    
            /**
             * Gets the calculated icon class.
             * @protected
             */
            getCalculatedIconClass(): void;
    
            /**
             * @return {string} The background position style value.
             * @protected
             */
            getBackgroundPosition(): string;
    
            /**
             * @return {Element} The row is the div that is used to draw the node without
             *     the children.
             * @package
             */
            getRowElement(): Element;
    
            /**
             * @return {Element} The icon element.
             * @protected
             */
            getIconElement(): Element;
    
            /**
             * @return {Element} The label element.
             * @protected
             */
            getLabelElement(): Element;
    
            /**
             * @return {Element} The div containing the children.
             * @protected
             */
            getChildrenElement(): Element;
    
            /**
             * Gets the icon class for the node.
             * @return {string} s The icon source.
             * @protected
             */
            getIconClass(): string;
    
            /**
             * Gets the icon class for when the node is expanded.
             * @return {string} The class.
             * @protected
             */
            getExpandedIconClass(): string;
    
            /**
             * Sets the text of the label.
             * @param {string} s The plain text of the label.
             * @protected
             */
            setText(s: string): void;
    
            /**
             * Returns the text of the label. If the text was originally set as HTML, the
             * return value is unspecified.
             * @return {string} The plain text of the label.
             * @package
             */
            getText(): string;
    
            /**
             * Updates the row styles.
             * @protected
             */
            updateRow(): void;
    
            /**
             * Updates the expand icon of the node.
             * @protected
             */
            updateExpandIcon(): void;
    
            /**
             * Handles mouse down event.
             * @param {!Event} e The browser event.
             * @protected
             */
            onMouseDown(e: Event): void;
    
            /**
             * Handles a click event.
             * @param {!Event} e The browser event.
             * @protected
             */
            onClick_(e: Event): void;
    
            /**
             * Handles a key down event.
             * @param {!Event} e The browser event.
             * @return {boolean} The handled value.
             * @protected
             */
            onKeyDown(e: Event): boolean;
    
            /**
             * Select the next node.
             * @return {boolean} True if the action has been handled, false otherwise.
             * @package
             */
            selectNext(): boolean;
    
            /**
             * Select the previous node.
             * @return {boolean} True if the action has been handled, false otherwise.
             * @package
             */
            selectPrevious(): boolean;
    
            /**
             * Select the parent node or collapse the current node.
             * @return {boolean} True if the action has been handled, false otherwise.
             * @package
             */
            selectParent(): boolean;
    
            /**
             * Expand the current node if it's not already expanded, or select the
             * child node.
             * @return {boolean} True if the action has been handled, false otherwise.
             * @package
             */
            selectChild(): boolean;
    
            /**
             * @return {Blockly.tree.BaseNode} The last shown descendant.
             * @protected
             */
            getLastShownDescendant(): Blockly.tree.BaseNode;
    
            /**
             * @return {Blockly.tree.BaseNode} The next node to show or null if there isn't
             *     a next node to show.
             * @protected
             */
            getNextShownNode(): Blockly.tree.BaseNode;
    
            /**
             * @return {Blockly.tree.BaseNode} The previous node to show.
             * @protected
             */
            getPreviousShownNode(): Blockly.tree.BaseNode;
    
            /**
             * @return {!Blockly.tree.BaseNode.Config} The configuration for the tree.
             * @protected
             */
            getConfig(): Blockly.tree.BaseNode.Config;
    
            /**
             * Internal method that is used to set the tree control on the node.
             * @param {Blockly.tree.TreeControl} tree The tree control.
             * @protected
             */
            setTreeInternal(tree: Blockly.tree.TreeControl): void;
    } 
    
}

declare module Blockly.tree.BaseNode {

    /**
     * The config type for the tree.
     * @typedef {{
     *            indentWidth:number,
     *            cssRoot:string,
     *            cssHideRoot:string,
     *            cssTreeRow:string,
     *            cssItemLabel:string,
     *            cssTreeIcon:string,
     *            cssExpandedFolderIcon:string,
     *            cssCollapsedFolderIcon:string,
     *            cssFileIcon:string,
     *            cssSelectedRow:string
     *          }}
     */
    interface Config {
        indentWidth: number;
        cssRoot: string;
        cssHideRoot: string;
        cssTreeRow: string;
        cssItemLabel: string;
        cssTreeIcon: string;
        cssExpandedFolderIcon: string;
        cssCollapsedFolderIcon: string;
        cssFileIcon: string;
        cssSelectedRow: string
    }

    /**
     * Map of nodes in existence. Needed to route events to the appropriate nodes.
     * Nodes are added to the map at {@link #enterDocument} time and removed at
     * {@link #exitDocument} time.
     * @type {Object}
     * @protected
     */
    var allNodes: Object;
}
