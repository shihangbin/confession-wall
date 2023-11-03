import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import global from '../config/global.config'
import { showToastError } from '@/utils/handle.error'

class SJRequest {
  instance: AxiosInstance
  // 创建实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const whiteList = global.whiteList
        const url: any = config.url
        const token = uni.getStorageSync('token')

        if (whiteList.indexOf(url) === -1 && token) {
          config.headers.Authorization = `Bearer ${token}`
        }

       
        return config
      },
      (error) => {
        return Promise.reject(new Error(error))
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      async (response) => {
        const res = response.data
        const code = response.data.code || 0
        const msg = response.data.message || '未知错误'

        if (code === -1005) {
          showToastError('none', msg)
          uni.navigateTo({
            url: '/pages-user/login/login',
          })
          return Promise.reject(new Error(msg))
        }

        return res
      },
      (error) => {
        return Promise.reject(new Error(error))
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
