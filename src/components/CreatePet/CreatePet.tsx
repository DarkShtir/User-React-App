import React from 'react';
import classes from './CreatePet.module.scss';
import { CreatePetForm } from '../CreatePetForm/CreatePetForm';
import CancelIcon from '@material-ui/icons/Cancel';
import { Pet } from '../../interfaces';

interface Props {
	setNeedAdd: (trueOrFalse: boolean) => void;
	addPet(pet: Pet): void;
	hadlerAddPet(): any;
}

const CreatePet: React.FC<Props> = ({ setNeedAdd, addPet, hadlerAddPet }) => {
	return (
		<div
			className={classes.CreatePet}
			onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
				if (e.currentTarget === e.target) {
					setNeedAdd(false);
				}
			}}
		>
			<div className={classes.editPetForm}>
				<div
					className={classes.cancelIcon}
					onClick={(): void => {
						setNeedAdd(false);
					}}
				>
					<CancelIcon fontSize="large" />
				</div>
				<CreatePetForm onPetAdded={addPet} petAddToggle={hadlerAddPet} />
			</div>
		</div>
	);
};

export default CreatePet;
