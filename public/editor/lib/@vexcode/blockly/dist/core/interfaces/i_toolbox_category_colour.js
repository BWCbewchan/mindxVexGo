/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The interface for a toolbox.
 * @author aschmiedt@google.com (Abby Schmiedt)
 */

'use strict';

goog.provide('Blockly.IToolboxCategoryColour');


/**
 * Interface for a toolbox.
 * @interface
 */
Blockly.IToolboxCategoryColour = function() {};

/**
 * @type {string}
 */
Blockly.IToolboxCategoryColour.prototype.colourPrimary;

/**
 * @type {string}
 */
Blockly.IToolboxCategoryColour.prototype.colourSecondary;
