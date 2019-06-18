'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const chalk_1 = __importDefault(require('chalk'));
const printDisplayName = config => {
  const { displayName } = config;
  if (displayName) {
    return chalk_1.default.supportsColor
      ? chalk_1.default.reset.inverse.white(` ${displayName} `)
      : displayName;
  }
  return '';
};
module.exports = printDisplayName;
