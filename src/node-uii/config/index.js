import path from 'path';
import _ from 'lodash';

let config = {
	viewDir: path.join(__dirname, '..', 'views'),
	staticDir: path.join(__dirname, '..', 'assets'),
	log: {
		appenders: {
			cheese: { type: 'file', filename: path.join(__dirname, '..', 'logs/error.log')}
		},
		categories: { default: { appenders: ['cheese'], level: 'error' } }
	}
};
if (process.env.NODE_ENV === 'production') {
	const proConfig = {
		port: '8080'
	};
	config = _.extend(config, proConfig);
} 
if (process.env.NODE_ENV === 'development') {
	const devConfig = {
		port: '8081',
	};
	config  = _.extend(config, devConfig);
}

export default config;
