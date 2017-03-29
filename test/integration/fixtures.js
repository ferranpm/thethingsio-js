'use strict';

var fixtures = {
  local: {
    token: 'YOUR TOKEN HERE'
  },

  production: {
    token: 'YOUR TOKEN HERE',
    appId: 'rkMlx2EKreyJ3g',
    email: 'YOUR EMAIL HERE',
    password: 'YOUR PASSWORD HERE'
  }
};

module.exports = fixtures[process.env.NODE_ENV || 'production'];
