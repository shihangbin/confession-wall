import SJRequest from './request'
import { BASE_URL, TIMEOUT } from './config'

const sjRequest = new SJRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

export default sjRequest
