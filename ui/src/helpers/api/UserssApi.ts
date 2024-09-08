import type {
	Users,
	UsersList,
	UsersStorePayload,
	UsersUpdatePayload,
	UsersUpdateRelationPayload,
} from '@/interfaces/Users'
import Api from '@/helpers/api/Api'

export default class UserssApi extends Api<
	Users,
	UsersList,
	UsersStorePayload,
	UsersUpdatePayload,
	UsersUpdateRelationPayload
> {
	route = 'userss'
}
