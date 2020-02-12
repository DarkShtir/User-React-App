import React, { useContext } from 'react';
import UserService from '../../services/user-service';
import { UserLogin } from '../../interfaces';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { isLoginContext } from '../../components/utils/state';

const LoginPage: React.FC = () => {
	const { setUserId, setUser, setLogin } = useContext<any>(isLoginContext);

	const history = useHistory();

	const loginUser = async (loginData: UserLogin): Promise<void> => {
		try {
			const user = await UserService.login(loginData);
			if (!user && user === undefined) {
				console.log('Пользователь на найден!!');
			}

			setUserId(localStorage.getItem('id'));
			setUser(user);
			setLogin(true);
			history.push(`user/${localStorage.getItem('id')}`);
		} catch (error) {
			console.log(error);
		}
	};
	//TODO Added route on user page after login
	return (
		<Paper>
			<LoginForm onUserLogin={loginUser} />
		</Paper>
	);
};

export default LoginPage;
