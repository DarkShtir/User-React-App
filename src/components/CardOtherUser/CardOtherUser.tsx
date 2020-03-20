import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core/';

import { User } from '../../interfaces';
import { getDialogByMembersAction } from '../../store/dialogs/dialogs.actions';

import classes from './CardOtherUser.module.scss';

interface Props {
	user: User;
	getDialogByMembersAction: (secondId: string) => void;
}

const CardOtherUser: React.FC<Props> = ({
	user,
	getDialogByMembersAction,
}): JSX.Element => {
	return (
		<Card className={classes.CardOtherUser}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					component="img"
					alt="User Avatar"
					height="140"
					image={`${user.avatarUrl}`}
					title={`${user.firstName} ${user.lastName}`}
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
						if (user._id) {
							getDialogByMembersAction(user._id);
						}
					}}
					component={Link}
					to={`/chat-room`}
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
