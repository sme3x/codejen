import type { Users, UsersList } from '@/interfaces/Users'
import UserssApi from '../api/UserssApi'
import ListState from './ListState'

export default class UsersListState extends ListState<UserssApi, Users, UsersList> {
	api = new UserssApi()
}
