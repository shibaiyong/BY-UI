<template>
<div class="dateArea" :style="pickerStyle" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
  <ul ref="years" :style="{transform: `translate3d(0, ${top}px, 0)`,transitionDuration: `${currentDuration}ms`,transitionProperty:currentDuration ? 'all' : 'none'}" @transitionend="stopMomentum">
    <li v-for="(item,index) in cloumndatas" :class="{'active':item.id==selectedInd}" :style="{}" :key="item.id" @click="clickOptions">{{item[name]}}</li>
  </ul>

  <div class="datemask"></div>
</div>
</template>

<script>
const DEFAULT_TRANSITION = 200;
const DEFAULT_DURATION = 300;
const MOMENTUM_DISTANCE = 20;
export default {
  name: "by-picker",
  props: {
    name: {
      default: "name",
      type: [String]
    },
    cloumndatas: {
      type: Array,
      default: function() {
        return [];
      }
    },
    cloumn: {
      default: 0,
      type: [Number, String]
    },
    itemHigh: {
      default: 42,
      type: [Number, String]
    },
    showRows: {
      default: 3,
      type: [Number, String]
    },
    defaultValDate:[Number, String],
    cloumnKey:{
      type: [Number, String]
    }
  },
  data() {
    return {
      pageY: 0,
      top: 0,
      parentoffsettop: 0,
      selectedInd: 2,
      direction: "up",
      distance: 0,
      lockFlag: false,
      moveIndex: 0,
      currentInd: 2,
      pickerStyle: {},
      currentDuration:0,
      startTime:0,
      moveDuration:0,
      duration:0,
      momentumDistance:0,
      ismove:false,//避免单击事件触发touchend计算选中索引
    };
  },
  created() {
    this.dataslen = this.cloumndatas instanceof Array ? this.cloumndatas.length : 0;
    this.pickerStyle = {
      height: this.itemHigh + "PX",
      padding: this.itemHigh * Math.floor(this.showRows / 2) + "PX" + " 0"
    };
  },
  mounted() {
    this.findByDefault();
  },
  methods: {
    calculateIndex(date) {
      if(date){
        //date未找到时，则展示默认选中项。
        //findIndex:对于空数组不执行，没找到时返回-1，找到后返回对应的索引并且后面的元素不再执行。
        this.currentInd = this.selectedInd = 1 + this.cloumndatas.findIndex(item => item.name == date);
      }else{
        this.currentInd = this.selectedInd = Math.ceil(this.showRows/2)
      }
      
      //设置当前列表的位置
      this.top = (Math.ceil(this.showRows / 2) - this.selectedInd) * 42

      this.$emit("isselected", '2', this.cloumnKey, this.cloumndatas[this.selectedInd - 1])
    },
    findByDefault() {

      if (this.datalen == 1) {

        this.top = this.itemHigh
        this.currentInd = this.selectedInd = 1
        this.$emit("isselected", '2', this.cloumnKey, this.cloumndatas[this.selectedInd - 1])
        return false
      }
      this.calculateIndex(this.defaultValDate)
    },
    clickOptions(){
      console.log('hihihihi')
    },
    touchstart(e) {
      let locations = e.targetTouches[0];
      //this.parentoffsettop = this.$refs.years.offsetTop;
      this.currentDuration = 0;
      this.momentumDistance = 0;
      this.parentoffsettop = this.top;
      this.pageY = locations.pageY;
      this.startTime = Date.now();
      this.ismove = false
    },
    touchmove(e) {
      this.$root.$emit("isMove", false);
      this.ismove = true;
      let locations = e.targetTouches[0];
      //手指滑动的距离
      this.distance = locations.pageY - this.pageY;
      //设置当前列表的位置
      this.top = this.parentoffsettop + this.distance;
      //判断是否要执行惯性滚动
      let now = Date.now();
      if(now - this.startTime > DEFAULT_DURATION){
        this.startTime = Date.now();
        this.momentumDistance = this.distance;
      }
    },
    touchend(e) {
      this.$root.$emit("isMove", true);
      if(!this.ismove){
        return false;
      }
      let duration = Date.now() - this.startTime;
      let distance = this.distance - this.momentumDistance;
      let momentumFlag = duration < DEFAULT_DURATION && Math.abs(distance) > MOMENTUM_DISTANCE;
      if(momentumFlag){
        this.momentum(distance,duration);
        return false;
      }
      this.currentDuration = DEFAULT_TRANSITION;
      this.updateCurrentIndex()
    },
    rotateXX(i) {
      return `rotateX(${18 * (this.currentInd - i - 1)}deg)`;
    },
    momentum(distance,duration){
      let speed = Math.abs(distance / duration);
      let newDistance = speed / 0.003 * (distance < 0 ? -1 : 1);
      this.distance = this.momentumDistance + newDistance;
      this.currentDuration = 1000;
      this.updateCurrentIndex();
    },
    updateCurrentIndex(){
      this.moveIndex = Math.round(Math.abs(this.distance) / 42);
      //手势移动的方向
      if (this.distance > 0) {
        this.currentInd = this.selectedInd - this.moveIndex;
      } else {
        this.currentInd = this.selectedInd + this.moveIndex;
      }
      //超出边界判断
      if (this.currentInd < 1) {
        this.selectedInd = 1;
        this.currentInd = 1;
      } else if (this.currentInd > this.dataslen) {
        this.selectedInd = this.dataslen;
        this.currentInd = this.dataslen;
      } else {
        this.selectedInd = this.currentInd;
      }
      //设置当前列表的位置
      this.top = (Math.ceil(this.showRows / 2) - this.selectedInd) * 42;
      this.$emit("isselected", '1', this.cloumnKey, this.cloumndatas[this.selectedInd - 1])
    },
    stopMomentum(){
      console.log('过渡完成');
      this.currentDuration = 0;
      this.ismove = false;
    }
  },
  watch: {
    cloumndatas(newVal) {
      this.dataslen = newVal.length;
      //特殊情况只有一条数据
      //this.findByDefault();
    }
  }
};
</script>
<style scoped>
.dateArea {
  position: relative;
  width: 100%;
  height: 42px;
  overflow: hidden;
  padding: 42px 0;
  box-sizing: content-box;
}

.dateArea .datemask {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    /* white 0%, */
    #eee 0%,
    transparent 33%,
    transparent 67%,
    /* white 100% */
    #eee 0%
  );
  z-index: 3;
  opacity: 0.6;
}
.dateArea ul {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 0.36rem;
  color: #333;
  z-index: 2;
  left: 0;
  top: 0;
  transition-timing-function: cubic-bezier(.23,1,.68,1);
}
.dateArea ul li {
  height: 42px;
  line-height: 42px;
  color: #999;
}

.dateArea ul li.active {
  color: #333;
}
</style>