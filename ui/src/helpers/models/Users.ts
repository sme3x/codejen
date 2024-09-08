import {
	title,
	type Users as UsersType,
	type UsersList,
	type UsersStorePayload,
	type UsersUpdatePayload,
	type UsersUpdateRelationPayload,
} from '@/interfaces/Users'
import UserssApi from '../api/UserssApi'
import UsersListState from '../states/UsersListState'
import { Model } from './Model'

export class UsersModel extends Model<
	UserssApi,
	UsersListState,
	UsersType,
	UsersList,
	UsersStorePayload,
	UsersUpdatePayload,
	UsersUpdateRelationPayload
> {
	api = new UserssApi()
	useListState = () => new UsersListState()
	title = title
}

const Users = new UsersModel()
export default Users
