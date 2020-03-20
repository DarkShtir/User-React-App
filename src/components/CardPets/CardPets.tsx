import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';

import RenderFields from '../shared/RenderFields/RenderFields';
import { putEditPet } from '../../store/pets/pets.actions';
import { Pet } from '../../interfaces';

import classes from './CardPets.module.scss';

interface Props {
	pet: Pet;
	guest: boolean;
	putEditPet: (pet: Pet | null) => void;
}

const petCardForm = {
	name: 'Имя',
	species: 'Вид',
};

const CardPets: React.FC<Props> = ({ pet, guest, putEditPet }): JSX.Element => {
	return (
		<Card className={classes.CardPetsComponent}>
			<CardContent className={classes.content}>
				<RenderFields cardForm={petCardForm} user={pet} />
			</CardContent>
			{!guest ? (
				<CardActions>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						size="small"
						onClick={e => {
							putEditPet(pet);
						}}
					>
						Edit животину епт
					</Button>
				</CardActions>
			) : null}
		</Card>
	);
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	putEditPet: (pet: Pet | null) => dispatch(putEditPet(pet)),
});

export default connect(null, mapDispatchToProps)(CardPets);
