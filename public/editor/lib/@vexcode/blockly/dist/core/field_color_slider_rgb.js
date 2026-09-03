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
 * @fileoverview Colour input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldColourSliderRGB');

goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.utils.colour');
goog.require('Blockly.utils.dom');
// goog.require('Blockly.utils.Slider');

goog.require('goog.ui.Slider');

/**
 * Class for a slider-based colour input field.
 * @param {string} colour The initial colour in '#rrggbb' format.
 * @param {Function=} opt_validator A function that is executed when a new
 *     colour is selected.  Its sole argument is the new colour value.  Its
 *     return value becomes the selected colour, unless it is undefined, in
 *     which case the new colour stands, or it is null, in which case the change
 *     is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldColourSliderRGB = function (colour, opt_validator) {
  Blockly.FieldColourSliderRGB.superClass_.constructor.call(this, colour, opt_validator);

  // Flag to track whether or not the slider callbacks should execute
  this.sliderCallbacksEnabled_ = false;
};
goog.inherits(Blockly.FieldColourSliderRGB, Blockly.Field);

/**
 * Construct a FieldColourSliderRGB from a JSON arg object.
 * @param {!Object} options A JSON object with options (colour).
 * @returns {!Blockly.FieldColourSliderRGB} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldColourSliderRGB.fromJson = function (options) {
  return new Blockly.FieldColourSliderRGB(options['colour']);
};

/**
 * @override
 */
Blockly.FieldColour.prototype.applyColour = function () {
  const colorStr = this.getValue().slice(0, -2);
  if (!this.getConstants().FIELD_COLOUR_FULL_BLOCK) {
    if (this.borderRect_) {
      this.borderRect_.style.fill = colorStr;
    }
  } else {
    this.sourceBlock_.pathObject.svgPath.setAttribute('fill', colorStr);
    this.sourceBlock_.pathObject.svgPath.setAttribute('stroke', '#fff');
  }
};

/**
 * Install this field on a block.
 */
Blockly.FieldColourSliderRGB.prototype.init = function () {
  if (this.fieldGroup_) {
    // Colour slider has already been initialized once.
    return;
  }
  Blockly.FieldColourSliderRGB.superClass_.init.call(this);
  this.setValue(this.getValue());
};

/**
 * Create the block UI for this field.
 * @package
 */
 Blockly.Field.prototype.initView = function() {
  if (this.sourceBlock_) {
    this.clickTarget_ = this.sourceBlock_.getSvgRoot();
  }

  this.createTextElement_();
};

/**
 * Return the current colour.
 * @return {string} Current colour in '#rrggbbaa' format.
 */
Blockly.FieldColourSliderRGB.prototype.getValue = function () {
  return this.colour_ + this.hexOpacity_;
};

/**
 * Ensure that the input value is a valid colour.
 * @param {*=} opt_newValue The input value.
 * @return {?string} A valid colour, or null if invalid.
 * @protected
 */
Blockly.FieldColourSliderRGB.prototype.doClassValidation_ = function (opt_newValue) {
  // pulled from Blockly.FieldColour.prototype.doClassValidation_
  if (typeof opt_newValue != 'string') {
    return null;
  }
  return Blockly.utils.colour.parse(opt_newValue);
};

/**
 * Update the value of this colour field, and update the displayed colour.
 * @param {*} colour The value to be saved. The default validator guarantees
 * that this is a colour in '#rrggbb' format.
 * @protected
 */
Blockly.FieldColourSliderRGB.prototype.doValueUpdate_ = function (colour) {
  this.value_ = colour;
  var trimmedColor = colour;
  var tmpOpacity = "";
  // If the color coming through is rgba or rgb
  if (this.isRGBA(colour)) {
    trimmedColor = colour.substring(0, colour.length - 2);
    tmpOpacity = colour.slice(-2);
    this.opacityValue_ = parseInt(tmpOpacity, 16) / 255;
  } else {
    tmpOpacity = "";
    this.opacityValue_ = 1;
  }


  this.colour_ = trimmedColor;
  this.hexOpacity_ = tmpOpacity;

  if (this.sourceBlock_) {
    // Set the primary, secondary and tertiary colour to this value.
    // The renderer expects to be able to use the secondary colour as the fill for a shadow.
    var addedOpacityColor = this.getOpacityColor(trimmedColor, this.opacityValue_);
    this.sourceBlock_.setColour(addedOpacityColor, addedOpacityColor);
  }
  this.updateSliderHandles_();
  this.updateDom_();
};


