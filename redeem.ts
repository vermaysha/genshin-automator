import { map, remove, split } from 'lodash';
import { API_GAME_LIST, API_REDEEM, API_REDEEM_LIST, OS_COOKIES } from './helpers/config';
import db from './helpers/db'
import cron from 'node-cron'
import request from './helpers/request';
import highest from './helpers/highest';
import { sendHookRedeem } from './helpers/sendHook';
import sleep from './helpers/sleep';

const redeem = async (cookies, i) => {
  const allCodes = remove((await request('get', API_REDEEM_LIST, cookies[i])).CODES, (n: Record<any, any>) => {
    return n.is_expired == false
  })

  const accounts = (await request('get', API_GAME_LIST, cookies[i])).data.list
  const mainAccount = highest(accounts)

  db.all(`SELECT codes FROM redeemed WHERE uid = '${mainAccount.game_uid}'`, async (err, rows) => {
    let redeemedCodes = map(rows, 'codes')

    const codes = remove(allCodes, (row) => {
      return redeemedCodes.includes(row.code) == false
    })

    for (let j = 0; j < codes.length; j++) {
      if (j > 0) {
        await sleep(6000)
      }

      const code = codes[j];
      const host = `${API_REDEEM}?uid=${mainAccount.game_uid}&region=${mainAccount.region}&lang=en&cdkey=${code.code}&game_biz=hk4e_global`
      const resp = (await (request('get', host, cookies[i])))
      const status = resp.message ?? 'Sucessfully claim redeem code rewards'

      const stmt = db.prepare(`INSERT INTO redeemed (uid, codes, reward, message) VALUES (?, ?, ?, ?)`)
      stmt.run(mainAccount.game_uid, code.code,code.reward, status)

      sendHookRedeem(status, mainAccount, code.code, code.reward, i, cookies)
    }
  })
}

export default () => {
    // Run every 10 minutes UTC+08:00 time
    const task = cron.schedule('*/10 * * * *', async () => {
        const cookies = split(OS_COOKIES, '#');

        for (let i = 0; i < cookies.length; i++) {
            redeem(cookies, i)
        }
    }, {
        timezone: 'Asia/Singapore',
    })

    task.start()
}