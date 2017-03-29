'use strict';

require('./util');

var configs = {
  local: {
    host: 'localhost',
    port: 6001,
    protocol: 'http',
    version: 'v2'
  },

  dev: {
    host: 'api-dev.thethings.io',
    protocol: 'https',
    version: 'v2'
  },

  production: {
    host: 'api.thethings.io',
    protocol: 'https',
    version: 'v2'
  }

};

var env = process.env.NODE_ENV || 'production';

if (!configs[env]) throw 'Unknown ' + env + ' environment. options: ' + Object.keys(configs);

module.exports = configs[env];
