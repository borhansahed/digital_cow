import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUSer: RequestHandler = async (req, res, next) => {
  try {
    const { ...userData } = req.body
    // eslint-disable-next-line no-console
    console.log(userData)
    const result = await UserService.createUser(userData)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUSer,
}
