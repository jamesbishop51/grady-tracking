import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { options } from './operator-options';
import { del, get, set } from 'idb-keyval'
import axios from 'axios'

const pingUrl = "https://localhost:55489/api/task"
export interface Operators {
  name: string
  id: string
  tasks: TaskItems[]
}
export interface TaskItems {
  taskKey: string
  text: string
}

export interface SelectOption {
  text: string
  value: string | number
}

export interface SelectedUser {
  name: string
  id: string
  task?: string
}

export interface TaskEntry {
  userId: string
  task: string
  comments?: string
  batchNo?: string
  dateScanned?: string
}

export const useOperatorStore = defineStore('operator-store', () => {
  /** State */
  const operatorItems = ref<Operators[]>([])
  const currentUser = ref<SelectedUser>({ name: "", id: "", task: "" })
  const scannedBarcode = ref<string>("DB-")

  /** Getters */
  const currentUserTasks = computed<TaskItems[]>(() => {
    if (!currentUser.value || !currentUser.value.id)
      return []

    const data = operatorItems.value.find(d => d.id === currentUser.value?.id)
    if (!data) return []

    return data.tasks
  })

  const operatorsToOptions = computed<SelectOption[]>(() =>
    operatorItems.value.map(o => ({ text: o.name, value: o.id })),
  )

  /** Actions */
  async function selectUserById(id: string) {
    const name = operatorItems.value.find(d => d.id === id)?.name ?? ''
    currentUser.value = {
      id,
      name,
    }
  }

  async function selectTask(task: string) {
    if (currentUser.value)
      currentUser.value.task = task
  }

  async function setUser() {
    await set("user", JSON.stringify(currentUser.value))
  }

  async function loadUserLocalUser() {
    const previouslyLoggedIN = await get("user")
    const previousUser = JSON.parse(previouslyLoggedIN)
    currentUser.value = previousUser
  }

  async function loadUsersAndTasks() {
    const { data } = await axios.get<{ operators: Operators[] }>(`${pingUrl}`)
    console.log(data)
    operatorItems.value = data.operators
  }

  function postBarcode(comments: any) {
    axios.post(`${pingUrl}`, ({ userId: currentUser.value.id, task: currentUser.value.task, batchNo: scannedBarcode.value, comments: comments }))
    scannedBarcode.value = 'DB-'
  }

  async function logOut() {
    await del("user")
  }

  return {
    operatorItems,
    currentUser,
    currentUserTasks,
    scannedBarcode,
    operatorsToOptions,
    loadUsersAndTasks,
    loadUserLocalUser,
    selectUserById,
    selectTask,
    setUser,
    postBarcode,
    logOut
  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))