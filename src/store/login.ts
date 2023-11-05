import { defineStore } from 'pinia'
import { login } from '@/service/modules/login'

interface ILogin {
  code: number
  token: string
}
export const useLoginStore = defineStore('login', {
  state: (): ILogin => ({
    code: 0,
    token: '',
  }),
  actions: {
    async loginAction(username: string, password: string) {
      const loginResult: any = await login(username, password)
      this.code = loginResult.code
      this.token = loginResult.data.token
    },
  },
})
