import type { LaravelPaginationResponse } from './Laravel'
import type { Title } from './Model'

export interface UsersStorePayload {
	client_id?: string
	salesforce_id?: string
	manualm_merge?: string
	sf_campaign_id?: string
	promo_code_id?: string
	promo_code_inserted?: string
	contact_source?: string
	first_name?: string
	last_name?: string
	address?: string
	postal_code?: string
	city?: string
	country?: string
	phone?: string
	phone2?: string
	email?: string
	birthday?: string
	client_sex?: string
	brand_id?: string
	domain?: string
	lang?: string
	source_table?: string
	source_id?: string
	vin?: string
	model_code?: string
	model_index?: string
	registration_plate_nr?: string
	categories?: string
	small_note?: string
	bounced?: string
	bounced_last_datetime?: string
	enewsdisable?: string
	enewsdisable_datetime?: string
	email_status?: string
	phonedisable?: string
	phonedisable_datetime?: string
	phone_status?: string
	profiling?: string
	profiling_datetime?: string
	manual_signup?: string
	employee_id?: string
	employee_name?: string
	cost_carrier_id?: string
	anonymous?: string
	company_id?: string
	anonymous_user_id?: string
	anonymous_datetime?: string
	created?: string
	created_user_id?: string
	modified?: string
	modified_user_id?: string
	modified_action?: string
}

export interface UsersUpdatePayload {
	client_id?: string
	salesforce_id?: string
	manualm_merge?: string
	sf_campaign_id?: string
	promo_code_id?: string
	promo_code_inserted?: string
	contact_source?: string
	first_name?: string
	last_name?: string
	address?: string
	postal_code?: string
	city?: string
	country?: string
	phone?: string
	phone2?: string
	email?: string
	birthday?: string
	client_sex?: string
	brand_id?: string
	domain?: string
	lang?: string
	source_table?: string
	source_id?: string
	vin?: string
	model_code?: string
	model_index?: string
	registration_plate_nr?: string
	categories?: string
	small_note?: string
	bounced?: string
	bounced_last_datetime?: string
	enewsdisable?: string
	enewsdisable_datetime?: string
	email_status?: string
	phonedisable?: string
	phonedisable_datetime?: string
	phone_status?: string
	profiling?: string
	profiling_datetime?: string
	manual_signup?: string
	employee_id?: string
	employee_name?: string
	cost_carrier_id?: string
	anonymous?: string
	company_id?: string
	anonymous_user_id?: string
	anonymous_datetime?: string
	created?: string
	created_user_id?: string
	modified?: string
	modified_user_id?: string
	modified_action?: string
}

export interface UsersUpdateRelationPayload {
	method: string
	params: any
}

export interface Users {
	id: string | number
	client_id?: string
	salesforce_id?: string
	manualm_merge?: string
	sf_campaign_id?: string
	promo_code_id?: string
	promo_code_inserted?: string
	contact_source?: string
	first_name?: string
	last_name?: string
	address?: string
	postal_code?: string
	city?: string
	country?: string
	phone?: string
	phone2?: string
	email?: string
	birthday?: string
	client_sex?: string
	brand_id?: string
	domain?: string
	lang?: string
	source_table?: string
	source_id?: string
	vin?: string
	model_code?: string
	model_index?: string
	registration_plate_nr?: string
	categories?: string
	small_note?: string
	bounced?: string
	bounced_last_datetime?: string
	enewsdisable?: string
	enewsdisable_datetime?: string
	email_status?: string
	phonedisable?: string
	phonedisable_datetime?: string
	phone_status?: string
	profiling?: string
	profiling_datetime?: string
	manual_signup?: string
	employee_id?: string
	employee_name?: string
	cost_carrier_id?: string
	anonymous?: string
	company_id?: string
	anonymous_user_id?: string
	anonymous_datetime?: string
	created?: string
	created_user_id?: string
	modified?: string
	modified_user_id?: string
	modified_action?: string
	created_at: string
	updated_at: string
}

export interface UsersList extends LaravelPaginationResponse<Users> {}

export const title: Title = 'client_id'
