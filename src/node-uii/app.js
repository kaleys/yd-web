import Koa from 'koa';
import server from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import router from 'koa-simple-router';
import log4js from 'log4js';															  //日志
import config from './config/index';
import controllerInit from './controllers/controllerInit';	//路由
import errorHandler from './middlewares/errorHandler';
const app = new Koa();
app.context.render = co.wrap(render({
	root: config.viewDir,
	autoescape: true,
	cache: 'memory',
	varControls: ["[[", "]]"],
	ext: 'html'
}));

log4js.configure(config.log);
const logger = log4js.getLogger('cheese');

//aaa
errorHandler.error(app, logger);
controllerInit.getAllRoutes(app, router);
app.use(server(config.staticDir));
app.listen(config.port, () => {
	console.log(`${config.port} listening!!!`);
})