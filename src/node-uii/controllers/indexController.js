import IndexModel from './../models/IndexModel';
const model =  new IndexModel();

export default {
	indexAction: async (ctx, next) => {
		const data = await model.getData();
		ctx.body = data;
	}
}