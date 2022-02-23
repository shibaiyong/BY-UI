<template>
  <div id="test">
      <img src="./assets/logo.png">
      <input type="tel" maxlength="6" ref="tel" v-model="code"/>
      <span @click="linkto">跳转</span>
      <by-checkbox></by-checkbox>
    <by-input v-model="val" type="tel" maxLength="8"></by-input>
    <by-picker v-model="autoReceiveVal" :datasarray="pickerdatas" :visible="pickerShow" @confirm="pickerConfirm" @cancel="pickerCancel"></by-picker>

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
      val:'hahah',
      datas: [],
      options: {
        loadDownFn: true,
        loadUpFn: true
      },
      code: 0,
      dateRange:'今年累计',
      pickerShow:false,
      pickerdatas:[],
      autoReceiveVal:{}
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.$refs.tel.blur();


      this.pickerdatas = [

        {
          defaultvalue:'1',
          keyName: 'name',
          keyInd:1,
          cloumndatas: [
            {id:1,name:'今年月度'},
            {id:2,name:'今年累计'},
            {id:3,name:'以往年度'}
          ]
        }

      ]

    }, 1000);
    // this.$showdialog(
    //   {
    //     title: "我是标题",
    //     cancel: "",
    //     confirm: "确定",
    //     content: "用户名和密码不能为空",
    //     confirmCallback: vm => {
    //       vm.visible = false;
    //     }
    //   },
    //   true
    // );
  },
  methods: {
    linkto() {

      this.pickerShow=true
      
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
    pickerConfirm(val){

      console.log(val)

    },

    pickerCancel(){
      this.pickerShow = false
    }
  },

  watch:{

    val(newVal){

      console.log(newVal)

    },

    autoReceiveVal(newVal){
      let flag = newVal && newVal.length;

      if(flag && newVal[0].name == '今年月度'){
        this.pickerdatas.splice(1,1,{
          defaultvalue:'1',
          keyName: 'name',
          keyInd:2,
          cloumndatas: [
            {id:1,name:'1月'},
            {id:2,name:'2月'},
            {id:3,name:'3月'}
          ]
        })
      }else if(flag && newVal[0].name == '以往年度'){

        this.pickerdatas.splice(1,1,{
          defaultvalue:'2',
          keyName: 'name',
          keyInd:3,
          cloumndatas: [
            {id:1,name:'2021'},
            {id:2,name:'2019'},
            {id:3,name:'2018'},
            {id:4,name:'2017'}
          ]
        })

      }else{

        this.pickerdatas.splice(1,1)

      }

    }

  }
};
</script>

<style>
</style>
