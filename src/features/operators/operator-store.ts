import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { options } from './operator-options';
import { del, get, set } from 'idb-keyval'
import axios from 'axios'

// const pingUrl = "https://jsonplaceholder.typicode.com/todos/1"
const pingUrl = "https://localhost:58441/api/task"
// const pingUrl = "http://http://192.168.41.72:58441/:58441/api/ping"
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
  name?: string
  id?: string
  task?: string
}

export interface TaskEntry {
  userId: string
  task: string
  comments?: string
  batchNo: string
}

export const useOperatorStore = defineStore('operator-store', () => {
  /** State */
  const operatorItems = ref<Operators[]>(options)
  const currentUserId = ref<string>("")
  const currentUserTask = ref<string>("")
  const taskEntries = ref<TaskEntry[]>([])
  const scanTime = ref<Date>()
  const user = ref<SelectedUser>()
  const scannedBarcode = ref<string>()
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

  const nameAndTask = computed(() => {
    if (!currentUserTask)
      return selectedUser.value.name

    return `${user.value?.name} | ${user.value?.task}`
  })

  /** Actions */

  function resetTasks() {
    taskEntries.value = [{
      task:"",
      batchNo:""
    }]
  }

  function selectUserById(id: string) {
    currentUserId.value = id
  }

  function selectUsername() {
    const data = operatorItems.value.find(d => d.id === currentUserId.value)
    if (!data) return ""
    return data.name
  }

  async function loadUser() {
    const previouslyLoggedIN = await get("user")
    const previousUser = JSON.parse(previouslyLoggedIN)
    selectUserById(previousUser.id)
    user.value = previousUser
  }

  async function setUser() {
    if (!currentUserId.value) throw Error("something broke Users")  // replace with proper error later

    await set("user", selectedUser.value)
    loadUser()
  }

  async function logOut() {
    await del("user")
  }

  async function completeTask() {
    if (!currentUserId.value) throw Error("something broke Tasks") // replace with proper error later

    const previousTaskJson = await get<string>(currentUserId.value)
    const previousTasks = JSON.parse(previousTaskJson || '[]');

    previousTasks.unshift({
      entries: taskEntries.value,
      dateSubmitted: new Date()
    })

    await set(currentUserId.value, JSON.stringify(previousTasks))

    resetTasks()

  }

  async function loadTaskHistory(id: string) {
    const previousTaskJson = await get<string>(id)
    const previousTasks = JSON.parse(previousTaskJson || '[]')
    taskHistory.value = previousTasks;
  }



  // async function loadUsersAndTasks() {
  //   try {
  //     const { data } = await axios.get(`${pingUrl}`)
  //     console.log(data)
  //     message.value = data
  //     operatorItems.value = data.users
  //   }
  //   catch (e: any) {
  //     console.error(e)
  //     message.value = `err:${JSON.stringify(e)}`

  //   }
  // }

  // async function postTest(id: string) {
  //   try {
  //     return axios.post(`${pingUrl}/${id}`)
  //   }
  //   catch (e: any) {
  //     console.error(e)
  //     messagePost.value = `err:${JSON.stringify(e)}`
  //   }
  // }

  return {
    operatorItems,
    selectedUser,
    currentUserName,
    currentUserTask,
    currentUserId,
    currentUserTasks,
    operatorsToOptions,
    scanTime,
    nameAndTask,
    user,
    taskEntries,
    taskHistory,
    message,
    scannedBarcode,
    messagePost,
    selectUserById,
    completeTask,
    loadUser,
    loadTaskHistory,
    // loadUsersAndTasks,
    // postTest,
    setUser,
    logOut

  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))