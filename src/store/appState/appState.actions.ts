import { Action } from '../interfaces/action.interface';

export const Actions = {
	SET_LOGIN: '[appState] Set Login State',
	LOADING_SUCCESSFUL_STATE: '[appState] Successful loading',
	LOADING_ERROR_STATE: '[appState] Loading Error',
	LOADING_STATE: '[appState] Loading data',
};

export const setLoginAction = (isLogin: boolean): Action<boolean> => ({
	type: Actions.SET_LOGIN,
	payload: isLogin,
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
