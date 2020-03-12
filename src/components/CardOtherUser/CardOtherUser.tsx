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

// import openSocket from 'socket.io-client';

import classes from './CardOtherUser.module.scss';
import { User } from '../../interfaces';
import { Link } from 'react-router-dom';
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
	//!
	// const [openChat, setOpenChat] = useState(false);
	// const socket = openSocket(`http://localhost:8000`);
	// const chatHandlter = (id: string | undefined) => {
	// 	if (id !== undefined) {
	// 		if (!openChat) {
	// 			socket.emit('create', id);
	// 			setOpenChat(true);
	// 		} else {
	// 			socket.emit('leave', id);
	// 			setOpenChat(false);
	// 		}
	// 	}
	// };
	//!
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
						}
						// chatHandlter(user._id);
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

// export default CardOtherUser;
