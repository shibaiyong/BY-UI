import Calender from './src/calender.vue'

Calender.install = (Vue) => {
  Vue.component(Calender.name, Calender);
}

export default Calender