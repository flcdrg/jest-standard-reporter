'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const chalk_1 = __importDefault(require('chalk'));
const { specialChars } = require('jest-util');
const { ICONS } = specialChars;
const getTestResults = testResults => {
  const testSuites = groupTestsBySuites(testResults);
  return getLogSuite(testSuites, 0);
};
const groupTestsBySuites = testResults => {
  const output = { suites: [], tests: [], title: '' };
  testResults.forEach(testResult => {
    let targetSuite = output;
    // Find the target suite for this test,
    // creating nested suites as necessary.
    for (const title of testResult.ancestorTitles) {
      let matchingSuite = targetSuite.suites.find(s => s.title === title);
      if (!matchingSuite) {
        matchingSuite = { suites: [], tests: [], title };
        targetSuite.suites.push(matchingSuite);
      }
      targetSuite = matchingSuite;
    }
    targetSuite.tests.push(testResult);
  });
  return output;
};
const getLogSuite = (suite, indentLevel) => {
  let output = '';
  if (suite.title) {
    output += getLine(suite.title, indentLevel);
  }
  output += logTests(suite.tests, indentLevel + 1);
  suite.suites.forEach(
    suite => (output += getLogSuite(suite, indentLevel + 1))
  );
  return output;
};
const getLine = (str, indentLevel) => {
  const indentation = '  '.repeat(indentLevel || 0);
  return `${indentation}${str || ''}\n`;
};
const logTests = (tests, indentLevel) => {
  let output = '';
  tests.forEach(test => (output += logTest(test, indentLevel)));
  return output;
};
const logTest = (test, indentLevel) => {
  const status = getIcon(test.status);
  const time = test.duration ? ` (${test.duration.toFixed(0)}ms)` : '';
  const testStatus = `${status} ${chalk_1.default.dim(test.title + time)}`;
  return getLine(testStatus, indentLevel);
};
const getIcon = status => {
  switch (status) {
    case 'failed':
      return chalk_1.default.red(ICONS.failed);
    case 'pending':
      return chalk_1.default.yellow(ICONS.pending);
    case 'todo':
      return chalk_1.default.magenta(ICONS.todo);
    default:
      return chalk_1.default.green(ICONS.success);
  }
};
module.exports = getTestResults;
