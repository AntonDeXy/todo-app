export type TaskType = {
  _id: string
  content: string
  creator: string
  img?: string
  isCompleted: boolean
  date: Date
  createdAt?: string
}

export type SortedTasksType = {
  day: string
  tasks: TaskType[]
  isColapsed: boolean
}