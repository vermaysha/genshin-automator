export type SignInfo = {
  retcode: number
  message: string
  data: {
    total_sign_day: number
    today: string
    is_sign: boolean
    first_bind: boolean
    is_sub: boolean
    region: string
  }
}
