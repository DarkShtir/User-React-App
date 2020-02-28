import { combineReducers } from 'redux';
import { reducer as usersReducer } from './users/users.reducers';

export default combineReducers({
	users: usersReducer,
});
