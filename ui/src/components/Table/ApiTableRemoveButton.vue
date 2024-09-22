<template>
	<Button
		icon="fal fa-trash"
		severity="secondary"
		text
		rounded
		@click.stop="remove(item.id)" />
</template>

<script
	setup
	lang="ts"
	generic="
		A extends IApi<M, MList>,
		M extends { id: number | string },
		MList extends LaravelPaginationResponse<M>
	">
import { defineProps, inject, type PropType } from 'vue'
import type { IApi } from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'
import { createInjectionKey } from './ApiTable.vue'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
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
	confirm.require({
		message: `Are you sure you want to delete the this item?`,
		header: 'Danger Zone',
		icon: 'fa fa-exclamation-triangle',
		rejectLabel: 'Cancel',
		rejectProps: {
			label: 'Cancel',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Delete',
			severity: 'danger',
		},
		accept: async () => {
			await listState!.api.destroy(id)
			listState!.getList()
		},
		reject: () => {},
	})
}
</script>
