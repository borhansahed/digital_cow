import express from 'express'
import { AuthController } from './auth.controller'
import { UserController } from '../user/user.controller'

const route = express.Router()

route.post('/signup', UserController.createUser)
route.post('/login', AuthController.userLogin)
route.post('/refresh-token', AuthController.generateWithRefreshToken)

export const AuthRoute = route
