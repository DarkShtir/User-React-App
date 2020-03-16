import openSocket from 'socket.io-client';
import { Message } from '../interfaces';
// const socket = openSocket(`http://localhost:8000`);

class SocketService {
	// sendMessageAll = async (message: string, name: string, ownerId: string) => {
	// 	socket.emit('send message', {
	// 		message: message,
	// 		name: name,
	// 		ownerId: ownerId,
	// 	});
	// };
	// getAllMessage = async (funcPutMessageInState: any) => {
	// 	socket.on('add message', (message: Message) => {
	// 		funcPutMessageInState(message);
	// 	});
	// };
	// enterInRoom = async (nameRoom: string) => {
	// 	socket.emit('create', nameRoom);
	// };
	// leaveFromRoom = async (nameRoom: string) => {
	// 	socket.emit('leave', nameRoom);
	// };
	// sendMessageInRoom = async (
	// 	message: string,
	// 	name: string,
	// 	ownerId: string,
	// 	dialogId: string
	// ) => {
	// 	socket.emit('send message in Room', {
	// 		message: message,
	// 		name: name,
	// 		ownerId: ownerId,
	// 		dialogId: dialogId,
	// 	});
	// };
	// getMessagesfromRoom = async (room: string) => {
	// 	await socket.emit('get messages from Room', room);
	// };
}

const socketService = new SocketService();
export default socketService;
