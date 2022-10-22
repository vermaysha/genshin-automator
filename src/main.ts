import Cron from 'node-cron'
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
  Cron.schedule(
    '0 0 * * *',
    async () => {
      for (const cookie of cookies) {
        await startCheckIn(cookie)
      }
    },
    {
      timezone: 'Asia/Singapore',
    }
  )

  // Run task at every 30th minute.
  Cron.schedule(
    '*/30 * * * *',
    async () => {
      for (const cookie of cookies) {
        await startRedeem(cookie)
      }
    },
    {
      timezone: 'Asia/Singapore',
    }
  )

  console.log(green('Schedule running'))
}

main()
