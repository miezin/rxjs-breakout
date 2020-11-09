const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve('./src', 'dist'),
    },
    devServer: {
      contentBase: path.resolve('./src', './dist'),
      compress: true,
      port: 8080,
  },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.scss', 'html' ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      ],
    }
};