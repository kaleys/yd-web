// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const minify = require("html-minifier").minify;
const path = require("path");
module.exports =  {
  output: {
    filename: 'scripts/[name].[hash:5].js'
  },
  plugins: [
    new CleanWebpackPlugin('dist/*'),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../", "src/webapp/views/common/layout.html"),
        to: '../views/common/layout.html',
        transform(content) {
          return minify(content.toString(), {
            collapseWhitespace: true
          })
        }
      },
      {
        from: path.join(__dirname, '../', 'src/webapp/widgets/'),
        to: '../widgets',
        transform (content) {
          return minify(content.toString(), {
            collapseWhitespace: true
          })
        }
      }
    ], {
      copyUnmodified: true,
      ignore: ["*.js", "*.css"]
    }),
    // new ExtractTextPlugin({
    //   filename: 'styles/[name].[hash:5].css'
    // })
    
  ]
}