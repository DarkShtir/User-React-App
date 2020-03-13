import { combineReducers } from 'redux';
import { reducer as usersReducer } from './users/users.reducers';
import { reducer as petsReducer } from './pets/pets.reducers';
import { reducer as dialogssReducer } from './dialogs/dialogs.reducers';
import { reducer as appStateReducer } from './appState/appState.reducers';
import { reducer as albumReducer } from './albums/albums.reducers';

export default combineReducers({
	users: usersReducer,
	pets: petsReducer,
	dialogs: dialogssReducer,
	appState: appStateReducer,
	albums: albumReducer,
});
