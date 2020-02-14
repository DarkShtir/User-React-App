import React from 'react';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
import classes from './CardPets.module.scss';
import RenderFields from '../shared/RenderFields/RenderFields';

interface Pets {
	_id: string;
	name: string;
	species: string;
	ownerId?: string | any;
	__v: number;
}
interface Props {
	pet: Pets;
	guest: boolean;
}

const petCardForm = {
	name: 'Имя',
	species: 'Вид',
};

const CardPets: React.FC<Props> = ({ pet, guest }): JSX.Element => {
	return (
		<Card className={classes.CardPetsComponent}>
			<CardContent className={classes.content}>
				<RenderFields cardForm={petCardForm} user={pet} />
			</CardContent>
			<CardActions>
				<Button
					// component={Link}
					// to={`/user/${id}/edit/`}
					variant="contained"
					color="primary"
					className={classes.button}
					size="small"
					disabled={guest}
				>
					Edit животину епт
				</Button>
			</CardActions>
		</Card>
	);
};

export default CardPets;
