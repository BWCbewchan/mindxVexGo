/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An object that owns a block's rendering SVG elements.
 * @author samelh@google.com (Sam El-Husseini)
 */

'use strict';

goog.provide('Blockly.zelos.PathObject');

goog.require('Blockly.blockRendering.PathObject');
goog.require('Blockly.zelos.ConstantProvider');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Svg');


/**
 * An object that handles creating and setting each of the SVG elements
 * used by the renderer.
 * @param {!SVGElement} root The root SVG element.
 * @param {!Blockly.Theme.BlockStyle} style The style object to use for
 *     colouring.
 * @param {!Blockly.zelos.ConstantProvider} constants The renderer's constants.
 * @constructor
 * @extends {Blockly.blockRendering.PathObject}
 * @package
 */
Blockly.zelos.PathObject = function(root, style, constants) {
  Blockly.zelos.PathObject.superClass_.constructor.call(this, root, style,
      constants);

  /**
   * The renderer's constant provider.
   * @type {!Blockly.zelos.ConstantProvider}
   */
  this.constants = constants;

  /**
   * The selected path of the block.
   * @type {SVGElement}
   * @private
   */
  this.svgPathSelected_ = null;

  /**
   * The outline paths on the block.
   * @type {!Object.<string,!SVGElement>}
   * @private
   */
  this.outlines_ = {};

  /**
   * A set used to determine which outlines were used during a draw pass.  The
   * set is initialized with a reference to all the outlines in
   * `this.outlines_`. Every time we use an outline during the draw pass, the
   * reference is removed from this set.
   * @type {Object.<string, number>}
   * @private
   */
  this.remainingOutlines_ = null;

  /**
   * The type of block's output connection shape.  This is set when a block with
   * an output connection is drawn.
   * @package
   */
  this.outputShapeType = null;

  // RM Code Start
  /**
   * indicates if the block is selected
   * @type {boolean}
   * @private
   */
  this.isSelected_ = false;

  /**
   * indicates if the block is selected
   * @type {boolean}
   * @private
   */
  this.isHighlighted_ = false;
  // RM Code End
};
Blockly.utils.object.inherits(Blockly.zelos.PathObject,
    Blockly.blockRendering.PathObject);

/**
 * @override
 */
Blockly.zelos.PathObject.prototype.setPath = function(pathString) {
  Blockly.zelos.PathObject.superClass_.setPath.call(this, pathString);
  if (this.svgPathSelected_) {
    this.svgPathSelected_.setAttribute('d', pathString);
  }
};

/**
 * @override
 */
Blockly.zelos.PathObject.prototype.applyColour = function(block) {
  Blockly.zelos.PathObject.superClass_.applyColour.call(this, block);
  // Set shadow stroke colour.
  if (block.isShadow() && block.getParent()) {
    this.svgPath.setAttribute('stroke', block.getParent().style.colourTertiary);
  }

  // Apply colour to outlines.
  for (var i = 0, keys = Object.keys(this.outlines_),
    key; (key = keys[i]); i++) {
    this.outlines_[key].setAttribute('fill', this.style.colourTertiary);
  }
};

/**
 * @override
 */
Blockly.zelos.PathObject.prototype.flipRTL = function() {
  Blockly.zelos.PathObject.superClass_.flipRTL.call(this);
  // Mirror each input outline path.
  for (var i = 0, keys = Object.keys(this.outlines_),
    key; (key = keys[i]); i++) {
    this.outlines_[key].setAttribute('transform', 'scale(-1 1)');
  }
};

/**
 * @override
 */
Blockly.zelos.PathObject.prototype.updateSelected = function(enable) {
  // RM Code Start
  // the code that was here is now in theis helper function with some changes
  this.updateStyle_(enable, this.isHighlighted_);
  // RM Code End
};

// RM Code Start
/**
 * @override
 */
Blockly.zelos.PathObject.prototype.updateHighlighted = function(enable) {
  this.updateStyle_(this.isSelected_, enable);
};

/**
 * updates the style any time the highlight or selected values change
 * @param {boolean} newSelected True if selection is enabled, false otherwise.
 * @param {boolean} newHighlighted True if highlight is enabled, false otherwise.
 * @private
 */
