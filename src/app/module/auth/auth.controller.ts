import { RequestHandler } from 'express'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'
import config from '../../../config'

const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const { ...loginData } = req.body

    const result = await AuthService.userLogin(loginData)
    const { refreshToken, accessToken } = result

    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true,
    })
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User login Successfully',
      data: accessToken,
    })
  } catch (err) {
    next(err)
  }
}
// generate new access token with the help of refresh token
const generateWithRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const result = await AuthService.generateWithRefreshToken(refreshToken)

    res.status(httpStatus.OK).json({
      success: true,
      message: 'New accessToken successfully created',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const AuthController = {
  userLogin,
  generateWithRefreshToken,
}
