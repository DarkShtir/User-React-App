import React, { useContext } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Button,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import classes from './CardUser.module.scss';
import { User } from '../../interfaces';
import { isLoginContext } from '../utils/state';
import { Link } from 'react-router-dom';

interface Props {
	user: User;
}

const userCardForm = {
	firstName: 'Имя',
	lastName: 'Фамилия',
	gender: 'Пол',
	nat: 'Национальность',
	phone: 'Телефон',
};

const CardUser: React.FC<Props> = ({ user }): JSX.Element => {
	const { id } = useContext<any>(isLoginContext);

	const renderFields = (
		cardForm: { [index: string]: string },
		user: { [index: string]: any }
	): object => {
		return Object.keys(cardForm).map(
			(fieldName: string, index): void | JSX.Element => {
				const property = user[fieldName];
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
				{renderFields(userCardForm, user)}
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

export default CardUser;
