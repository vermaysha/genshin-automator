import { AccountData } from './AccountData'

export type Accounts = {
  retcode: number
  message: string
  data: {
    list: Array<AccountData>
  }
}
