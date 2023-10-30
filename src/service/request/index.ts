import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { showToastError } from '@/utils/handle.error'
import { userLogin } from '@/store/login'
import { storeToRefs } from 'pinia'

const loginStore = userLogin()
const { token }: any = storeToRefs(loginStore)

class SJRequest {
  instance: AxiosInstance
  // 创建实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截器成功')
        return config
      },
      (error) => {
        console.log('全局请求拦截器失败')
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data

        if (typeof sessionStorage !== 'undefined') {
          // 在浏览器环境中使用 sessionStorage
          token.value = sessionStorage.getItem('token')
        } else {
          // 在小程序环境中使用小程序的本地存储方法
          token.value = uni.getStorageSync('token')
        }

        console.log('全局响应拦截器成功')

        if (res.code === -1005 || !token.value) {
          showToastError('none', '登录过期从新登录!')

          uni.navigateTo({
            url: '/pages-user/login/login',
            // url: '/pages-user/user/user',
          })
        }

        return res
      },
      (error) => {
        console.log('全局响应拦截器失败')
        return error
      }
    )
  }

  // 封装网络请求
  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  post(config: AxiosRequestConfig) {
    return this.request({
      ...config,
      method: 'post',
      headers: { Authorization: `Bearer ${token.value}` },
    })
  }
  get(config: AxiosRequestConfig) {
    return this.request({
      ...config,
      method: 'get',
      headers: { Authorization: `Bearer ${token.value}` },
    })
  }
}

export default SJRequest
