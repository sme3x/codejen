import type { User } from '@/models/User/Model'
import axios, { type AxiosResponse } from 'axios'

export default class AuthApi {
	async getCsrfToken() {
		return axios.get(import.meta.env.VITE_BACKEND_URL + '/sanctum/csrf-cookie')
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

	async register({
		email,
		password,
		password_confirmation,
	}: {
		email: string
		password: string
		password_confirmation: string
	}) {
		await this.getCsrfToken()
		return axios.post(import.meta.env.VITE_BACKEND_URL + '/register', {
			email,
			password,
			password_confirmation,
			name: email,
		})
	}

	async verifyEmail({
		id,
		hash,
		expires,
		signature,
	}: {
		id: string
		hash: string
		expires: string
		signature: string
	}) {
		return await axios.get(import.meta.env.VITE_API_URL + `email/verify/${id}/${hash}`, {
			params: { expires, signature },
		})
	}

	async resendEmailVerification() {
		return await axios.post(import.meta.env.VITE_API_URL + 'email/verification-notification')
	}
}
