<template>
  <div id="test">
      <img src="./assets/logo.png">
      <input type="tel" maxlength="6" ref="tel" v-model="code"/>
      <span class="btn" @click="showPicker(1)">显示picker</span>
      <span class="btn" @click="showPicker(2)">设置picker</span>
      <by-checkbox></by-checkbox>
    <by-input v-model="val" type="tel" maxLength="8"></by-input>
    <by-dialog :visible="ifShow" type="confirm" title="温馨提示" content="暂无内容" cancel="取消" confirm="确认" @cancelCB="cancelRespone" @confirmCB="confirmRespone"></by-dialog>
    <by-picker ref="picker" v-model="autoReceiveVal" :datasarray="pickerdatas" :visible="pickerShow" @confirm="pickerConfirm" @cancel="pickerCancel">
      <template v-slot:topOperate="topOperateVal">
        <div class="opt">
          <span @click="topOperateVal.cancel">取消</span>
          <span @click="topOperateVal.confirm">确定</span>
        </div>
      </template>
      <template v-slot:bottomOperate="bottomOperateVal">
        <div class="opt">
          <span @click="bottomOperateVal.cancel">重置</span>
          <span @click="bottomOperateVal.confirm">确定</span>
        </div>
      </template>
    </by-picker>
  </div>
</template>

<script>
import { getList } from "./requestDataInterface";

export default {
  name: "Test",
  data() {
    this.opts = {
      width: 300,
      height: 300,
      canvasLockType: 3,
      selectNum: 4,
      inputCallback: function(code, vm) {
        if (code == 1) {
          alert("请再次输入");
        } else {
          alert("请输入三个以上的点");
        }
        vm.resetCircles();
      },
      comfirmCallback: function(code, vm) {
        if (code == 1) {
          alert("设置成功");
        } else {
          alert("两次密码不一致");
        }
      },
      unlockSucc: function(vm) {
        alert("解锁成功");
      },
      unlockFail: function(vm) {
        setTimeout(function() {
          alert("解锁失败");

          vm.resetCircles();
        }, 1000);
      }
    };
    return {
      val: "hahah",
      datas: [],
      options: {
        loadDownFn: true,
        loadUpFn: true
      },
      code: 0,
      dateRange: "今年累计",
      pickerShow: false,
      pickerdatas: [],
      autoReceiveVal: {},
      ifShow: false
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
    setTimeout(() => {
      this.$refs.tel.blur();

      this.pickerdatas = [
        {
          // defaultVal:'今年累计',
          keyName: "name",
          keyInd: 1,
          showRows: 5,
          cloumndatas: [
            { id: 1, name: "今年月度" },
            { id: 2, name: "今年累计" },
            { id: 3, name: "以往年度" },
            { id: 4, name: "今年月度" },
            { id: 5, name: "今年累计" },
            { id: 6, name: "以往年度" }
          ]
        }
      ];
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
    loadUpFn(me) {
      getList().then(res => {
        this.datas = res.lists;
        me.resetload();
      });
    },
    loadDownFn(me) {
      getList().then(res => {
        this.datas = this.datas.concat(res.lists);
        setTimeout(() => {
          me.resetload();
        }, 1000);
      });
    },
    pickerConfirm(val) {
      console.log(val);
    },

    pickerCancel() {
      this.pickerShow = false;
    },
    confirmRespone() {},
    cancelRespone() {},
    setDefaultVal(newVal) {
      console.log(newVal);
      if (newVal[0].name == "今年月度") {
        this.pickerdatas = [
          {
            defaultVal: newVal[0].name,
            keyName: "name",
            keyInd: 2,
            showRows: 5,
            cloumndatas: [
              { id: 1, name: "今年月度" },
              { id: 2, name: "今年累计" },
              { id: 3, name: "以往年度" }
            ]
          },
          {
            defaultVal: newVal[1].name,
            keyName: "name",
            keyInd: 4,
            showRows: 5,
            cloumndatas: [
              { id: 1, name: "1月" },
              { id: 2, name: "2月" },
              { id: 3, name: "3月" }
            ]
          }
        ];
      } else if (newVal[0].name == "以往年度") {
        this.pickerdatas = [
          {
            defaultVal: newVal[0].name,
            keyName: "name",
            keyInd: 3,
            showRows: 5,
            cloumndatas: [
              { id: 1, name: "今年月度" },
              { id: 2, name: "今年累计" },
              { id: 3, name: "以往年度" }
            ]
          },
          {
            defaultVal: newVal[1].name,
            keyName: "name",
            keyInd: 5,
            showRows: 5,
            cloumndatas: [
              { id: 1, name: "2021" },
              { id: 2, name: "2019" },
              { id: 3, name: "2018" },
              { id: 4, name: "2017" }
            ]
          }
        ];
      } else {
        this.pickerdatas.splice(1, 1);
      }
    }
  },

  watch: {
    val(newVal) {
      console.log(newVal);
    },

    autoReceiveVal(newVal) {
      console.log(newVal);
      let flag = newVal && newVal.length;
      if (flag && newVal[0].name == "今年月度") {
        //可以根据对应的选项“今年月度/以往年度”设置对应的数据cloumndatas。定义一个方法实现对应数据的生成或查找
        this.pickerdatas.splice(1, 1, {
          defaultVal: "2月",
          keyName: "name",
          keyInd: 4,
          showRows: 5,
          cloumndatas: [
            { id: 1, name: "1月" },
            { id: 2, name: "2月" },
            { id: 3, name: "3月" }
          ]
        });
      } else if (flag && newVal[0].name == "以往年度") {
        this.pickerdatas.splice(1, 1, {
          defaultVal: "2018",
          keyName: "name",
          keyInd: 5,
          showRows: 5,
          cloumndatas: [
            { id: 1, name: "2021" },
            { id: 2, name: "2019" },
            { id: 3, name: "2018" },
            { id: 4, name: "2017" }
          ]
        });
      } else {
        this.pickerdatas.splice(1, 1);
      }
    }
  }
};
</script>

<style>
.btn {
  font-size: 0.4rem;
}
.opt{
    display: flex;
    justify-content: space-between;
    align-items:center;
    height:0.9rem;
    background: #f1f1f1;
    padding:0 0.48rem;
    font-size:0.3rem;
    
    margin-bottom:0.3rem;
  }

  .opt span:nth-child(1){
    color:#333;
  }
  .opt span:nth-child(2){
    color:#ffa900;
  }
</style>
