import { defineStore } from 'pinia'
import { user, userInfo } from '@/service/modules/login'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: 0,
      username: '开朗的网友',
      avatar_path: 'http://api.xbin.cn/upload/avatar/14',
      role: 'user',
      is_muted: 0,
      wechat_or_qq: '18213331550',
      age: 99,
      gender: '男',
      major: '计算机应用专业',
      class: '计应20002班',
      createAt: '2023-11-02T06:02:36.000Z',
    },
    isLogin: true,
    showLogin: '编辑资料',
    helloLogin: '欢迎来到云南能源表白墙！',
  }),
  actions: {
    async getUserAction() {
      const userResult: any = await user()
      this.userInfo = userResult.data
      return this.userInfo
    },
    async getUserInfoAction(id: string | number) {
      const userResult: any = await userInfo(id)
      this.userInfo = userResult.data
      return this.userInfo
    },
  },
})
