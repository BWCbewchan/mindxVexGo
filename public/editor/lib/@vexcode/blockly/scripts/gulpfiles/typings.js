/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Gulp script to generate the Typescript definition file (d.ts)
 * for Blockly.
 */

var gulp = require('gulp');
const rename = require("gulp-rename");
gulp.concat = require('gulp-concat');

var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var execSync = require('child_process').execSync;

const typingTmpDir = './typings/tmp';

function cleaupTypings(cb) {
   // Clean directory if exists.
   if (fs.existsSync(typingTmpDir)) {
    rimraf.sync(typingTmpDir);
  }
  fs.mkdirSync(typingTmpDir);
  cb();
}

function cleanupUncompressed(cb) {
  rimraf.sync('./core/**/*.d.ts');
  cb();
}

function buildRawCoreTypings(cb) {
  const blocklySrcs = [
    "core/",
    "core/components",
    "core/keyboard_nav",
    "core/renderers/common",
    "core/renderers/measurables",
    "core/renderers/geras",
    "core/renderers/geras/measurables",
    "core/renderers/thrasos",
    "core/renderers/zelos",
    "core/renderers/zelos/measurables",
    "core/theme",
    "core/toolbox",
    "core/interfaces",
    "core/utils",
    "msg/"
  ];

  // Find all files that will be included in the typings file.
  let files = [];
  blocklySrcs.forEach((src) => {
    files = files.concat(fs.readdirSync(src)
      .filter(fn => fn.endsWith('.js'))
      .map(fn => path.join(src, fn)));
  });

  // Generate typings file for each file.
  files.forEach((file) => {
    const typescriptFileName = `${path.join(typingTmpDir, file)}.d.ts`;
    if (file.indexOf('core/msg.js') > -1) {
      return;
    }
    const cmd = `node ./node_modules/typescript-closure-tools/definition-generator/src/main.js ${file} ${typescriptFileName}`;
    console.log(`Generating typings for ${file}`);
    execSync(cmd, { stdio: 'inherit' });
  });
  cb();
}

function buildRawGeneratorTypings(cb) {
  const blocklySrcs = [
    "generators/",
    "generators/javascript",
    "generators/python",
  ];

  // Find all files that will be included in the typings file.
  let files = [];
  blocklySrcs.forEach((src) => {
    files = files.concat(fs.readdirSync(src)
      .filter(fn => fn.endsWith('.js'))
      .map(fn => path.join(src, fn)));
  });

  // Generate typings file for each file.
  files.forEach((file) => {
    const typescriptFileName = `${path.join(typingTmpDir, file)}.d.ts`;
    if (file.indexOf('core/msg.js') > -1) {
      return;
    }
    const cmd = `node ./node_modules/typescript-closure-tools/definition-generator/src/main.js ${file} ${typescriptFileName}`;
    console.log(`Generating typings for ${file}`);
    execSync(cmd, { stdio: 'inherit' });
  });
  cb();
}

function buildCoreTypings() {
  const srcs = [
    'typings/templates/blockly-header.template',
    'typings/templates/blockly-interfaces.template',
    `${typingTmpDir}/core/**`,
    `${typingTmpDir}/core/interfaces/**`,
    `${typingTmpDir}/core/components/**`,
    `${typingTmpDir}/core/keyboard_nav/**`,
    `${typingTmpDir}/core/renderers/common/**`,
    `${typingTmpDir}/core/renderers/measurables/**`,
    `${typingTmpDir}/core/renderers/geras/**`,
    `${typingTmpDir}/core/renderers/thrasos/**`,
    `${typingTmpDir}/core/renderers/zelos/**`,
    `${typingTmpDir}/core/utils/**`,
    `${typingTmpDir}/core/theme/**`,
  ];
  return gulp.src(srcs)
    .pipe(gulp.concat('core.d.ts'))
    .pipe(gulp.dest('typings'))
}

function buildMsgTypings() {
  const srcs = [
    `${typingTmpDir}/msg/**`
  ];
  return gulp.src(srcs)
    .pipe(gulp.concat('msg.d.ts'))
    .pipe(gulp.dest('typings'))
}

