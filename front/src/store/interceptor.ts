/* eslint-disable camelcase */
import axios from 'axios'

import { API_URL } from '@/constants'
import { storeToken, useAuth } from '@/store/auth'

export const api = axios.create({
  baseURL: `${API_URL}`,
})

api.interceptors.request.use(
  (config) => {
		const store = useAuth()
    if (store.token) {
			config.headers.Authorization = `Bearer ${store.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const store = useAuth()
		const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const { status, data } = await api.post(`${API_URL}/auth/refresh`, { refresh_token: store.refreshToken })

				if (status == 200) storeToken(data)

				return axios(originalRequest)
			} catch (error) {
				// Handle refresh token error or redirect to login
			}
		}

		return Promise.reject(error)
	},
)