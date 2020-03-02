import { Pet } from '../../interfaces';
import { Action } from '../interfaces/action.interface';

export const Actions = {
	ADD_PET: '[pet] Add pet',
	GET_PET: '[pet] Get pet',
	PUT_PET: '[pet] Put pet in store',
	UPDATE_PET: '[pet] Update pet',
	DELETE_PET: '[pet] Delete pet',
	GET_USER_PETS: '[pets] Get users pets',
	PUT_USER_PETS: '[pets] Put users pets in store',
	LOGOUT_PET: '[pet] Clear pet state',
};

export const addPetAction = (pet: Pet): Action<Pet> => ({
	type: Actions.ADD_PET,
	payload: pet,
});
export const updatePetAction = (id: string, pet: Pet): Action<{}> => ({
	type: Actions.UPDATE_PET,
	payload: {
		id,
		pet,
	},
});
export const deletePetAction = (id: string): Action<string> => ({
	type: Actions.DELETE_PET,
	payload: id,
});
export const getPet = (id: string): Action<string> => ({
	type: Actions.GET_PET,
	payload: id,
});
export const putPet = (pet: Pet): Action<Pet> => ({
	type: Actions.PUT_PET,
	payload: pet,
});
export const getUserPets = (id: string): Action<string> => ({
	type: Actions.GET_USER_PETS,
	payload: id,
});
export const putUserPets = (pets: Pet[]): Action<Pet[]> => ({
	type: Actions.PUT_USER_PETS,
	payload: pets,
});
export const logoutPetAction = (): Action<void> => ({
	type: Actions.LOGOUT_PET,
});
