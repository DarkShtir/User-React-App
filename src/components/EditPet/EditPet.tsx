import React from 'react';
import classes from './EditPet.module.scss';
import { Pet } from '../../interfaces';
import CancelIcon from '@material-ui/icons/Cancel';
import { EditPetForm } from '../EditPetForm/EditPetForm';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { RootState } from '../../store/interfaces/RootState';
import {
	putEditPet,
	deletePetAction,
	updatePetAction,
} from '../../store/pets/pets.actions';

interface Props {
	editPet: Pet | null;
	putEditPet: (pet: Pet | null) => void;
	updatePet: (id: string, pet: Pet) => void;
	deletePet: (petId: string) => void;
}

const EditPet: React.FC<Props> = ({
	editPet,
	putEditPet,
	updatePet,
	deletePet,
}) => {
	return (
		<div
			className={classes.EditPet}
			onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
				if (e.currentTarget === e.target) {
					putEditPet(null);
				}
			}}
		>
			<div>
				<div
					className={classes.cancelIcon}
					onClick={(): void => {
						putEditPet(null);
					}}
				>
					<CancelIcon fontSize="large" />
				</div>
				<EditPetForm
					pet={editPet}
					onPetUpdated={updatePet}
					deletePet={deletePet}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	editPet: state.pets.editPet,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	deletePet: (petId: string) => dispatch(deletePetAction(petId)),
	updatePet: (id: string, pet: Pet) => dispatch(updatePetAction(id, pet)),
	putEditPet: (pet: Pet | null) => dispatch(putEditPet(pet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPet);
