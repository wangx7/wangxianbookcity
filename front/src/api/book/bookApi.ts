import axios from '@/utils/axios'
import { type IBookCreate, type IBookRes, type IBookList } from './types'

export function bookCreate(data: IBookCreate) {
  return axios.post<any>('/book/create', data)
}

export function bookList(data: IBookList) {
  return axios.post<IBookRes[]>('/book/list', data)
}
