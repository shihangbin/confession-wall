import { defineStore } from 'pinia'
import { user, userInfo, upUserInfo } from '@/service/modules/login'
import { getLikeArticle, getArticle } from '@/service/modules/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    isLogin: true,
    showLogin: '编辑资料',
    helloLogin: '欢迎来到云南能源表白墙！',
    personage: [],
    isPrivacy: false,
  }),
  actions: {
    async getUserAction() {
      const userResult: any = await user()
      this.userInfo = {}
      this.userInfo = userResult.data
      return this.userInfo
    },
    async getUserInfoAction(id: string | number) {
      const userResult: any = await userInfo(id)
      this.userInfo = {}
      this.userInfo = userResult.data
      return this.userInfo
    },
    async putUserInfoAction(id: number | string) {
      const userResult: any = await upUserInfo(id, this.userInfo)
      this.userInfo = userResult.data
      return this.userInfo
    },
    async getLikeAction(id: number | string) {
      const personageResult: any = await getLikeArticle(id)
      this.personage = []
      this.personage = personageResult.data
      return this.personage
    },
    async getAction(id: number | string) {
      const personageResult: any = await getArticle(id)
      this.personage = []
      this.personage = personageResult.data
      return this.personage
    },
  },
})
