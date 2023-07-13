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
