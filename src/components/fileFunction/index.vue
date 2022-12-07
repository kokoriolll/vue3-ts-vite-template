<template>
  <el-tooltip v-if="listType === 'fileList'" effect="dark" content="编辑" placement="top" :hide-after="10">
    <el-button type="text">
      <el-icon><Edit /></el-icon>
    </el-button>
  </el-tooltip>
  <el-tooltip effect="dark" content="详情" placement="top" :hide-after="10">
    <el-button type="text">
      <el-icon><Tickets /></el-icon>
    </el-button>
  </el-tooltip>
  <el-tooltip effect="dark" content="预览" placement="top" :hide-after="10">
    <el-button type="text">
      <el-icon><View /></el-icon>
    </el-button>
  </el-tooltip>
  <el-tooltip effect="dark" content="下载" placement="top" :hide-after="10">
    <el-button type="text">
      <el-icon><Download /></el-icon>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  fileDetail: {
    type: Object,
    required: true
  },
  listType: {
    type: String,
    default: 'fileList'
  }
});
</script>

<script lang="ts">
export default {
  name: 'FileFunction'
};
</script>

<style scoped></style>
