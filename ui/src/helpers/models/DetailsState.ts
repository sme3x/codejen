import type { IApi } from '@/helpers/models/Api'
import { ref } from 'vue'
import type { Ref } from 'vue'

export default class DetailsState<A extends IApi<M>, M extends { id: number | string }> {
	api!: A
	isLoaded: Ref<boolean> = ref(false)
	isLoading: Ref<boolean> = ref(false)
	details: Ref<M | null> = ref(null)

	async getDetails(id: Parameters<A['show']>[0], params?: Parameters<A['show']>[1]) {
		if (this.isLoading.value) return
		this.isLoading.value = true
		const response = await this.api.show(id, params)
		this.details.value = response.data
		this.isLoading.value = false
		this.isLoaded.value = true
	}

	async update(params: Parameters<A['update']>[1]) {
		if (!this.isLoaded.value || !this.details.value) return
		if (this.isLoading.value) return
		this.isLoading.value = true
		const response = await this.api.update(this.details.value.id, params)
		this.details.value = response.data
		this.isLoading.value = false
	}
}
