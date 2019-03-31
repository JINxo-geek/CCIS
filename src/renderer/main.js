import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import layer from 'vue-layer'
import aaaa from 'element-ui/lib/locale/lang/zh-CN' // 日期组件成为中文
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(ElementUI, {
  aaaa
})
Vue.prototype.$layer = layer(Vue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
window.jQuery = window.$ = require('jquery/dist/jquery.min')
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
