/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

if (!process.env.BAIDU_API_KEY) process.env.BAIDU_API_KEY = '0e3504b3942f21c19bbdebd254e5f1b4';

import fs from 'fs';

fs.readdirSync(__dirname + '/lib').forEach((file) => {
  let key = file.replace('.js', '');
  exports[key] = require('./lib/' + key);
});
