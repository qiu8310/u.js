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
exports['default'] = ocr;
var request = require('request'),
    fs = require('fs-extra'),
    _ = require('lodash'),
    h = require('../helper'),
    ylog = require('ylog')('u:ocr');

var defaultOCROptions = {
  fromDevice: 'node-u.js',
  clientIp: '10.10.10.0',
  detectType: 'LocateRecognize',
  languageType: 'CHN_ENG',
  imageType: 2,
  image: null
};

/**
 *
 * 调用百度 ocr 接口识别图片上的文字 {@link http://apistore.baidu.com/apiworks/servicedetail/146.html}
 *
 * 支持 中文、英文、日文、韩文
 *
 * @param {String} imgPath - 图片路径
 * @param {Object} [options] - 参数
 * @param {String} [options.detectType] - OCR接口类型，“LocateRecognize”；“Recognize”；“Locate”；“SingleCharRecognize”
 *        - LocateRecognize: 整图文字检测、识别,以行为单位 （默认值）
 *        - Locate: 整图文字行定位
 *        - Recognize: 整图文字识别
 *        - SingleCharRecognize: 单字图像识别
 *
 * @param {String} [options.languageType] - 要检测的文字类型
 *        - CHN_ENG：中英 （默认值）
 *        - ENG：英文
 *        - JAP：日文
 *        - KOR：韩文
 *
 * @param {String} [options.imageType] - 图片资源类型
 *
 *        - 1: 表示经过BASE64编码后的字串，然后需要经过 url encode 处理(特别重要)；
 *        - 2: 图片原文件
 *
 * @param {Function} cb - 回调函数，函数参数是 `(err, result)`， result 表示识别的结果
 */

function ocr(imgPath, options, cb) {

  var requestOptions = undefined,
      requestFormData = {};

  if (_.isFunction(options)) {
    ;

    var _ref = [options, {}];
    cb = _ref[0];
    options = _ref[1];
  }var _opts = _.assign({}, defaultOCROptions, _.pick(options, _.keys(defaultOCROptions)));
  if (!_opts.image) _opts.image = fs.createReadStream(imgPath);

  _.each(_opts, function (val, key) {
    requestFormData[key.toLowerCase()] = val;
  });

  requestOptions = {
    url: 'http://apis.baidu.com/apistore/idlocr/ocr',
    method: 'POST',
    formData: requestFormData,
    headers: {
      'apikey': h.baiduApiKey(options)
    }
  };

  ylog.info('request options', requestOptions);

  var handler = function handler(err, result) {
    if (err) ylog.error(err);else ylog.ok.no.wrap.ln.log(result).ln();
    if (cb) cb(err, result);
  };

  request(requestOptions, function (err, res, body) {
    if (err || !body) return handler(err || new Error('nothing return'), null);

    var ret = JSON.parse(body);

    ylog.verbose.no.wrap.log('baidu api returns', ret).ln();

    if (ret.errNum === '0') {
      handler(null, _.map(ret.retData, function (it) {
        return it.word;
      }).join(''));
    } else {
      handler(ret);
    }
  });
}

module.exports = exports['default'];