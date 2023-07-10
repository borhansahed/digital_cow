import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { BcryptHelper } from '../../../helper/bcryptHelper'
import { JwtHelper } from '../../../helper/jwtHelper'
import { IAdmin, ILogin } from './admin.interface'
import AdminModel from './admin.model'

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  const result = await AdminModel.create(payload)
  return result
}

const adminLogin = async (payload: ILogin) => {
  const { phoneNumber, password } = payload

  const isExits = await AdminModel.findOne({ phoneNumber })
  if (!isExits) throw new Error('Admin is not Valid')

  if (!(await BcryptHelper.comparePassword(password, isExits.password))) {
    throw new Error('Password is incorrect')
  }

  // create Token

  const accessToken = JwtHelper.createToken(
    {
      id: isExits._id,
      role: isExits.role,
    },
    config.jwt.access_token as Secret,
    {
      expiresIn: config.jwt.access_token_expires,
    }
  )

  const refreshToken = JwtHelper.createToken(
    {
      id: isExits._id,
      role: isExits.role,
    },
    config.jwt.refresh_token as Secret,
    {
      expiresIn: config.jwt.refresh_token_expires,
    }
  )
  return {
    accessToken,
    refreshToken,
  }
}

export const AdminService = {
  createAdmin,
  adminLogin,
}
