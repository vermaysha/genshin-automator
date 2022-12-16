import { Embed } from '@vermaysha/discord-webhook'
import { IAccount } from '../models/Account'
import { setup } from './setup'
import axios from 'axios'
import { Code } from '../interfaces/codes'
import { map, orderBy, remove } from 'lodash'
import Redeem from '../models/Redeem'
import { red } from 'chalk'
import { formatRedeemReward } from './formatRedeemReward'
import { sleep } from './sleep'

export async function redeem(accounts: IAccount[]) {
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i]
    const { genshin, webhook } = await setup(account)

    if (!genshin) {
      continue
    }

    const codeLists = (
      await axios.get(
        'https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn-update.json'
      )
    ).data

    const allCodes: Array<Code> = remove(codeLists.CODES, (n: Code) => {
      return n.is_expired == false
    })

    const redeem = await Redeem.find({ uid: account.game_uid })
    const redeemedCodes = map(redeem, 'code')

    const codes = remove(allCodes, (row) => {
      return redeemedCodes.includes(row.code) == false
    })

    if (codes.length < 1) {
      console.log(
        red(
          `No new redeem found for account: ${account.nickname} (${account.game_uid})`
        )
      )
    }

    for (let j = 0; j < codes.length; j++) {
      const code = codes[j]
      const rewards = orderBy(
        formatRedeemReward(code),
        ['rarityNumber'],
        'desc'
      )

      const redeem = await genshin.redeem(code.code)

      const embed = new Embed()
        .setTitle('Genshin Impact Automatic Redeem')
        .setDescription(redeem.message)
        .setColor('#E6E18F')
        .setThumbnail({
          url: rewards[0].image_url || '',
        })
        .setAuthor({
          name: 'Paimon',
          icon_url:
            'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png',
          url: 'https://genshin.hoyoverse.com',
        })
        .setFooter({
          text: `Account ${i + 1}/${accounts.length} - Code ${j + 1}/${
            codes.length
          }`,
          icon_url:
            'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png',
        })
        .setTimestamp()
        .setFields([
          {
            name: 'Nickname',
            value: account.nickname || '-',
            inline: true,
          },
          {
            name: 'UID',
            value: account.game_uid || '-',
            inline: true,
          },
          {
            name: 'Level',
            value: account.level?.toString() || '-',
            inline: true,
          },
          {
            name: 'Server',
            value: account.region_name || '-',
            inline: true,
          },
          {
            name: 'Code',
            value: code.code,
            inline: true,
          },
          {
            name: 'Status',
            value: redeem.message,
            inline: true,
          },
        ])

      for (const reward of rewards) {
        embed.addField({
          name: 'Rewards',
          value: `${reward.name} x ${reward.count}`,
          inline: false,
        })
      }

      webhook?.addEmbed(embed)
      webhook?.send()

      await new Redeem({
        code: code.code,
        uid: account.game_uid,
        response: redeem,
      }).save()

      await sleep(10)
    }
  }
}
