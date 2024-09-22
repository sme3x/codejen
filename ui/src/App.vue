<template>
	<div class="app">
		<Navigation
			v-if="authStore.user"
			permanent />
		<main>
			<Suspense>
				<RouterView />
			</Suspense>
		</main>
		<Toast position="bottom-right" />
		<ConfirmDialog></ConfirmDialog>
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(async () => {
	axios.interceptors.response.use(
		async (response) => {
			return response
		},
		async (error) => {
			const auth = useAuthStore()
			if (error.response?.status === 401) {
				await auth.logout()
				if (
					router.currentRoute.value.path !== '/register' &&
					router.currentRoute.value.path !== '/login'
				) {
					router.push('/login')
					return
				}
			} else {
				if (error.response?.data?.message && error.response?.data?.message !== 'Unauthenticated.') {
					toast.add({
						severity: 'error',
						summary: 'API Error',
						detail: error.response?.data?.message,
						life: 3000,
					})
				} else {
					toast.add({
						severity: 'error',
						summary: 'API Error',
						detail: error.message,
						life: 3000,
					})
				}
			}
			return Promise.reject(error)
		},
	)
	await authStore.getUser()
	router.push(authStore.lastRoute)
})
</script>

<style scoped lang="scss">
:deep(*) a {
	// TODO: Move to global styles
	text-decoration: none;
}

.app {
	display: flex;
	flex-direction: row;
	height: 100vh;
	width: 100%;
	justify-content: center;
	max-height: 100vh;
	overflow: auto;

	main {
		flex: 1;
		max-height: 100vh;
		overflow: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>
