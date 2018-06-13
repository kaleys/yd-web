import indexController from './IndexController';

export default {
	getAllRoutes: (app, router) => {
		app.use(router(_ => {
		  _.get('/', indexController.indexAction);
		}));

		// app.use(router(_ => {
		// 	_.get('/', (ctx, next) => {
		// 		ctx.body = 'hello'
		// 	})
		// 	_.post('/path', (ctx, next) => {

		// 	})
		// }))
	}
}