import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	CardMedia,
} from '@material-ui/core';
import classes from './CardAvatar.module.scss';
import { User } from '../../interfaces';

interface Props {
	user: User;
	guest: boolean;
}

const CardAvatar: React.FC<Props> = ({ user, guest }): JSX.Element => {
	return (
		<Card className={classes.CardComponent}>
			<CardContent>
				<Typography className={classes.title} gutterBottom>
					Cyber-Хата сельчанина: <b>{user.firstName}</b>
				</Typography>
				<CardMedia
					className={classes.media}
					component="img"
					alt="Holop Avatar"
					height="350"
					src={`http://localhost:8080/static/${user.avatarUrl}`}
					title="My Avatar"
				/>
				<Typography variant="h5" component="h2" className={classes.name}>
					{user.firstName}, {user.lastName} ({user.login})
				</Typography>
				<Typography className={classes.pos}>
					Цитатка про капусту, розы, и юных Хацкеров ХАРДКОД!!!
				</Typography>
			</CardContent>
			<CardActions>
				{!guest ? (
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						size="small"
						// disabled={guest}
					>
						Edit Аву ёпт
					</Button>
				) : null}
			</CardActions>
		</Card>
	);
};

export default CardAvatar;
