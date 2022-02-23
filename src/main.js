// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import '@/assets/css/common.css'
import '@/assets/css/dropload.css'
import Api from '@/utils/api.js'
import '@/utils/ajustScreen.js'

import router from '@/router'

import App from './App'
import ByCheckbox from '@/components/checkbox'
import ByGestureLock from '@/components/gesturelock'
import ByDialog from '@/components/dialog'
import ByPicker from '@/components/picker'
import ByInput from '@/components/input'

let by_component = [
  ByCheckbox,
  ByGestureLock,
  ByPicker,
  ByInput
]
by_component.forEach( component => {
  Vue.use(component)
})

Vue.use(Api)

Vue.prototype.$showdialog = ByDialog

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
