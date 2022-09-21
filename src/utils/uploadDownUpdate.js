
(function(){

  function DropLoad(ele, opts, vnode){

    this.scrollArea = ele

  }
  DropLoad.prototype = {
    inite(){

    },
    addTouchEvent(){

      this.scrollArea.addEventListener('scroll',function(){
        this.scrollTop
      })

    },
    getHeight(){
      this.$clientHeight = this.scrollArea.offsetHeight
      this.$scrollHeight = this.scrollArea.scrollHeight
    },
    autoLoad(){

    }
  }

  return DropLoad
})()