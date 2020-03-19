import { Actions } from './users.actions';
import { User } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export interface State {
	id: string;
	loginUser: User;
	activeUser: User | null;
	users: [User] | null;
	guestId: string;
	guest: boolean;
}

const getId = (): string => {
	const id = localStorage.getItem('id');
	if (id) {
		return id;
	} else {
		return '';
	}
};

const initialState: State = {
	id: getId(),
	loginUser: {} as User,
	activeUser: {} as User,
	users: [{} as User],
	guestId: '',
	guest: false,
};

export const reducer = (state: State = initialState, action: Action<any>) => {
	switch (action.type) {
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
		case Actions.PUT_USER:
			if (action.payload) {
				return {
					...state,
					activeUser: action.payload,
				};
			} else {
				return { ...state };
			}
		case Actions.PUT_LOGIN_USER_IN_STATE:
			if (action.payload) {
				return {
					...state,
					loginUser: action.payload,
				};
			} else {
				return { ...state };
			}
		case Actions.PUT_USERS_IN_STATE:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};
