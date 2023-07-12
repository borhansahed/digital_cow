import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import { IAdmin } from '../app/module/admin/admin.interface'
import { IUser } from '../app/module/user/user.interface'

const createToken = (
  payload: Partial<IAdmin | IUser>,
  secret: Secret,
  options: SignOptions
): string => {
  return jwt.sign(payload, secret, options)
}
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const JwtHelper = {
  createToken,
  verifyToken,
}
