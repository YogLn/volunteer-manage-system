import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'home',
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
      {
        path: '/newArticle',
        name: 'newArticle',
        meta: {
          title: '文章管理'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/article/newArticle.vue'
          )
      },
      {
        path: '/articleList',
        name: 'articleList',
        meta: {
          title: '文章管理'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/article/articleList.vue'
          )
      },
      {
        path: '/article/:id',
        name: 'detail',
        meta: {
          title: '修改文章'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/article/editArticle.vue'
          )
      },
      {
        path: '/activity',
        name: 'activity',
        meta: {
          title: '活动管理'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/activity/activity.vue'
          )
      },
      {
        path: '/comment',
        name: 'comment',
        meta: {
          title: '评论管理'
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/comment/comment.vue'
          )
      },
      {
        path: '/team',
        name: 'team',
        meta: {
          title: '团队管理'
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/team/team.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/user/user.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.localStorage.getItem('token'))
  if (to.name !== 'login' && !token) {
    next({ name: 'login' })
  } else next()
})

export default router
