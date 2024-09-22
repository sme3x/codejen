import { createRouter, createWebHistory } from 'vue-router'
import authGuard from './guards/authGuard'
import { useAuthStore } from '@/stores/Auth'

import Login from '../views/Auth/Login.vue'
import AdminApi from '@/helpers/api/AdminApi'
/* GENERATOR(IMPORT) */

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			beforeEnter: () => {
				const auth = useAuthStore()
				if (auth.user) {
					return { path: auth.lastRoute ?? '/posts' }
				}
			},
		},
		{
			path: '/logout',
			component: Login,
			beforeEnter: async () => {
				const auth = useAuthStore()
				await auth.logout()
				return { path: '/login' }
			},
		},
		{
			path: '/clear-data',
			component: Login,
			beforeEnter: async () => {
				await AdminApi.clearData()
				window.location.reload()
				throw new Error('Clear data')
			},
		},
		/* GENERATOR(ROUTES) */
		{
			path: '/:pathMatch(.*)*',
			redirect: '/login',
		},
	],
})

export default router
