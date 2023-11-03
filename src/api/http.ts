const baseURL = 'https://api.xbin.cn'

const headers = {
  Authorization: uni.getStorageSync('token'),
}

export const request = (config: any) => {
  // 请求拦截器，可以在这里添加通用的请求配置
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + config.url,
      method: config.method || 'GET',
      header: config.header || headers,
      data: config.data || {},
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}

export default request
