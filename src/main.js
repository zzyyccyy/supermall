import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

Vue.config.productionTip = false
// $bus是空，new vue实例，搞一个事件总线，后边可以用
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
