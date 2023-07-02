import express from 'express'
import { UserRoute } from '../module/user/user.route'
import { CowRouter } from '../module/cow/cow.route'

const digitalCowsRoutes = express.Router()

digitalCowsRoutes.use('/users', UserRoute)
digitalCowsRoutes.use('/cows', CowRouter)

export default digitalCowsRoutes
