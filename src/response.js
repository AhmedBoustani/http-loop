const chalk = require('chalk');

module.exports = {
  info: (msg) => {
    console.log(chalk.blue('info:'), msg);
  },
  error: (msg) => {
    console.log(chalk.red('error:'), msg);
  },
  ok: (msg) => {
    console.log(chalk.green('ok:'), msg);
  },
  log: (msg) => {
    console.log(msg);
  }
}
