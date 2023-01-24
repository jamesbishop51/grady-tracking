import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { options } from './operator-options';
import { get, set } from "idb-keyval"
export interface Operators {
  name: string,
  id: string,
  tasks: TaskItems[]
}
export interface TaskItems {
  taskKey: string,
  text: string
}

export interface SelectOption {
  text: string
  value: string | number
}

export interface selectedUser {
  name: string,
  id: string,
  task: string
}

export const useOperatorStore = defineStore('operator-store', () => {
  /** State */
  const operatorItems = ref<Operators[]>(options)
  const currentUserId = ref<string>("")
  const selectedUserTask = ref<string>()
  /** watcher */

  //

  /** Getters */
  const currentUserTasks = computed<TaskItems[]>(() => {
    if (!currentUserId) return []

    const data = operatorItems.value.find(d => d.id === currentUserId.value)
    if (!data) return []

    return data.tasks
  })
  const operatorsToOptions = computed<SelectOption[]>(() =>
  operatorItems.value.map(s => ({ text: s.name, value: s.id })),
  )

  /** Actions */
  function selectUser(id: string) {
    console.log(id)
    currentUserId.value = id
  }
  


  return {
    operatorItems,
    selectedUserTask,
    currentUserId,
    currentUserTasks,
    operatorsToOptions,
    selectUser,
    

  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))