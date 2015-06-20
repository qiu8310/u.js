/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */


export default {
  done: (ylog, cb) => {
    return (err, result) => {
      if (err) ylog.error(err);
      else ylog.ok(result);
      if (cb) cb(err, result);
    };
  },

  baiduApiKey: (options) => {
    return options && options.apiKey || process.env.BAIDU_API_KEY;
  }
};
