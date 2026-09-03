
declare module Blockly {

    /**
     * The multiplier for scroll wheel deltas using the line delta mode.
     * @type {number}
     */
    var LINE_MODE_MULTIPLIER: number;

    /**
     * The multiplier for scroll wheel deltas using the page delta mode.
     * @type {number}
     */
    var PAGE_MODE_MULTIPLIER: number;

    /**
     * Number of pixels the mouse must move before a drag starts.
     */
    var DRAG_RADIUS: any /*missing*/;

    /**
     * Number of pixels the mouse must move before a drag/scroll starts from the
     * flyout.  Because the drag-intention is determined when this is reached, it is
     * larger than Blockly.DRAG_RADIUS so that the drag-direction is clearer.
     */
    var FLYOUT_DRAG_RADIUS: any /*missing*/;

    /**
     * Maximum misalignment between connections for them to snap together.
     */
    var SNAP_RADIUS: any /*missing*/;

    /**
     * Maximum misalignment between connections for them to snap together,
     * when a connection is already highlighted.
     */
    var CONNECTING_SNAP_RADIUS: any /*missing*/;

    /**
     * How much to prefer staying connected to the current connection over moving to
     * a new connection.  The current previewed connection is considered to be this
     * much closer to the matching connection on the block than it actually is.
     */
    var CURRENT_CONNECTION_PREFERENCE: any /*missing*/;

    /**
     * Delay in ms between trigger and bumping unconnected block out of alignment.
     */
    var BUMP_DELAY: any /*missing*/;

    /**
     * Maximum randomness in workspace units for bumping a block.
     */
    var BUMP_RANDOMNESS: any /*missing*/;

    /**
     * Number of characters to truncate a collapsed block to.
     */
    var COLLAPSE_CHARS: any /*missing*/;

    /**
     * Length in ms for a touch to become a long press.
     */
    var LONGPRESS: any /*missing*/;

    /**
     * Prevent a sound from playing if another sound preceded it within this many
     * milliseconds.
     */
    var SOUND_LIMIT: any /*missing*/;

    /**
     * When dragging a block out of a stack, split the stack in two (true), or drag
     * out the block healing the stack (false).
     */
    var DRAG_STACK: any /*missing*/;

    /**
     * The richness of block colours, regardless of the hue.
     * Must be in the range of 0 (inclusive) to 1 (exclusive).
     */
    var HSV_SATURATION: any /*missing*/;

    /**
     * The intensity of block colours, regardless of the hue.
     * Must be in the range of 0 (inclusive) to 1 (exclusive).
     */
    var HSV_VALUE: any /*missing*/;

    /**
     * Sprited icons and images.
     */
    var SPRITE: any /*missing*/;

    /**
     * ENUM for a right-facing value input.  E.g. 'set item to' or 'return'.
     * @const
     */
    var INPUT_VALUE: any /*missing*/;

    /**
     * ENUM for a left-facing value output.  E.g. 'random fraction'.
     * @const
     */
    var OUTPUT_VALUE: any /*missing*/;

    /**
     * ENUM for a down-facing block stack.  E.g. 'if-do' or 'else'.
     * @const
     */
    var NEXT_STATEMENT: any /*missing*/;

    /**
     * ENUM for an up-facing block stack.  E.g. 'break out of loop'.
     * @const
     */
    var PREVIOUS_STATEMENT: any /*missing*/;

    /**
     * ENUM for an dummy input.  Used to add field(s) with no input.
     * @const
     */
    var DUMMY_INPUT: any /*missing*/;

    /**
     * ENUM for left alignment.
     * @const
     */
    var ALIGN_LEFT: any /*missing*/;

    /**
     * ENUM for centre alignment.
     * @const
     */
    var ALIGN_CENTRE: any /*missing*/;

    /**
     * ENUM for right alignment.
     * @const
     */
    var ALIGN_RIGHT: any /*missing*/;

    /**
     * ENUM for no drag operation.
     * @const
     */
    var DRAG_NONE: any /*missing*/;

    /**
     * ENUM for inside the sticky DRAG_RADIUS.
     * @const
     */
    var DRAG_STICKY: any /*missing*/;

    /**
     * ENUM for inside the non-sticky DRAG_RADIUS, for differentiating between
     * clicks and drags.
     * @const
     */
    var DRAG_BEGIN: any /*missing*/;

    /**
     * ENUM for freely draggable (outside the DRAG_RADIUS, if one applies).
     * @const
     */
    var DRAG_FREE: any /*missing*/;

    /**
     * Lookup table for determining the opposite type of a connection.
     * @const
     */
    var OPPOSITE_TYPE: any /*missing*/;

    /**
     * ENUM for toolbox and flyout at top of screen.
     * @const
     */
    var TOOLBOX_AT_TOP: any /*missing*/;

    /**
     * ENUM for toolbox and flyout at bottom of screen.
     * @const
     */
    var TOOLBOX_AT_BOTTOM: any /*missing*/;

    /**
     * ENUM for toolbox and flyout at left of screen.
     * @const
     */
    var TOOLBOX_AT_LEFT: any /*missing*/;

    /**
     * ENUM for toolbox and flyout at right of screen.
     * @const
     */
    var TOOLBOX_AT_RIGHT: any /*missing*/;

    /**
     * ENUM for output shape: hexagonal (booleans/predicates).
     * @const
     */
    var OUTPUT_SHAPE_HEXAGONAL: any /*missing*/;

