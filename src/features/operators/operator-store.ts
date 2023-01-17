import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { options } from './operator-options';

export interface Operators {
  name: string,
  id: string,
  tasks: TaskItems[]
}
export interface TaskItems {
  text: string,
  id: string
}
export interface CurrentUser {
  name?: string ,
  task?: string 
}

export const useOperatorStore = defineStore('operator-store', () => {
  const operatorItems = ref<Operators[]>(options)
  const currentUser = ref<CurrentUser>({
    name: undefined,
    task: undefined
  })

  function getOperator(key: string) {
    return operatorItems.value.find(i => i.id === key)
  }
  function getOperatorName(key: string) {
    const item = getOperator(key)
    if (!item) return []
    return item.name
  }
  function getTasks(key: string): string[] {
    const item = getOperator(key)
    if (!item) return []

    return item.tasks.map(t => t.text)
  }

  return {
    operatorItems,
    currentUser,
    getOperator,
    getTasks,
    getOperatorName
  }

});


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))