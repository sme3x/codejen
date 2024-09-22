import { createRouter, createWebHistory } from 'vue-router'
import authGuard from './guards/authGuard'
import { useAuthStore } from '@/stores/Auth'

import Login from '../views/Auth/Login.vue'
import AdminApi from '@/helpers/api/AdminApi'
import UsersList from '../views/Users/List.vue'
import UsersEdit from '../views/Users/Edit.vue'
/* GENERATOR(IMPORT) */

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/userss',
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
		{
			path: '/userss',
			beforeEnter: authGuard,
			children: [
				{
					path: '',
					name: 'userss-list',
					component: UsersList,
				},
				{
					path: '/userss/create',
					name: 'userss-create',
					component: UsersEdit,
				},
				{
					path: '/userss/:id',
					name: 'userss-edit',
					component: UsersEdit,
				},
			],
		},
		/* GENERATOR(ROUTES) */
		{
			path: '/:pathMatch(.*)*',
			redirect: '/login',
		},
	],
})

export default router
