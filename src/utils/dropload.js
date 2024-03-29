

export const CreateDropLoad = (function(){
    'use strict';
    var win = window;
    var doc = document;
    var dropload = function(ele,options,vnode){
        return new MyDropLoad(ele,options,vnode);
    };
    var MyDropLoad = function(element, options, vnode){
        //不能使用箭头函数，否则this是undefined
        //面向对象方法开发，原型方法也不能是箭头函数
        var me = this;
        me.vnode = vnode;
        me.$element = element;
        // 上方是否插入DOM
        me.upInsertDOM = false;
        // loading状态
        me.loading = false;
        // 是否锁定
        me.isLockUp = false;
        me.isLockDown = false;
        // 是否有数据
        me.isData = true;
        me._scrollTop = 0;
        me._threshold = 0;
        me.init(options);
    };

    // 初始化
    MyDropLoad.prototype.init = function(options){
        var me = this;

        me.opts = Object.assign({},{
            scrollArea : me.$element,                                            // 滑动区域
            domUp : {                                                            // 上方DOM
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate  : '<div class="dropload-update">↑释放更新</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            domDown : {                                                          // 下方DOM
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData  : '<div class="dropload-noData">暂无数据</div>'
            },
            autoLoad : true,                                                     // 自动加载
            distance : 50,                                                       // 拉动距离
            threshold : '',                                                      // 提前加载距离
            loadUpFn : '',                                                       // 上方function
            loadDownFn : ''                                                      // 下方function
        }, options)
        

        // 如果加载下方，事先在下方插入DOM
        if(me.opts.loadDownFn != ''){
            var domDown = document.createElement('div');
            domDown.setAttribute('class',me.opts.domDown.domClass);
            domDown.innerHTML = me.opts.domDown.domRefresh;
            me.$element.appendChild(domDown);
            me.$domDown = document.querySelector('.'+me.opts.domDown.domClass);
        }

        // 计算提前加载距离
        if(!!me.$domDown && me.opts.threshold === ''){
            // 默认滑到加载区2/3处时加载
            me._threshold = Math.floor(me.$domDown.offsetHeight*1/3);
        }else{
            me._threshold = me.opts.threshold;
        }

        // 判断滚动区域
        if(me.opts.scrollArea == win){
            me.$scrollArea = win;
            // 获取文档高度
            me._scrollContentHeight = doc.documentElement.scrollHeight;
            // 获取win显示区高度  —— 这里有坑
            me._scrollWindowHeight = doc.documentElement.clientHeight;
        }else{
            me.$scrollArea = me.opts.scrollArea;
            me.vnode.context.$nextTick(()=>{
                me._scrollContentHeight = me.$element.scrollHeight;
                me._scrollWindowHeight = me.$element.offsetHeight;
                fnAutoLoad(me);
            })
        }
        

        // 窗口调整
        win.addEventListener('resize',function(){
            clearTimeout(me.timer);
            me.timer = setTimeout(function(){
                if(me.opts.scrollArea == win){
                // 重新获取win显示区高度
                me._scrollWindowHeight = win.innerHeight;
                }else{
                    me._scrollWindowHeight = me.$element.offsetHeight;
                }
                fnAutoLoad(me);
            },150);
            
        });

        // 绑定触摸
        me.$element.addEventListener('touchstart',function(e){
            if(!me.loading){
                fnTouches(e);
                fnTouchstart(e, me);
            }
        });
        me.$element.addEventListener('touchmove',function(e){
            if(!me.loading){
                fnTouches(e, me);
                fnTouchmove(e, me);
            }
        });
        me.$element.addEventListener('touchend',function(){
            if(!me.loading){
                fnTouchend(me);
            }
        });

        // 加载下方
        me.$scrollArea.addEventListener('scroll',function(){
            me._scrollTop = me.$scrollArea.scrollTop;
            // 滚动页面触发加载数据
            
            if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
                loadDown(me);
            }
        });
    };

    // touches
    function fnTouches(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, me){
        me._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        me.touchScrollTop = me.$scrollArea.scrollTop;
    }

    // touchmove
    function fnTouchmove(e, me){
        me._curY = e.touches[0].pageY;
        me._moveY = me._curY - me._startY;

        if(me._moveY > 0){
            me.direction = 'down';
        }else if(me._moveY < 0){
            me.direction = 'up';
        }

        var _absMoveY = Math.abs(me._moveY);

        // 加载上方
        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            e.preventDefault();
            me.$domUp = document.querySelector('.'+me.opts.domUp.domClass);
            // 如果加载区没有DOM
            if(!me.upInsertDOM){
                var firstChild = me.$element.firstChild;
                var domUp = document.createElement('div');
                domUp.setAttribute('class',me.opts.domUp.domClass);
                me.$element.insertBefore(domUp, firstChild);
                me.upInsertDOM = true;
                return false;
            }
            
            fnTransition(me.$domUp,0);

            // 下拉
            if(_absMoveY <= me.opts.distance){
                me._offsetY = _absMoveY;
                // todo：move时会不断清空、增加dom，有可能影响性能，下同
                me.$domUp.innerHTML= me.opts.domUp.domRefresh;
            // 指定距离 < 下拉距离 < 指定距离*2
            }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
                me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
                me.$domUp.innerHTML = me.opts.domUp.domUpdate;
            // 下拉距离 > 指定距离*2
            }else{
                me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;
            }
       
            me.$domUp.style.height = me._offsetY + 'px';
        }
    }

    // touchend
    function fnTouchend(me){
        var _absMoveY = Math.abs(me._moveY);
        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            fnTransition(me.$domUp,300);
            if(_absMoveY > me.opts.distance){
                me.$domUp.style.height = me.$domUp.children[0].offsetHeight + 'px';
                me.$domUp.innerHTML = me.opts.domUp.domLoad;
                me.loading = true;
                me.timerLoadUp = setTimeout(()=>{
                    me.vnode.context.loadUpFn(me);
                },400)
            }else{
                me.$domUp.style.hieght='0px';
                me.$domUp.addEventListener('transitionend',function(){
                    me.upInsertDOM = false;
                    this.parentNode.removeChild(this);
                });
            }
            me._moveY = 0;
        }
    }

    // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
    function fnAutoLoad(me){
        if(me.opts.loadDownFn != '' && me.opts.autoLoad){
            if((me._scrollContentHeight - me._threshold) <= me._scrollWindowHeight){
                loadDown(me);
            }
        }
    }

    // 重新获取文档高度
    function fnRecoverContentHeight(me){
        if(me.opts.scrollArea == win){
            me._scrollContentHeight = doc.documentElement.scrollHeight;
        }else{
            me._scrollContentHeight = me.$element.scrollHeight;
        }
    }

    // 加载下方
    function loadDown(me){
        me.direction = 'up';
        me.$domDown.innerHTML = me.opts.domDown.domLoad;
        //这是用来节流的
        me.loading = true;
        me.timerLoadDownFn = setTimeout(()=>{
            me.vnode.context.loadDownFn(me);
        },400)
        
    }

    // 锁定
    MyDropLoad.prototype.lock = function(direction){
        var me = this;
        // 如果不指定方向
        if(direction === undefined){
            // 如果操作方向向上
            if(me.direction == 'up'){
                me.isLockDown = true;
            // 如果操作方向向下
            }else if(me.direction == 'down'){
                me.isLockUp = true;
            }else{
                me.isLockUp = true;
                me.isLockDown = true;
            }
        // 如果指定锁上方
        }else if(direction == 'up'){
            me.isLockUp = true;
        // 如果指定锁下方
        }else if(direction == 'down'){
            me.isLockDown = true;
            // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
            me.direction = 'up';
        }
    };

    // 解锁
    MyDropLoad.prototype.unlock = function(){
        var me = this;
        // 简单粗暴解锁
        me.isLockUp = false;
        me.isLockDown = false;
        // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
        me.direction = 'up';
    };

    // 无数据
    MyDropLoad.prototype.noData = function(flag){
        var me = this;
        if(flag === undefined || flag == true){
            me.isData = false;
        }else if(flag == false){
            me.isData = true;
        }
    };

    // 重置
    MyDropLoad.prototype.resetload = function(){
        var me = this;
        
        clearTimeout(me.timerLoadUp)
        clearTimeout(me.timerLoadDownFn)
        if(me.direction == 'down' && me.upInsertDOM){
            
            me.$domUp.style.height='0px';
            me.$domUp.addEventListener('transitionend',function(){
                me.loading = false;
                me.upInsertDOM = false;
                this.parentNode.removeChild(this);
                fnRecoverContentHeight(me);
            });

        }else if(me.direction == 'up'){
            me.loading = false;
            // 如果有数据
            if(me.isData){
                // 加载区修改样式
                me.$domDown.innerHTML = me.opts.domDown.domRefresh;
                //等待元素加载完成后才能获取正确的高度
                me.vnode.context.$nextTick(()=>{
                    fnRecoverContentHeight(me);
                    fnAutoLoad(me);
                })
            }else{
                // 如果没数据
                me.$domDown.innerHTML = me.opts.domDown.domNoData;
            }
        }
    };

    // css过渡
    function fnTransition(dom,num){
        dom.style.cssText='-webkit-transition:all '+num+'ms;transition:all '+num+'ms'
    }

    return dropload;
})();