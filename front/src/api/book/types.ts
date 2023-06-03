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
  userId: string
  createAt: Date
  updateAt: Date
}
