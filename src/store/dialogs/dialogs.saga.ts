import { takeEvery, select, put } from 'redux-saga/effects';
import {
	Actions,
	createDialogAction,
	putActiveDialogInStateAction,
	putDialogListInStateAction,
	putIdActiveDialogInStateAction,
} from './dialogs.actions';
import dialogService from '../../services/dialog-service';

//Workers
function* workerGetAllUserDialog(actions: any) {
	try {
		const dialogList = yield dialogService.getAllDialogByUserId(
			actions.payload
		);
		yield put(putDialogListInStateAction(dialogList));
	} catch (error) {
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
				yield put(putActiveDialogInStateAction(newDialog));
				yield put(putIdActiveDialogInStateAction(newDialog._id));
			}
		}
	} catch (error) {
		console.log(error);
	}
}
function* workerCreateDialog(actions: any) {
	try {
		const newDialog = yield dialogService.createDialog(actions.payload);
		yield console.log(newDialog);
	} catch (error) {
		console.log(error);
	}
}
function* workerPutActiveDialogInState(actions: any) {
	try {
		yield put(putIdActiveDialogInStateAction(actions.payload._id));
	} catch (error) {
		console.log(error);
	}
}

//Watchers
export function* dialogsWatcher() {
	yield takeEvery(Actions.GET_ALL_USER_DIALOG, workerGetAllUserDialog);
	yield takeEvery(Actions.GET_DIALOG_BY_MEMBERS, workerGetDialogByMembers);
	yield takeEvery(Actions.CREATE_DIALOG, workerCreateDialog);
	yield takeEvery(
		Actions.PUT_ACTIVE_DIALOG_IN_STATE,
		workerPutActiveDialogInState
	);
}

// Export
export default function* rootAlbumSaga() {
	yield dialogsWatcher();
}
