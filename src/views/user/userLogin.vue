<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from '@/utils/axios';

onMounted(() => {
  axios({
    url: '/api/getUserInfo'
  }).then((resp: any) => {
    console.log(resp);
  });
});
</script>

<script lang="ts">
export default {
  name: 'UserLogin'
};
</script>

<style scoped></style>
