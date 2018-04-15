'use strict'
// 配置webpack编译入口
// 配置webpack输出路径和命名规则
// 配置模块resolve规则
// 配置不同类型模块的处理规则
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// 获取绝对路径 必须是绝对路径（使用 Node.js 的 path 模块）__dirname指的是根目录
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
//这里配置代码格式检查
// esLint配置 是静态代码检测工具 使用eslint可以保证一致的代码风格
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // 上下文选项用来决定根目录（即绝对路径）的入口文件
  context: path.resolve(__dirname, '../'),
  // entry 是打包文件的入口，将从这个文件路径下的文件作为打包入口，如果赋值一个字符串：这个字符串将为在开始编译的时候被加载，
  // 如果赋值为一个数组，这个数组的所有模块在编译启动时都将被加载，例如如果依赖第三方库如bootstrap，[name].js会被追加到打包好的[name].js中，最后一个数组的元素将被export entry: ['./src/main1.js', './src/main2.js']
  // 如果给一个entry 赋值为一个对象，这时将是一个多入口的{app: '', app1: ''}
  entry: {
    app: './src/main.js' //入口文件
  },
  // 生成的文件输出 path打包完成后 文件的路径 webpack输出的目标文件夹路径（例如：/dist） 读取config里面build 对象中assetsRoot属性
  // filename用来配置生成的文件名 webpack输出bundle文件命名格式 「入口分块(entry chunk)」的文件名模板   chunkFilename: "[chunkhash].js", 长效缓存 附加分块(非入口)的文件名模板
  // publicPath webpack编译输出的发布路径（例如'//cdn.aa.com/app/') webpack的output.publicPath 就相当于ajax的publicpath webpack打包时候会再异步模块的url上加上他
  output: {
    path: config.build.assetsRoot, //导出的文件
    filename: '[name].js', //文件名
    publicPath: process.env.NODE_ENV === 'production' //静态资源导出目录
      ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  //配置引用别名
  // 文件与文件直接的引用关系变复杂时，用alias 例如 '～': resolve(_dirname, 'src')   使用import a from '~/components/hello.vue'
  // 或'components': path.resolve(__dirname, '../src/components') import a from 'components/hello.vue'
  // extensions 用来解析模块的扩展数组 如果您希望扩展（如）所需的模块得到正确解析，则必须在数组中包含一个空字符串
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'), //@就相当于访问 src/
    }
  },
  //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT'
  },
  // 不同类型模块的处理规则
  // test 必须满足的配置条件，每个选项都会接收一个正则表达式或字符串
  // exclude 一个不能满足的条件，使用绝对路径，尽量避免 尽可能使用include
  // include导入的文件将由加载器转换的路径或文件的数组，使用绝对路径
  // loader 一串！分开的加载器，它相对上下文解析
  // loaders 作为字符串的一个加载器数组
  module: {
    // 模块规则（配置loader 解析器等选项）
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        // 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        // 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
