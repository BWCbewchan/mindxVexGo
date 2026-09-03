
declare module Blockly {

    class Field extends Field__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Field__Class implements Blockly.IASTNodeLocationSvg, Blockly.IASTNodeLocationWithBlock, Blockly.IBlocklyActionable, Blockly.IRegistrable  { 
    
            /**
             * Abstract class for an editable field.
             * @param {*} value The initial value of the field.
             * @param {?Function=} opt_validator  A function that is called to validate
             *    changes to the field's value. Takes in a value & returns a validated
             *    value, or null to abort the change.
             * @param {Object=} opt_config A map of options used to configure the field. See
             *    the individual field's documentation for a list of properties this
             *    parameter supports.
             * @constructor
             * @implements {Blockly.IASTNodeLocationSvg}
             * @implements {Blockly.IASTNodeLocationWithBlock}
             * @implements {Blockly.IBlocklyActionable}
             * @implements {Blockly.IRegistrable}
             */
            constructor(value: any, opt_validator?: Function, opt_config?: Object);
    
            /**
             * A generic value possessed by the field.
             * Should generally be non-null, only null when the field is created.
             * @type {*}
             * @protected
             */
            value_: any;
    
            /**
             * Validation function called when user edits an editable field.
             * @type {Function}
             * @protected
             */
            validator_: Function;
    
            /**
             * The size of the area rendered by the field.
             * @type {!Blockly.utils.Size}
             * @protected
             */
            size_: Blockly.utils.Size;
    
            /**
             * The rendered field's SVG group element.
             * @type {SVGGElement}
             * @protected
             */
            fieldGroup_: SVGGElement;
    
            /**
             * The rendered field's SVG border element.
             * @type {SVGRectElement}
             * @protected
             */
            borderRect_: SVGRectElement;
    
            /**
             * The rendered field's SVG text element.
             * @type {SVGTextElement}
             * @protected
             */
            textElement_: SVGTextElement;
    
            /**
             * The rendered field's text content element.
             * @type {Text}
             * @protected
             */
            textContent_: Text;
    
            /**
             * Constants associated with the source block's renderer.
             * @type {Blockly.blockRendering.ConstantProvider}
             * @protected
             */
            constants_: Blockly.blockRendering.ConstantProvider;
    
            /**
             * The default value for this field.
             * @type {*}
             * @protected
             */
            DEFAULT_VALUE: any;
    
            /**
             * Name of field.  Unique within each block.
             * Static labels are usually unnamed.
             * @type {string|undefined}
             */
            name: string|any /*undefined*/;
    
            /**
             * Has this field been disposed of?
             * @type {boolean}
             * @package
             */
            disposed: boolean;
    
            /**
             * Maximum characters of text to display before adding an ellipsis.
             * @type {number}
             */
            maxDisplayLength: number;
    
            /**
             * Minimum width of field.
             * @type {number}
             */
            minDisplayWidth: number;
    
            /**
             * Block this field is attached to.  Starts as null, then set in init.
             * @type {Blockly.Block}
             * @protected
             */
            sourceBlock_: Blockly.Block;
    
            /**
             * Does this block need to be re-rendered?
             * @type {boolean}
             * @protected
             */
            isDirty_: boolean;
    
            /**
             * Is the field visible, or hidden due to the block being collapsed?
             * @type {boolean}
             * @protected
             */
            visible_: boolean;
    
            /**
             * The element the click handler is bound to.
             * @type {Element}
             * @protected
             */
            clickTarget_: Element;
    
            /**
             * A developer hook to override the returned text of this field.
             * Override if the text representation of the value of this field
             * is not just a string cast of its value.
             * Return null to resort to a string cast.
             * @return {?string} Current text. Return null to resort to a string cast.
             * @protected
             */
            getText_(): string;
    
            /**
             * An optional method that can be defined to show an editor when the field is
             *     clicked. Blockly will automatically set the field as clickable if this
             *     method is defined.
             * @param {Event=} opt_e Optional mouse event that triggered the field to open,
             *     or undefined if triggered programmatically.
             * @return {void}
             * @protected
             */
            showEditor_(opt_e?: Event): void;
    
            /**
             * Editable fields usually show some sort of UI indicating they are editable.
             * They will also be saved by the XML renderer.
             * @type {boolean}
             */
            EDITABLE: boolean;
    
