import React, { useState } from 'react';
import UserService from '../../services/user-service';
import { UserLogin } from '../../interfaces';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import classes from './LoginPage.module.scss';
import { Dispatch, Action } from 'redux';
import { RootState } from '../../store/interfaces/RootState';
import {
	setLoginAction,
	setUserIdAction,
} from '../../store/users/users.actions';
import { connect } from 'react-redux';

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

const mapStateToProps = (state: RootState) => ({
	login: state.users.login,
	id: state.users.id,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setLogin: (isLogin: boolean) => dispatch(setLoginAction(isLogin)),
	setUserId: (id: string) => dispatch(setUserIdAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
