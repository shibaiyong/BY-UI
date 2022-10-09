
// import {CreateDropLoad} from './dropload.js'
import { DropLoad } from './uploadDownUpdate.js'
//时间格式化

export function formatDate(date, fmt) {
    if (date == null || date == '')
        return '';
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

//数组对象按某个键排序

export const sortArr = (arr, prop) => {
    if (arr instanceof Array) {
        return arr.sort(sortBy(prop))
    }
    return "数据类型错误"
}

const sortBy = (prop) => {

    return (prev, next) => {
        if (typeof prev == 'object') {
            let pre = prev[prop]
            let nex = next[prop]
            return pre - nex
        }
        return 1
    }
    
}

//计数器，正序，反序都行
export const runCountDown = (start, end, frenquency, eachTime, returnShow, cb) => {
    //start 起始数字  frenquency：数字变化频率，eachTime：每次变化时间， returnShow:是否回显
    let cb1 = cb ? cb : new Function

    let allcount = end - start
    let step = allcount/frenquency
    let countDownTimer = setInterval(()=>{
        start = start + step
        if(start <= end && step < 0){
            clearInterval(countDownTimer)
            cb1(end)
            return false
        }else if(start >= end && step > 0){
            clearInterval(countDownTimer)
            cb1(end)
            return false
        }

        if(returnShow){
            cb1(Math.round(start))
        }
        
    },eachTime)

}

export const setCookie = (name, deadTime, value) => {//设置cookie

    let currentTime = new Date();
    let endTime = new Date(currentTime.getTime() + deadTime * 24 * 3600 * 1000)
    document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + endTime.toGMTString()
}

export const getCookie = (key) => {//获取cookie

    if (document.cookie) {//如果cookie存在就获取
        var str = document.cookie
        var arr = str.split("; ")
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i].split("=")
            if (item[0] == key) {
                return JSON.parse(item[1])//将结果转成对象返回
            }
        }
        return {};// 如果cookie存在，但是不存在key的值
    }
    return {};//如果cookie不存在  返回一个空对象
}

  export const deleteCookie = (key) => {
    var date = new Date()
    date.setTime(date.getTime() - 1)
    var delValue = getCookie(key)
    if (!!delValue) {
      document.cookie = key + '=' + delValue + ';expires=' + date.toGMTString()
    }
  }

//数据千分位格式化

export const filters = {
    fMoney(num) {
        //处理一些特殊情况
        if(!num && num != 0) return '';
        var num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num)) num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        var cents = num % 100;
        num = Math.floor(num / 100).toString();
        if(cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor( (num.length - (1+i))/3 ); i++)
            num = num.substring( 0, num.length - (4*i+3) ) + ',' + num.substring( num.length - (4*i+3) );
        return (((sign)?'':'-') + num + '.' + cents);
    }
}

export const directives = {
    has:{
        inserted(el, binding, vnode) {
            // 获取按钮权限
            let { add, edit, remove } = vnode.context.$route.query
            if(binding.value == 'add'&& add == 0){
                el.parentNode.removeChild(el)
            }else if(binding.value == 'edit'&& edit == 0){
                el.parentNode.removeChild(el)
            }else if(binding.value == 'remove'&& remove == 0){
                el.parentNode.removeChild(el)
            }
        }
    },
    status:{
        bind(el, binding, vonode) {
            if (binding.value.status == 1) {
                el.innerHTML = "停用";
            } else {
                el.innerHTML = "启用";
            }
        },
        inserted(el, binding, vonode) {
            el.onclick = function() {
                if (el.innerHTML == "启用") {
                    vonode.context.handleEffect(binding.value.id, 1).then(res => {
                        el.innerHTML = "停用";
                    })
                } else {
                    vonode.context.handleEffect(binding.value.id, 0).then(res => {
                        el.innerHTML = "启用";
                    })
                }
            }
        }
    },
    dropload:{
        inserted(el, binding, vnode) {
            new DropLoad(el,binding.value,vnode)
        }
    }
}



