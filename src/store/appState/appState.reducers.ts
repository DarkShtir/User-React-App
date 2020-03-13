import { Actions } from './appState.actions';
import { Action } from '../interfaces/action.interface';
import loadingEnum from '../../components/utils/loadingStateEnum';

export interface State {
	login: boolean;
	statusApp: loadingEnum;
}

const checkLogin = (): boolean => {
	if (localStorage.getItem('token')) {
		return true;
	} else {
		return false;
	}
};

const initialState: State = {
	login: checkLogin(),
	statusApp: loadingEnum.Loading,
};

export const reducer = (state: State = initialState, action: Action<any>) => {
	switch (action.type) {
		case Actions.SET_LOGIN:
			return {
				...state,
				login: action.payload,
			};
		case Actions.LOADING_SUCCESSFUL_STATE:
			return {
				...state,
				statusApp: loadingEnum.Loaded,
			};
		case Actions.LOADING_ERROR_STATE:
			return {
				...state,
				statusApp: loadingEnum.Error,
			};
		case Actions.LOADING_STATE:
			return {
				...state,
				statusApp: loadingEnum.Loading,
			};
		default:
			return state;
	}
};
