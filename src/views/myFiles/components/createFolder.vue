<template>
  <el-dialog v-model="dialogVisible" class="dialog-box" :before-close="beforeClose" title="新建文件夹" width="45%">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
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
import { ref, reactive, defineProps, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref<boolean>(false);
const emit = defineEmits(['updateVisible']);

const form = reactive({
  name: ''
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入文件夹名称', trigger: 'blur' }]
});

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
</script>

<script lang="ts">
export default {
  name: 'CreateFolder'
};
</script>

<style scoped>
.dialog-box {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
