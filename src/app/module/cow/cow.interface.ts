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
