/**
 * 首页的数据层
 * @author kaleys@qq.com
 */

export default class IndexModel {
	constructor(){

	}


	/**
	 * 获取首页数据
	 * @return {Promise} [description]
	 * @example
	 * getData();
	 */
	getData(){
		return new Promise((resolve, reject) => {
			setTimeout(()=> {
				resolve('Hello Koa');
			}, 2000);
		})
	}

}