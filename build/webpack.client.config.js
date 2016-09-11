
const base = require('./webpack.base.config');

const webpack = require('webpack');

const config = Object.assign({}, base, {
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'client-vendor-bundle.js'
    })
  ]
});

if (process.env.NODE_ENV === 'production') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  config.vue.loaders = {
    stylus: ExtractTextPlugin.extract({
      loader: "css-loader!stylus-loader",
      fallbackLoader: "vue-style-loader"
    })
  };

  config.plugins.push(
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({minimize: true}),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  )
}

module.exports = config;