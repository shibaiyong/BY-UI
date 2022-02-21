import ByPicker from './src'

ByPicker.install = (Vue, options) => {
  Vue.component(ByPicker.name, ByPicker);
}

export default ByPicker