
declare module Blockly {

    class Component extends Component__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Component__Class  { 
    
            /**
             * Default implementation of a UI component.
             * Similar to Closure's goog.ui.Component.
             *
             * @constructor
             */
            constructor();
    
            /**
             * Whether the component is rendered right-to-left.
             * @type {boolean}
             * @protected
             */
            rightToLeft_: boolean;
    
            /**
             * Gets the unique ID for the instance of this component.  If the instance
             * doesn't already have an ID, generates one on the fly.
             * @return {string} Unique component ID.
             * @package
             */
            getId(): string;
    
            /**
             * Gets the component's element.
             * @return {Element} The element for the component.
             * @package
             */
            getElement(): Element;
    
            /**
             * Sets the component's root element to the given element.  Considered
             * protected and final.
             *
             * This should generally only be called during createDom. Setting the element
             * does not actually change which element is rendered, only the element that is
             * associated with this UI component.
             *
             * This should only be used by subclasses and its associated renderers.
             *
             * @param {Element} element Root element for the component.
             * @protected
             */
            setElementInternal(element: Element): void;
    
            /**
             * Sets the parent of this component to use for event bubbling.  Throws an error
             * if the component already has a parent or if an attempt is made to add a
             * component to itself as a child.
             * @param {Blockly.Component} parent The parent component.
             * @protected
             */
            setParent(parent: Blockly.Component): void;
    
            /**
             * Returns the component's parent, if any.
             * @return {?Blockly.Component} The parent component.
             * @protected
             */
            getParent(): Blockly.Component;
    
            /**
             * Determines whether the component has been added to the document.
             * @return {boolean} TRUE if rendered. Otherwise, FALSE.
             * @protected
             */
            isInDocument(): boolean;
    
            /**
             * Creates the initial DOM representation for the component.
             * @protected
             */
            createDom(): void;
    
            /**
             * Renders the component.  If a parent element is supplied, the component's
             * element will be appended to it.  If there is no optional parent element and
             * the element doesn't have a parentNode then it will be appended to the
             * document body.
             *
             * If this component has a parent component, and the parent component is
             * not in the document already, then this will not call `enterDocument`
             * on this component.
             *
             * Throws an Error if the component is already rendered.
             *
             * @param {Element=} opt_parentElement Optional parent element to render the
             *    component into.
             * @package
             */
            render(opt_parentElement?: Element): void;
    
            /**
             * Called when the component's element is known to be in the document. Anything
             * using document.getElementById etc. should be done at this stage.
             *
             * If the component contains child components, this call is propagated to its
             * children.
             * @protected
             */
            enterDocument(): void;
    
            /**
             * Called by dispose to clean up the elements and listeners created by a
             * component, or by a parent component/application who has removed the
             * component from the document but wants to reuse it later.
             *
             * If the component contains child components, this call is propagated to its
             * children.
             *
             * It should be possible for the component to be rendered again once this method
             * has been called.
             * @protected
             */
            exitDocument(): void;
    
            /**
             * Disposes of the object. If the object hasn't already been disposed of, calls
             * {@link #disposeInternal}.
             * @package
             */
            dispose(): void;
    
            /**
             * Disposes of the component.  Calls `exitDocument`, which is expected to
             * remove event handlers and clean up the component.  Propagates the call to
             * the component's children, if any. Removes the component's DOM from the
             * document.
             * @protected
             */
            disposeInternal(): void;
    
            /**
             * Adds the specified component as the last child of this component.  See
             * {@link Blockly.Component#addChildAt} for detailed semantics.
             *
             * @see Blockly.Component#addChildAt
             * @param {Blockly.Component} child The new child component.
             * @param {boolean=} opt_render If true, the child component will be rendered
             *    into the parent.
             * @package
             */
            addChild(child: Blockly.Component, opt_render?: boolean): void;
    
            /**
             * Adds the specified component as a child of this component at the given
             * 0-based index.
             *
             * Both `addChild` and `addChildAt` assume the following contract
             * between parent and child components:
             *  <ul>
             *    <li>the child component's element must be a descendant of the parent
             *        component's element, and
             *    <li>the DOM state of the child component must be consistent with the DOM
             *        state of the parent component (see `isInDocument`) in the
             *        steady state -- the exception is to addChildAt(child, i, false) and
             *        then immediately decorate/render the child.
             *  </ul>
             *
             * In particular, `parent.addChild(child)` will throw an error if the
             * child component is already in the document, but the parent isn't.
             *
             * Clients of this API may call `addChild` and `addChildAt` with
             * `opt_render` set to true.  If `opt_render` is true, calling these
             * methods will automatically render the child component's element into the
             * parent component's element. If the parent does not yet have an element, then
             * `createDom` will automatically be invoked on the parent before
             * rendering the child.
             *
             * Invoking {@code parent.addChild(child, true)} will throw an error if the
             * child component is already in the document, regardless of the parent's DOM
             * state.
             *
             * If `opt_render` is true and the parent component is not already
             * in the document, `enterDocument` will not be called on this component
             * at this point.
             *
             * Finally, this method also throws an error if the new child already has a
             * different parent, or the given index is out of bounds.
             *
             * @see Blockly.Component#addChild
             * @param {Blockly.Component} child The new child component.
             * @param {number} index 0-based index at which the new child component is to be
             *    added; must be between 0 and the current child count (inclusive).
             * @param {boolean=} opt_render If true, the child component will be rendered
             *    into the parent.
             * @protected
             */
            addChildAt(child: Blockly.Component, index: number, opt_render?: boolean): void;
    
            /**
             * Returns the DOM element into which child components are to be rendered,
             * or null if the component itself hasn't been rendered yet.  This default
             * implementation returns the component's root element.  Subclasses with
             * complex DOM structures must override this method.
             * @return {Element} Element to contain child elements (null if none).
             * @protected
             */
            getContentElement(): Element;
    
            /**
             * Returns true if the component has children.
             * @return {boolean} True if the component has children.
             * @protected
             */
            hasChildren(): boolean;
    
            /**
             * Returns the number of children of this component.
             * @return {number} The number of children.
             * @protected
             */
            getChildCount(): number;
    
            /**
             * Returns the child with the given ID, or null if no such child exists.
             * @param {string} id Child component ID.
             * @return {?Blockly.Component} The child with the given ID; null if none.
             * @protected
             */
            getChild(id: string): Blockly.Component;
    
            /**
             * Returns the child at the given index, or null if the index is out of bounds.
             * @param {number} index 0-based index.
             * @return {?Blockly.Component} The child at the given index; null if none.
             * @protected
             */
            getChildAt(index: number): Blockly.Component;
    
            /**
             * Calls the given function on each of this component's children in order.  If
             * `opt_obj` is provided, it will be used as the 'this' object in the
             * function when called.  The function should take two arguments:  the child
             * component and its 0-based index.  The return value is ignored.
             * @param {function(this:T,?,number):?} f The function to call for every
             * child component; should take 2 arguments (the child and its index).
             * @param {T=} opt_obj Used as the 'this' object in f when called.
             * @template T
             * @protected
             */
            forEachChild<T>(f: { (_0: any, _1: number): any }, opt_obj?: T): void;
    } 
    
}

declare module Blockly.Component {

    /**
     * The default right to left value.
     * @type {boolean}
     * @package
     */
    var defaultRightToLeft: boolean;

    /**
     * Errors thrown by the component.
     * @enum {string}
     */
    enum Error { ALREADY_RENDERED, PARENT_UNABLE_TO_BE_SET, CHILD_INDEX_OUT_OF_BOUNDS, ABSTRACT_METHOD } 
}
