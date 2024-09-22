import type { IApi } from '@/helpers/models/Api'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'
import type DetailsState from './DetailsState'

export class Model<
	TApi extends IApi<T, TList, TStorePayload, TUpdatePayload>,
	TListState extends ListState<TApi, T, TList>,
	TDetailsState extends DetailsState<TApi, T>,
	T extends { id: number | string },
	TList extends LaravelPaginationResponse<T>,
	TStorePayload,
	TUpdatePayload,
> {
	title!: keyof T

	api!: TApi

	useListState!: () => TListState
	useDetailsState!: () => TDetailsState
}
