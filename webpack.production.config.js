var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            exclude: [/style\.css/, /\.css$/],
            minimize: true,
            compress: {
                warnings: false
            },
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['react', 'es2015', 'stage-0']
                }
            }],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /style\.css/,
            loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: "css-loader",
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ]
};
