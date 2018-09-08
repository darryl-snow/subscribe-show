const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './clients/web'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/web'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist/web'),
    historyApiFallback: true,
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 4000,
    hot: true,
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        query:
          {
            presets: ['react'],
          },
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './clients/web/index.html'),
      hash: false,
      filename: './index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      { from: 'images/', to: 'images/', force: true },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
