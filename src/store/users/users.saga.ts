import { takeEvery, put, select } from 'redux-saga/effects';
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
	PutAlbumPhotos,
	getAlbumPhotos,
} from './users.actions';
import {
	userService,
	albumService,
	photoService,
} from '../../services/services';
import { getUserPets, logoutPetAction } from '../pets/pets.actions';
import { Photo } from '../../interfaces';

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
function* workerAddUserAlbum(actions: any) {
	yield albumService.addAlbum({ ownerId: actions.payload });
	yield put(getUserAlbums(actions.payload));
}
function* workerUploadPhotosInAlbum(actions: any) {
	if (
		actions.payload.ownerId &&
		actions.payload.albumId &&
		actions.payload.photos
	) {
		yield photoService.addManyPhotos(
			actions.payload.ownerId,
			actions.payload.albumId,
			actions.payload.photos
		);
		yield put(getAlbumPhotos(actions.payload.albumId));
	}
}
function* workerGetAlbumPhotos(actions: any) {
	if (actions.payload) {
		const newPhotos = yield photoService.getAllPhotosByAlbumId(actions.payload);
		yield put(PutAlbumPhotos(newPhotos));
	}
}
function* workerPutActiveAlbum(actions: any) {
	if (actions.payload === '') {
		yield put(PutAlbumPhotos([{} as Photo]));
	}

}

//Watchers
export function* usersWatcher() {
	yield takeEvery(UserActions.SET_GUEST_ID, workerSetGuestId);
	yield takeEvery(UserActions.SET_LOGIN, workerLogin);
	yield takeEvery(UserActions.GET_USER_ALBUMS, workerGetUserAlbums);
	yield takeEvery(UserActions.LOGOUT_USER, workerLogoutUser);
	yield takeEvery(UserActions.SET_USER_AVATAR, workerSetUserAvatar);
	yield takeEvery(UserActions.SET_USER_QUOTES, workerSetUserQuotes);
	yield takeEvery(UserActions.UPDATE_USER, workerUpdateUser);
	yield takeEvery(UserActions.ADD_USER_ALBUMS, workerAddUserAlbum);
	yield takeEvery(UserActions.UPLOAD_PHOTOS, workerUploadPhotosInAlbum);
	yield takeEvery(UserActions.GET_ALBUM_PHOTOS, workerGetAlbumPhotos);
	yield takeEvery(UserActions.PUT_ACTIVE_ALBUM, workerPutActiveAlbum);
}

//Export
export default function* rootUserSaga() {
	yield usersWatcher();
}
