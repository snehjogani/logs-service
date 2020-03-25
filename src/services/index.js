import fs from 'fs'
import axios from 'axios'
import { keys } from 'lodash'

const filePath = './public/logs.json'
const { HOSTNAME, CATLOG_PORT } = process.env

module.exports = (app) => {
  app.post('/logs', async (req, res) => {
    const { body: { keyword } } = req
    fs.readFile(filePath, 'utf8', (e, data) => {
      if (e) {
        console.log('fs error', e)
        return
      }
      const logData = data ? JSON.parse(data) : {}
      const logObject = { timeStamp: `${new Date().toUTCString()}`, frequency: 1 }
      if (keys(logData).includes(keyword)) {
        logObject.frequency = logData[keyword].frequency + 1
      }
      logData[keyword] = logObject
      fs.writeFileSync(filePath, JSON.stringify(logData))
      // res.send({ logData })
    })
    await axios({ method: 'GET', url: `http://${HOSTNAME}:${CATLOG_PORT}/catlog`, params: { keyword } })
      .then(({ data }) => res.send(data))
      .catch(err => res.send({ message: 'Oops! Something went wrong.' }))
  })
}
