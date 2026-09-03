'use strict';

goog.provide('Blockly.CPP.variables');

goog.require('Blockly.CPP');


Blockly.CPP['data_variable'] = function(block) {
  // Variable getter.
  var code = Blockly.CPP.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.CPP.ORDER_ATOMIC];
};

Blockly.CPP['data_setvariableto'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.CPP.valueToCode(block, 'VALUE',
      Blockly.CPP.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.CPP.variableDB_.getName(
      block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.CPP['data_changevariableby'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.CPP.valueToCode(block, 'VALUE',
      Blockly.CPP.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.CPP.variableDB_.getName(
      block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + varName + ' + ' + argument0 + ';\n';
};

//#region "booleans"
Blockly.CPP['data_bool_variable'] = function(block) {
  // Variable getter.
  var code = Blockly.CPP.variableDB_.getName(block.getFieldValue('VARIABLE'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.CPP.ORDER_ATOMIC];
};

Blockly.CPP['data_setboolvariableto'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.CPP.valueToCode(block, 'VALUE',
      Blockly.CPP.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.CPP.variableDB_.getName(
      block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.CPP['bool_input'] = function(block) {
  var value = block.getFieldValue('VALUE');
  return [value, Blockly.CPP.ORDER_ATOMIC];
};
//#endregion

// list variable blocks

Blockly.CPP['data_listcontents'] = function(block) {
  // Variable getter.
  var code = Blockly.CPP.variableDB_.getName(block.getFieldValue('LIST'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.CPP.ORDER_ATOMIC];
};

Blockly.CPP['data_replaceitemoflist'] = function(block) {
  // list variable item setter.
  var index = Blockly.CPP.valueToCode(block, 'INDEX', Blockly.CPP.ORDER_ASSIGNMENT) || '1';
  var varUserName = block.getFieldValue('LIST');
  var variable = block.workspace.getVariableById(varUserName);
  var arrayLength = variable.arrayLength
  var parsedIndex = parseInt(index);
  if (!isNaN(parsedIndex) && (parsedIndex < 1 || parsedIndex > arrayLength)) {
    throw new RangeError(`index ${parsedIndex} is out of range (1-${arrayLength}) for list ${varUserName}`);
  }
  var newValue = Blockly.CPP.valueToCode(block, 'ITEM', Blockly.CPP.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.CPP.variableDB_.getName(varUserName, Blockly.Variables.NAME_TYPE);
  return `${varName}[static_cast<int>(${index}) - 1] = ${newValue};\n`;
};

Blockly.CPP['data_itemoflist'] = function(block) {
  // get list variable item.
  var index = Blockly.CPP.valueToCode(block, 'INDEX', Blockly.CPP.ORDER_ASSIGNMENT) || '1';
  var varUserName = block.getFieldValue('LIST');
  var variable = block.workspace.getVariableById(varUserName);
  var arrayLength = variable.arrayLength
  var parsedIndex = parseInt(index);
  if (!isNaN(parsedIndex) && (parsedIndex < 1 || parsedIndex > arrayLength)) {
    throw new RangeError(`index ${parsedIndex} is out of range (1-${arrayLength}) for list ${varUserName}`);
  }
  var varName = Blockly.CPP.variableDB_.getName(varUserName, Blockly.Variables.NAME_TYPE);
  const code = `${varName}[static_cast<int>(${index}) - 1]`;

  return [code, Blockly.CPP.ORDER_SUBSCRIPT];
};

Blockly.CPP['data_listsetvalue'] = function(block) {
  // get list variable item.
  var varID = block.getFieldValue('LIST');
  var variable = block.workspace.getVariableById(varID);
  var arrayLength = variable.arrayLength
  var varName = Blockly.CPP.variableDB_.getName(varID, Blockly.Variables.NAME_TYPE);
  let code = []

  for (var i=0; i< arrayLength; i++) {
    var value = Blockly.CPP.valueToCode(block, `VALUE${i}`, Blockly.CPP.ORDER_ASSIGNMENT) || '1';
    code.push(`${varName}[${i}] = ${value};`);
  }

  return code.join("\n");
};

Blockly.CPP['data_lengthoflist'] = function(block) {
  // get list variable lenght.
  var varUserName = block.getFieldValue('LIST');
  var variable = block.workspace.getVariableById(varUserName);
  var arrayLength = variable.arrayLength
  const code = `${arrayLength}`;
  return [code, Blockly.CPP.ORDER_ATOMIC];
};

Blockly.CPP['data_itemof2darray'] = function(block) {
  // get 2d array variable item.
  var row = Blockly.CPP.valueToCode(block, 'ROW', Blockly.CPP.ORDER_ASSIGNMENT) || '1';
  var column = Blockly.CPP.valueToCode(block, 'COLUMN', Blockly.CPP.ORDER_ASSIGNMENT) || '1';
  var varUserName = block.getFieldValue('ARRAY');
  var variable = block.workspace.getVariableById(varUserName);
  var arrayLength = variable.arrayLength
  var parsedRow = parseInt(row);
  if (!isNaN(parsedRow) && (parsedRow < 1 || parsedRow > arrayLength)) {
    throw new RangeError(`row ${parsedRow} is out of range (1-${arrayLength}) for 2d array ${varUserName}`);
  }
  var arrayWidth = variable.arrayWidth
  var parsedColumn = parseInt(column);
  if (!isNaN(parsedColumn) && (parsedColumn < 1 || parsedColumn > arrayWidth)) {
    throw new RangeError(`column ${parsedColumn} is out of range (1-${arrayWidth}) for 2d array ${varUserName}`);
  }
  var varName = Blockly.CPP.variableDB_.getName(varUserName, Blockly.Variables.NAME_TYPE);
  const code = `${varName}[static_cast<int>(${row}) - 1][static_cast<int>(${column}) - 1]`;

  return [code, Blockly.CPP.ORDER_SUBSCRIPT];
};

Blockly.CPP['data_setitemof2darray'] = function(block) {
  // 2d array variable item setter.
  var row = Blockly.CPP.valueToCode(block, 'ROW', Blockly.CPP.ORDER_ASSIGNMENT) || '1';
  var column = Blockly.CPP.valueToCode(block, 'COLUMN', Blockly.CPP.ORDER_ASSIGNMENT) || '1';
  var varUserName = block.getFieldValue('ARRAY');
  var variable = block.workspace.getVariableById(varUserName);
  var arrayLength = variable.arrayLength
  var parsedRow = parseInt(row);
  if (!isNaN(parsedRow) && (parsedRow < 1 || parsedRow > arrayLength)) {
    throw new RangeError(`row ${parsedRow} is out of range (1-${arrayLength}) for 2d array ${varUserName}`);
  }
  var arrayWidth = variable.arrayWidth
  var parsedColumn = parseInt(column);
  if (!isNaN(parsedColumn) && (parsedColumn < 1 || parsedColumn > arrayWidth)) {
    throw new RangeError(`column ${parsedColumn} is out of range (1-${arrayWidth}) for 2d array ${varUserName}`);
  }
  var newValue = Blockly.CPP.valueToCode(block, 'VALUE', Blockly.CPP.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.CPP.variableDB_.getName(varUserName, Blockly.Variables.NAME_TYPE);
  return `${varName}[static_cast<int>(${row}) - 1][static_cast<int>(${column}) - 1] = ${newValue};\n`;
};

Blockly.CPP['data_set2darrayto'] = function(block) {
  // set 2d array variable to.
  var varID = block.getFieldValue('ARRAY');
  var variable = block.workspace.getVariableById(varID);
  var arrayLength = variable.arrayLength;
  var arrayWidth = variable.arrayWidth;
  var varName = Blockly.CPP.variableDB_.getName(varID, Blockly.Variables.NAME_TYPE);
  let code = []

  for (var r = 0; r < arrayLength; r++) {
    const rowBlock = block.getInput(`ROW${r}`).connection.targetConnection.sourceBlock_
    for (var c = 0; c < arrayWidth; c++) {
      const value = Blockly.CPP.valueToCode(rowBlock, `VALUE${c}`, Blockly.CPP.ORDER_ASSIGNMENT) || '1';
      code.push(`${varName}[${r}][${c}] = ${value};`);
    }
  }

  return code.join("\n");
};

Blockly.CPP['data_lengthof2darray'] = function(block) {
  // get list variable lenght.
  var varUserName = block.getFieldValue('ARRAY');
  var direction = block.getFieldValue("DIRECTION");
  var variable = block.workspace.getVariableById(varUserName);
  var arrayLength = variable.arrayLength;
  var arrayWidth = variable.arrayWidth;
  const code = `${direction === "rows" ? arrayLength : arrayWidth}`;
  return [code, Blockly.CPP.ORDER_ATOMIC];
};
