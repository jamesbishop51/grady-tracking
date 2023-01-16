import {acceptHMRUpdate, defineStore} from 'pinia'
import {computed, ref} from 'vue'

export const useOperatorStore = defineStore('operator-store', () => {

});

if(import.meta.hot)
import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))