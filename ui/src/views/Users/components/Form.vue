<template>
	<component
		:is="asDialog ? Dialog : Card"
		:visible="visible"
		border
		modal
		class="form"
		:header="props.isEdit ? 'Update Users' : 'Create Users'"
		@update:visible="emit('close')">
		<template
			v-if="!asDialog"
			#title>
			{{ props.isEdit ? 'Update Users' : 'Create Users' }}
		</template>
		<template #[contentSlot]>
			<form @submit.prevent="submit">
				<div
					v-if="!props.hideInputs.includes('client_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-client_id`">Client Id</label>
					<InputText
						v-model="form.client_id"
						:id="`${uuid}-client_id`"
						:disabled="!!props.forceValues.client_id"
						:class="{ 'form__input--error': formErrors.client_id }" />
					<small
						v-if="formErrors.client_id"
						class="form__input-error-message"
					>{{ formErrors.client_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('salesforce_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-salesforce_id`">Salesforce Id</label>
					<InputText
						v-model="form.salesforce_id"
						:id="`${uuid}-salesforce_id`"
						:disabled="!!props.forceValues.salesforce_id"
						:class="{ 'form__input--error': formErrors.salesforce_id }" />
					<small
						v-if="formErrors.salesforce_id"
						class="form__input-error-message"
					>{{ formErrors.salesforce_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('manualm_merge')"
					class="form__input-container"
				>
					<label :for="`${uuid}-manualm_merge`">Manualm Merge</label>
					<InputText
						v-model="form.manualm_merge"
						:id="`${uuid}-manualm_merge`"
						:disabled="!!props.forceValues.manualm_merge"
						:class="{ 'form__input--error': formErrors.manualm_merge }" />
					<small
						v-if="formErrors.manualm_merge"
						class="form__input-error-message"
					>{{ formErrors.manualm_merge }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('sf_campaign_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-sf_campaign_id`">Sf Campaign Id</label>
					<InputText
						v-model="form.sf_campaign_id"
						:id="`${uuid}-sf_campaign_id`"
						:disabled="!!props.forceValues.sf_campaign_id"
						:class="{ 'form__input--error': formErrors.sf_campaign_id }" />
					<small
						v-if="formErrors.sf_campaign_id"
						class="form__input-error-message"
					>{{ formErrors.sf_campaign_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('promo_code_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-promo_code_id`">Promo Code Id</label>
					<InputText
						v-model="form.promo_code_id"
						:id="`${uuid}-promo_code_id`"
						:disabled="!!props.forceValues.promo_code_id"
						:class="{ 'form__input--error': formErrors.promo_code_id }" />
					<small
						v-if="formErrors.promo_code_id"
						class="form__input-error-message"
					>{{ formErrors.promo_code_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('promo_code_inserted')"
					class="form__input-container"
				>
					<label :for="`${uuid}-promo_code_inserted`">Promo Code Inserted</label>
					<InputText
						v-model="form.promo_code_inserted"
						:id="`${uuid}-promo_code_inserted`"
						:disabled="!!props.forceValues.promo_code_inserted"
						:class="{ 'form__input--error': formErrors.promo_code_inserted }" />
					<small
						v-if="formErrors.promo_code_inserted"
						class="form__input-error-message"
					>{{ formErrors.promo_code_inserted }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('contact_source')"
					class="form__input-container"
				>
					<label :for="`${uuid}-contact_source`">Contact Source</label>
					<InputText
						v-model="form.contact_source"
						:id="`${uuid}-contact_source`"
						:disabled="!!props.forceValues.contact_source"
						:class="{ 'form__input--error': formErrors.contact_source }" />
					<small
						v-if="formErrors.contact_source"
						class="form__input-error-message"
					>{{ formErrors.contact_source }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('first_name')"
					class="form__input-container"
				>
					<label :for="`${uuid}-first_name`">First Name</label>
					<InputText
						v-model="form.first_name"
						:id="`${uuid}-first_name`"
						:disabled="!!props.forceValues.first_name"
						:class="{ 'form__input--error': formErrors.first_name }" />
					<small
						v-if="formErrors.first_name"
						class="form__input-error-message"
					>{{ formErrors.first_name }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('last_name')"
					class="form__input-container"
				>
					<label :for="`${uuid}-last_name`">Last Name</label>
					<InputText
						v-model="form.last_name"
						:id="`${uuid}-last_name`"
						:disabled="!!props.forceValues.last_name"
						:class="{ 'form__input--error': formErrors.last_name }" />
					<small
						v-if="formErrors.last_name"
						class="form__input-error-message"
					>{{ formErrors.last_name }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('address')"
					class="form__input-container"
				>
					<label :for="`${uuid}-address`">Address</label>
					<InputText
						v-model="form.address"
						:id="`${uuid}-address`"
						:disabled="!!props.forceValues.address"
						:class="{ 'form__input--error': formErrors.address }" />
					<small
						v-if="formErrors.address"
						class="form__input-error-message"
					>{{ formErrors.address }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('postal_code')"
					class="form__input-container"
				>
					<label :for="`${uuid}-postal_code`">Postal Code</label>
					<InputText
						v-model="form.postal_code"
						:id="`${uuid}-postal_code`"
						:disabled="!!props.forceValues.postal_code"
						:class="{ 'form__input--error': formErrors.postal_code }" />
					<small
						v-if="formErrors.postal_code"
						class="form__input-error-message"
					>{{ formErrors.postal_code }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('city')"
					class="form__input-container"
				>
					<label :for="`${uuid}-city`">City</label>
					<InputText
						v-model="form.city"
						:id="`${uuid}-city`"
						:disabled="!!props.forceValues.city"
						:class="{ 'form__input--error': formErrors.city }" />
					<small
						v-if="formErrors.city"
						class="form__input-error-message"
					>{{ formErrors.city }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('country')"
					class="form__input-container"
				>
					<label :for="`${uuid}-country`">Country</label>
					<InputText
						v-model="form.country"
						:id="`${uuid}-country`"
						:disabled="!!props.forceValues.country"
						:class="{ 'form__input--error': formErrors.country }" />
					<small
						v-if="formErrors.country"
						class="form__input-error-message"
					>{{ formErrors.country }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('phone')"
					class="form__input-container"
				>
					<label :for="`${uuid}-phone`">Phone</label>
					<InputText
						v-model="form.phone"
						:id="`${uuid}-phone`"
						:disabled="!!props.forceValues.phone"
						:class="{ 'form__input--error': formErrors.phone }" />
					<small
						v-if="formErrors.phone"
						class="form__input-error-message"
					>{{ formErrors.phone }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('phone2')"
					class="form__input-container"
				>
					<label :for="`${uuid}-phone2`">Phone2</label>
					<InputText
						v-model="form.phone2"
						:id="`${uuid}-phone2`"
						:disabled="!!props.forceValues.phone2"
						:class="{ 'form__input--error': formErrors.phone2 }" />
					<small
						v-if="formErrors.phone2"
						class="form__input-error-message"
					>{{ formErrors.phone2 }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('email')"
					class="form__input-container"
				>
					<label :for="`${uuid}-email`">Email</label>
					<InputText
						v-model="form.email"
						:id="`${uuid}-email`"
						:disabled="!!props.forceValues.email"
						:class="{ 'form__input--error': formErrors.email }" />
					<small
						v-if="formErrors.email"
						class="form__input-error-message"
					>{{ formErrors.email }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('birthday')"
					class="form__input-container"
				>
					<label :for="`${uuid}-birthday`">Birthday</label>
					<InputText
						v-model="form.birthday"
						:id="`${uuid}-birthday`"
						:disabled="!!props.forceValues.birthday"
						:class="{ 'form__input--error': formErrors.birthday }" />
					<small
						v-if="formErrors.birthday"
						class="form__input-error-message"
					>{{ formErrors.birthday }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('client_sex')"
					class="form__input-container"
				>
					<label :for="`${uuid}-client_sex`">Client Sex</label>
					<InputText
						v-model="form.client_sex"
						:id="`${uuid}-client_sex`"
						:disabled="!!props.forceValues.client_sex"
						:class="{ 'form__input--error': formErrors.client_sex }" />
					<small
						v-if="formErrors.client_sex"
						class="form__input-error-message"
					>{{ formErrors.client_sex }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('brand_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-brand_id`">Brand Id</label>
					<InputText
						v-model="form.brand_id"
						:id="`${uuid}-brand_id`"
						:disabled="!!props.forceValues.brand_id"
						:class="{ 'form__input--error': formErrors.brand_id }" />
					<small
						v-if="formErrors.brand_id"
						class="form__input-error-message"
					>{{ formErrors.brand_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('domain')"
					class="form__input-container"
				>
					<label :for="`${uuid}-domain`">Domain</label>
					<InputText
						v-model="form.domain"
						:id="`${uuid}-domain`"
						:disabled="!!props.forceValues.domain"
						:class="{ 'form__input--error': formErrors.domain }" />
					<small
						v-if="formErrors.domain"
						class="form__input-error-message"
					>{{ formErrors.domain }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('lang')"
					class="form__input-container"
				>
					<label :for="`${uuid}-lang`">Lang</label>
					<InputText
						v-model="form.lang"
						:id="`${uuid}-lang`"
						:disabled="!!props.forceValues.lang"
						:class="{ 'form__input--error': formErrors.lang }" />
					<small
						v-if="formErrors.lang"
						class="form__input-error-message"
					>{{ formErrors.lang }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('source_table')"
					class="form__input-container"
				>
					<label :for="`${uuid}-source_table`">Source Table</label>
					<InputText
						v-model="form.source_table"
						:id="`${uuid}-source_table`"
						:disabled="!!props.forceValues.source_table"
						:class="{ 'form__input--error': formErrors.source_table }" />
					<small
						v-if="formErrors.source_table"
						class="form__input-error-message"
					>{{ formErrors.source_table }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('source_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-source_id`">Source Id</label>
					<InputText
						v-model="form.source_id"
						:id="`${uuid}-source_id`"
						:disabled="!!props.forceValues.source_id"
						:class="{ 'form__input--error': formErrors.source_id }" />
					<small
						v-if="formErrors.source_id"
						class="form__input-error-message"
					>{{ formErrors.source_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('vin')"
					class="form__input-container"
				>
					<label :for="`${uuid}-vin`">Vin</label>
					<InputText
						v-model="form.vin"
						:id="`${uuid}-vin`"
						:disabled="!!props.forceValues.vin"
						:class="{ 'form__input--error': formErrors.vin }" />
					<small
						v-if="formErrors.vin"
						class="form__input-error-message"
					>{{ formErrors.vin }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('model_code')"
					class="form__input-container"
				>
					<label :for="`${uuid}-model_code`">Model Code</label>
					<InputText
						v-model="form.model_code"
						:id="`${uuid}-model_code`"
						:disabled="!!props.forceValues.model_code"
						:class="{ 'form__input--error': formErrors.model_code }" />
					<small
						v-if="formErrors.model_code"
						class="form__input-error-message"
					>{{ formErrors.model_code }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('model_index')"
					class="form__input-container"
				>
					<label :for="`${uuid}-model_index`">Model Index</label>
					<InputText
						v-model="form.model_index"
						:id="`${uuid}-model_index`"
						:disabled="!!props.forceValues.model_index"
						:class="{ 'form__input--error': formErrors.model_index }" />
					<small
						v-if="formErrors.model_index"
						class="form__input-error-message"
					>{{ formErrors.model_index }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('registration_plate_nr')"
					class="form__input-container"
				>
					<label :for="`${uuid}-registration_plate_nr`">Registration Plate Nr</label>
					<InputText
						v-model="form.registration_plate_nr"
						:id="`${uuid}-registration_plate_nr`"
						:disabled="!!props.forceValues.registration_plate_nr"
						:class="{ 'form__input--error': formErrors.registration_plate_nr }" />
					<small
						v-if="formErrors.registration_plate_nr"
						class="form__input-error-message"
					>{{ formErrors.registration_plate_nr }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('categories')"
					class="form__input-container"
				>
					<label :for="`${uuid}-categories`">Categories</label>
					<InputText
						v-model="form.categories"
						:id="`${uuid}-categories`"
						:disabled="!!props.forceValues.categories"
						:class="{ 'form__input--error': formErrors.categories }" />
					<small
						v-if="formErrors.categories"
						class="form__input-error-message"
					>{{ formErrors.categories }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('small_note')"
					class="form__input-container"
				>
					<label :for="`${uuid}-small_note`">Small Note</label>
					<InputText
						v-model="form.small_note"
						:id="`${uuid}-small_note`"
						:disabled="!!props.forceValues.small_note"
						:class="{ 'form__input--error': formErrors.small_note }" />
					<small
						v-if="formErrors.small_note"
						class="form__input-error-message"
					>{{ formErrors.small_note }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('bounced')"
					class="form__input-container"
				>
					<label :for="`${uuid}-bounced`">Bounced</label>
					<InputText
						v-model="form.bounced"
						:id="`${uuid}-bounced`"
						:disabled="!!props.forceValues.bounced"
						:class="{ 'form__input--error': formErrors.bounced }" />
					<small
						v-if="formErrors.bounced"
						class="form__input-error-message"
					>{{ formErrors.bounced }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('bounced_last_datetime')"
					class="form__input-container"
				>
					<label :for="`${uuid}-bounced_last_datetime`">Bounced Last Datetime</label>
					<InputText
						v-model="form.bounced_last_datetime"
						:id="`${uuid}-bounced_last_datetime`"
						:disabled="!!props.forceValues.bounced_last_datetime"
						:class="{ 'form__input--error': formErrors.bounced_last_datetime }" />
					<small
						v-if="formErrors.bounced_last_datetime"
						class="form__input-error-message"
					>{{ formErrors.bounced_last_datetime }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('enewsdisable')"
					class="form__input-container"
				>
					<label :for="`${uuid}-enewsdisable`">Enewsdisable</label>
					<InputText
						v-model="form.enewsdisable"
						:id="`${uuid}-enewsdisable`"
						:disabled="!!props.forceValues.enewsdisable"
						:class="{ 'form__input--error': formErrors.enewsdisable }" />
					<small
						v-if="formErrors.enewsdisable"
						class="form__input-error-message"
					>{{ formErrors.enewsdisable }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('enewsdisable_datetime')"
					class="form__input-container"
				>
					<label :for="`${uuid}-enewsdisable_datetime`">Enewsdisable Datetime</label>
					<InputText
						v-model="form.enewsdisable_datetime"
						:id="`${uuid}-enewsdisable_datetime`"
						:disabled="!!props.forceValues.enewsdisable_datetime"
						:class="{ 'form__input--error': formErrors.enewsdisable_datetime }" />
					<small
						v-if="formErrors.enewsdisable_datetime"
						class="form__input-error-message"
					>{{ formErrors.enewsdisable_datetime }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('email_status')"
					class="form__input-container"
				>
					<label :for="`${uuid}-email_status`">Email Status</label>
					<InputText
						v-model="form.email_status"
						:id="`${uuid}-email_status`"
						:disabled="!!props.forceValues.email_status"
						:class="{ 'form__input--error': formErrors.email_status }" />
					<small
						v-if="formErrors.email_status"
						class="form__input-error-message"
					>{{ formErrors.email_status }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('phonedisable')"
					class="form__input-container"
				>
					<label :for="`${uuid}-phonedisable`">Phonedisable</label>
					<InputText
						v-model="form.phonedisable"
						:id="`${uuid}-phonedisable`"
						:disabled="!!props.forceValues.phonedisable"
						:class="{ 'form__input--error': formErrors.phonedisable }" />
					<small
						v-if="formErrors.phonedisable"
						class="form__input-error-message"
					>{{ formErrors.phonedisable }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('phonedisable_datetime')"
					class="form__input-container"
				>
					<label :for="`${uuid}-phonedisable_datetime`">Phonedisable Datetime</label>
					<InputText
						v-model="form.phonedisable_datetime"
						:id="`${uuid}-phonedisable_datetime`"
						:disabled="!!props.forceValues.phonedisable_datetime"
						:class="{ 'form__input--error': formErrors.phonedisable_datetime }" />
					<small
						v-if="formErrors.phonedisable_datetime"
						class="form__input-error-message"
					>{{ formErrors.phonedisable_datetime }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('phone_status')"
					class="form__input-container"
				>
					<label :for="`${uuid}-phone_status`">Phone Status</label>
					<InputText
						v-model="form.phone_status"
						:id="`${uuid}-phone_status`"
						:disabled="!!props.forceValues.phone_status"
						:class="{ 'form__input--error': formErrors.phone_status }" />
					<small
						v-if="formErrors.phone_status"
						class="form__input-error-message"
					>{{ formErrors.phone_status }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('profiling')"
					class="form__input-container"
				>
					<label :for="`${uuid}-profiling`">Profiling</label>
					<InputText
						v-model="form.profiling"
						:id="`${uuid}-profiling`"
						:disabled="!!props.forceValues.profiling"
						:class="{ 'form__input--error': formErrors.profiling }" />
					<small
						v-if="formErrors.profiling"
						class="form__input-error-message"
					>{{ formErrors.profiling }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('profiling_datetime')"
					class="form__input-container"
				>
					<label :for="`${uuid}-profiling_datetime`">Profiling Datetime</label>
					<InputText
						v-model="form.profiling_datetime"
						:id="`${uuid}-profiling_datetime`"
						:disabled="!!props.forceValues.profiling_datetime"
						:class="{ 'form__input--error': formErrors.profiling_datetime }" />
					<small
						v-if="formErrors.profiling_datetime"
						class="form__input-error-message"
					>{{ formErrors.profiling_datetime }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('manual_signup')"
					class="form__input-container"
				>
					<label :for="`${uuid}-manual_signup`">Manual Signup</label>
					<InputText
						v-model="form.manual_signup"
						:id="`${uuid}-manual_signup`"
						:disabled="!!props.forceValues.manual_signup"
						:class="{ 'form__input--error': formErrors.manual_signup }" />
					<small
						v-if="formErrors.manual_signup"
						class="form__input-error-message"
					>{{ formErrors.manual_signup }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('employee_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-employee_id`">Employee Id</label>
					<InputText
						v-model="form.employee_id"
						:id="`${uuid}-employee_id`"
						:disabled="!!props.forceValues.employee_id"
						:class="{ 'form__input--error': formErrors.employee_id }" />
					<small
						v-if="formErrors.employee_id"
						class="form__input-error-message"
					>{{ formErrors.employee_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('employee_name')"
					class="form__input-container"
				>
					<label :for="`${uuid}-employee_name`">Employee Name</label>
					<InputText
						v-model="form.employee_name"
						:id="`${uuid}-employee_name`"
						:disabled="!!props.forceValues.employee_name"
						:class="{ 'form__input--error': formErrors.employee_name }" />
					<small
						v-if="formErrors.employee_name"
						class="form__input-error-message"
					>{{ formErrors.employee_name }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('cost_carrier_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-cost_carrier_id`">Cost Carrier Id</label>
					<InputText
						v-model="form.cost_carrier_id"
						:id="`${uuid}-cost_carrier_id`"
						:disabled="!!props.forceValues.cost_carrier_id"
						:class="{ 'form__input--error': formErrors.cost_carrier_id }" />
					<small
						v-if="formErrors.cost_carrier_id"
						class="form__input-error-message"
					>{{ formErrors.cost_carrier_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('anonymous')"
					class="form__input-container"
				>
					<label :for="`${uuid}-anonymous`">Anonymous</label>
					<InputText
						v-model="form.anonymous"
						:id="`${uuid}-anonymous`"
						:disabled="!!props.forceValues.anonymous"
						:class="{ 'form__input--error': formErrors.anonymous }" />
					<small
						v-if="formErrors.anonymous"
						class="form__input-error-message"
					>{{ formErrors.anonymous }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('company_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-company_id`">Company Id</label>
					<InputText
						v-model="form.company_id"
						:id="`${uuid}-company_id`"
						:disabled="!!props.forceValues.company_id"
						:class="{ 'form__input--error': formErrors.company_id }" />
					<small
						v-if="formErrors.company_id"
						class="form__input-error-message"
					>{{ formErrors.company_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('anonymous_user_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-anonymous_user_id`">Anonymous User Id</label>
					<InputText
						v-model="form.anonymous_user_id"
						:id="`${uuid}-anonymous_user_id`"
						:disabled="!!props.forceValues.anonymous_user_id"
						:class="{ 'form__input--error': formErrors.anonymous_user_id }" />
					<small
						v-if="formErrors.anonymous_user_id"
						class="form__input-error-message"
					>{{ formErrors.anonymous_user_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('anonymous_datetime')"
					class="form__input-container"
				>
					<label :for="`${uuid}-anonymous_datetime`">Anonymous Datetime</label>
					<InputText
						v-model="form.anonymous_datetime"
						:id="`${uuid}-anonymous_datetime`"
						:disabled="!!props.forceValues.anonymous_datetime"
						:class="{ 'form__input--error': formErrors.anonymous_datetime }" />
					<small
						v-if="formErrors.anonymous_datetime"
						class="form__input-error-message"
					>{{ formErrors.anonymous_datetime }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('created')"
					class="form__input-container"
				>
					<label :for="`${uuid}-created`">Created</label>
					<InputText
						v-model="form.created"
						:id="`${uuid}-created`"
						:disabled="!!props.forceValues.created"
						:class="{ 'form__input--error': formErrors.created }" />
					<small
						v-if="formErrors.created"
						class="form__input-error-message"
					>{{ formErrors.created }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('created_user_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-created_user_id`">Created User Id</label>
					<InputText
						v-model="form.created_user_id"
						:id="`${uuid}-created_user_id`"
						:disabled="!!props.forceValues.created_user_id"
						:class="{ 'form__input--error': formErrors.created_user_id }" />
					<small
						v-if="formErrors.created_user_id"
						class="form__input-error-message"
					>{{ formErrors.created_user_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('modified')"
					class="form__input-container"
				>
					<label :for="`${uuid}-modified`">Modified</label>
					<InputText
						v-model="form.modified"
						:id="`${uuid}-modified`"
						:disabled="!!props.forceValues.modified"
						:class="{ 'form__input--error': formErrors.modified }" />
					<small
						v-if="formErrors.modified"
						class="form__input-error-message"
					>{{ formErrors.modified }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('modified_user_id')"
					class="form__input-container"
				>
					<label :for="`${uuid}-modified_user_id`">Modified User Id</label>
					<InputText
						v-model="form.modified_user_id"
						:id="`${uuid}-modified_user_id`"
						:disabled="!!props.forceValues.modified_user_id"
						:class="{ 'form__input--error': formErrors.modified_user_id }" />
					<small
						v-if="formErrors.modified_user_id"
						class="form__input-error-message"
					>{{ formErrors.modified_user_id }}</small>
				</div>
				<div
					v-if="!props.hideInputs.includes('modified_action')"
					class="form__input-container"
				>
					<label :for="`${uuid}-modified_action`">Modified Action</label>
					<InputText
						v-model="form.modified_action"
						:id="`${uuid}-modified_action`"
						:disabled="!!props.forceValues.modified_action"
						:class="{ 'form__input--error': formErrors.modified_action }" />
					<small
						v-if="formErrors.modified_action"
						class="form__input-error-message"
					>{{ formErrors.modified_action }}</small>
				</div>
				<Button
					:loading="loading"
					icon="fal fa-save"
					:label="isEdit ? 'Update' : 'Create'"
					type="submit"
					@submit.prevent="submit" />
			</form>
		</template>
	</component>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount, toRaw, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import UserssApi from '@/models/Users/Api'
import type { Users } from '@/models/Users/Model'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

const emit = defineEmits(['start-loading', 'stop-loading', 'close', 'created', 'updated'])
const props = withDefaults(
	defineProps<{
		isEdit?: boolean
		id?: Users['id']
		hideInputs?: (keyof (typeof form)['value'])[]
		defaultValues?: Partial<(typeof form)['value']>
		forceValues?: Partial<(typeof form)['value']>
		shouldRedirect?: boolean
		attachTo?: Record<string, { method: 'associate' | 'syncWithoutDetaching'; id: string | number }>
		asDialog?: boolean
		visible?: boolean
	}>(),
	{
		id: undefined,
		hideInputs: () => [],
		defaultValues: () => ({}),
		forceValues: () => ({}),
		shouldRedirect: true,
		attachTo: undefined,
		asDialog: false,
		visible: false,
	},
)

const instance = getCurrentInstance()
const uuid = ref(instance!.uid)
const router = useRouter()
const form = ref(getDefaultForm())
const loading = ref(false)
const formErrors = ref<Record<string, string>>({})

const contentSlot = computed(() => (props.asDialog ? 'default' : 'content'))

watch(loading, (val: boolean) => {
	if (val) emit('start-loading')
	else emit('stop-loading')
})

onBeforeMount(reset)

async function reset() {
	if (props.defaultValues) {
		populateForm(props.defaultValues)
	}
	if (props.isEdit) {
		loading.value = true
		populateForm(await getDetails())
	}
}

function getDefaultForm() {
	return {
		client_id: '',
		salesforce_id: '',
		manualm_merge: '',
		sf_campaign_id: '',
		promo_code_id: '',
		promo_code_inserted: '',
		contact_source: '',
		first_name: '',
		last_name: '',
		address: '',
		postal_code: '',
		city: '',
		country: '',
		phone: '',
		phone2: '',
		email: '',
		birthday: '',
		client_sex: '',
		brand_id: '',
		domain: '',
		lang: '',
		source_table: '',
		source_id: '',
		vin: '',
		model_code: '',
		model_index: '',
		registration_plate_nr: '',
		categories: '',
		small_note: '',
		bounced: '',
		bounced_last_datetime: '',
		enewsdisable: '',
		enewsdisable_datetime: '',
		email_status: '',
		phonedisable: '',
		phonedisable_datetime: '',
		phone_status: '',
		profiling: '',
		profiling_datetime: '',
		manual_signup: '',
		employee_id: '',
		employee_name: '',
		cost_carrier_id: '',
		anonymous: '',
		company_id: '',
		anonymous_user_id: '',
		anonymous_datetime: '',
		created: '',
		created_user_id: '',
		modified: '',
		modified_user_id: '',
		modified_action: '',
	}
}

async function getDetails() {
	loading.value = true
	let res = await new UserssApi().show(props.id!)
	loading.value = false
	return res.data
}

function populateForm(entity: Partial<(typeof form)['value']>) {
	Object.assign(form.value, { ...getDefaultForm(), ...entity })
}

async function create() {
	formErrors.value = {}
	loading.value = true
	try {
		let params = structuredClone(toRaw(form.value))
		Object.assign(params, props.forceValues ?? {})
		let res = await new UserssApi().store(params)
		await attachToAll(res.data.id)
		emit('created')
		return res.data
	} catch (error: any) {
		if (error.response?.status === 422 && error.response?.data?.errors) {
			Object.entries(error.response?.data?.errors).forEach(([key, value]) => {
				formErrors.value[key] = (value as string[])[0]
			})
		}
		throw error
	} finally {
		loading.value = false
	}
}

async function update() {
	formErrors.value = {}
	loading.value = true
	try {
		let params = structuredClone(toRaw(form.value))
		Object.assign(params, props.forceValues ?? {})
		let res = await new UserssApi().update(props.id!, params)
		await attachToAll(res.data.id)
		emit('updated')
		return res.data
	} catch (error: any) {
		if (error.response?.status === 422 && error.response?.data?.errors) {
			Object.entries(error.response?.data?.errors).forEach(([key, value]) => {
				formErrors.value[key] = (value as string[])[0]
			})
		}
		throw error
	} finally {
		loading.value = false
	}
}

async function attachToAll(id: string | number) {
	if (!props.attachTo) return
	for (let [key, value] of Object.entries(props.attachTo)) {
		loading.value = true
		try {
			await new UserssApi().updateRelation(id, key, {
				method: value.method,
				params: [value.id],
			})
		} finally {
			loading.value = false
		}
	}
}

async function submit() {
	if (props.isEdit && props.id) {
		update()
	} else {
		let entity = await create()
		if (props.shouldRedirect) {
			router.push({ name: 'userss-edit', params: { id: entity!.id } })
		}
	}
	emit('close')
}
</script>

<style lang="scss">
.form {
	width: 100%;
	max-width: 600px;

	.form__title-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;

		& > * {
			width: 100%;
		}

		.form__input-container {
			display: flex;
			flex-direction: column;
			gap: 5px;
			margin-bottom: 10px;

			.form__input-error-message {
				color: var(--p-red-500);
			}

			.form__input--error {
				border-color: var(--p-red-500);
			}
		}
	}
}
</style>
