/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Image field.  Used for pictures, icons, etc.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldMutatorTogle');

goog.require('Blockly.Events');
goog.require('Blockly.Field');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.navigation');
goog.require('Blockly.utils');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Size');
goog.require('Blockly.utils.Svg');

/**
 * Class for an FieldMutatorTogle on a block.
 * @param {boolean|string} active true if the mutation is active.
 * @param {string} expandedText the text to display when the mutator is expanded
 * @param {Function} callback callback for when the mutator is toggled.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldMutatorTogle = function(active, expandedText, callback) {
  Blockly.FieldMutatorTogle.superClass_.constructor.call(this, '', null);

  this.leftSVG = '';
  this.rightSVG = '';

  /**
   * SVG based arrow element.
   * @type {SVGElement}
   * @private
   */
  this.svgArrow_ = null;

  this.callback = callback;
  this.expandedText_ = expandedText;
  this.setValue(active);
};
Blockly.utils.object.inherits(Blockly.FieldMutatorTogle, Blockly.Field);

/**
 * Construct a FieldMutatorTogle from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (active, callback).
 * @returns {!Blockly.FieldMutatorTogle} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldMutatorTogle.fromJson = function(options) {
  const active = Blockly.utils.replaceMessageReferences(options['active'] ? "TRUE" : "FALSE");
  const expendedText = Blockly.utils.replaceMessageReferences(options['expandedText'] ? options['expandedText'] : "");
  const callback = options['callback'];

  return new Blockly.FieldMutatorTogle(active, expendedText, callback);
};

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldMutatorTogle.prototype.EDITABLE = true;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not.  Editable fields should be serialized.
 * @type {boolean}
 * @public
 */
Blockly.FieldMutatorTogle.prototype.SERIALIZABLE = true;

/**
 * Mouse cursor style when over the hotspot that initiates editability.
 */
Blockly.FieldMutatorTogle.prototype.CURSOR = 'default';

/**
 * Create the block UI for this field.
 * @package
 */
Blockly.FieldMutatorTogle.prototype.initView = function() {
  // find the media path. this needs to deal with the fact that flyouts don't
  // have the path option data.
  const sb = this.sourceBlock_;
  const workspace = sb.isInFlyout ? sb.workspace.targetWorkspace : sb.workspace;
  const mediaPath = workspace.options.pathToMedia;

  // this should not change once the workspace has been created...
  this.leftSVG = mediaPath + 'mutator-arrow-dark-left.svg';
  this.rightSVG = mediaPath + 'mutator-arrow-dark-right.svg';

  // create the element for displaying the text
  this.createTextElement_();
  Blockly.utils.dom.addClass(this.textElement_, 'blocklyEditableText');

  // create the arrow svg element for displaying the arrow
  this.createSVGArrow_();
  this.updateArrowSVG_()
};

/**
 * Dispose of all DOM objects belonging to this text.
 */
Blockly.FieldMutatorTogle.prototype.dispose = function() {
  this.svgArrow_ = null;
  Blockly.FieldMutatorTogle.superClass_.dispose.call(this);
};

/**
 * Ensure that the input value is valid.
 * @param {(string|boolean)=} newValue The input value.
 * @return {?boolean} A valid value, or null if invalid.
 * @protected
 */
Blockly.FieldMutatorTogle.prototype.doClassValidation_ = function(newValue) {
  if (newValue === null || newValue === undefined) {
    return null;
  }

  if (typeof newValue === 'string') {
    const newValueCap = newValue.toUpperCase();
    if (newValueCap === 'TRUE' || newValueCap === 'FALSE') {
      return newValueCap === 'TRUE';
    }
    return null;
  }

  return !!newValue
};

/**
 * Update the value of this dropdown field.
 * @param {boolean} newValue The value to be saved. The default validator guarantees
 * that this is one of the valid dropdown options.
 * @protected
 */
Blockly.FieldMutatorTogle.prototype.doValueUpdate_ = function(newValue) {
  Blockly.FieldMutatorTogle.superClass_.doValueUpdate_.call(this, newValue);

  // this is the only reason we override this
  if (this.callback) {
    this.callback(newValue);
  }
};

/**
 * Draws the border with the correct width.
 * @protected
 */
