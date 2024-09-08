import type { User } from '@/interfaces/User'
import axios, { type AxiosResponse } from 'axios'

export default class AdminApi {
	static async clearData() {
		return axios.post(import.meta.env.VITE_API_URL + 'clear-data') as Promise<AxiosResponse<User>>
	}
}
