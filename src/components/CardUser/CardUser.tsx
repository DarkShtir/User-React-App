import React from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
} from '@material-ui/core';
import classes from './CardUser.module.scss';
import { User } from '../../interfaces';
import { Link } from 'react-router-dom';
import RenderFields from '../shared/RenderFields/RenderFields';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';

interface Props {
	id: string;
	user: User | null;
	guest: boolean;
}

const userCardForm = {
	firstName: 'Имя',
	lastName: 'Фамилия',
	gender: 'Пол',
	nat: 'Национальность',
	phone: 'Телефон',
};

const CardUser: React.FC<Props> = ({ user, guest, id }): JSX.Element => {
	return (
		<Card className={classes.CardComponent}>
			<Typography variant="h5" className={classes.typography}>
				About Me
			</Typography>
			<CardContent className={classes.content}>
				{user !== null ? (
					<RenderFields cardForm={userCardForm} user={user} />
				) : null}
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

const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	user: state.users.activeUser,
	guest: state.users.guest,
});

export default connect(mapStateToProps)(CardUser);
