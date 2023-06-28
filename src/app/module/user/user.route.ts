import express from 'express'
import { UserController } from './user.controller'

const route = express.Router()

route.get('/', (req, res) => {
  res.send('Hello I am a User')
})
route.post('/create-user', UserController.createUSer)
export const UserRoute = route
