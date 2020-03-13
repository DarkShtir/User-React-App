import React from 'react';
import classes from './ChatList.module.scss';
import { Typography, Avatar } from '@material-ui/core';
import { Dialog, User } from '../../interfaces';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { RootState } from '../../store/interfaces/RootState';
import { putActiveDialogInStateAction } from '../../store/dialogs/dialogs.actions';

interface Props {
	id: string;
	dialog: Dialog;
	activeDialogId: string;
	putActiveDialogInStateAction: (dialog: Dialog) => void;
}

const ChatList: React.FC<Props> = ({
	id,
	dialog,
	activeDialogId,
	putActiveDialogInStateAction,
}) => {
	const userArr = dialog.members.filter((user: User, index: number) => {
		if (user._id !== id) {
			return true;
		} else {
			return false;
		}
	});
	const otherUser = userArr[0];

	return (
		<div
			className={
				activeDialogId === dialog._id
					? classes.ChatListActive
					: classes.ChatList
			}
			onClick={() => {
				putActiveDialogInStateAction(dialog);
			}}
		>
			<Avatar
				sizes="500"
				alt={otherUser.firstName}
				src={otherUser.avatarUrl}
				className={classes.avatar}
			/>
			<Typography className={classes.name}>{otherUser.firstName}</Typography>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	activeDialogId: state.dialogs.activeDialogId,
	activeDialog: state.dialogs.activeDialog,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	putActiveDialogInStateAction: (dialog: Dialog) =>
		dispatch(putActiveDialogInStateAction(dialog)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
