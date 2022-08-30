import process from "process"

export const OS_COOKIES = process.env["OS_COOKIES"] ?? null
export const DISCORD_CALLBACK = process.env["DISCORD_CALLBACK"] ?? null
export const USER_AGENT =
  process.env["USER_AGENT"] ||
  "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.47"

export const API_USER_INFO =
  "https://api-account-os.hoyoverse.com/auth/api/getUserAccountInfoByLToken"
export const API_GAME_LIST =
  "https://api-os-takumi.hoyoverse.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_global"
export const API_SIGN_REWARD =
  "https://hk4e-api-os.hoyoverse.com/event/sol/home?lang=en-us&act_id=e202102251931481"
export const API_SIGN_INFO =
  "https://hk4e-api-os.hoyoverse.com/event/sol/info?lang=en-us&act_id=e202102251931481"
export const API_SIGN_IN =
  "https://hk4e-api-os.mihoyo.com/event/sol/sign?act_id=e202102251931481"
export const WEB_SIGN_IN = 'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&mhy_auth_required=true&mhy_presentation_style=fullscreen&utm_source=hoyolab&utm_medium=battlechronicle'

export const API_REDEEM_INFO = "https://api.github.com/repos/ataraxyaffliction/gipn-json/commits/main"
export const API_REDEEM_LIST = "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn-update.json"
export const API_REDEEM = "https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey"

export const API_REFERER = "https://act.hoyolab.com"
