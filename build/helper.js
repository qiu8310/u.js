/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  done: function done(ylog, cb) {
    return function (err, result) {
      if (err) ylog.error(err);else ylog.ok(result);
      if (cb) cb(err, result);
    };
  },

  baiduApiKey: function baiduApiKey(options) {
    return options && options.apiKey || process.env.BAIDU_API_KEY;
  }
};
module.exports = exports["default"];