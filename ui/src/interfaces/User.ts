import type { LaravelPaginationResponse } from './Laravel'
import type { Title } from './Model'

export interface UserStorePayload {
	name: string
	email: string
}

export interface UserUpdatePayload {
	name?: string
	email?: string
}

export interface UserUpdateRelationPayload {
	method: string
	params: Array<null | number>
}

export interface User {
	id: number
	name: string
	email: string
	created_at: string
	updated_at: string
}

export interface UserList extends LaravelPaginationResponse<User> {}

export const title: Title = 'name'
