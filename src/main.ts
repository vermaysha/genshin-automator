import Scheduler from 'node-schedule'
import { startCheckIn } from './Start/startCheckIn'
import { connect, connection } from 'mongoose'
import { red, green } from 'chalk'
import { startRedeem } from './Start/startRedeem'
import * as dotenv from 'dotenv'
dotenv.config()

async function main() {
  if (process.env.MONGO_URI) {
    await connect(process.env.MONGO_URI)

    connection.once('open', () => {
      console.log(green('MongoDB database connection established successfully'))
    })
  } else {
    console.log(red('MONGO_URI env variable not set'))
    process.exit(1)
  }

  const cookies = process.env.COOKIES?.split('#') || []

  // Run task at 00:00.
  Scheduler.scheduleJob('0 0 * * *', async () => {
    console.log('Check-in Process Running')
    for (const cookie of cookies) {
      await startCheckIn(cookie)
    }
  })

  // Run task at every 1 hour
  Scheduler.scheduleJob('* 1 * * *', async () => {
    console.log('Redeem process running')
    for (const cookie of cookies) {
      await startRedeem(cookie)
    }
  })

  console.log(green('Schedule running'))
}

main()
