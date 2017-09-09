const usage = require('./src/usage');
const send = require('./src/main');

process.argv.map(arg => {
  switch (arg) {
    case '--help':
    case '-h':
      usage();
      process.exit(0);
  }
});

if (process.argv.length < 5) {
  usage();
  process.exit(1);
}

const type = process.argv[2].toLowerCase();
const url = process.argv[3];
const len = process.argv[4];

send[`${type}`](url, len);
