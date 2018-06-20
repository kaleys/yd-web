'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _index = require('./config/index');

var _index2 = _interopRequireDefault(_index);

var _controllerInit = require('./controllers/controllerInit');

var _controllerInit2 = _interopRequireDefault(_controllerInit);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default(); //路由
//日志

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
	root: _index2.default.viewDir,
	autoescape: true,
	cache: 'memory',
	varControls: ["[[", "]]"],
	ext: 'html'
}));

_log4js2.default.configure(_index2.default.log);
const logger = _log4js2.default.getLogger('cheese');

_errorHandler2.default.error(app, logger);
_controllerInit2.default.getAllRoutes(app, _koaSimpleRouter2.default);
app.use((0, _koaStatic2.default)(_index2.default.staticDir));
app.listen(_index2.default.port, () => {
	console.log(`${_index2.default.port} listening!!!`);
});