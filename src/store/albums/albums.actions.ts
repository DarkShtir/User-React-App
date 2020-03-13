import { Album, Photo } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export const Actions = {
	GET_USER_ALBUMS: '[albums] Get users albums',
	ADD_USER_ALBUMS: '[albums] Add users albums',
	PUT_USER_ALBUMS: '[albums] Put users albums in store',
	PUT_ACTIVE_ALBUM: '[albums] Put active album in store',
	UPLOAD_PHOTOS: '[photo] Upload photo in user album',
	GET_ALBUM_PHOTOS: '[photo] Get photo by album id',
	PUT_ALBUM_PHOTOS: '[photo] Upload photo in user album',
};

export const addUserAlbums = (id: string): Action<string> => ({
	type: Actions.ADD_USER_ALBUMS,
	payload: id,
});
export const getUserAlbums = (id: string): Action<string> => ({
	type: Actions.GET_USER_ALBUMS,
	payload: id,
});
export const putUserAlbums = (albums: Album[]): Action<Album[]> => ({
	type: Actions.PUT_USER_ALBUMS,
	payload: albums,
});

export const putActiveAlbum = (albumId: string): Action<string> => ({
	type: Actions.PUT_ACTIVE_ALBUM,
	payload: albumId,
});
export const uploadPhotos = (
	ownerId: string,
	albumId: string,
	photos: [File]
): Action<{}> => ({
	type: Actions.UPLOAD_PHOTOS,
	payload: {
		ownerId: ownerId,
		albumId: albumId,
		photos: photos,
	},
});
export const getAlbumPhotos = (
	albumId: string,
	page?: number,
	elemPerPage?: number,
	filter?: boolean
): Action<{}> => ({
	type: Actions.GET_ALBUM_PHOTOS,
	payload: {
		albumId: albumId,
		page: page || 1,
		elemPerPage: elemPerPage || 0,
		filter: filter || false,
	},
});
export const PutAlbumPhotos = (photos: [Photo]): Action<[Photo]> => ({
	type: Actions.PUT_ALBUM_PHOTOS,
	payload: photos,
});
