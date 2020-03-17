import openSocket from 'socket.io-client';
import { Message } from '../interfaces';
const socket = openSocket(`http://localhost:8000`);

export class SocketService {
	static sendMessageAll = async (
		message: string,
		name: string,
		ownerId: string
	) => {
		socket.emit('send message', {
			message: message,
			name: name,
			ownerId: ownerId,
		});
	};
	static getAllMessage = async (funcPutMessageInState: any) => {
		socket.on('add message', (message: Message) => {
			funcPutMessageInState(message);
		});
	};
	static getMessageFromRoom = async (funcPutMessageInState: any) => {
		socket.on('add message in room', (message: Message) => {
			funcPutMessageInState(message);
		});
	};
	static enterInRoom = async (nameRoom: string) => {
		socket.emit('create', nameRoom);
	};
	static leaveFromRoom = async (nameRoom: string) => {
		socket.emit('leave', nameRoom);
	};
	static sendMessageInRoom = async (
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
}
