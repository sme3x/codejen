import { useAuthStore } from '@/stores/Auth'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export default async (to: RouteLocationNormalizedLoaded) => {
	const auth = useAuthStore()

	auth.setLastRoute(to.fullPath)
	if (!auth.user) {
		await auth.getUser()
		if (auth.user) {
			return to
		}

		return '/login'
	}
}
