import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'
import { ref } from 'vue'
import type { Ref } from 'vue'
import QueryBuilder from './QueryBuilder'
import type { IApi } from './Api'
import type {
	FullLaravelPaginationMeta,
	MinimalLaravelPaginationMeta,
} from '@/interfaces/models/Laravel'

export function makeMinimalLaravelPaginationMeta(
	meta?: Partial<FullLaravelPaginationMeta>,
): MinimalLaravelPaginationMeta {
	return {
		current_page: meta?.current_page ?? 1,
		from: meta?.from ?? 1,
		last_page: meta?.last_page ?? 1,
		per_page: meta?.per_page ?? 0,
		to: meta?.to ?? 0,
		total: meta?.total ?? 0,
	}
}

class ListStateQueryBuilder extends QueryBuilder {
	constructor(private listState: ListState<any, any, any>) {
		super()
	}

	getList(params: Parameters<(typeof this.listState)['getList']>) {
		return this.listState.getList({ filters: [this.getFilter()], ...params })
	}
}

export default class ListState<
	A extends IApi<M, MList>,
	M extends { id: number | string },
	MList extends LaravelPaginationResponse<M>,
> {
	api!: A
	list: Ref<Array<M>> = ref([])
	pagination = ref(makeMinimalLaravelPaginationMeta())
	isLoaded: Ref<boolean> = ref(false)
	isLoading: Ref<boolean> = ref(false)
	defaultParams: Parameters<A['index']>[0] = {}

	query() {
		return new ListStateQueryBuilder(this)
	}

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
		try {
			const response = await this.api.index(params)
			this.list.value = response.data.data
			this.pagination.value = makeMinimalLaravelPaginationMeta(response.data)
			this.isLoaded.value = true
		} finally {
			this.isLoading.value = false
		}
	}
}
