<template>
      <div class="calenderWrapper">
        <div class="calenderContainer" v-show="visible">
            <div class="title">

                <a href="javascript:void(0);" class="prev" @click="changeMonth('prve')"><img src="@/assets/logImages/arrow_tip.png"/>上一月</a>

                <span>{{title}}</span>
                
                <a href="javascript:void(0);" class="next" @click="changeMonth('next')">下一月<img src="@/assets/logImages/arrow_tip.png"/></a>
            </div>
            <div class="contentBox">
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
              <div class="tanslatewrraper" ref="translateW"  :style="{'height':translateH+'px'}">
                <div class="translatecontent" ref="translate"  :style="{'top':translateT+'px'}">
                  <ul class="dateTable" v-for="(items,index) in showDate" :key="index">
                      <li v-for="item in items" :key="item.displayIntoText" :class="[clickDay?'':item.now, nowMonth==item.month&&item.day==clickDay?'clickActive':'']">
                        <span v-if="!item.disabled" @click="displayDate(item.displayIntoText, item.day,$event)">{{item.day}}<label :class="{'red':item.task=='red','green':item.task=='green','white':item.task=='white'}" v-show="item.task">●</label></span>
                        <span v-else class='disableClick'>{{item.day}}</span>
                      </li>
                  </ul>
                </div>
              </div>
              <img @click="touchstart" :class="isopen?'opened':''" src="@/assets/logImages/log_downarrow@2x.png"/>
            </div>
        </div>
    </div>  
