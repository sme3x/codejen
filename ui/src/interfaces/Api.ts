import type { AxiosResponse } from 'axios'
import type { LaravelPaginationResponse } from './Laravel'
import type { Filter } from './Filter'

export interface Api<
	T extends { id: number | string },
	TList extends LaravelPaginationResponse<T>,
	TStorePayload = any,
	TUpdatePayload = any,
	TUpdateRelationPayload = any,
> {
	index: (params: {
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
	}) => Promise<AxiosResponse<TList>>

	show: (id: T['id'], params: { with?: string[] }) => Promise<AxiosResponse<T>>

	store: (params: TStorePayload) => Promise<AxiosResponse<T>>

	update: (id: T['id'], params: TUpdatePayload) => Promise<AxiosResponse<T>>

	updateRelation: (
		id: number | string,
		relation: string,
		params: TUpdateRelationPayload,
	) => Promise<AxiosResponse<T>>

	destroy: (id: T['id']) => Promise<AxiosResponse<void>>
}
