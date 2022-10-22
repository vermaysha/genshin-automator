import axios from 'axios'
import { Embed, EmbedField } from '../Types'
// import mongoose from 'mongoose'
import { map, orderBy, remove } from 'lodash'
import Redeem from '../Model/Redeem'
import Checkin from '../Model/Checkin'

type SignInfo = {
  retcode: number
  message: string
  data?: {
    total_sign_day?: number
    today?: string
    is_sign?: boolean
    first_bind?: boolean
    is_sub?: boolean
    region?: string
  }
}

type Accounts = {
  retcode: number
  message: string
  data: {
    list: Array<AccountData>
  }
}

type AccountData = {
  game_biz: string
  region: string
  game_uid: string
  nickname: string
  level: number
  is_chosen: boolean
  region_name: string
  is_official: boolean
}

type SignIn = {
  retcode: number
  message: string
  data?: {
    code: string
  }
}

type Codes = {
  CODES: Array<Code>
}

type Code = {
  reward: string
  date: string
  code: string
  is_expired: boolean
  region: number
  reward_array: Array<CodeReward>
}

type CodeReward = {
  image_path: string
  image_url?: string
  name: string
  count: string
  rarity: string
  rarityNumber?: number
}

type RedeemResponse = {
  retcode: number
  message: string
  data?: {
    msg: string
  }
}

type SignReward = {
  retcode: number
  message: string
  data: {
    month: number
    awards: Array<Reward>
  }
}

type Reward = {
  icon: string
  name: string
  cnt: number
}

export default class Genshin {
  private API_GAME_LIST =
    'https://api-os-takumi.hoyoverse.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_global'
  private API_SIGN_REWARD =
    'https://hk4e-api-os.hoyoverse.com/event/sol/home?lang=en-us&act_id=e202102251931481'
  private API_SIGN_INFO =
    'https://hk4e-api-os.hoyoverse.com/event/sol/info?lang=en-us&act_id=e202102251931481'
  private API_SIGN_IN =
    'https://hk4e-api-os.mihoyo.com/event/sol/sign?act_id=e202102251931481'
  private WEB_SIGN_IN =
    'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&mhy_auth_required=true&mhy_presentation_style=fullscreen&utm_source=hoyolab&utm_medium=battlechronicle'

  private API_REDEEM_LIST =
    'https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn-update.json'
  private API_REDEEM =
    'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey'

  /**
   * Genshin
   *
   * @param cookie string
   * @param userAgent string
   */
  constructor(cookie: string, userAgent: string) {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Cookie'] = cookie
    axios.defaults.headers.common['User-Agent'] = userAgent
    axios.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate, br'
  }

  /**
   * Redeem Code
   *
   * @returns Promise<Array<Embed>>
   */
  public async redeem() {
    return new Promise<Array<Embed>>(async (resolve, reject) => {
      const codeLists: Codes = (await axios(this.API_REDEEM_LIST)).data
      const allCodes: Array<Code> = remove(codeLists.CODES, (n: Code) => {
        return n.is_expired == false
      })

      const accounts: Accounts = (await axios(this.API_GAME_LIST)).data

      if (accounts.retcode != 0) {
        reject(accounts.message)
        return false
      }

      const account: AccountData = orderBy(
        accounts.data.list,
        ['level'],
        'desc'
      )[0]

      const redeem = await Redeem.find({ uid: account.game_uid })
      const redeemedCodes = map(redeem, 'code')

      const codes = remove(allCodes, (row) => {
        return redeemedCodes.includes(row.code) == false
      })

      if (codes.length < 1) {
        reject(
          `No new redeem found for account: ${account.nickname} (${account.game_uid})`
        )
      }

      const embeds: Array<Embed> = []

      for (const code of codes) {
        const API_REDEEM = new URL(this.API_REDEEM)
        API_REDEEM.searchParams.append('uid', account.game_uid)
        API_REDEEM.searchParams.append('region', account.region)
        API_REDEEM.searchParams.append('lang', 'en')
        API_REDEEM.searchParams.append('game_biz', account.game_biz)
        API_REDEEM.searchParams.append('cdkey', code.code)

        const rewards = orderBy(
          this.formatRedeemReward(code),
          ['rarityNumber'],
          'desc'
        )

        const redeemResponse: RedeemResponse = (
          await axios(API_REDEEM.toString())
        ).data

        const fields: Array<EmbedField> = [
          {
            name: 'Nickname',
            value: account.nickname,
            inline: true,
          },
          {
            name: 'UID',
            value: account.game_uid,
            inline: true,
          },
          {
            name: 'Level',
            value: account.level.toString(),
            inline: true,
          },
          {
            name: 'Server',
            value: account.region_name,
            inline: true,
          },
          {
            name: 'Code',
            value: code.code,
            inline: true,
          },
          {
            name: 'Status',
            value: redeemResponse.message,
            inline: true,
          },
        ]

        for (const reward of rewards) {
          fields.push({
            name: 'Rewards',
            value: `${reward.count} ${reward.name}`,
            inline: false,
          })
        }

        const embed: Embed = {
          title: 'Genshin Impact Daily Check-In',
          description: redeemResponse.message,
          color: parseInt('E6E18F', 16), // ##E6E18F
          thumbnail: {
            url: rewards[0]?.image_url || '',
          },
          author: {
            name: 'Paimon',
            icon_url:
              'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png',
            url: 'https://genshin.hoyoverse.com',
          },
          footer: {
            text: 'Genshin Automatic Checkin',
            icon_url: 'https://paimon.moe/favicon.ico',
          },
          timestamp: new Date().toISOString(),
          fields,
        }

        embeds.push(embed)

        await new Redeem({
          code: code.code,
          uid: account.game_uid,
          response: redeemResponse,
        }).save()

        await this.delay(6)
      }

      resolve(embeds)
    })
  }

