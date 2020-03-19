import { takeEvery, select, put } from 'redux-saga/effects';
import {
	Actions,
	createDialogAction,
	putActiveDialogInStateAction,
	putDialogListInStateAction,
	putIdActiveDialogInStateAction,
	putMessagesActiveDialogInStateAction,
	getMessagesFromActiveDialogAction,
	putMessagesFromChatAction,
	getAllUserDialogAction,
	dialogLoading,
	dialogLoaded,
	dialogError,
} from './dialogs.actions';
import dialogService from '../../services/dialog-service';

//Workers
function* workerGetAllUserDialog(actions: any) {
	try {
		yield put(dialogLoading());

		const dialogList = yield dialogService.getAllDialogByUserId(
			actions.payload
		);
		yield put(putDialogListInStateAction(dialogList));
		yield put(dialogLoaded());
	} catch (error) {
		yield put(dialogError());
		console.log(error);
	}
}
function* workerGetDialogByMembers(actions: any) {
	try {
		const firstId = yield select(state => state.users.id);
		const secondId = yield actions.payload;
		if (firstId !== secondId) {
			const newDialog = yield dialogService.getDialogByMembersId(
				firstId,
				secondId
			);
			if (!newDialog || newDialog.length === 0) {
				yield put(createDialogAction({ members: [firstId, secondId] }));
			} else {
				yield put(putActiveDialogInStateAction(newDialog[0]));
				yield put(putIdActiveDialogInStateAction(newDialog[0]._id));
			}
		}
	} catch (error) {
		yield put(dialogError());
	}
}
function* workerCreateDialog(actions: any) {
	try {
		const newDialog = yield dialogService.createDialog(actions.payload);
		yield put(putActiveDialogInStateAction(newDialog));
		yield put(putIdActiveDialogInStateAction(newDialog._id));
		const userId = yield select(state => state.users.id);
		yield put(getAllUserDialogAction(userId));
	} catch (error) {
		console.log(error);
		yield put(dialogError());
	}
}
function* workerPutActiveDialogInState(actions: any) {
	try {
		if (actions.payload !== null) {
			yield put(putMessagesFromChatAction(null));
			yield put(putMessagesActiveDialogInStateAction(null));
			const dialogId = yield select(state => state.dialogs.activeDialog._id);
			yield put(putIdActiveDialogInStateAction(dialogId));
			yield put(getMessagesFromActiveDialogAction(dialogId));
		} else if (actions.payload === null) {
			yield put(putMessagesActiveDialogInStateAction(null));
			yield put(putIdActiveDialogInStateAction(''));
		}
	} catch (error) {
		console.log(error);
		yield put(dialogError());
	}
}
function* workerGetMesasagesFromActiveDialog(actions: any) {
	try {
		const messages = yield dialogService.getMessagesByDialogId(actions.payload);
		yield put(putMessagesActiveDialogInStateAction(messages));
	} catch (error) {
		console.log(error);
		yield put(dialogError());
	}
}

//Watchers
export function* dialogsWatcher() {
	yield takeEvery(Actions.GET_ALL_USER_DIALOG, workerGetAllUserDialog);
	yield takeEvery(
		Actions.PUT_ACTIVE_DIALOG_IN_STATE,
		workerPutActiveDialogInState
	);
	yield takeEvery(Actions.GET_DIALOG_BY_MEMBERS, workerGetDialogByMembers);
	yield takeEvery(Actions.CREATE_DIALOG, workerCreateDialog);
	yield takeEvery(
		Actions.GET_MESSAGES_FROM_ACTIVE_DIALOG,
		workerGetMesasagesFromActiveDialog
	);
}

// Export
export default function* rootDialogSaga() {
	yield dialogsWatcher();
}
