<template>
<div class="dateArea">

  <ul ref="years" :style="{top:top+'px'}">
    <li v-for="(item,index) in cloumndatas" :class="{'active':item.id==selectedInd}" :style="{transform:rotateXX(index)}" :key="item.id">{{item[name]}}</li>
  </ul>

  <div class="datemask" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "by-picker",

  props: {
    name: {
      default:'name',
      type:[String]
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
      currentInd: 2
    };
  },
  created() {
    this.dataslen =
      this.cloumndatas instanceof Array ? this.cloumndatas.length : 0;
      console.log(this.cloumndatas)
  },
  updated() {},
  methods: {
    findByDefault() {
      this.$emit(
        "isselected",
        this.cloumn,
        this.cloumndatas[this.selectedInd - 1]
      );
    },
    touchstart(e) {
      let locations = e.targetTouches[0];

      this.parentoffsettop = this.$refs.years.offsetTop;

      this.pageY = locations.pageY;
    },
    touchmove(e) {
      let locations = e.targetTouches[0];
      //手指滑动的距离
      this.distance = locations.pageY - this.pageY;
      //设置当前列表的位置
      this.top = this.parentoffsettop + this.distance;
      //计算第几项被选中
      this.moveIndex = Math.round(Math.abs(this.distance) / 42);

      //手势移动的方向

      if (this.distance > 0) {
        this.direction = "down";
        this.currentInd = this.selectedInd - this.moveIndex;
      } else {
        this.direction = "up";
        this.currentInd = this.selectedInd + this.moveIndex;
      }
    },
    touchend(e) {
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
      this.top = (2 - this.selectedInd) * 42;

      this.$emit(
        "isselected",
        this.cloumn,
        this.cloumndatas[this.selectedInd - 1]
      );
    },
    rotateXX(i) {
      return `rotateX(${36 * (this.currentInd - i - 1)}deg)`;
    }
  },
  mounted() {
    this.findByDefault();
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
    white 0%,
    transparent 33%,
    transparent 67%,
    white 100%
  );
  z-index:3;
}

.datemask .line {
  width: 100%;
  height: 42px;
}

.datemask .line:first-child {
  border-bottom: 0.02rem solid #e5e5e5;
}

.datemask .line:last-child {
  border-top: 0.02rem solid #e5e5e5;
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
  transition: all 250ms linear;
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