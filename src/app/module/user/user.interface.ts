type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  id: string
  password: string
  role: 'buyer' | 'seller'
  name: IName
  phoneNumber: string
  address: string
  budget: number
  income: number
}
