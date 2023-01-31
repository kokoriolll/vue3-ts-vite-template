<template>
  <section v-loading="loading" class="content">
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
    <el-row style="margin-top: 20px; flex: 1">
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
              {{ scope.row.title }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="来源">
          <template #default="scope">
            {{ scope.row.resource }}
          </template>
        </el-table-column>
        <el-table-column label="创建人">
          <template #default="scope">
            {{ scope.row.createUserName }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template #default="scope">
            {{ dayjs(scope.row.createTime).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <fileFunction :file-detail="scope.row" list-type="fileList" @viewDetail="showViewDetail" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 20px; margin-bottom: 4px; justify-content: end">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        @current-change="paginationChange"
      />
    </el-row>
  </section>
  <create-file :visible="isCreateFileVisible" @updateVisible="(val) => updateVisibleState(val, 'file')"></create-file>
  <create-folder
    :visible="isCreateFolderVisible"
    @updateVisible="(val) => updateVisibleState(val, 'folder')"
  ></create-folder>
  <knowledge-detail
    :visible="isKnowledgeDetailVisible"
    :file-detail="tempKnowledge"
    @updateVisible="(val) => updateVisibleState(val, 'detail')"
  ></knowledge-detail>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { MagicBreadcrumb, SearchInput, fileFunction } from '../../components/index.js';
import CreateFile from './components/createFile.vue';
import CreateFolder from './components/createFolder.vue';
import knowledgeDetail from './components/knowledgeDetail.vue';
import { getKnowledge, batchDeleteKnowledge } from '@/api/myknowledge';
import KnowledgeDetail from './components/knowledgeDetail.vue';
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

const loading = ref<boolean>(false);
const total = ref<number>(0);
const searchParams = ref({
  pageNumber: 0,
  pageSize: 10,
  search_title: ''
});
const isCreateFileVisible = ref<boolean>(false);
const isCreateFolderVisible = ref<boolean>(false);
const isKnowledgeDetailVisible = ref<boolean>(false);
const multipleSelection = ref<any[]>([]);
const tableData = ref([]);
const breadcrumbList = ref<any[]>([]);
const tempKnowledge = ref({});

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
  if (entity.isFolder === 1) {
    return '#E6A23C';
  } else {
    return '#409EFF';
  }
};

const getItemIcon = (entity: any) => {
  if (entity.isFolder === 1) {
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
  }).then(() => {
    loading.value = true;
    const data: any = [];
    multipleSelection.value.forEach((item) => {
      data.push({
        id: item.id
      });
    });
    batchDeleteKnowledge(data)
      .then((resp: any) => {
        console.log(resp);
        getKnowledgeList();
        ElMessage.success(t('tips.deleteSuccess'));
      })
      .catch((e: any) => {
        console.log(e);
        ElMessage.error(t('tips.deleteFail'));
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

const openVisible = (type: string) => {
  if (type === 'file') {
    isCreateFileVisible.value = true;
  } else {
    isCreateFolderVisible.value = true;
  }
};

const updateVisibleState = (val: boolean, type: string) => {
  switch (type) {
    case 'file':
      isCreateFileVisible.value = val;
      break;
    case 'folder':
      isCreateFolderVisible.value = val;
      break;
    case 'detail':
      isKnowledgeDetailVisible.value = val;
      setTimeout(() => {
        tempKnowledge.value = {};
      }, 300);
      break;
  }
};

const searchFileList = (val: string) => {
  searchParams.value.search_title = val;
  getKnowledgeList();
};

const clickItem = (entity: any) => {
  console.log(entity);
};

var resetPage = (type: any) => {
  if (type.name === 'all') {
    getKnowledgeList();
  } else {
  }
};

var resetBreadcrumbList = (type: any) => {
  if (type.parent === 'myFiles') {
    breadcrumbList.value = [];
    breadcrumbList.value.push(type);
  }
};

const getKnowledgeList = () => {
  loading.value = true;
  getKnowledge(searchParams.value)
    .then((resp: any) => {
      total.value = resp.data.totalElements;
      tableData.value = resp.data.content ? resp.data.content : [];
    })
    .catch((e: any) => {
      ElMessage.error(t('tips.loadFail'));
    })
    .finally(() => {
      loading.value = false;
    });
};

const getFileList = () => {};

const paginationChange = (value: number) => {
  searchParams.value.pageNumber = value - 1;
  getKnowledgeList();
};

const showViewDetail = (entity: any) => {
  tempKnowledge.value = entity;
  isKnowledgeDetailVisible.value = true;
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

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
