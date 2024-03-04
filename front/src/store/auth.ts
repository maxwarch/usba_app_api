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
		user : undefined as User | undefined,
    token: undefined as string | undefined,
	}),
  persist: true,
	getters: {
    isLogin: (state) => state.token !== undefined,
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
        if (this.token) setBearerHeader(this.token)
      }

      return { success, data }
    },

    async register(userData: User): Promise<APIResponse<null>> {
      const { status, data } = await axios.post(`${API_URL}/auth/register`, null, {
        params: { ...userData },
        //headers,
      })

      const success = status == 201

      if (success) {
        this.token = data.access_token
        if (this.token) setBearerHeader(this.token)
      }

      return { success, data }
    },
	},
})