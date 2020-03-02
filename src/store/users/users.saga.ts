import { takeEvery, put, all, select } from 'redux-saga/effects';
import {
	Actions as UserActions,
	putUser,
	setLoginAction,
	setUserIdAction,
	putUserAlbums,
	getUserAlbums,
	getUser,
} from './users.actions';
import { userService, albumService } from '../../services/services';
import { getUserPets, logoutPetAction } from '../pets/pets.actions';

//Workers
function* workerGetUser(actions: any) {
	const newUser = yield userService.getUserById(actions.payload);
	const guestId = yield select(state => state.users.guestId);
	const login = yield select(state => state.users.login);
	if (login) {
		yield put(putUser(newUser));
		yield put(getUserPets(guestId));
		yield put(getUserAlbums(guestId));
	}
}
function* workerGetUserAlbums(actions: any) {
	const newAlbums = yield albumService.getAllAlbumByUserId(actions.payload);
	yield put(putUserAlbums(newAlbums));
}

function* workerLogoutUser() {
	yield userService.logout();
	yield UserActions.LOGOUT_USER;
	yield put(logoutPetAction());
	yield put(setLoginAction(false));
	yield put(setUserIdAction(''));
}

function* workerLogin() {
	const id = yield localStorage.getItem('id');
	yield put(getUser(id));
}

//Watchers
export function* watchGetUser() {
	yield takeEvery(UserActions.GET_USER, workerGetUser);
}
export function* watchLogin() {
	yield takeEvery(UserActions.SET_LOGIN, workerLogin);
}

export function* watchGetAlbums() {
	yield takeEvery(UserActions.GET_USER_ALBUMS, workerGetUserAlbums);
}

export function* watchLogoutUser() {
	yield takeEvery(UserActions.LOGOUT_USER, workerLogoutUser);
}

//Export
export default function* rootUserSaga() {
	yield all([
		watchGetUser(),
		watchLogoutUser(),
		watchGetAlbums(),
		watchLogin(),
	]);
}
