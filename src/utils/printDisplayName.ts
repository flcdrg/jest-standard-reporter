import chalk from 'chalk';

const printDisplayName = config => {
  const { displayName } = config;

  if (displayName) {
    return chalk.supportsColor
      ? chalk.reset.inverse.white(` ${displayName} `)
      : displayName;
  }

  return '';
};

export = printDisplayName;
