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
      {
        path: '/articleList',
        name: 'articleList',
        meta: {
          title: '文章列表'
        },
        component: () =>
          import(
            /* webpackChunkName: "article" */ '../views/article/ArticleList.vue'
          )
      },
      {
        path: '/article/:id',
        name: 'article',
        meta: {
          title: '修改文章'
        },
        component: () =>
          import(
            /* webpackChunkName: "article" */ '../views/article/EditArticle.vue'
          )
      },
      {
        path: '/newArticle',
        name: 'newArticle',
        meta: {
          title: '发布文章'
        },
        component: () =>
          import(
            /* webpackChunkName: "article" */ '../views/article/NewArticle.vue'
          )
      },
      {
        path: '/comment/:id',
        name: 'comment',
        meta: {
          title: '评论管理'
        },
        component: () =>
          import(
            /* webpackChunkName: "comment" */ '../views/article/Comment.vue'
          )
      },
      {
        path: '/message',
        name: 'message',
        meta: {
          title: '留言管理',
          permission: true
        },
        component: () =>
          import(
            /* webpackChunkName: "message" */ '../views/message/Message.vue'
          )
      },
      {
        path: '/photo',
        name: 'photo',
        meta: {
          title: '图片管理'
        },
        component: () =>
          import(/* webpackChunkName: "photo" */ '../views/photo/Photo.vue')
      },
      {
        path: '/users',
        name: 'users',
        meta: {
          title: '用户管理'
        },
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/user/User.vue')
      },
      {
        path: '/label',
        name: 'label',
        meta: {
          title: '标签管理'
        },
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/label/Label.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' })
  } else next()
})

export default router
