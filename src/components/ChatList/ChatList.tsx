import React from 'react';
import classes from './ChatList.module.scss';
import { Paper, Typography } from '@material-ui/core';
import { Dialog } from '../../interfaces';

interface Props {
	dialog: Dialog;
	activeDialogId: string;
}

const ChatList: React.FC<Props> = ({ dialog, activeDialogId }) => {
	return (
		<Paper
			elevation={activeDialogId === dialog._id ? 3 : 24}
			className={classes.ChatList}
		>
			<Typography className={classes.owner}>{dialog.members[1]}</Typography>
			<Typography className={classes.messageValue}>Photo</Typography>
		</Paper>
	);
};

export default ChatList;
