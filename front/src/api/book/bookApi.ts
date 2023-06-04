import axios from '@/utils/axios'
import { type IBookCreate, type IBookRes, type IBookList, type IDataType } from './types'

export function bookCreate(data: IBookCreate) {
  return axios.post<any>('/book/create', data)
}

export function bookList(data: IBookList) {
  return axios.post<IDataType<IBookRes[]>>('/book/list', data)
}

export function bookHistory() {
  return axios.get<IBookRes[]>('/book/bookHistory')
}

export interface Id {
  id: number
}
export function looks(data: Id) {
  return axios.post<any>('/book/looks', data)
}
