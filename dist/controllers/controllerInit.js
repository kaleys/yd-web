'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _IndexController = require('./IndexController');

var _IndexController2 = _interopRequireDefault(_IndexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	getAllRoutes: (app, router) => {
		app.use(router(_ => {
			_.get('/', _IndexController2.default.indexAction);
		}));

		// app.use(router(_ => {
		// 	_.get('/', (ctx, next) => {
		// 		ctx.body = 'hello'
		// 	})
		// 	_.post('/path', (ctx, next) => {

		// 	})
		// }))
	}
};