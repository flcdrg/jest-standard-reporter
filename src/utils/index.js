'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const formatTestPath_1 = __importDefault(require('./formatTestPath'));
const pluralize_1 = __importDefault(require('./pluralize'));
const printDisplayName_1 = __importDefault(require('./printDisplayName'));
const renderTime_1 = __importDefault(require('./renderTime'));
const trimAndFormatPath_1 = __importDefault(require('./trimAndFormatPath'));
const wrapAnsiString_1 = __importDefault(require('./wrapAnsiString'));
module.exports = {
  formatTestPath: formatTestPath_1.default,
  pluralize: pluralize_1.default,
  printDisplayName: printDisplayName_1.default,
  renderTime: renderTime_1.default,
  trimAndFormatPath: trimAndFormatPath_1.default,
  wrapAnsiString: wrapAnsiString_1.default
};
