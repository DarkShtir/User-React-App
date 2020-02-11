import React, { useContext } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Button,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import classes from './CardPets.module.scss';
// import { User } from '../../interfaces';
import { isLoginContext } from '../utils/state';
import { Link } from 'react-router-dom';

interface Props {
	pets: [
		{
			_id: string,
			name: string,
			species: string,
			ownerId?: string | any,
			__v: number,
		}
	];
}

const petCardForm = {
	name: 'Имя',
	species: 'Вид',
};

const CardPets: React.FC<Props> = ({ pets }): JSX.Element => {
	const { id } = useContext<any>(isLoginContext);

	const renderFields = (
		cardForm: { [index: string]: string },
		pets: { [index: string]: any }
	): object => {
		return Object.keys(cardForm).map(
			(fieldName: string, index): void | JSX.Element => {
				const property = pets[fieldName];
				return (
					<React.Fragment key={fieldName + index}>
						<ListItem>
							<ListItemText
								primary={property}
								secondary={cardForm[fieldName]}
							/>
						</ListItem>
					</React.Fragment>
				);
			}
		);
	};

	return (
		<Card className={classes.CardComponent}>
			<CardContent className={classes.content}>
				{renderFields(petCardForm, pets)}
			</CardContent>
			<CardActions>
				<Button
					component={Link}
					to={`/user/${id}/edit/`}
					variant="contained"
					color="primary"
					className={classes.button}
					size="small"
				>
					Edit епт
				</Button>
			</CardActions>
		</Card>
	);
};

export default CardPets;
