<template>
      <div class="calenderWrapper">
        <div class="calenderContainer" v-show="visible">
            <div class="title">

                <a href="javascript:void(0);" class="prev" @click="changeMonth('prve')">上一月</a>

                <span>{{title}}</span>
                
                <a href="javascript:void(0);" class="next" @click="changeMonth('next')">下一月</a>
            </div>
            <ul>
                <li><span>日</span></li>
                <li><span>一</span></li>
                <li><span>二</span></li>
                <li><span>三</span></li>
                <li><span>四</span></li>
                <li><span>五</span></li>
                <li><span>六</span></li>
                <!--<li><span>日</span></li>-->
            </ul>
            <ul class="dateTable">
                <li v-for="item in showDate" :key="item.displayIntoText"  :class="[clickDay?'':item.now, item.day==clickDay?'clickActive':'']">
                    <span v-if="item.month == item.currentMonth" @click="displayDate(item.displayIntoText, item.day)">{{item.day}}</span>
                    <span v-else class='disableClick'>{{item.day}}</span>
                    <label class="task">●</label>
                </li>
            </ul>
        </div>
    </div>  
</template>
<script>
// import TreeContent from "@/components/common/TreeContent"

export default {
  name: "by-calender",
  props:{
    format:{
      type:String,
      default:'yyyy-MM-dd'
    },
    formatValue:{
      type:String,
      default:'yyyy-MM-dd'
    },
    defaultValue:{
      type:String,
      default:''
    },
    visible:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      title: "",
      showDate: [],
      nowMonth: "",
      nowYear: "",
      displayIntoText: "",
      clickDay: ""
    };
  },
  updated() {},
  beforeCreate: function() {
    // this.$options.components.TreeContent = () => import("@/components/common/TreeContent")
  },
  created() {
    this.initeNowDate();
  },
  mounted() {
    //有默认值显示，无默认值该逻辑不执行。
    this.defaultValue ? this.backShowDate() : this.createdCalender(this.nowYear, this.nowMonth);
  },
  methods: {
    initeNowDate() {
      let date = new Date();
      this.initeNowMonth = this.nowMonth = date.getMonth();
      this.initeNowYear = this.nowYear = date.getFullYear();
      this.initeNowDate = this.nowDate = date.getDate();
      
    },
    changeMonth(type) {
      this.nowMonth = type == "next" ? ++this.nowMonth : --this.nowMonth;
      this.createdCalender(this.nowYear, this.nowMonth);
    },

    //将输入框中的日期回显到新生成的日历中,显示传过来的默认值。
    backShowDate() {
      var inputDateValue = this.defaultValue;
      
      var regex = /(\d{4})\D*(\d{1,})\D*(\d{1,})/;
      //检测手动输入的日期格式是否正确
      if (!regex.test(inputDateValue)) {
        return false;
      }
      //利用正则提取取年、月、日。
      regex.exec(inputDateValue);
      var year = RegExp.$1 * 1;
      var month = RegExp.$2 * 1;
      var date = RegExp.$3 * 1;

      //改变起始年份和月份
      this.nowYear = year;
      this.nowMonth = month;

      inputDateValue =
        year +
        "-" +
        (month > 9 ? month : "0" + month) +
        "-" +
        (date > 9 ? date : "0" + date);
      
      //根据输入的日期重新生成日历
      this.createdCalender(year, month-1);
      //重新渲染日历的文本显示、效果展示
      this.displayIntoText = this.dateFormat( inputDateValue, this.format );
      regex = "";
    },
    //根据日期的改变生成日历。
    createdCalender(year, month) {
      this.clickDay = '';//月份变化时去掉点击效果。
      var willCreatDate = [];
      var currentDate = new Date(year, month, 1);
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth();
      //某个月一号是星期几
      var currentDay = currentDate.getDay();
      var now = "";
      var n = 1 - currentDay;
      this.title = currentYear + "年" + (currentMonth + 1) + "月";
      this.$emit('clickMonBtnCB',{year:currentYear, month:currentMonth+1});
      //确定上个月有几天展示出来。
      n = n == 1 ? 1 : n;
      currentDate.setDate(n);
      for (var i = 0; i < 42; i++) {
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        if (
          this.initeNowYear == currentYear &&
          this.initeNowMonth == currentMonth &&
          this.initeNowDate == day
        ) {
          now = "active";
        } else {
          now = "";
        }
        willCreatDate.push({
          day: day,
          month: month,
          currentMonth: currentMonth,
          displayIntoText:
            currentYear +
            "-" +
            (month + 1 > 9 ? month + 1 : "0" + (month + 1)) +
            "-" +
            (day > 9 ? day : "0" + day),
          now: now
        });
        currentDate.setDate(day + 1);
      }
      this.showDate = willCreatDate;
    },
    //将选择的日期显示到输入框中
    displayDate(text, day) {
      var displayIntoText = text;
      var displayIntoTextValue = text;
      if(this.format != 'yyyy-MM-dd'){
        displayIntoText = this.dateFormat(text, 'format');
      }
      if(this.formatValue != 'yyyy-MM-dd'){
        displayIntoTextValue = this.dateFormat(text, 'formatValue');
      }
      this.clickDay = day; //给选中的日期加效果。

      //日历组件根据displayIntoText创建。
      this.displayIntoText = displayIntoText; //改变标题日期的显示。

      this.$emit('clickCalCB', displayIntoTextValue);//向外传出的值

    },
    dateFormat( value, type ) {
      var displayIntoText = value.replace("-", "/");
      var currentDate = new Date(displayIntoText);
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth();
      var date = currentDate.getDate();
      var o = {
        "M+": month + 1, // month
        "d+": date // day
      };
      //format 显示时期时使用的格式化   formatValue向外传值时使用的格式化
      var format = type == 'format' ? this.format : this.formatValue;
      if (/(y+)/.test(format)) {
        format = format.replace( RegExp.$1, (year + "").substr(4 - RegExp.$1.length) );
      }

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace( RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    },
    showDefaultDate(){

    }
  }
};
</script>
<style scoped>
.inputCalender input {
  padding-left: 0.2rem;
  margin: 0;
  height: 0.6rem;
  border: 0.02rem solid #ddd;
  /* 防止出现内阴影 */
  border-radius: 0.06rem;
  outline: none;
  outline: 0px;
}
ul {
  overflow: hidden;
  list-style: none;
}

ul li {
  float: left;
  width: 14%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul li span {
  display: inline-block;
  width: 100%;
  padding: 0.1rem 0;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;
  font-size:0.32rem;
}
.dateTable li label{
  font-size:0.24rem;
  color:red;
}
.calenderWrapper {
  /* width: 4.6rem; */
  margin: 0 auto;
}
.calenderContainer .title {
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding:0 4%; */
  box-sizing: border-box;
  font-size:0.4rem;
}
.calenderContainer .title a {
  display: inline-block;
  text-decoration: none;
  padding:0.2rem;
  background: #ddd;
  border-radius: 4px;
}

.calenderContainer {
  border: 1px solid #ddd;
}
.active span{
  background: rgba(161, 0, 233, 0.5);
  color: white;
}
.clickActive span{
  background: rgba(161, 0, 233, 0.5);
}

.active .task{
  color:white;
}

.clickActive .task{
  color:white;
}

.disableClick {
  color: #ddd;
}
</style>
