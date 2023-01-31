<template>
  <el-dialog v-model="dialogVisible" title="知识详情" width="30%" :before-close="handleClose">
    <el-row>
      <el-col :span="4">
        <el-icon :size="36" :color="'#E6A23C'"> <Folder /> </el-icon>
      </el-col>
      <el-col :span="20">
        <span class="knowledge-title">
          {{ fileDetail.title }}
        </span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-descriptions :column="1">
        <el-descriptions-item label="类型">{{ getKnowledgeType(fileDetail) }}</el-descriptions-item>
        <el-descriptions-item label="来源">{{ fileDetail.resource }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ fileDetail.createUserName }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          dayjs(fileDetail.createTime).format('YYYY-MM-DD')
        }}</el-descriptions-item>
      </el-descriptions>
    </el-row>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import { getKnowledge } from './myknowledge';

const dialogVisible = ref<boolean>(false);

const emit = defineEmits(['updateVisible']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  fileDetail: {
    type: Object,
    required: true
  }
});

watch(
  () => props.visible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

const handleClose = () => {
  emit('updateVisible', false);
};

const getKnowledgeType = (entity: any) => {
  if (entity.isFolder) {
    return '文件夹';
  } else {

    return '文件';
  }
};
</script>

<script lang="ts">
export default {
  name: 'KnowledgeDetail'
};
</script>

<style scoped>
.knowledge-title {
  height: 39px;
  line-height: 36px;
  font-size: 16px;
}
</style>
