import React from 'react';
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

interface Props {
	user: User;
}

const CardUser: React.FC<Props> = ({ user }): JSX.Element => {
	const renderFields = (myUser: { [index: string]: any }): object => {
		return Object.keys(myUser).map(
			(fieldName: string, index): void | JSX.Element => {
				const property = myUser[fieldName];
				return (
					<React.Fragment key={fieldName + index}>
						<ListItem>
							<ListItemText
								primary={property}
								secondary={fieldName}
								className={classes.ListItemText}
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
				{renderFields(user)}
			</CardContent>
			<CardActions>
				<Button
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
