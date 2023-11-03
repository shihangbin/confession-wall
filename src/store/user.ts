import { defineStore } from 'pinia'
import { user } from '@/service/modules/login'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        name: '开朗的网友！',
        avatarUrl: 'https://img.xbin.cn/images/2023/10/03-19-00-a6822b.jpg',
        sign: '不忘初心，方得始终！',
        wxqq: '18213331550',
        infos: {
          age: '19岁',
          sex: '男',
          field: '计算机应用',
          classes: '计应20002',
        },
        isLogin: true,
        // isLogin: false,
        helloLogin: '欢迎来到云南能源表白墙！',
        showLogin: '编辑资料',
      },
    }
  },
  actions: {
    async getUserAction() {
      const userResult = await user()
      this.userInfo.name = userResult?.data?.username
      this.userInfo.avatarUrl = userResult?.data?.avatar_path
      this.userInfo.wxqq = userResult?.data?.wechat_or_qq
      this.userInfo.infos.age = userResult?.data?.age
      this.userInfo.infos.sex = userResult?.data?.gender
      this.userInfo.infos.field = userResult?.data?.major
      this.userInfo.infos.classes = userResult?.data?.class
      // this.userInfo.isLogin = userResult.data.is_muted
    },
  },
})
