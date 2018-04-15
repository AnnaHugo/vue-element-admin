'use strict'

const path = require('path')

module.exports = {
  //开发环境
  dev: {
    //相关路径
    //资源子目录 除了index.html，其余的js img css都分在这里
    assetsSubDirectory: 'static',
    //以当前根目录为项目目录，访问static/js/app.js
    assetsPublicPath: '/',
    //代理并转发ajax，解决跨域访问
    proxyTable: {
      // '**/*': {
      //   target: 'http://api.xxxxxxxx.com',
      // }
    },

    // 开发环境相关配置
    host: 'localhost', 
    port: 9527, // 访问端口，可以通过 process.env.PORT来配置, 如果端口被占用，会自动使用一个新的
    autoOpenBrowser: true,//自动打开浏览器
    errorOverlay: true,//打印错误
    notifyOnErrors: false,//系统提示错误信息
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: false,//是否启用Eslint格式检查
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,//是否把错误显示这浏览器中

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#cheap-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,//打破缓存

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,//是否生成css sourcemap
  },
  //线上环境
  build: {
    // html模版文件 index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // 路径配置
    // 构建输出目录也就是构建后的东西都扔这里
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 资源子目录 除了index.html，其余的js img css都分在这里
    assetsSubDirectory: 'static',
    // 以当前根目录为项目目录，访问static/js/app.js
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,//是否启用gzip压缩
    productionGzipExtensions: ['js', 'css'],//gzip压缩的文件后缀类型

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report //是否查看打包分析
  }
}