Blockly.FieldColourSliderRGB.prototype.getOpacityColor = function (colorHex, hexOpacity) {
  colorHex = colorHex.substring(1);
  hexOpacity = 1 - hexOpacity;

  var r = Math.trunc(parseInt(colorHex.slice(0, 2), 16) + (hexOpacity * 255));
  var g = Math.trunc(parseInt(colorHex.slice(2, 4), 16) + (hexOpacity * 255));
  var b = Math.trunc(parseInt(colorHex.slice(4), 16) + (hexOpacity * 255));

  if (r > 255) {
    r = 255;
  }

  if (g > 255) {
    g = 255;
  }

  if (b > 255) {
    b = 255;
  }

  return Blockly.utils.colour.rgbToHex(r, g, b);
}

/**
 * Create the hue, saturation or value CSS gradient for the slide backgrounds.
 * @param {string} channel – Either "hue", "saturation" or "value".
 * @return {string} Array colour hex colour stops for the given channel
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.createColourStops_ = function (channel) {
  var stops = [];
  for (var n = 0; n <= 255; n += 20) {
    switch (channel) {
      case 'red':
        stops.push(Blockly.utils.colour.rgbToHex(this.red_, 0, 0));
        break;
      case 'green':
        stops.push(Blockly.utils.colour.rgbToHex(0, this.green_, 0));
        break;
      case 'blue':
        stops.push(Blockly.utils.colour.rgbToHex(0, 0, this.blue_));
        break;
      case 'alpha':
        stops.push(Blockly.utils.colour.rgbaToHex(this.red_, this.green_, this.blue_, (n / 255)));
        break;
      default:
        throw new Error("Unknown channel for colour sliders: " + channel);
    }
  }
  return stops;
};

/**
 * Set the gradient CSS properties for the given node and channel
 * @param {Node} node - The DOM node the gradient will be set on.
 * @param {string} channel – Either "hue", "saturation" or "value".
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.setGradient_ = function (node, channel) {
  // TODO: get this working without closure
  var gradient = this.createColourStops_(channel).join(',');
  goog.style.setStyle(node, 'background',
    '-moz-linear-gradient(left, ' + gradient + ')');
  goog.style.setStyle(node, 'background',
    '-webkit-linear-gradient(left, ' + gradient + ')');
  goog.style.setStyle(node, 'background',
    '-o-linear-gradient(left, ' + gradient + ')');
  goog.style.setStyle(node, 'background',
    '-ms-linear-gradient(left, ' + gradient + ')');
  goog.style.setStyle(node, 'background',
    'linear-gradient(left, ' + gradient + ')');
};

/**
 * Update the readouts and slider backgrounds after value has changed.
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.updateDom_ = function () {
  if (this.redSlider_) {
    // Update the slider backgrounds
    this.setGradient_(this.redSlider_.getElement(), 'red');
    this.setGradient_(this.greenSlider_.getElement(), 'green');
    this.setGradient_(this.blueSlider_.getElement(), 'blue');
    this.setGradient_(this.alphaSlider_.getElement(), 'alpha');

    // Update the readouts
    this.redReadout_.textContent = Math.floor(this.red_).toFixed(0);
    this.greenReadout_.textContent = Math.floor(this.green_).toFixed(0);
    this.blueReadout_.textContent = Math.floor(this.blue_).toFixed(0);
    this.alphaReadout_.textContent = Math.floor(this.alpha_ * 100).toFixed(0);
  }
};

/**
 * Update the slider handle positions from the current field value.
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.updateSliderHandles_ = function () {
  if (this.redSlider_) {
    // Don't let the following calls to setValue for each of the sliders
    // trigger the slider callbacks (which then call setValue on this field again
    // unnecessarily)
    this.sliderCallbacksEnabled_ = false;
    this.redSlider_.setValue(this.red_);
    this.greenSlider_.setValue(this.green_);
    this.blueSlider_.setValue(this.blue_);
    this.alphaSlider_.setValue(Math.floor(this.alpha_ * 100));
    this.sliderCallbacksEnabled_ = true;
  }
};

/**
 * Get the text from this field.  Used when the block is collapsed.
 * @return {string} Current text.
 */
