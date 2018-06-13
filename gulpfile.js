const gulp = require('gulp');
const watch = require('gulp-watch');
const sequence = require('gulp-sequence');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const env = process.env.NODE_ENV;

gulp.task('dev', () => {
	return watch('src/node-uii/**/*.js', {ignoreInitial: false}, () => {
		gulp.src('src/node-uii/**/*.js')
			.pipe(babel({
				babelrc: false,
				plugins: ["transform-es2015-modules-commonjs"]
			}))
			.pipe(gulp.dest('./dist'));
	});
});
gulp.task('buildprod', ()=> {
	gulp.src('src/node-uii/**/*.js')
		.pipe(babel({
			babelrc: false,
			ignore: 'src/node-uii/config/*.js',
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(gulp.dest('dist'));
});

//消除不必要的代码 tree shaking
gulp.task('rollup', () => {
	gulp.src('./src/node-uii/**/*.js')
		.pipe(rollup({
			output:{
				format: 'cjs',
			},
			input: './src/node-uii/config/index.js',
			plugins: [
				replace({
					"process.env.NODE_ENV": JSON.stringify('production')
				})
			]
		}))
		.pipe(gulp.dest('dist'));
})

let task = ['dev'];
if (env == 'production') {
	task = sequence(['buildprod', 'rollup']);
}

gulp.task('default', task);