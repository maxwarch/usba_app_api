import axios from 'axios'
import { defineStore } from 'pinia'

import { API_URL } from '@/constants'
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

export function setBearerHeader(token: string) {
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${token}`,
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
      const { status, data } = await axios.post(`${API_URL}/auth/login`, userData, {
        headers,
      })

      const success = status == 200

      if (success) {
        this.token = data.access_token
        this.refreshToken = data.refresh_token
        if (this.token) setBearerHeader(this.token)
      }

      return { success, data }
    },

    logout() {
      this.token = null
      this.refreshToken = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('refreshToken')
    },

    async register(userData: User): Promise<APIResponse<null>> {
      const { status, data } = await axios.post(`${API_URL}/auth/register`, null, {
        params: { ...userData },
      })

      const success = status == 201

      if (success) {
        this.token = data.access_token
        this.refreshToken = data.refresh_token
        if (this.token) setBearerHeader(this.token)
      }

      return { success, data }
    },

    setRememberMe(val: boolean) {
      if (val && this.token) {
        localStorage.setItem('token', JSON.stringify(this.token))
        localStorage.setItem('refreshToken', JSON.stringify(this.refreshToken))
      } else if (this.token) {
        sessionStorage.setItem('token', JSON.stringify(this.token))
        sessionStorage.setItem('refreshToken', JSON.stringify(this.refreshToken))
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('refreshToken')
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
	},
})