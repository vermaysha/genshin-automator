import { Embed } from '@vermaysha/discord-webhook'
import { IAccount } from '../models/Account'
import { setup } from './setup'
import Checkin from '../models/Checkin'

export async function checkin(accounts: IAccount[]) {
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i]
    const { genshin, webhook } = await setup(account)

    if (!genshin) {
      continue
    }

    const daily = await genshin.claimDaily()

    const dailyEmbed = new Embed()
      .setTitle('Genshin Impact Daily Check-In')
      .setDescription(daily.status)
      .setColor('#e86d82')
      .setThumbnail({
        url: daily.reward?.icon || '',
      })
      .setAuthor({
        name: 'Paimon',
        icon_url:
          'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png',
        url: 'https://genshin.hoyoverse.com',
      })
      .setFooter({
        text: `Account ${i + 1}/${accounts.length}`,
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
          name: "Today's rewards",
          value: `${daily.reward?.name} x ${daily.reward?.cnt}`,
          inline: true,
        },
        {
          name: 'Total Daily Check-In',
          value: daily.info.total_sign_day.toString() || '0',
          inline: true,
        },
        {
          name: 'Check-in result:',
          value: daily.status,
          inline: false,
        },
      ])

    webhook?.addEmbed(dailyEmbed)
    await webhook?.send()

    await new Checkin({
      response: daily,
      uid: account.game_uid,
    }).save()
  }
}
