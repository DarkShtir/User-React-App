import { Actions } from './pets.actions';
import { Pet } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export interface State {
	pets: [Pet] | null;
	editPet: Pet | null;
}

const initialState: State = {
	pets: null,
	editPet: null,
};

export const reducer = (state: State = initialState, action: Action<any>) => {
	switch (action.type) {
		case Actions.LOGOUT_PET:
			return {
				...initialState,
			};
		case Actions.ADD_PET:
			if (state.pets !== null) {
				return {
					...state,
					pets: state.pets.concat(action.payload),
				};
			} else {
				return {
					...state,
				};
			}
		case Actions.PUT_USER_PETS:
			return {
				...state,
				pets: action.payload,
			};
		case Actions.PUT_EDIT_PET:
			return {
				...state,
				editPet: action.payload,
			};
		default:
			return state;
	}
};
