type IName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  password: string
  role: 'admin'
  name: IName
  phoneNumber: string
  address: string
}
