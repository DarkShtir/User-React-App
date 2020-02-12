import { User } from '../interfaces';
import axios from '../axios/axios-user';

axios.interceptors.request.use(request => {
	const token = localStorage.getItem('token');
	request.headers['Authorization'] = token ? `Bearer ${token}` : '';
	return request;
});
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

	getAllUsers = async (): Promise<// [User] | undefined
	any> => {
		try {
			const response = await axios.get('/');
			const users = response.data;
			console.log(users);
			return users;
		} catch (error) {
			console.log(error);
		}
	};

	getUserById = async (id: string): Promise<[User] | undefined> => {
		try {
			const response = await axios.get(`/${id}`);
			const user = response.data;
			return user;
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

	login = async (loginData: object): Promise<object | undefined> => {
		try {
			const response = await axios.post('/login', loginData);
			const user = response.data;
			const token = user.token;
			this.setToken(token);
			localStorage.setItem('id', user.user._id);

			return user.user;
		} catch (error) {
			console.log(error);
		}
	};

	logout = async (): Promise<void | undefined> => {
		try {
			await axios.post('/logout');
			localStorage.removeItem('token');
			localStorage.removeItem('id');
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

	updateUser = async (id: string, user: {}): Promise<void | undefined> => {
		try {
			const response = await axios.put(`/${id}`, user);
			const updateUser = response.data.user;
			return updateUser;
		} catch (error) {
			console.log(error);
		}
	};

	updateUserAvatar = async (
		id: string,
		user: {}
	): Promise<void | undefined> => {
		try {
			const response = await axios.put(`/${id}`, user);
			const updateUser = response.data.user;
			return updateUser;
		} catch (error) {
			console.log(error);
		}
	};

	getUserPets = async (id: string): Promise<void | undefined> => {
		try {
			const response = await axios.get(`/${id}/pets`);
			const pets = response.data;
			return pets;
		} catch (error) {
			console.log(error);
		}
	};
}

const userService = new UserService();
export default userService;
