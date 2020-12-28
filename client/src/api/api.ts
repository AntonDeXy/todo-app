import { TaskType } from "../types"

const testTasks: TaskType[] = [
  {
    id: '1',
    content: 'task',
    creator: 'user',
    isCompleted: true,
    date: new Date(2020, 11, 10)
  }, //past completed
  {
    id: '2',
    content: 'task',
    creator: 'user',
    isCompleted: false,
    date: new Date(2020, 11, 10)
  }, //past !completed
  {
    id: '3',
    content: 'task',
    creator: 'user',
    isCompleted: true,
    date: new Date()
  }, // today completed
  {
    id: '4',
    content: 'task',
    creator: 'user',
    isCompleted: false,
    date: new Date()
  }, // today !completed
  {
    id: '5',
    content: 'task',
    creator: 'user',
    isCompleted: false,
    date: new Date(2020, 11, 14)
  }, // tomorrow
  {
    id: '6',
    content: 'task',
    creator: 'user',
    isCompleted: false,
    date: new Date(2020, 11, 15)
  }, // in 3
  {
    id: '7',
    content: 'task',
    creator: 'user',
    isCompleted: false,
    date: new Date(2021, 0, 10)
  }, // soon
]

const api = {
  getTasks(
    success: (tasks: TaskType[]) => void,
    userId?: string
  ) {
    const data = [...testTasks]
    success(data)
  },
  createTask(
    taskDate: Date,
    taskContent: string,
    userId: string,
    success: () => void
  ) {
    const newTask = {
      id: ((Math.random() * 12).toFixed()).toString(),
      isCompleted: false,
      creator: userId,
      content: taskContent,
      date: taskDate,
    }

    testTasks.push(newTask)

    success()
  }
}

export default api