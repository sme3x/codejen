import type { AxiosResponse } from 'axios'
import type { LaravelPaginationResponse } from '@/interfaces/Laravel'
import type { Filter } from '@/interfaces/Filter'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export default class Api<
	T extends { id: number | string },
	TList extends LaravelPaginationResponse<T>,
	TStorePayload,
	TUpdatePayload,
	TUpdateRelationPayload,
> {
	route: string = ''

	async index(params: {
		page?: number
		per_page?: number
		search?: string
		filters?: Filter[]
		orderBy?: keyof T
		order?: 'asc' | 'desc'
		with?: string[]
		fromRelation?: {
			model: string
			id: number | string
			relation: string
		}
		notFromRelation?: {
			model: string
			id: number | string
			relation: string
		}
	}): Promise<AxiosResponse<TList>> {
		return await axios.get(`${apiUrl}${this.route}`, { params })
	}

	async show(id: T['id'], params: { with?: string[] } = {}): Promise<AxiosResponse<T>> {
		return await axios.get(`${apiUrl}${this.route}/${id}`, { params })
	}

	async store(params: TStorePayload): Promise<AxiosResponse<T>> {
		return await axios.post(`${apiUrl}${this.route}`, params)
	}

	async update(id: T['id'], params: TUpdatePayload): Promise<AxiosResponse<T>> {
		return await axios.put(`${apiUrl}${this.route}/${id}`, params)
	}

	async updateRelation(
		id: number | string,
		relation: string,
		params: TUpdateRelationPayload,
	): Promise<AxiosResponse<T>> {
		return await axios.put(`${apiUrl}${this.route}/${id}/${relation}`, params)
	}

	async destroy(id: T['id']): Promise<AxiosResponse<void>> {
		return await axios.delete(`${apiUrl}${this.route}/${id}`)
	}
}
