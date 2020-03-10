import { User, Album, Photo } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export const Actions = {
	ADD_USER: '[user] Add user',
	GET_USER: '[user] Get user',
	PUT_USER: '[user] Put user in store',
	UPDATE_USER: '[user] Update user',
	DELETE_USER: '[user] Delete user',
	LOGOUT_USER: '[user] Logout user',
	SET_USER_ID: '[user] Set user Id',
	SET_USER_AVATAR: '[user] Set user Avatar',
	SET_USER_QUOTES: '[user] Set user Quotes',
	GET_USERS_BY_NAME: '[user] Get users by name',
	PUT_USERS_IN_STATE: '[user] Put users in State',
	PUT_LOGIN_USER_IN_STATE: '[user] Put login user in State',
	GET_LOGIN_USER: '[user] Get login user',
	SET_LOGIN: '[appState] Set Login State',
	LOADING_SUCCESSFUL_STATE: '[appState] Successful loading',
	LOADING_ERROR_STATE: '[appState] Loading Error',
	LOADING_STATE: '[appState] Loading data',
	SET_GUEST_ID: '[guest] Set guest Id',
	SET_GUEST: '[guest] Set guest State',
	GET_USER_ALBUMS: '[albums] Get users albums',
	ADD_USER_ALBUMS: '[albums] Add users albums',
	PUT_USER_ALBUMS: '[albums] Put users albums in store',
	PUT_ACTIVE_ALBUM: '[albums] Put active album in store',
	UPLOAD_PHOTOS: '[photo] Upload photo in user album',
	GET_ALBUM_PHOTOS: '[photo] Get photo by album id',
	PUT_ALBUM_PHOTOS: '[photo] Upload photo in user album',
};

export const addUserAction = (user: User): Action<User> => ({
	type: Actions.ADD_USER,
	payload: user,
});
export const getLoginUser = (): Action<void> => ({
	type: Actions.GET_LOGIN_USER,
});
export const putLoginUserInState = (user: User): Action<User> => ({
	type: Actions.PUT_LOGIN_USER_IN_STATE,
	payload: user,
});
export const updateUserAction = (id: string, user: {}): Action<{}> => ({
	type: Actions.UPDATE_USER,
	payload: {
		id,
		user,
	},
});
export const deleteUserAction = (id: string): Action<string> => ({
	type: Actions.DELETE_USER,
	payload: id,
});
export const setLoginAction = (isLogin: boolean): Action<boolean> => ({
	type: Actions.SET_LOGIN,
	payload: isLogin,
});
export const logoutUserAction = (): Action<void> => ({
	type: Actions.LOGOUT_USER,
});
export const setUserIdAction = (id: string): Action<string> => ({
	type: Actions.SET_USER_ID,
	payload: id,
});
export const setGuestIdAction = (guestId: string): Action<string> => ({
	type: Actions.SET_GUEST_ID,
	payload: guestId,
});
export const setGuestAction = (isGuest: boolean): Action<boolean> => ({
	type: Actions.SET_GUEST,
	payload: isGuest,
});
export const getUser = (id: string): Action<string> => ({
	type: Actions.GET_USER,
	payload: id,
});
export const putUser = (user: User): Action<User> => ({
	type: Actions.PUT_USER,
	payload: user,
});
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
export const setUserAvatar = (avatar: object): Action<object> => ({
	type: Actions.SET_USER_AVATAR,
	payload: avatar,
});
export const setUserQuotes = (quote: string): Action<string> => ({
	type: Actions.SET_USER_QUOTES,
	payload: quote,
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

export const getUsersByName = (name: string): Action<string> => ({
	type: Actions.GET_USERS_BY_NAME,
	payload: name,
});
export const putUsersInState = (users: [{}]): Action<[{}]> => ({
	type: Actions.PUT_USERS_IN_STATE,
	payload: users,
});
export const loadingSuccessful = (): Action<void> => ({
	type: Actions.LOADING_SUCCESSFUL_STATE,
});
export const loadingError = (): Action<void> => ({
	type: Actions.LOADING_ERROR_STATE,
});
export const loading = (): Action<void> => ({
	type: Actions.LOADING_STATE,
});
