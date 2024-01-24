<template>
  <div id="griddrag">
    <div class="grid">
        <div class="one">one</div>
        <div class="two">two</div>
        <!-- <div class="three">three</div>
        <div class="four">four</div> -->
        <!-- <div class="five">five</div> -->
        <!-- <div class="six">six</div> -->
      </div>
      <span>hahahahahhahah</span>
  </div>
</template>
<script>

export default {
  name: "GridDrag",
  data() {
    return {
      
    }
  },
  mounted() {
    console.log('create')
  },
  methods: {

    
  }
};
</script>

<style scoped>
  .grid{
    display: grid;
    grid-template-columns: repeat(3,auto);
    /* grid-gap:10px; */
    grid-template-rows: repeat(2,100px);
    font-size: 18px;
    color:white;
    font-weight: bold;
  }
  .grid :nth-child(1){
    background:red;
  }
  .grid :nth-child(2){
    background:green;
  }
  .grid :nth-child(3){
    background:blue;
  }
  .grid :nth-child(4){
    background:yellow;
  }
  .grid :nth-child(5){
    background:orange;
  }
  .grid :nth-child(6){
    background:purple;
  }
</style>
