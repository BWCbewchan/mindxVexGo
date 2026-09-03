/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Object representing a trash can icon.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.MonitorIcon');

goog.require('Blockly.constants');
goog.require('Blockly.Scrollbar');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.Rect');
goog.require('Blockly.utils.Svg');
goog.require('Blockly.utils.toolbox');
goog.require('Blockly.Xml');

goog.requireType('Blockly.IDeleteArea');


/**
 * Class for a monitor icon.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace to sit in.
 * @constructor
 * @implements {Blockly.IDeleteArea}
 */
Blockly.MonitorIcon = function(workspace) {
  /**
   * The workspace the trashcan sits in.
   * @type {!Blockly.WorkspaceSvg}
   * @private
   */
  this.workspace_ = workspace;
};

/**
 * Current state of monitor shown or not
 * @type {boolean}
 * @private
 */
Blockly.MonitorIcon.hasMonitor = false;

/**
 * name of the file in the media folder
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.FILE_NAME_BASE_ = "monitor.svg";

/**
 * name of the file in the media folder
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.FILE_NAME_UNSUPPORTED_ = "monitor-deny.svg";

/**
 * Width of the icon image.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.prototype.WIDTH_ = 40;

/**
 * Height of the icon image.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.prototype.HEIGHT_ = 40;

/**
 * Distance between the monitor icon and top edge of workspace.
 * @type {number}
 * @private
 */
Blockly.MonitorIcon.prototype.MARGIN_TOP_ = 20;

/**
 * Distance between monitor icon and right edge of workspace.
 * @type {number}
 * @private
 */
Blockly.MonitorIcon.prototype.MARGIN_SIDE_ = 20;

/**
 * Extent of hotspot on all sides beyond the size of the image.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.prototype.MARGIN_HOTSPOT_ = 10;

/**
 * The minimum (resting) opacity of the monitor icon.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.OPACITY_MIN_ = 0.4;

/**
 * The maximum (hovered) opacity of the mointor icon.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.OPACITY_MAX_ = 0.8;

/**
 * The SVG group containing the monitor icon.
 * @type {SVGElement}
 * @private
 */
Blockly.MonitorIcon.prototype.svgGroup_ = null;

/**
 * Left coordinate of the monitor icon.
 * @type {number}
 * @private
 */
Blockly.MonitorIcon.prototype.left_ = 0;

/**
 * Top coordinate of the monitor icon.
 * @type {number}
 * @private
 */
Blockly.MonitorIcon.prototype.top_ = 0;

/**
 * The minimum (resting) opacity of the icon.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.OPACITY_MIN_ = 0.56;

/**
 * The maximum (hovered) opacity of the icon.
 * @const {number}
 * @private
 */
Blockly.MonitorIcon.OPACITY_MAX_ = 1.0;


/**
 * Create the monitor icon elements.
 * @return {!SVGElement} The monitor icon's SVG group.
 */
Blockly.MonitorIcon.prototype.createDom = function() {
  /* Here's the markup that will be generated:
  <g class="blocklyMonitor">
    <image width="64" height="92" y="-32" xlink:href="media/monitor.svg"></image>
  </g>
  */
  this.svgGroup_ = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.G,
      {'class': 'blocklyMonitor'}, null);
  this.iconBody = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.IMAGE,
      {
        'width': this.WIDTH_,
        'height': this.HEIGHT_,
      },
      this.svgGroup_);
  this.iconBody.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href',
      this.workspace_.options.pathToMedia + Blockly.MonitorIcon.FILE_NAME_BASE_);

  this.svgGroup_.style.opacity = Blockly.MonitorIcon.OPACITY_MIN_;

  return this.svgGroup_;
};

/**
 * Initialize the trash can.
 * @param {number} _verticalSpacing Vertical distance from workspace edge to the
 *    same edge of the trashcan.
 * @return {number} Vertical distance from workspace edge to the opposite
 *    edge of the trashcan.
 */
Blockly.MonitorIcon.prototype.init = function(_verticalSpacing) {
  this.verticalSpacing_ = this.MARGIN_TOP_;
  return this.verticalSpacing_ + this.BODY_HEIGHT_ + this.LID_HEIGHT_;
};

