import { JwtPayload, Secret } from 'jsonwebtoken'
import { JwtHelper } from '../../../helper/jwtHelper'
import { BcryptHelper } from '../../../helper/bcryptHelper'
import UserModel from '../user/user.model'
import config from '../../../config'
import { ILogin } from '../../../interface/common'

const userLogin = async (loginData: ILogin) => {
  const { phoneNumber, password } = loginData

  const isExits = await UserModel.findOne({ phoneNumber })

  if (!isExits) throw new Error('User is not Valid')

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
  const isUserExit = await UserModel.findOne({ _id: id })
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

export const AuthService = {
  userLogin,
  generateWithRefreshToken,
}
