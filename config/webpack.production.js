const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const minify = require("html-minifier").minify;
const path = require("path");
const rootPath = path.join(__dirname, '..');
module.exports =  {
  output: {
    filename: 'scripts/[name].[hash:5].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash:5].css",
    }),
    new CopyWebpackPlugin([
      {
        from: rootPath + "/src/webapp/views/common/layout.html",
        to: '../views/common/layout.html',
        transform(content) {
          return minify(content.toString(), {
            collapseWhitespace: true
          })
        }
      },
      {
        from: rootPath + '/src/webapp/widgets/',
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
    })
  ]
}