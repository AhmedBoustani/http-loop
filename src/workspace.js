const fs = require('fs');
const print = require('./response');

module.exports = {
  init: () => {
    const dir = `${process.cwd()}/http-loop`;
    fs.mkdir(dir, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          print.info('working directory http-loop already exists');
          process.exit(1);
        }
        print.error(err);
        process.exit(1);
      }
    });
    const work = `${dir}/input`;
    fs.mkdir(work, (err) => {
      if (err && err.code !== 'EEXIST') {
        print.error(err);
        process.exit(1);
      }
    });
    const header = { "cache-control": "no-cache" };
    fs.writeFileSync(`${work}/headers.json`, JSON.stringify(header, null, 2));
    fs.writeFileSync(`${work}/body.json`, JSON.stringify([{}], null, 2));
    fs.writeFileSync(`${work}/params.json`, JSON.stringify({}, null, 2));
    print.ok('Set up working directory http-loop');
  }
}
