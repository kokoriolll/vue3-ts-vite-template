<template>
  <el-dialog v-model="dialogVisible" class="dialog-box" :before-close="beforeClose" :title="title" width="45%">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item label="文件夹名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps, watch, computed, onBeforeUnmount } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref<boolean>(false);
const emit = defineEmits(['updateVisible']);
import Mitt from '../../../utils/eventBus';

const title = ref<string>('新建文件夹');
const form = reactive({
  name: undefined
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入文件夹名称', trigger: 'blur' }]
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  detail: {
    type: Object
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
  (ruleFormRef.value as FormInstance).resetFields();
  done();
};

const closeDialog = () => {
  emit('updateVisible', false);
  (ruleFormRef.value as FormInstance).resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) {
      return false;
    }
    console.log(form);
  });
};

Mitt.on('editFolder', (data) => {
  title.value = '修改文件夹';
  dialogVisible.value = true;
  console.log(data);
});

onBeforeUnmount(() => {
  Mitt.off('editFolder');
  console.log('Mitt已卸载');
});
</script>

<script lang="ts">
export default {
  name: 'FolderForm'
};
</script>

<style scoped>
.dialog-box {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
