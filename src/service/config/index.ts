let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'https://api.xbin.cn'
} else {
  // 开发环境
  BASE_URL = 'http://localhost:51011'
  // BASE_URL = 'https://api.xbin.cn'
}

const TIMEOUT = 10000

const WHITE_API = ['/article', '/login', '/user', '/comment']

export { BASE_URL, TIMEOUT, WHITE_API }
