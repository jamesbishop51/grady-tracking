import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { del, get, set } from 'idb-keyval'
import axios from 'axios'
import { Operators, SelectedUser, TaskHistory, TaskItems, SelectOption } from '~/types'
const pingUrl = 'https://admin-app.gradyjoinery.co.uk/net-api/task'

export const useOperatorStore = defineStore('operator-store', () => {
  /** State */
  const operatorItems = ref<Operators[]>([])
  const currentUser = ref<SelectedUser>({ name: '', id: '', task: '' })
  const scannedBarcode = ref<string>('')
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

  function postBarcode(comment: any) {
    axios.post(`${pingUrl}`, {
      userId: currentUser.value.id,
      task: currentUser.value.task,
      batchNo: scannedBarcode.value,
      comment: comment,
    })
    scannedBarcode.value = ''
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
