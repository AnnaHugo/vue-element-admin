'use strict'
// loading动画
// 删除目标文件夹 webpack编译之后会输出到配置里面指定的目标文件夹；删除目标文件夹之后再创建是为了去除旧的内容，以免产生不可预测的影响
// 执行webpack构建
// 输出信息

// 检查NodeJS和npm的版本
require('./check-versions')()
// ora，一个可以在终端显示spinner的插件
const ora = require('ora')
// rm，用于删除文件或文件夹的插件
const rm = require('rimraf')
const path = require('path')
// chalk，用于在控制台输出带颜色字体的插件
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const server = require('pushstate-server')
const open = require('open')

// 开启loading动画
var spinner = ora('开始打包 '+ process.env.env_config+ ' 环境...' )
spinner.start()
// 首先将整个dist 文件夹以及里面的内容删除 一面遗留旧的没用的文件 删除完成后开始webpack打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 执行webpack构建打包， 完成后在终端输出构建完成的相关信息或者输出报错信息并退出程序  
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  打包出错.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  打包完成.\n'))
    console.log(chalk.yellow(
      '  提示: 打包生成的文件，需要放在http服务器上访问.\n' +
      '  直接本地打开 index.html 文件，例如：file:// 是无法正常运行的.\n'
    ))
    //可根据npm_config_preview变量，确认是否自建服务器，预览打包后的文件
    if(process.env.npm_config_preview){
      server.start({
          port: 9526,
          directory: './dist',
          file: '/index.html'
      });
      console.log('> 准备启动本地服务器，预览打包完成后的文件，访问地址：' +  'http://localhost:9526' + '\n')
      open("http://localhost:9526")
    }
  })
})
