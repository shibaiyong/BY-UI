
const DropLoad = (function(){

  function DropLoad(ele, opts, vnode){

    console.log(ele,opts)

    this.scrollArea = ele
    this.isLoading = false
    this.loadDownFn = opts.loadDownFn
    this.$domDown = null
    this.$vnode = vnode
    this.noData = false
    this.inite(this)
  }
  DropLoad.prototype = {
    inite(me){
      if(!this.$domDown){
        let domDown = document.createElement('div')
        domDown.setAttribute('class','dropload-refresh')
        domDown.innerHTML = `<span class="refresh">↑上拉加载更多</span>`
        this.$domDown = domDown
        this.scrollArea.appendChild(domDown)
      }
      this.getHeight()
      this.addTouchEvent(this)
      this.autoLoad(this)
    },
    addTouchEvent(me){

      this.scrollArea.addEventListener('scroll',function(){
        console.log(this.scrollTop)
        me.$scrollTop = this.scrollTop
      })

    },
    getHeight(){
      
      this.$clientHeight = this.scrollArea.offsetHeight
      this.$scrollHeight = this.scrollArea.scrollHeight
    },
    autoLoad(me){

      if(this.$scrollHeight <= this.$clientHeight && !this.noData){
        this.loadDownFn(me)
      }

    },
    noData(){
      this.noData = true
      this.$domDown.innerHTML = `<span class="loading">正在加载</span>`
    },
    resetLoad(){

      this.$vnode.context.$nextTick(()=>{
        this.getHeight()
        this.autoLoad()
      })
    }
  }

  return DropLoad
})()

export { DropLoad }