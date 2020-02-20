import { User } from '../interfaces';
import axios from '../axios/axios-users';

axios.interceptors.request.use(request => {
	const token = localStorage.getItem('token');
	request.headers['Authorization'] = token ? `Bearer ${token}` : '';
	return request;
});

//!!! Обязательно спросить про обработку PROMISE!!!
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.log(error);

		if (error.response.status === 400) {
			throw new Error('Упс, запрос не прошёл, проверьте введенную информацию!');
		} else if (error.response.status === 401) {
			throw new Error(
				'Эта информация доступна только авторизированным пользователям, авторизуйтесь'
			);
		} else if (error.message === 'Network Error') {
			throw new Error('Проблемы с интернет соединением!');
		}
		// return Promise.reject(error);
	}
);
class UserService {
	// users: User[];

	// constructor() {
	// 	this.users = [
	// 		{
	// 			_id: '1',
	// 			login: 'Vas',
	// 			password: '123456',
	// 			firstName: 'SuperVasya',
	// 			lastName: 'MegaPetrov',
	// 			nat: 'RU',
	// 			gender: 'Male',
	// 			phone: '+375 29 1234567',
	// 		},
	// 	];
	// }

	getAllUsers = async (): Promise<any> => {
		try {
			const response = await axios.get('/');
			const users = response.data;
			return users;
		} catch (error) {
			console.log('Error in user-servicein method getAllUsers (front)');
			throw error;
		}
	};

	getUserById = async (id: string): Promise<[User] | undefined> => {
		try {
			const response = await axios.get(`/${id}`);
			const user = response.data;
			return user;
		} catch (error) {
			console.log('Error in user-servicein method getUserById (front)');
			throw error;
		}
	};

	addUser = async (user: object): Promise<object | undefined> => {
		try {
			const response = await axios.post('/', user);
			const newUser = response.data;
			const token = newUser.token;
			this.setToken(token);
			localStorage.setItem('id', newUser.user._id);
			// console.log(token);
			return newUser;
		} catch (error) {
			console.log('Error in user-servicein method addUser (front)');
			throw error;
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
			console.log('Error in user-servicein method login (front)');
			throw error;
		}
	};

	logout = async (): Promise<void | undefined> => {
		try {
			await axios.post('/logout');
			localStorage.removeItem('token');
			localStorage.removeItem('id');
		} catch (error) {
			console.log('Error in user-servicein method logout (front)');
			throw error;
		}
	};

	setToken = async (token: string): Promise<void | undefined> => {
		try {
			if (token !== undefined) {
				await localStorage.setItem('token', token);
			}
		} catch (error) {
			console.log('Error in user-servicein method setToken (front)');
			throw error;
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
			// localStorage.removeItem('token');
		} catch (error) {
			console.log('Error in user-servicein method deleteUser (front)');
			throw error;
		}
	};

	updateUser = async (id: string, user: {}): Promise<void | undefined> => {
		try {
			const response = await axios.put(`/${id}`, user);
			const updateUser = response.data.user;
			return updateUser;
		} catch (error) {
			console.log('Error in user-servicein method UpdateUser (front)');
			throw error;
		}
	};

	setAvatar = async (id: string, avatar: any): Promise<void | undefined> => {
		try {
			const fileData = new FormData();
			fileData.append('avatar', avatar);
			const response = await axios.post(`../upload/`, fileData);

			const newUserAvatar = response.data;
			console.log(newUserAvatar);
			this.updateUser(id, { avatarUrl: newUserAvatar });
		} catch (error) {
			console.log('Error in user-servicein method setAvatar (front)');
			throw error;
		}
	};

	getUserPets = async (id: string): Promise<void | undefined> => {
		try {
			const response = await axios.get(`/${id}/pets`);
			const pets = response.data;
			return pets;
		} catch (error) {
			console.log('Error in user-servicein method getUserPets (front)');
			// throw error;
		}
	};
}

const userService = new UserService();
export default userService;
