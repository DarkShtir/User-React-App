import { takeEvery, put, all, select } from 'redux-saga/effects';
import { Actions, putUserPets, getUserPets, putEditPet } from './pets.actions';
import { userService, petService } from '../../services/services';

//Workers
function* workerGetUserPets(actions: any) {
	const newPets = yield userService.getUserPets(actions.payload);
	yield put(putUserPets(newPets));
}
function* workerAddPet(actions: any) {
	yield petService.addPet(actions.payload);
	const id = yield select(state => state.users.id);
	yield put(getUserPets(id));
}
function* workerDeletePet(actions: any) {
	yield petService.deletePet(actions.payload);
	const id = yield select(state => state.users.id);
	yield put(getUserPets(id));
	yield put(putEditPet(null));
}
function* workerUpdatePet(actions: any) {
	yield petService.updatePet(actions.payload.id, actions.payload.pet);
	const id = yield select(state => state.users.id);
	yield put(getUserPets(id));
	yield put(putEditPet(null));
}

//Wathers
export function* watchGetUserPets() {
	yield takeEvery(Actions.GET_USER_PETS, workerGetUserPets);
}
export function* watchAddPet() {
	yield takeEvery(Actions.ADD_PET, workerAddPet);
}
export function* watchDeletePet() {
	yield takeEvery(Actions.DELETE_PET, workerDeletePet);
}
export function* watchUpdatePet() {
	yield takeEvery(Actions.UPDATE_PET, workerUpdatePet);
}

//Export
export default function* rootPetSaga() {
	yield all([
		watchGetUserPets(),
		watchAddPet(),
		watchDeletePet(),
		watchUpdatePet(),
	]);
}
