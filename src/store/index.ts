import { combineReducers } from 'redux';
import { reducer as usersReducer } from './users/users.reducers';
import { reducer as petsReducer } from './pets/pets.reducers';
import { reducer as dialogssReducer } from './dialogs/dialogs.reducers';

export default combineReducers({
	users: usersReducer,
	pets: petsReducer,
	dialogs: dialogssReducer,
});
