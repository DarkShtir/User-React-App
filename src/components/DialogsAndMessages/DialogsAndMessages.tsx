import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';

import { RootState } from '../../store/interfaces/RootState';
import ChatList from '../ChatList/ChatList';
import MessageBubble from '../MessageBubble/MessageBubble';
import { Dialog, Message } from '../../interfaces';

import classes from './DialogsAndMessages.module.scss';

interface Props {
	dialogList: [Dialog] | null;
	messagesActiveDialog: [Message] | null;
	messagesGeneralChat: [Message] | null;
	activeDialogId: string;
	id: string;
	enterInRoom: (nameRoom: string) => void;
	leaveFromRoom: (nameRoom: string) => void;
}

const DialogsAndMessages: React.FC<Props> = ({
	dialogList,
	messagesActiveDialog,
	messagesGeneralChat,
	activeDialogId,
	id,
	enterInRoom,
	leaveFromRoom,
}) => {
	const targetElement: any = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		targetElement.current.scrollTo({ top: 9999, behavior: 'smooth' });
	}, [messagesActiveDialog, messagesGeneralChat]);

	const renderDialogList = () => {
		if (dialogList) {
			return dialogList.map((dialog, index) => {
				return (
					<React.Fragment key={index}>
						<ChatList
							dialog={dialog}
							enterInRoom={enterInRoom}
							leaveFromRoom={leaveFromRoom}
						/>
					</React.Fragment>
				);
			});
		} else {
			return null;
		}
	};

	const renderMessages = () => {
		if (messagesGeneralChat === null && activeDialogId === '') {
			return (
				<Typography variant="h5" align="center">
					Это общий онлайн-чат, после перезагрузки страницы или смены диалога
					история сообщений очищается!
				</Typography>
			);
		} else if (messagesGeneralChat && activeDialogId === '') {
			return messagesGeneralChat.map((message: Message, index: any) => {
				return (
					<MessageBubble
						value={message.message}
						yourMessage={message.ownerId === id}
						owner={message.name}
						key={index}
					/>
				);
			});
		} else if (messagesActiveDialog && activeDialogId.length > 0) {
			return messagesActiveDialog.map((message: Message, index: any) => {
				return (
					<MessageBubble
						value={message.message}
						yourMessage={message.ownerId === id}
						owner={message.name}
						key={index}
					/>
				);
			});
		} else {
			return null;
		}
	};

	return (
		<div className={classes.DialogsAndMessages}>
			<div className={classes.chatListsWraper}>{renderDialogList()}</div>

			<Paper className={classes.messagesForm} ref={targetElement}>
				{renderMessages()}
			</Paper>
		</div>
	);
};

const mapStateToProps = (state: RootState) => ({
	dialogList: state.dialogs.dialogsList,
	messagesActiveDialog: state.dialogs.messagesActiveDialog,
	messagesGeneralChat: state.dialogs.messagesGeneralChat,
	activeDialogId: state.dialogs.activeDialogId,
	id: state.users.id,
});

export default connect(mapStateToProps)(DialogsAndMessages);
