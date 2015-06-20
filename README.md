# u.js
[![NPM version](https://badge.fury.io/js/u.js.svg)](https://npmjs.org/package/u.js)
[![GitHub version][git-tag-image]][project-url]
<!--
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-url]][daviddm-image]
[![Inline docs][doc-image]][doc-url]
[![Code Climate][climate-image]][climate-url]
[![Coverage Status][coveralls-image]][coveralls-url]
-->


Useful command utilities.


## Install



```bash
npm install -g u.js
```



## Usage

```bash
Usage: u [options] [command]

Commands:

  tiny <fromImgFile> [toNewFile]  调用 tinypng 接口压缩图片（需要翻墙）
  ocr [options] <imgFile>         调用 baidu ocr 接口识别图片上文字
  words [options] <string>        调用 baidu 分词接口对字符串进行分词
  ip <ip>                         查询 ip 所在的地理位置

Options:

  -h, --help                    output usage information
  -V, --version                 output the version number
  -b, --baidu-api-key <string>  设置百度 API_KEY，默认会使用一个免费的 KEY
  -l, --level <level>           ylog 日志级别：silly, verbose, debug, info, ok , warn, error, fatal, silent
```



## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## History

[CHANGELOG](CHANGELOG.md)


## License

Copyright (c) 2015 Zhonglei Qiu. Licensed under the MIT license.



[doc-url]: http://inch-ci.org/github/qiu8310/u.js
[doc-image]: http://inch-ci.org/github/qiu8310/u.js.svg?branch=master
[project-url]: https://github.com/qiu8310/u.js
[git-tag-image]: http://img.shields.io/github/tag/qiu8310/u.js.svg
[climate-url]: https://codeclimate.com/github/qiu8310/u.js
[climate-image]: https://codeclimate.com/github/qiu8310/u.js/badges/gpa.svg
[travis-url]: https://travis-ci.org/qiu8310/u.js
[travis-image]: https://travis-ci.org/qiu8310/u.js.svg?branch=master
[daviddm-url]: https://david-dm.org/qiu8310/u.js.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/qiu8310/u.js
[coveralls-url]: https://coveralls.io/r/qiu8310/u.js
[coveralls-image]: https://coveralls.io/repos/qiu8310/u.js/badge.png

