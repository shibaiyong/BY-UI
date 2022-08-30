// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import '@/assets/css/common.css'
import '@/assets/css/dropload.css'
import Api from '@/utils/api.js'
import '@/utils/ajustScreen.js'

import router from '@/router'

import App from './App'
import by from '@/components'

Vue.use(by)
Vue.use(Api)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
