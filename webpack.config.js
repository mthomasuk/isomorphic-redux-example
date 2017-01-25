var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            use: [{
                loader: 'react-hot-loader/webpack'
            }],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['react', ['es2015', {
                        'modules': false
                    }], 'stage-0'],
                    plugins: ['transform-runtime']
                }
            }],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /style\.css/,
            use: [
                'style-loader', {
                    loader: 'css-loader'
                }
            ]
        }]

    }
};

module.exports.resolve = {
    modules: ['node_modules']
};
