import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// 在开发环境全部资源加载
// 因为懒加载太多页面，回让webpack热更新变慢
// 所以，只有在线上环境才会用懒加载
// 具体https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout' //一个layout框

/** 注意: 菜单只有在路由配置中，children>=1 才会生成
**/

/**
* hidden: true                   如果false，将不会生成菜单
* alwaysShow: true               如果设置为true，则忽略其children，该路由将总是展示中菜单中
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             名字是为了<keep-alive> (必须设置!!!)
* meta : {
    roles: ['admin','editor']    设置该页面的权限，不设置则为公用页面
    title: 'title'               页面的标题
    icon: 'svg-name'             显示在菜单中的图标,
    noCache: true                设为true，该页面不会被缓存，默认为false
  }
**/
// 都有的公共路由
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },//登录页面
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },//权限跳转页面
  { path: '/404', component: _import('errorPage/404'), hidden: true },//404
  { path: '/401', component: _import('errorPage/401'), hidden: true },//401
  {
    path: '',
    component: Layout,//所有子页面套上layout页
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/documentation',
    component: Layout,//所有子页面套上layout页
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// 后期会异步加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,//所有子页面套上layout页
    redirect: '/permission/index',
    // meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        // roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/icon',
    component: Layout,//所有子页面套上layout页
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '/components',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/example',
    component: Layout,//所有子页面套上layout页
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
          { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  {
    path: '/form',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },

  {
    path: '/error',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    path: '/excel',
    component: Layout,//所有子页面套上layout页
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,//所有子页面套上layout页
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  },

  {
    path: '/theme',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    path: '/clipboard',
    component: Layout,//所有子页面套上layout页
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

  {
    path: '/i18n',
    component: Layout,//所有子页面套上layout页
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },

  { path: '*', redirect: '/404', hidden: true }
]
