import { defineStore } from 'pinia'
import { login } from '@/api/user'

interface ILoginState {
  token: any
  code: number
}
export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    code: 0,
  }),
})
