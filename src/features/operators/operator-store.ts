import {acceptHMRUpdate, defineStore} from 'pinia'
import {computed, ref} from 'vue'
import { options } from './operator-options';

export interface Operators {
  name: string,
  id: string,
  tasks: string[]
}

export const useOperatorStore = defineStore('operator-store', () => {
    const operatorItems = ref<Operators[]>(options)

    function getOperator(key: string) {
      return operatorItems.value.find(i => i.id === key)
    }
 function getTasks(key: string): string[] {
  const item = getOperator(key)
  if(!item) return []

  return item.tasks.map(t => t.text)
 }
    return {
      operatorItems,
      getOperator
    }

});


if(import.meta.hot)
import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))