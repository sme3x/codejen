import type { Api } from '@/interfaces/Api'
import type { LaravelPaginationResponse } from '@/interfaces/Laravel'
import { makeMinimalLaravelPaginationMeta } from '@/helpers/Laravel'
import { ref } from 'vue'
import type { Ref } from 'vue'

export default class ListState<
	A extends Api<M, MList>,
	M extends { id: number | string },
	MList extends LaravelPaginationResponse<M>,
> {
	api!: A
	list: Ref<Array<M>> = ref([])
	pagination = ref(makeMinimalLaravelPaginationMeta())
	isLoaded: Ref<boolean> = ref(false)
	isLoading: Ref<boolean> = ref(false)
	defaultParams: Parameters<A['index']>[0] = {}

	async getList(
		params: Parameters<A['index']>[0] = {
			page: this.pagination.value.current_page,
		},
	) {
		if (this.isLoading.value) return
		params = { ...this.defaultParams, ...params }
		if (params.page === undefined) {
			params.page = this.pagination.value.current_page
		}
		this.isLoading.value = true
		const response = await this.api.index(params)
		this.list.value = response.data.data
		this.pagination.value = makeMinimalLaravelPaginationMeta(response.data)
		this.isLoading.value = false
		this.isLoaded.value = true
	}
}
