import Vue from 'vue'
import store from './store'

// 去掉下边注释，只在生产环境保存错误信息
// if (process.env.NODE_ENV === 'production') {

Vue.config.errorHandler = function(err, vm, info, a) {
  // 这是一个hack写法
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  Vue.nextTick(() => {
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
    console.error(err, info)
  })
}

// }
