import express from 'express'
import { exit } from 'process'
import checkin from './checkin'
import { OS_COOKIES } from './helpers/config'
import redeem from './redeem'

const app = express()
const port = process.env.PORT || 3000

if (OS_COOKIES == null) {
  console.error('Please set $OS_COOKIES in env')
  exit(0)
}

app.get('/', (req, res) => {
  res.json({
    status: true,
    message: 'App is alive'
  })
})

checkin()
redeem()

app.listen(port, () => {
  console.log("App server listening on port " + port)
})
