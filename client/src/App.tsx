import React from 'react'
import TasksHeader from './components/tasks-header'
import TaskGroup from './components/task-group'
import { useEffect, useState } from 'react'
import api from './api/api'
import { SortedTasksType, TaskType } from './types'
import CreateNewTaskModal from './components/modals/create-new-task-modal'
import { TaskGroupsWrapper } from './styled/tasks-styled'
import { Button } from '@material-ui/core';

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [sortedtasks, setSortedTasks] = useState<SortedTasksType[]>([])
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState<boolean>(false)

  useEffect(() => {
    // const sortedTasks = 
    const sortedByDateTasks = [...tasks].sort((a, b) => a.date.getTime() - b.date.getTime())


    const pastTasks = getPastTasks(sortedByDateTasks)
    const todayTasks = getTodayTasks(pastTasks.remainedTasks)
    const tomorrowTasks = getTomorrowTasks(todayTasks.remainedTasks)

    const finalData = [
      {
        day: 'past',
        tasks: pastTasks.tasks
      },
      {
        day: 'today',
        tasks: todayTasks.tasks
      },
      {
        day: 'tomorrow',
        tasks: tomorrowTasks.tasks
      },
      {
        day: 'soon',
        tasks: tomorrowTasks.remainedTasks
      },
    ]
    setSortedTasks(finalData)
  }, [tasks])

  const getPastTasks = (tasks: TaskType[]) => {
    const remainedTasks: TaskType[] = []
    const filteredTasks = tasks.filter((task) => {
      const dateForSortBy = new Date()
      const isYearPast = task.date.getFullYear() < dateForSortBy.getFullYear()
      const isMonthPast = task.date.getMonth() < dateForSortBy.getMonth() && task.date.getFullYear() <= dateForSortBy.getFullYear()
      const isDayPast = task.date.getDate() < dateForSortBy.getDate() && task.date.getMonth() <= dateForSortBy.getMonth() && task.date.getFullYear() <= dateForSortBy.getFullYear()

      const sort = (isYearPast || isMonthPast || isDayPast)

      if (sort) {
        if (!task.isCompleted) {
          return task
        }
      } else {
        remainedTasks.push(task)
      }
      return false
    })

    return { tasks: filteredTasks, remainedTasks }
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
    })

    return { tasks: filteredTasks, remainedTasks }
  }

  const getTomorrowTasks = (tasks: TaskType[]) => {
    const remainedTasks: TaskType[] = []
    const tommorowDate = new Date().getDate() + 1

    const filteredTasks = tasks.filter((task) => {
      const sort = (
        task.date.getDate() === new Date(tommorowDate).getDate()
        && task.date.getMonth() === new Date(tommorowDate).getMonth()
        && task.date.getFullYear() === new Date(tommorowDate).getFullYear()
      )

      if (sort) {
        return task
      } else {
        remainedTasks.push(task)
      }
    })

    return { tasks: filteredTasks, remainedTasks }
  }

  useEffect(() => {
    api.getTasks(res => setTasks(res))
  }, [])

  const addTask = (date: Date, content: string, success: () => void) => {
    api.createTask(date, content, '1', () => {
      api.getTasks(res => setTasks(res))
      success()
    })
  }

  const openCreateNewTaskModal = () => {
    setCreateTaskModalOpen(true)
  }

  const closeCreateNewTaskModal = () => {
    setCreateTaskModalOpen(false)
  }

  const changeTaskStatus = (taskId: string, status: boolean) => {
    const newTasks = tasks.map(task => task.id === taskId ? { ...task, isCompleted: status } : task)
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <TasksHeader />
      <CreateNewTaskModal modalStatus={isCreateTaskModalOpen} closeCreateNewTaskModal={closeCreateNewTaskModal} createNewTask={(date, content, success) => addTask(date, content, success)} />
      <TaskGroupsWrapper>
        {
          sortedtasks.map(({ tasks, day }) => {
            return tasks.length > 0 ? <TaskGroup changeTaskStatus={(taskId: string, status: boolean) => changeTaskStatus(taskId, status)} day={day} tasks={tasks} /> : ''
          })
        }
      </TaskGroupsWrapper>

      <Button onClick={openCreateNewTaskModal} type='submit' variant="contained" color="primary">Add task</Button>
    </div>
  )
}


export default App


// get all items = baseUrl + /todo-list-items/get-all-todo-items
// get all user items = baseUrl + /todo-list-items/get-all-todo-items/:username
// example = baseUrl + /todo-list-items/get-all-todo-items/user1
// create item = baseUrl + /todo-list-items/create; 
//   body {item: String}
//   Headers: {username: String}


// update item = baseUrl + /todo-list-items/update
//   body:
//   "item": {
//     	"_id": String, // task id
//     	"content": String, // new content
//     	"isCompleted": Boolean // task status
//     }
