<template>
  <el-tooltip v-if="listType === 'fileList'" effect="dark" content="编辑" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="Edit"> </el-button>
  </el-tooltip>
  <el-tooltip effect="dark" content="详情" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="Tickets" @click="viewDetail"> </el-button>
  </el-tooltip>
  <el-tooltip v-if="isButtonShow" effect="dark" content="预览" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="View"> </el-button>
  </el-tooltip>
  <el-tooltip v-if="isButtonShow" effect="dark" content="下载" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="Download"> </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const emit = defineEmits(['viewDetail']);

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

const isButtonShow = computed(() => {
  return !props.fileDetail.isFolder;
});

const viewDetail = () => {
  emit('viewDetail', props.fileDetail);
};
</script>

<script lang="ts">
export default {
  name: 'FileFunction'
};
</script>

<style scoped></style>
