import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import { IAdmin } from '../app/module/admin/admin.interface'

const createToken = (
  payload: Partial<IAdmin>,
  secret: Secret,
  options: SignOptions
): string => {
  // console.log(secret)
  return jwt.sign(payload, secret, options)
}
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const JwtHelper = {
  createToken,
  verifyToken,
}
