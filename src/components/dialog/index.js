import Dialog from './CommonDialog.vue'
import Vue from 'vue'
const DialogConstructor = Vue.extend(Dialog);




export default (options, visible) => {
  let DialogDom = new DialogConstructor({
    el:document.createElement('div'),
    data() {
      return {
        textOptions:options,
        visible:visible||false
      }
    },
    methods: {
      confirmCallback() {
        if (this.textOptions.confirmCallback) {
          this.textOptions.confirmCallback(DialogDom);
        }
      },
      cancelCallback() {
        if (this.textOptions.cancelCallback) {
          this.textOptions.cancelCallback(DialogDom);
        }
      }
    },
  })
  document.body.appendChild(DialogDom.$el)
}