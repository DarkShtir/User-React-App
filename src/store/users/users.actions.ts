import { User } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export const Actions = {
	ADD_USER: '[user] Add user',
	UPDATE_USER: '[user] Update user',
	DELETE_USER: '[user] Delete user',
	SET_LOGIN: '[appState] Set Login State',
	LOGOUT_USER: '[user] Logout user',
	SET_USER_ID: '[user] Set user Id',
	SET_GUEST_ID: '[guest] Set guest Id',
	SET_GUEST: '[guest] Set guest State',
};

export const addUserAction = (user: User): Action<User> => ({
	type: Actions.ADD_USER,
	payload: user,
});
export const updateUserAction = (id: string, user: User): Action<{}> => ({
	type: Actions.ADD_USER,
	payload: {
		id,
		user,
	},
});
export const deleteUserAction = (id: string): Action<string> => ({
	type: Actions.ADD_USER,
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
