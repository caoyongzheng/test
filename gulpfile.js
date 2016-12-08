const gulp = require('gulp')
const gutil = require("gulp-util")
const del = require("del")
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const open = require("open")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('./webpack.config.js')

gulp.task('clean:assets', function (cb) {
  del.sync('./assets/**')
  cb()
})

const host = 'http://localhost'
const port = 3000

gulp.task('webpack-dev-server', function(callback) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  webpackConfig.entry.app.push(
    `webpack-dev-server/client?${host}:${port}`,
    'webpack/hot/only-dev-server'
  )
  const compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, webpackConfig.devServer).listen(port, "localhost", function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err)
    const url = `${host}:${port}`
    gutil.log('[webpack-dev-server]', url)
    open(url)
    callback()
  })
})

gulp.task("webpack:build", function(callback) {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      template: path.resolve('./src/template.html'),
      filename: path.resolve('./assets/index.html')
    })
  )
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
    }))
    callback()
  })
})

gulp.task('webpack', ['clean:assets', 'webpack:build'])
gulp.task("default", ["webpack-dev-server"])
