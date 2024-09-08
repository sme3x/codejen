import type { Api } from '@/interfaces/Api'
import ListState from '@/helpers/states/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/Laravel'
import type { Title } from '@/interfaces/Model'

export class Model<
	A extends Api<T, TList, TStorePayload, TUpdatePayload, TUpdateRelationPayload>,
	L extends ListState<A, T, TList>,
	T extends { id: number | string },
	TList extends LaravelPaginationResponse<T>,
	TStorePayload,
	TUpdatePayload,
	TUpdateRelationPayload,
> {
	api!: A
	useListState!: () => L
	title!: Title
}
