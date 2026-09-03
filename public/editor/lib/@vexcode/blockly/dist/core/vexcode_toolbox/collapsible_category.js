/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbox category used to organize blocks in the toolbox.
 * @author aschmiedt@google.com (Abby Schmiedt)
 */
'use strict';

goog.provide('Blockly.CollapsibleVexcodeToolboxCategory');

goog.require('Blockly.registry');
goog.require('Blockly.VexcodeToolboxCategory');
goog.require('Blockly.VexcodeToolboxSeparator');
goog.require('Blockly.utils.aria');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.toolbox');
goog.require('Blockly.VexcodeToolboxItem');

goog.requireType('Blockly.ICollapsibleToolboxItem');
goog.requireType('Blockly.IToolbox');
goog.requireType('Blockly.IToolboxItem');


/**
 * Class for a category in a toolbox that can be collapsed.
 * @param {!Blockly.utils.toolbox.CategoryInfo} categoryDef The information needed
 *     to create a category in the toolbox.
 * @param {!Blockly.IToolbox} toolbox The parent toolbox for the category.
 * @param {Blockly.ICollapsibleToolboxItem=} opt_parent The parent category or null if
 *     the category does not have a parent.
 * @constructor
 * @extends {Blockly.VexcodeToolboxCategory}
 * @implements {Blockly.ICollapsibleToolboxItem}
 */
Blockly.CollapsibleVexcodeToolboxCategory = function(categoryDef, toolbox, opt_parent) {
  /**
   * Container for any child categories.
   * @type {?Element}
   * @protected
   */
  this.subcategoriesDiv_ = null;

  /**
   * Whether or not the category should display its subcategories.
   * @type {boolean}
   * @protected
   */
  this.expanded_ = false;

  /**
   * The child toolbox items for this category.
   * @type {!Array<!Blockly.VexcodeToolboxItem>}
   * @protected
   */
  this.toolboxItems_ = [];

  Blockly.CollapsibleVexcodeToolboxCategory.superClass_.constructor.call(
      this, categoryDef, toolbox, opt_parent);
};

Blockly.utils.object.inherits(Blockly.CollapsibleVexcodeToolboxCategory, Blockly.VexcodeToolboxCategory);

/**
 * All the css class names that are used to create a collapsible
 * category. This is all the properties from the regular category plus contents.
 * @typedef {{
 *            container:?string,
 *            row:?string,
 *            rowcontentcontainer:?string,
 *            icon:?string,
 *            label:?string,
 *            selected:?string,
 *            openicon:?string,
 *            closedicon:?string,
 *            contents:?string
 *          }}
 */
Blockly.CollapsibleVexcodeToolboxCategory.CssConfig;

/**
 * Name used for registering a collapsible toolbox category.
 * @const {string}
 */
