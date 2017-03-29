require('../../lib/util');

var assert = require('assert');

describe('keys', function() {
  it('should return the keys', function() {
    var obj = { a: 1, b: 2, c: 3 };
    assert.deepEqual(Object.keys(obj), ['a', 'b', 'c']);
  });
});

describe('values', function() {
  it('should return the values', function() {
    var obj = { a: 1, b: 2, c: 3 };
    assert.deepEqual(Object.values(obj), [1, 2, 3]);
  });
});

describe('assign', function() {
  it('should assign to an object', function() {
    var a = { a: 1, b: 2 };
    var b = { b: 3, c: 4 };
    var assigned = Object.assign(a, b);
    assert.deepEqual(assigned, a);
    assert.equal(assigned.b, 3);
    assert.equal(assigned.c, 4);
  });
});

describe('flatten', function() {
  it('should flatten array', function() {
    var array = [1,[3]];
    assert.deepEqual(array.flatten(), [1,3]);
    assert.deepEqual(array, [1,[3]]);
  });

  it('should flatten only one level', function() {
    var array = [1, [2, [3, 4]]];
    assert.deepEqual(array.flatten(), [1, 2, [3, 4]]);
    assert.deepEqual(array, [1, [2, [3, 4]]]);
  });
});

describe('flattenDeep', function() {
  it('should flatten array', function() {
    var array = [1,[3]];
    assert.deepEqual(array.flattenDeep(), [1,3]);
    assert.deepEqual(array, [1,[3]]);
  });

  it('should flatten deep array', function() {
    var array = [1, [2, [3, 4]]];
    assert.deepEqual(array.flattenDeep(), [1, 2, 3, 4]);
    assert.deepEqual(array, [1, [2, [3, 4]]]);
  });
});
