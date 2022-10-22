import Genshin from '../Lib/Genshin'
import { red } from 'chalk'
import { Embed, Webhook } from '../Types'
import DiscordWebhook from '../Lib/DiscordWebhook'

export async function startRedeem(cookie: string) {
  const genshin = new Genshin(
    cookie,
    process.env.USER_AGENT ??
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
  )

  try {
    const embeds: Array<Embed> = await genshin.redeem()

    if (process.env.DISCORD_WEBHOOK) {
      const discord = new DiscordWebhook(process.env.DISCORD_WEBHOOK)

      const requestBody: Webhook.input.POST = {
        embeds,
      }

      await discord.execute(requestBody)
    }
  } catch (err) {
    console.log(red(err))
  }
}
