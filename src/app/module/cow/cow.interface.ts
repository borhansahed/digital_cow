import { Schema } from 'mongoose'

export type ICow = {
  name: string
  age: number
  price: number
  location: string
  breed: string
  weight: number
  label: 'for sale' | 'sold out'
  category: string
  seller: Schema.Types.ObjectId
}

export type IPagination = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export type IFilter = {
  searchTerm?: number
  minPrice?: number
  maxPrice?: number
  location?: string
  breed?: string
  category?: string
}

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
