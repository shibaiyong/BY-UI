// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import '@/assets/css/common.css'
import '@/assets/css/dropload.css'
import Api from '@/utils/api.js'

import App from './App'
import ByCheckbox from '@/components/checkbox'
import ByDialog from '@/components/dialog'

if (typeof window !== 'undefined' && window.Vue) {
  console.log('window.vue')
}

Vue.use(Api)
Vue.prototype.$showdialog = ByDialog

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  
})
