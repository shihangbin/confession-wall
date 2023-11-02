import { defineStore } from 'pinia'
import { login } from '@/service/modules/login'

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

      if (this.code === 0) {
        if (typeof sessionStorage !== 'undefined') {
          // 在浏览器环境中使用 sessionStorage
          sessionStorage.setItem('token', this.token)
          this.token = sessionStorage.getItem('token')
        } else {
          // 在小程序环境中使用小程序的本地存储方法
          uni.setStorageSync('token', this.token)
          this.token = uni.getStorageSync('token')
        }
      }
    },
  },
})
