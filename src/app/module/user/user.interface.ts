type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  password: string
  role: 'buyer' | 'seller' | 'admin'
  name: IName
  phoneNumber: string
  address: string
  budget?: number
  income?: number
}
