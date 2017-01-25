'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _universalWebpack = require('universal-webpack');
var _universalWebpackSettings = require('./universal-webpack-settings');
var _universalWebpackSettings2 = _interopRequireDefault(_universalWebpackSettings);
if(process.env.NODE_ENV === 'production') {
    var _webpack = require('./webpack.production.config');
} else {
    var _webpack = require('./webpack.config');
}
var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

exports.default = (0, _universalWebpack.serverConfiguration)(_webpack2.default, _universalWebpackSettings2.default);
