const request = require('request');
const print = require('./response');
const logs = require('./logs');
let headers;
let body;
let params;
try {
  body = require(`${process.cwd()}/http-loop/input/body`);
  params = require(`${process.cwd()}/http-loop/input/params`);
  headers = require(`${process.cwd()}/http-loop/input/headers`);
} catch (e) {
  print.error('CANNOT OPEN REQUIRED FILES');
  print.error(e);
  return;
}

const options = {
  method: '',
  url: '',
  headers,
  json: true
};

const loop = (n) => (f) => {
  if (n > 0) {
    f();
    loop( n - 1)(f);
  }
};

/**
 * send request
 */
function sendRequest () {
  request(options, (error, response, body) => {
    if (error) {
      print.error(error);
      process.exit(1);
    }
    logs.log(body);
  });
}

module.exports = {
  get: (url, len = 1) => {
    options.url = url;
    options.method = 'GET';
    options.params = params;
    logs.init(options, len);
    loop(len)(sendRequest);
  },
  post: (url, len = 1) => {
    options.url = url;
    options.method = 'POST';
    logs.init(options, len);
    loop(len)(() => {
      body.map((x) => {
        options.body = x;
        sendRequest();
      });
    });
  },
  put: (url, len = 1) => {
    options.url = url;
    options.method = 'PUT';
    logs.init(options, len);
    loop(len)(() => body.map((x) => {
      options.body = x;
      sendRequest();
    }));
  }
};
