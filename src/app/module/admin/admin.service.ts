import { IAdmin } from './admin.interface'
import AdminModel from './admin.model'

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  const result = await AdminModel.create(payload)
  return result
}

export const AdminService = {
  createAdmin,
}
