import { State as UsersState } from '../users/users.reducers';
import { State as PetsState } from '../pets/pets.reducers';
import { State as DialogsState } from '../dialogs/dialogs.reducers';

export interface RootState {
	users: UsersState;
	pets: PetsState;
	dialogs: DialogsState;
}
