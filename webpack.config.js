const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
}

let config = {

    entry: path.join(paths.JS, 'app.jsx'),

    output: {
        path: paths.DIST,
        filename: 'app.bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test:/\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            },

        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html')
        }),
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;
