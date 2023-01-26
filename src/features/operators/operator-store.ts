import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { options } from './operator-options';
import axios from 'axios'

// const pingUrl = "https://jsonplaceholder.typicode.com/todos/1"
const pingUrl = "https://localhost:58441/api/task"
// const pingUrl = "http://http://192.168.41.72:58441/:58441/api/ping"
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
  const operatorItems = ref<Operators[]>([])
  const currentUserId = ref<string>("")
  const currentUserTask = ref<string>("")
  const scanTime = ref<Date>()
  const message = ref<string>()
  const messagePost = ref<string>()
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

    return `${selectedUser.value.name} - ${selectedUser.value.task}`
  })

  /** Actions */
  async function loadUsersAndTasks() {
    try {
      const { data } = await axios.get(`${pingUrl}`)
      console.log(data)
      operatorItems.value = data.users
    }
    catch (e: any) {
      console.error(e)
      message.value = `err:${JSON.stringify(e)}`
     
    }
  }

  async function postTest(id: string) {
    try {
      return axios.post(`${pingUrl}/${id}`)
    }
    catch (e: any) {
      console.error(e)
      messagePost.value = `err:${JSON.stringify(e)}`
    }
  }

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
    scanTime,
    nameAndTask,
    message,
    messagePost,
    selectUserById,
    loadUsersAndTasks,
    postTest


  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOperatorStore, import.meta.hot))