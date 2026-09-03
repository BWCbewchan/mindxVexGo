/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Text Area field.
 * @author fraser@google.com (Neil Fraser)
 * @author Andrew Mee
 * @author acbart@udel.edu (Austin Cory Bart)
 */
'use strict';

goog.provide('Blockly.FieldMultilineInput');

goog.require('Blockly.Css');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.FieldTextInput');
goog.require('Blockly.utils');
goog.require('Blockly.utils.aria');
goog.require('Blockly.utils.Coordinate');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.KeyCodes');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Svg');
goog.require('Blockly.utils.userAgent');


/**
 * Class for an editable text area field.
 * @param {string=} opt_value The initial content of the field. Should cast to a
 *    string. Defaults to an empty string if null or undefined.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a replacement
 *     text, or null to abort the change.
 * @param {Object=} opt_config A map of options used to configure the field.
 *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/text-input#creation}
 *    for a list of properties this parameter supports.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldMultilineInput = function(opt_value, opt_validator, opt_config) {
  // TODO: Once this field is documented the opt_config link should point to its
  //  creation documentation, rather than the text input field's.
  Blockly.FieldMultilineInput.superClass_.constructor.call(this,
      opt_value, opt_validator, opt_config);

  /**
   * The SVG group element that will contain a text element for each text row
   *     when initialized.
   * @type {SVGGElement}
   */
  this.textGroup_ = null;

  // RM Code Start
  /**
   * Property set by the custom editor system, used to handle dispose for the
   * custom editor before hiding the widget.
   * @type {function(): void}
   */
  this.customWidgetDispose_ = null;

  /**
   * property set by the config options. This tells the field if it should try
   * to use the custom editor/viewer options if they are configured. If the
   * custom editor/viewer options are not set, or this is false, the field will
   * use the standard editor/viewer system.
   * @type {boolean}
   */
  this.enableCustomEditor = (opt_config && opt_config['useCustomEditor']) || false;

  /**
   * Property is set by the config options to tell the renderer if the monospace
   * font class should be added to the element
   * @type {boolean}
   */
  this.useMonospaceFontClass = (opt_config && opt_config['useMonospaceFont']) || false;
  // RM Code End

};
Blockly.utils.object.inherits(Blockly.FieldMultilineInput,
    Blockly.FieldTextInput);

/**
 * Construct a FieldMultilineInput from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (text, and spellcheck).
 * @return {!Blockly.FieldMultilineInput} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldMultilineInput.fromJson = function(options) {
  var text = Blockly.utils.replaceMessageReferences(options['text']);
  return new Blockly.FieldMultilineInput(text, undefined, options);
};

/**
 * Serializes this field's value to XML. Should only be called by Blockly.Xml.
 * @param {!Element} fieldElement The element to populate with info about the
 *    field's state.
 * @return {!Element} The element containing info about the field's state.
 * @package
 */
Blockly.FieldMultilineInput.prototype.toXml = function(fieldElement) {
  // Replace '\n' characters with html-escaped equivalent '&#10'. This is
  // needed so the plain-text representation of the xml produced by
  // `Blockly.Xml.domToText` will appear on a single line (this is a limitation
  // of the plain-text format).
  fieldElement.textContent = this.getValue().replace(/\n/g, '&#10;');
  return fieldElement;
};

/**
 * Sets the field's value based on the given XML element. Should only be
 * called by Blockly.Xml.
 * @param {!Element} fieldElement The element containing info about the
 *    field's state.
 * @package
 */
