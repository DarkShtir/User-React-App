import axios from '../axios/axios-photos';

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
		albumId: object,
		pageNum = 1,
		photosPerPage = 0,
		filter = false
	): Promise<void | undefined> => {
		try {
			const response = await axios.get(
				`/album/${albumId}?page=${pageNum}&photosPerPage=${photosPerPage}&filter=${filter}`
			);
			const photos = response.data;
			return photos;
		} catch (error) {
			console.log(
				'Error in album-service in method getAllPhotosByAlbumId (front)'
			);
			throw error;
		}
	};
}

const albumService = new AlbumService();
export default albumService;
