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
const formatTestPath = (config, testPath) => {
  const { dirname, basename } = relativePath(config, testPath);
  return slash(
    chalk_1.default.dim(dirname + path.sep) + chalk_1.default.bold(basename)
  );
};
module.exports = formatTestPath;
