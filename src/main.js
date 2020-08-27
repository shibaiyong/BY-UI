// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import '@/assets/css/common.css'
import '@/assets/css/dropload.css'
import Api from '@/assets/utils/api.js'

import App from './App'
import ByCheckbox from '@/components/checkbox'

if (typeof window !== 'undefined' && window.Vue) {
  console.log('window.vue')
}

Vue.use(Api)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  
})