            /**
             * Serializable fields are saved by the XML renderer, non-serializable fields
             * are not. Editable fields should also be serializable. This is not the
             * case by default so that SERIALIZABLE is backwards compatible.
             * @type {boolean}
             */
            SERIALIZABLE: boolean;
    
            /**
             * Process the configuration map passed to the field.
             * @param {!Object} config A map of options used to configure the field. See
             *    the individual field's documentation for a list of properties this
             *    parameter supports.
             * @protected
             */
            configure_(config: Object): void;
    
            /**
             * Attach this field to a block.
             * @param {!Blockly.Block} block The block containing this field.
             */
            setSourceBlock(block: Blockly.Block): void;
    
            /**
             * Get the renderer constant provider.
             * @return {?Blockly.blockRendering.ConstantProvider} The renderer constant
             *     provider.
             */
            getConstants(): Blockly.blockRendering.ConstantProvider;
    
            /**
             * Get the block this field is attached to.
             * @return {Blockly.Block} The block containing this field.
             */
            getSourceBlock(): Blockly.Block;
    
            /**
             * Initialize everything to render this field. Override
             * methods initModel and initView rather than this method.
             * @package
             */
            init(): void;
    
            /**
             * Create the block UI for this field.
             * @package
             */
            initView(): void;
    
            /**
             * Initializes the model of the field after it has been installed on a block.
             * No-op by default.
             * @package
             */
            initModel(): void;
    
            /**
             * Create a field border rect element. Not to be overridden by subclasses.
             * Instead modify the result of the function inside initView, or create a
             * separate function to call.
             * @protected
             */
            createBorderRect_(): void;
    
            /**
             * Create a field text element. Not to be overridden by subclasses. Instead
             * modify the result of the function inside initView, or create a separate
             * function to call.
             * @protected
             */
            createTextElement_(): void;
    
            /**
             * Bind events to the field. Can be overridden by subclasses if they need to do
             * custom input handling.
             * @protected
             */
            bindEvents_(): void;
    
            /**
             * Sets the field's value based on the given XML element. Should only be
             * called by Blockly.Xml.
             * @param {!Element} fieldElement The element containing info about the
             *    field's state.
             * @package
             */
            fromXml(fieldElement: Element): void;
    
            /**
             * Serializes this field's value to XML. Should only be called by Blockly.Xml.
             * @param {!Element} fieldElement The element to populate with info about the
             *    field's state.
             * @return {!Element} The element containing info about the field's state.
             * @package
             */
            toXml(fieldElement: Element): Element;
    
            /**
             * Dispose of all DOM objects and events belonging to this editable field.
             * @package
             */
            dispose(): void;
    
            /**
             * Add or remove the UI indicating if this field is editable or not.
             */
            updateEditable(): void;
    
            /**
             * Check whether this field defines the showEditor_ function.
             * @return {boolean} Whether this field is clickable.
             */
            isClickable(): boolean;
    
            /**
             * Check whether this field is currently editable.  Some fields are never
             * EDITABLE (e.g. text labels). Other fields may be EDITABLE but may exist on
             * non-editable blocks.
             * @return {boolean} Whether this field is editable and on an editable block
             */
            isCurrentlyEditable(): boolean;
    
            /**
             * Check whether this field should be serialized by the XML renderer.
             * Handles the logic for backwards compatibility and incongruous states.
             * @return {boolean} Whether this field should be serialized or not.
             */
            isSerializable(): boolean;
    
            /**
             * Gets whether this editable field is visible or not.
             * @return {boolean} True if visible.
             */
            isVisible(): boolean;
    
            /**
             * Sets whether this editable field is visible or not. Should only be called
             * by input.setVisible.
             * @param {boolean} visible True if visible.
             * @package
             */
            setVisible(visible: boolean): void;
    
            /**
             * Sets a new validation function for editable fields, or clears a previously
             * set validator.
             *
             * The validator function takes in the new field value, and returns
             * validated value. The validated value could be the input value, a modified
             * version of the input value, or null to abort the change.
             *
             * If the function does not return anything (or returns undefined) the new
             * value is accepted as valid. This is to allow for fields using the
             * validated function as a field-level change event notification.
             *
             * @param {Function} handler The validator function
             *     or null to clear a previous validator.
             */
            setValidator(handler: Function): void;
    
