import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

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

        console.log('全局响应拦截器成功')

        if (res.code === -1005) {
          uni.showToast({
            title: '登录过期从新登录',
            icon: 'error',
            duration: 2000,
          })
          uni.navigateTo({
            // url: '/pages-user/user/login',
            url: '/pages-user/user/user',
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
}

export default SJRequest
