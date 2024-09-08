<template>
	<div
		class="ui-api-table"
		:class="{ 'ui-api-table--flat': flat }">
		<Card class="ui-api-table__container-card">
			<template #content>
				<DataTable
					class="ui-api-table__table"
					:value="listState.list.value"
					v-bind="$attrs"
					@row-click="emit('row-click', $event)">
					<slot></slot>
				</DataTable>
				<Paginator
					class="mt-5"
					:model-value="props.listState.pagination.value.current_page"
					:rows="listState.pagination.value.per_page"
					:total-records="props.listState.pagination.value.total"
					@page="getList($event)"></Paginator>
			</template>
		</Card>
	</div>
</template>

<script lang="ts">
import DataTable from 'primevue/datatable'
import Paginator from 'primevue/paginator'
import Card from 'primevue/card'

export interface ApiTableInjectionType<
	A extends Api<M, MList>,
	M extends { id: number | string },
	MList extends LaravelPaginationResponse<M>,
> {
	listState: ListState<A, M, MList> | undefined
	selectable: boolean
	selected: Set<M>
	isLoading: Ref<boolean>
}

const injectionSymbol = Symbol('ApiTableInject')

export function createInjectionKey<
	A extends Api<M, MList>,
	M extends { id: number | string },
	MList extends LaravelPaginationResponse<M>,
>() {
	return injectionSymbol as InjectionKey<ApiTableInjectionType<A, M, MList>>
}
</script>

<script
	setup
	lang="ts"
	generic="
		A extends Api<M, MList>,
		M extends { id: number | string },
		MList extends LaravelPaginationResponse<M>
	">
import {
	defineProps,
	computed,
	defineEmits,
	defineOptions,
	type PropType,
	type InjectionKey,
	provide,
	reactive,
	type Ref,
} from 'vue'
import ListState from '@/helpers/states/ListState'
import type { Api } from '@/interfaces/Api'
import type { LaravelPaginationResponse } from '@/interfaces/Laravel'

defineOptions({
	inheritAttrs: false,
})

const emit = defineEmits(['get-list', 'update:pagination-page', 'row-click'])

const props = defineProps({
	listState: {
		type: ListState<A, M, MList>,
		required: true,
	},
	loading: {
		type: Boolean,
		required: false,
	},
	selectable: {
		type: Boolean,
		default: false,
	},
	selected: {
		type: Set as PropType<Set<M>>,
		default: () => reactive(new Set()),
	},
	maxHeight: {
		type: [Number, String],
		default: 'auto',
	},
	flat: {
		type: Boolean,
		default: false,
	},
})

const isLoading = computed(() => {
	return props.loading || !!props.listState?.isLoading.value
})

function getList(page: { page: number }) {
	if (props.listState) {
		props.listState.getList({ page: page.page + 1 })
	}
	emit('update:pagination-page', page.page + 1)
}

const injectionKey = createInjectionKey<A, M, MList>()
const providedData: ApiTableInjectionType<A, M, MList> = {
	listState: props.listState,
	selectable: props.selectable,
	selected: props.selected,
	isLoading: isLoading,
}
provide(injectionKey, providedData)

const maxHeightPx = computed(() => {
	if (props.maxHeight === 'auto') {
		return 'none'
	}
	return `${props.maxHeight}px`
})
</script>

<style scoped lang="scss">
.ui-api-table {
	&--flat {
		border-radius: 0;
		box-shadow: none;
		border-top: solid 1px var(--p-datatable-border-color);
	}

	.ui-api-table__container-card {
		overflow: hidden;

		&:deep(.p-card-body) {
			overflow: auto;
			padding: 0;

			.ui-api-table__table {
				max-height: v-bind(maxHeightPx);
			}
		}
	}
}
</style>
