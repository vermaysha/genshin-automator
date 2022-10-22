import Cron from 'node-cron'
// import { startCheckIn } from './Start/startCheckIn'
import mongoose from 'mongoose'
import { red, green } from 'chalk'
import { startRedeem } from './Start/startRedeem'

async function main() {
  if (process.env.MONGO) {
    await mongoose.connect(process.env.MONGO)

    mongoose.connection.once('open', () => {
      console.log(green('MongoDB database connection established successfully'))
    })
  } else {
    console.log(red('MONGO env variable not set'))
    process.exit(1)
  }

  const cookies = process.env.COOKIES?.split('#') || []

  for (const cookie of cookies) {
    // Cron.schedule('*/2 * * * *', () => {
    //   startCheckIn(cookie)
    // })

    Cron.schedule('*/15 * * * *', () => {
      startRedeem(cookie)
    })
  }
}

main()
