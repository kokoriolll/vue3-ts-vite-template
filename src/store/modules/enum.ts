import { defineStore } from 'pinia';
import { getFileTypeEnum } from '@/api/enums';

export const useEnumStore = defineStore({
  id: 'enum',
  state: () => ({
    documentTypeEnum: []
  }),
  getters: {},
  actions: {
    async getFileTypesEnum() {
      const data = await getFileTypeEnum();
      this.documentTypeEnum = data.data;
      console.log(this.documentTypeEnum);
    }
  }
});