    /**
      * ENUM for output shape: rounded (numbers).
      * @const
      */
    var OUTPUT_SHAPE_ROUND: any /*missing*/;

    /**
      * ENUM for output shape: squared (any/all values; strings).
      * @const
      */
    var OUTPUT_SHAPE_SQUARE: any /*missing*/;

    /**
      * ENUM for categories.
      * @const
      */
    var Categories: any /*missing*/;

    /**
     * ENUM representing that an event is not in any delete areas.
     * Null for backwards compatibility reasons.
     * @const
     */
    var DELETE_AREA_NONE: any /*missing*/;

    /**
     * ENUM representing that an event is in the delete area of the trash can.
     * @const
     */
    var DELETE_AREA_TRASH: any /*missing*/;

    /**
     * ENUM representing that an event is in the delete area of the toolbox or
     * flyout.
     * @const
     */
    var DELETE_AREA_TOOLBOX: any /*missing*/;

    /**
     * ENUM representing that an event is not in any monitor areas.
     * @const
     */
    var MONITOR_AREA_NONE: any /*missing*/;

    /**
     * ENUM representing that an event is in the monitor area of the workspace
     * @const
     */
    var MONITOR_AREA_DROP: any /*missing*/;

    /**
     * String for use in the "custom" attribute of a category in toolbox XML.
     * This string indicates that the category should be dynamically populated with
     * variable blocks.
     * @const {string}
     */
    var VARIABLE_CATEGORY_NAME: any /*missing*/;

    /**
     * String for use in the "custom" attribute of a category in toolbox XML.
     * This string indicates that the category should be dynamically populated with
     * variable blocks.
     * @const {string}
     */
    var VARIABLE_DYNAMIC_CATEGORY_NAME: any /*missing*/;

    /**
     * String for use in the "custom" attribute of a category in toolbox XML.
     * This string indicates that the category should be dynamically populated with
     * procedure blocks.
     * @const {string}
     */
    var PROCEDURE_CATEGORY_NAME: any /*missing*/;

    /**
     * String for use in the dropdown created in field_variable.
     * This string indicates that this option in the dropdown is 'Rename
     * variable...' and if selected, should trigger the prompt to rename a variable.
     * @const {string}
     */
    var RENAME_VARIABLE_ID: any /*missing*/;

    /**
     * String for use in the dropdown created in field_variable.
     * This string indicates that this option in the dropdown is 'Delete the "%1"
     * variable' and if selected, should trigger the prompt to delete a variable.
     * @const {string}
     */
    var DELETE_VARIABLE_ID: any /*missing*/;

    /**
     * String for use in the dropdown created in field_variable,
     * specifically for broadcast messages.
     * This string indicates that this option in the dropdown is 'New message...'
     * and if selected, should trigger the prompt to create a new message.
     * @const {string}
     */
    var NEW_BROADCAST_MESSAGE_ID: any /*missing*/;

    /**
     * String for use in the dropdown created in field_variable,
     * specifically for broadcast messages.
     * This string indicates that this option in the dropdown is 'New message...'
     * and if selected, should trigger the prompt to create a new message.
     * @const {string}
     */
    var DELETE_BROADCAST_MESSAGE_ID: any /*missing*/;

    /**
     * String for use in the dropdown created in field_variable,
     * specifically for broadcast messages.
     * This string indicates that this option in the dropdown is 'New message...'
     * and if selected, should trigger the prompt to create a new message.
     * @const {string}
     */
    var RENAME_BROADCAST_MESSAGE_ID: any /*missing*/;

    /**
     * String representing the variable type of broadcast message blocks.
     * This string, for use in differentiating between types of variables,
     * indicates that the current variable is a broadcast message.
     * @const {string}
     */
    var BROADCAST_MESSAGE_VARIABLE_TYPE: any /*missing*/;

    /**
     * String representing the variable type of bool blocks.
     * This string, for use in differentiating between types of variables,
     * indicates that the current variable is a boolean.
     * @const {string}
     */
    var BOOL_VARIABLE_TYPE: any /*missing*/;

    /**
     * String representing the variable type of list blocks.
     * This string, for use in differentiating between types of variables,
     * indicates that the current variable is a list.
     * @const {string}
     */
    var LIST_VARIABLE_TYPE: any /*missing*/;

    /**
     * String representing the variable type of 2d array blocks.
     * This string, for use in differentiating between types of variables,
     * indicates that the current variable is a 2d array.
     * @const {string}
     */
    var ARRAY2D_VARIABLE_TYPE: any /*missing*/;

    /**
     * String representing the variable type of scalar variables.
     * This string, for use in differentiating between types of variables,
     * indicates that the current variable is a scalar variable.
     * @const {string}
     */
    var SCALAR_VARIABLE_TYPE: any /*missing*/;

    /**
     * The type of all procedure definition blocks.
     * @const {string}
     */
    var PROCEDURES_DEFINITION_BLOCK_TYPE: any /*missing*/;

    /**
     * The type of all procedure prototype blocks.
     * @const {string}
     */
    var PROCEDURES_PROTOTYPE_BLOCK_TYPE: any /*missing*/;

    /**
     * The type of all procedure call blocks.
     * @const {string}
     */
    var PROCEDURES_CALL_BLOCK_TYPE: any /*missing*/;

    /**
     * String for use in the "custom" attribute of a category in toolbox XML.
     * This string indicates that the category should be dynamically populated with
     * the typed variable blocks.
     * @const {string}
     */
    var VARIABLE_TYPED_CATEGORY_NAME: any /*missing*/;
}
