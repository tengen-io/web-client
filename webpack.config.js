const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
};

let config = {
    entry: path.join(paths.JS, 'app.js'),

    output: {
        path: paths.DIST,
        filename: 'app.bundle.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },

    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

module.exports = config;
