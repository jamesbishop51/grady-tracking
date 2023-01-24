import { acceptHMRUpdate, defineStore } from 'pinia'

import { ref } from 'vue';






export const useTaskStore = defineStore('task-store', () => {

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))