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
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { getDialogByMembersAction } from '../../store/dialogs/dialogs.actions';

interface Props {
	user: User;
	getDialogByMembersAction: (secondId: string) => void;
}

const CardOtherUser: React.FC<Props> = ({
	user,
	getDialogByMembersAction,
}): JSX.Element => {
	const history = useHistory();
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
				<Button
					size="medium"
					color="primary"
					onClick={() => {
						console.log(user._id);
						if (user._id) {
							getDialogByMembersAction(user._id);
							history.push(`chat-room`);
						}
					}}
				>
					Chatting
				</Button>
			</CardActions>
		</Card>
	);
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getDialogByMembersAction: (secondId: string) =>
		dispatch(getDialogByMembersAction(secondId)),
});
export default connect(null, mapDispatchToProps)(CardOtherUser);
