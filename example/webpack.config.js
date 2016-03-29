var Path = require('path');
var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'source-map',
    entry: './example/index.js',
    output: {
        path: './dist',
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: [ Path.resolve(__dirname, 'example'), Path.resolve(__dirname, '../lib/index.js')],
            loader: 'babel'
        }]
    },
    plugins: [
        new Webpack.optimize.OccurenceOrderPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin()
    ],
    resolve: {
        alias: { 'redux-roller': Path.resolve(__dirname, '../lib/index.js') }
    }
}
