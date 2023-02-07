<template>
  <el-dialog v-model="dialogVisible" :before-close="beforeClose" title="新建知识" width="45%">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item label="知识名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入知识名称" />
      </el-form-item>
      <el-form-item label="来源" prop="resource">
        <el-input v-model="form.resource" placeholder="请输入来源" />
      </el-form-item>
      <el-form-item label="文件类型" prop="type">
        <el-select v-model="form.type" class="m-2" placeholder="请选择文件类型" style="width: 100%">
          <el-option
            v-for="item in enumStore.documentTypeEnum"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上传附件" prop="file">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
          </template>
        </el-upload>
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
import { ElMessageBox } from 'element-plus';
import { useEnumStore } from '@/store/modules/enum';
import type { FormInstance, FormRules, UploadProps, UploadInstance, UploadUserFile } from 'element-plus';

const enumStore = useEnumStore();

const ruleFormRef = ref<FormInstance>();
const form = ref({
  name: undefined,
  type: undefined,
  resource: undefined
});

const fileList = ref<UploadUserFile[]>([]);
const upload = ref<UploadInstance>();

const dialogVisible = ref<boolean>(false);
const emit = defineEmits(['updateVisible']);

const rules = reactive<FormRules>({
  name: [{ required: true, message: '知识名称', trigger: 'blur' }]
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

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
</script>

<script lang="ts">
export default {
  name: 'CreateFile'
};
</script>

<style scoped></style>
