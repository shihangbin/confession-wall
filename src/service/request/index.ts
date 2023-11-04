import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import { showToastError } from '@/utils/handle.error'
import { WHITE_API } from '@/service/config/index'

class SJRequest {
  instance: AxiosInstance
  // 创建实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        const url: any = config.url
        const token = uni.getStorageSync('token')

        if (WHITE_API.indexOf(url) == -1 && token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        console.log(config)

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        const res = response.data
        const code = response.data.code || 0
        const msg = response.data.message || '未知错误'
        const token = uni.getStorageSync('token')

        if (code === -1005 && token) {
          showToastError('none', msg)
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages-user/login/login',
            })
          }, 2000)
        }

        return res
      },
      (error) => {
        return Promise.reject(error)
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
    })
  }
  get(config: AxiosRequestConfig) {
    return this.request({
      ...config,
      method: 'get',
    })
  }
}

export default SJRequest
