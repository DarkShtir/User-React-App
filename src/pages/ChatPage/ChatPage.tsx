import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import ChatList from '../../components/ChatList/ChatList';
import { RootState } from '../../store/interfaces/RootState';
import { getLoginUser } from '../../store/users/users.actions';
import {
	getAllUserDialogAction,
	putOneMessagesInStateAction,
	putMessagesFromChatAction,
} from '../../store/dialogs/dialogs.actions';
import { Message, User, Dialog } from '../../interfaces';
import classes from './ChatPage.module.scss';
// import socketService from '../../services/socket-service';
const socket = openSocket(`http://localhost:8000`);

//!!! ПОЛУЧЕНИЕ СООБЩЕНИЙ ИЗ МОНГИ
//!! Вывод сообщений на экран

interface Props {
	id: string;
	loginUser: User;
	dialogList: [Dialog] | null;
	activeDialogId: string;
	messagesActiveDialog: [Message] | null;
	messagesGeneralChat: [Message] | null;
	getLoginUser: () => void;
	getAllUserDialogAction: (id: string) => void;
	putOneMessagesInStateAction: (message: Message) => void;
	putMessagesFromChatAction: (message: Message) => void;
}

const ChatPage: React.FC<Props> = ({
	id,
	loginUser,
	dialogList,
	activeDialogId,
	messagesActiveDialog,
	messagesGeneralChat,
	getLoginUser,
	getAllUserDialogAction,
	putOneMessagesInStateAction,
	putMessagesFromChatAction,
}) => {
	const [value, setValue] = useState('');

	const targetElement: any = useRef<(HTMLDivElement | null)[]>([]);

	const sendMessageInRoom = (
		message: string,
		name: string,
		ownerId: string,
		dialogId: string
	) => {
		socket.emit('send message in Room', {
			message: message,
			name: name,
			ownerId: ownerId,
			dialogId: dialogId,
		});
	};

	const sendMessageAll = (message: string, name: string, ownerId: string) => {
		socket.emit('send message', {
			message: message,
			name: name,
			ownerId: ownerId,
		});
	};

	const enterInRoom = (nameRoom: string) => {
		socket.emit('create', nameRoom);
	};
	const leaveFromRoom = (nameRoom: string) => {
		socket.emit('leave', nameRoom);
	};

	useEffect(() => {
		getLoginUser();
	}, [getLoginUser]);

	useEffect(() => {
		getAllUserDialogAction(id);
	}, [getAllUserDialogAction, id]);

	const getMessages = useCallback(() => {
		socket.on('add message in room', (message: Message) => {
			putOneMessagesInStateAction(message);
		});
		socket.on('add message', (message: Message) => {
			putMessagesFromChatAction(message);
		});
	}, [putOneMessagesInStateAction, putMessagesFromChatAction]);

	useEffect(() => {
		getMessages();
	}, [getMessages]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const submitHandler = useCallback(
		(event: React.FormEvent<HTMLButtonElement>): void => {
			event.preventDefault();
			if (value !== '') {
				if (activeDialogId !== '') {
					sendMessageInRoom(value, loginUser.firstName, id, activeDialogId);
				} else {
					sendMessageAll(value, loginUser.firstName, id);
				}
				setValue('');
			}
		},
		[value, id, loginUser.firstName, activeDialogId]
	);

	useEffect(() => {
		targetElement.current.scrollTo({ top: 9999, behavior: 'smooth' });
	}, [messagesActiveDialog]);

	return (
		<Paper className={classes.ChatPage}>
			<div className={classes.dialogsAndMessages}>
				<div className={classes.chatListsWraper}>
					{dialogList
						? dialogList.map((dialog, index) => {
								return (
									<React.Fragment key={index}>
										<ChatList
											dialog={dialog}
											enterInRoom={enterInRoom}
											leaveFromRoom={leaveFromRoom}
										/>
									</React.Fragment>
								);
						  })
						: null}
				</div>
				<Paper className={classes.messagesForm} ref={targetElement}>
					{messagesGeneralChat === null && activeDialogId === '' ? (
						<Typography variant="h5" align="center">
							Это общий онлайн-чат, после перезагрузки страницы или смены
							диалога история сообщений очищается!
						</Typography>
					) : null}
					{messagesActiveDialog && activeDialogId.length > 0
						? messagesActiveDialog.map((message: Message, index: any) => {
								return (
									<MessageBubble
										value={message.message}
										yourMessage={message.ownerId === id}
										owner={message.name}
										key={index}
									/>
								);
						  })
						: null}
					{messagesGeneralChat && activeDialogId === ''
						? messagesGeneralChat.map((message: Message, index: any) => {
								return (
									<MessageBubble
										value={message.message}
										yourMessage={message.ownerId === id}
										owner={message.name}
										key={index}
									/>
								);
						  })
						: null}
				</Paper>
			</div>
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
	dialogList: state.dialogs.dialogsList,
	activeDialogId: state.dialogs.activeDialogId,
	messagesActiveDialog: state.dialogs.messagesActiveDialog,
	messagesGeneralChat: state.dialogs.messagesGeneralChat,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getLoginUser: () => dispatch(getLoginUser()),
	getAllUserDialogAction: (id: string) => dispatch(getAllUserDialogAction(id)),
	putOneMessagesInStateAction: (message: Message) =>
		dispatch(putOneMessagesInStateAction(message)),
	putMessagesFromChatAction: (message: Message) =>
		dispatch(putMessagesFromChatAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
