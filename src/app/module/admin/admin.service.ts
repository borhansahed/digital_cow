import { JwtPayload, Secret } from 'jsonwebtoken'
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

const generateWithRefreshToken = async (
  token: string
): Promise<{ newAccessToken: string }> => {
  const verifiedToken = JwtHelper.verifyToken(
    token,
    config.jwt.refresh_token as Secret
  ) as JwtPayload

  if (!verifiedToken) throw new Error('Invalid refreshToken')

  const { id } = verifiedToken
  const isUserExit = await AdminModel.findOne({ _id: id })
  if (!isUserExit) {
    throw new Error("User doesn't found")
  }

  const newAccessToken = JwtHelper.createToken(
    {
      id: isUserExit.id,
      role: isUserExit.role,
    },
    config.jwt.access_token as Secret,
    { expiresIn: config.jwt.access_token_expires }
  )

  return {
    newAccessToken,
  }
}

export const AdminService = {
  createAdmin,
  adminLogin,
  generateWithRefreshToken,
}
