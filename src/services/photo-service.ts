import axios from '../axios/axios-photos';
// import { Photo } from '../interfaces';

axios.interceptors.request.use(request => {
	const token = localStorage.getItem('token');
	request.headers['Authorization'] = token ? `Bearer ${token}` : '';
	return request;
});

class AlbumService {
	addManyPhotos = async (
		ownerId: string,
		albumId: string,
		photos: any
	): Promise<object | undefined> => {
		try {
			const fileData = new FormData();
			fileData.append('ownerId', ownerId);
			fileData.append('albumId', albumId);
			// eslint-disable-next-line
			photos.map((photo: any) => {
				fileData.append('photos', photo);
			});
			const config = {
				headers: { 'Content-Type': 'multipart/form-data' },
			};
			const response = await axios.post('/albums/', fileData, config);
			const newPhotos = response.data;
			return newPhotos;
		} catch (error) {
			console.log('Error in photo-service in method Add (front)');
			throw error;
		}
	};

	getAllPhotosByAlbumId = async (
		albumId: object
	): Promise<void | undefined> => {
		try {
			const response = await axios.get(`/album/${albumId}`);
			const photos = response.data;
			return photos;
		} catch (error) {
			console.log(
				'Error in album-service in method getAllPhotosByAlbumId (front)'
			);
			throw error;
		}
	};
	// getAllAlbumByUserId = async (id: string): Promise<void | undefined> => {
	// 	try {
	// 		const response = await axios.get(`/user/${id}`);
	// 		const albums = response.data;
	// 		return albums;
	// 	} catch (error) {
	// 		console.log(
	// 			'Error in album-service in method getAllAlbumByUserId (front)'
	// 		);
	// 		throw error;
	// 	}
	// };
	// deleteAlbum = async (id: string): Promise<void | undefined> => {
	// 	try {
	// 		await axios.delete(`/${id}`);
	// 	} catch (error) {
	// 		console.log('Error in album-service in method delete (front)');
	// 		throw error;
	// 	}
	// };

	// updateAlbum = async (id: string, album: Album): Promise<void | undefined> => {
	// 	try {
	// 		const response = await axios.put(`/${id}`, album);
	// 		const updateAlbum = response.data.album;
	// 		return updateAlbum;
	// 	} catch (error) {
	// 		console.log('Error in album-service in method update (front)');
	// 		throw error;
	// 	}
	// };
}

const albumService = new AlbumService();
export default albumService;
