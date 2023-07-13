import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { del, get, set } from 'idb-keyval'
import axios from 'axios'

const pingUrl = 'https://dev.grady-admin.nebule.software/net-api/task'
//const pingUrl = "https://localhost:62721/api/task"
export interface Operators {
  name: string
  id: string
  tasks: TaskItems[]
}
export interface TaskItems {
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

export interface TaskHistory {
  name: string
  task: string
  batchNo: string
  dateScanned: string
}

export const useOperatorStore = defineStore('operator-store', () => {
  /** State */
  const operatorItems = ref<Operators[]>([])
  const currentUser = ref<SelectedUser>({ name: '', id: '', task: '' })
  const scannedBarcode = ref<string>('DB-')
  const taskHistory = ref<TaskHistory[]>([])

  const currentPage = ref(1)
  const take = ref(25)

  /** Getters */
  const currentUserTasks = computed<TaskItems[]>(() => {
    if (!currentUser.value || !currentUser.value.id) return []

    const data = operatorItems.value.find((d) => d.id === currentUser.value?.id)
    if (!data) return []
    return data.tasks
  })

  const operatorsToOptions = computed<SelectOption[]>(() =>
    operatorItems.value.map((o) => ({ text: o.name, value: o.id }))
  )

  /** Actions */
  function nextPage() {
    currentPage.value++
    return loadTaskHistory()
  }

  function previousPage() {
    if (currentPage.value < 1) return

    currentPage.value--
    return loadTaskHistory()
  }
  async function selectUserById(id: string) {
    const name = operatorItems.value.find((d) => d.id === id)?.name ?? ''
    currentUser.value = {
      id,
      name,
      task: '',
    }
  }

  async function selectTask(task: string) {
    if (currentUser.value) currentUser.value.task = task
  }

  async function setUser() {
    await set('user', JSON.stringify(currentUser.value))
  }

  async function loadLocalUser() {
    const previouslyLoggedIN = await get('user')
    const previousUser = JSON.parse(previouslyLoggedIN)
    currentUser.value = previousUser
  }

  async function loadUsersAndTasks() {
    const { data } = await axios.get(`${pingUrl}`)
    operatorItems.value = data
  }

  async function loadTaskHistory() {
    const { data } = await axios.get(
      `${pingUrl}/task-history?userId=${currentUser.value.id}&pageNumber=${currentPage.value}&itemsPerPage=${take.value}`
    )
    taskHistory.value = data
  }
  // async function loadUsersAndTasks() {

  function postBarcode(comment: any) {
    axios.post(`${pingUrl}`, {
      userId: currentUser.value.id,
      task: currentUser.value.task,
      batchNo: scannedBarcode.value,
      comment: comment,
    })
    scannedBarcode.value = 'DB-'
  }

  async function logOut() {
    currentUser.value = { name: '', id: '', task: '' }
    await del('user')
  }

  return {
    operatorItems,
    currentUser,
    currentUserTasks,
    currentPage,
    taskHistory,
    scannedBarcode,
    operatorsToOptions,
    loadUsersAndTasks,
    loadLocalUser,
    nextPage,
    previousPage,
    loadTaskHistory,
    selectUserById,
    selectTask,
    setUser,
    postBarcode,
    logOut,
  }
})

if (import.meta.hot)
  //@ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))
