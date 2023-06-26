/* eslint-disable no-console */

import express, { Application, Response, Request } from 'express'

const port = process.env.PORT || 5000
const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Digital Cow Server')
})

app.use(express.json())

app.listen(5000, () => {
  console.log(`app running on ${port}`)
})
