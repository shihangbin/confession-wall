let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'https://59.110.160.132'
} else {
  // 开发环境
  BASE_URL = 'http://localhost:51011'
}

const TIMEOUT = 10000

export { BASE_URL, TIMEOUT }
