<template>
  <div class="about">
    <!-- heder组件 -->
    <v-header />
    <!-- 侧边栏菜单组件 -->
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <!-- 标签组件 -->
      <v-tags></v-tags>
      <!-- 动态路由判断要显示的组件 -->
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "../components/Header.vue";
import vSidebar from "../components/Sidebar.vue";
import vTags from "../components/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const store = useStore();
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    );
    // 控制折叠
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
};
</script>
