import { showToastError } from '@/utils/handle.error'
import { WHITE_API } from '@/service/config/index'

class SJRequest {
  baseURL: string
  timeout: number

  constructor(config: any) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
  }

  request(config: any) {
    return new Promise((resolve, reject) => {
      const url = config.url
      const method = config.method || 'GET'
      const data = config.data || {}
      const headers: any = config.headers || {}

      // 检查 URL 是否不在 WHITE_API 中并且存在令牌
      const token = uni.getStorageSync('token')
      if (WHITE_API.indexOf(url) === -1 && token) {
        headers.Authorization = `Bearer ${token}`
      }

      // 为 POST 和 DELETE 方法设置 Authorization 头部
      if (method === 'POST' || method === 'DELETE') {
        headers.Authorization = `Bearer ${token}`
      }

      // 发送请求
      uni.request({
        url: this.baseURL + url,
        method: method,
        data: data,
        header: headers,
        timeout: this.timeout,
        success: (res: any) => {
          if (res.statusCode === 200) {
            const code = res.data.code
            const msg = res.data.message

            if (code !== 0) {
              showToastError('error', msg)
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages-login/login/login',
                })
              }, 1000)
              reject(new Error(`请求失败，错误代码：${code}，错误信息：${msg}`))
            } else {
              resolve(res.data)
            }
          } else {
            reject(new Error(`请求失败，状态码：${res.statusCode}`))
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

  delete(config: any) {
    return this.request({
      ...config,
      method: 'DELETE',
    })
  }

  put(config: any) {
    return this.request({
      ...config,
      method: 'PUT',
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
