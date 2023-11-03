import { showToastError } from '@/utils/handle.error'

const baseURL = 'https://api.xbin.cn'
const whitApi = ['/article', '/login']

const requestInterceptor = (config: any) => {
  // 在请求发送之前的拦截器操作，可以在这里添加通用的请求配置

  const token = uni.getStorageSync('token')
  const url = config.url
  if (whitApi.indexOf(url) == -1 && token) {
    config.header = { Authorization: `${token}` }
  }
  return config
}

const responseInterceptor = (response: any) => {
  // 在收到响应后的拦截器操作，可以在这里处理响应数据
  if (response.statusCode === 200) {
    const code = response.data.code
    const msg = response.data.message

    if (code === -1005) {
      showToastError('none', msg)
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages-user/login/login',
        })
      }, 2000)
    }

    // 请求成功
    return response.data
  } else {
    // 请求失败
    throw new Error('请求失败')
  }
}

const request = (config: any) => {
  // 请求拦截器，可以在这里添加通用的请求配置
  config = requestInterceptor(config) // 请求拦截器
  console.log(config, '================')

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + config.url,
      method: config.method || 'GET',
      header: config.header || {},
      data: config.data || {},
      success: (res) => {
        const result = responseInterceptor(res) // 响应拦截器
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}

export default request
