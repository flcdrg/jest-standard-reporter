'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const chalk_1 = __importDefault(require('chalk'));
const { pluralize, renderTime } = require('./utils');
const getSummary = (aggregatedResults, options) => {
  let runTime = (Date.now() - aggregatedResults.startTime) / 1000;
  if (options && options.roundTime) {
    runTime = Math.floor(runTime);
  }
  const estimatedTime = (options && options.estimatedTime) || 0;
  const snapshotResults = aggregatedResults.snapshot;
  const snapshotsAdded = snapshotResults.added;
  const snapshotsFailed = snapshotResults.unmatched;
  const snapshotsOutdated = snapshotResults.unchecked;
  const snapshotsFilesRemoved = snapshotResults.filesRemoved;
  const snapshotsDidUpdate = snapshotResults.didUpdate;
  const snapshotsPassed = snapshotResults.matched;
  const snapshotsTotal = snapshotResults.total;
  const snapshotsUpdated = snapshotResults.updated;
  const suitesFailed = aggregatedResults.numFailedTestSuites;
  const suitesPassed = aggregatedResults.numPassedTestSuites;
  const suitesPending = aggregatedResults.numPendingTestSuites;
  const suitesRun = suitesFailed + suitesPassed;
  const suitesTotal = aggregatedResults.numTotalTestSuites;
  const testsFailed = aggregatedResults.numFailedTests;
  const testsPassed = aggregatedResults.numPassedTests;
  const testsPending = aggregatedResults.numPendingTests;
  const testsTodo = aggregatedResults.numTodoTests;
  const testsTotal = aggregatedResults.numTotalTests;
  const width = (options && options.width) || 0;
  const suites = `${chalk_1.default.bold('Test Suites: ') +
    (suitesFailed
      ? `${chalk_1.default.bold.red(`${suitesFailed} failed`)}, `
      : '') +
    (suitesPending
      ? `${chalk_1.default.bold.yellow(`${suitesPending} skipped`)}, `
      : '') +
    (suitesPassed
      ? `${chalk_1.default.bold.green(`${suitesPassed} passed`)}, `
      : '') +
    (suitesRun !== suitesTotal
      ? `${suitesRun} of ${suitesTotal}`
      : suitesTotal)} total`;
  const tests = `${chalk_1.default.bold('Tests:       ') +
    (testsFailed
      ? `${chalk_1.default.bold.red(`${testsFailed} failed`)}, `
      : '') +
    (testsPending
      ? `${chalk_1.default.bold.yellow(`${testsPending} skipped`)}, `
      : '') +
    (testsTodo
      ? `${chalk_1.default.bold.magenta(`${testsTodo} todo`)}, `
      : '') +
    (testsPassed
      ? `${chalk_1.default.bold.green(`${testsPassed} passed`)}, `
      : '')}${testsTotal} total`;
  const snapshots = `${chalk_1.default.bold('Snapshots:   ') +
    (snapshotsFailed
      ? `${chalk_1.default.bold.red(`${snapshotsFailed} failed`)}, `
      : '') +
    (snapshotsOutdated && !snapshotsDidUpdate
      ? `${chalk_1.default.bold.yellow(`${snapshotsOutdated} obsolete`)}, `
      : '') +
    (snapshotsOutdated && snapshotsDidUpdate
      ? `${chalk_1.default.bold.green(`${snapshotsOutdated} removed`)}, `
      : '') +
    (snapshotsFilesRemoved && !snapshotsDidUpdate
      ? `${chalk_1.default.bold.yellow(
          `${pluralize('file', snapshotsFilesRemoved)} obsolete`
        )}, `
      : '') +
    (snapshotsFilesRemoved && snapshotsDidUpdate
      ? `${chalk_1.default.bold.green(
          `${pluralize('file', snapshotsFilesRemoved)} removed`
        )}, `
      : '') +
    (snapshotsUpdated
      ? `${chalk_1.default.bold.green(`${snapshotsUpdated} updated`)}, `
      : '') +
    (snapshotsAdded
      ? `${chalk_1.default.bold.green(`${snapshotsAdded} written`)}, `
      : '') +
    (snapshotsPassed
      ? `${chalk_1.default.bold.green(`${snapshotsPassed} passed`)}, `
      : '')}${snapshotsTotal} total`;
  const time = renderTime(runTime, estimatedTime, width);
  return [suites, tests, snapshots, time].join('\n');
};
module.exports = getSummary;
