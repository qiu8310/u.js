/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

import request from 'request';
import _ from 'lodash';
import h from '../helper';

var ylog = require('ylog')('u:words');


export default function (str, options, cb) {

  let done = h.done(ylog, cb);

  let _opts = _.assign({source: str, param1: 0, param2: 1}, _.pick(options, ['param1', 'param2']));

  ylog.info(_opts);

  request({
    url: 'http://apis.baidu.com/apistore/pullword/words',
    qs: _opts,
    json: true,
    headers: {
      'apikey': h.baiduApiKey(options)
    }
  }, (err, res, data) => {
    if (err) return done(err);
    done(null, data);
  });
}
