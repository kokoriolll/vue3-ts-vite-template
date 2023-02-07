<template>
  <section v-loading="loading" class="content">
    <el-row :gutter="0" justify="space-between">
      <el-col :span="16">
        <magic-breadcrumb :data-source="[{ title: '我的分享', name: 'share' }]" />
      </el-col>
      <el-col :span="8"><SearchInput @handlerSearch="searchFileList" /></el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-button :disabled="!isFunctionBtnShow" type="danger" round @click="batchUnShare">
        <el-icon><RefreshLeft /></el-icon>批量取消分享
      </el-button>
    </el-row>
    <el-row style="margin-top: 20px; flex: 1">
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
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { SearchInput, fileFunction, MagicBreadcrumb } from '../../components/index.js';
import FileFunction from '../../components/fileFunction/index.vue';
import { getMyShareList } from '@/api/myShare';
const { t } = useI18n();

const loading = ref<boolean>(false);
const searchParams = ref({
  pageNumber: 0,
  pageSize: 10,
  search_title: ''
});
const tableData = ref<any[]>([]);
const total = ref<number>(0);

const multipleSelection = ref<any[]>([]);

const searchFileList = (val: string) => {
  searchParams.value.search_title = val;
  getShareList();
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

const getShareList = () => {
  loading.value = true;
  getMyShareList(searchParams.value)
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

const paginationChange = (value: number) => {
  searchParams.value.pageNumber = value - 1;
  getShareList();
};

onMounted(() => {
  getShareList();
});
</script>

<script lang="ts">
export default {
  name: 'MyShareList'
};
</script>

<style scoped></style>
