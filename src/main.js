import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/base.css'
import './assets/css/login.css'
import './assets/css/product.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
