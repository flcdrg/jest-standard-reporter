'use strict';
/* eslint-disable no-underscore-dangle */
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const { isInteractive } = require('jest-util');
const Status = require('./status');
const Stdlib = require('./stdlib');
const getResultHeader = require('./getResultHeader');
const getSnapshotStatus_1 = __importDefault(require('./getSnapshotStatus'));
const getSummary = require('./getSummary');
const getTestResults = require('./getTestResults');
class StandardReporter {
  constructor(globalConfig) {
    this.globalConfig = globalConfig;
    this.stdlib = new Stdlib(globalConfig);
    this.error = null;
    this.clear = '';
    this.status = new Status();
    this.status.onChange(() => {});
  }
  getLastError() {
    return this.error;
  }
  setError(error) {
    this.error = error;
  }
  /**
   * @param results
   * @param options
   */
  onRunStart(results, options) {
    this.status.runStarted(results, options);
    if (isInteractive) {
      this.stdlib.clear();
    }
  }
  /**
   * @param test
   */
  onTestStart(test) {
    this.status.testStarted(test.path, test.context.config);
  }
  /**
   * @param test
   * @param testResult
   * @param results
   */
  onTestResult(test, testResult, results) {
    this.status.testFinished(test.context.config, testResult, results);
    if (!testResult.skipped) {
      this.stdlib.log(
        getResultHeader(testResult, this.globalConfig, test.context.config)
      );
      if (
        this.globalConfig.verbose &&
        !testResult.testExecError &&
        !testResult.skipped
      ) {
        this.stdlib.log(getTestResults(testResult.testResults));
      }
      if (testResult.failureMessage) {
        this.stdlib.error(testResult.failureMessage);
      }
      const didUpdate = this.globalConfig.updateSnapshot === 'all';
      const snapshotStatuses = getSnapshotStatus_1.default(
        testResult.snapshot,
        didUpdate
      );
      snapshotStatuses.forEach(this.stdlib.log);
    }
    this.stdlib.forceFlushBufferedOutput();
  }
  /**
   * @param contexts
   * @param aggregatedResults
   */
  onRunComplete(contexts, aggregatedResults) {
    this.stdlib.log(getSummary(aggregatedResults));
    this.status.runFinished();
    this.stdlib.close();
    this.stdlib.clear();
  }
}
module.exports = StandardReporter;
