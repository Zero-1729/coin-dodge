import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueHotKey from 'v-hotkey'

Vue.use(VueHotKey)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
