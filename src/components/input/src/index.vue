<template>
<div class="container" v-show="visible">
<div class="input-box">
  <input type="text" v-model="val" :readonly="Mreadonly" @input="getFormatVal"/>  

  <span @click="callback1">清空</span><span @click="callback2">确认</span>
</div>


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
    maxLength:[String,Number],
    visible:[Boolean]
  },
  data() {
    this.reg = /[\D]/ig
    return {
      val:'',
      isEmpty:false
    }
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
      if(isEmpty){
        this.$emit('input', 0)
      }else{
        this.$emit('input', this.val)
      }
      
    },
    callback1() {
      this.isEmpty = true
      this.val=''
      this.$emit("cancelCB");
    },
    callback2() {
      this.isEmpty = false
      this.$emit("confirmCB");
    },
    
  }
};
</script>
<style scoped>

    .input-box{
      width:4rem;
      height:4rem;
      background:white;
      margin:2rem auto;
    }

    .input-box input{
      width:100%;
      height:0.9rem;
      outline: none;
      text-align: right;
      color:#666;
      /* border:none; */
      padding:0;
      margin:0;
      box-sizing: border-box;
    }

    .input-box span{
      font-size:0.20rem;
      display: inline-block;
      width:0.5rem;
    }

    .container{
      width:100%;
      position:fixed;
      top:0;
      bottom:0;
      background:rgb(0,0,0,0.6)
    }
  
</style>