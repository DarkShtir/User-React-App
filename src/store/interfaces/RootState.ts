import { State as UsersState } from '../users/users.reducers';

export interface RootState {
	users: UsersState;
}