Blockly.FieldColourSliderRGB.prototype.getText = function () {
  // we don't want to display anything...
  return "";
};

/**
 * Create label and readout DOM elements, returning the readout
 * @param {string} labelText - Text for the label
 * @return {Array} The container node and the readout node.
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.createLabelDom_ = function (labelText) {
  var labelContainer = document.createElement('div');
  labelContainer.setAttribute('class', 'scratchColourPickerLabel');
  var readout = document.createElement('span');
  readout.setAttribute('class', 'scratchColourPickerReadout');
  var label = document.createElement('span');
  label.setAttribute('class', 'scratchColourPickerLabelText');
  label.textContent = labelText;
  labelContainer.appendChild(label);
  labelContainer.appendChild(readout);
  return [labelContainer, readout];
};

/**
 * Factory for creating the different slider callbacks
 * @param {string} channel - One of "hue", "saturation" or "brightness"
 * @return {function} the callback for slider update
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.sliderCallbackFactory_ = function (channel) {
  var thisField = this;
  return function (event) {
    if (!thisField.sliderCallbacksEnabled_) return;
    var channelValue = event.target.getValue();
    switch (channel) {
      case 'red':
        thisField.red_ = channelValue;
        break;
      case 'green':
        thisField.green_ = channelValue;
        break;
      case 'blue':
        thisField.blue_ = channelValue;
        break;
      case 'alpha':
        thisField.alpha_ = channelValue / 100;
        break;
    }
    var colurAlpha = Blockly.utils.colour.rgbaToHex(thisField.red_, thisField.green_, thisField.blue_, thisField.alpha_);
    if (colurAlpha !== null) {
      thisField.setValue(colurAlpha, true);
    }
  };
};

/**
 * Create hue, saturation and brightness sliders under the colour field.
 * @private
 */
