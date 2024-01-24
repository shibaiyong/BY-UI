<template>
<!-- <div class="pickergroupmask" v-show="visible"> -->
  <div class="pickergroup" v-show="visible">
    
    <slot name="topOperate" :cancel='pickercancel' :confirm="pickerconfirm"></slot>

    <slot name="viewSection"></slot>

    <ul class="pickerscontainer">
      <li id="bar"></li>
      <li v-for="(item,index) in datasarray" v-if="item.isShow">
        <Picker :cloumn="index" :cloumnKey="item.keyName"  :key="item.keyInd" :showRows="item.showRows" :defaultValDate="item.defaultVal" :cloumndatas="item.cloumndatas" @isselected="selected"></Picker>
      </li>
    </ul>
    <slot name="bottomOperate" :cancel='pickercancel' :confirm="pickerconfirm"></slot>
  </div>
  
<!-- </div> -->
</template>

<script>

// import Picker from './picker.vue'

import Picker from './NormalPicker.vue'

export default {
  name: "by-picker",

  model:{
    prop: 'valueobj'
  },

  props: {
    valueobj:[Object,Array],

    datasarray: {
      type: Array,
      default: function() {
        return [];
      }
    },

    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      arr:[],
      canMove:true,
      obj:{}
    };
  },

  created(){
    this.$root.$on('isMove', res => {

      this.canMove = res
      
    })
  },

  mounted(){

    //防止在滑动日期选择组件的时候，整个页面也跟着滑动
    document.body.addEventListener('touchmove', e => {
      console.log(this.canMove)
      if(!this.canMove){
        e.preventDefault()
      }
    },{passive:false})
  },
  
  methods: {

    selected(type, cloumnKey, obj){

      let keyName = this.datasarray.map((item)=>{
        if(item.isShow){
          return item.keyName
        }
        return null;
      })
      //取交集
      let keyArr = Object.keys(this.obj)
      for(var i = 0; i < keyArr.length; i++){
        let i_item = keyArr[i];
        
        if(!keyName.includes(i_item)){
          delete this.obj[i_item]
        }
      }
      this.obj = {...this.obj,[cloumnKey]:obj.name}
      this.$set(this.arr, 0, Object.assign({},this.obj, {type}, obj))
      this.$emit('input', this.arr)
    },

    pickerconfirm(){
      this.$emit('confirm',this.arr)
    },

    pickercancel(){
      this.$emit('cancel','')
    },

    setDefaultDate(obj){
      for(let i in obj){
        this.$refs[i][0].calculateIndex(obj[i])
      }
    }
  },

  watch:{
    datasarray: {
      handler(newVal){
        console.log('监听数据',newVal)
      },
      deep:true
    }
  },

  components:{
    Picker
  }
};
</script>
<style scoped>

  .pickergroupmask{
    position: fixed;
    width:100%;
    top:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,0.3);
    z-index:12;
  }

  .pickergroup{
    background:#eee;
    /* background:white; */
    width:100%;
  }

  .pickerscontainer{
    display:flex;
    justify-content: space-between;
    padding:0.5rem 0;
    position: relative;
  }

  .pickerscontainer li{
    width:100%;
  }

  #bar{
    /* background:#ccc; */
    background:white;
    position: absolute;
    top:calc(0.5rem + 84PX);
    z-index:1;
    left:0;
    width:100%;
    height:42PX
  }
</style>