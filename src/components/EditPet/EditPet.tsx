import React from 'react';
import classes from './EditPet.module.scss';
import { Pet } from '../../interfaces';
import CancelIcon from '@material-ui/icons/Cancel';
import { EditPetForm } from '../EditPetForm/EditPetForm';

interface Props {
	setEditPet: (pet: Pet | null) => void;
	editPet: Pet | undefined;
	updatePet(id: string, pet: Pet): void;
	handlerDeletePet(petId: string): void;
}

const EditPet: React.FC<Props> = ({
	setEditPet,
	editPet,
	updatePet,
	handlerDeletePet,
}) => {
	return (
		<div
			className={classes.EditPet}
			onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
				if (e.currentTarget === e.target) {
					setEditPet(null);
				}
			}}
		>
			<div>
				<div
					className={classes.cancelIcon}
					onClick={(): void => {
						setEditPet(null);
					}}
				>
					<CancelIcon fontSize="large" />
				</div>
				<EditPetForm
					pet={editPet}
					onPetUpdated={updatePet}
					deletePet={handlerDeletePet}
				/>
			</div>
		</div>
	);
};

export default EditPet;
