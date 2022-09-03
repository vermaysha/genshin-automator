import { map, remove, split } from 'lodash';
import { API_GAME_LIST, API_REDEEM, API_REDEEM_LIST, OS_COOKIES } from './helpers/config';
import db from './helpers/db'
import cron from 'node-cron'
import request from './helpers/request';
import highest from './helpers/highest';
import { sendHookRedeem } from './helpers/sendHook';
import sleep from './helpers/sleep';
import { iso_date_string } from './helpers/date';
import getRewards from './helpers/getRewards';

const redeem = async (cookies, i) => {
  const allCodes = remove((await request('get', API_REDEEM_LIST, cookies[i])).CODES, (n: Record<any, any>) => {
    return n.is_expired == false
  })

  const accounts = (await request('get', API_GAME_LIST, cookies[i])).data.list
  const mainAccount = highest(accounts)
  let stmt

  stmt = db.prepare("SELECT codes FROM redeemed WHERE uid = ?")
  const rows = stmt.all(mainAccount.game_uid)

  let redeemedCodes = map(rows, 'codes')

  const codes = remove(allCodes, (row) => {
    return redeemedCodes.includes(row.code) == false
  })

  if (codes.length < 1) {
    console.log(`No new redeem found for account no ${i + 1}`)
    return
  }

  for (let j = 0; j < codes.length; j++) {
    if (j > 0) {
      await sleep(6000)
    }

    const code = codes[j];
    const rewards = JSON.stringify(getRewards(code.reward_array))

    const host = `${API_REDEEM}?uid=${mainAccount.game_uid}&region=${mainAccount.region}&lang=en&cdkey=${code.code}&game_biz=hk4e_global`
    const redeem = (await (request('get', host, cookies[i])))
    const status = redeem.message ?? 'Sucessfully claim redeem code rewards'

    stmt = db.prepare(`INSERT INTO redeemed
      (uid, codes, nickname, rewards, message, retcode, created_at)
      VALUES
      (?, ?, ?, ?, ?, ?, ?)`)
    stmt.run(mainAccount.game_uid, code.code, mainAccount.nickname, rewards, status, redeem.retcode, iso_date_string)

    sendHookRedeem(status, mainAccount, code.code, code.reward, i, cookies)
    console.log(`Redeem status for accounts no ${i + 1} with codes ${code.code}: ${status}`)
  }
}

export default async () => {
  // Run every 10 minutes UTC+08:00 time
  console.log('Redeem scheduled for every 15th minutes UTC+08:00 timezone')
  const task = cron.schedule('*/15 * * * *', async () => {
    const cookies = split(OS_COOKIES, '#');

    for (let i = 0; i < cookies.length; i++) {
      console.log(`Redeem running for accounts no ${i + 1}`)
      await redeem(cookies, i)
    }
  }, {
    timezone: 'Asia/Singapore',
  })

  task.start()
}
