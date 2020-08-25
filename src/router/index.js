// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

//const HelloWorld = resolve => require(['@/components/page/HelloWorld'], resolve)

// const Home = r => require.ensure([], () => r(require('@/components/page/home/Home')), 'Home')
// const ProductInfo = r => require.ensure([], () => r(require('@/components/page/productdetail/ProductInfo')), 'ProductInfo')

// const instance = new Router({
//   mode: 'hash',
//   routes: [
//     { path: '/', redirect: '/home' },

//     {
//       path: '/home',
//       name: 'Home',
//       component: Home,
//       meta: {
//         title: 'Home',
//         requireAuth: true,
//         roles: ['superadmin']
//       }
//     },

//     {
//       path: '/productinfo',
//       name: 'ProductInfo',
//       component: ProductInfo,
//       meta: {
//         title: 'ProductInfo',
//         requireAuth: true,
//         roles: ['superadmin']
//       }
//     }
    
//   ]
// })


// instance.beforeEach((to, from, next) => {
//   let _title = to.meta.title
//   document.title = _title ? _title : '默认标题'
  // if (to.meta.requireAuth) {
  //   next()
  // }
//   next()
// })

// export default instance


