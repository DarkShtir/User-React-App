import React from 'react';
import UserService from '../../services/user-service';
import { UserLogin } from '../../interfaces';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Paper } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
	// let id: any = '';
	// const history = useHistory();

	const loginUser = async (loginData: UserLogin): Promise<void | undefined> => {
		const data = await UserService.login(loginData);
		if (!data && data === undefined) {
			console.log('Пользователь на найден!!');
		}
		// id = localStorage.getItem('id');
		// history.push(`/user/${id}`);
	};
	//TODO Added route on user page after login
	return (
		<Paper>
			<LoginForm onUserLogin={loginUser} />
		</Paper>
	);
};

export default LoginPage;
