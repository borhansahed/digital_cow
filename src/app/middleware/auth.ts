import { NextFunction, Request, Response } from 'express'
import { JwtHelper } from '../../helper/jwtHelper'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const authorization =
  (...role: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) throw new Error('Token not valid')

      const verifiedToken = JwtHelper.verifyToken(
        token,
        config.jwt.access_token as Secret
      )

      req.user = verifiedToken

      if (role.length && !role.includes(verifiedToken.role)) {
        throw new Error('forbidden')
      }

      next()
    } catch (err) {
      next(err)
    }
  }

export const auth = {
  authorization,
}
