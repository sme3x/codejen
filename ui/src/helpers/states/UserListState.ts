import type { User, UserList } from '@/interfaces/User'
import UsersApi from '../api/UsersApi'
import ListState from './ListState'

export default class UserListState extends ListState<UsersApi, User, UserList> {
	api = new UsersApi()
}
