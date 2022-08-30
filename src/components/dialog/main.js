import Dialog from './src/CommonDialog.vue'

Dialog.install = (Vue) => {
  Vue.component(Dialog.name, Dialog);
}

export default Dialog