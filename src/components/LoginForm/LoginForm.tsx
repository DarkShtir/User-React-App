import React, { useState } from 'react';
import { Typography, Container } from '@material-ui/core';
import Form from '../shared/Form/Form';
import { UserLogin } from '../../interfaces';

import classes from './LoginForm.module.scss';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { setLoginAction } from '../../store/users/users.actions';

interface Props {
	onUserLogin: (user: UserLogin) => void;
	setLogin: (isLogin: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ onUserLogin, setLogin }) => {
	const [user, setUser] = useState({
		login: '',
		password: '',
	});

	const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onUserLogin(user);
		// console.log(user);
		setUser({
			login: '',
			password: '',
		});
		setLogin(true);
	};

	const handleInputChanges = (value: string, fieldName: string): void => {
		setUser(prevState => {
			return { ...prevState, [fieldName]: value };
		});
	};

	const userLoginFormTemplate = {
		login: 'Логин',
		password: 'Пароль',
	};

	return (
		<Container className={classes.LoginForm}>
			<Typography variant="h3" align="center">
				Login
			</Typography>
			<Form
				targetObject={user}
				inputHandler={handleInputChanges}
				onSubmit={submitHandler}
				formType="login"
				templateForm={userLoginFormTemplate}
			/>
		</Container>
	);
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	setLogin: (isLogin: boolean) => dispatch(setLoginAction(isLogin)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
