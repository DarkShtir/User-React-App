import React from 'react';
import classes from './ChatList.module.scss';
import { Typography, Avatar } from '@material-ui/core';
import { Dialog, User } from '../../interfaces';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { RootState } from '../../store/interfaces/RootState';
import { putActiveDialogInStateAction } from '../../store/dialogs/dialogs.actions';
// import socketService from '../../services/socket-service';

interface Props {
	id: string;
	dialog: Dialog;
	activeDialogId: string;
	putActiveDialogInStateAction: (dialog: Dialog | null) => void;
	enterInRoom: (nameRoom: string) => void;
	leaveFromRoom: (nameRoom: string) => void;
}

const ChatList: React.FC<Props> = ({
	id,
	dialog,
	activeDialogId,
	putActiveDialogInStateAction,
	enterInRoom,
	leaveFromRoom,
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
				if (activeDialogId !== dialog._id && dialog._id !== undefined) {
					putActiveDialogInStateAction(dialog);
					enterInRoom(dialog._id);
				} else if (dialog._id !== undefined && activeDialogId === dialog._id) {
					putActiveDialogInStateAction(null);
					leaveFromRoom(dialog._id);
				}
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
	putActiveDialogInStateAction: (dialog: Dialog | null) =>
		dispatch(putActiveDialogInStateAction(dialog)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
