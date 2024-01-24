<template>
<div class="dateArea" :style="pickerStyle">

  <ul ref="years" :style="{top:top+'px'}">
    <li v-for="(item,index) in cloumndatas" :class="{'active':item.id==selectedInd}" :style="{transform:rotateXX(index)}" :key="item.id">{{item[name]}}</li>
  </ul>

  <div class="datemask" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
  </div>
</div>
</template>

<script>
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
      pickerStyle: {}
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
    
    touchstart(e) {
      let locations = e.targetTouches[0];

      this.parentoffsettop = this.$refs.years.offsetTop;

      this.pageY = locations.pageY;
    },
    touchmove(e) {
      this.$root.$emit("isMove", false);

      let locations = e.targetTouches[0];
      //手指滑动的距离
      this.distance = locations.pageY - this.pageY;
      //设置当前列表的位置
      this.top = this.parentoffsettop + this.distance;
      //计算第几项被选中
      this.moveIndex = Math.round(Math.abs(this.distance) / 42);

      //手势移动的方向
      if (this.distance > 0) {
        this.currentInd = this.selectedInd - this.moveIndex;
      } else {
        this.currentInd = this.selectedInd + this.moveIndex;
      }
    },
    touchend(e) {
      this.$root.$emit("isMove", false);
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

    rotateXX(i) {
      return `rotateX(${18 * (this.currentInd - i - 1)}deg)`;
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
  transition: all 200ms linear;
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