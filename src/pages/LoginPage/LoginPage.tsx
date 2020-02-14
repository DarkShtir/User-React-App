import React, { useContext, useState } from 'react';
import UserService from '../../services/user-service';
import { UserLogin } from '../../interfaces';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { isLoginContext } from '../../components/utils/state';
import classes from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
	const { setUserId, setUser, setLogin } = useContext<any>(isLoginContext);
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const [loadingState, setLoading] = useState();
	const history = useHistory();

	const loginUser = async (loginData: UserLogin): Promise<void> => {
		try {
			const user = await UserService.login(loginData);
			setLoading(loadingEnum.Loading);
			if (!user && user === undefined) {
				setLoading(loadingEnum.Error);
				throw new Error('Пользователь на найден!!');
			}

			setUserId(localStorage.getItem('id'));
			setUser(user);
			setLogin(true);
			setLoading(loadingEnum.Loaded);
			history.push(`user/${localStorage.getItem('id')}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Paper className={classes.LoginPage}>
			<LoginForm onUserLogin={loginUser} />
			{loadingState === loadingEnum.Error ? (
				<Typography variant="h2" align="center" color="error">
					Пользователь не найден!
				</Typography>
			) : null}
		</Paper>
	);
	// switch (loadingState) {
	// 	case loadingEnum.Error:
	// 		return <ErrorIndicator />;
	// 	case loadingEnum.Loading:
	// 		return <Loading />;
	// 	default:
	// 		return (
	// 			<Paper>
	// 				<LoginForm onUserLogin={loginUser} />
	// 			</Paper>
	// 		);
	// }
};

export default LoginPage;
