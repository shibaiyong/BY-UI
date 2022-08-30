import Dialog from './src/CommonDialog.vue'
import Vue from 'vue'
const DialogConstructor = Vue.extend(Dialog);

//id相同的两个弹窗可以复用。

const defaults = {
  id:'default',
  type:'confirm',
  title:'温馨提示',
  content:'暂无内容',
  cancel:'取消',
  confirm:'确定',
  cancelCB: new Function,
  confirmCB: new Function,
  
}

const $dialog = {

  Instance:null,

  id:'default',

  customId:{},

  confirm(options){

    let newOptions = {...defaults, id:'confirm', ...options, type:'confirm'}

    this.show(newOptions)
  },

  alert(options){

    let newOptions = {...defaults, id:'alert', ...options, type:'alert'}

    this.show(newOptions)
  },

  toast(options){

    let newOptions = {...defaults, id:'toast', ...options, type:'toast'}

    this.show(newOptions)
  },

  show(opts){
    let id = this.id = opts.id

    //id相同的两个弹窗可以复用。对象实例复用，dom也复用。能提高性能。
    if(this.customId[id]){

      Object.assign(this.customId[id], opts)

    }else{

      this.customId[id] = new DialogConstructor({

        el:document.createElement('div'),
        propsData:opts
  
      })
      document.body.appendChild(this.customId[id].$el)
    }
    //在这里可以直接修改props数据，？？？
    this.customId[id].showed()
  },

  hidden(flag){

    let id = flag ? flag : this.id
    this.customId[id].closed()
    this.customId[id] = null
  }


}

export { $dialog }