Blockly.CollapsibleVexcodeToolboxCategory.registrationName = 'collapsibleCategory';

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.makeDefaultCssConfig_ = function() {
  var cssConfig = Blockly.CollapsibleVexcodeToolboxCategory.superClass_.makeDefaultCssConfig_.call(this);
  cssConfig['contents'] = 'blocklyToolboxContents';
  return cssConfig;
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.parseContents_ = function(categoryDef) {
  var contents = categoryDef['contents'];
  var prevIsFlyoutItem = true;

  if (categoryDef['custom']) {
    this.flyoutItems_ = categoryDef['custom'];
  } else if (contents) {
    for (var i = 0, itemDef; (itemDef = contents[i]); i++) {
      // Separators can exist as either a flyout item or a toolbox item so
      // decide where it goes based on the type of the previous item.
      if (!Blockly.registry.hasItem(Blockly.registry.Type.TOOLBOX_ITEM, itemDef['kind']) ||
          (itemDef['kind'].toLowerCase() == Blockly.VexcodeToolboxSeparator.registrationName &&
          prevIsFlyoutItem)) {
        var flyoutItem = /** @type {Blockly.utils.toolbox.FlyoutItemInfo} */ (itemDef);
        this.flyoutItems_.push(flyoutItem);
        prevIsFlyoutItem = true;
      } else {
        this.createToolboxItem_(itemDef);
        prevIsFlyoutItem = false;
      }
    }
  }
};

/**
 * Creates a toolbox item and adds it to the list of toolbox items.
 * @param {!Blockly.utils.toolbox.ToolboxItemInfo} itemDef The information needed
 *     to create a toolbox item.
 * @private
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.createToolboxItem_ = function(itemDef) {
  var registryName = itemDef['kind'];
  var categoryDef = /** @type {!Blockly.utils.toolbox.CategoryInfo} */ (itemDef);

  // Categories that are collapsible are created using a class registered under
  // a diffferent name.
  if (registryName.toUpperCase() == 'CATEGORY' &&
      Blockly.utils.toolbox.isCategoryCollapsible(categoryDef)) {
    registryName = Blockly.CollapsibleVexcodeToolboxCategory.registrationName;
  }
  var ToolboxItemClass = Blockly.registry.getClass(
      Blockly.registry.Type.TOOLBOX_ITEM, registryName);
  var toolboxItem = new ToolboxItemClass(itemDef, this.parentToolbox_, this);
  this.toolboxItems_.push(toolboxItem);
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.init = function() {
  Blockly.CollapsibleVexcodeToolboxCategory.superClass_.init.call(this);

  this.setExpanded(this.toolboxItemDef_['expanded'] == 'true' ||
      this.toolboxItemDef_['expanded']);
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.createDom_ = function() {
  Blockly.CollapsibleVexcodeToolboxCategory.superClass_.createDom_.call(this);

  var subCategories = this.getChildToolboxItems();
  this.subcategoriesDiv_ = this.createSubCategoriesDom_(subCategories);
  Blockly.utils.aria.setRole(this.subcategoriesDiv_,
      Blockly.utils.aria.Role.GROUP);
  this.htmlDiv_.appendChild(this.subcategoriesDiv_);

  return this.htmlDiv_;
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.createIconDom_ = function() {
  var toolboxIcon = document.createElement('span');
  if (!this.parentToolbox_.isHorizontal()) {
    Blockly.utils.dom.addClass(toolboxIcon, this.cssConfig_['icon']);
    toolboxIcon.style.visibility = 'visible';
  }

  toolboxIcon.style.display = 'inline-block';
  return toolboxIcon;
};

/**
 * Create the dom for all subcategories.
 * @param {!Array<!Blockly.VexcodeToolboxItem>} subcategories The subcategories.
 * @return {!Element} The div holding all the subcategories.
 * @protected
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.createSubCategoriesDom_ = function(subcategories) {
  var contentsContainer = document.createElement('div');
  Blockly.utils.dom.addClass(contentsContainer, this.cssConfig_['contents']);

  for (var i = 0; i < subcategories.length; i++) {
    var newCategory = subcategories[i];
    newCategory.init();
    var newCategoryDiv = newCategory.getDiv();
    contentsContainer.appendChild(newCategoryDiv);
  }
  return contentsContainer;
};


/**
 * Opens or closes the current category.
 * @param {boolean} isExpanded True to expand the category, false to close.
 * @public
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.setExpanded = function(isExpanded) {
  if (this.expanded_ == isExpanded) {
    return;
  }
  this.expanded_ = isExpanded;
  if (isExpanded) {
    this.subcategoriesDiv_.style.display = 'block';
    this.openIcon_(this.iconDom_);
  } else {
    this.subcategoriesDiv_.style.display = 'none';
    this.closeIcon_(this.iconDom_);
  }
  Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
      Blockly.utils.aria.State.EXPANDED, isExpanded);

  this.parentToolbox_.handleToolboxItemResize();
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.setVisible_ = function(isVisible) {
  this.htmlDiv_.style.display = isVisible ? 'block' : 'none';
  for (var i = 0, child; (child = this.getChildToolboxItems()[i]); i++) {
    child.setVisible_(isVisible);
  }
  this.isHidden_ = !isVisible;

  if (this.parentToolbox_.getSelectedItem() == this) {
    this.parentToolbox_.clearSelection();
  }
};

/**
 * Whether the category is expanded to show its child subcategories.
 * @return {boolean} True if the toolbox item shows its children, false if it
 *     is collapsed.
 * @public
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.isExpanded = function() {
  return this.expanded_;
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.isCollapsible = function() {
  return true;
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.onClick = function(_e) {
  this.toggleExpanded();
};

/**
 * Toggles whether or not the category is expanded.
 * @public
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.toggleExpanded = function() {
  this.setExpanded(!this.expanded_);
};

/**
 * @override
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.getDiv = function() {
  return this.htmlDiv_;
};

/**
 * Gets any children toolbox items. (ex. Gets the subcategories)
 * @return {!Array<!Blockly.IToolboxItem>} The child toolbox items.
 */
Blockly.CollapsibleVexcodeToolboxCategory.prototype.getChildToolboxItems = function() {
  return this.toolboxItems_;
};


Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.CollapsibleVexcodeToolboxCategory.registrationName, Blockly.CollapsibleVexcodeToolboxCategory);
