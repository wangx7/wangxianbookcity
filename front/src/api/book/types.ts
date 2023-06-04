export interface IBookCreate {
  labelId: number
  bookName: string
  bookHref: string
  coverHref: string
  blurb: string
  author: string
}

export interface IBookList {
  offset: string
  limit: string
}
export interface IBookRes {
  id: number
  labelId: number
  bookName: string
  bookHref: string
  coverHref: string
  blurb: string
  author: string
  userId: number
  createAt: Date
  updateAt: Date
}

export interface IDataType<T = any> {
  code: number
  data: T
}