            /**
             * Gets the validation function for editable fields, or null if not set.
             * @return {Function} Validation function, or null.
             */
            getValidator(): Function;
    
            /**
             * Validates a change.  Does nothing.  Subclasses may override this.
             * @param {string} text The user's text.
             * @return {string} No change needed.
             * @deprecated May 2019. Override doClassValidation and other relevant 'do'
             *  functions instead.
             */
            classValidator(text: string): string;
    
            /**
             * Calls the validation function for this field, as well as all the validation
             * function for the field's class and its parents.
             * @param {string} text Proposed text.
             * @return {?string} Revised text, or null if invalid.
             * @deprecated May 2019. setValue now contains all relevant logic.
             */
            callValidator(text: string): string;
    
            /**
             * Gets the group element for this editable field.
             * Used for measuring the size and for positioning.
             * @return {!SVGGElement} The group element.
             */
            getSvgRoot(): SVGGElement;
    
            /**
             * Updates the field to match the colour/style of the block. Should only be
             * called by BlockSvg.applyColour().
             * @package
             */
            applyColour(): void;
    
            /**
             * Used by getSize() to move/resize any DOM elements, and get the new size.
             *
             * All rendering that has an effect on the size/shape of the block should be
             * done here, and should be triggered by getSize().
             * @protected
             */
            render_(): void;
    
            /**
             * Show an editor when the field is clicked only if the field is clickable.
             * @param {Event=} opt_e Optional mouse event that triggered the field to open,
             *     or undefined if triggered programmatically.
             * @package
             */
            showEditor(opt_e?: Event): void;
    
            /**
             * Updates the width of the field. Redirects to updateSize_().
             * @deprecated May 2019  Use Blockly.Field.updateSize_() to force an update
             * to the size of the field, or Blockly.utils.dom.getTextWidth() to
             * check the size of the field.
             */
            updateWidth(): void;
    
            /**
             * Updates the size of the field based on the text.
             * @param {number=} opt_margin margin to use when positioning the text element.
             * @protected
             */
            updateSize_(opt_margin?: number): void;
    
            /**
             * Position a field's text element after a size change.  This handles both LTR
             * and RTL positioning.
             * @param {number} xOffset x offset to use when positioning the text element.
             * @param {number} contentWidth The content width.
             * @protected
             */
            positionTextElement_(xOffset: number, contentWidth: number): void;
    
            /**
             * Position a field's border rect after a size change.
             * @protected
             */
            positionBorderRect_(): void;
    
            /**
             * Returns the height and width of the field.
             *
             * This should *in general* be the only place render_ gets called from.
             * @return {!Blockly.utils.Size} Height and width.
             */
            getSize(): Blockly.utils.Size;
    
            /**
             * Returns the bounding box of the rendered field, accounting for workspace
             * scaling.
             * @return {!Blockly.utils.Rect} An object with top, bottom, left, and right in
             *     pixels relative to the top left corner of the page (window coordinates).
             * @package
             */
            getScaledBBox(): Blockly.utils.Rect;
    
            /**
             * Get the text from this field to display on the block. May differ from
             * ``getText`` due to ellipsis, and other formatting.
             * @return {string} Text to display.
             * @protected
             */
            getDisplayText_(): string;
    
            /**
             * Get the text from this field.
             * @return {string} Current text.
             */
            getText(): string;
    
            /**
             * Set the text in this field.  Trigger a rerender of the source block.
             * @param {*} _newText New text.
             * @deprecated 2019 setText should not be used directly. Use setValue instead.
             */
            setText(_newText: any): void;
    
            /**
             * Force a rerender of the block that this field is installed on, which will
             * rerender this field and adjust for any sizing changes.
             * Other fields on the same block will not rerender, because their sizes have
             * already been recorded.
             * @package
             */
            markDirty(): void;
    
            /**
             * Force a rerender of the block that this field is installed on, which will
             * rerender this field and adjust for any sizing changes.
             * Other fields on the same block will not rerender, because their sizes have
             * already been recorded.
             * @package
             */
            forceRerender(): void;
    
            /**
             * Used to change the value of the field. Handles validation and events.
             * Subclasses should override doClassValidation_ and doValueUpdate_ rather
             * than this method.
             * @param {*} newValue New value.
             */
            setValue(newValue: any): void;
    
