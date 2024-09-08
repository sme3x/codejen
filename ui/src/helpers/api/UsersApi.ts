import type {
	User,
	UserList,
	UserStorePayload,
	UserUpdatePayload,
	UserUpdateRelationPayload,
} from '@/interfaces/User'
import Api from '@/helpers/api/Api'

export default class UsersApi extends Api<
	User,
	UserList,
	UserStorePayload,
	UserUpdatePayload,
	UserUpdateRelationPayload
> {
	route = 'users'
}
