import axios from "axios"
import { TaskType } from "../types"

const baseUrl = 'http://localhost:5000/'

const getAuthHeader = (token: string) => {
  return {headers: {'Authorization': `Bearer ${token}`}}
}

const api = {
  async logIn(username: string, password: string, cb: () => void) {
    const {data} = await axios.post(`${baseUrl}signIn`, {username, password})
    cb()
    return data
  },

  async register (username: string, password: string, cb: (isRegisteredSuccess: boolean) => void) {
    const {data} = await axios.post(`${baseUrl}signUp`, {username, password})
    cb(data.success)
    return data
  },

  async logOut (refreshToken: string, success: () => void) {
    const {data} = await axios.delete(`${baseUrl}logout`, {data: {refreshToken: refreshToken}})
    success()
    return data
  },

  async getTasks(
    token: string,
    success: (tasks: TaskType[]) => void
  ) {
    const {data} = await axios.get(`${baseUrl}todo/get`, getAuthHeader(token))
    success(data.items)
  },

  async createTask(
    token: string,
    taskDate: Date,
    taskContent: string,
    success: (res: any) => void
  ) {
    const newTask = {
      todoContent: taskContent,
      date: taskDate,
    }

    const {data} = await axios.post(`${baseUrl}todo/create`, {...newTask}, getAuthHeader(token))

    success(data)
  },

  async changeStatus(
    token: string,
    todoId: string,
    newStatus: boolean,
    success: () => void
  ) {
    const {data} = await axios.put(`${baseUrl}todo/change-status/${todoId}`, {newStatus}, getAuthHeader(token))

    if (data.success) {
      success()
    }
  }
}

export default api