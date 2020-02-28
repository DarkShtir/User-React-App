import { Actions } from './users.actions';
import { User } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export interface State {
	login: boolean;
	id: string;
	activeUser: User | null;
	users: User[];
	guestId: string;
	guest: boolean;
}

const checkLogin = (): boolean => {
	if (localStorage.getItem('token')) {
		return true;
	} else {
		return false;
	}
};

const getId = (): string => {
	const id = localStorage.getItem('id');
	if (id) {
		return id;
	} else {
		return '';
	}
};

const initialState: State = {
	login: checkLogin(),
	id: getId(),
	activeUser: null,
	users: [],
	guestId: '',
	guest: false,
};

export const reducer = (state: State = initialState, action: Action<any>) => {
	switch (action.type) {
		case Actions.SET_LOGIN:
			return {
				...state,
				login: action.payload,
			};
		case Actions.LOGOUT_USER:
			return {
				...initialState,
			};
		case Actions.SET_USER_ID:
			return {
				...state,
				id: action.payload,
			};
		case Actions.SET_GUEST_ID:
			return {
				...state,
				guestId: action.payload,
			};
		case Actions.SET_GUEST:
			return {
				...state,
				guest: action.payload,
			};
		default:
			return state;
	}
};
