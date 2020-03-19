import { takeEvery, put } from 'redux-saga/effects';
import { Actions as appStateActions } from './appState.actions';
import { userService } from '../../services/services';
import { putLoginUserInState, getUser } from '../users/users.actions';

//Workers
function* workerLogin() {
	const id = yield localStorage.getItem('id');
	const loginUser = yield userService.getUserById(id);
	yield put(putLoginUserInState(loginUser));
	yield put(getUser(id));
}

//Watchers
export function* appStateWatcher() {
	yield takeEvery(appStateActions.SET_LOGIN, workerLogin);
}

//Export
export default function* rootAppStateSaga() {
	yield appStateWatcher();
}
