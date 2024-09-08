<template>
	<Button
		icon="far fa-trash"
		severity="secondary"
		outlined
		rounded
		text
		@click.stop="remove(item.id)" />
</template>

<script
	setup
	lang="ts"
	generic="
		A extends Api<M, MList>,
		M extends { id: number | string },
		MList extends LaravelPaginationResponse<M>
	">
import { defineProps, inject, type PropType } from 'vue'
import type { Api } from '@/interfaces/Api'
import type { LaravelPaginationResponse } from '@/interfaces/Laravel'
import { createInjectionKey } from './ApiTable.vue'
import Button from 'primevue/button'

const dataTableInjectionKey = createInjectionKey<A, M, MList>()
const injectedProps = inject(dataTableInjectionKey)
if (!injectedProps) throw new Error('ApiTableActions must be used inside ApiTable')
const listState = injectedProps.listState
if (!listState) throw new Error('ApiTableActions must be used inside ApiTable with listState')

defineProps({
	item: {
		type: Object as PropType<M>,
		required: true,
	} as any,
})
defineSlots<{
	actions(): any
}>()

async function remove(id: M['id']) {
	await listState!.api.destroy(id)
	listState!.getList()
}
</script>
