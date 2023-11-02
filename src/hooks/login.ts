import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/store/login'

const loginStore = useLoginStore()
const { token, code } = storeToRefs(loginStore)

export const loginHooks = (username: string, password: string) => {
  loginStore.loginAction(username, password)
  uni.showLoading({
    title: '加载中',
  })
  setTimeout(function () {
    uni.hideLoading()
    uni.switchTab({
      url: '/pages/index/index',
    })
  }, 1000)
}
