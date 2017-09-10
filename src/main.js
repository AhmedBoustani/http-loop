const request = require('request');
const print = require('./response');
const logs = require('./logs');
const headers = require(`${process.cwd()}/http-loop/input/headers`);
const body = require(`${process.cwd()}/http-loop/input/body`);
const params = require(`${process.cwd()}/http-loop/input/params`);

const options = {
  method: '',
  url: '',
  headers,
  json: true
};

const loop = n => f => {
  if (n > 0) {
    f();
    loop( n - 1)(f);
  }
};

function send_request () {
  request(options, (error, response, body) => {
    if (error) {
      print.error(error);
      process.exit(1);
    }
    logs.log(body);
  });
}

module.exports = {
  get: (url, len) => {
    options.url = url;
    options.method = 'GET';
    options.params = params;
    logs.init(options, len);
    loop(len)(send_request);
  },
  post: (url, len) => {
    options.url = url;
    options.method = 'POST';
    logs.init(options, len);
    body.map(x => {
      options.body = x;
      send_request();
    });
  },
  put: (url, len) => {
    options.url = url;
    options.method = 'PUT';
    logs.init(options, len);
    body.map(x => {
      options.body = x;
      send_request();
    });
  }
};
