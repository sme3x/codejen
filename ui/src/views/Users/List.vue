<template>
	<Header
		:list-state="listState"
		search
		title="Userss" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="client_id"
				header="Client Id" />
			<Column
				field="salesforce_id"
				header="Salesforce Id" />
			<Column
				field="manualm_merge"
				header="Manualm Merge" />
			<Column
				field="sf_campaign_id"
				header="Sf Campaign Id" />
			<Column
				field="promo_code_id"
				header="Promo Code Id" />
			<Column
				field="promo_code_inserted"
				header="Promo Code Inserted" />
			<Column
				field="contact_source"
				header="Contact Source" />
			<Column
				field="first_name"
				header="First Name" />
			<Column
				field="last_name"
				header="Last Name" />
			<Column
				field="address"
				header="Address" />
			<Column
				field="postal_code"
				header="Postal Code" />
			<Column
				field="city"
				header="City" />
			<Column
				field="country"
				header="Country" />
			<Column
				field="phone"
				header="Phone" />
			<Column
				field="phone2"
				header="Phone2" />
			<Column
				field="email"
				header="Email" />
			<Column
				field="birthday"
				header="Birthday" />
			<Column
				field="client_sex"
				header="Client Sex" />
			<Column
				field="brand_id"
				header="Brand Id" />
			<Column
				field="domain"
				header="Domain" />
			<Column
				field="lang"
				header="Lang" />
			<Column
				field="source_table"
				header="Source Table" />
			<Column
				field="source_id"
				header="Source Id" />
			<Column
				field="vin"
				header="Vin" />
			<Column
				field="model_code"
				header="Model Code" />
			<Column
				field="model_index"
				header="Model Index" />
			<Column
				field="registration_plate_nr"
				header="Registration Plate Nr" />
			<Column
				field="categories"
				header="Categories" />
			<Column
				field="small_note"
				header="Small Note" />
			<Column
				field="bounced"
				header="Bounced" />
			<Column
				field="bounced_last_datetime"
				header="Bounced Last Datetime" />
			<Column
				field="enewsdisable"
				header="Enewsdisable" />
			<Column
				field="enewsdisable_datetime"
				header="Enewsdisable Datetime" />
			<Column
				field="email_status"
				header="Email Status" />
			<Column
				field="phonedisable"
				header="Phonedisable" />
			<Column
				field="phonedisable_datetime"
				header="Phonedisable Datetime" />
			<Column
				field="phone_status"
				header="Phone Status" />
			<Column
				field="profiling"
				header="Profiling" />
			<Column
				field="profiling_datetime"
				header="Profiling Datetime" />
			<Column
				field="manual_signup"
				header="Manual Signup" />
			<Column
				field="employee_id"
				header="Employee Id" />
			<Column
				field="employee_name"
				header="Employee Name" />
			<Column
				field="cost_carrier_id"
				header="Cost Carrier Id" />
			<Column
				field="anonymous"
				header="Anonymous" />
			<Column
				field="company_id"
				header="Company Id" />
			<Column
				field="anonymous_user_id"
				header="Anonymous User Id" />
			<Column
				field="anonymous_datetime"
				header="Anonymous Datetime" />
			<Column
				field="created"
				header="Created" />
			<Column
				field="created_user_id"
				header="Created User Id" />
			<Column
				field="modified"
				header="Modified" />
			<Column
				field="modified_user_id"
				header="Modified User Id" />
			<Column
				field="modified_action"
				header="Modified Action" />
			<Column
				:style="{ maxWidth: '72px', width: '72px' }"
				header="">
				<template #body="slotProps">
					<ApiTableRemoveButton :item="slotProps.data" />
				</template>
			</Column>
		</ApiTable>
	</Container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Container from '@/components/Container.vue'
import type { Users } from '@/interfaces/Users'
import UsersModel from '@/helpers/models/Users'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = UsersModel.useListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Users }) {
	router.push({ name: 'userss-edit', params: { id: item.data.id } })
}
</script>
