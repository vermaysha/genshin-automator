import { Cookie, GenshinImpact, Hoyolab } from '@vermaysha/hoyolab-api'
import { IAccount } from '../models/Account'
import { orderBy } from 'lodash'
import { Webhook } from '@vermaysha/discord-webhook'

export async function setup(account: IAccount) {
  if (!account.cookie) {
    console.log(
      `Cookie with document id ${account._id} is invalid, skipping ..`
    )
    return { genshin: null, webhook: null }
  }
  const cookie = new Cookie(account.cookie)

  if (!cookie.isValid()) {
    console.log(
      `Cookie with document id ${account._id} is invalid, skipping ..`
    )
    return { genshin: null, webhook: null }
  }

  let game_uid: string | undefined = account.game_uid
  let game_biz: string | undefined = account.game_biz
  let region: string | undefined = account.region

  if (!game_uid) {
    const hoyolab = new Hoyolab({
      cookie: cookie.toString(),
    })

    const accounts = await hoyolab.getGames('gi')

    const highestAcc = orderBy(accounts.list, ['level'], 'desc')[0]
    game_uid = highestAcc.game_uid
    game_biz = highestAcc.game_biz
    region = highestAcc.region

    account.game_uid = game_uid
    account.game_biz = game_biz
    account.region = region
    account.region_name = highestAcc.region_name
    account.level = highestAcc.level
    account.nickname = highestAcc.nickname
    await account.save()
  }

  const genshin = new GenshinImpact({
    cookie: cookie.toString(),
    uid: game_uid,
  })

  const webhook = process.env.DISCORD_WEBHOOK
    ? new Webhook(process.env.DISCORD_WEBHOOK)
    : null

  return {
    genshin,
    webhook,
  }
}
