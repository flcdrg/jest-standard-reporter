'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const chalk_1 = __importDefault(require('chalk'));
const PROGRESS_BAR_WIDTH = 40;
const renderTime = (runTime, estimatedTime, width) => {
  // If we are more than one second over the estimated time, highlight it.
  const renderedTime =
    estimatedTime && runTime >= estimatedTime + 1
      ? chalk_1.default.bold.yellow(`${runTime}s`)
      : `${runTime}s`;
  let time = `${chalk_1.default.bold('Time:')}        ${renderedTime}`;
  if (runTime < estimatedTime) {
    time += `, estimated ${estimatedTime}s`;
  }
  // Only show a progress bar if the test run is actually going to take
  // some time.
  if (estimatedTime > 2 && runTime < estimatedTime && width) {
    const availableWidth = Math.min(PROGRESS_BAR_WIDTH, width);
    const length = Math.min(
      Math.floor((runTime / estimatedTime) * availableWidth),
      availableWidth
    );
    if (availableWidth >= 2) {
      time += `\n${chalk_1.default
        .green('█')
        .repeat(length)}${chalk_1.default
        .white('█')
        .repeat(availableWidth - length)}`;
    }
  }
  return time;
};
module.exports = renderTime;
