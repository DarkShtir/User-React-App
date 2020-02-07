import axios from 'axios';

// axios.interceptors.request.use(request => {
// 	const token = localStorage.getItem('token');
// 	request.headers['Authorization'] = token ? `Bearer ${token}` : '';
// 	return request;
// });

export default axios.create({
	baseURL: 'http://localhost:8080/users/',
});
