import React, { useCallback, useEffect, useState } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button, Paper } from '@material-ui/core';

import DialogsAndMessages from '../../components/DialogsAndMessages/DialogsAndMessages';
import { RootState } from '../../store/interfaces/RootState';
import { SocketService } from '../../services/socket-service';
import {
	putOneMessagesInStateAction,
	putMessagesFromChatAction,
} from '../../store/dialogs/dialogs.actions';
import { Message, User } from '../../interfaces';

import classes from './ChatContainer.module.scss';

interface Props {
	id: string;
	loginUser: User;
	activeDialogId: string;
	putOneMessagesInStateAction: (message: Message | null) => void;
	putMessagesFromChatAction: (message: Message | null) => void;
}

const ChatContainer: React.FC<Props> = ({
	id,
	loginUser,
	activeDialogId,
	putOneMessagesInStateAction,
	putMessagesFromChatAction,
}) => {
	const [value, setValue] = useState('');
	const getMessages = useCallback(() => {
		SocketService.getMessageFromRoom(putOneMessagesInStateAction);
		SocketService.getAllMessage(putMessagesFromChatAction);
	}, [putOneMessagesInStateAction, putMessagesFromChatAction]);

	useEffect(() => {
		getMessages();

		return () => {
			SocketService.removeAllListeners();
			putOneMessagesInStateAction(null);
			putMessagesFromChatAction(null);
		};
	}, [getMessages, putOneMessagesInStateAction, putMessagesFromChatAction]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const submitHandler = useCallback(
		(event: React.FormEvent<HTMLButtonElement>): void => {
			event.preventDefault();
			if (value !== '') {
				if (activeDialogId !== '') {
					SocketService.sendMessageInRoom(
						value,
						loginUser.firstName,
						id,
						activeDialogId
					);
				} else {
					SocketService.sendMessageAll(value, loginUser.firstName, id);
				}
				setValue('');
			}
		},
		[value, id, loginUser.firstName, activeDialogId]
	);

	return (
		<Paper className={classes.ChatContainer}>
			<DialogsAndMessages
				enterInRoom={SocketService.enterInRoom}
				leaveFromRoom={SocketService.leaveFromRoom}
			/>

			<form action="" className={classes.sendForm}>
				<TextField
					label="Введи ввесточку"
					multiline
					rows="4"
					variant="outlined"
					className={classes.messageInput}
					value={value}
					onChange={handleChange}
				/>
				<Button
					variant="outlined"
					className={classes.sendButton}
					onClick={submitHandler}
				>
					Отправить весточку
				</Button>
			</form>
		</Paper>
	);
};

const mapStateToProps = (state: RootState) => ({
	id: state.users.id,
	loginUser: state.users.loginUser,
	activeDialogId: state.dialogs.activeDialogId,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	putOneMessagesInStateAction: (message: Message | null) =>
		dispatch(putOneMessagesInStateAction(message)),
	putMessagesFromChatAction: (message: Message | null) =>
		dispatch(putMessagesFromChatAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
