import { connect, connection, set } from 'mongoose'
import { red, green } from 'chalk'
import { config } from 'dotenv'
import Account from './models/Account'
import Scheduler from 'node-schedule'
import { checkin } from './helpers/checkin'
import { redeem } from './helpers/redeem'

config()

// Main code
;(async () => {
  if (process.env.MONGO_URI) {
    set('strictQuery', false)
    await connect(process.env.MONGO_URI)

    connection.once('open', () => {
      console.log(green('MongoDB database connection established successfully'))
    })
  } else {
    console.log(red('MONGO_URI env variable not set'))
    process.exit(1)
  }
  const accounts = await Account.find()

  // Run task at 00:00.
  Scheduler.scheduleJob('0 0 * * *', async () => {
    console.log('Check-in Process Running')
    await checkin(accounts)
  })

  // Run task at every 1 hour
  Scheduler.scheduleJob('0 * * * *', async () => {
    console.log('Check-in Process Running')
    await redeem(accounts)
  })
})()
