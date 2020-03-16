import { Action } from '../interfaces/action.interface';
import { Dialog, Message } from '../../interfaces';
import { Actions } from '../dialogs/dialogs.actions';

export interface State {
	dialogsList: [Dialog] | null;
	activeDialog: Dialog | null;
	activeDialogId: string;
	messagesActiveDialog: [Message] | null;
	messagesGeneralChat: [Message] | null;
}

const initialState: State = {
	dialogsList: null,
	activeDialog: null,
	activeDialogId: '',
	messagesActiveDialog: null,
	messagesGeneralChat: null,
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
		case Actions.PUT_MESSAGES_ACTIVE_DIALOG_IN_STATE:
			if (
				action.payload !== null &&
				state.messagesActiveDialog !== null &&
				action.payload.length > 0
			) {
				return {
					...state,
					messagesActiveDialog: state.messagesActiveDialog.concat(
						action.payload
					),
				};
			} else if (
				action.payload !== null &&
				state.messagesActiveDialog === null &&
				action.payload.length > 0
			) {
				return {
					...state,
					messagesActiveDialog: action.payload,
				};
			} else if (action.payload === null || action.payload.length === 0) {
				return {
					...state,
					messagesActiveDialog: null,
				};
			} else {
				return { ...state };
			}
		case Actions.PUT_ONE_MESSAGES_IN_STATE:
			if (state.messagesActiveDialog !== null) {
				return {
					...state,
					messagesActiveDialog: state.messagesActiveDialog.concat(
						action.payload
					),
				};
			} else if (
				state.messagesActiveDialog === null &&
				action.payload !== null
			) {
				return {
					...state,
					messagesActiveDialog: [action.payload],
				};
			} else {
				return { ...state };
			}
		case Actions.PUT_ONE_MESSAGES_FROM_CHAT_IN_STATE:
			if (state.messagesGeneralChat !== null && action.payload !== null) {
				return {
					...state,
					messagesGeneralChat: state.messagesGeneralChat.concat(action.payload),
				};
			} else if (
				state.messagesGeneralChat === null &&
				action.payload !== null
			) {
				return {
					...state,
					messagesGeneralChat: [action.payload],
				};
			} else if (action.payload === null) {
				return {
					...state,
					messagesGeneralChat: null,
				};
			} else {
				return { ...state };
			}
		case Actions.LOGOUT_DIALOG:
			return {
				...initialState,
			};
		default:
			return state;
	}
};