/**
 * Dispose of this trash can.
 * Unlink from all DOM elements to prevent memory leaks.
 * @suppress {checkTypes}
 */
Blockly.MonitorIcon.prototype.dispose = function() {
  if (this.svgGroup_) {
    Blockly.utils.dom.removeNode(this.svgGroup_);
    this.svgGroup_ = null;
  }
  this.workspace_ = null;
};

/**
 * Position the trashcan.
 * It is positioned in the opposite corner to the corner the
 * categories/toolbox starts at.
 */
Blockly.MonitorIcon.prototype.position = function() {
  // Not yet initialized.
  if (!this.verticalSpacing_) {
    console.warn("skipping monitor position - no virtical spacing", this.verticalSpacing_);
    return;
  }
  var metrics = this.workspace_.getMetrics();
  if (!metrics) {
    // There are no metrics available (workspace is probably not visible).
    console.warn("skipping monitor position - no metrics", metrics);
    return;
  }
  if (metrics.toolboxPosition == Blockly.TOOLBOX_AT_LEFT ||
      (this.workspace_.horizontalLayout && !this.workspace_.RTL)) {
    // Toolbox starts in the left corner.
    this.left_ = metrics.viewWidth + metrics.absoluteLeft -
        this.WIDTH_ - this.MARGIN_SIDE_ - Blockly.Scrollbar.scrollbarThickness;
  } else {
    // Toolbox starts in the right corner.
    this.left_ = this.MARGIN_SIDE_ + Blockly.Scrollbar.scrollbarThickness;
  }

  if (metrics.toolboxPosition == Blockly.TOOLBOX_AT_BOTTOM) {
    this.top_ = this.verticalSpacing_;
  } else {
    this.top_ = metrics.absoluteTop + this.verticalSpacing_;
    // this.top_ = metrics.viewHeight + metrics.absoluteTop -
    //     this.HEIGHT_ - this.verticalSpacing_;
  }

  this.svgGroup_.setAttribute('transform',
      'translate(' + this.left_ + ',' + this.top_ + ')');
};

/**
 * Return the deletion rectangle for this trash can.
 * @return {Blockly.utils.Rect} Rectangle in which to delete.
 */
Blockly.MonitorIcon.prototype.getClientRect = function() {
  if (!this.svgGroup_) {
    return null;
  }

  var trashRect = this.svgGroup_.getBoundingClientRect();
  var top = trashRect.top - this.MARGIN_HOTSPOT_;
  var bottom = top + this.HEIGHT_ + 2 * this.MARGIN_HOTSPOT_;
  var left = trashRect.left - this.MARGIN_HOTSPOT_;
  var right = left + this.WIDTH_ + 2 * this.MARGIN_HOTSPOT_;
  return new Blockly.utils.Rect(top, bottom, left, right);
};

/**
 * set the state of the icon.
 * @param {boolean} state True if over icon.
 * @param {boolean} supported True if the block supports monitoring
 * @package
 */
Blockly.MonitorIcon.prototype.setState = function(state, supported) {
  if (state) {
    this.svgGroup_.style.opacity = Blockly.MonitorIcon.OPACITY_MAX_;
    this.setIcon(supported ?
        Blockly.MonitorIcon.FILE_NAME_BASE_ :
        Blockly.MonitorIcon.FILE_NAME_UNSUPPORTED_);
  } else {
    this.svgGroup_.style.opacity = Blockly.MonitorIcon.OPACITY_MIN_;
    this.setIcon(Blockly.MonitorIcon.FILE_NAME_BASE_);
  }
};

/**
 * set the image for the icon
 * @param {string} file the file in the media folder to display
 * @package
 */
Blockly.MonitorIcon.prototype.setIcon = function(file) {
  this.iconBody.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href',
      this.workspace_.options.pathToMedia + file);
};


/**
 * @private
 */
Blockly.MonitorIcon.prototype.mouseOver_ = function() {
};

/**
 * @private
 */
Blockly.MonitorIcon.prototype.mouseOut_ = function() {
};
