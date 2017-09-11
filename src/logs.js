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
const fileName = `${dd}-${mm}-${yy}@${hh}:${mn}:${ss}.json`;
const filePath = `${dir}/${fileName}`;

module.exports = {
  init: (options, n, len) => {
    // Create logs directory if not exists
    fs.mkdir(dir, (err) => {
      if (err && err.code !== 'EEXIST') {
        print.error(err);
        process.exit(1);
      }
    });
    const message = {
      options,
      'Number of requests': n,
      'Input size:': len,
      'data': []
    };
    // log file header
    fs.writeFile(filePath,
      JSON.stringify(message, null, 2),
      (err) => {
        if (err) {
          print.error(err);
          process.exit(1);
        }
        print.ok(`Created new log file with the name ${fileName}`);
        print.info('Check log file for the responses');
    });
  },

  log: (body) => {
    // Add a new entry to the log file
    const response = require(filePath);
    response.data.push(body);
    fs.writeFile(filePath, JSON.stringify(response, null, 2), (err) => {
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
    fs.readdirSync(dir).map((x) =>
      fs.unlink(`${dir}/${x}`, (err) => {
        if (err) {
          print.error(err);
          process.exit(1);
        }
      }));
    print.ok('successfully deleted logs');
  },

  head: () => {
    const files = fs.readdirSync(dir);
    // print.ok('')
    if (!files.length) {
      print.info('There are no logs to show');
      return;
    }
    const f = require(`${dir}/${files[files.length - 1]}`);
    print.ok(files[files.length - 1]);
    print.log(JSON.stringify(f, null, 2));
  }
};
