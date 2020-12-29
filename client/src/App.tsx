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

const App = () => {
  const [user, setUser] = useState<{ username?: string }>({})
  const [accessToken, setAccessToken] = useState<string>()
  const [refreshToken, setRefreshToken] = useState<string>()
  const [authErr, setAuthErr] = useState<string>('')
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [sortedtasks, setSortedTasks] = useState<SortedTasksType[]>([])
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState<boolean>(false)

  useEffect(() => {
    setSortedTasks(getSortedTasks(tasks))
  }, [tasks])


  useEffect(() => {
    if (accessToken) {
      api.getTasks(accessToken, res => setTasks(res))
    }
  }, [accessToken])

  const addTask = (date: Date, content: string, success: () => void) => {
    if (accessToken) {
      api.createTask(accessToken, date, content, (res) => {
        if (res.success) {
          api.getTasks(accessToken, res => setTasks(res))
          success()
        }
      })
    }
  }

  const openCreateNewTaskModal = () => {
    setCreateTaskModalOpen(true)
  }

  const closeCreateNewTaskModal = () => {
    setCreateTaskModalOpen(false)
  }

  const changeTaskStatus = async (todoId: string, status: boolean) => {
    if (accessToken) {
      await api.changeStatus(accessToken, todoId, status, () => {
        api.getTasks(accessToken, res => setTasks(res))
      })
    }
  }

  const login = async (username: string, password: string, cb: () => void) => {
    setAuthErr('')
    const res = await api.logIn(username, password, cb)
    if (res.success) {
      console.log(res)
      setUser(res.user)
      setAccessToken(res.accessToken)
      setRefreshToken(res.refreshToken)
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
    if (refreshToken) {
      api.logOut(refreshToken, () => {
        setAccessToken('')
        setRefreshToken('')
        setUser({})
      })
    }
  }

  return (
    <div className="App">
      {
        user && user.username && (
          <Header username={user.username} logout={logOut} />
        )
      }
      <TasksHeader />
      <CreateNewTaskModal modalStatus={isCreateTaskModalOpen} closeCreateNewTaskModal={closeCreateNewTaskModal} createNewTask={(date, content, success) => addTask(date, content, success)} />

      <Switch>
        <Route exact path='/'>
          {
            user && user.username
              ? <Tasks openCreateNewTaskModal={openCreateNewTaskModal}
                tasks={sortedtasks}
                changeTaskStatus={changeTaskStatus} />
              : <ForUnloggedUsers />

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