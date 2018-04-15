// 项目中的权限判断
import router from './router' //引入路由表
import store from './store' //引入store
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar进度条
import 'nprogress/nprogress.css'// progress bar 样式
import { getToken } from '@/utils/auth' // token工具函数

NProgress.configure({ showSpinner: false })// 配置

// 权限判定函数
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // 如果admin
  if (!permissionRoles) return true//没有要对比的
  return roles.some(role => permissionRoles.indexOf(role) >= 0)//和permissionoles对比
}

const whiteList = ['/login', '/authredirect','/404','/401']// 不需要权限就能进入的页面

router.beforeEach((to, from, next) => {
  NProgress.start() // 打开进度条
  if (getToken()) { 
    // 是否有登录token记录
    // 已经登录情况下
    if (to.path === '/login') {
      // 如果进入登录页面，则退回
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { 
          // 拉取user_info
          const roles = res.data.roles // 权限需要是数组格式如: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { 
            // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) 
            // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          // 获取uer_info出错
          store.dispatch('FedLogOut').then(() => {
            // 删除登录状态
            Message.error('Verification failed, please login again')
            next({ path: '/login' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          // 有权限
          next()
        } else {
          // 无权限
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* 没有登录token记录 */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      Message.error('请先登录!')
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 关闭加载条
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 加载over
})
