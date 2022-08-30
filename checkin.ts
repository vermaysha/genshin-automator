import { split } from 'lodash'
import cron from 'node-cron'
import { API_GAME_LIST, API_SIGN_IN, API_SIGN_INFO, API_SIGN_REWARD, OS_COOKIES } from './helpers/config'
import db from './helpers/db'
import highest from './helpers/highest'
import request from './helpers/request'
import { sendHookSignIn } from './helpers/sendHook'
import today from './helpers/today'

const checkin = async (cookies, i) => {
  const signInfo = (await request('get', API_SIGN_INFO, cookies[i])).data
  const totalLoginDay = signInfo.total_sign_day - 1

  if (signInfo.first_bind) {
      console.log('It\'s first time you check-in, please check in manually once.')
      return false
  }

  if (signInfo.is_login) {
      console.log('Traveller, you\'ve already checked in today')
      return false
  }

  const accounts = (await request('get', API_GAME_LIST, cookies[i])).data.list
  const mainAccount = highest(accounts)

  const signIn = (await request('post', API_SIGN_IN, cookies[i]))

  const signReward = (await request('get', API_SIGN_REWARD, cookies[i])).data.awards
  const reward = signReward[totalLoginDay]
  const status = signIn.message ?? null

  const stmt = db.prepare(`INSERT INTO daily_login (uid, date, reward, message) VALUES (?, ?, ?, ?)`)
  stmt.run(mainAccount.game_uid, today(), `${reward.name} x ${reward.cnt}`, status)

  sendHookSignIn(status, reward, mainAccount, totalLoginDay, i, cookies)
}

export default async () => {
  // Run every 00.00PM UTC+08:00 time
  const task = cron.schedule('0 0 * * *', async () => {
    const cookies = split(OS_COOKIES, '#');

    for (let i = 0; i < cookies.length; i++) {
        checkin(cookies, i)
    }
  }, {
    timezone: 'Asia/Singapore',
  })

  task.start()
}