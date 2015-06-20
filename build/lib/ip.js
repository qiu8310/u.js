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

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

var ylog = require('ylog')('u:ip');

/**
 *
 * cb 的第二个参数是个像下面这样的数组
 *  [
 *    "中国",    //国家
 *    "天津",    //直辖市或省份
 *    "天津",    //城市名称
 *    "",       // 机构或大学
 *    ""        // ISP
 *  ]
 */

exports['default'] = function (ip, cb) {

  var done = _helper2['default'].done(ylog, cb);

  (0, _request2['default'])({ url: 'http://freeapi.ipip.net/?ip=' + ip, json: true }, function (err, res, data) {
    if (err) return done(err);

    done(null, data);
  });
};

module.exports = exports['default'];