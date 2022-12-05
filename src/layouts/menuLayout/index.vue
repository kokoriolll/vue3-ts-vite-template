<template>
  <el-container class="layout-container">
    <el-aside :width="'200px'">
      <el-menu class="layout-menu" :default-active="activeMenu" @open="handleOpen" @close="handleClose">
        <subItem v-for="item in menus" :key="item.name" :item="item" :base-path="item.path" />
      </el-menu>
    </el-aside>
    <el-main class="layout-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { basicRoutes } from '../../router';
import { useRoute } from 'vue-router';
import subItem from './subItem.vue';

const route = useRoute();

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

const { children: tempMenus } = basicRoutes.find((item) => item.path === '/');
const menus = reactive(tempMenus);
console.log(menus);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<script lang="ts">
export default {
  name: 'MenuLayout'
};
</script>

<style scoped>
.layout-container {
  height: 100%;
}

.layout-menu {
  height: 100%;
}
</style>
