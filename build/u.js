/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

if (!process.env.BAIDU_API_KEY) process.env.BAIDU_API_KEY = '0e3504b3942f21c19bbdebd254e5f1b4';

_fs2['default'].readdirSync(__dirname + '/lib').forEach(function (file) {
  var key = file.replace('.js', '');
  exports[key] = require('./lib/' + key);
});