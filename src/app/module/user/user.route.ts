import express from 'express'
import { UserController } from './user.controller'

const route = express.Router()

route.get('/', UserController.getAllUser)
route.post('/create-user', UserController.createUser)
route.patch('/:id', UserController.updateOneUser)
route.get('/:id', UserController.getOneUser)
route.delete('/:id', UserController.deleteOneUser)
export const UserRoute = route
