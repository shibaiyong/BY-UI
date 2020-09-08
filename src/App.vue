<template>
  <div id="app">
    <div class="outer">
    <div class="inner">
      <img src="./assets/logo.png">
      <by-gesturelock :opts="this.opts"/>
      <by-checkbox></by-checkbox>
      <table>
      <tr v-for="item in datas" :key="item.id">
        <td>{{item.link}}</td>
        <td>{{item.pic}}</td>
        <td>{{item.date}}</td>
        <td>{{item.title}}</td>
      </tr>
    </table>
    </div>
    </div>
  </div>
</template>

<script>
import { getList } from "./requestDataInterface";

export default {
  name: "App",
  data() {
    this.opts={
      width: 300,
      height: 300,
      canvasLockType: 3,
      selectNum: 4,
      inputCallback: function(vm) {
        alert("请再次输入");
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
        alert("解锁失败");
      }
    };
    return {
      datas: [],
      options: {
        loadDownFn: true,
        loadUpFn: true
      }
    };
  },
  created() {},
  mounted() {
    this.$showdialog(
      {
        title: "我是标题",
        cancel: "",
        confirm: "确定",
        content: "用户名和密码不能为空",
        confirmCallback: vm => {
          vm.visible = false;
        }
      },
      true
    );
  },
  methods: {
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
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
