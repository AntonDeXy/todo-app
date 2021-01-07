import { TaskType } from "../types"

export const getSortedTasks = (tasks: TaskType[]) => {
  const sortedByDateTasks = [...tasks]
  .map(todo => ({
    ...todo,
    date: new Date(todo.date)
  }))
  .sort((a, b) => a.date.getTime() - b.date.getTime())

  const pastTasks = getPastTasks(sortedByDateTasks)
  const todayTasks = getTodayTasks(pastTasks.remainedTasks)
  const tomorrowTasks = getTomorrowTasks(todayTasks.remainedTasks)

  const finalData = [
    {
      day: 'overdue',
      isColapsed: false,
      tasks: pastTasks.tasks
    },
    {
      day: 'today',
      isColapsed: false,
      tasks: todayTasks.tasks
    },
    {
      day: 'tomorrow',
      isColapsed: false,
      tasks: tomorrowTasks.tasks
    },
    {
      day: 'soon',
      isColapsed: false,
      tasks: tomorrowTasks.remainedTasks
    },
    {
      day: 'past completed',
      isColapsed: true,
      tasks: pastTasks.completed
    }
  ]

  return finalData
}


const getPastTasks = (tasks: TaskType[]) => {
  const remainedTasks: TaskType[] = []
  const pastCompleted:TaskType[] = []
  const filteredTasks = tasks.filter((task) => {
    const dateForSortBy = new Date()
    const isYearPast = task.date.getFullYear() < dateForSortBy.getFullYear()
    const isMonthPast = task.date.getMonth() < dateForSortBy.getMonth() && task.date.getFullYear() <= dateForSortBy.getFullYear()
    const isDayPast = task.date.getDate() < dateForSortBy.getDate() && task.date.getMonth() <= dateForSortBy.getMonth() && task.date.getFullYear() <= dateForSortBy.getFullYear()

    const sort = (isYearPast || isMonthPast || isDayPast)

    if (sort) {
      if (!task.isCompleted) {
        return task
      } else {
        pastCompleted.push(task)
      }
    } else {
      remainedTasks.push(task)
    }
    return false
  })

  return { completed: pastCompleted, tasks: filteredTasks, remainedTasks }
}

const getTodayTasks = (tasks: TaskType[]) => {
  const remainedTasks: TaskType[] = []

  const filteredTasks = tasks.filter((task) => {
    const sort = (
      task.date.getDate() === new Date().getDate()
      && task.date.getMonth() === new Date().getMonth()
      && task.date.getFullYear() === new Date().getFullYear()
    )

    if (sort) {
      return task
    } else {
      remainedTasks.push(task)
    }
    return ''
  })

  return { tasks: filteredTasks, remainedTasks }
}

const getTomorrowTasks = (tasks: TaskType[]) => {
  const remainedTasks: TaskType[] = []

  const tommorowDate = new Date();
  tommorowDate.setDate(new Date().getDate()+1);


  const filteredTasks = tasks.filter((task) => {
    const sort = (
      task.date.getDate() === tommorowDate.getDate()
      && task.date.getMonth() === tommorowDate.getMonth()
      && task.date.getFullYear() === tommorowDate.getFullYear()
    )

    if (sort) {
      return task
    } else {
      remainedTasks.push(task)
    }
  })

  return { tasks: filteredTasks, remainedTasks }
}