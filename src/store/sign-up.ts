import { defineStore } from 'pinia'
import { signUp } from '@/service/modules/sign-up'

interface ISignUp {
  code: number
}
export const useSignUpStore = defineStore('signUp', {
  state: (): ISignUp => ({
    code: 0,
  }),
  actions: {
    async signUpAction(username: string, password: string) {
      const signUpResult: any = await signUp(username, password)
      this.code = signUpResult.code
    },
  },
})
