<template>
  <el-row :gutter="0" justify="space-between">
    <el-col :span="16"><MagicBreadcrumb /></el-col>
    <el-col :span="8"></el-col>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-table ref="recycleListTable" :data="tableData" row-key="id" stripe style="width: 100%">
      <el-table-column label="名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template #default="scope">
          <el-tooltip effect="dark" content="撤销删除" placement="top">
            <el-button type="primary" icon="RefreshLeft" text circle @click="recoverFile(scope.row)"> </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox } from 'element-plus';
const { t } = useI18n();

const tableData = ref([
  {
    id: '1670072724310',
    name: 'a.jpg',
    source: '用户上传',
    createUser: 'admin',
    createTime: 1670072724310
  }
]);

const recoverFile = (entity: any) => {
  ElMessageBox.confirm(t('tips.recycleFileText'), t('tips.deleteTitle'), {
    confirmButtonText: t('button.ok'),
    cancelButtonText: t('button.cancel'),
    type: 'info'
  })
    .then(() => {
      console.log('then');
    })
    .catch(() => {
      console.log('catch');
    });
};
</script>

<script lang="ts">
export default {
  name: 'RecycleBin'
};
</script>

<style scoped></style>
