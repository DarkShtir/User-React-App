import { User } from '../interfaces';
import axios from '../axios/axios-user';

class UserService {
	users: User[];

	constructor() {
		this.users = [
			{
				_id: '1',
				login: 'Vas',
				password: '123456',
				firstName: 'SuperVasya',
				lastName: 'MegaPetrov',
				nat: 'RU',
				gender: 'Male',
				phone: '+375 29 1234567',
			},
		];
	}

	getAllUsers = async (): Promise<[User] | undefined> => {
		try {
			const response = await axios.get('/');
			const users = response.data;
			return users;
		} catch (error) {
			console.log(error);
		}
	};

	addUser = async (user: object): Promise<object | undefined> => {
		try {
			const response = await axios.post('/', user);
			const newUser = response.data;
			const token = newUser.token;
			this.setToken(token);
			console.log(token);
			return newUser;
		} catch (error) {
			console.log(error);
		}
	};
	//!Need Add login form
	login = async (loginData: object): Promise<object | undefined> => {
		try {
			const response = await axios.post('/login', loginData);
			const myData = response.data;
			return myData;
		} catch (error) {
			console.log(error);
		}
	};
	//TODO added logout button on header
	logout = async (): Promise<void | undefined> => {
		try {
			const token = localStorage.getItem('token');
			const options = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios.post('/logout', options);
			localStorage.removeItem('token');
		} catch (error) {
			console.log(error);
		}
	};

	setToken = async (token: string): Promise<void | undefined> => {
		try {
			if (token !== undefined) {
				await localStorage.setItem('token', token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	deleteUser = async (id: string): Promise<void | undefined> => {
		try {
			const token = localStorage.getItem('token');
			const options = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios.delete(`/${id}`, options);
			localStorage.removeItem('token');
		} catch (error) {
			console.log(error);
		}
	};
}

const userService = new UserService();
export default userService;