function buildJavascriptTypeings() {
  const srcs = [
    `${typingTmpDir}/generators/javascript.js.d.ts`,
    `${typingTmpDir}/generators/javascript/*.d.ts`,
  ];
  return gulp.src(srcs)
    .pipe(gulp.concat('javascript.d.ts'))
    .pipe(gulp.dest('typings'))
}

function buildPythonTypings() {
  const srcs = [
    `${typingTmpDir}/generators/python.js.d.ts`,
    `${typingTmpDir}/generators/python/*.d.ts`,
  ];
  return gulp.src(srcs)
    .pipe(gulp.concat('python.d.ts'))
    .pipe(gulp.dest('typings'))
}

function buildCPPTypeings() {
  const srcs = [
    `${typingTmpDir}/generators/cpp.js.d.ts`,
    `${typingTmpDir}/generators/cpp/*.d.ts`,
  ];
  return gulp.src(srcs)
    .pipe(gulp.concat('cpp.d.ts'))
    .pipe(gulp.dest('typings'))
}

function combineAllTypings() {
  const srcs = [
    'typings/templates/blockly-header.template',
    'typings/templates/blockly-interfaces.template',
    `${typingTmpDir}/core/**`,
    `${typingTmpDir}/core/interfaces/**`,
    `${typingTmpDir}/core/components/**`,
    `${typingTmpDir}/core/keyboard_nav/**`,
    `${typingTmpDir}/core/renderers/common/**`,
    `${typingTmpDir}/core/renderers/measurables/**`,
    `${typingTmpDir}/core/renderers/geras/**`,
    `${typingTmpDir}/core/renderers/thrasos/**`,
    `${typingTmpDir}/core/renderers/zelos/**`,
    `${typingTmpDir}/core/utils/**`,
    `${typingTmpDir}/core/theme/**`,
    `${typingTmpDir}/msg/**`,
    `${typingTmpDir}/generators/javascript.js.d.ts`,
    `${typingTmpDir}/generators/javascript/*.d.ts`,
    `${typingTmpDir}/generators/python.js.d.ts`,
    `${typingTmpDir}/generators/python/*.d.ts`,
    `${typingTmpDir}/generators/cpp.js.d.ts`,
    `${typingTmpDir}/generators/cpp/*.d.ts`,
  ];
  return gulp.src(srcs)
    .pipe(gulp.concat('blockly.d.ts'))
    .pipe(gulp.dest('typings'))
}

function combineUncompressedTypings() {
  return gulp.src(`${typingTmpDir}/core/**/*.d.ts`)
    .pipe(gulp.dest('./core/'));
}

function copyUncompressedTypings() {
  return gulp.src(`typings/blockly.d.ts`)
    .pipe(rename("blockly_uncompressed.d.ts"))
    .pipe(gulp.dest('.'));
}

const buildUncompressedTypings = gulp.series(combineUncompressedTypings, copyUncompressedTypings);

// Generates the TypeScript definition file (d.ts) for Blockly.
// As well as generating the typings of each of the files under core/ and msg/,
// the script also pulls in a number of part files from typings/parts.
// This includes the header (incl License), additional useful interfaces
// including Blockly Options and Google Closure typings.
const typings = gulp.series(
  cleaupTypings,
  gulp.parallel(
    buildRawCoreTypings,
    buildRawGeneratorTypings,
  ),
  gulp.parallel(
    buildCoreTypings,
    buildMsgTypings,
    buildJavascriptTypeings,
    buildPythonTypings,
    buildCPPTypeings,
    combineAllTypings,
    )
  );

// Generates the TypeScript definition files (d.ts) for Blockly locales.
function msgTypings(cb) {
  const template = fs.readFileSync(path.join('typings/templates/msg.template'), 'utf-8');
  const msgFiles = fs.readdirSync(path.join('msg', 'json'));
  msgFiles.forEach(msg => {
    const localeName = msg.substring(0, msg.indexOf('.json'));
    const msgTypings = template.slice().replace(/<%= locale %>/gi, localeName);
    fs.writeFileSync(path.join('typings', 'msg', localeName + '.d.ts'), msgTypings, 'utf-8');
  })
  cb();
}

module.exports = {
  typings: typings,
  msgTypings: msgTypings,

  buildUncompressedTypings: buildUncompressedTypings,
  cleanupUncompressed: cleanupUncompressed,
};
