<template>
  <section>
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
        <el-table-column label="操作" width="120px">
          <template #default="scope">
            <el-tooltip effect="dark" content="撤销" placement="top">
              <el-button type="text">
                <el-icon><RefreshLeft /></el-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableData = ref([
  {
    id: '1670072724310',
    name: 'a.jpg',
    source: '用户上传',
    createUser: 'admin',
    createTime: 1670072724310
  }
]);
</script>

<script lang="ts">
export default {
  name: 'RecycleBin'
};
</script>

<style scoped></style>
