import type { User } from '@/models/User/Model'
import UsersApi from '@/models/User/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class UserDetailsState extends DetailsState<UsersApi, User> {
	api = new UsersApi()
}

export function useUserDetailsState() {
	return new UserDetailsState()
}

export class UserListState extends ListState<UsersApi, User, LaravelPaginationResponse<User>> {
	api = new UsersApi()
}

export function useUserListState() {
	return new UserListState()
}
