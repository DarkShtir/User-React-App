import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch, Action } from 'redux';
import { Paper, Typography } from '@material-ui/core';

import { UserLogin } from '../../interfaces';
import UserService from '../../services/user-service';
import LoginForm from '../../components/LoginForm/LoginForm';
import { RootState } from '../../store/interfaces/RootState';
import { setUserIdAction } from '../../store/users/users.actions';
import classes from './LoginPage.module.scss';
import { setLoginAction } from '../../store/appState/appState.actions';

interface Props {
	setLogin: (isLogin: boolean) => void;
	setUserId: (id: string) => void;
}

const LoginPage: React.FC<Props> = ({ setLogin, setUserId }) => {
	enum loadingEnum {
		Loading,
		Loaded,
		Error,
	}
	const [loadingState, setLoading] = useState(loadingEnum.Loaded);
	const history = useHistory();

	const loginUser = async (loginData: UserLogin): Promise<void> => {
		try {
			const user = await UserService.login(loginData);
			setLoading(loadingEnum.Loading);
			if (!user && user === undefined) {
				setLoading(loadingEnum.Error);
				setLogin(false);
				throw new Error('Пользователь на найден!!');
			}
			const id = localStorage.getItem('id');
			if (id) {
				setUserId(id);
			}
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
				<Typography
					variant="h2"
					align="center"
					color="error"
					className={classes.errorMessage}
				>
					Пользователь не найден!
				</Typography>
			) : null}
		</Paper>
	);
};

const mapStateToProps = (state: RootState) => ({
	login: state.appState.login,
	id: state.users.id,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setLogin: (isLogin: boolean) => dispatch(setLoginAction(isLogin)),
	setUserId: (id: string) => dispatch(setUserIdAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
