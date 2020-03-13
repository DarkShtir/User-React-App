import axios from '../axios/axios-dialogs';

axios.interceptors.request.use(request => {
	const token = localStorage.getItem('token');
	request.headers['Authorization'] = token ? `Bearer ${token}` : '';
	return request;
});

class DialogService {
	createDialog = async (dialog: object): Promise<object | undefined> => {
		try {
			const response = await axios.post('/', dialog);
			const newDialog = response.data;
			return newDialog;
		} catch (error) {
			console.log('Error in dialog-service in method Add (front)');
			throw error;
		}
	};

	getAllDialogByUserId = async (id: string): Promise<void | undefined> => {
		try {
			const response = await axios.get(`/dialogs/${id}`);
			const dialogs = response.data;
			return dialogs;
		} catch (error) {
			console.log(
				'Error in dialogs-service in method getAllDialogByUserId (front)'
			);
			throw error;
		}
	};
	getDialogByMembersId = async (
		firstId: string,
		secondId: string
	): Promise<void | undefined> => {
		console.log(firstId);
		console.log(secondId);
		try {
			const response = await axios.get(
				`/members?firstId=${firstId}&secondId=${secondId}`
			);
			const dialogs = response.data;
			return dialogs;
		} catch (error) {
			console.log(
				'Error in dialogs-service in method getAllDialogByUserId (front)'
			);
			throw error;
		}
	};
}

const dialogService = new DialogService();
export default dialogService;
