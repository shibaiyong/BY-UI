
<template>
<div class="input-box">
  <input type="text" v-model="val" placeholder="placeholder" :readonly="Mreadonly" @input="getFormatVal"/> 
</div>
</template>

<script>
export default {
  name: "by-input",
  model:{
    prop: 'value'
  },
  props: {
    value:[String, Number],
    type:String,
    Mstyle:Object,
    placeholder:String,
    Mreadonly:{
      default:false,
      type:Boolean
    },
    maxLength:[String,Number]
  },
  data() {
    this.reg = /[\D]/ig
    return {
      val:''
    }
  },
  updated(){
    //绑定到页面的数据才触发该钩子函数
  },
  created(){
    this.val = this.value
  },
  
  methods: {
    getFormatVal($event){
      if(this.type == "tel" && this.maxLength){
        this.val = this.val.replace(this.reg, '').slice(0, this.maxLength*1);
        this.$emit('input', this.val)
        return false
      }
      this.$emit('input', this.val)
    }
    
  },
}
</script>
<style scoped>
    .input-box{
      width:100%;
    }
    .input-box input{
      width:100%;
      height:0.9rem;
      outline: none;
      text-align: right;
      color:#666;
      border:none;
      padding:0;
      margin:0;
      box-sizing: border-box;
    }
  
</style>