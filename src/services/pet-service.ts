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
	addPet = async (pet: object): Promise<object | undefined> => {
		try {
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
			await axios.delete(`/${id}`);
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
}

const petService = new PetService();
export default petService;
