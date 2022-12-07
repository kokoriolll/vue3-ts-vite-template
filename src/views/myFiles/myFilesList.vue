<template>
  <el-row :gutter="0" justify="space-between">
    <el-col :span="16"><MagicBreadcrumb /></el-col>
    <el-col :span="8"><SearchInput @handlerSearch="searchFileList" /></el-col>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-button type="primary" round @click="openCreateFileVisible">
      <el-icon><Upload /></el-icon>新建知识
    </el-button>
    <el-button type="primary" round>
      <el-icon><Upload /></el-icon>新建文件夹
    </el-button>
    <transition name="fade">
      <el-button v-if="isFunctionBtnShow" type="primary" round>
        <el-icon><Share /></el-icon>分享
      </el-button>
    </transition>
    <transition name="fade">
      <el-button v-if="isFunctionBtnShow" type="danger" round @click="deleteFiles">
        <el-icon><Delete /></el-icon>删除
      </el-button>
    </transition>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-table
      ref="fileTable"
      :data="tableData"
      row-key="id"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="名称">
        <template #default="scope">
          <el-icon style="vertical-align: -16%" :color="getIconColor(scope.row)">
            <component :is="getItemIcon(scope.row)" />
          </el-icon>
          <span class="item-point">
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="来源">
        <template #default="scope">
          {{ scope.row.source }}
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template #default="scope">
          {{ scope.row.createUser }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ dayjs(scope.row.createTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template #default="scope">
          <fileFunction :file-detail="scope.row" list-type="fileList" />
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <create-file :visible="isCreateFileVisible" @updateVisible="updateCreateFileVisible"></create-file>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { MagicBreadcrumb, SearchInput, fileFunction } from '../../components/index.js';
import CreateFile from './components/createFile.vue';

const { t } = useI18n();

const isCreateFileVisible = ref<boolean>(false);
// const isCreateFolderVisible = ref<boolean>(false);
const multipleSelection = ref<any[]>([]);
const tableData = ref([
  {
    id: '1670072724312',
    name: '新建文件夹',
    source: '用户上传',
    createUser: 'admin',
    createTime: 1670072724312,
    type: 'folder'
  },
  {
    id: '1670072724310',
    name: 'a.jpg',
    source: '用户上传',
    createUser: 'admin',
    createTime: 1670072724310,
    type: 'file'
  }
]);

const isFunctionBtnShow = computed(() => multipleSelection.value.length);

const handleSelectionChange = (val: []) => {
  multipleSelection.value = val;
};

const getIconColor = (entity: any) => {
  if (entity.type === 'folder') {
    return '#E6A23C';
  } else {
    return '#409EFF';
  }
};

const getItemIcon = (entity: any) => {
  if (entity.type === 'folder') {
    return 'Folder';
  } else {
    return 'Document';
  }
};

const deleteFiles = () => {
  ElMessageBox.confirm(t('tips.deleteText'), t('tips.deleteTitle'), {
    confirmButtonText: t('button.ok'),
    cancelButtonText: t('button.cancel'),
    type: 'error'
  })
    .then(() => {
      console.log('ok');
    })
    .catch(() => {
      console.log('cancel');
    });
};

const openCreateFileVisible = () => {
  isCreateFileVisible.value = true;
};

const updateCreateFileVisible = (val: boolean) => {
  isCreateFileVisible.value = val;
};

const searchFileList = (val: string) => {
  console.log(val);
};
</script>

<script lang="ts">
export default {
  name: 'MyFilesList'
};
</script>

<style scoped>
.item-point {
  cursor: pointer;
  padding-left: 12px;
}

.item-point:hover {
  color: #409eff;
}
</style>
