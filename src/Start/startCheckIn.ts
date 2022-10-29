import Genshin from '../Lib/Genshin'
import { red, green } from 'chalk'
import DiscordWebhook from '../Lib/DiscordWebhook'
import { Embed, Webhook } from '../Types'

export async function startCheckIn(cookie: string) {
  const genshin = new Genshin(
    cookie,
    process.env.USER_AGENT ??
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
  )

  try {
    const embed: Embed = await genshin.checkIn()
    if (process.env.DISCORD_WEBHOOK) {
      const discord = new DiscordWebhook(process.env.DISCORD_WEBHOOK)

      const requestBody: Webhook.input.POST = {
        embeds: [embed],
      }

      await discord.execute(requestBody)
      console.log(green('Check-in Successfully'))
    }
  } catch (err) {
    console.log(red(err))
  }
}
