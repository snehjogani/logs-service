import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import services from './services'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

services(app)

app.get('/', (req, res) => res.send(`Logs service listening on port ${process.env.PORT}!`))

app.listen(process.env.PORT, () => console.log(`Logs service listening on port ${process.env.PORT}!`))
