/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

var ylog = require('ylog')('u:words');

exports['default'] = function (str, options, cb) {

  var done = _helper2['default'].done(ylog, cb);

  var _opts = _lodash2['default'].assign({ source: str, param1: 0, param2: 1 }, _lodash2['default'].pick(options, ['param1', 'param2']));

  ylog.info(_opts);

  (0, _request2['default'])({
    url: 'http://apis.baidu.com/apistore/pullword/words',
    qs: _opts,
    json: true,
    headers: {
      'apikey': _helper2['default'].baiduApiKey(options)
    }
  }, function (err, res, data) {
    if (err) return done(err);
    done(null, data);
  });
};

module.exports = exports['default'];