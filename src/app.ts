import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import digitalCowsRoutes from './app/routes'
import globalErrorHandler from './middleware/globalError'
import httpStatus from 'http-status'

const app: Application = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Welcome to my Digital Cow Server')
})

app.use('/api/v1', digitalCowsRoutes)

app.use('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Not Found',
      },
    ],
  })
})
app.use(globalErrorHandler)

export default app
