'use strict';

var HTTP = require('./HTTP');
var Subscription = require('./Subscription');

module.exports = {
  thing: {
    activate: function(activationCode) {
      return HTTP.post('/things', { activationCode: activationCode });
    },

    write: function(token, writer) {
      return HTTP.post('/things/' + token, writer.toJSON());
    },

    resources: function(token) {
      return HTTP.get('/things/' + token + '/resources');
    },

    read: function(token, resource, limit) {
      if (!limit) limit = 1;
      return HTTP.get('/things/' + token + '/resources/' + resource + '?limit=' + limit);
    },

    readAll: function(token, limit) {
      if (!limit) limit = 1;
      return HTTP.get('/things/' + token + '/all_resources?limit=' + limit);
    },

    subscribe: function(token, callback, keepAlive) {
      return new Subscription(token, callback, keepAlive);
    },

    firmware: {
      last: function(token) {
        return HTTP.get('/things/' + token + '/firmwares/latest');
      },

      get: function(token, firmwareId) {
        // TODO: can't JSON.parse the firmware! should this use another request?
        return HTTP.get('/things/' + token + '/firmwares/download/' + firmwareId);
      }
    },

    description: {
      read: function(token) {
        return HTTP.get('/things/' + token + '/resources/description')
          .then(function(response) {
            if (response.length > 0) return response[0].value || {};
            return {};
          });
      },

      write: function(token, description) {
        return HTTP.put('/things/' + token + '/resources/description', description);
      }
    },
  },

  login: function(appId, email, password) {
    return HTTP.post('/login', { email: email, password: password, app: appId });
  },

  apps: {
    register: function(appId, email, password, language) {
      return HTTP.post('/apps/' + appId + '/register', { email: email, password: password, appId: appId, language: language });
    },

    users: {
      add: function(appId, email, password) {
        return HTTP.post('/apps/' + appId + '/users', { email: email, password: password });
      },

      list: function(appId, Authorization) {
        return HTTP.get('/apps/' + appId + '/users', { Authorization: Authorization });
      },

      remove: function(appId, Authorization, userId) {
        return HTTP.delete('/apps/' + appId + '/users/' + userId, { Authorization: Authorization });
      },
    },

    templates: {
      create: function(appId, Authorization, template) {
        return HTTP.post('/apps/' + appId + '/templates', template, { Authorization: Authorization });
      },

      get: function(appId, name) {
        return HTTP.get('apps/' + appId + '/templates/' + name);
      },

      update: function(appId, template) {
        return HTTP.put('/apps/' + appId + '/templates', template);
      },

      delete: function(appId, name) {
        return HTTP.delete('apps/' + appId + '/templates/' + name);
      }
    }
  },

  me: {
    linkThing: function(Authorization, thingToken) {
      return HTTP.post('/me/things', { thingToken: thingToken }, { Authorization: Authorization });
    },

    getResources: function(Authorization) {
      return HTTP.get('/me/resources', { Authorization: Authorization });
    },

    get: function(Authorization, resource) {
      return HTTP.get('me/resources/' + resource, { Authorization: Authorization });
    },

    settings: function(Authorization) {
      return HTTP.get('me/settings', { Authorization: Authorization });
    },

    grant: function(Authorization, permissions) {
      return HTTP.put('/me/grant', permissions, { Authorization: Authorization });
    },

    changePassword: function(Authorization, appId, currentPassword, newPassword) {
      var params = {
        appId: appId,
        currentPassword: currentPassword,
        password: newPassword,
        confirmationPassword: newPassword
      };
      return HTTP.put('/me', params, { Authorization: Authorization });
    },

    alerts: {
      create: function(Authorization, alert) {
        return HTTP.post('/me/alerts', alert, { Authorization: Authorization });
      },

      list: function(Authorization) {
        return HTTP.get('/me/alerts', { Authorization: Authorization });
      },

      get: function(Authorization, alertId) {
        return HTTP.get('/me/alerts/' + alertId, { Authorization: Authorization });
      },

      delete: function(Authorization, alertId) {
        return HTTP.delete('/me/alerts/' + alertId, { Authorization: Authorization });
      },
    }
  }
};
