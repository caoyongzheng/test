const webpack = require('webpack')
const path = require('path')
const production = process.env.NODE_ENV === 'production'

const publicPath = production ? '/test/assets/' : '/assets/'

const config = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: ['./src/index.js'],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: path.resolve('./assets'),
    publicPath,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  resolve: {
    root: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['', '.js', '.jsx'],
    alias: {},
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: production ? JSON.stringify('production') : JSON.stringify('development'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  debug: !production,
  postcss() {
    return [require('autoprefixer')]
  },
  devServer: {
    stats: {
      colors: true,
    },
    hot: true,
    publicPath,
    contentBase: path.resolve('./src'),
    historyApiFallback: true,
  },
}

if (!production) {
  config.devtool = '#source-map'
}

module.exports = config
