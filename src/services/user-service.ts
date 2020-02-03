import { User } from '../interfaces';
import axios from 'axios';

class UserService {
	users: User[];

	constructor() {
		this.users = [
			{
				_id: '1',
				login: 'Vas',
				password: '123456',
				firstName: 'Vasya',
				lastName: 'Petrov',
				nat: 'RU',
				gender: 'Male',
				phone: '+375 29 1234567',
			},
		];
	}

	getAllUsers = async (): Promise<any> => {
		try {
			const response = await axios.get('http://localhost:8080/users/');
			const users = response.data;
			return users;
		} catch (error) {
			console.log(error);
		}
	};

	addUser = (user: object): void => {
		const newUsers = [...this.users, user];
		console.log(newUsers);
		this.getAllUsers();
		// this.users = newUsers;
	};
}

const userService = new UserService();
export default userService;
