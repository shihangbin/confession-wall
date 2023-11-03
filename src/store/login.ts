import { defineStore } from 'pinia'
import { login } from '@/api/user'

interface ILoginState {
  token: any
  code: number
}
export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    code: 0,
  }),
  actions: {
    async loginAction(username: string, password: string) {
      const loginResult: any = await login(username, password)
      this.token = loginResult.data.token
      this.code = loginResult.code

      // 存储数据到本地存储
      const token = loginResult.data.token
      uni.setStorageSync('token', token)
    },
  },
})
