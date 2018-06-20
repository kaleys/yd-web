'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
	viewDir: _path2.default.join(__dirname, '..', 'views'),
	staticDir: _path2.default.join(__dirname, '..', 'assets'),
	log: {
		appenders: {
			cheese: { type: 'file', filename: _path2.default.join(__dirname, '..', 'logs/error.log') }
		},
		categories: { default: { appenders: ['cheese'], level: 'error' } }
	}
};
if (process.env.NODE_ENV === 'production') {
	const proConfig = {
		port: '8080'
	};
	config = _lodash2.default.extend(config, proConfig);
}
if (process.env.NODE_ENV === 'development') {
	const devConfig = {
		port: '8081'
	};
	config = _lodash2.default.extend(config, devConfig);
}

exports.default = config;