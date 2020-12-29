export type TaskType = {
  _id: string
  content: string
  creator: string
  isCompleted: boolean
  date: Date
}

export type SortedTasksType = {
  day: string
  tasks: TaskType[]
}