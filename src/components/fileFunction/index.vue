<template>
  <el-tooltip v-if="listType === 'fileList'" effect="dark" content="编辑" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="Edit" @click="editBus"> </el-button>
  </el-tooltip>
  <el-tooltip effect="dark" content="详情" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="Tickets" @click="emitBus('detail')"> </el-button>
  </el-tooltip>
  <el-tooltip v-if="isButtonShow" effect="dark" content="预览" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="View" @click="emitBus('view')"> </el-button>
  </el-tooltip>
  <el-tooltip v-if="isButtonShow" effect="dark" content="下载" placement="top" :hide-after="10">
    <el-button type="primary" text circle icon="Download" @click="emitBus('download')"> </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import Mitt from '../../utils/eventBus';

const emit = defineEmits(['buttonClick']);

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

const editBus = () => {
  if (props.fileDetail.isFolder) {
    Mitt.emit('editFolder', props.fileDetail);
  } else {
    console.log('editFile');
  }
};

const emitBus = (type: string) => {
  emit('buttonClick', type, props.fileDetail);
};
</script>

<script lang="ts">
export default {
  name: 'FileFunction'
};
</script>

<style scoped></style>
