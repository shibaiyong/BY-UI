import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//const HelloWorld = resolve => require(['@/components/page/HelloWorld'], resolve)

 const Test = r => require.ensure([], () => r(require('@/Test')), 'Test')
 const Test2 = r => require.ensure([], () => r(require('@/Test2')), 'Test2')
// const ProductInfo = r => require.ensure([], () => r(require('@/components/page/productdetail/ProductInfo')), 'ProductInfo')

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
    }

    
    
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


