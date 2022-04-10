import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        redirect: '/main'
      },
      {
        path: '/main',
        name: 'main',
        meta: {
          title: '系统首页'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/home/Dashboard.vue'
          )
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = window.sessionStorage.getItem('token')
//   if (to.name !== 'Login' && !token) {
//     next({ name: 'Login' })
//   } else next()
// })

export default router
