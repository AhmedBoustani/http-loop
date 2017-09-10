const fs = require('fs');
const print = require('./response');

const now = new Date();
const yy = now.getFullYear();
const mm = now.getMonth() + 1;
const dd = now.getDate();
const hh = now.getHours();
const mn = now.getMinutes();
const ss = now.getSeconds();
const dir = `${process.cwd()}/http-loop/logs`;
const filePath = `${dir}/${dd}-${mm}-${yy}@${hh}:${mn}:${ss}.json`;

module.exports = {
  init: (options, len) => {
    // Create logs directory if not exists
    fs.mkdir(dir, (err) => {
      if (err && err.code !== 'EEXIST') {
        print.error(err);
        process.exit(1);
      }
    });
    const message = {
      options,
      "Number of requests": len
    }
    // log file header
    fs.writeFile(filePath,
      JSON.stringify(message, null, 2),
      (err) => {
        if(err) {
          print.error(err);
          process.exit(1);
        }
        print.ok(`Created new log file with the name ${filePath.slice(12)}`);
        print.info('Check log file for the responses');
    });
  },

  log: (body) => {
    // Add a new entry to the log file
    fs.appendFile(filePath, JSON.stringify(body, null, 2), (err) => {
      if (err) {
        print.error(err);
        process.exit(1);
      }
    });
  },

  clear: () => {
    print.info('deleting logs...');
    if (!fs.existsSync(dir)) {
      print.ok('there are no logs to delete');
      process.exit(0);
    }
    fs.readdirSync(dir).map(x => {
      fs.unlink(`${dir}/${x}`, (err) => {
        if (err) {
          print.error(err);
          process.exit(1);
        }
      });
    });
    print.ok('successfully deleted logs');
  }
};
