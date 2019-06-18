'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const path = require('path');
const chalk_1 = __importDefault(require('chalk'));
const slash = require('slash');
const relativePath = require('./relativePath');
const trimAndFormatPath = (pad, config, testPath, columns) => {
  const maxLength = columns - pad;
  const relative = relativePath(config, testPath);
  const { basename } = relative;
  let { dirname } = relative;
  // length is ok
  if ((dirname + path.sep + basename).length <= maxLength) {
    return slash(
      chalk_1.default.dim(dirname + path.sep) + chalk_1.default.bold(basename)
    );
  }
  // we can fit trimmed dirname and full basename
  const basenameLength = basename.length;
  if (basenameLength + 4 < maxLength) {
    const dirnameLength = maxLength - 4 - basenameLength;
    dirname = `...${dirname.slice(
      dirname.length - dirnameLength,
      dirname.length
    )}`;
    return slash(
      chalk_1.default.dim(dirname + path.sep) + chalk_1.default.bold(basename)
    );
  }
  if (basenameLength + 4 === maxLength) {
    return slash(
      chalk_1.default.dim(`...${path.sep}`) + chalk_1.default.bold(basename)
    );
  }
  // can't fit dirname, but can fit trimmed basename
  return slash(
    chalk_1.default.bold(
      `...${basename.slice(basename.length - maxLength - 4, basename.length)}`
    )
  );
};
module.exports = trimAndFormatPath;
