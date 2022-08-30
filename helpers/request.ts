import fetch from 'node-fetch'
import { OS_COOKIES, USER_AGENT, API_REFERER } from './config'

export default async (method, host, cookie, body = null) => {
    let options: Record<any, any> = {
        "method": method,
        "headers": {
            "Content-Type": "application/json",
            "Cookie": cookie,
            "User-Agent": USER_AGENT,
            'Accept-Encoding': 'gzip, deflate, br',
            "Referer": API_REFERER,
        },
    }

    if (method == "post") {
        options.body = JSON.stringify(body)
    }

    const response = await fetch(host, options)

    return await response.json()
}
