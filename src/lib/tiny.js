/*
 * u.js
 * https://github.com/qiu8310/u.js
 *
 * Copyright (c) 2015 Zhonglei Qiu
 * Licensed under the MIT license.
 */

import fs from 'fs-extra';
import https from 'https';
import pb from 'pretty-bytes';
var ylog = require('ylog')('u:tiny');

const API_KEY = 'g23RE6VXEixBHA0EG4KdmU8DogjLH5cv';


/**
 *
 * 调用 tinypng 接口压缩图片 {@link https://tinypng.com/developers}
 *
 * @param {String} fromFile
 * @param {String} toFile
 * @param {Function} [cb]
 *
 */
export default function tiny(fromFile, toFile, cb) {

  /* Uncomment below if you have trouble validating our SSL certificate.
     Download cacert.pem from: http://curl.haxx.se/ca/cacert.pem */
  // var boundaries = /-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----\n/g
  // var certs = fs.readFileSync(__dirname + '/cacert.pem').toString()
  // https.globalAgent.options.ca = certs.match(boundaries);

  let options = require('url').parse('https://api.tinify.com/shrink');
  options.auth = 'api:' + API_KEY;
  options.method = 'POST';

  cb = cb || function() {};

  let request = https.request(options, (response) => {

    let body = '';
    response.on('data', (d) => { body += d.toString(); });

    response.on('end', () => {

      let data = JSON.parse(body);

      if (response.statusCode === 201) {
        let diffSize = data.input.size - data.output.size;
        ylog.info('finished compress, start downloading...');
        https.get(response.headers.location, function(response) {
          response.pipe(fs.createWriteStream(toFile));
          ylog.ok('saved ' + pb(diffSize) + ' -' + (diffSize / data.input.size * 100).toFixed() + '%');
          cb(null, data);
        });
      } else {
        ylog.error(data);
        cb(data);
      }
    });

  });

  fs.createReadStream(fromFile).pipe(request);
}
