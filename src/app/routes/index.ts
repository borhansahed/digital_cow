import express from 'express'
import { UserRoute } from '../module/user/user.route'
import { CowRouter } from '../module/cow/cow.route'
import { UserController } from '../module/user/user.controller'

const digitalCowsRoutes = express.Router()
digitalCowsRoutes.post('/auth/signup', UserController.createUser)
digitalCowsRoutes.use('/users', UserRoute)
digitalCowsRoutes.use('/cows', CowRouter)

export default digitalCowsRoutes
