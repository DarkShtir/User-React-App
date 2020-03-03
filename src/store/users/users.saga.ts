import { takeEvery, put, all, select } from 'redux-saga/effects';
import {
	Actions as UserActions,
	putUser,
	setLoginAction,
	setUserIdAction,
	putUserAlbums,
	getUserAlbums,
	getUser,
	setGuestAction,
	updateUserAction,
} from './users.actions';
import { userService, albumService } from '../../services/services';
import { getUserPets, logoutPetAction } from '../pets/pets.actions';

//Workers
function* workerSetGuestId(actions: any) {
	const newUser = yield userService.getUserById(actions.payload);
	const id = yield select(state => state.users.id);
	const guestId = yield select(state => state.users.guestId);
	const login = yield select(state => state.users.login);
	if (id !== guestId && id && guestId) {
		yield put(setGuestAction(true));
	} else {
		yield put(setGuestAction(false));
	}
	if (login && newUser && newUser.id !== guestId) {
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
function* workerSetUserAvatar(actions: any) {
	const id = yield select(state => state.users.id);
	const newAvatar = yield userService.setAvatar(id, actions.payload);
	yield put(updateUserAction(id, newAvatar));
}
function* workerSetUserQuotes(actions: any) {
	const id = yield select(state => state.users.id);
	yield put(updateUserAction(id, { quotes: actions.payload }));
}
function* workerUpdateUser(actions: any) {
	yield userService.updateUser(actions.payload.id, actions.payload.user);
	const newUser = yield userService.getUserById(actions.payload.id);
	yield put(putUser(newUser));
}

//Watchers
export function* watchSetGuestId() {
	yield takeEvery(UserActions.SET_GUEST_ID, workerSetGuestId);
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

export function* watchSetAvatar() {
	yield takeEvery(UserActions.SET_USER_AVATAR, workerSetUserAvatar);
}
export function* watchSetQuotes() {
	yield takeEvery(UserActions.SET_USER_QUOTES, workerSetUserQuotes);
}

export function* watchUpdateUser() {
	yield takeEvery(UserActions.UPDATE_USER, workerUpdateUser);
}

//Export
export default function* rootUserSaga() {
	yield all([
		// watchGetUser(),
		watchSetGuestId(),
		watchLogoutUser(),
		watchGetAlbums(),
		watchLogin(),
		watchSetAvatar(),
		watchUpdateUser(),
		watchSetQuotes(),
	]);
}
