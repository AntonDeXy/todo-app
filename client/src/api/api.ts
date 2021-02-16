import axios from "axios"
import { config } from "../config"
import { TaskType } from "../types"

const baseUrl = config.base_api_url

const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

const saveRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

const getAccessTokenFromLS = () => {
  return localStorage.getItem('accessToken')
}

const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refreshToken')
}

const removeTokensFromLs = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

axios.interceptors.request.use(
  config => {
    const token = getAccessTokenFromLS()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error)
  }
)

axios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config
    if (originalRequest.url === `${baseUrl}new-token`) {
      removeTokensFromLs()
      window.location.href = '/signIn'
    }
    const refreshToken = getRefreshTokenFromLS()
    if ((error.response.status === 401 || error.response.status === 403) && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true
      const newToken = await api.getNewAccessToken(refreshToken)
      if (newToken.success) {
        saveAccessTokenToLS(newToken.accessToken)
        return axios(originalRequest)
      } else {
        window.location.href = '/signIn'
      }
    } else {
      window.location.href = '/signIn'
    }
  }
)

const api = {
  async logIn(username: string, password: string, cb: () => void) {
    const {data} = await axios.post(`${baseUrl}signIn`, {username, password})
    saveAccessTokenToLS(data.accessToken)
    saveRefreshTokenToLS(data.refreshToken)
    cb()
    return data
  },

  async register (username: string, password: string, cb: (isRegisteredSuccess: boolean) => void) {
    const {data} = await axios.post(`${baseUrl}signUp`, {username, password})
    cb(data.success)
    return data
  },

  async logOut (success: () => void) {
    const refreshToken = getRefreshTokenFromLS()
    const {data} = await axios.delete(`${baseUrl}logout`, {data: {refreshToken: refreshToken}})
    removeTokensFromLs()
    success()
    return data
  },

  async getNewAccessToken (refreshToken?: string) {
    const refreshTokenForRequest = refreshToken || getRefreshTokenFromLS()
    if (refreshTokenForRequest) {
      const res = await axios.post(`${baseUrl}new-token`, {refreshToken: refreshTokenForRequest})

      if (res.status === 401 || res.status === 403) {
        return {success: false}
      } else {
        saveAccessTokenToLS(res.data.accessToken)
        return {success: true, accessToken: res.data.accessToken, user: res.data.user}
      }
    } else {
      return {success: false}
    }
  },

  async getTasks(
    success: (tasks: TaskType[]) => void
  ) {
    const {data} = await axios.get(`${baseUrl}todo/get`)
    success(data.items)
  },

  async createTask(
    taskDate: Date,
    taskContent: string,
    success: (res: any) => void,
    taskImg?: string
  ) {
    const newTask = {
      todoContent: taskContent,
      date: taskDate,
      img: taskImg
    }

    const {data} = await axios.post(`${baseUrl}todo/create`, {...newTask})

    success(data)
  },

  async changeStatus(
    todoId: string,
    newStatus: boolean,
    success: (newItem: TaskType) => void
  ) {
    const {data} = await axios.put(`${baseUrl}todo/change-status/${todoId}`, {newStatus})

    if (data.success) {
      success(data.item)
    }
  },

  async removeToDo(
    todoId: string
  ):Promise<boolean> {
    const {data} = await axios.delete(`${baseUrl}todo/delete/${todoId}`)

    return data.success
  }
}

export default api