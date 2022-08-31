import { MessageBuilder, Webhook } from 'discord-ts-webhook'
import { DISCORD_CALLBACK } from './config'

export const sendHookSignIn = (status, reward, mainAccount, totalLoginDay, i, cookies) => {
  if (DISCORD_CALLBACK == null) {
    return
  }

  const hook = new Webhook(DISCORD_CALLBACK as string)
  let embed = new MessageBuilder()
    .setTitle('Genshin Impact Daily Web Check-In')
    .setDescription(status)
    .setColor('#E86D82')
    .setThumbnail(reward.icon)
    .setAuthor('Paimon', 'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png', 'https://genshin.hoyoverse.com')
    .setFooter(`Genshin Auto Login (${i+1}/${cookies.length} Executed`, 'https://paimon.moe/favicon.ico')
    .setTimestamp()
    .addField('Nickname', mainAccount.nickname)
    .addField('UID', mainAccount.game_uid)
    .addField('Level', mainAccount.level)
    .addField('Server', mainAccount.region_name)
    .addField('Today\'s rewards', `${reward.name} x ${reward.cnt}`)
    .addField('Total Daily Check-In', (totalLoginDay + 1))
    .addField('Check-in result:', status, false)

  hook.send(embed)
}

export const sendHookRedeem = (status, mainAccount, code, rewards, i, cookies) => {
  if (DISCORD_CALLBACK == null) {
      return
  }

  const hook = new Webhook(DISCORD_CALLBACK as string)
  let embed = new MessageBuilder()
    .setTitle('Genshin Impact Auto Redeem Codes')
    .setDescription(status)
    .setColor('#E6E18F')
    .setAuthor('Paimon', 'https://img-os-static.hoyolab.com/communityWeb/upload/1d7dd8f33c5ccdfdeac86e1e86ddd652.png', 'https://genshin.hoyoverse.com')
    .setFooter(`Genshin Auto Login (${i+1}/${cookies.length} Executed`, 'https://paimon.moe/favicon.ico')
    .setTimestamp()
    .addField('Nickname', mainAccount.nickname)
    .addField('UID', mainAccount.game_uid)
    .addField('Code', code)
    .addField('Rewards', rewards, true)

  hook.send(embed)
}
