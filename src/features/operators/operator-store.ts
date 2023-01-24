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

export interface SelectedUser {
  name?: string,
  id?: string,
  task?: string
}

export const useOperatorStore = defineStore('operator-store', () => {
  /** State */
  const operatorItems = ref<Operators[]>(options)
  const currentUserId = ref<string>("")
  const currentUserTask = ref<string>("")


  /** watcher */

  //

  /** Getters */
  const currentUserTasks = computed<TaskItems[]>(() => {
    if (!currentUserId) return []

    const data = operatorItems.value.find(d => d.id === currentUserId.value)
    if (!data) return []

    return data.tasks
  })

  const currentUserName = computed(() => selectUsername())

  const selectedUser = computed<SelectedUser>(() => ({
    name: currentUserName.value,
    id: currentUserId.value,
    task: currentUserTask.value
  }))

  const operatorsToOptions = computed<SelectOption[]>(() =>
    operatorItems.value.map(o => ({ text: o.name, value: o.id })),
  )

  /** Actions */
  function selectUserById(id: string) {
    currentUserId.value = id
  }

  function selectUsername() {
    const data = operatorItems.value.find(d => d.id === currentUserId.value)
    if (!data) return ""
    return data.name
  }

  return {
    operatorItems,
    selectedUser,
    currentUserName,
    currentUserTask,
    currentUserId,
    currentUserTasks,
    operatorsToOptions,
    selectUserById,


  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))