import AuthApi from '@/helpers/api/AuthApi'
import type { User } from '@/models/User/Model'
import { defineStore } from 'pinia'

const auth = new AuthApi()

export const useAuthStore = defineStore('auth', {
	state: () => {
		return {
			user: null as User | null,
			userReturned: false,
			lastRouteCached: sessionStorage.getItem('lastRoute') || '/',
		}
	},
	actions: {
		async login({ email, password }: { email: string; password: string }) {
			this.setLastRoute(null)
			// TODO: Add error handling
			await auth.login({ email, password })
			await this.getUser()
		},
		async logout() {
			await auth.logout()
			this.user = null
		},
		async getUser() {
			try {
				const res = await auth.getUser()
				this.user = res.data
			} catch (error) {
				//
			} finally {
				this.userReturned = true
			}
		},
		setLastRoute(route: string | null) {
			if (!route) route = '/'
			sessionStorage.setItem('lastRoute', route)
			this.lastRouteCached = route
		},
	},
	getters: {
		lastRoute(state) {
			return state.lastRouteCached
		},
	},
})
