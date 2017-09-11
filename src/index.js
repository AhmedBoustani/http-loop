const usage = require('./usage');
const work = require('./workspace');
const logs = require('./logs');

process.argv.map((arg) => {
  switch (arg) {
    case 'init':
      work.init();
      process.exit(0);
    case '--help':
    case '-h':
      usage();
      process.exit(0);
    case '--clear-logs':
    case '-clr':
      logs.clear();
      process.exit(0);
    case '--head':
      logs.head();
      process.exit(0);
  }
});

if (process.argv.length < 4) {
  usage();
  process.exit(1);
}

const send = require('./src/main');
const type = process.argv[2].toLowerCase();
const url = process.argv[3];
const len = process.argv[4];


send[`${type}`](url, len);
