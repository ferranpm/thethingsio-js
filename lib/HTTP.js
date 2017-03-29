'use strict';

var config = require('./config');
var http = require(config.protocol);

function request(options, body) {
  return new Promise(function(resolve, reject) {
    var defaults = {
      protocol: config.protocol + ':',
      host: config.host,
      port: config.port
    };
    options = Object.assign({}, defaults, options);
    var payload = [];
    var req = http.request(options, function(res) {
      res.on('data', function (data) { payload.push(data); });
      res.on('error', reject);
      res.on('end', function() {
        var data = Buffer.concat(payload);
        if (/application\/json/i.test(res.headers['content-type']))
          return resolve(JSON.parse(data));
        else
          return resolve(data.toString());
      });
    });

    if (body && body.constructor !== String) body = JSON.stringify(body);
    if (body) req.write(body);

    req.end();
  });
}

var HTTP = {
  post: function(path, data, headers) {
    var options = {
      method: 'POST',
      path: '/' + config.version + '/' + path,
      headers: headers
    };
    return request(options, data);
  },

  put: function(path, data, headers) {
    var options = {
      method: 'PUT',
      path: '/' + config.version + '/' + path,
      headers: headers
    };
    return request(options, data);
  },

  get: function(path, headers) {
    var options = {
      method: 'GET',
      path: '/' + config.version + '/' + path,
      headers: headers
    };
    return request(options);
  },

  delete: function(path, headers) {
    var options = {
      method: 'DELETE',
      path: '/' + config.version + '/' + path,
      headers: headers
    };
    return request(options);
  }
};

module.exports = HTTP;
