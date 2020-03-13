import { takeEvery, put } from 'redux-saga/effects';
import {
	Actions as AlbumsActions,
	putUserAlbums,
	getUserAlbums,
	PutAlbumPhotos,
	getAlbumPhotos,
} from './albums.actions';
import { albumService, photoService } from '../../services/services';
import { Photo } from '../../interfaces';
import {
	loading,
	loadingSuccessful,
	loadingError,
} from '../appState/appState.actions';

//Workers
function* workerGetUserAlbums(actions: any) {
	try {
		yield put(loading());
		const newAlbums = yield albumService.getAllAlbumByUserId(actions.payload);
		yield put(putUserAlbums(newAlbums));
		yield put(loadingSuccessful());
	} catch (error) {
		yield put(loadingError());
	}
}
function* workerAddUserAlbum(actions: any) {
	yield albumService.addAlbum({ ownerId: actions.payload });
	yield put(getUserAlbums(actions.payload));
}
function* workerUploadPhotosInAlbum(actions: any) {
	try {
		yield put(loading());
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
			yield put(loadingSuccessful());
		}
	} catch (error) {
		yield put(loadingError());
	}
}
function* workerGetAlbumPhotos(actions: any) {
	try {
		yield put(loading());
		if (actions.payload) {
			const newPhotos = yield photoService.getAllPhotosByAlbumId(
				actions.payload.albumId,
				actions.payload.page,
				actions.payload.elemPerPage,
				actions.payload.filter
			);
			yield put(PutAlbumPhotos(newPhotos));
			yield put(loadingSuccessful());
		}
	} catch (error) {
		yield put(loadingError());
	}
}
function* workerPutActiveAlbum(actions: any) {
	try {
		yield put(loading());
		if (actions.payload === '') {
			yield put(PutAlbumPhotos([{} as Photo]));
			yield put(loadingSuccessful());
		}
	} catch (error) {
		yield put(loadingError());
	}
}

//Watchers
export function* albumsWatcher() {
	yield takeEvery(AlbumsActions.GET_USER_ALBUMS, workerGetUserAlbums);
	yield takeEvery(AlbumsActions.ADD_USER_ALBUMS, workerAddUserAlbum);
	yield takeEvery(AlbumsActions.UPLOAD_PHOTOS, workerUploadPhotosInAlbum);
	yield takeEvery(AlbumsActions.GET_ALBUM_PHOTOS, workerGetAlbumPhotos);
	yield takeEvery(AlbumsActions.PUT_ACTIVE_ALBUM, workerPutActiveAlbum);
}

//Export
export default function* rootAlbumSaga() {
	yield albumsWatcher();
}
