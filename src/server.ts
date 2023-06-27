/* eslint-disable no-console */

import express, { Application, Response, Request } from 'express'
import cors from 'cors'

const port = process.env.PORT || 5000
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res: Response) => {
  res.send('Welcome to my Digital Cow Server')
})

app.listen(5000, () => {
  console.log(`app running on ${port}`)
})
