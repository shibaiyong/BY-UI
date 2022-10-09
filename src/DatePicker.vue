<template>
  <div id="test">
    <input type="text" @click="showPicker(1)" placeholder="请选择日期"/>
    <by-picker ref="picker" v-model="autoReceiveVal" :datasarray="pickerdatas" :visible="pickerShow" @confirm="pickerConfirm" @cancel="pickerCancel">
      <template v-slot:topOperate="topOperateVal">
        <div class="opt">
          <span @click="topOperateVal.cancel">取消</span>
          <span @click="topOperateVal.confirm">确定</span>
        </div>
      </template>
      
    </by-picker>
    
  </div>
</template>

<script>
import { getList } from "./requestDataInterface";
import createDate from "./utils/createDate.js";

export default {
  name: "DatePicker",
  data() {
    
    return {
      
      pickerShow: false,
      pickerdatas: [],
      autoReceiveVal: {},
      
    };
  },
  beforeUpdate() {
    //console.log('parent beforeUpdate')
  },
  updated() {
    //console.log('parent updated')
  },
  beforeCreate() {
    //console.log('parent beforecreate')
  },
  created() {
    console.log("parent created");
  },
  beforeMount() {
    //console.log('parent beforeMount')
  },
  mounted() {
    console.log(new Date().getFullYear()+10)
    setTimeout(() => {

      this.pickerdatas = [

        {
          defaultVal: '',
          keyName: "name",
          keyInd: 1,
          showRows: 5,
          cloumndatas:createDate.newYear(new Date().getFullYear(),new Date().getFullYear()+10)
        },
        {
          defaultVal: '',
          keyName: "name",
          keyInd: 2,
          showRows: 5,
          cloumndatas: createDate.newMonth(new Date().getMonth()+1, 12)
        },
        {
          defaultVal: '',
          keyName: "name",
          keyInd: 3,
          showRows: 5,
          cloumndatas:createDate.newDate(1,30)
        }
      ]

    }, 1000);
  },
  methods: {
    showPicker(val) {
      if (val == 1) {
        this.pickerShow = true;
      } else if (val == 2) {
        this.setDefaultVal([{ name: "今年月度" }, { name: "3月" }]);
      }
    },
    pickerConfirm(val) {
      console.log(val);
    },

    pickerCancel() {
      this.pickerShow = false;
    },
    
    setDefaultVal(newVal) {
      
    }
  },

  watch: {
    val(newVal) {
      console.log(newVal);
    },

    autoReceiveVal(newVal) {
      console.log(newVal);
      let flag = newVal && newVal.length;
      if (flag && newVal[0].name == 2022) {
        this.pickerdatas.splice(1, 1, {
          defaultVal: "",
          keyName: "name",
          keyInd: 4,
          showRows: 5,
          cloumndatas: createDate.newMonth(9,12)
        });
      }else if(flag && newVal[0].name != 2022){
        this.pickerdatas.splice(1, 1, {
          defaultVal: "",
          keyName: "name",
          keyInd: 5,
          showRows: 5,
          cloumndatas: createDate.newMonth(1,12)
        });
      }
      
    }
  }
};
</script>

<style>

</style>
