import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//const HelloWorld = resolve => require(['@/components/page/HelloWorld'], resolve)

const Test = r => require.ensure([], () => r(require('@/Test')), 'Test')
const Test2 = r => require.ensure([], () => r(require('@/Test2')), 'Test2')
const DatePicker = r => require.ensure([], () => r(require('@/DatePicker')), 'DatePicker')
const DropLoad = r => require.ensure([], () => r(require('@/DropLoad.vue')), 'DropLoad')
const Create = r => require.ensure([], () => r(require('@/Create.vue')), 'Create')
// const ProductInfo = r => require.ensure([], () => r(require('@/components/page/productdetail/ProductInfo')), 'ProductInfo')
const Drag = r => require.ensure([], () => r(require('@/Drag.vue')), 'Drag')
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
      component: DropLoad,
      // children:[
      //   {
      //     path: 'create',
      //     component: Create,
      //   }
      // ]
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


instance.beforeEach((to, from, next) => {
  let _title = to.meta.title
  document.title = _title ? _title : '默认标题'
  if (to.meta.requireAuth) {
    next()
  }
  next()
})

export default instance


