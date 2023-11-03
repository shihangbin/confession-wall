// 在你的页面或组件中导入 http.js
import request from './http'

export const getArticles = () => {
  // 发送请求的示例
  return request({
    url: '/article',
    method: 'GET', // 可以是 GET、POST 等
    header: {
      'Content-Type': 'application/json', // 请求头信息
      // 可以添加其他自定义请求头
    },
  })
}
export const getArticleItem = (id: number) => {
  // 发送请求的示例
  return request({
    url: '/article',
    data: id,
    method: 'GET', // 可以是 GET、POST 等
    header: {
      'Content-Type': 'application/json', // 请求头信息
      // 可以添加其他自定义请求头
    },
  })
}
