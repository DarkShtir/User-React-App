import { Pet } from '../interfaces';
import axios from '../axios/axios-pets';

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
class PetService {
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

	// getAllPets = async (): Promise<[Pets] | undefined> => {
	// 	try {
	// 		const response = await axios.get('/');
	// 		const pets = response.data;
	// 		return pets;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// getPetById = async (id: string): Promise<[Pets] | undefined> => {
	// 	try {
	// 		const response = await axios.get(`/${id}`);
	// 		const pet = response.data;
	// 		return pet;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	addPet = async (pet: object): Promise<object | undefined> => {
		try {
			console.log(pet);
			const response = await axios.post('/', pet);
			const newPet = response.data;
			return newPet;
		} catch (error) {
			console.log('Error in pet-service in method Add (front)');
			throw error;
		}
	};

	deletePet = async (id: string): Promise<void | undefined> => {
		try {
			const token = localStorage.getItem('token');
			const options = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios.delete(`/${id}`, options);
		} catch (error) {
			console.log('Error in pet-service in method delete (front)');
			throw error;
		}
	};

	updatePet = async (id: string, pet: Pet): Promise<void | undefined> => {
		try {
			const response = await axios.put(`/${id}`, pet);
			const updatePet = response.data.pet;
			return updatePet;
		} catch (error) {
			console.log('Error in pet-service in method update (front)');
			throw error;
		}
	};

	// setAvatar = async (id: string, avatar: any): Promise<void | undefined> => {
	// 	try {
	// 		const fileData = new FormData();
	// 		fileData.append('avatar', avatar);
	// 		const response = await axios.post(`../upload/`, fileData);

	// 		const newUserAvatar = response.data;
	// 		console.log(newUserAvatar);
	// 		this.updateUser(id, { avatarUrl: newUserAvatar });
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// getUserPets = async (id: string): Promise<void | undefined> => {
	// 	try {
	// 		const response = await axios.get(`/${id}/pets`);
	// 		const pets = response.data;
	// 		return pets;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
}

const petService = new PetService();
export default petService;