Blockly.FieldMultilineInput.prototype.fromXml = function(fieldElement) {
  this.setValue(fieldElement.textContent.replace(/&#10;/g, '\n'));
};

/**
 * Create the block UI for this field.
 * @package
 */
Blockly.FieldMultilineInput.prototype.initView = function() {
  this.createBorderRect_();
  this.textGroup_ = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.G, {
        'class': 'blocklyEditableText',
      }, this.fieldGroup_);
};

/**
 * Get the text from this field as displayed on screen.  May differ from getText
 * due to ellipsis, and other formatting.
 * @return {string} Currently displayed text.
 * @private
 */
Blockly.FieldMultilineInput.prototype.getDisplayText_ = function() {
  var value = this.value_;
  if (!value) {
    // Prevent the field from disappearing if empty.
    return Blockly.Field.NBSP;
  }
  var lines = value.split('\n');
  value = '';
  for (var i = 0; i < lines.length; i++) {
    var text = lines[i];
    if (text.length > this.maxDisplayLength) {
      // Truncate displayed string and add an ellipsis ('...').
      text = text.substring(0, this.maxDisplayLength - 4) + '...';
    }
    // Replace whitespace with non-breaking spaces so the text doesn't collapse.
    text = text.replace(/\s/g, Blockly.Field.NBSP);

    value += text;
    if (i !== lines.length - 1) {
      value += '\n';
    }
  }
  if (this.sourceBlock_.RTL) {
    // The SVG is LTR, force value to be RTL.
    value += '\u200F';
  }
  return value;
};

/**
 * Updates the text of the textElement.
 * @protected
 */
Blockly.FieldMultilineInput.prototype.render_ = function() {
  // Remove all text group children.
  var currentChild;
  while ((currentChild = this.textGroup_.firstChild)) {
    this.textGroup_.removeChild(currentChild);
  }

  // Add in text elements into the group.
  var lines = this.getDisplayText_().split('\n');
  var y = 0;
  // RM Code Start
  var hasCustom = false;
  if (this.enableCustomEditor && Blockly.FieldMultilineInput.customViewer) {
    var customElem = Blockly.FieldMultilineInput.customViewer(
        this.textGroup_, this.getDisplayText_());
    if (customElem) {
      hasCustom = true;
    }
  }

  if (!hasCustom) {
  // RM Code End
    for (var i = 0; i < lines.length; i++) {
      var lineHeight = this.getConstants().FIELD_TEXT_HEIGHT +
          this.getConstants().FIELD_BORDER_RECT_Y_PADDING;

      // RM Code Start
      var classes = 'blocklyText blocklyMultilineText';
      if (this.useMonospaceFontClass) {
        classes = classes + ' blocklyMonospacedText';
      }
      // RM Code End
      var span = Blockly.utils.dom.createSvgElement(
          Blockly.utils.Svg.TEXT, {
            // RM Code Start
            'class': classes,
            // RM Code End
            x: this.getConstants().FIELD_BORDER_RECT_X_PADDING,
            y: y + this.getConstants().FIELD_BORDER_RECT_Y_PADDING,
            dy: this.getConstants().FIELD_TEXT_BASELINE
          }, this.textGroup_);
      span.appendChild(document.createTextNode(lines[i]));
      y += lineHeight;
    }
    // RM Code Start
  }
  // RM Code End
  this.updateSize_();

  if (this.isBeingEdited_) {
    if (this.sourceBlock_.RTL) {
      // in RTL, we need to let the browser reflow before resizing
      // in order to get the correct bounding box of the borderRect
      // avoiding issue #2777.
      setTimeout(this.resizeEditor_.bind(this), 0);
    } else {
      this.resizeEditor_();
    }
    var htmlInput = /** @type {!HTMLElement} */(this.htmlInput_);
    if (!this.isTextValid_) {
      Blockly.utils.dom.addClass(htmlInput, 'blocklyInvalidInput');
      Blockly.utils.aria.setState(htmlInput,
          Blockly.utils.aria.State.INVALID, true);
    } else {
      Blockly.utils.dom.removeClass(htmlInput, 'blocklyInvalidInput');
      Blockly.utils.aria.setState(htmlInput,
          Blockly.utils.aria.State.INVALID, false);
    }
  }
};

/**
 * Updates the size of the field based on the text.
 * @protected
 */
Blockly.FieldMultilineInput.prototype.updateSize_ = function() {
  var nodes = this.textGroup_.childNodes;
  var totalWidth = 0;
  var totalHeight = 0;
  for (var i = 0; i < nodes.length; i++) {
    var tspan = /** @type {!Element} */ (nodes[i]);
    var textWidth = Blockly.utils.dom.getTextWidth(tspan);
    if (textWidth > totalWidth) {
      totalWidth = textWidth;
    }
    totalHeight += this.getConstants().FIELD_TEXT_HEIGHT +
        (i > 0 ? this.getConstants().FIELD_BORDER_RECT_Y_PADDING : 0);
  }
  if (this.borderRect_) {
    totalHeight += this.getConstants().FIELD_BORDER_RECT_Y_PADDING * 2;
    totalWidth += this.getConstants().FIELD_BORDER_RECT_X_PADDING * 2;
    // RM Code Start
    // if using custom editor, add some padding...
    if (this.isBeingEdited_ &&
        this.enableCustomEditor &&
        Blockly.FieldMultilineInput.customEditor) {
      totalWidth += 20;
    }
    // RM Code End
    this.borderRect_.setAttribute('width', totalWidth);
    this.borderRect_.setAttribute('height', totalHeight);
  }
  this.size_.width = Math.max(totalWidth, this.minDisplayWidth);
  this.size_.height = totalHeight;

  this.positionBorderRect_();
};

/**
 * Create the text input editor widget.
 * @return {!HTMLTextAreaElement} The newly created text input editor.
 * @protected
 */
Blockly.FieldMultilineInput.prototype.widgetCreate_ = function() {
  var div = Blockly.WidgetDiv.DIV;
  var scale = this.workspace_.getScale();

  var htmlInput =
    /** @type {HTMLTextAreaElement} */ (document.createElement('textarea'));
  // RM Code Start
  // we want to have a way to change the text to mono space
  var classes = 'blocklyHtmlInput blocklyHtmlTextAreaInput';
  if (this.useMonospaceFontClass) {
    classes = classes + ' blocklyMonospacedText';
  }
  htmlInput.className = classes;
  // RM Code End
  htmlInput.setAttribute('spellcheck', this.spellcheck_);
  var fontSize = (this.getConstants().FIELD_TEXT_FONTSIZE * scale) + 'pt';
  div.style.fontSize = fontSize;
  htmlInput.style.fontSize = fontSize;
  var borderRadius = (Blockly.FieldTextInput.BORDERRADIUS * scale) + 'px';
  htmlInput.style.borderRadius = borderRadius;
  var paddingX = this.getConstants().FIELD_BORDER_RECT_X_PADDING * scale;
  var paddingY = this.getConstants().FIELD_BORDER_RECT_Y_PADDING * scale / 2;
  htmlInput.style.padding = paddingY + 'px ' + paddingX + 'px ' + paddingY +
      'px ' + paddingX + 'px';
  var lineHeight = this.getConstants().FIELD_TEXT_HEIGHT +
      this.getConstants().FIELD_BORDER_RECT_Y_PADDING;
  htmlInput.style.lineHeight = (lineHeight * scale) + 'px';

  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.getEditorText_(this.value_);
  htmlInput.untypedDefaultValue_ = this.value_;
  htmlInput.oldValue_ = null;
  if (Blockly.utils.userAgent.GECKO) {
    // In FF, ensure the browser reflows before resizing to avoid issue #2777.
    setTimeout(this.resizeEditor_.bind(this), 0);
  } else {
    this.resizeEditor_();
  }

  // RM Code Start
  // the custom editor needs to happen after the default as the default sets the size
  if (this.enableCustomEditor && Blockly.FieldMultilineInput.customEditor) {
    var currentValue = this.getEditorText_(this.value_);

    var onChange = function(value) {
      // console.log("blockly got change event", value);
      // This is based on this.onHtmlInputChange_

      var value = this.getValueFromEditorText_(value);
      if (value !== this.value_) {
        console.log("updating input value");
        Blockly.Events.setGroup(true);
        this.setValue(value);
        this.forceRerender();
        this.resizeEditor_();
        Blockly.Events.setGroup(false);
      }
    };
    onChange = onChange.bind(this);

    var onCancel = function() {
      // this is pulled from Blockly.FieldTextInput.prototype.onHtmlInputKeyDown_
      this.htmlInput_.value = this.htmlInput_.defaultValue;
      Blockly.WidgetDiv.hide();
      Blockly.DropDownDiv.hideWithoutAnimation();
    };
    onCancel = onCancel.bind(this);

    var returnDisposeFunc = function(func) {
      this.customWidgetDispose_ = func;
    };
    returnDisposeFunc = returnDisposeFunc.bind(this);

    var customElem = Blockly.FieldMultilineInput.customEditor(
        div, currentValue, scale, onChange, onCancel, returnDisposeFunc);
    if (customElem) {
      customElem.oldValue_ = null;
      // force update to make sure we have the desired padding
      // this needs a delay as some things get set after widgetCreate_ returns
      setTimeout(function() {
        this.updateSize_();
        this.resizeEditor_();
        this.render_();
        // this.forceRerender();
        this.sourceBlock_.render();
        this.resizeEditor_();
        document.dispatchEvent(new Event("layout"));
      }.bind(this), 100);
      return customElem;
    }
  }
  // RM Code End

  this.bindInputEvents_(htmlInput);

  return htmlInput;
};

// RM Code Start
/**
 * Closes the editor, saves the results, and disposes of any events or
 * dom-references belonging to the editor.
 * @private
 */
Blockly.FieldMultilineInput.prototype.widgetDispose_ = function() {
  if (this.customWidgetDispose_) {
    console.log("trigger removal of monaco");
    this.customWidgetDispose_();
    this.customWidgetDispose_ = null;
  }
  Blockly.FieldMultilineInput.superClass_.widgetDispose_.call(this);
};
// RM Code End

/**
 * Handle key down to the editor. Override the text input definition of this
 * so as to not close the editor when enter is typed in.
 * @param {!Event} e Keyboard event.
 * @protected
 */
Blockly.FieldMultilineInput.prototype.onHtmlInputKeyDown_ = function(e) {
  if (e.keyCode !== Blockly.utils.KeyCodes.ENTER) {
    Blockly.FieldMultilineInput.superClass_.onHtmlInputKeyDown_.call(this, e);
  }
};

// Region RM Code Start
/**
 * @param containerDiv the div that will contain the custom editor
 * @param currentValue the starting value to display in the editor
 * @param scale the current scale of the workspace
 * @param onChangeCallback a callback function that will get called any
 * time the value in the editor changes
 * @param onCancelCallback a callback function that will get called any
 * time editor detects that the escape button is pressed.
 * @param setDisposeFunction a function that gets called to tell Blockly
 * what function to call to handle disposing of the custom editor.
 * @returns a value (not undefined) if a custom editor was created
 * @typedef {(
 *     containerDiv: HTMLDivElement,
 *     currentValue: string,
 *     scale: number,
 *     onChangeCallback: (newValue: string) => void,
 *     onCancelCallback: () => void,
 *     setDisposeFunction: (disposeFunction: () => void) => void
 * ) => any}
 */
Blockly.FieldMultilineInput.CustomEditorFunction;

/**
 * @param containerDiv the div that will contain the custom viewer
 * @param currentValue the starting value to display in the viewer
 * @returns a value (not undefined) if a custom viewer was created
 * @typedef {(
 *     containerDiv: HTMLDivElement,
 *     currentValue: string,
 * ) => boolean}
 */
Blockly.FieldMultilineInput.CustomViewerFunction;

/**
 * a function that can be set to override the default editor used by the multiline input
 * @type {Blockly.FieldMultilineInput.CustomEditorFunction}
 */
Blockly.FieldMultilineInput.customEditor = null;
/**
 * a function that can be set to override the default viewer used by the multiline input
 * @type {Blockly.FieldMultilineInput.CustomViewerFunction}
 */
Blockly.FieldMultilineInput.customViewer = null;
// Region RM Code End

/**
 * CSS for multiline field.  See css.js for use.
 */
Blockly.Css.register([
  /* eslint-disable indent */
  '.blocklyHtmlTextAreaInput {',
    'font-family: monospace;',
    'resize: none;',
    'overflow: hidden;',
    'height: 100%;',
    'text-align: left;',
  '}'
  /* eslint-enable indent */
]);


Blockly.fieldRegistry.register('field_multilinetext', Blockly.FieldMultilineInput);
