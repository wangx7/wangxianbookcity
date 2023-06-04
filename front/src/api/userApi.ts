import axios from '@/utils/axios'

export interface IAccount {
  name: string
  password: string
}

export interface Id {
  id: number
}

export function login(data: IAccount) {
  return axios.post('/login', data)
}

export function register(data: IAccount) {
  return axios.post('/users/register', data)
}

export function addBookHistory(data: Id) {
  return axios.post<any>('/users/addBookHistory', data)
}
