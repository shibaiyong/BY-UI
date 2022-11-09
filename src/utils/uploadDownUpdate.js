
const DropLoad = (function(){

  function DropLoad(ele, opts, vnode){

    console.log(ele,opts)

    this.scrollArea = ele
    this.isLoading = false
    this.direction = 'up'
    this.loadDownFn = opts.loadDownFn
    this.loadUpFn = opts.loadUpFn
    this.domDownFlag = opts.domDownFlag
    this.domUpFlag = opts.domUpFlag
    this.$domDown = opts.domDown
    this.$domUp = opts.domUp
    this.$vnode = vnode
    this.noData = false
    this.inite(this)
  }
  DropLoad.prototype = {
    inite(me){
      if(this.domDownFlag == 'yes'){
        let domDown = document.createElement('div')
        domDown.setAttribute('class','dropload-refresh')
        domDown.innerHTML = `<span class="refresh">↑上拉加载更多</span>`
        this.$domDown = domDown
        this.scrollArea.appendChild(domDown)
      }
      if(this.domUpFlag == 'yes'){

        let domUp = document.createElement('div')
        domUp.className = 'pull-refresh-container'
        domUp.innerHTML = `<span class="pullrefresh">↓下拉刷新列表</span>`
        domUp.style.height = 0 + 'px'
        this.$domUp = domUp
        this.scrollArea.insertBefore(domUp,this.scrollArea.children[0])
      }
      this.getHeight()
      this.addTouchEvent(me)
      this.autoLoad(me)
    },
    addTouchEvent(me){
      let distance = 0
      let movePageY = 0, domUpHeight = 0
      this.scrollArea.addEventListener('scroll',function(){
        me.$scrollTop = this.scrollTop
        if(me.$scrollHeight-1 <= me.$clientHeight + me.$scrollTop && !me.isLoading && !me.noData){
          me.isLoading = true
          me.$domDown.innerHTML = `<span class="loading">正在加载</span>`
          me.loadDownFn(me)
        }
      })

      if(me.domUpFlag && me.domUpFlag == 'yes'){

        this.scrollArea.addEventListener('touchstart',function(e){
          me.$scrollTop = this.scrollTop;
          me.initPageY = e.targetTouches[0].pageY
        })

        this.scrollArea.addEventListener('touchmove',function(e){
          movePageY = e.targetTouches[0].pageY
          distance = movePageY - me.initPageY
          if(distance>0 && me.$scrollTop <= 0){
            me.direction = 'down'
            if(distance >= 42){
              me.$domUp.innerHTML = `<span class="loading">释放加载</span>`
            }
            me.$domUp.style.height = distance + 'px'
          }else if(distance<0){
            me.direction = 'up'
          }
        })

        this.scrollArea.addEventListener('touchend',function(e){
          if(me.direction == 'down' && me.$scrollTop <= 0){
            domUpHeight = me.$domUp.children[0].offsetHeight
            me.$domUp.innerHTML = `<span class="loading">正在加载</span>`
            me.$domUp.style.height = domUpHeight + 'px'
            me.loadUpFn(me)
          }else if(me.direction == 'up' && me.$scrollHeight-1 <= me.$clientHeight + me.$scrollTop && !me.noData){
            me.autoLoad(me)
          }
        })
      }
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
      this.$domDown.innerHTML = `<span class="loading">没有更多数据了</span>`
    },
    resetLoad(){

      if(!this.noData){
        if(this.direction=='up'){
          this.$domDown.innerHTML = `<span class="refresh">↑上拉加载更多</span>`
          this.$vnode.context.$nextTick(()=>{
            this.getHeight()
            this.autoLoad(this)
          })
        }else if(this.direction == 'down'){
          this.$domUp.style.height = 0 + 'px'
          this.$domUp.innerHTML = `<span class="pullrefresh">↓下拉刷新列表</span>`
          this.$vnode.context.$nextTick(()=>{
            this.getHeight()
          })
        }
      }
      this.isLoading = false
    }
  }

  return DropLoad
})()

export { DropLoad }