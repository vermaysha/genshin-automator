import Genshin from '../Lib/Genshin'
import chalk from 'chalk'
import { Embed, Webhook } from '../Types'
import DiscordWebhook from '../Lib/DiscordWebhook'

export async function startRedeem(cookie: string) {
  const genshin = new Genshin(
    cookie,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
  )

  try {
    const embeds: Array<Embed> = await genshin.redeem()

    const discord = new DiscordWebhook(
      'https://discord.com/api/webhooks/977800776535638027/Xdgg3RKNJfSzOUgAAepFHwOUOvYiVfbp37oMhl033Oy6NbvFxscKSfAHMwD_-JsHjMzh'
    )

    const requestBody: Webhook.input.POST = {
      embeds: embeds,
    }

    await discord.execute(requestBody)
  } catch (err) {
    console.log(chalk.red(err))
  }
}
