var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    //devtool: 'source-map',
    entry: {
        main: [
            './index.tsx'
        ]
    },
    resolve: {
      extensions: ['', '.tsx', '.ts', '.js', '.less', '.css']
    },
    output: {
        path: path.join(__dirname, '../out'),
        publicPath: '/assets/dev/',
        filename: '[name].js'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true
      })
    ],
    module: {
        loaders: [
          { test: /\.ts(x?)$/, loader: 'ts-loader?configFileName=./tsconfig.json' }
        ]
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        }
    }
};
