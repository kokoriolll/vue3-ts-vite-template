<template>
  <el-row :gutter="0" justify="space-between">
    <el-col :span="16">
      <transition name="fade">
        <el-button v-if="isFunctionBtnShow" type="danger" round @click="batchUnShare">
          <el-icon><RefreshLeft /></el-icon>批量取消分享
        </el-button>
      </transition>
    </el-col>
    <el-col :span="8"><SearchInput @handlerSearch="searchFileList" /></el-col>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-table
      ref="shareList"
      :data="tableData"
      row-key="id"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="名称">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="来源"></el-table-column>
      <el-table-column label="分享给"></el-table-column>
      <el-table-column label="分享时间"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template #default="scope">
          <file-function :file-detail="scope.row" list-type="shareList" />
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { SearchInput, fileFunction } from '../../components/index.js';
import FileFunction from '../../components/fileFunction/index.vue';
const { t } = useI18n();

const tableData = ref<any[]>([
  {
    id: '1670072724310',
    name: 'a.jpg',
    source: '用户上传',
    createUser: 'admin',
    createTime: 1670072724310,
    type: 'file'
  }
]);

const multipleSelection = ref<any[]>([]);

const searchFileList = (val: string) => {
  console.log(val);
};

const handleSelectionChange = (val: []) => {
  multipleSelection.value = val;
};

const isFunctionBtnShow = computed(() => multipleSelection.value.length);

const batchUnShare = () => {
  ElMessageBox.confirm(t('tips.unShareText'), t('tips.unShareTitle'), {
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
  name: 'MyShareList'
};
</script>

<style scoped></style>
