<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const items = [
      {
        icon: "iconfont icon-home",
        index: "/main",
        title: "举报管理",
      },
      {
        icon: "iconfont icon-article",
        index: "2",
        title: " 文章管理",
        subs: [
          {
            index: '/articleList',
            title: ' 文章列表'
          },
          {
            index: '/newArticle',
            title: ' 发布文章'
          }
        ]
      },
      {
        icon: "iconfont icon-activity",
        index: "3",
        title: "活动管理",
        subs: [
          {
            index: "/activityList",
            title: "活动列表",
          },
        ]
      },
      {
        icon: "iconfont icon-comment",
        index: "/comment",
        title: "评论管理",
      },
      {
        icon: "iconfont icon-team",
        index: "6",
        title: " 团队管理",
        subs: [
          {
            index: "/teamList",
            title: "团队列表",
          },
        ]
      },
      {
        icon: "iconfont icon-user",
        index: "7",
        title: " 用户管理",
        subs: [
          {
            index: "/userList",
            title: " 用户管理",
          },
          {
            index: '/user',
            title: '创建管理员'
          }
        ]
      },
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar>ul {
  height: 100%;
}
</style>
