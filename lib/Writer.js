'use strict';

require('./util');

function Writer(values) {
  this._values = {};
  if (!values) return;
  var _this = this;
  if (values.constructor === Array) {
    values.forEach(function(value) {
      _this.add(value.key, value.value);
    });
  }
}

Writer.prototype.add = function(key, value) {
  if (!this._values[key]) this._values[key] = [];
  this._values[key].push(value);
};

Writer.prototype.toJSON = function() {
  var _this = this;
  var values = Object.keys(this._values).map(function(key) {
    return _this._values[key].map(function(value) {
      return { key: key, value: value };
    });
  }).flattenDeep();
  return { values: values };
};

module.exports = Writer;
