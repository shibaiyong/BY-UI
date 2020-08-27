<template>
  <div id="app">
    <div class="outer">
    <div class="inner">
      <img src="./assets/logo.png">
      <table>
      <tr v-for="item in datas" :key="item.id">
        <td>{{item.link}}</td>
        <td>{{item.pic}}</td>
        <td>{{item.date}}</td>
        <td>{{item.title}}</td>
      </tr>
    </table>

    <by-checkbox/>
    </div>
    </div>
  </div>
</template>

<script>
import {getList} from './requestDataInterface'


export default {
  name: "App",
  data() {
    return {
      datas: [],
      options: {
        loadDownFn: true,
        loadUpFn: true
      }
    };
  },
  created() {},
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
