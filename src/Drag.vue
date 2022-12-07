<template>
  <div id="dropload">
    <div class="drag">
      <h2>drag</h2>
      <ul class="dragcontainer">
        <li class="item" draggable @dragstart="dragstart($event)">11</li>
        <li class="item" draggable @dragover.prevent @drop="drop($event)">22</li>
      </ul>
      <div class="dragcontainer">
        <div class="item" draggable @dragstart="dragstart($event)">666</div>
        <div class="item" draggable @dragover.prevent @drop="drop($event)">333</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Drag",
  data() {
    return {
      
    }
  },
  components:{
    
  },
  mounted() {

    var node = document.querySelector('h2')
    node.ondragstart = function(event){

      console.log(1)
      console.log(event)

    }
    node.ondragover = function(event){

      console.log(2)
      event.preventDefault()

    }
  },
  methods: {
    
    dragstart(event){
      console.log(event)
      console.log('hahahahahahahahaha')
    },

    dragover(event){
      console.log(event)
      console.log('jdjdjdjdjdjdjdjdjd')
    },
    
    drop(event){
      console.log(event)
    }

  }
};
</script>

<style scoped>

.drag h2{
  width:100%;
  text-align: center;
  font-size:.32rem;
  color:#666;
}

.drag .dragcontainer{
  width:100%;
  font-size:.28rem;
  color:#333;
  text-align: center;
}

.drag .dragcontainer .item{
  padding:.2rem;
  background:cadetblue;
  margin:.1rem 0;
  border-radius: .08rem;
  font-size:.32rem;
}

</style>
