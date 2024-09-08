import {
	title,
	type User as UserType,
	type UserList,
	type UserStorePayload,
	type UserUpdatePayload,
	type UserUpdateRelationPayload,
} from '@/interfaces/User'
import UsersApi from '../api/UsersApi'
import UserListState from '../states/UserListState'
import { Model } from './Model'

export class UserModel extends Model<
	UsersApi,
	UserListState,
	UserType,
	UserList,
	UserStorePayload,
	UserUpdatePayload,
	UserUpdateRelationPayload
> {
	api = new UsersApi()
	useListState = () => new UserListState()
	title = title
}

const User = new UserModel()
export default User
