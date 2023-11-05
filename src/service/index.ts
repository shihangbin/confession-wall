import SJRequest from './request'
import { BASE_URL, TIMEOUT } from './config'

const sjRequest = new SJRequest({
  baseURL: BASE_URL, // 正确的baseURL
  timeout: TIMEOUT, // 正确的timeout
})

export default sjRequest
