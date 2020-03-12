import { Action } from '../interfaces/action.interface';
import { Dialog } from '../../interfaces';
import { Actions } from '../dialogs/dialogs.actions';

export interface State {
	dialogsList: [Dialog] | null;
	activeDialog: Dialog | null;
	activeDialogId: string;
}

const initialState: State = {
	dialogsList: null,
	activeDialog: null,
	activeDialogId: '',
};

export const reducer = (state: State = initialState, action: Action<any>) => {
	switch (action.type) {
		case Actions.PUT_ACTIVE_DIALOG_IN_STATE:
			return {
				...state,
				activeDialog: action.payload,
			};
		case Actions.PUT_ID_ACTIVE_DIALOG_IN_STATE:
			return {
				...state,
				activeDialogId: action.payload,
			};
		case Actions.PUT_DIALOGLIST_IN_STATE:
			return {
				...state,
				dialogsList: action.payload,
			};
		case Actions.LOGOUT_DIALOG:
			return {
				...initialState,
			};
		default:
			return state;
	}
};
