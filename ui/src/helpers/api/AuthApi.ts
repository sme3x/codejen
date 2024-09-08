import type { User } from '@/interfaces/User'
import axios, { type AxiosResponse } from 'axios'

export default class AuthApi {
	async getCsrfToken() {
		axios.get(import.meta.env.VITE_BACKEND_URL + '/sanctum/csrf-cookie')
	}

	async login({ email, password }: { email: string; password: string }) {
		await this.getCsrfToken()
		return axios.post(
			import.meta.env.VITE_BACKEND_URL + '/login',
			{ email, password },
			{
				headers: {
					Accept: 'application/json',
				},
			},
		) as Promise<AxiosResponse<User>>
	}

	async logout() {
		return axios.post(import.meta.env.VITE_BACKEND_URL + '/logout')
	}

	async getUser() {
		await this.getCsrfToken()
		return axios.get(import.meta.env.VITE_API_URL + 'user') as Promise<AxiosResponse<User>>
	}
}
