<template>
  <el-dialog v-model="dialogVisible" :before-close="beforeClose" title="新建知识" width="40%"></el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue';

const dialogVisible = ref<boolean>(false);
const emit = defineEmits(['updateVisible']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

const beforeClose = (done: any) => {
  emit('updateVisible', false);
  done();
};
</script>

<script lang="ts">
export default {
  name: 'CreateFile'
};
</script>

<style scoped></style>
