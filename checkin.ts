import { split } from 'lodash'
import cron from 'node-cron'
import { API_GAME_LIST, API_SIGN_IN, API_SIGN_INFO, API_SIGN_REWARD, OS_COOKIES } from './helpers/config'
import { iso_date_string, month } from './helpers/date'
import db from './helpers/db'
import highest from './helpers/highest'
import request from './helpers/request'
import { sendHookSignIn } from './helpers/sendHook'


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
  let stmt

  stmt = db.prepare("SELECT *, strftime('%m') as month FROM daily_login WHERE uid = ? AND month = ?")
  const rows = stmt.all(mainAccount.game_uid, month)

  if (rows.length > 0) {
    console.log('Traveller, you\'ve already checked in today')
    return false
  }

  const signIn = (await request('post', API_SIGN_IN, cookies[i]))

  const signReward = (await request('get', API_SIGN_REWARD, cookies[i])).data.awards
  const reward = signReward[totalLoginDay]
  const status = signIn.message ?? null

  stmt = db.prepare(`INSERT INTO daily_login
    (uid, nickname, reward_icon, reward_name, reward_count, message, retcode, created_at)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?)`)
  stmt.run(mainAccount.game_uid, mainAccount.nickname, reward.icon, reward.name, reward.cnt, status, signIn.retcode, iso_date_string)

  sendHookSignIn(status, reward, mainAccount, totalLoginDay, i, cookies)
  console.log(`Check-in status for accounts no ${i + 1}: ${status}`)
}

export default async () => {
  console.log('Checkin scheduled for every 1 hour UTC+08:00 timezone')
  const task = cron.schedule('0 * * * *', async () => {
    const cookies = split(OS_COOKIES, '#')
    for (let i = 0; i < cookies.length; i++) {
      console.log(`Check-in running for accounts no ${i + 1}`)
      await checkin(cookies, i)
    }
  }, {
    timezone: 'Asia/Singapore',
  })

  task.start()
}
