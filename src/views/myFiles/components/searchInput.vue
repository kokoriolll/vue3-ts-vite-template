<template>
  <el-input v-model="text" placeholder="请输入文件名" :maxlength="50" clearable>
    <template #append>
      <el-button @click="searchFile">
        <el-icon><Search /></el-icon>
      </el-button>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref(undefined);

const searchFile = () => {
  console.log(text.value);
};
</script>

<script lang="ts">
export default {
  name: 'SearchInput'
};
</script>

<style scoped></style>
