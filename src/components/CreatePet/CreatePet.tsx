import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

import { CreatePetForm } from '../CreatePetForm/CreatePetForm';
import { Pet } from '../../interfaces';

import classes from './CreatePet.module.scss';

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
