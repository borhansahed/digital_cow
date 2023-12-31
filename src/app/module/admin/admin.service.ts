import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { BcryptHelper } from '../../../helper/bcryptHelper'
import { JwtHelper } from '../../../helper/jwtHelper'
import { IAdmin } from './admin.interface'
import AdminModel from './admin.model'
import { ILogin } from '../../../interface/common'

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

const getAdmin = async (id: string) => {
  const result = await AdminModel.findById(id)
  return result
}
const getOneAdmin = async (id: string): Promise<IAdmin | null> => {
  return await AdminModel.findById(id)
}

const updateOneAdmin = async (
  payload: Partial<IAdmin>,
  id: string
): Promise<IAdmin | null> => {
  const { name, ...adminData } = payload

  const updatedAdmin = { ...adminData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updatedAdmin as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  return await AdminModel.findByIdAndUpdate(
    id,
    { $set: updatedAdmin },
    { new: true }
  )
}

export const AdminService = {
  createAdmin,
  adminLogin,
  generateWithRefreshToken,
  getAdmin,
  getOneAdmin,
  updateOneAdmin,
}
