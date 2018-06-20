const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const rootPath = path.join(__dirname, '..');
module.exports =  {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: rootPath + "/src/webapp/views/common/layout.html",
        to: '../views/common/layout.html',
      },
      {
        from: rootPath + '/src/webapp/widgets/',
        to: '../widgets',
        test: /\.html$/
      }
    ], {
      copyUnmodified: true,
      ignore: ["*.js", "*.css"]
    })
  ]
}