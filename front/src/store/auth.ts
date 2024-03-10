/* eslint-disable camelcase */
import { defineStore } from 'pinia'

import { api } from '@/store/interceptor'
import { APIResponse } from '@/types'

export type User = {
  email: string
  password: string
  username?: string | undefined
  firstname: string | undefined
  lastname: string | undefined
  isActive?: boolean | true
}

export type UserLogin = Pick<User, 'username' | 'password'>

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

export function storeToken(data: {access_token: string, refresh_token: string}): void {
  const store = useAuth()
  const { access_token, refresh_token } = data
  store.token = access_token
  store.refreshToken = refresh_token

  if (localStorage.getItem('token')) {
    localStorage.setItem('token', store.token)
    localStorage.setItem('refreshToken', store.refreshToken)
  } else {
    sessionStorage.setItem('token', store.token)
    sessionStorage.setItem('refreshToken', store.refreshToken)
  }
}

export const useAuth = defineStore('auth', {
	state: () => ({
		user        : undefined as User | undefined,
    token       : null as string | null,
    refreshToken: null as string | null,
	}),
  //persist: true,
	getters: {
    isLogin: (state) => state.token !== null,
	},
	actions: {
    // 321654sdfg
    async login(userData: UserLogin): Promise<APIResponse<null>> {
      const { status, data } = await api.post('/auth/login', userData, {
        headers,
      })

      const success = status == 200
      if (success) storeToken(data)

      return { success, data }
    },

    logout() {
      this.token = null
      this.refreshToken = null
      this.clearStorage()
    },

    async register(userData: User): Promise<APIResponse<null>> {
      const { status, data } = await api.post('/auth/register', null, {
        params: { ...userData },
      })

      const success = status == 201
      if (success) storeToken(data)

      return { success, data }
    },

    setRememberMe(val: boolean) {
      this.clearStorage()

      if (val && this.token) {
        localStorage.setItem('token', this.token!)
        localStorage.setItem('refreshToken', this.refreshToken!)
      } else if (this.token) {
        sessionStorage.setItem('token', this.token!)
        sessionStorage.setItem('refreshToken', this.refreshToken!)
      }
    },

    restoreToken() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token')
        this.refreshToken = localStorage.getItem('refreshToken')
      } else if (sessionStorage.getItem('token')) {
        this.token = sessionStorage.getItem('token')
        this.refreshToken = sessionStorage.getItem('refreshToken')
      }
    },

    clearStorage() {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('refreshToken')
    },
	},
})