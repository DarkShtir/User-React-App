import { State as UsersState } from '../users/users.reducers';
import { State as PetsState } from '../pets/pets.reducers';
import { State as DialogsState } from '../dialogs/dialogs.reducers';
import { State as AppState } from '../appState/appState.reducers';
import { State as AlbumsState } from '../albums/albums.reducers';

export interface RootState {
	users: UsersState;
	pets: PetsState;
	dialogs: DialogsState;
	appState: AppState;
	albums: AlbumsState;
}
