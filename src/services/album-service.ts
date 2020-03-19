import axios from '../axios/axios-albums';
import { Album } from '../interfaces';

axios.interceptors.request.use(request => {
	const token = localStorage.getItem('token');
	request.headers['Authorization'] = token ? `Bearer ${token}` : '';
	return request;
});

class AlbumService {
	addAlbum = async (album: object): Promise<object | undefined> => {
		try {
			const response = await axios.post('/', album);
			const newAlbum = response.data;
			return newAlbum;
		} catch (error) {
			console.log('Error in album-service in method Add (front)');
			throw error;
		}
	};

	deleteAlbum = async (id: string): Promise<void | undefined> => {
		try {
			await axios.delete(`/${id}`);
		} catch (error) {
			console.log('Error in album-service in method delete (front)');
			throw error;
		}
	};

	updateAlbum = async (
		id: string,
		album: Album | {}
	): Promise<void | undefined> => {
		try {
			const response = await axios.put(`/${id}`, album);
			const updateAlbum = response.data.album;
			return updateAlbum;
		} catch (error) {
			console.log('Error in album-service in method update (front)');
			throw error;
		}
	};
	getAllAlbumByUserId = async (id: string): Promise<void | undefined> => {
		try {
			const response = await axios.get(`/user/${id}`);
			const albums = response.data;
			return albums;
		} catch (error) {
			console.log(
				'Error in album-service in method getAllAlbumByUserId (front)'
			);
			throw error;
		}
	};
}

const albumService = new AlbumService();
export default albumService;
