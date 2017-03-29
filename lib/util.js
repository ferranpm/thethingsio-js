'use strict';

if (!Object.keys) {
  Object.keys = function(obj) {
    var arr = [];
    for (var key in obj) {
      arr.push(key);
    }
    return arr;
  };
}

if (!Object.values) {
  Object.values = function(obj) {
    var arr = [];
    for (var key in obj) {
      arr.push(obj[key]);
    }
    return arr;
  };
}

if (!Object.assign) {
  Object.assign = function(obj) {
    var others = Object.values(arguments).slice(1);
    others.forEach(function(o) {
      for (var key in o) {
        obj[key] = o[key];
      }
    });
    return obj;
  };
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function() {
    return this.reduce(function(acc, value) {
      if (value.constructor === Array) return acc.concat(value);
      acc.push(value);
      return acc;
    }, []);
  };
}

if (!Array.prototype.flattenDeep) {
  Array.prototype.flattenDeep = function() {
    return this.reduce(function(acc, value) {
      if (value.constructor === Array) return acc.concat(value.flattenDeep());
      return acc.concat([value]);
    }, []);
  };
}
