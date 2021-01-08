import React from 'react'
import TasksHeader from './components/tasks-header'
import { useEffect, useState } from 'react'
import api from './api/api'
import { SortedTasksType, TaskType } from './types'
import CreateNewTaskModal from './components/modals/create-new-task-modal'
import { getSortedTasks } from './utils/tasks-funcs'
import Tasks from './components/tasks'
import ForUnloggedUsers from './components/forUnloggedUsers';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignIn from './components/auth/signIn'
import SignUp from './components/auth/signUp';
import Header from './components/Header'
import { css } from "@emotion/core"
import CurrentToDoModal from './components/modals/current-todo-modal'
import { useAlert } from 'react-alert'

export const spinnerStyles = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const App = () => {
  const alert = useAlert()
  const [isAuthLoading, setAuthLoading] = useState(false)
  const [user, setUser] = useState<{ username?: string }>({})
  const [authErr, setAuthErr] = useState<string>('')
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [sortedtasks, setSortedTasks] = useState<SortedTasksType[]>([])
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState<boolean>(false)
  const [currentToDo, setCurrentToDo] = useState<TaskType | undefined>(undefined)
  
  useEffect(() => {
    setSortedTasks(getSortedTasks(tasks))
  }, [tasks])

  useEffect(() => {
    if (user && user.username) {
      api.getTasks(res => setTasks(res))
    }
  }, [user])

  useEffect(() => {
    checkIfRefreshTokenExists()
  }, [])

  const addTask = (date: Date, content: string, success: () => void, taskImg?: string) => {
    api.createTask(date, content, (res) => {
      if (res.success) {
        api.getTasks(res => setTasks(res))
        success()
      }
    }, taskImg)
  }

  const deleteTask = async (todoId: string) => {
    const res = await api.removeToDo(todoId)

    if (res) {
      setTasks([...tasks.filter(todo => todo._id !== todoId)])
      return true
    } 

    alert.error('Something went wrong, try again later')
    return false
  }

  const openCreateNewTaskModal = () => {
    setCreateTaskModalOpen(true)
  }

  const closeCreateNewTaskModal = () => {
    setCreateTaskModalOpen(false)
  }

  const checkIfRefreshTokenExists = async () => {
    setAuthLoading(true)
    const res = await api.getNewAccessToken()
    if (res.success) {
      setUser(res.user)
    }
    setAuthLoading(false)
  }

  const changeTaskStatus = async (todoId: string, status: boolean) => {
    await api.changeStatus(todoId, status, (newItem: TaskType) => {
      setTasks([...tasks.map(todo => {
        if (todo._id === newItem._id) {
          return newItem
        }
        return todo
      })])
    })
  }

  const login = async (username: string, password: string, cb: () => void) => {
    setAuthErr('')
    const res = await api.logIn(username, password, cb)
    if (res.success) {
      setUser(res.user)
    } else {
      setAuthErr(res.msg)
    }
  }

  const register = async (username: string, password: string, cb: (isRegisteredSuccess: boolean) => void) => {
    setAuthErr('')
    const res = await api.register(username, password, cb)
    if (!res.success) {
      setAuthErr(res.msg)
    }
  }

  const logOut = () => {
    api.logOut(() => {
      setUser({})
    })
  }

  return (
    <div className="App">
      {
        user && user.username && (
          <Header username={user.username} logout={logOut} />
        )
      }
      <TasksHeader />
      {
        isCreateTaskModalOpen && (
          <CreateNewTaskModal modalStatus={isCreateTaskModalOpen} closeCreateNewTaskModal={closeCreateNewTaskModal} createNewTask={(date, content, success, taskImg?: string) => addTask(date, content, success, taskImg)} />
        )
      }

      {
        currentToDo && (
          <CurrentToDoModal deleteTodo={(todoId: string):Promise<boolean> => deleteTask(todoId)} closeModal={() => setCurrentToDo(undefined)} initialTodo={currentToDo} />
        ) 
      }

      <Switch>
        <Route exact path='/'>
          {
            user && user.username
              ? <Tasks openCreateNewTaskModal={openCreateNewTaskModal}
                tasks={sortedtasks}
                editTodo={(todo: TaskType) => setCurrentToDo(todo)}
                changeTaskStatus={changeTaskStatus} />
              : <ForUnloggedUsers isLoading={isAuthLoading} />

          }
        </Route>

        <Route exact path='/signIn'>
          {
            user && user.username && (
              <Redirect to='/' />
            )
          }
          <SignIn err={authErr} login={(username: string, password: string, cb: () => void) => login(username, password, cb)} />
        </Route>

        <Route exact path='/signUp'>
          {
            user && user.username && (
              <Redirect to='/' />
            )
          }
          <SignUp err={authErr} register={(username: string, password: string, cb: (isRegisteredSuccess: boolean) => void) => register(username, password, cb)} />
        </Route>

        <Route>
          404
        </Route>
      </Switch>
    </div>
  )
}


export default App