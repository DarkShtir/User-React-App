import React, { useCallback, useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { TextField, Button, Paper } from '@material-ui/core';
import classes from './ChatPage.module.scss';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import { connect } from 'react-redux';
import { RootState } from '../../store/interfaces/RootState';
import { Message, User } from '../../interfaces';
import { getLoginUser } from '../../store/users/users.actions';
import { Action, Dispatch } from 'redux';

interface Props {
	id: string;
	loginUser: User;
	getLoginUser: () => void;
}

const socket = openSocket(`http://localhost:8000`);

const ChatPage: React.FC<Props> = ({ id, loginUser, getLoginUser }) => {
	const [value, setValue] = useState('');
	const [messages, setMessages] = useState<any>([]);

	useEffect(() => {
		getLoginUser();
	}, [getLoginUser]);

	const name = loginUser.firstName;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const submitHandler = useCallback(
		(event: React.FormEvent<HTMLButtonElement>): void => {
			event.preventDefault();
			socket.emit('send message', {
				message: value,
				name: name,
				ownerId: id,
			});
			setValue('');
		},
		[value, id, name]
	);

	const getMessage = useCallback((data: any) => {
		setMessages((prevState: any) => {
			return [...prevState, data];
		});
	}, []);

	useEffect(() => {
		socket.on('add message', (data: any) => {
			getMessage(data);
		});
	}, [getMessage]);

	return (
		<Paper className={classes.ChatPage}>
			<Paper className={classes.messagesForm}>
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
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	getLoginUser: () => dispatch(getLoginUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