Blockly.FieldColourSliderRGB.prototype.showEditor_ = function () {
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  var div = Blockly.DropDownDiv.getContentDiv();

  // Init color component values that are used while the editor is open
  // in order to keep the slider values stable.
  var colorValue = this.getValue();
  var rgba = Blockly.utils.colour.hexToRgba(colorValue);
  this.red_ = rgba[0];
  this.green_ = rgba[1];
  this.blue_ = rgba[2];
  this.alpha_ = Math.ceil(rgba[3] * 100) / 100;


  // TODO: get this working without closure

  var redElements = this.createLabelDom_(Blockly.Msg.COLOUR_RED_LABEL);
  div.appendChild(redElements[0]);
  this.redReadout_ = redElements[1];
  this.redSlider_ = new goog.ui.Slider();
  this.redSlider_.setUnitIncrement(1);
  this.redSlider_.setMinimum(0);
  this.redSlider_.setMaximum(255);
  this.redSlider_.setMoveToPointEnabled(true);
  this.redSlider_.render(div);

  var greenElements =
    this.createLabelDom_(Blockly.Msg.COLOUR_GREEN_LABEL);
  div.appendChild(greenElements[0]);
  this.greenReadout_ = greenElements[1];
  this.greenSlider_ = new goog.ui.Slider();
  this.greenSlider_.setMoveToPointEnabled(true);
  this.greenSlider_.setUnitIncrement(1);
  this.greenSlider_.setStep(1);
  this.greenSlider_.setMinimum(0);
  this.greenSlider_.setMaximum(255);
  this.greenSlider_.render(div);

  var blueElements =
    this.createLabelDom_(Blockly.Msg.COLOUR_BLUE_LABEL);
  div.appendChild(blueElements[0]);
  this.blueReadout_ = blueElements[1];
  this.blueSlider_ = new goog.ui.Slider();
  this.blueSlider_.setUnitIncrement(1);
  this.blueSlider_.setMinimum(0);
  this.blueSlider_.setMaximum(255);
  this.blueSlider_.setMoveToPointEnabled(true);
  this.blueSlider_.render(div);

  var alphaElements =
    this.createLabelDom_(Blockly.Msg.COLOUR_OPACITY_LABEL);
  div.appendChild(alphaElements[0]);
  this.alphaReadout_ = alphaElements[1];
  this.alphaSlider_ = new goog.ui.Slider();
  this.alphaSlider_.setUnitIncrement(1);
  this.alphaSlider_.setMinimum(0);
  this.alphaSlider_.setMaximum(100);
  this.alphaSlider_.setMoveToPointEnabled(true);
  this.alphaSlider_.render(div);

  Blockly.DropDownDiv.setColour('#ffffff', '#dddddd');
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

  // Set value updates the slider positions
  // Do this before attaching callbacks to avoid extra events from initial set
  this.updateSliderHandles_();
  this.updateDom_();

  // Enable callbacks for the sliders
  this.sliderCallbacksEnabled_ = true;

  Blockly.FieldColourSliderRGB.redChangeEventKey_ = Blockly.bindEventWithChecks_(
    this.redSlider_,
    'change',
    null,
    this.sliderCallbackFactory_('red'));
  Blockly.FieldColourSliderRGB.greenChangeEventKey_ = Blockly.bindEventWithChecks_(
    this.greenSlider_,
    'change',
    null,
    this.sliderCallbackFactory_('green'));
  Blockly.FieldColourSliderRGB.blueChangeEventKey_ = Blockly.bindEventWithChecks_(
    this.blueSlider_,
    'change',
    null,
    this.sliderCallbackFactory_('blue'));
  Blockly.FieldColourSliderRGB.alphaChangeEventKey_ = Blockly.bindEventWithChecks_(
    this.alphaSlider_,
    'change',
    null,
    this.sliderCallbackFactory_('alpha'));
};

Blockly.FieldColourSliderRGB.prototype.isRGBA = function (colorString) {
  return colorString.length === 9 || colorString.length === 5;
}

Blockly.FieldColourSliderRGB.prototype.dispose = function () {
  if (Blockly.FieldColourSliderRGB.redChangeEventKey_) {
    Blockly.unbindEvent_(Blockly.FieldColourSliderRGB.redChangeEventKey_);
    Blockly.FieldColourSliderRGB.redChangeEventKey_ = null;
  }
  if (Blockly.FieldColourSliderRGB.greenChangeEventKey_) {
    Blockly.unbindEvent_(Blockly.FieldColourSliderRGB.greenChangeEventKey_);
    Blockly.FieldColourSliderRGB.greenChangeEventKey_ = null;
  }
  if (Blockly.FieldColourSliderRGB.blueChangeEventKey_) {
    Blockly.unbindEvent_(Blockly.FieldColourSliderRGB.blueChangeEventKey_);
    Blockly.FieldColourSliderRGB.blueChangeEventKey_ = null;
  }
  if (Blockly.FieldColourSliderRGB.alphaChangeEventKey_) {
    Blockly.unbindEvent_(Blockly.FieldColourSliderRGB.alphaChangeEventKey_);
    Blockly.FieldColourSliderRGB.alphaChangeEventKey_ = null;
  }
  Blockly.Events.setGroup(false);
  Blockly.FieldColourSliderRGB.superClass_.dispose.call(this);
};

Blockly.fieldRegistry.register('field_colour_slider_rgb', Blockly.FieldColourSliderRGB);
