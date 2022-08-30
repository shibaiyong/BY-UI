import { directives, runCountDown } from "./index"

export default{  
  install (Vue, options) {
    Object.keys( directives ).forEach(key => {
      Vue.directive(key, directives[key])
    })

    Vue.prototype.$runCountDown = runCountDown
  }
}