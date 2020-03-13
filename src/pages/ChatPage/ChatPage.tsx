import React, { useCallback, useEffect, useState, useRef } from 'react';
import openSocket from 'socket.io-client';
import { TextField, Button, Paper } from '@material-ui/core';
import classes from './ChatPage.module.scss';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Message, User, Dialog } from '../../interfaces';
import { getLoginUser } from '../../store/users/users.actions';
import { Action, Dispatch } from 'redux';
import ChatList from '../../components/ChatList/ChatList';
import { getAllUserDialogAction } from '../../store/dialogs/dialogs.actions';

interface Props {
	id: string;
	loginUser: User;
	dialogList: [Dialog] | null;
	activeDialogId: string;
	getLoginUser: () => void;
	getAllUserDialogAction: (id: string) => void;
}

const socket = openSocket(`http://localhost:8000`);

const ChatPage: React.FC<Props> = ({
	id,
	loginUser,
	dialogList,
	getLoginUser,
	getAllUserDialogAction,
}) => {
	const [value, setValue] = useState('');
	const [messages, setMessages] = useState<any>([]);

	const targetElement: any = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		getLoginUser();
	}, [getLoginUser]);

	useEffect(() => {
		getAllUserDialogAction(id);
	}, [getAllUserDialogAction, id]);

	const name = loginUser.firstName;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const submitHandler = useCallback(
		(event: React.FormEvent<HTMLButtonElement>): void => {
			event.preventDefault();
			if (value !== '') {
				socket.emit('send message', {
					message: value,
					name: name,
					ownerId: id,
				});
				setValue('');
			}
		},
		[value, id, name]
	);

	const getMessage = useCallback((data: any) => {
		setMessages((prevState: any) => {
			return [...prevState, data];
		});
	}, []);

	useEffect(() => {
		targetElement.current.scrollTo({ top: 9999, behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		socket.on('add message', (data: any) => {
			getMessage(data);
		});
	}, [getMessage]);

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
					<>
						{messages.map((message: Message, index: any) => {
							return (
								<MessageBubble
									value={message.message}
									yourMessage={message.ownerId === id}
									owner={message.name}
									key={index}
								/>
							);
						})}
					</>
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
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getLoginUser: () => dispatch(getLoginUser()),
	getAllUserDialogAction: (id: string) => dispatch(getAllUserDialogAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
