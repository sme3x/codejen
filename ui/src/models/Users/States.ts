import type { Users } from '@/models/Users/Model'
import UserssApi from '@/models/Users/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class UsersDetailsState extends DetailsState<UserssApi, Users> {
	api = new UserssApi()
}

export function useUsersDetailsState() {
	return new UsersDetailsState()
}

export class UsersListState extends ListState<UserssApi, Users, LaravelPaginationResponse<Users>> {
	api = new UserssApi()
}

export function useUsersListState() {
	return new UsersListState()
}
