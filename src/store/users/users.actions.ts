import { User } from '../../interfaces';
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
	SET_GUEST_ID: '[guest] Set guest Id',
	SET_GUEST: '[guest] Set guest State',
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
export const setUserAvatar = (avatar: object): Action<object> => ({
	type: Actions.SET_USER_AVATAR,
	payload: avatar,
});
export const setUserQuotes = (quote: string): Action<string> => ({
	type: Actions.SET_USER_QUOTES,
	payload: quote,
});
export const getUsersByName = (name: string): Action<string> => ({
	type: Actions.GET_USERS_BY_NAME,
	payload: name,
});
export const putUsersInState = (users: [{}]): Action<[{}]> => ({
	type: Actions.PUT_USERS_IN_STATE,
	payload: users,
});
