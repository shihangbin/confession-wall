import { defineStore } from 'pinia'
import { login } from '@/service/modules/login'
import { showToastError } from '@/utils/handle.error'

interface ILogin {
  code: number
  token: string
  msg: string
}
export const useLoginStore = defineStore('login', {
  state: (): ILogin => ({
    code: 0,
    token: '',
    msg: '',
  }),
  actions: {
    async loginAction(username: string, password: string) {
      const loginResult: any = await login(username, password)
      this.code = loginResult.code
      this.msg = loginResult.message
      if (this.code !== 0) {
        showToastError('error', this.msg)
        uni.hideLoading()
        return
      }
      this.token = loginResult.data.token
    },
  },
})
