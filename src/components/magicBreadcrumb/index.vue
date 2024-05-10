<template>
  <el-breadcrumb
    class="breadcrumb-content"
    separator="/"
  >
    <!--<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>-->
    <el-breadcrumb-item
      v-for="item in dataSource"
      :key="item.name"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  dataSource: {
    type: Array,
    default: () => []
  }
});
</script>

<script lang="ts">
export default {
  name: 'MagicBreadcrumb'
};
</script>

<style scoped>
.breadcrumb-content {
  min-height: 32px;
  display: flex;
  align-items: center;
}
</style>
