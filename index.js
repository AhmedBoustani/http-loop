const request = require('request');
const fs = require('fs');
const print = require('./response');
const data = require('./data');

const options = {
  method: 'POST',
  url: 'http://localhost:1337/api/users',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json'
  },
  json: true
};


const now = new Date();
const yy = now.getFullYear();
const mm = now.getMonth() + 1;
const dd = now.getDate();
const hh = now.getHours();
const mn = now.getMinutes();
const ss = now.getSeconds();

const message =
`Options:
${JSON.stringify(options, null, 2)}
Number of requests: ${data.length}

`
const filePath = `./logs/${dd}-${mm}-${yy}@${hh}:${mn}:${ss}.txt`;
fs.mkdir('./logs', (err) => {
  if (err.code !== 'EEXIST') res.error(err)
})

fs.writeFile(filePath,
  message,
  (err) => {
    if(err) {
      return print.error(err);
    }
    print.info(`Created new log file with the name ${filePath.slice(7)}`);
    print.info('Check log file for the responses');
});

data.map(x => {
  options.body = x;
  request(options, (error, response, body) => {
    if (error) body = error;
    fs.appendFile(filePath, JSON.stringify(body, null, 2), (err) => {
      if (err) return print.error(err);
    });
  });
});
