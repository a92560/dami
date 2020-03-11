/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-12-03 22:37:05
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:13:42
 */
const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  css: {
    extract: true, // css拆分ExtractTextPlugin插件，默认true - 骨架屏需要为true
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  publicPath: './', //打包后的位置(如果不设置这个静态资源会报404)
  outputDir: 'dist', //打包后的目录名称
  configureWebpack: {
    externals: {
      BMap: 'BMap',
    },
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/utils/skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
      }),
    ],
  },
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      error: false,
    },
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://localhost:7001/api',
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/reset.less')], // 引入全局样式变量
    },
  },
}