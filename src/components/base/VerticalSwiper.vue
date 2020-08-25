<template>
  <div
    :style="{height:height*lineNum + 'px'}"
    class="rollScreen_container"
    id="rollScreen_container"
  >
    <ul
      class="rollScreen_list"
      :style="{transform:transform}"
      :class="{rollScreen_list_unanim:num===0}"
    >
      <li
        class="rollScreen_once"
        v-for="(item,index) in contentArr"
        :key="index"
        :style="{height:height+'px'}"
      >
        <span>{{item}}</span>
      </li>
      <!-- <li
        class="rollScreen_once"
        v-for="(item,index) in contentArr"
        :key="index+contentArr.length"
        :style="{height:height+'px'}"
      >
        <span>{{item}}</span>
      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      default: 40,
      type: Number
    },
    lineNum: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      contentArr: ["内容6", "内容弗兰克的今飞凯达积分"],
      num: 0,
      interval:null
    };
  },
  created() {
    
  },
  methods: {},
  computed: {
    transform() {
      return "translateY(-" + this.num * this.height + "px)";
    }
  },
  mounted() {
    let _this = this;
    this.interval = setInterval(function() {
      _this.num++;
      if (_this.num === _this.contentArr.length) {
        _this.num = 0;
      } 
    }, 3000);
  },
  beforeDestroy(){
      console.log(this.interval)
      alert('子组件')
      clearInterval(this.interval)
  }
};
</script>
<style scoped>
.rollScreen_container {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.rollScreen_list {
  transition: 1s linear;
}
.rollScreen_list_unanim {
  transition: none;
}
</style>