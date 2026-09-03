/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The interface for a flyout.
 * @author aschmiedt@google.com (Abby Schmiedt)
 */

'use strict';

goog.provide('Blockly.IFlyoutCategoryPositionData');

/**
 * data for where to find the category in the flyout
 * @interface
 */
Blockly.IFlyoutCategoryPositionData = function() {};

/**
 * the name of the category this data is for
 * @type {string}
 */
Blockly.IFlyoutCategoryPositionData.prototype.categoryName;

/**
 * the name of the category this data is for
 * @type {string}
 */
Blockly.IFlyoutCategoryPositionData.prototype.categoryId;

/**
 * the scroll position for the start of the category
 * @type {number}
 */
Blockly.IFlyoutCategoryPositionData.prototype.position;

/**
 * the scroll length of the category
 * @type {number}
 */
Blockly.IFlyoutCategoryPositionData.prototype.length;
