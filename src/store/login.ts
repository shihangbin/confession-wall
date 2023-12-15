import { defineStore } from 'pinia'
import { login } from '@/service/modules/login'
import { showToastError } from '@/utils/handle.error'

interface ILogin {
  code: number
  token: string
  msg: string
  key: any
}
export const useLoginStore = defineStore('login', {
  state: (): ILogin => ({
    code: 0,
    token: '',
    msg: '',
    key: {
      appId: '',
      secret: '',
    },
  }),
  actions: {
    async loginAction(username: string, password: string) {
      const loginResult: any = await login(username, password)
      this.code = loginResult.code
      this.msg = loginResult.message
      this.key.appId = loginResult.data.appid
      this.key.secret = loginResult.data.secret

      if (this.code !== 0) {
        showToastError('error', this.msg)
        uni.hideLoading()
        return
      }
      this.token = loginResult.data.token
    },
  },
})
