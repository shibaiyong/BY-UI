
import Vue from 'vue'
import Router from 'vue-router'
import { getRouteList } from '../requestDataInterface'
import store from '../vuex/store'

Vue.use(Router)

const Test = r => require.ensure([], () => r(require('@/Test')), 'Test')
const Test2 = r => require.ensure([], () => r(require('@/Test2')), 'Test2')
const DatePicker = r => require.ensure([], () => r(require('@/DatePicker')), 'DatePicker')
const DropLoad = r => require.ensure([], () => r(require('@/DropLoad.vue')), 'DropLoad')
const Drag = r => require.ensure([], () => r(require('@/Drag.vue')), 'Drag')

//路由懒加载
//const CreateLog = () => import(/* webpackChunkName: "log" */ '@/productmeetlog/page/CreateLog.vue')

let addRoutes = []

const instance = new Router({
  mode: 'hash',
  routes: [

    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: 'Test',
        requireAuth: true,
        roles: ['superadmin']
      }
    },
    {
      path: '/test2',
      name: 'Test2',
      component: Test2,
      meta: {
        title: 'Test2',
        requireAuth: true,
        roles: ['superadmin']
      }
    },
    {
      path: '/datepicker',
      name: 'DatePicker',
      component: DatePicker,
      meta: {
        title: 'DatePicker',
        requireAuth: true,
        roles: ['superadmin']
      }
    },

    {
      path: '/dropload',
      name: 'DropLoad',
      component: DropLoad
    },
    {
      path: '/drag',
      name: 'Drag',
      component: Drag,
      meta: {
        title: 'Drag',
        requireAuth: true
      }
    },
  ]
})


let createRouteComponent = ( route ) => {

  return () => import(`@/${ route }`)

}


function getRemoteRouteList(instance,next){

  getRouteList().then( res => {

    for(let i = 0; i < res.length; i++){
      res[i].component = createRouteComponent(res[i].name)
    }
    //是否获取到权限列表标识设置，要在addRoutes动态添加路由之前
    store.dispatch('setRolesList',true)
    console.log(res)
    instance.addRoutes(res)
  })
}

instance.beforeEach((to, from, next) => {
  let _title = to.meta.title
  document.title = _title ? _title : '默认标题'

  if(!store.state.routesListFlag){
    getRemoteRouteList(instance, next)
  }
  next()
})

export default instance