</template>
<script>
/* eslint-disable */
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
      clickDay: "",
      pageY:0,
      distance:0,
      translateH:0,
      translateT:0,
      arrowTop:0,
      isopen:true
    };
  },
  created() {
    this.initeNowDate();
  },
  mounted() {
    //有默认值显示，无默认值该逻辑不执行。
    this.defaultValue ? this.backShowDate() : this.createdCalender(this.nowYear, this.nowMonth);
    this.$nextTick(()=>{
      this.translateH = this.$refs.translate.offsetHeight
      this.checkCallend()
    })
  },
  methods: {
    touchstart(e){
      
      if(this.isopen){
        this.translateH = 44
        this.translateT = -(this.cellPPTop-2)
      }else{
        this.translateH = this.$refs.translate.offsetHeight
        this.translateT = 0
      }
      this.isopen = !this.isopen
    },
    checkCallend(){
      this.cellPPTop = document.querySelector('.active').offsetTop
      this.translateT = -(this.cellPPTop-2)
      this.translateH = 44
      this.isopen = false
    },
    initeNowDate() {
      let date = new Date();
      this.initeNowMonth = this.nowMonth = date.getMonth();
      this.initeNowYear = this.nowYear = date.getFullYear();
      this.initeNowDates = this.nowDate = date.getDate();
      this.currentTime = this.createDateString(this.initeNowYear,this.initeNowMonth,this.initeNowDates)
      
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
      var disabled = false
      var displayIntoText = ''
      var willCreatDate = [];
      var temparr = [];
      var currentDate = new Date(year, month, 1);
      var currentYear = this.nowYear = currentDate.getFullYear();
      var currentMonth = this.nowMonth = currentDate.getMonth();
      //某个月一号是星期几
      var currentDay = currentDate.getDay();
      var now = "";
      var n = 1 - currentDay;
      this.title = currentYear + "年" + (currentMonth + 1) + "月";
      //确定上个月有几天展示出来。
      n = n == 1 ? 1 : n;
      currentDate.setDate(n);
      for (var i = 0; i < 42; i++) {
        
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        if (this.initeNowYear == year &&this.initeNowMonth == month && this.initeNowMonth == currentMonth&&this.initeNowDates == day) {
          now = "active";
        } else {
          now = "";
        }
        displayIntoText = `${currentYear}-${month + 1 > 9 ? month + 1 : "0" + (month + 1)}-${day > 9 ? day : "0" + day}`

        this.currentTimes = this.createDateString(year,month,day)

        if(month != currentMonth || this.currentTime < this.currentTimes){
          disabled = true
        }else{
          disabled = false
        }
        temparr.push({
          day,
          month,
          year,
          currentMonth: currentMonth,
          displayIntoText,
          now: now,
          disabled
        })
        if((i+1)%7==0){
          willCreatDate.push(temparr);
          temparr = []
        }
        
        currentDate.setDate(day + 1);
      }
      this.showDate = willCreatDate;
      this.$emit('clickMonBtnCB',{year:currentYear, month:currentMonth+1});
    },
    //将选择的日期显示到输入框中
    displayDate(text, day, event) {
      this.cellPPTop = event.target.parentNode.parentNode.offsetTop
      this.cellPP = event.target.parentNode.parentNode
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
    createDateString(year,month,day){
      return `${year}${month + 1 > 9 ? month + 1 : "0" + (month + 1)}${day > 9 ? day : "0" + day}`
    },
    addTask(year, month, arr){
      let showDate = JSON.parse(JSON.stringify(this.showDate))
      let len = showDate.length
      let klen = arr.length
      let jlen=0,obj = null,items=[]
      for(let i = 0; i < len; i++){
        items = showDate[i]
        jlen = items.length
        for(let j = 0; j < jlen; j++){
          obj = items[j]
          if(year == obj.year && month == obj.month){
            for(var k = 0; k < klen; k++){
              if(arr[k].day == obj.day){
                obj.task = arr[k].color
              }
            }
          }
        }
      }
      this.showDate = showDate
    }
  },
  watch:{
    defaultValue(newVal){
      // console.log()
      // this.initeNowDate()
      // this.defaultValue ? this.backShowDate() : this.createdCalender(this.nowYear, this.nowMonth)
    }
  }
};
</script>
<style scoped>
.opened{
  transform: rotateZ(180deg);
}
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
.contentBox{
  padding:.4rem .3rem 0;
  font-size:0;
  text-align: center;
  perspective:800px;
}
ul {
  overflow: hidden;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

ul li {
  width: .64rem;
  height:.64rem;
  /* overflow:hidden; */
  border-radius: .32rem;
}
ul li span {
  display: block;
  text-align: center;
  cursor: pointer;
  font-size:0.28rem;
  color: #B2B2B2;
}
.dateTable{
  font-size:.28rem;
}
.dateTable li{
  margin-bottom:0.2rem;
  border-radius: 50%;
  
}
.dateTable li span{
  color:#222;
  line-height: .64rem;
  position: relative;
}
.dateTable li span label{
  display: block;
  font-size:0.1rem;
  color:#FC6450;
  text-align: center;
  position: absolute;
  bottom:0;
  left:50%;
  line-height: .24rem;
  margin-left:-0.08rem;
  margin-top:0.04rem;
}
.calenderWrapper {
  /* width: 4.6rem; */
  margin: 0 auto;
}
.calenderContainer .title span{
  color:#222;
  font-weight: blod;
}
.calenderContainer .title {
  background: #F4F5F6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  font-size:0.28rem;
  height:.88rem;
  color:#222;
  padding:0 .24rem;
}
.calenderContainer .title a {
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
  font-size:.24rem;
  color:#888;
}

.calenderContainer .title a img{
  width:.12rem;
  margin-left: .12rem;
}

.calenderContainer .title .prev img{
  transform: rotateY(180deg);
  vertical-align: middle;
  margin:0;
  margin-right: .12rem;
}

.calenderContainer {
  background:white;
}
.active{
  background: #FC6450;
  
}

.dateTable .active span{
  color: white;
}
.clickActive{
  background: #FC6450;
}
.dateTable .clickActive span{
  color:white;
}
.dateTable .red{
  color:red;
}

.dateTable .white{
  color:#ddd;
}

.dateTable .green{
  color:green;
}

.dateTable .disableClick {
  color: #ddd;
}

.tanslatewrraper{
  overflow: hidden;
  text-align: center;
}

.translatecontent{
  position: relative;
}

.contentBox img{
  width:.58rem;
  position: relative;
  display: inline-block;
  padding:0.1rem 0;
}
</style>
