const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
module.exports =  {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../" , "src/webapp/views/common/layout.html"),
        to: '../views/common/layout.html'
      },
      {
        from: path.join(__dirname, '../', 'src/webapp/widgets/'),
        to: '../widgets',
        test: /\.html$/
      }
    ], {
      copyUnmodified: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    })
  ]
}