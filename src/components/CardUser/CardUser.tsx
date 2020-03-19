import React, { useContext } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
} from '@material-ui/core';
import classes from './CardUser.module.scss';
import { User } from '../../interfaces';
import { isLoginContext } from '../utils/state';
import { Link } from 'react-router-dom';
import RenderFields from '../shared/RenderFields/RenderFields';

interface Props {
	user: User;
	guest: boolean;
}

const userCardForm = {
	firstName: 'Имя',
	lastName: 'Фамилия',
	gender: 'Пол',
	nat: 'Национальность',
	phone: 'Телефон',
};

const CardUser: React.FC<Props> = ({ user, guest }): JSX.Element => {
	const { id } = useContext<any>(isLoginContext);

	return (
		<Card className={classes.CardComponent}>
			<Typography variant="h5" className={classes.typography}>
				About Me
			</Typography>
			<CardContent className={classes.content}>
				<RenderFields cardForm={userCardForm} user={user} />
			</CardContent>
			<CardActions className={classes.cardActions}>
				{!guest ? (
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
				) : null}
			</CardActions>
		</Card>
	);
};

export default CardUser;
