// 开始vue项目的基本配置
import Vue from 'vue'

import 'normalize.css/normalize.css'// 基础css样式初始化

import Element from 'element-ui'  //饿了么Element库
import 'element-ui/lib/theme-chalk/index.css' 

import '@/styles/index.scss' // 公共样式

import App from './App' //vue组件入口
import router from './router'   //路由表
import store from './store'    //vuex配置

import i18n from './lang' // 国际化插件
import './icons' // icon
import './errorLog'// error log
import './permission' // 权限控制函数
import './mock' // mock拦截数据

import * as filters from './filters' // 全局过滤器
//使用饿了么插件
Vue.use(Element, {
  size: 'medium', //设置尺寸
  i18n: (key, value) => i18n.t(key, value)
})
 
// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = true  //生产环境提示，关闭

// 生成vue实例
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