            /**
             * Get the current value of the field.
             * @return {*} Current value.
             */
            getValue(): any;
    
            /**
             * Used to validate a value. Returns input by default. Can be overridden by
             * subclasses, see FieldDropdown.
             * @param {*=} opt_newValue The value to be validated.
             * @return {*} The validated value, same as input by default.
             * @protected
             * @suppress {deprecated} Suppress deprecated this.classValidator call.
             */
            doClassValidation_(opt_newValue?: any): any;
    
            /**
             * Used to update the value of a field. Can be overridden by subclasses to do
             * custom storage of values/updating of external things.
             * @param {*} newValue The value to be saved.
             * @protected
             */
            doValueUpdate_(newValue: any): void;
    
            /**
             * Used to notify the field an invalid value was input. Can be overridden by
             * subclasses, see FieldTextInput.
             * No-op by default.
             * @param {*} _invalidValue The input value that was determined to be invalid.
             * @protected
             */
            doValueInvalid_(_invalidValue: any): void;
    
            /**
             * Handle a mouse down event on a field.
             * @param {!Event} e Mouse down event.
             * @protected
             */
            onMouseDown_(e: Event): void;
    
            /**
             * Sets the tooltip for this field.
             * @param {?Blockly.Tooltip.TipInfo} newTip The
             *     text for the tooltip, a function that returns the text for the tooltip, a
             *     parent object whose tooltip will be used, or null to display the tooltip
             *     of the parent block. To not display a tooltip pass the empty string.
             */
            setTooltip(newTip: Blockly.Tooltip.TipInfo): void;
    
            /**
             * Returns the tooltip text for this field.
             * @returns {string} The tooltip text for this field.
             */
            getTooltip(): string;
    
            /**
             * The element to bind the click handler to. If not set explicitly, defaults
             * to the SVG root of the field. When this element is
             * clicked on an editable field, the editor will open.
             * @return {!Element} Element to bind click handler to.
             * @protected
             */
            getClickTarget_(): Element;
    
            /**
             * Return the absolute coordinates of the top-left corner of this field.
             * The origin (0,0) is the top-left corner of the page body.
             * @return {!Blockly.utils.Coordinate} Object with .x and .y properties.
             * @protected
             */
            getAbsoluteXY_(): Blockly.utils.Coordinate;
    
            /**
             * Whether this field references any Blockly variables.  If true it may need to
             * be handled differently during serialization and deserialization.  Subclasses
             * may override this.
             * @return {boolean} True if this field has any variable references.
             * @package
             */
            referencesVariables(): boolean;
    
            /**
             * Search through the list of inputs and their fields in order to find the
             * parent input of a field.
             * @return {Blockly.Input} The input that the field belongs to.
             * @package
             */
            getParentInput(): Blockly.Input;
    
            /**
             * Returns whether or not we should flip the field in RTL.
             * @return {boolean} True if we should flip in RTL.
             */
            getFlipRtl(): boolean;
    
            /**
             * Returns whether or not the field is tab navigable.
             * @return {boolean} True if the field is tab navigable.
             */
            isTabNavigable(): boolean;
    
            /**
             * Handles the given action.
             * This is only triggered when keyboard accessibility mode is enabled.
             * @param {!Blockly.Action} _action The action to be handled.
             * @return {boolean} True if the field handled the action, false otherwise.
             * @package
             */
            onBlocklyAction(_action: Blockly.Action): boolean;
    
            /**
             * Add the cursor svg to this fields svg group.
             * @param {SVGElement} cursorSvg The svg root of the cursor to be added to the
             *     field group.
             * @package
             */
            setCursorSvg(cursorSvg: SVGElement): void;
    
            /**
             * Add the marker svg to this fields svg group.
             * @param {SVGElement} markerSvg The svg root of the marker to be added to the
             *     field group.
             * @package
             */
            setMarkerSvg(markerSvg: SVGElement): void;
    
            /**
             * Redraw any attached marker or cursor svgs if needed.
             * @protected
             */
            updateMarkers_(): void;
    } 
    
}

declare module Blockly.Field {

    /**
     * Non-breaking space.
     * @const
     */
    var NBSP: any /*missing*/;
}
