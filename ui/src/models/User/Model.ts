export interface UserStorePayload {
	name: string
	email: string
}

export interface UserUpdatePayload {
	name?: string
	email?: string
}

export interface User {
	id: number
	name: string
	email: string
	role: 'user' | 'admin'
	verified: boolean
	created_at: string
	updated_at: string
}

export const title: keyof User = 'name'
