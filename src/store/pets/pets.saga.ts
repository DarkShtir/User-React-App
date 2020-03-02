import { takeEvery, put, all } from 'redux-saga/effects';
import { Actions, putUserPets } from './pets.actions';
import { userService, petService } from '../../services/services';

//Workers
function* workerGetUserPets(actions: any) {
	const newPets = yield userService.getUserPets(actions.payload);
	yield put(putUserPets(newPets));
}
function* workerAddPet(actions: any) {
	yield petService.addPet(actions.payload);
}
function* workerDeletePet(actions: any) {
	yield petService.deletePet(actions.payload);
}
function* workerUpdatePet(actions: any) {
	yield petService.updatePet(actions.payload.id, actions.payload.pet);
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
