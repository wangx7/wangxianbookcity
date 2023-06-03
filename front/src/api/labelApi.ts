import axios from '@/utils/axios'

export interface IlableList {
  offset: string
  limit: string
}

export interface IlabelRes {
  id: number
  name: string
}

// 分页查询标签
export function labelList(data: IlableList) {
  return axios.post<IlabelRes[]>('/label/list', data)
}
