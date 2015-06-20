/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

import request from 'request';
import h from '../helper';

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
export default function (ip, cb) {

  let done = h.done(ylog, cb);

  request({url: 'http://freeapi.ipip.net/?ip=' + ip, json: true}, (err, res, data) => {
    if (err) return done(err);

    done(null, data);
  });
}
