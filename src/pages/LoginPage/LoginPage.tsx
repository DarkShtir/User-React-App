import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch, Action } from 'redux';
import { Paper, Typography } from '@material-ui/core';

import LoginForm from '../../components/LoginForm/LoginForm';
import { RootState } from '../../store/interfaces/RootState';
import { loginUserAction } from '../../store/users/users.actions';
import { UserLogin } from '../../interfaces';

import classes from './LoginPage.module.scss';
import loadingEnum from '../../components/utils/loadingStateEnum';
import Loading from '../../components/shared/Loading/Loading';

interface Props {
	id: string;
	statusApp: loadingEnum;
	login: boolean;
	loginUserAction: (loginData: UserLogin) => void;
}

const LoginPage: React.FC<Props> = ({
	id,
	statusApp,
	login,
	loginUserAction,
}) => {
	const history = useHistory();

	const loginUser = (loginData: UserLogin): void => {
		loginUserAction(loginData);
	};
	useEffect(() => {
		if (login && statusApp === loadingEnum.Loaded) {
			history.push(`user/${id}`);
		}
	}, [statusApp, login, history, id]);

	return (
		<Paper className={classes.LoginPage}>
			<LoginForm onUserLogin={loginUser} />
			{statusApp === loadingEnum.Loading ? <Loading /> : null}
			{statusApp === loadingEnum.Error ? (
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
	id: state.users.id,
	statusApp: state.appState.statusApp,
	login: state.appState.login,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	loginUserAction: (loginData: UserLogin) =>
		dispatch(loginUserAction(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
