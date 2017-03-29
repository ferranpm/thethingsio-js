'use strict';

var fixtures = require('./fixtures');
var Writer = require('../../lib/Writer');
var api = require('../../lib/api');
var assert = require('assert');

describe('api', function() {
  this.timeout(5000);

  var value = Math.floor(Math.random()*10);

  it('should write a thing', function(done) {
    var w = new Writer();
    w.add('a', value);
    api.thing.write(fixtures.token, w)
      .then(function(response) {
        assert.equal(response.status, 'created');
        done();
      })
      .catch(done);
  });

  it('should get resources from a thing', function(done) {
    api.thing.resources(fixtures.token)
      .then(function(response) {
        assert(response.resources.indexOf('a') > -1);
        done();
      })
      .catch(done);
  });

  it('should read last value', function(done) {
    api.thing.read(fixtures.token, 'a')
      .then(function(response) {
        assert.equal(response[0].value, value);
        done();
      })
      .catch(done);
  });

  var description = {
    name: Date.now().toString(),
    number: Math.random().toString()
  };

  it('should write the description', function(done) {
    api.thing.description.write(fixtures.token, description)
      .then(function(response) {
        assert.equal(response.status, 'success');
        done();
      })
      .catch(done);
  });

  it('should read the description', function(done) {
    api.thing.description.read(fixtures.token)
      .then(function(response) {
        assert.deepEqual(response, description);
        done();
      })
      .catch(done);
  });

  it('should read all the last resources values', function(done) {
    api.thing.readAll(fixtures.token)
      .then(function(response) {
        assert(response.length > 0);
        response.forEach(function(resource) {
          assert(resource.key);
          assert(resource.values.length > 0);
        });
        done();
      })
      .catch(done);
  });

  it('should get the info of the last firmware', function(done) {
    api.thing.firmware.last(fixtures.token)
      .then(function(response) {
        assert.equal(response.status, 'success');
        assert(response.firmwares.length > -1);
        done();
      })
      .catch(done);
  });

  it('should subscribe', function(done) {
    var subscription = api.thing.subscribe(fixtures.token);
    subscription.on('data', function(data) {
      subscription.end();
      if (data && data.status === 'success') return done();
      done(new Error(data.message || 'Failed subscription'));
    });
    subscription.on('error', done);
  });

  it('should subscribe and receive data', function(done) {
    var subscription = api.thing.subscribe(fixtures.token);
    var value = Math.random();
    subscription.on('data', function(data) {
      if (data && data.status === 'success') {
        var w = new Writer();
        w.add('b', value);
        return api.thing.write(fixtures.token, w);
      }
      else if (data) {
        subscription.end();
        assert.equal(data[0].key, 'b');
        assert.equal(data[0].value, value);
        return done();
      }
      done(data.status.message || 'Failed subscription');
    });
    subscription.on('error', done);
  });

  describe('apps', function() {
    var token;

    it('should log in', function(done) {
      api.login(fixtures.appId, fixtures.email, fixtures.password)
        .then(function(response) {
          assert(response.token);
          token = response.token;
          done();
        })
        .catch(done);
    });
  });
});
