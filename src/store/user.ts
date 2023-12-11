import { defineStore } from 'pinia'
import { user, userInfo, upUserInfo } from '@/service/modules/login'
import { getLikeArticle, getArticle } from '@/service/modules/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    // userInfo: {
    //   id: 0,
    //   username: '用户名',
    //   password: '密码',
    //   avatar_path: '头像',
    //   nickname: '开朗的网友',
    //   age: 99,
    //   role: 'user',
    //   is_muted: 0,
    //   wechat_or_qq: '18213331550',
    //   gender: '男',
    //   major: '计算机应用专业',
    //   school_class: '计应20002班',
    //   say: '请输入你的个性签名...',
    //   createAt: '2023-11-02T06:02:36.000Z',
    // },
    userInfo: {},
    isLogin: true,
    showLogin: '编辑资料',
    helloLogin: '欢迎来到云南能源表白墙！',
    personage: [],
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