  /**
   * Check-In
   *
   * @returns Promise
   */
  public async checkIn() {
    return new Promise<Embed>(async (resolve, reject) => {
      axios.defaults.headers.common['Referer'] = this.WEB_SIGN_IN
      const signInfo: SignInfo = (await axios(this.API_SIGN_INFO)).data
      const totalLoginDay = (signInfo.data?.total_sign_day ?? 1) - 1

      if (signInfo.retcode != 0) {
        reject(signInfo.message)
        return false
      }

      if (signInfo.data?.first_bind) {
        reject("It's first time you check-in, please check in manually once.")
        return false
      }

      if (signInfo.data?.is_sign) {
        reject("Traveller, you've already checked in today")
        return false
      }

      const API_GAME_LIST = new URL(this.API_GAME_LIST)

      if (signInfo.data?.region) {
        API_GAME_LIST.searchParams.append('region', signInfo.data?.region)
      }

      const accounts: Accounts = (await axios(API_GAME_LIST.toString())).data
      const account: AccountData = orderBy(
        accounts.data.list,
        ['level'],
        'desc'
      )[0]

      const signIn: SignIn = (await axios.post(this.API_SIGN_IN)).data

      if (signIn.retcode == 0) {
        const signReward: SignReward = (await axios(this.API_SIGN_REWARD)).data
        const reward: Reward = signReward.data.awards[totalLoginDay]

        const embed: Embed = {
          title: 'Genshin Impact Daily Check-In',
          description: signIn.message,
          color: parseInt('e86d82', 16), // ##e86d82
          thumbnail: {
            url: reward.icon,
          },
          author: {
            name: 'Paimon',
            icon_url:
              'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png',
            url: 'https://genshin.hoyoverse.com',
          },
          footer: {
            text: 'Genshin Automatic Checkin',
            icon_url: 'https://paimon.moe/favicon.ico',
          },
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: 'Nickname',
              value: account.nickname,
              inline: true,
            },
            {
              name: 'UID',
              value: account.game_uid,
              inline: true,
            },
            {
              name: 'Level',
              value: account.level.toString(),
              inline: true,
            },
            {
              name: 'Server',
              value: account.region_name,
              inline: true,
            },
            {
              name: "Today's rewards",
              value: `${reward.name} x ${reward.cnt}`,
              inline: true,
            },
            {
              name: 'Total Daily Check-In',
              value: (totalLoginDay - 1).toString(),
              inline: true,
            },
            {
              name: 'Check-in result:',
              value: signIn.message,
              inline: false,
            },
          ],
        }

        await new Checkin({
          response: signIn,
          uid: account.game_uid,
        }).save()

        resolve(embed)
        return
      } else {
        reject(signIn.message)
      }
    })
  }

  /**
   * Delay
   *
   * @param second number
   * @returns Promise
   */
  private delay(second: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, second * 1000)
    })
  }

  /**
   * FormatRedeemReward
   *
   * @param code Code
   * @returns Array<CodeRewards>
   */
  private formatRedeemReward(code: Code): Array<CodeReward> {
    const rewards: Array<CodeReward> = []
    for (const reward of code.reward_array) {
      switch (reward.rarity) {
        case 'rarity_one_star':
          reward.rarityNumber = 1
          break

        case 'rarity_two_star':
          reward.rarityNumber = 2
          break

        case 'rarity_tree_star':
          reward.rarityNumber = 3
          break

        case 'rarity_four_star':
          reward.rarityNumber = 4
          break

        case 'rarity_five_star':
          reward.rarityNumber = 5
          break

        default:
          reward.rarityNumber = 0
          break
      }

      switch (reward.image_path) {
        case 'adventurer_experience':
          reward.image_url =
            'https://upload-static.hoyoverse.com/event/2021/02/25/01ba12730bd86c8858c1e2d86c7d150d_5665148762126820826.png'
          break

        case 'primogem':
          reward.image_url =
            'https://upload-static.hoyoverse.com/event/2021/02/25/f4450e0ef470f777fca0b3dd95813734_1653002626503274756.png'
          break

        case 'mora':
          reward.image_url =
            'https://webstatic.hoyoverse.com/upload/static-resource/2022/08/12/bddc10e07950d708a371861e7be32928_4601996924011219727.png'
          break

        case 'hero_wit':
          reward.image_url =
            'https://upload-static.hoyoverse.com/event/2021/02/25/6ef98074e6e8c9c838e144d4db496434_4740225561143115197.png'
          break

        case 'mystic_enhancement_ore':
          reward.image_url =
            'https://static.wikia.nocookie.net/gensin-impact/images/5/55/Item_Mystic_Enhancement_Ore.png'
          break

        case 'fine_enhancement_ore':
          reward.image_url =
            'https://upload-static.hoyoverse.com/event/2021/02/25/22542ef6122f5ad4ac1c3834d11cdfb4_8505332314511574414.png'
          break

        default:
          reward.image_url = ''
          break
      }

      rewards.push(reward)
    }

    return rewards
  }
}
