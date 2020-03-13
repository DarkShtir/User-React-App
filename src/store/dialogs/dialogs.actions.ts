import { Dialog, Message } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export const Actions = {
	CREATE_DIALOG: '[dialog] Create dialog',
	GET_ALL_USER_DIALOG: '[dialog] Get all user dialog',
	GET_DIALOG_BY_MEMBERS: '[dialog] Get dialog by members Id',
	PUT_ACTIVE_DIALOG_IN_STATE: '[dialog] Put active dialog in state',
	PUT_ID_ACTIVE_DIALOG_IN_STATE: '[dialog] Put ID active dialog in state',
	PUT_DIALOGLIST_IN_STATE: '[dialog] Put dialog list in state',
	LOGOUT_DIALOG: '[dialog] Clear dialog state during logout action',
	PUT_MESSAGES_ACTIVE_DIALOG_IN_STATE:
		'[messages] Put messages activ dialog in state',
	GET_MESSAGES_FROM_ACTIVE_DIALOG: '[messages] Get messages from activ dialog',
};

export const createDialogAction = (dialog: Dialog): Action<Dialog> => ({
	type: Actions.CREATE_DIALOG,
	payload: dialog,
});
export const getAllUserDialogAction = (id: string): Action<string> => ({
	type: Actions.GET_ALL_USER_DIALOG,
	payload: id,
});
export const getDialogByMembersAction = (secondId: string): Action<string> => ({
	type: Actions.GET_DIALOG_BY_MEMBERS,
	payload: secondId,
});
export const putActiveDialogInStateAction = (
	dialog: Dialog | null
): Action<Dialog | null> => ({
	type: Actions.PUT_ACTIVE_DIALOG_IN_STATE,
	payload: dialog,
});
export const putIdActiveDialogInStateAction = (
	dialogId: string
): Action<string> => ({
	type: Actions.PUT_ID_ACTIVE_DIALOG_IN_STATE,
	payload: dialogId,
});
export const putDialogListInStateAction = (
	dialogList: Dialog[]
): Action<Dialog[]> => ({
	type: Actions.PUT_DIALOGLIST_IN_STATE,
	payload: dialogList,
});
export const putMessagesActiveDialogInStateAction = (
	messages: Message[]
): Action<Message[]> => ({
	type: Actions.PUT_MESSAGES_ACTIVE_DIALOG_IN_STATE,
	payload: messages,
});
export const getMessagesFromActiveDialogAction = (): Action<void> => ({
	type: Actions.GET_MESSAGES_FROM_ACTIVE_DIALOG,
});
export const logoutDialogAction = (): Action<void> => ({
	type: Actions.LOGOUT_DIALOG,
});
