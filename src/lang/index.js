import Vue from 'vue'
import VueI18n from 'vue-i18n' //引入i8n插件
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'  //英文包
import zhLocale from './zh' //中文包

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // 判断语言习惯设置
  messages // 挂载语言包
})

export default i18n
