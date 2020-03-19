import { Actions } from './albums.actions';
import { Album, Photo } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export interface State {
	albumsList: [Album] | null;
	activeAlbum: string;
	photos: [Photo];
}

const initialState: State = {
	albumsList: [{} as Album],
	activeAlbum: '',
	photos: [{} as Photo],
};

export const reducer = (state: State = initialState, action: Action<any>) => {
	switch (action.type) {
		case Actions.PUT_USER_ALBUMS:
			return {
				...state,
				albumsList: action.payload,
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
