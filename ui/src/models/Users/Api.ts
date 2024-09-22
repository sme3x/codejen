import type {
	Users,
	UsersStorePayload,
	UsersUpdatePayload,
} from '@/models/Users/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class UserssApi extends Api<
	Users,
	LaravelPaginationResponse<Users>,
	UsersStorePayload,
	UsersUpdatePayload
> {
	route = 'userss'
}
