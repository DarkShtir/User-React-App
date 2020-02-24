import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core/';

import classes from './CardOtherUser.module.scss';
import { User } from '../../interfaces';
import { Link } from 'react-router-dom';

interface Props {
	user: User;
}

export const CardOtherUser: React.FC<Props> = ({ user }): JSX.Element => {
	return (
		<Card className={classes.CardOtherUser}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					component="img"
					alt="User Avatar"
					height="140"
					image={`${user.avatarUrl}`}
					title="Contemplative Reptile"
				/>
				<CardContent className={classes.textContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{user.firstName}
					</Typography>
					<Typography variant="body2" color="initial" component="p">
						{user.lastName} ({user.gender})
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.actions}>
				<Button
					size="medium"
					color="primary"
					component={Link}
					to={`/user/${user._id}`}
				>
					Enter
				</Button>
				<Button size="medium" color="primary">
					Add to friends
				</Button>
			</CardActions>
		</Card>
	);
};
