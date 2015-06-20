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
exports['default'] = tiny;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _prettyBytes = require('pretty-bytes');

var _prettyBytes2 = _interopRequireDefault(_prettyBytes);

var ylog = require('ylog')('u:tiny');

var API_KEY = 'g23RE6VXEixBHA0EG4KdmU8DogjLH5cv';

/**
 *
 * 调用 tinypng 接口压缩图片 {@link https://tinypng.com/developers}
 *
 * @param {String} fromFile
 * @param {String} toFile
 * @param {Function} [cb]
 *
 */

function tiny(fromFile, toFile, cb) {

  /* Uncomment below if you have trouble validating our SSL certificate.
     Download cacert.pem from: http://curl.haxx.se/ca/cacert.pem */
  // var boundaries = /-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----\n/g
  // var certs = fs.readFileSync(__dirname + '/cacert.pem').toString()
  // https.globalAgent.options.ca = certs.match(boundaries);

  var options = require('url').parse('https://api.tinify.com/shrink');
  options.auth = 'api:' + API_KEY;
  options.method = 'POST';

  cb = cb || function () {};

  var request = _https2['default'].request(options, function (response) {

    var body = '';
    response.on('data', function (d) {
      body += d.toString();
    });

    response.on('end', function () {

      var data = JSON.parse(body);

      if (response.statusCode === 201) {
        (function () {
          var diffSize = data.input.size - data.output.size;
          ylog.info('finished compress, start downloading...');
          _https2['default'].get(response.headers.location, function (response) {
            response.pipe(_fsExtra2['default'].createWriteStream(toFile));
            ylog.ok('saved ' + (0, _prettyBytes2['default'])(diffSize) + ' -' + (diffSize / data.input.size * 100).toFixed() + '%');
            cb(null, data);
          });
        })();
      } else {
        ylog.error(data);
        cb(data);
      }
    });
  });

  _fsExtra2['default'].createReadStream(fromFile).pipe(request);
}

module.exports = exports['default'];