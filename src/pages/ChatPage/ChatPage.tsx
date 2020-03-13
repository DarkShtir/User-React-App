import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField, Button, Paper } from '@material-ui/core';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import ChatList from '../../components/ChatList/ChatList';
import { RootState } from '../../store/interfaces/RootState';
import { getLoginUser } from '../../store/users/users.actions';
import {
	getAllUserDialogAction,
	getMessagesFromActiveDialogAction,
} from '../../store/dialogs/dialogs.actions';
import { Message, User, Dialog } from '../../interfaces';
import classes from './ChatPage.module.scss';
import socketService from '../../services/socket-service';
//!!! ПОЛУЧЕНИЕ СООБЩЕНИЙ ИЗ МОНГИ
//!! Вывод сообщений на экран
interface Props {
	id: string;
	loginUser: User;
	dialogList: [Dialog] | null;
	activeDialogId: string;
	messagesActiveDialog: [Message] | null;
	getLoginUser: () => void;
	getAllUserDialogAction: (id: string) => void;
	getMessagesFromActiveDialogAction: () => void;
}

const ChatPage: React.FC<Props> = ({
	id,
	loginUser,
	dialogList,
	// activeDialogId,
	messagesActiveDialog,
	getLoginUser,
	getAllUserDialogAction,
	// getMessagesFromActiveDialogAction,
}) => {
	const [value, setValue] = useState('');
	// const [messages, setMessages] = useState<any>([]);

	const targetElement: any = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		getLoginUser();
	}, [getLoginUser]);

	useEffect(() => {
		getAllUserDialogAction(id);
	}, [getAllUserDialogAction, id]);

	// useEffect(() => {
	// 	getMessagesFromActiveDialogAction();
	// }, [getMessagesFromActiveDialogAction]);

	// const name = loginUser.firstName;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	// const submitHandler = useCallback(
	// 	(event: React.FormEvent<HTMLButtonElement>): void => {
	// 		event.preventDefault();
	// 		if (value !== '') {
	// 			if (activeDialogId) {
	// 				socketService.sendMessageInRoom(value, name, id, activeDialogId);
	// 			} else {
	// 				socketService.sendMessageAll(value, name, id);
	// 			}
	// 			setValue('');
	// 		}
	// 	},
	// 	[value, id, name, activeDialogId]
	// );

	// const getMessage = useCallback((data: any) => {
	// 	putActivDialogInStateAction(data);
	// 	// setMessages((prevState: any) => {
	// 	// 	return [...prevState, data];
	// 	// });
	// }, []);

	useEffect(() => {
		targetElement.current.scrollTo({ top: 9999, behavior: 'smooth' });
	}, []);

	// useEffect(() => {
	// 	socketService.getAllMessage(getMessage);
	// }, [getMessage]);

	return (
		<Paper className={classes.ChatPage}>
			<div className={classes.dialogsAndMessages}>
				<div className={classes.chatListsWraper}>
					{dialogList
						? dialogList.map((dialog, index) => {
								return (
									<React.Fragment key={index}>
										<ChatList dialog={dialog} />
									</React.Fragment>
								);
						  })
						: null}
				</div>
				<Paper className={classes.messagesForm} ref={targetElement}>
					{messagesActiveDialog
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
					// onClick={submitHandler}
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
	messagesActivDialog: state.dialogs.messagesActiveDialog,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getLoginUser: () => dispatch(getLoginUser()),
	getAllUserDialogAction: (id: string) => dispatch(getAllUserDialogAction(id)),
	getMessagesFromActiveDialogAction: () =>
		dispatch(getMessagesFromActiveDialogAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
