import { Actions } from './users.actions';
import { User, Album, Photo } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export interface State {
	login: boolean;
	id: string;
	activeUser: User | null;
	users: User[];
	guestId: string;
	guest: boolean;
	albums: [Album] | null;
	activeAlbum: string;
	photos: [Photo];
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
	activeUser: {} as User,
	users: [],
	guestId: '',
	guest: false,
	albums: [{} as Album],
	activeAlbum: '',
	photos: [{} as Photo],
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
		case Actions.PUT_USER:
			if (action.payload) {
				return {
					...state,
					activeUser: action.payload,
				};
			} else {
				return { ...state };
			}
		case Actions.PUT_USER_ALBUMS:
			return {
				...state,
				albums: action.payload,
			};
		case Actions.PUT_ACTIVE_ALBUM:
			return {
				...state,
				activeAlbum: action.payload,
			};
		case Actions.PUT_ALBUM_PHOTOS:
			return {
				...state,
				photos: action.payload,
			};
		default:
			return state;
	}
};
