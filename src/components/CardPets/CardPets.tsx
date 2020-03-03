import React from 'react';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
import classes from './CardPets.module.scss';
import RenderFields from '../shared/RenderFields/RenderFields';
import { Pet } from '../../interfaces';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { putEditPet } from '../../store/pets/pets.actions';

interface Props {
	pet: Pet;
	guest: boolean;
	putEditPet: (pet: Pet | null) => void;
	// editPet: (pet: Pet) => void;
	// deletePet: (petId: string, ownerId: string) => void;
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
			<CardActions>
				{!guest ? (
					<Button
						// component={Link}
						// to={`/user/${id}/edit/`}
						variant="contained"
						color="primary"
						className={classes.button}
						size="small"
						onClick={e => {
							putEditPet(pet);
						}}
						// disabled={guest}
					>
						Edit животину епт
					</Button>
				) : null}
			</CardActions>
		</Card>
	);
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	putEditPet: (pet: Pet | null) => dispatch(putEditPet(pet)),
});

export default connect(null, mapDispatchToProps)(CardPets);
