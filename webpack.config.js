//解析环境变量，将[,'--mode=production'] 转成{mode: production}
const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//返回匹配指定模式的文件名或者目录，php，python等语言都有这个函数
const glob = require('glob');
const { resolve, join, basename } = require("path");
const _mode = argv.mode || 'development';
const _config = require(`./config/webpack.${_mode}.js`);
const _files = glob.sync('./src/webapp/views/**/*.entry.js');
const _isProd = _mode === 'production';
const _entry = {};
const _fileReg = /([a-z]+)\/([a-z]+).entry.js/ig;
const _plugins = [];
_files.forEach(file => {
  if (_fileReg.test(file)) {
    const dirName = RegExp.$1;
    const entryName = RegExp.$2;
    _entry[entryName] = file;
    _plugins.push(new HtmlWebpackPlugin({
      filename: `../views/${dirName}/pages/${entryName}.html`,
      template: `src/webapp/views/${dirName}/pages/${entryName}.html`,
      minify: {
        collapseWhitespace: _isProd,
        removeAttributeQuotes: _isProd
      },
      inject: false
    }));
  }
})
let webpackConfig = {
  entry: _entry,
  output: {
    path: join(__dirname, 'dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].boundle.js'
  },
  module: {
    rules: [
      
    ]
  },
  // 是否开启监控模式，如果使用WDS默认就是开启的
  watch: !_isProd,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
  //优化相关的配置
  optimization: {
    splitChunks: {
      // chunks: all, async, initial  指出哪些打包chunks需要压缩，可以是个方法
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          // minSize: 0
        },
        // styles: {
        //   name: 'styles',
        //   test: '\.css$',
        //   chunks: 'all',
        //   enforce: true
        // }
      }
    },
    //将webpack模块加载方法抽到一个共用文件里
    runtimeChunk:{
      name: 'runtime'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/webapp')
    }
  },
  plugins: [
    ..._plugins,
    new HtmlAfterWebpackPlugin()
  ]
}
module.exports = merge(webpackConfig, _config);