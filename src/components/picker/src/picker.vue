<template>
<div class="dateArea">

  <ul ref="years" @scroll="winScroll($event)" @touchend="touchend">
    <li v-for="(item,index) in cloumndatas" :class="{'active':item.id==selectedInd}" :style="{transform:rotateXX(index)}" :key="item.id">{{item[name]}}</li>
  </ul>

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
    defaultValDate:[Number, String]
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
      scrollTop:0,
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
    //this.findByDefault();
    this.$nextTick(()=> {
      this.$refs.years.scrollTo(0,10)
      console.log(100,100)
    })
    
  },
  methods: {
    calculateIndex(date) {
      console.log(date)
      if(date){
        this.currentInd = this.selectedInd = 1 + this.cloumndatas.findIndex(item => item.name == date);
      }else{
        this.currentInd = this.selectedInd = Math.ceil(this.showRows/2)
      }
      
      //设置当前列表的位置
      this.$refs.years.scrollTop = (Math.ceil(this.showRows / 2) - this.selectedInd) * this.itemHigh

      this.$emit("isselected", '2', this.cloumn, this.cloumndatas[this.selectedInd - 1])
    },
    findByDefault() {

      if (this.datalen == 1) {

        this.$refs.years.scrollTop = this.itemHigh
        this.currentInd = this.selectedInd = 1
        this.$emit("isselected", '2', this.cloumn, this.cloumndatas[this.selectedInd - 1])
        return false
      }
      this.calculateIndex(this.defaultValDate)
    },

    winScroll(e){
      //设置当前列表的位置
      this.scrollTop = e.target.scrollTop
      //console.log(this.$refs.years.scrollTop)
      //计算第几项被选中
      this.currentInd = this.selectedInd = Math.round(Math.abs(this.scrollTop) / this.itemHigh);
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
      this.$refs.years.scrollTop = (Math.ceil(this.showRows / 2) - this.selectedInd) * this.itemHigh + 'PX';

      this.$emit("isselected", '1', this.cloumn, this.cloumndatas[this.selectedInd - 1])
    },

    rotateXX(i) {
      return `rotateX(${18 * (this.currentInd - i - 1)}deg)`;
    }
  },
  watch: {
    cloumndatas(newVal) {
      console.log("cloumndatas");
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
  padding: 42px 0;
  box-sizing: content-box;
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
  bottom:0;
  overflow-y: auto;
  overflow-x: hidden;
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