<template>
  <section>
    <el-row :gutter="0" justify="space-between">
      <el-col :span="16"><MagicBreadcrumb /></el-col>
      <el-col :span="8"><SearchInput /></el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-button type="primary" round>
        <el-icon :size="iconSize"><Upload /></el-icon>新建知识
      </el-button>
      <el-button type="primary" round>
        <el-icon :size="iconSize"><Upload /></el-icon>新建文件夹
      </el-button>
      <transition name="fade">
        <el-button v-if="isFunctionBtnShow" type="primary" round>
          <el-icon :size="iconSize"><Share /></el-icon>分享
        </el-button>
      </transition>
      <transition name="fade">
        <el-button v-if="isFunctionBtnShow" type="danger" round @click="deleteFiles">
          <el-icon :size="iconSize"><Delete /></el-icon>删除
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
            <el-icon style="vertical-align: -16%" :size="iconSize" :color="getIconColor(scope.row)">
              <component :is="getItemIcon(scope.row)" />
            </el-icon>
            {{ scope.row.name }}
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
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="text">
                <el-icon :size="iconSize"><Edit /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="详情" placement="top">
              <el-button type="text">
                <el-icon :size="iconSize"><Tickets /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="预览" placement="top">
              <el-button type="text">
                <el-icon :size="iconSize"><View /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="下载" placement="top">
              <el-button type="text">
                <el-icon :size="iconSize"><Download /></el-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { MagicBreadcrumb } from '../../components/index.ts';
import SearchInput from './components/searchInput.vue';

const { t } = useI18n();

const iconSize = ref(14);
const multipleSelection = ref([]);

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
  console.log(multipleSelection.value);
};

const getIconColor = (entity) => {
  if (entity.type === 'folder') {
    return '#E6A23C';
  } else {
    return '#409EFF';
  }
};

const getItemIcon = (entity) => {
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
</script>

<script lang="ts">
export default {
  name: 'MyFilesList'
};
</script>

<style scoped>
.fade-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
