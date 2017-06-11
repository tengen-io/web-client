
// # Path
// Duplicate of Node core path module
const path = require('path');

// # HtmlWebpackPlugin
// Takes a template .html and makes a [filename].html which dynamically includes
// other webpack bundles using <script> tags so you don't have to sweat changing
// the <script> tag as bundles get created.
//
// ( Especially useful for fingerprinted bundles )
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: Setup JSON config dir
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: './client/index.js',

    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    
    plugins: [ HtmlWebpackPluginConfig ]
}