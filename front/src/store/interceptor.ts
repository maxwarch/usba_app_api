/* eslint-disable camelcase */
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { API_URL } from '@/constants'
import { storeToken, useAuth } from '@/store/auth'
import { useUI } from '@/store/ui'

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
  (error) => error,
)

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean
}

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const { config, response } = error
		const store = useAuth()
		const originalRequest: RetryAxiosRequestConfig = config!

		if (response && originalRequest && response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const { status, data } = await api.post(`${API_URL}/auth/refresh`, { refresh_token: store.refreshToken })
				if (status == 200) storeToken(data)

				if (originalRequest.headers)
					originalRequest.headers.Authorization = `Bearer ${data.access_token}`

				return axios(originalRequest)
			} catch (error) {
				const uiStore = useUI()
				uiStore.loginVisible = true
			}
		}

		return Promise.reject(error)
	},
)