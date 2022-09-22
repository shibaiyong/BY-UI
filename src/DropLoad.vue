<template>
  <div id="dropload">

    <div class="banner">
      content
    </div>
    <div class="list" v-dropload="opts">
      <div class="list-item">

      </div>
    </div>
      
  </div>
</template>
<script>
import { getList } from "./requestDataInterface";

export default {
  name: "Test",
  data() {
    return {
      dataList:[],
      pageNum:0,
      pageSize:10,
      opts:{
        loadDownFn:this.getList
      }
    }
  },
  mounted() {
  },
  methods: {

    getList(){

      let params = {
        pageNum:this.pageNum++,
        pageSize:this.pageSize,
      }

      getList({}).then( res => {

        consoel.log(res)

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
}

</style>
