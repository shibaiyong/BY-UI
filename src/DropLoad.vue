<template>
  <div id="dropload">

    <div class="banner">
      content
    </div>
    <component :is="coms"></component>
    <div class="list" v-dropload="opts">
      <div class="content-wrraper">
        <div class="list-item" v-for="(item,index) in dataList" :key="index">

          {{item.title}}

        </div>
      </div>
    </div>
    <!-- <div @click="showComs('one')">one</div>
    <div @click="showComs('two')">two</div> -->
    <!-- <router-view/> -->
    
  </div>
</template>
<script>
import { getList } from "./requestDataInterface"
import Create from "./Create.vue"
import Create1 from "./Create1.vue"

export default {
  name: "Test",
  data() {
    return {
      coms:'two',
      dataList:[],
      pageNum:0,
      pageSize:10,
      opts:{
        loadDownFn:this.getList
      }
    }
  },
  components:{
    one:Create,
    two:Create1
  },
  mounted() {
    
  },
  methods: {
    showComs(val){
      console.log(val)
      this.coms = val
    },
    getList(me){

      let params = {
        pageNum:this.pageNum++,
        pageSize:this.pageSize,
      }

      getList({}).then( res => {

        this.dataList = [...this.dataList,...res.lists]
        me.resetLoad()

      })
    }
  }
};
</script>

<style scoped>
#dropload{
  height:100%;
  display: flex;
  flex-direction: column;
}
.banner{
  height:2rem;
  background:red;
}

.list{
  width:100%;
  flex:1;
  background:darksalmon;
  overflow-y:auto;
  overflow-x:hidden;
}

.list-item{
  font-size:.4rem;
}

</style>
