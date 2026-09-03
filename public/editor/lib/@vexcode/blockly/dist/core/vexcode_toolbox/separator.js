/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A separator used for separating toolbox categories.
 * @author aschmiedt@google.com (Abby Schmiedt)
 * @author maribethb@google.com (Maribeth Bottorff)
 */
'use strict';

goog.provide('Blockly.VexcodeToolboxSeparator');

goog.require('Blockly.registry');
goog.require('Blockly.VexcodeToolboxItem');
goog.require('Blockly.utils.dom');

goog.requireType('Blockly.IToolbox');
goog.requireType('Blockly.IToolboxItem');
goog.requireType('Blockly.utils.toolbox');


/**
 * Class for a toolbox separator. This is the thin visual line that appears on
 * the toolbox. This item is not interactable.
 * @param {!Blockly.utils.toolbox.SeparatorInfo} separatorDef The information
 *     needed to create a separator.
 * @param {!Blockly.IToolbox} toolbox The parent toolbox for the separator.
 * @constructor
 * @extends {Blockly.VexcodeToolboxItem}
 * @implements {Blockly.IToolboxItem}
 */
Blockly.VexcodeToolboxSeparator = function(separatorDef, toolbox) {

  Blockly.VexcodeToolboxSeparator.superClass_.constructor.call(
      this, separatorDef, toolbox);
  /**
   * All the css class names that are used to create a separator.
   * @type {!Blockly.VexcodeToolboxSeparator.CssConfig}
   * @protected
   */
  this.cssConfig_ = {
    'container': 'blocklyTreeSeparator'
  };

  var cssConfig = separatorDef['cssconfig'] || separatorDef['cssConfig'];
  Blockly.utils.object.mixin(this.cssConfig_, cssConfig);
};
Blockly.utils.object.inherits(Blockly.VexcodeToolboxSeparator, Blockly.VexcodeToolboxItem);

/**
 * All the css class names that are used to create a separator.
 * @typedef {{
 *            container:?string
 *          }}
 */
Blockly.VexcodeToolboxSeparator.CssConfig;

/**
 * Name used for registering a toolbox separator.
 * @const {string}
 */
Blockly.VexcodeToolboxSeparator.registrationName = 'sep';

/**
 * @override
 */
Blockly.VexcodeToolboxSeparator.prototype.init = function() {
  this.createDom_();
};

/**
 * Creates the dom for a separator.
 * @return {!Element} The parent element for the separator.
 * @protected
 */
Blockly.VexcodeToolboxSeparator.prototype.createDom_ = function() {
  var container = document.createElement('div');
  Blockly.utils.dom.addClass(container, this.cssConfig_['container']);
  this.htmlDiv_ = container;
  return container;
};

/**
 * @override
 */
Blockly.VexcodeToolboxSeparator.prototype.getDiv = function() {
  return this.htmlDiv_;
};

/**
 * @override
 */
Blockly.VexcodeToolboxSeparator.prototype.dispose = function() {
  Blockly.utils.dom.removeNode(this.htmlDiv_);
};

/**
 * CSS for Toolbox.  See css.js for use.
 */
Blockly.Css.register([
  /* eslint-disable indent */
  '.blocklyTreeSeparator {',
    'border-bottom: solid #e5e5e5 1px;',
    'height: 0;',
    'margin: 5px 0;',
  '}',

  '.blocklyToolboxDiv[layout="h"] .blocklyTreeSeparator {',
    'border-right: solid #e5e5e5 1px;',
    'border-bottom: none;',
    'height: auto;',
    'margin: 0 5px 0 5px;',
    'padding: 5px 0;',
    'width: 0;',
  '}',
  /* eslint-enable indent */
]);

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.VexcodeToolboxSeparator.registrationName, Blockly.VexcodeToolboxSeparator);
