<template>
  <el-row :gutter="0" justify="space-between">
    <el-col :span="16"><MagicBreadcrumb :data-source="breadcrumbList" /></el-col>
    <el-col :span="8"><SearchInput @handlerSearch="searchFileList" /></el-col>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-button type="primary" round @click="openVisible('file')">
      <el-icon><Upload /></el-icon>新建知识
    </el-button>
    <el-button v-if="isNewFolderShow" type="primary" round @click="openVisible('folder')">
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
          <span class="item-point" @click="clickItem(scope.row)">
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
  <create-file
    :visible="isCreateFileVisible"
    @updateVisible="(val) => updateCreateFileVisible(val, 'file')"
  ></create-file>
  <create-folder
    :visible="isCreateFolderVisible"
    @updateVisible="(val) => updateCreateFileVisible(val, 'folder')"
  ></create-folder>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { MagicBreadcrumb, SearchInput, fileFunction } from '../../components/index.js';
import CreateFile from './components/createFile.vue';
import CreateFolder from './components/createFolder.vue';
const router = useRouter();
const { t } = useI18n();

watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    if (resetPage) {
      resetPage(router.currentRoute.value.meta);
    }
    if (resetBreadcrumbList) {
      resetBreadcrumbList(router.currentRoute.value.meta);
    }
  },
  { immediate: true }
);

const isCreateFileVisible = ref<boolean>(false);
const isCreateFolderVisible = ref<boolean>(false);
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
const breadcrumbList = ref<any[]>([]);

onMounted(() => {
  resetPage(router.currentRoute.value.meta);
  resetBreadcrumbList(router.currentRoute.value.meta);
});

const isNewFolderShow = computed(() => {
  return router.currentRoute.value.meta.name === 'all';
});

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

const openVisible = (type: string) => {
  if (type === 'file') {
    isCreateFileVisible.value = true;
  } else {
    isCreateFolderVisible.value = true;
  }
};

const updateCreateFileVisible = (val: boolean, type: string) => {
  if (type === 'file') {
    isCreateFileVisible.value = val;
  } else {
    isCreateFolderVisible.value = val;
  }
};

const searchFileList = (val: string) => {
  console.log(val);
};

const clickItem = (entity: any) => {
  console.log(entity);
};

var resetPage = (type: any) => {
  if (type.parent === 'myFiles') {
    console.log(type);
  }
};

var resetBreadcrumbList = (type: any) => {
  if (type.parent === 'myFiles') {
    breadcrumbList.value = [];
    breadcrumbList.value.push(type);
  }
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