Blockly.FieldMutatorTogle.prototype.render_ = function() {
  const constants = this.getConstants();
  const rtl = this.sourceBlock_.RTL;

  // we do not want the editable class...
  Blockly.utils.dom.removeClass(this.fieldGroup_, 'blocklyEditableText');

  // update the arrow
  this.updateArrowSVG_();
  const arrowSize = this.getConstants().FIELD_MUTATORTOGGLE_SVG_ARROW_SIZE;

  // update the text label
  if (this.textContent_) {
    this.textContent_.nodeValue = this.getDisplayText_();
  }

  // find out how wide the text is
  const textWidth = Blockly.utils.dom.getFastTextWidth(this.textElement_,
    constants.FIELD_TEXT_FONTSIZE,
    constants.FIELD_TEXT_FONTWEIGHT,
    constants.FIELD_TEXT_FONTFAMILY);
  
  // update the field size
  const totalWidth = arrowSize + textWidth + constants.FIELD_BORDER_RECT_X_PADDING;
  this.size_.width = totalWidth;

  // find positions
  const height = this.size_.height;
  const arrowX = rtl ? textWidth + arrowSize/2 : 0;

  // position the arrow
  this.positionSVGArrow_(arrowX, height/2 - arrowSize/2);

  // place the text after the arrow
  this.positionTextElement_(arrowSize, textWidth);
};

/**
 * Renders the selected option, which must be text.
 * @private
 */
 Blockly.FieldMutatorTogle.prototype.updateArrowSVG_ = function() {
  // logic to know which image to use for open/close arrows with RTL or LTR mode
  const rtl = this.sourceBlock_ ? this.sourceBlock_.RTL : false;
  const openSVG = rtl ? this.rightSVG : this.leftSVG;
  const closeSVG = rtl ? this.leftSVG : this.rightSVG;

  // figure out what arrow and what text to display
  const arrow = this.value_ ? openSVG : closeSVG;

  this.svgArrow_.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', arrow);
};

/**
 * Position a drop-down arrow at the appropriate location at render-time.
 * @param {number} x X position the arrow is being rendered at, in px.
 * @param {number} y Y position the arrow is being rendered at, in px.
 * @private
 */
Blockly.FieldMutatorTogle.prototype.positionSVGArrow_ = function(x, y) {
  if (!this.svgArrow_) {
    return;
  }
  this.svgArrow_.setAttribute('transform',
      'translate(' + x + ',' + y + ')');
};

/**
 * Toggle the state of the mutator toggle.
 * @private
 */
Blockly.FieldMutatorTogle.prototype.showEditor_ = function() {
  var newState = !this.value_;
  if (newState !== null) {
    this.setValue(newState);
  }
};

/**
 * Create an SVG based arrow.
 * @protected
 */
Blockly.FieldMutatorTogle.prototype.createSVGArrow_ = function() {
  this.svgArrow_ = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.IMAGE, {
        'height': this.getConstants().FIELD_MUTATORTOGGLE_SVG_ARROW_SIZE + 'px',
        'width': this.getConstants().FIELD_MUTATORTOGGLE_SVG_ARROW_SIZE + 'px'
      }, this.fieldGroup_);
};

/**
 * Use the `getText_` developer hook to override the field's text
 * representation.
 * @return {?string} the text to display after the mutator arrow
 * @protected
 * @override
 */
 Blockly.FieldMutatorTogle.prototype.getDisplayText_ = function() {
  return this.value_ ? this.expandedText_ : '';
};

// /**
//  * Updates the width of the field. This calls getCachedWidth which won't cache
//  * the approximated width on IE/Edge when `getComputedTextLength` fails. Once
//  * it eventually does succeed, the result will be cached.
//  **/
// Blockly.FieldMutatorTogle.prototype.updateWidth = function() {
//   // Calculate width of field
//   var width = Blockly.Field.getCachedWidth(this.textElement_);

//   // // Add padding to left and right of text.
//   // if (this.EDITABLE) {
//   //   width += Blockly.BlockSvg.EDITABLE_FIELD_PADDING;
//   // }

//   // Adjust width for drop-down arrows.
//   // this.arrowWidth_ = 0;
//   // if (this.positionArrow) {
//   //   this.arrowWidth_ = this.positionArrow(width);
//   //   width += this.arrowWidth_;
//   // }

//   // Add padding to any drawn box.
//   if (this.box_) {
//     width += 2 * Blockly.BlockSvg.BOX_FIELD_PADDING;
//   }

//   // Set width of the field.
//   this.size_.width = width;
// };

Blockly.fieldRegistry.register('field_mutatortoggle', Blockly.FieldMutatorTogle);
