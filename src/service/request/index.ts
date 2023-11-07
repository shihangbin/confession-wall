import { showToastError } from '@/utils/handle.error'
import { WHITE_API } from '@/service/config/index'

class SJRequest {
  baseURL: string
  timeout: number
  // 创建实例
  constructor(config: any) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
  }

  // 封装网络请求
  request(config: any) {
    return new Promise((resolve, reject) => {
      const url = config.url
      const method = config.method || 'GET'
      const params = config.params || {}
      const data = config.data || {}
      const headers = config.headers || {}

      // 判断是否需要带上 token
      const token = uni.getStorageSync('token')
      if (WHITE_API.indexOf(url) === -1 && token) {
        headers.Authorization = `Bearer ${token}`
      }

      if (method == 'POST') {
        headers.Authorization = `Bearer ${token}`
      }

      // 发送请求
      uni.request({
        url: this.baseURL + url,
        method: method,
        data: data,
        header: headers,
        params: params,
        timeout: this.timeout,
        success: (res: any) => {
          if (res.statusCode === 200) {
            const response = {
              data: res.data,
              status: res.statusCode,
              statusText: 'OK',
              headers: res.header,
            }

            const code = res.data.code
            const msg = res.data.message

            if (code !== 0) {
              showToastError('error', msg)
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages-login/login/login',
                })
              }, 1000)
            }

            // 这里你可以添加更多的响应处理逻辑
            resolve(response.data)
          } else {
            reject(
              new Error(`Request failed with status code ${res.statusCode}`)
            )
          }
        },
        fail: (error) => {
          reject(error)
        },
      })
    })
  }

  post(config: any) {
    return this.request({
      ...config,
      method: 'POST',
    })
  }

  get(config: any) {
    return this.request({
      ...config,
      method: 'GET',
    })
  }
}

export default SJRequest
