'use strict';

var Writer = require('../../lib/Writer');
var assert = require('assert');

describe('Writer', function() {
  it('should save a value', function() {
    var w = new Writer();
    w.add('a', 1);
    assert.deepEqual(w.toJSON(), {values: [{key: 'a', value: 1}]});
  });

  it('should save different values with the same key', function() {
    var w = new Writer();
    w.add('a', 1);
    w.add('a', 2);
    var obj = {
      values: [
        {key: 'a', value: 1},
        {key: 'a', value: 2}
      ]
    };
    assert.deepEqual(w.toJSON(), obj);
  });

  it('should save different values with different keys', function() {
    var w = new Writer();
    w.add('a', 1);
    w.add('a', 2);
    w.add('b', 4);
    var obj = {
      values: [
        {key: 'a', value: 1},
        {key: 'a', value: 2},
        {key: 'b', value: 4}
      ]
    };
    assert.deepEqual(w.toJSON(), obj);
  });

  it('should create a writer from an array', function() {
    var w = new Writer([
      {key: 'a', value: 1},
      {key: 'a', value: 2},
      {key: 'b', value: 3},
    ]);
    w.add('c', 4);
    var obj = {
      values: [
        {key: 'a', value: 1},
        {key: 'a', value: 2},
        {key: 'b', value: 3},
        {key: 'c', value: 4}
      ]
    };
    assert.deepEqual(w.toJSON(), obj);
  });

});
