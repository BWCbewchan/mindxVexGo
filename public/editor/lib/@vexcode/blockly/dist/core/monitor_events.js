/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Events fired as a result of UI actions in Blockly's editor.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Events.Monitor');

goog.require('Blockly.Events');
goog.require('Blockly.Events.Abstract');
goog.require('Blockly.registry');
goog.require('Blockly.utils.object');


/**
 * Class for a UI event.
 * UI events are events that don't need to be sent over the wire for multi-user
 * editing to work (e.g. scrolling the workspace, zooming, opening toolbox
 * categories).
 * UI events do not undo or redo.
 * @param {?Blockly.Block=} opt_block The affected block.  Null for UI events
 *     that do not have an associated block.  Undefined for a blank event.
 * @param {string=} opt_element One of 'selected', 'comment', 'mutatorOpen',
 *     etc.
 * @param {*=} opt_oldValue Previous value of element.
 * @param {*=} opt_newValue New value of element.
 * @extends {Blockly.Events.Abstract}
 * @constructor
 */
Blockly.Events.Monitor = function(opt_block) {
  Blockly.Events.Monitor.superClass_.constructor.call(this);
  this.isBlank = typeof opt_block == 'undefined';
  this.blockType = opt_block ? opt_block.type : null;
  this.blockId = opt_block ? opt_block.id : null;

  this.workspaceId = opt_block ? opt_block.workspace.id : undefined;
  var blockFields = {};
  var blockLabel = {};
  // We are parsing the blocks inputlist and getting the value of every
  // dropdown field in the block. This allows us to grab the value of the
  // dropdown fields even if the block is deleted after the event.
  if (opt_block) {
    opt_block.inputList.forEach(function(input) {
      input.fieldRow.forEach(function(field) {
        if (
          field instanceof Blockly.FieldDropdown ||
          field instanceof Blockly.FieldVariable ||
          field instanceof Blockly.FieldVariableGetter
        ) {
          blockFields[field.name] = field.value_;
        } else if (field instanceof Blockly.FieldLabel) {
          blockLabel[field.name] = field.name;
        }
      });
    });
  }

  this.blockFields = blockFields;
  this.blockLabel = blockLabel;

  // UI events do not undo or redo.
  this.recordUndo = false;
};
Blockly.utils.object.inherits(Blockly.Events.Monitor, Blockly.Events.Abstract);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.Monitor.prototype.type = Blockly.Events.MONITOR;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.Monitor.prototype.toJson = function() {
  var json = Blockly.Events.Monitor.superClass_.toJson.call(this);
  json['element'] = this.element;
  if (this.newValue !== undefined) {
    json['newValue'] = this.newValue;
  }
  if (this.blockId) {
    json['blockId'] = this.blockId;
  }
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.Monitor.prototype.fromJson = function(json) {
  Blockly.Events.Monitor.superClass_.fromJson.call(this, json);
  this.element = json['element'];
  this.newValue = json['newValue'];
  this.blockId = json['blockId'];
};

Blockly.registry.register(Blockly.registry.Type.EVENT, Blockly.Events.MONITOR,
    Blockly.Events.Monitor);
