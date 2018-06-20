'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 首页的数据层
 * @author kaleys@qq.com
 */

class IndexModel {
	constructor() {}

	/**
  * 获取首页数据
  * @return {Promise} [description]
  * @example
  * getData();
  */
	getData() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					title: 'hello world'
				});
			}, 2000);
		});
	}

}
exports.default = IndexModel;