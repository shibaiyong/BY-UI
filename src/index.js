// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/css/dropload.css'
import Api from '@/assets/utils/api.js'

import ByCheckbox from '@/components/checkbox'

let by_component = [
  ByCheckbox
]


const install = (Vue, opt={}) => {

  by_component.forEach( component => {
    Vue.use(component)
  })

  Vue.use(Api)
}

export default { install, ByCheckbox }

