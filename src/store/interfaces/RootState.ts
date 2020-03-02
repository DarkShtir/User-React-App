import { State as UsersState } from '../users/users.reducers';
import { State as PetsState } from '../pets/pets.reducers';

export interface RootState {
	users: UsersState;
	pets: PetsState;
}
