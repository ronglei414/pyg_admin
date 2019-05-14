import Vue from 'vue'
import App from './App'
import router from './router'

// 引入globa.css 全局样式
import './assets/css/global.css'
// 字体图标
import './assets/fonts/iconfont.css'

// 引入axios
import axios from './http'

// 引入element-ui
import Element from 'element-ui'
// 引入element-ui css
import 'element-ui/lib/theme-chalk/index.css'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// 注册emelent-ui
Vue.use(Element, {size: 'small'})
// 全局注册axios
Vue.prototype.$http = axios
// 控制台的日志更详细
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
