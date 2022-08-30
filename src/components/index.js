
import ByCheckbox from './checkbox'
import ByGestureLock from './gesturelock'
import ByDialog from './dialog/main.js'
import ByPicker from './picker'
import ByInput from './input'

import { $dialog } from './dialog'

let by_component = [
  ByCheckbox,
  ByGestureLock,
  ByPicker,
  ByInput,
  ByDialog
]

let $prototype = { $dialog }

let install = (Vue) => {

  by_component.forEach( component => {

    Vue.use(component)
  })

  Object.keys($prototype).forEach( item => {

    Vue.prototype[item] = $prototype[item]
  })
}

export default { install }