Blockly.zelos.PathObject.prototype.updateStyle_ = function(newSelected, newHighlighted) {
  // check to see what changed
  var didSelectedChange = newSelected !== this.isSelected_;
  var didHighlightedChange = newHighlighted !== this.isHighlighted_;

  // store new values
  this.isSelected_ = newSelected;
  this.isHighlighted_ = newHighlighted;

  // start with highlight style
  if (this.isHighlighted_) {
    // only update the highlight style if the highlight changed
    if (didHighlightedChange) {
      this.setClass_('blocklySelected', false);
      this.setClass_('blocklyHighlighted', true);

      // remove the existing path
      if (this.svgPathSelected_) {
        this.svgRoot.removeChild(this.svgPathSelected_);
        this.svgPathSelected_ = null;
      }
  
      this.svgPathSelected_ =
        /** @type {!SVGElement} */ (this.svgPath.cloneNode(true));
      this.svgPathSelected_.setAttribute('fill', 'none');
      this.svgPathSelected_.setAttribute('filter',
          'url(#' + this.constants.highlightedGlowFilterId + ')');
      this.svgRoot.appendChild(this.svgPathSelected_);
    }
  } else if (this.isSelected_) {
    if (didHighlightedChange || didSelectedChange) {
      this.setClass_('blocklySelected', true);
      this.setClass_('blocklyHighlighted', false);
  
      // remove the existing path
      if (this.svgPathSelected_) {
        this.svgRoot.removeChild(this.svgPathSelected_);
        this.svgPathSelected_ = null;
      }
  
      this.svgPathSelected_ =
        /** @type {!SVGElement} */ (this.svgPath.cloneNode(true));
      this.svgPathSelected_.setAttribute('fill', 'none');
      this.svgPathSelected_.setAttribute('filter',
          'url(#' + this.constants.selectedGlowFilterId + ')');
      this.svgRoot.appendChild(this.svgPathSelected_);
    }
  } else {
    if (didHighlightedChange || didSelectedChange) {
      this.setClass_('blocklySelected', false);
      this.setClass_('blocklyHighlighted', false);

      if (this.svgPathSelected_) {
        this.svgRoot.removeChild(this.svgPathSelected_);
        this.svgPathSelected_ = null;
      }
    }
  }
};
// RM Code End

/**
 * @override
 */
Blockly.zelos.PathObject.prototype.updateReplacementFade = function(
    enable) {
  this.setClass_('blocklyReplaceable', enable);
  if (enable) {
    this.svgPath.setAttribute('filter',
        'url(#' + this.constants.replacementGlowFilterId + ')');
  } else {
    this.svgPath.removeAttribute('filter');
  }
};

/**
 * @override
 */
Blockly.zelos.PathObject.prototype.updateShapeForInputHighlight = function(
    conn, enable) {
  var name = conn.getParentInput().name;
  var outlinePath = this.getOutlinePath_(name);
  if (!outlinePath) {
    return;
  }
  if (enable) {
    outlinePath.setAttribute('filter',
        'url(#' + this.constants.replacementGlowFilterId + ')');
  } else {
    outlinePath.removeAttribute('filter');
  }
};

/**
 * Method that's called when the drawer is about to draw the block.
 * @package
 */
Blockly.zelos.PathObject.prototype.beginDrawing = function() {
  this.remainingOutlines_ = {};
  for (var i = 0, keys = Object.keys(this.outlines_),
    key; (key = keys[i]); i++) {
    // The value set here isn't used anywhere, we are just using the
    // object as a Set data structure.
    this.remainingOutlines_[key] = 1;
  }
};

/**
 * Method that's called when the drawer is done drawing.
 * @package
 */
Blockly.zelos.PathObject.prototype.endDrawing = function() {
  // Go through all remaining outlines that were not used this draw pass, and
  // remove them.
  if (this.remainingOutlines_) {
    for (var i = 0, keys = Object.keys(this.remainingOutlines_),
      key; (key = keys[i]); i++) {
      this.removeOutlinePath_(key);
    }
  }
  this.remainingOutlines_ = null;
};

/**
 * Set the path generated by the renderer for an outline path on the respective
 * outline path SVG element.
 * @param {string} name The input name.
 * @param {string} pathString The path.
 * @package
 */
Blockly.zelos.PathObject.prototype.setOutlinePath = function(name, pathString) {
  var outline = this.getOutlinePath_(name);
  outline.setAttribute('d', pathString);
  outline.setAttribute('fill', this.style.colourTertiary);
};

/**
 * Create's an outline path for the specified input.
 * @param {string} name The input name.
 * @return {!SVGElement} The SVG outline path.
 * @private
 */
Blockly.zelos.PathObject.prototype.getOutlinePath_ = function(name) {
  if (!this.outlines_[name]) {
    this.outlines_[name] = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.PATH, {
          'class': 'blocklyOutlinePath',
          // IE doesn't like paths without the data definition, set empty default
          'd': ''
        },
        this.svgRoot);
  }
  if (this.remainingOutlines_) {
    delete this.remainingOutlines_[name];
  }
  return this.outlines_[name];
};

/**
 * Remove an outline path that is associated with the specified input.
 * @param {string} name The input name.
 * @private
 */
Blockly.zelos.PathObject.prototype.removeOutlinePath_ = function(name) {
  this.outlines_[name].parentNode.removeChild(this.outlines_[name]);
  delete this.outlines_[name];
};
