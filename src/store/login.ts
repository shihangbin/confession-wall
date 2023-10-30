import { defineStore } from 'pinia'

export const userLogin = defineStore('login', {
  state() {
    return {
      token: '',
    }
  },
})
