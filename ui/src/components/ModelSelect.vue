<template>
	<Select
		v-model="model as any"
		option-value="id"
		:loading
		filter
		:options
		:virtual-scroller-options="{
			lazy: true,
			onLazyLoad: fetchItems,
			itemSize: 38,
			showLoader: true,
			loading: loading,
		}">
	</Select>
</template>

<script
	setup
	lang="ts"
	generic="M extends { id: string | number }, MList extends LaravelPaginationResponse<M>">
import type { IApi } from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'
import { onBeforeMount, ref } from 'vue'
import Select from 'primevue/select'
import QueryBuilder from '@/helpers/models/QueryBuilder'

const model = defineModel<M['id'] | undefined>({ required: true })

const props = defineProps<{
	api: IApi<M, MList>
	disabled?: boolean
}>()

const loading = ref(false)
const options = ref<M[]>([])
const page = ref(1)
const lastPage = ref(2)

const fetchItems = async () => {
	if (loading.value) return
	if (page.value > lastPage.value) return
	loading.value = true
	const data = (await props.api.index({ page: page.value })).data
	lastPage.value = data.last_page
	data.data.forEach((item: any) => {
		if (options.value.find((i) => i.id === item.id)) return
		options.value.push(item)
	})
	page.value += 1
	loading.value = false
}

async function fetchSelected() {
	if (!model.value) return
	const item = options.value.find((i) => i.id === model.value)
	if (item) return
	const selected = (
		await props.api.index({
			filters: [new QueryBuilder().where('id', '=', model.value).getFilter()],
		})
	).data
	if (selected.data.length) options.value.unshift(selected.data[0] as any)
}

onBeforeMount(async () => {
	await fetchItems()
	fetchSelected()
})
</script>
