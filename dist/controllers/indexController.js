'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _IndexModel = require('./../models/IndexModel');

var _IndexModel2 = _interopRequireDefault(_IndexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const model = new _IndexModel2.default();

exports.default = {
	indexAction: async (ctx, next) => {
		const data = await model.getData();
		ctx.body = await ctx.render('index/pages/index', data);
	}
};