import request from './http'

export const signUP = (username: string, password: string) => {
  // 发送请求的示例
  return request({
    url: '/user',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}
export const login = (username: string, password: string) => {
  // 发送请求的示例
  return request({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}
export const userInfo = () => {
  // 发送请求的示例
  return request({
    url: '/login/user',
    method: 'GET',
  })
}
