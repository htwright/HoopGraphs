const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, '../client/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};