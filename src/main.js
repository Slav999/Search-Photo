import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as bootstrap from 'bootstrap'
import cors from 'cors'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  bootstrap,
  cors,
  render: h => h(App),
}).$mount('#app')
