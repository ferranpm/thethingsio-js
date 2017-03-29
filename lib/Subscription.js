'use strict';

var config = require('./config');
var EventEmitter = require('events');
var util = require('util');
var http = require(config.protocol);

function Subscription(token, keepAlive) {
  if (!keepAlive) keepAlive = 60;
  var subscriptionOptions = {
    method: 'GET',
    path: '/v2/things/' + token + '?keepAlive=' + keepAlive*1000
  };
  var defaults = {
    protocol: config.protocol + ':',
    host: config.host,
    port: config.port
  };
  var options = Object.assign({}, subscriptionOptions, defaults);
  var _this = this;
  this._request = http.request(options, function(response) {
    response.on('data', function(data) { _this.emit('data', JSON.parse(data)); });
    response.on('error', function(error) { _this.emit('error', error); });
    response.on('end', function() { _this.emit('end'); });
  });

  this._request.end();
}

util.inherits(Subscription, EventEmitter);

Subscription.prototype.end = function() {
  this._request.abort();
};

module.exports = Subscription;
