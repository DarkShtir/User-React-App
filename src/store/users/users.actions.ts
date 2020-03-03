import { User, Album } from '../../interfaces';
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
	SET_LOGIN: '[appState] Set Login State',
	SET_GUEST_ID: '[guest] Set guest Id',
	SET_GUEST: '[guest] Set guest State',
	GET_USER_ALBUMS: '[albums] Get users albums',
	ADD_USER_ALBUMS: '[albums] Add users albums',
	PUT_USER_ALBUMS: '[albums] Put users albums in store',
	UPLOAD_PHOTOS: '[photo] Upload photo in user album',
};

export const addUserAction = (user: User): Action<User> => ({
	type: Actions.ADD_USER,
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
export const uploadPhotos = (photos: [{}]): Action<[{}]> => ({
	type: Actions.UPLOAD_PHOTOS,
	payload: photos,
});
